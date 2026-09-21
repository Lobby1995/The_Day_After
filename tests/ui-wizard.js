/* The creation wizard: one page per step, back and next, and a summary that follows you. Run: npm test */
const createApp=require('./helpers/fake-dom');
const {api,els,check}=createApp();
const fail=m=>{console.log('FAIL: '+m);process.exit(1);};
const html=()=>els.main.innerHTML;
for(const lang of ['en','he']){
  api.click('lang',lang);
  api.click('road','15'); check('step1 '+lang);
  if(!/data-act="stepNext"/.test(html()))fail('step 1 has no Next');
  if(/data-act="start"/.test(html()))fail('step 1 must not have Begin');
  if(!/id="nm"/.test(html()))fail('step 1 should show name field');
  if(/class="board"/.test(html()))fail('step 1 must not show the countries');
  /* page 2: where */
  api.input('nm','Dana');api.click('sex','f');api.click('stepNext'); check('step2 '+lang);
  if(!/class="board"/.test(html()))fail('step 2 should show the countries');
  if(!/Dana/.test(html()))fail('the summary should carry the name onto step 2');
  api.click('loc','brazil');api.click('stepNext'); check('step3 '+lang);
  if(!/class="bgrid"/.test(html()))fail('step 3 should show the backgrounds');
  api.click('bg','doctor');api.click('stepNext'); check('traits '+lang);
  /* page 4: traits. five gifts and five burdens, with points, and Next stays locked until it balances */
  if((html().match(/class="tcard pos"/g)||[]).length!==8||(html().match(/class="tcard neg"/g)||[]).length!==8)fail('the traits page should show eight gifts and eight burdens');
  if(!/data-act="stepNext"[^>]*disabled/.test(html()))fail('Next should be locked until five gifts and five burdens are chosen');
  api.click('stepNext');if(!/class="tcard/.test(html()))fail('locked Next must not move on');
  if(!/id="trleft"[^>]*>2</.test(html()))fail('you start with 2 points');
  ['athletic','brawler','healer','ears','medic'].forEach(id=>api.click('trait','pos:'+id));
  ['slowheal','clumsy','hungry','conspicuous','ill'].forEach(id=>api.click('trait','neg:'+id));
  if(!/id="trleft"[^>]*>-3</.test(html()))fail('expensive gifts and light burdens should leave -3 points, page says: '+(html().match(/id="trleft"[^>]*>(-?\d+)</)||[])[1]);
  if(!/data-act="stepNext"[^>]*disabled/.test(html()))fail('Next must stay locked below zero');
  api.click('trait','pos:brawler');api.click('trait','pos:athletic');api.click('trait','pos:graceful');api.click('trait','pos:lighteater');   // swap two expensive gifts for two cheap ones
  api.click('trait','neg:slowheal');api.click('trait','neg:clumsy');api.click('trait','neg:hungry');api.click('trait','neg:thinskin');api.click('trait','neg:weak');api.click('trait','neg:unfit');
  api.click('trait','pos:healer');api.click('trait','pos:ears');
  api.click('trait','pos:unseen');api.click('trait','pos:medic');api.click('trait','pos:graceful');api.click('trait','pos:lighteater');
  const T=api.CFG.traits;
  if(T.pos.length>5||T.neg.length>5)fail('never more than five of each');
  api.click('lang',lang);
  const target={pos:['graceful','lighteater','unseen','medic','ears'],neg:['thinskin','weak','unfit','ill','conspicuous']};
  /* set the choice to a known valid one, through the buttons */
  [...api.CFG.traits.pos].forEach(id=>api.click('trait','pos:'+id));[...api.CFG.traits.neg].forEach(id=>api.click('trait','neg:'+id));
  target.pos.forEach(id=>api.click('trait','pos:'+id));target.neg.forEach(id=>api.click('trait','neg:'+id));
  if(/data-act="stepNext"[^>]*disabled/.test(html()))fail('a valid choice should unlock Next: '+JSON.stringify(api.CFG.traits));
  api.click('stepNext'); check('shop '+lang);
  if(!/shoprow/.test(html()))fail('page 5 should be the supplies shop');
  if(/data-act="start"/.test(html()))fail('the shop page must not have Begin');
  api.META.bank=1000;api.click('lang',lang);
  api.click('buy','food:1');api.click('buy','ammo:1');
  if(!/data-act="buy" data-v="food:-1"/.test(html()))fail('buying food should enable the minus button');
  api.click('buy','water:1');   // 500 + 300 + 500 is more than the 1000 in the bank: nothing changes
  api.click('stepNext'); check('step6 '+lang);
  if(!/data-act="start"/.test(html()))fail('the last page needs Begin');
  if(!/sumrow/.test(html()))fail('the last page needs the summary');
  /* back goes back, and choices are kept */
  api.click('stepBack');api.click('stepBack');api.click('stepBack');api.click('stepBack'); if(!/class="board"/.test(html()))fail('back should return to the countries');
  api.click('stepNext');api.click('stepNext');api.click('stepNext');api.click('stepNext');   // the traits are kept, so Next is open
  const bank0=api.META.bank;
  api.click('start'); if(api.view!=='play')fail('Begin should start the game');
  if(api.G.p.loc!=='brazil'||api.G.p.bg!=='doctor'||api.G.p.name!=='Dana'||api.G.cfg.road!==15)fail('choices were not carried into the game: '+JSON.stringify(api.G.p.loc+api.G.p.bg+api.G.p.name));
  if(!api.G.bought||api.G.bought.food!==1||api.G.bought.ammo!==1)fail('purchases were not carried into the game: '+JSON.stringify(api.G.bought));
  if(api.G.bought.water)fail('the water should not have been affordable together with the rest');
  if(JSON.stringify(api.G.p.traits.slice().sort())!==JSON.stringify([...target.pos,...target.neg].sort()))fail('the traits were not carried into the game: '+api.G.p.traits);
  if(api.META.bank!==bank0-800)fail('the bank should be charged 800 points, was '+(bank0-api.META.bank));
}
/* back on the first page returns to the road choice */
api.click('home');api.click('road','5');api.click('stepBack');
if(api.view!=='title')fail('back on page one should return to the title');
console.log('WIZARD TEST PASSED');
