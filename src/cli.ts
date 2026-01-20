import { generatePassword } from './superpwd'
import { getMasterPassword } from './utils'

export interface GetCommandArgs {
  key: string
  interactive: boolean
  ver: number
}

export async function getCommand(args: GetCommandArgs) {
  const masterPwd = await getMasterPassword(args.interactive)

  const password = await generatePassword(masterPwd, args.key, args.ver)

  console.log(password)
}
