
/* ---------- the world view: drawing and walking ----------
 * Isometric, drawn on one canvas with plain rectangles and polygons: no images, no libraries.
 * This file is pure drawing and movement. It does not know about the questions; screens.js connects the two.
 */
const WTW=96,WTH=48,WCW=1040,WCH=660;                      // tile width and height, canvas size
const WSPEED=3.2,WZDELAY=1000;                             // tiles per second when you walk. how you move (sneak, walk, run) scales it
const WMODESPEED={sneak:.55,walk:1,run:1.6};
const WBLOCK='#%YTKCBSMVOLFENIAQUGPRwgJZ';                    // characters you cannot walk through
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
 'R':(D,x,y)=>{wb(D,x,y,.14,.14,.86,.8,0,24,WC.grey);},
 'g':(D,x,y)=>{wb(D,x,y,0,0,1,1,0,22,WC.grey);},
 'J':(D,x,y)=>{wb(D,x,y,.04,.12,.96,.88,0,14,WC.white);wb(D,x,y,.04,.12,.96,.88,14,4,WC.teal);wb(D,x,y,.3,.3,.7,.7,18,16,WC.khaki);wb(D,x,y,.46,.46,.54,.54,34,42,WC.metal);},
 'Z':(D,x,y)=>{wb(D,x,y,0,.06,1,.94,8,44,WC.grey);wb(D,x,y,0,.06,1,.94,30,12,WC.glass);wb(D,x,y,.1,.02,.35,.12,0,10,WC.black);wb(D,x,y,.65,.02,.9,.12,0,10,WC.black);}
};

/* ---------- a place, ready to walk in ---------- */
/* read a map: where you come in, where the question waits, how tall the tallest thing is */
function wParse(S){
  if(S.rows)return S;
  S.rows=S.map;S.h=S.rows.length;S.w=S.rows[0].length;
  S.rows.forEach((r,y)=>{for(let x=0;x<r.length;x++){if(r[x]==='@')S.start=[x,y];if(r[x]==='X')S.spot=[x,y];}});
  const TALL={'#':110,'%':150,'Y':158,'L':114,'S':92};let tall=60;S.rows.forEach(r=>{for(const ch of r)if(TALL[ch])tall=Math.max(tall,TALL[ch]);});
  S.tall=tall;
  return S;
}
/* a bigger version of a place: its inside is repeated, mirrored, into a grid of nx by ny, so a ward becomes a longer ward and a street a longer street.
   you come in at the far corner and the question stays where it was: the way there is long, winding, and full of what the place is full of. */
function worldBig(S0,nx,ny){
  wParse(S0);
  const key=nx+'x'+ny;S0._big=S0._big||{};
  if(S0._big[key]!==undefined)return S0._big[key];
  const inner=S0.rows.slice(1).map(r=>r.slice(1)),IH=inner.length,IW=inner[0].length,H=1+IH*ny,W=1+IW*nx;
  const g=Array.from({length:H},()=>Array(W).fill('.'));
  for(let x=0;x<W;x++)g[0][x]=S0.rows[0][1]||'#';
  for(let y=0;y<H;y++)g[y][0]=S0.rows[1][0]||'#';
  g[0][0]=S0.rows[0][0];
  for(let ty=0;ty<ny;ty++)for(let tx=0;tx<nx;tx++)for(let iy=0;iy<IH;iy++)for(let ix=0;ix<IW;ix++){
    let c=inner[ty%2?IH-1-iy:iy][tx%2?IW-1-ix:ix];
    if(c==='@'||c==='X')c='.';
    g[1+ty*IH+iy][1+tx*IW+ix]=c;
  }
  const spot=S0.spot;g[spot[1]][spot[0]]='X';
  /* you come in at the walkable tile nearest the far corner */
  let start=null;
  for(let d=0;d<H+W&&!start;d++)for(let y=H-1;y>=0&&!start;y--){const x=W-1-d+(H-1-y);if(x>=0&&x<W&&'#%Yw'.indexOf(g[y][x])<0&&WBLOCK.indexOf(g[y][x])<0)start=[x,y];}
  if(!start){S0._big[key]=null;return null;}
  g[start[1]][start[0]]='@';
  const B=wParse({id:S0.id,name:S0.name,floor:S0.floor,outdoor:S0.outdoor,tint:S0.tint,npcs:S0.npcs,map:g.map(r=>r.join('')),big:true});
  const path=worldPath(B,B.start,B.spot);
  S0._big[key]=path&&path.length>=14?B:null;
  return S0._big[key];
}
/* the camera follows the survivor when the place is bigger than the screen, and stays put when it fits */
function worldCamera(W,dt,snap){
  const S=W.S,minX=-S.h*WTW/2,maxX=S.w*WTW/2,minY=-S.tall,maxY=(S.w+S.h)*WTH/2;
  let tx,ty;
  if(maxX-minX<=WCW)tx=WCW/2-(minX+maxX)/2;else tx=Math.max(WCW-maxX-40,Math.min(-minX+40,WCW/2-(W.fx-W.fy)*WTW/2));
  if(maxY-minY<=WCH)ty=(WCH-(maxY-minY))/2-minY;else ty=Math.max(WCH-maxY-40,Math.min(-minY+40,WCH*.58-(W.fx+W.fy)*WTH/2));
  const k=snap?1:Math.min(1,dt/220);
  W.ox+=(tx-W.ox)*k;W.oy+=(ty-W.oy)*k;
}
const worldScreen=(W,x,y)=>{const q=wIso(x,y);return[Math.round(W.ox)+q[0],Math.round(W.oy)+q[1]];};

