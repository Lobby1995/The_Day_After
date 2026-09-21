/* Traits: five gifts and five burdens, with points; what each one really does; and how fast the outbreak rises on each track. Run: npm test */
const E=require('./helpers/load-engine')();
const problems=[];const bad=m=>problems.push(m);
const cfg=(o={})=>Object.assign({name:'T',sex:'m',age:32,loc:'uk',bg:'doctor',road:5,skin:0},o);
const sel=(pos,neg)=>({pos,neg});

/* 1. the list: eight of each, and the points work out the way we said */
const {pos,neg}=E.TRAITS;
if(pos.length!==8||neg.length!==8)bad('expected eight gifts and eight burdens');
if(new Set([...pos,...neg].map(t=>t.id)).size!==16)bad('trait ids must be unique');
[...pos,...neg].forEach(t=>{if(!(t.pts>=3&&t.pts<=6))bad(t.id+': points out of range');if(t.n.length!==2||t.d.length!==2||!/[א-ת]/.test(t.n[1]+t.d[1]))bad(t.id+': needs an English and a Hebrew name and description');
  if(/(^|[^א-ת])אתה([^א-ת]|$)/.test(t.d[1]))bad(t.id+': Hebrew is gendered');});
const choose5=a=>{const out=[];const rec=(i,cur)=>{if(cur.length===5){out.push(cur);return;}for(let k=i;k<a.length;k++)rec(k+1,[...cur,a[k]]);};rec(0,[]);return out;};
{const P=choose5(pos.map(t=>t.id)),N=choose5(neg.map(t=>t.id));let ok=0;
 P.forEach(p=>N.forEach(n=>{if(E.traitsValid(sel(p,n)))ok++;}));
 if(E.TRAIT_START!==2)bad('you start with 2 points');
 const share=ok/(P.length*N.length);
 if(!(share>.35&&share<.75))bad('with 2 starting points, between a third and three quarters of the 3136 choices should be allowed, found '+ok+' ('+Math.round(share*100)+'%)');
 global.__validChoices=ok;}

/* 2. what is allowed */
const cheapPos=['graceful','lighteater','unseen','medic','ears'],heavyNeg=['thinskin','weak','unfit','ill','conspicuous'];
if(!E.traitsValid(sel(cheapPos,heavyNeg)))bad('a balanced choice should be valid');
{const cost=cheapPos.reduce((a,id)=>a+E.traitDef(id).pts,0),gain=heavyNeg.reduce((a,id)=>a+E.traitDef(id).pts,0);
 if(E.traitPoints(sel(cheapPos,heavyNeg))!==2+gain-cost)bad('points for the balanced choice: '+E.traitPoints(sel(cheapPos,heavyNeg))+' should be '+(2+gain-cost));}
if(E.traitsValid(sel(['athletic','brawler','healer','ears','medic'],['slowheal','clumsy','hungry','conspicuous','ill'])))bad('costly gifts with light burdens should be refused');
if(E.traitsValid(sel(cheapPos.slice(0,4),heavyNeg)))bad('four gifts are not enough');
if(E.traitsValid(sel(cheapPos,heavyNeg.slice(0,4))))bad('four burdens are not enough');
if(E.traitsValid(sel([...cheapPos,'healer'],heavyNeg)))bad('six gifts are too many');
if(E.traitsValid(sel(['graceful','graceful','unseen','medic','ears'],heavyNeg)))bad('the same gift twice is not allowed');
if(E.traitsValid(sel(['graceful','lighteater','unseen','medic','nonsense'],heavyNeg)))bad('an unknown trait is not allowed');
if(E.traitsValid(sel(heavyNeg,cheapPos)))bad('a burden in the gifts list is not allowed');
if(E.traitsValid(null)||E.traitsValid({}))bad('nothing chosen is not valid');

/* 3. "everything random" always gives a valid choice, and a different one each time */
{const seen=new Set();for(let i=0;i<300;i++){const r=E.traitsRandom();if(!E.traitsValid(r))bad('a random choice must be valid: '+JSON.stringify(r));seen.add(JSON.stringify([r.pos.slice().sort(),r.neg.slice().sort()]));}
 if(seen.size<120)bad('random choices should vary, got '+seen.size+' different in 300');}

