/* Renders every place in the world view to a PNG, so it can be looked at without a browser.
   Usage: node tests/tools/preview-world.js [outdir] [scene ...] */
const fs=require('fs'),path=require('path');
const createApp=require('../helpers/fake-dom');
const {SoftCtx}=require('./soft-canvas');
const {api}=createApp();
api.click('lang','en');api.click('road','5');api.click('randall');api.click('start');
const out=process.argv[2]||'/tmp/preview';fs.mkdirSync(out,{recursive:true});
const only=process.argv.slice(3);
const w=api.world;
const G=api.G;
G.p.name='Dana';G.p.age=34;
Object.keys(w.WSCENES).filter(id=>!only.length||only.includes(id)).forEach(id=>{
  const bg=id.startsWith('room_')?id.slice(5):'doctor';
  G.p.bg=bg;G.p.sex='f';G.p.skin=1;
  const locs=(id==='street')?['usa','uk','japan','canada']:[G.p.loc];
  locs.forEach(loc=>{
    const W=w.worldNew(id,loc);
    W.cx=W.S.start[0]+2;W.cy=W.S.start[1]-2;W.fx=W.cx+.5;W.fy=W.cy+.5;
    const c=new SoftCtx(w.WCW,w.WCH);
    w.worldDraw(c,W,1500);
    fs.writeFileSync(path.join(out,id+(locs.length>1?'-'+loc:'')+'.png'),c.toPNG());
  });
});
console.log('wrote previews to',out);
