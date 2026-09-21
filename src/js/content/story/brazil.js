
/* ===== BRAZIL: "Rooftops" =====
 * The roofs of a dark megacity are stitched together into a network called the Net.
 * Renata runs its radio. Seu Osvaldo owns the only working well. Ze Cabo knows the tunnels.
 * The arc ends at the river, where a convoy of boats is leaving north.
 */
const BR={arc:'loc:brazil',label:['Rooftops','הגגות'],of:6,rich:true};

chapter(Object.assign({},BR,{id:'br_1',n:1,at:.06,
 t:['The Net','הרשת'],
 x:[`The roof of the building is no longer the top of anything. Planks, ropes and a rusted zip-line stitch it to the roofs beside it, a hundred rooftops in all. A woman in a headset, Renata, watches you climb up. She says the Net has one rule: anyone who wants a bed carries something across the gap.`,
    `הגג של הבניין כבר לא הנקודה הגבוהה ביותר. קרשים, חבלים וקו אחיד חלוד מחברים אותו לגגות שלידו, מאה גגות בסך הכול. אישה עם אוזניות, רנטה, צופה בטיפוס. היא אומרת שלרשת יש כלל אחד: מי שרוצה מיטה מעביר משהו מעבר לפער.`],
 ch:[
  {l:['Carry the crate across the gap','להעביר את הארגז מעבר לפער'],s:['Nine meters of plank, and a long drop.','תשעה מטרים של קרש, ונפילה ארוכה.'],check:{stat:'stamina',dc:9},
   win:[`You cross with your eyes on the far post and never look down. Renata nods once and points to a bed under a blue tarp. You are in the Net.`,`חצית עם העיניים על העמוד הרחוק ולא הסתכלת למטה. רנטה הנהנה פעם אחת והצביעה על מיטה מתחת ליריעה כחולה. נכנסת לרשת.`,{morale:6,order:2,flag:'br_net'}],
   lose:[`Halfway across, a plank shifts. You make it, but the crate does not, and Renata says the bed can wait a night.`,`באמצע הדרך קרש זז. הגעת, אבל הארגז לא, ורנטה אומרת שהמיטה יכולה לחכות ללילה.`,{hp:-8,morale:-4}]},
  {l:['Trade what you know','לסחור במה שיודעים'],s:['News from the streets is worth a bed.','חדשות מהרחובות שוות מיטה.'],check:{stat:'charisma',dc:8},
   win:[`You describe every street you crossed: where the dead gather, where the water still runs. Renata writes it on her arm and gives you a bed, a blanket, and a nickname.`,`תיארת כל רחוב שחצית: איפה המתים מתאספים, איפה המים עדיין זורמים. רנטה רושמת על הזרוע ונותנת מיטה, שמיכה וכינוי.`,{morale:4,order:1,water:1,flag:'br_net'}],
   lose:[`Your news is old, and Renata knows it. You sleep on the stairs, and the Net remembers.`,`החדשות ישנות, ורנטה יודעת. ישנת על המדרגות, והרשת זוכרת.`,{morale:-4,flag:'br_outsider'}]}
 ]}));

