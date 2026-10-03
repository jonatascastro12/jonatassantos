const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function tracker() {
  let effect, pathname = '/', pending;
  const window = { location: { href: 'https://www.jonatassantos.me/' }, dataLayer: [{event:'gtm.js'}] };
  const document = {title:'Jônatas Santos', referrer:'https://www.google.com/'};
  const module = {exports:{}};
  const compiled = ts.transpileModule(fs.readFileSync('src/components/google-tag-manager.tsx','utf8'), {
    compilerOptions:{module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.ReactJSX},
  }).outputText;
  vm.runInNewContext(compiled, {
    module, exports:module.exports, window, document,
    requestAnimationFrame: callback => { pending = callback; return 1; },
    cancelAnimationFrame: () => { pending = undefined; },
    require: name => {
      if(name === 'react') return {useEffect: callback => {effect=callback;}};
      if(name === 'next/navigation') return {usePathname:()=>pathname};
      if(name === 'next/script') return ()=>null;
      if(name === 'react/jsx-runtime') return {jsx:(type,props)=>({type,props})};
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return {
    render(path, title) {
      pathname=path; window.location.href=`https://www.jonatassantos.me${path}`; document.title=title;
      module.exports.GoogleTagManager(); return effect();
    },
    flush(){const callback=pending; pending=undefined; callback?.();},
    events:()=>JSON.parse(JSON.stringify(window.dataLayer)),
  };
}

test('page views include the destination, title, and previous page across language, category, and back navigation',()=>{
  const t=tracker();
  const paths=[['/','Jônatas Santos'],['/blog','Blog — Jônatas Santos'],['/pt/blog/category/music','Música — Blog — Jônatas Santos'],['/blog','Blog — Jônatas Santos']];
  for(const [path,title] of paths){t.render(path,title);t.flush();}
  const events=t.events();
  assert.deepEqual(events[0],{event:'gtm.js'});
  assert.equal(events.length,5);
  paths.forEach(([path,title],i)=>assert.deepEqual(events[i+1],{
    event:'site_page_view',page_location:`https://www.jonatassantos.me${path}`,page_title:title,
    page_referrer:i===0?'https://www.google.com/':`https://www.jonatassantos.me${paths[i-1][0]}`,
  }));
});

test('rerenders do not duplicate visits and cancelled navigations do not emit events',()=>{
  const t=tracker();
  t.render('/','Jônatas Santos');t.flush();
  t.render('/','Jônatas Santos');t.flush();
  const cleanup=t.render('/blog','Blog');cleanup();t.flush();
  assert.equal(t.events().length,2);
  t.render('/pt/blog','Blog');t.flush();
  assert.equal(t.events().length,3);
  assert.equal(t.events()[2].page_referrer,'https://www.jonatassantos.me/');
});
