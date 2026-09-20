
/* ---------- trophies, achievements, toasts ---------- */
Object.assign(UI.en,{
 trophies:'Trophies',trophyRoom:'Trophy Room',tabAch:'Achievements',tabTro:'Trophies',pts:'points',backBtn:'Back',
 ofN:(a,b)=>`${a} of ${b}`,lockedL:'Locked',newAch:'Achievement unlocked',newTro:'Trophy earned',
 tiers:{bronze:'Bronze',silver:'Silver',gold:'Gold',platinum:'Platinum'},
 bondChip:(n,f)=>`${n} is bonded to you`,
 troEarnedH:'Earned this run',troNone:'No new trophies this time.',roomBlurb:'Achievements happen during a run. Trophies are awarded when a run ends.',
 sitLbl:'The state of things',troBtn:'Trophy Room'
});
Object.assign(UI.he,{
 trophies:'גביעים',trophyRoom:'חדר הגביעים',tabAch:'הישגים',tabTro:'גביעים',pts:'נקודות',backBtn:'חזרה',
 ofN:(a,b)=>`${a} מתוך ${b}`,lockedL:'נעול',newAch:'הישג נפתח',newTro:'גביע הושג',
 tiers:{bronze:'ארד',silver:'כסף',gold:'זהב',platinum:'פלטינה'},
 bondChip:(n,f)=>`נוצר קשר עמוק עם ${n}`,
 troEarnedH:'הושגו בריצה הזו',troNone:'אין גביעים חדשים הפעם.',roomBlurb:'הישגים נפתחים במהלך ריצה. גביעים ניתנים כשהריצה מסתיימת.',
 sitLbl:'מצב העניינים',troBtn:'חדר הגביעים'
});
UI.en.edge.order='the state of order';UI.he.edge.order='מצב הסדר';

let TROTAB='ach',PREV='title';
const nameOf=o=>o[LANG==='he'?'he':'en'][0],descOf=o=>o[LANG==='he'?'he':'en'][1];
const fmtDate=ts=>{try{return new Date(ts).toLocaleDateString(LANG==='he'?'he-IL':'en-GB',{day:'numeric',month:'short',year:'numeric'});}catch(e){return'';}};
function tcard(o,box,isTro){
  const got=box[o.id],tier=isTro?o.tier:'';
  return`<div class="tcard ${got?'got':'lock'} ${tier}"><div class="thead">${isTro?`<span class="tierb">${tt('tiers',tier)}</span>`:`<span class="tierb">${got?'✓':'·'}</span>`}<b>${esc(nameOf(o))}</b></div><p>${esc(descOf(o))}</p><small>${got?fmtDate(got):t('lockedL')}</small></div>`;
}
function renderTrophies(){
  if(view!=='trophies')PREV=view;
  view='trophies';
  const list=TROTAB==='ach'?ACH:TRO,box=TROTAB==='ach'?META.ach:META.tro;
  const aN=Object.keys(META.ach).length,tN=Object.keys(META.tro).length;
  main().innerHTML=`<section class="troom">
   <div class="row" style="justify-content:space-between;align-items:center"><h1 class="head" style="font-size:2.2rem;margin:0">${t('trophyRoom')}</h1><button class="btn sm" data-act="troBack">${t('backBtn')}</button></div>
   <p class="small" style="margin:8px 0 18px">${t('roomBlurb')}</p>
   <div class="facts tfacts"><div class="fact"><b class="num">${aN}</b>${t('tabAch')}: ${t('ofN',aN,ACH.length)}</div><div class="fact"><b class="num">${tN}</b>${t('tabTro')}: ${t('ofN',tN,TRO.length)}</div><div class="fact"><b class="num">${metaPoints()}</b>${t('pts')}</div></div>
   <div class="seg" role="group" style="margin:22px 0 16px"><button data-act="troTab" data-v="ach" aria-pressed="${TROTAB==='ach'}">${t('tabAch')}</button><button data-act="troTab" data-v="tro" aria-pressed="${TROTAB==='tro'}">${t('tabTro')}</button></div>
   <div class="tgrid">${list.map(o=>tcard(o,box,TROTAB==='tro')).join('')}</div></section>`;
  applyLang();window.scrollTo({top:0});
}
function leaveTrophies(){
  if(PREV==='play'&&G&&G.cur&&!G.over)return renderPlay();
  if(PREV==='end'&&G&&G.over)return renderEnd();
  return renderTitle();
}
/* small pop-ups, shown after a roll has settled so they never spoil it */
function flushToasts(){
  if(!G||!G.toasts||!G.toasts.length)return;
  const box=$('toasts');if(!box){G.toasts=[];return;}
  const list=G.toasts.splice(0);
  list.forEach((x,i)=>{
    const o=(x.kind==='ach'?ACH:TRO).find(a=>a.id===x.id);if(!o)return;
    const el=document.createElement('div');el.className='toast '+x.kind;
    el.innerHTML=`<small>${x.kind==='ach'?t('newAch'):t('newTro')}</small><b>${esc(nameOf(o))}</b><span>${esc(descOf(o))}</span>`;
    setTimeout(()=>{box.appendChild(el);setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),500);},4800);},i*350);
  });
  save();
}
function runTrophiesHtml(){
  const ids=(G.newTro||[]);
  const items=ids.map(id=>TRO.find(x=>x.id===id)).filter(Boolean);
  return`<h2 class="head" style="font-size:1.6rem;margin:26px 0 8px">${t('troEarnedH')}</h2>${items.length?`<div class="tgrid tsm">${items.map(o=>tcard(o,META.tro,true)).join('')}</div>`:`<p class="small">${t('troNone')}</p>`}<div class="row" style="margin-top:14px"><button class="btn sm" data-act="trophies">${t('troBtn')}</button></div>`;
}
