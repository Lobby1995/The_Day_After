
/* ---------- the prologue: the first hours of day one ----------
 * Three short scenes with no night between them.
 *   1. The moment: where you are and what you do for a living, dressed by your age, your country and how far
 *      the collapse has gone there.
 *   2. The people: what your age puts on your shoulders.
 *   3. The night: the country's own opening (open_<country>), reached from wherever the day left you.
 * Every scene is a normal two-choice question. What you choose sets flags that later chapters can read.
 */
const PRO_SIGN={
  usa:      [`Every screen in the building shows the same red banner, and nobody is looking at it any more.`,`בכל מסך בבניין אותה כרזה אדומה, ואף אחד כבר לא מסתכל עליה.`],
  brazil:   [`Somewhere below, a car alarm has been ringing for an hour and nobody is turning it off.`,`איפשהו למטה אזעקת רכב מצפצפת כבר שעה ואף אחד לא מכבה אותה.`],
  uk:       [`Rain on the windows, and the radio repeating the same instruction: stay indoors.`,`גשם על החלונות, והרדיו חוזר על אותה הוראה: להישאר בבית.`],
  japan:    [`The announcements repeat in a calm voice, and everyone listens politely.`,`ההכרזות חוזרות בקול רגוע, וכולם מקשיבים בנימוס.`],
  canada:   [`Snow is falling on a city that has stopped plowing its streets.`,`שלג יורד על עיר שהפסיקה לפנות את הרחובות.`],
  israel:   [`Every phone in the room buzzes with the same alert at the same second.`,`כל טלפון בחדר רוטט עם אותה התראה באותה שנייה.`],
  australia:[`The sun is bright, the beach is full, and a helicopter keeps circling the same street.`,`השמש בהירה, החוף מלא, ומסוק מקיף שוב ושוב את אותו רחוב.`]
};
const PRO_PHASE=[
  [`The news is still calling it an incident.`,`החדשות עדיין קוראות לזה אירוע.`],
  [`The trouble has been building for days, and today it stopped being a rumor.`,`הצרות מצטברות כבר ימים, והיום זה הפסיק להיות שמועה.`],
  [`The city has been coming apart for days, and today there is no more pretending.`,`העיר מתפרקת כבר ימים, והיום אי אפשר להעמיד פנים יותר.`]
];
const ageBand=()=>G.p.age<=29?0:G.p.age<=44?1:2;
const proPhase=()=>G.w.outbreak<40?0:G.w.outbreak<70?1:2;
const proL=l=>l==='he'?1:0;
/* the scene, your age, how far it has gone, and what the country sounds like */
const proText=(l,scene,ages)=>`${scene[proL(l)]} ${ages[ageBand()][proL(l)]} ${PRO_PHASE[proPhase()][proL(l)]} ${PRO_SIGN[G.p.loc][proL(l)]}`;

function prologueFor(p){
  const band=p.age<=29?0:p.age<=44?1:2;
  return ['pro_'+p.bg,'pro_age_'+band,'open_'+p.loc];
}
function beat(o){
  defEv({id:o.id,open:true,pro:1,t:o.t,
    x:[()=>proText('en',o.scene,o.ages),()=>proText('he',o.scene,o.ages)],ch:o.ch});
}

