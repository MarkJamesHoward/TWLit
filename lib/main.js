import * as fs from "fs";
import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).argv;
const input = argv.input;
const output = argv.output;
console.log(input);
console.log(output);
console.log(argv);
const contents = fs.readFileSync(input, "utf8");
const cleanContents = contents.replaceAll("`", "");
const litContents = `
import { css } from "lit"; export const TWStyles = css\` ${cleanContents} \`
`;
fs.writeFileSync(output, litContents);
console.log(litContents);
