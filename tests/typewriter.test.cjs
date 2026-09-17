const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.tsx'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  module._compile(outputText, filename);
};
test('home typewriter includes AI and identity work alongside existing phrases', () => {
  const element = require('../src/components/typewriter.tsx').default();
  for (const phrase of ['building AI agents', 'automating workflows with AI', 'integrating LLMs into products', 'building identity systems', 'helping CEOs', 'architecting solutions']) {
    assert.ok(element.props.words.includes(phrase), phrase);
  }
  assert.equal(element.props.loop, true);
});
