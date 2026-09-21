
/* ===== THE DOCTOR: "The Oath" =====
 * The same four chapters in every country, but the place, the nurse, and what the scarcity looks like
 * change with where the doctor is. On top of that, two country-specific chapters: the doctor's own
 * problem in Brazil, and in Israel, tied to what the player did in the country arc.
 */
const DOC_SLOT={
  usa:      {place:['the urgent-care center','מרכז הטיפול הדחוף'],nurse:['Nurse Joan','האחות ג׳ואן']},
  brazil:   {place:['the clinic on the hill','המרפאה על הגבעה'],nurse:['Nurse Dalva','האחות דלווה']},
  uk:       {place:['the village surgery','מרפאת הכפר'],nurse:['Nurse Pat','האחות פט']},
  japan:    {place:['the neighborhood clinic','מרפאת השכונה'],nurse:['Nurse Sato','האחות סאטו']},
  canada:   {place:['the nursing station','תחנת הסיעוד'],nurse:['Nurse Claire','האחות קלייר']},
  israel:   {place:['the neighborhood clinic','מרפאת השכונה'],nurse:['Nurse Rina','האחות רינה']},
  australia:{place:['the bush clinic','מרפאת השטח'],nurse:['Nurse Bev','האחות בב']}
};
const docSlot=()=>DOC_SLOT[G.p.loc]||DOC_SLOT.uk;
const DR={arc:'bg:doctor',label:['The Oath','השבועה'],of:4};

chapter(Object.assign({},DR,{id:'doc_1',n:1,at:.12,
 t:['The Waiting Room','חדר ההמתנה'],
 x:[()=>`By the second week, ${docSlot().place[0]} is a waiting room with no end. Forty people on chairs, on the floor, on the stairs. ${docSlot().nurse[0]} hands you a clipboard: names, symptoms, and a column she has headed "will not survive the week." You have eleven hours of daylight and two hands.`,
    ()=>`בשבוע השני ${docSlot().place[1]} הוא חדר המתנה בלי סוף. ארבעים איש על כיסאות, על הרצפה, על המדרגות. ${docSlot().nurse[1]} מושיטה לוח כתיבה: שמות, תסמינים, ועמודה שכותרתה "לא ישרוד את השבוע". יש אחת עשרה שעות אור ושתי ידיים.`],
 ch:[
  {l:['Triage by need, and stick to it','למיין לפי דחיפות ולהתמיד'],s:['Hard rules save the most.','כללים קשים מצילים הכי הרבה.'],check:{stat:'wits',dc:8,bg:{doctor:2}},
   win:[`By evening the room is quiet. Some people wait, and some leave, and a few will never be seen. The nurse says nothing, and squeezes your arm as you pass.`,`עד הערב החדר שקט. יש כאלה שמחכים, וכאלה שעוזבים, וחלק לא יטופלו לעולם. האחות לא אומרת דבר, ולוחצת את הזרוע כשעוברים.`,{order:2,humanity:-2,morale:2,flag:'doc_triage'}],
   lose:[`You misjudge one case, a child with a pain in her side, and it stays with you. The rest of the day is a long, careful blur.`,`טעית בהערכה של מקרה אחד, ילדה עם כאב בצד, וזה נשאר איתך. שאר היום הוא טשטוש ארוך וזהיר.`,{morale:-8,humanity:1}]},
  {l:['See everyone who comes','לראות את כל מי שבא'],s:['Not one turned away.','אף אחד לא נדחה.'],check:{stat:'stamina',dc:10},
   win:[`Eighteen hours, forty-one patients, and a nurse who fills your cup whenever it is empty. Nobody is turned away, and you sleep on the floor of the supply room with the door open.`,`שמונה עשרה שעות, ארבעים ואחד מטופלים, ואחות שממלאת את הכוס בכל פעם שהיא ריקה. איש לא נדחה, וישנת על רצפת חדר האספקה עם הדלת פתוחה.`,{humanity:6,morale:4,hp:-6,meds:-1,flag:'doc_all'}],
   lose:[`By hour fourteen your hands shake, and by hour sixteen you make a mistake. It is small, and it is caught, and you are told so kindly.`,`בשעה ארבע עשרה הידיים רועדות, ובשעה שש עשרה נעשית טעות. היא קטנה, נתפסת, ואומרים על כך בעדינות.`,{hp:-10,morale:-6,meds:-1}]}
 ]}));

