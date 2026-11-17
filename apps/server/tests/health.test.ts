import assert from 'node:assert';
import test from 'node:test';
import { config } from '../src/config/environment';

test('Health endpoint config test', () => {
  assert.ok(config.port > 0, 'Port must be configured');
});
