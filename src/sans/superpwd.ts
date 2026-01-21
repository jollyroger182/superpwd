import { webcrypto as crypto } from 'crypto'
import { getArgon } from '../compat/argon'

let argon: Awaited<ReturnType<typeof getArgon>> | undefined

async function ensureArgon() {
  if (!argon) {
    argon = await getArgon()
  }
  return argon
}

export async function generatePassword(
  masterPwd: string,
  key: string,
  version: number,
) {
  if (version === 1) return generatePasswordV1(masterPwd, key)
  throw new Error(`Password version ${version} is unknown`)
}

export async function generatePasswordV1(masterPwd: string, key: string) {
  // const salt = new Bun.CryptoHasher('sha256').update(`v1|${key}`).digest()
  const salt = new Uint8Array(
    await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(`v1|${key}`),
    ),
  )

  const argon = await ensureArgon()
  const hash = argon({
    salt,
    password: new TextEncoder().encode(masterPwd),
    parallelism: 1,
    passes: 3,
    memorySize: 1 << 16,
    tagLength: 32,
  })
  return btoa(String.fromCharCode(...hash))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
    .substring(0, 16)
}
