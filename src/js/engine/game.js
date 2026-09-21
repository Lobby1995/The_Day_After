
/* ---------- engine ---------- */
const NUM=['hp','inf','morale','humanity','food','water','meds','ammo','outbreak','order'];
const CHIPGOOD={hp:1,inf:-1,morale:1,humanity:1,food:1,water:1,meds:1,ammo:1,outbreak:-1,order:1};
const FLAGCHIPS={base:1,nomad:1,leader:1,raiderAlly:1,raiderEnemy:-1,settled:1,garden:1,rifle:1,filter:1,map:1,cure:1};
const isSup=k=>SUPS.indexOf(k)>=0;
const isWorld=k=>k==='outbreak'||k==='order';
function getV(k){return isWorld(k)?G.w[k]:isSup(k)?G.p.sup[k]:G.p[k];}
function setV(k,v){
  if(isWorld(k))G.w[k]=clamp(v,0,100);
  else if(isSup(k))G.p.sup[k]=Math.max(0,v);
  else if(k==='hp')G.p.hp=clamp(v,0,G.p.maxHp);
  else G.p[k]=clamp(v,0,100);
}
const evText=(t,ctx)=>typeof t==='function'?t(G,ctx):t;
const evTitle=(ev,ctx)=>typeof ev.title==='function'?ev.title(G,ctx):ev.title;
const getView=()=>G.cur.dyn||EVMAP[G.cur.id];

function save(){
  try{
    if(G&&G.over)localStorage.removeItem(KEY);
    else if(G)localStorage.setItem(KEY,JSON.stringify(G));
  }catch(e){}
}
function load(){
  try{const s=localStorage.getItem(KEY);if(!s)return null;const g=JSON.parse(s);return g&&g.v===4&&g.cur&&EVMAP[g.cur.id]?g:null;}catch(e){return null;}
}

function newGame(cfg){
  const loc=LOCS[cfg.loc],bg=bgObj(cfg.bg),road=ROADS[cfg.road]||ROADS[5];
  const stats=calcStats(cfg.age,cfg.bg);
  const sup={...loc.sup},flags={...loc.flags};
  if(bg.id==='soldier'){sup.ammo+=3;flags.armed=1;}
  if(bg.id==='doctor'){sup.meds+=3;}
  if(bg.id==='politician'){sup.food+=1;flags.contacts=1;}
  if(bg.id==='journalist'){flags.radio=1;}
  if(bg.id==='firefighter'){flags.axe=1;}
  if(bg.id==='mechanic'){flags.toolkit=1;}
  if(bg.id==='student'){flags.phone=1;}
  const maxHp=50+stats.health*5;
  let h=7;const nm=cfg.name||'x';for(let i=0;i<nm.length;i++)h=(h*31+nm.charCodeAt(i))>>>0;
  G={v:4,cfg:{...cfg},total:road.turns,mpt:road.mpt,scale:road.turns/20,
     p:{name:cfg.name,sex:cfg.sex,age:cfg.age,skin:cfg.skin|0,seed:h,loc:cfg.loc,bg:cfg.bg,stats,hp:maxHp,maxHp,inf:0,morale:70,humanity:50,sup,group:[],marks:[]},
     w:{day:1,outbreak:loc.outbreak,order:loc.order},
     flags,fday:{},st:freshStats(),toasts:[],seen:[],recent:[],log:[],notes:[],cur:null,over:null,last:null};
  G.pro=prologueFor(G.p).filter(id=>EVMAP[id]);
  startTurn();
}

