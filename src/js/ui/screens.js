
/* ---------- sprites in the UI ---------- */
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const main=()=>$('main');
const sprCreate=bgId=>({sex:CFG.sex,age:CFG.age,skin:CFG.skin,seed:hash(CFG.name||'x'),bg:bgId});
const sprGame=()=>{const p=G.p;return{sex:p.sex,age:p.age,skin:p.skin,seed:p.seed,bg:p.bg,inf:p.inf,hpP:p.hp/p.maxHp,marks:p.marks};};
const canvasHtml=(o,scale,cls,extra)=>`<canvas class="spr ${cls||''}" width="24" height="48" style="width:${24*scale}px;height:${48*scale}px" data-o="${esc(JSON.stringify(o))}" ${extra||''} aria-hidden="true"></canvas>`;
function paintAll(){document.querySelectorAll('canvas.spr').forEach(cv=>{try{spriteToCanvas(cv,JSON.parse(cv.dataset.o));}catch(e){}});}

let CFG={name:'',auto:true,sex:'m',age:32,loc:'random',bg:'random',road:5,skin:0};
let view='title';

/* ---------- language ---------- */
function updateHeader(){
  const h=$('hinfo');if(!h)return;
  if(view==='play'&&G&&G.cur){
    const tc=triage(),x=timeOf(G.w.day);
    h.innerHTML=`<span>${t('hSector')}: <strong>${locName(G.p.loc)}</strong></span><span>${t('year')}: <strong>${String(x.year).padStart(2,'0')}</strong></span><span>${t('hStatus')}: <strong class="st-${tc}">${tt('tri',tc)}</strong></span>`;
  }else h.innerHTML='';
}
function applyLang(){
  const r=document.documentElement;
  r.lang=LANG;r.dir=LANG==='he'?'rtl':'ltr';
  document.querySelectorAll('[data-act="lang"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===LANG)));
  const br=$('brand');if(br)br.textContent=t('brand');
  const tb=$('troBtn');if(tb)tb.textContent='🏆 '+t('trophies');
  const rb=$('restartBtn');if(rb){rb.textContent=t('restart');rb.style.display=view==='title'?'none':'';}
  document.title=t('brand');
  updateHeader();
}
function setLang(l){
  LANG=l;try{localStorage.setItem('daysafter.lang',l);}catch(e){}
  if(CFG.auto)CFG.name=randName(CFG.sex);
  rerender();
}
function rerender(){
  if(view==='title')renderTitle();
  else if(view==='create')renderCreate();
  else if(view==='play')renderPlay();
  else if(view==='end')renderEnd();
  else if(view==='trophies')renderTrophies();
  applyLang();
}

/* ---------- title ---------- */
function renderTitle(){
  view='title';
  const sv=load();
  const svYear=sv?Math.floor((sv.w.day-1)*sv.mpt/12)+1:0;
  main().innerHTML=`<section class="hero">
    <div class="langrow"><span class="small">Language / שפה</span>
      <div class="seg" role="group" aria-label="Language"><button data-act="lang" data-v="en" aria-pressed="${LANG==='en'}">English</button><button data-act="lang" data-v="he" aria-pressed="${LANG==='he'}">עברית</button></div></div>
    <h1 class="mega" aria-label="${t('brand')}">${LANG==='he'?'<span>ימים</span><span>אחרי</span>':'<span>Days</span><span>After</span>'}</h1>
    <div class="tape" aria-hidden="true"></div>
    <p class="lede">${t('lede')}</p>
    <h2 class="roadH">${t('roadH')}</h2>
    <div class="roads">${[5,15,20].map((n,i)=>{const r=tt('roads',n);return`<button class="road" data-act="road" data-v="${n}"><span class="rtag">${t('roadTag',i+1)}</span><b class="num">${r[0]}</b><span class="rt">${r[1]}</span><span class="rd">${r[2]}</span></button>`;}).join('')}</div>
    ${sv?`<div class="row"><button class="btn" data-act="continue">${t('cont',svYear,esc(sv.p.name))}</button></div>`:''}
    <div class="row"><button class="btn ghost" data-act="trophies">🏆 ${t('troBtn')} · ${Object.keys(META.ach).length+Object.keys(META.tro).length}</button></div>
    <div class="rules">${UI[LANG].rules.map(r=>`<div><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}</div>
  </section>`;
  applyLang();
}

/* ---------- creation ---------- */
function renderCreate(){
  view='create';
  if(!CFG.name)CFG.name=randName(CFG.sex);
  const ageBonus=b=>Object.entries(bgObj(b).bonus).map(([k,v])=>`+${v} ${statN(k)}`).join(', ');
  main().innerHTML=`<section><div class="create-grid">
    <div>
      <div class="sect"><h2>${t('road')}</h2>
        <div class="seg" role="group" aria-label="${t('road')}">${[5,15,20].map(n=>`<button data-act="roadseg" data-v="${n}">${t('yearsShort',n)}</button>`).join('')}</div>
        <p class="small" id="roadnote" style="margin-top:8px"></p></div>
      <div class="sect"><h2>${t('hWho')}</h2><p>${t('pWho')}</p>
        <div class="field"><label for="nm">${t('name')}</label><input type="text" id="nm" maxlength="20" value="${esc(CFG.name)}" autocomplete="off"><button class="btn sm" data-act="randname">${t('roll')}</button></div>
        <div class="field"><label>${t('sex')}</label><div class="seg" role="group" aria-label="${t('sex')}"><button data-act="sex" data-v="m">${t('male')}</button><button data-act="sex" data-v="f">${t('female')}</button></div></div>
        <div class="field"><label for="age">${t('age')}</label><input type="range" id="age" min="18" max="60" value="${CFG.age}"><span class="ageout num" id="ageout">${CFG.age}</span></div>
        <p class="small" id="agenote"></p>
        <div class="field" style="margin-top:12px"><label>${t('skin')}</label><div class="swatches">${SKINS.map((c,i)=>`<button class="sw" data-act="skin" data-v="${i}" style="background:${c}" aria-label="${t('skin')} ${i+1}"></button>`).join('')}</div></div>
      </div>
      <div class="sect"><h2>${t('hWhere')}</h2><p>${t('pWhere')}</p>
        <div class="board">
          ${LOC_ORDER.map(id=>{const l=LOCS[id];return`<button class="lrow" data-act="loc" data-v="${id}"><span class="code">${l.code}</span><span class="nm">${locName(id)}</span><span class="sev" title="${t('outbreak')} ${l.outbreak}%">${cellsHtml(l.outbreak,10,'out sm')}</span><span class="stg">${tt('stg',stageOf(l.outbreak))}</span></button>`;}).join('')}
          <button class="lrow" data-act="loc" data-v="random"><span class="code">?</span><span class="nm">${t('random')}</span><span></span><span class="stg">${t('unknown')}</span></button>
        </div>
        <div class="brief" id="brief"></div>
      </div>
      <div class="sect"><h2>${t('hBg')}</h2><p>${t('pBg')}</p>
        <div class="bgrid">
          ${BGS.map(b=>`<button class="brow" data-act="bg" data-v="${b.id}">${canvasHtml(sprCreate(b.id),2,'',`data-bgid="${b.id}"`)}<span class="btxt"><span class="nm" data-bgname="${b.id}">${bgN(b.id,CFG.sex)}</span><span class="pk">${bgPerk(b.id)}</span><span class="bn">${ageBonus(b.id)}</span></span></button>`).join('')}
          <button class="brow" data-act="bg" data-v="random">${canvasHtml(sprCreate('?'),2)}<span class="btxt"><span class="nm">${t('random')}</span><span class="pk">${t('pRandomBg')}</span></span></button>
        </div>
      </div>
    </div>
    <div class="tagwrap"><div id="tag"></div>
      <div class="startbar"><button class="btn primary" data-act="start">${t('begin')}</button><button class="btn" data-act="randall">${t('randAll')}</button></div>
    </div>
  </div></section>`;
  updateCreate();applyLang();
}
function updateCreate(){
  const q=(sel,f)=>document.querySelectorAll(sel).forEach(f);
  q('[data-act="sex"]',b=>b.setAttribute('aria-pressed',String(b.dataset.v===CFG.sex)));
  q('[data-act="loc"]',b=>b.setAttribute('aria-pressed',String(b.dataset.v===CFG.loc)));
  q('[data-act="bg"]',b=>b.setAttribute('aria-pressed',String(b.dataset.v===CFG.bg)));
  q('[data-act="roadseg"]',b=>b.setAttribute('aria-pressed',String(+b.dataset.v===CFG.road)));
  q('[data-act="skin"]',b=>b.setAttribute('aria-pressed',String(+b.dataset.v===CFG.skin)));
  q('[data-bgname]',n=>{n.textContent=bgN(n.dataset.bgname,CFG.sex);});
  q('canvas[data-bgid]',cv=>{cv.dataset.o=JSON.stringify(sprCreate(cv.dataset.bgid));});
  const rn=$('roadnote');if(rn)rn.textContent=tt('roads',CFG.road)[2];
  const al=tt('ageLbl',ageMods(CFG.age).label);
  $('agenote').textContent=`${al[0]}: ${al[1]}`;
  $('ageout').textContent=CFG.age;
  const brief=$('brief');
  if(CFG.loc==='random')brief.innerHTML=`<p>${t('pRandomLoc')}</p>`;
  else{const l=LOCS[CFG.loc];brief.innerHTML=`<p>${locBrief(CFG.loc)}</p><div class="meta"><span>${t('outbreak')}: <b>${tt('stg',stageOf(l.outbreak))}</b> (${l.outbreak}%)</span><span>${t('order')}: <b>${tt('ord',orderOf(l.order))}</b> (${l.order}%)</span></div>`;}
  const b=CFG.bg==='random'?null:bgObj(CFG.bg);
  const st=calcStats(CFG.age,b?b.id:null);
  const hp=50+st.health*5;
  const nm=CFG.name.trim()||'?';
  let stock=t('stockUnknown');
  if(CFG.loc!=='random'&&b){const s={...LOCS[CFG.loc].sup};if(b.id==='soldier')s.ammo+=3;if(b.id==='doctor')s.meds+=3;if(b.id==='politician')s.food+=1;stock=t('stockTxt',s.food,s.water,s.meds,s.ammo);}
  $('tag').innerHTML=`<div class="tag"><span class="hole"></span><div class="band">${tt('tri','green')}</div><div class="in">
    <div class="tagtop">${canvasHtml(sprCreate(b?b.id:'?'),4)}<div><div class="nm">${esc(nm)}</div>
      <div class="id">${t('idLine',tt('sexWord',CFG.sex),CFG.age)}<br>${b?bgN(b.id,CFG.sex):t('bgRandom')}${CFG.loc==='random'?'':`<br>${locName(CFG.loc)}`}<br>${t('yearsShort',CFG.road)}</div></div></div>
    ${STATS.map(k=>`<div class="srow"><span>${statN(k)}</span>${cellsHtml(st[k]*10,10,'st sm')}<span class="num">${st[k]}</span></div>`).join('')}
    <div class="stock">${t('maxHp',hp)} ${stock}</div></div></div>`;
  paintAll();
}
function startFromCreate(){
  const loc=CFG.loc==='random'?pick(LOC_ORDER):CFG.loc;
  const bg=CFG.bg==='random'?pick(BGS).id:CFG.bg;
  const name=(CFG.name||'').trim()||randName(CFG.sex);
  newGame({name,sex:CFG.sex,age:CFG.age,loc,bg,road:CFG.road,skin:CFG.skin});
  renderPlay();
}

/* ---------- play ---------- */
function triage(){
  const p=G.p,hpP=p.hp/p.maxHp;
  if(p.inf>=70||hpP<.25)return'red';
  if(p.inf>=35||hpP<.55)return'yellow';
  return'green';
}
function renderPlay(){
  view='play';
  main().innerHTML=`<section class="play"><div class="vitals" id="vitals"></div>
    <div class="play-grid"><div><div id="overnight"></div><div class="stage" id="stage"></div></div><aside class="side" id="side"></aside></div></section>`;
  refresh();applyLang();
}
function refresh(){renderVitals();renderSide();renderStage();paintAll();updateHeader();}
const cellsHtml=(pct,n,cls)=>{let on=Math.round(clamp(pct,0,100)/100*n);if(pct>0&&on===0)on=1;return`<div class="cells ${cls||''}" aria-hidden="true">${Array.from({length:n},(_,k)=>`<i class="${k<on?'on':''}"></i>`).join('')}</div>`;};
const meterHtml=(label,valTxt,cls,pct)=>`<div class="meter"><div class="mlab"><span>${label}</span><b class="num">${valTxt}</b></div>${cellsHtml(pct,20,cls)}</div>`;
function trioHtml(){
  const p=G.p,mk=marksOf(),M=UI[LANG].marks;
  const scars=mk.length?`<ul>${mk.map(m=>`<li title="${esc(M[m][1])}"><b>${M[m][0]}</b><span>${M[m][1]}</span></li>`).join('')}</ul>`:`<p class="small">${t('noMarks')}</p>`;
  const squad=p.group.length?`<ul>${p.group.map(m=>{const R=UI[LANG].roles[m.role]||UI[LANG].roles.kin;return`<li title="${esc(R[1])}"><b>${esc(pn(m))}</b><em class="role">${R[0]}</em><span>${esc(pt(m))}</span><span class="loy" title="${t('loyalty')}">${'●'.repeat(m.loy)}${'○'.repeat(3-m.loy)}</span></li>`;}).join('')}</ul>`:`<p class="small">${t('alone')}</p>`;
  const jr=journalHtml(G.log.slice(-3).reverse())||`<p class="small">${t('nothing')}</p>`;
  return`<div class="trio"><div class="tcol"><div class="tlab">${t('hMarks')}</div>${scars}</div><div class="tcol"><div class="tlab">${t('hGroup')}</div>${squad}</div><div class="tcol"><div class="tlab">${t('hJournal')}</div>${jr}</div></div>`;
}
function renderVitals(){
  const p=G.p,tc=triage(),x=timeOf(G.w.day);
  const canMeds=p.sup.meds>0&&!G.cur.res&&!G.over;
  const doc=p.bg==='doctor';
  $('vitals').innerHTML=`<div class="daybox"><small>${t('year')}</small><b class="num">${String(x.year).padStart(2,'0')}</b><em>${seasonN(x.season)}</em></div>
   <div class="vmain">
     <div class="vtop"><span class="tri ${tc}"><i></i>${t('cond')}: ${tt('tri',tc)}</span>
       <div class="sup"><span title="${supN('food')}">🥫 ${p.sup.food}</span><span title="${supN('water')}">💧 ${p.sup.water}</span><span title="${supN('meds')}">💊 ${p.sup.meds}</span><span title="${supN('ammo')}">🔫 ${p.sup.ammo}</span></div></div>
     <div class="vbars">
       ${meterHtml(t('hp'),`${p.hp} / ${p.maxHp}`,'hp',p.hp/p.maxHp*100)}
       ${meterHtml(t('inf'),`${p.inf}%`,'inf',p.inf)}
       ${meterHtml(t('mor'),`${p.morale}%`,'mor',p.morale)}
     </div>
     ${trioHtml()}
     <div class="prog" title="${t('decision',G.w.day,G.total)}"><i style="width:${(G.w.day-1)/G.total*100}%"></i></div>
     <div class="vact"><button class="btn sm" data-act="meds" ${canMeds?'':'disabled'}>${t('meds')}</button>
       <span class="note" id="note" role="status">${canMeds?t('medsNote',doc?30:20,doc?38:25):''}</span>
       <span class="small pr">${t('decision',G.w.day,G.total)}</span></div>
   </div>`;
}
const trendOf=(v,prev,upGood)=>{if(prev==null||v===prev)return'';const up=v>prev;const good=up===upGood;return`<span class="tr ${good?'good':'bad'}" title="${(up?'+':'\u2212')+Math.abs(v-prev)}">${up?'\u25B2':'\u25BC'}${Math.abs(v-prev)}</span>`;};
const gauge=(label,v,cls,word,arrow)=>meterHtml(label,`${word}, ${v}%${arrow||''}`,cls,v);
function marksOf(){
  const p=G.p,m=p.marks.slice();
  if(p.humanity>=75)m.push('trusted');
  if(p.humanity<25)m.push('ruthless');
  return m;
}
function renderSide(){
  const p=G.p,w=G.w;
  $('side').innerHTML=`<section class="panel p-world"><div class="plabel">${t('hWorld')}</div>
     ${gauge(t('outbreak'),w.outbreak,'out',tt('stg',stageOf(w.outbreak)),trendOf(w.outbreak,w.prev&&w.prev.o,false))}
     ${gauge(t('order'),w.order,'ord',tt('ord',orderOf(w.order)),trendOf(w.order,w.prev&&w.prev.r,true))}
     ${gauge(t('yourHum'),p.humanity,'hum',tt('hum',humOf(p.humanity)),trendOf(p.humanity,w.prev&&w.prev.h,true))}
   </section>
   <section class="panel p-file"><div class="plabel">${t('hFile')}<span class="nm">${esc(p.name)}</span></div>
     <div class="sprrow">${canvasHtml(sprGame(),4)}<div>
       <div class="who">${locName(p.loc)}<br>${bgN(p.bg,p.sex)}, ${p.age}</div>
       ${STATS.map(k=>`<div class="srow"><span>${statN(k)}</span>${cellsHtml(p.stats[k]*10,10,'st sm')}<span class="num">${p.stats[k]}</span></div>`).join('')}
     </div></div>
   </section>`;
}
function journalHtml(list){
  if(!list.length)return'';
  return`<ul class="jr">${list.map(l=>{
    const ev=EVMAP[l.ev];
    const ti=l.T?Lx(l.T):tTitle(ev,{member:{name:'x'}});
    const lb=l.Lb?Lx(l.Lb):tChoice(ev,l.ci).label;
    return`<li><span class="d num">${l.day}</span><span class="t"><span class="mk ${l.ok===true?'ok':l.ok===false?'no':''}"></span><b>${esc(ti)}</b><br>${esc(lb)}</span></li>`;
  }).join('')}</ul>`;
}
const riskClass=p=>p>=.7?'g':p>=.4?'y':'r';
const riskWord=p=>p>=.8?tt('odds','safe'):p>=.6?tt('odds','good'):p>=.4?tt('odds','risky'):tt('odds','long');
function whyText(w){
  if(w.k==='needsBg')return t('needsBg',w.bgs.map(b=>bgN(b,'m')).join(LANG==='he'?' או ':' or '));
  if(w.k==='lack')return t('lack',supN(w.res));
  return t(w.k);
}
function tipText(c,ch){
  const P=UI[LANG].parts,st=ch.check.stat;
  const list=c.parts.map(([k,v])=>k==='stat'?P.stat(statN(st),v):k==='bg'?P.bg(bgN(G.p.bg,G.p.sex),v):P[k](v));
  return list.join(', ')+'. '+t('tipEnd',c.dc);
}
function noteText(n){
  const N=UI[LANG].notes;
  switch(n.k){
    case'rations':return N.rations(n.n,n.g);
    case'recover':return N.recover(n.n);
    case'slip':return N.slip(n.o,n.r);
    case'birthday':return N.birthday(n.age);
    case'perk':return N.perk(pn({name:n.name}),n.res,n.n,CHIPL[LANG][n.res==='hp'?'hp':n.res]);
    default:return N[n.k]();
  }
}
function chipText(c0){
  const c=c0.name==='*'?{...c0,name:ctxName()}:c0;
  if(c.t==='stat')return t('statGain',statN(c.k),c.d);
  if(c.t==='join')return t('joins',pn({name:c.name}),isF({name:c.name}));
  if(c.t==='gone')return t('gone',pn({name:c.name}),isF({name:c.name}));
  if(c.t==='mark')return t('markGain',UI[LANG].marks[c.m][0]);
  if(c.t==='flag')return UI[LANG].flagChip[c.f];
  if(c.t==='unflag')return UI[LANG].unflagChip[c.f]||'';
  if(c.t==='bond')return t('bondChip',pn({name:c.name}),isF({name:c.name}));
  if(c.t==='loy')return t('loyChip',pn({name:c.name}),c.d,isF({name:c.name}));
  if(c.t==='loyAll')return t('loyAllChip',c.d);
  if(c.k)return`${CHIPL[LANG][c.k]} ${c.d>0?'+':'\u2212'}${Math.abs(c.d)}`;
  return'';
}
function edgeText(e){
  if(!e||(!e.pos.length&&!e.neg.length))return'';
  const E=UI[LANG].edge,j=a=>a.map(k=>E[k]).join(t('andW'));
  const out=[];
  if(e.pos.length)out.push(t('edgePos')+j(e.pos)+'.');
  if(e.neg.length)out.push(t('edgeNeg')+j(e.neg)+'.');
  return out.join(' ');
}
const chipsLine=chips=>chips.length?chips.map(chipText).filter(Boolean).join(', '):t('nothingChanges');
let ROLL=null;
const rollKey=()=>G.w.day+':'+G.cur.id;
const rolling=()=>!!(ROLL&&ROLL.active&&G&&G.cur&&G.cur.res&&ROLL.key===rollKey());
function cardsHtml(res,done){
  const ch=getView().choices[res.ci],pct=Math.round(res.p*100);
  const win=res.ok===true,lose=res.ok===false;
  return`<div class="rcards ${done?'':'rolling'}">
    <div class="rcard good ${done?(win?'win':'lost'):''}"><b class="num">${pct}%</b><span>${esc(chipsLine(previewChips(ch.win)))}</span></div>
    <div class="rcard bad ${done?(lose?'win':'lost'):''}"><b class="num">${100-pct}%</b><span>${esc(chipsLine(previewChips(ch.lose)))}</span></div></div>`;
}
function renderStage(){
  const ev=EVMAP[G.cur.id],res=G.cur.res;
  const on=$('overnight');
  on.innerHTML=(G.notes&&G.notes.length&&!res)?`<div class="overnight">${G.notes.map(n=>`<p>${esc(noteText(n))}</p>`).join('')}</div>`:'';
  const view=getView();
  let body='';
  if(!res){
    body=`<p class="prose">${esc(vText())}</p><div class="choices">${G.cur.opts.map((ci,pos)=>choiceHtml(view,ci,pos)).join('')}</div>`;
  }else{
    const lab=vChoice(res.ci).label,isRoll=res.ok!==null;
    if(rolling()){
      body=`<p class="done">${t('chose')} ${esc(lab)}</p><h3 class="rtitle">${t('rolling')}</h3>${cardsHtml(res,false)}<div class="skipwrap"><button class="btn sm ghost" data-act="skip">${t('skip')}</button></div>`;
    }else{
      body=`<p class="done">${t('chose')} ${esc(lab)}</p>
        ${isRoll?cardsHtml(res,true)+`<p class="edge">${esc(edgeText(res.edges))}</p>`:''}
        <div class="result ${res.ok===true?'ok':res.ok===false?'fail':''}">
          <p class="prose">${esc(vResult(res))}</p>
          ${res.chips.length?`<div class="chips">${res.chips.map(c=>`<span class="chip ${c.c}"><i></i>${esc(chipText(c))}</span>`).join('')}</div>`:''}
        </div>
        <div class="after"><button class="btn primary" data-act="next" id="nextBtn">${G.over?t('seeEnd'):(()=>{const x=timeOf(Math.min(G.w.day+1,G.total));return t('next',x.year,seasonN(x.season));})()}</button></div>`;
    }
  }
  $('stage').innerHTML=`<div class="shead"><span>${timeText()}</span><span>${locName(G.p.loc)}</span></div><div class="sbody"><h2>${esc(vTitle())}</h2><p class="sit">${esc(sitLine()[LANG])}</p>${body}</div>`;
  if(res&&!rolling()){const nb=$('nextBtn');if(nb&&nb.focus)nb.focus({preventScroll:true});flushToasts();}
}
function choiceHtml(view,ci,pos){
  const ch=view.choices[ci],a=avail(ch),tc=vChoice(ci);
  const pills=[];
  if(ch.tag)pills.push(`<span class="pill">${ch.tag.map(b=>bgN(b,'m')).join(' / ')}</span>`);
  if(ch.cost)for(const k in ch.cost)pills.push(`<span class="pill o">${t('costs',ch.cost[k],supN(k))}</span>`);
  if(!a.ok)pills.push(`<span class="pill o">${esc(whyText(a.why))}</span>`);
  return`<button class="choice${a.ok?'':' dis'}" data-act="choose" data-i="${ci}" ${a.ok?'':'disabled'}>
    <span class="k num">${pos+1}</span><span><span class="lab">${esc(tc.label)}</span><span class="sub">${esc(tc.sub||'')}</span></span>
    ${pills.length?`<span class="meta">${pills.join('')}</span>`:''}</button>`;
}
const reduced=()=>{try{return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){return false;}};
function finishRoll(){
  if(!ROLL||!ROLL.active)return;
  clearTimeout(ROLL.timer);ROLL.active=false;
  if(G&&G.cur&&G.cur.res)refresh();
}
function doChoose(ci){
  if(!choose(ci))return;
  const res=G.cur.res;
  if(res.ok!==null){
    ROLL={key:rollKey(),active:true};
    renderStage();
    ROLL.timer=setTimeout(finishRoll,reduced()?500:1800);
  }else refresh();
  const st=$('stage');if(st&&st.scrollIntoView)st.scrollIntoView({behavior:'smooth',block:'start'});
}
function doNext(){
  if(ROLL){clearTimeout(ROLL.timer);ROLL.active=false;}
  const r=nextStep();
  if(r==='end')renderEnd();else{renderPlay();window.scrollTo({top:0});}
}
function doMeds(){
  const r=useMeds();
  if(r){refresh();const n=$('note');if(n)n.textContent=t('medsUsed',r.h,r.i);}
}

/* ---------- ending ---------- */
function endKey(){
  const o=G.over,p=G.p;
  if(o.type==='death')return'death';
  if(o.type==='turned')return'turned';
  if(p.humanity>=65&&G.w.order>=50)return'good';
  if(p.humanity<30)return'dark';
  if(G.w.outbreak>=85)return'dead';
  return'def';
}
function epilogue(){
  const o=G.over,p=G.p,E=UI[LANG].e;
  if(o.type==='turned')return E.turned;
  if(o.type==='death'){
    const c=o.cause||{};
    if(c.ev){const ev=EVMAP[c.ev];const ti=c.T?Lx(c.T):tTitle(ev,{member:{name:'x'}});const lb=c.Lb?Lx(c.Lb):tChoice(ev,c.ci).label;return E.death(`${ti}: ${lb}`);}
    return E.deathR(E.causes[c.r]||E.causes.night);
  }
  const names=p.group.map(pn),hum=p.humanity;
  const parts=[E.years(ROADS[G.cfg.road].years),G.flags.settled?E.settled:E.nomad];
  if(G.flags.cure)parts.push(E.cure);
  parts.push(names.length?E.group(LANG==='he'?listHe(names):listNames(names),names.length):E.alone);
  parts.push(hum>=70?E.humHi:hum<30?E.humLo:E.humMid);
  parts.push(G.w.outbreak>=80?E.worldDead:G.w.order>=60&&G.w.outbreak<45?E.worldGood:E.worldMid);
  parts.push(E.age(p.age));
  return parts.join(' ');
}
function renderEnd(){
  view='end';
  const o=G.over,p=G.p,w=G.w,k=endKey(),F=UI[LANG].facts;
  const band=o.type==='survived'?'green':o.type==='turned'?'y':'red';
  const legacy=Object.keys(G.flags).filter(f=>LEGACY[LANG][f]).map(f=>LEGACY[LANG][f]);
  const yrs=o.type==='survived'?ROADS[G.cfg.road].years:((w.day-1)*G.mpt/12);
  const yrsTxt=(Math.round(yrs*10)/10).toString();
  main().innerHTML=`<section class="end">
    <div class="small">${esc(p.name)}, ${locName(p.loc)}, ${timeText()}</div>
    <h1>${UI[LANG].endT[k]}</h1>
    <div class="band ${band}"></div>
    <div class="endgrid">
      <div>
        <div class="endpic">${canvasHtml(sprGame(),6,o.type==='death'?'dead':o.type==='turned'?'turned':'')}<p class="prose">${esc(epilogue())}</p></div>
        ${legacy.length?`<h2 class="head" style="font-size:1.6rem;margin:26px 0 8px">${t('legacyH')}</h2><ul class="legacy">${legacy.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>`:''}
        ${runTrophiesHtml()}
        <div class="row" style="margin-top:28px"><button class="btn primary" data-act="new">${t('newSurvivor')}</button><button class="btn" data-act="retry">${t('retry',esc(p.name))}</button></div>
      </div>
      <div>
        <div class="facts">
          <div class="fact"><b class="num">${yrsTxt}</b>${F.years}</div>
          <div class="fact"><b class="num">${G.log.length}</b>${F.dec}</div>
          <div class="fact"><b class="num">${p.age}</b>${F.age}</div>
          <div class="fact"><b class="num">${p.group.length}</b>${F.group}</div>
          <div class="fact"><b class="num">${w.outbreak}%</b>${F.out}: ${tt('stg',stageOf(w.outbreak))}</div>
          <div class="fact"><b class="num">${w.order}%</b>${F.ord}: ${tt('ord',orderOf(w.order))}</div>
          <div class="fact"><b class="num">${p.humanity}%</b>${F.hum}: ${tt('hum',humOf(p.humanity))}</div>
        </div>
        <div class="panel p-log" style="margin-top:22px"><div class="plabel">${t('everyH')}</div>${journalHtml(G.log)}</div>
      </div>
    </div></section>`;
  paintAll();applyLang();window.scrollTo({top:0});flushToasts();
}

/* ---------- restart ---------- */
function showModal(){
  $('modal').innerHTML=`<div class="modal"><div class="dlg" role="dialog" aria-modal="true"><h3>${t('restartH')}</h3><p>${t('restartP')}</p>
    <div class="row"><button class="btn primary" data-act="mSame">${t('restartSame')}</button><button class="btn" data-act="mNew">${t('restartNew')}</button><button class="btn ghost" data-act="mCancel">${t('cancel')}</button></div></div></div>`;
  const b=document.querySelector('[data-act="mSame"]');if(b&&b.focus)b.focus();
}
const closeModal=()=>{$('modal').innerHTML='';};
function freshCfg(road){return{name:'',auto:true,sex:'m',age:32,loc:'random',bg:'random',road:road||5,skin:0};}

/* ---------- wiring ---------- */
document.addEventListener('click',e=>{
  const t0=e.target.closest('[data-act]');if(!t0||t0.disabled)return;
  const a=t0.dataset.act,v=t0.dataset.v;
  if(a==='lang')return setLang(v);
  if(a==='home'){e.preventDefault();closeModal();return renderTitle();}
  if(a==='trophies'){closeModal();return renderTrophies();}
  if(a==='troBack')return leaveTrophies();
  if(a==='troTab'){TROTAB=v;return renderTrophies();}
  if(a==='road'){CFG=freshCfg(+v);return renderCreate();}
  if(a==='new'){CFG=freshCfg(G&&G.cfg?G.cfg.road:CFG.road);return renderCreate();}
  if(a==='continue'){const s=load();if(s){G=s;renderPlay();}return;}
  if(a==='restart'){if(view==='create'){CFG=freshCfg(CFG.road);return renderCreate();}if(G&&(view==='play'||view==='end'))return showModal();return;}
  if(a==='mCancel')return closeModal();
  if(a==='mSame'){closeModal();if(G&&G.cfg){newGame(G.cfg);renderPlay();window.scrollTo({top:0});}return;}
  if(a==='mNew'){closeModal();CFG=freshCfg(G&&G.cfg?G.cfg.road:5);return renderCreate();}
  if(a==='randname'){CFG.name=randName(CFG.sex);CFG.auto=true;$('nm').value=CFG.name;return updateCreate();}
  if(a==='sex'){CFG.sex=v;if(CFG.auto){CFG.name=randName(v);$('nm').value=CFG.name;}return updateCreate();}
  if(a==='loc'){CFG.loc=v;return updateCreate();}
  if(a==='bg'){CFG.bg=v;return updateCreate();}
  if(a==='roadseg'){CFG.road=+v;return updateCreate();}
  if(a==='skin'){CFG.skin=+v;return updateCreate();}
  if(a==='randall'){CFG.sex=pick(['m','f']);CFG.age=18+rnd(43);CFG.name=randName(CFG.sex);CFG.auto=true;CFG.loc='random';CFG.bg='random';CFG.skin=rnd(4);return renderCreate();}
  if(a==='start')return startFromCreate();
  if(a==='choose')return doChoose(+t0.dataset.i);
  if(a==='skip')return finishRoll();
  if(a==='meds')return doMeds();
  if(a==='next')return doNext();
  if(a==='retry'){if(G&&G.cfg){newGame(G.cfg);renderPlay();}return;}
});
document.addEventListener('input',e=>{
  if(e.target.id==='nm'){CFG.name=e.target.value;CFG.auto=false;updateCreate();}
  if(e.target.id==='age'){CFG.age=+e.target.value;updateCreate();}
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeModal();
  if(view!=='play'||!G||!G.cur||G.cur.res)return;
  if($('modal')&&$('modal').innerHTML)return;
  if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;
  const n=parseInt(e.key,10);
  if(n>=1&&n<=2&&G.cur.opts[n-1]!==undefined)doChoose(G.cur.opts[n-1]);
});
(function init(){
  let l=null;
  try{l=localStorage.getItem('daysafter.lang');}catch(e){}
  if(!l){try{l=(navigator.language||'en').toLowerCase().indexOf('he')===0?'he':'en';}catch(e){l='en';}}
  LANG=l==='he'?'he':'en';
  renderTitle();
})();
