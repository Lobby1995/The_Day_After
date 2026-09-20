
/* ---------- echoes: earlier choices come back ---------- */
const since=(f,d)=>!!G.flags[f]&&G.w.day>=((G.fday&&G.fday[f])||0)+T(d);

defEv({id:'echo_barricaded',cond:()=>since('barricaded',5),w:22,
 t:['The Woman in 3B','האישה מדירה 3ב'],
 x:[`Weeks ago you moved a couch against a door and didn't answer the knocking. Tonight a woman from apartment 3B stands in front of you, hollow-eyed, holding a child's shoe. She doesn't ask for anything. She only says: I heard you.`,`לפני שבועות הזזת ספה מול דלת ולא ענית לדפיקות. הלילה אישה מדירה 3ב עומדת מולך, חלולת עיניים, מחזיקה נעל של ילד. היא לא מבקשת דבר. היא רק אומרת: שמעתי אותך.`],
 ch:[
  {l:['Give her food and an apology','לתת לה אוכל והתנצלות'],s:['It is late, and it counts.','זה מאוחר, וזה נחשב.'],check:{stat:'charisma',dc:8},
   win:[`She takes the food and the apology and sits down heavily beside you. It is not forgiveness. It is the start of something.`,`היא לוקחת את האוכל ואת ההתנצלות ויושבת בכבדות לידך. זו לא סליחה. זו התחלה של משהו.`,{humanity:8,morale:4}],
   lose:[`She takes the food, says nothing, and leaves.`,`היא לוקחת את האוכל, לא אומרת דבר, ועוזבת.`,{food:-2,humanity:2,morale:-4}]},
  {l:['Say you did what you had to','להגיד שעשית מה שהיה צריך'],s:['True enough, and not enough.','נכון מספיק, ולא מספיק.'],check:{stat:'charisma',dc:9},
   win:[`She nods. Neither of you believes it. She walks off into the night, and nobody follows.`,`היא מהנהנת. אף אחד מכם לא מאמין לזה. היא הולכת אל הלילה, ואיש לא עוקב.`,{morale:1,humanity:-4}],
   lose:[`She throws the shoe at you. It doesn't hurt. That is the worst part.`,`היא זורקת עליך את הנעל. זה לא כואב. זה החלק הכי גרוע.`,{morale:-8,humanity:-2}]}
 ]});
defEv({id:'echo_sealed',cond:()=>since('sealed',5),w:22,
 t:['The Neighbors Upstairs','השכנים מלמעלה'],
 x:[`The people from upstairs, the ones you never warned when you sealed the door, arrive at your gate. There are fewer of them than you remember. The oldest speaks first.`,`האנשים מלמעלה, אלה שלא הזהרת כשנעלת את הדלת, מגיעים לשער שלך. יש פחות מהם ממה שזכור. המבוגר ביותר מדבר ראשון.`],
 ch:[
  {l:['Take them in','לקבל אותם'],s:['A hard winter for everyone.','חורף קשה לכולם.'],check:{stat:'charisma',dc:8},cost:{food:2},
   win:[`They bring blankets, a radio, and a story about the stairwell that keeps you up all night.`,`הם מביאים שמיכות, רדיו וסיפור על חדר המדרגות שמשאיר אותך ער כל הלילה.`,{humanity:8,morale:5,order:2}],
   lose:[`One of them is coughing, and you knew it.`,`אחד מהם משתעל, ואת זה ידעת.`,{inf:10,morale:-4}]},
  {l:['Turn them away','לשלוח אותם'],s:['Same door, different night.','אותה דלת, לילה אחר.'],check:{stat:'charisma',dc:10},
   win:[`They go without a word. You will never learn where.`,`הם הולכים בלי מילה. לעולם לא יידע לאן.`,{humanity:-8,morale:-6}],
   lose:[`They don't go. They camp outside, and every night the fire gets closer.`,`הם לא הולכים. הם חונים בחוץ, ובכל לילה האש מתקרבת.`,{hp:-6,morale:-8,outbreak:2}]}
 ]});
