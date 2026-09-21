
/* ---------- achievements (moments) and trophies (run medals). saved between runs. ---------- */
const META_KEY='daysafter.meta.v1';
/* survival points: earned by playing, banked up to a cap, spent on starting supplies */
const BANK_CAP=1000;
const SHOP=[
  /* a purchase is a pack: `pack` units for `price` points. `max` is how many packs of it can be bought for one run. */
  {id:'food', price:500,max:2,pack:3,en:'Food',he:'אוכל',unit:['rations','מנות']},
  {id:'water',price:500,max:2,pack:3,en:'Water',he:'מים',unit:['bottles','בקבוקים']},
  {id:'meds', price:500,max:2,pack:2,en:'Medicine',he:'תרופה',unit:['doses','מנות']},
  {id:'ammo', price:300,max:3,pack:4,en:'Ammunition',he:'תחמושת',unit:['rounds','כדורים']}
];
const bankAdd=n=>{META.bank=Math.max(0,Math.min(BANK_CAP,(META.bank||0)+n));};
const shopCost=buy=>SHOP.reduce((a,it)=>a+it.price*Math.min(it.max,Math.max(0,+((buy||{})[it.id])||0)),0);

let META={ach:{},tro:{},runs:0,deaths:0,decisions:0,surv:{loc:{},bg:{}},causes:{},bank:0};
function metaLoad(){try{const s=localStorage.getItem(META_KEY);if(s){const m=JSON.parse(s);if(m&&m.ach){META=Object.assign(META,m);META.surv=META.surv||{loc:{},bg:{}};META.causes=META.causes||{};META.bank=Math.max(0,Math.min(BANK_CAP,+META.bank||0));}}}catch(e){}}
function metaSave(){try{localStorage.setItem(META_KEY,JSON.stringify(META));}catch(e){}}
try{metaLoad();}catch(e){}
const yearNow=()=>timeOf(G.w.day).year;
const bondCount=()=>Object.keys(G.flags).filter(k=>k.indexOf('bond_')===0).length;
const ACH=[];
const A=(id,en,he,test)=>ACH.push({id,en,he,test});
/* survival and time */
A('first_night',['First Night','הלילה הראשון'],['Live to see the second day.','לשרוד עד היום השני.'],()=>G.w.day>=2);
A('year2',['Year Two','שנה שנייה'],['Reach the second year.','להגיע לשנה השנייה.'],()=>yearNow()>=2);
A('year5',['Half a Decade','חצי עשור'],['Reach year five.','להגיע לשנה החמישית.'],()=>yearNow()>=5);
A('year10',['A Decade After','עשור אחרי'],['Reach year ten.','להגיע לשנה העשירית.'],()=>yearNow()>=10);
A('year15',['Fifteen Years','חמש עשרה שנה'],['Reach year fifteen.','להגיע לשנה החמש עשרה.'],()=>yearNow()>=15);
A('year20',['Twenty Years','עשרים שנה'],['Reach year twenty.','להגיע לשנה העשרים.'],()=>yearNow()>=20);
A('one_hp',['By a Thread','על חוט השערה'],['Survive a choice at 5 health or less.','לשרוד בחירה עם 5 בריאות או פחות.'],()=>G.p.hp>0&&G.p.hp<=5);
A('hungry5',['Empty Belly','בטן ריקה'],['Go hungry or thirsty five times.','להיות רעב או צמא חמש פעמים.'],()=>G.st.hungry>=5);
/* the coin */
A('coin1',['Heads I Win','ראש, אני מנצח'],['Win your first coin flip.','לנצח בהטלה הראשונה.'],()=>G.st.won>=1);
A('longshot',['Long Shot','הימור ארוך'],['Win a flip at 30% or worse.','לנצח בהטלה של 30% או פחות.'],()=>G.st.longWins>=1);
A('hot5',['Hot Streak','רצף חם'],['Win five flips in a row.','לנצח חמש הטלות ברצף.'],()=>G.st.best>=5);
A('cold5',['Cold Streak','רצף קר'],['Lose five flips in a row.','להפסיד חמש הטלות ברצף.'],()=>G.st.worst>=5);
A('won10',['Ten Wins','עשרה ניצחונות'],['Win ten flips in one run.','לנצח עשר הטלות בריצה אחת.'],()=>G.st.won>=10);
A('won25',['Twenty-Five Wins','עשרים וחמישה ניצחונות'],['Win twenty-five flips in one run.','לנצח עשרים וחמש הטלות בריצה אחת.'],()=>G.st.won>=25);
A('daredevil',['Daredevil','נועז'],['Win three long shots in one run.','לנצח שלושה הימורים ארוכים בריצה אחת.'],()=>G.st.longWins>=3);
A('surething',['Sure Thing','דבר בטוח'],['Win five flips at 80% or better.','לנצח חמש הטלות ב־80% ומעלה.'],()=>G.st.sureWins>=5);
/* loot */
A('loot1',['Scavenger','מלקט'],['Take your first find.','לקחת את הממצא הראשון.'],()=>G.st.loot>=1);
A('loot5',['Regular Scavenger','מלקט קבוע'],['Take five finds in one run.','לקחת חמישה ממצאים בריצה אחת.'],()=>G.st.loot>=5);
A('rifle',["Hunter's Rifle",'רובה ציד'],['Find a hunting rifle.','למצוא רובה ציד.'],()=>!!G.flags.rifle);
A('filter',['Clean Water','מים נקיים'],['Find a water filter.','למצוא מסנן מים.'],()=>!!G.flags.filter);
A('atlas',['Cartographer','קרטוגרף'],['Find a road atlas.','למצוא אטלס דרכים.'],()=>!!G.flags.map);
A('stocked',['Stocked Up','מלאי מלא'],['Hold ten food or ten water.','להחזיק עשרה מזון או עשרה מים.'],()=>G.p.sup.food>=10||G.p.sup.water>=10);
/* the group */
A('friend',['A Friend','חבר'],['Take in your first companion.','לקבל את המלווה הראשון.'],()=>G.st.recruits>=1);
A('squad3',['Squad of Three','חוליה של שלושה'],['Travel with three companions.','לנסוע עם שלושה מלווים.'],()=>G.st.maxGroup>=3);
A('squad4',['Full Table','שולחן מלא'],['Travel with four companions.','לנסוע עם ארבעה מלווים.'],()=>G.st.maxGroup>=4);
A('bond1',['Trust','אמון'],['Bond with a companion.','ליצור קשר עמוק עם מלווה.'],()=>bondCount()>=1);
A('bond2',['Two Bonds','שני קשרים'],['Bond with two companions.','ליצור קשר עמוק עם שני מלווים.'],()=>bondCount()>=2);
A('lost1',['First Loss','אובדן ראשון'],['Lose a companion.','לאבד מלווה.'],()=>G.st.lostMembers>=1);
A('lost3',['Three Graves','שלושה קברים'],['Lose three companions.','לאבד שלושה מלווים.'],()=>G.st.lostMembers>=3);
A('loyal',['Loyal to the End','נאמנות מלאה'],['Have two or more companions, all at full loyalty.','שני מלווים או יותר, כולם בנאמנות מלאה.'],()=>G.p.group.length>=2&&G.p.group.every(m=>m.loy>=3));
A('leader',['Taking the Lead','לקחת הנהגה'],['Take charge of a group.','לקחת הנהגה על קבוצה.'],()=>!!G.flags.leader);
A('rex',['Good Dog','כלב טוב'],['A dog joins you.','כלב מצטרף אליך.'],()=>!!G.st.everJoined.Rex);
/* moral */
A('saint',['Golden Heart','לב זהב'],['Reach 90 humanity.','להגיע ל־90 אנושיות.'],()=>G.p.humanity>=90);
A('cold',['Cold as Ice','קר כקרח'],['Fall to 10 humanity.','לרדת ל־10 אנושיות.'],()=>G.p.humanity<=10);
A('openhand',['Open Hand','יד פתוחה'],['Feed a stranger.','להאכיל זר.'],()=>!!G.flags.helpedMara);
A('opengate',['Open Gate','שער פתוח'],['Open the gate to those outside.','לפתוח את השער למי שבחוץ.'],()=>!!G.flags.openedGate);
A('shutgate',['Shut Gate','שער נעול'],['Keep the gate shut.','להשאיר את השער נעול.'],()=>!!G.flags.keptGate);
A('looter',['Looter','בוזז'],['Take what wasn\'t yours.','לקחת מה שלא שלך.'],()=>!!G.flags.looter);
/* the world you build */
A('base',['Home Base','בסיס בית'],['Establish a base.','להקים בסיס.'],()=>!!G.flags.base);
A('nomad',['On the Move','בדרכים'],['Choose the road.','לבחור בדרך.'],()=>!!G.flags.nomad);
A('garden',['Green Thumb','אצבע ירוקה'],['Grow a garden.','לגדל גינה.'],()=>!!G.flags.garden);
A('settled',['Settled','התיישבות'],['Build a settlement.','להקים יישוב.'],()=>!!G.flags.settled);
A('cure',['Hope in a Vial','תקווה בבקבוקון'],['Help someone find a cure.','לעזור למצוא תרופה.'],()=>!!G.flags.cure);
A('raider',['Bad Company','חברה רעה'],['Ally with the raiders.','להתחבר לפורעים.'],()=>!!G.flags.raiderAlly);
A('feud',['Blood Feud','סכסוך דמים'],['Make enemies of the raiders.','להפוך את הפורעים לאויבים.'],()=>!!G.flags.raiderEnemy);
A('builder',['Rebuilder','בנייה מחדש'],['Help rebuild.','לעזור לבנות מחדש.'],()=>!!G.flags.builder);
/* the person */
A('ten',['Perfect Ten','עשר מושלם'],['Raise any attribute to 10.','להעלות תכונה כלשהי ל־10.'],()=>Object.keys(G.p.stats).some(k=>G.p.stats[k]>=10));
A('scars',['Battle Scars','צלקות קרב'],['Carry three permanent marks.','לשאת שלושה סימנים קבועים.'],()=>G.p.marks.length>=3);
A('old',['Old Bones','עצמות ישנות'],['Live to 65.','לחיות עד גיל 65.'],()=>G.p.age>=65);
A('meds10',['Medicine Cabinet','ארון תרופות'],['Use medicine ten times in one run.','להשתמש בתרופות עשר פעמים בריצה אחת.'],()=>G.st.meds>=10);