/* 4. stats */
{const base=(t)=>{E.newGame(cfg({traits:t}));return {...E.G.p.stats};};
 const b0=base(null);
 const t=(pos,neg)=>base(sel(pos,neg));
 const st=(stat,d,pos,neg,name)=>{const s=t(pos,neg),want=Math.max(1,Math.min(10,b0[stat]+d));if(s[stat]!==want)bad(`${name}: ${stat} should be ${want}, is ${s[stat]}`);};
 st('stamina',2,['athletic'],[],'athletic');st('stamina',-2,[],['unfit'],'out of shape');
 st('stealth',1,['unseen'],[],'inconspicuous');st('stealth',-1,[],['conspicuous'],'conspicuous');
 st('wits',1,['ears'],[],'keen hearing');st('strength',2,['brawler'],[],'brawler');st('strength',-2,[],['weak'],'weak');
 E.newGame(cfg({traits:sel(cheapPos,heavyNeg)}));
 if(E.G.p.traits.length!==10)bad('the game should remember all ten traits');
 E.newGame(cfg());if(E.G.p.traits.length!==0)bad('no traits chosen means none');}

/* 5. the night: healing and infection */
{const night=(traits,setup)=>{E.newGame(cfg({traits}));const p=E.G.p;p.sup.food=9;p.sup.water=9;p.hp=p.maxHp-30;p.inf=0;p.morale=70;setup&&setup(p);const h0=p.hp,i0=p.inf;E.advanceDay();return{heal:p.hp-h0,inf:i0-p.inf};};
 const b=night(null).heal,hh=night(sel(['healer'],[])).heal,sl=night(sel([],['slowheal'])).heal,both=night(sel(['healer'],['slowheal'])).heal;
 if(hh!==b*2)bad(`fast healer should heal twice as much: ${b} vs ${hh}`);
 if(sl!==Math.max(1,Math.round(b/2)))bad(`slow healer should heal half as much: ${b} vs ${sl}`);
 if(both!==b)bad('fast and slow healer cancel out');
 const d=(traits)=>night(traits,p=>{p.inf=20;}).inf;
 const d0=d(null),d1=d(sel(['healer'],[])),d2=d(sel([],['ill'])),d3=d(sel(['healer'],['ill']));
 if(d0!==1||d1!==2||d2!==0||d3!==1)bad(`infection fades by 1 a night; 2 for a fast healer; not at all when prone to illness: ${d0}, ${d1}, ${d2}, ${d3}`);}

/* 6. medicine */
{const dose=(bg,traits)=>{E.newGame(cfg({bg,traits}));const p=E.G.p;p.sup.meds=3;p.hp=p.maxHp-60;p.inf=80;const r=E.useMeds();return[r.h,r.i];};
 const a=dose('mechanic',null),b=dose('mechanic',sel(['medic'],[])),c=dose('doctor',null),d=dose('doctor',sel(['medic'],[]));
 if(a[0]!==20||a[1]!==25)bad('plain medicine is 20 and 25: '+a);
 if(b[0]!==26||b[1]!==33)bad('a first aider gets 26 and 33: '+b);
 if(c[0]!==30||c[1]!==38)bad('a doctor gets 30 and 38: '+c);
 if(d[0]!==36||d[1]!==46)bad('a doctor who is also a first aider gets 36 and 46: '+d);}

/* 7. infection and thin skin: in outcomes, and in a bite */
{const hit=(traits)=>{E.newGame(cfg({traits}));const p=E.G.p;p.hp=60;p.inf=0;E.applyFx({inf:4},{},null);return[60-p.hp,p.inf];};
 const a=hit(null),b=hit(sel([],['ill'])),c=hit(sel([],['thinskin'])),d=hit(sel([],['ill','thinskin']));
 if(a[1]!==4||a[0]!==0)bad('an infection of 4 is 4: '+a);
 if(b[1]!==6)bad('prone to illness: infection x1.5, 4 becomes 6: '+b);
 if(c[1]!==7||c[0]!==2)bad('thin-skinned: 3 more infection and 2 health: '+c);
 if(d[1]!==9||d[0]!==2)bad('both: ceil(4*1.5)+3 = 9 and 2 health: '+d);
 const bite=(traits)=>{E.newGame(cfg({traits}));const p=E.G.p;p.hp=60;p.inf=0;const r=E.zombieBite(()=>0);return[r.hp,r.inf];};
 const e=bite(null),f=bite(sel([],['thinskin'])),g=bite(sel([],['ill'])),h=bite(sel([],['ill','thinskin']));
 if(e[0]!==3||e[1]!==5)bad('a plain bite: '+e);
 if(f[0]!==5||f[1]!==8)bad('a bite on thin skin: '+f);
 if(g[0]!==3||g[1]!==8)bad('a bite when prone to illness: '+g);
 if(h[0]!==5||h[1]!==11)bad('both: '+h);}

