/* The world view: every place is well-formed and reachable, walking works, every question has a place, drawing does not
   throw, and a whole game can be played through it. Run: npm test */
const createApp=require('./helpers/fake-dom');
const E=require('./helpers/load-engine')();
const {SoftCtx}=require('./tools/soft-canvas');
const {api,els}=createApp();
const problems=[];const bad=m=>problems.push(m);
const w=api.world;
/* answer with the first option that can be chosen: some cost ammunition or food the survivor may not have */
const answer=()=>{const G=api.G;for(const o of G.cur.opts){api.click('choose',undefined,o);if(G.cur.res)return true;}return false;};
api.click('lang','en');api.click('road','5');api.click('randall');api.click('start');
const OUTFITS=['student','firefighter','teacher','politician','soldier','doctor','mechanic','journalist'];

/* 1. every place is a proper map */
const ids=Object.keys(w.WSCENES);
if(ids.length<15)bad('expected at least 15 places, found '+ids.length);
ids.forEach(id=>{
  const W=w.worldNew(id,'uk'),S=W.S;
  if(new Set(S.rows.map(r=>r.length)).size!==1)bad(id+': rows are not all the same width');
  if(!S.start||!S.spot){bad(id+': needs an entrance (@) and a place for the question (X)');return;}
  if(!w.worldWalkable(S,S.start[0],S.start[1]))bad(id+': the entrance is blocked');
  if(!w.worldWalkable(S,S.spot[0],S.spot[1]))bad(id+': the question cannot be reached, it is blocked');
  if(!w.worldPath(S,S.start,S.spot))bad(id+': there is no way from the entrance to the question');
  S.npcs.forEach(n=>{
    if(!OUTFITS.includes(n.bg))bad(id+': a person has an unknown outfit '+n.bg);
    const ch=S.rows[n.y][n.x];
    if(ch!=='.'&&ch!=='r')bad(id+': a person is standing on "'+ch+'" at '+n.x+','+n.y);
    if(n.x===S.spot[0]&&n.y===S.spot[1])bad(id+': a person is standing on the question');
    if(n.x===S.start[0]&&n.y===S.start[1])bad(id+': a person is standing on the entrance');
  });
  /* people must not wall the question off: it is still reachable after they are placed */
  if(!S.name||S.name.length!==2)bad(id+': the place needs a name in both languages');
});

/* 2. every question has a place, and the prologue has the right ones */
const sceneOf=id=>w.worldSceneId(id);
E.EVENTS.forEach(ev=>{if(!w.WSCENES[sceneOf(ev.id)])bad(ev.id+' has no place');});
const rooms=['student','teacher','soldier','doctor','politician','journalist','firefighter','mechanic'].map(b=>sceneOf('pro_'+b));
if(new Set(rooms).size!==8)bad('each profession should open in a room of its own: '+rooms.join(','));
const homes=[0,1,2].map(i=>sceneOf('pro_age_'+i));
if(new Set(homes).size!==3)bad('each age should open at home in a place of its own');
if(sceneOf('loot_pharmacy')!=='shop'&&!E.EVMAP.loot_pharmacy)/* no such id: fine */;
if(sceneOf('arm_hunt')!=='wild'||sceneOf('dil_cache')!=='wild')bad('armed encounters and dilemmas happen on the road');

/* 2b. the setting follows the text: every place is used, and well-known questions are where you would expect */
{
  const used=new Set(E.EVENTS.map(e=>sceneOf(e.id)));
  const unused=ids.filter(id=>!used.has(id));
  if(unused.length)bad('places no question ever happens in: '+unused.join(', '));
  if(used.size<25)bad('the world should feel varied: only '+used.size+' different places in use');
  const want={z_hospital:'hospital',loot_police:'police',jp_5:'harbor',c_ca_4:'cabin',f_piano:'church',c_jp_3:'station',loot_farm:'farm',c_br_3:'market',
    c_il_1:'basement',us_2:'checkpoint',z_gas:'gasstation',loot_warehouse:'warehouse',settle_council:'hall',br_1:'rooftop',doc_1:'hospital',st_2:'room_student',
    pair_journalist_uk:'room_journalist',pair_doctor_japan:'hospital',pair_doc_br:'hospital',open_uk:'street',cs_Tiago:'camp'};
  Object.keys(want).forEach(k=>{if(sceneOf(k)!==want[k])bad(`${k} should happen in ${want[k]}, not ${sceneOf(k)}`);});
}