chapter(Object.assign({},DR,{id:'doc_2',n:2,at:.30,
 t:['The Ledger','פנקס התרופות'],
 x:[()=>`The antibiotics are down to one shelf, and the ledger has more names than the shelf has doses. A man with a rifle waits at the counter. He says his wife has a fever, that he has always paid his bills, and that there is another way to settle this.${flag('doc_triage')?' Your own rule, written on the wall, says who is next.':' Nobody wrote down who is next.'}`,
    ()=>`האנטיביוטיקה מצטמצמת למדף אחד, ובפנקס יש יותר שמות ממה שיש מנות על המדף. אדם עם רובה מחכה ליד הדלפק. הוא אומר שלאשתו יש חום, שתמיד שילם את חשבונותיו, ושיש דרך אחרת ליישב את זה.${flag('doc_triage')?' הכלל שנכתב על הקיר אומר מי הבא בתור.':' איש לא כתב מי הבא בתור.'}`],
 ch:[
  {l:['Refuse, and ration by need','לסרב ולחלק לפי צורך'],s:['The list is the list.','הרשימה היא הרשימה.'],check:{stat:'charisma',dc:10,bg:{doctor:1}},
   win:[`He looks at the wall, at the rifle in his hands, and at you. Then he lowers it, and asks whether his wife could move up the list by being sicker. You show him the ledger. He sits down.`,`הוא מסתכל בקיר, ברובה בידיו, ובך. אחר כך מוריד אותו, ושואל אם אשתו יכולה לעלות ברשימה אם תהיה חולה יותר. מראים לו את הפנקס. הוא מתיישב.`,{order:3,humanity:4,morale:4,flag:'doc_fair'}],
   lose:[`The rifle comes up. The nurse steps between you, and it goes off into the ceiling. Nobody is hurt. Everything is different.`,`הרובה עולה. האחות נכנסת ביניכם, והוא יורה בתקרה. איש לא נפגע. הכול שונה.`,{hp:-6,morale:-8,order:-2}]},
  {l:['Give him a dose to keep the peace','לתת לו מנה כדי לשמור על שקט'],s:['One dose to keep forty safe.','מנה אחת כדי לשמור על ארבעים.'],check:{stat:'wits',dc:8},
   win:[`He takes the dose, and a piece of the peace. The word goes around that the clinic can be persuaded, and for a while it is the safest clinic in the district.`,`הוא לוקח את המנה, וחלק מהשקט. השמועה עוברת שאפשר לשכנע את המרפאה, ובמשך זמן זו המרפאה הבטוחה ביותר במחוז.`,{meds:-1,order:1,humanity:-4,morale:-2,flag:'doc_paid'}],
   lose:[`He takes the dose and comes back the next day with a friend.`,`הוא לוקח את המנה וחוזר למחרת עם חבר.`,{meds:-2,morale:-6,humanity:-3}]}
 ]}));

