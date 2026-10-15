import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_COOKIE_PREFERENCES, getCookiePreferenceExpiry, openCookiePreferences, parseCookiePreferences } from '../src/lib/cookie-preferences.ts';

const date = '2026-10-15T12:00:00.000Z';
const now = new Date('2026-10-16T12:00:00.000Z');
const saved = { necessary: true, analytics: false, functional: true, date };

test('server defaults deny optional categories and the global trigger is SSR safe', () => {
  assert.deepEqual(DEFAULT_COOKIE_PREFERENCES, { necessary: true, analytics: false, functional: false, date: '' });
  assert.doesNotThrow(() => openCookiePreferences());
});

test('preserves independent explicit choices using the exact schema', () => {
  assert.deepEqual(parseCookiePreferences(JSON.stringify({ ...saved, unexpected: true }), now), saved);
});

test('missing, malformed or non-boolean decisions never opt in', () => {
  for (const value of [null, '', 'accepted', '{', 'null', '[]', '{}',
    JSON.stringify({ ...saved, necessary: false }), JSON.stringify({ ...saved, analytics: 'true' }),
    JSON.stringify({ ...saved, functional: 1 }), JSON.stringify({ ...saved, date: 'invalid' }),
    JSON.stringify({ ...saved, date: '2026-10-15' })]) {
    assert.equal(parseCookiePreferences(value, now), null);
  }
});

test('future decisions are rejected', () => {
  assert.equal(parseCookiePreferences(JSON.stringify(saved), new Date('2026-10-14T12:00:00.000Z')), null);
});

test('decisions expire exactly at six calendar months for both acceptance and refusal', () => {
  for (const selection of [{ analytics: true, functional: true }, { analytics: false, functional: false }]) {
    const raw = JSON.stringify({ ...saved, ...selection });
    assert.ok(parseCookiePreferences(raw, new Date('2027-04-15T11:59:59.999Z')));
    assert.equal(parseCookiePreferences(raw, new Date('2027-04-15T12:00:00.000Z')), null);
  }
});

test('six-month expiry clamps month ends instead of extending retention into the next month', () => {
  assert.equal(getCookiePreferenceExpiry('2026-08-31T12:00:00.000Z').toISOString(), '2027-02-28T12:00:00.000Z');
  assert.equal(getCookiePreferenceExpiry('2027-08-31T12:00:00.000Z').toISOString(), '2028-02-29T12:00:00.000Z');
});