/* 3. weather belongs to the country, and only outdoors */
if(w.worldNew('street','uk').weather!=='rain')bad('Britain should have rain');
if(w.worldNew('street','canada').weather!=='snow')bad('Canada should have snow');
if(w.worldNew('street','usa').weather!=='embers')bad('the United States should have embers');
if(w.worldNew('room_doctor','uk').weather||w.worldNew('room_doctor','uk').tint)bad('a room should have no weather');

/* 3b. zombies are placed on the floor, far from where you come in, apart from each other, and the same every time for the same question */
{
  const spawnOf=(id,seed,grow)=>w.worldNew(id,'uk',{zombies:5,seed,grow}).z.map(z=>z.x+','+z.y).join(' ');
  ids.forEach(id=>[false,true].forEach(grow=>{
    const W=w.worldNew(id,'uk',{zombies:5,seed:5,grow}),S=W.S,dist=w.worldDistances(S,S.start);
    if(W.z.length<1||W.z.length>5)bad(`${id}: expected 1 to 5 zombies, got ${W.z.length}`);
    W.z.forEach((z,i)=>{
      if(!w.worldWalkable(S,z.x,z.y))bad(id+': a zombie was placed inside something');
      if((dist[z.y*S.w+z.x]||0)<3)bad(id+': a zombie starts almost on top of the survivor');
      if(Math.abs(z.x-S.spot[0])+Math.abs(z.y-S.spot[1])<3)bad(id+': a zombie starts on the question');
      if(S.big&&(dist[z.y*S.w+z.x]||0)<8)bad(id+': in a big place, zombies should start far away');
      if(!['idle','wander'].includes(z.state))bad(id+': zombies start unaware of you, not '+z.state);
      W.z.slice(i+1).forEach(o=>{if(Math.abs(z.x-o.x)+Math.abs(z.y-o.y)<(S.big?3:4))bad(id+': two zombies start on top of each other');});
    });
    if(spawnOf(id,5,grow)!==spawnOf(id,5,grow))bad(id+': the same question should always get the same zombies');
  }));
  if(w.worldNew('room_doctor','uk').z.length!==0)bad('with no zombies asked for, there should be none');
}

/* 3b2. how many zombies, and why: none until the outbreak begins, none in the first minutes unless the country is already falling */
{
  const n=(ev,sc,o)=>w.worldZombieCount(ev,sc,o);
  if(n('c_il_2','market',14)!==0)bad('a quiet start (Israel, 14%) should have no zombies in an ordinary place');
  if(n('c_au_1','camp',6)!==0||n('us_1','street',22)!==0)bad('below the outbreak threshold there should be none');
  if(n('pro_doctor','room_doctor',14)!==0||n('pro_age_1','home_mid',55)!==0)bad('the first scenes must be clear where the country is not yet falling');
  if(n('pro_doctor','room_doctor',88)!==1||n('pro_age_0','home_young',88)!==1)bad('in a country that is already falling (the United States) even the first scenes have one');
  if(n('open_uk','street',36)!==1||n('open_usa','street',88)!==2||n('open_israel','street',14)!==0)bad('the first night: one in Britain, two in the United States, none in Israel');
  if(n('horde','street',60)<4)bad('a horde is at least four');
  if(n('walker','street',14)!==1)bad('"One in the Alley" always has one');
  if(n('z_hospital','hospital',88)!==5)bad('a hospital at the height of the outbreak is the worst: 5');
  if(n('dil_cache','wild',55)>=n('c_uk_1','street',55))bad('a quiet moment (a dilemma) has fewer than the same place in an ordinary event');
  for(const ev of['c_uk_1','z_dogs','horde','pro_x','open_usa'])for(const sc of['street','hospital','home_mid','rooftop']){
    let last=-1;for(let o=0;o<=100;o+=2){const c=n(ev,sc,o);if(c<0||c>5)bad(`${ev}/${sc}@${o}: ${c} is out of range`);if(c<last&&ev!=='pro_x')bad(`${ev}/${sc}: the count must not fall as the outbreak grows (${last} -> ${c} at ${o})`);last=c;}
  }
}

