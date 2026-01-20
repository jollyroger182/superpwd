export async function getStoredPassword() {
  return Bun.secrets.get({ service: 'superpwd', name: 'master_password' })
}

export async function clearStoredPassword() {
  return Bun.secrets.delete({ service: 'superpwd', name: 'master_password' })
}

export async function storePassword(password: string) {
  await Bun.secrets.set({
    service: 'superpwd',
    name: 'master_password',
    value: password,
  })
}