/* ===== scene 1: the moment, one per background ===== */
beat({id:'pro_student',t:['The Hallway','המסדרון'],
 scene:[`You are in the middle of a lecture when the phones in the hall start to buzz, all at once. The professor stops mid-sentence. Half the room stands up. The other half keeps typing.`,`באמצע הרצאה הטלפונים במסדרון מתחילים לרטוט, כולם ביחד. המרצה נעצר באמצע משפט. חצי מהאולם קם. החצי השני ממשיך להקליד.`],
 ages:[[`Twenty-something, and this was supposed to be the semester when everything began.`,`בגיל עשרים ומשהו, וזה היה אמור להיות הסמסטר שבו הכול מתחיל.`],
       [`You came back to study late, with a job and a life you had to argue into a timetable.`,`חזרת ללמוד מאוחר, עם עבודה וחיים שהיה צריך להתאים בכוח למערכת שעות.`],
       [`The oldest person in the room by twenty years, and for once that feels like an advantage.`,`האדם המבוגר ביותר באולם בהפרש של עשרים שנה, ובפעם הזאת זה מרגיש כיתרון.`]],
 ch:[
  {l:['Take charge of the hallway','לקחת פיקוד על המסדרון'],s:['Somebody has to read the alert aloud.','מישהו צריך לקרוא את ההתראה בקול.'],check:{stat:'charisma',dc:8},
   win:[`You read the alert aloud, twice, slowly. People stop pushing. A campus guard nods, and you walk fifty people out through the side exit in a line. By evening you are on the way home with a hoarse voice and a group's thanks.`,`קראת את ההתראה בקול, פעמיים, לאט. אנשים מפסיקים לדחוף. מאבטח הקמפוס מהנהן, ומוליכים חמישים איש החוצה דרך היציאה הצדדית בשורה. עד הערב בדרך הביתה, עם קול צרוד ותודה של קבוצה.`,{humanity:4,order:1,morale:3,flag:'pro_led'}],
   lose:[`Your voice cracks in the middle of the alert. Someone shoves, someone falls, and the hallway becomes a crush. You get out with a bruise and a ringing in your ears.`,`הקול נסדק באמצע ההתראה. מישהו דוחף, מישהו נופל, והמסדרון הופך למעיכה. יצאת עם חבורה וצלצול באוזניים.`,{hp:-6,morale:-4}]},
  {l:['Slip out before the roads jam','לחמוק החוצה לפני שהכבישים נתקעים'],s:['Get home first, think second.','קודם הביתה, אחר כך לחשוב.'],check:{stat:'stealth',dc:8},
   win:[`You are out the side door before the hall knows why it is afraid. The bus is running, half empty, and you are home with time to fill a bag.`,`יצאת מהדלת הצדדית לפני שהאולם מבין ממה הוא מפחד. האוטובוס נוסע, חצי ריק, והגעת הביתה עם זמן למלא תיק.`,{food:1,water:1,morale:2,flag:'pro_first_out'}],
   lose:[`The side door is chained, the bus is gone, and the walk home is long, cold and full of people running the other way.`,`הדלת הצדדית נעולה בשרשרת, האוטובוס נסע, וההליכה הביתה ארוכה, קרה ומלאה באנשים שרצים לכיוון ההפוך.`,{hp:-4,morale:-4}]}
 ]});

beat({id:'pro_teacher',t:['The Classroom Door','פתח הכיתה'],
 scene:[`It is the last lesson of the day when a parent appears at the classroom door with a face you do not want to read. In the corridor, teachers are whispering. On the wall phone, a message from the management: keep the children inside.`,`זה השיעור האחרון של היום כשהורה מופיע בפתח הכיתה עם פנים שלא רוצים לקרוא. במסדרון מורים לוחשים. בטלפון שעל הקיר הודעה מההנהלה: להשאיר את הילדים בפנים.`],
 ages:[[`Early in the career, and the children still call you by your first name.`,`עוד מוקדם בקריירה, והילדים עדיין קוראים בשם הפרטי.`],
       [`You have already taught most of these children's older siblings.`,`כבר לימדת את רוב האחים הגדולים של הילדים האלה.`],
       [`You have been in this room longer than some of the parents have been alive.`,`נמצאים בחדר הזה זמן רב יותר ממה שחלק מההורים חיים.`]],
 ch:[
  {l:['Keep the class calm and inside','להשאיר את הכיתה רגועה ובפנים'],s:['Start a story. Keep them together.','להתחיל סיפור. לשמור אותם יחד.'],check:{stat:'charisma',dc:8},
   win:[`You start a story. By the second chapter the room is quiet, the blinds are down, and a girl in the front row is holding your sleeve. When the parents finally come, every child is accounted for.`,`התחלת סיפור. בפרק השני החדר שקט, התריסים למטה, וילדה בשורה הראשונה אוחזת בשרוול. כשההורים סוף סוף מגיעים, כל ילד נמצא.`,{humanity:6,morale:3,order:1,flag:'pro_kept_kids'}],
   lose:[`A boy starts crying, and then the room does. You hold on to all of them, and it is the longest hour of the day.`,`ילד מתחיל לבכות, ואחריו החדר. מחזיקים את כולם, וזו השעה הארוכה ביותר ביום.`,{morale:-5,hp:-2}]},
  {l:['Hand the children over to the parents at the door','למסור את הילדים להורים שבפתח'],s:['One signature, one look, one child at a time.','חתימה אחת, מבט אחד, ילד אחד בכל פעם.'],check:{stat:'stamina',dc:9},
   win:[`Parent after parent, name after name, you hand each child over with a signature and a look. The building empties in twenty minutes, and the last thing you do is lock the door.`,`הורה אחרי הורה, שם אחרי שם, מוסרים כל ילד בחתימה ובמבט. הבניין מתרוקן בעשרים דקות, והדבר האחרון הוא נעילת הדלת.`,{order:2,humanity:3,morale:2,flag:'pro_handed_kids'}],
   lose:[`A mistake in the rush: a child goes home with the wrong adult. You realize it an hour later, and you will not stop thinking about it.`,`טעות בלחץ: ילד הולך הביתה עם המבוגר הלא נכון. מבינים את זה שעה אחר כך, ולא מפסיקים לחשוב על זה.`,{morale:-8,humanity:-2}]}
 ]});

