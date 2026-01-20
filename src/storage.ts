// import envPaths from 'env-paths'
// import { mkdir } from 'fs/promises'
// import { join } from 'path'

// const paths = envPaths('superpwd')
// const pwdFile = Bun.file(join(paths.config, 'password'))

// async function ensureConfigExists() {
//   await mkdir(paths.config, { recursive: true })
// }

export async function getStoredPassword() {
  // if (await pwdFile.exists()) {
  //   return await pwdFile.text()
  // }
  return Bun.secrets.get({ service: 'superpwd', name: 'master_password' })
}

export async function clearStoredPassword() {
  await Bun.secrets.delete({ service: 'superpwd', name: 'master_password' })
}

export async function storePassword(password: string) {
  // Bun.write(pwdFile, password, { mode: 0o600 })
  await Bun.secrets.set({
    service: 'superpwd',
    name: 'master_password',
    value: password,
  })
}
