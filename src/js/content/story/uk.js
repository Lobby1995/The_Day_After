
/* ===== BRITAIN: "The Cordon" =====
 * An orderly country, and the order is the trap. The cordon around the cities decides who may leave.
 * Colin drives a bus that goes where it should not. Major Ainsley wants to know which villages are hiding stock.
 * Nan Pritchard runs a hill farm that will not be a ledger entry.
 */
const UK={arc:'loc:uk',label:['The Cordon','הסגר'],of:6};

chapter(Object.assign({},UK,{id:'uk_1',n:1,at:.06,
 t:['Papers','אישורים'],
 x:[`The cordon runs along the ring road: floodlights, razor wire, and a long line of people who all believe that the paperwork will save them. A soldier at a folding table stamps forms with the weariness of someone who has stamped ten thousand. Without a stamp, you cannot leave the city. With one, you cannot be sure the country beyond it is any different.`,
    `הסגר עובר לאורך כביש הטבעת: זרקורים, תיל דוקרני, ותור ארוך של אנשים שכולם מאמינים שהניירת תציל אותם. חייל ליד שולחן מתקפל חותם על טפסים בעייפות של מי שכבר חתם עשרת אלפים. בלי חותמת אי אפשר לצאת מהעיר. איתה, אי אפשר לדעת אם הארץ שמעבר לה שונה.`],
 ch:[
  {l:['Queue for a stamp','לעמוד בתור לחותמת'],s:['Rules are rules, and there is a stamp at the end.','כללים הם כללים, ובסוף יש חותמת.'],check:{stat:'charisma',dc:8},
   win:[`Five hours in the rain, a form in triplicate, and a stamp the size of a coin. The soldier does not look up. You are on the list for the next lorry out.`,`חמש שעות בגשם, טופס בשלושה עותקים, וחותמת בגודל מטבע. החייל לא מרים מבט. השם ברשימה למשאית הבאה החוצה.`,{order:2,morale:-1,flag:'uk_papers'}],
   lose:[`The line ends at the table, and the table ends the day. The soldier says come back tomorrow, in the tone of someone who knows there will be no tomorrow.`,`התור נגמר ליד השולחן, והשולחן מסיים את היום. החייל אומר לחזור מחר, בטון של מי שיודע שמחר לא יהיה.`,{morale:-5,hp:-2}]},
  {l:['Find another way through','למצוא דרך אחרת'],s:['A cordon is only as good as its dullest guard.','סגר טוב רק כמו השומר המשועמם ביותר.'],check:{stat:'stealth',dc:10},
   win:[`A gap in the wire behind a car park, a drain under a road, and a bus shelter on the wrong side. By morning you are outside the cordon with a coat full of rain and no paper at all.`,`פרצה בתיל מאחורי חניון, ניקוז מתחת לכביש, ותחנת אוטובוס בצד הלא נכון. עד הבוקר מחוץ לסגר, עם מעיל מלא בגשם ובלי שום נייר.`,{morale:2,humanity:-1,flag:'uk_forged'}],
   lose:[`A patrol finds you in the drain. They are polite, which is worse, and they send you back to the queue with a note pinned to your coat.`,`סיור מוצא אותך בניקוז. הם מנומסים, וזה גרוע יותר, והם שולחים אותך חזרה לתור עם פתק מוצמד למעיל.`,{hp:-4,morale:-5}]}
 ]}));

