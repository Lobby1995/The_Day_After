
/* ---------- the world view: drawing and walking ----------
 * Isometric, drawn on one canvas with plain rectangles and polygons: no images, no libraries.
 * This file is pure drawing and movement. It does not know about the questions; screens.js connects the two.
 */
const WTW=96,WTH=48,WCW=1040,WCH=660,WSPEED=5;           // tile width and height, canvas size, tiles per second
const WBLOCK='#%YTKCBSMVOLFENIAQUGPR';                    // characters you cannot walk through
const WSHADE=(hex,a)=>shadeC(hex,a);
const wcol=base=>({t:WSHADE(base,.14),l:WSHADE(base,-.38),r:WSHADE(base,-.2)});
const WC={
  wall:wcol('#3b3b3b'),building:wcol('#2b2b31'),wood:wcol('#8c7b65'),dark:wcol('#4a3e30'),metal:wcol('#62676b'),olive:wcol('#4a5320'),
  khaki:wcol('#a89773'),rust:wcol('#8a4a24'),white:wcol('#cfd2cf'),teal:wcol('#3a7f7a'),bed:wcol('#3d4a5c'),grey:wcol('#555a5e'),
  green:wcol('#3f5a23'),green2:wcol('#4d6b2c'),trunk:wcol('#4b3826'),board:wcol('#26382a'),tent:wcol('#7d6b45'),glass:wcol('#3a4e5c'),fire:wcol('#c27803'),
  amber:wcol('#c27803'),pot:wcol('#7a4a30'),black:wcol('#1d1d1d'),sofa:wcol('#59492c')
};
const wIso=(x,y)=>[(x-y)*WTW/2,(x+y)*WTH/2];
function wPoly(c,pts,fill,alpha){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();if(alpha!==undefined)c.globalAlpha=alpha;c.fillStyle=fill;c.fill();if(alpha!==undefined)c.globalAlpha=1;}
/* a box standing on the floor: tile-space footprint (x0,y0)-(x1,y1), starting z0 pixels up, h pixels tall */
function wBox(D,x0,y0,x1,y1,z0,h,col){
  const P=(x,y,z)=>{const q=wIso(x,y);return[D.ox+q[0],D.oy+q[1]-z];};
  wPoly(D.c,[P(x0,y1,z0),P(x1,y1,z0),P(x1,y1,z0+h),P(x0,y1,z0+h)],col.l);
  wPoly(D.c,[P(x1,y0,z0),P(x1,y1,z0),P(x1,y1,z0+h),P(x1,y0,z0+h)],col.r);
  wPoly(D.c,[P(x0,y0,z0+h),P(x1,y0,z0+h),P(x1,y1,z0+h),P(x0,y1,z0+h)],col.t);
}
function wFlat(D,x0,y0,x1,y1,z,fill,alpha){const P=(x,y)=>{const q=wIso(x,y);return[D.ox+q[0],D.oy+q[1]-z];};wPoly(D.c,[P(x0,y0),P(x1,y0),P(x1,y1),P(x0,y1)],fill,alpha);}
/* a window on the two faces you can see of a wall or a building */
function wWindows(D,x,y,h,lit,rows){
  const P=(px,py,z)=>{const q=wIso(px,py);return[D.ox+q[0],D.oy+q[1]-z];};
  for(let r=0;r<rows;r++){
    const z0=28+r*44,z1=z0+24;
    const fillL=lit&&((x*7+y*13+r)%3!==0)?'#c8963c':'#15181c';
    const fillR=lit&&((x*5+y*11+r)%3!==1)?'#c8963c':'#15181c';
    wPoly(D.c,[P(x+.2,y+1,z0),P(x+.8,y+1,z0),P(x+.8,y+1,z1),P(x+.2,y+1,z1)],fillL,lit?.85:1);
    wPoly(D.c,[P(x+1,y+.2,z0),P(x+1,y+.8,z0),P(x+1,y+.8,z1),P(x+1,y+.2,z1)],fillR,lit?.85:1);
  }
}
const wb=(D,x,y,a,b,c,d,z0,h,col)=>wBox(D,x+a,y+b,x+c,y+d,z0,h,col);

