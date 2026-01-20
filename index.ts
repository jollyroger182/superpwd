#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

await yargs(hideBin(process.argv))
  .command(
    'get <key> [password]',
    'generate a password for a service',
    (yargs) =>
      yargs
        .positional('key', {
          describe: 'the key of the service',
          type: 'string',
        })
        .option('password', {
          describe: 'force to read master password from terminal input',
          type: 'boolean',
          alias: ['p'],
        }),
    async (args) => {
      console.log(args)
    },
  )
  .demandCommand()
  .parseAsync()
