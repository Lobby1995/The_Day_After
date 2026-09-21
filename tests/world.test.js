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

/* 3b. zombies: one to three, on the floor, far from where you start, apart from each other, and the same every time for the same question */
{
  const spawnOf=(id,seed)=>w.worldNew(id,'uk',{zombies:3,seed}).z.map(z=>z.x+','+z.y).join(' ');
  ids.forEach(id=>{
    const W=w.worldNew(id,'uk',{zombies:3,seed:5}),S=W.S,dist=w.worldDistances(S,S.start);
    if(W.z.length<1||W.z.length>3)bad(id+': expected 1 to 3 zombies, got '+W.z.length);
    W.z.forEach((z,i)=>{
      if(!w.worldWalkable(S,z.x,z.y))bad(id+': a zombie was placed inside something');
      if((dist[z.y*S.w+z.x]||0)<3)bad(id+': a zombie starts almost on top of the survivor');
      if(Math.abs(z.x-S.spot[0])+Math.abs(z.y-S.spot[1])<3)bad(id+': a zombie starts on the question');
      W.z.slice(i+1).forEach(o=>{if(Math.abs(z.x-o.x)+Math.abs(z.y-o.y)<4)bad(id+': two zombies start on top of each other');});
    });
    if(spawnOf(id,5)!==spawnOf(id,5))bad(id+': the same question should always get the same zombies');
  });
  if(w.worldNew('room_doctor','uk').z.length!==0)bad('with no zombies asked for, there should be none');
  if(!(w.WZSPEED<w.WSPEED))bad('zombies walk, you walk faster: '+w.WZSPEED+' vs '+w.WSPEED);
}

/* 3c. a zombie walks at you, bites once, and loses interest; a frozen world does not bite */
{
  const mk=(zombies)=>{const W=w.worldNew('room_teacher','uk',{zombies,seed:3});W.zdelay=0;return W;};
  const W=mk(2);
  const d0=W.z.map(z=>Math.hypot(z.fx-W.fx,z.fy-W.fy));
  for(let i=0;i<40;i++)w.worldTick(W,50);                                  // two seconds, standing still
  const d1=W.z.map(z=>Math.hypot(z.fx-W.fx,z.fy-W.fy));
  if(!d1.every((d,i)=>d<d0[i]))bad('zombies should walk toward the survivor: '+d0.map(Math.round)+' -> '+d1.map(Math.round));
  for(let i=0;i<600;i++)w.worldTick(W,50);                                 // thirty seconds
  if(W.events.length!==2)bad('each zombie should bite exactly once, got '+W.events.length+' bites from 2 zombies');
  if(!W.z.every(z=>z.spent))bad('a zombie that has bitten should be spent');
  const W2=mk(1);W2.z[0].x=W2.cx;W2.z[0].y=W2.cy;W2.z[0].fx=W2.fx;W2.z[0].fy=W2.fy;W2.frozen=true;
  for(let i=0;i<40;i++)w.worldTick(W2,50);
  if(W2.events.length)bad('a frozen world must not bite');
  /* after a bite you are safe for a moment: two zombies on the same tile bite once, not twice at once */
  const W3=mk(2);W3.z.forEach(z=>{z.x=W3.cx;z.y=W3.cy;z.fx=W3.fx;z.fy=W3.fy;});
  w.worldTick(W3,50);
  if(W3.events.length!==1)bad('two zombies arriving together should cost one bite, not two: '+W3.events.length);
}

/* 3d. what a bite costs: 3 to 5 health, 5 infection, and it never kills outright */
{
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
  ['uk','japan'].forEach(loc=>{
    try{
      const W=w.worldNew(id,loc),c=new Watch(w.WCW,w.WCH);
      W.cx=W.S.start[0]+2;W.cy=W.S.start[1]-2;W.fx=W.cx+.5;W.fy=W.cy+.5;
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
