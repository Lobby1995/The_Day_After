
/* ---------- dynamic events: loot dilemmas and group moments (built fresh each time, both languages) ---------- */
const bi=(en,he)=>({en,he});
const hp_=m=>(typeof HE!=='undefined'&&HE.people[m.name])?HE.people[m.name]:null;
const nmB=m=>bi(m.name,hp_(m)?hp_(m).n:m.name);
const fem=m=>!!(hp_(m)&&hp_(m).f);
const hasRole=r=>G.p.group.some(m=>m.role===r);
const pickM=(f)=>{const l=G.p.group.filter(f||(()=>true));return l.length?pick(l):null;};

/* ----- loot: two things worth taking, room for one ----- */
const ITEMS={
 food:{ic:'🥫',en:'Canned food',he:'שימורים',sE:'Keeps everyone fed.',sH:'מאכיל את כולם.',q:()=>3+rnd(3),mk:q=>({food:q})},
 water:{ic:'💧',en:'Clean water',he:'מים נקיים',sE:'Nothing works without it.',sH:'בלעדיהם שום דבר לא עובד.',q:()=>3+rnd(2),mk:q=>({water:q})},
 meds:{ic:'💊',en:'Medicine',he:'תרופות',sE:'The gap between a scratch and a funeral.',sH:'ההבדל בין שריטה ללוויה.',q:()=>2,mk:q=>({meds:q})},
 ammo:{ic:'🔫',en:'Ammunition',he:'תחמושת',sE:'Loud solutions.',sH:'פתרונות רועשים.',q:()=>3+rnd(3),mk:q=>({ammo:q})},
 rifle:{ic:'🎯',en:'A hunting rifle',he:'רובה ציד',sE:'Better odds in every fight, for good.',sH:'סיכוי טוב יותר בכל קרב, לתמיד.',mk:()=>({ammo:2,flag:'rifle'}),uniq:'rifle'},
 filter:{ic:'🚰',en:'A water filter',he:'מסנן מים',sE:'Bad water stops being a problem.',sH:'מים רעים מפסיקים להיות בעיה.',mk:()=>({water:1,flag:'filter'}),uniq:'filter'},
 map:{ic:'🗺️',en:'A road atlas and binoculars',he:'אטלס דרכים ומשקפת',sE:'You see trouble coming sooner.',sH:'רואים צרות מוקדם יותר.',mk:()=>({flag:'map'}),uniq:'map'},
 medkit:{ic:'🩹',en:'A trauma kit',he:'ערכת טראומה',sE:'Patches you up right now.',sH:'מטפלת בפציעות כאן ועכשיו.',q:()=>1,mk:()=>({hp:25,meds:1})}
};
const NEEDW={
 food:()=>1+Math.max(0,4-G.p.sup.food)*.7,water:()=>1+Math.max(0,4-G.p.sup.water)*.7,
 meds:()=>1+Math.max(0,2-G.p.sup.meds)*1.3+(G.p.inf>=30?1.5:0),ammo:()=>1+Math.max(0,3-G.p.sup.ammo)*.5,
 rifle:()=>G.flags.rifle?0:.8,filter:()=>G.flags.filter?0:.7,map:()=>G.flags.map?0:.7,medkit:()=>G.p.hp<G.p.maxHp*.6?2:.6
};
const WANTS={medic:['meds','medkit'],cook:['food'],hunter:['food','ammo'],fighter:['ammo','rifle'],tech:['map','filter'],scout:['water','map'],kin:['food','water'],driver:['ammo'],leader:['meds','food']};
const LOOT=[
 {id:'loot_farm',t:['The Farmhouse','בית החווה'],i:[`An abandoned farmhouse. The kitchen is untouched and the barn door hangs open.`,`בית חווה נטוש. המטבח לא נגוע ודלת הרפת פתוחה.`],pool:{food:3,water:2,ammo:1,filter:1,rifle:1}},
 {id:'loot_pharmacy',t:['The Back Room','החדר האחורי'],i:[`A looted pharmacy. Somebody missed the locked cabinet in the back.`,`בית מרקחת שנבזז. מישהו פספס את הארון הנעול בחדר האחורי.`],pool:{meds:4,medkit:2,water:1,food:1}},
 {id:'loot_police',t:['The Cruiser','הניידת'],i:[`A police cruiser nose-down in a ditch, its trunk still latched.`,`ניידת משטרה תקועה בתעלה עם תא מטען סגור.`],pool:{ammo:3,rifle:2,meds:1,water:1,map:1}},
 {id:'loot_garage',t:['The Garage','המוסך'],i:[`A roadside garage. The tools are gone, but the back room is intact.`,`מוסך בצד הדרך. הכלים נעלמו, אבל החדר האחורי שלם.`],pool:{map:2,filter:2,rifle:1,water:2,food:1}},
 {id:'loot_camp',t:['The Empty Camp','המחנה הריק'],i:[`An empty survivors' camp: tents, a cold fire, and a hurried exit.`,`מחנה ניצולים ריק: אוהלים, מדורה כבויה ועזיבה חפוזה.`],pool:{food:2,water:2,meds:2,ammo:2}},
 {id:'loot_ambulance',t:['The Ambulance','האמבולנס'],i:[`A stranded ambulance, its doors open and its shelves half full.`,`אמבולנס תקוע, דלתותיו פתוחות ומדפיו חצי מלאים.`],pool:{meds:3,medkit:3,water:1,filter:1}},
 {id:'loot_warehouse',t:['The Warehouse','המחסן'],i:[`A distribution warehouse. Most of it burned, but one aisle was spared.`,`מחסן הפצה. רובו נשרף, אבל מעבר אחד ניצל.`],pool:{food:3,water:3,ammo:1,map:1}}
];
function pickItems(theme){
  const ws=Object.keys(theme.pool).map(k=>[k,theme.pool[k]*Math.max(0,NEEDW[k]())]).filter(x=>x[1]>0);
  const out=[];
  while(out.length<2&&ws.length){
    const tot=ws.reduce((a,x)=>a+x[1],0);let r=Math.random()*tot,idx=0;
    for(let i=0;i<ws.length;i++){r-=ws[i][1];if(r<=0){idx=i;break;}}
    out.push(ws[idx][0]);ws.splice(idx,1);
  }
  return out;
}
LOOT.forEach(th=>add({id:th.id,max:2,wild:true,
 w:()=>(7+((G.p.sup.food<=2||G.p.sup.water<=2)?18:0)+((G.p.sup.food<=0||G.p.sup.water<=0)?12:0))*(['loot_police','loot_ambulance','loot_warehouse','loot_pharmacy'].indexOf(th.id)>=0?(G.w.order>=40?1.3:.6):(G.w.outbreak>=60?.85:1)),
 cond:()=>G.w.day>=T(2),
 pre:()=>{
  const keys=pickItems(th);
  const items=keys.map(k=>({k,q:ITEMS[k].q?ITEMS[k].q():1}));
  let adv=null;
  if(G.p.group.length){
   const cands=G.p.group.filter(m=>(WANTS[m.role]||[]).some(w=>keys.indexOf(w)>=0));
   if(cands.length){const m=pick(cands);const want=(WANTS[m.role]||[]).find(w=>keys.indexOf(w)>=0);adv={name:m.name,k:want};}
  }
  return{items,adv};
 },
 build:ctx=>{
  const lab=it=>{const d=ITEMS[it.k];const q=d.uniq?'':` (${it.q})`;return bi(`${d.ic} ${d.en}${q}`,`${d.ic} ${d.he}${q}`);};
  const A=lab(ctx.items[0]),B=lab(ctx.items[1]);
  const advM=ctx.adv?G.p.group.find(m=>m.name===ctx.adv.name):null;
  const advTxt=advM?bi(` ${advM.name} keeps eyeing the ${ITEMS[ctx.adv.k].en.toLowerCase()}.`,` ${nmB(advM).he} ${fem(advM)?'ממשיכה':'ממשיך'} להסתכל על ${ITEMS[ctx.adv.k].he}.`):bi('','');
  const mkChoice=(it,other)=>{
    const d=ITEMS[it.k],L=lab(it);
    const fx=d.mk(it.q);
    let tx=bi(`You take the ${d.en.toLowerCase().replace(/^a /,'')}. The rest stays where it is.`,`לקחת ${d.he}. השאר נשאר במקומו.`);
    if(advM){
      if(ctx.adv.k===it.k){fx.loy={[advM.name]:1};fx.morale=(fx.morale||0)+2;tx=bi(tx.en+` ${advM.name} gives a small, satisfied nod.`,tx.he+` ${nmB(advM).he} ${fem(advM)?'הנהנה':'הנהן'} קלות, ${fem(advM)?'מרוצה':'מרוצה'}.`);}
      else{fx.loy={[advM.name]:-1};tx=bi(tx.en+` ${advM.name} says nothing, which is its own kind of answer.`,tx.he+` ${nmB(advM).he} ${fem(advM)?'לא אמרה':'לא אמר'} דבר, וגם זו תשובה.`);}
    }
    fx.text=tx;
    return{label:bi(`Take ${L.en}`,`לקחת ${L.he}`),sub:bi(d.sE,d.sH),out:fx};
  };
  return{title:bi(th.t[0],th.t[1]),
   text:bi(`${th.i[0]} You find two things worth taking, and room to carry only one: ${A.en} or ${B.en}.${advTxt.en}`,`${th.i[1]} נמצאים שני דברים ששווה לקחת, ויש מקום לשאת רק אחד: ${A.he} או ${B.he}.${advTxt.he}`),
   choices:[mkChoice(ctx.items[0]),mkChoice(ctx.items[1])],pair:[0,1]};
 }}));

