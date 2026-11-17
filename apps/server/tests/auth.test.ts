import assert from 'node:assert';
import test from 'node:test';
import { generateToken } from '../src/services/tokenService';

test('JWT Token Generation', () => {
  const token = generateToken({ id: 1, email: 'test@example.com', roles: ['user'] });
  assert.strictEqual(typeof token, 'string');
  assert.ok(token.length > 20);
});
