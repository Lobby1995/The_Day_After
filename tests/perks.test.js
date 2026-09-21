/* Companions' gifts: they come by the number of choices, they are hidden until they happen, and a bond speeds them up. Run: npm test */
const E=require('./helpers/load-engine')();
const createApp=require('./helpers/fake-dom');
const problems=[];const bad=m=>problems.push(m);

/* a question that changes nothing, to count choices against */
E.EVMAP.test_noop={id:'test_noop',title:'t',text:'x',pair:[0,1],choices:[{label:'a',sub:'b',out:{text:'ok'}},{label:'c',sub:'d',out:{text:'ok'}}]};
const fresh=(role,name='Ruth')=>{
  E.newGame({name:'P',sex:'m',age:34,loc:'uk',bg:'mechanic',road:15,skin:0});
  const G=E.G;G.p.group=[{name,trait:'t',role,loy:2,since:0}];
  G.p.hp=G.p.maxHp-20;G.p.morale=50;G.p.sup.food=5;G.p.sup.water=5;G.p.sup.ammo=5;
  return G;
};
const step=()=>{const G=E.G;G.cur={id:'test_noop',ctx:{},res:null,dyn:null,opts:[0,1]};E.choose(0);return G.cur.res.chips.filter(c=>c.t==='perk');};

/* the table matches what was promised */
const want={medic:[3,'hp',4],fighter:[2,'ammo',1],cook:[4,'food',1],scout:[4,'water',1],guard:[3,'morale',1]};
Object.keys(want).forEach(r=>{const P=E.PERKS[r];if(!P||P.every!==want[r][0]||P.res!==want[r][1]||P.n!==want[r][2])bad(`${r} should give ${want[r][2]} ${want[r][1]} every ${want[r][0]} choices`);});
if(E.PERKS.guard.p!==.34)bad('the guard should have a 34% chance');

/* medic: +4 health on the third choice, not before */
{const G=fresh('medic');const h0=G.p.hp;
 const a=step(),b=step();
 if(a.length||b.length||G.p.hp!==h0)bad('the medic must not act before the third choice');
 const c=step();
 if(c.length!==1||G.p.hp!==h0+4)bad('the medic should heal 4 on the third choice, healed '+(G.p.hp-h0));
 if(!G.p.group[0].known)bad('the gift should be marked as discovered once it happens');}
/* a medic waits until you need them: full health means the gift is held, not wasted */
{const G=fresh('medic');G.p.hp=G.p.maxHp;
 step();step();const c=step();
 if(c.length||G.p.hp!==G.p.maxHp)bad('a medic must not heal someone at full health');
 G.p.hp=G.p.maxHp-10;const d=step();
 if(d.length!==1||G.p.hp!==G.p.maxHp-6)bad('the held gift should arrive at the first choice after you are hurt');}
/* fighter: ammunition every second choice */
{const G=fresh('fighter','Cpl. Reyes');const a0=G.p.sup.ammo;step();
 if(G.p.sup.ammo!==a0)bad('no ammunition on the first choice');
 step();if(G.p.sup.ammo!==a0+1)bad('+1 ammunition on the second choice');
 step();step();if(G.p.sup.ammo!==a0+2)bad('+1 ammunition every second choice');}
/* cook: food every fourth choice; scout: water every fourth */
{const G=fresh('cook','Dona Marta');const f0=G.p.sup.food;step();step();step();
 if(G.p.sup.food!==f0)bad('the cook must not act before the fourth choice');
 step();if(G.p.sup.food!==f0+1)bad('the cook should give 1 food on the fourth choice');}
{const G=fresh('scout','Tiago');const w0=G.p.sup.water;step();step();step();step();
 if(G.p.sup.water!==w0+1)bad('the scout should give 1 water on the fourth choice');}
/* guard: on every third choice, morale +1 with a 34% chance */
{const G=fresh('guard','Ben');const real=Math.random;
 Math.random=()=>0.1;const m0=G.p.morale;step();step();step();
 if(G.p.morale!==m0+1)bad('the guard should add 1 morale when the 34% chance comes up');
 Math.random=()=>0.9;const m1=G.p.morale;step();step();step();
 if(G.p.morale!==m1)bad('the guard must not add morale when the chance does not come up');
 Math.random=real;}
/* a bond makes the gift come a choice sooner */
{const G=fresh('cook','Dona Marta');G.flags['bond_Dona Marta']=1;const f0=G.p.sup.food;step();step();step();
 if(G.p.sup.food!==f0+1)bad('a bonded cook should give food on the third choice');}
/* someone who joins mid-way starts counting from zero */
{const G=fresh('cook','Dona Marta');step();step();
 G.p.group.push({name:'Ben',trait:'t',role:'fighter',loy:2,since:0});
 const a0=G.p.sup.ammo;step();
 if(G.p.sup.ammo!==a0)bad('a newcomer must not act on their first choice');}

/* hidden until it happens, then named */
{const {api,els}=createApp();
 api.click('lang','en');api.click('road','5');api.click('randall');api.click('start');
 api.G.p.group=[{name:'Ruth',trait:'Retired paramedic',role:'medic',loy:2,since:0}];
 api.click('lang','en');
 if(!/role unk/.test(els.vitals.innerHTML))bad('an unknown gift should show as a question mark');
 if(/Medicine/.test(els.vitals.innerHTML))bad('the role must not be named before it is discovered');
 api.G.p.group[0].known=true;api.click('lang','en');
 if(/role unk/.test(els.vitals.innerHTML)||!/Medicine/.test(els.vitals.innerHTML))bad('a discovered gift should be named');}

/* the recruit picker does not say what they can do */
{E.newGame({name:'P',sex:'m',age:34,loc:'uk',bg:'mechanic',road:15,skin:0});
 const ev=E.EVMAP.g_recruit,ctx=ev.pre(),d=ev.build(ctx);
 const subs=d.choices.map(c=>(c.sub.en+c.sub.he));
 if(subs.some(x=>/Role|תפקיד/.test(x)))bad('the recruit picker must not reveal the role');}

if(problems.length){console.log(problems.join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log('perks OK: gifts arrive by choices, stay hidden until they do, and a bond speeds them up');
