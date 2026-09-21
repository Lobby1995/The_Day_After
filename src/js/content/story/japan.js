
/* ===== JAPAN: "The Rulebook" =====
 * Order is the whole culture, and order is what is about to crack. Fukuda-san runs an evacuation center by a sheet of
 * fourteen rules. Miyu is the one who breaks them. Captain Endo has a boat, and a small hope.
 */
const JP={arc:'loc:japan',label:['The Rulebook','ספר החוקים'],of:6};

chapter(Object.assign({},JP,{id:'jp_1',n:1,at:.06,
 t:['Registration','רישום'],
 x:[`The evacuation center is a school gym with the lines already painted on the floor. Fukuda-san, a retired schoolmaster with a folder and a very good pen, writes down every name, every allergy, every skill. He hands you a sheet of paper with fourteen rules and says the rules are what will keep them alive. Then he asks what you can do.`,
    `מרכז הפינוי הוא אולם ספורט של בית ספר, והקווים כבר מסומנים על הרצפה. פוקודה, מנהל בית ספר בדימוס עם תיק ועט מצוין, רושם כל שם, כל אלרגיה, כל מיומנות. הוא מוסר דף עם ארבעה עשר כללים ואומר שהכללים הם מה שיחזיק את כולם בחיים. אחר כך הוא שואל מה אפשר לעשות.`],
 ch:[
  {l:['Follow every rule, and volunteer','לפעול לפי כל כלל ולהתנדב'],s:['Order is the only thing that scales.','סדר הוא הדבר היחיד שגדל.'],check:{stat:'charisma',dc:7},
   win:[`Within two days you are on the water rota, the night watch, and the list of people Fukuda-san trusts to read the rules aloud. He does not smile. He writes your name with the good pen.`,`תוך יומיים בתורנות המים, בשמירת הלילה וברשימת האנשים שפוקודה סומך עליהם להקריא את הכללים. הוא לא מחייך. הוא כותב את השם בעט המצוין.`,{order:3,morale:3,food:1,flag:'jp_obeyed'}],
   lose:[`You mislabel a bag of rice, and Fukuda-san corrects you three times, gently, in front of everyone. You do not make that mistake again, and you do not forget it.`,`סימנת שק אורז לא נכון, ופוקודה מתקן שלוש פעמים, בעדינות, מול כולם. לא חוזרים על הטעות, ולא שוכחים אותה.`,{morale:-4,order:1,flag:'jp_obeyed'}]},
  {l:['Find the gaps in the rules','למצוא את הפרצות בחוקים'],s:['Every rulebook has a back door.','בכל ספר חוקים יש דלת אחורית.'],check:{stat:'stealth',dc:9},
   win:[`Rule nine has no clause about the roof, and rule eleven forgets the storeroom. You find both by the end of the first night, and take nothing, and remember everything.`,`בכלל תשע אין סעיף על הגג, ובכלל אחד עשר שוכחים את חדר האחסון. מצאת את שניהם עד סוף הלילה הראשון, לא לקחת דבר, וזכרת הכול.`,{morale:2,humanity:-1,flag:'jp_gaps'}],
   lose:[`A watchman finds you on the roof at three. He says nothing, bows, and writes it down. Fukuda-san reads it out at breakfast, without a name, and everyone looks at you.`,`שומר מוצא אותך על הגג בשלוש. הוא לא אומר דבר, משתחווה, ורושם. פוקודה מקריא את זה בארוחת הבוקר, בלי שם, וכולם מסתכלים עליך.`,{morale:-6,order:-1}]}
 ]}));

