
/* ===== THE FIREFIGHTER: "The Line" =====
 * A fire is a thing with a will. Cut a line, hold a well, go into a mill, answer a siren.
 */
const FF={arc:'bg:firefighter',label:['The Line','קו האש'],of:4};
const FF_AGES=[
 [`Among all of them, only you know what a fire does.`,`בין כולם, רק אצלך יש ידע על מה שאש עושה.`],
 [`You have done this in the rain, and in the dark, and once in a hospital.`,`עשית את זה בגשם, בחושך, ופעם אחת בבית חולים.`],
 [`You know what a fire wants before it does.`,`ידוע מה אש רוצה, לפני שהיא עצמה יודעת.`]];

chapter(Object.assign({},FF,{id:'ff_1',n:1,at:.12,
 t:['The Firebreak','קו החיץ'],
 x:[()=>`Wind from the east, and dry grass all the way to the settlement. You have an axe, a shovel, and forty people who have never done this. ${ageAt(FF_AGES,0)} ${signAt(0)}`,
    ()=>`רוח ממזרח, ועשב יבש כל הדרך עד היישוב. יש גרזן, מעדר וארבעים איש שמעולם לא עשו את זה. ${ageAt(FF_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Cut a firebreak around the settlement','לחתוך קו חיץ סביב היישוב'],s:['Six hours, forty people, ten metres of bare earth.','שש שעות, ארבעים איש, עשרה מטרים של אדמה חשופה.'],check:{stat:'strength',dc:9,bg:{firefighter:2}},
   win:[`Six hours, forty people, and a line of bare earth ten metres wide. When the wind comes, the fire stops at the edge of the dirt like a dog at a fence.`,`שש שעות, ארבעים איש, וקו של אדמה חשופה ברוחב עשרה מטרים. כשהרוח מגיעה, האש נעצרת בקצה האדמה כמו כלב ליד גדר.`,{order:3,humanity:2,morale:4,flag:'ff_cut'}],
   lose:[`The line is not wide enough, and the wind does not care. You save the settlement, but not the barn, or the winter's grain.`,`הקו לא רחב מספיק, והרוח לא אכפת לה. מצילים את היישוב, אבל לא את האסם, או את תבואת החורף.`,{hp:-8,food:-2,morale:-3,flag:'ff_cut'}]},
  {l:['Evacuate first, argue later','לפנות קודם, להתווכח אחר כך'],s:['Children, the old, the dog.','ילדים, זקנים, הכלב.'],check:{stat:'charisma',dc:8},
   win:[`You clear the settlement in forty minutes: children, the old, the dog. When the fire passes, you all watch it from the ridge, and nobody is missing.`,`מפנים את היישוב בארבעים דקות: ילדים, זקנים, הכלב. כשהאש עוברת, כולם צופים בה מהרכס, ואיש לא חסר.`,{humanity:5,order:2,morale:3,flag:'ff_evac'}],
   lose:[`The evacuation is orderly and fast, and the fire is faster. You lose the houses, and no one is missing, and no one believes it yet.`,`הפינוי מסודר ומהיר, והאש מהירה יותר. מאבדים את הבתים, ואיש לא חסר, ואיש עוד לא מאמין.`,{hp:-4,morale:-4,humanity:3,flag:'ff_evac'}]}
 ]}));

