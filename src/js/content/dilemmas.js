
/* ---------- dilemmas: a choice with a price, not a roll ----------
 * Both options are certain. Nothing is left to chance, so nothing hides behind a percentage: the cost is in the words.
 * What you choose is remembered. Sometimes it shifts the odds of later rolls (FLAG_MODS in engine/game.js),
 * and sometimes a follow-up arrives many turns later with something you did not know when you chose.
 */
ROLES.Shani='scout';ROLES.Tomer='fighter';
const dil=o=>defEv(Object.assign({dil:true,once:true},o));

/* ===== 1. the boot of a car: a rifle, or water ===== */
dil({id:'dil_cache',cond:()=>G.w.day>=T(3),w:45,
 t:['The Boot of the Car','תא המטען'],
 x:[`In the boot of a burned-out sedan, under a child's blanket, you find two things and room for only one in your pack: a hunting rifle with six rounds, or a crate of bottled water with a hand-written label: FOR THE BLOCK.`,
    `בתא המטען של סדאן שרוף, מתחת לשמיכת ילדים, שני דברים ורק מקום לאחד בתיק: רובה ציד עם שישה כדורים, או ארגז מים בבקבוקים עם תווית בכתב יד: לבלוק.`],
 ch:[
  {l:['Take the rifle','לקחת את הרובה'],s:['Six rounds, and everyone will see it.','שישה כדורים, וכולם יראו אותו.'],
   out:[`The rifle is heavier than it looks, and warmer than you expected. You leave the water where it is, and you do not look at the label.`,`הרובה כבד ממה שנראה, וחם ממה שציפית. השארת את המים במקומם, ולא הסתכלת בתווית.`,{ammo:3,morale:2,humanity:-2,flag:'dil_armed'}]},
  {l:['Take the water','לקחת את המים'],s:['Days of drink, and nothing to defend it.','ימים של שתייה, ושום דבר להגן בו.'],
   out:[`You carry the crate on your shoulder, and by evening it is a small, cold, clear reason to keep going. The rifle stays in the boot, with the blanket.`,`נשאת את הארגז על הכתף, ועד הערב הוא סיבה קטנה, קרה וצלולה להמשיך. הרובה נשאר בתא המטען, עם השמיכה.`,{water:5,morale:3,humanity:1,flag:'dil_hydrated'}]}
 ]});
defEv({id:'echo_dil_armed',cond:()=>since('dil_armed',6),w:40,
 t:['The Barricade','המחסום'],
 x:[`A family of five has built a barricade of sofas across a road, and on the far side a woman holds a garden fork. She sees the rifle on your back before she sees your face. Nobody says anything for a while. The children are watching.`,
    `משפחה של חמישה בנתה מחסום מספות על פני כביש, ובצדו השני אישה מחזיקה קילשון גינה. היא רואה את הרובה על הגב לפני שהיא רואה את הפנים. איש לא אומר דבר זמן מה. הילדים צופים.`],
 ch:[
  {l:['Put the rifle down and talk','להניח את הרובה ולדבר'],s:['Lay it in the road, and step back.','להניח אותו בכביש ולסגת.'],check:{stat:'charisma',dc:9},
   win:[`You lay it in the road and step back. She lowers the fork. By the end of the hour you have shared a stove, a map, and the name of a place you did not know.`,`מניחים אותו בכביש וסוגרים צעד אחורה. היא מורידה את הקילשון. עד סוף השעה חלקתם תנור, מפה, ושם של מקום שלא הכרת.`,{food:2,humanity:4,morale:4,flag:'map'}],
   lose:[`She does not lower the fork. You pick the rifle up again, slowly, and the way back is very long.`,`היא לא מורידה את הקילשון. הרמת את הרובה שוב, לאט, והדרך חזרה ארוכה מאוד.`,{morale:-5,humanity:-1}]},
  {l:['Keep it slung and push through','להשאיר אותו על הכתף ולעבור'],s:['A rifle is for exactly this.','רובה נועד בדיוק לזה.'],check:{stat:'strength',dc:9},
   win:[`You walk straight at the sofas with the rifle across your chest, and they let you through, because that is what the rifle is for. Behind you a child starts to cry.`,`הולכים ישר אל הספות עם הרובה על החזה, והם מאפשרים לעבור, כי לזה הרובה נועד. מאחור ילד מתחיל לבכות.`,{order:-1,humanity:-4,morale:-2}],
   lose:[`Somebody fires first, and it is not a warning. You come out the other side with a graze and a lesson.`,`מישהו יורה ראשון, וזו לא אזהרה. יצאת מהצד השני עם שריטה ולקח.`,{hp:-8,ammo:-1,morale:-4}]}
 ]});
