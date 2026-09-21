
/* ===== UNITED STATES: "The Long Road" =====
 * The country is already coming apart. Dee Marsh drives a fuel tanker north to the lakes, where a radio says a station
 * takes people. Warden Hollis runs a toll gate on the interstate. Jonah is a boy who saw what the toll costs.
 */
const US={arc:'loc:usa',label:['The Long Road','הדרך הארוכה'],of:6,rich:true};

chapter(Object.assign({},US,{id:'us_1',n:1,at:.06,
 t:['The Rig','המשאית'],
 x:[`The on-ramp is a parking lot of dead cars, and in the middle of it a fuel tanker sits with its engine running. A woman named Dee Marsh leans on the cab with a shotgun across her arms. She is going north, to the lakes, where a radio says there is a station that takes people. She needs someone to watch the mirrors while she drives.`,
    `הכניסה לכביש המהיר היא חניון של מכוניות מתות, ובאמצעו עומדת מיכלית דלק עם מנוע פועל. אישה בשם די מרש נשענת על התא עם רובה ציד על הזרועות. היא נוסעת צפונה, אל האגמים, שם לפי הרדיו יש תחנה שמקבלת אנשים. היא צריכה מישהו שישגיח על המראות בזמן שהיא נוהגת.`],
 ch:[
  {l:['Ride with her, and watch the mirrors','לנסוע איתה ולהשגיח על המראות'],s:['Three hundred miles, one shotgun.','שלוש מאות מייל, רובה אחד.'],check:{stat:'charisma',dc:8},
   win:[`Dee looks you over, tosses you a thermos, and says the mirrors are yours. By nightfall you have covered sixty miles without a word, and it is the safest sixty miles you have known.`,`די מסתכלת מלמעלה למטה, זורקת תרמוס ואומרת שהמראות שלך. עד רדת החשכה נסעו שישים מייל בלי מילה, וזה הקטע הבטוח ביותר שהיה.`,{order:2,morale:5,flag:'us_rig'}],
   lose:[`Dee says she works alone. She says it kindly, and drives away, and the road behind her is very empty.`,`די אומרת שהיא עובדת לבד. היא אומרת את זה בטוב לב, ונוסעת, והכביש מאחוריה ריק מאוד.`,{morale:-4}]},
  {l:['Follow the tanker on foot','ללכת אחרי המיכלית ברגל'],s:['Someone always leaves things behind.','מישהו תמיד משאיר דברים מאחור.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`The tanker crawls, and you keep pace behind it, picking up what it drops: a can, a coat, half a loaf on the shoulder. Dee sees you in the mirror at dawn, and does not stop, and does not tell you to go.`,`המיכלית זוחלת, וצועדים אחריה, אוספים מה שהיא מפילה: פחית, מעיל, חצי כיכר בשוליים. די רואה במראה עם עלות השחר, ולא עוצרת, ולא אומרת ללכת.`,{food:2,morale:2,flag:'us_follow'}],
   lose:[`The tanker outpaces you by noon, and the road it leaves is full of company you did not want.`,`המיכלית מתרחקת עד הצהריים, והכביש שהיא משאירה מלא בחברה שלא רצית.`,{hp:-10,inf:6,morale:-4}]}
 ]}));

chapter(Object.assign({},US,{id:'us_2',n:2,at:.20,
 t:['The Toll','האגרה'],
 x:[()=>`Two miles of stopped traffic end in a gate made of shipping containers. A man in a sheriff's hat, Warden Hollis, has decided that the interstate is a county road and that everyone who uses it pays. The toll is fuel, ammunition, or a day's labor, and nobody has ever refused him twice. ${flag('us_rig')?'Dee has pulled the tanker over and turned off the engine, and looks at you.':'You are on the shoulder, in the queue with the rest.'}`,
    ()=>`שני מייל של תנועה עומדת נגמרים בשער בנוי ממכולות. אדם בכובע שריף, הסוהר הוליס, החליט שהכביש המהיר הוא דרך של המחוז ושכל מי שעובר בו משלם. האגרה היא דלק, תחמושת או יום עבודה, ואיש לא סירב לו פעמיים. ${flag('us_rig')?'די עצרה את המיכלית וכיבתה את המנוע, ומסתכלת עליך.':'נמצאים בשוליים, בתור עם כולם.'}`],
 ch:[
  {l:['Pay the toll','לשלם את האגרה'],s:['A day of work, or what you carry.','יום עבודה, או מה שנושאים.'],check:{stat:'charisma',dc:8},
   win:[`Hollis takes his share, stamps a slip of paper, and calls you a fine citizen. It costs you a day and a little pride. The gate opens, and you are behind it.`,`הוליס לוקח את חלקו, חותם על פתק, וקורא לך אזרח למופת. זה עולה יום ומעט גאווה. השער נפתח, ומעבר לו הדרך.`,{ammo:-1,order:2,morale:-2,flag:'us_paid'}],
   lose:[`He wants more than the slip says. You leave with less than you paid, and a promise from Hollis that he will remember your face.`,`הוא רוצה יותר ממה שכתוב בפתק. יצאת עם פחות ממה ששילמת, ועם הבטחה של הוליס שיזכור את הפנים.`,{food:-2,ammo:-1,morale:-5,flag:'us_paid'}]},
  {l:['Go around through the drainage culvert','לעקוף דרך צינור הניקוז'],s:['A mile of concrete, and no toll.','קילומטר של בטון, ובלי אגרה.'],check:{stat:'stealth',dc:10},
   win:[`Wet to the knees and smelling of the county's worst secrets, you come out the far side and watch the gate shrink in the mirror. Nobody counts you.`,`עם ברכיים רטובות וריח של הסודות הגרועים של המחוז, יצאת בצד השני וראית את השער מצטמצם במראה. איש לא ספר אותך.`,{morale:3,humanity:-1,flag:'us_around'}],
   lose:[`The culvert is not empty. You crawl out with a torn sleeve and a bite you did not feel until later.`,`הצינור לא ריק. יצאת בזחילה עם שרוול קרוע ונשיכה שהורגשה רק אחר כך.`,{hp:-10,inf:10,morale:-4,flag:'us_around'}]}
 ]}));

chapter(Object.assign({},US,{id:'us_3',n:3,at:.36,
 t:['Jonah','ג׳ונה'],
 x:[()=>`In the middle of the night, a knock on the tanker's hatch. It is a boy of about twelve, who has been riding in the shadow under the trailer since the last town. He says his name is Jonah, that his father was one of Hollis's people, and that he saw what happens to those who stop paying. ${flag('us_paid')?'You paid, and the boy looks at you as if that were the same as forgiveness.':flag('us_around')?'You slipped around the gate, and the boy looks at you as if you had found the right door.':'He is very quiet, very hungry, and very sure about who you are.'}`,
    ()=>`באמצע הלילה, דפיקה בפתח של המיכלית. ילד בן שתים עשרה בערך, שנסע בצל שמתחת לנגרר מאז העיירה האחרונה. הוא אומר שקוראים לו ג׳ונה, שאבא שלו היה מאנשי הוליס, ושהוא ראה מה קורה למי שמפסיק לשלם. ${flag('us_paid')?'שילמת, והילד מסתכל כאילו זה היה אותו דבר כמו סליחה.':flag('us_around')?'חמקת סביב השער, והילד מסתכל כאילו מצאת את הדלת הנכונה.':'הוא שקט מאוד, רעב מאוד, ובטוח מאוד שהגיע אל האדם הנכון.'}`],
 ch:[
  {l:['Take him along','לקחת אותו איתכם'],s:['A boy is worth more than a seat.','ילד שווה יותר ממושב.'],check:{stat:'charisma',dc:8},
   win:[`Jonah takes the seat, the blanket and the last biscuit, in that order. He knows the roads north better than the map, and by morning he is doing the navigation.`,`ג׳ונה לוקח את המושב, את השמיכה ואת הביסקוויט האחרון, בסדר הזה. הוא מכיר את הכבישים צפונה טוב יותר מהמפה, ועד הבוקר הוא מנווט.`,{humanity:6,morale:4,flag:'us_jonah'}],
   lose:[`Jonah wants to go home, and you cannot give him one. He cries for an hour and then never mentions it again.`,`ג׳ונה רוצה ללכת הביתה, ואי אפשר לתת לו בית. הוא בוכה שעה ואחר כך לא מזכיר את זה יותר.`,{humanity:2,morale:-5,flag:'us_jonah'}]},
  {l:['Take him to the next shelter','להביא אותו למקלט הבא'],s:['A boy needs more than a road.','ילד צריך יותר מדרך.'],check:{stat:'wits',dc:8},
   win:[`A church basement two miles off takes him in with a hot meal and a promise. He does not look back, and neither, quite, do you.`,`מרתף של כנסייה במרחק שני מייל מקבל אותו עם ארוחה חמה והבטחה. הוא לא מסתכל אחורה, וגם מי שהביא אותו כמעט לא.`,{humanity:3,order:1,flag:'us_no_jonah'}],
   lose:[`The church basement is locked and empty. You leave him on the steps with a blanket and half your food, and it stays with you.`,`מרתף הכנסייה נעול וריק. השארת אותו על המדרגות עם שמיכה וחצי מהאוכל, וזה נשאר איתך.`,{food:-1,morale:-6,humanity:-2,flag:'us_no_jonah'}]}
 ]}));

chapter(Object.assign({},US,{id:'us_4',n:4,at:.52,
 t:['The Refinery Town','עיירת הזיקוק'],
 x:[()=>`The road drops into a small town with a working refinery, its flare burning over the roofs like a torch. The people there have kept the tanks full and the gates shut for a month. When they see Dee's tanker, half of them cheer and half of them reach for their guns. ${flag('us_paid')?"Behind you, a dust cloud: Hollis's convoy has followed the toll, and its lights are coming.":flag('us_around')?"Behind you, a dust cloud: Hollis's convoy, sent to find whoever crawled through the culvert.":'Behind you, the road is empty. For now.'}`,
    ()=>`הכביש יורד אל עיירה קטנה עם בית זיקוק פעיל, והלהבה שלו בוערת מעל הגגות כמו לפיד. האנשים כאן שמרו על המכלים מלאים ועל השערים סגורים חודש שלם. כשהם רואים את המיכלית של די, חצי מריעים וחצי מושיטים יד אל הרובים. ${flag('us_paid')?'מאחור ענן אבק: השיירה של הוליס עקבה אחרי האגרה, והאורות שלה מתקרבים.':flag('us_around')?'מאחור ענן אבק: השיירה של הוליס, שנשלחה למצוא את מי שזחל דרך הצינור.':'מאחור הכביש ריק. בינתיים.'}`],
 ch:[
  {l:['Stand with the townspeople','לעמוד עם תושבי העיירה'],s:['They cannot hold the gate alone.','הם לא יכולים להחזיק את השער לבד.'],check:{stat:'strength',dc:10,danger:true},
   win:[`You hold the gate for three hours, on the wrong side of the wire, with a pipe and a borrowed rifle. When Hollis's convoy turns around, the town has a name for you and a bed for the night.`,`החזקת את השער שלוש שעות, בצד הלא נכון של התיל, עם צינור ורובה שהושאל. כשהשיירה של הוליס מסתובבת, יש לעיירה שם בשבילך ומיטה ללילה.`,{order:4,humanity:4,hp:-6,flag:'us_stood'}],
   lose:[`The gate holds, but not the line. You are dragged behind the tanks with a cracked rib and a story you will tell for the rest of the trip.`,`השער מחזיק, אבל הקו לא. נגררת מאחורי המכלים עם צלע סדוקה וסיפור שיסופר לאורך כל הדרך.`,{hp:-14,morale:-5,flag:'us_stood'}]},
  {l:['Refill and slip away before the fight','למלא ולהיעלם לפני הקרב'],s:['It is not your town.','זו לא העיירה שלך.'],check:{stat:'stealth',dc:9},
   win:[`The tank is full in twenty minutes, and the road north is dark and empty. Behind you the sky goes orange, and you do not turn around to see why.`,`המיכל מלא בעשרים דקות, והכביש צפונה חשוך וריק. מאחור השמיים נצבעים בכתום, ולא הסתובבת לראות למה.`,{food:2,water:2,humanity:-5,morale:-2,flag:'us_fled'}],
   lose:[`The night guard catches Dee's hose in the dark. You leave with half a tank, a shout at your back, and the taste of shame.`,`שומר הלילה תופס את הצינור של די בחושך. יצאת עם חצי מיכל, צעקה בגב, וטעם של בושה.`,{hp:-6,morale:-6,humanity:-3,flag:'us_fled'}]}
 ]}));

chapter(Object.assign({},US,{id:'us_5',n:5,at:.70,
 t:['The Lake Road','דרך האגם'],
 x:[()=>`The rig coughs on the hill. Dee slaps the dashboard and says the engine has about forty miles left in it. Ahead is the last stretch before the lakes: a ridge road, a rail crossing, and then the shore. The radio, faint and steady, says the station takes people at dawn. ${flag('us_jonah')?'Jonah is asleep against your shoulder, mouth open, an unfinished map in his hand.':'The cab is quiet, and full of the sound of the engine.'}`,
    ()=>`המשאית משתעלת על הגבעה. די טופחת על לוח המחוונים ואומרת שנשארו במנוע בערך ארבעים מייל. לפנינו הקטע האחרון עד האגמים: כביש רכס, מעבר מסילה, ואז החוף. הרדיו, חלש ויציב, אומר שהתחנה מקבלת אנשים עם עלות השחר. ${flag('us_jonah')?'ג׳ונה ישן על הכתף, פה פתוח, מפה לא גמורה ביד.':'התא שקט, ומלא בקול של המנוע.'}`],
 ch:[
  {l:['Nurse the rig to the shore','להוביל את המשאית עד החוף'],s:['Forty miles, one engine, one prayer.','ארבעים מייל, מנוע אחד, תפילה אחת.'],check:{stat:'wits',dc:9,mod:()=>flag('us_stood')?1:0},
   win:[`You feather the throttle, coast the hills, and talk to the engine the way Dee does. It dies within sight of the water, with a sigh you could have set a watch by.`,`מלטפים את המצערת, גולשים על הגבעות, ומדברים אל המנוע כמו שדי עושה. הוא מת בטווח ראייה של המים, באנחה שאפשר היה לכוון לפיה שעון.`,{order:2,morale:6,flag:'us_shore_rig'}],
   lose:[`The engine dies on the ridge. You walk the last eight miles to the shore in the dark, carrying whatever the tanker will let go of.`,`המנוע מת על הרכס. הלכת שמונה מייל אחרונים אל החוף בחושך, נושא כל מה שהמיכלית מוכנה לשחרר.`,{hp:-8,morale:-4}]},
  {l:['Leave the rig and walk the last miles','לעזוב את המשאית וללכת את המילים האחרונות'],s:['Faster on foot, lighter, and unafraid.','מהר יותר ברגל, קל יותר, בלי פחד.'],check:{stat:'stamina',dc:10},
   win:[`Two hours of moonlit ridge, and the shore is a silver line ahead. You arrive with a full bottle and a strange lightness.`,`שעתיים של רכס באור ירח, והחוף קו כסוף מלפנים. הגעת עם בקבוק מלא וקלילות מוזרה.`,{morale:4,hp:-3,flag:'us_walked'}],
   lose:[`The ridge takes more than you thought. You arrive at the shore at noon, slow and sore, with the tide of others already there.`,`הרכס לוקח יותר ממה שחשבת. הגעת לחוף בצהריים, איטי וכואב, ושאר האנשים כבר שם.`,{hp:-10,food:-1,morale:-4,flag:'us_walked'}]}
 ]}));

chapter(Object.assign({},US,{id:'us_6',n:6,at:.88,
 t:['The Lake Station','תחנת האגם'],
 x:[()=>`A concrete station at the edge of a lake, a dock with a ferry, a fence, and a list. A woman with a clipboard reads names at the gate. ${flag('us_jonah')?'She asks whether the boy is with you, and the whole line waits for the answer.':'The line is longer than the ferry.'} ${flag('us_stood')?'Word of the refinery has reached here before you did.':flag('us_fled')?'Word of the refinery has reached here too, though not kindly.':''} On the far shore, small lights flicker in the fog.`,
    ()=>`תחנת בטון על שפת אגם, מזח עם מעבורת, גדר, ורשימה. אישה עם לוח כתיבה מקריאה שמות בשער. ${flag('us_jonah')?'היא שואלת אם הילד איתך, וכל התור מחכה לתשובה.':'התור ארוך יותר מהמעבורת.'} ${flag('us_stood')?'השמועה על בית הזיקוק הגיעה לכאן לפניך.':flag('us_fled')?'השמועה על בית הזיקוק הגיעה לכאן גם כן, אבל לא בחמימות.':''} על החוף הרחוק אורות קטנים מהבהבים בערפל.`],
 ch:[
  {l:['Speak for the group, and everyone with you','לדבר בשם הקבוצה וכל מי שאיתה'],s:['A name is not a number.','שם אינו מספר.'],check:{stat:'charisma',dc:10,mod:()=>(flag('us_stood')?1:0)-(flag('us_fled')?1:0)},
   win:[`You read the names aloud, one by one, and put the boy's first. The woman with the clipboard looks at the ferry, at the line, and at you, and crosses out a name that is not yours to make room. The ferry leaves full.`,`קראת את השמות בקול, אחד אחד, ושמת את הילד ראשון. האישה עם לוח הכתיבה מסתכלת במעבורת, בתור, ובך, ומוחקת שם אחד כדי לפנות מקום. המעבורת יוצאת מלאה.`,{humanity:8,morale:8,order:4,flag:'us_end_group'}],
   lose:[`The ferry leaves with half of you on it. You watch the fog swallow the lights, and the woman with the clipboard promises a second crossing she cannot promise.`,`המעבורת יוצאת עם חצי מכם. הערפל בולע את האורות, והאישה עם לוח הכתיבה מבטיחה מעבר שני שאי אפשר להבטיח.`,{hp:-6,morale:-6,flag:'us_end_group'}]},
  {l:['Slip onto the ferry alone','להיכנס לספינה לבד'],s:['Someone always finds a gap.','מישהו תמיד מוצא פרצה.'],check:{stat:'stealth',dc:10},
   win:[`A crate, a tarp, and a night watchman who is very interested in a cigarette. The ferry leaves with you in the hold, and the far shore comes up out of the fog, small and cold and real.`,`ארגז, יריעה, ושומר לילה שמתעניין מאוד בסיגריה. המעבורת יוצאת כשהיית בבטן שלה, והחוף הרחוק עולה מהערפל, קטן וקר ואמיתי.`,{morale:6,humanity:-6,order:1,flag:'us_end_alone'}],
   lose:[`The ferry hand finds you between two crates. He does not call anyone. He simply asks you to get off, and you do, and you stand on the dock as the lights go.`,`עובד המעבורת מוצא אותך בין שני ארגזים. הוא לא קורא לאף אחד. הוא רק מבקש לרדת, וירדת, ועמדת על המזח כשהאורות מתרחקים.`,{morale:-8,hp:-4,flag:'us_end_alone'}]}
 ]}));