beat({id:'pro_soldier',t:['The Barracks','המגורים'],
 scene:[`You are on base when the duty officer walks into the barracks and does not sit down. Everyone knows what that means. Orders are being written and rewritten in real time.`,`בבסיס, קצין תורן נכנס למגורים ולא מתיישב. כולם יודעים מה זה אומר. פקודות נכתבות ונכתבות מחדש בזמן אמת.`],
 ages:[[`Young enough to still believe in the plan.`,`הגיל עדיין מאפשר להאמין בתוכנית.`],
       [`Long enough in uniform to know what a plan is worth.`,`שנים במדים מלמדות מה שווה תוכנית.`],
       [`Old for your rank, and the younger ones look at you when they are unsure.`,`הגיל גבוה לדרגה, והצעירים מסתכלים לעברך כשהם לא בטוחים.`]],
 ch:[
  {l:['Report for the assignment','להתייצב למשימה'],s:['Take the kit, take the seat in the convoy.','לקחת את הציוד ואת המקום בשיירה.'],check:{stat:'strength',dc:9,bg:{soldier:2}},
   win:[`You take the gear, the rifle, and the place in the convoy. The sergeant hands you a pass to visit home for the night, and says it may be the last time anyone is allowed to.`,`לקחת את הציוד, את הרובה ואת המקום בשיירה. הסמל מוסר אישור יציאה הביתה ללילה, ואומר שאולי זו הפעם האחרונה שמותר לאף אחד.`,{ammo:2,order:2,morale:2,flag:'pro_reported'}],
   lose:[`The convoy leaves without you. You spend the evening explaining yourself to a lieutenant who is not listening, and are sent home with a pass and a bad feeling.`,`השיירה יוצאת בלעדיך. בילית את הערב בהסברים לקצין שלא מקשיב, ונשלחת הביתה עם אישור ותחושה רעה.`,{morale:-5,order:-1}]},
  {l:['Take the pass and go home','לקחת את האישור וללכת הביתה'],s:['Nobody said you could not.','אף אחד לא אמר שאסור.'],check:{stat:'stealth',dc:8},
   win:[`You walk out through the vehicle gate with a pass and a kit bag. Nobody asks for it. By dusk you are home, and the uniform is in the closet.`,`יצאת דרך שער הרכבים עם אישור ותיק ציוד. איש לא ביקש אותו. עד הערב בבית, והמדים בארון.`,{morale:3,food:1,humanity:-2,flag:'pro_left_post'}],
   lose:[`The guard at the gate is a friend, and he lets you through with a look that says he will remember. It costs you something you do not have a name for.`,`השומר בשער הוא חבר, והוא מעביר אותך עם מבט שאומר שיזכור. זה עולה לך במשהו שאין לו שם.`,{morale:-6,humanity:-2}]}
 ]});

