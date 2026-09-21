
/* ===== THE MECHANIC: "The Machine" =====
 * Everything breaks, and someone has to know why. A generator, a radio, a pump, and a convoy that cannot go on without you.
 */
const ME={arc:'bg:mechanic',label:['The Machine','המכונה'],of:4};
const ME_AGES=[
 [`You have never had a job this big, and never wanted one more.`,`מעולם לא הייתה עבודה כזאת גדולה, ומעולם לא רצו אחת יותר.`],
 [`You know the sound a good engine makes, and you know this one.`,`מכירים את הצליל של מנוע טוב, ואת זה.`],
 [`You know every sound an engine can make, and this one is making none of them.`,`מכירים כל צליל שמנוע יכול להשמיע, וזה לא משמיע אף אחד מהם.`]];

chapter(Object.assign({},ME,{id:'me_1',n:1,at:.12,
 t:['The Engine','המנוע'],
 x:[()=>`In the back of a garage, under a tarp, is a diesel generator the size of a wardrobe, and a delivery van with a good engine and no wheels. You could make one of them work, tonight, with the parts from the other. ${ageAt(ME_AGES,0)} ${signAt(0)}`,
    ()=>`בחלק האחורי של מוסך, מתחת ליריעה, גנרטור דיזל בגודל ארון בגדים, ואן משלוחים עם מנוע טוב ובלי גלגלים. אפשר להפעיל אחד מהם, הלילה, בחלקים מהשני. ${ageAt(ME_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Make the generator run','להפעיל את הגנרטור'],s:['Light for the whole camp.','אור לכל המחנה.'],check:{stat:'wits',dc:9,bg:{mechanic:2}},
   win:[`Four hours, two cannibalized belts, and a cough. The generator catches. Light falls on forty faces at once, and nobody says anything, and it is like a prayer.`,`ארבע שעות, שתי רצועות מפורקות, ושיעול. הגנרטור נתפס. אור נופל על ארבעים פנים בבת אחת, ואיש לא אומר דבר, וזה כמו תפילה.`,{order:3,morale:6,humanity:2,flag:'me_power'}],
   lose:[`You get it to turn over, and then it does not. You spend the night with a torch in your teeth and a bruise from the flywheel.`,`מצליחים להניע, ואז לא. מבלים את הלילה עם פנס בין השיניים וחבורה מהגלגל.`,{hp:-6,morale:-4,flag:'me_power'}]},
  {l:['Make the van run','להפעיל את הוואן'],s:['Wheels are options.','גלגלים הם אפשרויות.'],check:{stat:'wits',dc:9,bg:{mechanic:2}},
   win:[`You put the engine into the frame, rebuild the axle from a trailer, and by dawn there is a vehicle. It is the ugliest thing you have ever built, and it starts on the first try.`,`מכניסים את המנוע למסגרת, בונים מחדש את הציר מנגרר, ועד עלות השחר יש רכב. זה הדבר המכוער ביותר שנבנה אי פעם, והוא מתניע בניסיון הראשון.`,{food:1,order:1,morale:4,flag:['me_van','car']}],
   lose:[`The van starts, and stops, and starts. You have most of a vehicle and half of a plan.`,`הוואן מתניע, ונעצר, ומתניע. יש רוב רכב וחצי תוכנית.`,{morale:-3,hp:-3,flag:'me_van'}]}
 ]}));

chapter(Object.assign({},ME,{id:'me_2',n:2,at:.30,
 t:['The Radio','הרדיו'],
 x:[()=>`${flag('me_power')?'With power, the shop has a hum, and the hum has ideas.':flag('me_van')?'With a van, the shop has a purpose, and the purpose is on wheels.':'With nothing but a bench and a cold soldering iron, the shop has a hunch.'} A boy has brought you three broken radios and an aerial made of coat hangers. He says there are voices on the wire, and that nobody can hear them. You could build a receiver, or a transmitter. Not both.`,
    ()=>`${flag('me_power')?'עם חשמל, לסדנה יש זמזום, ולזמזום יש רעיונות.':flag('me_van')?'עם ואן, לסדנה יש מטרה, והמטרה על גלגלים.':'עם ספסל ומלחם קר בלבד, לסדנה יש תחושה.'} ילד הביא שלושה רדיואים שבורים ואנטנה מקולבים. הוא אומר שיש קולות על הקו, ושאיש לא שומע אותם. אפשר לבנות מקלט, או משדר. לא שניהם.`],
 ch:[
  {l:['Build a transmitter','לבנות משדר'],s:['Let someone know you are here.','לתת למישהו לדעת שאנחנו כאן.'],check:{stat:'wits',dc:10},
   win:[`It takes a week, and it reaches four hundred kilometers. On the seventh night, a voice answers, thin as thread, and you spend the rest of the night writing down what it says.`,`לוקח שבוע, והוא מגיע לארבע מאות קילומטר. בלילה השביעי קול עונה, דק כחוט, ומבלים את שאר הלילה ברישום מה שהוא אומר.`,{order:3,morale:5,humanity:3,flag:'me_send'}],
   lose:[`The transmitter works. It reaches nowhere, and it takes a whole battery to find that out. The boy is philosophical about it, which is worse.`,`המשדר עובד. הוא לא מגיע לשום מקום, וצריך סוללה שלמה כדי לגלות. הילד פילוסופי לגבי זה, וזה גרוע יותר.`,{morale:-5,water:-1,flag:'me_send'}]},
  {l:['Build a receiver','לבנות מקלט'],s:['Hear what the world is doing.','לשמוע מה העולם עושה.'],check:{stat:'wits',dc:8},
   win:[`You hear everything: the convoys, the ships, the men with the toll road, the voice of a woman in a lighthouse reading out the weather. For the first time in weeks the world has a shape.`,`שומעים הכול: שיירות, ספינות, אנשי דרך האגרה, קולה של אישה במגדלור שמקריאה את מזג האוויר. לראשונה מזה שבועות יש לעולם צורה.`,{morale:5,order:1,humanity:1,flag:['me_listen','map']}],
   lose:[`The receiver works, and it hears only static. The boy leaves the room quietly, and you leave it later.`,`המקלט עובד, ושומע רק רעש. הילד יוצא מהחדר בשקט, ויוצאים ממנו מאוחר יותר.`,{morale:-4,flag:'me_listen'}]}
 ]}));

chapter(Object.assign({},ME,{id:'me_3',n:3,at:.58,
 t:['The Pump','המשאבה'],
 x:[()=>`The settlement has water, but has it the way a prisoner has a window: a well, a bucket, and a queue. ${flag('me_send')?'The voice on the wire says there is a filter design that works, and reads out the dimensions.':flag('me_listen')?'The voice on the wire says there is a mill upriver with a wheel that still turns.':'You have a good pump, a bad well, and an idea about the river.'} You can have a pump or a filter. There is only enough for one.`,
    ()=>`ליישוב יש מים, אבל כמו שלאסיר יש חלון: באר, דלי, ותור. ${flag('me_send')?'הקול שעל הקו אומר שיש תכנון של מסנן שעובד, ומקריא את המידות.':flag('me_listen')?'הקול שעל הקו אומר שיש טחנה במעלה הנהר עם גלגל שעדיין מסתובב.':'יש משאבה טובה, באר גרועה ורעיון על הנהר.'} אפשר משאבה או מסנן. יש מספיק רק לאחד.`],
 ch:[
  {l:['Build the pump','לבנות את המשאבה'],s:['A chain, a bicycle frame, and a deep pipe.','שרשרת, שלדת אופניים, וצינור עמוק.'],check:{stat:'strength',dc:9,bg:{mechanic:2}},
   win:[`You drive a pipe into the aquifer and hang a chain-driven pump off a bicycle frame. By noon, water rises. It is brown for an hour, then clear, and the whole camp holds a cup under it as if it were a sacrament.`,`תוקעים צינור בשכבת המים וקושרים משאבה עם שרשרת לשלדת אופניים. עד הצהריים מים עולים. הם חומים שעה, ואז צלולים, וכל המחנה מחזיק כוס מתחתיהם כאילו היו סקרמנט.`,{water:6,order:2,morale:6,flag:'me_pump'}],
   lose:[`The pump works, and the water is bad. Half the camp is ill by evening, and you spend the night with a bucket and a lot of apologies.`,`המשאבה עובדת, והמים רעים. חצי מהמחנה חולה עד הערב, ומבלים את הלילה עם דלי והרבה התנצלויות.`,{water:2,hp:-6,morale:-5,inf:4,flag:'me_pump'}]},
  {l:['Build the filter','לבנות את המסנן'],s:['Sand, gravel, charcoal, a barrel with holes.','חול, חצץ, פחם, חבית עם חורים.'],check:{stat:'wits',dc:9},
   win:[`Sand, gravel, charcoal, a barrel with holes in it. The filter runs slowly, and it runs clean. It is the least dramatic thing you have ever built, and it will keep two hundred people alive.`,`חול, חצץ, פחם, חבית עם חורים. המסנן איטי, והוא נקי. זה הדבר הפחות דרמטי שנבנה אי פעם, והוא יחזיק מאתיים איש בחיים.`,{water:4,humanity:2,order:2,morale:4,flag:'me_filter'}],
   lose:[`The filter is too slow to matter and too clean to complain about. You spend a week upgrading it, and by the end you have a very good filter for a small problem.`,`המסנן איטי מכדי להשפיע ונקי מכדי להתלונן עליו. מבלים שבוע בשדרוגו, ובסוף יש מסנן מצוין לבעיה קטנה.`,{water:1,morale:-3,flag:'me_filter'}]}
 ]}));

chapter(Object.assign({},ME,{id:'me_4',n:4,at:.80,
 t:['The Convoy','השיירה'],
 x:[()=>`A convoy has come through the valley: nine vehicles, three of them broken, and a woman at the front who asks if there is a mechanic in the settlement. ${flag('me_van')?'She looks at your van, and at the way it starts.':'She looks at your hands.'} They are heading for a port, and they will not make it without someone who can keep them moving.`,
    ()=>`שיירה עברה בעמק: תשעה כלי רכב, שלושה מהם שבורים, ואישה בראש שואלת אם יש מכונאי ביישוב. ${flag('me_van')?'היא מסתכלת על הוואן, ועל הדרך שבה הוא מתניע.':'היא מסתכלת על הידיים.'} הם בדרך לנמל, והם לא יגיעו בלי מישהו שיכול להשאיר אותם בתנועה.`],
 ch:[
  {l:['Drive the convoy','לנהוג בשיירה'],s:['Six hundred kilometers, and everyone\'s oil pressure.','שש מאות קילומטר, ולחץ השמן של כולם.'],check:{stat:'stamina',dc:9,mod:()=>flag('me_van')?1:0},
   win:[`You take the last vehicle, a truck with an engine in three pieces, and by the second morning it is the reliable one. The road is six hundred kilometers. By the end of it, you are the person who knows everyone's name and their oil pressure.`,`לוקחים את הרכב האחרון, משאית עם מנוע בשלושה חלקים, ועד הבוקר השני היא הרכב האמין. הדרך שש מאות קילומטר. בסופה מכירים את כולם בשמם וגם את לחץ השמן שלהם.`,{morale:8,order:3,humanity:2,flag:'me_end_drive'}],
   lose:[`The convoy limps, and you limp with it, and the port arrives a full week later than it should have. Everyone is alive, and half of them are speaking to you.`,`השיירה צולעת, וצולעים איתה, והנמל מגיע שבוע שלם מאוחר מהצפוי. כולם חיים, וחצי מהם מדברים.`,{hp:-8,morale:-2,humanity:3,flag:'me_end_drive'}]},
  {l:['Stay and hold the workshop','להישאר ולהחזיק את הסדנה'],s:['A bench, and forty apprentices.','ספסל, וארבעים חניכים.'],check:{stat:'charisma',dc:9},
   win:[`The convoy leaves with a toolbox, a written manual, and a list of everything you know. You stay behind with a bench and forty apprentices, and by spring the workshop has a name on a hand-painted sign.`,`השיירה יוצאת עם ארגז כלים, מדריך כתוב, ורשימה של כל מה שידוע. נשארים עם ספסל וארבעים חניכים, ועד האביב לסדנה יש שם על שלט צבוע ביד.`,{order:5,humanity:4,morale:5,flag:['me_end_stay','builder']}],
   lose:[`The convoy leaves, and you watch it disappear with more envy than you expected. The workshop is quieter than it was, and you make it work anyway.`,`השיירה יוצאת, וצופים בה נעלמת בקנאה גדולה מהצפוי. הסדנה שקטה יותר משהייתה, ומצליחים לגרום לה לעבוד בכל זאת.`,{morale:-4,order:2,humanity:3,flag:'me_end_stay'}]}
 ]}));
