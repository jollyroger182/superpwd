import argon2 from "argon2"

export async function generatePassword(
  masterPwd: string,
  key: string,
  version: number,
) {
  if (version === 1) return generatePasswordV1(masterPwd, key)
  throw new Error(`Password version ${version} is unknown`)
}

export async function generatePasswordV1(masterPwd: string, key: string) {
  const secret = new TextEncoder().encode(masterPwd)
  const hash = await argon2.hash(`v1|${key}`, {
    type: argon2.argon2id,
    secret: Buffer.from(secret),
  })
  return hash
}
