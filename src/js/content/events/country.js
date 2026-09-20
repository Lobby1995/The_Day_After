
/* ---------- events that belong to one country and never appear in another ---------- */
const inC=(loc,d,extra)=>()=>G.p.loc===loc&&G.w.day>=T(d)&&(!extra||extra());

/* ===== United States: the apocalypse at its peak ===== */
defEv({id:'c_usa_1',cond:inC('usa',2),w:20,
 t:['The Stadium','האצטדיון'],
 x:[`The stadium floodlights are on, which means someone with a generator is in charge. Soldiers at the gate hand out numbered wristbands to a crowd of thousands behind a barricade.`,`זרקורי האצטדיון דולקים, כלומר מישהו עם גנרטור מנהל את המקום. חיילים בשער מחלקים צמידים ממוספרים להמון של אלפים מאחורי מחסום.`],
 ch:[
  {l:['Queue for a wristband','לעמוד בתור לצמיד'],s:['Rules, rations, and someone else giving orders.','חוקים, מנות, ומישהו אחר שנותן פקודות.'],check:{stat:'charisma',dc:9},
   win:[`The wristband is a slip of yellow plastic. Inside: hot food, a cot, and a tired nurse who looks you over. It won't last, and everyone knows it.`,`הצמיד הוא פס פלסטיק צהוב. בפנים: אוכל חם, מיטת שדה, ואחות עייפה שבודקת אותך. זה לא יחזיק, וכולם יודעים.`,{food:3,water:2,hp:8,morale:6,order:2}],
   lose:[`The list is full by the time you reach the table. A soldier walks you back to the barricade, not unkindly.`,`הרשימה מלאה כשמגיעים לשולחן. חייל מלווה אותך בחזרה למחסום, לא באכזריות.`,{morale:-6,hp:-4}]},
  {l:['Slip in through the loading dock','להחליק פנימה דרך רציף הפריקה'],s:['Rules are for the living, and you are not sure which you are.','חוקים הם לחיים, ולא תמיד ברור מי עוד נחשב.'],check:{stat:'stealth',dc:10,danger:true},
   win:[`You find the kitchens, the pantry, and a supply closet nobody guarded. By the time they notice the numbers don't match, you're gone.`,`מצאת את המטבחים, המזווה וחדר אספקה שאיש לא שמר. עד שהם שמו לב שהמספרים לא מסתדרים, כבר הלכת.`,{food:4,water:3,meds:1,humanity:-4}],
   lose:[`The dock isn't empty. The concession stands were the first to fall.`,`הרציף לא ריק. דוכני המזון היו הראשונים ליפול.`,{hp:-15,inf:12}]}
 ]});
defEv({id:'c_usa_2',cond:inC('usa',4,()=>G.w.order<45),w:18,
 t:['Members Only','למנויים בלבד'],
 x:[`A shopping mall has become a fortress: barbed wire in the parking lot, snipers on the roof, a hand-painted sign reading MEMBERS ONLY. A man in a food-court apron waves you over. He says they had "incidents" with people who left.`,`קניון הפך למבצר: תיל דוקרני בחניה, צלפים על הגג, ושלט צבוע ביד: למנויים בלבד. אדם בסינר של מסעדה מסמן לך להתקרב. הוא אומר שהיו להם "תקריות" עם אנשים שעזבו.`],
 ch:[
  {l:['Join their watch','להצטרף לשמירה שלהם'],s:['A roof and a rifle, under their rules.','גג ורובה, לפי החוקים שלהם.'],check:{stat:'strength',dc:10},
   win:[`You take the night shift on the roof. It is dull, and safe, and the food court makes a decent stew. You leave when you're ready, with supplies and no hard feelings.`,`לקחת את משמרת הלילה על הגג. משעמם, בטוח, ובמסעדות הקניון מבשלים תבשיל סביר. עזבת כשהיית מוכן, עם אספקה וללא טינה.`,{food:3,ammo:2,order:2,morale:5}],
   lose:[`The apron man wasn't kidding about incidents. You spend a night in a storeroom locked from the outside, and leave at dawn with less.`,`האיש בסינר לא התלוצץ לגבי תקריות. בילית לילה בחדר אחסון נעול מבחוץ, ועזבת עם עלות השחר עם פחות.`,{food:-2,morale:-6}]},
  {l:['Trade and move on','לסחור ולהמשיך'],s:['Never stay where the rules are written by whoever has the guns.','אף פעם לא להישאר איפה שהחוקים נכתבים על ידי מי שמחזיק את הנשק.'],check:{stat:'charisma',dc:9},
   win:[`You barter an hour of stories and salvage for medicine and ammunition, and walk out through the gate.`,`החלפת שעה של סיפורים וגרוטאות בתרופות ותחמושת, ויצאת דרך השער.`,{meds:2,ammo:2,morale:2}],
   lose:[`They take your best item as a "membership fee" and open the gate. Nobody says goodbye.`,`הם לקחו את הפריט הכי טוב שלך כ"דמי חבר" ופתחו את השער. אף אחד לא נפרד.`,{food:-2,ammo:-1}]}
 ]});
defEv({id:'c_usa_3',cond:inC('usa',5),w:16,
 t:['The Radio Preacher','המטיף ברדיו'],
 x:[`A preacher on AM radio says the dead are the first to be raised, the rest of us are the last, and there is a place in a church basement for anyone who will listen. The signal is strong. The church isn't far.`,`מטיף ברדיו אומר שהמתים הראשונים לקום, שכולנו האחרונים, ושיש מקום במרתף כנסייה לכל מי שיקשיב. האות חזק. הכנסייה לא רחוקה.`],
 ch:[
  {l:['Go to the service','ללכת לתפילה'],s:['Hymns, hot food, and a very long sermon.','מזמורים, אוכל חם, ודרשה ארוכה מאוד.'],check:{stat:'charisma',dc:8},
   win:[`The hymns are out of tune and the stew is thin, but four hundred people sing at once, and it is the loudest sound you've heard in weeks. You leave fed, with a blessing you didn't ask for.`,`המזמורים לא מכוונים והתבשיל דליל, אבל ארבע מאות איש שרים ביחד, וזה הקול הכי חזק ששמעת בשבועות. עזבת שבע, עם ברכה שלא ביקשת.`,{food:2,morale:10,humanity:4}],
   lose:[`The sermon goes on for hours, and the church gets uneasy when you don't kneel. A deacon takes your pack "for safekeeping" and never returns it.`,`הדרשה נמשכת שעות, והקהל נעשה חשדן כשלא כורעים. שמש הכנסייה לקח את התרמיל "לשמירה" ולא החזיר אותו.`,{food:-2,ammo:-1,morale:-3}]},
  {l:['Raid the church pantry','לפשוט על מזווה הכנסייה'],s:['Faith is nice. Food is better.','אמונה זה נחמד. אוכל זה טוב יותר.'],check:{stat:'stealth',dc:9},
   win:[`Behind the altar, a locked door; behind the door, canned goods for a hundred families. You take a share, and tell yourself it is a fair one.`,`מאחורי המזבח דלת נעולה, ומאחורי הדלת שימורים למאה משפחות. לקחת חלק, ואמרת לעצמך שהוא הוגן.`,{food:4,water:2,humanity:-6,flag:'looter'}],
   lose:[`A child sees you in the pantry and doesn't scream, which is worse. A deacon does the screaming for her.`,`ילדה רואה אותך במזווה ולא צורחת, וזה גרוע יותר. שמש הכנסייה צורח במקומה.`,{hp:-8,morale:-6,humanity:-2}]}
 ]});
defEv({id:'c_usa_4',cond:inC('usa',5),w:16,
 t:['The Last Pharmacy','בית המרקחת האחרון'],
 x:[`A big-box pharmacy has been turned into a clinic by one pharmacist with a shotgun, a folding table, and a strict ration. He needs someone to guard the back door for a night in return for a week's worth of medicine.`,`בית מרקחת ענק הפך למרפאה על ידי רוקח אחד עם רובה ציד, שולחן מתקפל ומנה קפדנית. הוא צריך מישהו ששומר על הדלת האחורית לילה אחד תמורת תרופות לשבוע.`],
 ch:[
  {l:['Take the night watch','לקחת את משמרת הלילה'],s:['A long night, and honest work.','לילה ארוך, ועבודה הגונה.'],check:{stat:'stamina',dc:9},
   win:[`The night is uneventful until the very end, when something rattles the back door and thinks better of it. He pays in full.`,`הלילה עובר בשקט עד הסוף, אז משהו מקשקש בדלת האחורית וחושב שוב. הוא משלם במלואו.`,{meds:3,morale:3}],
   lose:[`Something doesn't think better of it.`,`משהו לא חושב שוב.`,{hp:-16,inf:14,meds:1}]},
  {l:['Rob the stockroom','לשדוד את המחסן'],s:['He will never know. Probably.','הוא לעולם לא ידע. כנראה.'],check:{stat:'stealth',dc:10},
   win:[`Boxes of antibiotics, saline, and a locked cabinet you don't try to open. You are out before the shift changes.`,`קופסאות של אנטיביוטיקה, מי מלח וארון נעול שלא ניסית לפתוח. יצאת לפני החלפת המשמרת.`,{meds:3,humanity:-6}],
   lose:[`He knows. He is a very good shot, and a very sad one.`,`הוא יודע. הוא צלף מצוין, ועצוב מאוד.`,{hp:-14,humanity:-4}]}
 ]});