beat({id:'pro_doctor',t:['The Theatre','חדר הניתוח'],
 scene:[`Before a routine surgery, while scrubbing in, the anesthetist says quietly that a fourth patient tonight has come in with the same bite. The patient on the table is stable. The corridor outside is not.`,`לפני ניתוח שגרתי, בזמן השטיפה, המרדים אומר בשקט שמטופל רביעי הערב הגיע עם אותה נשיכה. המטופל על השולחן יציב. המסדרון בחוץ לא.`],
 ages:[[`Young enough for the hospital to still be the whole world.`,`בית החולים עדיין כל העולם.`],
       [`The one the residents look at when things go wrong.`,`אליך מסתכלים המתמחים כשמשהו משתבש.`],
       [`You have seen an outbreak before, or something like it, and you do not like how this one started.`,`כבר ראו התפרצות, או משהו דומה, והדרך שבה זו התחילה לא מוצאת חן.`]],
 ch:[
  {l:['Finish the operation','לסיים את הניתוח'],s:['The patient on the table is yours.','המטופל על השולחן באחריותך.'],check:{stat:'wits',dc:9,bg:{doctor:2}},
   win:[`Two hours, one clean closure, one patient who will live. You leave the theatre last, and the corridor outside is quieter than it should be.`,`שעתיים, סגירה נקייה אחת, מטופל אחד שיחיה. יצאת אחרון מחדר הניתוח, והמסדרון בחוץ שקט ממה שצריך.`,{humanity:6,morale:4,meds:1,flag:'pro_finished_op'}],
   lose:[`Something goes wrong at the end: not your fault, but yours to carry. The patient lives, and you leave the theatre shaking.`,`משהו משתבש בסוף: לא באשמתך, אבל עליך לשאת אותו. המטופל חי, ויצאת מחדר הניתוח בידיים רועדות.`,{morale:-6,humanity:2}]},
  {l:['Leave the theatre and go to the ward','לצאת מחדר הניתוח ולעלות למחלקה'],s:['The corridor cannot wait.','המסדרון לא יכול לחכות.'],check:{stat:'stamina',dc:9,bg:{doctor:1}},
   win:[`You walk into a corridor of beds, and by midnight you have triaged forty people and lost none of them. You leave with a bag of supplies and the ward's gratitude.`,`נכנסת למסדרון של מיטות, ועד חצות מיינת ארבעים אנשים ולא איבדת אף אחד. יצאת עם תיק אספקה ותודת המחלקה.`,{meds:2,humanity:5,hp:-3,flag:'pro_ward'}],
   lose:[`The ward is worse than anyone said. You do what you can, then what you must, and you leave with your hands shaking and your bag half empty.`,`המחלקה גרועה ממה שאמרו. עשית מה שאפשר, אחר כך מה שחייבים, ויצאת בידיים רועדות ותיק חצי ריק.`,{meds:1,hp:-6,morale:-8}]}
 ]});

beat({id:'pro_politician',t:['The Meeting Room','חדר הישיבות'],
 scene:[`You are in a meeting room with a table full of people who all speak at once, and a phone in the middle that no one wants to answer. Someone finally does, and the room goes silent in the wrong way. They all turn to you.`,`בחדר ישיבות, שולחן מלא באנשים שמדברים כולם יחד, וטלפון באמצע שאף אחד לא רוצה לענות לו. מישהו לבסוף עונה, והחדר משתתק בדרך הלא נכונה. כולם פונים אליך.`],
 ages:[[`The lowest age at the table, which is the only reason they trust you not to have lied yet.`,`הגיל הנמוך ביותר ליד השולחן, וזו הסיבה היחידה שסומכים שעוד לא שיקרו.`],
       [`You have negotiated harder rooms than this, and lost.`,`כבר ניהלת משא ומתן בחדרים קשים מזה, והפסדת.`],
       [`You have outlasted three governments and a good many crises.`,`שרדת שלוש ממשלות והרבה משברים.`]],
 ch:[
  {l:['Take the phone and take charge','לקחת את הטלפון ולקחת פיקוד'],s:['Three sentences: what is known, what is not, what happens next.','שלושה משפטים: מה ידוע, מה לא, מה קורה עכשיו.'],check:{stat:'charisma',dc:9,bg:{politician:2}},
   win:[`You say three things: what is known, what is not, and what happens next. The room breathes. By the end of the call you have an evacuation route, a spokesperson, and a reputation you did not have this morning.`,`אמרת שלושה דברים: מה ידוע, מה לא, ומה קורה עכשיו. החדר נושם. עד סוף השיחה יש מסלול פינוי, דובר, ושם שלא היה הבוקר.`,{order:3,humanity:2,morale:2,flag:'pro_took_charge'}],
   lose:[`You say the wrong thing at the wrong time, and the room hears it. The call ends. Your name is on it, and so is the blame.`,`אמרת את הדבר הלא נכון בזמן הלא נכון, והחדר שמע. השיחה מסתיימת. שמך עליה, וגם האשמה.`,{morale:-6,order:-2,humanity:-1}]},
  {l:['Step out and use your contacts','לצאת ולהשתמש בקשרים'],s:['A quiet call is worth more than a loud room.','שיחה שקטה שווה יותר מחדר רועש.'],check:{stat:'wits',dc:8},
   win:[`A quiet call to a friend at a ministry, another to a driver. By evening you have a seat on an official convoy and a promise of a slot for someone you love.`,`שיחה שקטה לחבר במשרד, עוד אחת לנהג. עד הערב יש מקום בשיירה רשמית והבטחה למקום עבור מישהו יקר.`,{food:1,order:1,morale:3,flag:['pro_contacts','contacts']}],
   lose:[`Nobody picks up. The numbers that used to work do not, and the sound of doors closing is very clear.`,`אף אחד לא עונה. המספרים שעבדו כבר לא עובדים, והקול של דלתות שנסגרות ברור מאוד.`,{morale:-5,humanity:-1}]}
 ]});