chapter(Object.assign({},JP,{id:'jp_2',n:2,at:.20,
 t:['Miyu','מיו'],
 x:[()=>`Miyu is sixteen, has three piercings, and is the only person in the gym who has ever been late. She has been slipping out at night to bring medicine to her grandmother two districts away, and the watchman on the east door has started to notice. ${flag('jp_obeyed')?'You are on the watch list yourself now, and you see her go.':flag('jp_gaps')?'You know a gap she has not found yet.':'You see her go, by chance.'} She does not ask for help. She only looks at you, and waits.`,
    ()=>`מיו בת שש עשרה, עם שלושה עגילים, והיחידה באולם שאי פעם איחרה. היא מתגנבת בלילות כדי להביא תרופות לסבתה, שנמצאת שני רובעים משם, והשומר בדלת המזרחית התחיל לשים לב. ${flag('jp_obeyed')?'עכשיו גם השם ברשימת השמירה, ורואים אותה יוצאת.':flag('jp_gaps')?'ידועה פרצה שהיא עוד לא מצאה.':'רואים אותה יוצאת, במקרה.'} היא לא מבקשת עזרה. היא רק מסתכלת, ומחכה.`],
 ch:[
  {l:['Cover for her','לכסות עליה'],s:['A rule broken kindly is still a rule.','כלל שהופר בטוב לב הוא עדיין כלל.'],check:{stat:'stealth',dc:9},
   win:[`You loosen the east latch and hum a song as the watchman passes. Miyu is back before dawn with an empty bag and a full face. She does not say thank you. She leaves a rice ball on your pillow.`,`משחררים את בריח המזרח ומזמזמים שיר כשהשומר עובר. מיו חוזרת לפני עלות השחר עם תיק ריק ופנים מלאות. היא לא אומרת תודה. היא משאירה כדור אורז על הכרית.`,{humanity:4,morale:3,flag:'jp_cover'}],
   lose:[`The watchman sees the latch. He says nothing, bows to you both, and writes it down. The next morning you are both called to the front of the gym.`,`השומר רואה את הבריח. הוא לא אומר דבר, משתחווה לשניכם, ורושם. למחרת בבוקר שניכם נקראים לחזית האולם.`,{morale:-6,order:-1,flag:'jp_caught'}]},
  {l:['Tell Fukuda-san','לספר לפוקודה'],s:['Rules protect everyone, even the ones who break them.','חוקים מגנים על כולם, אפילו על מי שמפרים אותם.'],check:{stat:'charisma',dc:8},
   win:[`Fukuda-san listens with his pen down, which is a first. He does not punish her. He assigns her the night runs, officially, with a pass and a partner, and Miyu looks at you as if you have changed the rules of a game she liked.`,`פוקודה מקשיב כשהעט למטה, וזו הפעם הראשונה. הוא לא מעניש אותה. הוא מקצה לה את הריצות הלילה, רשמית, עם אישור ובן זוג, ומיו מסתכלת כאילו שונו הכללים של משחק שאהבה.`,{order:3,humanity:2,morale:2,flag:'jp_told'}],
   lose:[`Fukuda-san writes it down, and the writing is the end of it. Miyu is confined to the gym for a month, and the medicine for her grandmother does not go.`,`פוקודה רושם, והכתיבה היא הסוף. מיו מוגבלת לאולם למשך חודש, והתרופה לסבתה לא יוצאת.`,{order:1,humanity:-4,morale:-5,flag:'jp_told'}]}
 ]}));