/* ----- the group has a say ----- */
add({id:'g_mission',max:2,w:12,cond:()=>G.p.group.length>=1&&G.w.day>=T(3),
 pre:()=>({m:pick(G.p.group).name,task:rnd(2)}),
 build:ctx=>{
  const m=G.p.group.find(x=>x.name===ctx.m)||G.p.group[0];
  const N=nmB(m),f=fem(m);
  const fits=ctx.task===0?['scout','hunter','driver'].indexOf(m.role)>=0:['scout','driver','fighter'].indexOf(m.role)>=0;
  const text=ctx.task===0
   ?bi(`The water is running low, and the nearest clean source is a long walk through bad ground. ${N.en} offers to go.`,`המים אוזלים, והמקור הנקי הקרוב נמצא בהליכה ארוכה דרך שטח רע. ${N.he} ${f?'מתנדבת':'מתנדב'} ללכת.`)
   :bi(`Nobody knows what's on the road ahead. Someone has to look, and ${N.en} says it might as well be them.`,`אף אחד לא יודע מה נמצא בדרך קדימה. מישהו צריך להסתכל, ו${N.he} ${f?'אומרת':'אומר'} שזה יכול להיות ${f?'היא':'הוא'}.`);
  const rew=ctx.task===0?{water:4,morale:3}:{food:2,water:1,morale:4};
  return{title:bi('Someone Has to Go','מישהו צריך ללכת'),text,pair:[0,1],
   choices:[
    {label:bi(`Send ${N.en}`,`לשלוח את ${N.he}`),sub:bi(`${fits?'A good fit for the job.':'Not really their kind of work.'} Things go wrong out there.`,`${fits?'מתאים למשימה.':'לא בדיוק התחום.'} דברים משתבשים שם בחוץ.`),
     check:{p:fits?.72:.5},
     win:Object.assign({text:bi(`${N.en} comes back at dusk, tired and pleased with the world. It worked.`,`${N.he} ${f?'חזרה':'חזר'} עם שקיעה, ${f?'עייפה':'עייף'} ו${f?'מרוצה':'מרוצה'} מהעולם. זה עבד.`),loy:{[m.name]:1}},rew),
     lose:{text:bi(`${N.en} doesn't come back that night, or the next morning. What you find later isn't good.`,`${N.he} לא ${f?'חזרה':'חזר'} באותו לילה ולא בבוקר שאחריו. מה שנמצא אחר כך לא טוב.`),lose:'ctx',morale:-10,mark:'haunted'}},
    {label:bi(`Go yourself`,`ללכת בעצמך`),sub:bi(`Safer for them. Not for you.`,`בטוח יותר בשבילם. לא בשבילך.`),
     check:{stat:'stamina',dc:9,danger:true},
     win:Object.assign({text:bi(`You do it yourself and come back with dirt to the knees, and the others notice.`,`עשית את זה בעצמך וחזרת עם בוץ עד הברכיים, והאחרים שמו לב.`),loy:{[m.name]:1}},rew),
     lose:{text:bi(`It goes wrong out there. You make it back, but not by much.`,`זה השתבש שם בחוץ. חזרת, אבל בקושי.`),hp:-16,inf:10}}
   ]};
 }});
