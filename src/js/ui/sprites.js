/* ---------- pixel-art survivors ---------- */
const SKINS=['#e2b899','#c99373','#a8714f','#7d4d34'];
const hash=s=>{let h=7;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h;};
function shadeC(hex,a){
  const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;
  const f=a<0?(v=>Math.round(v*(1+a))):(v=>Math.round(v+(255-v)*a));
  return'#'+[f(r),f(g),f(b)].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('');
}
function mixC(a,b,t){
  const x=parseInt(a.slice(1),16),y=parseInt(b.slice(1),16);
  const c=(s)=>Math.round(((x>>s)&255)*(1-t)+((y>>s)&255)*t);
  return'#'+[c(16),c(8),c(0)].map(v=>v.toString(16).padStart(2,'0')).join('');
}
const OUTFIT={
  student:{top:'#3f5f8a',pants:'#3a3f4a',boots:'#d7d0c0'},
  firefighter:{top:'#c99a2e',pants:'#2d2d31',boots:'#1a1a1a'},
  teacher:{top:'#7d6b45',pants:'#4b4b55',boots:'#3b2a20'},
  politician:{top:'#26282f',pants:'#26282f',boots:'#0f0f10'},
  soldier:{top:'#4f5a3c',pants:'#4a5537',boots:'#141414'},
  doctor:{top:'#dcdad2',pants:'#3f7f8c',boots:'#d0cfc8'},
  mechanic:{top:'#4b6478',pants:'#4b6478',boots:'#5b3a24'},
  journalist:{top:'#2f2f33',pants:'#5a5140',boots:'#3b2a20'}
};
/* F(x,y,w,h,color) fills a rectangle on a 24x48 grid */
function paintSprite(F,o){
  if(o.bg==='?'){
    F(0,0,24,48,'#a89773');F(6,44,12,1,'#7a6c52');F(4,45,16,2,'#7a6c52');F(6,47,12,1,'#7a6c52');
    const q='#3a3020';
    F(8,8,8,3,q);F(14,10,3,7,q);F(11,16,5,3,q);F(10,19,3,4,q);F(10,26,3,3,q);
    return;
  }
  const fem=o.sex==='f',age=o.age||30,seed=o.seed||0,bg=OUTFIT[o.bg]?o.bg:'student',O=OUTFIT[bg];
  let skin=SKINS[(o.skin|0)%4];
  const inf=o.inf||0;
  if(inf>=70)skin=mixC(skin,'#6f8f5f',.5);else if(inf>=35)skin=mixC(skin,'#7f9a6a',.25);
  const skinD=shadeC(skin,-.25);
  const hair=age>=62?'#dcd9d2':age>=46?'#a19f9a':['#241812','#4a3222','#6d4b2b','#1c1a19'][seed%4];
  const hairD=shadeC(hair,-.3);
  const box=(x,y,w,h,c)=>{F(x,y,w,h,c);if(w>=3)F(x+w-1,y,1,h,shadeC(c,-.2));F(x,y,w,1,shadeC(c,.08));};
  const BACK='#a89773',SH='#7a6c52';
  F(0,0,24,48,BACK);
  F(6,44,12,1,SH);F(4,45,16,2,SH);F(6,47,12,1,SH);
  const tx0=fem?8:7,tx1=fem?15:16,tw=tx1-tx0+1,ax0=tx0-2,rx=tx1+1;
  /* legs and boots */
  box(8,31,4,11,O.pants);box(12,31,4,11,O.pants);F(11,31,1,11,shadeC(O.pants,-.35));
  box(7,42,5,4,O.boots);box(12,42,5,4,O.boots);
  F(7,45,5,1,shadeC(O.boots,-.45));F(12,45,5,1,shadeC(O.boots,-.45));
  if(bg==='soldier'){F(8,34,3,2,'#39432b');F(13,37,3,2,'#66724a');F(9,39,2,1,'#39432b');}
  if(bg==='firefighter')F(8,38,8,1,'#dcdad0');
  if(bg==='student')F(7,45,5,1,'#4a4a4a'),F(12,45,5,1,'#4a4a4a');
  if(bg==='mechanic'){F(8,35,3,2,'#2c3944');F(13,36,3,2,'#2c3944');}
  /* torso */
  box(tx0,17,tw,14,O.top);
  F(tx0,30,tw,1,'#1f1a16');
  /* arms */
  const sl=bg==='journalist'?'#2f2f33':O.top;
  box(ax0,18,2,13,sl);box(rx,18,2,13,sl);
  F(ax0,31,2,2,skin);F(rx,31,2,2,skin);
  /* outfit details */
  if(bg==='student'){
    F(tx0+1,16,tw-2,2,shadeC(O.top,.18));F(tx0+2,25,tw-4,3,shadeC(O.top,-.22));
    F(tx0+2,17,1,8,'#c9a45c');F(tx1-2,17,1,8,'#c9a45c');
    box(tx1+3,19,2,10,'#8a4a2c');
  }
  if(bg==='firefighter'){
    F(tx0,25,tw,1,'#dcdad0');F(tx0,28,tw,1,'#dcdad0');F(ax0,27,2,1,'#dcdad0');F(rx,27,2,1,'#dcdad0');
    F(tx0+2,17,tw-4,1,'#2a2a2a');
  }
  if(bg==='teacher'){
    F(11,17,2,9,'#dcd7c9');F(11,20,1,1,'#3a2f22');F(11,23,1,1,'#3a2f22');
    F(tx0+1,26,3,2,shadeC(O.top,-.2));F(tx1-3,26,3,2,shadeC(O.top,-.2));
  }
  if(bg==='politician'){
    F(10,17,4,6,'#e6e1d6');F(11,18,2,9,'#8a1f1a');
    F(tx0+1,18,2,7,shadeC(O.top,.18));F(tx1-2,18,2,7,shadeC(O.top,.18));F(tx0+2,21,1,1,'#d4a94a');
  }
  if(bg==='soldier'){
    F(tx0+1,19,3,2,'#3b4530');F(tx0+5,22,3,3,'#3b4530');
    F(tx0+1,19,tw-2,10,'#2f342a');F(tx0+2,25,2,3,'#3f4638');F(tx1-3,25,2,3,'#3f4638');F(tx0+4,20,2,2,'#3f4638');
    F(ax0,22,2,2,'#3b4530');F(rx,25,2,2,'#3b4530');
  }
  if(bg==='doctor'){
    F(tx0,17,tw,20,O.top);F(tx0+tw-1,17,1,20,shadeC(O.top,-.2));
    F(11,17,2,7,'#3f7f8c');F(11,25,2,12,shadeC(O.top,-.18));
    F(tx0+1,27,2,2,shadeC(O.top,-.2));F(tx1-2,27,2,2,shadeC(O.top,-.2));
    F(10,17,1,5,'#222');F(13,17,1,5,'#222');F(11,22,2,1,'#222');F(12,23,2,2,'#8c8c8c');
    F(9,21,3,1,'#b3281d');F(10,20,1,3,'#b3281d');
    F(ax0,18,2,13,O.top);F(rx,18,2,13,O.top);F(ax0,31,2,2,skin);F(rx,31,2,2,skin);
  }
  if(bg==='mechanic'){
    F(tx0+1,22,3,2,'#2c3944');F(tx1-3,26,3,2,'#2c3944');
    box(tx0+2,20,3,3,shadeC(O.top,.16));F(tx0,30,tw,1,'#5a3a20');F(tx1-2,29,2,3,'#a32a1f');
  }
  if(bg==='journalist'){
    box(tx0,18,3,12,'#9a8a5c');box(tx1-2,18,3,12,'#9a8a5c');
    F(tx0,24,3,3,shadeC('#9a8a5c',-.22));F(tx1-2,24,3,3,shadeC('#9a8a5c',-.22));
    F(10,17,1,6,'#151515');F(13,17,1,6,'#151515');F(9,23,6,4,'#1a1a1a');F(11,24,2,2,'#5a6a7a');F(11,24,1,1,'#9fb0c0');
  }
  /* blood when hurt */
  if((o.hpP||1)<.5){F(tx0+3,22,2,3,'#7a1a14');F(tx0+5,26,1,2,'#7a1a14');F(ax0,25,2,2,'#7a1a14');}
  if((o.hpP||1)<.25){F(tx1-3,20,2,4,'#7a1a14');F(9,33,2,2,'#7a1a14');}
  /* head */
  F(11,15,2,2,skinD);
  F(9,7,6,8,skin);F(9,7,6,1,shadeC(skin,.1));
  F(8,10,1,2,skinD);F(15,10,1,2,skinD);
  F(9,14,6,1,skinD);
  const eye=inf>=70?'#b3281d':'#1a1410';
  F(10,10,1,1,eye);F(13,10,1,1,eye);
  F(10,9,2,1,hairD);F(12,9,2,1,hairD);
  F(11,13,2,1,shadeC(skin,-.35));
  if(inf>=35){F(10,11,1,1,shadeC(skin,-.3));F(13,11,1,1,shadeC(skin,-.3));}
  if(!fem&&age>=25&&seed%2===0){F(9,12,6,3,hair);F(10,12,4,1,shadeC(hair,.05));F(11,13,2,1,shadeC(hair,-.5));}
  /* hair */
  if(!fem){F(9,6,6,3,hair);F(8,7,1,3,hair);F(15,7,1,3,hair);}
  else{
    const st=seed%3;
    F(9,6,6,3,hair);F(8,7,1,4,hair);F(15,7,1,4,hair);
    if(st===0){F(7,7,2,15,hair);F(15,7,2,15,hair);F(7,21,2,1,hairD);F(15,21,2,1,hairD);}
    else if(st===1){F(7,7,2,8,hair);F(15,7,2,8,hair);F(7,14,2,1,hairD);F(15,14,2,1,hairD);}
    else{F(15,8,2,11,hair);F(16,18,1,3,hairD);}
  }
  F(9,6,6,1,shadeC(hair,.12));
  /* headwear and face gear */
  if(bg==='firefighter'){F(8,3,8,5,'#a32a1f');F(7,7,10,1,'#6f1912');F(11,5,2,2,'#e0b64a');F(9,4,2,1,'#c74a3a');}
  if(bg==='soldier'){F(8,3,8,5,'#4f5a3c');F(8,7,8,1,'#39432b');F(10,4,1,1,'#65724b');F(13,5,1,1,'#65724b');F(9,8,1,3,'#2f342a');F(14,8,1,3,'#2f342a');}
  if(bg==='mechanic'){F(8,4,8,4,'#3a3a3d');F(7,7,10,1,'#26262a');F(9,5,2,1,'#55555a');}
  if(bg==='teacher'){F(9,10,6,1,'#1b1b1b');}
  if(bg==='doctor'){F(10,14,4,1,'#8fc5d0');}
  if(o.marks&&o.marks.indexOf('scarred')>=0){F(13,10,1,4,'#9a3a30');F(12,12,1,1,'#9a3a30');}
  /* handheld gear in front */
  if(bg==='firefighter'){F(rx+1,22,1,16,'#6b4a2a');box(rx,21,3,3,'#a9aeb2');F(rx+2,21,1,3,'#e0e4e6');}
  if(bg==='teacher'){F(ax0-1,28,4,5,'#8a2f2b');F(ax0+2,29,1,3,'#e8e0c8');F(ax0-1,28,1,5,'#5e1f1c');}
  if(bg==='politician'){F(rx,33,5,5,'#4a3524');F(rx,33,5,1,'#6b4c34');F(rx+1,32,3,1,'#2a1f16');F(rx+2,35,1,1,'#d4a94a');}
  if(bg==='soldier'){F(rx+1,19,1,16,'#222');F(rx,33,3,3,'#3a2a1a');F(rx+1,18,1,2,'#555');}
  if(bg==='mechanic'){F(rx+1,27,1,11,'#b9b9b3');F(rx,25,3,3,'#b9b9b3');F(rx+1,26,1,1,'#7a7a76');}
  if(bg==='journalist'){F(rx+1,29,2,3,'#d6d0b8');F(rx+1,29,2,1,'#a89f80');}
  if(age>=58){
    const cx=bg==='teacher'?rx+1:ax0;
    F(cx,30,2,1,'#6b4a2a');F(cx,31,1,14,'#3a2a1a');
  }
}
function spriteToCanvas(cv,o){
  const c=cv.getContext('2d');
  c.imageSmoothingEnabled=false;
  paintSprite((x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);},o);
}
