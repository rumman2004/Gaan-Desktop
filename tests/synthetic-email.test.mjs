import { test } from "node:test";
import assert from "node:assert/strict";
import { syntheticEmail } from "../.test-build/config.mjs";

test("usernames without @ map exactly as they always have", () => {
  // Every pre-charset account relies on this exact form to sign in.
  assert.equal(syntheticEmail("rishi21"), "rishi21@users.gaan.local");
  assert.equal(syntheticEmail("Rishi"), "rishi@users.gaan.local");
});

test("underscores pass through untouched", () => {
  assert.equal(syntheticEmail("rishi_07"), "rishi_07@users.gaan.local");
});

test("@ maps to -- so the auth provider's email validation accepts it", () => {
  assert.equal(syntheticEmail("@rishi"), "--rishi@users.gaan.local");
  assert.equal(syntheticEmail("rishi_07@"), "rishi_07--@users.gaan.local");
  assert.equal(syntheticEmail("r@i"), "r--i@users.gaan.local");
});

test("the mapping is injective: distinct usernames never share an auth email", () => {
  // '-' is not a legal username character, so '--' can only come from an '@'.
  const names = ["rishi", "r_ishi", "rishi@", "@rishi", "r@i", "r_i", "ri_", "@ri", "r__i", "r@@i"];
  const emails = new Set(names.map(syntheticEmail));
  assert.equal(emails.size, names.length);
});
