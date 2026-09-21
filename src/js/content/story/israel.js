
/* ===== ISRAEL: "The Shelter" =====
 * A residential building and its shelter become a small society.
 * Mrs. Levi chairs the building committee. Dror is the retired electrician. Hana is the pharmacist downstairs.
 * Yoram on the fifth floor has a stockpile. The arc ends at the marina, where a last convoy is leaving.
 */
const IL={arc:'loc:israel',label:['The Shelter','המקלט'],of:6};

chapter(Object.assign({},IL,{id:'il_1',n:1,at:.06,
 t:['The Committee','ועד הבית'],
 x:[`The building's shelter smells of damp concrete and instant coffee. Mrs. Levi, chair of the committee for thirty years, bangs a ladle on a pot: forty-one residents, one steel door, three rules to vote on. Someone at the back asks whether strangers count as residents.`,
    `המקלט של הבניין מריח מבטון לח ומקפה נמס. גב׳ לוי, יו״ר הוועד מזה שלושים שנה, דופקת בכף על סיר: ארבעים ואחד דיירים, דלת פלדה אחת, שלושה כללים להצבעה. מישהו מאחור שואל אם זרים נחשבים לדיירים.`],
 ch:[
  {l:['Argue for an open door','להתווכח בעד דלת פתוחה'],s:["Strangers are people who haven't met yet.",'זרים הם אנשים שעוד לא הכירו.'],check:{stat:'charisma',dc:8},
   win:[`The vote is 22 to 19. Mrs. Levi lowers the ladle and says the minutes will record that the door was opened by argument, not by force.`,`ההצבעה 22 מול 19. גב׳ לוי מורידה את הכף ואומרת שבפרוטוקול ייכתב שהדלת נפתחה בוויכוח ולא בכוח.`,{humanity:5,order:2,morale:4,flag:'il_open'}],
   lose:[`The vote is 19 to 22. Two families leave the shelter that night, and the door has a new lock by morning.`,`ההצבעה 19 מול 22. שתי משפחות עוזבות את המקלט באותו לילה, ולדלת יש מנעול חדש עד הבוקר.`,{morale:-4,order:-1}]},
  {l:['Propose a rota and a ration','להציע תורנות ומנה'],s:['Rules everyone can live with.','כללים שכולם יכולים לחיות איתם.'],check:{stat:'wits',dc:8},
   win:[`A list on the wall, a clipboard on a string, and a roster for water, watch and cooking. Mrs. Levi says it is the best proposal she has seen since 1994.`,`רשימה על הקיר, לוח כתיבה על חוט, ותורנות למים, לשמירה ולבישול. גב׳ לוי אומרת שזו ההצעה הכי טובה מאז 1994.`,{order:3,food:1,morale:3,flag:'il_rota'}],
   lose:[`The rota works for two days and dies on the third, at the first argument about who forgot to fill the barrel.`,`התורנות עובדת יומיים ומתה ביום השלישי, בוויכוח הראשון על מי ששכח למלא את החבית.`,{morale:-4,order:-1}]}
 ]}));

