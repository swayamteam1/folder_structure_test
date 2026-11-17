const assert = require('node:assert');
const test = require('node:test');

test('Health endpoint config test', () => {
  const config = require('../src/config/environment');
  assert.ok(config.port > 0, 'Port must be configured');
});