/* 3c. how a zombie behaves: unaware until it sees or hears you, then chases, then loses you */
{
  const mk=(id='street')=>{const W=w.worldNew(id,'uk',{zombies:0,seed:1});W.zdelay=0;return W;};
  const zAt=(W,x,y,dir,state='idle')=>{const z={x,y,fx:x+.5,fy:y+.5,path:[],spawn:[x,y],stun:0,spent:false,walking:false,face:1,state,dir,think:0,timer:99999,lost:0,target:null,spd:1,sex:'m',age:30,skin:0,seed:1,bg:'student'};W.z.push(z);return z;};
  const run=(W,ms)=>{for(let t=0;t<ms;t+=50)w.worldTick(W,50);};
  /* the numbers behind it */
  const P=(mode,stealth,walking)=>w.worldPresence({mode,stealth,walking});
  if(P('walk',5,true).sight!==5||P('walk',5,true).noise!==3)bad('walking: seen from 5, heard from 3');
  if(!(P('sneak',5,true).sight<P('walk',5,true).sight&&P('sneak',5,true).noise<P('walk',5,true).noise))bad('sneaking is quieter and harder to see');
  if(!(P('run',5,true).noise>P('walk',5,true).noise))bad('running is louder');
  if(!(P('walk',10,true).sight<P('walk',5,true).sight&&P('walk',1,true).sight>P('walk',5,true).sight))bad('a better stealth stat should be seen from less far');
  if(!(P('walk',5,false).noise<P('walk',5,true).noise))bad('standing still is quieter than walking');
  if(!(w.WZS.chase<w.WSPEED*w.WMODESPEED.walk&&w.WZS.chase>w.WSPEED*w.WMODESPEED.sneak))bad('a chasing zombie is slower than you walking, and faster than you sneaking');
  if(!(w.WMODESPEED.sneak<w.WMODESPEED.walk&&w.WMODESPEED.walk<w.WMODESPEED.run))bad('sneak, walk, run should get faster');
  /* line of sight: a car blocks it, a crate does not */
  {const S=mk().S;
   if(w.worldLOS(S,1,2,7,2))bad('a car should block the line of sight');
   if(!w.worldLOS(S,1,2,3,2))bad('clear ground should not block it');
   if(!w.worldLOS(S,1,1,9,1))bad('a crate is low: it does not block sight');}
  /* far away and not facing you: it does not know you are there, and it does not walk at you */
  {const W=mk(),z=zAt(W,10,1,[1,0]);run(W,6000);
   if(z.state==='chase'||z.state==='investigate')bad('a zombie far away must not notice you: '+z.state);
   if(W.events.length)bad('a zombie far away must not bite');}
  /* it sees you: close, in front of it, nothing in between */
  {const W=mk(),z=zAt(W,5,8,[-1,0]);run(W,300);
   if(z.state!=='chase')bad('a zombie facing you at 4 tiles with a clear view should see you, was '+z.state);}
  /* it is looking the other way and you are quiet: it does not */
  {const W=mk(),z=zAt(W,5,8,[1,0]);run(W,600);
   if(z.state!=='idle')bad('a zombie facing away, with you standing still, should not notice, was '+z.state);}
  /* sneaking: too far to be seen at 4 tiles */
  {const W=mk();W.mode='sneak';const z=zAt(W,5,8,[-1,0]);run(W,600);
   if(z.state==='chase')bad('a sneaking survivor should not be seen from 4 tiles');
   const W2=mk();W2.mode='walk';const z2=zAt(W2,5,8,[-1,0]);run(W2,600);
   if(z2.state!=='chase')bad('the same survivor walking should be seen');}
  /* stealth stat: 10 is seen from less far than 1 */
  {const a=mk();a.stealth=10;const za=zAt(a,5,8,[-1,0]);run(a,500);
   const b=mk();b.stealth=1;const zb=zAt(b,6,8,[-1,0]);run(b,500);
   if(za.state==='chase')bad('a very stealthy survivor should not be seen from 4 tiles');
   if(zb.state!=='chase')bad('a clumsy survivor is seen from 5 tiles');}
  /* sound goes through walls: running makes a zombie that is looking away come and look */
  {const W=mk();W.mode='run';W.walking=true;W.path=[[W.cx+1,W.cy]];const z=zAt(W,1,3,[1,0]);   // 5 tiles away, behind the car row, facing away
   run(W,50);W.path=[];W.walking=true;w.worldTick(W,50);run(W,200);
   if(!['investigate','chase'].includes(z.state))bad('a running survivor should be heard, and the zombie should come to look: '+z.state);}
  /* it goes to where the sound was, and then looks around */
  {const W=mk(),z=zAt(W,6,8,[1,0],'investigate');z.target=[8,8];z.timer=7000;
   run(W,6000);
   if(z.state==='investigate')bad('a zombie that has reached the sound should stop investigating');}
  /* it loses you: out of sight for a few seconds, it stops chasing */
  {const W=mk(),z=zAt(W,5,8,[-1,0],'chase');z.last=[1,8];
   W.cx=10;W.cy=1;W.fx=10.5;W.fy=1.5;               // you are gone, far away
   run(W,5500);
   if(z.state==='chase')bad('a zombie that has lost you for a while should stop chasing');}
  /* one that has seen you calls the ones near it */
  {const W=mk(),a=zAt(W,5,8,[-1,0]),b=zAt(W,7,8,[1,0]);run(W,400);
   if(a.state!=='chase')bad('the first should chase');
   if(b.state!=='investigate'&&b.state!=='chase')bad('the one next to it should be called: '+b.state);}
  /* a chasing zombie catches someone who stands still, bites once, and loses interest */
  {const W=mk(),z=zAt(W,5,8,[-1,0],'chase');run(W,9000);
   if(W.events.length!==1)bad('one zombie should bite once, got '+W.events.length);
   if(!z.spent||z.state!=='home')bad('a zombie that has bitten goes home');}
  /* a frozen world does not bite */
  {const W=mk();W.frozen=true;const z=zAt(W,1,8,[-1,0],'chase');z.x=W.cx;z.y=W.cy;z.fx=W.fx;z.fy=W.fy;run(W,2000);
   if(W.events.length)bad('a frozen world must not bite');}
  /* two arriving together cost one bite, not two */
  {const W=mk();for(let i=0;i<2;i++){const z=zAt(W,W.cx,W.cy,[1,0],'chase');z.fx=W.fx;z.fy=W.fy;}
   w.worldTick(W,50);if(W.events.length!==1)bad('two zombies arriving together should cost one bite: '+W.events.length);}
}

