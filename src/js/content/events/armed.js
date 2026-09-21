
/* ---------- armed encounters: what the rifle and the rounds are for ----------
 * One option costs ammunition and, in return, is much easier (armed:true). The other option never does.
 * These come up far more often when you are carrying ammunition, so the rounds are always worth something.
 */
const armedW=()=>G.p.sup.ammo>=3?34:G.p.sup.ammo>=1?18:4;
const armedC=d=>()=>G.w.day>=T(d);

defEv({id:'arm_hunt',cond:armedC(2),w:armedW,
 t:['Fresh Tracks','עקבות טריות'],
 x:[`Deer tracks in the mud, still wet, and a clearing downwind where the animal must be feeding. There is a rifle in your pack and not many rounds. A snare would take all day.`,
    `עקבות צבי בבוץ, עדיין רטובות, ופרשה בכיוון הרוח שבה החיה בוודאי אוכלת. יש רובה בתיק ולא הרבה כדורים. פח לכידה ייקח יום שלם.`],
 ch:[
  {l:['Take the shot','לירות'],s:['One round, and forty kilos of meat.','כדור אחד, וארבעים קילו של בשר.'],cost:{ammo:1},check:{stat:'stealth',dc:8,armed:true},
   win:[`The shot is clean, and the animal drops where it stood. Forty kilos of meat, dressed by dusk, and a smoke that will last a week.`,`הירייה נקייה, והחיה נופלת במקום שעמדה. ארבעים קילו בשר, מנוקה עד הערב, ועישון שיחזיק שבוע.`,{food:5,morale:3}],
   lose:[`The animal bolts at the sound. You spend the rest of the daylight and one round on a track that ends at a river.`,`החיה בורחת מהקול. מבלים את שאר אור היום, וכדור אחד, במעקב שנגמר בנהר.`,{morale:-3}]},
  {l:['Set a snare and wait','להציב פח לכידה ולחכות'],s:['Patience, and no rounds.','סבלנות, ובלי כדורים.'],check:{stat:'wits',dc:8},
   win:[`By morning the snare holds a hare and a good deal of patience. It is not much. It does not cost a round.`,`עד הבוקר בפח ארנב והרבה סבלנות. זה לא הרבה. זה לא עלה כדור.`,{food:2,morale:1}],
   lose:[`The snare catches nothing but a great deal of dew.`,`פח הלכידה לא תופס דבר מלבד הרבה טל.`,{morale:-2,hp:-1}]}
 ]});

defEv({id:'arm_dogs',cond:armedC(3),w:armedW,
 t:['The Dogs at the Fence','הכלבים ליד הגדר'],
 x:[`Six feral dogs circle the fence of the place you have been sleeping, and they have decided you are dinner. One of them is very large.`,
    `שישה כלבי פרא מקיפים את הגדר של המקום שבו ישנים, והחליטו שאתם ארוחת ערב. אחד מהם גדול מאוד.`],
 ch:[
  {l:['Fire from the roof','לירות מהגג'],s:['Two rounds, and the pack thinks again.','שני כדורים, והלהקה חושבת מחדש.'],cost:{ammo:2},check:{stat:'strength',dc:8,armed:true},
   win:[`Two shots, and the pack scatters. The large one stays, looks at you, and thinks better of it. You sleep with the rifle in your arms.`,`שתי יריות, והלהקה מתפזרת. הגדול נשאר, מסתכל, וחוזר בו. ישנים עם הרובה בזרועות.`,{morale:3,humanity:-1}],
   lose:[`The dogs scatter, then return. You spend the night awake and two rounds poorer.`,`הכלבים מתפזרים, ואז חוזרים. מבלים את הלילה ערים ובשני כדורים פחות.`,{morale:-4,hp:-3}]},
  {l:['Throw them the food and slip out','לזרוק להם אוכל ולהחליק החוצה'],s:['Something to chase, and a back wall.','משהו לרדוף אחריו, וקיר אחורי.'],check:{stat:'stealth',dc:9},
   win:[`They fall on the scraps, and you go over the back wall with your pack.`,`הם נופלים על השאריות, ועוברים את הקיר האחורי עם התיק.`,{food:-1,morale:-1}],
   lose:[`The large one follows you across two fields, and does not give up until it has left its mark.`,`הגדול עוקב אחרי שני שדות, ולא מוותר עד שהשאיר סימן.`,{hp:-8,inf:5}]}
 ]});