/* how each character in a map is drawn. t is the time in ms, for the few things that move. */
const WO={
 '#':(D,x,y)=>{wb(D,x,y,0,0,1,1,0,110,WC.wall);wWindows(D,x,y,110,false,0);},
 '%':(D,x,y,t,S)=>{wb(D,x,y,0,0,1,1,0,150,WC.building);wWindows(D,x,y,150,true,3);},
 'Y':(D,x,y)=>{wb(D,x,y,.4,.4,.6,.6,0,64,WC.trunk);wb(D,x,y,.05,.05,.95,.95,64,54,WC.green);wb(D,x,y,.22,.22,.78,.78,118,40,WC.green2);},
 'T':(D,x,y)=>{wb(D,x,y,.03,.03,.97,.97,0,30,WC.wood);wFlat(D,x+.3,y+.32,x+.62,y+.6,30,'#cfc9b4');},
 'K':(D,x,y,t)=>{wb(D,x,y,.03,.03,.97,.97,0,30,WC.wood);wb(D,x,y,.5,.3,.85,.45,30,20,WC.black);wFlat(D,x+.52,y+.33,x+.83,y+.43,42,(Math.floor(t/500)%4===0)?'#8fd0a0':'#5a8f6a');},
 'C':(D,x,y)=>{wb(D,x,y,.2,.2,.8,.8,0,16,WC.dark);wb(D,x,y,.2,.2,.8,.34,16,28,WC.dark);},
 'B':(D,x,y)=>{wb(D,x,y,.02,.02,.98,.98,0,16,WC.dark);wb(D,x,y,.06,.06,.94,.94,16,7,WC.bed);wb(D,x,y,.1,.1,.4,.9,23,6,WC.white);},
 'S':(D,x,y)=>{wb(D,x,y,.05,.05,.95,.5,0,92,WC.dark);wb(D,x,y,.14,.3,.3,.48,52,12,WC.rust);wb(D,x,y,.36,.3,.5,.48,52,16,WC.olive);wb(D,x,y,.56,.3,.72,.48,26,14,WC.khaki);wb(D,x,y,.14,.3,.3,.48,26,10,WC.teal);wb(D,x,y,.56,.3,.8,.48,78,10,WC.wood);},
 'M':(D,x,y,t)=>{wb(D,x,y,.1,.1,.9,.9,0,46,WC.metal);wb(D,x,y,.62,.62,.82,.82,46,7,(Math.floor(t/600)%2)?WC.amber:WC.grey);wb(D,x,y,.18,.18,.5,.5,46,10,WC.black);},
 'V':(D,x,y)=>{wb(D,x,y,.04,.1,.96,.9,8,20,WC.rust);wb(D,x,y,.2,.22,.8,.78,28,16,WC.glass);wb(D,x,y,.1,.04,.3,.14,0,10,WC.black);wb(D,x,y,.7,.86,.9,.96,0,10,WC.black);},
 'O':(D,x,y)=>{wb(D,x,y,.4,.4,.6,.6,0,22,WC.metal);wb(D,x,y,.08,.08,.92,.92,22,8,WC.white);wb(D,x,y,.1,.1,.5,.9,30,4,WC.teal);},
 'L':(D,x,y)=>{wb(D,x,y,.44,.44,.56,.56,0,104,WC.metal);wb(D,x,y,.34,.34,.66,.66,104,10,WC.amber);},
 'F':(D,x,y,t)=>{wb(D,x,y,.25,.25,.75,.75,0,34,WC.black);const f=8+((Math.floor(t/120)%3)*4);wb(D,x,y,.34,.34,.66,.66,34,f,WC.fire);},
 'E':(D,x,y)=>{wb(D,x,y,.1,.1,.9,.9,0,26,WC.khaki);wb(D,x,y,.44,.08,.56,.92,0,27,WC.dark);},
 'N':(D,x,y)=>{wb(D,x,y,.22,.22,.78,.78,0,56,WC.wood);wb(D,x,y,.16,.16,.84,.84,56,5,WC.dark);},
 'I':(D,x,y)=>{wb(D,x,y,.04,.0,.96,.12,26,48,WC.board);},
 'A':(D,x,y)=>{wb(D,x,y,.08,.08,.92,.92,0,38,WC.tent);wb(D,x,y,.3,.9,.7,.92,0,26,WC.black);},
 'Q':(D,x,y)=>{wb(D,x,y,0,.08,1,.92,0,34,WC.grey);},
 'U':(D,x,y)=>{wb(D,x,y,.05,.15,.95,.95,0,20,WC.sofa);wb(D,x,y,.05,.15,.95,.36,20,24,WC.sofa);},
 'G':(D,x,y)=>{wb(D,x,y,.04,.15,.96,.85,0,18,WC.khaki);},
 'P':(D,x,y)=>{wb(D,x,y,.34,.34,.66,.66,0,14,WC.pot);wb(D,x,y,.22,.22,.78,.78,14,22,WC.green2);},
 'R':(D,x,y)=>{wb(D,x,y,.14,.14,.86,.8,0,24,WC.grey);}
};

