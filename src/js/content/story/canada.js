
/* ===== CANADA: "The Long Winter" =====
 * Cold is the enemy and the neighbor. Odile flies a floatplane before the lake freezes. Grizz runs a logging camp with
 * one rule: anyone who eats, works. Sergeant Lachance watches the fence to the south.
 */
const CA={arc:'loc:canada',label:['The Long Winter','החורף הארוך'],of:6};

chapter(Object.assign({},CA,{id:'ca_1',n:1,at:.06,
 t:['Freeze-Up','ההקפאה'],
 x:[`The lake has begun to freeze at the edges, thin as glass, and Odile, a bush pilot in a very old parka, is loading her floatplane as fast as she can. She has a month, at most, before the ice keeps her on the ground until spring. She says she is flying north, to a place with a runway and a stockpile, and there is room for two more if they can pay in fuel or work.`,
    `האגם התחיל לקפוא בשוליים, דק כזכוכית, ואודיל, טייסת שטח במעיל פרווה ישן מאוד, מעמיסה את מטוס הים שלה מהר ככל שאפשר. יש לה חודש, לכל היותר, לפני שהקרח יחזיק אותה על הקרקע עד האביב. היא אומרת שהיא טסה צפונה, למקום עם מסלול ומלאי, ויש מקום לעוד שניים אם משלמים בדלק או בעבודה.`],
 ch:[
  {l:['Work the plane for a seat','לעבוד על המטוס תמורת מקום'],s:['Fuel, ropes, and cold hands.','דלק, חבלים, וידיים קרות.'],check:{stat:'strength',dc:9},
   win:[`You haul barrels down the dock in freezing spray, tie down a load that shifts in the wind, and drain the fuel filter twice. Odile calls it acceptable, which from her is a medal. The seat is yours by the second flight.`,`גררת חביות במורד המזח בתוך ריסוס קפוא, קשרת מטען שזז ברוח, ורוקנת את מסנן הדלק פעמיים. אודיל קוראת לזה מקובל, וממנה זה מדליה. המושב שלך בטיסה השנייה.`,{food:1,morale:4,flag:'ca_plane'}],
   lose:[`A barrel slips on the ice. It does not hurt anyone, but it does not help either, and Odile says the second seat is going to someone else.`,`חבית מחליקה על הקרח. היא לא פוגעת באיש, אבל גם לא עוזרת, ואודיל אומרת שהמושב השני הולך למישהו אחר.`,{hp:-6,morale:-4}]},
  {l:['Stay and winter where you are','להישאר ולחורף במקום'],s:['A cabin, a stove, and a long dark.','בקתה, תנור, וחושך ארוך.'],check:{stat:'wits',dc:8},
   win:[`You cut wood until your shoulders sing, seal the cabin with moss and tar, and fill every barrel with lake water before the freeze. When the ice comes, you are ready, and the silence is almost friendly.`,`חתכת עצים עד שהכתפיים שרות, אטמת את הבקתה בטחב וזפת, ומילאת כל חבית במי אגם לפני ההקפאה. כשהקרח מגיע, הכול מוכן, והשקט כמעט ידידותי.`,{food:2,water:3,hp:3,morale:2,flag:'ca_cabin'}],
   lose:[`You cut too little wood and seal too late. The first frost finds the cracks in your plan, and you spend the night in every layer you own.`,`חתכת מעט מדי עצים ואטמת מאוחר מדי. הכפור הראשון מוצא את הסדקים בתוכנית, ובילית את הלילה בכל שכבה שיש.`,{hp:-6,morale:-5,flag:'ca_cabin'}]}
 ]}));