const seenCount=id=>G.seen.filter(x=>x===id).length;
const capOf=e=>e.max||(e.once?1:99);
function pickEvent(){
  const d=G.w.day;
  if(d===1){
    /* the prologue: the first hours of day one play as a short run of scenes, ending with the country's night */
    if(G.pro&&G.pro.length)return EVMAP[G.pro.shift()];
    return EVMAP['open_'+G.p.loc];
  }
  const yr=timeOf(d).year;
  if(yr>(G.flags.yrDone||1)){G.flags.yrDone=yr;if(G.total<=20||(yr-1)%3===0)return EVMAP.year_review;}
  /* the world throws you a lifeline when you are truly out: something to scavenge nearby */
  if((G.p.sup.food<=0||G.p.sup.water<=0)&&Math.random()<.4){
    const L=EVENTS.filter(e=>e.id.indexOf('loot_')===0&&seenCount(e.id)<capOf(e)&&G.recent.indexOf(e.id)<0&&(!e.cond||e.cond()));
    if(L.length)return pick(L);
  }
  /* the plot comes first: a chapter whose time has come is played before anything random */
  const chap=dueChapter();
  if(chap)return chap;
  const pool=EVENTS.filter(e=>!e.open&&!e.story&&e.id!=='year_review'&&seenCount(e.id)<capOf(e)&&G.recent.indexOf(e.id)<0&&(!e.cond||e.cond()));
  if(!pool.length)return EVMAP.quiet_night;
  const ws=pool.map(e=>{
    let w=Math.max(0,typeof e.w==='function'?e.w():(e.w||6));
    if(e.wild){if(G.flags.settled)w*=.35;else if(G.flags.base)w*=.6;else if(G.flags.nomad)w*=1.25;}
    return w;
  });
  let t=ws.reduce((a,b)=>a+b,0),r=Math.random()*t;
  for(let i=0;i<pool.length;i++){r-=ws[i];if(r<=0)return pool[i];}
  return pool[pool.length-1];
}

/* exactly two options per question. background specials replace the weaker option; unaffordable options are swapped out */
function optionsFor(view){
  const src=EVMAP[G.cur.id],chs=view.choices,all=chs.map((c,i)=>i);
  const okBg=i=>!chs[i].tag||chs[i].tag.indexOf(G.p.bg)>=0;
  let spec=view.pair||src.pair;if(typeof spec==='function')spec=spec();
  let list=(spec||all).filter(okBg).slice(0,2);
  all.filter(i=>chs[i].tag&&okBg(i)&&list.indexOf(i)<0).forEach(tg=>{
    let k=list.length-1;while(k>=0&&chs[list[k]].tag)k--;
    if(k>=0)list[k]=tg;else if(list.length<2)list.push(tg);
  });
  const usable=i=>avail(chs[i]).ok;
  const rest=all.filter(i=>okBg(i)&&list.indexOf(i)<0);
  list=list.map(i=>{
    if(usable(i))return i;
    const j=rest.find(usable);
    if(j!==undefined){rest.splice(rest.indexOf(j),1);return j;}
    return i;
  });
  while(list.length<2&&rest.length)list.push(rest.shift());
  return list;
}
function startTurn(){
  G.w.prev={o:G.w.outbreak,r:G.w.order,h:G.p.humanity};
  const ev=pickEvent();
  const ctx=ev.pre?ev.pre():{};
  G.cur={id:ev.id,ctx,res:null,dyn:null,opts:null};
  if(ev.build)G.cur.dyn=ev.build(ctx);
  const opts=optionsFor(G.cur.dyn||ev);
  if(Math.random()<.5)opts.reverse();
  G.cur.opts=opts;
  G.seen.push(ev.id);
  G.recent.push(ev.id);if(G.recent.length>3)G.recent.shift();
  save();
}

