
/* ---------- the world view: joining it to the game ----------
 * The same game, shown another way. A place is drawn above the question; the question stays hidden until you walk into the
 * glowing ring (or press Go), and then it opens exactly as it always did. Nothing about the choices or the rolls changes.
 */
let WMODE=false,WOPEN=false,WS=null,WCUR=null,WRAF=0,WLAST=0,WMSGT=0;
const WMODES=['walk','sneak','run'];
/* how you are moving: hold Shift to run, hold C to sneak; otherwise the mode set with the button */
const worldMode=()=>!WS?'walk':WS.sneak?'sneak':WS.run?'run':(WS.base||'walk');
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
    <div class="wmsg" id="worldmsg" role="status" aria-live="polite"></div>
    <div class="wbar"><span class="wplace">${esc(worldPlace())}</span><button class="btn sm ghost" id="worldModeBtn" data-act="worldMode" title="${esc(t('worldModeTip'))}">${t('worldMode_'+worldMode())}</button><span class="whint">${t('worldHint')}</span>
      <button class="btn sm primary" data-act="worldGo">${t('worldGo')}</button><button class="btn sm ghost" data-act="worldSkip">${t('worldSkip')}</button></div></div>`;
}

/* called every time the play screen is drawn: a new question is a new place; the same question keeps where you stand */
function worldSync(){
  const slot=$('worldslot');if(!slot)return;
  if(!WMODE){slot.innerHTML='';WS=null;return;}
  if(!WS||WCUR!==G.cur){
    WCUR=G.cur;
    /* one to three zombies, by how far the outbreak has gone. the same question always gets the same ones. */
    const sid=worldSceneId(G.cur.id),n=worldZombieCount(G.cur.id,sid,G.w.outbreak),seed=(G.w.day*7+G.st.decisions*13+hash(G.cur.id))>>>0;
    /* the first scenes of the story stay small and calm; everything after is bigger, so the way to the question is longer */
    WS=worldNew(sid,G.p.loc,{zombies:n,seed,grow:!/^pro_/.test(G.cur.id),stealth:G.p.stats.stealth});
    WOPEN=!!G.cur.res;                                   // a question that was already answered opens at once
    if(WOPEN){WS.z=[];WS.frozen=true;}
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
  worldFocus();
}
/* once the question is open the place shrinks to a strip above it, kept centred on the survivor. the page does not scroll: the place must never leave the screen. */
function worldFocus(){
  const cv=$('worldcv');if(!cv||!cv.style||!WS)return;
  if(!(WOPEN||(G.cur&&G.cur.res))){cv.style.objectPosition='';return;}
  const bw=cv.clientWidth||0,bh=230;
  if(!bw){cv.style.objectPosition='50% 60%';return;}
  const sc=bw/WCW,py=WS.oy+(WS.fx+WS.fy)*WTH/2-48;
  const p=Math.max(0,Math.min(1,(py*sc-bh/2)/(WCH*sc-bh)));
  cv.style.objectPosition='50% '+Math.round(p*100)+'%';
}
function worldOpen(){
  if(WOPEN)return;
  WOPEN=true;
  if(WS){WS.frozen=true;WS.z.forEach(z=>{z.path=[];z.walking=false;});}      // once you are at the question, nothing moves on you
  renderStage();
}
/* a short message over the place, for a bite */
function worldMessage(text){
  const m=$('worldmsg');if(!m)return;
  m.textContent=text;if(m.classList)m.classList.add('show');
  if(typeof setTimeout==='function'){clearTimeout(WMSGT);WMSGT=setTimeout(()=>{const e=$('worldmsg');if(e&&e.classList)e.classList.remove('show');},4200);if(WMSGT&&WMSGT.unref)WMSGT.unref();}
}

/* one step of time: walk, and open the question if you have arrived */
function worldPump(dt){
  if(!WS)return;
  WS.mode=worldMode();
  worldTick(WS,dt);
  /* a bite costs health and adds infection: the same numbers the rest of the game uses */
  while(WS.events.length){
    const e=WS.events.shift();
    if(e.type==='bite'){const r=zombieBite();worldMessage(t('worldBite',r.hp,r.inf));renderVitals();}
  }
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
    if(key==='Shift'){WS.run=true;return;}
    if(key==='c'){WS.sneak=true;return;}
    if(worldKey(WS,key)&&ev.preventDefault)ev.preventDefault();
  });
  document.addEventListener('keyup',ev=>{
    if(!WS)return;
    if(ev.key==='Shift')WS.run=false;
    if(ev.key==='c'||ev.key==='C')WS.sneak=false;
  });
}

/* the button cycles walk, sneak, run: for touch screens, and for anyone who does not want to hold a key */
function worldCycleMode(){
  if(!WS)return;
  WS.base=WMODES[(WMODES.indexOf(WS.base||'walk')+1)%WMODES.length];
  const b=$('worldModeBtn');if(b)b.textContent=t('worldMode_'+worldMode());
}