chapter(Object.assign({},DR,{id:'doc_3',n:3,at:.58,
 t:['The Sample','הדגימה'],
 x:[()=>`A woman is brought in with a bite on her forearm, five days old. By every rule she should have turned by now. She is warm, hungry, annoyed, and entirely herself. ${docSlot().nurse[0]} looks at you over her head and says nothing at all. ${flag('doc_fair')?"Word of the clinic's fairness has spread, and people trust what happens here.":flag('doc_paid')?"Word of the clinic's price has spread, and people are watching what happens here.":'Word has spread.'}`,
    ()=>`אישה מובאת עם נשיכה בשורש כף היד, בת חמישה ימים. לפי כל הכללים היא הייתה צריכה להשתנות עד עכשיו. היא חמה, רעבה, מרוגזת, ולגמרי עצמה. ${docSlot().nurse[1]} מסתכלת עליך מעל ראשה ולא אומרת דבר. ${flag('doc_fair')?'שמועת ההגינות של המרפאה התפשטה, ואנשים סומכים על מה שקורה כאן.':flag('doc_paid')?'שמועת המחיר של המרפאה התפשטה, ואנשים עוקבים אחרי מה שקורה כאן.':'השמועה התפשטה.'}`],
 ch:[
  {l:['Keep her safe, and study what protects her','לשמור עליה ולחקור מה מגן עליה'],s:['Hide her in the back room.','להחביא אותה בחדר האחורי.'],check:{stat:'wits',dc:10,bg:{doctor:2}},
   win:[`Three days, four blood tests, and a notebook in a language only its writer can read. The pattern is small, and it is real. Nobody is told, and she promises not to tell either.`,`שלושה ימים, ארבע בדיקות דם, ומחברת בשפה שרק מי שכתב אותה יכול לקרוא. התבנית קטנה, והיא אמיתית. איש לא מספר, והיא מבטיחה גם.`,{morale:6,humanity:3,flag:'doc_immune'}],
   lose:[`Someone sees her through the back window. By morning the word is out, and the back room is not a secret anymore.`,`מישהו רואה אותה דרך החלון האחורי. עד הבוקר השמועה בחוץ, והחדר האחורי כבר לא סוד.`,{morale:-6,order:-2}]},
  {l:['Report her, and quarantine the clinic','לדווח עליה ולסגור את המרפאה בבידוד'],s:['It is the rule. It is also the risk.','זה הכלל. וזה גם הסיכון.'],check:{stat:'charisma',dc:9},
   win:[`The convoy medic arrives within the hour and takes her, with her permission, to a place with better instruments. She waves. You will never learn what became of her.`,`חובש השיירה מגיע תוך שעה ולוקח אותה, ברשותה, למקום עם מכשירים טובים יותר. היא מנופפת. לעולם לא יידע מה עלה בגורלה.`,{order:3,humanity:-2,morale:-2,flag:'doc_reported'}],
   lose:[`They come, and they take her, and they are not gentle. She will not be the one remembered for this. You will.`,`הם באים, ולוקחים אותה, ולא בעדינות. את הרגע הזה יזכרו, ואת מי שדיווח.`,{humanity:-6,morale:-8,order:1,flag:'doc_reported'}]}
 ]}));

chapter(Object.assign({},DR,{id:'doc_4',n:4,at:.80,
 t:['The Oath','השבועה'],
 x:[()=>`The notebook stays in your coat, always, and everyone knows it. At dawn a convoy pulls up outside ${docSlot().place[0]}: a young officer, forty soldiers, and a letter. They want the notebook, the samples, and ${flag('doc_immune')?'the woman in the back room':'whatever you learned'}. ${flag('doc_fair')?'The people of the district stand at the gate. They have not been asked.':'The people of the district watch from their windows.'}`,
    ()=>`המחברת נשארת במעיל, תמיד, וכולם יודעים. עם עלות השחר שיירה עוצרת מחוץ ל${docSlot().place[1]}: קצין צעיר, ארבעים חיילים, ומכתב. הם רוצים את המחברת, את הדגימות, ו${flag('doc_immune')?'את האישה מהחדר האחורי':'את מה שנלמד'}. ${flag('doc_fair')?'תושבי המחוז עומדים בשער. איש לא שאל אותם.':'תושבי המחוז צופים מהחלונות.'}`],
 ch:[
  {l:['Hide the notebook, and the woman','להחביא את המחברת ואת האישה'],s:['Some knowledge is not a weapon until it is safe.','יש ידע שאינו נשק עד שהוא בטוח.'],check:{stat:'stealth',dc:10,bg:{doctor:1}},
   win:[`The officer searches, finds nothing, and, as it turns out, does not want to. You leave by night with the notebook in a coat that has never felt heavier, and a promise to bring it somewhere better.`,`הקצין מחפש, לא מוצא כלום, ולמעשה גם לא רוצה. יוצאים בלילה עם המחברת במעיל שמעולם לא היה כבד כל כך, ועם הבטחה להביא אותה למקום טוב יותר.`,{humanity:6,morale:4,order:-1,flag:['doc_end_hid','cure']}],
   lose:[`The officer finds it on the second sweep. He is not cruel, and he is not gentle. The notebook goes into a box, and you are left with your hands and your memory.`,`הקצין מוצא אותה בסריקה השנייה. הוא לא אכזר, ולא עדין. המחברת נכנסת לקופסה, ונשארים הידיים והזיכרון.`,{morale:-8,hp:-4,flag:'doc_end_lost'}]},
  {l:['Hand it over, and ask for a hospital','למסור אותה ולבקש בית חולים'],s:['Let it be someone else\'s burden.','שיהיה זה נטל של מישהו אחר.'],check:{stat:'charisma',dc:10},
   win:[`The officer reads the first page and stops. He says a laboratory in the north has been looking for exactly this. The convoy takes the notebook, you, and a crate of antibiotics. The clinic goes with you in spirit.`,`הקצין קורא את הדף הראשון ועוצר. הוא אומר שמעבדה בצפון חיפשה בדיוק את זה. השיירה לוקחת את המחברת, אותך, וארגז אנטיביוטיקה. המרפאה הולכת איתך ברוח.`,{meds:3,order:4,humanity:2,flag:['doc_end_handed','cure']}],
   lose:[`The officer takes the notebook and the samples. There is no crate, no hospital, and no promise. The clinic reopens the next morning, and the line is longer.`,`הקצין לוקח את המחברת ואת הדגימות. אין ארגז, אין בית חולים, ואין הבטחה. המרפאה נפתחת למחרת בבוקר, והתור ארוך יותר.`,{morale:-6,humanity:-2,flag:'doc_end_lost'}]}
 ]}));

