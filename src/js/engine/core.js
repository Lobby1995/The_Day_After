//#ENGINE-START
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const d10=()=>1+rnd(10);
const KEY='daysafter.save.v2';
let G=null;

const STATS=['health','strength','stamina','stealth','wits','charisma'];
const SUPS=['food','water','meds','ammo'];

/* game roads: how many decisions, and how many months pass between them */
const ROADS={5:{years:5,turns:20,mpt:3},15:{years:15,turns:36,mpt:5},20:{years:20,turns:48,mpt:5}};
const SEASONS=['autumn','winter','spring','summer'];
function timeOf(turn){
  const m=(turn-1)*G.mpt;
  return{year:Math.floor(m/12)+1,season:SEASONS[Math.floor((m%12)/3)],m};
}
const T=n=>Math.max(1,Math.round(n*G.scale));
const prog=()=>(G.w.day-1)/G.total;

const stageOf=o=>o<15?'early':o<40?'spreading':o<70?'crisis':o<90?'collapse':'dead';
const orderOf=o=>o>=75?'holding':o>=50?'strained':o>=25?'breaking':'anarchy';
const humOf=h=>h>=75?'beacon':h>=50?'decent':h>=25?'hardened':'ruthless';

const LOCS={
 usa:{id:'usa',code:'US',name:'United States',outbreak:88,order:10,sup:{food:3,water:3,meds:1,ammo:3},flags:{},
  brief:`Cities have already fallen. The National Guard is scattered, the highways are graveyards of stalled cars, and the news stopped broadcasting a week ago. You are late to a world that is mostly over.`},
 brazil:{id:'brazil',code:'BR',name:'Brazil',outbreak:55,order:32,sup:{food:3,water:3,meds:1,ammo:1},flags:{},
  brief:`The power grid has failed across the megacity. Hospitals are overrun, the streets are loud, and rumors move faster than anything else. Neighbors are starting to organize on rooftops.`},
 uk:{id:'uk',code:'GB',name:'United Kingdom',outbreak:34,order:58,sup:{food:4,water:4,meds:1,ammo:0},flags:{},
  brief:`London is behind a cordon and nobody in authority will say why. Trains are cancelled, the motorways are jammed, and the country is doing what it does best: queuing politely while things get worse.`},
 japan:{id:'japan',code:'JP',name:'Japan',outbreak:26,order:82,sup:{food:5,water:5,meds:2,ammo:0},flags:{},
  brief:`Order is holding, barely. Stations are packed and eerily calm, announcements repeat in soothing voices, and everyone is pretending this is a very bad typhoon.`},
 canada:{id:'canada',code:'CA',name:'Canada',outbreak:22,order:72,sup:{food:4,water:4,meds:1,ammo:1},flags:{},
  brief:`Every border crossing is sealed. Patrols with floodlights and spike strips hold the line while refugees pile up on the far side. Your town is quiet, but everyone is watching the south.`},
 israel:{id:'israel',code:'IL',name:'Israel',outbreak:14,order:78,sup:{food:5,water:6,meds:2,ammo:0},flags:{saferoom:1},
  brief:`The first patient came in on a flight from the United States and collapsed in the arrivals hall. Two paramedics were bitten before the airport was locked down. Nobody knows who else was on that plane. Your home has a reinforced safe room.`},
 australia:{id:'australia',code:'AU',name:'Australia',outbreak:6,order:88,sup:{food:6,water:6,meds:2,ammo:0},flags:{},
  brief:`It has only just begun. The news calls it an unusual respiratory illness in Sydney hospitals. The beaches are open, the supermarket shelves are starting to empty, and you have a few days of calm to spend well.`}
};
const LOC_ORDER=['usa','brazil','uk','japan','canada','israel','australia'];

const BGS=[
 {id:'student',name:'Student',bonus:{stealth:3,wits:2,stamina:1},perk:`Light on your feet and good with tech, rumors and shortcuts.`},
 {id:'firefighter',name:'Firefighter',bonus:{stamina:3,strength:2,health:1},perk:`Forced entry, rescues and long hauls come naturally.`},
 {id:'teacher',name:'Teacher',bonus:{charisma:3,wits:2},perk:`Keeps groups calm. Morale drains more slowly.`},
 {id:'politician',name:'Politician',bonus:{charisma:4,wits:1},perk:`Contacts and a persuasive voice. Checkpoints and deals get easier.`},
 {id:'soldier',name:'Soldier',bonus:{strength:3,health:1,stealth:1,stamina:1},perk:`Starts armed with extra ammo. Knows how the chain of command thinks.`},
 {id:'doctor',name:'Doctor',bonus:{health:3,wits:3,charisma:1},perk:`Medicine works 50% better, and you can treat the wounded.`},
 {id:'mechanic',name:'Mechanic',bonus:{strength:2,wits:2,stamina:1},perk:`Hotwires cars and fixes anything with a motor.`},
 {id:'journalist',name:'Journalist',bonus:{stealth:2,charisma:2,wits:2},perk:`Starts with a shortwave radio and sources everywhere.`}
];
const bgObj=id=>BGS.find(b=>b.id===id);