chapter(Object.assign({},FF,{id:'ff_2',n:2,at:.30,
 t:['The Well','הבאר'],
 x:[()=>`A single well feeds the settlement, and the fire has taken the pump house. A woman in a good coat says the water is rationed, and that she has the key. ${flag('ff_cut')?'You have earned an opinion.':'You have not yet earned anyone\'s opinion.'} Nobody has had a drink in nine hours.`,
    ()=>`באר אחת מזינה את היישוב, והאש לקחה את בית המשאבה. אישה במעיל טוב אומרת שהמים בקיצוב, ושיש לה המפתח. ${flag('ff_cut')?'הרווחת דעה.':'עוד לא הרווחת את דעתו של איש.'} איש לא שתה תשע שעות.`],
 ch:[
  {l:['Guard the well, and ration it fairly','לשמור על הבאר ולחלק בהגינות'],s:['A plastic mug, a queue, a pencil tick against every name.','ספל פלסטיק, תור, סימון עיפרון ליד כל שם.'],check:{stat:'strength',dc:9},
   win:[`Two hours of a plastic mug, a queue, a pencil tick against every name. By the end, everyone has had a drink, and no one has had two. The woman in the good coat gives you the key.`,`שעתיים של ספל פלסטיק, תור, סימון עיפרון ליד כל שם. בסוף כולם שתו, ואיש לא שתה פעמיים. האישה במעיל הטוב נותנת את המפתח.`,{water:3,order:3,humanity:2,flag:'ff_guard'}],
   lose:[`The queue breaks. You stand on the wall of the well with a shovel, and nobody is hurt, and nobody is happy, and everyone has had less than they deserved.`,`התור נשבר. עומדים על דופן הבאר עם מעדר, ואיש לא נפגע, ואיש לא שמח, וכולם קיבלו פחות ממה שמגיע.`,{hp:-6,morale:-5,order:-1,flag:'ff_guard'}]},
  {l:['Rebuild the pump by hand','לבנות מחדש את המשאבה ביד'],s:['A bicycle, a hose, and profanity.','אופניים, צינור, וקללות.'],check:{stat:'wits',dc:10},
   win:[`With a bicycle, a length of hose and a great deal of profanity, you build a hand pump that works. Nine people take turns at the handle, and nobody complains.`,`עם אופניים, אורך צינור והרבה קללות, בונים משאבת יד שעובדת. תשעה אנשים מתחלפים בידית, ואיש לא מתלונן.`,{water:5,order:2,morale:5,flag:'ff_pump'}],
   lose:[`The pump works for a day. On the second, it does not. You have a plan for the third and no one to hear it.`,`המשאבה עובדת יום. בשני, לא. יש תוכנית ליום השלישי ואין מי שישמע.`,{water:1,morale:-4,hp:-2,flag:'ff_pump'}]}
 ]}));

chapter(Object.assign({},FF,{id:'ff_3',n:3,at:.58,
 t:['The Blaze','הדליקה'],
 x:[()=>`A second fire, this time in the town itself, in the old mill that holds the winter's flour. ${flag('ff_guard')?'The well is in order, and the queue is orderly.':flag('ff_pump')?'The pump is running, and there are nine people at the handle.':'The well is dry, and the water is a mile off.'} There are two people inside, and the mill will not hold for long.`,
    ()=>`שריפה שנייה, הפעם בעיירה עצמה, בטחנה הישנה שמחזיקה את הקמח לחורף. ${flag('ff_guard')?'הבאר בסדר, והתור מסודר.':flag('ff_pump')?'המשאבה פועלת, ותשעה אנשים על הידית.':'הבאר יבשה, והמים במרחק מייל.'} יש שני אנשים בפנים, והטחנה לא תחזיק זמן רב.`],
 ch:[
  {l:['Go in for them','להיכנס בשבילם'],s:['A wet coat, one breath.','מעיל רטוב, נשימה אחת.'],check:{stat:'strength',dc:10,danger:true,bg:{firefighter:2}},
   win:[`You go in low, in a wet coat, on one breath, and you find them at the far wall. You bring them out through a window, and the roof comes down behind you as if it had been waiting.`,`נכנסים נמוך, במעיל רטוב, בנשימה אחת, ומוצאים אותם בקיר הרחוק. מוציאים אותם דרך חלון, והגג נופל מאחור כאילו חיכה.`,{humanity:8,hp:-8,morale:4,flag:'ff_saved'}],
   lose:[`You go in, and you reach one of them. The other stays, and you carry the weight of it out through a window with a burned hand.`,`נכנסים, ומגיעים לאחד. השני נשאר, ונושאים את המשקל שלו החוצה דרך חלון עם יד שרופה.`,{hp:-14,morale:-8,humanity:4,flag:'ff_saved'}]},
  {l:['Hold the line, and save the flour','להחזיק את הקו ולהציל את הקמח'],s:['Two hundred mouths for a winter.','מאתיים פיות לחורף.'],check:{stat:'stamina',dc:9},
   win:[`You cut the fire off from the storehouse and hold it there for eight hours. Two people do not come out of the mill. The flour is saved, and it will be eaten by two hundred, and you know how the numbers work.`,`חותכים את האש ממחסן האספקה ומחזיקים אותה שם שמונה שעות. שני אנשים לא יוצאים מהטחנה. הקמח ניצל, ויאכלו אותו מאתיים, וידוע איך המספרים עובדים.`,{food:5,order:2,humanity:-4,morale:-4,flag:'ff_flour'}],
   lose:[`You hold the line, and the flour burns anyway. You have lost the mill, and the people in it, and the winter.`,`מחזיקים את הקו, והקמח נשרף בכל זאת. אבדו הטחנה, והאנשים שבתוכה, והחורף.`,{food:-3,morale:-8,hp:-6,flag:'ff_flour'}]}
 ]}));