chapter(Object.assign({},BR,{id:'br_2',n:2,at:.20,
 t:['Water Rights','זכויות מים'],
 x:[()=>`Seu Osvaldo owns the only working well in six blocks, and a pump he guards with two nephews and a shotgun. Every roof pays him in food, or in favors. ${flag('br_net')?'Renata asks the Net to send someone to talk to him.':'Nobody asks you to do anything; the water simply runs out.'}`,
    ()=>`סניור אוסוולדו מחזיק את הבאר היחידה שעובדת בטווח שישה בלוקים, ומשאבה ששני אחיינים ורובה ציד שומרים עליה. כל גג משלם לו באוכל או בטובות. ${flag('br_net')?'רנטה מבקשת מהרשת לשלוח מישהו לדבר איתו.':'איש לא מבקש דבר; המים פשוט נגמרים.'}`],
 ch:[
  {l:['Negotiate a share for the roofs','לנהל מו״מ על חלק בשביל הגגות'],s:['A deal that lasts is worth a bad day.','עסקה שמחזיקה שווה יום רע.'],check:{stat:'charisma',dc:9},
   win:[`Osvaldo listens for an hour and names his price: a repaired roof tank, and a favor to be named later. Water flows to the roofs at dawn.`,`אוסוולדו מקשיב שעה ונוקב במחיר: מיכל גג מתוקן, וטובה שתיקבע בהמשך. המים זורמים אל הגגות עם עלות השחר.`,{water:4,order:2,morale:3,flag:'br_osvaldo_deal'}],
   lose:[`He laughs, keeps the well, and sends his nephews to walk you to the stairs.`,`הוא צוחק, שומר על הבאר, ושולח את האחיינים ללוות עד המדרגות.`,{morale:-5,hp:-4}]},
  {l:['Cut his pump at night','לחתוך את המשאבה שלו בלילה'],s:['Water is a right, not a business.','מים הם זכות, לא עסק.'],check:{stat:'stealth',dc:10},
   win:[`Two bolts, one wire, and the pump dies without a sound. By morning every roof draws from the old cistern, and Osvaldo blames the wind.`,`שני ברגים, חוט אחד, והמשאבה מתה בלי קול. עד הבוקר כל הגגות שואבים מהבור הישן, ואוסוולדו מאשים את הרוח.`,{water:3,humanity:-2,order:-1,flag:'br_osvaldo_enemy'}],
   lose:[`A nephew hears the wrench. You run over three roofs with the shotgun behind you, and the story is all over the Net by morning.`,`אחיין שומע את המפתח. רצת מעל שלושה גגות עם הרובה מאחוריך, והסיפור ברשת עד הבוקר.`,{hp:-10,morale:-4,flag:'br_osvaldo_enemy'}]}
 ]}));

chapter(Object.assign({},BR,{id:'br_3',n:3,at:.36,
 t:['The Tunnels','המנהרות'],
 x:[`Ze Cabo, who spent thirty years repairing the city's cables, draws a map on a pizza box: a service tunnel that runs under six avenues. It would let the Net move food without crossing a single street. He says the water rose in the last rains, and that something is living at the far end.`,
    `זה קאבו, שבילה שלושים שנה בתיקון כבלי העיר, מצייר מפה על קופסת פיצה: מנהרת שירות שעוברת מתחת לשש שדרות. היא תאפשר לרשת להעביר אוכל בלי לחצות רחוב אחד. הוא אומר שהמים עלו בגשמים האחרונים, ושמשהו גר בקצה השני.`],
 ch:[
  {l:['Lead a party through','להוביל קבוצה דרכה'],s:['Bring strong backs and a lamp.','לקחת גב חזק ופנס.'],check:{stat:'strength',dc:10,danger:true},
   win:[`Waist-deep water, a hundred meters of dark, and three of the dead who never see the lamp coming. On the far side Ze Cabo laughs out loud, and the Net has a road.`,`מים עד המותניים, מאה מטר של חושך, ושלושה מתים שלא רואים את הפנס מגיע. בצד השני זה קאבו צוחק בקול, ולרשת יש דרך.`,{order:3,humanity:2,food:2,flag:'br_tunnels'}],
   lose:[`The far end was worse than he said. You get everyone back, but the tunnel closes behind you, and someone does not come back up.`,`הקצה השני היה גרוע ממה שאמר. החזרת את כולם, אבל המנהרה נסגרת מאחוריכם, ומישהו לא עולה בחזרה.`,{hp:-14,inf:8,morale:-8}]},
  {l:['Send Ze Cabo with your map','לשלוח את זה קאבו עם המפה'],s:['He knows the dark. The Net knows the roofs.','הוא מכיר את החושך. הרשת מכירה את הגגות.'],check:{stat:'wits',dc:8},
   win:[`He returns at dawn with mud to his ears and a grin. The tunnel is clear, and he has marked every place where the ceiling might fall.`,`הוא חוזר עם עלות השחר עם בוץ עד האוזניים וחיוך. המנהרה פנויה, והוא סימן כל מקום שבו התקרה עלולה ליפול.`,{order:2,morale:4,flag:'br_tunnels'}],
   lose:[`He does not return. Three days later a boy finds his headlamp on a roof, and no one says what it means.`,`הוא לא חוזר. שלושה ימים אחר כך ילד מוצא את פנס הראש שלו על גג, ואיש לא אומר מה זה אומר.`,{morale:-8,humanity:-1}]}
 ]}));

