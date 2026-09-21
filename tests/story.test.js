/* The plot: chapters arrive in order, once each, only for the arcs a player has. Run: npm test */
const E=require('./helpers/load-engine')();
const problems=[];const bad=m=>problems.push(m);
const isStory=id=>E.EVMAP[id]&&E.EVMAP[id].story;

/* play a whole run and return the chapters that were shown. the player is kept alive so the whole road is played. */
function playRun(loc,bg,road){
  E.newGame({name:'S',sex:'f',age:33,loc,bg,road,skin:0});
  const shown=[];let guard=0;
  while(guard++<200){
    const G=E.G;
    G.p.hp=G.p.maxHp;G.p.inf=0;G.p.morale=70;G.p.sup.food=Math.max(G.p.sup.food,6);G.p.sup.water=Math.max(G.p.sup.water,6);
    if(isStory(G.cur.id))shown.push(G.cur.id);
    const V=E.getView();
    if(!G.cur.res){
      const opts=G.cur.opts.map(i=>({i,a:E.avail(V.choices[i])})).filter(o=>o.a.ok);
      if(!opts.length)break;
      E.choose(E.pick(opts).i);
    }
    if(E.nextStep()==='end')break;
  }
  return shown;
}
const arc=(pre,n=6)=>Array.from({length:n},(_,i)=>pre+(i+1));
const LOC_ARC={brazil:'br_',israel:'il_',usa:'us_',uk:'uk_',japan:'jp_',canada:'ca_',australia:'au_'};
const BG_ARC={student:'st_',teacher:'te_',soldier:'so_',doctor:'doc_',politician:'po_',journalist:'jo_',firefighter:'ff_',mechanic:'me_'};
const PAIR={'doctor/brazil':'pair_doc_br','doctor/israel':'pair_doc_il'};
/* every country with every profession: the country's six chapters, the profession's four, and a pair chapter where one exists */
const COMBOS=[];
Object.keys(LOC_ARC).forEach(loc=>Object.keys(BG_ARC).forEach(bg=>{
  const want=[...arc(LOC_ARC[loc]),...arc(BG_ARC[bg],4)];
  want.push(PAIR[bg+'/'+loc]||('pair_'+bg+'_'+loc));   // every pair now has its own chapter
  COMBOS.push([loc,bg,want]);
}));
[5,15,20].forEach(road=>{
  COMBOS.forEach(([loc,bg,want])=>{
    for(let k=0;k<2;k++){
      const got=playRun(loc,bg,road);
      const label=`${loc}/${bg} road ${road}`;
      if(got.slice().sort().join()!==want.slice().sort().join())bad(`${label}: expected ${want.length} chapters, got [${got.join(',')}]`);
      /* inside one arc the order is fixed */
      [...Object.values(LOC_ARC),...Object.values(BG_ARC)].forEach(pre=>{
        const seq=got.filter(x=>x.indexOf(pre)===0).map(x=>+x.split('_')[1]);
        if(seq.join()!==seq.slice().sort((a,b)=>a-b).join())bad(`${label}: ${pre} chapters out of order: ${seq}`);
      });
      /* no run may show one chapter twice */
      if(new Set(got).size!==got.length)bad(`${label}: a chapter repeated`);
    }
  });
});

/* every chapter's text works with and without the flags it reads, in both languages, and stays gender-neutral */
const flagsRead=ev=>{
  const src=String(ev.text)+String(E.HEV[ev.id].x);
  return [...new Set([...src.matchAll(/flag\('([a-z_0-9]+)'\)/g)].map(m=>m[1]))];
};
E.EVENTS.filter(e=>e.story).forEach(ev=>{
  const names=flagsRead(ev);
  const sets=[{},Object.fromEntries(names.map(n=>[n,1])),...names.map(n=>({[n]:1}))];
  ['uk','brazil','israel','japan','usa','canada','australia'].forEach(loc=>{
    sets.forEach(fs=>{
      E.newGame({name:'S',sex:'m',age:40,loc,bg:'doctor',road:5,skin:0});
      Object.assign(E.G.flags,fs);
      try{
        const en=E.evText(ev.text,{}),he=E.evText(E.HEV[ev.id].x,{});
        if(typeof en!=='string'||en.length<40)bad(ev.id+' English text is empty');
        if(typeof he!=='string'||he.length<40)bad(ev.id+' Hebrew text is empty');
        if(/(^|[^א-ת])אתה([^א-ת]|$)/.test(he))bad(ev.id+' Hebrew uses gendered "אתה"');
        if(/undefined|\[object|\s{2,}\./.test(en+he))bad(ev.id+' text contains a broken value');
      }catch(e){bad(ev.id+' text threw: '+e.message);}
    });
  });
});
/* the words of the outcomes too: no gendered "אתה", no leftovers */
E.EVENTS.filter(e=>e.story).forEach(ev=>{
  const h=JSON.stringify(E.HEV[ev.id].c);
  if(/(^|[^א-ת])אתה([^א-ת]|$)/.test(h))bad(ev.id+' a Hebrew choice or outcome uses "אתה"');
});

if(problems.length){console.log(problems.slice(0,25).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`story OK: ${E.EVENTS.filter(e=>e.story).length} chapters, all arcs in order on every road`);
