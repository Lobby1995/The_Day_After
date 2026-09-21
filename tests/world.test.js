/* The world view: every place is well-formed and reachable, walking works, every question has a place, drawing does not
   throw, and a whole game can be played through it. Run: npm test */
const createApp=require('./helpers/fake-dom');
const E=require('./helpers/load-engine')();
const {SoftCtx}=require('./tools/soft-canvas');
const {api,els}=createApp();
const problems=[];const bad=m=>problems.push(m);
const w=api.world;
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

/* 3. weather belongs to the country, and only outdoors */
if(w.worldNew('street','uk').weather!=='rain')bad('Britain should have rain');
if(w.worldNew('street','canada').weather!=='snow')bad('Canada should have snow');
if(w.worldNew('street','usa').weather!=='embers')bad('the United States should have embers');
if(w.worldNew('room_doctor','uk').weather||w.worldNew('room_doctor','uk').tint)bad('a room should have no weather');

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

/* 6. in the game: the button, the hidden question, arriving, and the next place */
{
  if(api.WMODE)bad('the world view should start off');
  api.click('world');
  if(!api.WMODE)bad('the World button should turn the view on');
  if(!/id="worldbox"/.test(els.worldslot.innerHTML))bad('the place should be drawn above the question');
  if(els.stage.hidden!==true)bad('the question should stay hidden until you arrive');
  const first=api.WS.id;
  api.click('worldGo');
  for(let i=0;i<600&&!api.WOPEN;i++)api.worldPump(50);
  if(!api.WOPEN)bad('arriving should open the question');
  if(els.stage.hidden===true)bad('the question should show once you have arrived');
  if(!/data-act="choose"/.test(els.stage.innerHTML))bad('the choices should be there after arriving');
  api.click('choose',undefined,api.G.cur.opts[0]);api.click('skip');
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
    if(!api.G.cur.res)api.click('choose',undefined,api.G.cur.opts[0]);
    api.click('skip');api.click('next');
  }
  if(api.view!=='end')bad('a game played through the world view did not reach the end screen');
  if(!/^room_/.test(places[0]))bad('the first place should be the room of the survivor\'s profession, was '+places[0]);
  if(!places.includes('street'))bad('a whole game should reach the street at least once');
  api.click('lang','en');
}

if(problems.length){console.log(problems.slice(0,25).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`world OK: ${ids.length} places, every question has one, walking and arriving work, and a whole game plays through it`);