dil({id:'echo_dil_hydrated',cond:()=>since('dil_hydrated',6),w:40,
 t:['The Dry Well','הבאר היבשה'],
 x:[`A village well has gone dry, and beside it a woman sits with a boy who is beginning to go quiet. You have four bottles left in your pack, and everyone in the village knows it, because the clink carries.`,
    `באר בכפר התייבשה, ולצידה יושבת אישה עם ילד שמתחיל להשתתק. נשארו ארבעה בקבוקים בתיק, וכולם בכפר יודעים, כי הצליל נישא.`],
 ch:[
  {l:['Give them half','לתת להם חצי'],s:['Water is time.','מים הם זמן.'],
   out:[`You hand over two bottles. The boy drinks with both hands, and the woman watches you like a person deciding whether to be grateful or afraid.`,`מוסרים שני בקבוקים. הילד שותה בשתי ידיים, והאישה מסתכלת כמי שמחליטה אם להיות אסירת תודה או מפוחדת.`,{water:-2,humanity:6,morale:3,flag:'dil_shared_water'}]},
  {l:['Keep it, and walk on','לשמור ולהמשיך ללכת'],s:['You cannot carry everyone\'s thirst.','אי אפשר לשאת את הצמא של כולם.'],
   out:[`You walk on, and the clink follows you out of the village for a long time. It is very quiet afterwards.`,`ממשיכים ללכת, והצליל מלווה אותך אל מחוץ לכפר זמן רב. אחר כך שקט מאוד.`,{morale:-5,humanity:-6,flag:'dil_kept_water'}]}
 ]});

/* ===== 2. two people at a door: you can save only one, and you do not know who they are to each other ===== */
dil({id:'dil_two',cond:()=>G.w.day>=T(4),w:45,
 t:['The Back Window','החלון האחורי'],
 x:[`A small shop, a steel door, and behind it a crowd that has found the noise of the shop. Two people are holding the door with their shoulders: Tomer, a broad man in a work vest, and Shani, a young woman with a split lip. The back window is open, and it will take one person, quickly. They are both looking at you.`,
    `חנות קטנה, דלת פלדה, ומאחוריה המון שמצא את הרעש של החנות. שניים מחזיקים את הדלת בכתפיים: תומר, גבר רחב במעיל עבודה, ושני, צעירה עם שפה שסועה. החלון האחורי פתוח, והוא יקבל אדם אחד, מהר. שניהם מסתכלים עליך.`],
 ch:[
  {l:['Pull Shani through the window','למשוך את שני דרך החלון'],s:['She is younger, and she is screaming.','היא צעירה יותר, והיא צורחת.'],
   out:[`She comes through in one movement, sobbing, and you both hear the door go. You do not hear what Tomer says. You run, and she runs with you, and after two streets she stops screaming.`,`היא עוברת בתנועה אחת, בוכה, ושניכם שומעים את הדלת נופלת. לא שומעים מה תומר אומר. רצים, והיא רצה איתך, ואחרי שני רחובות היא מפסיקה לצרוח.`,{join:{name:'Shani',trait:`Survivor from the shop`,role:'scout'},humanity:-3,morale:-4,flag:'dil_two_shani'}]},
  {l:['Pull Tomer through the window','למשוך את תומר דרך החלון'],s:['He is strong, and he is carrying a pack.','הוא חזק, והוא נושא תיק.'],
   out:[`He comes through heavy and quick, and you hear the door go before his boots touch the ground. Shani's voice, behind it, says one word, and it is not a name. You run.`,`הוא עובר כבד ומהיר, ושומעים את הדלת נופלת לפני שהמגפיים שלו נוגעים בקרקע. הקול של שני, מאחוריו, אומר מילה אחת, והיא לא שם. רצים.`,{join:{name:'Tomer',trait:`Survivor from the shop`,role:'fighter'},humanity:-3,morale:-4,flag:'dil_two_tomer'}]}
 ]});