chapter(Object.assign({},IL,{id:'il_2',n:2,at:.20,
 t:['The Stockpile','המלאי'],
 x:[()=>`Yoram from the fifth floor has forty cases of canned food, six water barrels and a generator, all behind an apartment door with three bolts. Everyone in the building knows. Nobody says. ${flag('il_open')?'The strangers you let in are starting to ask questions.':flag('il_rota')?"The rota lists his name for water duty. He hasn't shown up.":'The shelter is down to its last cans.'}`,
    ()=>`יורם מהקומה החמישית מחזיק ארבעים ארגזי שימורים, שש חביות מים וגנרטור, הכול מאחורי דלת דירה עם שלושה ברגים. כולם בבניין יודעים. איש לא אומר. ${flag('il_open')?'הזרים שהוכנסו מתחילים לשאול שאלות.':flag('il_rota')?'בתורנות רשום שמו לתורנות מים. הוא לא הופיע.':'במקלט נותרו השימורים האחרונים.'}`],
 ch:[
  {l:['Ask him to share, in front of everyone','לבקש ממנו לחלוק, מול כולם'],s:['Shame is a kind of tax.','בושה היא סוג של מס.'],check:{stat:'charisma',dc:9},
   win:[`Yoram stands in the doorway for a long minute. Then he carries out the first ten cases himself, and says the rest are for emergencies. Nobody asks him to define one.`,`יורם עומד בפתח דקה ארוכה. אחר כך הוא מוציא בעצמו את עשרת הארגזים הראשונים, ואומר שהשאר לשעת חירום. איש לא מבקש ממנו להגדיר אותה.`,{food:4,water:2,order:2,flag:'il_yoram_shared'}],
   lose:[`He slams the door. The bolts turn one, two, three, and for a week nobody meets his eyes in the stairwell.`,`הוא טורק את הדלת. הברגים מסתובבים אחד, שניים, שלושה, ובמשך שבוע איש לא פוגש את עיניו בחדר המדרגות.`,{morale:-5}]},
  {l:['Trade him a favor for a share','להחליף איתו טובה בחלק'],s:['Everyone has something they cannot do alone.','לכל אחד יש משהו שאי אפשר לעשות לבד.'],check:{stat:'wits',dc:9},
   win:[`Yoram needs his elderly mother moved to the ground floor. Four people and a chair carry her down, and by evening two cases of food appear outside the door.`,`יורם צריך להעביר את אמו המבוגרת לקומת הקרקע. ארבעה אנשים וכיסא מורידים אותה, ועד הערב מופיעים שני ארגזי אוכל ליד הדלת.`,{food:3,humanity:3,order:1,flag:'il_yoram_shared'}],
   lose:[`He takes the favor and forgets the share. You have been paid in thanks, and everyone saw it.`,`הוא לוקח את הטובה ושוכח את החלק. שולם בתודה, והכול ראו.`,{morale:-4}]}
 ]}));

chapter(Object.assign({},IL,{id:'il_3',n:3,at:.36,
 t:['The Generator','הגנרטור'],
 x:[`Dror, the building's retired electrician, says the generator in the basement would run for months if he had a fuel pump, and a fuel pump is at the hardware store two streets away, behind a shutter that has been down since the first week. He says the street is quiet at four in the morning.`,
    `דרור, החשמלאי הגמלאי של הבניין, אומר שהגנרטור במרתף היה עובד חודשים אם הייתה לו משאבת דלק, ומשאבת דלק יש בחנות לחומרי בניין שני רחובות משם, מאחורי תריס שסגור מאז השבוע הראשון. הוא אומר שהרחוב שקט בארבע לפנות בוקר.`],
 ch:[
  {l:['Go with Dror at four','ללכת עם דרור בארבע'],s:['Quiet hands and one flashlight.','ידיים שקטות ופנס אחד.'],check:{stat:'stealth',dc:9},
   win:[`The shutter goes up a hand's width. Dror slides in, and slides out with a pump, wire, and a jar of screws. The street never wakes up.`,`התריס עולה כשיעור כף יד. דרור מחליק פנימה, ויוצא עם משאבה, חוט וצנצנת ברגים. הרחוב לא מתעורר.`,{order:3,morale:5,flag:'il_power'}],
   lose:[`The shutter screams. The street wakes up. You get Dror back to the door, but not the pump.`,`התריס צורח. הרחוב מתעורר. מחזירים את דרור לדלת, אבל לא את המשאבה.`,{hp:-8,morale:-5,inf:4}]},
  {l:['Ask the neighbors to lend what they have','לבקש משכנים להשאיל מה שיש להם'],s:['A building has more in it than it thinks.','בבניין יש יותר ממה שהוא חושב.'],check:{stat:'charisma',dc:9},
   win:[`A pump from the second floor, a coil from the fourth, a jar of screws from a widow who says her husband never threw anything away. The generator coughs on the third try.`,`משאבה מהקומה השנייה, סליל מהרביעית, צנצנת ברגים מאלמנה שאומרת שבעלה לא זרק דבר. הגנרטור משתעל בניסיון השלישי.`,{order:2,humanity:3,morale:6,flag:'il_power'}],
   lose:[`Nobody has a pump. Everybody has an opinion about who should.`,`לאף אחד אין משאבה. לכולם יש דעה על מי צריך.`,{morale:-4,order:-1}]}
 ]}));