/* ---------- a place, ready to walk in ---------- */
function worldNew(id,loc){
  const S=WSCENES[id]||WSCENES.street;
  if(!S.rows){
    S.rows=S.map;S.h=S.rows.length;S.w=S.rows[0].length;
    S.rows.forEach((r,y)=>{for(let x=0;x<r.length;x++){if(r[x]==='@')S.start=[x,y];if(r[x]==='X')S.spot=[x,y];}});
    let tall=110;S.rows.forEach(r=>{if(r.indexOf('%')>=0)tall=Math.max(tall,150);if(r.indexOf('Y')>=0)tall=Math.max(tall,158);});
    S.tall=tall;
  }
  const minY=-S.tall,maxY=(S.w+S.h)*WTH/2;
  const cx=(S.w-S.h)*WTW/4;
  /* outdoors, the country decides the weather and the mood; indoors, nothing does */
  const out=(id==='street'||id==='wild'||id==='camp')&&WWEATHER[loc]?WWEATHER[loc]:{};
  return{S,id:S.id,weather:out.fx||null,tint:out.tint||null,ox:Math.round(WCW/2-cx),oy:Math.round((WCH-(maxY-minY))/2-minY),
    cx:S.start[0],cy:S.start[1],fx:S.start[0]+.5,fy:S.start[1]+.5,path:[],face:1,t:0,walking:false,goal:null,arrived:false,near:false,queue:null};
}
const wCell=(S,x,y)=>(x<0||y<0||y>=S.h||x>=S.w)?'#':S.rows[y][x];
function worldWalkable(S,x,y){
  if(WBLOCK.indexOf(wCell(S,x,y))>=0)return false;
  return !S.npcs.some(n=>n.x===x&&n.y===y);
}
/* the shortest way there on the grid, or null */
function worldPath(S,from,to){
  const key=(x,y)=>y*S.w+x,prev={},q=[from],seen={};seen[key(from[0],from[1])]=1;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(q.length){
    const [x,y]=q.shift();
    if(x===to[0]&&y===to[1]){const out=[];let k=key(x,y);while(prev[k]){out.unshift(prev[k].cell);k=prev[k].from;}return out;}
    for(const d of dirs){const nx=x+d[0],ny=y+d[1],nk=key(nx,ny);
      if(seen[nk]||!worldWalkable(S,nx,ny))continue;
      seen[nk]=1;prev[nk]={from:key(x,y),cell:[nx,ny]};q.push([nx,ny]);}
  }
  return null;
}
/* one step in a screen direction: up, down, left, right. blocked diagonals fall back to a single axis. */
function worldStep(W,dx,dy){
  if(W.path.length)return false;
  const S=W.S,tries=[[dx,dy]];
  if(dx&&dy)tries.push([dx,0],[0,dy]);
  for(const t of tries){
    const nx=W.cx+t[0],ny=W.cy+t[1];
    if(!worldWalkable(S,nx,ny))continue;
    if(t[0]&&t[1]&&(!worldWalkable(S,W.cx+t[0],W.cy)||!worldWalkable(S,W.cx,W.cy+t[1])))continue;
    W.path=[[nx,ny]];return true;
  }
  return false;
}
const WKEYS={ArrowUp:[-1,-1],w:[-1,-1],ArrowDown:[1,1],s:[1,1],ArrowLeft:[-1,1],a:[-1,1],ArrowRight:[1,-1],d:[1,-1]};
function worldKey(W,key){
  if(key==='e'||key==='E'||key==='Enter'||key===' ')return worldGo(W);
  const m=WKEYS[key];if(!m)return false;
  if(W.path.length){W.queue=m;return true;}
  W.goal=null;return worldStep(W,m[0],m[1]);
}
/* walk to where the question waits */
function worldGo(W){
  const p=worldPath(W.S,[W.cx,W.cy],W.S.spot);
  if(!p)return false;
  W.path=p;W.goal='spot';W.queue=null;return true;
}
/* a tap or a click, in canvas pixels */
function worldTap(W,mx,my){
  const sx=mx-W.ox,sy=my-W.oy,a=sx/(WTW/2),b=sy/(WTH/2);
  const x=Math.floor((a+b)/2),y=Math.floor((b-a)/2),S=W.S;
  const onSpot=Math.abs(x-S.spot[0])<=1&&Math.abs(y-S.spot[1])<=1,onNpc=S.npcs.some(n=>n.x===x&&n.y===y);
  if(onSpot||onNpc)return worldGo(W);
  if(!worldWalkable(S,x,y))return false;
  const p=worldPath(S,[W.cx,W.cy],[x,y]);
  if(!p)return false;
  W.path=p;W.goal=null;W.queue=null;return true;
}
function worldTick(W,dt){
  W.t+=dt;
  const S=W.S;
  if(W.path.length){
    const n=W.path[0],tx=n[0]+.5,ty=n[1]+.5,dx=tx-W.fx,dy=ty-W.fy,d=Math.hypot(dx,dy),step=WSPEED*dt/1000;
    const sdx=dx-dy;if(sdx>.01)W.face=1;else if(sdx<-.01)W.face=-1;
    if(d<=step){W.fx=tx;W.fy=ty;W.cx=n[0];W.cy=n[1];W.path.shift();}else{W.fx+=dx/d*step;W.fy+=dy/d*step;}
    W.walking=true;
  }else{
    W.walking=false;
    if(W.queue){const q=W.queue;W.queue=null;worldStep(W,q[0],q[1]);}
  }
  if(!W.path.length&&W.cx===S.spot[0]&&W.cy===S.spot[1])W.arrived=true;
  W.near=Math.hypot(W.fx-(S.spot[0]+.5),W.fy-(S.spot[1]+.5))<2.2;
}

