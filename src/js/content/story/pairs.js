
/* ===== EVERY PROFESSION IN EVERY COUNTRY =====
 * One chapter for each pair, in the middle of the road. The scene is written for that exact pair (a firefighter in Canada is
 * not a firefighter in Australia), and it uses the country's own characters. The two choices belong to the profession.
 * The doctor in Brazil and the doctor in Israel have their own hand-written chapters, in doctor.js.
 */
const PAIR_LABEL={
  student:['The Group Chat','קבוצת הצ׳אט'],teacher:['The Register','רשימת הנוכחות'],soldier:['The Order','הפקודה'],doctor:['The Oath','השבועה'],
  politician:['The Mandate','המנדט'],journalist:['The Record','התיעוד'],firefighter:['The Line','קו האש'],mechanic:['The Machine','המכונה']};
const PAIR_LOC_LABEL={
  usa:['The Long Road','הדרך הארוכה'],brazil:['Rooftops','הגגות'],uk:['The Cordon','הסגר'],japan:['The Rulebook','ספר החוקים'],
  canada:['The Long Winter','החורף הארוך'],israel:['The Shelter','המקלט'],australia:['The Red Road','הדרך האדומה']};
const PAIR_TITLE={
  student:['The Notice Board','לוח המודעות'],teacher:['The Empty Desk','השולחן הריק'],soldier:['The Checkpoint','העמדה'],doctor:['The Shortage','המחסור'],
  politician:['The Meeting','האסיפה'],journalist:['The Witness','העד'],firefighter:['The Smoke','העשן'],mechanic:['The Broken Thing','הדבר השבור']};