defEv({id:'arm_breach',cond:armedC(4),w:armedW,
 t:['The Breach','הפרצה'],
 x:[`A section of the town wall has come down in the night, and the dead are coming through the gap one at a time, slowly, with the patience of the tide. There are fifteen people behind you, and one rifle between them.`,
    `קטע מחומת העיירה קרס בלילה, והמתים נכנסים דרך הפרצה אחד אחד, לאט, בסבלנות של גאות. חמישה עשר איש מאחור, ורובה אחד ביניהם.`],
 ch:[
  {l:['Hold the gap with the rifle','להחזיק את הפרצה עם הרובה'],s:['Three rounds, three seconds.','שלושה כדורים, שלוש שניות.'],cost:{ammo:3},check:{stat:'strength',dc:9,armed:true},
   win:[`Three rounds in three seconds, and the gap is a narrow bright place with nothing coming through it. The town cheers, not loudly, and repairs the wall by dawn.`,`שלושה כדורים בשלוש שניות, והפרצה מקום צר ובהיר שאין בו כלום. העיירה מריעה, לא בקול, ומתקנת את החומה עד עלות השחר.`,{order:3,humanity:2,morale:4}],
   lose:[`The rifle holds the gap, but not for long enough. A few get through before the wall is closed.`,`הרובה מחזיק את הפרצה, אבל לא מספיק זמן. כמה חודרים לפני שהחומה נסגרת.`,{hp:-10,order:-2,morale:-4}]},
  {l:['Fight them at the gap with a pipe','להילחם בפרצה עם צינור'],s:['One at a time, and an hour.','אחד אחד, ושעה.'],check:{stat:'strength',dc:10,danger:true},
   win:[`It takes an hour and a bruised forearm. By dawn the gap is a pile of stones and a very tired town.`,`לוקח שעה וזרוע חבולה. עד עלות השחר הפרצה ערימת אבנים ועיירה עייפה מאוד.`,{hp:-6,order:2,morale:2}],
   lose:[`The pipe is not enough. You come out of the gap with a bite you do not mention.`,`הצינור לא מספיק. יוצאים מהפרצה עם נשיכה שלא מזכירים.`,{hp:-12,inf:12,order:-2}]}
 ]});

defEv({id:'arm_roof',cond:armedC(3),w:armedW,
 t:['Stranded on the Roof','תקוע על הגג'],
 x:[`A man is standing on the roof of a bus shelter, surrounded by a dozen of the dead, waving a jacket. He has been there since morning, and the only way to him is through them.`,
    `אדם עומד על גג תחנת אוטובוס, מוקף תריסר מתים, מנופף במעיל. הוא שם מאז הבוקר, והדרך היחידה אליו עוברת דרכם.`],
 ch:[
  {l:['Clear a path with the rifle','לפנות דרך עם הרובה'],s:['Three rounds, three steps.','שלושה כדורים, שלושה צעדים.'],cost:{ammo:3},check:{stat:'strength',dc:9,armed:true},
   win:[`Three rounds, three cleared steps, and a hand. He comes down off the roof shaking and grateful, and presses a good knife on you.`,`שלושה כדורים, שלושה צעדים פנויים, ויד. הוא יורד מהגג רועד ואסיר תודה, ודוחף סכין טובה.`,{humanity:5,morale:4}],
   lose:[`The path clears, and closes again. You get him down with a graze and an argument.`,`הדרך נפתחת, ונסגרת שוב. מורידים אותו עם שריטה ווויכוח.`,{hp:-6,humanity:2}]},
  {l:['Draw them away','למשוך אותם הצידה'],s:['Noise on the far side.','רעש בצד הרחוק.'],check:{stat:'stealth',dc:9},
   win:[`You make noise on the far side, and the dead drift toward it like weather. He comes down quietly.`,`עושים רעש בצד הרחוק, והמתים נסחפים אליו כמו מזג אוויר. הוא יורד בשקט.`,{humanity:4,morale:2}],
   lose:[`It works too well: they turn toward both of you.`,`זה עובד יותר מדי: הם פונים לשניכם.`,{hp:-8,morale:-4}]}
 ]});