chapter(Object.assign({},CA,{id:'ca_2',n:2,at:.20,
 t:['The Camp','המחנה'],
 x:[()=>`${flag('ca_plane')?'Odile sets the floatplane down on a frozen bay at the end of a spruce valley.':'A snowmobile patrol finds your smoke and leads you, two hours through the trees, to a valley.'} At the end of it is a logging camp: sixty people, four bunkhouses, and a boss named Grizz who has not smiled since October. He has a stove, a generator and a rule: anyone who eats, works. He looks at you, and waits.`,
    ()=>`${flag('ca_plane')?'אודיל מנחיתה את מטוס הים על מפרץ קפוא בקצה עמק אשוחים.':'סיור אופנועי שלג מוצא את העשן ומוביל, שעתיים בין העצים, אל עמק.'} בקצהו מחנה כריתת עצים: שישים איש, ארבעה בתי פועלים, ובוס בשם גריז שלא חייך מאז אוקטובר. יש לו תנור, גנרטור וכלל: מי שאוכל, עובד. הוא מסתכל, ומחכה.`],
 ch:[
  {l:['Join the camp','להצטרף למחנה'],s:['A bunk, a shift, and sixty strangers.','דרגש, משמרת, ושישים זרים.'],check:{stat:'charisma',dc:8},
   win:[`Grizz assigns you the wood detail and a bunk beside a man who snores like a chainsaw. By the end of the week you know everyone's name, and you have been dealt into the card game. Grizz finally, and briefly, grins.`,`גריז מקצה לך את צוות העצים ודרגש ליד אדם שנוחר כמו מסור. עד סוף השבוע מכירים את כולם בשמם, ומחלקים לך קלפים במשחק. גריז סוף סוף, ובקצרה, מחייך.`,{food:3,morale:5,order:2,flag:'ca_camp'}],
   lose:[`Grizz is short on bunks and shorter on patience. You sleep in the tool shed for a week and earn your place one log at a time.`,`לגריז חסרים דרגשים וחסרה עוד יותר סבלנות. ישנת בסככת הכלים שבוע והרווחת מקום בולי עץ בודדים.`,{hp:-4,morale:-3,flag:'ca_camp'}]},
  {l:['Bring supplies and stay on the edge','להביא אספקה ולהישאר בשוליים'],s:['Trade, not join.','לסחור, לא להצטרף.'],check:{stat:'wits',dc:9},
   win:[`You make a deal: meat for medicine, a map for a bed. Grizz respects a bargain more than a promise, and he says so. You keep your own cabin at the edge of the clearing, close enough to hear the generator.`,`עושים עסקה: בשר תמורת תרופות, מפה תמורת מיטה. גריז מכבד עסקה יותר מהבטחה, ואומר את זה. שומרים על בקתה משלהם בקצה הקרחת, קרוב מספיק לשמוע את הגנרטור.`,{meds:1,food:2,morale:2,flag:'ca_edge'}],
   lose:[`Grizz sees your terms and raises one eyebrow. You leave the camp with less than you came with, and a warm meal in your stomach that you will remember for the wrong reason.`,`גריז רואה את התנאים ומרים גבה אחת. יצאת מהמחנה עם פחות ממה שבאת, ועם ארוחה חמה בבטן שתיזכר מהסיבה הלא נכונה.`,{food:-2,morale:-4,flag:'ca_edge'}]}
 ]}));

