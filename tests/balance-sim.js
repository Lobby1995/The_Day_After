/* Balance simulation. usage: node tests/balance-sim.js <games> <smart|random> <5|15|20> */
const E=require('./helpers/load-engine')();
const N=+process.argv[2]||1000,strat=process.argv[3]||'smart',road=+process.argv[4]||5;
const res={};const byLoc={};const evSeen={};const errs=[];let days=[];let qTot=0,qSafe=0,catN={country:0,story:0,echo:0,other:0};const achC={};let toastN=0,troN=0;let settledCt=0,baseCt=0,nomadCt=0,grpAvg=0,lootCt=0,maxRep={};
for(let g=0;g<N;g++){
  const loc=E.pick(E.LOC_ORDER),bg=E.pick(E.BGS).id,age=18+E.rnd(43);
  E.newGame({name:'T'+g,sex:'m',age,loc,bg,road,skin:0,traits:process.env.TRAITS==='random'?E.traitsRandom():process.env.TRAITS?{pos:process.env.TRAITS.split(',').filter(x=>E.TRAITS.pos.some(t=>t.id===x)),neg:process.env.TRAITS.split(',').filter(x=>E.TRAITS.neg.some(t=>t.id===x))}:undefined});
  let guard=0;const rep={};
  try{while(guard++<800){
    const G=E.G,V=E.getView();evSeen[G.cur.id]=(evSeen[G.cur.id]||0)+1;rep[G.cur.id]=(rep[G.cur.id]||0)+1;
    if(G.cur.opts.length!==2)errs.push('opts!=2 '+G.cur.id+' '+G.cur.opts);
    if(G.cur.id.startsWith('loot_'))lootCt++;
    {qTot++;if(G.cur.opts.some(i=>!V.choices[i].check))qSafe++;const id=G.cur.id;catN[id.startsWith('c_')?'country':id.startsWith('cs_')?'story':id.startsWith('echo_')?'echo':'other']++;}
    if(!G.cur.res){
      if(G.p.sup.meds>0&&(G.p.inf>=40||G.p.hp<G.p.maxHp*.35))E.useMeds();
      const opts=G.cur.opts.map(i=>({i,ch:V.choices[i],a:E.avail(V.choices[i])})).filter(o=>o.a.ok);
      if(!opts.length){errs.push('no usable option '+G.cur.id);break;}
      let c;
      if(strat==='random')c=E.pick(opts);
      else{opts.forEach(o=>o.s=o.ch.check?E.chance(o.ch).p:0.65);opts.sort((a,b)=>b.s-a.s);c=opts[0];}
      opts.forEach(o=>{if(o.ch.check){E.previewChips(o.ch.win);E.previewChips(o.ch.lose);}else E.previewChips(o.ch.out);});
      if(!E.choose(c.i)){errs.push('choose failed '+G.cur.id);break;}
      const r=G.cur.res,fx=V.choices[r.ci][r.br];E.evText(fx.text,G.cur.ctx);
    }
    if(E.nextStep()==='end')break;
  }}catch(e){errs.push(e.stack.split('\n').slice(0,3).join(' | '));break;}
  const G=E.G;toastN+=(G.toasts||[]).filter(x=>x.kind==='ach').length;troN+=(G.toasts||[]).filter(x=>x.kind==='tro').length;const t=G.over?G.over.type:'timeout';res[t]=(res[t]||0)+1;days.push(G.w.day);
  if(G.flags.settled)settledCt++;if(G.flags.base)baseCt++;if(G.flags.nomad)nomadCt++;grpAvg+=G.p.group.length;
  Object.entries(rep).forEach(([k,v])=>{maxRep[k]=Math.max(maxRep[k]||0,v);});
  byLoc[loc]=byLoc[loc]||{n:0,w:0};byLoc[loc].n++;if(t==='survived')byLoc[loc].w++;
}
console.log(`road ${road}y ${strat} N=${N}`,res,'settled%',(100*settledCt/N).toFixed(0),'base%',(100*baseCt/N).toFixed(0),'nomad%',(100*nomadCt/N).toFixed(0),'avg group',(grpAvg/N).toFixed(1),'loot/game',(lootCt/N).toFixed(1));
console.log(' by loc',Object.entries(byLoc).map(([k,v])=>`${k}:${(100*v.w/v.n).toFixed(0)}%`).join(' '));
const rep=Object.entries(maxRep).filter(([k,v])=>v>3);if(rep.length)console.log(' repeats >3:',rep.map(([k,v])=>k+'x'+v).join(', '));
console.log(' max repeats of any event:',Math.max(...Object.values(maxRep)),Object.entries(maxRep).filter(([k,v])=>v>=3).map(([k,v])=>k+'x'+v).join(' '));
const un=E.EVENTS.filter(e=>!evSeen[e.id]).map(e=>e.id);if(un.length)console.log(' never seen:',un.join(', '));
console.log(' events total',E.EVENTS.length);
if(errs.length)console.log(' ERRORS',errs.slice(0,4));

console.log(' questions with a risk-free option: '+(100*qSafe/qTot).toFixed(1)+'% of '+qTot,' | categories per game:',Object.entries(catN).map(([k,v])=>k+' '+(v/N).toFixed(1)).join(', '),'| ach/game',(toastN/N).toFixed(1),'tro/game',(troN/N).toFixed(1));
