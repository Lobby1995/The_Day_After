
/* ---------- traits: five gifts and five burdens, chosen before the run ----------
 * Like in Project Zomboid: a gift costs points, a burden gives points, and you finish at zero or more.
 * You take exactly five of each, out of eight of each. You start with TRAIT_START points.
 * Every effect is on something the game already has: stats, healing, infection, food and water, medicine, and (in the world view) noise, sight, running.
 */
const TRAIT_START=2;
const TRAITS={
  pos:[
    {id:'healer',pts:6,n:['Fast Healer','מחלים מהר'],d:['You heal twice as fast at night, and infection fades faster.','הגוף מחלים פי שניים בלילה, וההידבקות דועכת מהר יותר.']},
    {id:'athletic',pts:5,n:['Athletic','אתלט'],d:['Stamina +2. You run faster and tire slower.','סיבולת +2. רצים מהר יותר ומתעייפים לאט.']},
    {id:'unseen',pts:4,n:['Inconspicuous','לא בולט'],d:['Zombies notice you from 40% less far away. Stealth +1.','זומבים מבחינים בך מ־40% פחות רחוק. התגנבות +1.']},
    {id:'graceful',pts:3,n:['Graceful','קליל'],d:['40% less noise when you walk or run.','40% פחות רעש בהליכה ובריצה.']},
    {id:'ears',pts:4,n:['Keen Hearing','שמיעה חדה'],d:['In the world view, zombies close by are marked even behind walls. Wits +1.','בעולם מסומנים זומבים קרובים גם מאחורי קירות. פיקחות +1.']},
    {id:'lighteater',pts:5,n:['Light Eater','אוכל מעט'],d:['You skip about one meal in sixteen: food and water last longer.','מדלגים על ארוחה אחת מכל שש עשרה: האוכל והמים מחזיקים יותר זמן.']},
    {id:'brawler',pts:5,n:['Brawler','קרבי'],d:['Strength +2.','כוח +2.']},
    {id:'medic',pts:6,n:['First Aider','מטפל'],d:['Medicine heals 6 more health and cures 8 more infection.','תרופה מרפאה 6 בריאות יותר ומורידה 8 הידבקות יותר.']}
  ],
  neg:[
    {id:'slowheal',pts:4,n:['Slow Healer','מחלים לאט'],d:['You heal half as fast at night.','החלמה לילית איטית פי שניים.']},
    {id:'ill',pts:4,n:['Prone to Illness','נוטה למחלות'],d:['Infection rises 50% faster, and never fades on its own.','ההידבקות עולה ב־50% מהר יותר, ואינה דועכת מעצמה.']},
    {id:'thinskin',pts:5,n:['Thin-skinned','עור דק'],d:['Bites and scratches cut deeper: 2 more health and 3 more infection. So does any dangerous move that goes wrong.','נשיכות ושריטות חותכות עמוק: 2 בריאות ועוד 3 הידבקות. וגם כשמהלך מסוכן נכשל.']},
    {id:'weak',pts:4,n:['Weak','חלש'],d:['Strength −2. A dangerous move that goes wrong costs 1 more health.','כוח −2. מהלך מסוכן שנכשל עולה בריאות אחת נוספת.']},
    {id:'unfit',pts:4,n:['Out of Shape','לא בכושר'],d:['Stamina −2. Running wears you out much faster, and a dangerous move that goes wrong costs 1 more health.','סיבולת −2. הריצה מתישה הרבה יותר מהר, ומהלך מסוכן שנכשל עולה בריאות אחת נוספת.']},
    {id:'conspicuous',pts:4,n:['Conspicuous','בולט'],d:['Zombies notice you from 50% farther away. Stealth −1.','זומבים מבחינים בך מ־50% רחוק יותר. התגנבות −1.']},
    {id:'clumsy',pts:3,n:['Clumsy','מגושם'],d:['30% more noise when you walk or run.','30% יותר רעש בהליכה ובריצה.']},
    {id:'hungry',pts:6,n:['Hearty Appetite','תיאבון גדול'],d:['About one extra meal in ten: food and water run out sooner.','ארוחה נוספת אחת בערך מכל עשר: האוכל והמים נגמרים מהר יותר.']}
  ]
};
/* how much a light eater saves and a hearty appetite costs: the chance, each night, of skipping a meal or of needing one more */
const TRAIT_FOOD={light:.06,hungry:.10};
const TRAIT_STATS={athletic:{stamina:2},unfit:{stamina:-2},unseen:{stealth:1},conspicuous:{stealth:-1},ears:{wits:1},brawler:{strength:2},weak:{strength:-2}};
const traitDef=id=>TRAITS.pos.find(t=>t.id===id)||TRAITS.neg.find(t=>t.id===id);
const hasTrait=id=>!!(G&&G.p&&G.p.traits&&G.p.traits.indexOf(id)>=0);

/* points left for a choice: what you start with, plus what the burdens give, minus what the gifts cost */
function traitPoints(sel){
  const sum=(list,side)=>(list||[]).reduce((a,id)=>a+((TRAITS[side].find(t=>t.id===id)||{pts:0}).pts),0);
  return TRAIT_START+sum(sel&&sel.neg,'neg')-sum(sel&&sel.pos,'pos');
}
function traitsValid(sel){
  if(!sel)return false;
  const P=sel.pos||[],N=sel.neg||[];
  if(P.length!==5||N.length!==5||new Set(P).size!==5||new Set(N).size!==5)return false;
  if(!P.every(id=>TRAITS.pos.some(t=>t.id===id))||!N.every(id=>TRAITS.neg.some(t=>t.id===id)))return false;
  return traitPoints(sel)>=0;
}
/* a random valid choice, for "everything random" */
function traitsRandom(rand){
  const r=rand||Math.random;
  const draw=(list)=>{const a=list.map(t=>t.id);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,5);};
  for(let k=0;k<400;k++){const s={pos:draw(TRAITS.pos),neg:draw(TRAITS.neg)};if(traitsValid(s))return s;}
  return{pos:['graceful','lighteater','unseen','medic','ears'].slice(0,5),neg:['thinskin','weak','unfit','ill','conspicuous']};
}
/* what the traits do in the world view */
function traitWorld(ids){
  const has=id=>(ids||[]).indexOf(id)>=0;
  return{
    sight:(has('unseen')?.6:1)*(has('conspicuous')?1.5:1),
    noise:(has('graceful')?.6:1)*(has('clumsy')?1.3:1),
    runSpeed:has('athletic')?1.15:1,
    drain:(has('athletic')?.6:1)*(has('unfit')?1.4:1),
    ears:has('ears')
  };
}
