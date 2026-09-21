/* Sharing the end screen: a card, a line of text, and ways to send it. Run: npm test */
const createApp=require('./helpers/fake-dom');
const {api,els}=createApp();
const problems=[];const bad=m=>problems.push(m);
/* answer with the first option that can be chosen: some cost ammunition or food the survivor may not have */
const answer=()=>{const G=api.G;for(const o of G.cur.opts){api.click('choose',undefined,o);if(G.cur.res)return true;}return false;};

for(const lang of ['en','he']){
  api.click('lang',lang);api.click('road','5');api.click('randall');api.click('start');
  let guard=0;
  while(guard++<300){
    if(!api.G.cur.res)answer();
    api.click('skip');api.click('next');
    if(api.view==='end')break;
  }
  if(api.view!=='end'){bad(lang+': the game did not reach the end screen');continue;}
  if(!/data-act="share"/.test(els.main.innerHTML))bad(lang+': the end screen has no Share button');
  api.click('share');
  const html=els.modal.innerHTML;
  if(!/id="shareCv"/.test(html))bad(lang+': the share dialog has no picture');
  if(!/id="shareTxt"/.test(html))bad(lang+': the share dialog has no text');
  if(!/data-act="shareCopy"/.test(html)||!/data-act="shareSave"/.test(html))bad(lang+': copy and save must be offered');
  const txt=(html.match(/<textarea[^>]*>([\s\S]*?)<\/textarea>/)||[])[1]||'';
  const name=api.G.p.name;
  if(txt.indexOf(name)<0)bad(lang+': the text should say who');
  if(!/https?:\/\//.test(txt))bad(lang+': the text should carry the link');
  if(lang==='en'&&!/Survived|Died|Turned/.test(txt))bad('the English text should say how it ended: '+txt);
  if(lang==='he'&&!/שרדו|מתו|הפכו/.test(txt))bad('the Hebrew text should say how it ended: '+txt);
  if(!/\d+ (survival points|נקודות הישרדות)/.test(txt))bad(lang+': the text should carry the points: '+txt);
  if(/undefined|NaN/.test(txt))bad(lang+': the text has a broken value: '+txt);
  if(lang==='he'&&/(^|[^א-ת])אתה([^א-ת]|$)/.test(txt))bad('the Hebrew share text is gendered');
  /* the card draws without a browser: run it against a recording stand-in for a canvas */
  {const ops=[];const ctx=new Proxy({},{get:(o,k)=>(...a)=>{ops.push(k);},set:()=>true});
   const cv={width:1080,height:1350,getContext:()=>ctx};
   try{api.drawShareCard(cv);}catch(e){bad(lang+': drawing the card threw: '+e.message);}
   if(!ops.includes('fillText')||!ops.includes('fillRect'))bad(lang+': the card drew nothing');}
  api.click('mCancel');
  if(els.modal.innerHTML.trim()!=='')bad(lang+': closing should clear the dialog');
}
if(problems.length){console.log(problems.join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log('share OK: the end screen offers a card, text, copy and save, in both languages');
