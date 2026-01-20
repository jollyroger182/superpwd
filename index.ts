import { generatePassword } from "./src/superpwd";

console.log(await generatePassword('secretPassword', '0', 1))
