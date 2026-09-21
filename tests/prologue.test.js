/* The prologue: three scenes on day one, different for every profession, age band and country. Run: npm test */
const E=require('./helpers/load-engine')();
const problems=[];const bad=m=>problems.push(m);
const BGS=E.BGS.map(b=>b.id),LOCS=E.LOC_ORDER;
const enOf=id=>E.evText(E.EVMAP[id].text,{});
const heOf=id=>E.evText(E.HEV[id].x,{});
const seenText={};

for(const loc of LOCS)for(const bg of BGS)for(const age of [22,36,52]){
  const band=age<=29?0:age<=44?1:2;
  const label=`${loc}/${bg}/${age}`;
  E.newGame({name:'P',sex:'m',age,loc,bg,road:5,skin:0});
  const want=['pro_'+bg,'pro_age_'+band,'open_'+loc];
  for(let i=0;i<3;i++){
    const G=E.G;
    if(G.cur.id!==want[i])bad(`${label}: scene ${i+1} should be ${want[i]}, got ${G.cur.id}`);
    if(G.w.day!==1)bad(`${label}: scene ${i+1} is on day ${G.w.day}, the prologue must stay on day 1`);
    const en=enOf(G.cur.id),he=heOf(G.cur.id);
    if(!en||en.length<60)bad(`${label}: ${G.cur.id} English text is empty`);
    if(!he||he.length<60)bad(`${label}: ${G.cur.id} Hebrew text is empty`);
    if(/undefined|\[object/.test(en+he))bad(`${label}: ${G.cur.id} text has a broken value`);
    if(/(^|[^א-ת])אתה([^א-ת]|$)/.test(he))bad(`${label}: ${G.cur.id} Hebrew uses gendered "אתה"`);
    if(!/[א-ת]/.test(he))bad(`${label}: ${G.cur.id} Hebrew text has no Hebrew`);
    seenText[label+'#'+i]=en;
    if(G.cur.opts.length!==2)bad(`${label}: scene ${i+1} does not have exactly two options`);
    E.choose(G.cur.opts[0]);
    E.nextStep();
    if(i<2&&E.G.w.day!==1)bad(`${label}: a night passed inside the prologue`);
  }
  if(E.G.w.day!==2)bad(`${label}: after the prologue the game should be on day 2, got ${E.G.w.day}`);
}

/* the scenes really differ: by profession, by country, by age, and the country opener carries the profession's bridge */
const uniq=a=>new Set(a).size;
LOCS.forEach(loc=>{
  const bgTexts=BGS.map(bg=>seenText[`${loc}/${bg}/36#0`]);
  if(uniq(bgTexts)!==BGS.length)bad(`${loc}: the first scene is not unique for every profession`);
  const openers=BGS.map(bg=>seenText[`${loc}/${bg}/36#2`]);
  if(uniq(openers)!==BGS.length)bad(`${loc}: the country opener does not change with the profession`);
});
BGS.forEach(bg=>{
  const byLoc=LOCS.map(loc=>seenText[`${loc}/${bg}/36#0`]);
  if(uniq(byLoc)!==LOCS.length)bad(`${bg}: the first scene is not unique for every country`);
  const byAge=[22,36,52].map(a=>seenText[`brazil/${bg}/${a}#0`]);
  if(uniq(byAge)!==3)bad(`${bg}: the first scene does not change with age`);
});

if(problems.length){console.log(problems.slice(0,20).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`prologue OK: ${LOCS.length*BGS.length*3} openings checked, every profession, country and age band is different`);