add({id:'g_sick',max:2,w:14,cond:()=>G.p.group.length>=1&&G.w.day>=T(4),
 pre:()=>({m:pick(G.p.group).name}),
 build:ctx=>{
  const m=G.p.group.find(x=>x.name===ctx.m)||G.p.group[0];
  const N=nmB(m),f=fem(m);
  return{title:bi('Fever in the Group','חום בקבוצה'),
   text:bi(`${N.en} is burning up. It isn't a bite, but it's bad enough, and you can see everyone doing the math on medicine, food, and time.`,`${N.he} ${f?'בוערת':'בוער'} מחום. זו לא נשיכה, אבל זה מספיק גרוע, ורואים את כולם עושים חישוב של תרופות, אוכל וזמן.`),
   pair:[0,1],
   choices:[
    {label:bi(`Use two doses of medicine`,`להשתמש בשתי מנות תרופה`),sub:bi(`The sure thing, and the expensive one.`,`הדרך הבטוחה, והיקרה.`),cost:{meds:2},check:{p:.85},
     win:{text:bi(`The fever breaks by morning. ${N.en} looks at you as if you've given something back that can't be repaid.`,`החום נשבר עד הבוקר. ${N.he} מסתכל${f?'ת':''} עליך כאילו החזרת משהו שאי אפשר להחזיר.`),morale:4,loy:{[m.name]:2}},
     lose:{text:bi(`The drugs are too old. It helps, but not enough.`,`התרופות ישנות מדי. זה עוזר, אבל לא מספיק.`),morale:-2,loy:{[m.name]:1}}},
    {label:bi(`Give rest and your rations`,`להעניק מנוחה ואת המנות`),sub:bi(`Cheaper. Riskier.`,`זול יותר. מסוכן יותר.`),cost:{food:2},
     check:{p:hasRole('medic')?.75:.55},
     win:{text:bi(`Two days of sweating, sips of water, and stubbornness. ${N.en} pulls through.`,`יומיים של זיעה, לגימות מים ועקשנות. ${N.he} ${f?'שורדת':'שורד'}.`),morale:4,loy:{[m.name]:2}},
     lose:{text:bi(`${N.en} doesn't wake up. Nobody says much for the rest of the day.`,`${N.he} לא ${f?'מתעוררת':'מתעורר'}. אף אחד לא אומר הרבה בשארית היום.`),lose:'ctx',morale:-10,mark:'haunted'}},
    {label:bi(`Sit with them and hope`,`לשבת לידם ולקוות`),sub:bi(`It's all you've got.`,`זה כל מה שיש.`),
     check:{p:.35},
     win:{text:bi(`The fever breaks on its own, which nobody expected.`,`החום נשבר מעצמו, ואף אחד לא ציפה לזה.`),morale:6,loy:{[m.name]:1}},
     lose:{text:bi(`It doesn't break.`,`הוא לא נשבר.`),lose:'ctx',morale:-12,mark:'haunted'}}
   ]};
 }});
