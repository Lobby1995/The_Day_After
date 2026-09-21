
/* ===== THE JOURNALIST: "The Record" =====
 * A notebook, a folder someone should not have, a man on a toll road who agrees to talk, and a box that has to go somewhere.
 */
const JO={arc:'bg:journalist',label:['The Record','התיעוד'],of:4};
const JO_AGES=[
 [`Early in this, and the story is bigger than the one who writes it.`,`בתחילת הדרך, והסיפור גדול יותר מהכותב.`],
 [`You know what a story does to the person who tells it.`,`ידוע מה סיפור עושה למי שמספר אותו.`],
 [`You have written about worse, and none of it mattered less.`,`נכתב על דברים גרועים יותר, ואף אחד מהם לא היה פחות חשוב.`]];

chapter(Object.assign({},JO,{id:'jo_1',n:1,at:.12,
 t:['The Notebook','המחברת'],
 x:[()=>`You keep writing. It is habit, and it is also something else: a way of believing that what happens has a shape. The notebook is nearly full. ${ageAt(JO_AGES,0)} ${signAt(0)}`,
    ()=>`ממשיכים לכתוב. זה הרגל, וזה גם משהו אחר: דרך להאמין שלמה שקורה יש צורה. המחברת כמעט מלאה. ${ageAt(JO_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Record everything, unflinching','לתעד הכול, בלי למצמץ'],s:['Every name, every place, every hour.','כל שם, כל מקום, כל שעה.'],check:{stat:'wits',dc:8,bg:{journalist:2}},
   win:[`Every name, every place, every hour. By the end of the week the notebook is a map of the district's worst days, and it is the most honest thing you have ever written.`,`כל שם, כל מקום, כל שעה. עד סוף השבוע המחברת היא מפה של הימים הגרועים במחוז, והדבר הכן ביותר שנכתב אי פעם.`,{humanity:2,morale:-2,flag:'jo_all'}],
   lose:[`You write everything, and the writing takes the hours you needed for eating and sleeping. By Friday the notebook is full and you are not.`,`כותבים הכול, והכתיבה לוקחת את השעות שנדרשו לאכילה ולשינה. עד יום שישי המחברת מלאה, והכותב לא.`,{hp:-5,morale:-3,flag:'jo_all'}]},
  {l:['Record only what helps','לתעד רק מה שעוזר'],s:['Who needs what, and where it is.','מי צריך מה, ואיפה זה.'],check:{stat:'charisma',dc:8},
   win:[`You write down who needs what, where it is, and who has too much. The notebook becomes a ledger of favors. People start to bring you things to write down, and a few of them bring bread.`,`רושמים מי צריך מה, איפה זה, ולמי יש יותר מדי. המחברת הופכת לפנקס של טובות. אנשים מתחילים להביא דברים לרשום, וכמה מביאים לחם.`,{food:2,order:2,humanity:1,flag:'jo_useful'}],
   lose:[`You write down what helps, and it leaves out the most important thing, and you do not find out what until later.`,`רושמים מה שעוזר, וזה משמיט את הדבר החשוב ביותר, ורק אחר כך מגלים מה.`,{morale:-3,flag:'jo_useful'}]}
 ]}));

