const createApp=require('./helpers/fake-dom');
const {api,els,docEl,check}=createApp();
let totalTurns=0;
function playthrough(road,lang,switchMid){
  api.click('lang',lang); check('title '+lang);
  api.click('road',road); check('create '+lang);
  api.input('age',String(18+Math.floor(Math.random()*43))); api.click('sex',Math.random()<.5?'m':'f'); api.click('skin',String(Math.floor(Math.random()*4)));
  api.click('randall'); check('randall');
  api.click('start'); if(api.view!=='play')throw new Error('not play');
  let guard=0,switched=false;
  while(guard++<400){
    if(!api.G.cur.res){
      if(switchMid&&!switched&&api.G.w.day>4){switched=true;api.click('lang',lang==='he'?'en':'he');check('switch');}
      if(api.G.cur.opts.length!==2)throw new Error('opts '+api.G.cur.opts);
      check('choices d'+api.G.w.day+' '+api.LANG);
      const pos=Math.floor(Math.random()*2);
      if(Math.random()<.5)api.key(String(pos+1));
      if(!api.G.cur.res)api.click('choose',undefined,api.G.cur.opts[pos]);
      if(!api.G.cur.res)api.click('choose',undefined,api.G.cur.opts[1-pos]);
      if(!api.G.cur.res)api.click('meds');
      check('rolling d'+api.G.w.day+' '+api.LANG);
      if(api.G.cur.res&&Math.random()<.5){api.click('skip');check('after skip');}
    }
    if(api.G.cur.res){check('result '+api.LANG);totalTurns++;api.click('next');if(api.view==='end')break;check('turn '+api.LANG);}
  }
  if(api.view!=='end')throw new Error('no end');
  check('end '+api.LANG);
  return api.G.over.type;
}
const outs={};
for(const road of [5,15,20])for(const lang of ['en','he'])for(let k=0;k<6;k++){const r=playthrough(road,lang,k%3===0);outs[r]=(outs[r]||0)+1;}
console.log('endings',outs,'turns',totalTurns);
// restart flows
api.click('lang','he');api.click('road','5');api.click('start');
api.click('restart'); console.log('modal shown:',/dlg/.test(els.modal.innerHTML),/להתחיל מחדש/.test(els.modal.innerHTML));
api.click('mSame'); console.log('restarted day',api.G.w.day,api.view);
api.click('restart');api.click('mNew');console.log('new creation view',api.view);
api.click('home');console.log('home view',api.view,'continue btn:',/להמשיך/.test(els.main.innerHTML));
api.click('continue');console.log('continue ->',api.view,api.G.w.day);
console.log('dir',docEl.dir,docEl.lang);
api.click('lang','en');console.log('dir',docEl.dir,docEl.lang);
console.log('UI TEST PASSED');