chapter(Object.assign({},UK,{id:'uk_2',n:2,at:.20,
 t:["Colin's Bus",'האוטובוס של קולין'],
 x:[()=>`A double-decker bus sits in a garage on the wrong side of the wire, engine running, blinds down. Colin, its driver, tells anyone who asks that he does night runs to the villages for a price, and that the price is whatever you have that he does not. ${flag('uk_papers')?'Your stamped paper lets you walk up to the garage without a single question.':flag('uk_forged')?'You came in through the drain, and he can smell it.':'Nobody asked you anything at the door.'}`,
    ()=>`אוטובוס דו־קומתי עומד במוסך בצד הלא נכון של התיל, מנוע פועל, וילונות למטה. קולין, הנהג שלו, אומר לכל מי ששואל שהוא עושה נסיעות לילה לכפרים תמורת מחיר, והמחיר הוא כל מה שיש לך ואין לו. ${flag('uk_papers')?'הנייר החתום מאפשר לגשת למוסך בלי שאלה אחת.':flag('uk_forged')?'הגעת דרך הניקוז, והוא מריח את זה.':'איש לא שאל דבר בדלת.'}`],
 ch:[
  {l:['Buy a seat','לקנות מקום'],s:['Everything has a price, and this one is fair.','לכל דבר יש מחיר, וזה הוגן.'],check:{stat:'charisma',dc:8},
   win:[`A tin of beans, a box of matches, and a promise. Colin gives you a seat by the window and a look that says he has heard every promise there is. The bus is warm, and the road is empty, and nobody stops it.`,`שימור שעועית, קופסת גפרורים והבטחה. קולין נותן מושב ליד החלון ומבט שאומר ששמע כל הבטחה שיש. האוטובוס חם, הכביש ריק, ואיש לא עוצר אותו.`,{food:-1,morale:4,order:1,flag:'uk_bus'}],
   lose:[`He wants more than you have. He is sorry about it, and says so, and you stand in the garage with the engine running and no seat.`,`הוא רוצה יותר ממה שיש. הוא מצטער, ואומר את זה, ועומדים במוסך עם מנוע פועל ובלי מושב.`,{morale:-4}]},
  {l:['Help him with the engine','לעזור לו עם המנוע'],s:['A bus that runs is worth a seat.','אוטובוס שרץ שווה מושב.'],check:{stat:'wits',dc:9,bg:{mechanic:2}},
   win:[`A cracked hose, a flooded carburettor, a fuel line the wrong colour. By two in the morning the bus runs like a watch, and Colin gives you the seat and a flask of tea, both without being asked.`,`צינור סדוק, מצבר מוצף, קו דלק בצבע הלא נכון. עד שתיים בלילה האוטובוס פועל כמו שעון, וקולין נותן את המושב ותרמוס תה, שניהם בלי שביקשו.`,{morale:5,order:1,water:1,flag:'uk_bus'}],
   lose:[`You take something apart that you cannot put back. Colin is patient, and says so twice, and you sit in the garage with an engine in pieces.`,`פירקת משהו שאי אפשר להרכיב. קולין סבלני, ואומר את זה פעמיים, וישבת במוסך עם מנוע בחלקים.`,{morale:-6,hp:-2}]}
 ]}));

chapter(Object.assign({},UK,{id:'uk_3',n:3,at:.36,
 t:['The Major','המייג׳ור'],
 x:[`The bus is stopped at a roadblock at dawn. A Major in a clean coat steps aboard, looks at every seat, and sits down across from you. He says the cordon needs to know which villages are taking in strangers and which are hiding stock, and that the driver of this bus knows. He would very much like a conversation, and he would like it to be friendly.`,
    `האוטובוס נעצר במחסום עם עלות השחר. מייג׳ור במעיל נקי עולה, מסתכל על כל מושב, ומתיישב מולך. הוא אומר שהסגר צריך לדעת אילו כפרים מקבלים זרים ואילו מסתירים מלאי, ושהנהג של האוטובוס הזה יודע. הוא ישמח מאוד לשיחה, והוא רוצה שתהיה ידידותית.`],
 ch:[
  {l:['Refuse, politely','לסרב, בנימוס'],s:['A passenger, not an informant.','נוסע, לא מלשין.'],check:{stat:'charisma',dc:10},
   win:[`The Major listens, nods, and says that is the answer he expected. He signs a slip and lets the bus through, and he does not forget the face.`,`המייג׳ור מקשיב, מהנהן, ואומר שזו התשובה שציפה לה. הוא חותם על פתק ומעביר את האוטובוס, ולא שוכח את הפנים.`,{humanity:4,order:1,morale:3,flag:'uk_major_respect'}],
   lose:[`The Major's politeness cools. Two soldiers search the bus and your bag, and you are left on the roadside with less than you had.`,`האדיבות של המייג׳ור מתקררת. שני חיילים מחפשים באוטובוס ובתיק, ונשארים בצד הכביש עם פחות ממה שהיה.`,{food:-2,ammo:-1,morale:-5,flag:'uk_major_foe'}]},
  {l:['Tell him a story that sends him the wrong way','לספר לו סיפור ששולח אותו לכיוון הלא נכון'],s:['A soldier\'s favorite thing is a clear answer.','הדבר שחייל הכי אוהב הוא תשובה ברורה.'],check:{stat:'wits',dc:9},
   win:[`You name three villages that do not exist and one that does, with a slight and convincing tremor. He thanks you, writes it down, and the bus rolls on.`,`נקבת בשמות של שלושה כפרים שאינם קיימים ואחד שכן, ברעד קל ומשכנע. הוא מודה, רושם, והאוטובוס ממשיך.`,{order:-1,morale:3,humanity:-2,flag:'uk_major_fooled'}],
   lose:[`The Major has a map, and the map has more villages than your story. He says nothing, and the silence is enough.`,`למייג׳ור יש מפה, ובמפה יותר כפרים מאשר בסיפור. הוא לא אומר דבר, והשקט מספיק.`,{morale:-6,hp:-3,flag:'uk_major_foe'}]}
 ]}));