chapter(Object.assign({},JO,{id:'jo_2',n:2,at:.30,
 t:['The Leak','הדליפה'],
 x:[()=>`A man in a torn suit comes to you at dusk with a folder. It is a set of orders from a ministry, dated eleven days before the outbreak: they knew, and they said nothing. He wants it published. ${flag('jo_all')?'Your notebook already has the dates it corroborates.':flag('jo_useful')?'You know exactly who would be hurt by it, and who would be helped.':'You are not sure who is telling the truth, and you are not sure it matters.'}`,
    ()=>`אדם בחליפה קרועה בא עם תיק מסמכים עם רדת החשכה. זו קבוצת הוראות ממשרד ממשלתי, מתאריך אחד עשר ימים לפני ההתפרצות: הם ידעו, ולא אמרו דבר. הוא רוצה שיפורסם. ${flag('jo_all')?'במחברת כבר יש התאריכים שזה מאשר.':flag('jo_useful')?'ידוע בדיוק מי ייפגע ממנו, ומי ייהנה.':'לא ברור מי אומר אמת, ולא ברור שזה משנה.'}`],
 ch:[
  {l:['Publish it','לפרסם'],s:['Copy it a hundred times, by hand.','להעתיק מאה פעמים, ביד.'],check:{stat:'charisma',dc:9},
   win:[`You copy it a hundred times, in longhand, by candlelight, and it passes through the district hand to hand. It is the loudest quiet thing you have ever done, and it makes some people very angry and some people cry.`,`מעתיקים מאה פעמים, בכתב יד, לאור נרות, וזה עובר במחוז מיד ליד. זה הדבר השקט והרועש ביותר שנעשה, והוא מכעיס אנשים מאוד ומבכה אחרים.`,{humanity:4,order:-2,morale:2,flag:'jo_published'}],
   lose:[`You publish it, and it is read the wrong way. A crowd goes to a warehouse that has nothing in it, and comes back angrier than it left.`,`מפרסמים, וזה נקרא בדרך הלא נכונה. המון הולך למחסן שאין בו כלום, וחוזר כועס יותר משהלך.`,{order:-4,morale:-5,hp:-3,flag:'jo_published'}]},
  {l:['Hold it for later','להחזיק את זה לאחר כך'],s:['Some stories are for after.','יש סיפורים שמיועדים לאחר כך.'],check:{stat:'wits',dc:8},
   win:[`You put it in a jar, wrap the jar in oilcloth, and bury it at the foot of a wall. A story is not always for now. Some are for after.`,`שמים בצנצנת, עוטפים את הצנצנת בבד שעווה, וקוברים בתחתית קיר. סיפור אינו תמיד בשביל עכשיו. חלקם בשביל אחר כך.`,{order:2,humanity:1,morale:1,flag:'jo_held'}],
   lose:[`You hold it, and the man in the torn suit watches you do it and does not say a word. It is the last time you see him.`,`מחזיקים, והאדם בחליפה הקרועה צופה ולא אומר מילה. זו הפעם האחרונה שרואים אותו.`,{morale:-5,humanity:-2,flag:'jo_held'}]}
 ]}));

chapter(Object.assign({},JO,{id:'jo_3',n:3,at:.58,
 t:['The Interview','הראיון'],
 x:[`The man who runs the toll road agrees to be interviewed. He sits in a plastic chair with a mug and a very good coat, and he wants to talk about order. You have a notebook and a recorder with one bar left. He has thirty men, and they are standing behind you.`,
    `האיש שמנהל את דרך האגרה מסכים להתראיין. הוא יושב על כיסא פלסטיק עם ספל ומעיל מצוין, ורוצה לדבר על סדר. יש מחברת ומקליט עם פס אחד. לו יש שלושים אנשים, והם עומדים מאחור.`],
 ch:[
  {l:['Ask the hard question','לשאול את השאלה הקשה'],s:['What happens to the ones who cannot pay?','מה קורה למי שלא יכול לשלם?'],check:{stat:'charisma',dc:10},
   win:[`You ask about the road, and the toll, and what happens to the ones who cannot pay. He is very still. Then he answers, at length, honestly, and you understand that people who are never asked hard questions are relieved when somebody does.`,`שואלים על הדרך, על האגרה, ועל מה שקורה למי שלא יכול לשלם. הוא דומם מאוד. ואז הוא עונה, בארוכה, בכנות, ומבינים שמי שלא שואלים אותו שאלות קשות נרגע כשמישהו שואל.`,{humanity:3,order:2,morale:3,flag:'jo_hard'}],
   lose:[`You ask, and he smiles the smile of someone who has been asked before. You leave with a good line, a bruised rib and the strong sense of being allowed to.`,`שואלים, והוא מחייך חיוך של מי ששאלו אותו כבר. יוצאים עם משפט טוב, צלע חבולה ותחושה חזקה שהרשו.`,{hp:-6,morale:-3,flag:'jo_hard'}]},
  {l:['Let him talk','לתת לו לדבר'],s:['Say almost nothing, and listen.','לא להגיד כמעט כלום, ולהקשיב.'],check:{stat:'wits',dc:9},
   win:[`You say almost nothing, and he says almost everything. By the end, he has told you where the toll road ends, where it starts, how many men he has, and who he is afraid of.`,`אומרים כמעט כלום, והוא אומר כמעט הכול. עד הסוף הוא סיפר איפה דרך האגרה נגמרת, איפה היא מתחילה, כמה אנשים יש לו, וממי הוא מפחד.`,{food:1,morale:2,order:1,flag:['jo_listened','map']}],
   lose:[`You let him talk, and he says nothing that is not already in the newspapers. You leave with pages of nothing, and a feeling of having been managed.`,`נותנים לו לדבר, והוא לא אומר דבר שלא כבר בעיתונים. יוצאים עם עמודים של כלום, ותחושה שניהלו אותך.`,{morale:-4,flag:'jo_listened'}]}
 ]}));