defEv({id:'arm_sniper',cond:armedC(5),w:armedW,
 t:['The Sniper','הצלף'],
 x:[`A single shot cracks off the roof of the bank and hits the pavement a step in front of you. Someone has the street, and they have a scope. The dead are drawn to the noise, and your route runs straight through.`,
    `ירייה בודדת נשמעת מגג הבנק ופוגעת במדרכה צעד לפניכם. מישהו שולט ברחוב, ויש לו כוונת. המתים נמשכים לרעש, והמסלול עובר ישר דרכם.`],
 ch:[
  {l:['Answer the shooter with your own rifle','לענות ליורה עם הרובה שלך'],s:['Wait for the flash, and put two rounds over it.','לחכות להבזק, ולירות שני כדורים מעליו.'],cost:{ammo:2},check:{stat:'stealth',dc:9,armed:true},
   win:[`You wait for the second shot, find the flash, and put two rounds over it. The roof goes quiet. Whoever was there has decided you are not worth it.`,`מחכים לירייה השנייה, מוצאים את ההבזק, ויורים שני כדורים מעליו. הגג משתתק. מי שהיה שם החליט שאתם לא שווים את זה.`,{order:1,morale:3,humanity:-1}],
   lose:[`The second shot takes your hat and your certainty. You crawl out of the street with a scraped shoulder and a lot fewer rounds.`,`הירייה השנייה לוקחת את הכובע ואת הביטחון. זוחלים מהרחוב עם כתף שרוטה והרבה פחות כדורים.`,{hp:-8,morale:-4}]},
  {l:['Go around through the buildings','לעקוף דרך הבניינים'],s:['Stairwells and a fire escape.','חדרי מדרגות ויציאת חירום.'],check:{stat:'stamina',dc:9},
   win:[`Six floors of stairwells and a fire escape. You come out two streets later, dusty and quiet, and no one has shot at you.`,`שש קומות של חדרי מדרגות ויציאת חירום. יוצאים שני רחובות אחר כך, מאובקים ושקטים, ואיש לא ירה.`,{morale:2,hp:-2}],
   lose:[`The building is full of company. You leave it faster than you entered.`,`הבניין מלא בחברה. עוזבים אותו מהר יותר משנכנסו.`,{hp:-10,inf:8}]}
 ]});

