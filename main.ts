// The Painfully Honest Out-of-Office — make.fun entry.
// Writes a single out-of-office email auto-reply (one sentence,
// at most 200 characters) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), exactly as the program/v1 harness expects.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY: string =
  "I'm away until Monday, honestly relieved to be unreachable, and your email joins the 312 I already owe replies to — thank you for your patience, I'll get to it when I'm back.";

// The gate only judges entries of 1 to 200 characters: refuse to write
// an over-long reply rather than silently handing in an invalid entry.
const MAX_CHARS = 200;
if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(
    `entry is ${ENTRY.length} characters, outside the 1-${MAX_CHARS} gate`,
  );
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