defEv({id:'c_usa_5',cond:inC('usa',6,()=>G.w.outbreak>=60),w:16,
 t:['The Deserter','העריק'],
 x:[`A National Guard corporal sits on the hood of a jeep with the engine idling. He hasn't shaved in a week. He says he's leaving, and there's room for one more if you can keep a secret. His family is three hundred miles north.`,`רב״ט במשמר הלאומי יושב על מכסה ג׳יפ עם מנוע פועל. הוא לא התגלח שבוע. הוא אומר שהוא עוזב, ויש מקום לעוד אחד אם אפשר לשמור סוד. משפחתו שלוש מאות מייל צפונה.`],
 ch:[
  {l:['Ride north with him','לנסוע איתו צפונה'],s:['Three hundred miles, with a man who knows every checkpoint.','שלוש מאות מייל עם אדם שמכיר כל מחסום.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`It takes two days and most of your nerve, but he gets you past four checkpoints and drops you off with a full tank and a handshake.`,`זה לוקח יומיים ורוב העצבים, אבל הוא מעביר אותך ארבעה מחסומים ומפיל אותך עם מיכל מלא ולחיצת יד.`,{food:2,ammo:2,flag:'car',morale:6}],
   lose:[`The third checkpoint is not where he thought it would be.`,`המחסום השלישי לא נמצא איפה שחשב.`,{hp:-18,morale:-6,ammo:-1}]},
  {l:['Take the keys and go alone','לקחת את המפתחות וללכת לבד'],s:['He is tired. You are not.','הוא עייף. אין צורך שגם אחרים יהיו.'],check:{stat:'strength',dc:9},
   win:[`He hands the keys over with a sigh. You drive until the tank runs dry, and you have never felt so alone.`,`הוא מוסר את המפתחות באנחה. נסעת עד שהמיכל התרוקן, ומעולם לא הרגשת כל כך לבד.`,{flag:'car',humanity:-6}],
   lose:[`He was faster than he looked.`,`הוא היה מהיר יותר ממה שנראה.`,{hp:-14,humanity:-4}]}
 ]});

/* ===== Brazil: a dark megacity, rooftops and rumors ===== */
defEv({id:'c_br_1',cond:inC('brazil',2),w:20,
 t:['The Cable Car','הרכבל'],
 x:[`The cable car has stopped mid-span, forty meters above a hillside of blue rooftops. Faces press against the glass. Someone is banging on the door with a fire extinguisher. The station at the near end is unguarded.`,`הרכבל נעצר באמצע המסלול, ארבעים מטר מעל גבעת גגות כחולים. פנים נצמדים לזכוכית. מישהו דופק בדלת עם מטף כיבוי. התחנה בקצה הקרוב לא שמורה.`],
 ch:[
  {l:['Climb the cable to reach them','לטפס על הכבל אליהם'],s:['Dangerous, slow, and you can\'t do it twice.','מסוכן, איטי, ואי אפשר לעשות את זה פעמיים.'],check:{stat:'stamina',dc:10},
   win:[`The cable is thick as your arm. You cross on your stomach, pry the door open, and bring six people onto the tower. One is a bus driver who says he knows every road in the city.`,`הכבל עבה כמו זרוע. חצית על הבטן, פתחת את הדלת והוצאת שישה אנשים למגדל. אחד מהם נהג אוטובוס שאומר שהוא מכיר כל דרך בעיר.`,{humanity:8,morale:6,food:2}],
   lose:[`Halfway across, the cable sags. You make it back, but not by much.`,`באמצע הדרך הכבל שוקע. חזרת, אבל בקושי.`,{hp:-16,morale:-4}]},
  {l:['Loot the station instead','לפשוט על התחנה במקום'],s:['The passengers are not your responsibility. The vending machines are.','הנוסעים לא באחריותך. המכונות האוטומטיות כן.'],check:{stat:'stealth',dc:8},
   win:[`Snacks, bottled water, a first aid box behind the ticket desk. Above you, the faces watch, and you don't look up.`,`חטיפים, מים בבקבוקים וקופסת עזרה ראשונה מאחורי הקופה. מעליך הפנים צופות, ולא הרמת מבט.`,{food:3,water:3,humanity:-6}],
   lose:[`An alarm goes off. Below, the crowd hears it and looks up at you.`,`אזעקה מופעלת. למטה ההמון שומע ומרים מבט אליך.`,{hp:-10,morale:-5}]}
 ]});
defEv({id:'c_br_2',cond:inC('brazil',3),w:16,
 t:['The Carnival Float','פלטפורמת הקרנבל'],
 x:[`A parade float, thirty feet of painted foam and speakers, is parked across the avenue. The engine still turns over. Someone left the sound system on: a loop of drums, faint and steady.`,`פלטפורמת מצעד, תשעה מטרים של קצף צבוע ורמקולים, חונה מעבר לשדרה. המנוע עדיין מניע. מישהו השאיר את מערכת הסאונד: לולאה של תופים, חלשה ויציבה.`],
 ch:[
  {l:['Drive it as a decoy','לנהוג בה כפיתיון'],s:['Loud, bright, and impossible to ignore.','רועשת, בוהקת, ואי אפשר להתעלם ממנה.'],check:{stat:'wits',dc:9,bg:{mechanic:2}},
   win:[`You lead a slow, ridiculous parade of the dead through three neighborhoods and park the float in a drainage canal. It is the strangest thing you have ever done, and it works.`,`הובלת מצעד איטי ומגוחך של מתים דרך שלוש שכונות וחנית את הפלטפורמה בתעלת ניקוז. זה הדבר הכי מוזר שעשית, וזה עובד.`,{outbreak:-2,morale:6,order:1}],
   lose:[`The float stalls in the middle of a crowd.`,`הפלטפורמה נתקעת באמצע ההמון.`,{hp:-16,inf:10}]},
  {l:['Strip it for parts','לפרק אותה לחלקים'],s:['Batteries, wire, and a very large speaker.','סוללות, חוטים ורמקול גדול מאוד.'],check:{stat:'strength',dc:8},
   win:[`Two car batteries, a coil of wire, and a full water tank. Someone at home will find a use for all of it.`,`שתי סוללות רכב, סליל חוטים ומיכל מים מלא. מישהו בבית ימצא שימוש לכל זה.`,{water:3,morale:4}],
   lose:[`The float collapses on you.`,`הפלטפורמה קורסת עליך.`,{hp:-12}]}
 ]});
defEv({id:'c_br_3',cond:inC('brazil',3,()=>G.w.order>=22),w:16,
 t:['The Market Never Closes','השוק שלא נסגר'],
 x:[`In the shadow of a collapsed overpass, the street market runs on candles and habit. A woman sells grilled corn. A man sells batteries. A child sells rumors, three for a real.`,`בצל גשר שקרס, השוק ממשיך לפעול על נרות והרגל. אישה מוכרת תירס צלוי. גבר מוכר סוללות. ילד מוכר שמועות, שלוש בריאל.`],
 ch:[
  {l:['Trade a rumor for a rumor','להחליף שמועה בשמועה'],s:['Information is the only currency nobody is printing.','מידע הוא המטבע היחיד שאף אחד לא מדפיס.'],check:{stat:'wits',dc:8},
   win:[`The child tells you where a pharmacist is hiding, and you tell the child where you saw a fuel truck. Both of you are right.`,`הילד מספר לך איפה רוקח מסתתר, ואת המקום של משאית הדלק שראית מספרים לו בתמורה. שניכם צודקים.`,{meds:2,food:1,morale:3}],
   lose:[`The rumor you bought was a lie, and what's at that address isn't a pharmacist.`,`השמועה שקנית הייתה שקר, ומה שנמצא בכתובת הזאת הוא לא רוקח.`,{hp:-12,inf:8}]},
  {l:['Buy on credit and promise to return','לקנות בהקפה ולהבטיח לחזור'],s:['Some people remember.','יש אנשים שזוכרים.'],check:{stat:'charisma',dc:9},
   win:[`The corn woman writes your name on a wall. You pay her back months later, and she cries.`,`אישת התירס כותבת את השם על קיר. החזרת לה חודשים אחר כך, והיא בכתה.`,{food:3,humanity:4}],
   lose:[`She doesn't trust credit. She trusts your watch, and takes it as a deposit.`,`היא לא סומכת על אשראי. היא סומכת על השעון שלך, ולוקחת אותו כפיקדון.`,{food:1,morale:-3}]}
 ]});
defEv({id:'c_br_4',cond:inC('brazil',5),w:16,
 t:['The Blackout Hospital','בית החולים באפלה'],
 x:[`A hospital's generator is down to its last liter of fuel, and the ICU has eleven patients on ventilators. The night nurse says whoever brings fuel can name the ward. Two streets away, a fuel truck sits abandoned, tank full, with something moving in the cab.`,`הגנרטור של בית חולים נותר עם ליטר דלק אחרון, ובטיפול נמרץ אחד עשר מונשמים. האחות אומרת שמי שיביא דלק יוכל לקרוא למחלקה בשמו. שני רחובות משם עומדת משאית דלק נטושה עם מיכל מלא, ומשהו זז בתא.`],
 ch:[
  {l:['Take the truck to the hospital','להביא את המשאית לבית החולים'],s:['Nothing gets done without fuel.','שום דבר לא נעשה בלי דלק.'],check:{stat:'strength',dc:10,danger:true},
   win:[`It takes a metal pipe, a bad five minutes, and a hose. You carry the fuel across the street in jerry cans, and the nurse cries into your sleeve.`,`נדרשים צינור מתכת, חמש דקות רעות וצינור גומי. הבאת את הדלק לבית החולים בג׳ריקנים, והאחות בוכה על השרוול שלך.`,{humanity:10,morale:8,meds:1,order:3}],
   lose:[`The thing in the cab was not alone.`,`מה שהיה בתא לא היה לבד.`,{hp:-18,inf:14}]},
  {l:['Siphon the last liter for yourself','לשאוב את הליטר האחרון לעצמך'],s:['The ward will fall anyway.','המחלקה תיפול בכל מקרה.'],check:{stat:'stealth',dc:8},
   win:[`A full tank, a quiet street, and a cold feeling that takes a long time to go away.`,`מיכל מלא, רחוב שקט ותחושה קרה שלוקח זמן רב לעבור.`,{flag:'car',humanity:-12}],
   lose:[`The nurse sees you. She says nothing, and it follows you for miles.`,`האחות רואה אותך. היא לא אומרת דבר, וזה ממשיך ללוות אותך קילומטרים.`,{hp:-6,humanity:-6,morale:-8}]}
 ]});
defEv({id:'c_br_5',cond:inC('brazil',4),w:14,
 t:['Football in the Dark','כדורגל בחושך'],
 x:[`On a flat rooftop, someone has strung up work lights and marked a pitch in chalk. Two teams of exhausted neighbors are playing five-a-side with a ball made of tape. A referee waves you over. One team is short a player.`,`על גג שטוח מישהו תלה פנסי עבודה וסימן מגרש בגיר. שתי קבוצות של שכנים מותשים משחקות חמישיות עם כדור מסרט דבק. שופט מסמן לך להתקרב. לקבוצה אחת חסר שחקן.`],
 ch:[
  {l:['Join the game','להצטרף למשחק'],s:['For ninety minutes, nothing else happens.','במשך תשעים דקות שום דבר אחר לא קורה.'],check:{stat:'stamina',dc:8},
   win:[`You score, and someone scores on you, and a hundred people cheer both. For ninety minutes you forget what year it is.`,`הבקעת, והבקיעו לך, ומאה איש מריעים לשניהם. במשך תשעים דקות שכחת איזו שנה זו.`,{morale:12,humanity:3}],
   lose:[`You take a knee to the shin, and the game ends early: something on the street has noticed the lights.`,`קיבלת ברך בשוק, והמשחק מסתיים מוקדם: משהו ברחוב הבחין באורות.`,{hp:-8,morale:2,outbreak:1}]},
  {l:['Guard the stairwell','לשמור על חדר המדרגות'],s:['Someone has to.','מישהו צריך.'],check:{stat:'stealth',dc:8},
   win:[`You hold the door until the last whistle. Afterward, the referee slips you a bag of rice from the winners' prize.`,`החזקת את הדלת עד השריקה האחרונה. אחר כך השופט דוחף לך שקית אורז מפרס המנצחים.`,{food:3,order:2}],
   lose:[`Something gets past you.`,`משהו חולף על פניך.`,{hp:-14,inf:10,morale:-4}]}
 ]});

/* ===== United Kingdom: cordons, queues, and the countryside ===== */
defEv({id:'c_uk_1',cond:inC('uk',2),w:20,
 t:['The Tea Van','משאית התה'],
 x:[`A tea van is parked in a lay-by with its awning out. The proprietor, in an apron, is pouring tea for a queue of fourteen people who are all pretending to be at a bus stop.`,`משאית תה חונה בשוליים עם החופה פרושה. הבעלים, בסינר, מוזגת תה לתור של ארבעה עשר איש שכולם מעמידים פנים שהם בתחנת אוטובוס.`],
 ch:[
  {l:['Join the queue','להצטרף לתור'],s:['Some things are worth being civilized about.','יש דברים ששווה להיות מתורבתים בשבילם.'],check:{stat:'charisma',dc:8},
   win:[`Five minutes of small talk, a biscuit, and a flask refill. You leave warm, with the address of a farm that takes travellers and the odd feeling of being a person.`,`חמש דקות של שיחת חולין, ביסקוויט ומילוי בקבוק. עזבת חם, עם כתובת של חווה שמקבלת נוסעים ותחושה מוזרה של להיות בן אדם.`,{morale:10,food:1,humanity:2}],
   lose:[`The queue turns on you when you cut in front of a man with a cough. Nobody says anything. They just look.`,`התור מתהפך עליך כשחוצים לפני אדם משתעל. אף אחד לא אומר דבר. רק מסתכלים.`,{morale:-5,humanity:-1}]},
  {l:['Ask for something stronger','לבקש משהו חזק יותר'],s:['The van has a secret.','למשאית יש סוד.'],check:{stat:'wits',dc:9},
   win:[`A hip flask and a hand-drawn map. The woman winks and says the farm on the ridge has an unlocked barn.`,`בקבוקון ומפה ביד. האישה קורצת ואומרת שבחווה על הרכס יש אסם לא נעול.`,{morale:4,food:2,flag:'countryside'}],
   lose:[`She looks at you, and puts the kettle down.`,`היא מסתכלת עליך, ומניחה את הקומקום.`,{morale:-4}]}
 ]});
defEv({id:'c_uk_2',cond:inC('uk',4),w:16,
 t:['The Parish Meeting','אסיפת הכפר'],
 x:[`The village hall has a light on. Inside, forty people sit on stacking chairs while a man with a clipboard reads out the agenda: item one, the dead; item two, the visitors; item three, the tea rota. You are item two.`,`באולם הכפר דולק אור. בפנים ארבעים איש יושבים על כיסאות מתקפלים בזמן שאדם עם לוח כתיבה מקריא את סדר היום: סעיף אחד, המתים; סעיף שניים, האורחים; סעיף שלושה, תורנות התה. האורחים הם סעיף שניים, והם כולל אותך.`],
 ch:[
  {l:['Argue for the outsiders','להתווכח למען הזרים'],s:['Be the voice they need to hear.','להיות הקול שצריך לשמוע.'],check:{stat:'charisma',dc:9},
   win:[`The vote is 22 to 18. They give you a bed in the church hall, bread, and a hard stare.`,`ההצבעה 22 מול 18. נותנים לך מיטה באולם הכנסייה, לחם ומבט קשה.`,{food:3,order:2,morale:5}],
   lose:[`The vote is 18 to 22. They give you an hour to pack.`,`ההצבעה 18 מול 22. נותנים לך שעה להתארגן.`,{morale:-6,food:-1}]},
  {l:['Offer your skills instead','להציע כישורים במקום'],s:['Be useful, not a problem.','להיות שימושי, לא בעיה.'],check:{stat:'wits',dc:8},
   win:[`You fix a pump, teach a class, and set a fracture. By dusk you're a person, not a problem.`,`תיקנת משאבה, לימדת שיעור וקיבעת שבר. עם רדת החשכה כבר לא בעיה, אלא אדם.`,{humanity:4,meds:1,food:2}],
   lose:[`Your help isn't what they wanted.`,`העזרה שלך היא לא מה שרצו.`,{morale:-4}]}
 ]});
defEv({id:'c_uk_3',cond:inC('uk',4),w:16,
 t:['The Bridge Toll','אגרת הגשר'],
 x:[`The last bridge over the Thames has a barricade in the middle, manned by people in high-vis jackets. A sign says: TOLL, ONE TIN AND ONE STORY. Behind them, the far bank is quiet.`,`על הגשר האחרון מעל התמזה יש מחסום באמצע, מאויש באנשים בז׳קטים זוהרים. שלט אומר: אגרה, פחית אחת וסיפור אחד. מאחוריהם הגדה השנייה שקטה.`],
 ch:[
  {l:['Pay the toll and tell a story','לשלם ולספר סיפור'],s:['Make it a good one.','שיהיה טוב.'],check:{stat:'charisma',dc:8},
   win:[`Your story is a bad one, and they love it. A woman in a jacket offers you a plank across the water and a warning about the east side.`,`הסיפור שלך גרוע, והם מתים עליו. אישה בז׳קט מציעה לך קרש מעבר למים ואזהרה על הצד המזרחי.`,{morale:5,food:0,order:1}],
   lose:[`The story goes over badly.`,`הסיפור לא עובר טוב.`,{food:-1,morale:-4}]},
  {l:['Swim the tributary','לשחות בערוץ'],s:['Cold, quiet, and no toll.','קר, שקט, ובלי אגרה.'],check:{stat:'stamina',dc:10},
   win:[`Cold water, a long swim, and an ugly mud bank. On the far side, dry clothes in a dead man's suitcase.`,`מים קרים, שחייה ארוכה ושפת בוץ מכוערת. בצד השני בגדים יבשים במזוודה של מת.`,{morale:3,water:1}],
   lose:[`The current is stronger than it looked.`,`הזרם חזק ממה שנראה.`,{hp:-15,food:-1}]}
 ]});
defEv({id:'c_uk_4',cond:inC('uk',5),w:14,
 t:['Motorway Services','תחנת שירות בכביש המהיר'],
 x:[`A motorway service station has become a village: coach passengers turned into neighbors, a lorry driver turned mayor. The coffee shop is still open. The queue for the toilets is worse than the queue for the doctor.`,`תחנת שירות בכביש מהיר הפכה לכפר: נוסעי אוטובוס שהפכו לשכנים, נהג משאית שהפך לראש עיר. בית הקפה עדיין פתוח. התור לשירותים גרוע מהתור לרופא.`],
 ch:[
  {l:['Stay the night','להישאר ללילה'],s:['A bed, a rota, and a lot of questions.','מיטה, תורנות והרבה שאלות.'],check:{stat:'charisma',dc:8},
   win:[`You sleep on a coach seat and wake to porridge. The lorry driver asks if you'd take a message north.`,`ישנת על מושב אוטובוס והתעוררת לדייסה. נהג המשאית שואל אם אפשר להעביר הודעה צפונה.`,{hp:10,morale:8,food:2}],
   lose:[`You sleep badly, and somebody has been through your bag.`,`ישנת רע, ומישהו עבר בתיק שלך.`,{food:-2,morale:-4}]},
  {l:['Take supplies and go','לקחת אספקה וללכת'],s:['Nobody is watching the shop.','אף אחד לא שומר על החנות.'],check:{stat:'stealth',dc:9},
   win:[`Sandwiches, crisps, and a crate of bottled water. A security guard sleeps through it all.`,`כריכים, חטיפים וארגז מים. מאבטח ישן לאורך כל זה.`,{food:4,water:2,humanity:-4}],
   lose:[`A security guard, or what is left of one.`,`מאבטח, או מה שנשאר ממנו.`,{hp:-10,morale:-4}]}
 ]});
defEv({id:'c_uk_5',cond:inC('uk',6),w:14,
 t:['The Golf Club Bunker','בונקר מועדון הגולף'],
 x:[`A greenkeeper at the golf club has a Cold War bunker under the seventh hole. He will let you in for a price: something useful, something rare, or a good story. He is not joking about the story.`,`גנן במועדון הגולף מחזיק בונקר מתקופת המלחמה הקרה מתחת לגומה השביעית. הוא יכניס אותך תמורת מחיר: משהו שימושי, משהו נדיר, או סיפור טוב. הוא לא מתלוצץ לגבי הסיפור.`],
 ch:[
  {l:['Bargain for a place','להתמקח על מקום'],s:['He likes a good haggle.','הוא אוהב מיקוח טוב.'],check:{stat:'wits',dc:8},
   win:[`He takes three tins and a battery and lets you in. The bunker smells of gin and old concrete. It is the safest night you have had in years.`,`הוא לוקח שלושה שימורים וסוללה ומכניס אותך. הבונקר מסריח מג׳ין ובטון ישן. זה הלילה הבטוח ביותר בשנים.`,{hp:15,morale:8,food:-1}],
   lose:[`He counts the tins twice, then shakes his head.`,`הוא סופר את השימורים פעמיים ומנענע בראשו.`,{food:-2}]},
  {l:['Break in','לפרוץ פנימה'],s:['Locks are only suggestions.','מנעולים הם רק הצעות.'],check:{stat:'strength',dc:10},
   win:[`The lock gives after a lot of noise. Inside: a shelf of tins and a very surprised cat.`,`המנעול נכנע אחרי הרבה רעש. בפנים: מדף שימורים וחתול מופתע מאוד.`,{food:3,water:2,humanity:-3}],
   lose:[`The greenkeeper has a golf club, and a very good swing.`,`לגנן יש מקל גולף, ומכה מצוינת.`,{hp:-12,morale:-4}]}
 ]});

/* ===== Japan: order that is about to crack ===== */
defEv({id:'c_jp_1',cond:inC('japan',2),w:20,
 t:['The Vending Machines','המכונות האוטומטיות'],
 x:[`The power is off and the vending machines stand unlocked in rows like small lit shrines. Every drink is free. Someone has taped a note to the nearest one: TAKE ONLY WHAT YOU NEED. The note has been signed by at least forty people.`,`החשמל כבוי והמכונות האוטומטיות עומדות לא נעולות בשורות כמו מקדשים קטנים. כל שתייה חינם. מישהו הדביק פתק על הקרובה: קחו רק מה שצריך. הפתק חתום על ידי לפחות ארבעים איש.`],
 ch:[
  {l:['Take only what you need','לקחת רק מה שצריך'],s:['Honor is cheaper than a broken jaw.','כבוד זול יותר מלסת שבורה.'],check:{stat:'charisma',dc:7},
   win:[`You take two bottles and sign the note. A man at the next machine bows. It is the nicest thing to happen to you all week.`,`לקחת שני בקבוקים וחתמת על הפתק. אדם ליד המכונה הבאה משתחווה. זה הדבר הכי נחמד שקרה לך השבוע.`,{water:2,humanity:4,morale:5}],
   lose:[`You take two, and a stranger says you took three. It becomes a small argument, and then a large one.`,`לקחת שניים, וזר אומר שלקחת שלושה. זה הופך לוויכוח קטן, ואז לגדול.`,{morale:-4,humanity:-1}]},
  {l:['Empty the machines','לרוקן את המכונות'],s:['Nobody will stop you. That is the trouble.','אף אחד לא יעצור אותך. זו הבעיה.'],check:{stat:'stealth',dc:8},
   win:[`Twelve machines, five minutes, and a backpack full of tea, water and rice crackers. You do not read the note again.`,`שתים עשרה מכונות, חמש דקות ותרמיל מלא תה, מים ופריכיות אורז. לא קראת את הפתק שוב.`,{water:5,food:2,humanity:-8,order:-2}],
   lose:[`The note was signed by people who meant it.`,`הפתק נחתם על ידי אנשים שהתכוונו לזה.`,{hp:-8,morale:-5}]}
 ]});
defEv({id:'c_jp_2',cond:inC('japan',3),w:16,
 t:['House Rules','חוקי הבית'],
 x:[`The evacuation center has rules posted on every wall: lights out at nine, shoes off at the door, no food in the sleeping hall, no arguments before breakfast. A committee of retired men enforces them with terrifying politeness.`,`במרכז הפינוי חוקים תלויים על כל קיר: כיבוי אורות בתשע, נעליים בכניסה, בלי אוכל באולם השינה, בלי ריבים לפני ארוחת הבוקר. ועד של גמלאים אוכף אותם באדיבות מפחידה.`],
 ch:[
  {l:['Follow the rules to the letter','לפעול לפי החוקים במדויק'],s:['Order is the only thing that scales.','סדר הוא הדבר היחיד שגדל.'],check:{stat:'charisma',dc:7},
   win:[`By the third day you are on the cooking rota. The committee promotes you to "assistant." The soup improves.`,`ביום השלישי יש לך תורנות בישול. הוועד מקדם אותך ל"עוזר". המרק משתפר.`,{food:3,morale:6,order:3}],
   lose:[`You break rule fourteen by accident and spend the evening writing an apology.`,`הפרת חוק ארבעה עשר בטעות ובילית את הערב בכתיבת התנצלות.`,{morale:-3,food:-1}]},
  {l:['Break the curfew quietly','להפר את עוצר הלילה בשקט'],s:['A closed clinic is only a few streets away.','מרפאה סגורה נמצאת כמה רחובות משם.'],check:{stat:'stealth',dc:9},
   win:[`You slip out at two in the morning and are back before dawn with medicine from a shuttered clinic.`,`יצאת בשתיים בלילה וחזרת לפני עלות השחר עם תרופות ממרפאה סגורה.`,{meds:2,order:-1}],
   lose:[`The night watch catches you with your hand on the clinic door. Nobody shouts. That is worse.`,`שומר הלילה תופס אותך עם היד על דלת המרפאה. אף אחד לא צועק. זה גרוע יותר.`,{morale:-6,humanity:-2}]}
 ]});
defEv({id:'c_jp_3',cond:inC('japan',4),w:16,
 t:['The Stalled Train','הרכבת התקועה'],
 x:[`A bullet train stands motionless inside a mountain tunnel, its windows lit and dim. Passengers have been aboard for three days. A conductor at the tunnel mouth shouts through a megaphone that the doors won't open from the inside.`,`רכבת מהירה עומדת דוממת בתוך מנהרה בהר, חלונותיה מוארים וקלושים. הנוסעים על הסיפון שלושה ימים. מנהל רכבת בפי המנהרה צועק במגפון שהדלתות לא נפתחות מבפנים.`],
 ch:[
  {l:['Open the doors from outside','לפתוח את הדלתות מבחוץ'],s:['A crowbar, a jack, and nerve.','מנוף, ג׳ק ואומץ.'],check:{stat:'strength',dc:10,danger:true},
   win:[`It takes forty minutes. Two hundred people file out into the daylight, blinking, silent, grateful. They share what they have.`,`זה לוקח ארבעים דקות. מאתיים איש יוצאים לאור היום, ממצמצים, שקטים ואסירי תודה. הם חולקים את מה שיש להם.`,{humanity:10,morale:8,food:3,order:3}],
   lose:[`The train wasn't as empty of danger as the conductor believed.`,`הרכבת לא הייתה ריקה מסכנה כמו שמנהל הרכבת האמין.`,{hp:-18,inf:14}]},
  {l:['Search the empty front cars','לחפש בקרונות הקדמיים הריקים'],s:['Nobody is using them.','אף אחד לא משתמש בהם.'],check:{stat:'stealth',dc:8},
   win:[`Bento boxes, tea, and a briefcase of yen nobody will ever spend. You take the food.`,`קופסאות ארוחה, תה ומזוודת ין שאף אחד לא יבזבז. לקחת את האוכל.`,{food:3,water:2,humanity:-4}],
   lose:[`The front car isn't empty.`,`הקרון הקדמי לא ריק.`,{hp:-10,inf:6}]}
 ]});
defEv({id:'c_jp_4',cond:inC('japan',5),w:14,
 t:['The Shrine Keeper','שומר המקדש'],
 x:[`At the top of a hundred stone steps, an old shrine keeper sweeps the same leaf off the same stone. He says the dead do not climb the steps. He says they have tried. You may stay, if you carry water and ask for nothing.`,`בראש מאה מדרגות אבן שומר מקדש זקן מטאטא את אותו עלה מאותה אבן. הוא אומר שהמתים לא מטפסים במדרגות. הוא אומר שהם ניסו. אפשר להישאר, אם נושאים מים ולא מבקשים דבר.`],
 ch:[
  {l:['Stay and carry water','להישאר ולשאת מים'],s:['A week of steps, buckets, and silence.','שבוע של מדרגות, דליים ושקט.'],check:{stat:'stamina',dc:8},
   win:[`The keeper never speaks except to say when you have done enough. You leave lighter than you came.`,`השומר לא מדבר אלא כדי לומר מתי עשית מספיק. עזבת קל יותר ממה שבאת.`,{hp:15,morale:10,humanity:4,order:1}],
   lose:[`The steps are steeper than they look, and the water is heavier.`,`המדרגות תלולות ממה שנראה, והמים כבדים יותר.`,{hp:-8,morale:-3}]},
  {l:['Ask what he knows','לשאול מה הוא יודע'],s:['Old men see a great deal from the top.','זקנים רואים הרבה מלמעלה.'],check:{stat:'wits',dc:9},
   win:[`He tells you, slowly, where the trains still run and where the sea route begins. It is the best map you have had.`,`הוא מספר, לאט, איפה הרכבות עוד נוסעות ואיפה מתחיל נתיב הים. זו המפה הכי טובה שהייתה לך.`,{morale:4,flag:'map'}],
   lose:[`He looks at you for a long time and says only, "the dead do not climb." You don't know what he means.`,`הוא מסתכל עליך זמן רב ואומר רק, "המתים לא מטפסים." לא ברור מה הוא מתכוון.`,{morale:-2}]}
 ]});
defEv({id:'c_jp_5',cond:inC('japan',6),w:14,
 t:['Typhoon Warning','אזהרת טייפון'],
 x:[`The sirens are for a typhoon, and the typhoon is real. So is the outbreak. The flood barriers will close at midnight. The tide, and everything walking in it, is rising.`,`הסירנות הן בגלל טייפון, והטייפון אמיתי. כמו המגפה. מחסומי ההצפה ייסגרו בחצות. הגאות, וכל מה שהולך בה, עולה.`],
 ch:[
  {l:['Shelter in the barrier control room','להסתתר בחדר הבקרה של המחסום'],s:['Concrete, a generator, and one door.','בטון, גנרטור ודלת אחת.'],check:{stat:'wits',dc:9},
   win:[`You weather the storm in a windowless room with a technician and a rice cooker. By morning the water has drawn back, and so has everything in it.`,`עברת את הסערה בחדר בלי חלונות עם טכנאי ומכשיר אורז. עד הבוקר המים נסוגו, וגם כל מה שהיה בהם.`,{hp:10,morale:5,food:1}],
   lose:[`The technician isn't the only one with the same idea.`,`הטכנאי הוא לא היחיד עם אותו רעיון.`,{hp:-12,inf:8}]},
  {l:['Cross the barrier before it closes','לחצות את המחסום לפני שנסגר'],s:['Twenty minutes and a lot of wind.','עשרים דקות והרבה רוח.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`You cross with rain in your teeth and the barrier grinding shut behind you. The other side is empty and clean.`,`חצית עם גשם בשיניים והמחסום נסגר בחריקה מאחוריך. הצד השני ריק ונקי.`,{morale:6,outbreak:-1}],
   lose:[`The barrier closes early.`,`המחסום נסגר מוקדם.`,{hp:-16,food:-2}]}
 ]});

/* ===== Canada: cold, quiet, and a border everyone is watching ===== */
defEv({id:'c_ca_1',cond:inC('canada',2),w:20,
 t:['The Ice Road','דרך הקרח'],
 x:[`The lake is frozen wide enough to save three days of walking. A local with a sled and two dogs tests the ice with a pole every ten steps. He will take a passenger, for a share of whatever you carry.`,`האגם קפוא ברוחב שחוסך שלושה ימי הליכה. מקומי עם מזחלת ושני כלבים בודק את הקרח במוט כל עשרה צעדים. הוא ייקח נוסע, תמורת חלק ממה שנושאים.`],
 ch:[
  {l:['Hire the guide','לשכור את המדריך'],s:['He knows this ice.','הוא מכיר את הקרח הזה.'],check:{stat:'charisma',dc:8},
   win:[`The ice sings under the runners. He doesn't say a word for six hours. When he does, it's to say that the dead are afraid of ice.`,`הקרח שר מתחת למגלשים. הוא לא אומר מילה שש שעות. כשהוא מדבר, הוא אומר שהמתים מפחדים מקרח.`,{morale:6,food:1}],
   lose:[`He wants your pack for the ride, and takes it.`,`הוא רוצה את התרמיל שלך בשביל הנסיעה, ולוקח אותו.`,{food:-2,ammo:-1}]},
  {l:['Cross alone','לחצות לבד'],s:['Don\'t look down.','לא להסתכל למטה.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`You feel the ice flex under every step and never look down.`,`הרגשת את הקרח מתכופף תחת כל צעד ולא הסתכלת מטה.`,{morale:4,flag:'map'}],
   lose:[`The ice doesn't hold.`,`הקרח לא מחזיק.`,{hp:-20,food:-2}]}
 ]});
defEv({id:'c_ca_2',cond:inC('canada',3),w:16,
 t:['The Hockey Rink','מגרש ההוקי'],
 x:[`The town rink has been turned into a shelter: cots on the ice, a Zamboni running as a generator. Every night at eight there is a scrimmage, and the whole town shows up to watch.`,`מגרש ההוקי של העיר הפך למקלט: מיטות על הקרח וזמבוני שעובד כגנרטור. בכל ערב בשמונה יש משחק אימון, וכל העיר מגיעה לצפות.`],
 ch:[
  {l:['Play in the scrimmage','לשחק במשחק'],s:['A hit into the boards, and a whole town cheering.','מכה לגדר, ועיר שלמה מריעה.'],check:{stat:'stamina',dc:8},
   win:[`You take a hit into the boards and a pass from a nine-year-old, and score in the last minute. It is the best night of the winter.`,`קיבלת מכה לגדר ומסירה מילדה בת תשע, והבקעת בדקה האחרונה. זה הלילה הכי טוב של החורף.`,{morale:12,humanity:3,order:2}],
   lose:[`You slip on the ice and don't get up quickly.`,`החלקת על הקרח ולא קמת מהר.`,{hp:-8,morale:-2}]},
  {l:['Work the door','לעבוד בכניסה'],s:['Check every cough.','לבדוק כל שיעול.'],check:{stat:'stealth',dc:8},
   win:[`You spot two coughers at the door and catch them before the game. The town isn't sure whether to thank you.`,`זיהית שני משתעלים בכניסה ותפסת אותם לפני המשחק. העיר לא בטוחה אם להודות לך.`,{outbreak:-2,order:2,humanity:-2}],
   lose:[`The one you didn't catch is faster.`,`זה שלא תפסת מהיר יותר.`,{hp:-12,inf:10}]}
 ]});
defEv({id:'c_ca_3',cond:inC('canada',4),w:16,
 t:['The Logging Road','דרך העצים'],
 x:[`A logging crew has blocked the gravel road with a pickup and two trucks. They don't want money: they want a fourth for a card game and someone to keep the fire going. The alternative is thirty kilometers around.`,`צוות כורתי עצים חסם את דרך העפר עם טנדר ושתי משאיות. הם לא רוצים כסף: הם רוצים רביעי למשחק קלפים ומישהו שישמור על האש. האלטרנטיבה היא שלושים קילומטר עקיפה.`],
 ch:[
  {l:['Play cards with them','לשחק איתם קלפים'],s:['Lose forty hands, win the one that matters.','להפסיד ארבעים ידיים, לנצח את החשובה.'],check:{stat:'charisma',dc:8},
   win:[`You lose forty hands and win the one that matters. They break out the bear stew and wave you through in the morning.`,`הפסדת ארבעים ידיים וניצחת את החשובה. הם מוציאים תבשיל דוב ומאפשרים לך לעבור בבוקר.`,{food:3,morale:6,hp:5}],
   lose:[`They cheat, and you lose more than you should.`,`הם מרמים, וההפסד גדול ממה שצריך.`,{food:-2,morale:-4}]},
  {l:['Go around','לעקוף'],s:['Thirty kilometers of frost.','שלושים קילומטר של כפור.'],check:{stat:'stamina',dc:9},
   win:[`Thirty kilometers of frost. Nobody follows you, and the road is empty.`,`שלושים קילומטר של כפור. אף אחד לא עוקב, והדרך ריקה.`,{morale:2,hp:0}],
   lose:[`Thirty kilometers is longer than it sounds.`,`שלושים קילומטר ארוכים ממה שנשמע.`,{hp:-10,food:-1}]}
 ]});
defEv({id:'c_ca_4',cond:inC('canada',5),w:14,
 t:['The Trapper\'s Cabin','בקתת הצייד'],
 x:[`Smoke rises from a cabin far off the road. A trapper in a wolfskin hat says it's his and he isn't moving. He has a dog, a rifle, and a shelf of medicine he isn't sure he needs. He'd like to talk to someone who isn't himself.`,`עשן עולה מבקתה הרחק מהדרך. צייד בכובע עור זאב אומר שהיא שלו ושהוא לא זז. יש לו כלב, רובה ומדף תרופות שאינו בטוח שהוא צריך. הוא רוצה לדבר עם מישהו שהוא לא עצמו.`],
 ch:[
  {l:['Stay the night and listen','להישאר ללילה ולהקשיב'],s:['A man talks about wolves for six hours.','אדם מדבר על זאבים שש שעות.'],check:{stat:'charisma',dc:8},
   win:[`You listen to a man talk about wolves for six hours. He gives you two bottles of tincture and a hard-boiled egg.`,`הקשבת לאדם מדבר על זאבים שש שעות. הוא נותן לך שני בקבוקי תמיסה וביצה קשה.`,{meds:2,morale:6}],
   lose:[`He talks about his dead wife until dawn.`,`הוא מדבר על אשתו המתה עד עלות השחר.`,{morale:-5}]},
  {l:['Trade for medicine','לסחור על תרופות'],s:['He drives a hard bargain.','הוא מתמקח קשה.'],check:{stat:'wits',dc:9},
   win:[`He drives a hard bargain and takes your spare ammo, but the tincture is real.`,`הוא מתמקח קשה ולוקח את התחמושת הרזרבית, אבל התמיסה אמיתית.`,{meds:2,ammo:-1}],
   lose:[`The medicine is moonshine.`,`התרופה היא תוצרת בית.`,{hp:-4,morale:-3}]}
 ]});
defEv({id:'c_ca_5',cond:inC('canada',6),w:14,
 t:['Northern Lights','זוהר צפוני'],
 x:[`The sky over the border is green tonight, rippling like flags. Someone in town says the radio picks up more signals when the aurora is out. A broadcast in a language you can't place loops on every band.`,`השמיים מעל הגבול ירוקים הלילה, מתנפנפים כמו דגלים. מישהו בעיר אומר שהרדיו קולט יותר אותות כשהזוהר בחוץ. שידור בשפה שלא ניתן לזהות חוזר בלולאה בכל תדר.`],
 ch:[
  {l:['Try to decode the broadcast','לנסות לפענח את השידור'],s:['A repeating pattern, if you listen.','דפוס חוזר, אם מקשיבים.'],check:{stat:'wits',dc:10},
   win:[`It is a repeating grid reference in three languages. Someone in town says it points to a depot in the mountains.`,`זו הפניה חוזרת למשבצת במפה בשלוש שפות. מישהו בעיר אומר שהיא מצביעה על מחסן בהרים.`,{flag:'map',morale:5}],
   lose:[`It is static. Everything is static.`,`זה רעש סטטי. הכול סטטי.`,{morale:-4}]},
  {l:['Watch the lights instead','לצפות בזוהר במקום'],s:['Sometimes you just need to look up.','לפעמים צריך פשוט להסתכל למעלה.'],check:{stat:'stealth',dc:7},
   win:[`You sit on the roof of a truck and watch the sky move. It is the first time in weeks you feel small.`,`ישבת על גג משאית וצפית בשמיים זזים. זו הפעם הראשונה בשבועות שהרגשת קטן.`,{morale:10,hp:5}],
   lose:[`The dead see the lights too. They look up.`,`המתים רואים את האורות גם. הם מרימים מבט.`,{hp:-10,inf:8}]}
 ]});

/* ===== Israel: the first patient, the safe room, the neighborhood ===== */
defEv({id:'c_il_1',cond:inC('israel',2),w:20,
 t:['The Shelter Door','דלת המקלט'],
 x:[`Somebody is knocking on the steel door of the building's shelter. It is a neighbor from the fourth floor, a quiet man who always kept to himself, and his wife is coughing behind him. Upstairs, the stairwell is quiet. Too quiet.`,`מישהו דופק על דלת הפלדה של המקלט בבניין. זה שכן מהקומה הרביעית, אדם שקט שתמיד שמר על עצמו, ואשתו משתעלת מאחוריו. למעלה חדר המדרגות שקט. שקט מדי.`],
 ch:[
  {l:['Let them in','להכניס אותם'],s:['They are neighbors. This is what the door is for.','הם שכנים. בשביל זה הדלת.'],check:{stat:'charisma',dc:9},
   win:[`The wife's cough is asthma. The man cries into his hands. He spends the rest of the week cutting bread for everyone.`,`השיעול של האישה הוא אסתמה. האיש בוכה לתוך כפות ידיו. הוא מבלה את שאר השבוע בחיתוך לחם לכולם.`,{humanity:8,morale:5,food:1,order:2}],
   lose:[`Her cough isn't asthma.`,`השיעול שלה הוא לא אסתמה.`,{inf:15,hp:-10,morale:-6,outbreak:2}]},
  {l:['Check them through the door first','לבדוק אותם דרך הדלת קודם'],s:['Trust, but see their eyes.','לסמוך, אבל לראות את העיניים.'],check:{stat:'wits',dc:8},
   win:[`You get them to show you their arms and their eyes through the peephole. It is clean, a little insulting, and they are grateful anyway.`,`הם מראים את הידיים והעיניים דרך העינית. זה נקי, קצת מעליב, והם אסירי תודה בכל זאת.`,{humanity:3,morale:3,food:1}],
   lose:[`You spend twenty minutes arguing through a door, and by the end nobody trusts anyone.`,`בילית עשרים דקות בוויכוח דרך דלת, ובסוף אף אחד לא סומך על אף אחד.`,{morale:-6,order:-2}]}
 ]});
defEv({id:'c_il_2',cond:inC('israel',3,()=>G.w.order>=30),w:16,
 t:['The Market','השוק'],
 x:[`The market still opens at dawn. A spice seller is hawking cumin like it's a normal Thursday. Behind the stall, the butcher has a hand-drawn map with red pins where the sick have been seen. He'll trade it for a favor.`,`השוק עדיין נפתח עם עלות השחר. מוכר תבלינים קורא לקנות כמון כאילו זה יום חמישי רגיל. מאחורי הדוכן לקצב יש מפה משורטטת ביד עם סיכות אדומות איפה נראו חולים. הוא יחליף אותה בטובה.`],
 ch:[
  {l:['Buy the map with a favor','לקנות את המפה בטובה'],s:['Carry a crate of eggs to his brother.','להעביר ארגז ביצים לאחיו.'],check:{stat:'charisma',dc:8},
   win:[`The favor is small: carry a crate of eggs to his brother's stall. The map is accurate. It changes your route for a week.`,`הטובה קטנה: להעביר ארגז ביצים לדוכן של אחיו. המפה מדויקת. היא משנה את המסלול שלך לשבוע.`,{flag:'map',food:2,morale:3}],
   lose:[`His brother's stall is empty, and so is the crate.`,`הדוכן של אחיו ריק, וכך גם הארגז.`,{food:-1,morale:-3}]},
  {l:['Steal the map','לגנוב את המפה'],s:['Quick fingers, guilty conscience.','אצבעות מהירות, מצפון אשם.'],check:{stat:'stealth',dc:9},
   win:[`It slides into your sleeve while the butcher bargains over a chicken. He never looks up.`,`היא מחליקה לשרוול בזמן שהקצב מתמקח על עוף. הוא לא מרים מבט.`,{flag:'map',humanity:-4}],
   lose:[`The butcher's cleaver is closer than you thought.`,`המסור של הקצב קרוב ממה שחשבת.`,{hp:-10,humanity:-3}]}
 ]});
defEv({id:'c_il_3',cond:inC('israel',4),w:16,
 t:['The Kibbutz Gate','שער הקיבוץ'],
 x:[`A kibbutz has closed its fence: cow sheds, orchards, a swimming pool full of water and lemons. A committee at the gate asks for a skill and a vote. A hundred and twelve people, and a lot of goats.`,`קיבוץ סגר את הגדר: רפתות, פרדסים ובריכה מלאה מים ולימונים. ועדה בשער מבקשת מיומנות והצבעה. מאה ושתים עשרה נפשות, והרבה עיזים.`],
 ch:[
  {l:['Ask to join for the harvest','לבקש להצטרף לקטיף'],s:['A vote and an honest day\'s work.','הצבעה ויום עבודה הגון.'],check:{stat:'charisma',dc:9},
   win:[`You pick lemons, feed goats, and are voted onto the third-shift kitchen committee. You leave with a crate of oranges and a very good story.`,`קטפת לימונים, האכלת עיזים, והצביעו עבורך לוועדת המטבח של המשמרת השלישית. עזבת עם ארגז תפוזים וסיפור מצוין.`,{food:4,water:2,morale:8,order:2}],
   lose:[`The vote is fifty-one to sixty-one.`,`ההצבעה חמישים ואחד מול שישים ואחד.`,{morale:-5}]},
  {l:['Offer to guard the fence','להציע לשמור על הגדר'],s:['Someone has to walk the perimeter.','מישהו צריך ללכת את הגדר.'],check:{stat:'strength',dc:9},
   win:[`You take the dawn shift. By sunrise the perimeter is quiet, the goats are calm, and somebody has left a thermos of coffee.`,`לקחת את משמרת השחר. עם הזריחה ההיקף שקט, העיזים רגועות, ומישהו השאיר תרמוס קפה.`,{food:3,ammo:1,morale:5}],
   lose:[`Something goes over the fence at three, and it isn't a goat.`,`משהו קופץ מעל הגדר בשלוש, והוא לא עז.`,{hp:-14,inf:12}]}
 ]});
defEv({id:'c_il_4',cond:inC('israel',5),w:14,
 t:['The Coastal Road','כביש החוף'],
 x:[`The coastal road has been closed by the army. A checkpoint stops everything, even bicycles. A young soldier, no older than twenty, guards it alone, and looks like he hasn't slept in days. He asks for ID, and his hand shakes.`,`הצבא סגר את כביש החוף. מחסום עוצר הכול, אפילו אופניים. חייל צעיר, לא יותר מעשרים, שומר עליו לבד ונראה כמי שלא ישן ימים. הוא מבקש תעודה, ויד רועדת.`],
 ch:[
  {l:['Calm the soldier','להרגיע את החייל'],s:['Talk about football, his mother, the sea.','לדבר על כדורגל, על אמא שלו, על הים.'],check:{stat:'charisma',dc:8},
   win:[`You talk about football, his mother, the sea. He lowers the rifle and lets you through, and asks you to tell someone he did well.`,`דיברת על כדורגל, על אמא שלו, על הים. הוא מוריד את הרובה ומאפשר לך לעבור, ומבקש שתספר למישהו שהוא עשה טוב.`,{morale:5,humanity:4,order:1}],
   lose:[`He panics.`,`הוא נכנס לפאניקה.`,{hp:-12,morale:-4}]},
  {l:['Slip around through the dunes','לעקוף דרך הדיונות'],s:['Sand, wind, and no witnesses.','חול, רוח ובלי עדים.'],check:{stat:'stealth',dc:9,danger:true},
   win:[`An hour of sand in your shoes and no one the wiser.`,`שעה של חול בנעליים ואף אחד לא יודע.`,{morale:2}],
   lose:[`The dunes are not as empty as they look.`,`הדיונות לא ריקות כמו שנראה.`,{hp:-14,inf:10}]}
 ]});
defEv({id:'c_il_5',cond:inC('israel',6),w:14,
 t:['The Rooftop Night','לילה על הגגות'],
 x:[`The whole neighborhood is on the rooftops tonight, because it's the only place with air. Someone brought a guitar. An old woman brought a pot of soup. Below, the street is quiet, and someone stands in the middle of it, looking up.`,`כל השכונה על הגגות הלילה, כי זה המקום היחיד עם אוויר. מישהו הביא גיטרה. סבתא הביאה סיר מרק. למטה הרחוב שקט, ומישהו עומד באמצעו ומסתכל למעלה.`],
 ch:[
  {l:['Join the singing','להצטרף לשירה'],s:['Two hundred voices, one guitar.','מאתיים קולות, גיטרה אחת.'],check:{stat:'charisma',dc:7},
   win:[`Two hundred voices, one guitar, and a soup that tastes like your grandmother's. Even the figure in the street stops to listen.`,`מאתיים קולות, גיטרה אחת ומרק בטעם של סבתא. אפילו הדמות ברחוב עוצרת להקשיב.`,{morale:12,humanity:4}],
   lose:[`Somebody's voice cracks and the figure in the street starts to scream. Everyone freezes.`,`קולו של מישהו נסדק והדמות ברחוב מתחילה לצרוח. כולם קופאים.`,{morale:-4,outbreak:2}]},
  {l:['Watch the street','לשמור על הרחוב'],s:['Someone has to keep an eye out.','מישהו צריך לפקוח עין.'],check:{stat:'stealth',dc:8},
   win:[`You track the figure to a doorway and warn the neighbors. Nobody thanks you. They just lock the door.`,`עקבת אחרי הדמות עד פתח ואזהרת את השכנים. אף אחד לא מודה לך. הם רק נועלים את הדלת.`,{order:3,humanity:-1}],
   lose:[`You look away for one second.`,`הסתכלת הצידה לשנייה אחת.`,{hp:-10,inf:8}]}
 ]});

/* ===== Australia: it has only just begun ===== */
defEv({id:'c_au_1',cond:inC('australia',2,()=>G.w.outbreak<40),w:20,
 t:['The Beach Barbecue','ברביקיו בחוף'],
 x:[`It's a Saturday, and the whole street is having a barbecue on the beach. The sausages are burning. The news is on someone's phone and nobody is listening. A neighbor hands you a beer and says you look like you've seen a ghost.`,`זה שבת, וכל הרחוב עושה ברביקיו בחוף. הנקניקיות נשרפות. החדשות בטלפון של מישהו ואף אחד לא מקשיב. שכן נותן לך בירה ואומר שנראה כאילו ראית רוח רפאים.`],
 ch:[
  {l:['Enjoy the last normal day','ליהנות מהיום הרגיל האחרון'],s:['Sunscreen, sausages, kids in the shallows.','קרם הגנה, נקניקיות, ילדים במים הרדודים.'],check:{stat:'charisma',dc:6},
   win:[`It's the best afternoon of the year, and you know it. Sunburn, sunscreen, and kids in the shallows. You will remember this in the winter.`,`זה אחר הצהריים הכי טוב של השנה, ואת זה יודעים. כוויות שמש, קרם הגנה וילדים במים הרדודים. זה יזכר בחורף.`,{morale:12,humanity:3,food:2}],
   lose:[`You spend the day looking over your shoulder, and someone notices.`,`בילית את היום מסתכל לאחור, ומישהו שם לב.`,{morale:-3}]},
  {l:['Use the day to prepare','לנצל את היום להתכונן'],s:['While everyone is on the sand.','בזמן שכולם על החול.'],check:{stat:'wits',dc:8},
   win:[`While everyone's on the sand, you empty three pantries and fill two cars. Nobody notices until Monday.`,`בזמן שכולם על החול, ריקנת שלושה מזווים ומילאת שתי מכוניות. אף אחד לא שם לב עד יום שני.`,{food:4,water:3,humanity:-3,order:-2}],
   lose:[`A lifeguard spots you.`,`מציל רואה אותך.`,{morale:-4,humanity:-1}]}
 ]});
defEv({id:'c_au_2',cond:inC('australia',3),w:16,
 t:['The Roadhouse','בית הדרכים'],
 x:[`Two hundred kilometers of red dirt and a single lit sign: ROADHOUSE — DIESEL, PIES, COLD BEER. The owner, a sunburnt woman named Deb, has a radio on the counter and an opinion on everything.`,`מאתיים קילומטר של אדמה אדומה ושלט מואר אחד: בית דרכים, סולר, פשטידות, בירה קרה. הבעלים, אישה שזופה בשם דב, מחזיקה רדיו על הדלפק ודעה על הכול.`],
 ch:[
  {l:['Trade news for a pie','להחליף חדשות בפשטידה'],s:['Deb knows more than the news does.','דב יודעת יותר מהחדשות.'],check:{stat:'wits',dc:7},
   win:[`Deb knows more than the news does: the truckers say the outbreak has reached Perth. You leave with pies, a map, and the feeling that you aren't the only one on the road.`,`דב יודעת יותר מהחדשות: הנהגים אומרים שהמגפה הגיעה לפרת׳. עזבת עם פשטידות, מפה ותחושה שלא לבד בדרך.`,{food:3,morale:5,flag:'map'}],
   lose:[`Deb doesn't like your news.`,`דב לא אוהבת את החדשות שלך.`,{morale:-3,food:-1}]},
  {l:['Ask for a lift north','לבקש טרמפ צפונה'],s:['Someone is always heading north.','תמיד מישהו נוסע צפונה.'],check:{stat:'charisma',dc:9},
   win:[`A trucker named Col is going north. He says he'll take you if you can stand the country music. You can.`,`נהג משאית בשם קול נוסע צפונה. הוא אומר שייקח אותך אם אפשר לסבול מוזיקת קאנטרי. אפשר.`,{food:2,flag:'car',morale:5}],
   lose:[`He takes one look at you and shakes his head.`,`הוא מסתכל עליך פעם אחת ומנענע בראשו.`,{morale:-4}]}
 ]});
defEv({id:'c_au_3',cond:inC('australia',4),w:16,
 t:['Bushfire','שריפת קוצים'],
 x:[`The sky is orange in the west, and the smoke is thick enough to taste. The fire is moving faster than the dead. A fire truck is stopped on the road, its crew arguing about whether to run.`,`השמיים כתומים במערב, והעשן סמיך מספיק כדי לטעום. האש נעה מהר יותר מהמתים. כבאית עצרה בדרך, וצוותה מתווכח אם לברוח.`],
 ch:[
  {l:['Help the crew cut a firebreak','לעזור לצוות לחתוך קו חיץ'],s:['Six hours of axe and flame.','שש שעות של גרזן ולהבה.'],check:{stat:'strength',dc:10,bg:{firefighter:3}},
   win:[`You cut and burn for six hours. When it's over you are black to the elbows and a hundred houses are still standing.`,`חתכת ובערת שש שעות. כשזה נגמר, המרפקים שחורים ומאה בתים עדיין עומדים.`,{humanity:8,morale:6,order:3}],
   lose:[`The wind shifts.`,`הרוח משתנה.`,{hp:-16,morale:-4}]},
  {l:['Run with the animals','לברוח עם החיות'],s:['Kangaroos know the way out.','הקנגרואים יודעים את הדרך החוצה.'],check:{stat:'stamina',dc:9},
   win:[`Kangaroos, sheep, and a very confused emu. You run in their tracks, and the dead do not.`,`קנגרואים, כבשים ותנשמת מבולבלת מאוד. רצת בעקבותיהם, והמתים לא.`,{morale:3}],
   lose:[`You are slower than a sheep.`,`כבשה מהירה יותר.`,{hp:-12,inf:6}]}
 ]});
defEv({id:'c_au_4',cond:inC('australia',4),w:16,
 t:['The Ferry','המעבורת'],
 x:[`A Sydney ferry drifts at the mouth of the harbor with its engines off. Someone on the upper deck is signalling with a torch: three short, three long, three short. The passengers have been aboard for days.`,`מעבורת סידני נסחפת בפי הנמל עם מנועים כבויים. מישהו על הסיפון העליון מאותת בפנס: שלוש קצרות, שלוש ארוכות, שלוש קצרות. הנוסעים על הסיפון ימים.`],
 ch:[
  {l:['Row out to the ferry','לחתור אל המעבורת'],s:['An hour of blisters.','שעה של יבלות.'],check:{stat:'stamina',dc:9},
   win:[`It takes an hour and blisters. Aboard: sixty passengers, a chef, and a working galley.`,`זה לוקח שעה ויבלות. על הסיפון: שישים נוסעים, שף ומטבח עובד.`,{food:4,water:3,humanity:6}],
   lose:[`The ferry isn't what it seems.`,`המעבורת היא לא מה שנראה.`,{hp:-14,inf:12}]},
  {l:['Signal back and wait','לאותת בחזרה ולחכות'],s:['Help comes if you are patient.','עזרה מגיעה אם סבלניים.'],check:{stat:'wits',dc:7},
   win:[`A coast guard cutter turns up an hour later and takes the passengers off. The captain gives you a bag of supplies for your trouble.`,`סירת משמר החופים מגיעה שעה אחר כך ומורידה את הנוסעים. הקפטן נותן לך שקית אספקה בשביל הטרחה.`,{food:3,order:3}],
   lose:[`Nobody comes.`,`אף אחד לא בא.`,{morale:-5}]}
 ]});
defEv({id:'c_au_5',cond:inC('australia',5,()=>G.w.order>=45),w:16,
 t:['The Flying Doctor','הרופא המעופף'],
 x:[`A single-engine plane circles the town twice, then lands on the main street. A pilot in a hat gets out and asks for whoever's in charge. Nobody is. She says she's carrying antibiotics, and she's looking for someone to distribute them.`,`מטוס חד־מנועי מקיף את העיירה פעמיים ונוחת ברחוב הראשי. טייסת בכובע יוצאת ושואלת מי אחראי. אף אחד. היא אומרת שהיא נושאת אנטיביוטיקה ומחפשת מי שיחלק אותה.`],
 ch:[
  {l:['Take charge of the distribution','לקחת אחריות על החלוקה'],s:['Lists, lines, and fairness.','רשימות, תורים והגינות.'],check:{stat:'charisma',dc:9},
   win:[`Two hours of lists and lines, and every family gets a dose. The pilot shakes your hand and says she'll be back next month.`,`שעתיים של רשימות ותורים, וכל משפחה מקבלת מנה. הטייסת לוחצת את ידך ואומרת שתחזור בחודש הבא.`,{meds:2,order:4,humanity:6,morale:6}],
   lose:[`The line breaks up, and the supplies vanish.`,`התור מתפרק, והאספקה נעלמת.`,{morale:-6,order:-3}]},
  {l:['Take a share and go','לקחת חלק וללכת'],s:['A crate goes missing. It happens.','ארגז נעלם. זה קורה.'],check:{stat:'stealth',dc:8},
   win:[`A crate slides off the back of the plane and into your pack. Nobody counts twice.`,`ארגז מחליק מהחלק האחורי של המטוס אל התרמיל שלך. אף אחד לא סופר פעמיים.`,{meds:3,humanity:-8}],
   lose:[`The pilot sees you.`,`הטייסת רואה אותך.`,{hp:-10,humanity:-4}]}
 ]});