/* ---- the doctor, in one country ---- */
chapter({id:'pair_doc_br',arc:'pair:doctor:brazil',n:1,at:.45,label:['The Oath \u00b7 Rooftops','השבועה \u00b7 הגגות'],
 t:['The Rooftop Ward','המחלקה על הגג'],
 x:[()=>`Renata has turned the top-floor stairwell into a ward: eight mattresses, a bucket for water, a clipboard. She says every roof has a wound, and the Net has only one doctor. ${flag('br_osvaldo_deal')?"Osvaldo's nephew is on the third mattress, a shotgun wound in his thigh. Osvaldo has sent word: he will remember what you do.":flag('br_osvaldo_enemy')?"The man on the third mattress is Osvaldo's nephew, and he is bleeding out. He has not been told who the doctor is.":'The third mattress holds a man nobody on the roof knows.'}`,
    ()=>`רנטה הפכה את חדר המדרגות בקומה העליונה למחלקה: שמונה מזרנים, דלי מים, לוח כתיבה. היא אומרת שלכל גג יש פצע, ולרשת רופא אחד בלבד. ${flag('br_osvaldo_deal')?'האחיין של אוסוולדו על המזרן השלישי, פצע ירי בירך. אוסוולדו שלח הודעה: הוא יזכור מה נעשה.':flag('br_osvaldo_enemy')?'האיש על המזרן השלישי הוא האחיין של אוסוולדו, והוא מדמם. לא סיפרו לו מי הרופא.':'על המזרן השלישי שוכב אדם שאיש בגג לא מכיר.'}`],
 ch:[
  {l:['Treat him first, without a word','לטפל בו ראשון, בלי מילה'],s:['A patient is a patient.','מטופל הוא מטופל.'],check:{stat:'wits',dc:9,bg:{doctor:2}},
   win:[`The fragments come out one by one. He wakes in the night and says nothing, and in the morning there is a sack of rice by the ward door and no note.`,`השברים יוצאים אחד אחד. הוא מתעורר בלילה ואינו אומר דבר, ובבוקר יש שק אורז ליד דלת המחלקה ובלי פתק.`,{food:3,humanity:5,order:2}],
   lose:[`You lose him at three in the morning, and you know exactly which artery. Osvaldo's nephews do not come. Somehow that is worse.`,`איבדת אותו בשלוש לפנות בוקר, וידוע בדיוק איזה עורק. האחיינים של אוסוולדו לא באים. איכשהו זה גרוע יותר.`,{hp:-4,morale:-8,humanity:1}]},
  {l:['Ask for a price first','לדרוש מחיר קודם'],s:['The ward runs on trades.','המחלקה פועלת על סחר.'],check:{stat:'charisma',dc:9},
   win:[`The price is water, and a promise that the wells will be shared. Osvaldo's man signs with a thumbprint, and the bone is set.`,`המחיר הוא מים, והבטחה שהבארות ייחלקו. איש אוסוולדו חותם בטביעת אגודל, והעצם נקבעת.`,{water:3,order:3,humanity:-2}],
   lose:[`He looks at you as if you had asked him to sell his mother. The ward hears it, and for a week the roofs speak of it in low voices.`,`הוא מסתכל כאילו ביקשו ממנו למכור את אמו. המחלקה שומעת, ובמשך שבוע הגגות מדברים על כך בקול נמוך.`,{morale:-6,order:-1,humanity:-2}]}
 ]});