chapter(Object.assign({},CA,{id:'ca_3',n:3,at:.36,
 t:['The Fence','הגדר'],
 x:[()=>`A convoy of refugees has reached the camp's south road: forty people from the south, some on foot, some on a flatbed with a broken axle. A border patrol sergeant, Lachance, has followed them at a distance, and now he steps out of the trees with a rifle he does not raise. He asks Grizz to let them in, and Grizz does not answer. ${flag('ca_camp')?'They look at you, because you are the newest of the old.':'They look at you, because you are the one who is neither.'}`,
    ()=>`שיירת פליטים הגיעה אל הדרך הדרומית של המחנה: ארבעים איש מהדרום, חלקם ברגל, חלקם על משאית שטוחה עם ציר שבור. סמל בפטרול הגבול, לשאנס, עקב אחריהם מרחוק, ועכשיו יוצא מבין העצים עם רובה שהוא לא מרים. הוא מבקש מגריז להכניס אותם, וגריז לא עונה. ${flag('ca_camp')?'כולם מסתכלים על החדש ביותר מבין הוותיקים.':'כולם מסתכלים על מי שלא שייך לאף צד.'}`],
 ch:[
  {l:['Speak for the refugees','לדבר בשם הפליטים'],s:['The winter is long enough for everyone.','החורף ארוך מספיק לכולם.'],check:{stat:'charisma',dc:9},
   win:[`You stand between the two groups and say a few things about the winter, and the camp, and the size of a bunkhouse. Grizz grunts. Lachance nods. By nightfall forty people have found a stove, and a night's peace.`,`עומדים בין שתי הקבוצות ואומרים כמה דברים על החורף, על המחנה ועל גודלו של בית פועלים. גריז נוהם. לשאנס מהנהן. עד רדת החשכה ארבעים איש מצאו תנור, ולילה של שקט.`,{humanity:8,order:2,morale:4,flag:'ca_refugees'}],
   lose:[`Grizz says the camp is full, and it is, and the flatbed turns around. Lachance stays at the edge of the trees for a long time after they are gone.`,`גריז אומר שהמחנה מלא, וזה נכון, והמשאית מסתובבת. לשאנס נשאר בקצה העצים זמן רב אחרי שהם הלכו.`,{humanity:-3,morale:-6,flag:'ca_turned'}]},
  {l:['Stay out of it','להישאר מחוץ לזה'],s:['It is not your camp, and it is not your fence.','זה לא המחנה שלך, וזו לא הגדר שלך.'],check:{stat:'stealth',dc:7},
   win:[`You bank the stove and go to bed. In the morning the refugees are gone, and the camp is quiet, and you never find out where the flatbed went.`,`מכסים את התנור והולכים לישון. בבוקר הפליטים איננו, המחנה שקט, ולעולם לא יודעים לאן המשאית הלכה.`,{morale:1,humanity:-4,flag:'ca_turned'}],
   lose:[`You stay out, and the arguing goes on till three. Nobody speaks to you at breakfast, which is its own kind of speaking.`,`נשארת מחוץ לזה, והוויכוח נמשך עד שלוש. איש לא מדבר איתך בארוחת הבוקר, וזה סוג של דיבור בפני עצמו.`,{morale:-5,humanity:-2,flag:'ca_turned'}]}
 ]}));

chapter(Object.assign({},CA,{id:'ca_4',n:4,at:.52,
 t:['The White-Out','סופת שלג'],
 x:[()=>`The storm arrives in the night: a wall of white, wind that takes the breath out of a person, and a temperature that makes the stove a religion. At dawn a snowmobile crew fails to return from the north line, and Grizz is already at the door in his parka. ${flag('ca_refugees')?'The refugees ask if they can help, and mean it.':flag('ca_turned')?'Lachance has appeared out of the storm, and does not ask for shelter.':'The camp looks at Grizz, and Grizz looks at you.'} A search party is going, and it needs someone.`,
    ()=>`הסערה מגיעה בלילה: קיר של לבן, רוח שלוקחת את הנשימה, וטמפרטורה שהופכת את התנור לדת. עם עלות השחר צוות אופנועי שלג לא חוזר מהקו הצפוני, וגריז כבר בדלת במעילו. ${flag('ca_refugees')?'הפליטים שואלים אם אפשר לעזור, ומתכוונים לזה.':flag('ca_turned')?'לשאנס הופיע מתוך הסערה, ולא מבקש מחסה.':'המחנה מסתכל על גריז, וגריז מסתכל עליך.'} צוות חיפוש יוצא, והוא צריך מישהו.`],
 ch:[
  {l:['Join the search party','להצטרף לצוות החיפוש'],s:['The line is twelve miles out, and the wind is loud.','הקו במרחק שנים עשר מייל, והרוח חזקה.'],check:{stat:'stamina',dc:10,danger:true,mod:()=>flag('ca_refugees')?1:0},
   win:[`You follow a rope through a world with no edges and find two of them in a snow hole, alive and bickering. You bring them back on a sled, slowly, and the camp meets you at the gate with hot tea and a hundred questions.`,`הולכים אחרי חבל דרך עולם בלי קצוות ומוצאים שניים מהם בבור שלג, חיים ומתקוטטים. מחזירים אותם על מזחלת, לאט, והמחנה פוגש בשער עם תה חם ומאה שאלות.`,{humanity:7,hp:-6,morale:6,flag:'ca_search'}],
   lose:[`You find the sled, and the sled is empty. You turn back in the dark with frozen feet and a rope that has become the only true thing in the world.`,`מוצאים את המזחלת, והמזחלת ריקה. חוזרים בחושך עם רגליים קפואות וחבל שהפך לדבר האמיתי היחיד בעולם.`,{hp:-14,inf:4,morale:-8,flag:'ca_search'}]},
  {l:['Hold the camp and keep the stove','להחזיק את המחנה ולשמור על התנור'],s:['Someone has to be here when they return.','מישהו צריך להיות כאן כשהם חוזרים.'],check:{stat:'wits',dc:8},
   win:[`You keep the fires, count the heads, and light the lamp in the window every hour. When the search party returns, the lamp is the first thing they see.`,`שומרים על האש, סופרים ראשים, ומדליקים את המנורה בחלון כל שעה. כשצוות החיפוש חוזר, המנורה הדבר הראשון שהם רואים.`,{order:3,morale:4,flag:'ca_held'}],
   lose:[`The lamp goes out at three, and it is a long hour before someone relights it. Nobody says whose fault it was, and everyone knows.`,`המנורה כבתה בשלוש, ועוברת שעה ארוכה עד שמישהו מדליק אותה שוב. איש לא אומר של מי האשמה, וכולם יודעים.`,{morale:-5,order:-2,flag:'ca_held'}]}
 ]}));