chapter(Object.assign({},JP,{id:'jp_3',n:3,at:.36,
 t:['The Cut','ההפחתה'],
 x:[()=>`The generator fails on the ninth day. Fukuda-san cuts the ration by a third and posts the new numbers on the wall in his clean hand. People read them and say nothing, the way people say nothing when something is about to break. ${flag('jp_cover')?'Miyu is at your elbow, whispering about the storeroom.':flag('jp_told')?"Miyu, on her official run, has brought back a bag of rice from her grandmother's district.":flag('jp_caught')?'Miyu has stopped speaking to anyone.':'Nobody is looking at anybody.'}`,
    ()=>`הגנרטור נכשל ביום התשיעי. פוקודה מפחית את המנה בשליש ותולה את המספרים החדשים על הקיר בכתב ידו הנקי. אנשים קוראים ולא אומרים דבר, כמו שאנשים לא אומרים דבר כשמשהו עומד להישבר. ${flag('jp_cover')?'מיו ליד המרפק, לוחשת על חדר האחסון.':flag('jp_told')?'מיו, בריצה הרשמית שלה, הביאה שק אורז מהרובע של סבתה.':flag('jp_caught')?'מיו הפסיקה לדבר עם כולם.':'איש לא מסתכל על איש.'}`],
 ch:[
  {l:['Help enforce the cut','לעזור באכיפת ההפחתה'],s:['A rationed week is better than an empty one.','שבוע של מנות עדיף על שבוע ריק.'],check:{stat:'charisma',dc:9},
   win:[`You stand at the table and hand out the smaller portions with the same face you gave the large ones. Nobody riots. By evening a few of them thank you, in the very quiet way the country has for saying such things.`,`עומדים ליד השולחן ומחלקים את המנות הקטנות באותם פנים שחילקו את הגדולות. איש לא מתפרע. עד הערב כמה מהם מודים, בדרך השקטה מאוד שיש למדינה לומר דברים כאלה.`,{order:4,morale:-2,humanity:1,flag:'jp_enforced'}],
   lose:[`A man throws his bowl at the wall. It is not aimed at you, and it hits you anyway, and after that the line goes very still.`,`אדם זורק את הקערה בקיר. היא לא כוונה אליך, ופוגעת בך בכל זאת, ואחר כך התור נהיה דומם מאוד.`,{hp:-4,morale:-6,order:-1,flag:'jp_enforced'}]},
  {l:['Plan a night distribution','לתכנן חלוקה לילית'],s:['Some rules are about who eats, not what.','יש חוקים שעוסקים במי אוכל, לא במה.'],check:{stat:'stealth',dc:10},
   win:[`Twelve people, a storeroom key that exists only in a rumour, and a bag of rice that is not on any list. By dawn the smallest children have eaten twice, and no one knows how.`,`שנים עשר אנשים, מפתח למחסן שקיים רק בשמועה, ושק אורז שלא ברשימה. עד הבוקר הילדים הקטנים אכלו פעמיים, ואיש לא יודע איך.`,{food:2,humanity:5,order:-2,flag:'jp_night'}],
   lose:[`The storeroom is locked from the inside. You return to the gym with nothing and a very careful face.`,`המחסן נעול מבפנים. חוזרים לאולם בלי כלום ועם פנים זהירות מאוד.`,{morale:-4,hp:-2,flag:'jp_night'}]}
 ]}));

chapter(Object.assign({},JP,{id:'jp_4',n:4,at:.52,
 t:['The Wall','החומה'],
 x:[()=>`A tremor at two in the morning, small and mean, and the north wall of the gym opens a crack you could put an arm in. The old building groans. Fukuda-san stands in the doorway in his pyjamas with his folder against his chest and says, very calmly, that the rulebook has no rule for this. ${flag('jp_enforced')?'People look at you, the one who kept the line.':flag('jp_night')?'People look at you, the one who fed them.':'People look at each other.'}`,
    ()=>`רעד בשתיים בלילה, קטן ומרושע, והקיר הצפוני של האולם נפער בסדק שאפשר להכניס בו זרוע. הבניין הישן נאנח. פוקודה עומד בפתח בפיג׳מה עם התיק מול החזה ואומר, בשקט מוחלט, שבספר החוקים אין כלל לזה. ${flag('jp_enforced')?'אנשים מסתכלים עליך, על מי ששמר על התור.':flag('jp_night')?'אנשים מסתכלים עליך, על מי שהאכיל אותם.':'אנשים מסתכלים זה על זה.'}`],
 ch:[
  {l:['Shore up the wall','לחזק את הקיר'],s:['A crack can be held, if enough people hold it.','סדק אפשר להחזיק, אם מספיק אנשים מחזיקים.'],check:{stat:'strength',dc:9},
   win:[`Fifty people, a stack of gym mats, and the weight of the whole night. By dawn the wall holds, the gym is still a gym, and Fukuda-san writes a fifteenth rule at the bottom of his sheet: help each other.`,`חמישים איש, ערימת מזרני התעמלות ומשקל הלילה כולו. עד הבוקר הקיר מחזיק, האולם עדיין אולם, ופוקודה כותב כלל חמישה עשר בתחתית הדף: לעזור זה לזה.`,{order:4,humanity:4,morale:4,flag:'jp_wall'}],
   lose:[`The wall holds, but the roof does not. Half the gym is closed off, and the other half smells of dust and dread.`,`הקיר מחזיק, אבל התקרה לא. חצי מהאולם סגור, והחצי השני מסריח מאבק ומאימה.`,{hp:-8,morale:-6,order:-2,flag:'jp_wall'}]},
  {l:['Move everyone to the school yard','להעביר את כולם לחצר בית הספר'],s:['A yard has no ceiling to fall.','לחצר אין תקרה שתיפול.'],check:{stat:'stamina',dc:9},
   win:[`Two hundred people, moved quickly and quietly, with blankets and lists and small children asleep on shoulders. The yard is cold, the stars are clear, and no one has ever felt so keenly that a building can be lost.`,`מאתיים איש, מועברים מהר ובשקט, עם שמיכות ורשימות וילדים קטנים ישנים על כתפיים. החצר קרה, הכוכבים צלולים, ואיש מעולם לא הרגיש כל כך חזק שאפשר לאבד בניין.`,{morale:2,humanity:3,order:2,flag:'jp_yard'}],
   lose:[`The yard is wet, the night is long, and the crowd is cold and cranky. Somebody starts a fire that nobody approved, and Fukuda-san lets it burn.`,`החצר רטובה, הלילה ארוך, וההמון קר ורגוז. מישהו מדליק מדורה שאיש לא אישר, ופוקודה נותן לה לבעור.`,{hp:-4,morale:-5,order:-2,flag:'jp_yard'}]}
 ]}));

