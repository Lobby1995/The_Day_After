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
const COMBOS=[
  ['brazil','doctor',['br_1','br_2','br_3','br_4','br_5','br_6','doc_1','doc_2','doc_3','doc_4','pair_doc_br']],
  ['israel','doctor',['il_1','il_2','il_3','il_4','il_5','il_6','doc_1','doc_2','doc_3','doc_4','pair_doc_il']],
  ['brazil','mechanic',['br_1','br_2','br_3','br_4','br_5','br_6']],
  ['israel','student',['il_1','il_2','il_3','il_4','il_5','il_6']],
  ['uk','doctor',['doc_1','doc_2','doc_3','doc_4']],
  ['uk','mechanic',[]],
];
[5,15,20].forEach(road=>{
  COMBOS.forEach(([loc,bg,want])=>{
    for(let k=0;k<25;k++){
      const got=playRun(loc,bg,road);
      const label=`${loc}/${bg} road ${road}`;
      if(got.slice().sort().join()!==want.slice().sort().join())bad(`${label}: expected ${want.length} chapters, got [${got.join(',')}]`);
      /* inside one arc the order is fixed */
      ['br_','il_','doc_'].forEach(pre=>{
        const seq=got.filter(x=>x.indexOf(pre)===0).map(x=>+x.split('_')[1]);
        if(seq.join()!==seq.slice().sort((a,b)=>a-b).join())bad(`${label}: ${pre} chapters out of order: ${seq}`);
      });
      /* no run may show one chapter twice */
      if(new Set(got).size!==got.length)bad(`${label}: a chapter repeated`);
    }
  });
});

/* every chapter's text works with and without the flags it reads, in both languages, and stays gender-neutral */
const flagSets=[{},{br_net:1,br_osvaldo_deal:1,br_tunnels:1,br_seat_taken:1},{br_osvaldo_enemy:1,br_seat_given:1},{il_open:1,il_yoram_shared:1,il_power:1,il_group:1,doc_fair:1,doc_immune:1,il_quarantine:1},{il_rota:1,il_split:1,doc_paid:1,il_treated:1}];
E.EVENTS.filter(e=>e.story).forEach(ev=>{
  ['uk','brazil','israel','japan','usa','canada','australia'].forEach(loc=>{
    flagSets.forEach(fs=>{
      E.newGame({name:'S',sex:'m',age:40,loc,bg:'doctor',road:5,skin:0});
      Object.assign(E.G.flags,fs);
      try{
        const en=E.evText(ev.text,{}),he=E.evText(E.HEV[ev.id].x,{});
        if(typeof en!=='string'||en.length<40)bad(ev.id+' English text is empty');
        if(typeof he!=='string'||he.length<40)bad(ev.id+' Hebrew text is empty');
        if(/(^|[^א-ת])אתה([^א-ת]|$)/.test(he))bad(ev.id+' Hebrew uses gendered "אתה"');
        if(/undefined|\[object/.test(en+he))bad(ev.id+' text contains a broken value');
      }catch(e){bad(ev.id+' text threw: '+e.message);}
    });
  });
});

if(problems.length){console.log(problems.slice(0,25).join('\n'));console.log(`\n${problems.length} problem(s)`);process.exit(1);}
console.log(`story OK: ${E.EVENTS.filter(e=>e.story).length} chapters, all arcs in order on every road`);