chapter(Object.assign({},CA,{id:'ca_5',n:5,at:.70,
 t:['The Thaw','ההפשרה'],
 x:[()=>`Spring arrives in a day: the drip, the roar, the river ice breaking with a sound like a gun going off underwater. The camp's winter supplies are on the far bank, in a cache built in November. The ice will hold for another hour, or it will not. Odile's floatplane, if it exists, is somewhere upriver. ${flag('ca_search')?'Grizz has started calling you by name, which is his highest honor.':flag('ca_held')?'Grizz nods when you pass, which counts as a speech.':'Grizz has not decided about you yet.'}`,
    ()=>`האביב מגיע ביום: הטפטוף, השאגה, קרח הנהר נשבר בקול כמו ירייה מתחת למים. אספקת החורף של המחנה בגדה הרחוקה, במטמון שנבנה בנובמבר. הקרח יחזיק עוד שעה, או שלא. מטוס הים של אודיל, אם הוא קיים, איפשהו במעלה הנהר. ${flag('ca_search')?'גריז התחיל לקרוא בשם, וזה הכבוד הגבוה ביותר שלו.':flag('ca_held')?'גריז מהנהן כשעוברים, וזה נחשב לנאום.':'גריז עוד לא החליט לגבי מי שכאן.'}`],
 ch:[
  {l:['Cross for the cache','לחצות כדי להביא את המטמון'],s:['An hour of ice, and the winter in a shed.','שעה של קרח, והחורף בסככה.'],check:{stat:'stamina',dc:10,danger:true},
   win:[`You cross on your belly, dragging a rope, feeling the ice speak beneath you. The cache is dry and full. You haul it back in three trips, and on the last, the river takes the ice behind you.`,`חוצים על הבטן, גוררים חבל, מרגישים את הקרח מדבר מתחת. המטמון יבש ומלא. מחזירים אותו בשלוש נסיעות, ובאחרונה הנהר לוקח את הקרח מאחור.`,{food:5,water:2,hp:-4,morale:5,flag:'ca_cache'}],
   lose:[`The ice goes on the second trip. You come out of the river blue and swearing, with half the cache, and Grizz waiting on the bank with a blanket and a look.`,`הקרח נשבר בנסיעה השנייה. יצאת מהנהר כחול ומקלל, עם חצי מהמטמון, וגריז מחכה על הגדה עם שמיכה ומבט.`,{hp:-12,food:2,morale:-5,flag:'ca_cache'}]},
  {l:['Wait for the ice to clear','לחכות שהקרח יתפנה'],s:['A rushed crossing costs more than a slow spring.','חצייה בחיפזון עולה יותר מאביב איטי.'],check:{stat:'wits',dc:8},
   win:[`Two days of hunger and patience, and a raft built from bunkhouse doors. The river runs clear, and the cache comes across whole, on a raft with your name written on it in Grizz's clumsy hand.`,`יומיים של רעב וסבלנות, ורפסודה שנבנתה מדלתות בית הפועלים. הנהר זורם צלול, והמטמון מגיע שלם, על רפסודה שהשם שלך כתוב עליה בכתב ידו המסורבל של גריז.`,{food:4,water:2,order:2,morale:2,flag:'ca_cache'}],
   lose:[`The wait is longer than the food. The camp goes hungry for four days, and nobody says a word about who suggested waiting.`,`ההמתנה ארוכה מהאוכל. המחנה רעב ארבעה ימים, ואיש לא אומר מילה על מי שהציע לחכות.`,{food:-3,morale:-6,hp:-3,flag:'ca_cache'}]}
 ]}));