chapter(Object.assign({},UK,{id:'uk_4',n:4,at:.52,
 t:['The Farm on the Hill','החווה על הגבעה'],
 x:[()=>`The bus stops at a gate that says HIGH RIDGE FARM, with a smaller sign underneath: WORKERS ONLY. Nan Pritchard, seventy, in a waxed coat and wellingtons, meets you at the gate with a lamp and a very old dog. She has forty sheep, eleven people, and a wall that needs mending before the frost. She says she does not take in charity, but she does take in hands. ${flag('uk_major_foe')?'The Major has been here before you; the sheep have been counted twice.':flag('uk_major_fooled')?'The Major has not been here yet, and Nan asks how long.':'The Major has not been here yet.'}`,
    ()=>`האוטובוס עוצר ליד שער עם השלט HIGH RIDGE FARM, ומתחתיו שלט קטן יותר: לעובדים בלבד. ננ פריצ׳ארד, בת שבעים, במעיל שעווה ובמגפי גומי, פוגשת אותך בשער עם פנס וכלב זקן מאוד. יש לה ארבעים כבשים, אחד עשר אנשים, וחומה שצריך לתקן לפני הכפור. היא אומרת שהיא לא מקבלת צדקה, אבל היא מקבלת ידיים. ${flag('uk_major_foe')?'המייג׳ור כבר היה כאן לפניך; הכבשים נספרו פעמיים.':flag('uk_major_fooled')?'המייג׳ור עוד לא היה כאן, וננ שואלת כמה זמן.':'המייג׳ור עוד לא היה כאן.'}`],
 ch:[
  {l:['Work the farm','לעבוד בחווה'],s:['A wall, a lambing, and the frost.','חומה, המלטה, וכפור.'],check:{stat:'stamina',dc:9},
   win:[`Three weeks of mud, stone and lambing at two in the morning. By the end of it your hands are hard, Nan calls you by your name without asking, and the wall has a gate.`,`שלושה שבועות של בוץ, אבן והמלטות בשתיים בלילה. עד הסוף הידיים קשות, ננ קוראת בשם בלי לשאול, ולחומה יש שער.`,{food:3,water:2,hp:4,morale:6,flag:'uk_farm'}],
   lose:[`The frost comes early. You mend half the wall and lose one lamb, and Nan says nothing, and gives you the seat by the fire anyway.`,`הכפור מגיע מוקדם. תיקנת חצי חומה ואיבדת טלה אחד, וננ לא אומרת דבר, ונותנת את המושב ליד האש בכל זאת.`,{hp:-6,morale:-3,flag:'uk_farm'}]},
  {l:['Barter what you know','לסחור במה שיודעים'],s:['Skills are also a kind of hands.','מיומנויות הן גם סוג של ידיים.'],check:{stat:'wits',dc:9},
   win:[`You fix the pump, teach the children, and stitch a farm hand's palm. Nan watches without a word, and writes something in her ledger that looks very much like a fee.`,`תיקנת את המשאבה, לימדת את הילדים, ותפרת כף יד של פועל. ננ מסתכלת בלי מילה, ורושמת בפנקס משהו שנראה מאוד כמו שכר.`,{food:2,meds:1,humanity:3,morale:4,flag:'uk_farm'}],
   lose:[`Nobody needs what you know. They need someone who can carry a bale. You carry a bale, and you feel less useful than you did in the city.`,`איש לא צריך את מה שיודעים. צריכים מישהו שיכול לשאת חבילת קש. נשאת חבילה, והרגשת פחות שימושי מאשר בעיר.`,{morale:-5,hp:-3}]}
 ]}));