defEv({id:'echo_dil_two',
 cond:()=>(since('dil_two_shani',6)&&!!inSquad('Shani'))||(since('dil_two_tomer',6)&&!!inSquad('Tomer')),w:40,
 t:['What She Never Said','מה שלא נאמר'],
 x:[()=>flag('dil_two_shani')
   ?`Shani has been quiet for days, and tonight she says it plainly: Tomer was her brother. She says she did not tell you because she did not want you to choose out of guilt, and that she has been wondering every night whether you would have chosen differently if you had known. She is not shouting. That is worse.`
   :`Tomer has been quiet for days, and tonight he says it plainly: Shani was his sister. He says he did not tell you because he did not want you to choose out of guilt, and that he has been wondering every night whether you would have chosen differently if you had known. He is not shouting. That is worse.`,
    ()=>flag('dil_two_shani')
   ?`שני שותקת כבר ימים, והלילה היא אומרת את זה בפשטות: תומר היה אחיה. היא אומרת שלא סיפרה כי לא רצתה שהבחירה תהיה מתוך אשמה, ושהיא שואלת את עצמה כל לילה אם הבחירה הייתה שונה אילו ידעו. היא לא צועקת. וזה גרוע יותר.`
   :`תומר שותק כבר ימים, והלילה הוא אומר את זה בפשטות: שני הייתה אחותו. הוא אומר שלא סיפר כי לא רצה שהבחירה תהיה מתוך אשמה, ושהוא שואל את עצמו כל לילה אם הבחירה הייתה שונה אילו ידעו. הוא לא צועק. וזה גרוע יותר.`],
 ch:[
  {l:['Tell the truth about why','לספר את האמת לגבי הסיבה'],s:['It was a second, and you would do it again.','זו הייתה שנייה, והיית עושה את זה שוב.'],check:{stat:'charisma',dc:9},
   win:[`You tell it: it was a second, you chose the one who was screaming, and you would do it again, and you are sorry anyway. The silence that follows is not forgiveness. It is honesty, and it is the start of something.`,`מספרים: זו הייתה שנייה, נבחר מי שצרח, והיית עושה את זה שוב, ומצטערים בכל זאת. השקט שאחר כך אינו סליחה. זו כנות, וזו התחלה של משהו.`,{humanity:3,morale:-2,loyAll:1}],
   lose:[`You tell it, and it comes out sounding like an excuse. It is the truth, and it is worse for being true. Nobody sleeps beside you that night.`,`מספרים, וזה נשמע כמו תירוץ. זו האמת, והיא גרועה יותר בגלל שהיא אמת. איש לא ישן לידך באותו לילה.`,{morale:-6,loyAll:-1}]},
  {l:['Say there was no choice','להגיד שלא הייתה ברירה'],s:['Kind, and not quite true.','טוב לב, ולא ממש נכון.'],check:{stat:'wits',dc:9},
   win:[`You say there was no choice, and it is nearly true, and it is nearly enough. A nod, a shrug, a very careful meal shared in a very careful quiet.`,`אומרים שלא הייתה ברירה, וזה כמעט נכון, וזה כמעט מספיק. הנהון, משיכת כתפיים, ארוחה זהירה מאוד בשקט זהיר מאוד.`,{morale:-3,humanity:-2}],
   lose:[`You say there was no choice, and it is a door painted on a wall. A long look, and one nod, and it is never spoken of again.`,`אומרים שלא הייתה ברירה, וזו דלת מצוירת על קיר. מבט ארוך, הנהון אחד, ולא מדברים על זה שוב.`,{morale:-6,humanity:-3,loyAll:-2}]}
 ]});