function worldNew(id,loc,opt){
  let S=wParse(WSCENES[id]||WSCENES.street);
  if(opt&&opt.grow){const g=S.grow||(/^(room_|home_)/.test(S.id)||S.id==='cabin'?[1,1]:[2,2]);if(g[0]*g[1]>1)S=worldBig(S,g[0],g[1])||S;}
  /* outdoors, the country decides the weather and the mood; indoors, nothing does */
  const out=S.outdoor&&WWEATHER[loc]?WWEATHER[loc]:{};
  const W={S,id:S.id,weather:out.fx||null,tint:S.tint||out.tint||null,z:[],events:[],zdelay:WZDELAY,hurt:0,flash:0,frozen:false,ox:0,oy:0,
    mode:'walk',eff:'walk',stam:100,winded:false,tm:traitWorld(opt&&opt.traits),stealth:opt&&opt.stealth!=null?opt.stealth:5,
    cx:S.start[0],cy:S.start[1],fx:S.start[0]+.5,fy:S.start[1]+.5,path:[],face:1,t:0,walking:false,goal:null,arrived:false,near:false,queue:null};
  worldCamera(W,0,true);
  worldSpawn(W,opt&&opt.zombies||0,opt&&opt.seed||1);
  return W;
}
const wCell=(S,x,y)=>(x<0||y<0||y>=S.h||x>=S.w)?'#':S.rows[y][x];
function worldWalkable(S,x,y){
  if(WBLOCK.indexOf(wCell(S,x,y))>=0)return false;
  return !S.npcs.some(n=>n.x===x&&n.y===y);
}
/* the shortest way there on the grid, or null */
function worldPath(S,from,to,blocked){
  const key=(x,y)=>y*S.w+x,prev={},q=[from],seen={};seen[key(from[0],from[1])]=1;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(q.length){
    const [x,y]=q.shift();
    if(x===to[0]&&y===to[1]){const out=[];let k=key(x,y);while(prev[k]){out.unshift(prev[k].cell);k=prev[k].from;}return out;}
    for(const d of dirs){const nx=x+d[0],ny=y+d[1],nk=key(nx,ny);
      if(seen[nk]||!worldWalkable(S,nx,ny)||(blocked&&blocked(nx,ny)&&!(nx===to[0]&&ny===to[1])))continue;
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
/* running wears you out. at zero you are winded and can only walk until you have got some breath back. */
function worldStamina(W,dt,running){
  const drain=(W.tm&&W.tm.drain)||1;
  if(running){W.stam=Math.max(0,W.stam-22*drain*dt/1000);if(W.stam<=0)W.winded=true;}
  else W.stam=Math.min(100,W.stam+(W.walking?9:16)*dt/1000);
  if(W.winded&&W.stam>=25)W.winded=false;
}
function worldTick(W,dt){
  W.t+=dt;
  W.eff=(W.mode==='run'&&W.winded)?'walk':(W.mode||'walk');          // winded: you cannot run
  const S=W.S;
  if(W.path.length){
    /* walk along the path; distance left over at a tile carries into the next one, so speed does not depend on the frame rate */
    let rem=WSPEED*(WMODESPEED[W.eff]||1)*(W.eff==='run'?((W.tm&&W.tm.runSpeed)||1):1)*dt/1000;
    while(rem>1e-9&&W.path.length){
      const n=W.path[0],tx=n[0]+.5,ty=n[1]+.5,dx=tx-W.fx,dy=ty-W.fy,d=Math.hypot(dx,dy),sdx=dx-dy;
      if(sdx>.01)W.face=1;else if(sdx<-.01)W.face=-1;
      if(d<=rem){W.fx=tx;W.fy=ty;W.cx=n[0];W.cy=n[1];W.path.shift();rem-=d;}else{W.fx+=dx/d*rem;W.fy+=dy/d*rem;rem=0;}
    }
    W.walking=true;
  }else{
    W.walking=false;
    if(W.queue){const q=W.queue;W.queue=null;worldStep(W,q[0],q[1]);}
  }
  if(!W.path.length&&W.cx===S.spot[0]&&W.cy===S.spot[1])W.arrived=true;
  worldStamina(W,dt,W.walking&&W.eff==='run');
  W.near=Math.hypot(W.fx-(S.spot[0]+.5),W.fy-(S.spot[1]+.5))<2.2;
  if(!W.frozen)worldZombies(W,dt);
  worldCamera(W,dt);
}

/* ---------- drawing ---------- */
function wSprite(D,fx,fy,opts,face,bob,shadow,alpha){
  const c=D.c,S=2,q=wIso(fx,fy),sx=D.ox+q[0],sy=D.oy+q[1];
  const left=Math.round(sx-24),top=Math.round(sy-90-(bob||0));
  /* shadow */
  const pts=[];for(let i=0;i<20;i++){const a=i/20*Math.PI*2;pts.push([sx+Math.cos(a)*22,sy+Math.sin(a)*8]);}
  wPoly(c,pts,shadow||'#000',shadow?.55:.35);
  if(alpha)c.globalAlpha=alpha;
  /* the survivor sprite is drawn on a portrait card: leave the card and its ground strip out, so only the person stands in the room */
  paintSprite((x,y,w,h,col)=>{
    if(x===0&&y===0&&w===24&&h===48)return;
    if(y>=44&&col==='#7a6c52')return;
    c.fillStyle=col;c.fillRect(face<0?left+(24-x-w)*S:left+x*S,top+y*S,w*S,h*S);
  },opts);
  c.globalAlpha=1;
}
/* what a zombie is up to, over its head: a red ! when it has seen you, a yellow ? when it heard something or lost you */
const WGLYPH={'!':['00100','00100','00100','00100','00100','00000','00100'],'?':['01110','10001','00001','00110','00100','00000','00100']};
function wZombieMark(D,z,bob){
  if(z.spent)return;
  const st=z.state,g=st==='chase'?'!':(st==='investigate'||st==='search')?'?':null;if(!g)return;
  const q=wIso(z.fx,z.fy),px=4,x0=D.ox+q[0]-2.5*px,y0=D.oy+q[1]-118-(bob||0),col=g==='!'?'#e0432f':'#e6b93c';
  WGLYPH[g].forEach((row,j)=>{for(let i=0;i<5;i++)if(row[i]==='1'){D.c.fillStyle='#000';D.c.fillRect(x0+i*px+2,y0+j*px+2,px,px);}});
  WGLYPH[g].forEach((row,j)=>{for(let i=0;i<5;i++)if(row[i]==='1'){D.c.fillStyle=col;D.c.fillRect(x0+i*px,y0+j*px,px,px);}});
}
const wZombieOf=z=>({sex:z.sex,age:z.age,skin:z.skin,seed:z.seed,bg:z.bg,inf:92,hpP:.3,marks:[]});
function wSpriteOf(n){return{sex:n.sex,age:n.age,skin:n.skin,seed:n.seed,bg:n.bg,inf:0,hpP:1,marks:[]};}
function worldDraw(c,W,now){
  const S=W.S,D={c,ox:Math.round(W.ox),oy:Math.round(W.oy)};
  now=now||0;
  const vis=(x,y)=>{const px=D.ox+(x-y)*WTW/2,py=D.oy+(x+y)*WTH/2;return px>-170&&px<WCW+170&&py>-170&&py<WCH+170;};   // only draw what can be on screen
  c.globalAlpha=1;c.fillStyle='#0f0f0f';c.fillRect(0,0,WCW,WCH);
  const fl=WFLOOR[S.floor]||WFLOOR.concrete;
  /* floors, and the light pools of lamps and fires */
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){
    const ch=S.rows[y][x];if(ch==='#'||ch==='%'||ch==='Y'||!vis(x+.5,y+.5))continue;
    if(ch==='w'){
      wFlat(D,x,y,x+1,y+1,-3,(x+y)%2?'#1f3a4d':'#1b3446');
      const k=((x*3+y*5)+Math.floor(now/700))%4;
      if(k===0)wFlat(D,x+.2,y+.45,x+.7,y+.52,-3,'#8fb4c8',.35);
      continue;
    }
    wFlat(D,x,y,x+1,y+1,0,fl[(x+y)%2]);
    if(ch==='=')for(const off of[.28,.72]){wFlat(D,x,y+off-.035,x+1,y+off+.035,2,'#7b7f83');for(let sx=.1;sx<1;sx+=.25)wFlat(D,x+sx-.04,y+.12,x+sx+.04,y+.88,0,'#3a2f22',.9);}
    if(ch==='r')wFlat(D,x+.1,y+.1,x+.9,y+.9,0,'#c27803',.35);
    if(S.floor==='road'&&y===5&&x%2===0&&x>0)wFlat(D,x+.15,y+.44,x+.85,y+.56,0,'#c27803',.75);
  }
  /* light from lamps and fires, tile by tile, only where there is floor to light */
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){
    const ch=S.rows[y][x];
    if((ch!=='L'&&ch!=='F')||!vis(x+.5,y+.5))continue;
    const col=ch==='L'?'#f0c060':'#ff9a30',r=ch==='L'?3:2;
    for(let ty=y-r;ty<=y+r;ty++)for(let tx=x-r;tx<=x+r;tx++){
      if(tx<0||ty<0||tx>=S.w||ty>=S.h)continue;
      const c2=S.rows[ty][tx];if(c2==='#'||c2==='%'||c2==='Y'||c2==='w')continue;
      const d=Math.max(Math.abs(tx-x),Math.abs(ty-y));
      wFlat(D,tx,ty,tx+1,ty+1,0,col,d<=1?.11:d<=2?.07:.04);
    }
  }
  /* the hotspot: a ring on the floor, and an arrow that bobs */
  {const sp=S.spot,pulse=.5+.5*Math.sin(now/300);
   const ring=(r,alpha)=>{const pts=[];for(let i=0;i<28;i++){const a=i/28*Math.PI*2,p=[sp[0]+.5+Math.cos(a)*r,sp[1]+.5+Math.sin(a)*r],q=wIso(p[0],p[1]);pts.push([D.ox+q[0],D.oy+q[1]]);}wPoly(c,pts,'#c27803',alpha);};
   ring(.5,.30+.25*pulse);ring(.32,.22+.18*pulse);}
  /* how loud you are: a ring on the floor around you while you move */
  if(W.walking){const r=worldPresence(W).noise,pts=[];for(let i=0;i<32;i++){const a=i/32*Math.PI*2,q=wIso(W.fx+Math.cos(a)*r,W.fy+Math.sin(a)*r);pts.push([D.ox+q[0],D.oy+q[1]]);}wPoly(c,pts,'#c27803',W.mode==='run'?.13:.07);}
  /* everything that stands up, back to front */
  const items=[];
  for(let y=0;y<S.h;y++)for(let x=0;x<S.w;x++){const ch=S.rows[y][x];if(WO[ch]&&vis(x+.5,y+.5))items.push({d:x+y,fn:()=>WO[ch](D,x,y,now,S)});}
  S.npcs.forEach(n=>items.push({d:n.x+n.y+.6,fn:()=>wSprite(D,n.x+.5,n.y+.5,wSpriteOf(n),n.face==='l'?-1:1,0)}));
  W.z.forEach(z=>items.push({d:z.fx+z.fy-.3,fn:()=>{const bb=z.walking?Math.abs(Math.sin(W.t/230+z.seed))*3:0;wSprite(D,z.fx,z.fy,wZombieOf(z),z.face,bb,'#7a1410',z.spent?.7:0);wZombieMark(D,z,bb);}}));
  const bob=W.walking?Math.abs(Math.sin(W.t/90))*5:0;
  items.push({d:W.fx+W.fy-.4,fn:()=>wSprite(D,W.fx,W.fy,sprGame(),W.face,bob)});
  items.sort((a,b)=>a.d-b.d).forEach(i=>i.fn());
  /* the arrow over the question */
  {const sp=S.spot,q=wIso(sp[0]+.5,sp[1]+.5),ax=D.ox+q[0],ay=D.oy+q[1]-96-Math.sin(now/260)*6;
   wPoly(c,[[ax-14,ay-16],[ax+14,ay-16],[ax,ay+6]],'#c27803');wPoly(c,[[ax-14,ay-16],[ax+14,ay-16],[ax,ay+6]],'#000',.15);}
  /* keen hearing: zombies close by are marked even where a wall hides them */
  if(W.tm&&W.tm.ears)W.z.forEach(z=>{
    if(z.spent||Math.hypot(z.fx-W.fx,z.fy-W.fy)>7)return;
    const q=wIso(z.fx,z.fy),pts=[];for(let i=0;i<16;i++){const a=i/16*Math.PI*2;pts.push([D.ox+q[0]+Math.cos(a)*11,D.oy+q[1]-3+Math.sin(a)*5]);}
    wPoly(c,pts,'#e0432f',.55);
  });
  /* stamina, while it is not full */
  if(W.stam<99.5||W.eff==='run'){const bw=150,x0=24,y0=WCH-40,f=Math.max(0,Math.min(1,W.stam/100));
    c.fillStyle='#000';c.fillRect(x0-2,y0-2,bw+4,16);c.fillStyle='#2a2a2a';c.fillRect(x0,y0,bw,12);
    c.fillStyle=W.winded?'#e0432f':'#c27803';c.fillRect(x0,y0,Math.round(bw*f),12);}
  /* when the question is off screen (a big place), an arrow at the edge of the picture points toward it */
  {const sp=S.spot,q=wIso(sp[0]+.5,sp[1]+.5),px=D.ox+q[0],py=D.oy+q[1]-40,m=46;
   if(px<m||px>WCW-m||py<m||py>WCH-m){
     const cx=WCW/2,cy=WCH/2,dx=px-cx,dy=py-cy,k=Math.min((WCW/2-m)/Math.abs(dx||.001),(WCH/2-m)/Math.abs(dy||.001)),ex=cx+dx*k,ey=cy+dy*k,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
     const tri=(o,col)=>wPoly(c,[[ex+ux*(20+o),ey+uy*(20+o)],[ex-ux*6-uy*15+ux*o*.3,ey-uy*6+ux*15+uy*o*.3],[ex-ux*6+uy*15+ux*o*.3,ey-uy*6-ux*15+uy*o*.3]],col);
     tri(3,'#000');tri(0,'#c27803');
   }}
  /* the weather of the country, and the mood */
  const wx=W.weather,tint=W.tint;
  if(tint){c.fillStyle=tint;c.fillRect(0,0,WCW,WCH);}
  if(wx==='rain'){c.strokeStyle='rgba(170,190,220,.5)';c.lineWidth=2;for(let i=0;i<90;i++){const x=(i*83+now*.04)%WCW,y=(i*47+now*.7)%WCH;c.beginPath();c.moveTo(x,y);c.lineTo(x-7,y+18);c.stroke();}}
  if(wx==='snow'){c.fillStyle='#e8eef5';c.globalAlpha=.75;for(let i=0;i<80;i++){const x=(i*97+Math.sin(now/900+i)*20+now*.02)%WCW,y=(i*53+now*.09)%WCH;c.fillRect(x,y,4,4);}c.globalAlpha=1;}
  if(W.flash>0){c.fillStyle='rgba(150,20,20,'+(.4*Math.min(1,W.flash/650)).toFixed(2)+')';c.fillRect(0,0,WCW,WCH);}
  if(wx==='embers'){c.fillStyle='#ff9a30';c.globalAlpha=.8;for(let i=0;i<40;i++){const x=(i*131+Math.sin(now/700+i)*16)%WCW,y=WCH-((i*61+now*.07)%WCH);c.fillRect(x,y,3,3);}c.globalAlpha=1;}
}