chapter(Object.assign({},JP,{id:'jp_5',n:5,at:.70,
 t:['The Harbor','הנמל'],
 x:[()=>`Captain Endo owns a fishing boat and a very small hope. His hull is sound, his tanks are full, and the sea to the south is empty. He wants people, forty at most, who can bail and pull a net and hold their tongues. Fukuda-san says the center must stay, that leaving is not in the rulebook. ${flag('jp_wall')?'The wall holds, and half the gym thinks that means they should.':flag('jp_yard')?'The yard is cold, and half the gym has stopped believing in walls.':'The center is quiet, and everyone is watching you.'}`,
    ()=>`קפטן אנדו הוא הבעלים של סירת דיג ושל תקווה קטנה מאוד. הגוף שלו יציב, המכלים מלאים, והים בדרום ריק. הוא רוצה אנשים, ארבעים לכל היותר, שיודעים לשאוב מים, למשוך רשת ולשתוק. פוקודה אומר שהמרכז חייב להישאר, ושעזיבה אינה בספר החוקים. ${flag('jp_wall')?'הקיר מחזיק, וחצי מהאולם חושבים שזה אומר שהם צריכים להישאר.':flag('jp_yard')?'החצר קרה, וחצי מהאולם הפסיקו להאמין בקירות.':'המרכז שקט, וכולם מסתכלים עליך.'}`],
 ch:[
  {l:['Negotiate an orderly departure for whoever wants it','לנהל מו״מ על עזיבה מסודרת'],s:['Nobody should be told to stay or go.','לאף אחד לא אומרים להישאר או ללכת.'],check:{stat:'charisma',dc:10},
   win:[`Fukuda-san reads the rulebook twice, and then puts down his pen. He writes a sixteenth rule that lets people choose. Forty go with Endo, and the rest stay, and there is a long, quiet bow between the two groups on the pier.`,`פוקודה קורא את ספר החוקים פעמיים, ואז מניח את העט. הוא כותב כלל שישה עשר שמאפשר לבחור. ארבעים הולכים עם אנדו, השאר נשארים, ויש השתחוות ארוכה ושקטה בין שתי הקבוצות על המזח.`,{order:2,humanity:6,morale:5,flag:'jp_choice'}],
   lose:[`The negotiation turns into an argument, and the argument turns into a line: those who go and those who stay. The center is never quite whole again.`,`המו״מ הופך לוויכוח, והוויכוח הופך לקו: אלה שהולכים ואלה שנשארים. המרכז לא נעשה שלם שוב.`,{morale:-6,order:-3,flag:'jp_split'}]},
  {l:['Sign on as crew','להצטרף כצוות'],s:['A boat needs hands more than words.','סירה צריכה ידיים יותר ממילים.'],check:{stat:'stamina',dc:9},
   win:[`You bail, you haul, you learn three knots and one very rude song. By the end of the week Endo trusts you with the tiller, and the boat has a name that is not on any list.`,`שואבים, מושכים, לומדים שלושה קשרים ושיר גס מאוד. עד סוף השבוע אנדו סומך עליך על ההגה, ולסירה יש שם שלא מופיע באף רשימה.`,{food:2,water:1,morale:5,flag:'jp_crew'}],
   lose:[`The sea is bigger than the harbour. You spend the day sick over the side, and Endo watches with a patience that is not quite pity.`,`הים גדול מהנמל. בילית את היום מקיא מעבר לדופן, ואנדו מסתכל בסבלנות שאינה ממש רחמים.`,{hp:-4,morale:-4,flag:'jp_crew'}]}
 ]}));