defEv({id:'echo_waited',cond:()=>since('waited',5),w:22,
 t:['The Soldier Who Waited','החייל שחיכה'],
 x:[`A soldier in a torn uniform sits by your fire. He says he was at the cordon the day you waited for the government. He says nobody had orders, and that he has been thinking about it ever since.`,`חייל במדים קרועים יושב ליד האש שלך. הוא אומר שהיה במחסום ביום שחיכית לממשלה. הוא אומר שלאף אחד לא הייתה פקודה, ושהוא חושב על זה מאז.`],
 ch:[
  {l:['Share your rations','לחלוק את המנות'],s:['He looks like he needs them.','הוא נראה כמי שצריך אותן.'],check:{stat:'charisma',dc:8},cost:{food:1},
   win:[`He tells you where the cordon's supply depot was, and what is left in it.`,`הוא מספר איפה היה מחסן האספקה של המחסום, ומה נשאר בו.`,{food:3,ammo:2,humanity:3}],
   lose:[`He eats, thanks you, and takes your boots while you sleep.`,`הוא אוכל, מודה לך, ולוקח את הנעליים בזמן שישנים.`,{food:-1,morale:-5,hp:-4}]},
  {l:['Ask what he knows','לשאול מה הוא יודע'],s:['A soldier remembers routes.','חייל זוכר מסלולים.'],check:{stat:'wits',dc:9},
   win:[`He draws the whole cordon on your hand.`,`הוא מצייר את כל המחסום על כף היד.`,{flag:'map',morale:4}],
   lose:[`He knows nothing you don't already.`,`הוא לא יודע שום דבר שלא ידוע.`,{morale:-2}]}
 ]});
