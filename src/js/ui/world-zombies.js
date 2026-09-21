
/* ---------- zombies: they do not know you are there until they see you or hear you ----------
 *  idle      standing still, or shuffling about. most of them, at first.
 *  wander    a slow walk to somewhere nearby, a pause, another walk.
 *  investigate  heard something: go to where you were when you made the noise.
 *  chase     saw you: come straight at you, faster than any of the others, but slower than you can run.
 *  search    lost you: go to where you were last seen, look around, then go back to wandering.
 * How far they see and hear depends on how you move (sneak, walk, run) and on how good you are at stealth.
 * Walls block sight, but not sound. A zombie that starts chasing calls the ones near it.
 * A zombie that reaches you bites once: the game takes a few health and adds infection (see zombieBite). Then it loses interest and goes home.
 */
const WZBG=['student','teacher','mechanic','soldier','politician','journalist','firefighter','doctor'];
const WSIGHT={sneak:3,walk:5,run:6};                       // tiles you can be seen from, in front of a zombie
const WNOISE={sneak:1.5,walk:3,run:7,still:.6};            // tiles you can be heard from
const WZS={idle:0,wander:.9,investigate:1.3,search:1.1,chase:2,home:1.1};   // tiles per second, by what the zombie is doing
const WLOSBLOCK='#%YSMAVZIQ';                              // things you cannot see past
function wRng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
/* how many steps from `from` to every tile you can walk to */
function worldDistances(S,from){
  const d={},q=[from];d[from[1]*S.w+from[0]]=0;
  while(q.length){const [x,y]=q.shift(),k=y*S.w+x;
    for(const m of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+m[0],ny=y+m[1],nk=ny*S.w+nx;
      if(d[nk]!==undefined||!worldWalkable(S,nx,ny))continue;d[nk]=d[k]+1;q.push([nx,ny]);}}
  return d;
}
/* can (x0,y0) see (x1,y1)? a line of tiles, and nothing tall in between */
function worldLOS(S,x0,y0,x1,y1){
  let dx=Math.abs(x1-x0),dy=Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,er=dx-dy,x=x0,y=y0;
  while(!(x===x1&&y===y1)){
    const e2=2*er;if(e2>-dy){er-=dy;x+=sx;}if(e2<dx){er+=dx;y+=sy;}
    if(x===x1&&y===y1)break;
    if(WLOSBLOCK.indexOf(wCell(S,x,y))>=0)return false;
  }
  return true;
}
function worldSpawn(W,n,seed){
  const S=W.S;if(!n)return;
  const rnd=wRng(seed*7919+S.w*31+S.h),dist=worldDistances(S,S.start),cands=[];
  const far=S.big?8:6;
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){
    const d=dist[y*S.w+x];
    if(d===undefined||!worldWalkable(S,x,y))continue;
    if(Math.abs(x-S.spot[0])+Math.abs(y-S.spot[1])<3)continue;
    if(x===S.start[0]&&y===S.start[1])continue;
    cands.push({x,y,d});
  }
  const list=(cands.filter(c=>c.d>=far).length>=n?cands.filter(c=>c.d>=far):cands.filter(c=>c.d>=3)).slice(),chosen=[];
  const gap=S.big?3:4;
  while(chosen.length<n&&list.length){
    const c=list.splice(Math.floor(rnd()*list.length),1)[0];
    if(chosen.every(o=>Math.abs(o.x-c.x)+Math.abs(o.y-c.y)>=gap))chosen.push(c);
  }
  chosen.forEach(c=>W.z.push({x:c.x,y:c.y,fx:c.x+.5,fy:c.y+.5,path:[],spawn:[c.x,c.y],stun:0,spent:false,walking:false,face:rnd()<.5?-1:1,
    state:rnd()<.45?'idle':'wander',dir:[rnd()<.5?1:-1,0],think:Math.floor(rnd()*400),timer:800+Math.floor(rnd()*3000),lost:0,target:null,spd:.9+rnd()*.2,
    sex:rnd()<.5?'m':'f',age:24+Math.floor(rnd()*40),skin:Math.floor(rnd()*4),seed:Math.floor(rnd()*9),bg:WZBG[Math.floor(rnd()*WZBG.length)]}));
}
/* what you give away: how far you can be seen, how far you can be heard */
function worldPresence(W){
  const mode=W.mode||'walk',st=W.stealth==null?5:W.stealth,mult=Math.max(.6,1.25-.05*st);
  return{sight:WSIGHT[mode]*mult,noise:(W.walking?WNOISE[mode]:WNOISE.still)*mult};
}
function wAlert(W,z){
  W.z.forEach(o=>{
    if(o===z||o.spent)return;
    const st=o.state||'idle';
    if((st==='idle'||st==='wander')&&Math.hypot(o.fx-z.fx,o.fy-z.fy)<4){o.state='investigate';o.target=[W.cx,W.cy];o.timer=6000;o.path=[];}
  });
}
function worldZombies(W,dt){
  const S=W.S;
  W.hurt=Math.max(0,W.hurt-dt);W.flash=Math.max(0,W.flash-dt);
  if(W.zdelay>0){W.zdelay-=dt;return;}
  const pr=worldPresence(W);
  W.z.forEach(z=>{
    if(z.stun>0){z.stun-=dt;z.walking=false;return;}
    z.state=z.state||'idle';z.dir=z.dir||[1,0];z.spd=z.spd||1;z.timer=z.timer||0;
    /* notice: every so often, not every frame */
    z.think=(z.think||0)-dt;
    if(z.think<=0&&!z.spent){
      z.think=180;
      const vx=W.fx-z.fx,vy=W.fy-z.fy,pd=Math.hypot(vx,vy)||.001,dot=(vx*z.dir[0]+vy*z.dir[1])/pd;
      const sees=pd<=pr.sight&&(dot>.26||pd<1.6)&&worldLOS(S,z.x,z.y,W.cx,W.cy);
      const hears=pd<=pr.noise;
      if(sees){if(z.state!=='chase')wAlert(W,z);z.state='chase';z.lost=0;z.last=[W.cx,W.cy];z.timer=0;}
      else if(z.state==='chase'){
        z.lost+=180;
        if(z.lost>3500){z.state='search';z.target=z.last||[W.cx,W.cy];z.timer=4200;z.path=[];}
      }else if(hears&&(z.state==='idle'||z.state==='wander'||z.state==='search')){z.state='investigate';z.target=[W.cx,W.cy];z.timer=7000;z.path=[];}
    }
    /* move along the path, one tile at a time */
    const sp=(WZS[z.state]||0)*z.spd,step=sp*dt/1000;
    if(z.path.length&&sp>0){
      const n=z.path[0],tx=n[0]+.5,ty=n[1]+.5,dx=tx-z.fx,dy=ty-z.fy,d=Math.hypot(dx,dy),sdx=dx-dy;
      if(sdx>.01)z.face=1;else if(sdx<-.01)z.face=-1;
      if(d>.001)z.dir=[dx/d,dy/d];
      if(d<=step){z.fx=tx;z.fy=ty;z.x=n[0];z.y=n[1];z.path.shift();}else{z.fx+=dx/d*step;z.fy+=dy/d*step;}
      z.walking=true;
    }else z.walking=false;
    /* decide what to do at a tile */
    if(!z.path.length){
      const goTo=(g)=>{
        if(z.x===g[0]&&z.y===g[1])return true;
        const p=worldPath(S,[z.x,z.y],g,(x,y)=>W.z.some(o=>o!==z&&o.x===x&&o.y===y));
        if(p&&p.length)z.path=[p[0]];return false;
      };
      z.timer-=dt;
      if(z.spent)goTo(z.spawn);
      else if(z.state==='chase')goTo([W.cx,W.cy]);
      else if(z.state==='investigate'){if(goTo(z.target||[W.cx,W.cy])||z.timer<=0){z.state='search';z.timer=3500;z.target=null;}}
      else if(z.state==='search'){
        if(z.target){if(goTo(z.target))z.target=null;}
        else if(z.timer<=0){z.state='wander';z.timer=1500+Math.random()*2500;}
      }else if(z.state==='wander'){
        if(z.timer<=0){
          /* somewhere nearby and walkable */
          for(let k=0;k<6;k++){
            const nx=z.x+Math.round((Math.random()-.5)*8),ny=z.y+Math.round((Math.random()-.5)*8);
            if(worldWalkable(S,nx,ny)&&(nx!==z.x||ny!==z.y)){z.target=[nx,ny];break;}
          }
          if(z.target){if(goTo(z.target))z.target=null;else if(!z.path.length){z.target=null;z.timer=900;}else z.timer=99999;}else z.timer=1500;
        }else if(z.target){if(goTo(z.target)){z.target=null;z.timer=1800+Math.random()*3200;}else if(!z.path.length){z.target=null;z.timer=900;}}
      }else if(z.state==='idle'&&z.timer<=0){z.timer=4000+Math.random()*6000;if(Math.random()<.25)z.state='wander';}
    }
    /* reach you: one bite, then it loses interest */
    if(!z.spent&&W.hurt<=0&&Math.hypot(z.fx-W.fx,z.fy-W.fy)<.62){
      z.spent=true;z.state='home';z.stun=2600;z.path=[];z.x=Math.round(z.fx-.5);z.y=Math.round(z.fy-.5);z.fx=z.x+.5;z.fy=z.y+.5;
      W.hurt=1600;W.flash=650;W.events.push({type:'bite'});
    }
  });
}
