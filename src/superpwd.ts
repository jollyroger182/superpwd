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
  const salt = new Bun.CryptoHasher("sha256").update(`v1|${key}`).digest()
  const hash = await argon2.hash(masterPwd, {
    salt,
    raw: true,
    parallelism: 1,
    hashLength: 32,
    timeCost: 3,
    memoryCost: 1 << 16,
    type: argon2.argon2id,
    version: 0x13,
  })
  return hash.toString("base64url").substring(0, 16)
}
