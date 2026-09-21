
/* ===== THE POLITICIAN: "The Mandate" =====
 * People look to the one who knows how to speak in a room. A signature, a ledger, a microphone, a ballot box.
 */
const PO={arc:'bg:politician',label:['The Mandate','המנדט'],of:4};
const PO_AGES=[
 [`Two years in the job, and the lowest age at the table.`,`שנתיים בתפקיד, והגיל הנמוך ביותר ליד השולחן.`],
 [`Long enough in the job to know what a signature costs.`,`מספיק שנים בתפקיד כדי לדעת כמה חתימה עולה.`],
 [`Thirty years of signatures, and none of them like this.`,`שלושים שנה של חתימות, ואף אחת לא כזאת.`]];

chapter(Object.assign({},PO,{id:'po_1',n:1,at:.12,
 t:['Emergency Powers','סמכויות חירום'],
 x:[()=>`Somebody has to sign something. A crowd of thirty has gathered in a corridor, and one of them holds a pen out to you, and the sentence is: we need someone to be in charge. ${ageAt(PO_AGES,0)} ${signAt(0)}`,
    ()=>`מישהו צריך לחתום על משהו. המון של שלושים התאסף במסדרון, ואחד מהם מושיט עט, והמשפט הוא: צריך מישהו שיהיה אחראי. ${ageAt(PO_AGES,1)} ${signAt(1)}`],
 ch:[
  {l:['Take charge, and say so','לקחת אחריות, ולהגיד את זה'],s:['A signature, and a voice.','חתימה, וקול.'],check:{stat:'charisma',dc:9,bg:{politician:2}},
   win:[`You sign, and say it aloud, and the corridor breathes. By the end of the day you have a list, a chain of names, and the beginnings of a mandate that nobody voted on and everybody wants.`,`חותמים, ואומרים את זה בקול, והמסדרון נושם. עד סוף היום יש רשימה, שרשרת שמות, והתחלה של מנדט שאיש לא הצביע עליו וכולם רוצים.`,{order:4,humanity:1,morale:3,flag:'po_took'}],
   lose:[`You sign, and half the corridor cheers, and the other half looks at you like someone who has been waiting to be blamed.`,`חותמים, וחצי מהמסדרון מריע, והחצי השני מסתכל כמו על מי שמחכה שיאשימו אותו.`,{order:1,morale:-4,humanity:-1,flag:'po_took'}]},
  {l:['Call a vote first','לקרוא להצבעה קודם'],s:['Hands, counted out loud.','ידיים, נספרות בקול.'],check:{stat:'wits',dc:8},
   win:[`You stand on a chair and ask for hands. Twenty-two go up. You count them out loud, and the number matters more than the count.`,`עומדים על כיסא ומבקשים ידיים. עשרים ושתיים עולות. סופרים אותן בקול, והמספר חשוב יותר מהספירה.`,{order:3,humanity:4,morale:3,flag:'po_vote'}],
   lose:[`The vote splits, and then splits again. By midnight there are three leaders and no plan, and you are one of the three.`,`ההצבעה מתפצלת, ואז מתפצלת שוב. עד חצות יש שלושה מנהיגים ואין תוכנית, ואחד משלושת המנהיגים הוא מי שכאן.`,{morale:-4,order:-2,flag:'po_vote'}]}
 ]}));

