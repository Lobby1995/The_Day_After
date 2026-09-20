
/* ---------- every option is a gamble, except a deliberate few. each certain choice gets a way to go wrong. ---------- */
function twist(id,ci,p,loseEN,loseHE,fx){
  const ev=EVMAP[id];if(!ev)return;
  const ch=ev.choices[ci];if(!ch||!ch.out)return;
  ch.win=ch.out;delete ch.out;ch.check={p};
  ch.lose=Object.assign({text:loseEN},fx||{});
  HE_TWISTS.push([id,ci,loseHE]);
  applyHeTwists();
}
/* Hebrew entries for the original events load AFTER this file, so the Hebrew failure text is queued
   and attached as soon as the entry exists. i18n/he-extras.js calls applyHeTwists() once more at the end. */
const HE_TWISTS=[];
function applyHeTwists(){
  HE_TWISTS.forEach(([id,ci,t])=>{const h=HEV[id];if(h&&h.c&&h.c[ci])h.c[ci][3]=t;});
}
const TW=[
 ['open_usa',1,.7,`The barricade holds, but the night doesn't. Something on the other side of the wall spends hours finding the weak spot before it moves on.`,`המחסום מחזיק, אבל הלילה לא. משהו מהצד השני של הקיר מבלה שעות בחיפוש הנקודה החלשה לפני שהוא ממשיך.`,{morale:-8,food:-1}],
 ['open_brazil',2,.7,`The apartment holds. The neighbors don't. Somebody breaks in from the balcony and takes half of what you counted.`,`הדירה מחזיקה. השכנים לא. מישהו פורץ מהמרפסת ולוקח חצי ממה שספרת.`,{food:-2,hp:-6}],
 ['open_uk',1,.6,`Nobody comes. When the cordon finally reaches your street, it is facing outward, and it doesn't stop.`,`אף אחד לא בא. כשהמחסום מגיע לרחוב שלך, הוא פונה החוצה, ולא נעצר.`,{hp:-8,morale:-8,outbreak:2,flag:'waited'}],
 ['open_israel',0,.75,`The safe room is safe. The water tank isn't: a cracked pipe leaks a third of it before you notice.`,`הממ״ד בטוח. מיכל המים לא: צינור סדוק מדליף שליש ממנו לפני שמבחינים.`,{water:-2,morale:-4,flag:'sealed'}],
 ['arc_brazil',0,.75,`The community is proud and suspicious. They take your offering and ask you to sleep on the stairs.`,`הקהילה גאה וחשדנית. הם לוקחים את מה שהבאת ומבקשים שתישן על המדרגות.`,{food:-1,morale:-4}],
 ['arc_uk',2,.7,`Nora's van coughs, stalls, and dies in the middle of the motorway. You spend the night pushing it to the shoulder, and the child never stops crying.`,`הוואן של נורה משתעל, נתקע ומת באמצע הכביש המהיר. בילית את הלילה בדחיפתו לשוליים, והילד לא מפסיק לבכות.`,{morale:-8,hp:-6,food:-1}],
 ['arc_japan',0,.8,`The queue is orderly until the shutters come down. Then it isn't.`,`התור מסודר עד שהתריסים יורדים. אז הוא לא.`,{hp:-10,morale:-4}],
 ['arc_canada',2,.75,`A guard sees the crowd and pushes it back with a fire hose. The water is wasted.`,`שומר רואה את ההמון ודוחף אותו בחזרה בצינור כיבוי. המים מתבזבזים.`,{morale:-6,order:-1,humanity:1}],
 ['arc_israel',1,.7,`A neighbor pounds on the door for an hour. You don't answer. In the morning, the pounding has stopped.`,`שכן דופק על הדלת שעה. לא עונים. בבוקר, הדפיקות פסקו.`,{morale:-8,humanity:-4,outbreak:2,order:-2}],
 ['stranger',0,.7,`She eats, thanks you, and in the night walks off with half your pack.`,`היא אוכלת, מודה, ובלילה הולכת עם חצי מהתרמיל.`,{food:-3,morale:-3,humanity:-2}],
  ['mara_gone',1,.7,`What she carried isn't food. It is letters. You read them all.`,`מה שנשאה הוא לא אוכל. אלה מכתבים. קראת את כולם.`,{morale:-12}],
 ['bitten',3,.6,`It doesn't end cleanly. They follow you for a mile, calling your name.`,`זה לא נגמר נקי. הם עוקבים קילומטר, קוראים בשם.`,{hp:-8,morale:-14,humanity:-15,lose:'ctx',mark:'haunted'}],
 ['raiders',0,.7,`They take what you offered and then decide it wasn't enough.`,`הם לוקחים מה שהצעת ואז מחליטים שזה לא מספיק.`,{food:-4,morale:-8,hp:-6}],
 ['fever',0,.85,`The pills are old. The fever eases, then comes back.`,`הכדורים ישנים. החום שוכך, ואז חוזר.`,{inf:-10,hp:-5}],
  ['school',1,.75,`Somebody inside sees the bag and mistakes it for a trap. A shot hits the fence post.`,`מישהו בפנים רואה את השקית וחושב שזו מלכודת. ירייה פוגעת בעמוד הגדר.`,{hp:-6,morale:-4}],
 ['gate_outbreak',1,.6,`Somebody saw you at the fence that night. They say nothing, and that is worse.`,`מישהו ראה אותך בגדר באותו לילה. הוא לא אומר דבר, וזה גרוע יותר.`,{humanity:-14,morale:-10,order:-3,mark:'haunted'}],
 ['looter_retribution',0,.75,`He takes the food and swings anyway.`,`הוא לוקח את האוכל ומניף בכל זאת.`,{hp:-10,morale:-4}],
 ['group_argument',1,.75,`Nobody has enough, and everyone knows it. The argument moves to a new subject.`,`לאף אחד אין מספיק, וכולם יודעים. הוויכוח עובר לנושא חדש.`,{morale:-6}],
 ['winter',1,.8,`The cold finds you anyway. You wake at three with frozen fingers and a dead fire.`,`הקור מוצא אותך בכל זאת. מתעוררים בשלוש עם אצבעות קפואות ואש כבויה.`,{hp:-8,morale:-3}],
 ['planting',2,.8,`The seeds are old, and half of them don't sprout.`,`הזרעים ישנים, וחצי מהם לא נובטים.`,{food:-1,morale:-3}],
   ['researcher',3,.7,`She turns away, and a week later you find her in a ditch, clutching her hard drive.`,`היא מסתובבת והולכת, ושבוע אחר כך מוצאים אותה בתעלה, מחבקת את הכונן הקשיח.`,{humanity:-12,morale:-8}],
 ['rebuild',3,.8,`Nobody does it, and it never gets done.`,`אף אחד לא עושה את זה, וזה אף פעם לא נעשה.`,{morale:-6,order:-2}],
 ['settle_council',1,.75,`The gate stays closed, and so does everyone's conscience. Somebody scratches "shame" on the wall.`,`השער נשאר סגור, וכך גם המצפון של כולם. מישהו חורט "בושה" על הקיר.`,{humanity:-14,morale:-8}],
 ['caravan',2,.75,`The caravan turns back, and takes your best trade route with it.`,`השיירה פונה לאחור, ולוקחת איתה את נתיב הסחר הטוב ביותר.`,{order:-4,food:-1}],
  ['road_gang',0,.7,`The ledger is a lie, and by the end of the week you are the one in debt.`,`הפנקס הוא שקר, ועד סוף השבוע החוב הוא שלך.`,{food:-3,morale:-4,humanity:-2}],
 ['fork_base',1,.75,`The road is not kind. You lose a week to mud and a day to a wrong turn.`,`הדרך לא טובה. מאבדים שבוע לבוץ ויום לפנייה שגויה.`,{morale:-6,hp:-8,food:-1,flag:'nomad'}],
 ['fork_raiders',0,.7,`They tell you what the crew does before they tell you what the crew gets. It is worse than you thought.`,`הם מספרים מה הצוות עושה לפני שהם מספרים מה הצוות מקבל. זה גרוע ממה שחשבת.`,{flag:'raiderAlly',humanity:-20,ammo:2,food:1}],
 ['raider_tribute',0,.75,`They take the food and ask for more.`,`הם לוקחים את האוכל ומבקשים עוד.`,{food:-2,morale:-4}],
 ['raider_revenge',1,.75,`They take the food, and take the truce back the following week.`,`הם לוקחים את האוכל, ולוקחים את הפסקת האש בחזרה בשבוע שאחרי.`,{morale:-6,hp:-8}],
 ['fork_leader',1,.8,`The vote takes all night. By morning, three people have left.`,`ההצבעה לוקחת כל הלילה. עד הבוקר שלושה אנשים עזבו.`,{morale:-6,loyAll:-1}],
 ['z_dogs',1,.8,`They take the food and follow you for a mile.`,`הם לוקחים את האוכל ועוקבים אחריך קילומטר.`,{hp:-8}],
 ['f_letter',1,.8,`You cannot stop thinking about it.`,`אי אפשר להפסיק לחשוב על זה.`,{humanity:-3,morale:-5}],
 ['f_piano',1,.8,`The music follows you for miles, and the silence is worse.`,`המוזיקה עוקבת אחריך קילומטרים, והשקט גרוע יותר.`,{morale:-5}],
 ['wounded_soldier',1,.75,`He doesn't die. He wakes up angry, takes the radio back, and leaves you with nothing.`,`הוא לא מת. הוא מתעורר כועס, לוקח את הקשר בחזרה, ועוזב בלי כלום.`,{morale:-6}],
 ['wounded_soldier',2,.7,`The rifle is empty, and so is the moment.`,`הרובה ריק, וגם הרגע.`,{humanity:-10,morale:-6}]
];
TW.forEach(t=>twist(...t));
EVMAP.stranger.pair=[0,1];