chapter(Object.assign({},UK,{id:'uk_5',n:5,at:.70,
 t:['The Winter Vote','הצבעת החורף'],
 x:[()=>`The first snow comes, and with it a line of people at the bottom of the lane: nine adults, four children, and a cart. They have been walking for a week. Nan calls a meeting in the barn, and the farm's eleven people sit on straw bales to vote on whether to open the gate. ${flag('uk_farm')?'You have earned a voice, and everyone knows it.':'You are a guest, and they let you speak because you are the one who is loud.'}`,
    ()=>`השלג הראשון מגיע, ואיתו תור של אנשים בתחתית השביל: תשעה מבוגרים, ארבעה ילדים ועגלה. הם הולכים כבר שבוע. ננ מכנסת אסיפה באסם, ואחד עשר אנשי החווה יושבים על חבילות קש כדי להצביע אם לפתוח את השער. ${flag('uk_farm')?'הרווחת קול, וכולם יודעים.':'אורחים מקבלים זכות דיבור רק אם קולם חזק.'}`],
 ch:[
  {l:['Argue for opening the gate','להתווכח בעד פתיחת השער'],s:['A farm is a place with room.','חווה היא מקום שיש בו מקום.'],check:{stat:'charisma',dc:9},
   win:[`It is six to five. Nan opens the gate with her own hand, and the children go straight for the dog. By spring the farm has twenty-four people and a plan for a second barn.`,`שש מול חמש. ננ פותחת את השער בידיה, והילדים רצים ישר אל הכלב. עד האביב יש בחווה עשרים וארבעה אנשים ותוכנית לאסם שני.`,{humanity:8,morale:5,food:-1,order:2,flag:'uk_open'}],
   lose:[`It is five to six. The gate stays shut, and the line at the bottom of the lane turns and goes. Nobody speaks all night, and Nan sits with her back to the fire.`,`חמש מול שש. השער נשאר סגור, והתור בתחתית השביל מסתובב והולך. איש לא מדבר כל הלילה, וננ יושבת עם הגב לאש.`,{morale:-8,humanity:-4,flag:'uk_shut'}]},
  {l:['Argue for a quarantine barn','להתווכח בעד אסם בידוד'],s:['Open the gate, but not all the way.','לפתוח את השער, אבל לא עד הסוף.'],check:{stat:'wits',dc:9},
   win:[`The compromise passes eight to three. The newcomers spend a fortnight in the old barn, fed and watched, and when it is over three of them stay and one of them is a nurse.`,`הפשרה עוברת שמונה מול שלושה. הבאים החדשים מבלים שבועיים באסם הישן, מוזנים ונצפים, ובסוף שלושה מהם נשארים ואחד מהם אחות.`,{humanity:4,order:3,morale:2,flag:'uk_quarantine'}],
   lose:[`The barn is drafty and the fortnight is long. One of the children coughs on the tenth night, and the whole farm holds its breath until dawn.`,`האסם חדור רוח והשבועיים ארוכים. אחד הילדים משתעל בלילה העשירי, וכל החווה עוצרת נשימה עד עלות השחר.`,{morale:-6,inf:5,order:-1,flag:'uk_quarantine'}]}
 ]}));