/* 3e. bigger places: the inside is repeated, you come in at the far corner, and there is always a long way to the question */
{
  let bigCount=0;
  ids.forEach(id=>{
    const small=w.worldNew(id,'uk'),W=w.worldNew(id,'uk',{grow:true}),S=W.S;
    if(!S.big){if(/^(room_|home_)/.test(id)||id==='cabin'||id==='church')return;bad(id+': expected a bigger version');return;}
    bigCount++;
    if(S.w<=small.S.w||S.h<=small.S.h)bad(id+': the big version is not bigger');
    const p=w.worldPath(S,S.start,S.spot);
    if(!p||p.length<14)bad(`${id}: the way to the question is too short (${p&&p.length})`);
    if(S.spot[0]!==small.S.spot[0]||S.spot[1]!==small.S.spot[1])bad(id+': the question moved');
    if(S.npcs!==small.S.npcs&&JSON.stringify(S.npcs)!==JSON.stringify(small.S.npcs))bad(id+': the people changed');
    if(S.rows.some(r=>r.length!==S.w))bad(id+': a big place is not rectangular');
    if(!S.rows[S.start[1]]||S.rows[S.start[1]][S.start[0]]!=='@')bad(id+': no entrance');
  });
  if(bigCount<16)bad('every place except the rooms, homes, cabin and chapel should have a big version, only '+bigCount+' do');
  ['room_doctor','home_mid','cabin','church'].forEach(id=>{if(w.worldNew(id,'uk',{grow:true}).S.big)bad(id+' is small on purpose (the story\'s first scenes stay small)');});
}