const PAIR_SCENE={
 'student/usa':[`The community college has become an annex of the stadium camp, and the registrar's office keeps the only list. A hand-lettered sign says students may use the library generators, if they sign in.`,`המכללה הקהילתית הפכה לנספח של מחנה האצטדיון, ובמשרד הרישום הרשימה היחידה. שלט בכתב יד אומר שסטודנטים רשאים להשתמש בגנרטורים של הספרייה, אם נרשמים.`],
 'student/brazil':[`On the Net, a rooftop school has started: a teacher with no school and thirty children on a water tank. She looks at your notebook and asks whether anyone here can be trusted with arithmetic.`,`ברשת התחיל בית ספר על גג: מורה בלי בית ספר ושלושים ילדים על מיכל מים. היא מסתכלת על המחברת ושואלת אם אפשר לסמוך על מישהו כאן בחשבון.`],
 'student/uk':[`The university halls of residence are behind the cordon, and the porter is still handing out keys, very formally, to rooms that belong to people who will not be back.`,`מעונות הסטודנטים נמצאים מאחורי הסגר, והשוער עדיין מחלק מפתחות, בפורמליות מלאה, לחדרים של אנשים שלא יחזרו.`],
 'student/japan':[`The campus is now an evacuation center, and the student council has drawn up rules of its own. Clause three says: students may not be idle.`,`הקמפוס הוא עכשיו מרכז פינוי, ומועצת הסטודנטים ניסחה חוקים משלה. בסעיף שלוש כתוב: סטודנטים לא יהיו בטלים.`],
 'student/canada':[`The dorm's boiler is the only heat for six blocks, and the residence assistant has put every student on a rota. The nights are yours.`,`הדוד של המעונות הוא החימום היחיד לשישה בלוקים, ועוזר הדיירים שם כל סטודנט בתורנות. הלילות שלך.`],
 'student/israel':[`The university shelter has a lecture hall for a bedroom, and the whiteboard behind the lectern has become a list of who needs what. Nobody has been asked to keep it.`,`במקלט האוניברסיטה יש אולם הרצאות במקום חדר שינה, והלוח הלבן מאחורי הדוכן הפך לרשימה של מי צריך מה. איש לא התבקש לנהל אותה.`],
 'student/australia':[`The university is on holiday, and the empty lecture halls still have the air conditioning running. Somebody has to decide who gets to sleep in the cool.`,`האוניברסיטה בחופשה, ובאולמות ההרצאות הריקים המזגן עדיין פועל. מישהו צריך להחליט מי ישן בקור.`],
 'teacher/usa':[`A former high school gym is the shelter, and the principal's whistle still hangs on a nail. Forty children, three adults, and a woman from the far wall who says she used to teach.`,`אולם ספורט של בית ספר תיכון הוא המקלט, והשריקה של המנהל עדיין תלויה על מסמר. ארבעים ילדים, שלושה מבוגרים, ואישה מהקיר הרחוק שאומרת שהייתה פעם מורה.`],
 'teacher/brazil':[`On the roofs the children of a dozen buildings are gathered under a tarpaulin, and a girl of ten has started teaching the younger ones the alphabet from memory.`,`על הגגות ילדי תריסר בניינים מתקבצים מתחת ליריעה, וילדה בת עשר התחילה ללמד את הקטנים את האלפבית בעל פה.`],
 'teacher/uk':[`The village school has been made into the parish office, and the register is still on the desk, open at the last day of term.`,`בית הספר של הכפר הפך למשרד הקהילה, והרשימה עדיין על השולחן, פתוחה ביום האחרון של הסמסטר.`],
 'teacher/japan':[`The evacuation center's children sit in rows without being asked. There is no teacher among the adults. Fukuda-san has asked, very politely, whether someone might be one.`,`ילדי מרכז הפינוי יושבים בשורות בלי שביקשו. אין מורה בין המבוגרים. פוקודה שאל, בנימוס רב, אם מישהו יכול להיות אחד.`],
 'teacher/canada':[`The logging camp has fourteen children, four books, and a cold classroom heated by one wood stove. The schoolbooks are in French. Nobody speaks it.`,`במחנה כריתת העצים ארבעה עשר ילדים, ארבעה ספרים וכיתה קרה שמחממת תנור עצים אחד. ספרי הלימוד בצרפתית. איש לא מדבר אותה.`],
 'teacher/israel':[`The building's shelter has become a school by default: eleven children, a wall of blank paper, and Mrs. Levi's insistence that lessons begin at eight.`,`המקלט של הבניין הפך לבית ספר בברירת מחדל: אחד עשר ילדים, קיר של נייר ריק, ועמדתה של גב׳ לוי ששיעורים מתחילים בשמונה.`],
 'teacher/australia':[`The School of the Air is a radio, and the radio is still on. A child at a distant station is calling for the lesson, and nobody has answered in nine days.`,`בית הספר של האוויר הוא רדיו, והרדיו עדיין דולק. ילד בתחנה רחוקה קורא לשיעור, ואיש לא ענה כבר תשעה ימים.`],
 'soldier/usa':[`The National Guard truck at the overpass has a bullet-holed windshield and a radio that only hisses. A lieutenant looks at your bearing and hands you the keys without a word.`,`משאית המשמר הלאומי ליד הגשר עם שמשה מחוררת ורדיו שרק לוחש. סגן מסתכל על היציבה ומוסר את המפתחות בלי מילה.`],
 'soldier/brazil':[`The police at the edge of the Net are twelve people who no longer wear uniforms. They have a rifle each, and a question: are you with them, or with the roofs?`,`השוטרים בקצה הרשת הם שנים עשר אנשים שכבר לא לובשים מדים. לכל אחד רובה, ולכולם שאלה: האם אתם איתנו, או עם הגגות?`],
 'soldier/uk':[`The cordon's soldiers are half your age and twice as tired. Their sergeant, who has not slept in two days, asks whether you have any experience with people who do not want to leave.`,`חיילי הסגר צעירים בחצי מהגיל ועייפים פי שניים. הסמל שלהם, שלא ישן יומיים, שואל אם יש ניסיון עם אנשים שלא רוצים לעזוב.`],
 'soldier/japan':[`The self-defense unit at the evacuation center is nine people with clipboards. Their commander bows deeply and asks for advice on a subject nobody trained him for.`,`יחידת ההגנה במרכז הפינוי היא תשעה אנשים עם לוחות כתיבה. המפקד משתחווה עמוק ומבקש עצה בנושא שאיש לא הכשיר אותו אליו.`],
 'soldier/canada':[`The border patrol has lost its supply line, and a sergeant with a frozen beard asks whether the army can spare a hand for a fence that keeps getting longer.`,`פטרול הגבול איבד את קו האספקה, וסמל עם זקן קפוא שואל אם הצבא יכול לפנות יד לגדר שממשיכה להתארך.`],
 'soldier/israel':[`The reserve unit has assembled in the school yard, and the unit's cook is the only one with a plan. He is also the only one who has brought his own pot.`,`יחידת המילואים התכנסה בחצר בית הספר, והטבח של היחידה היחיד עם תוכנית. הוא גם היחיד שהביא סיר משלו.`],
 'soldier/australia':[`The army barracks in the outback town has a fuel dump and a locked gate. The corporal says the gate opens for someone who can give an order and mean it.`,`בבסיס הצבא של עיירת הפנים יש מחסן דלק ושער נעול. הרב״ט אומר שהשער נפתח למי שיכול לתת פקודה ולהתכוון אליה.`],
 'doctor/usa':[`The urgent-care center's parking lot is full of tents, and the last pharmacist in three counties refuses to open the store without armed men on the roof.`,`חניון מרכז הטיפול הדחוף מלא אוהלים, והרוקח האחרון בשלושה מחוזות מסרב לפתוח את החנות בלי אנשים חמושים על הגג.`],
 'doctor/uk':[`The village surgery has a waiting room of eleven, a locked dispensary, and a practice nurse who insists on filling in the forms.`,`במרפאת הכפר חדר המתנה של אחד עשר, בית מרקחת נעול, ואחות שעומדת על כך שממלאים את הטפסים.`],
 'doctor/japan':[`The evacuation center's medical corner is a folding table and a very organized nurse. She has been rationing antibiotics by the hour, and she is asking for a second opinion on the schedule.`,`פינת הרפואה של מרכז הפינוי היא שולחן מתקפל ואחות מאורגנת מאוד. היא מקצבת אנטיביוטיקה לפי שעה, ומבקשת חוות דעת שנייה על הלוח.`],
 'doctor/canada':[`The nursing station is nine hundred kilometers from a hospital. A note on the door says the doctor is on a plane, and the plane has not landed.`,`תחנת הסיעוד נמצאת תשע מאות קילומטר מבית חולים. פתק על הדלת אומר שהרופא במטוס, והמטוס לא נחת.`],
 'doctor/australia':[`The flying doctor's radio is on, and the town has forgotten it exists. On the third call a voice asks for a physician, any physician, from a station two hundred kilometers away.`,`הרדיו של הרופא המעופף דולק, והעיירה שכחה שהוא קיים. בקריאה השלישית קול מבקש רופא, כל רופא, מתחנה במרחק מאתיים קילומטר.`],
 'politician/usa':[`The county's emergency operations center has forty cots and no one to sign the orders. The sheriff, who does not like politicians, hands over a pen.`,`במרכז החירום של המחוז ארבעים מיטות ואיש לא חותם על הפקודות. השריף, שלא אוהב פוליטיקאים, מוסר עט.`],
 'politician/brazil':[`The Net has no leader, and it likes it that way. A committee of six meets on a water tank, and they need a spokesperson for the meeting with Osvaldo.`,`לרשת אין מנהיג, והיא אוהבת את זה. ועדה של שישה נפגשת על מיכל מים, והם צריכים דובר לפגישה עם אוסוולדו.`],
 'politician/uk':[`The parish council is sitting in the church, and its chair has just resigned by leaving the room. They need someone who can run a meeting in a language people still trust.`,`מועצת הקהילה יושבת בכנסייה, ויו״ר המועצה הרגע התפטר בכך שיצא מהחדר. הם צריכים מישהו שיודע לנהל אסיפה בשפה שעדיין סומכים עליה.`],
 'politician/japan':[`The evacuation center's committee meets every evening, with minutes. They would like an opinion on a matter of precedent, and they are all very polite.`,`ועד מרכז הפינוי נפגש כל ערב, עם פרוטוקול. הם רוצים חוות דעת בעניין תקדים, וכולם מנומסים מאוד.`],
 'politician/canada':[`The town hall meeting has been going for five hours, and the mayor is asleep. A man in a wool cap stands up and asks whether anybody here knows how to run a meeting.`,`האסיפה בבית העירייה נמשכת חמש שעות, וראש העיר ישן. אדם בכובע צמר קם ושואל אם מישהו כאן יודע לנהל אסיפה.`],
 'politician/israel':[`The building committee has forty people and one opinion each. Mrs. Levi, who chairs it, says without any warmth that she needs a successor.`,`בוועד הבית ארבעים איש ולכל אחד דעה אחת. גב׳ לוי, היו״ר, אומרת בלי שום חום שהיא צריכה יורש.`],
 'politician/australia':[`The shire has no council any more, and the shire president has gone north. The town has a fund of forty dollars in coins, and a very long list of demands.`,`למועצה האזורית אין מועצה יותר, וראש המועצה הלך צפונה. לעיירה קרן של ארבעים דולר במטבעות, ורשימת דרישות ארוכה מאוד.`],
 'journalist/usa':[`The last radio station in the county has a working transmitter and a program director who wants to know whether a news bulletin can be put together by six.`,`תחנת הרדיו האחרונה במחוז יש בה משדר שעובד ומנהל תוכניות שרוצה לדעת אם אפשר להרכיב מהדורת חדשות עד שש.`],
 'journalist/brazil':[`The rooftop radio of the Net is Renata's. She has never had a reporter, and she has just decided that she needs one.`,`הרדיו על הגג של הרשת שייך לרנטה. אף פעם לא היה לה כתב, והיא הרגע החליטה שהיא צריכה אחד.`],
 'journalist/uk':[`The cordon has its own newspaper, one page long, and every line of it is approved. A clerk hands over a pencil and offers a job, and a badge.`,`לסגר יש עיתון משלו, עמוד אחד, וכל שורה בו מאושרת. פקיד מוסר עיפרון ומציע עבודה, ותג.`],
 'journalist/japan':[`The evacuation center's bulletin board is a work of art, and every notice on it has been approved. An old man asks quietly whether someone could write a thing the committee has not read.`,`לוח המודעות של מרכז הפינוי הוא יצירת אמנות, וכל מודעה בו אושרה. זקן שואל בשקט אם מישהו יכול לכתוב משהו שהוועד לא קרא.`],
 'journalist/canada':[`The town's weekly paper has lost its printer, and its editor has lost interest. She hands over the keys to the office and a stack of blank paper.`,`השבועון של העיירה איבד את המדפיס, והעורכת איבדה עניין. היא מוסרת את מפתחות המשרד וערימה של נייר ריק.`],
 'journalist/israel':[`The neighborhood chat has three thousand messages a day, and half of them are wrong. Somebody has to sort the true from the loud.`,`בצ׳אט השכונתי שלושת אלפים הודעות ביום, וחצי מהן שגויות. מישהו צריך למיין את האמיתי מהרועש.`],
 'journalist/australia':[`The outback town's newspaper used to be printed on Thursdays, and it is Thursday. The old press is still warm, and there is a story on every doorstep.`,`עיתון עיירת הפנים היה מודפס בימי חמישי, וזה יום חמישי. המכבש הישן עדיין חם, ויש סיפור על כל מפתן.`],
 'firefighter/usa':[`A row of suburban houses is burning, one at a time, and nobody has seen the person who lights them. The volunteers have a hose, a hydrant, and a lot of anger.`,`שורה של בתי פרברים בוערת, אחד אחד, ואיש לא ראה את מי שמדליק אותם. למתנדבים יש צינור, ברז כיבוי, והרבה כעס.`],
 'firefighter/brazil':[`A fire on the Net spreads across five roofs in ten minutes, and there is no water. The only tool anybody has is a rope.`,`שריפה ברשת מתפשטת על חמישה גגות בעשר דקות, ואין מים. הכלי היחיד שיש לאנשים הוא חבל.`],
 'firefighter/uk':[`The hay barn at the edge of the village is burning, and the parish has a pump older than the church. The vicar is holding the hose.`,`אסם החציר בקצה הכפר בוער, ולקהילה משאבה ישנה מהכנסייה. הכומר מחזיק את הצינור.`],
 'firefighter/japan':[`The wooden houses near the harbor burn like paper, and the center's fire brigade practices every week. Nobody has practiced with the real thing.`,`בתי העץ ליד הנמל בוערים כמו נייר, וכבאי המרכז מתרגלים כל שבוע. איש לא התרגל עם הדבר האמיתי.`],
 'firefighter/canada':[`A forest fire is coming south, and the camp's chainsaws are the only tools that can cut a line. Grizz asks what the fire wants.`,`שריפת יער מתקדמת דרומה, ומסורי הגזע של המחנה הכלים היחידים שיכולים לחתוך קו. גריז שואל מה האש רוצה.`],
 'firefighter/israel':[`A fire in the building's parking garage has filled the stairwell with smoke, and the residents are on the wrong side of the door.`,`שריפה בחניון הבניין מילאה את חדר המדרגות בעשן, והדיירים בצד הלא נכון של הדלת.`],
 'firefighter/australia':[`The bushfire is a week away, and the whole shire is asking for a look at the wind, the fuel, and the road.`,`שריפת השיחים במרחק שבוע, וכל המועצה האזורית מבקשת מבט על הרוח, על הדלק ועל הדרך.`],
 'mechanic/usa':[`A stalled convoy of school buses blocks the ramp to the interstate, and the people inside are asking whether anyone here can make one of them run.`,`שיירה תקועה של אוטובוסי בית ספר חוסמת את הכניסה לכביש המהיר, והאנשים בפנים שואלים אם מישהו כאן יכול להניע אחד מהם.`],
 'mechanic/brazil':[`The Net's zip-line motor has burned out, and the only spare is in a garage two blocks away that the dead have made their own.`,`מנוע קו החבל של הרשת נשרף, והרזרבי היחיד במוסך במרחק שני בלוקים שהמתים עשו לשלהם.`],
 'mechanic/uk':[`Colin's bus has a seized engine, and Colin has a tin of sardines and a great deal of faith. He has been saying your name for a week.`,`באוטובוס של קולין המנוע תפוס, ולקולין קופסת סרדינים והרבה אמונה. הוא אומר את השם כבר שבוע.`],
 'mechanic/japan':[`The generator at the evacuation center is a hundred years of engineering, and it is failing in a very polite way. Fukuda-san has asked for a second opinion.`,`הגנרטור במרכז הפינוי הוא מאה שנים של הנדסה, והוא נכשל בדרך מנומסת מאוד. פוקודה ביקש חוות דעת שנייה.`],
 'mechanic/canada':[`The camp's snowmobile has thrown a chain, and the search party is forty kilometers out. The wrench is on the shelf. The hands are cold.`,`אופנוע השלג של המחנה השליך שרשרת, וצוות החיפוש במרחק ארבעים קילומטר. מפתח הברגים על המדף. הידיים קרות.`],
 'mechanic/israel':[`The building's shelter has a ventilation fan that has stopped, and the air is going bad. Dror says it is a bearing. He is very sure, and very wrong.`,`במאוורר של המקלט הפסיק הפעולה, והאוויר מתקלקל. דרור אומר שזה מסב. הוא בטוח מאוד, וטועה מאוד.`],
 'mechanic/australia':[`The station's windmill has sheared a rod, and the bore is a quarter of an hour from dry. Pete stands with his arms folded and says you are the mechanic.`,`טחנת הרוח של החווה שברה מוט, והבאר במרחק רבע שעה מיובש. פיט עומד בידיים שלובות ואומר שזה המכונאי.`]
};

