/* Guards the content: every event is well-formed, translated, and playable. Run: npm test */
const E=require('./helpers/load-engine')();
const problems=[];
const bad=(id,msg)=>problems.push(`${id}: ${msg}`);

/* ids are unique */
const ids=new Set();
E.EVENTS.forEach(e=>{if(ids.has(e.id))bad(e.id,'duplicate id');ids.add(e.id);});

/* every static event: shape, Hebrew, and both options can be played */
E.EVENTS.forEach(ev=>{
  if(ev.build)return;                       // built at play time: covered by the play test below
  if(!ev.choices||ev.choices.length<2)return bad(ev.id,'needs at least two choices');
  const he=E.HEV[ev.id];
  if(!he)bad(ev.id,'no Hebrew entry');
  else{
    if(!he.t||!he.x)bad(ev.id,'Hebrew title or text missing');
    if(!he.c||he.c.length!==ev.choices.length)bad(ev.id,'Hebrew choices do not match');
  }
  ev.choices.forEach((c,i)=>{
    if(!c.label||!c.sub)bad(ev.id,`choice ${i} missing label or sub`);
    if(c.check){if(!c.win||!c.lose)bad(ev.id,`choice ${i} has a check but no win/lose`);}
    else if(!c.out)bad(ev.id,`choice ${i} has no outcome`);
    if(he&&he.c&&he.c[i]){
      const need=c.check?4:3;
      for(let k=0;k<need;k++)if(!he.c[i][k])bad(ev.id,`choice ${i} Hebrew part ${k} empty`);
    }
  });
});

/* Hebrew stays gender-neutral: no second-person "אתה" in event text */
Object.keys(E.HEV).forEach(id=>{if(/(^|[^א-ת])אתה([^א-ת]|$)/.test(JSON.stringify(E.HEV[id])))bad(id,'Hebrew uses gendered "אתה"');});

/* achievements and trophies: both languages, unique ids */
[['ACH',E.ACH],['TRO',E.TRO]].forEach(([n,list])=>{
  const s=new Set();
  list.forEach(x=>{
    if(s.has(x.id))bad(n+' '+x.id,'duplicate');s.add(x.id);
    ['en','he'].forEach(l=>{if(!x[l]||!x[l][0]||!x[l][1])bad(n+' '+x.id,'missing '+l+' text');});
    if(typeof x.test!=='function')bad(n+' '+x.id,'no test function');
  });
});
if(E.ACH.length!==50)bad('ACH','expected 50, found '+E.ACH.length);
if(E.TRO.length!==50)bad('TRO','expected 50, found '+E.TRO.length);

/* play every event's options, static and built, in a fresh game each time */
E.EVENTS.forEach(ev=>{
  for(let ci=0;ci<2;ci++){
    try{
      E.newGame({name:'T',sex:'f',age:30,loc:'uk',bg:'student',road:15,skin:0});
      const G=E.G;G.w.day=20;
      G.p.sup.meds=3;G.p.sup.ammo=5;G.p.sup.food=5;G.p.sup.water=5;
      G.p.group.push({name:'Tiago',trait:'t',role:'scout',loy:0,since:0},{name:'Ines',trait:'t',role:'medic',loy:2,since:0});
      G.flags.lost_Mara=2;
      const ctx=ev.pre?ev.pre():{};
      const dyn=ev.build?ev.build(ctx):null;
      G.cur={id:ev.id,ctx,res:null,dyn,opts:[0,1]};
      const v=dyn||ev;
      if(v.choices.length<2)return bad(ev.id,'built event has fewer than two choices');
      const opts=E.getView().choices.map((c,i)=>i).slice(0,2);
      G.cur.opts=opts;
      if(!E.avail(v.choices[opts[ci]]).ok)return;      // background-only or unaffordable option: not playable here
      E.choose(opts[ci]);
      if(!G.cur.res)bad(ev.id,`choice ${ci} could not be played`);
    }catch(e){bad(ev.id,`choice ${ci} threw: ${e.message}`);}
  }
});

if(problems.length){console.log(problems.join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`content OK: ${E.EVENTS.length} events, ${E.ACH.length} achievements, ${E.TRO.length} trophies`);