defEv({id:'echo_rooftop',cond:()=>since('rooftop',5)||since('rooftopCommunity',5),w:22,
 t:['News From the Roof','חדשות מהגג'],
 x:[`A runner from the rooftop community arrives out of breath. They need someone to carry a message across the city to the stadium, and they remember who organized the roof.`,`רץ מקהילת הגג מגיע בנשימה חנוקה. הם צריכים מישהו שיעביר הודעה בעיר עד האצטדיון, והם זוכרים מי ארגן את הגג.`],
 ch:[
  {l:['Carry the message','להעביר את ההודעה'],s:['Nine neighborhoods, and back.','תשע שכונות, וחזרה.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`You run it across nine neighborhoods, and the stadium answers with a truck of supplies.`,`רצת איתה תשע שכונות, והאצטדיון עונה במשאית אספקה.`,{food:4,water:3,order:3,humanity:4}],
   lose:[`The streets are worse than they used to be.`,`הרחובות גרועים ממה שהיו.`,{hp:-16,inf:10}]},
  {l:['Send someone else','לשלוח מישהו אחר'],s:['Delegate, and trust.','להאציל, ולסמוך.'],check:{stat:'charisma',dc:8},
   win:[`The runner accepts, and promises to owe you.`,`הרץ מסכים, ומבטיח חוב.`,{ammo:1,humanity:-2}],
   lose:[`Nobody wants to go.`,`אף אחד לא רוצה ללכת.`,{morale:-4,order:-2}]}
 ]});
defEv({id:'echo_borderAlly',cond:()=>since('borderAlly',5),w:22,
 t:['The Sergeant\'s Favor','טובת הסמל'],
 x:[`The border patrol sergeant you helped on the fence arrives with a truck. Three families need an escort to the interior, and he can't spare a soldier.`,`סמל משמר הגבול שעזרת לו בגדר מגיע עם משאית. שלוש משפחות צריכות ליווי לפנים הארץ, והוא לא יכול לפנות חייל.`],
 ch:[
  {l:['Escort the families','ללוות את המשפחות'],s:['Nine people, two dogs, and a long road.','תשעה אנשים, שני כלבים ודרך ארוכה.'],check:{stat:'stamina',dc:9,danger:true},
   win:[`Nine people, two dogs, and a very long road. The children sing at the checkpoints.`,`תשעה אנשים, שני כלבים ודרך ארוכה מאוד. הילדים שרים במחסומים.`,{humanity:10,order:4,morale:6,food:2}],
   lose:[`The road isn't safe, and neither are the families.`,`הדרך לא בטוחה, וגם לא המשפחות.`,{hp:-14,morale:-4}]},
  {l:['Refuse politely','לסרב בנימוס'],s:['You have your own road.','יש לך דרך משלך.'],check:{stat:'charisma',dc:8},
   win:[`He understands, and leaves you a full tank.`,`הוא מבין, ומשאיר לך מיכל מלא.`,{food:1,morale:1}],
   lose:[`He doesn't understand.`,`הוא לא מבין.`,{order:-2,morale:-4}]}
 ]});
defEv({id:'echo_keptGate',cond:()=>since('keptGate',5),w:22,
 t:['The Ones You Turned Back','אלה ששלחת בחזרה'],
 x:[`Three of the refugees you turned back at the fence sit on a bench outside the shelter, watching you. One of them is a child holding a toy.`,`שלושה מהפליטים ששלחת בחזרה בגדר יושבים על ספסל מחוץ למקלט וצופים בך. אחד מהם ילד שמחזיק צעצוע.`],
 ch:[
  {l:['Give them food and a place','לתת להם אוכל ומקום'],s:['Late, and better than never.','מאוחר, וטוב מלא בכלל.'],check:{stat:'charisma',dc:9},cost:{food:2},
   win:[`The child gives you the toy. You don't know what to do with it, so you hold it.`,`הילד נותן לך את הצעצוע. אין מושג מה לעשות איתו, אז מחזיקים אותו.`,{humanity:10,morale:5}],
   lose:[`They accept the food. They do not accept you.`,`הם מקבלים את האוכל. הם לא מקבלים אותך.`,{humanity:3,morale:-4}]},
  {l:['Say nothing and look away','לא להגיד דבר ולהסתכל הצידה'],s:['It gets easier. Maybe.','זה נעשה קל יותר. אולי.'],check:{stat:'wits',dc:8},
   win:[`You look away. It works.`,`הסתכלת הצידה. זה עובד.`,{humanity:-4,morale:-3}],
   lose:[`They follow you for a week.`,`הם עוקבים אחריך שבוע.`,{morale:-8,hp:-6}]}
 ]});
defEv({id:'echo_guardContact',cond:()=>since('guardContact',5),w:22,
 t:['The Garrison Falls','חיל המצב נופל'],
 x:[`A runner from the overpass checkpoint says the garrison is out of ammunition and will fall by morning. The sergeant told him to find you. He says you were kind.`,`רץ ממחסום הגשר אומר שחיל המצב נגמרה לו התחמושת ויפול עד הבוקר. הסמל אמר לו למצוא אותך. הוא אומר שהיית אדיב.`],
 ch:[
  {l:['Bring ammunition','להביא תחמושת'],s:['Three boxes and a long night.','שלוש קופסאות ולילה ארוך.'],check:{stat:'stamina',dc:9,danger:true},cost:{ammo:3},
   win:[`You get there before dawn. The sergeant takes the boxes and salutes.`,`הגעת לפני עלות השחר. הסמל לוקח את הקופסאות ומצדיע.`,{humanity:8,order:4,morale:6,food:3}],
   lose:[`The road is blocked.`,`הדרך חסומה.`,{hp:-12,inf:8}]},
  {l:['Stay where you are','להישאר במקום'],s:['You have your own night.','יש לך לילה משלך.'],check:{stat:'charisma',dc:8},
   win:[`The garrison holds without you. You hear about it later.`,`חיל המצב מחזיק בלעדיך. שומעים על זה אחר כך.`,{morale:-2,humanity:-2}],
   lose:[`The garrison falls.`,`חיל המצב נופל.`,{order:-4,outbreak:3,morale:-6}]}
 ]});
defEv({id:'echo_militaryContact',cond:()=>since('militaryContact',5),w:22,
 t:['A Call From the Base','שיחה מהבסיס'],
 x:[`The reserve officer you knew calls on a crackling line. He needs a driver for one night, no questions. He says it's important, and that he wouldn't ask.`,`קצין המילואים שהכרת מתקשר בקו רועש. הוא צריך נהג ללילה אחד, בלי שאלות. הוא אומר שזה חשוב, ושלא היה מבקש.`],
 ch:[
  {l:['Drive for him','לנהוג בשבילו'],s:['A truck, a night, and no questions.','משאית, לילה ובלי שאלות.'],check:{stat:'stamina',dc:9},
   win:[`You don't ask what's in the truck. In the morning he hands you rations and a look of gratitude.`,`לא שואלים מה במשאית. בבוקר הוא מוסר לך מנות ומבט של הכרת תודה.`,{food:3,meds:1,order:3}],
   lose:[`The road isn't as quiet as promised.`,`הדרך לא שקטה כמו שהובטח.`,{hp:-12,morale:-4}]},
  {l:['Say no','לסרב'],s:['Some favors are too heavy.','יש טובות כבדות מדי.'],check:{stat:'charisma',dc:8},
   win:[`He hangs up, and doesn't call again. It is quiet.`,`הוא מנתק, ולא מתקשר שוב. שקט.`,{morale:1}],
   lose:[`He calls back, twice.`,`הוא מתקשר שוב, פעמיים.`,{morale:-5,order:-2}]}
 ]});
defEv({id:'echo_countryside',cond:()=>since('countryside',5),w:22,
 t:['The Farm Remembers','החווה זוכרת'],
 x:[`Your cousin's farmhouse is under attack, and the chimney you followed weeks ago is burning. A neighbor's child runs up the lane shouting for help.`,`בית החווה של הקרוב מותקף, והארובה שעקבת אחריה לפני שבועות בוערת. ילד של שכן רץ במעלה השביל וצועק לעזרה.`],
 ch:[
  {l:['Run to help','לרוץ לעזור'],s:['The dead are few. The farm is small.','המתים מעטים. החווה קטנה.'],check:{stat:'strength',dc:9},
   win:[`The dead are few, the farm is saved, and there is soup.`,`המתים מעטים, החווה ניצלה, ויש מרק.`,{humanity:8,food:4,water:2,morale:6}],
   lose:[`There are more than there looked.`,`יש יותר ממה שנראה.`,{hp:-14,inf:10,morale:-4}]},
  {l:['Send word and stay','לשלוח הודעה ולהישאר'],s:['A patrol might arrive.','אולי סיור יגיע.'],check:{stat:'wits',dc:8},
   win:[`A patrol arrives in time and asks nothing of you.`,`סיור מגיע בזמן ולא מבקש דבר.`,{order:3,morale:-1}],
   lose:[`Help arrives too late.`,`עזרה מגיעה מאוחר מדי.`,{humanity:-6,morale:-8}]}
 ]});
defEv({id:'echo_cabin',cond:()=>since('cabin',5),w:22,
 t:['Smoke From the Cabin','עשן מהבקתה'],
 x:[`Smoke rises from the cabin you once hid in. When you arrive, a family is inside, feeding the stove. They say it is theirs now, and they have a child with a fever.`,`עשן עולה מהבקתה שהסתתרת בה פעם. כשמגיעים, משפחה בפנים, מאכילה את התנור. הם אומרים שהיא שלהם עכשיו, ויש להם ילד עם חום.`],
 ch:[
  {l:['Share it, and share the medicine','לחלוק את הבקתה ואת התרופה'],s:['A child, and a stove.','ילד, ותנור.'],check:{stat:'charisma',dc:8},cost:{meds:1},
   win:[`The child recovers. The father shakes your hand and won't let go.`,`הילד מחלים. האב לוחץ את היד ולא עוזב.`,{humanity:8,morale:6,order:1}],
   lose:[`The child doesn't recover.`,`הילד לא מחלים.`,{morale:-10,humanity:3}]},
  {l:['Take the cabin back','לקחת את הבקתה בחזרה'],s:['It was yours first.','היא הייתה שלך קודם.'],check:{stat:'strength',dc:9},
   win:[`They leave without a fight, and you have never felt so small.`,`הם עוזבים בלי קרב, ומעולם לא הרגשת כל כך קטן.`,{humanity:-10,hp:8}],
   lose:[`Their father is bigger than he looked.`,`אביהם גדול ממה שנראה.`,{hp:-12,humanity:-6}]}
 ]});
defEv({id:'echo_car',cond:()=>since('car',6),w:20,
 t:['Out of Fuel','נגמר הדלק'],
 x:[`The car finally coughs and stops in the middle of nowhere. There is a long walk on either side, and a lot of what you carry is heavy.`,`המכונית משתעלת לבסוף ונעצרת באמצע שום מקום. יש הליכה ארוכה לכל כיוון, והרבה ממה שנושאים כבד.`],
 ch:[
  {l:['Try to fix it','לנסות לתקן אותה'],s:['Twenty minutes and a coat hanger.','עשרים דקות וקולב.'],check:{stat:'wits',dc:9,bg:{mechanic:3}},
   win:[`Twenty minutes with a coat hanger and spit. It starts.`,`עשרים דקות עם קולב ורוק. היא מתניעה.`,{morale:5}],
   lose:[`You make it worse.`,`מחמירים את זה.`,{hp:-4,food:-1}]},
  {l:['Abandon it and walk','לנטוש וללכת'],s:['Lighter, and slower.','קל יותר, ואיטי יותר.'],check:{stat:'stamina',dc:9},
   win:[`You walk light, and it feels like freedom.`,`הולכים קל, וזה מרגיש כמו חופש.`,{morale:3,unflag:'car'}],
   lose:[`The walk is longer than you thought.`,`ההליכה ארוכה ממה שחשבת.`,{hp:-10,food:-2,unflag:'car'}]}
 ]});
defEv({id:'echo_savedFriend',cond:()=>since('savedFriend',6),w:20,
 t:['The Gift','המתנה'],
 x:[`The person you saved from a bite comes to you with something wrapped in cloth. They say they have been thinking about how to say thank you for weeks. It is a tin of something, and a small carved figure.`,`מי שהצלת מנשיכה מגיע אליך עם משהו עטוף בבד. הוא אומר שחשב שבועות איך להודות. זו קופסת שימורים ודמות קטנה מגולפת.`],
 ch:[
  {l:['Accept it warmly','לקבל בחום'],s:['Some gifts are heavy.','יש מתנות כבדות.'],check:{stat:'charisma',dc:7},
   win:[`The figure is a bird. You keep it in your breast pocket, and it is warm for a very long time.`,`הדמות היא ציפור. שומרים אותה בכיס החזה, והיא חמה זמן רב מאוד.`,{morale:8,humanity:4,meds:1}],
   lose:[`You fumble it, and they look hurt.`,`מתבלבלים, והם נראים פגועים.`,{morale:-3}]},
  {l:['Say it was nothing','להגיד שזה כלום'],s:['Modest, and a little too much.','צנוע, וקצת יותר מדי.'],check:{stat:'charisma',dc:8},
   win:[`They laugh. It becomes a joke between you.`,`הם צוחקים. זה הופך לבדיחה ביניכם.`,{morale:4,loyAll:1}],
   lose:[`They stop coming to you.`,`הם מפסיקים לבוא אליך.`,{loyAll:-1,morale:-3}]}
 ]});
defEv({id:'echo_walkedHome',cond:()=>since('walkedHome',5),w:20,
 t:['The Old Man on the Step','הזקן על המדרגה'],
 x:[`On that first night's walk home you passed an old man sitting on his step. Tonight, at the evacuation center, he recognizes you. He says you didn't stop, and that it's alright.`,`בהליכה הביתה בלילה הראשון חלפת ליד זקן שישב על המדרגה שלו. הלילה, במרכז הפינוי, הוא מזהה אותך. הוא אומר שלא עצרת, ושזה בסדר.`],
 ch:[
  {l:['Sit with him','לשבת איתו'],s:['A late conversation.','שיחה מאוחרת.'],check:{stat:'charisma',dc:7},
   win:[`He tells you about the step, the street, and the cat. It is the best conversation you have had in a month.`,`הוא מספר על המדרגה, הרחוב והחתול. זו השיחה הכי טובה שהייתה בחודש.`,{morale:8,humanity:4}],
   lose:[`He falls asleep mid-sentence.`,`הוא נרדם באמצע משפט.`,{morale:2}]},
  {l:['Apologize and move on','להתנצל ולהמשיך'],s:['Short, and honest.','קצר, ואמיתי.'],check:{stat:'wits',dc:6},
   win:[`He waves you off. There is nothing to apologize for.`,`הוא מנופף. אין על מה להתנצל.`,{morale:2}],
   lose:[`He wanted to talk.`,`הוא רצה לדבר.`,{morale:-3}]}
 ]});
defEv({id:'echo_inland',cond:()=>since('inland',5),w:20,
 t:['The Red Road Remembers','הדרך האדומה זוכרת'],
 x:[`A dust cloud on the horizon turns out to be a convoy of utes. The people in them heard, somehow, that you drove inland months ago and made it. They want to know how.`,`ענן אבק באופק מתגלה כשיירת טנדרים. האנשים בהם שמעו, איכשהו, שנסעת פנימה לפני חודשים והצלחת. הם רוצים לדעת איך.`],
 ch:[
  {l:['Share what you know','לחלוק את מה שיודעים'],s:['A route on the hood of a ute.','מסלול על מכסה טנדר.'],check:{stat:'charisma',dc:8},
   win:[`You draw the route on the hood of a ute. They leave you a jerrycan of water.`,`מציירים את המסלול על מכסה טנדר. הם משאירים ג׳ריקן מים.`,{water:4,humanity:4,morale:4}],
   lose:[`You forget half of it.`,`שוכחים חצי.`,{morale:-3}]},
  {l:['Keep it to yourself','לשמור את זה לעצמך'],s:['Some roads are not for sharing.','יש דרכים שלא חולקים.'],check:{stat:'wits',dc:8},
   win:[`They leave, and you never learn what became of them.`,`הם עוזבים, ולעולם לא יודעים מה עלה בגורלם.`,{humanity:-4}],
   lose:[`They don't leave. They follow.`,`הם לא עוזבים. הם עוקבים.`,{hp:-8}]}
 ]});
defEv({id:'echo_garden',cond:()=>since('garden',5),w:20,
 t:['The Harvest','הקציר'],
 x:[`The garden has gone wild and full. Word has gotten around. Three travelers ask for seeds and a night's rest.`,`הגינה הפכה פראית ומלאה. השמועה פשטה. שלושה נוסעים מבקשים זרעים ולילה של מנוחה.`],
 ch:[
  {l:['Give them seeds','לתת להם זרעים'],s:['Plant something somewhere else.','לשתול משהו במקום אחר.'],check:{stat:'charisma',dc:7},
   win:[`They plant them at the next stop. Months later, a stranger brings you a tomato.`,`הם שותלים אותם בתחנה הבאה. חודשים אחר כך, זר מביא לך עגבנייה.`,{humanity:8,morale:6,food:3}],
   lose:[`They take the seeds and the harvest.`,`הם לוקחים את הזרעים ואת היבול.`,{food:-3,morale:-4}]},
  {l:['Guard the crop','לשמור על היבול'],s:['Nobody eats a tomato on your watch.','אף אחד לא אוכל עגבנייה בשמירה שלך.'],check:{stat:'strength',dc:8},
   win:[`Nobody steals a tomato on your watch.`,`אף אחד לא גונב עגבנייה בשמירה שלך.`,{food:4,humanity:-2}],
   lose:[`They steal it anyway.`,`הם גונבים בכל זאת.`,{hp:-8,food:-2}]}
 ]});
defEv({id:'echo_newborn',cond:()=>since('newborn',5),w:22,
 t:['Fever in the Nursery','חום בחדר התינוקות'],
 x:[`The baby is burning up. The mother looks at you the way people look at doctors.`,`התינוק בוער מחום. האם מסתכלת עליך כמו שמסתכלים על רופאים.`],
 ch:[
  {l:['Use the medicine','להשתמש בתרופה'],s:['A very small dose.','מנה קטנה מאוד.'],check:{stat:'wits',dc:7},cost:{meds:1},
   win:[`The fever breaks by dawn. The baby laughs.`,`החום נשבר עד עלות השחר. התינוק צוחק.`,{morale:12,humanity:6}],
   lose:[`It helps, but not enough.`,`זה עוזר, אבל לא מספיק.`,{morale:-4}]},
  {l:['Cool it with river water and wait','להוריד חום במי נהר ולחכות'],s:['Patience, and a long night.','סבלנות, ולילה ארוך.'],check:{stat:'stamina',dc:9},
   win:[`It is the longest night of the year. The baby sleeps.`,`זה הלילה הארוך ביותר בשנה. התינוק ישן.`,{morale:8,humanity:4}],
   lose:[`It doesn't work.`,`זה לא עובד.`,{morale:-12,humanity:2}]}
 ]});

/* the fallen are remembered */
add({id:'echo_fallen',max:3,w:20,
 cond:()=>Object.keys(G.flags).some(k=>k.indexOf('lost_')===0&&!G.seen.includes('fw_'+k.slice(5))&&G.w.day>=G.flags[k]+T(3)),
 pre:()=>{const k=Object.keys(G.flags).find(k=>k.indexOf('lost_')===0&&!G.seen.includes('fw_'+k.slice(5))&&G.w.day>=G.flags[k]+T(3));const n=k.slice(5);G.seen.push('fw_'+n);return{n};},
 build:ctx=>{
  const pe=(typeof HE!=='undefined'&&HE.people[ctx.n])||{n:ctx.n};
  const N=bi(ctx.n,pe.n);
  return{title:bi('What Was Left','מה שנשאר'),pair:[0,1],
   text:bi(`You pass something that belonged to ${N.en}: a scarf on a fence post, a shape in the dirt where they slept. The others slow down without being asked.`,`עוברים ליד משהו ששייך ל${N.he}: צעיף על עמוד גדר, צורה באדמה במקום שישן בו. האחרים מאיטים בלי שביקשו.`),
   choices:[
    {label:bi('Stop and say something','לעצור ולהגיד משהו'),sub:bi('A few words, whatever they are.','כמה מילים, מה שיהיו.'),check:{stat:'charisma',dc:7},
     win:{text:bi(`Nobody says much. Everyone remembers.`,`אף אחד לא אומר הרבה. כולם זוכרים.`),morale:6,humanity:4,loyAll:1},
     lose:{text:bi(`It comes out wrong, and it hurts.`,`זה יוצא לא נכון, וזה כואב.`),morale:-4}},
    {label:bi('Keep walking','להמשיך ללכת'),sub:bi('Walking is also a way to remember.','הליכה היא גם דרך לזכור.'),check:{stat:'wits',dc:7},
     win:{text:bi(`You keep walking. The others follow, one by one, and nobody looks back.`,`ממשיכים ללכת. האחרים עוקבים, אחד אחד, ואף אחד לא מסתכל אחורה.`),morale:1},
     lose:{text:bi(`The others don't follow for a while.`,`האחרים לא עוקבים זמן מה.`),morale:-6,loyAll:-1}}
   ]};
 }});