beat({id:'pro_journalist',t:['The Briefing','מסיבת העיתונאים'],
 scene:[`You are at a press briefing when the spokesperson stops answering questions. Every camera in the room points at a podium that suddenly seems very far away. Your phone shows a message from a source: three words, no punctuation.`,`במסיבת עיתונאים, הדובר מפסיק לענות על שאלות. כל מצלמה בחדר מכוונת אל דוכן שפתאום נראה רחוק מאוד. בטלפון הודעה ממקור: שלוש מילים, בלי פיסוק.`],
 ages:[[`Early in the career, and wanting the story more than you should.`,`מוקדם בקריירה, ורוצים את הסיפור יותר מדי.`],
       [`Enough disasters covered to know which sentences are lies.`,`מספיק אסונות סוקרו כדי לדעת אילו משפטים הם שקר.`],
       [`You have covered wars, and you do not remember any of them starting like this.`,`סקרת מלחמות, ולא זכור שאחת מהן התחילה כך.`]],
 ch:[
  {l:['Follow the story into the hospital','ללכת אחרי הסיפור אל בית החולים'],s:['Someone has to see it with their own eyes.','מישהו צריך לראות את זה בעיניים.'],check:{stat:'stealth',dc:9,bg:{journalist:2}},
   win:[`You get through the loading dock behind a delivery driver. What you see on the third floor is on your camera in eleven seconds, and in your dreams for a month. It is also the truth, and someone needs to have it.`,`נכנסת דרך רציף הפריקה מאחורי נהג משלוחים. מה שנראה בקומה השלישית על המצלמה תוך אחת עשרה שניות, ובחלומות במשך חודש. זו גם האמת, ומישהו צריך להחזיק בה.`,{order:-1,morale:-3,flag:'pro_witness'}],
   lose:[`Security catches you at the dock. They are not gentle, and they are not wrong. You leave with a cracked camera and your questions unanswered.`,`האבטחה תופסת אותך ברציף. הם לא עדינים, והם לא טועים. יצאת עם מצלמה סדוקה ושאלות בלי תשובה.`,{hp:-6,morale:-5}]},
  {l:['File what you have and get out of the city','לשלוח מה שיש ולצאת מהעיר'],s:['A story that is out is a story that cannot be buried.','סיפור שיצא אי אפשר לקבור.'],check:{stat:'wits',dc:8},
   win:[`You send the report and the photographs, and it goes around the world in an hour. Then you find a ride out with a truck driver who has a radio and does not want to talk about the news.`,`שלחת את הדיווח ואת התצלומים, וזה עובר בעולם בתוך שעה. אחר כך נמצא טרמפ עם נהג משאית שיש לו רדיו ולא רוצה לדבר על החדשות.`,{food:1,morale:3,flag:'pro_filed'}],
   lose:[`The report goes out and the network drops. Nobody will know what you saw, and you are stuck in a city where nobody will tell you what to do.`,`הדיווח יוצא והרשת נופלת. איש לא ידע מה נראה, ונשארים תקועים בעיר שאיש בה לא אומר מה לעשות.`,{morale:-5,humanity:-1}]}
 ]});