/* the yearly review: even training can go wrong */
const YR_TW=[
 [`You pull a muscle on the second day and spend the season limping.`,`אתה מושך שריר ביום השני ומבלה את העונה בצליעה.`.replace('אתה מושך','מושכים'),{hp:-10}],
 [`Your notes get wet, and most of it is unreadable.`,`ההערות נרטבות, ורובן לא קריאות.`,{morale:-3}],
 [`You practice a little too well. Someone trips over you.`,`מתרגלים קצת טוב מדי. מישהו מועד עליך.`,{hp:-4}],
 [`The conversation is stiff, and nobody says what they mean.`,`השיחה נוקשה, ואף אחד לא אומר מה שהוא מתכוון.`,{morale:2}],
 [`You can't sleep. The world doesn't let you.`,`אי אפשר לישון. העולם לא נותן.`,{hp:8,morale:-2}]
];
YR_TW.forEach((t,i)=>twist('year_review',i,.8,t[0],t[1],t[2]));

/* loot has a cost too: something in the dark, and you take half and run */
(function(){
  const halve=fx=>{
    const f={};
    for(const k in fx){
      if(k==='flag'){continue;}
      const v=fx[k];
      f[k]=(typeof v==='number')?(v>0?Math.max(1,Math.ceil(v*.6)):v):v;
    }
    return f;
  };
  LOOT.forEach(th=>{
    const oldBuild=EVMAP[th.id].build;
    EVMAP[th.id].build=ctx=>{
      const v=oldBuild(ctx);
      v.choices=v.choices.map((c,i)=>{
        const it=ctx.items[i],d=ITEMS[it.k];
        const win=c.out;
        const lose=Object.assign(halve(win),{hp:-4,morale:-2,text:bi(
          d.uniq?`A noise in the dark. You leave the ${d.en.toLowerCase().replace(/^a /,'')} behind and run.`:`A noise in the dark. You grab what you can and run.`,
          d.uniq?`רעש בחושך. משאירים את ${d.he} מאחור ובורחים.`:`רעש בחושך. חוטפים מה שאפשר ובורחים.`)});
        delete lose.loy;
        return{label:c.label,sub:c.sub,check:{p:d.uniq?.75:.85},win,lose};
      });
      return v;
    };
  });
})();
