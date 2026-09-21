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
    const W=w.worldNew(id,loc,{zombies:4,seed:2,grow:!process.env.SMALL});
    W.cx=W.S.start[0];W.cy=W.S.start[1];
    for(let i=0;i<8;i++){w.worldStep(W,-1,-1);for(let k=0;k<12;k++)w.worldTick(W,50);}      // walk a little way in
    w.worldCamera(W,0,true);
    for(let i=0;i<60;i++)w.worldTick(W,50);      // three seconds of zombies walking toward the survivor
    const c=new SoftCtx(w.WCW,w.WCH);
    w.worldDraw(c,W,1500);
    fs.writeFileSync(path.join(out,id+(locs.length>1?'-'+loc:'')+'.png'),c.toPNG());
  });
});
console.log('wrote previews to',out);
