# superpwd

A super, deterministic password generator. It uses `argon2id` to generate deterministic passwords based on a master password and a service key (that represents the service).

## Supported platforms

- CLI: Run `bunx superpwd@latest`
- Web: Visit [https://superpwd.jollyy.dev](https://superpwd.jollyy.dev). Your passwords never leave your browser; in fact, there's not even a backend.
- Node.js/Bun: You can use this as a library in your project. It's available on npm as `superpwd`, and it exports one function: `async function generatePassword(masterPwd: string key: string, version: number)`. Currently, only version 1 is supported.

## Tech stack

The project is loosely split into these components:

- `index.ts`: The main entry point for the library; the file that runs when you import the module.
- `cli.ts`: The CLI app. Uses `yargs` to parse the command line arguments.
- `src/cli`: Components specific to the CLI, such as the commands, secret storage, etc.
- `src/sans`: The main functionality of the project. Uses the `argon2id` library to generate passwords.
- `src/compat`: Compatibility layer for loading `argon2id` on different platforms (Bun, Node.js, browser).
- `src/browser`: Source code for the website. Bundled using Bun then served as a static Cloudflare worker.