beat({id:'pro_firefighter',t:['The Alarm','האזעקה'],
 scene:[`The alarm goes off at the station at 3:12 in the afternoon, the second call in ten minutes. The dispatcher's voice is different: tight, fast, and lying about how calm it is. Your captain hands out assignments before the truck is warm.`,`האזעקה בתחנה מצלצלת בשלוש ורבע אחר הצהריים, הקריאה השנייה בתוך עשר דקות. הקול של המוקדנית שונה: מתוח, מהיר, ומשקר לגבי כמה הוא רגוע. המפקד מחלק משימות לפני שהמשאית התחממה.`],
 ages:[[`Still the newest name on the roster.`,`עדיין השם האחרון ברשימה.`],
       [`A thousand calls behind you, and you can tell in the first minute when one is different.`,`אלף קריאות מאחור, ואפשר לזהות בדקה הראשונה מתי אחת שונה.`],
       [`The one everyone asks about the smoke.`,`על העשן שואלים אותך.`]],
 ch:[
  {l:['Go on the call','לצאת לקריאה'],s:['A stairwell full of smoke and something worse.','חדר מדרגות מלא עשן ומשהו גרוע יותר.'],check:{stat:'strength',dc:9,bg:{firefighter:2}},
   win:[`A building on the east side, a stairwell full of smoke and something worse. You bring out four people, one of them a child. Your captain has never said so much with a nod.`,`בניין בצד המזרחי, חדר מדרגות מלא עשן ומשהו גרוע יותר. הוצאת ארבעה אנשים, אחד מהם ילד. המפקד מעולם לא אמר כל כך הרבה בהנהון.`,{humanity:6,hp:-4,morale:3,flag:'pro_called'}],
   lose:[`The stairwell is worse than the dispatcher said. You get two people out, and the third stays with you for a long time.`,`חדר המדרגות גרוע ממה שהמוקדנית אמרה. הוצאת שני אנשים, והשלישי נשאר איתך זמן רב.`,{hp:-10,morale:-8,humanity:2}]},
  {l:['Stay at the station and fortify it','להישאר בתחנה ולבצר אותה'],s:['A heavy door, a generator, a fuel tank.','דלת כבדה, גנרטור, מיכל דלק.'],check:{stat:'wits',dc:8},
   win:[`The station has a heavy door, a generator and a fuel tank. By nightfall it is a fortress with a shortage of people, and a few show up looking for one.`,`בתחנה דלת כבדה, גנרטור ומיכל דלק. עד רדת החשכה היא מבצר עם מחסור באנשים, וכמה מגיעים לחפש אחד.`,{food:1,water:2,order:2,flag:'pro_station'}],
   lose:[`The fuel tank is half empty, the generator is old, and the crowd that arrives is bigger than the door can hold.`,`מיכל הדלק חצי ריק, הגנרטור ישן, וההמון שמגיע גדול ממה שהדלת יכולה להחזיק.`,{hp:-5,morale:-5}]}
 ]});

beat({id:'pro_mechanic',t:['Under the Truck','מתחת למשאית'],
 scene:[`You are under a truck when the owner runs into the garage and turns the radio up. Every channel has the same voice. He wants to know if you can get a delivery van running by tonight. Then a second customer wants the same. Then a third.`,`מתחת למשאית, כשהבעלים נכנס בריצה למוסך ומגביר את הרדיו. בכל תחנה אותו קול. הוא שואל אם אפשר להניע ואן משלוחים עד הערב. אחר כך לקוח שני רוצה אותו דבר. אחר כך שלישי.`],
 ages:[[`The fastest hands in the shop, and everyone knows it.`,`הידיים המהירות ביותר במוסך, וכולם יודעים.`],
       [`You have fixed what everyone else gave up on.`,`תיקנת מה שכל האחרים ויתרו עליו.`],
       [`You know every sound an engine can make, and this one is making none of them.`,`מכירים כל צליל שמנוע יכול להשמיע, וזה לא משמיע אף אחד מהם.`]],
 ch:[
  {l:['Fix the vans, and keep one','לתקן את הואנים ולשמור אחד'],s:['Whoever has wheels has options.','למי שיש גלגלים יש אפשרויות.'],check:{stat:'wits',dc:8,bg:{mechanic:2}},
   win:[`By evening two vans are running and one has your name on it. The owner does not argue. He hands you the keys, a full jerry can, and the toolbox you have wanted for a decade.`,`עד הערב שני ואנים פועלים ולאחד יש את שמך. הבעלים לא מתווכח. הוא מוסר את המפתחות, ג׳ריקן מלא וארגז הכלים שרצית כבר עשר שנים.`,{food:1,water:1,flag:['pro_van','car']}],
   lose:[`You get one van running, and it is not yours. The queue turns into a brawl, and you walk out with a split lip and a wrench.`,`מצליחים להניע ואן אחד, והוא לא שלך. התור הופך לקטטה, ויצאת עם שפה פצועה ומפתח ברגים.`,{hp:-5,morale:-4}]},
  {l:['Close the shop and carry home what you can','לסגור את המוסך ולסחוב הביתה מה שאפשר'],s:['The toolkit is worth more than the shop.','ערכת הכלים שווה יותר מהמוסך.'],check:{stat:'stamina',dc:8},
   win:[`The toolkit, the jack, the good gloves, the spare tank. You carry it a mile on foot, and by dusk you are home with a bag that weighs more than it should and is worth every kilo.`,`ערכת הכלים, הג׳ק, הכפפות הטובות, המיכל החלופי. סחבת אותם קילומטר ברגל, ועד הערב בבית עם תיק כבד ממה שצריך ושווה כל קילו.`,{water:1,food:1,morale:2,flag:['pro_tools','toolkit']}],
   lose:[`The bag is too heavy, the road is longer than you thought, and halfway home you leave half of it in a ditch.`,`התיק כבד מדי, הדרך ארוכה ממה שחשבת, ובאמצע הדרך הביתה חצי ממנו נשאר בתעלה.`,{hp:-4,morale:-4}]}
 ]});

