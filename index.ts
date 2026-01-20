#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { clearCommand, getCommand } from './src/cli/cli'

await yargs(hideBin(process.argv))
  .scriptName('superpwd')
  .strict()
  .command(
    'get <key> [password]',
    'generate a password for a service',
    (yargs) =>
      yargs
        .positional('key', {
          describe: 'the key of the service',
          type: 'string',
          demandOption: true,
        })
        .option('interactive', {
          describe: 'read master password from terminal input',
          type: 'boolean',
          alias: ['i'],
          default: false,
        })
        .option('ver', {
          describe: 'version of password to generate',
          type: 'number',
          alias: ['V'],
          default: 1,
        }),
    async (argv) => getCommand(argv),
  )
  .command(
    'clear',
    'clear the stored master password',
    (yargs) => yargs,
    async () => clearCommand(),
  )
  .demandCommand()
  .parseAsync()