const TRO=[];
const Tr=(id,tier,en,he,test)=>TRO.push({id,tier,en,he,test});
const alive=r=>r.over==='survived';
/* roads */
Tr('road5','bronze',['Five Years','חמש שנים'],['Survive the five-year road.','לשרוד את מסלול חמש השנים.'],r=>alive(r)&&r.G.total===20);
Tr('road15','silver',['Fifteen Years','חמש עשרה שנה'],['Survive the fifteen-year road.','לשרוד את מסלול חמש עשרה השנה.'],r=>alive(r)&&r.G.total===36);
Tr('road20','gold',['Twenty Years','עשרים שנה'],['Survive the twenty-year road.','לשרוד את מסלול עשרים השנה.'],r=>alive(r)&&r.G.total===48);
/* countries */
const CT={usa:['United States','ארצות הברית','silver'],brazil:['Brazil','ברזיל','silver'],uk:['Britain','בריטניה','bronze'],japan:['Japan','יפן','bronze'],canada:['Canada','קנדה','bronze'],israel:['Israel','ישראל','bronze'],australia:['Australia','אוסטרליה','bronze']};
Object.keys(CT).forEach(k=>Tr('surv_'+k,CT[k][2],['Survivor: '+CT[k][0],'שורד: '+CT[k][1]],['Survive to the end starting in '+CT[k][0]+'.','לשרוד עד הסוף כשמתחילים ב'+CT[k][1]+'.'],r=>alive(r)&&r.G.p.loc===k));
/* backgrounds */
const BT={student:['Student','סטודנט'],teacher:['Teacher','מורה'],soldier:['Soldier','חייל'],doctor:['Doctor','רופא'],politician:['Politician','פוליטיקאי'],journalist:['Journalist','עיתונאי'],firefighter:['Firefighter','כבאי'],mechanic:['Mechanic','מכונאי']};
Object.keys(BT).forEach(k=>Tr('bg_'+k,'bronze',['As a '+BT[k][0],'בתור '+BT[k][1]],['Survive to the end as a '+BT[k][0].toLowerCase()+'.','לשרוד עד הסוף בתור '+BT[k][1]+'.'],r=>alive(r)&&r.G.p.bg===k));
/* hard runs */
Tr('usa_long','gold',['Against All Odds','נגד כל הסיכויים'],['Survive a long road starting in the United States.','לשרוד מסלול ארוך שמתחיל בארצות הברית.'],r=>alive(r)&&r.G.p.loc==='usa'&&r.G.total>=36);
Tr('brazil_long','gold',['Rooftop Legend','אגדת הגגות'],['Survive a long road starting in Brazil.','לשרוד מסלול ארוך שמתחיל בברזיל.'],r=>alive(r)&&r.G.p.loc==='brazil'&&r.G.total>=36);
/* endings */
Tr('end_sanct','silver',['Sanctuary','מקלט'],['Survive with a settlement standing.','לשרוד כשיישוב עומד על תילו.'],r=>alive(r)&&!!r.G.flags.settled);
Tr('end_road','silver',['The Road Goes On','הדרך נמשכת'],['Survive as a nomad.','לשרוד כנוודים.'],r=>alive(r)&&!!r.G.flags.nomad);
Tr('end_cure','gold',['Cure Bearer','נושא התרופה'],['Survive with the cure in motion.','לשרוד כשהתרופה בדרכה.'],r=>alive(r)&&!!r.G.flags.cure);
Tr('end_raid','silver',['Warlord','אדון המלחמה'],['Survive as an ally of the raiders.','לשרוד כבעל ברית של הפורעים.'],r=>alive(r)&&!!r.G.flags.raiderAlly);
Tr('end_lone','gold',['Lone Wolf','זאב בודד'],['Survive a long road without a single companion.','לשרוד מסלול ארוך בלי מלווה אחד.'],r=>alive(r)&&r.G.total>=36&&r.G.p.group.length===0);
/* deaths */
const DC={starved:['Starved','רעב'],thirst:['Thirst','צמא'],fever:['Fever','חום'],despair:['Despair','ייאוש'],turned:['Turned','הפך'],wounds:['Wounds','פציעות']};
const causeOf=r=>r.over==='turned'?'turned':(r.cause&&r.cause.r&&r.cause.r!=='night')?r.cause.r:'wounds';
Object.keys(DC).forEach(k=>Tr('died_'+k,'bronze',['Fell: '+DC[k][0],'נפל: '+DC[k][1]],['Die of '+DC[k][0].toLowerCase()+'.','למות מ'+DC[k][1]+'.'],r=>r.over!=='survived'&&causeOf(r)===k));
/* collection of moments */
Tr('ach10','bronze',['Collector','אספן'],['Unlock 10 achievements.','לפתוח 10 הישגים.'],()=>Object.keys(META.ach).length>=10);
Tr('ach25','silver',['Completionist','משלים'],['Unlock 25 achievements.','לפתוח 25 הישגים.'],()=>Object.keys(META.ach).length>=25);
Tr('ach40','gold',['Devoted','מסור'],['Unlock 40 achievements.','לפתוח 40 הישגים.'],()=>Object.keys(META.ach).length>=40);
Tr('ach50','platinum',['Everything','הכול'],['Unlock every achievement.','לפתוח את כל ההישגים.'],()=>Object.keys(META.ach).length>=ACH.length);
/* how you survived */
Tr('q_squad','silver',['Everyone Home','כולם חזרו'],['Survive with four or more companions.','לשרוד עם ארבעה מלווים או יותר.'],r=>alive(r)&&r.G.p.group.length>=4);
Tr('q_saint','silver',['Kept Your Soul','נשמה שלמה'],['Survive with humanity 80 or higher.','לשרוד עם אנושיות 80 ומעלה.'],r=>alive(r)&&r.G.p.humanity>=80);
Tr('q_dark','silver',['Whatever It Took','מה שצריך'],['Survive with humanity 20 or lower.','לשרוד עם אנושיות 20 ומטה.'],r=>alive(r)&&r.G.p.humanity<=20);
Tr('q_clean','silver',['Unmarked','בלי סימנים'],['Survive with no permanent marks.','לשרוד בלי סימנים קבועים.'],r=>alive(r)&&r.G.p.marks.length===0);
Tr('q_scarred','silver',['Scarred and Standing','צלקות ועמידה'],['Survive with three or more marks.','לשרוד עם שלושה סימנים ויותר.'],r=>alive(r)&&r.G.p.marks.length>=3);
Tr('q_early','silver',['Early Roots','שורשים מוקדמים'],['Found a settlement within the first five years.','להקים יישוב בחמש השנים הראשונות.'],r=>alive(r)&&!!r.G.flags.settled&&!!r.G.flags.settledDay&&timeOf(r.G.flags.settledDay).year<=5);
Tr('q_strong','silver',['Well Rounded','מאוזן'],['Survive with every attribute at 7 or more.','לשרוד עם כל התכונות ב־7 ומעלה.'],r=>alive(r)&&Object.keys(r.G.p.stats).every(k=>r.G.p.stats[k]>=7));
/* many lives */
Tr('multi3','silver',['Three Places','שלושה מקומות'],['Survive in three different countries.','לשרוד בשלוש מדינות שונות.'],()=>Object.keys(META.surv.loc).length>=3);
Tr('multi5','gold',['Five Places','חמישה מקומות'],['Survive in five different countries.','לשרוד בחמש מדינות שונות.'],()=>Object.keys(META.surv.loc).length>=5);
Tr('multi7','platinum',['Around the World','מסביב לעולם'],['Survive in all seven countries.','לשרוד בכל שבע המדינות.'],()=>Object.keys(META.surv.loc).length>=7);
Tr('bgs4','silver',['Four Lives','ארבעה חיים'],['Survive as four different backgrounds.','לשרוד בארבעה רקעים שונים.'],()=>Object.keys(META.surv.bg).length>=4);
Tr('bgs8','platinum',['Every Life','כל החיים'],['Survive as all eight backgrounds.','לשרוד בכל שמונת הרקעים.'],()=>Object.keys(META.surv.bg).length>=8);
Tr('runs10','bronze',['Ten Journeys','עשר מסעות'],['Finish ten runs.','לסיים עשר ריצות.'],()=>META.runs>=10);
Tr('deaths10','bronze',['Ten Endings','עשרה סופים'],['Die ten times.','למות עשר פעמים.'],()=>META.deaths>=10);
Tr('dec500','silver',['Five Hundred Choices','חמש מאות בחירות'],['Make 500 decisions across all runs.','לקבל 500 החלטות בכל הריצות.'],()=>META.decisions>=500);