/* ===== scene 2: the people, one per age band ===== */
function beat2(o){
  defEv({id:o.id,open:true,pro:2,t:o.t,
    x:[()=>`${o.text[0]} ${PRO_SIGN[G.p.loc][0]}`,()=>`${o.text[1]} ${PRO_SIGN[G.p.loc][1]}`],ch:o.ch});
}
beat2({id:'pro_age_0',t:['The Call','השיחה'],
 text:[`Your phone is at two percent, and there are forty messages: most of them from your mother, one from a friend on the other side of the city.`,`הטלפון על שני אחוזים, ויש ארבעים הודעות: רובן מאמא, אחת מחבר בצד השני של העיר.`],
 ch:[
  {l:['Call your parents and promise to come home','להתקשר להורים ולהבטיח לבוא הביתה'],s:['Say the route out loud, twice.','להגיד את המסלול בקול, פעמיים.'],check:{stat:'charisma',dc:7},
   win:[`Your mother answers on the first ring and does not cry. She makes you say the route back to her twice. You have a home to go to, and a plan.`,`אמא עונה בצלצול הראשון ולא בוכה. היא גורמת להגיד לה את המסלול בחזרה פעמיים. יש בית ללכת אליו, ותוכנית.`,{morale:5,humanity:2,flag:'pro_home'}],
   lose:[`The line drops before you can say anything. You send a message that arrives too late for either of you to change anything.`,`הקו נופל לפני שאפשר להגיד משהו. נשלחת הודעה שמגיעה מאוחר מדי כדי לשנות משהו.`,{morale:-6}]},
  {l:['Go to your friend across the city','ללכת לחבר בצד השני של העיר'],s:['Two is better than one.','שניים טובים מאחד.'],check:{stat:'stamina',dc:9},
   win:[`You reach your friend after dark, out of breath, laughing at nothing. You spend the night on their floor, and in the morning there are two of you.`,`הגעת לחבר אחרי רדת החשכה, בלי נשימה, צוחקים בלי סיבה. בילית את הלילה על הרצפה אצלו, ובבוקר אתם שניים.`,{morale:6,food:1,flag:'pro_friend'}],
   lose:[`You get halfway before the streets close up. You spend the night in a stairwell, with no one to call.`,`הגעת לחצי הדרך לפני שהרחובות נסגרים. בילית את הלילה בחדר מדרגות, בלי אף אחד להתקשר אליו.`,{hp:-4,morale:-5}]}
 ]});
