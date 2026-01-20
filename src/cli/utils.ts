import { getStoredPassword, storePassword } from './storage'
import prompt from 'prompt'

export async function getMasterPassword(forceInteractive: boolean) {
  if (!forceInteractive) {
    const stored = await getStoredPassword()
    if (stored) return stored
  }

  prompt.message = ''
  prompt.delimiter = ''
  prompt.start()

  const { password, store } = await prompt.get({
    properties: {
      password: {
        description: 'Please enter your master password:',
        hidden: true,
      },
      store: {
        name: 'store',
        description:
          'Would you like to store this master password in the system keychain?',
        type: 'boolean',
        default: false,
      },
    },
  })

  if (store) {
    await storePassword(password as string)
  }

  return password as string
}