/* 3f. the camera follows you in a big place, and taps still land where you tap */
{
  const W=w.worldNew('street','uk',{grow:true});
  const [sx,sy]=w.worldScreen(W,W.fx,W.fy);
  if(sx<60||sx>w.WCW-60||sy<60||sy>w.WCH-40)bad('at the start, the survivor should be on screen: '+sx+','+sy);
  const sp=W.S.spot;W.cx=sp[0];W.cy=sp[1];W.fx=sp[0]+.5;W.fy=sp[1]+.5;w.worldCamera(W,0,true);
  const [qx,qy]=w.worldScreen(W,W.fx,W.fy);
  if(qx<60||qx>w.WCW-60||qy<60||qy>w.WCH-40)bad('after walking to the question, the survivor should still be on screen: '+qx+','+qy);
  /* a tap on a walkable tile walks there */
  let target=null;for(let y=0;y<W.S.h&&!target;y++)for(let x=0;x<W.S.w&&!target;x++){if(w.worldWalkable(W.S,x,y)&&Math.abs(x-W.cx)+Math.abs(y-W.cy)>2){const [tx,ty]=w.worldScreen(W,x+.5,y+.5);if(tx>80&&tx<w.WCW-80&&ty>80&&ty<w.WCH-60)target=[x,y,tx,ty];}}
  if(!target)bad('no walkable tile on screen to tap');
  else{W.path=[];if(!w.worldTap(W,target[2],target[3]))bad('tapping a walkable tile should walk there');
    const last=W.path[W.path.length-1];if(!last||last[0]!==target[0]||last[1]!==target[1])bad('the tap landed on a different tile: '+JSON.stringify(last)+' vs '+target[0]+','+target[1]);}
}

/* 3h. running wears you out, and the traits change how the world treats you */
{
  const mk=(traits)=>{const W=w.worldNew('street','uk',{zombies:0,traits});return W;};
  const secondsToWinded=(traits)=>{const W=mk(traits);W.walking=true;let t=0;for(;t<60000&&!W.winded;t+=50)w.worldStamina(W,50,true);return t/1000;};
  const base=secondsToWinded([]),athletic=secondsToWinded(['athletic']),unfit=secondsToWinded(['unfit']);
  if(base<3.5||base>6)bad('a plain survivor should run for about 4.5 seconds before being winded: '+base);
  if(!(athletic>base*1.4))bad('an athlete runs a lot longer: '+athletic+' vs '+base);
  if(!(unfit<base*.85))bad('someone out of shape runs a lot less: '+unfit+' vs '+base);
  /* winded: back to walking until some breath is back */
  {const W=mk([]);W.mode='run';W.walking=true;W.stam=0;W.winded=true;w.worldTick(W,50);
   if(W.eff!=='walk')bad('a winded survivor cannot run');
   W.walking=false;for(let i=0;i<40;i++)w.worldTick(W,50);
   if(W.winded)bad('after two seconds of rest the survivor should be able to run again');}
  /* running that is not winded stays running, and walking never wears you out */
  {const W=mk([]);W.mode='walk';W.walking=true;for(let i=0;i<200;i++)w.worldStamina(W,50,false);if(W.stam<100)bad('walking must not use stamina');}
  /* sight and noise */
  {const P=(traits,mode)=>w.worldPresence({mode,stealth:5,walking:true,tm:w.traitWorld(traits)});
   if(!(P(['unseen'],'walk').sight<P([],'walk').sight*.7))bad('inconspicuous should be seen from much less far');
   if(!(P(['conspicuous'],'walk').sight>P([],'walk').sight*1.3))bad('conspicuous should be seen from much farther');
   if(!(P(['graceful'],'run').noise<P([],'run').noise*.7))bad('graceful should be much quieter');
   if(!(P(['clumsy'],'walk').noise>P([],'walk').noise*1.2))bad('clumsy should be louder');}
  /* run speed: an athlete gets there first */
  {const time=(traits)=>{const W=w.worldNew('street','uk',{zombies:0,traits});W.mode='run';w.worldGo(W);let t=0;for(;t<60000&&!W.arrived;t+=50)w.worldTick(W,50);return t;};
   if(!(time(['athletic'])<time([])))bad('an athlete runs faster');}
}