chapter(Object.assign({},UK,{id:'uk_6',n:6,at:.88,
 t:['The Ridge','הרכס'],
 x:[()=>`On the last clear day of winter, a convoy climbs the lane: a truck, two jeeps, and a Major in a clean coat. He has come for the farm's stock and its stores, in the name of the cordon, and he has brought a signed order to prove it. ${flag('uk_major_respect')?'He salutes you, which is not a good sign.':flag('uk_major_foe')?'He looks at you first, and for a long time.':flag('uk_major_fooled')?'He does not look at you. He looks at the map on his knee, and the map is wrong.':'He is polite and very tired.'} Nan stands at the gate with her dog and her lamp and says she will not be a ledger entry.`,
    ()=>`ביום הבהיר האחרון של החורף שיירה מטפסת בשביל: משאית, שני ג׳יפים, ומייג׳ור במעיל נקי. הוא בא בשביל המלאי והאספקה של החווה, בשם הסגר, והביא צו חתום כהוכחה. ${flag('uk_major_respect')?'הוא מצדיע לך, וזה לא סימן טוב.':flag('uk_major_foe')?'הוא מסתכל עליך ראשון, ובמשך זמן רב.':flag('uk_major_fooled')?'הוא לא מסתכל עליך. הוא מסתכל במפה על הברך, והמפה שגויה.':'הוא מנומס ועייף מאוד.'} ננ עומדת בשער עם הכלב והפנס ואומרת שלא תהיה שורה בפנקס.`],
 ch:[
  {l:['Hold the ridge with the farm','להחזיק את הרכס עם החווה'],s:['A wall, a gate, and forty sheep.','חומה, שער, וארבעים כבשים.'],check:{stat:'strength',dc:10,mod:()=>flag('uk_open')?2:flag('uk_farm')?1:0},
   win:[`You line the wall with twenty people, forty sheep and a very old dog. The Major reads his order aloud to a wind that does not care, and then he turns the convoy around, and Nan opens the gate and says the tea is on.`,`מסדרים את החומה עם עשרים איש, ארבעים כבשים וכלב זקן מאוד. המייג׳ור מקריא את הצו לרוח שלא אכפת לה, ואז מסובב את השיירה, וננ פותחת את השער ואומרת שהתה מוכן.`,{order:5,humanity:4,morale:8,flag:['uk_end_held','base']}],
   lose:[`The line breaks at the wall. Nobody dies, but the farm loses half its stock and most of its trust in the world outside it.`,`הקו נשבר בחומה. איש לא מת, אבל החווה מאבדת חצי מהמלאי ורוב האמון בעולם שמחוץ לה.`,{hp:-10,food:-3,morale:-6,flag:'uk_end_held'}]},
  {l:['Negotiate a handover','לנהל מו״מ על מסירה'],s:['Give up the stock, keep the farm.','למסור את המלאי, לשמור את החווה.'],check:{stat:'charisma',dc:10,mod:()=>flag('uk_major_respect')?2:flag('uk_major_foe')?-2:0},
   win:[`You take the Major to the kitchen and sit him at the table with a cup of tea. By the time it is cold, the farm has kept its seed, its sheep and its gate, and given the cordon half the harvest and a promise of a visit twice a year.`,`לוקחים את המייג׳ור למטבח ומושיבים אותו ליד השולחן עם כוס תה. עד שהיא קרה, החווה שמרה על הזרעים, הכבשים והשער, ונתנה לסגר חצי מהיבול והבטחה לביקור פעמיים בשנה.`,{order:3,humanity:2,morale:4,food:-2,flag:'uk_end_deal'}],
   lose:[`The Major takes the stock and the seed, and leaves a signature on the gate. The farm survives, thin and quiet, and Nan never mentions the word cordon again.`,`המייג׳ור לוקח את המלאי ואת הזרעים, ומשאיר חתימה על השער. החווה שורדת, רזה ושקטה, וננ לא מזכירה שוב את המילה סגר.`,{food:-4,morale:-6,order:1,flag:'uk_end_deal'}]}
 ]}));