/* the two choices belong to the profession; they read the same in every country */
const PAIR_CH={
 student:[
  {l:['Put your hands to work','להושיט יד ולעבוד'],s:['Sign the list and start.','לחתום על הרשימה ולהתחיל.'],check:{stat:'wits',dc:8},
   win:[`You put your name on the list and your hands to work. A few hours later someone else's problem is a small, solved thing, and you have a reputation nobody planned.`,`רושמים שם ברשימה ומתחילים לעבוד. כמה שעות אחר כך הבעיה של מישהו אחר היא דבר קטן ופתור, ויש מוניטין שאיש לא תכנן.`,{order:2,humanity:3,morale:3,flag:'pp_student_a'}],
   lose:[`You offer, and it turns out you are not quite what they needed. You go back to your corner looking slightly wiser.`,`מציעים, ומתברר שלא בדיוק זה מה שהם היו צריכים. חוזרים לפינה עם מבט חכם קצת יותר.`,{morale:-3}]},
  {l:['Keep your head down and watch','להוריד את הראש ולצפות'],s:['Learn who is in charge, and who is afraid.','ללמוד מי אחראי, ומי מפחד.'],check:{stat:'stealth',dc:8},
   win:[`You learn who is in charge, who is afraid, and where the food is kept. It is not glorious. It is very useful.`,`לומדים מי אחראי, מי מפחד, ואיפה האוכל. זה לא מפואר. זה מועיל מאוד.`,{food:2,morale:1,flag:'pp_student_b'}],
   lose:[`You watch, and the watching draws exactly the wrong attention.`,`צופים, והצפייה מושכת בדיוק את תשומת הלב הלא נכונה.`,{hp:-4,morale:-3}]}],
 teacher:[
  {l:['Teach whoever is willing','ללמד את מי שמוכן'],s:['One lesson, and a circle that grows.','שיעור אחד, ומעגל שגדל.'],check:{stat:'charisma',dc:8},
   win:[`A circle forms, and it grows. By evening you have a lesson, a rota, and a few children who have started to argue with the rules.`,`נוצר מעגל, והוא גדל. עד הערב יש שיעור, תורנות, וכמה ילדים שהתחילו להתווכח עם הכללים.`,{humanity:5,morale:4,order:1,flag:'pp_teacher_a'}],
   lose:[`Nobody sits, and the ones who do drift away. It is a reminder that a room has to be earned.`,`איש לא מתיישב, ומי שכן נסחף. זו תזכורת שחדר צריך להרוויח.`,{morale:-4}]},
  {l:['Look for their families','לחפש את המשפחות שלהם'],s:['A list, and a long walk.','רשימה, והליכה ארוכה.'],check:{stat:'stamina',dc:9},
   win:[`You walk three miles with a list, and find two mothers, one uncle, and a woman who says she has been waiting for exactly this.`,`הולכים שלושה מייל עם רשימה, ומוצאים שתי אמהות, דוד אחד, ואישה שאומרת שחיכתה בדיוק לזה.`,{humanity:6,hp:-4,morale:3,flag:'pp_teacher_b'}],
   lose:[`You find no one, and one door you do not open.`,`לא מוצאים איש, ודלת אחת שלא פותחים.`,{hp:-6,morale:-5,humanity:2}]}],
 soldier:[
  {l:['Take charge of security','לקחת אחריות על הביטחון'],s:['Watches, a perimeter, and four people in doorways.','משמרות, היקף, וארבעה אנשים בפתחים.'],check:{stat:'strength',dc:9,bg:{soldier:2}},
   win:[`You set watches, mark a perimeter, and teach four people to stand in a doorway. By nightfall the place feels like a place.`,`קובעים משמרות, מסמנים היקף, ומלמדים ארבעה אנשים לעמוד בפתח. עד רדת החשכה המקום מרגיש כמו מקום.`,{order:4,morale:3,humanity:1,flag:'pp_soldier_a'}],
   lose:[`You give the orders, and they are followed, slowly, with small resentful pauses. It is a start.`,`נותנים פקודות, והן מבוצעות, לאט, עם הפסקות קטנות ומרירות. זו התחלה.`,{order:1,morale:-3}]},
  {l:['Keep a low profile, and the rifle','לשמור על פרופיל נמוך, ועל הרובה'],s:['Watch the exits from the second row.','לצפות ביציאות מהשורה השנייה.'],check:{stat:'stealth',dc:8},
   win:[`You stay in the second row and watch the exits. Nobody notices, and that is the point.`,`נשארים בשורה השנייה ומסתכלים ביציאות. איש לא שם לב, וזו הנקודה.`,{ammo:1,morale:1,humanity:-1,flag:'pp_soldier_b'}],
   lose:[`You stay out of it, and someone notices anyway. A quiet, careful conversation follows.`,`נשארים מחוץ לזה, ומישהו שם לב בכל זאת. אחר כך שיחה שקטה וזהירה.`,{morale:-3,hp:-2}]}],
 doctor:[
  {l:['Treat whoever comes','לטפל בכל מי שבא'],s:['A folding table, and a long line.','שולחן מתקפל, ותור ארוך.'],check:{stat:'stamina',dc:9,bg:{doctor:2}},
   win:[`You work through the afternoon on a folding table and a great deal of boiled water. When the line is gone you have a name in the ledger and a room that trusts you.`,`עובדים כל אחר הצהריים על שולחן מתקפל והרבה מים רתוחים. כשהתור נגמר יש שם בפנקס וחדר שסומך עליך.`,{humanity:5,order:2,meds:-1,morale:3,flag:'pp_doctor_a'}],
   lose:[`The line is longer than you hoped. You do what you can, and go to bed without a plan for the morning.`,`התור ארוך ממה שקיוו. עושים מה שאפשר, והולכים לישון בלי תוכנית לבוקר.`,{hp:-5,meds:-1,morale:-3}]},
  {l:['Secure the supplies first','להבטיח את האספקה קודם'],s:['Count the shelves. Lock the door.','לספור את המדפים. לנעול את הדלת.'],check:{stat:'wits',dc:8},
   win:[`You count the shelves, lock the door, and write a rota. It takes an hour and saves a week.`,`סופרים את המדפים, נועלים את הדלת, וכותבים תורנות. זה לוקח שעה וחוסך שבוע.`,{meds:2,order:3,humanity:-1,morale:2,flag:'pp_doctor_b'}],
   lose:[`You count the shelves, and the count is short. Someone has been here first, and you are not sure who.`,`סופרים את המדפים, והספירה חסרה. מישהו היה כאן קודם, ולא בטוח מי.`,{morale:-4,order:-1}]}],
 politician:[
  {l:['Chair the meeting yourself','לנהל את האסיפה בעצמך'],s:['Three sentences to open, a vote to close.','שלושה משפטים לפתיחה, הצבעה לסיום.'],check:{stat:'charisma',dc:9,bg:{politician:2}},
   win:[`You open with three sentences and close with a vote. It is not glamorous. It is a decision, and it has a name on it.`,`פותחים בשלושה משפטים וסוגרים בהצבעה. זה לא זוהר. זו החלטה, ויש עליה שם.`,{order:4,humanity:2,morale:3,flag:'pp_politician_a'}],
   lose:[`The meeting takes the shape you were afraid of: a debate about the debate. You call a recess, and it is a very long one.`,`האסיפה מקבלת את הצורה שחששו ממנה: ויכוח על הוויכוח. מכריזים הפסקה, והיא ארוכה מאוד.`,{order:-1,morale:-4}]},
  {l:['Work the back channels','לעבוד דרך ערוצים אחוריים'],s:['Kitchens, tea, and quiet agreements.','מטבחים, תה, והסכמות שקטות.'],check:{stat:'wits',dc:8},
   win:[`By the time the meeting starts, the decisions have been made, in kitchens, over tea. You sit at the head of the table and everyone is already in agreement.`,`עד שהאסיפה מתחילה ההחלטות כבר התקבלו, במטבחים, על תה. מתיישבים בראש השולחן וכולם כבר מסכימים.`,{order:3,humanity:-2,morale:2,flag:'pp_politician_b'}],
   lose:[`The back channels are full of other people's back channels. You end up owing three favors.`,`הערוצים האחוריים מלאים בערוצים אחוריים של אחרים. מסיימים בחוב של שלוש טובות.`,{morale:-4,humanity:-1}]}],
 journalist:[
  {l:['Write what you see','לכתוב את מה שרואים'],s:['Three hundred words, no adjectives.','שלוש מאות מילים, בלי תארים.'],check:{stat:'wits',dc:8,bg:{journalist:2}},
   win:[`Three hundred words, no adjectives. It is pinned to a wall by nightfall, and by morning there is a queue of people who want to add a line.`,`שלוש מאות מילים, בלי תארים. זה תלוי על קיר עד רדת החשכה, ועד הבוקר יש תור של אנשים שרוצים להוסיף שורה.`,{humanity:3,order:2,morale:3,flag:'pp_journalist_a'}],
   lose:[`You write it, and it is accurate and hard to read. The wall is a dark place for news.`,`כותבים, וזה מדויק וקשה לקריאה. הקיר הוא מקום חשוך לחדשות.`,{morale:-3}]},
  {l:['Ask the question nobody asks','לשאול את השאלה שאף אחד לא שואל'],s:['The plainest words you have.','המילים הפשוטות ביותר שיש.'],check:{stat:'charisma',dc:9},
   win:[`You ask, in the plainest possible words. There is a silence, and then an answer, and then another. The place has just learned something about itself.`,`שואלים, במילים הפשוטות ביותר. יש שקט, ואז תשובה, ואז עוד אחת. המקום הרגע למד משהו על עצמו.`,{humanity:4,order:1,morale:2,flag:'pp_journalist_b'}],
   lose:[`You ask, and the room decides you are the problem. It is a long walk back to your corner.`,`שואלים, והחדר מחליט שאתם הבעיה. ההליכה חזרה לפינה ארוכה.`,{morale:-5,hp:-2}]}],
 firefighter:[
  {l:['Go to the heart of it','להיכנס ללב האש'],s:['Low, wet, and one lungful.','נמוך, רטוב, ונשימה אחת.'],check:{stat:'strength',dc:9,bg:{firefighter:2}},
   win:[`You go in first, low and wet, with a hood and one lungful. You come out with a child, a dog and a burned sleeve, and the fire looks smaller than it did.`,`נכנסים ראשונים, נמוך ורטוב, עם ברדס ונשימה אחת. יוצאים עם ילד, כלב ושרוול שרוף, והאש נראית קטנה ממה שהייתה.`,{humanity:6,hp:-6,morale:4,flag:'pp_firefighter_a'}],
   lose:[`You go in, and the heat is a wall. You come out with less than you meant to bring and the sound of the roof behind you.`,`נכנסים, והחום הוא קיר. יוצאים עם פחות ממה שהתכוונו להביא ועם הקול של הגג מאחור.`,{hp:-10,morale:-5}]},
  {l:['Train the locals to hold the line','להכשיר את המקומיים להחזיק את הקו'],s:['Pass a bucket. Read the wind.','להעביר דלי. לקרוא את הרוח.'],check:{stat:'charisma',dc:8},
   win:[`You teach a dozen people to pass a bucket and read the wind. When the next fire comes, it is smaller, because someone remembered.`,`מלמדים תריסר אנשים להעביר דלי ולקרוא את הרוח. כשהאש הבאה מגיעה היא קטנה יותר, כי מישהו זכר.`,{order:4,humanity:3,morale:4,flag:'pp_firefighter_b'}],
   lose:[`The training is sound and the audience is tired. You do it three times, and only the third is remembered.`,`ההכשרה טובה והקהל עייף. עושים אותה שלוש פעמים, ורק השלישית נזכרת.`,{morale:-3}]}],
 mechanic:[
  {l:['Fix what the place needs most','לתקן את מה שהמקום צריך יותר מכול'],s:['A night with a torch in your teeth.','לילה עם פנס בין השיניים.'],check:{stat:'wits',dc:9,bg:{mechanic:2}},
   win:[`You spend a night with a torch in your teeth and come out with a thing that works. It is a small miracle held together with a hose clamp.`,`מבלים לילה עם פנס בין השיניים ויוצאים עם דבר שעובד. זה נס קטן שמחזיק בזכות מהדק צינור.`,{order:3,morale:5,humanity:2,water:1,flag:'pp_mechanic_a'}],
   lose:[`You fix one thing and break another. It is the kind of night that ends with a list on a napkin.`,`מתקנים דבר אחד ושוברים אחר. זה סוג הלילה שנגמר ברשימה על מפית.`,{hp:-4,morale:-4}]},
  {l:['Build something to defend it','לבנות משהו כדי להגן עליו'],s:['A fence, a bus door, and a very large spring.','גדר, דלת אוטובוס, וקפיץ גדול מאוד.'],check:{stat:'strength',dc:9},
   win:[`A barrier from a fence, a bus door and a very large spring. It is ugly and it works, and by morning the place has a gate.`,`מחסום מגדר, דלת אוטובוס וקפיץ גדול מאוד. הוא מכוער והוא עובד, ועד הבוקר יש למקום שער.`,{order:4,morale:3,humanity:-1,flag:'pp_mechanic_b'}],
   lose:[`The barrier is ugly and it does not work. You take it apart before anyone notices, and tell no one why.`,`המחסום מכוער והוא לא עובד. מפרקים אותו לפני שמישהו שם לב, ולא אומרים לאיש למה.`,{morale:-3,hp:-3}]}]
};

Object.keys(PAIR_SCENE).forEach(key=>{
  const [bg,loc]=key.split('/');
  chapter({id:'pair_'+bg+'_'+loc,arc:'pair:'+bg+':'+loc,n:1,at:.45,
    label:[PAIR_LABEL[bg][0]+' \u00b7 '+PAIR_LOC_LABEL[loc][0],PAIR_LABEL[bg][1]+' \u00b7 '+PAIR_LOC_LABEL[loc][1]],
    t:PAIR_TITLE[bg],x:PAIR_SCENE[key],
    ch:PAIR_CH[bg].map(c=>({l:c.l,s:c.s,check:Object.assign({},c.check),win:[c.win[0],c.win[1],Object.assign({},c.win[2])],lose:[c.lose[0],c.lose[1],Object.assign({},c.lose[2])]}))});
});
