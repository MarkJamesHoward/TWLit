#!/usr/bin/env node

import * as fs from "fs";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2)).argv;
const input = argv.input ?? "./TailwindGenerated.css";
const output = argv.output ?? "./ReadyForLitimport.js";

// const input = "./tailwindGenerated.css";
// const output = "./readyForLitimport.js";

console.log(`Reading from file ${input}`);
console.log(`Writing to ${output}`);

console.log("pausing for first generation of tailwind file..");

await sleep(5000);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

fs.watchFile(input, { interval: 1000 }, () => {
  const contents = fs.readFileSync(input, "utf8");

  const cleanContents = contents.replaceAll("`", "");

  const litContents = `
import { css } from "lit"; export const TWStyles = css\` ${cleanContents} \`
`;

  fs.writeFileSync(output, litContents);
  console.log(`TWLit - wrote to file ${output}`);
});
