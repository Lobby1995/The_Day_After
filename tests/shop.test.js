/* Survival points and the supplies shop. Run: npm test */
const E=require('./helpers/load-engine')();
const problems=[];const bad=m=>problems.push(m);
const base=(loc='uk',bg='mechanic')=>({name:'S',sex:'m',age:34,loc,bg,road:5,skin:0});

/* the bank has a ceiling */
E.META.bank=0;E.bankAdd(5000);
if(E.META.bank!==1000)bad('the bank should stop at 1000, was '+E.META.bank);
E.META.bank=990;E.bankAdd(30);
if(E.META.bank!==1000)bad('adding past the cap should clamp to 1000');
E.bankAdd(-5000);
if(E.META.bank!==0)bad('the bank should never go below zero');

/* buying: a purchase is a pack. charged once, clamped to what is affordable, applied to the run */
const P=Object.fromEntries(E.SHOP.map(it=>[it.id,it]));
if(P.food.price!==500||P.water.price!==500||P.meds.price!==500||P.ammo.price!==300)bad('shop prices should be 500 / 500 / 500 / 300');
E.META.bank=0;
E.newGame({...base(),buy:{food:2,ammo:2}});
if(E.G.bought.food||E.G.bought.ammo)bad('nothing should be bought with an empty bank');
const ref=(()=>{E.META.bank=0;E.newGame(base());return {...E.G.p.sup};})();
E.META.bank=1000;
E.newGame({...base(),buy:{food:1,ammo:1}});
{
  const sup=E.G.p.sup,b=E.G.bought;
  // food 500 + ammo 300 = 800, leaving 200
  if(b.food!==1||b.ammo!==1||b.water)bad('purchases not applied as expected: '+JSON.stringify(b));
  if(E.META.bank!==200)bad('the bank should be charged exactly what was bought, was '+E.META.bank);
  if(sup.food!==ref.food+P.food.pack||sup.ammo!==ref.ammo+P.ammo.pack||sup.water!==ref.water)bad('starting supplies do not include exactly the packs bought');
}
/* limits: nobody can buy more than the shop allows, and the bank can only ever pay for so much */
E.META.bank=1000;
E.newGame({...base(),buy:{food:99,water:99,meds:99,ammo:99}});
if(E.G.bought.food!==2||E.G.bought.water||E.G.bought.meds||E.G.bought.ammo)bad('a full bank should buy two food packs and nothing else: '+JSON.stringify(E.G.bought));
if(E.META.bank!==0)bad('the bank should be empty after spending 1000');
E.META.bank=900;
E.newGame({...base(),buy:{ammo:99}});
if(E.G.bought.ammo!==3)bad('ammunition is limited to three packs: '+JSON.stringify(E.G.bought));
if(E.META.bank!==0)bad('three ammunition packs cost 900');

/* earning: a finished run pays into the bank, with a breakdown that adds up */
E.META.bank=0;
E.newGame(base());
const G=E.G;G.w.day=G.total;G.p.humanity=80;G.p.group.push({name:'Tiago',role:'scout',loy:2,since:0});G.flags['bond_Tiago']=1;
G.over={type:'survived'};
const before=E.META.bank;
E.finishRun();
const e=G.earned;
if(!e)bad('a finished run should record what it earned');
else{
  const sum=e.road+e.survived+e.humanity+e.companions+e.bonds+e.story;
  if(sum!==e.total)bad('the breakdown does not add up: '+sum+' vs '+e.total);
  if(e.survived!==150)bad('surviving should be worth 150');
  if(e.road!==100)bad('a completed road should be worth 100');
  if(E.META.bank<Math.min(1000,before+e.total))bad('the run points were not banked');
}
/* dying earns less than surviving, but still something */
E.newGame(base());E.G.w.day=8;E.G.over={type:'death',cause:{}};
const dead=E.runPoints(E.G);
if(!(dead.total>0&&dead.total<e.total))bad('a death should earn some points, but fewer than a survivor');
if(dead.survived!==0)bad('dying earns no survival bonus');
/* achievements pay too */
E.META.bank=0;E.newGame(base());
const n=Object.keys(E.META.ach).length;
E.G.w.day=3;E.evalAch();
if(Object.keys(E.META.ach).length>n&&E.META.bank<=0)bad('an unlocked achievement should pay into the bank');

if(problems.length){console.log(problems.join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log('shop OK: the bank caps at 1000, packs cost 500/500/500/300, purchases are charged once and limited, and runs pay in');