add({id:'g_sacrifice',max:1,w:16,cond:()=>G.p.group.length>=1&&G.w.day>=T(8)&&(G.p.hp<G.p.maxHp*.6||G.w.outbreak>=50),
 pre:()=>({m:pick(G.p.group).name}),
 build:ctx=>{
  const m=G.p.group.find(x=>x.name===ctx.m)||G.p.group[0];
  const N=nmB(m),f=fem(m);
  return{title:bi('Someone Holds the Door','מישהו מחזיק את הדלת'),
   text:bi(`The dead are closing in on the only way out. ${N.en} takes a rifle off the wall. "Go," ${f?'she':'he'} says. "I'll hold them."`,`המתים נסגרים על היציאה היחידה. ${N.he} ${f?'לוקחת':'לוקח'} רובה מהקיר. ״לכו״, ${f?'היא אומרת':'הוא אומר'}. ״אני אחזיק אותם״.`),
   pair:[0,1],
   choices:[
    {label:bi(`Let ${N.en} hold them`,`לתת ל${N.he} להחזיק אותם`),sub:bi(`They chose it. That doesn't make it easier.`,`זו הבחירה שלהם. זה לא מקל.`),
     check:{p:.7},
     win:{text:bi(`You go. Behind you the shooting goes on for a long time, and then it doesn't. You carry that for the rest of the road.`,`הלכת. מאחוריך הירי נמשך זמן רב, ואז הפסיק. זה יילווה אותך עד סוף הדרך.`),lose:'ctx',morale:-12,mark:'haunted',food:2,ammo:1},
     lose:{text:bi(`The door holds for a minute, and then it doesn't. You get out, but not all of what you carried.`,`הדלת מחזיקה דקה, ואז לא. יוצאים, אבל לא עם כל מה שנשא.`),lose:'ctx',hp:-12,morale:-16,mark:'haunted'}},
    {label:bi(`Refuse: everyone goes, or nobody does`,`לסרב: או שכולם הולכים, או אף אחד`),sub:bi(`Loyalty, at a cost.`,`נאמנות, במחיר.`),
     check:{p:.5},
     win:{text:bi(`You drag everyone through, together, bruised and swearing. Nobody dies. Nobody forgets it, either.`,`גררתם את כולם יחד, חבולים ומקללים. אף אחד לא מת. אף אחד גם לא שוכח.`),hp:-10,morale:8,loyAll:2},
     lose:{text:bi(`It doesn't work. ${N.en} is hit on the way out, and you have to carry ${f?'her':'him'} or leave ${f?'her':'him'}.`,`זה לא עובד. ${N.he} ${f?'נפגעת':'נפגע'} בדרך החוצה, ואי אפשר לשאת ${f?'אותה':'אותו'} ואי אפשר להשאיר ${f?'אותה':'אותו'}.`),lose:'ctx',hp:-15,morale:-8}}
   ]};
 }});