/* ===== 3. one dose ===== */
dil({id:'dil_dose',cond:()=>G.w.day>=T(5),w:45,
 t:['One Dose','מנה אחת'],
 x:[`A basement clinic, two cots, and in the first-aid box one sealed strip of antibiotics: a single dose. On one cot, a boy of about nine, burning with fever. On the other, an old man with a leather bag, who says calmly that he used to be the town's pharmacist, and that he would like to be remembered as someone who did not argue.`,
    `מרפאה במרתף, שתי מיטות, ובארגז העזרה הראשונה רצועת אנטיביוטיקה אטומה אחת: מנה בודדת. על מיטה אחת ילד בן תשע בערך, בוער מחום. על השנייה זקן עם תיק עור, שאומר בשקט שהיה פעם הרוקח של העיירה, ושהיה רוצה להיזכר כמי שלא התווכח.`],
 ch:[
  {l:['Give the dose to the boy','לתת את המנה לילד'],s:['A life with all of it ahead.','חיים שכולם עוד לפניהם.'],
   out:[`The boy's fever breaks by dawn. The old man says nothing, and you are the one who cannot look at him. By morning his bed is empty and neatly made.`,`החום של הילד נשבר עד עלות השחר. הזקן לא אומר דבר, ואתה זה שלא מסוגל להסתכל עליו. עד הבוקר המיטה שלו ריקה ומסודרת.`,{humanity:5,morale:2,flag:'dil_boy'}]},
  {l:['Give the dose to the old man','לתת את המנה לזקן'],s:['He knows what to do with the rest.','הוא יודע מה לעשות עם השאר.'],
   out:[`The old man takes it with a nod, and by noon he is sitting up, drawing a map on the back of a receipt: every shelf in the district that might still hold something. The boy is quieter than he was, and by evening he is quiet.`,`הזקן לוקח אותה בהנהון, ועד הצהריים הוא יושב וצייר מפה על גב קבלה: כל מדף במחוז שאולי עוד מחזיק משהו. הילד שקט יותר ממה שהיה, ועד הערב הוא שקט.`,{meds:1,humanity:-5,morale:-3,flag:['dil_pharmacist','map']}]}
 ]});
defEv({id:'echo_dil_boy',cond:()=>since('dil_boy',7),w:40,
 t:['The Mother on the Road','האם בדרך'],
 x:[`A woman finds you on the road with a bundle in her arms. She is the boy's mother, and she has walked three days to say thank you and to give you what she has. In the same breath she says that the old man was her father. She does not say it as an accusation. She says it as a fact she has not been able to put down.`,
    `אישה מוצאת אותך בדרך עם צרור בזרועות. היא אמו של הילד, והיא הלכה שלושה ימים כדי להודות ולתת מה שיש לה. באותה נשימה היא אומרת שהזקן היה אביה. היא לא אומרת את זה כהאשמה. היא אומרת את זה כעובדה שלא הצליחה להניח.`],
 ch:[
  {l:['Tell her what he said','לספר לה מה הוא אמר'],s:['He asked to be remembered as someone who did not argue.','הוא ביקש להיזכר כמי שלא התווכח.'],check:{stat:'charisma',dc:8},
   win:[`You tell her what he said, and what he did, and that he asked to be remembered as a man who did not argue. She weeps, and laughs, and gives you the bundle anyway.`,`מספרים לה מה אמר, ומה עשה, ושביקש להיזכר כמי שלא התווכח. היא בוכה, וצוחקת, ונותנת את הצרור בכל זאת.`,{food:3,humanity:4,morale:2}],
   lose:[`You tell her, and you tell it badly, and she stands very still. She takes the bundle back, and leaves, and does not turn.`,`מספרים לה, וזה יוצא רע, והיא עומדת דוממת. היא לוקחת את הצרור בחזרה, הולכת, ולא מסתובבת.`,{morale:-5,humanity:1}]},
  {l:['Say only that you are glad the boy is well','להגיד רק שטוב שהילד בסדר'],s:['It is not a lie, and it is not the whole truth.','זה לא שקר, וזו לא כל האמת.'],check:{stat:'wits',dc:8},
   win:[`It is not a lie. She looks at you a moment longer than she needs to, and lets it be, and leaves the food on a stone.`,`זה לא שקר. היא מסתכלת רגע ארוך יותר ממה שצריך, נותנת לזה להיות, ומשאירה את האוכל על אבן.`,{food:1,humanity:-2,morale:-2}],
   lose:[`She hears everything you have not said. She takes the bundle back, and thanks you very formally, and it is worse than a curse.`,`היא שומעת כל מה שלא נאמר. היא לוקחת את הצרור בחזרה, ומודה בפורמליות, וזה גרוע מקללה.`,{morale:-5,humanity:-3}]}
 ]});