chapter(Object.assign({},JP,{id:'jp_6',n:6,at:.88,
 t:['The Tide','הגאות'],
 x:[()=>`The morning of the last day of the plan. The boat is at the pier, engine warm, forty people on the deck with small bags on their knees. Fukuda-san stands at the gym door with his folder, and behind him the center holds a hundred and sixty more. ${flag('jp_choice')?'Both groups have said their goodbyes with a long bow.':flag('jp_split')?'The goodbyes were not said, and everyone knows it.':flag('jp_crew')?'Endo looks at you across the water and raises one hand.':''} The tide is turning, and it will not wait for a decision.`,
    ()=>`בוקר היום האחרון של התוכנית. הסירה על המזח, המנוע חם, ארבעים איש על הסיפון עם תיקים קטנים על הברכיים. פוקודה עומד בדלת האולם עם התיק, ומאחוריו המרכז מחזיק עוד מאה ושישים. ${flag('jp_choice')?'שתי הקבוצות נפרדו בהשתחוות ארוכה.':flag('jp_split')?'הפרידות לא נאמרו, וכולם יודעים.':flag('jp_crew')?'אנדו מסתכל עליך מעל המים ומרים יד אחת.':''} הגאות מסתובבת, והיא לא תחכה להחלטה.`],
 ch:[
  {l:['Go with the boat','לעלות על הסירה'],s:['The sea is wide, and the boat is small.','הים רחב, והסירה קטנה.'],check:{stat:'stamina',dc:9,mod:()=>(flag('jp_crew')?2:0)+(flag('jp_choice')?1:0)-(flag('jp_split')?1:0)},
   win:[`The engine catches, the lines come in, and the pier slides away. Fukuda-san bows from the door, deeply, for a long time. You bow back until the pier is a line, and the line is a thread, and the thread is gone.`,`המנוע נתפס, החבלים נכנסים, והמזח מחליק. פוקודה משתחווה מהדלת, עמוק, זמן רב. משתחווים בחזרה עד שהמזח קו, והקו חוט, והחוט נעלם.`,{morale:8,humanity:3,order:2,flag:'jp_end_sea'}],
   lose:[`The engine dies twice in the first hour, and a squall comes out of nowhere. You limp south with two fewer on board and a lot more silence, and the boat still floats.`,`המנוע מת פעמיים בשעה הראשונה, וסערה יוצאת משום מקום. צולעים דרומה עם שניים פחות על הסיפון והרבה יותר שקט, והסירה עדיין צפה.`,{hp:-8,morale:-4,flag:'jp_end_sea'}]},
  {l:['Stay and keep the center','להישאר ולשמור את המרכז'],s:['Someone has to write the sixteenth rule.','מישהו צריך לכתוב את הכלל השישה עשר.'],check:{stat:'charisma',dc:9,mod:()=>flag('jp_wall')?1:0},
   win:[`You stand at the gym door next to Fukuda-san, and the boat leaves without you. By winter the center has a garden, a school, and a folder that has grown to a hundred pages. On the first page, in his clean hand, it says: begin again.`,`עומדים בדלת האולם ליד פוקודה, והסירה יוצאת בלעדיכם. עד החורף יש למרכז גינה, בית ספר ותיק שגדל למאה עמודים. בעמוד הראשון, בכתב ידו הנקי, כתוב: להתחיל מחדש.`,{order:5,humanity:5,morale:6,flag:['jp_end_stay','builder']}],
   lose:[`The center holds, but it is smaller than it was, and Fukuda-san is quieter. You keep the gate, and the folder, and the pen.`,`המרכז מחזיק, אבל הוא קטן ממה שהיה, ופוקודה שקט יותר. שומרים על השער, על התיק ועל העט.`,{order:1,morale:-3,humanity:3,flag:'jp_end_stay'}]}
 ]}));