/* choices made earlier that shift the odds of later ones, by the stat being tested. keys are flags. */
const FLAG_MODS={
  dil_armed:{strength:1,charisma:-1},   // took the rifle: harder to beat, harder to trust
  dil_hydrated:{stamina:1},             // took the water: goes further
  dil_dark:{stealth:1},                 // kept the dark: learned to be unseen
  dil_boy:{charisma:1},                 // gave the dose to the child: people trust a face like that
  dil_pharmacist:{wits:1},              // kept the one who knew: a map, and a way of thinking
  dil_delivered:{charisma:1}            // kept a promise to a stranger
};
/* the odds of the good outcome. parts describe what tipped it, for the "in your favor / against you" line */
function chance(ch){
  const c=ch.check;
  if(c.p!=null)return{p:clamp(c.p,.15,.85),parts:[]};
  const st=G.p.stats[c.stat];
  let val=st;const parts=[['stat',st]];
  if(c.bg&&c.bg[G.p.bg]){val+=c.bg[G.p.bg];parts.push(['bg',c.bg[G.p.bg]]);}
  if(c.mod){const m=c.mod();if(m){val+=m;parts.push(['sit',m]);}}
  const gl=G.p.group.length,F=G.flags;
  if(c.stat==='stealth'){
    if(hasRole('scout')){val+=1;parts.push(['role',1]);}
    else if(gl>=2){val-=1;parts.push(['noise',-1]);}
  }else if(gl>=1){const gb=gl>=3?2:1;val+=gb;parts.push(['group',gb]);}
  if(c.stat==='strength'&&hasRole('fighter')){val+=1;parts.push(['role',1]);}
  if(c.stat==='wits'&&hasRole('tech')){val+=1;parts.push(['role',1]);}
  if(c.stat==='charisma'&&hasRole('leader')){val+=1;parts.push(['role',1]);}
  if(c.stat==='stamina'&&hasRole('driver')){val+=1;parts.push(['role',1]);}
  if(F.leader&&gl>=1&&c.stat!=='stealth'){val+=1;parts.push(['group',1]);}
  if(F.rifle&&c.stat==='strength'){val+=1;parts.push(['gear',1]);}
  if(F.map&&(c.stat==='stamina'||c.stat==='stealth')){val+=1;parts.push(['gear',1]);}
  if(F.filter&&c.water){val+=2;parts.push(['gear',2]);}
  if(F.nomad&&c.stat==='stamina'){val+=1;parts.push(['gear',1]);}
  /* what you chose earlier changes what you are good at now */
  for(const f in FLAG_MODS){const d=FLAG_MODS[f][c.stat];if(F[f]&&d){val+=d;parts.push(['past',d]);}}
  const M=G.p.marks;
  if(M.indexOf('limp')>=0&&(c.stat==='stamina'||c.stat==='stealth')){val-=1;parts.push(['limp',-1]);}
  if(M.indexOf('scarred')>=0&&c.stat==='charisma'){val-=1;parts.push(['scarred',-1]);}
  if(G.p.humanity>=75&&c.stat==='charisma'){val+=1;parts.push(['trusted',1]);}
  if(G.p.humanity<25){
    if(c.stat==='strength'){val+=1;parts.push(['ruthless',1]);}
    if(c.stat==='charisma'){val-=1;parts.push(['ruthless',-1]);}
  }
  if(c.stat==='charisma'){if(G.w.order>=60){val+=1;parts.push(['order',1]);}else if(G.w.order<25){val-=1;parts.push(['order',-1]);}}
  if(G.p.morale<25){val-=1;parts.push(['morale',-1]);}
  if(G.p.hp<G.p.maxHp*.3){val-=1;parts.push(['hurt',-1]);}
  {const yr=timeOf(G.w.day).year;let yp=Math.floor((yr-1)/5);if(G.flags.settled)yp=0;else if(G.flags.base)yp=Math.floor(yp/2);if(yp){val-=yp;parts.push(['years',-yp]);}}
  let dc=c.dc;
  if(c.danger){const dp=Math.floor(G.w.outbreak/25);if(dp){dc+=dp;parts.push(['danger',dp]);}}
  /* a real coin: even footing is a bit better than 50%, each point of edge is worth ~5.5% */
  const p=clamp(.5+.055*(val-dc+3),.15,.85);
  return{p:Math.round(p*20)/20,parts};
}
function edgeKeys(c){
  const pos=[],neg=[],add_=(l,k)=>{if(l.indexOf(k)<0)l.push(k);};
  c.parts.forEach(([k,v])=>{
    if(k==='bg')add_(pos,'training');
    else if(k==='group'||k==='role')add_(pos,'group');
    else if(k==='gear')add_(pos,'gear');
    else if(k==='trusted')add_(pos,'rep');
    else if(k==='sit')add_(v>0?pos:neg,'situation');
    else if(k==='danger')add_(neg,'outbreak');
    else if(k==='limp'||k==='scarred')add_(neg,'marks');
    else if(k==='ruthless')add_(v>0?pos:neg,'rep');
    else if(k==='morale'||k==='hurt')add_(neg,'state');
    else if(k==='noise')add_(neg,'noise');
    else if(k==='years')add_(neg,'years');
    else if(k==='order')add_(v>0?pos:neg,'order');
    else if(k==='past')add_(v>0?pos:neg,'past');
  });
  return{pos,neg};
}
function avail(ch){
  if(ch.tag&&ch.tag.indexOf(G.p.bg)<0)return{ok:false,locked:true,why:{k:'needsBg',bgs:ch.tag}};
  if(ch.cost)for(const k in ch.cost)if(G.p.sup[k]<ch.cost[k])return{ok:false,why:{k:'lack',res:k}};
  if(ch.need&&!ch.need())return{ok:false,why:{k:ch.needKey||'unavailable'}};
  return{ok:true};
}