chapter({id:'pair_doc_il',arc:'pair:doctor:israel',n:1,at:.45,label:['The Oath \u00b7 The Shelter','השבועה \u00b7 המקלט'],
 t:['The Pharmacy Downstairs','בית המרקחת בקומת הקרקע'],
 x:[()=>`Hana's pharmacy has been sealed since the first week, its shutters down and its insulin fridge dead. Three residents of the building need insulin to live, and the last cold pack is warming in the shelter's cooler. ${flag('il_quarantine')?'The floor you sealed is silent, and everyone in the building is watching what you do next.':flag('il_treated')?'The building trusts your hands. They will follow whatever you decide.':'Hana looks at you and waits.'}`,
    ()=>`בית המרקחת של חנה סגור מהשבוע הראשון, התריסים למטה ומקרר האינסולין מת. שלושה דיירים בבניין זקוקים לאינסולין כדי לחיות, והחבילה הקרה האחרונה מתחממת במקרר של המקלט. ${flag('il_quarantine')?'הקומה שנאטמה שקטה, וכולם בבניין עוקבים אחרי המהלך הבא.':flag('il_treated')?'הבניין סומך על הידיים האלה. אחרי ההחלטה ילכו.':'חנה מסתכלת ומחכה.'}`],
 ch:[
  {l:['Break into the pharmacy with Hana','לפרוץ יחד עם חנה לבית המרקחת'],s:['A dead fridge, live stock, if the back room held.','מקרר מת, מלאי חי, אם החדר האחורי החזיק.'],check:{stat:'stealth',dc:9,bg:{doctor:1}},
   win:[`The back room is a cold cave, and the insulin is a cold thing in it. Hana holds the flashlight, breath is held, and nine vials come out intact. Three lives, more or less, for a winter.`,`החדר האחורי הוא מערה קרה, והאינסולין הוא דבר קר בתוכה. חנה מחזיקה את הפנס, מחזיקים את הנשימה, ותשעה בקבוקונים יוצאים שלמים. שלושה חיים, פחות או יותר, לחורף.`,{meds:2,humanity:5,morale:5}],
   lose:[`The back room has been visited. The shelves are bare, and there is a tin of something on the floor that is not from a pharmacy.`,`בחדר האחורי כבר ביקרו. המדפים ריקים, ועל הרצפה קופסה שלא מבית מרקחת.`,{hp:-8,inf:6,morale:-4}]},
  {l:['Ration the last cold pack','לחלק את החבילה הקרה האחרונה'],s:['Ten days of ration, and a hard list.','עשרה ימי מנה, ורשימה קשה.'],check:{stat:'wits',dc:8,bg:{doctor:2}},
   win:[`Three residents, ten days, and a plan for the next ten. The schedule goes up on the shelter wall in a doctor's handwriting, and Mrs. Levi initials it.`,`שלושה דיירים, עשרה ימים, ותוכנית לעשרת הימים הבאים. הלוח עולה על קיר המקלט בכתב יד של רופא, וגב׳ לוי חותמת בראשי תיבות.`,{order:2,humanity:3,morale:2}],
   lose:[`The ration runs out on the ninth day, not the tenth. Someone in the building never forgives, and someone else never says.`,`המנה נגמרת ביום התשיעי, לא העשירי. מישהו בבניין אינו סולח לעולם, ומישהו אחר אינו אומר.`,{morale:-8,humanity:-1}]}
 ]});