/* ---------- drawing ---------- */
function wSprite(D,fx,fy,opts,face,bob){
  const c=D.c,S=2,q=wIso(fx,fy),sx=D.ox+q[0],sy=D.oy+q[1];
  const left=Math.round(sx-24),top=Math.round(sy-90-(bob||0));
  /* shadow */
  const pts=[];for(let i=0;i<20;i++){const a=i/20*Math.PI*2;pts.push([sx+Math.cos(a)*22,sy+Math.sin(a)*8]);}
  wPoly(c,pts,'#000',.35);
  /* the survivor sprite is drawn on a portrait card: leave the card and its ground strip out, so only the person stands in the room */
  paintSprite((x,y,w,h,col)=>{
    if(x===0&&y===0&&w===24&&h===48)return;
    if(y>=44&&col==='#7a6c52')return;
    c.fillStyle=col;c.fillRect(face<0?left+(24-x-w)*S:left+x*S,top+y*S,w*S,h*S);
  },opts);
}
function wSpriteOf(n){return{sex:n.sex,age:n.age,skin:n.skin,seed:n.seed,bg:n.bg,inf:0,hpP:1,marks:[]};}
function worldDraw(c,W,now){
  const S=W.S,D={c,ox:W.ox,oy:W.oy};
  now=now||0;
  c.globalAlpha=1;c.fillStyle='#0f0f0f';c.fillRect(0,0,WCW,WCH);
  const fl=WFLOOR[S.floor]||WFLOOR.concrete;
  /* floors, and the light pools of lamps and fires */
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){
    const ch=S.rows[y][x];if(ch==='#'||ch==='%'||ch==='Y')continue;
    wFlat(D,x,y,x+1,y+1,0,fl[(x+y)%2]);
    if(ch==='r')wFlat(D,x+.1,y+.1,x+.9,y+.9,0,'#c27803',.35);
    if(S.floor==='road'&&y===5&&x%2===0&&x>0)wFlat(D,x+.15,y+.44,x+.85,y+.56,0,'#c27803',.75);
  }
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){
    const ch=S.rows[y][x];
    if(ch==='L'||ch==='F'){const r=ch==='L'?2.6:2.2;wFlat(D,x+.5-r,y+.5-r,x+.5+r,y+.5+r,0,ch==='L'?'#f0c060':'#ff9a30',.09);wFlat(D,x+.5-r*.55,y+.5-r*.55,x+.5+r*.55,y+.5+r*.55,0,ch==='L'?'#f0c060':'#ff9a30',.10);}
  }
  /* the hotspot: a ring on the floor, and an arrow that bobs */
  {const sp=S.spot,pulse=.5+.5*Math.sin(now/300);
   const ring=(r,alpha)=>{const pts=[];for(let i=0;i<28;i++){const a=i/28*Math.PI*2,p=[sp[0]+.5+Math.cos(a)*r,sp[1]+.5+Math.sin(a)*r],q=wIso(p[0],p[1]);pts.push([D.ox+q[0],D.oy+q[1]]);}wPoly(c,pts,'#c27803',alpha);};
   ring(.5,.30+.25*pulse);ring(.32,.22+.18*pulse);}
  /* everything that stands up, back to front */
  const items=[];
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){const ch=S.rows[y][x];if(WO[ch])items.push({d:x+y,fn:()=>WO[ch](D,x,y,now,S)});}
  S.npcs.forEach(n=>items.push({d:n.x+n.y+.6,fn:()=>wSprite(D,n.x+.5,n.y+.5,wSpriteOf(n),n.face==='l'?-1:1,0)}));
  const bob=W.walking?Math.abs(Math.sin(W.t/90))*5:0;
  items.push({d:W.fx+W.fy-.4,fn:()=>wSprite(D,W.fx,W.fy,sprGame(),W.face,bob)});
  items.sort((a,b)=>a.d-b.d).forEach(i=>i.fn());
  /* the arrow over the question */
  {const sp=S.spot,q=wIso(sp[0]+.5,sp[1]+.5),ax=D.ox+q[0],ay=D.oy+q[1]-96-Math.sin(now/260)*6;
   wPoly(c,[[ax-14,ay-16],[ax+14,ay-16],[ax,ay+6]],'#c27803');wPoly(c,[[ax-14,ay-16],[ax+14,ay-16],[ax,ay+6]],'#000',.15);}
  /* the weather of the country, and the mood */
  const wx=W.weather,tint=W.tint;
  if(tint){c.fillStyle=tint;c.fillRect(0,0,WCW,WCH);}
  if(wx==='rain'){c.strokeStyle='rgba(170,190,220,.5)';c.lineWidth=2;for(let i=0;i<90;i++){const x=(i*83+now*.04)%WCW,y=(i*47+now*.7)%WCH;c.beginPath();c.moveTo(x,y);c.lineTo(x-7,y+18);c.stroke();}}
  if(wx==='snow'){c.fillStyle='#e8eef5';c.globalAlpha=.75;for(let i=0;i<80;i++){const x=(i*97+Math.sin(now/900+i)*20+now*.02)%WCW,y=(i*53+now*.09)%WCH;c.fillRect(x,y,4,4);}c.globalAlpha=1;}
  if(wx==='embers'){c.fillStyle='#ff9a30';c.globalAlpha=.8;for(let i=0;i<40;i++){const x=(i*131+Math.sin(now/700+i)*16)%WCW,y=WCH-((i*61+now*.07)%WCH);c.fillRect(x,y,3,3);}c.globalAlpha=1;}
}