chapter(Object.assign({},PO,{id:'po_2',n:2,at:.30,
 t:['The Ledger','הפנקס'],
 x:[()=>`${flag('po_took')?'Your aide, loyal for eleven years,':'A member of the committee, calm for eleven years,'} has been taking a share of the ration list and keeping it for friends. The ledger does not quite add up. Everyone who could see it has looked away. You are the one who has to decide whether to see it.`,
    ()=>`${flag('po_took')?'העוזר, נאמן אחד עשר שנים,':'חבר בוועדה, רגוע אחד עשר שנים,'} לוקח חלק מרשימת המנות ושומר אותו לחברים. הפנקס לא ממש מסתדר. כל מי שיכול היה לראות הסתכל הצידה. ההחלטה אם לראות נשארת בידיים אחדות.`],
 ch:[
  {l:['Expose it, in public','לחשוף את זה, בפומבי'],s:['Read the ledger aloud.','להקריא את הפנקס בקול.'],check:{stat:'charisma',dc:9},
   win:[`You read the ledger aloud at the evening meeting. It is horrible, and quiet, and afterward three people come to you in tears and one in anger. The rations are equal again by the end of the week.`,`מקריאים את הפנקס בקול בישיבת הערב. זה נורא, ושקט, ואחר כך שלושה באים בדמעות ואחד בכעס. עד סוף השבוע המנות שוב שוות.`,{order:3,humanity:6,morale:-2,flag:'po_exposed'}],
   lose:[`You read the ledger, and the room does not believe it, and the one you named leaves with half the room behind them.`,`מקריאים את הפנקס, והחדר לא מאמין, ומי שנקרא בשמו עוזב עם חצי מהחדר מאחוריו.`,{order:-3,morale:-6,flag:'po_exposed'}]},
  {l:['Quietly make a deal','לעשות עסקה בשקט'],s:['An hour in a back room.','שעה בחדר צדדי.'],check:{stat:'wits',dc:9},
   win:[`You take them aside, and it takes an hour, and at the end they hand you the key. The rations are equal again by the end of the week, and nobody ever finds out why.`,`לוקחים אותם הצידה, וזה לוקח שעה, ובסוף הם מוסרים את המפתח. עד סוף השבוע המנות שוב שוות, ואיש לא יודע למה.`,{order:2,humanity:-3,morale:2,flag:'po_deal'}],
   lose:[`You make a deal, and they take it, and a week later the ledger is worse. You have made a partner of exactly the wrong person.`,`עושים עסקה, והם מקבלים אותה, ושבוע אחר כך הפנקס גרוע יותר. נעשה שותף בדיוק מהאדם הלא נכון.`,{morale:-5,order:-2,humanity:-3,flag:'po_deal'}]}
 ]}));

chapter(Object.assign({},PO,{id:'po_3',n:3,at:.58,
 t:['The Broadcast','השידור'],
 x:[()=>`The radio transmitter still works, and you are the only one with the codes. Somewhere out there, thousands are listening for a voice. You have three minutes, a crackling microphone, and two versions of the truth: the one that is true, and the one they need. ${flag('po_exposed')?'You know what a true thing costs.':flag('po_deal')?'You know what a convenient thing costs.':'You know what a rumor costs.'}`,
    ()=>`משדר הרדיו עדיין עובד, ורק לך יש את הקודים. איפשהו בחוץ אלפים מקשיבים לקול. יש שלוש דקות, מיקרופון מרשרש, ושתי גרסאות של האמת: זו שנכונה, וזו שצריכים. ${flag('po_exposed')?'ידוע כמה עולה דבר אמיתי.':flag('po_deal')?'ידוע כמה עולה דבר נוח.':'ידוע כמה עולה שמועה.'}`],
 ch:[
  {l:['Tell them the truth','לספר להם את האמת'],s:['What is known, what is not, what you fear.','מה ידוע, מה לא, ממה מפחדים.'],check:{stat:'charisma',dc:9},
   win:[`You say what is known, what is not, and what you are afraid of. There is a silence on the line so long you think the transmitter has failed. Then a voice, small and clear, says: we heard you.`,`אומרים מה ידוע, מה לא, וממה מפחדים. יש שקט על הקו כל כך ארוך שחושבים שהמשדר נכשל. אז קול, קטן וצלול, אומר: שמענו.`,{humanity:6,order:3,morale:3,flag:'po_truth'}],
   lose:[`You tell the truth, and it lands badly. The line fills with anger and static, and by morning three districts have closed their gates.`,`אומרים את האמת, והיא נוחתת רע. הקו מתמלא כעס ורעש, ועד הבוקר שלושה מחוזות סגרו את השערים.`,{order:-3,morale:-5,humanity:3,flag:'po_truth'}]},
  {l:['Tell them what they need to hear','לספר להם מה שצריך לשמוע'],s:['It will be all right, in a voice that sounds like a promise.','הכול יהיה בסדר, בקול שנשמע כמו הבטחה.'],check:{stat:'wits',dc:9},
   win:[`You say it will be all right, in a voice that sounds like a promise. It is a good voice. It works for a week. Then a week is all it works for.`,`אומרים שיהיה בסדר, בקול שנשמע כמו הבטחה. זה קול טוב. זה עובד שבוע. ואז שבוע הוא כל מה שזה עובד.`,{order:4,morale:4,humanity:-4,flag:'po_lie'}],
   lose:[`You say it will be all right, and your voice cracks halfway through. Everyone hears it, and everyone understands, and the silence after is worse than the truth.`,`אומרים שיהיה בסדר, והקול נסדק באמצע. כולם שומעים, וכולם מבינים, והשקט אחר כך גרוע מהאמת.`,{morale:-5,order:-2,humanity:-2,flag:'po_lie'}]}
 ]}));

