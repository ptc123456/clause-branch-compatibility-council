import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const source = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8");
test("frontend validates Studio Next chain and does not claim success before deployment", () => { assert.match(source, /0xf1cd/); assert.match(source, /AWAITING_DEPLOYMENT/); assert.doesNotMatch(source, /FINALIZED/); });
