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
  api.click('bg','doctor');api.click('stepNext'); check('shop '+lang);
  if(!/shoprow/.test(html()))fail('page 4 should be the supplies shop');
  if(/data-act="start"/.test(html()))fail('the shop page must not have Begin');
  api.META.bank=1000;api.click('lang',lang);
  api.click('buy','food:1');api.click('buy','ammo:1');
  if(!/data-act="buy" data-v="food:-1"/.test(html()))fail('buying food should enable the minus button');
  api.click('buy','water:1');   // 500 + 300 + 500 is more than the 1000 in the bank: nothing changes
  api.click('stepNext'); check('step5 '+lang);
  if(!/data-act="start"/.test(html()))fail('the last page needs Begin');
  if(!/sumrow/.test(html()))fail('the last page needs the summary');
  /* back goes back, and choices are kept */
  api.click('stepBack');api.click('stepBack');api.click('stepBack'); if(!/class="board"/.test(html()))fail('back should return to the countries');
  api.click('stepNext');api.click('stepNext');api.click('stepNext');
  const bank0=api.META.bank;
  api.click('start'); if(api.view!=='play')fail('Begin should start the game');
  if(api.G.p.loc!=='brazil'||api.G.p.bg!=='doctor'||api.G.p.name!=='Dana'||api.G.cfg.road!==15)fail('choices were not carried into the game: '+JSON.stringify(api.G.p.loc+api.G.p.bg+api.G.p.name));
  if(!api.G.bought||api.G.bought.food!==1||api.G.bought.ammo!==1)fail('purchases were not carried into the game: '+JSON.stringify(api.G.bought));
  if(api.G.bought.water)fail('the water should not have been affordable together with the rest');
  if(api.META.bank!==bank0-800)fail('the bank should be charged 800 points, was '+(bank0-api.META.bank));
}
/* back on the first page returns to the road choice */
api.click('home');api.click('road','5');api.click('stepBack');
if(api.view!=='title')fail('back on page one should return to the title');
console.log('WIZARD TEST PASSED');
