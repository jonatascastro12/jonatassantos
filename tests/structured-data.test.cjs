const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  module._compile(outputText, filename);
};
const { serializeJsonLd } = require('../src/lib/structured-data.ts');

test('structured text cannot break out of its JSON-LD script element', () => {
  const input = { headline: '</script><script>alert("test")</script>', description: 'MIDI < 128 & piano' };
  const serialized = serializeJsonLd(input);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), input);
});
