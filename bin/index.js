#!/usr/bin/env node

import * as fs from "fs";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2)).argv;
const input = argv.input ?? "./TailwindGenerated.css";
const output = argv.output ?? "./ReadyForLitimport.js";

console.log(`Reading from file ${input}`);
console.log(`Writing to ${output}`);

fs.watchFile(input, { interval: 1000 }, () => {
  try {
    const contents = fs.readFileSync(input, "utf8");

    let cleanContents = contents.replaceAll("`", "");
    cleanContents = cleanContents.replaceAll("\\", "\\\\");

    const litContents = `
    import { css } from "lit";
    export const TWStyles = css\` ${cleanContents} \`
    `;

    fs.writeFileSync(output, litContents);
    console.log(`TWLit - wrote to file ${output}`);
  } catch (err) {
    console.log(err);
  }
});