chapter(Object.assign({},IL,{id:'il_4',n:4,at:.52,
 t:['The Cough on the Third Floor','השיעול בקומה שלוש'],
 x:[()=>`Hana, the pharmacist from the ground floor, knocks on the shelter door at midnight. A man on the third floor has a fever and a cough, and a bite on his shin that he says is from a dog. ${flag('il_power')?'The lights are on, which makes the argument louder.':'In the dark, the argument is quieter and worse.'}`,
    ()=>`חנה, הרוקחת מקומת הקרקע, דופקת על דלת המקלט בחצות. לאדם בקומה השלישית יש חום ושיעול, ונשיכה בשוק שהוא אומר שהיא של כלב. ${flag('il_power')?'האורות דולקים, וזה עושה את הוויכוח חזק יותר.':'בחושך הוויכוח שקט יותר, וגרוע יותר.'}`],
 ch:[
  {l:['Isolate the third floor','לבודד את הקומה השלישית'],s:['Sealed doors, and a hard conversation.','דלתות אטומות, ושיחה קשה.'],check:{stat:'charisma',dc:9},
   win:[`Hana tapes plastic across the landing. The man's family agrees to stay with him, and Mrs. Levi reads out the rules in a voice that carries. Two days later he is dead, and nobody else is sick.`,`חנה מדביקה ניילון על המפלס. משפחת האיש מסכימה להישאר איתו, וגב׳ לוי מקריאה את הכללים בקול שנשמע. יומיים אחר כך הוא מת, ואף אחד אחר לא חולה.`,{order:3,outbreak:-2,humanity:-2,morale:-2,flag:'il_quarantine'}],
   lose:[`The family will not be sealed in. You spend the night on the landing arguing, and by dawn the argument is the only thing that has been contained.`,`המשפחה לא מסכימה להיות אטומה. בילית את הלילה במפלס בוויכוח, ועד עלות השחר הוויכוח הוא הדבר היחיד שהוגבל.`,{morale:-6,inf:6,order:-2}]},
  {l:['Treat him openly, in the shelter','לטפל בו בגלוי, בתוך המקלט'],s:['Hana has a stethoscope and a stubborn streak.','לחנה יש סטטוסקופ ועקשנות.'],check:{stat:'wits',dc:10,bg:{doctor:2}},
   win:[`It is not what Hana feared. The bite is a dog's, the fever is an infection, and the antibiotics are enough. The shelter has never been so relieved, or so embarrassed.`,`זה לא מה שחנה חששה ממנו. הנשיכה של כלב, החום דלקת, והאנטיביוטיקה מספיקה. המקלט מעולם לא היה כל כך מוקל, או כל כך נבוך.`,{humanity:5,morale:6,meds:-1,flag:'il_treated'}],
   lose:[`It is what Hana feared. By morning the shelter has two more patients, and the door has three locks.`,`זה מה שחנה חששה ממנו. עד הבוקר יש במקלט שני חולים נוספים, ולדלת שלושה מנעולים.`,{inf:10,hp:-6,morale:-8,outbreak:2}]}
 ]}));

chapter(Object.assign({},IL,{id:'il_5',n:5,at:.70,
 t:['The Radio Says South','הרדיו אומר דרום'],
 x:[()=>`Dror's radio, powered by the generator, picks up a steady voice: an evacuation from the marina, the last convoy, two days from now. Mrs. Levi reads it aloud to the shelter. There are forty-three of them now, and the marina is a day's walk away. ${flag('il_yoram_shared')?'Yoram offers his van, and his fuel.':'Yoram says nothing, and the van in his garage says nothing louder.'}`,
    ()=>`הרדיו של דרור, שמופעל בגנרטור, קולט קול יציב: פינוי מהמרינה, השיירה האחרונה, בעוד יומיים. גב׳ לוי מקריאה אותו בקול לכל המקלט. עכשיו הם ארבעים ושלושה, והמרינה במרחק יום הליכה. ${flag('il_yoram_shared')?'יורם מציע את הוואן שלו, ואת הדלק.':'יורם לא אומר דבר, והוואן שבחניה שלו לא אומר דבר בקול רם יותר.'}`],
 ch:[
  {l:['Organize the whole building to go together','לארגן את כל הבניין לצאת יחד'],s:['Forty-three people, one road.','ארבעים ושלושה אנשים, דרך אחת.'],check:{stat:'charisma',dc:10},
   win:[`A line of forty-three, with a stretcher, two strollers, and Mrs. Levi at the front with her folding chair. Nobody is left, and nobody is late.`,`שורה של ארבעים ושלושה, עם אלונקה, שתי עגלות וגב׳ לוי בראש עם כיסא מתקפל. איש לא נשאר, ואיש לא מאחר.`,{humanity:8,order:3,morale:6,flag:'il_group'}],
   lose:[`Half want to go, and half do not. The building splits in two on the stairs, and each half blames the other.`,`חצי רוצים ללכת, וחצי לא. הבניין מתפצל לשניים על המדרגות, וכל חצי מאשים את השני.`,{morale:-8,order:-3,flag:'il_split'}]},
  {l:['Go with a small, fast group','לצאת עם קבוצה קטנה ומהירה'],s:['Speed is also a kind of care.','מהירות היא גם סוג של דאגה.'],check:{stat:'stamina',dc:9},
   win:[`Six people, one van, and a decision no one will say out loud. You reach the marina before the sun does, and a queue is already forming.`,`שישה אנשים, ואן אחד, והחלטה שאיש לא יאמר בקול. מגיעים למרינה לפני השמש, ותור כבר מתגבש.`,{food:1,morale:2,humanity:-4,flag:'il_solo'}],
   lose:[`The van breaks down on the coast road. You walk the last four kilometers at night, and arrive with fewer people than you left with.`,`הוואן מתקלקל בכביש החוף. הולכים ארבעה קילומטרים אחרונים בלילה, ומגיעים עם פחות אנשים ממה שיצאו.`,{hp:-10,morale:-6,flag:'il_solo'}]}
 ]}));