defEv({id:'echo_dil_pharm',cond:()=>since('dil_pharmacist',7),w:40,
 t:['The Boy\'s Shoe','הנעל של הילד'],
 x:[`A man stops you on the road, out of breath, with a child's shoe in his hand. It is the boy from the clinic, and the shoe is all he has left. He has walked for days to find whoever gave the last dose to an old man instead of a child. He wants to hear you say why.`,
    `אדם עוצר אותך בדרך, בלי נשימה, עם נעל של ילד ביד. זה הילד מהמרפאה, והנעל היא כל מה שנשאר. הוא הלך ימים כדי למצוא את מי שנתן את המנה האחרונה לזקן ולא לילד. הוא רוצה לשמוע למה.`],
 ch:[
  {l:['Tell him the truth','לספר לו את האמת'],s:['A map, a pharmacist, the rest of the district.','מפה, רוקח, שאר המחוז.'],check:{stat:'charisma',dc:9},
   win:[`You tell him: a map, a pharmacist, the rest of the district. He listens with his jaw set, and then he sits down in the road and does not get up for a while. He does not forgive you. He does not hurt you either.`,`מספרים לו: מפה, רוקח, שאר המחוז. הוא מקשיב בלסת קפוצה, ואז יושב בכביש ולא קם זמן מה. הוא לא סולח. הוא גם לא פוגע.`,{humanity:2,morale:-4}],
   lose:[`You tell him, and he hears only the boy. His fist finds you before he finds the words, and then he sits down in the road and cannot stop shaking.`,`מספרים לו, והוא שומע רק את הילד. האגרוף שלו מוצא אותך לפני שהוא מוצא מילים, ואז הוא יושב בכביש ולא מפסיק לרעוד.`,{hp:-6,morale:-6,humanity:1}]},
  {l:['Give him what you carry','לתת לו את מה שנושאים'],s:['It is not payment. Both of you know it.','זה לא תשלום. שניכם יודעים.'],check:{stat:'stamina',dc:6},
   win:[`You give him a bottle and half your food, and it is not payment, and both of you know it. He takes it with his eyes on the ground, and walks away with the shoe still in his hand.`,`נותנים לו בקבוק וחצי מהאוכל, וזה לא תשלום, ושניכם יודעים. הוא לוקח אותו בעיניים בקרקע, והולך עם הנעל עדיין ביד.`,{food:-2,water:-1,humanity:3,morale:-2}],
   lose:[`He takes the bottle and the food, and he does not say thank you, and he does not say anything else. Whatever you wanted to buy, it was not for sale.`,`הוא לוקח את הבקבוק ואת האוכל, ולא אומר תודה, ולא אומר דבר אחר. מה שרצית לקנות, לא היה למכירה.`,{food:-3,water:-2,morale:-4}]}
 ]});