beat2({id:'pro_age_1',t:['The List','הרשימה'],
 text:[`You have a phone in one hand and a list in your head: who needs picking up, who is already in the building, who is somewhere you cannot reach.`,`טלפון ביד אחת ורשימה בראש: מי צריך להיאסף, מי כבר בבניין, מי נמצא איפה שאי אפשר להגיע.`],
 ch:[
  {l:['Gather your people and hold together','לאסוף את האנשים ולהישאר יחד'],s:['Count them twice, then a third time.','לספור אותם פעמיים, ואז שלישית.'],check:{stat:'charisma',dc:8},
   win:[`Everyone is in one room by nightfall. You count them twice and then a third time. It is enough. It will have to be.`,`עד רדת החשכה כולם בחדר אחד. סופרים אותם פעמיים ואז פעם שלישית. זה מספיק. זה יצטרך להספיק.`,{humanity:5,morale:6,flag:'pro_family'}],
   lose:[`Someone is missing, and you cannot go and find them without losing the others. You choose, and you carry the choosing.`,`מישהו חסר, ואי אפשר ללכת למצוא אותו בלי לאבד את האחרים. בוחרים, ונושאים את הבחירה.`,{morale:-8,humanity:1,flag:'pro_missing'}]},
  {l:['Go out for the ones who are not with you','לצאת אחרי אלה שאינם איתך'],s:['The city is dark, and the list is long.','העיר חשוכה, והרשימה ארוכה.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`You cross the city in the dark. When you come back there are two more people behind you, and none of them are the ones you expected.`,`חצית את העיר בחושך. כשחזרת יש עוד שני אנשים מאחוריך, ואף אחד מהם לא מי שציפית לו.`,{humanity:8,morale:4,hp:-5,flag:'pro_fetched'}],
   lose:[`You get as far as you can. The rest of the way belongs to someone else, and you turn around with empty hands.`,`הגעת עד כמה שאפשר. שאר הדרך שייכת למישהו אחר, וחזרת בידיים ריקות.`,{hp:-8,morale:-8,inf:6}]}
 ]});
beat2({id:'pro_age_2',t:['What You Know','מה שנשאר בידיים'],
 text:[`You know things that no one under forty knows: what a real shortage looks like, who owes whom, which neighbor will hold a door. Your body has its own opinion about tonight.`,`יודעים דברים שאף אחד מתחת לארבעים לא יודע: איך נראה מחסור אמיתי, מי חייב למי, איזה שכן יחזיק דלת. לגוף יש דעה משלו לגבי הלילה.`],
 ch:[
  {l:['Organize the building and lead it','לארגן את הבניין ולהוביל אותו'],s:['Somebody has to be the adult in the room.','מישהו צריך להיות המבוגר בחדר.'],check:{stat:'charisma',dc:8},
   win:[`Doors open along the corridor. Someone brings a lamp, someone a list, someone soup. By midnight the building has a plan and a rota, and everyone quietly agrees it was your idea.`,`דלתות נפתחות לאורך המסדרון. מישהו מביא מנורה, מישהו רשימה, מישהו מרק. עד חצות יש לבניין תוכנית ותורנות, וכולם מסכימים בשקט שזה היה הרעיון שלך.`,{order:3,humanity:4,morale:3,flag:'pro_elder'}],
   lose:[`They are polite, they are grateful, and they do not follow. You spend the night alone on the stairs, being right.`,`הם מנומסים, אסירי תודה, ולא עוקבים. בילית את הלילה לבד על המדרגות, עם הצדק.`,{morale:-5}]},
  {l:['Pack light and be ready to go','לארוז קל ולהיות מוכנים ללכת'],s:['Boots, a good coat, and a list of what you can still do.','מגפיים, מעיל טוב, ורשימה של מה שעדיין אפשר לעשות.'],check:{stat:'wits',dc:8},
   win:[`Boots, a good coat, water, and a list of what you still know how to do. You are ready before anyone else has decided what they are ready for.`,`מגפיים, מעיל טוב, מים, ורשימה של מה שעדיין יודעים לעשות. מוכנים לפני שמישהו אחר החליט למה הוא מוכן.`,{food:1,water:1,hp:3,flag:'pro_packed'}],
   lose:[`You pack, and repack, and pack again, and by midnight you know every weakness of a body that used to be able to do more.`,`אורזים, ופורקים, ואורזים שוב, ועד חצות מכירים כל חולשה של גוף שפעם יכול היה יותר.`,{hp:-3,morale:-4}]}
 ]});

/* ===== scene 3: the country's own night. the existing openers, reached from wherever the day left you ===== */
const PRO_BRIDGE={
  student:   [`Evening. Your bag is on your shoulder and your phone is at ten percent.`,`ערב. התיק על הכתף והטלפון על עשרה אחוזים.`],
  teacher:   [`Evening. The school is behind you, and the day's last register is in your bag.`,`ערב. בית הספר מאחור, ורשימת הנוכחות האחרונה של היום בתיק.`],
  soldier:   [`Evening. The kit bag is heavy, and the pass in your pocket has a time written on it.`,`ערב. תיק הציוד כבד, ועל האישור בכיס כתובה שעה.`],
  doctor:    [`Evening. The hospital smell is still in your hair, and the day's sleep is still owed.`,`ערב. ריח בית החולים עדיין בשיער, ושינה של היום עדיין חוב.`],
  politician:[`Evening. Your phone has not been silent for a minute since noon.`,`ערב. הטלפון לא שתק דקה אחת מאז הצהריים.`],
  journalist:[`Evening. Your recorder is full, and so is your head.`,`ערב. ההקלטה מלאה, וגם הראש.`],
  firefighter:[`Evening. Your hands still smell of smoke.`,`ערב. הידיים עדיין מסריחות מעשן.`],
  mechanic:  [`Evening. Grease on your knuckles and a list of things that still need fixing.`,`ערב. שומן על פרקי האצבעות ורשימה של דברים שעדיין צריך לתקן.`]
};
/* called once the Hebrew entries exist: puts the bridge in front of every country opener and marks it scene 3 */
function dressOpeners(){
  LOC_ORDER.forEach(loc=>{
    const ev=EVMAP['open_'+loc],he=HEV['open_'+loc];
    if(!ev||ev._dressed)return;
    ev._dressed=true;ev.pro=3;
    const en=ev.text,hb=he&&he.x;
    ev.text=()=>`${(PRO_BRIDGE[G.p.bg]||PRO_BRIDGE.student)[0]} ${en}`;
    if(he)he.x=()=>`${(PRO_BRIDGE[G.p.bg]||PRO_BRIDGE.student)[1]} ${hb}`;
  });
}
