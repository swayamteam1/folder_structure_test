const assert = require('node:assert');
const test = require('node:test');
const { generateToken } = require('../src/services/tokenService');

test('JWT Token Generation', () => {
  const token = generateToken({ id: 1, email: 'test@example.com', roles: ['user'] });
  assert.strictEqual(typeof token, 'string');
  assert.ok(token.length > 20);
});
