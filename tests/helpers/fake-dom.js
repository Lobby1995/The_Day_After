/* A minimal fake browser: lets the real UI code run under Node and be clicked through. */
const {buildScript}=require('../../scripts/build');
module.exports=function createApp(){
const js=buildScript();
const els={},handlers={};
const mk=id=>({appendChild(){},id,innerHTML:'',textContent:'',value:'',dataset:{},style:{},setAttribute(){},focus(){},scrollIntoView(){}});
const docEl={lang:'en',dir:'ltr'};
const document={createElement:()=>({className:'',innerHTML:'',classList:{add(){}},remove(){}}),getElementById:id=>els[id]||(els[id]=mk(id)),querySelectorAll:()=>[],querySelector:()=>null,addEventListener:(t,f)=>{(handlers[t]=handlers[t]||[]).push(f)},documentElement:docEl,title:''};
const store={};
const localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
const window={scrollTo(){}};
const navigator={language:'en-US'};
const fn=new Function('document','localStorage','window','navigator','handlers',js+`;return {click:(a,v,i)=>{const t={dataset:{act:a,v,i},disabled:false,closest:()=>t};handlers.click.forEach(h=>h({target:t,preventDefault(){}}))},input:(id,val)=>{handlers.input.forEach(h=>h({target:{id,value:val}}))},key:k=>handlers.keydown.forEach(h=>h({key:k,target:{tagName:'BODY'}})),get G(){return G},get CFG(){return CFG},get view(){return view},get LANG(){return LANG},get META(){return META},get drawShareCard(){return drawShareCard},get worldPump(){return worldPump},get WOPEN(){return WOPEN},get WMODE(){return WMODE},get WS(){return WS},get zombieBite(){return zombieBite},get world(){return{worldZombieCount,worldPresence,worldLOS,worldBig,worldCamera,worldScreen,WSIGHT,WNOISE,WZS,WSPEED,WMODESPEED,WPLACE,worldDistances,WSCENES,WWEATHER,worldNew,worldDraw,worldTick,worldPath,worldStep,worldKey,worldGo,worldTap,worldSceneId,worldWalkable,WCW,WCH,WTW,WTH}},get shareText(){return shareText},get CSTEP(){return CSTEP}}`);
const api=fn(document,localStorage,window,navigator,handlers);
const all=()=>els.main.innerHTML+(els.stage?els.stage.innerHTML:'')+(els.vitals?els.vitals.innerHTML:'')+(els.side?els.side.innerHTML:'')+(els.tag?els.tag.innerHTML:'')+(els.overnight?els.overnight.innerHTML:'');
function check(label){const h=all();for(const bad of ['undefined','NaN','[object','null</']){if(h.includes(bad)){throw new Error(label+': found '+bad+' in html near: '+h.slice(Math.max(0,h.indexOf(bad)-80),h.indexOf(bad)+80));}}}

return {api,els,docEl,check};
};
