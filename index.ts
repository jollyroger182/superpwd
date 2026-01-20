#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getCommand } from './src/cli'

await yargs(hideBin(process.argv))
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
  .demandCommand()
  .parseAsync()
