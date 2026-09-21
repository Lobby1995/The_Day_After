/* Dilemmas: certain choices, remembered. They shift later odds, and some come back with news. Run: npm test */
const E=require('./helpers/load-engine')();
const createApp=require('./helpers/fake-dom');
const problems=[];const bad=m=>problems.push(m);
const fresh=(loc='uk',bg='mechanic')=>{E.newGame({name:'D',sex:'m',age:34,loc,bg,road:15,skin:0});return E.G;};

/* 1. every dilemma: both options certain, marked, translated, and each one sets a flag */
const dils=E.EVENTS.filter(e=>e.dil);
if(dils.length<5)bad('expected at least five dilemmas, found '+dils.length);
dils.forEach(ev=>{
  ev.choices.forEach((c,i)=>{
    if(c.check)bad(`${ev.id} choice ${i} has a roll; a dilemma must be certain`);
    if(!c.out)bad(`${ev.id} choice ${i} has no outcome`);
    if(c.out&&!c.out.flag)bad(`${ev.id} choice ${i} sets no flag, so it would leave no trace`);
    if(!E.HEV[ev.id]||!E.HEV[ev.id].c[i]||!E.HEV[ev.id].c[i][2])bad(`${ev.id} choice ${i} has no Hebrew outcome`);
  });
});

/* 2. follow-ups arrive only after their flag, and only after enough time */
const FOLLOW=[['dil_armed','echo_dil_armed'],['dil_hydrated','echo_dil_hydrated'],['dil_boy','echo_dil_boy'],['dil_pharmacist','echo_dil_pharm'],['dil_promise','echo_dil_promise'],['dil_lit','echo_dil_fire']];
FOLLOW.forEach(([flag,id])=>{
  const G=fresh();
  const ev=E.EVMAP[id];
  if(!ev){bad('missing follow-up '+id);return;}
  G.w.day=3;
  if(ev.cond())bad(`${id} is due before ${flag} was chosen`);
  G.flags[flag]=1;G.fday[flag]=G.w.day;
  if(ev.cond())bad(`${id} is due immediately after ${flag}; it should wait`);
  G.w.day=G.w.day+30;
  if(!ev.cond())bad(`${id} never becomes due after ${flag}`);
});

/* 3. earlier choices really move the odds */
[['dil_armed','strength',1],['dil_armed','charisma',-1],['dil_hydrated','stamina',1],['dil_dark','stealth',1],['dil_boy','charisma',1],['dil_pharmacist','wits',1],['dil_delivered','charisma',1]].forEach(([flag,stat,d])=>{
  const G=fresh();
  const ch={check:{stat,dc:9}};
  const base=E.chance(ch).p;
  G.flags[flag]=1;
  const after=E.chance(ch).p;
  if(d>0&&!(after>base))bad(`${flag} should raise ${stat} odds (${base} -> ${after})`);
  if(d<0&&!(after<base))bad(`${flag} should lower ${stat} odds (${base} -> ${after})`);
});

/* 4. the two-survivors dilemma: the one you save later tells you the one you did not was family */
[['dil_two_shani',0,'Shani',/brother/,/אחיה/],['dil_two_tomer',1,'Tomer',/sister/,/אחותו/]].forEach(([flag,ci,name,en,he])=>{
  const G=fresh();
  G.w.day=10;
  const ev=E.EVMAP.dil_two;
  G.cur={id:'dil_two',ctx:{},res:null,dyn:null,opts:[0,1]};
  E.choose(ci);
  if(!G.flags[flag])bad(`${flag} was not set`);
  if(!G.p.group.some(m=>m.name===name))bad(`${name} did not join`);
  const rev=E.EVMAP.echo_dil_two;
  if(rev.cond())bad('the reveal came at once');
  G.w.day+=40;
  if(!rev.cond())bad(`the reveal never came for ${name}`);
  const txt=E.evText(rev.text,{}),heTxt=E.evText(E.HEV.echo_dil_two.x,{});
  if(!en.test(txt))bad(`${name}: English reveal does not say what was hidden`);
  if(!he.test(heTxt))bad(`${name}: Hebrew reveal does not say what was hidden`);
  /* if the person is gone, there is nobody to say it */
  G.p.group=G.p.group.filter(m=>m.name!==name);
  if(rev.cond())bad(`${name}: the reveal came although they left`);
});

/* 5. the marker is on screen, in both languages */
const {api,els}=createApp();
api.click('lang','en');api.click('road','5');api.click('randall');api.click('start');
api.G.cur={id:'dil_cache',ctx:{},res:null,dyn:null,opts:[0,1]};
api.click('lang','en');
if(!/A choice, not a chance/.test(els.stage.innerHTML))bad('English dilemma marker is missing on screen');
api.click('lang','he');
if(!/בחירה, לא הימור/.test(els.stage.innerHTML))bad('Hebrew dilemma marker is missing on screen');

if(problems.length){console.log(problems.slice(0,20).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`dilemmas OK: ${dils.length} dilemmas, ${FOLLOW.length} follow-ups, odds shift, and the reveal works`);
