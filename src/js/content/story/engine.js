
/* ---------- story chapters ----------
 * A chapter is a normal two-choice event with a place in the run. Each arc (a country, a background, or a
 * background-in-a-country) is a numbered sequence. A chapter becomes due once the run reaches its `at`
 * (0 to 1, how far through the road) and the chapter before it has been played. Due chapters are played
 * before any random event, so the plot always advances. Earlier choices leave flags that later chapters read.
 */
const CHAPTERS=[];
function chapter(o){
  const num=o.of?` ${o.n}/${o.of}`:'';
  /* a story turn replaces a scavenging turn, so every outcome carries a little food and water:
     the people around you share what they have. without this the plot would starve the player. */
  o.ch.forEach(c=>{[c.win,c.lose].forEach((r,k)=>{const fx=r[2];fx.food=(fx.food||0)+1;if(k===0)fx.water=(fx.water||0)+1;});});
  defEv(Object.assign({},o,{
    t:[`${o.label[0]}${num} \u00b7 ${o.t[0]}`,`${o.label[1]}${num} \u00b7 ${o.t[1]}`],
    story:true,once:true,cond:undefined
  }));
  CHAPTERS.push({id:o.id,arc:o.arc,n:o.n||1,at:o.at});
}
const arcsOfPlayer=()=>['loc:'+G.p.loc,'bg:'+G.p.bg,'pair:'+G.p.bg+':'+G.p.loc];
function dueChapter(){
  const arcs=arcsOfPlayer(),p=prog();
  const seen=id=>G.seen.indexOf(id)>=0;
  const ready=CHAPTERS.filter(c=>{
    if(arcs.indexOf(c.arc)<0||seen(c.id)||c.at>p)return false;
    if(c.n===1)return true;
    const before=CHAPTERS.find(x=>x.arc===c.arc&&x.n===c.n-1);
    return !before||seen(before.id);
  }).sort((a,b)=>a.at-b.at);
  if(!ready.length)return null;
  const c=ready[0],last=G.recent[G.recent.length-1];
  const lastWasStory=!!(last&&EVMAP[last]&&EVMAP[last].story);
  const turnsLeft=G.total-G.w.day;
  /* let one ordinary turn breathe between chapters, unless the road is running out and the plot must finish */
  if(lastWasStory&&p-c.at<.05&&turnsLeft>ready.length)return null;
  return EVMAP[c.id];
}
/* helper for chapter text that depends on what the player did earlier */
const flag=n=>!!(G.flags&&G.flags[n]);