defEv({id:'arm_toll',cond:armedC(3),w:armedW,
 t:['The Warning Shot','ירייה באוויר'],
 x:[`Two men with a chain across a bridge want everything in your pack for the right of way. They have a rifle too, propped against a post like a broom. Neither of them looks eager.`,
    `שני אנשים עם שרשרת על פני גשר רוצים את כל מה שבתיק תמורת זכות מעבר. גם להם יש רובה, נשען על עמוד כמו מטאטא. אף אחד מהם לא נראה להוט.`],
 ch:[
  {l:['Fire a warning shot','לירות באוויר'],s:['One round, and a lot of quiet.','כדור אחד, והרבה שקט.'],cost:{ammo:1},check:{stat:'charisma',dc:8,armed:true},
   win:[`The shot goes over their heads and into the river. The chain drops, and one of them sits down suddenly on the rail. You cross with your pack and their careful attention.`,`הירייה עוברת מעל הראשים אל הנהר. השרשרת נופלת, ואחד מהם מתיישב פתאום על המעקה. עוברים עם התיק והתשומת לב הזהירה שלהם.`,{order:-1,morale:3,humanity:-2}],
   lose:[`The shot goes over their heads, and it turns out they have more courage than you thought. You end up paying most of the toll anyway.`,`הירייה עוברת מעל הראשים, ומתברר שיש להם יותר אומץ ממה שחשבתם. משלמים את רוב האגרה בכל זאת.`,{food:-2,morale:-4}]},
  {l:['Pay half and talk them down','לשלם חצי ולדבר איתם'],s:['A story about a daughter.','סיפור על בת.'],check:{stat:'charisma',dc:9},
   win:[`You pay half, listen to a story about a daughter, and cross with half of what you carried and all of your nerve.`,`משלמים חצי, מקשיבים לסיפור על בת, ועוברים עם חצי ממה שנשאו וכל העצבים.`,{food:-1,humanity:2,morale:1}],
   lose:[`You pay all of it, and they still want the boots.`,`משלמים הכול, והם עדיין רוצים את המגפיים.`,{food:-3,morale:-5}]}
 ]});

defEv({id:'arm_watch',cond:armedC(5),w:armedW,
 t:['The Long Watch','המשמרת הארוכה'],
 x:[`You are holding a farmhouse at a crossroads, and tonight a convoy of strangers is coming up the lane with its lights off. It could be neighbors. It could be a raiding party. You have the high window, one rifle, and about ten minutes.`,
    `מחזיקים בית חווה בצומת, והלילה שיירה של זרים עולה בשביל בלי אורות. יכולים להיות שכנים. יכולה להיות חוליית פשיטה. יש את החלון הגבוה, רובה אחד, וכעשר דקות.`],
 ch:[
  {l:['Cover the lane from the window','לכסות את השביל מהחלון'],s:['Two rounds ready, finger off the trigger.','שני כדורים מוכנים, האצבע מחוץ לדק.'],cost:{ammo:2},check:{stat:'wits',dc:8,armed:true},
   win:[`You keep the rifle in the window and your finger off the trigger. It is a family, six of them and a cart, and when they see the rifle they stop and hold up their empty hands. You lower it, and they come in.`,`מחזיקים את הרובה בחלון ואת האצבע מחוץ לדק. זו משפחה, שישה ועגלה, וכשהם רואים את הרובה הם עוצרים ומרימים ידיים ריקות. מורידים אותו, והם נכנסים.`,{humanity:4,morale:4,food:1}],
   lose:[`You keep the rifle in the window, and someone in the lane sees it first. A stone through the glass, an apology, and two rounds gone into the dark for no reason.`,`מחזיקים את הרובה בחלון, ומישהו בשביל רואה ראשון. אבן דרך הזכוכית, התנצלות, ושני כדורים שנעלמו בחושך בלי סיבה.`,{morale:-4,hp:-2}]},
  {l:['Meet them at the gate, unarmed','לפגוש אותם בשער, בלי נשק'],s:['A lamp, and open hands.','פנס, וידיים פתוחות.'],check:{stat:'charisma',dc:9},
   win:[`You go down with a lamp and open hands. They are a family, six of them and a cart. You share a stove, and the rifle stays where it is.`,`יורדים עם פנס וידיים פתוחות. זו משפחה, שישה ועגלה. חולקים תנור, והרובה נשאר במקומו.`,{humanity:5,morale:5}],
   lose:[`They are not a family. It is a short, ugly conversation, and you leave it with a split lip and half the pantry gone.`,`הם לא משפחה. זו שיחה קצרה ומכוערת, ויוצאים ממנה עם שפה שסועה וחצי מהמזווה חסר.`,{hp:-8,food:-3,morale:-5}]}
 ]});