add({id:'g_theft',max:1,w:12,cond:()=>G.p.group.length>=2&&G.w.day>=T(6),
 pre:()=>({m:pick(G.p.group).name}),
 build:ctx=>{
  const m=G.p.group.find(x=>x.name===ctx.m)||G.p.group[0];
  const N=nmB(m),f=fem(m);
  return{title:bi('Missing Food','אוכל חסר'),
   text:bi(`Two days of food are gone from the stores, and ${N.en} won't meet your eye.`,`אוכל של יומיים נעלם מהמלאי, ו${N.he} ${f?'לא מסתכלת':'לא מסתכל'} לך בעיניים.`),pair:[0,1],
   choices:[
    {label:bi(`Confront ${N.en} in front of everyone`,`להתעמת עם ${N.he} מול כולם`),sub:bi(`Justice, in public.`,`צדק, בפומבי.`),
     check:{stat:'charisma',dc:9},
     win:{text:bi(`It comes out: a sick relative, a lost temper, and most of the food, returned. The group goes quiet, and something in it shifts toward you.`,`זה יוצא: קרוב חולה, עצבים אבודים, ורוב האוכל מוחזר. הקבוצה שותקת, ומשהו בה זז לכיוונך.`),food:2,morale:3,loy:{[m.name]:-1}},
     lose:{text:bi(`It goes badly. ${N.en} storms off, and the rest aren't sure which side to be on.`,`זה הולך רע. ${N.he} ${f?'סוערת':'סוער'} החוצה, והשאר לא בטוחים לאיזה צד להתייצב.`),morale:-6,loy:{[m.name]:-2}}},
    {label:bi(`Let it go and say nothing`,`לוותר ולא להגיד דבר`),sub:bi(`Quiet mercy. A little less food.`,`רחמים שקטים. קצת פחות אוכל.`),
     check:{p:.8},
     win:{text:bi(`You say nothing. The next day, ${N.en} leaves an extra portion by your bag. Neither of you mentions it.`,`לא אמרת דבר. למחרת ${N.he} ${f?'משאירה':'משאיר'} מנה נוספת ליד התיק. אף אחד לא מזכיר.`),food:-1,loy:{[m.name]:2},morale:-1},
     lose:{text:bi(`The theft continues, and now everyone can tell you knew.`,`הגניבה נמשכת, ועכשיו כולם רואים שידעת.`),food:-3,morale:-4}}
   ]};
 }});
