
/* ===== THE TEACHER: "The Register" =====
 * The register still has thirty-one names. Every morning it is read aloud, and every morning fewer answer.
 */
const TE={arc:'bg:teacher',label:['The Register','רשימת הנוכחות'],of:4};
const TE_AGES=[
 [`You are still learning how to sound calm.`,`עדיין לומדים איך להישמע רגועים.`],
 [`Ten thousand mornings, and it has never once been this quiet.`,`עשרת אלפים בקרים, ולא היה אף פעם כל כך שקט.`],
 [`You have read this register in your sleep for decades.`,`קראת את הרשימה הזו בשינה כבר עשרות שנים.`]];

chapter(Object.assign({},TE,{id:'te_1',n:1,at:.12,
 t:['Roll Call','קריאת שמות'],
 x:[()=>`Every morning, before anything else, you read the register aloud. Thirty-one names. Nineteen answer. ${ageAt(TE_AGES,0)} ${signAt(0)}`,
    ()=>`בכל בוקר, לפני כל דבר אחר, קוראים את הרשימה בקול. שלושים ואחד שמות. תשעה עשר עונים. ${ageAt(TE_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Go and look for the missing','ללכת לחפש את החסרים'],s:['Twelve names, and a long way.','שנים עשר שמות, ודרך ארוכה.'],check:{stat:'stamina',dc:9},
   win:[`You find nine of them in three days: in a boiler room, on a bus, in a church loft. Not all are well. All are found.`,`מוצאים תשעה מהם בשלושה ימים: בחדר דוד, באוטובוס, בעליית גג של כנסייה. לא כולם בסדר. כולם נמצאו.`,{humanity:6,morale:3,hp:-4,flag:'te_search'}],
   lose:[`You find four. You keep the other names in your pocket, and read them out every morning for a week, as if reading a name could bring it back.`,`מוצאים ארבעה. את שאר השמות שומרים בכיס, וקוראים אותם בכל בוקר במשך שבוע, כאילו קריאת שם יכולה להחזיר אותו.`,{hp:-6,morale:-6,humanity:2,flag:'te_search'}]},
  {l:['Keep the ones you have safe','לשמור על אלה שיש'],s:['One room, one rule: nobody goes out alone.','חדר אחד, כלל אחד: איש לא יוצא לבד.'],check:{stat:'charisma',dc:8},
   win:[`Nineteen children, one locked room, one rule. By the end of the week they are eating together, and the room is the most orderly place in the district.`,`תשעה עשר ילדים, חדר נעול אחד, כלל אחד. עד סוף השבוע הם אוכלים יחד, והחדר הוא המקום המסודר ביותר במחוז.`,{order:3,humanity:3,morale:2,flag:'te_keep'}],
   lose:[`The children fall into groups you cannot control. One of them slips out at night. You do not find out for two days, and it is the two days you will remember.`,`הילדים מתחלקים לקבוצות שאי אפשר לשלוט בהן. אחד מהם מחליק החוצה בלילה. מגלים רק אחרי יומיים, ואלה שני הימים שיזכרו.`,{morale:-6,humanity:-1,flag:'te_keep'}]}
 ]}));

chapter(Object.assign({},TE,{id:'te_2',n:2,at:.30,
 t:['A Lesson','שיעור'],
 x:[()=>`${flag('te_search')?'The found children are sitting in a circle on the floor of a school bus, waiting.':'The children in the locked room are sitting in a circle, waiting.'} Somebody asks: what do we do if a dead one gets in? The room goes quiet. They are all looking at you, for the answer to a question you were never trained for.`,
    ()=>`${flag('te_search')?'הילדים שנמצאו יושבים במעגל על רצפת אוטובוס בית ספר, ומחכים.':'הילדים בחדר הנעול יושבים במעגל, ומחכים.'} מישהו שואל: מה עושים אם אחד מהם נכנס? החדר משתתק. כולם מסתכלים, מחפשים תשובה לשאלה שאיש לא הכשיר לה.`],
 ch:[
  {l:['Teach them the hard truth','ללמד אותם את האמת הקשה'],s:['Run. Shut a door. Never go back for anyone.','לרוץ. לסגור דלת. לא לחזור בשביל אף אחד.'],check:{stat:'charisma',dc:9},
   win:[`You tell them: run, shut a door, go up not down, and never go back for anyone. The last part is the hard one. They write it down anyway, in their own words, in their own handwriting.`,`אומרים להם: לרוץ, לסגור דלת, לעלות ולא לרדת, ולא לחזור בשביל אף אחד. החלק האחרון הוא הקשה. הם רושמים אותו בכל זאת, במילים שלהם, בכתב יד משלהם.`,{humanity:-2,morale:2,order:2,flag:'te_hard'}],
   lose:[`You tell them the truth, and one of them starts to cry, and then the room does. You hold them until it is dark, and it is not a lesson, and it is the only one they needed.`,`אומרים להם את האמת, ואחד מהם מתחיל לבכות, ואחריו החדר. מחזיקים אותם עד החשכה, וזה לא שיעור, וזה היחיד שהיו צריכים.`,{morale:-3,humanity:3,flag:'te_hard'}]},
  {l:['Teach it as a game','ללמד את זה כמשחק'],s:['Doors, stairs, and a whistle.','דלתות, מדרגות, ושריקה.'],check:{stat:'wits',dc:8},
   win:[`You invent a game with doors, stairs and a whistle. They laugh, and the laughing is loud, and it is a good drill. Nobody freezes when the real whistle blows a week later.`,`ממציאים משחק עם דלתות, מדרגות ושריקה. הם צוחקים, והצחוק חזק, וזה תרגיל טוב. איש לא קופא כשהשריקה האמיתית נשמעת שבוע אחר כך.`,{morale:6,humanity:2,order:1,flag:'te_game'}],
   lose:[`The game is a good game, and they play it too well. Nobody remembers it is practice, and a girl hides in a cupboard for a day.`,`המשחק טוב, והם משחקים אותו טוב מדי. איש לא זוכר שזה תרגול, וילדה מתחבאת בארון יום שלם.`,{morale:-4,hp:-2,flag:'te_game'}]}
 ]}));

chapter(Object.assign({},TE,{id:'te_3',n:3,at:.58,
 t:['The Parent','ההורה'],
 x:[()=>`A man arrives at the door with a rifle and eyes like a road at night. He says his daughter is one of yours, and that he is taking her south. She is holding your sleeve. ${flag('te_hard')?'She says the rule you taught: never go back for anyone. She does not say it to him.':flag('te_game')?'She says the whistle rule, quietly, and does not smile.':'She says nothing.'}`,
    ()=>`אדם מגיע לדלת עם רובה ועיניים כמו כביש בלילה. הוא אומר שבתו אחת משלכם, ושהוא לוקח אותה דרומה. היא אוחזת בשרוול. ${flag('te_hard')?'היא אומרת את הכלל שנלמד: לא לחזור בשביל אף אחד. היא לא אומרת אותו לו.':flag('te_game')?'היא אומרת את כלל השריקה, בשקט, ולא מחייכת.':'היא לא אומרת דבר.'}`],
 ch:[
  {l:['Let the child go with her father','לתת לילדה ללכת עם אביה'],s:['A father is a home.','אב הוא בית.'],check:{stat:'charisma',dc:9},
   win:[`You kneel, tell her that her father is her home, and hand her a pencil and a piece of paper. She hugs you like a shove. The door closes very softly.`,`כורעים, אומרים לה שאביה הוא הבית שלה, ומוסרים עיפרון ופיסת נייר. היא מחבקת כמו דחיפה. הדלת נסגרת בשקט רב.`,{humanity:5,morale:-3,flag:'te_let_go'}],
   lose:[`The father takes her by the wrist, and she looks back once. You stand in the doorway for a long time with the pencil still in your hand.`,`האב תופס אותה בפרק היד, והיא מסתכלת אחורה פעם אחת. עומדים בפתח זמן רב עם העיפרון עדיין ביד.`,{morale:-6,humanity:2,flag:'te_let_go'}]},
  {l:['Persuade him to stay, with the whole class','לשכנע אותו להישאר, עם כל הכיתה'],s:['Walls, beds, and someone who can read a map.','חומות, מיטות, ומישהו שיודע לקרוא מפה.'],check:{stat:'charisma',dc:10},
   win:[`You make a small speech about walls, and beds, and a woman who can read maps. He sits on the step for an hour with the rifle across his knees, and then he puts it down.`,`נושאים נאום קטן על חומות, מיטות, ואישה שיודעת לקרוא מפות. הוא יושב על המדרגה שעה עם הרובה על הברכיים, ואז מניח אותו.`,{order:3,humanity:5,morale:4,flag:'te_stayed'}],
   lose:[`He is not persuaded. He takes her anyway, and takes the lesson plan with her, folded in her pocket.`,`הוא לא משתכנע. הוא לוקח אותה בכל זאת, ולוקח איתה את תוכנית השיעור, מקופלת בכיס שלה.`,{morale:-7,order:-1,flag:'te_lost'}]}
 ]}));

chapter(Object.assign({},TE,{id:'te_4',n:4,at:.80,
 t:['The Last Bell','הפעמון האחרון'],
 x:[()=>`A convoy is leaving the district at first light, with room for children and few others. ${flag('te_stayed')?'The father has taken the wheel of a truck, and asks if he may carry your class.':flag('te_let_go')?'The girl is already gone, and her seat on the bench is full of other children.':'The register is in your pocket, with twenty-four names and a bookmark in the middle.'} The bell you rang every morning is still on the desk.`,
    ()=>`שיירה עוזבת את המחוז עם עלות השחר, עם מקום לילדים ולמעטים אחרים. ${flag('te_stayed')?'האב תפס את ההגה של משאית, ושואל אם אפשר לשאת את הכיתה.':flag('te_let_go')?'הילדה כבר הלכה, והמקום שלה על הספסל מלא בילדים אחרים.':'הרשימה בכיס, עם עשרים וארבעה שמות וסימנייה באמצע.'} הפעמון שצילצלו בו בכל בוקר עדיין על השולחן.`],
 ch:[
  {l:['Send the children with the convoy, and stay','לשלוח את הילדים עם השיירה ולהישאר'],s:['Someone has to keep the school.','מישהו צריך לשמור על בית הספר.'],check:{stat:'charisma',dc:9},
   win:[`You count them up the steps, twice. The truck leaves. You ring the bell once, for no one, and the hall answers. By spring, three of them have written back.`,`סופרים אותם במעלה המדרגות, פעמיים. המשאית יוצאת. מצלצלים בפעמון פעם אחת, בשביל אף אחד, והאולם עונה. עד האביב שלושה מהם כתבו בחזרה.`,{humanity:8,morale:3,order:2,flag:['te_end_stay','builder']}],
   lose:[`The truck leaves, and it is a long, careful goodbye, and by the time it is over you are alone with the bell and the register.`,`המשאית יוצאת, והפרידה ארוכה וזהירה, ועד שהיא נגמרת נשארים לבד עם הפעמון והרשימה.`,{morale:-5,humanity:4,flag:'te_end_stay'}]},
  {l:['Go with them, all the way','ללכת איתם, עד הסוף'],s:['The road is long. They should not be alone.','הדרך ארוכה. הם לא צריכים להיות לבד.'],check:{stat:'stamina',dc:9},
   win:[`You ride in the back of a truck with twenty-four children singing a song they made up for the road. It is the worst road you have ever been on, and it has the best noise.`,`נוסעים בחלק האחורי של משאית עם עשרים וארבעה ילדים ששרים שיר שהמציאו לדרך. זו הדרך הגרועה ביותר שהיית בה, ויש בה הרעש הטוב ביותר.`,{morale:9,humanity:5,order:2,flag:'te_end_go'}],
   lose:[`The road is long and the truck breaks down twice. You get them there, tired and quiet, and every one of them, when the truck stops, says thank you.`,`הדרך ארוכה והמשאית מתקלקלת פעמיים. מגיעים איתם, עייפים ושקטים, וכל אחד מהם, כשהמשאית נעצרת, אומר תודה.`,{hp:-8,morale:-2,humanity:6,flag:'te_end_go'}]}
 ]}));