/* what an outcome does to the numbers. depletion and doctor scaling live here so previews and results agree */
function scaledFx(fx,cost){
  const f={...fx};
  if(cost&&cost.meds&&G.p.bg==='doctor'){
    if(f.hp>0)f.hp=Math.round(f.hp*1.5);
    if(f.inf<0)f.inf=Math.round(f.inf*1.5);
  }
  const yr=timeOf(G.w.day).year,depl=G.flags.settled?1:Math.max(.3,1-.085*(yr-1));
  SUPS.forEach(k=>{
    if(f[k]>0){
      if(depl<1)f[k]=Math.max(1,Math.round(f[k]*depl));
      if(G.flags.nomad&&f[k]>=2)f[k]+=1;
    }
  });
  return f;
}
function previewChips(fx){
  const f=scaledFx(fx),chips=[];
  NUM.forEach(k=>{const d=f[k]||0;if(d)chips.push({c:(d*CHIPGOOD[k])>0?'good':'bad',k,d});});
  if(f.stat)for(const k in f.stat)chips.push({c:f.stat[k]>0?'good':'bad',t:'stat',k,d:f.stat[k]});
  if(f.mark)chips.push({c:'bad',t:'mark',m:f.mark});
  if(f.join)chips.push({c:'good',t:'join',name:f.join.name});
  if(f.lose)chips.push({c:'bad',t:'gone',name:f.lose==='ctx'?'*':f.lose});
  [].concat(f.flag||[]).forEach(x=>{if(FLAGCHIPS[x])chips.push({c:FLAGCHIPS[x]>0?'good':'bad',t:'flag',f:x});else if(x.indexOf('bond_')===0)chips.push({c:'good',t:'bond',name:x.slice(5)});});
  [].concat(f.unflag||[]).forEach(x=>{if(FLAGCHIPS[x]>0)chips.push({c:'bad',t:'unflag',f:x});});
  if(f.loyAll)chips.push({c:f.loyAll>0?'good':'bad',t:'loyAll',d:f.loyAll});
  return chips;
}
function applyFx(fx,ctx,cost){
  const f=scaledFx(fx,cost);
  const before={};NUM.forEach(k=>before[k]=getV(k));
  if(cost)for(const k in cost)setV(k,getV(k)-cost[k]);
  NUM.forEach(k=>{if(f[k])setV(k,getV(k)+f[k]);});
  const chips=[];
  NUM.forEach(k=>{
    const d=getV(k)-before[k];
    if(d)chips.push({c:(d*CHIPGOOD[k])>0?'good':'bad',k,d});
  });
  if(f.stat){
    for(const k in f.stat){
      const s0=G.p.stats[k];G.p.stats[k]=clamp(s0+f.stat[k],1,10);
      if(G.p.stats[k]!==s0){chips.push({c:G.p.stats[k]>s0?'good':'bad',t:'stat',k,d:G.p.stats[k]-s0});
        if(k==='health'){G.p.maxHp=50+G.p.stats.health*5;}}
    }
  }
  if(f.mark&&G.p.marks.indexOf(f.mark)<0){G.p.marks.push(f.mark);chips.push({c:'bad',t:'mark',m:f.mark});}
  if(f.join&&!G.p.group.some(m=>m.name===f.join.name)){
    G.p.group.push({name:f.join.name,trait:f.join.trait,role:f.join.role||ROLES[f.join.name]||'kin',loy:2,since:G.w.day});
    G.st.recruits++;G.st.everJoined[f.join.name]=1;
    chips.push({c:'good',t:'join',name:f.join.name});
  }
  if(f.lose){
    const nm=f.lose==='ctx'?(ctx.m||(ctx.member&&ctx.member.name)):f.lose;
    const i=G.p.group.findIndex(m=>m.name===nm);
    if(i>=0){G.p.group.splice(i,1);G.st.lostMembers++;G.flags['lost_'+nm]=G.w.day;chips.push({c:'bad',t:'gone',name:nm});}
  }
  if(f.loy){
    for(const nm in f.loy){
      const m=G.p.group.find(x=>x.name===nm);
      if(m){const l0=m.loy;m.loy=clamp(m.loy+f.loy[nm],0,3);if(m.loy!==l0)chips.push({c:m.loy>l0?'good':'bad',t:'loy',name:nm,d:m.loy-l0});}
    }
  }
  if(f.loyAll){
    G.p.group.forEach(m=>{m.loy=clamp(m.loy+f.loyAll,0,3);});
    if(G.p.group.length)chips.push({c:f.loyAll>0?'good':'bad',t:'loyAll',d:f.loyAll});
  }
  [].concat(f.flag||[]).forEach(x=>{if(!G.flags[x]){if(FLAGCHIPS[x])chips.push({c:FLAGCHIPS[x]>0?'good':'bad',t:'flag',f:x});else if(x.indexOf('bond_')===0)chips.push({c:'good',t:'bond',name:x.slice(5)});G.fday[x]=G.w.day;}G.flags[x]=1;});
  [].concat(f.unflag||[]).forEach(x=>{if(G.flags[x]&&FLAGCHIPS[x]>0)chips.push({c:'bad',t:'unflag',f:x});delete G.flags[x];});
  if(f.markDay){G.flags[f.markDay]=G.w.day;G.fday[f.markDay]=G.w.day;}
  G.st.maxGroup=Math.max(G.st.maxGroup,G.p.group.length);
  return chips;
}
function checkEnd(cause){
  if(G.over)return;
  if(G.p.inf>=100)G.over={type:'turned',cause};
  else if(G.p.hp<=0)G.over={type:'death',cause};
  if(G.over)finishRun();
}
/* ci is the ORIGINAL choice index of the view */
function choose(ci){
  if(!G||!G.cur||G.cur.res||G.over)return false;
  const view=getView(),ch=view.choices[ci];
  if(!ch||G.cur.opts.indexOf(ci)<0||!avail(ch).ok)return false;
  const ctx=G.cur.ctx;
  let fx,br,ok=null,p=1,edges=null;
  if(ch.check){
    const c=chance(ch);p=c.p;ok=Math.random()<p;
    br=ok?'win':'lose';fx=ch[br];edges=edgeKeys(c);
  }else{br='out';fx=ch.out;}
  const chips=applyFx(fx,ctx,ch.cost);
  {const st=G.st;st.decisions++;
   if(ch.check){st.flips++;
    if(ok){st.won++;st.streak++;st.lstreak=0;st.best=Math.max(st.best,st.streak);if(p<=.3)st.longWins++;if(p>=.8)st.sureWins++;}
    else{st.lost++;st.lstreak++;st.streak=0;st.worst=Math.max(st.worst,st.lstreak);}}
   if(G.cur.id.indexOf('loot_')===0)st.loot++;}
  G.cur.res={ci,br,ok,p,edges,chips};
  const entry={day:G.w.day,ev:G.cur.id,ci,ok};
  if(G.cur.dyn){entry.T=view.title;entry.Lb=ch.label;}
  G.log.push(entry);
  G.last={ev:G.cur.id,ci,T:entry.T,Lb:entry.Lb};
  checkEnd({ev:G.cur.id,ci,T:entry.T,Lb:entry.Lb});
  evalAch();
  save();
  return true;
}
function useMeds(){
  if(!G||!G.cur||G.cur.res||G.over||G.p.sup.meds<1)return null;
  const doc=G.p.bg==='doctor'?1.5:1;
  const heal=Math.round(20*doc),cure=Math.round(25*doc);
  const h0=G.p.hp,i0=G.p.inf;
  G.p.sup.meds--;G.st.meds++;
  G.p.hp=Math.min(G.p.maxHp,G.p.hp+heal);
  G.p.inf=Math.max(0,G.p.inf-cure);
  save();
  return{h:G.p.hp-h0,i:i0-G.p.inf};
}
function advanceDay(){
  const p=G.p,w=G.w,notes=[];
  const t0=timeOf(w.day);w.day++;const t1=timeOf(w.day);
  if(t1.year>t0.year){
    p.age++;
    const a0=ageMods(p.age-1),a1=ageMods(p.age);
    if(a0.label!==a1.label){
      const ks=new Set(Object.keys(a0.m).concat(Object.keys(a1.m)));
      ks.forEach(k=>{p.stats[k]=clamp(p.stats[k]+(a1.m[k]||0)-(a0.m[k]||0),1,10);});
      p.maxHp=50+p.stats.health*5;p.hp=Math.min(p.hp,p.maxHp);
    }
    notes.push({k:'birthday',age:p.age});
  }
  const eatP=Math.min(1,22/G.total);
  const need=Math.random()<eatP?1+Math.floor(p.group.length/2):0;
  let hungry=false,thirsty=false;
  if(need){
    if(p.sup.food>=need)p.sup.food-=need;else{p.sup.food=0;hungry=true;}
    if(p.sup.water>=need)p.sup.water-=need;else{p.sup.water=0;thirsty=true;}
    notes.push({k:'rations',n:need,g:p.group.length});
  }
  if(G.flags.settled){p.sup.food+=1;p.sup.water+=1;p.morale=clamp(p.morale+1,0,100);notes.push({k:'settled'});}
  if(G.flags.garden&&t1.season!=='winter'){p.sup.food+=1;notes.push({k:'garden'});}
  if(G.flags.base&&!G.flags.settled){p.morale=clamp(p.morale+1,0,100);if(p.hp<p.maxHp)p.hp=Math.min(p.maxHp,p.hp+2);notes.push({k:'base'});}
  /* everyone you took in does something for you */
  p.group.forEach(m=>{
    const g=(res,n)=>{if(res==='hp')p.hp=Math.min(p.maxHp,p.hp+n);else if(res==='morale')p.morale=clamp(p.morale+n,0,100);else p.sup[res]+=n;notes.push({k:'perk',name:m.name,res,n});};
    const bx=G.flags['bond_'+m.name]?1.5:1;
    if(m.role==='medic'&&p.hp<p.maxHp)g('hp',G.flags['bond_'+m.name]?3:2);
    else if((m.role==='cook'||m.role==='hunter')&&Math.random()<.5*bx)g('food',1);
    else if(m.role==='scout'&&Math.random()<.4*bx)g('water',1);
    else if(m.role==='tech'&&Math.random()<.3*bx)g('ammo',1);
    else if(m.role==='leader')g('morale',G.flags['bond_'+m.name]?2:1);
    else if(m.role==='kin'&&Math.random()<.5*bx)g('morale',1);
  });
  if(hungry){p.hp-=8;p.morale-=4;notes.push({k:'hungry'});}
  if(thirsty){p.hp-=12;p.morale-=4;notes.push({k:'thirsty'});}
  if(hungry||thirsty)G.st.hungry++;
  if((hungry||thirsty)&&p.group.length&&Math.random()<.6){const m=pick(p.group);m.loy=clamp(m.loy-(G.flags['bond_'+m.name]&&m.loy<=2?0:1),0,3);}
  if(p.morale<25&&p.group.length&&Math.random()<.25){const m=pick(p.group);m.loy=clamp(m.loy-(G.flags['bond_'+m.name]&&m.loy<=2?0:1),0,3);}
  if(p.inf>=60){p.hp-=5;notes.push({k:'fever'});}
  else if(p.inf>=35){p.hp-=2;notes.push({k:'feverish'});}
  if(!hungry&&!thirsty&&p.inf<60&&p.hp<p.maxHp){
    const heal=Math.max(1,Math.round((2+Math.floor(p.stats.health/3))*Math.min(1,20/G.total)));
    const h0=p.hp;p.hp=Math.min(p.maxHp,p.hp+heal);
    if(p.hp>h0)notes.push({k:'recover',n:p.hp-h0});
  }
  if(!hungry&&!thirsty&&p.inf>0&&p.inf<50)p.inf=Math.max(0,p.inf-1);
  let md=p.group.length>=3?1:p.group.length>=1?0:-1;
  if(p.bg==='teacher')md+=1;
  if(p.marks.indexOf('haunted')>=0)md-=1;
  p.morale=clamp(p.morale+md,0,100);
  if(p.morale<=0){p.hp-=5;notes.push({k:'despair'});}
  const k=20/G.total;
  const dOut=(Math.random()<.8*k?1:0)+(w.order<35&&Math.random()<k?1:0)+(w.order<15&&Math.random()<k?1:0);
  const dOrd=w.outbreak>=60?-(Math.random()<k?(1+rnd(2)):0):w.outbreak>=30?-(Math.random()<k?rnd(2):0):-(Math.random()<.3*k?1:0);
  const o0=w.outbreak,r0=w.order;
  w.outbreak=clamp(w.outbreak+dOut,0,100);
  w.order=clamp(w.order+dOrd,0,100);
  if(w.outbreak>o0||w.order<r0)notes.push({k:'slip',o:w.outbreak-o0,r:r0-w.order});
  if(prog()>.45&&w.order>=40&&(G.flags.settled||G.flags.base||G.flags.leader||G.flags.builder)&&Math.random()<.5)w.outbreak=clamp(w.outbreak-1,0,100);
  if(G.flags.cure){w.outbreak=clamp(w.outbreak-2,0,100);w.order=clamp(w.order+1,0,100);}
  if(G.flags.settled&&p.humanity>=50&&Math.random()<.5)w.order=clamp(w.order+1,0,100);
  p.hp=clamp(p.hp,0,p.maxHp);
  G.notes=notes;
  evalAch();
  const r=hungry&&p.hp<=0?'starved':thirsty&&p.hp<=0?'thirst':p.inf>=60&&p.hp<=0?'fever':p.morale<=0&&p.hp<=0?'despair':'night';
  checkEnd({r});
}
function nextStep(){
  if(!G)return null;
  if(G.over)return'end';
  if(!G.cur||!G.cur.res)return'turn';
  /* no night passes between prologue scenes: the next scene starts on the same day */
  if(G.pro&&G.pro.length){startTurn();return'turn';}
  if(G.w.day>=G.total){G.over={type:'survived'};finishRun();save();return'end';}
  advanceDay();
  if(G.over){save();return'end';}
  startTurn();
  return'turn';
}
/* the situation report, in words. it colors every question. */
const SIT=[
 [['The news still runs. Most people still call this a temporary problem.','החדשות עדיין משודרות. רוב האנשים עדיין קוראים לזה בעיה זמנית.'],['Sirens at night. Shops open late and close early.','סירנות בלילה. חנויות נפתחות מאוחר ונסגרות מוקדם.'],['Nobody is in charge, and nobody has noticed yet.','אף אחד לא אחראי, ועדיין אף אחד לא שם לב.']],
 [['The cordons still hold, though you can hear them creak.','המחסומים עדיין מחזיקים, אבל שומעים אותם חורקים.'],['The rules are getting shorter. The fences are getting taller.','החוקים מתקצרים. הגדרות מתגבהות.'],['Every street has its own law now.','לכל רחוב יש חוק משלו עכשיו.']],
 [['Order survives in pockets, and it is expensive.','סדר שורד בכיסים, והוא יקר.'],['The dead are in every conversation. A few streets still belong to someone.','המתים בכל שיחה. כמה רחובות עדיין שייכים למישהו.'],['The city belongs to them. What is left of us keeps quiet.','העיר שלהם. מה שנשאר מאיתנו שותק.']]
];
function sitLine(){
  const o=G.w.outbreak<35?0:G.w.outbreak<65?1:2,r=G.w.order>=60?0:G.w.order>=30?1:2;
  const base=SIT[o][r];let en=base[0],he=base[1];
  if(G.p.humanity>=75){en+=' People still trust a face like yours.';he+=' אנשים עדיין סומכים על פנים כמו שלך.';}
  else if(G.p.humanity<25){en+=' People cross the street when you come.';he+=' אנשים חוצים את הרחוב כשמגיעים.';}
  return{en,he};
}
//#ENGINE-END