chapter(Object.assign({},BR,{id:'br_4',n:4,at:.52,
 t:['Blackout Night','לילה בלי חשמל'],
 x:[()=>`The last working transformer for miles dies with a crack, and the Net goes dark: no radio light, no pump, no lamps on the walkways. In the dark, someone cuts a rope. ${flag('br_osvaldo_deal')?"Osvaldo sends word: his nephews hold the well, and will hold your stairs too, if you ask.":flag('br_osvaldo_enemy')?"Across the street, Osvaldo's nephews have lit a fire. They are not there to help.":'From the street below comes the sound of a crowd, moving.'}`,
    ()=>`השנאי האחרון שעבד ברדיוס קילומטרים מת בנפץ, והרשת חשוכה: אין אור ברדיו, אין משאבה, אין מנורות על המעברים. בחושך מישהו חותך חבל. ${flag('br_osvaldo_deal')?'אוסוולדו שולח הודעה: האחיינים שלו שומרים על הבאר וישמרו גם על המדרגות, אם יבקשו.':flag('br_osvaldo_enemy')?'מעבר לרחוב האחיינים של אוסוולדו הדליקו מדורה. הם לא באו לעזור.':'מהרחוב למטה עולה קול של המון בתנועה.'}`],
 ch:[
  {l:['Hold the roofs','להחזיק את הגגות'],s:['Every rope, every plank.','כל חבל, כל קרש.'],check:{stat:'strength',dc:10,danger:true},
   win:[`You spend the night on the planks with a pipe and a lamp of burning cloth. At dawn the ropes are still tied and the Net still stands.`,`בילית את הלילה על הקרשים עם צינור ופנס של בד בוער. עם עלות השחר החבלים עדיין קשורים והרשת עדיין עומדת.`,{order:3,morale:5,hp:-4}],
   lose:[`You lose two roofs and eleven people. The rest hold, but the Net is smaller than it was.`,`איבדת שני גגות ואחד עשר אנשים. השאר מחזיקים, אבל הרשת קטנה ממה שהייתה.`,{hp:-12,morale:-8,order:-3}]},
  {l:['Move everyone through the tunnels','לפנות את כולם דרך המנהרות'],s:['A road under the streets, if there is one.','דרך מתחת לרחובות, אם יש.'],check:{stat:'stamina',dc:9,mod:()=>flag('br_tunnels')?2:-2},
   win:[`In the dark, hand on shoulder, three hundred people file down the ladder and out under the avenues. Nobody speaks. Nobody is lost.`,`בחושך, יד על כתף, שלוש מאות איש יורדים בסולם ויוצאים מתחת לשדרות. איש לא מדבר. איש לא אבוד.`,{humanity:6,order:2,morale:6}],
   lose:[`Without a clear road, the tunnel becomes a trap. You get most of them out, and some of them are not the people you started with.`,`בלי דרך ברורה, המנהרה הופכת למלכודת. הוצאת את רובם, ואחדים מהם כבר לא אלה שהתחלת איתם.`,{hp:-10,morale:-8,inf:6}]}
 ]}));

chapter(Object.assign({},BR,{id:'br_5',n:5,at:.70,
 t:['The Convoy','השיירה'],
 x:[()=>`Renata's radio catches a voice from the river: a convoy of fishing boats leaving north in three days, room for two hundred, no more. The Net has nine hundred. ${flag('br_tunnels')?'The tunnels reach the docks.':'The only road to the docks crosses open streets.'}`,
    ()=>`הרדיו של רנטה קולט קול מהנהר: שיירת סירות דיג יוצאת צפונה בעוד שלושה ימים, מקום למאתיים, לא יותר. ברשת יש תשע מאות. ${flag('br_tunnels')?'המנהרות מגיעות עד המזחים.':'הדרך היחידה למזחים חוצה רחובות פתוחים.'}`],
 ch:[
  {l:['Draw lots, and give up your own seat','להגריל מקומות ולוותר על המקום שלך'],s:['Fairness costs something.','הוגנות עולה משהו.'],check:{stat:'charisma',dc:9},
   win:[`The lots are drawn in front of everyone, on the roof, by a child. Your name is not on the list. Renata cries and does not argue, and the Net has never been so quiet.`,`ההגרלה נעשית מול כולם, על הגג, בידי ילד. שמך לא ברשימה. רנטה בוכה ולא מתווכחת, והרשת מעולם לא הייתה כל כך שקטה.`,{humanity:10,morale:2,order:2,flag:'br_seat_given'}],
   lose:[`The lots are fair, and nobody believes it. By nightfall there are three lists, and two fights.`,`ההגרלה הוגנת, ואף אחד לא מאמין. עד הלילה יש שלוש רשימות, ושתי קטטות.`,{morale:-6,order:-3,hp:-6}]},
  {l:['Buy a seat with what you carry','לקנות מקום במה שנושאים'],s:['The world has a price for everything.','לעולם יש מחיר לכל דבר.'],check:{stat:'charisma',dc:9},
   win:[`The boatman takes your medicine, your last ammunition and a promise. He writes your name on a hull plank, and you carry the weight of it all night.`,`בעל הסירה לוקח את התרופות, את התחמושת האחרונה והבטחה. הוא כותב את שמך על קרש בגוף הסירה, ואת המשקל שלו נושאים כל הלילה.`,{meds:-1,ammo:-1,humanity:-6,flag:'br_seat_taken'}],
   lose:[`Someone outbids you with more than you have. The boatman shrugs. You are still in the city, and the Net has watched.`,`מישהו מציע יותר ממה שיש לך. בעל הסירה מושך בכתפיים. עדיין בעיר, והרשת ראתה.`,{morale:-6,humanity:-2}]}
 ]}));