chapter(Object.assign({},JO,{id:'jo_4',n:4,at:.80,
 t:['The Archive','הארכיון'],
 x:[()=>`You have a box of notebooks, a jar of paper buried at the foot of a wall, and a voice that a few thousand people know. ${flag('jo_published')?'The story you published has become a rumor with your name on it.':flag('jo_held')?'The folder in the jar has grown heavier with every week.':'The notebooks are in your bag, and they are the whole of what you have.'} A truck is leaving for a city with a working press, tonight.`,
    ()=>`יש קופסה של מחברות, צנצנת נייר קבורה בתחתית קיר, וקול שכמה אלפים מכירים. ${flag('jo_published')?'הסיפור שפורסם הפך לשמועה עם שם עליה.':flag('jo_held')?'התיק שבצנצנת נעשה כבד יותר בכל שבוע.':'המחברות בתיק, והן כל מה שיש.'} משאית יוצאת הלילה לעיר עם מכבש דפוס שעובד.`],
 ch:[
  {l:['Broadcast it now','לפרסם עכשיו'],s:['A press that has been waiting for anything.','מכבש שמחכה לכל דבר.'],check:{stat:'charisma',dc:10},
   win:[`You climb on the truck with the box in your arms, and talk to a press that has been waiting for anything. By morning three thousand copies of a single page exist, and the page says what happened.`,`עולים למשאית עם הקופסה בזרועות, ומדברים אל מכבש שמחכה לכל דבר. עד הבוקר קיימים שלושת אלפים עותקים של עמוד אחד, והעמוד אומר מה קרה.`,{humanity:5,order:2,morale:6,flag:'jo_end_out'}],
   lose:[`The press is closed, the city is quiet, and the box goes back on the truck with you. It is the longest ride of your life.`,`המכבש סגור, העיר שקטה, והקופסה חוזרת על המשאית. זו הנסיעה הארוכה ביותר בחיים.`,{morale:-6,hp:-3,flag:'jo_end_out'}]},
  {l:['Hide it for the future','להסתיר בשביל העתיד'],s:['A chalk cross, and no one told.','צלב גיר, ואיש לא יודע.'],check:{stat:'stealth',dc:9},
   win:[`You bury the box under a concrete step, mark it with a chalk cross, and tell no one. It will be found in a decade by someone who has never heard of you. You do not mind.`,`קוברים את הקופסה מתחת למדרגת בטון, מסמנים בצלב גיר, ולא אומרים לאיש. היא תימצא בעוד עשור על ידי מי שלא שמע על הכותב. זה לא מפריע.`,{morale:5,humanity:4,order:1,flag:'jo_end_hidden'}],
   lose:[`You hide it, and the hiding is not good enough. A week later the step is broken, the box is gone, and the story goes with it.`,`מסתירים, וההסתרה לא מספיק טובה. שבוע אחר כך המדרגה שבורה, הקופסה נעלמה, והסיפור איתה.`,{morale:-8,humanity:-1,flag:'jo_end_hidden'}]}
 ]}));