/* ===== 4. a promise to a dying man ===== */
dil({id:'dil_promise',cond:()=>G.w.day>=T(4),w:45,
 t:['The Envelope','המעטפה'],
 x:[`A man is dying against a wall, with a wound you cannot do anything about. He takes your wrist with a hand that is still strong and asks for one thing: that you take an envelope to his daughter, who lives in a town two days off your route. He does not ask you to be sure. He asks you to say yes.`,
    `אדם גוסס על קיר, עם פצע שאי אפשר לעשות לו כלום. הוא תופס את פרק היד ביד שעדיין חזקה ומבקש דבר אחד: להביא מעטפה לבתו, שגרה בעיירה במרחק יומיים מהמסלול. הוא לא מבקש להיות בטוח. הוא מבקש שיגידו כן.`],
 ch:[
  {l:['Promise','להבטיח'],s:['Say yes, and mean it.','להגיד כן, ולהתכוון.'],
   out:[`You say yes. His hand loosens, and he says the name of a town, and a street, and a color of door. You put the envelope inside your coat, against your chest, where it is warm.`,`אומרים כן. היד שלו נרפית, והוא אומר שם של עיירה, ורחוב, וצבע של דלת. שמים את המעטפה בתוך המעיל, על החזה, איפה שחם.`,{morale:3,humanity:2,flag:'dil_promise'}]},
  {l:['Say you cannot','להגיד שאי אפשר'],s:['Your own road is long enough.','לדרך שלך יש די אורך.'],
   out:[`You tell him the truth, and he closes his eyes, and it is not a reproach. You take the envelope anyway, to keep it from the wind, and you leave it on his chest.`,`אומרים לו את האמת, והוא עוצם עיניים, וזו לא האשמה. לוקחים את המעטפה בכל זאת, כדי שהרוח לא תיקח אותה, ומשאירים אותה על החזה שלו.`,{morale:-2,humanity:-1,flag:'dil_no_promise'}]}
 ]});
defEv({id:'echo_dil_promise',cond:()=>since('dil_promise',8),w:40,
 t:['The Town Sign','שלט העיירה'],
 x:[`On a bend of the road, a sign: the name of the town. It is a day out of your way, and the envelope is still against your chest, and you have thought about it every night since.`,
    `בעיקול של הדרך, שלט: שם העיירה. זה יום מחוץ למסלול, והמעטפה עדיין על החזה, וחושבים על זה כל לילה מאז.`],
 ch:[
  {l:['Go, and deliver it','ללכת ולמסור אותה'],s:['A day out of your way, and a blue door.','יום מחוץ למסלול, ודלת כחולה.'],check:{stat:'stamina',dc:9},
   win:[`The door is blue. A woman opens it, reads the first line, and sits down on her own step. She gives you all the bread she has, and you take it, because refusing would be an insult.`,`הדלת כחולה. אישה פותחת, קוראת את השורה הראשונה, ויושבת על המדרגה שלה. היא נותנת את כל הלחם שיש לה, ולוקחים, כי סירוב היה עלבון.`,{food:2,humanity:6,morale:6,flag:'dil_delivered'}],
   lose:[`The town is empty, and the door is blue and open. You leave the envelope on the table, weighted with a spoon, and walk away with an emptiness you cannot name.`,`העיירה ריקה, והדלת כחולה ופתוחה. משאירים את המעטפה על השולחן, מוחזקת בכף, והולכים עם ריקנות בלי שם.`,{hp:-4,morale:-4,humanity:2,flag:'dil_delivered'}]},
  {l:['Open it, and keep walking','לפתוח אותה ולהמשיך ללכת'],s:['Whatever is in it, it is yours to carry now.','מה שיש בה, עכשיו עליך לשאת.'],
   out:[`You open the envelope on the road. It is three lines, a lock of hair, and a map. You keep the map. You do not keep the hair.`,`פותחים את המעטפה בדרך. שלוש שורות, קווצת שיער ומפה. שומרים את המפה. את השיער לא.`,{humanity:-5,morale:-2,flag:['map','dil_opened']}]}
 ]});