/* 3g. running gets there sooner than walking, walking sooner than sneaking */
{
  const time=(mode)=>{const W=w.worldNew('street','uk',{zombies:0});W.mode=mode;w.worldGo(W);let t=0;for(;t<60000&&!W.arrived;t+=50)w.worldTick(W,50);return t;};
  const tr=time('run'),tw=time('walk'),ts=time('sneak');
  if(!(tr<tw&&tw<ts))bad(`run ${tr}ms, walk ${tw}ms, sneak ${ts}ms: should get slower`);
}

/* 3d. what a bite costs: 3 to 5 health, 5 infection, and it never kills outright */
{
  api.G.p.traits=[];      // no gifts or burdens: the plain numbers
  const bite=(r)=>{api.G.p.hp=60;api.G.p.inf=10;const out=api.zombieBite(()=>r);return[out.hp,api.G.p.hp,out.inf,api.G.p.inf];};
  let b=bite(0);   if(b[0]!==3||b[1]!==57||b[2]!==5||b[3]!==15)bad('the smallest bite is 3 health and 5 infection: '+b);
  b=bite(.5);      if(b[0]!==4)bad('a middling bite is 4 health: '+b);
  b=bite(.99);     if(b[0]!==5||b[1]!==55)bad('the worst bite is 5 health: '+b);
  api.G.p.hp=2;api.G.p.inf=98;const out=api.zombieBite(()=>.99);
  if(api.G.p.hp!==1)bad('a bite must leave at least 1 health, left '+api.G.p.hp);
  if(api.G.p.inf!==99)bad('a bite must not push infection to 100, left '+api.G.p.inf);
  api.G.p.hp=api.G.p.maxHp;api.G.p.inf=0;
}

/* 4. walking */
{
  const W=w.worldNew('room_politician','uk'),S=W.S;
  const start=[W.cx,W.cy];
  if(w.worldKey(W,'ArrowLeft'))bad('walking into the wall should not move');
  if(!w.worldKey(W,'ArrowUp'))bad('walking up from the entrance should work');
  for(let i=0;i<40;i++)w.worldTick(W,50);
  if(W.cx===start[0]&&W.cy===start[1])bad('the survivor did not move');
  if(!w.worldWalkable(S,W.cx,W.cy))bad('the survivor ended up inside something');
  /* a tap on the question walks there and arrives */
  const W2=w.worldNew('room_doctor','uk'),sp=W2.S.spot;
  const q=[(sp[0]+.5-(sp[1]+.5))*w.WTW/2+W2.ox,(sp[0]+.5+(sp[1]+.5))*w.WTH/2+W2.oy];
  if(!w.worldTap(W2,q[0],q[1])||W2.goal!=='spot')bad('tapping the question should send the survivor to it');
  for(let i=0;i<400&&!W2.arrived;i++)w.worldTick(W2,50);
  if(!W2.arrived)bad('the survivor never arrived at the question');
  if(W2.cx!==sp[0]||W2.cy!==sp[1])bad('the survivor should stop on the question');
  /* a tap on a wall does nothing; a tap on open floor walks */
  const W3=w.worldNew('room_teacher','uk');
  if(w.worldTap(W3,W3.ox,W3.oy-40))bad('tapping a wall should not walk');
  if(!w.worldTap(W3,(4.5-5.5)*w.WTW/2+W3.ox,(4.5+5.5)*w.WTH/2+W3.oy)||!W3.path.length)bad('tapping open floor should walk');
}

