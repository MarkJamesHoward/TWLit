#!/usr/bin/env node

import * as fs from "fs";
import yargs from "yargs";

let input;
let output;

try {
  const argv = yargs(process.argv.slice(2)).argv;
  input = argv.input ?? "./TailwindGenerated.css";
  output = argv.output ?? "./ReadyForLitimport.js";
} catch (e) {
  console.log(`Error reading input/output parameters ${e}`);
}

console.log(`Reading from file ${input}`);
console.log(`Writing to ${output}`);

fs.watchFile(input, { interval: 1000 }, () => {
  try {
    let contents;

    try {
       contents = fs.readFileSync(input, "utf8");
    } catch (e) {
      console.log(
        `Failed to read file ${input}. Might just not be created yet? retrying..`
      );
    }

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