function ageMods(a){
  if(a<30)return{label:'young',m:{stamina:2,stealth:1,wits:-1}};
  if(a<45)return{label:'prime',m:{strength:1,wits:1}};
  return{label:'veteran',m:{wits:2,charisma:1,stamina:-2,strength:-1,health:-1}};
}
function calcStats(age,bgId){
  const s={health:5,strength:4,stamina:4,stealth:4,wits:4,charisma:4};
  const am=ageMods(age).m;for(const k in am)s[k]+=am[k];
  const b=bgObj(bgId);if(b)for(const k in b.bonus)s[k]+=b.bonus[k];
  for(const k in s)s[k]=clamp(s[k],1,10);
  return s;
}
const listNames=a=>a.length<=1?(a[0]||''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];

/* ---------- events ---------- */
const EVENTS=[];
const EVMAP={};
const add=e=>{EVENTS.push(e);EVMAP[e.id]=e;};

/* ---------- group roles: everyone you take in does something for you ---------- */
const ROLES={Tiago:'scout',Lucia:'kin',Haruto:'scout',Amira:'medic',Yael:'medic',Ruth:'medic','Dona Marta':'cook',Aiko:'cook',Sami:'kin',Nora:'driver',Mara:'scout',Dev:'tech','Ms. Cole':'leader','Cpl. Reyes':'fighter','Dr. Hale':'medic',Sofia:'hunter',Ben:'fighter',Ines:'medic',Omar:'hunter',Kim:'tech',Petra:'scout',Joao:'cook',Rex:'scout'};
const RECRUITS=[
 {name:'Ben',role:'fighter',en:'Former bouncer, built like a door',he:'שוער לשעבר, בנוי כמו דלת'},
 {name:'Ines',role:'medic',en:'Nurse who never left her post',he:'אחות שלא עזבה את עמדתה'},
 {name:'Omar',role:'hunter',en:'Hunter who knows the woods',he:'צייד שמכיר את היער'},
 {name:'Kim',role:'tech',en:'Electrician who fixes what breaks',he:'חשמלאית שמתקנת כל מה שנשבר'},
 {name:'Petra',role:'scout',en:'Runner who knows every rooftop',he:'רצה שמכירה כל גג'},
 {name:'Joao',role:'cook',en:'Cook who makes stew from nothing',he:'טבח שמכין תבשיל מכלום'}
];
const ROLEN={medic:['Medicine','רפואה'],cook:['Cooking','בישול'],hunter:['Hunting','ציד'],scout:['Scouting','סיור'],tech:['Repairs','תיקונים'],leader:['Leadership','מנהיגות'],fighter:['Fighting','לחימה'],driver:['Driving','נהיגה'],kin:['Family','משפחה']};

const HEV={};
/* one place, both languages: [en,he] pairs. every question has exactly two choices. */
function defEv(o){
  const choices=o.ch.map(c=>{
    const ch={label:c.l[0],sub:c.s[0]};
    if(c.check)ch.check=c.check;if(c.cost)ch.cost=c.cost;if(c.tag)ch.tag=c.tag;
    if(c.win){ch.win=Object.assign({text:c.win[0]},c.win[2]||{});ch.lose=Object.assign({text:c.lose[0]},c.lose[2]||{});}
    else ch.out=Object.assign({text:c.out[0]},c.out[2]||{});
    return ch;
  });
  add({id:o.id,title:o.t[0],text:o.x[0],cond:o.cond,w:o.w||16,max:o.max,once:o.once===undefined?true:o.once,wild:o.wild,story:o.story,open:o.open,pro:o.pro,pre:o.pre,pair:o.pair||[0,1],choices});
  HEV[o.id]={t:o.t[1],x:o.x[1],c:o.ch.map(c=>c.win?[c.l[1],c.s[1],c.win[1],c.lose[1]]:[c.l[1],c.s[1],c.out[1]])};
}