/* ===== 5. a fire on a hill: be seen, or be safe ===== */
dil({id:'dil_fire',cond:()=>G.w.day>=T(3),w:45,
 t:['The Signal','האות'],
 x:[`From the hill above the town you can see three fires, far apart, and the dark between them. You have dry wood, a lighter with one good spark, and a choice that will not feel small in the morning: to be seen, or to be safe. Somebody down there is looking for a light.`,
    `מהגבעה מעל העיירה רואים שלוש מדורות רחוקות זו מזו, ואת החושך שביניהן. יש עצים יבשים, מצית עם ניצוץ טוב אחד, ובחירה שלא תרגיש קטנה בבוקר: להיראות, או להיות בטוחים. מישהו שם למטה מחפש אור.`],
 ch:[
  {l:['Light the fire','להדליק את המדורה'],s:['Someone is looking for you.','מישהו מחפש אתכם.'],
   out:[`The fire catches on the second spark, and it is beautiful and terrifying. You sit with your back to it and your eyes on the dark, and you do not sleep.`,`המדורה נתפסת בניצוץ השני, והיא יפה ומפחידה. יושבים עם הגב אליה והעיניים בחושך, ולא ישנים.`,{morale:4,humanity:2,order:1,flag:'dil_lit'}]},
  {l:['Keep the dark','לשמור על החושך'],s:['A light is an invitation.','אור הוא הזמנה.'],
   out:[`You eat cold food and listen to the hill. Nothing comes, and nothing goes past. In the morning you have slept, and you are alone, and you are not sure which of those is a comfort.`,`אוכלים אוכל קר ומקשיבים לגבעה. שום דבר לא בא, ושום דבר לא עובר. בבוקר ישנת, לבד, ולא בטוח מה מהשניים מנחם.`,{hp:4,morale:-2,humanity:-2,flag:'dil_dark'}]}
 ]});
defEv({id:'echo_dil_fire',cond:()=>since('dil_lit',5),w:40,
 t:['Answering Lights','אורות עונים'],
 x:[`Two nights after your fire, a light answers from the far ridge. It could be a family, or a patrol, or something worse. It blinks in a pattern: three long, two short.`,
    `שני לילות אחרי המדורה, אור עונה מהרכס הרחוק. יכולה להיות משפחה, או סיור, או משהו גרוע יותר. הוא מהבהב בדפוס: שלוש ארוכות, שתי קצרות.`],
 ch:[
  {l:['Answer the signal','לענות לאות'],s:['Three long, two short, back.','שלוש ארוכות, שתי קצרות, בחזרה.'],check:{stat:'wits',dc:9},
   win:[`You answer, and the light answers again. By morning there are two of them at your fire, a woman and a boy who have crossed the ridge in the dark, and they have bread.`,`עונים, והאור עונה שוב. עד הבוקר יש שניים ליד המדורה, אישה וילד שחצו את הרכס בחושך, ויש להם לחם.`,{food:2,humanity:4,morale:5}],
   lose:[`You answer, and something else answers too. It takes the whole night to make certain it is not coming, and by dawn you have burned your last dry wood.`,`עונים, ומשהו אחר עונה גם. לוקח את כל הלילה להיות בטוחים שהוא לא בא, ועם עלות השחר שרפת את העצים היבשים האחרונים.`,{hp:-4,morale:-4}]},
  {l:['Watch, and stay hidden','לצפות ולהישאר מוסתרים'],s:['Learn who they are before they learn you.','ללמוד מי הם לפני שהם לומדים אותך.'],check:{stat:'stealth',dc:9},
   win:[`You put the fire out and watch the far ridge. It is a family, five of them, and a dog, with a lantern and a cart. You leave them a sack of dry wood on the path, and never meet.`,`מכבים את המדורה וצופים ברכס הרחוק. זו משפחה, חמישה, וכלב, עם פנס ועגלה. משאירים להם שק עצים יבשים בשביל, ולא נפגשים.`,{humanity:3,morale:2,flag:'map'}],
   lose:[`You put the fire out, and it is already too late: the light on the ridge has moved, and it is coming down.`,`מכבים את המדורה, וכבר מאוחר מדי: האור ברכס זז, והוא יורד.`,{hp:-6,morale:-4}]}
 ]});