/* 8. food and water, night after night */
{const use=(traits)=>{E.newGame(cfg({traits}));let used=0;const N=800;for(let i=0;i<N;i++){const p=E.G.p;p.sup.food=50;p.sup.water=50;p.hp=p.maxHp;p.inf=0;p.morale=70;E.advanceDay();used+=50-p.sup.food;}return used/N;};
 const base=use(null),light=use(sel(['lighteater'],[])),big=use(sel([],['hungry'])),both=use(sel(['lighteater'],['hungry']));
 if(Math.abs(base-1)>.01)bad('on the 5-year track a survivor alone eats one ration a night, ate '+base);
 if(Math.abs(light-(1-E.TRAIT_FOOD.light))>.035)bad('a light eater skips about '+Math.round(E.TRAIT_FOOD.light*100)+'% of the meals: '+light);
 if(Math.abs(big-(1+E.TRAIT_FOOD.hungry))>.035)bad('a hearty appetite needs about '+Math.round(E.TRAIT_FOOD.hungry*100)+'% more: '+big);
 if(!(light<both&&both<big))bad('both together sit in between: '+both);}

/* 8b. when a dangerous move goes wrong, a body that cannot take it pays extra */
{E.EVMAP.test_danger={id:'test_danger',title:'t',text:'x',pair:[0,1],choices:[
   {label:'a',sub:'b',check:{stat:'strength',dc:30,danger:true},win:{text:'w'},lose:{text:'l'}},
   {label:'c',sub:'d',check:{stat:'strength',dc:30},win:{text:'w'},lose:{text:'l'}}]};
 const fail=(traits,ci)=>{E.newGame(cfg({traits}));const p=E.G.p;p.hp=60;p.inf=0;E.G.cur={id:'test_danger',ctx:{},res:null,dyn:null,opts:[0,1]};
   const real=Math.random;Math.random=()=>.999;E.choose(ci);Math.random=real;return[60-p.hp,p.inf];};
 const a=fail(null,0),b=fail(sel([],['thinskin']),0),c=fail(sel([],['weak']),0),d=fail(sel([],['unfit']),0),e=fail(sel([],['thinskin','weak','unfit']),0),f=fail(sel([],['thinskin','weak','unfit','ill']),0);
 if(a[0]!==0||a[1]!==0)bad('a plain failure costs nothing extra: '+a);
 if(b[0]!==2||b[1]!==3)bad('thin skin: 2 health and 3 infection: '+b);
 if(c[0]!==1||d[0]!==1)bad('weak and out of shape: 1 health each: '+c+' '+d);
 if(e[0]!==4||e[1]!==3)bad('all three: 4 health and 3 infection: '+e);
 if(f[1]!==5)bad('with prone to illness the infection is x1.5, rounded up: '+f);
 const g=fail(sel([],['thinskin','weak','unfit']),1);
 if(g[0]!==0)bad('only dangerous moves cost extra, a plain failure does not: '+g);}

/* 9. the outbreak rises by so many points a year, by track: fast when short, slow when long */
{const rise=(road,turns)=>{let sum=0;const N=300;for(let i=0;i<N;i++){E.newGame(cfg({road,loc:'uk'}));const w=E.G.w;w.outbreak=10;w.order=90;const p=E.G.p;for(let t=0;t<turns;t++){p.sup.food=9;p.sup.water=9;p.hp=p.maxHp;E.advanceDay();w.order=90;}sum+=w.outbreak-10;}return sum/N;};
 const y5=rise(5,12)/3,y15=rise(15,24)/(24*5/12),y20=rise(20,24)/(24*5/12);      // points per year
 if(Math.abs(y5-8)>.8)bad('the 5-year track should rise about 8 points a year, rose '+y5.toFixed(2));
 if(Math.abs(y15-3)>.4)bad('the 15-year track should rise about 3 a year, rose '+y15.toFixed(2));
 if(Math.abs(y20-1.5)>.3)bad('the 20-year track should rise about 1.5 a year, rose '+y20.toFixed(2));
 if(!(y5>y15&&y15>y20))bad('shorter tracks rise faster');}

/* 10. the world view: what the traits do there */
{const w0=E.traitWorld([]),w1=E.traitWorld(['unseen','graceful','athletic','ears']),w2=E.traitWorld(['conspicuous','clumsy','unfit']);
 if(w0.sight!==1||w0.noise!==1||w0.runSpeed!==1||w0.drain!==1||w0.ears)bad('no traits, no change');
 if(!(w1.sight<1&&w1.noise<1&&w1.runSpeed>1&&w1.drain<1&&w1.ears))bad('the gifts should help in the world');
 if(!(w2.sight>1&&w2.noise>1&&w2.drain>1))bad('the burdens should hurt in the world');
 if(Math.abs(E.traitWorld(['unseen','conspicuous']).sight-.9)>1e-9)bad('a gift and a burden of the same kind combine');}

if(problems.length){console.log(problems.slice(0,25).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log('traits OK: 16 traits, '+global.__validChoices+' valid choices, every effect does what it says, and the outbreak pace follows the track');