chapter(Object.assign({},BR,{id:'br_6',n:6,at:.88,
 t:['The River','הנהר'],
 x:[()=>`Dawn at the docks. Forty boats, engines coughing, and a crowd that reaches the water. ${flag('br_seat_taken')?'Your name is on a plank.':flag('br_seat_given')?'You gave your seat away, and the boatman has heard.':'You have no seat, and no one to give you one.'} Renata stands on the last roof with the radio. She says the Net will hold as long as someone is on it.`,
    ()=>`עלות השחר במזחים. ארבעים סירות, מנועים משתעלים, והמון שמגיע עד המים. ${flag('br_seat_taken')?'שמך על קרש.':flag('br_seat_given')?'ויתרת על המקום, ובעל הסירה שמע.':'אין מקום, ואין מי שייתן.'} רנטה עומדת על הגג האחרון עם הרדיו. היא אומרת שהרשת תחזיק כל עוד מישהו נמצא בה.`],
 ch:[
  {l:['Board and go north','לעלות על סירה ולצאת צפונה'],s:['A long river, and something better at the end of it.','נהר ארוך, ומשהו טוב יותר בסופו.'],check:{stat:'stamina',dc:10,mod:()=>flag('br_seat_taken')?2:flag('br_seat_given')?1:-1},
   win:[`The river opens up wide and brown and empty. On the second night someone starts to sing, and the boats answer. You do not look back until the roofs are gone.`,`הנהר נפתח רחב, חום וריק. בלילה השני מישהו מתחיל לשיר, והסירות עונות. לא הסתכלת אחורה עד שהגגות נעלמו.`,{morale:10,order:4,humanity:2,flag:'br_end_north'}],
   lose:[`The river is not empty. You reach the north bank with fewer boats and fewer people than you left with, and with a story you cannot tell yet.`,`הנהר לא ריק. הגעת לגדה הצפונית עם פחות סירות ופחות אנשים ממה שיצאו, ועם סיפור שעוד אי אפשר לספר.`,{hp:-12,morale:-6,flag:'br_end_north'}]},
  {l:['Stay and hold the Net','להישאר ולהחזיק את הרשת'],s:['Someone has to keep the lamps lit.','מישהו צריך להשאיר את המנורות דולקות.'],check:{stat:'strength',dc:9,mod:()=>flag('br_tunnels')?1:0},
   win:[`The boats leave. The roofs stay. You spend the winter teaching the Net to grow its own gardens, and by spring a pigeon lands on the antenna with a note: from the north, we are alive.`,`הסירות יוצאות. הגגות נשארים. בילית את החורף בללמד את הרשת לגדל גינות משלה, ועד האביב יונה נוחתת על האנטנה עם פתק: מהצפון, אנחנו חיים.`,{order:6,humanity:6,morale:8,flag:['br_end_stay','builder']}],
   lose:[`The Net holds, but not all of it. You keep three roofs, one lamp, and a promise to Renata not to give up.`,`הרשת מחזיקה, אבל לא כולה. נשארים שלושה גגות, מנורה אחת, והבטחה לרנטה לא לוותר.`,{order:1,morale:-2,humanity:3,flag:'br_end_stay'}]}
 ]}));