add({id:'g_leave',max:3,w:22,cond:()=>G.p.group.some(m=>m.loy<=0)&&G.p.morale<60,
 pre:()=>({m:pick(G.p.group.filter(m=>m.loy<=0)).name}),
 build:ctx=>{
  const m=G.p.group.find(x=>x.name===ctx.m)||G.p.group[0];
  const N=nmB(m),f=fem(m);
  return{title:bi('A Packed Bag','תיק ארוז'),
   text:bi(`${N.en} has packed a bag and is sitting by the door. "I can't do this anymore," ${f?'she':'he'} says. "Not like this."`,`${N.he} ${f?'ארזה':'ארז'} תיק ו${f?'יושבת':'יושב'} ליד הדלת. ״אני לא יכול${f?'ה':''} יותר״, ${f?'היא אומרת':'הוא אומר'}. ״לא ככה״.`),pair:[0,1],
   choices:[
    {label:bi(`Let ${N.en} go`,`לתת ל${N.he} ללכת`),sub:bi(`People choose their own roads.`,`אנשים בוחרים דרך משלהם.`),
     check:{p:.8},
     win:{text:bi(`You shake hands. ${N.en} walks off down the road without turning around, and the group is quiet all evening.`,`לחצתם ידיים. ${N.he} ${f?'הולכת':'הולך'} במורד הדרך בלי להסתובב, והקבוצה שותקת כל הערב.`),lose:'ctx',morale:-6,humanity:2},
     lose:{text:bi(`${N.en} leaves, and takes supplies as compensation. Nobody stops it.`,`${N.he} ${f?'עוזבת':'עוזב'} ולוקח${f?'ת':''} אספקה כפיצוי. אף אחד לא עוצר.`),lose:'ctx',food:-2,morale:-8}},
    {label:bi(`Ask ${N.en} to stay`,`לבקש מ${N.he} להישאר`),sub:bi(`Say the thing you've been avoiding.`,`להגיד את הדבר שנמנעים ממנו.`),
     check:{stat:'charisma',dc:9},
     win:{text:bi(`You say it plainly: you need ${f?'her':'him'}, and you're sorry about how things have been. ${N.en} unpacks the bag, slowly.`,`אמרת את זה בפשטות: צריך אותו${f?'ה':''}, ומצטערים על איך שהדברים היו. ${N.he} ${f?'מרוקנת':'מרוקן'} את התיק, לאט.`),morale:4,loy:{[m.name]:3}},
     lose:{text:bi(`It isn't enough. ${N.en} leaves anyway, angrier than before.`,`זה לא מספיק. ${N.he} ${f?'הולכת':'הולך'} בכל זאת, ${f?'כועסת':'כועס'} יותר מקודם.`),lose:'ctx',morale:-10}}
   ]};
 }});