const TIERPTS={bronze:10,silver:25,gold:50,platinum:100};
function freshStats(){return{flips:0,won:0,lost:0,streak:0,lstreak:0,best:0,worst:0,longWins:0,sureWins:0,meds:0,loot:0,hungry:0,recruits:0,lostMembers:0,maxGroup:0,decisions:0,everJoined:{}};}
function grant(kind,id){
  const box=kind==='ach'?META.ach:META.tro;
  if(box[id])return false;
  box[id]=Date.now();
  {const pts=kind==='ach'?10:TIERPTS[(TRO.find(x=>x.id===id)||{}).tier]||0;bankAdd(pts);if(G){G.earnedExtra=(G.earnedExtra||0)+pts;}}
  if(G){G.toasts=G.toasts||[];G.toasts.push({kind,id});if(kind==='tro'){G.newTro=G.newTro||[];G.newTro.push(id);}}
  return true;
}
function evalAch(){
  if(!G||!G.st)return;
  let any=false;
  ACH.forEach(a=>{if(!META.ach[a.id]){let ok=false;try{ok=a.test();}catch(e){}if(ok&&grant('ach',a.id))any=true;}});
  if(any)metaSave();
}
/* what a finished run is worth. shown on the end screen, and added to the bank. */
function runPoints(g){
  const p=g.p,over=g.over&&g.over.type,done=over==='survived';
  const seen=g.seen||[];
  const chapters=seen.filter(id=>EVMAP[id]&&EVMAP[id].story).length;
  const bonds=Object.keys(g.flags).filter(k=>k.indexOf('bond_')===0).length;
  const parts={
    road:done?100:Math.round(100*Math.min(1,(g.w.day-1)/g.total)),
    survived:done?150:0,
    humanity:Math.round(p.humanity/2),
    companions:15*p.group.length,
    bonds:10*bonds,
    story:8*chapters
  };
  parts.total=Object.keys(parts).reduce((a,k)=>a+parts[k],0);
  return parts;
}
/* spend banked points on starting supplies. clamps to what is affordable, charges once, returns what was bought. */
function applyPurchases(buy,sup,flags){
  const bought={};let left=META.bank||0,spent=0;
  SHOP.forEach(it=>{
    let n=Math.min(it.max,Math.max(0,Math.floor(+((buy||{})[it.id])||0)));
    while(n>0&&it.price>left)n--;
    if(n<=0)return;
    left-=n*it.price;spent+=n*it.price;bought[it.id]=n;
    sup[it.id]=(sup[it.id]||0)+n*it.pack;
  });
  if(spent){META.bank=Math.max(0,(META.bank||0)-spent);metaSave();}
  return bought;
}
function finishRun(){
  if(!G||G.tallied)return;
  G.tallied=1;
  const over=G.over.type;
  G.earned=runPoints(G);bankAdd(G.earned.total);
  META.runs++;META.decisions+=G.st.decisions;
  if(over==='survived'){META.surv.loc[G.p.loc]=1;META.surv.bg[G.p.bg]=1;}else{META.deaths++;}
  evalAch();
  const run={G,over,cause:G.over.cause};
  TRO.forEach(t=>{if(!META.tro[t.id]){let ok=false;try{ok=t.test(run);}catch(e){}if(ok)grant('tro',t.id);}});
  metaSave();
}
const metaPoints=()=>Object.keys(META.tro).reduce((a,id)=>{const t=TRO.find(x=>x.id===id);return a+(t?TIERPTS[t.tier]:0);},0);
