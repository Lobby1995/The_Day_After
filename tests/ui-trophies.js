const createApp=require('./helpers/fake-dom');
const {api,els,check}=createApp();
for(const lang of ['en','he']){
  api.click('lang',lang);
  api.click('road','5');api.click('randall');api.click('start');
  const seen={sit:false};
  let guard=0;
  while(guard++<200){
    if(!api.G.cur.res){ if(els.stage.innerHTML.includes('class="sit"'))seen.sit=true; api.click('choose',undefined,api.G.cur.opts[0]); }
    api.click('skip'); api.click('next'); if(api.view==='end')break;
  }
  api.click('trophies');check('troom '+lang);
  const h=els.main.innerHTML;
  console.log(lang,'trophy room ok, cards:',(h.match(/class="tcard/g)||[]).length,'sit line:',seen.sit);
  api.click('troTab','tro');check('troom tro '+lang);
  console.log(lang,'trophy tab cards:',(els.main.innerHTML.match(/class="tcard/g)||[]).length);
  api.click('troBack');
  console.log(lang,'back to view',api.view, 'newTro',JSON.stringify(api.G.newTro||[]));
}
console.log('TROPHY TEST PASSED');