add({id:'g_recruit',max:3,w:()=>G.p.group.length===0?28:16,cond:()=>G.w.day>=T(3)&&G.p.group.length<4&&RECRUITS.filter(r=>!G.p.group.some(m=>m.name===r.name)&&!G.seen.includes('rc_'+r.name)).length>=2,
 pre:()=>{
  const av=RECRUITS.filter(r=>!G.p.group.some(m=>m.name===r.name)&&!G.seen.includes('rc_'+r.name));
  const a=pick(av);const rest=av.filter(r=>r.role!==a.role&&r!==a);const b=pick(rest.length?rest:av.filter(r=>r!==a));
  G.seen.push('rc_'+a.name,'rc_'+b.name);
  return{a:a.name,b:b.name};
 },
 build:ctx=>{
  const r=n=>RECRUITS.find(x=>x.name===n);
  const A=r(ctx.a),B=r(ctx.b);
  const nh=x=>HE.people[x.name];
  const choice=x=>({label:bi(`Take ${x.name}`,`לקבל את ${nh(x).n}`),sub:bi(`${x.en}. Role: ${ROLEN[x.role][0].toLowerCase()}.`,`${x.he}. תפקיד: ${ROLEN[x.role][1]}.`),
   out:{text:bi(`${x.name} nods once, shoulders a bag, and falls in beside you. The other one watches you go.`,`${nh(x).n} ${nh(x).f?'מהנהנת':'מהנהן'} פעם אחת, ${nh(x).f?'מרימה':'מרים'} תיק ו${nh(x).f?'מצטרפת':'מצטרף'} אליך. השני מסתכל בך הולך.`),join:{name:x.name,trait:x.en,role:x.role},morale:3}});
  return{title:bi('Two at the Fence','שניים ליד הגדר'),
   text:bi(`Two survivors are waiting at your fence, and both look like they can work. You have food for one more mouth. Not two.`,`שני ניצולים ממתינים ליד הגדר שלך, ושניהם נראים כמי שיכולים לעבוד. יש אוכל לפה נוסף אחד. לא לשניים.`),
   pair:[0,1],choices:[choice(A),choice(B)]};
 }});
add({id:'g_bond',max:2,w:10,cond:()=>G.p.group.length>=1&&G.w.day>=T(3),
 pre:()=>({m:pick(G.p.group).name}),
 build:ctx=>{
  const m=G.p.group.find(x=>x.name===ctx.m)||G.p.group[0];
  const N=nmB(m),f=fem(m);
  return{title:bi('A Fire That Should Not Be Lit','מדורה שאסור להדליק'),
   text:bi(`Someone lit a small fire in a tin can, and now ${N.en} is talking about home for the first time.`,`מישהו הדליק מדורה קטנה בקופסת שימורים, ועכשיו ${N.he} ${f?'מדברת':'מדבר'} על הבית בפעם הראשונה.`),pair:[0,1],
   choices:[
    {label:bi(`Listen, and share something of your own`,`להקשיב ולשתף במשהו משלך`),sub:bi(`It costs nothing but nerve.`,`לא עולה כלום חוץ מאומץ.`),
     check:{stat:'stealth',dc:8},
     win:{text:bi(`You talk until the tin is cold. It's the closest thing to a family night you've had in a long time.`,`דיברתם עד שהקופסה התקררה. זה הדבר הכי קרוב ללילה משפחתי מזה זמן רב.`),morale:8,humanity:2,loy:{[m.name]:1}},
     lose:{text:bi(`A light where no light should be. Something out in the dark has noticed the fire.`,`אור במקום שלא אמור להיות אור. משהו בחושך הבחין במדורה.`),hp:-10,inf:6,morale:3,loy:{[m.name]:1}}},
    {label:bi(`Put the fire out and post a watch`,`לכבות את האש ולהציב שמירה`),sub:bi(`Safe, and a little cold.`,`בטוח, וקצת קר.`),
     check:{p:.85},
     win:{text:bi(`Nothing comes. Nobody says anything about the fire.`,`שום דבר לא בא. אף אחד לא מדבר על המדורה.`),hp:3,morale:-1},
     lose:{text:bi(`In the dark, someone trips over the tin. Hot ash, then a scream.`,`בחושך מישהו מועד על הקופסה. אפר לוהט, ואז צרחה.`),hp:-6,morale:-3}}
   ]};
 }});