chapter(Object.assign({},FF,{id:'ff_4',n:4,at:.80,
 t:['The Last Call','הקריאה האחרונה'],
 x:[()=>`The alarm is a hand-cranked siren on the roof of the fire station, and it has not been used since the morning of the first fire. Today someone is pulling on it from the far side of the valley, in three long blasts. ${flag('ff_saved')?'The people you carried out of the mill are standing beside you, saying nothing.':flag('ff_flour')?'The flour is stacked in the storehouse, and everyone is very careful not to look at you.':'The station is empty, and you have not slept for two days.'} A child is trapped in the gorge with the river rising.`,
    ()=>`האזעקה היא סירנה שמסובבים ביד על גג תחנת הכיבוי, והיא לא בשימוש מאז בוקר האש הראשונה. היום מישהו מושך בה מהצד השני של העמק, בשלוש התפוצצויות ארוכות. ${flag('ff_saved')?'האנשים שהוצאו מהטחנה עומדים ליד, ולא אומרים דבר.':flag('ff_flour')?'הקמח מונח במחסן, וכולם זהירים מאוד לא להסתכל.':'התחנה ריקה, ולא ישנו כבר יומיים.'} ילדה לכודה בערוץ והנהר עולה.`],
 ch:[
  {l:['Go for the child','לרדת אל הילדה'],s:['Rope down the gorge.','לרדת בחבל אל הערוץ.'],check:{stat:'strength',dc:10,danger:true},
   win:[`You rope down the gorge in a wet coat, and the child is holding a branch with both hands and a look of great professional concentration. You bring her up on your back, and the whole valley claps once, like a clap of thunder.`,`יורדים בחבל אל הערוץ במעיל רטוב, והילדה אוחזת בענף בשתי ידיים ובמבט של ריכוז מקצועי גדול. מעלים אותה על הגב, וכל העמק מוחא כף פעם אחת, כמו רעם.`,{humanity:8,hp:-6,morale:8,flag:'ff_end_child'}],
   lose:[`The river comes up faster than the rope. You reach the child, and you reach the bank, and you reach the top, in that order and no other.`,`הנהר עולה מהר מהחבל. מגיעים אל הילדה, ואל הגדה, ואל הראש, בסדר הזה ובשום אחר.`,{hp:-14,morale:2,humanity:5,flag:'ff_end_child'}]},
  {l:['Hold the line, and organize the rope','להחזיק את הקו ולארגן את החבל'],s:['Nine people, a lantern at every third.','תשעה אנשים, פנס בכל שלישי.'],check:{stat:'charisma',dc:9},
   win:[`You never leave the top. You put nine people on a rope, a lantern at every third, and a woman with a whistle at the edge. The rescue is dull, and slow, and it works.`,`אף פעם לא עוזבים את הראש. שמים תשעה אנשים על חבל, פנס בכל שלישי, ואישה עם שריקה בקצה. ההצלה משעממת, ואיטית, והיא עובדת.`,{order:5,humanity:5,morale:5,flag:['ff_end_rope','base']}],
   lose:[`The rope holds, the rescue is slow, and the river is faster. You bring up the child, and a good deal of respect for a thing you had not respected.`,`החבל מחזיק, ההצלה איטית, והנהר מהיר יותר. מעלים את הילדה, והרבה כבוד לדבר שלא כובד.`,{hp:-6,morale:-2,order:2,humanity:4,flag:'ff_end_rope'}]}
 ]}));
