import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DEFAULT_ALLOWLIST, matchesAllowlist, buildLaunchScript } from "../lib/launch.js";

describe("win_launch allowlist", () => {
  it("allows default names and paths ending with them", () => {
    assert.equal(matchesAllowlist("code", DEFAULT_ALLOWLIST), true);
    assert.equal(matchesAllowlist("C:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe", ["code.exe"]), true);
    assert.equal(matchesAllowlist("evil.exe", DEFAULT_ALLOWLIST), false);
  });

  it("supports trailing wildcards", () => {
    assert.equal(matchesAllowlist("msedge.exe", ["msedge*"]), true);
  });

  it("builds Start-Process script", () => {
    assert.match(buildLaunchScript("notepad.exe", ["a.txt"]), /Start-Process/);
  });
});