chapter(Object.assign({},CA,{id:'ca_6',n:6,at:.88,
 t:['The Airstrip','מסלול ההנחתה'],
 x:[()=>`Odile's floatplane comes down out of a blue sky in the third week of May, on floats, onto a river that is still half ice. She has room for six, and she has come to say that the northern base still has its stockpile, its generator and its radio. The camp has a hundred and ten people, and none of them has ever been north. ${flag('ca_cache')?'The camp has enough to stay, thanks to the cache.':'The camp does not have enough to stay.'} Grizz looks at the plane, and at you.`,
    ()=>`מטוס הים של אודיל יורד משמיים כחולים בשבוע השלישי של מאי, על מצופים, אל נהר שעדיין חצי קרח. יש לה מקום לשישה, והיא באה לומר שבבסיס הצפוני עדיין יש מלאי, גנרטור ורדיו. במחנה מאה ועשרה אנשים, ואף אחד מהם לא היה מעולם צפונה. ${flag('ca_cache')?'למחנה יש מספיק כדי להישאר, בזכות המטמון.':'למחנה אין מספיק כדי להישאר.'} גריז מסתכל במטוס, ובך.`],
 ch:[
  {l:['Fly north with Odile','לטוס צפונה עם אודיל'],s:['A radio, a runway, and a new winter.','רדיו, מסלול, וחורף חדש.'],check:{stat:'wits',dc:9,mod:()=>flag('ca_plane')?2:0},
   win:[`The floats leave the water in a single long breath. The camp shrinks to a smudge, then a thread, then nothing. Ahead is a strip of gravel and a light in a window, and Odile, at the stick, is singing something in French.`,`המצופים עוזבים את המים בנשימה אחת ארוכה. המחנה מצטמצם לכתם, אחר כך לחוט, אחר כך לכלום. לפנינו רצועת חצץ ואור בחלון, ואודיל, ליד ההגה, שרה משהו בצרפתית.`,{morale:8,order:3,food:1,flag:'ca_end_north'}],
   lose:[`The plane skips twice on the ice, and Odile swears in three languages. You take off on the third try, and the north is a long way, and the fuel gauge is very low.`,`המטוס קופץ פעמיים על הקרח, ואודיל מקללת בשלוש שפות. ממריאים בניסיון השלישי, והצפון רחוק, ומד הדלק נמוך מאוד.`,{hp:-6,morale:-4,flag:'ca_end_north'}]},
  {l:['Stay and run the camp','להישאר ולנהל את המחנה'],s:['Grizz cannot carry it alone.','גריז לא יכול לשאת את זה לבד.'],check:{stat:'charisma',dc:9,mod:()=>(flag('ca_refugees')?1:0)+(flag('ca_search')?1:0)},
   win:[`You stay. By summer the camp has a garden, a school, and a sign at the gate that says WELCOME, which Grizz painted himself and hates. The floatplane comes again in September, with two more passengers and a bag of seeds.`,`נשארים. עד הקיץ יש למחנה גינה, בית ספר ושלט בשער שאומר WELCOME, שגריז צבע בעצמו ושונא. מטוס הים חוזר בספטמבר, עם שני נוסעים נוספים ושק זרעים.`,{order:5,humanity:6,morale:6,flag:['ca_end_stay','builder']}],
   lose:[`The camp holds, but it is a hard summer, and Grizz is never quite the same. You keep it going with a shrug and a good stove, and you learn how much a winter can cost.`,`המחנה מחזיק, אבל זה קיץ קשה, וגריז לא אותו אדם. ממשיכים בהרמת כתפיים ותנור טוב, ולומדים כמה חורף יכול לעלות.`,{order:1,morale:-3,humanity:3,flag:'ca_end_stay'}]}
 ]}));