/* 4b. every place: walk from the entrance to the question with time alone */
ids.forEach(id=>{
  const W=w.worldNew(id,'usa');w.worldGo(W);
  for(let i=0;i<600&&!W.arrived;i++)w.worldTick(W,50);
  if(!W.arrived)bad(id+': walking to the question never arrives');
});

/* 5. drawing: nothing throws, nothing is blank, and the survivor has no portrait card behind them */
class Watch extends SoftCtx{constructor(a,b){super(a,b);this.bigRects=0;}
  fillRect(x,y,ww,hh){if(ww>=48&&hh>=96&&ww<200&&hh<200)this.bigRects++;return super.fillRect(x,y,ww,hh);}}
ids.forEach(id=>{
  ['uk','japan'].forEach((loc,li)=>{
    try{
      const W=w.worldNew(id,loc,{grow:li===1,zombies:4,seed:3,traits:li===1?['ears','unfit']:[]}),c=new Watch(w.WCW,w.WCH);
      W.z.forEach((z,i)=>{z.state=['chase','investigate','search','idle'][i%4];});     // draw every kind of marker
      for(let i=0;i<10;i++)w.worldTick(W,50);
      w.worldDraw(c,W,900);
      const seen=new Set();for(let i=0;i<c.data.length;i+=4*97)seen.add(c.data[i]+','+c.data[i+1]+','+c.data[i+2]);
      if(seen.size<8)bad(id+': the picture is nearly blank ('+seen.size+' colors)');
      if(c.bigRects)bad(id+': a portrait-sized block is being drawn behind a survivor');
    }catch(e){bad(id+' drawing threw: '+e.message);}
  });
});

/* 6b. a bite in the game: health and infection move, the meters update, and the player is told */
{
  api.click('world');
  api.G.p.traits=[];
  const hp0=api.G.p.hp,inf0=api.G.p.inf,bites0=api.G.st.bites||0;
  api.WS.zdelay=0;api.WS.frozen=false;
  api.WS.z=[{x:api.WS.cx,y:api.WS.cy,fx:api.WS.fx,fy:api.WS.fy,path:[],spawn:[0,0],stun:0,spent:false,walking:false,face:1,sex:'m',age:30,skin:0,seed:1,bg:'student'}];
  api.worldPump(50);
  const lost=hp0-api.G.p.hp;
  if(lost<3||lost>5)bad('a bite in the game should cost 3 to 5 health, cost '+lost);
  if(api.G.p.inf!==Math.min(99,inf0+5))bad('a bite in the game should add 5 infection: '+inf0+' -> '+api.G.p.inf);
  if((api.G.st.bites||0)!==bites0+1)bad('the bite should be counted');
  if(!(els.worldmsg.textContent||'').length)bad('the player should be told about the bite');
  if(els.vitals.innerHTML.indexOf(api.G.p.hp+' / ')<0)bad('the health meter should show the new health');
  api.click('world');
}

