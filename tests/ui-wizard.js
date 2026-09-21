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
  api.click('bg','doctor');api.click('stepNext'); check('step4 '+lang);
  if(!/data-act="start"/.test(html()))fail('the last page needs Begin');
  if(!/sumrow/.test(html()))fail('the last page needs the summary');
  /* back goes back, and choices are kept */
  api.click('stepBack');api.click('stepBack'); if(!/class="board"/.test(html()))fail('back should return to the countries');
  api.click('stepNext');api.click('stepNext');
  api.click('start'); if(api.view!=='play')fail('Begin should start the game');
  if(api.G.p.loc!=='brazil'||api.G.p.bg!=='doctor'||api.G.p.name!=='Dana'||api.G.cfg.road!==15)fail('choices were not carried into the game: '+JSON.stringify(api.G.p.loc+api.G.p.bg+api.G.p.name));
}
/* back on the first page returns to the road choice */
api.click('home');api.click('road','5');api.click('stepBack');
if(api.view!=='title')fail('back on page one should return to the title');
console.log('WIZARD TEST PASSED');
