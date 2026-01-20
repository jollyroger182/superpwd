import { getArgon } from '../compat/argon'

const argon = await getArgon()

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
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`v1|${key}`)),
  )

  const hash = argon({
    salt,
    password: new TextEncoder().encode(masterPwd),
    parallelism: 1,
    passes: 3,
    memorySize: 1 << 16,
    tagLength: 32,
  })
  return hash.toBase64({ alphabet: 'base64url' }).substring(0, 16)
}
