/* Loads the game rules (no DOM) so tests and simulations can drive them directly. */
const {engineSource}=require('../../scripts/build');
module.exports=function loadEngine(){
  const src=engineSource()+`
;return {get G(){return G},newGame,choose,nextStep,useMeds,avail,chance,EVENTS,EVMAP,LOC_ORDER,BGS,pick,rnd,evText,evTitle,timeOf,HEV,HE,previewChips,getView,ACH,TRO,get META(){return META},sitLine};`;
  return new Function(src)();
};