chapter(Object.assign({},PO,{id:'po_4',n:4,at:.80,
 t:['The Vote','ההצבעה'],
 x:[()=>`The settlement votes on you. Not on your policies or your plans, just you. ${flag('po_truth')?'They remember the broadcast.':flag('po_lie')?'They remember the broadcast, and they remember the week after.':'They remember what you did, and what you did not do.'} ${flag('po_exposed')?'The person you named is on the ballot, and so is a stranger.':flag('po_deal')?'The person you dealt with is on the ballot too, and smiling.':'You are on the ballot alone, which is either an honor or a warning.'} The ballot box is a biscuit tin.`,
    ()=>`היישוב מצביע על מי שהוביל. לא על מדיניות או תוכניות, רק עליך. ${flag('po_truth')?'הם זוכרים את השידור.':flag('po_lie')?'הם זוכרים את השידור, וזוכרים את השבוע שאחריו.':'הם זוכרים מה נעשה, ומה לא נעשה.'} ${flag('po_exposed')?'מי שנקרא בשמו על הפתק, וגם זר.':flag('po_deal')?'מי שנעשתה איתו עסקה על הפתק גם, ומחייך.':'לבד על הפתק, וזה או כבוד או אזהרה.'} קלפי הבחירות היא קופסת ביסקוויטים.`],
 ch:[
  {l:['Stand for a term','להתמודד לקדנציה'],s:['Accept the ballot, and what it brings.','לקבל את הקלפי ואת מה שהיא מביאה.'],check:{stat:'charisma',dc:10,bg:{politician:2},mod:()=>(flag('po_truth')?1:0)-(flag('po_lie')?1:0)},
   win:[`The tin is counted by candlelight. You win by eleven votes, and it does not feel like winning. It feels like being handed something heavy and told to carry it carefully.`,`הקופסה נספרת לאור נרות. מנצחים ביתרון של אחד עשר קולות, וזה לא מרגיש כמו ניצחון. זה מרגיש כמו קבלת משהו כבד והוראה לשאת אותו בזהירות.`,{order:6,humanity:3,morale:5,flag:['po_end_elected','base']}],
   lose:[`The tin is counted by candlelight. You lose by four. You shake the winner's hand, and the crowd sees it, and it may be the best thing you have done.`,`הקופסה נספרת לאור נרות. מפסידים בארבעה קולות. לוחצים את ידו של המנצח, וההמון רואה, ואולי זה הדבר הטוב ביותר שנעשה.`,{order:3,humanity:5,morale:-2,flag:'po_end_elected'}]},
  {l:['Step aside, and back someone else','לפנות מקום ולתמוך במישהו אחר'],s:['A name that is not yours.','שם שאינו שלך.'],check:{stat:'charisma',dc:9},
   win:[`You stand on the same chair, and say a name that is not yours. The name gets a cheer. You get a warm, strange freedom, and a job at the back of the room with a clipboard.`,`עומדים על אותו כיסא, ואומרים שם שאינו שלך. השם זוכה לתרועה. מקבלים חופש חם ומוזר, ותפקיד בחלק האחורי של החדר עם לוח כתיבה.`,{humanity:6,order:3,morale:4,flag:'po_end_aside'}],
   lose:[`You step aside, and the one you back is not up to it. It is a long spring, and you are the one they come to.`,`מפנים מקום, ומי שנתמך לא מתאים. זה אביב ארוך, ואל מי שפינה מקום באים.`,{morale:-4,order:-2,humanity:2,flag:'po_end_aside'}]}
 ]}));