chapter(Object.assign({},IL,{id:'il_6',n:6,at:.88,
 t:['The Marina','המרינה'],
 x:[()=>`The marina at dawn. Boats of every size, a harbor master with a whistle, and a list he reads aloud. ${flag('il_group')?'Forty-three names, read in order, and none of them is missing.':flag('il_split')?'Half the building came, and half did not, and every name on the list has a face you remember.':'The list is short, and it has your name on it. Not everyone you left is on it.'} Behind you, the city.`,
    ()=>`המרינה עם עלות השחר. סירות בכל גודל, מנהל נמל עם משרוקית, ורשימה שהוא מקריא בקול. ${flag('il_group')?'ארבעים ושלושה שמות, מוקראים לפי הסדר, ואף אחד מהם לא חסר.':flag('il_split')?'חצי מהבניין הגיע, וחצי לא, ולכל שם ברשימה יש פנים שזוכרים.':'הרשימה קצרה, ושמך עליה. לא כל מי שהושאר נמצא בה.'} מאחור, העיר.`],
 ch:[
  {l:['Board the boat','לעלות על הסירה'],s:['A long sea, and a chance.','ים ארוך, וסיכוי.'],check:{stat:'stamina',dc:9,mod:()=>flag('il_group')?2:flag('il_split')?-1:0},
   win:[`The harbor master blows the whistle. The boat leans out into the light, and somebody starts to sing a song everyone knows, and nobody can remember where from.`,`מנהל הנמל שורק. הסירה נשענת החוצה אל האור, ומישהו מתחיל לשיר שיר שכולם מכירים ואיש לא זוכר מאיפה.`,{morale:10,order:4,humanity:3,flag:'il_end_out'}],
   lose:[`The sea is rougher than the harbor master promised. You arrive with the boat half-full and the story half-told.`,`הים גס יותר ממה שמנהל הנמל הבטיח. מגיעים עם סירה חצי מלאה וסיפור חצי מסופר.`,{hp:-10,morale:-5,flag:'il_end_out'}]},
  {l:['Turn back for the ones who did not come','לחזור אל אלה שלא באו'],s:['A door needs someone on the inside.','לדלת צריך מישהו בפנים.'],check:{stat:'strength',dc:9},
   win:[`You walk back into the city at noon. The building is still there, and so is whoever stayed in it. By winter it is a village with a door, a generator and a roster that works.`,`חזרת אל העיר בצהריים. הבניין עדיין שם, וגם מי שנשאר בו. עד החורף הוא כפר עם דלת, גנרטור ותורנות שעובדת.`,{order:5,humanity:6,morale:8,flag:['il_end_stay','builder']}],
   lose:[`You reach the building, but the door is open and the shelter is empty. You spend the winter rebuilding it with whoever you can find.`,`הגעת לבניין, אבל הדלת פתוחה והמקלט ריק. בילית את החורף בבנייתו מחדש עם מי שנמצא.`,{order:1,morale:-3,humanity:3,flag:'il_end_stay'}]}
 ]}));
