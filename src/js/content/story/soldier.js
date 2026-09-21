
/* ===== THE SOLDIER: "The Order" =====
 * The chain of command ends. What is left is a rifle, a rank, and a conscience, and the question of which one to obey.
 */
const SO={arc:'bg:soldier',label:['The Order','הפקודה'],of:4};
const SO_AGES=[
 [`You have never used the rifle, and it is very noticeable.`,`מעולם לא נעשה שימוש ברובה, וזה מורגש מאוד.`],
 [`You know what this order means, and what it does not.`,`ידוע מה הפקודה הזאת אומרת, ומה לא.`],
 [`You have seen orders like this end in two ways.`,`ראית פקודות כאלה מסתיימות בשתי דרכים.`]];

chapter(Object.assign({},SO,{id:'so_1',n:1,at:.12,
 t:['Hold Position','להחזיק עמדה'],
 x:[()=>`The last radio order you will ever get from anyone who outranks you is three words long: hold the position. The position is a bridge, and on the far side of it a crowd of civilians is gathering, growing, pushing. ${ageAt(SO_AGES,0)} ${signAt(0)}`,
    ()=>`הפקודה האחרונה ברדיו מאדם בכיר יותר היא בת שלוש מילים: להחזיק את העמדה. העמדה היא גשר, ובצדו השני המון אזרחים מתאסף, גדל, דוחף. ${ageAt(SO_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Obey: hold the bridge','לציית: להחזיק את הגשר'],s:['That is what the order is for.','בשביל זה הפקודה.'],check:{stat:'strength',dc:10,bg:{soldier:2}},
   win:[`You hold the line with the tired, clear-headed patience of someone trained for exactly this. When the crowd finds a different way around, no one has been hurt, and you are the reason.`,`מחזיקים את הקו בסבלנות עייפה וצלולה של מי שהוכשר בדיוק לזה. כשההמון מוצא דרך עוקפת, איש לא נפגע, וזה בזכות הקו.`,{order:4,morale:2,humanity:-2,flag:'so_obeyed'}],
   lose:[`The crowd pushes, and the line bends. Nobody fires. The bridge is lost, and the order has ended, and you are not sure which of you did it.`,`ההמון דוחף, והקו מתכופף. איש לא יורה. הגשר אבד, הפקודה נגמרה, ולא ברור מי מכם עשה את זה.`,{hp:-8,morale:-5,order:-2,flag:'so_obeyed'}]},
  {l:['Disobey: open the bridge','להפר: לפתוח את הגשר'],s:['They are people, and they are on the wrong side.','הם אנשים, והם בצד הלא נכון.'],check:{stat:'charisma',dc:9},
   win:[`You take off your helmet and say one word: cross. Four hundred people go over in twenty minutes, quietly, with their bags. Nobody thanks you. You did not do it to be thanked.`,`מסירים את הקסדה ואומרים מילה אחת: לעבור. ארבע מאות איש עוברים בעשרים דקות, בשקט, עם התיקים. איש לא מודה. לא עשית את זה כדי שיודו.`,{humanity:8,order:1,morale:3,flag:'so_disobeyed'}],
   lose:[`You open the bridge, and the crowd is not one thing but several. It takes two hours to sort out, and you are not sure who you saved.`,`פותחים את הגשר, וההמון אינו דבר אחד אלא כמה. לוקח שעתיים לסדר, ולא בטוח מי ניצל.`,{hp:-6,morale:-5,humanity:3,flag:'so_disobeyed'}]}
 ]}));

chapter(Object.assign({},SO,{id:'so_2',n:2,at:.30,
 t:['The Deserters','העריקים'],
 x:[()=>`Four of your old unit are on the road, without their insignia, walking away from something. The sergeant among them says there is a place north where no one gives orders, and there is room. He looks at your sleeve, where the rank still is. ${flag('so_obeyed')?'They know you obeyed. It is not an insult. It is a question.':'They know what you did on the bridge. It is not an insult. It is an invitation.'}`,
    ()=>`ארבעה מהיחידה הישנה בדרך, בלי סמלים, מתרחקים ממשהו. הסמל שביניהם אומר שיש מקום בצפון שבו איש לא נותן פקודות, ויש מקום. הוא מסתכל על השרוול, שבו הדרגה עדיין. ${flag('so_obeyed')?'הם יודעים שצייתם. זו לא עלבון. זו שאלה.':'הם יודעים מה נעשה על הגשר. זו לא עלבון. זו הזמנה.'}`],
 ch:[
  {l:['Walk with them','ללכת איתם'],s:['A fire, four friends, and a road north.','מדורה, ארבעה חברים, ודרך צפונה.'],check:{stat:'stamina',dc:9},
   win:[`The road north is long and easy and full of small jokes. By the third night you are one of five at one fire, and no one asks who you were.`,`הדרך צפונה ארוכה וקלה ומלאה בבדיחות קטנות. עד הלילה השלישי אחד מחמישה ליד מדורה אחת, ואיש לא שואל מי היית.`,{morale:5,order:-2,humanity:-1,food:1,flag:'so_deserted'}],
   lose:[`The road north is not easy. On the second night one of the five is gone with the food, and the four that are left do not speak of it.`,`הדרך צפונה לא קלה. בלילה השני אחד מהחמישה נעלם עם האוכל, וארבעת הנותרים לא מדברים על זה.`,{hp:-6,morale:-6,food:-1,flag:'so_deserted'}]},
  {l:['Order them to stand down','לצוות עליהם לחזור'],s:['Use the old voice.','להשתמש בקול הישן.'],check:{stat:'charisma',dc:10,bg:{soldier:2}},
   win:[`You use your old voice, and it still works. They stop, and look at each other, and one by one take back the insignia they had pocketed. It feels like a small win and a large loss.`,`משתמשים בקול הישן, והוא עדיין עובד. הם עוצרים, מסתכלים זה על זה, ואחד אחד מחזירים את הסמלים שהחביאו בכיס. זה מרגיש כמו ניצחון קטן והפסד גדול.`,{order:4,morale:-3,humanity:-2,flag:'so_held'}],
   lose:[`You use your old voice, and it does not work. The sergeant gives you a salute that has nothing to do with rank, and they are gone by dusk.`,`משתמשים בקול הישן, והוא לא עובד. הסמל מצדיע הצדעה שאין לה קשר לדרגה, ועד רדת החשכה הם איננו.`,{morale:-6,order:-2,flag:'so_held'}]}
 ]}));

chapter(Object.assign({},SO,{id:'so_3',n:3,at:.58,
 t:['The Armory','הנשקייה'],
 x:[()=>`The armory of an abandoned depot is unlocked, and it is full. Rifles, ammunition, medical kits, a stack of flak jackets. A hundred desperate people could hold a district with what is in this room. So could one who was not desperate. ${flag('so_deserted')?'The deserters have found it too, and are watching from the door.':'You are alone with it, and the door is open behind you.'}`,
    ()=>`הנשקייה של מחסן נטוש פתוחה, ומלאה. רובים, תחמושת, ערכות רפואיות, ערימת אפודי מגן. מאה אנשים נואשים היו יכולים להחזיק מחוז עם מה שבחדר הזה. וגם אחד שלא נואש. ${flag('so_deserted')?'העריקים מצאו אותה גם, וצופים מהדלת.':'נשארים לבד איתה, והדלת פתוחה מאחור.'}`],
 ch:[
  {l:['Hand it out to the people who need it','לחלק לאנשים שצריכים'],s:['A district with a rota and a reason to stay.','מחוז עם תורנות וסיבה להישאר.'],check:{stat:'charisma',dc:9},
   win:[`You open the crates one by one, and you teach five people a rifle safety rule each. By nightfall a district has a militia, and a rota, and a reason not to run.`,`פותחים את הארגזים אחד אחד, ומלמדים חמישה אנשים כלל בטיחות אחד כל אחד. עד רדת החשכה יש למחוז מיליציה, תורנות, וסיבה לא לברוח.`,{order:5,ammo:1,humanity:2,morale:4,flag:'so_armed'}],
   lose:[`The crowd hears there is an armory. The handing-out becomes a scramble, and by the end three people have been hurt and the rest have run off with the guns.`,`ההמון שומע שיש נשקייה. החלוקה הופכת למירוץ, ובסופו שלושה נפצעו והשאר ברחו עם הרובים.`,{hp:-8,morale:-6,order:-3,flag:'so_armed'}]},
  {l:['Lock it, and keep the key','לנעול ולשמור את המפתח'],s:['A secret with a soldier attached.','סוד עם חייל מחובר אליו.'],check:{stat:'stealth',dc:8},
   win:[`You lock the door, remove the hinges, and put the key in your boot. The armory is now a secret with a soldier attached, and you are the soldier.`,`נועלים את הדלת, מסירים את הצירים, ושמים את המפתח במגף. הנשקייה היא עכשיו סוד עם חייל מחובר אליו, ואתם החייל.`,{ammo:3,order:1,morale:2,humanity:-2,flag:'so_locked'}],
   lose:[`You lock the door, and somebody has already been inside. There is less than there should be, and someone with a rifle who knows your face.`,`נועלים את הדלת, ומישהו כבר היה בפנים. יש פחות ממה שצריך, ומישהו עם רובה שמכיר את הפנים.`,{ammo:1,hp:-4,morale:-5,flag:'so_locked'}]}
 ]}));

chapter(Object.assign({},SO,{id:'so_4',n:4,at:.80,
 t:['The Salute','ההצדעה'],
 x:[()=>`A young officer, barely out of the academy, stands in front of you with a sheet of paper and a shaking hand. The chain of command is gone, and someone has to stand in it. ${flag('so_armed')?'Behind her, the militia you armed is waiting, in a line, with their rifles down.':flag('so_locked')?'Behind her, the armory door is closed, and the whole district is wondering who has the key.':'Behind her, nobody is waiting, and that is the problem.'} She salutes. You did not know how much you wanted someone to.`,
    ()=>`קצינה צעירה, בקושי מחוץ לבית הספר לקצינים, עומדת מולך עם דף נייר ויד רועדת. שרשרת הפיקוד נעלמה, ומישהו צריך לעמוד בה. ${flag('so_armed')?'מאחוריה המיליציה שחימשת מחכה, בשורה, עם הרובים למטה.':flag('so_locked')?'מאחוריה דלת הנשקייה סגורה, וכל המחוז תוהה למי יש את המפתח.':'מאחוריה איש לא מחכה, וזו הבעיה.'} היא מצדיעה. לא ידעו כמה רצו שמישהו יעשה את זה.`],
 ch:[
  {l:['Take command','לקחת פיקוד'],s:['Return the salute, and take the paper.','להחזיר הצדעה ולקחת את הדף.'],check:{stat:'charisma',dc:10,bg:{soldier:2}},
   win:[`You return the salute, and in the same motion you take the paper from her hand. By nightfall there is a rota, a perimeter, and a chain of command with a person at every link.`,`מחזירים הצדעה, ובאותה תנועה לוקחים את הדף מידה. עד רדת החשכה יש תורנות, היקף, ושרשרת פיקוד עם אדם בכל חוליה.`,{order:6,humanity:2,morale:6,flag:['so_end_command','base']}],
   lose:[`You return the salute, and you take command, and it is harder than it looks. The chain holds, mostly, and you learn how many are willing to obey a voice they have not yet earned.`,`מחזירים הצדעה, ולוקחים פיקוד, וזה קשה ממה שנראה. השרשרת מחזיקה, בערך, ולומדים כמה מוכנים לציית לקול שעוד לא הרוויח.`,{order:2,morale:-3,humanity:1,flag:'so_end_command'}]},
  {l:['Take off the uniform','להסיר את המדים'],s:['Fold it neatly. Put it in the pack.','לקפל בסדר. לשים בתיק.'],check:{stat:'wits',dc:9},
   win:[`You fold it neatly, put it in the pack, and become someone who once wore a uniform. The young officer watches you go, and salutes anyway.`,`מקפלים בסדר, שמים בתיק, והופכים למי שפעם לבש מדים. הקצינה הצעירה צופה בהליכה, ומצדיעה בכל זאת.`,{morale:4,humanity:5,order:-1,flag:'so_end_civil'}],
   lose:[`You take off the uniform, and it turns out to be harder than it looked. You walk out of the base in a coat that does not fit and a walk that has not forgotten.`,`מסירים את המדים, וזה מתברר כקשה ממה שנראה. יוצאים מהבסיס במעיל שלא מתאים ובהליכה שלא שכחה.`,{morale:-3,humanity:3,flag:'so_end_civil'}]}
 ]}));
