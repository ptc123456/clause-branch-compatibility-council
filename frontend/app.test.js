import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const source = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8");
test("frontend binds to the deployed Studio Next contract", () => { assert.match(source, /0xf1cd/); assert.match(source, /0x66Cc5CbB2ABf459f75b63699fbd3cf5c8c366b2c/); assert.doesNotMatch(source, /FINALIZED/); });