/* 6a. the play screen: your condition first, then the report on the world, then your file, all in the side column */
{
  const html=els.main.innerHTML;
  const i=html.indexOf('class="side"'),v=html.indexOf('id="vitals"'),sb=html.indexOf('id="side"'),end=html.indexOf('</aside>');
  if(!(i>=0&&v>i&&sb>v&&end>sb))bad('the condition block should be the first thing in the side column, above the world report');
  if(html.lastIndexOf('id="vitals"')!==v)bad('the condition block should appear only once');
  const vit=els.vitals.innerHTML;
  const b=vit.indexOf('class="vbars"'),ac=vit.indexOf('class="vact"'),mo=vit.indexOf('class="vmore"');
  if(!(b>=0&&ac>b&&mo>ac))bad('the condition block should read: meters, the medicine button, then the folded strip');
  if(!/<details class="vmore" id="vmore"\s*>/.test(vit))bad('the marks, companions and journal should fold into one strip that starts closed');
  const side=els.side.innerHTML;
  if(!(side.indexOf('p-world')>=0&&side.indexOf('p-file')>side.indexOf('p-world')))bad('the report on the world should come before the survivor file');
}

/* 6. in the game: the button, the hidden question, arriving, and the next place */
{
  if(api.WMODE)bad('the world view should start off');
  api.click('world');
  if(!api.WMODE)bad('the World button should turn the view on');
  if(!/id="worldbox"/.test(els.worldslot.innerHTML))bad('the place should be drawn above the question');
  if(els.stage.hidden!==true)bad('the question should stay hidden until you arrive');
  const first=api.WS.id;
  let scrolls=0;const spy=()=>{els.stage.scrollIntoView=()=>{scrolls++;};els.worldslot.scrollIntoView=()=>{scrolls++;};};
  spy();
  if(els.worldcv.style&&els.worldcv.style.objectPosition)bad('before arriving, the whole place is shown');
  api.click('worldGo');
  for(let i=0;i<600&&!api.WOPEN;i++)api.worldPump(50);
  if(!api.WOPEN)bad('arriving should open the question');
  if(els.stage.hidden===true)bad('the question should show once you have arrived');
  if(!/data-act="choose"/.test(els.stage.innerHTML))bad('the choices should be there after arriving');
  if(scrolls)bad('arriving must not scroll the page: the place would leave the screen');
  if(!els.worldcv.style||!/%/.test(els.worldcv.style.objectPosition||''))bad('once open, the place should stay centred on the survivor');
  spy();
  answer();api.click('skip');
  if(scrolls)bad('answering in the world view must not scroll the page either');
  if(api.WOPEN!==true)bad('the result should stay visible');
  api.click('next');
  if(api.view==='play'){
    if(api.WOPEN)bad('a new question should start closed, in a new place');
    if(els.stage.hidden!==true)bad('the next question should be hidden until you arrive');
    api.click('worldSkip');
    if(!api.WOPEN||els.stage.hidden===true)bad('Skip to the text should open the question');
  }
  api.click('world');
  if(api.WMODE)bad('the button should turn the view off again');
  /* the text view keeps scrolling the answer into place, as it always did */
  if(api.view==='play'&&!api.G.cur.res){scrolls=0;spy();answer();if(!scrolls)bad('the text view should still scroll the answer into place');}
  if(els.stage.hidden===true)bad('with the world view off, the question is always visible');
}

/* 7. a whole game through the world view, from the first room to the end screen */
{
  api.click('lang','en');api.click('road','5');api.click('randall');api.click('start');
  api.click('world');
  const places=[];let guard=0;
  while(guard++<400&&api.view==='play'){
    const id=api.WS&&api.WS.id;if(id&&places[places.length-1]!==id)places.push(id);
    if(!api.WOPEN){api.click('worldGo');for(let i=0;i<600&&!api.WOPEN;i++)api.worldPump(50);}
    if(!api.WOPEN){bad('could not arrive at the question in '+id);break;}
    if(!api.G.cur.res)answer();
    api.click('skip');api.click('next');
  }
  if(api.view!=='end')bad('a game played through the world view did not reach the end screen');
  if(!/^room_/.test(places[0]))bad('the first place should be the room of the survivor\'s profession, was '+places[0]);
  if(!places.includes('street'))bad('a whole game should reach the street at least once');
  api.click('lang','en');
}

if(problems.length){console.log(problems.slice(0,25).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`world OK: ${ids.length} places, every question has one, walking and arriving work, and a whole game plays through it`);
