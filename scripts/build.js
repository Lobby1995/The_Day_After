#!/usr/bin/env node
/* Builds dist/index.html: one self-contained file (styles + script inlined). No dependencies. */
const fs=require('fs'),path=require('path');
const M=require('./manifest');
const ROOT=path.join(__dirname,'..'),SRC=path.join(ROOT,'src'),DIST=path.join(ROOT,'dist');
const read=f=>fs.readFileSync(path.join(SRC,f),'utf8');
const join=files=>files.map(read).join('\n');

/* every .js under src/js must be listed in the manifest, so nothing is silently left out */
function listJs(dir,base=''){
  return fs.readdirSync(path.join(SRC,dir)).flatMap(n=>{
    const rel=path.posix.join(base||dir,n),full=path.join(SRC,rel);
    return fs.statSync(full).isDirectory()?listJs(rel,rel):[rel];
  }).filter(f=>f.endsWith('.js'));
}
function checkManifest(){
  const listed=new Set([...M.engine,...M.presentation]);
  const missing=listJs('js').filter(f=>!listed.has(f));
  const gone=[...listed].filter(f=>!fs.existsSync(path.join(SRC,f)));
  if(missing.length||gone.length){
    throw new Error('manifest out of sync. not listed: '+(missing.join(', ')||'none')+' | listed but missing: '+(gone.join(', ')||'none'));
  }
}
const engineSource=()=>join([...M.engine,...M.hebrew]);     // rules + Hebrew text, for tests and simulations
const buildScript=()=>{checkManifest();return join([...M.engine,...M.presentation]);};
const buildStyles=()=>join(M.styles);
function buildHtml(){
  const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
  return read('index.html')
    .replace('/*@STYLES*/',()=>buildStyles())
    .replace('//@SCRIPT',()=>buildScript())
    .replace('{{VERSION_MAJOR}}',()=>pkg.version.split('.')[0]);
}
module.exports={engineSource,buildScript,buildStyles,buildHtml};

if(require.main===module){
  const html=buildHtml();
  fs.mkdirSync(DIST,{recursive:true});
  fs.writeFileSync(path.join(DIST,'index.html'),html);
  fs.writeFileSync(path.join(DIST,'.nojekyll'),'');
  console.log(`built dist/index.html (${(html.length/1024).toFixed(0)} KB)`);
}
