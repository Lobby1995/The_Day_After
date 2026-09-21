
/* ---------- the world view: joining it to the game ----------
 * The same game, shown another way. A place is drawn above the question; the question stays hidden until you walk into the
 * glowing ring (or press Go), and then it opens exactly as it always did. Nothing about the choices or the rolls changes.
 */
let WMODE=false,WOPEN=false,WS=null,WCUR=null,WRAF=0,WLAST=0;
try{WMODE=localStorage.getItem('daysafter.world')==='1';}catch(e){}

const worldOn=()=>!!(WMODE&&view==='play'&&G&&G.cur);
const worldReduced=()=>{try{return reduced();}catch(e){return false;}};
const worldPlace=()=>{const n=WS&&WS.S.name;return n?(LANG==='he'?n[1]:n[0]):'';};

function worldToggle(){
  WMODE=!WMODE;
  try{localStorage.setItem('daysafter.world',WMODE?'1':'0');}catch(e){}
  if(view==='play'){if(!WMODE)WS=null;renderPlay();}else applyLang();
}

/* the box that goes above the question */
function worldBoxHtml(){
  return `<div class="worldbox${WOPEN?' open':''}" id="worldbox">
    <canvas id="worldcv" width="${WCW}" height="${WCH}" role="img" aria-label="${esc(t('worldAria'))}"></canvas>
    <div class="wbar"><span class="wplace">${esc(worldPlace())}</span><span class="whint">${t('worldHint')}</span>
      <button class="btn sm primary" data-act="worldGo">${t('worldGo')}</button><button class="btn sm ghost" data-act="worldSkip">${t('worldSkip')}</button></div></div>`;
}

/* called every time the play screen is drawn: a new question is a new place; the same question keeps where you stand */
function worldSync(){
  const slot=$('worldslot');if(!slot)return;
  if(!WMODE){slot.innerHTML='';WS=null;return;}
  if(!WS||WCUR!==G.cur){
    WCUR=G.cur;
    WS=worldNew(worldSceneId(G.cur.id),G.p.loc);
    WOPEN=!!G.cur.res;                                   // a question that was already answered opens at once
  }
  slot.innerHTML=worldBoxHtml();
  const cv=$('worldcv');
  if(cv&&cv.addEventListener)cv.addEventListener('pointerdown',ev=>{
    if(WOPEN||!WS)return;
    const r=cv.getBoundingClientRect();
    if(worldTap(WS,(ev.clientX-r.left)*WCW/r.width,(ev.clientY-r.top)*WCH/r.height))ev.preventDefault();
  });
  worldFrame(WLAST||0);worldStart();
}
function worldApplyStage(){
  const st=$('stage');if(!st)return;
  const hide=!!(WMODE&&!WOPEN&&!(G.cur&&G.cur.res));
  st.hidden=hide;
  const box=$('worldbox');if(box&&box.classList)box.classList.toggle('open',!hide);
}
function worldOpen(){
  if(WOPEN)return;
  WOPEN=true;renderStage();
  const st=$('stage');if(st&&st.scrollIntoView)st.scrollIntoView({behavior:worldReduced()?'auto':'smooth',block:'start'});
}

/* one step of time: walk, and open the question if you have arrived */
function worldPump(dt){
  if(!WS)return;
  worldTick(WS,dt);
  if(WS.arrived&&!WOPEN)worldOpen();
}
function worldFrame(now){
  const cv=$('worldcv');if(!cv||!cv.getContext||!WS)return;
  const c=cv.getContext('2d');if(!c)return;
  worldDraw(c,WS,worldReduced()?0:now);
}
function worldLoop(now){
  WRAF=0;
  if(!worldOn()||!$('worldcv')||!WS)return;
  const dt=Math.min(64,now-(WLAST||now));
  if(!WOPEN||now-WLAST>=33){WLAST=now;worldPump(dt);worldFrame(now);}   // half speed once the question is open: the place is only backdrop then
  WRAF=requestAnimationFrame(worldLoop);
}
function worldStart(){
  if(WRAF||typeof requestAnimationFrame!=='function')return;
  WLAST=0;WRAF=requestAnimationFrame(worldLoop);
}

/* the keyboard: arrows or WASD to walk, E, Enter or Space to go to the question */
if(typeof document!=='undefined'&&document.addEventListener){
  document.addEventListener('keydown',ev=>{
    if(!worldOn()||WOPEN||!WS)return;
    if(ev.ctrlKey||ev.metaKey||ev.altKey)return;
    const tg=ev.target&&ev.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT')return;
    const m=$('modal');if(m&&m.innerHTML&&m.innerHTML.trim())return;
    const key=ev.key&&ev.key.length===1?ev.key.toLowerCase():ev.key;
    if(worldKey(WS,key)&&ev.preventDefault)ev.preventDefault();
  });
}
