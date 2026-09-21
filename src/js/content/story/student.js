
/* ===== THE STUDENT: "The Group Chat" =====
 * The phone is the last network. A group chat of classmates becomes a map of who is alive, and a way to find each other.
 */
const ST={arc:'bg:student',label:['The Group Chat','קבוצת הצ׳אט'],of:4};
const ST_AGES=[
 [`Everyone in it is your age, and nobody knows what to do.`,`כולם בה בני גילך, ואף אחד לא יודע מה לעשות.`],
 [`You are the one they ask, because you have a job and a plan.`,`אליך פונים, כי יש לך עבודה ותוכנית.`],
 [`You are the oldest name on the list, and the younger ones write to you first.`,`השם המבוגר ביותר ברשימה, והצעירים כותבים אליך ראשון.`]];

chapter(Object.assign({},ST,{id:'st_1',n:1,at:.12,
 t:['Eighty Contacts','שמונים אנשי קשר'],
 x:[()=>`Your phone is still the most useful thing you own: a group chat of eighty classmates, half of them typing at once. ${ageAt(ST_AGES,0)} ${signAt(0)}`,
    ()=>`הטלפון עדיין הדבר השימושי ביותר שיש: קבוצת צ׳אט של שמונים חברים ללימודים, חצי מהם מקלידים בבת אחת. ${ageAt(ST_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Set a meeting point for everyone','לקבוע נקודת מפגש לכולם'],s:['One pinned message, one place, one time.','הודעה נעוצה אחת, מקום אחד, שעה אחת.'],check:{stat:'charisma',dc:8},
   win:[`You pin one message: the sports hall, the north gate, noon. Thirty people answer with a thumbs-up. It is the smallest, strongest thing anyone has done all week.`,`נועצים הודעה אחת: אולם הספורט, השער הצפוני, בצהריים. שלושים איש עונים באגודל. זה הדבר הקטן והחזק ביותר שמישהו עשה כל השבוע.`,{order:2,humanity:3,morale:4,flag:'st_hub'}],
   lose:[`You pin the message, and forty people argue about it for an hour. By dusk the chat has four meeting points and no one to go to any of them.`,`נועצים את ההודעה, וארבעים איש מתווכחים עליה שעה. עד רדת החשכה בצ׳אט ארבע נקודות מפגש ואף אחד שילך לאף אחת.`,{morale:-4,order:-1}]},
  {l:['Mute it and save the battery','להשתיק ולחסוך סוללה'],s:['A phone is a torch, a clock, and a camera.','טלפון הוא פנס, שעון ומצלמה.'],check:{stat:'wits',dc:8},
   win:[`You turn the chat off, and the phone becomes a torch, a clock and a camera. A day later its battery is still at forty percent, and you know exactly what you gave up.`,`מכבים את הצ׳אט, והטלפון הופך לפנס, שעון ומצלמה. יום אחר כך הסוללה עדיין על ארבעים אחוז, וידוע בדיוק על מה ויתרו.`,{morale:-2,hp:2,flag:'st_dark'}],
   lose:[`You mute it, and a message you should have seen slips past: a friend, asking where you are. You find it at midnight, unread, and it does not have a good reply.`,`משתיקים, וההודעה שהייתם צריכים לראות חומקת: חבר שואל לאן נעלמת. מוצאים אותה בחצות, לא נקראה, ואין לה תשובה טובה.`,{morale:-6,humanity:-1,flag:'st_dark'}]}
 ]}));

chapter(Object.assign({},ST,{id:'st_2',n:2,at:.30,
 t:['The Rumor','השמועה'],
 x:[()=>`${flag('st_hub')?'The chat is thinner now, but alive: eleven people, and a rumor.':'A rumor reaches you through a friend of a friend:'} the university sports hall is taking students, with food and a generator. Nobody has confirmed it. Everybody has forwarded it.`,
    ()=>`${flag('st_hub')?'הצ׳אט דליל יותר, אבל חי: אחד עשר איש, ושמועה.':'שמועה מגיעה דרך חבר של חבר:'} אולם הספורט של האוניברסיטה מקבל סטודנטים, עם אוכל וגנרטור. איש לא אישר. כולם הפיצו.`],
 ch:[
  {l:['Go and see for yourself','ללכת לראות בעצמך'],s:['A rumor is only a rumor until someone walks.','שמועה היא רק שמועה עד שמישהו הולך.'],check:{stat:'stealth',dc:9},
   win:[`The hall is real, and tired, and full of laptop chargers. You find a place on the floor, and a list with your name half-written. It is not much. It is a start.`,`האולם אמיתי, עייף, ומלא מטענים למחשבים. נמצא מקום על הרצפה, ורשימה עם שם כתוב חצי. זה לא הרבה. זו התחלה.`,{food:3,water:2,order:2,flag:'st_hall'}],
   lose:[`You reach the hall, and there is a fence, and behind the fence a very different crowd. You leave before anyone looks up.`,`מגיעים לאולם, ויש גדר, ומאחוריה קהל שונה מאוד. עוזבים לפני שמישהו מרים מבט.`,{hp:-6,morale:-4,flag:'st_trap'}]},
  {l:['Ask three people who might know','לשאול שלושה אנשים שאולי יודעים'],s:['Two agreeing voices are better than one loud one.','שני קולות מסכימים טובים מקול אחד רם.'],check:{stat:'charisma',dc:8},
   win:[`Two say it is real, one says it is a trap, and the one who says trap has a reason. You go, carefully, in daylight, with the reason in your pocket.`,`שניים אומרים שזה אמיתי, אחד אומר שזו מלכודת, ולזה שאומר מלכודת יש סיבה. הולכים, בזהירות, באור יום, עם הסיבה בכיס.`,{morale:3,humanity:1,flag:['st_hall','st_verified']}],
   lose:[`Nobody knows. Everybody has an opinion, and by evening you know more about a rumor than you would have liked.`,`איש לא יודע. לכולם יש דעה, ועד הערב יודעים על שמועה יותר ממה שהיה רצוי.`,{morale:-3}]}
 ]}));

chapter(Object.assign({},ST,{id:'st_3',n:3,at:.58,
 t:['The Last Percent','האחוז האחרון'],
 x:[`The phone says three percent. There is a charger somewhere, and a message you have been not-sending for days. You have exactly enough for one act: a message to everyone, a call to one person, or nothing at all.`,
    `הטלפון אומר שלושה אחוזים. יש איפשהו מטען, והודעה שלא נשלחת כבר ימים. יש בדיוק מספיק לפעולה אחת: הודעה לכולם, שיחה לאדם אחד, או כלום.`],
 ch:[
  {l:['Send one message to the whole chat','לשלוח הודעה אחת לכל הצ׳אט'],s:['Where you are, that you are alive, where the water is.','איפה אתם, שחיים, איפה המים.'],check:{stat:'charisma',dc:8},
   win:[`You write four lines: where you are, that you are alive, where the water is, and one thing you noticed that was not terrible. Thirty-one people read it before the phone dies.`,`כותבים ארבע שורות: איפה אתם, שאתם חיים, איפה המים, ודבר אחד שהבחנתם בו שלא היה נורא. שלושים ואחד איש קוראים לפני שהטלפון מת.`,{humanity:5,morale:5,order:1,flag:'st_sent'}],
   lose:[`The message is sent, and the phone dies before you know if anyone read it. You spend the night imagining both.`,`ההודעה נשלחת, והטלפון מת לפני שיודעים אם מישהו קרא. מבלים את הלילה בדמיון של שתי האפשרויות.`,{morale:-3,humanity:2,flag:'st_sent'}]},
  {l:['Call the one person who matters','להתקשר לאדם אחד שחשוב'],s:['Five sentences, and then silence.','חמישה משפטים, ואז שקט.'],check:{stat:'wits',dc:9},
   win:[`It rings twice. A voice, thin and clear, says your name like a question. You say five sentences, and it says three, and the call drops on the last one. You hold the dead phone against your ear until the cold makes you stop.`,`מצלצל פעמיים. קול, דק וצלול, אומר את השם כמו שאלה. אומרים חמישה משפטים, והוא אומר שלושה, והשיחה נופלת על האחרון. מחזיקים את הטלפון המת ליד האוזן עד שהקור גורם להפסיק.`,{morale:7,humanity:2,flag:'st_called'}],
   lose:[`It rings, and rings, and rings. You count to forty. You let go of the phone the way one lets go of a rail.`,`מצלצל, ומצלצל, ומצלצל. סופרים עד ארבעים. משחררים את הטלפון כמו שמשחררים מעקה.`,{morale:-8,flag:'st_called'}]}
 ]}));

chapter(Object.assign({},ST,{id:'st_4',n:4,at:.80,
 t:['The Reply','התשובה'],
 x:[()=>`${flag('st_sent')?'Weeks later, in a market town, a stranger reads out a message from a scrap of paper. It is yours, four lines long, copied in pencil onto the back of a cereal box.':flag('st_called')?'Weeks later, on a road you did not plan to take, a voice you know calls your name from a bus window.':'Weeks later, a message arrives from a number you do not recognize. It is one word.'} ${flag('st_hall')?'The hall has become a camp of two hundred, and it has a notice board.':'You have been alone longer than you meant to be.'}`,
    ()=>`${flag('st_sent')?'שבועות אחר כך, בעיירת שוק, זר מקריא הודעה מפיסת נייר. היא שלך, ארבע שורות, מועתקת בעיפרון על גב קופסת דגנים.':flag('st_called')?'שבועות אחר כך, בדרך שלא תוכננה, קול מוכר קורא בשם מחלון של אוטובוס.':'שבועות אחר כך מגיעה הודעה ממספר שלא מזהים. זו מילה אחת.'} ${flag('st_hall')?'האולם הפך למחנה של מאתיים, ויש בו לוח מודעות.':'כבר זמן רב יותר ממה שתוכנן לבד.'}`],
 ch:[
  {l:['Follow the message','ללכת אחרי ההודעה'],s:['Walk toward the voice.','ללכת לכיוון הקול.'],check:{stat:'stamina',dc:9},
   win:[`You walk toward it. By nightfall you are in a room of faces you half know, a kettle on, a phone charging on a table, and somebody says: there you are. The group chat is a group again.`,`הולכים לעברה. עד רדת החשכה בחדר של פנים שחצי מכירים, קומקום על האש, טלפון נטען על שולחן, ומישהו אומר: הנה. קבוצת הצ׳אט היא שוב קבוצה.`,{morale:9,order:3,humanity:4,flag:'st_end_group'}],
   lose:[`You walk toward it, and it is farther than it looked. You arrive at dusk to a room that is empty and a kettle that is still warm.`,`הולכים לעברה, והיא רחוקה ממה שנראה. מגיעים עם רדת החשכה לחדר ריק וקומקום שעדיין חם.`,{hp:-6,morale:-4,flag:'st_end_group'}]},
  {l:['Write back, and stay where you are','לענות ולהישאר במקום'],s:['Build the place they can come to.','לבנות את המקום שאפשר להגיע אליו.'],check:{stat:'charisma',dc:9},
   win:[`You reply, and keep replying, and build a small, stubborn thing: a notice board, a list, an evening call at seven. By winter it has forty names.`,`עונים, וממשיכים לענות, ובונים דבר קטן ועיקש: לוח מודעות, רשימה, שיחת ערב בשבע. עד החורף יש בה ארבעים שמות.`,{order:4,humanity:4,morale:5,flag:['st_end_stay','builder']}],
   lose:[`You write back, and no one answers. You keep writing anyway. It is a very quiet winter, and the phone stays charged.`,`עונים, ואיש לא עונה בחזרה. ממשיכים לכתוב בכל זאת. זה חורף שקט מאוד, והטלפון נשאר טעון.`,{morale:-3,order:1,humanity:3,flag:'st_end_stay'}]}
 ]}));
