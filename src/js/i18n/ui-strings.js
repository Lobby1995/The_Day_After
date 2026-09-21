
/* ---------- language ---------- */
let LANG='en';
const NAMES_EN={m:['Daniel','Omar','Liam','Kenji','Mateus','Noah','Ethan','Tom','Arjun','Yossi','Marcus','Ravi','Theo','Sam'],
                f:['Maya','Sara','Chloe','Yuki','Camila','Emma','Noa','Zoe','Priya','Hannah','Leila','Grace','Iris','Tess']};
const pn=m=>LANG==='he'&&HE.people[m.name]?HE.people[m.name].n:m.name;
const pt=m=>LANG==='he'&&HE.people[m.name]?HE.people[m.name].t:m.trait;
const locName=id=>LANG==='he'?HE.loc[id].name:LOCS[id].name;
const locBrief=id=>LANG==='he'?HE.loc[id].brief:LOCS[id].brief;
const bgN=(id,sex)=>LANG==='he'?HE.bg[id][sex==='f'?'f':'m']:bgObj(id).name;
const bgPerk=id=>LANG==='he'?HE.bg[id].perk:bgObj(id).perk;
const CHIPL={en:{hp:'Health',inf:'Infection',morale:'Morale',humanity:'Humanity',food:'Food',water:'Water',meds:'Meds',ammo:'Ammo',outbreak:'Outbreak',order:'Order'},
             he:{hp:'בריאות',inf:'הידבקות',morale:'מורל',humanity:'אנושיות',food:'אוכל',water:'מים',meds:'תרופות',ammo:'תחמושת',outbreak:'מגפה',order:'סדר'}};
const LEGACY={
 en:{barricaded:`You dug in and waited instead of running.`,looter:`You took from empty homes and shops.`,helpedMara:`You fed a stranger called Mara.`,turnedAwayMara:`You turned Mara away.`,savedFriend:`You saved someone from a bite.`,guardContact:`A checkpoint garrison trusts you.`,militaryContact:`You have friends in uniform.`,borderAlly:`You held the line with the border patrol.`,openedGate:`You opened the fence for a refugee family.`,keptGate:`You kept the fence shut.`,rooftopCommunity:`You joined a rooftop community.`,rooftop:`You organized your building on the roof.`,raiderTruce:`You made peace with the road gangs.`,rumor:`You followed the rumor of a safe zone.`,verified:`You traced the signal and proved it real.`,car:`You found a working vehicle.`,sealed:`You sealed yourself in early.`,cabin:`You found a hidden cabin.`,countryside:`You made it to the countryside.`,waited:`You waited for the government. It didn't come.`,garden:`You grew your own food.`,cure:`You helped find a way to slow the outbreak.`,cureHelp:`You sent a researcher on her way with what she needed.`,settled:`You found a safe place and helped hold it.`,builder:`You helped rebuild.`,newborn:`You helped a new life begin.`},
 he:{barricaded:`התבצרת וחיכית במקום לברוח.`,looter:`לקחת מבתים וחנויות ריקים.`,helpedMara:`האכלת זרה בשם מארה.`,turnedAwayMara:`שלחת את מארה משם.`,savedFriend:`הצלת מישהו מנשיכה.`,guardContact:`חיל מצב במחסום סומך עליך.`,militaryContact:`יש לך חברים במדים.`,borderAlly:`החזקת את הקו עם משמר הגבול.`,openedGate:`פתחת את הגדר בפני משפחת פליטים.`,keptGate:`השארת את הגדר סגורה.`,rooftopCommunity:`הצטרפת לקהילת גג.`,rooftop:`ארגנת את הבניין על הגג.`,raiderTruce:`עשית שלום עם כנופיות הכביש.`,rumor:`הלכת אחרי השמועה על אזור מבטחים.`,verified:`איתרת את האות והוכחת שהוא אמיתי.`,car:`מצאת רכב שעובד.`,sealed:`התבצרת בממ״ד מוקדם.`,cabin:`מצאת בקתה נסתרת.`,countryside:`הגעת לכפר.`,waited:`חיכית לממשלה. היא לא הגיעה.`,garden:`גידלת אוכל בעצמך.`,cure:`עזרת למצוא דרך להאט את המגפה.`,cureHelp:`שלחת חוקרת בדרכה עם מה שהייתה צריכה.`,settled:`מצאת מקום בטוח ועזרת להחזיק אותו.`,builder:`עזרת לבנות מחדש.`,newborn:`עזרת לחיים חדשים להתחיל.`}
};
const UI={
en:{
 brand:'Days After',restart:'Restart',langLbl:'Language',
 lede:`A zombie survival game where every choice costs something. Pick a road, a country, a past and an age, then decide how to live through the end of the world.`,
 roadH:'Choose your road',
 roads:{5:['5 years','The shortest road','Survive the collapse and the first hard years. About 20 decisions.'],15:['15 years','The long road','You will age, lose people, and watch the world change. About 36 decisions.'],20:['20 years','The full road','A whole generation after the fall. About 48 decisions.']},
 cont:(y,n)=>`Continue: year ${y} as ${n}`,
 rules:[['Your choices change you.','Health, infection, morale, supplies, scars, and how much of your humanity is left.'],['Your choices change the world.','The outbreak spreads, order frays, and the people you help or ignore come back.'],['Your past matters.','Doctors heal better, soldiers hit harder, and every job opens doors nobody else can.'],['Two choices, one coin.','Every question has two answers. Pick one, and the coin decides how it goes.']],
 hWho:'Who are you?',pWho:'Name, sex and age. Age shapes your body, and on the long roads you will get older.',name:'Name',roll:'Roll a name',sex:'Sex',male:'Male',female:'Female',age:'Age',skin:'Skin tone',road:'Game road',
 yearsShort:n=>`${n} years`,
 hWhere:'Where in the world?',pWhere:'Every country starts in a different place. The worse it is, the fewer people are left to help.',random:'Random',unknown:'Unknown',pRandomLoc:`The game picks your country at random. You won't know how bad it is until you get there.`,outbreak:'Outbreak',order:'Order',
 hBg:'What did you do before?',pBg:'Your past sets your strengths, your starting gear, and the choices only you can make.',pRandomBg:'Let fate pick your past.',
 begin:'Begin',randAll:'Randomize all',maxHp:n=>`Maximum health ${n}.`,stockTxt:(f,w,m,a)=>`Starts with ${f} food, ${w} water, ${m} meds and ${a} ammo.`,stockUnknown:'Starting supplies depend on your country and your past.',bgRandom:'Background: random',
 sexWord:{m:'Male',f:'Female'},idLine:(sex,age)=>`${sex}, age ${age}.`,
 ageLbl:{young:['Young','Fast and sharp-eyed, short on experience.'],prime:['Prime','Balanced, with a little more muscle and know-how.'],veteran:['Veteran','Wise and well connected, but slower and stiffer.']},
 stg:{early:'Early outbreak',spreading:'Spreading',crisis:'Crisis',collapse:'Collapse',dead:'Dead world'},
 ord:{holding:'Holding',strained:'Strained',breaking:'Breaking',anarchy:'Anarchy'},
 hum:{beacon:'A beacon',decent:'Decent',hardened:'Hardened',ruthless:'Ruthless'},
 stats:{health:'Health',strength:'Strength',stamina:'Stamina',stealth:'Stealth',wits:'Wits',charisma:'Charisma'},
 sups:{food:'food',water:'water',meds:'meds',ammo:'ammo'},
 seasons:{autumn:'Autumn',winter:'Winter',spring:'Spring',summer:'Summer'},
 year:'Year',decision:(n,tt)=>`Decision ${n} of ${tt}`,cond:'Condition',tri:{green:'Minor',yellow:'Delayed',red:'Immediate'},
 hp:'Health',inf:'Infection',mor:'Morale',meds:'Use medicine',medsNote:(h,i)=>`Heals about ${h} health and cuts infection by about ${i}.`,medsUsed:(h,i)=>`Used a dose of medicine: health +${h}, infection -${i}.`,
 hWorld:'Situation Report',hFile:'Survivor File',hSector:'Sector',hStatus:'Status',roadTag:i=>`Road 0${i}`,yourHum:'Your humanity',hMarks:'Scars',noMarks:'None yet.',
 marks:{scarred:['Scarred','Strangers flinch. Charisma checks -1.'],limp:['Limp','Stamina and stealth checks -1.'],haunted:['Haunted','Morale slips a little every turn.'],trusted:['Trusted','Humanity 75 or more. Charisma checks +1.'],ruthless:['Ruthless','Humanity under 25. Strength +1, charisma -1.']},
 hGroup:'Squad',alone:`Alone. A squad eats more, but helps with almost everything.`,hJournal:'Field Journal',nothing:'Nothing yet.',
 head:(y,s)=>`Year ${y}, ${s}`,chose:'You chose:',check:(st,r,v,dc,ok)=>`${st} check: rolled ${r} + ${v} = ${r+v} against ${dc}. ${ok?'Success.':'Failure.'}`,
 joins:n=>`${n} joins you`,gone:n=>`${n} is gone`,markGain:m=>`New mark: ${m}`,statGain:(k,d)=>`${k} ${d>0?'+':'\u2212'}${Math.abs(d)} for good`,
 costs:(n,r)=>`Costs ${n} ${r}`,needsBg:l=>`Needs: ${l}`,lack:r=>`Not enough ${r}`,needAmmo:'Needs ammo',needGroup:'Needs a group',unavailable:'Unavailable',noRoll:'No roll',
 odds:{safe:'Safe bet',good:'Good odds',risky:'Risky',long:'Long shot'},
 parts:{stat:(k,v)=>`${k} ${v}`,bg:(b,v)=>`${b} +${v}`,sit:v=>`situation ${v>0?'+':'-'}${Math.abs(v)}`,noise:()=>'group noise -1',group:v=>`group +${v}`,limp:()=>'limp -1',scarred:()=>'scarred -1',trusted:()=>'trusted +1',ruthless:v=>`ruthless ${v>0?'+1':'-1'}`,morale:()=>'low morale -1',hurt:()=>'badly hurt -1',danger:v=>`outbreak raises difficulty by ${v}`},
 tipEnd:dc=>`Roll a d10 and beat ${dc}.`,
 next:(y,s)=>`Next: year ${y}, ${s}`,seeEnd:'See how it ended',
 notes:{perk:(n,res,k,lbl)=>`${n} helps: ${lbl} +${k}.`,base:()=>'The base gives you safe nights: health +2, morale +1.',rations:(n,g)=>`Rations: -${n} food, -${n} water${g?` (for ${g+1} people)`:''}.`,settled:()=>'The settlement shares its stores: +1 food, +1 water.',garden:()=>'The garden feeds you: +1 food.',hungry:()=>'You went hungry. Health -8, morale -4.',thirsty:()=>'You went without water. Health -12, morale -4.',fever:()=>'The fever burns. Health -5.',feverish:()=>'You feel feverish. Health -2.',recover:n=>`You recover a little. Health +${n}.`,despair:()=>'Despair grinds you down. Health -5.',slip:(o,r)=>`The world slips: ${o>0?`outbreak +${o}`:''}${o>0&&r>0?', ':''}${r>0?`order -${r}`:''}.`,birthday:a=>`You are ${a} now.`},
 endT:{death:'You died',turned:'You turned',good:'You built something',dark:'You survived, at a price',dead:'The last ones standing',def:'You made it'},
 e:{years:n=>`${n} years after the fall, you are still here.`,settled:'You live behind the walls of a settlement you helped hold together.',nomad:'You never found a wall to live behind, only a long series of roads.',cure:'The cure that began as a rumor in a lab is finally changing the numbers.',group:(names,n)=>`${names} ${n>1?'are':'is'} still with you.`,alone:'You are on your own, and you are used to it.',humHi:'People remember how you treated them. They ask your opinion before they decide anything.',humLo:'People remember what you did to get here. They keep their distance, and they keep watching.',humMid:'You did what you had to. Most days, you can live with it.',worldDead:'Beyond your corner of it, the world is still mostly gone.',worldMid:'The world is broken, but it is starting to remember how to work.',worldGood:'The lights are coming back on in places you never expected.',age:a=>`You are ${a} now.`,
  death:x=>`Your story ends here, at the end of "${x}". Somebody, someday, may find your journal and read what you tried.`,deathR:x=>`Your story ends here, taken by ${x}. Somebody, someday, may find your journal and read what you tried.`,turned:`The fever wins somewhere in the small hours. When you open your eyes it doesn't feel like waking. The last thing you feel is a hunger that isn't yours.`,
  causes:{starved:'starvation',thirst:'thirst',fever:'the fever',despair:'despair',night:'the night'}},
 facts:{years:'Years survived',dec:'Decisions made',age:'Age at the end',group:'Still with you',out:'Outbreak',ord:'Order',hum:'Humanity'},
 legacyH:'What you left behind',everyH:'Full Field Record',newSurvivor:'New survivor',retry:n=>`Try ${n} again`,
 rolling:'Rolling…',skip:'Skip',edgePos:'In your favor: ',edgeNeg:'Against you: ',andW:' and ',
 edge:{training:'your training',group:'your group',gear:'your gear',rep:'your reputation',situation:'the situation',outbreak:'the outbreak',marks:'old injuries',state:'your condition',noise:'the noise of the group',years:'the long road',past:'a choice you made earlier'},
 nothingChanges:'Nothing changes.',loyalty:'Loyalty',
 roles:{medic:['Medicine','Heals you +2 health every turn.'],cook:['Cooking','Stretches the food: sometimes +1 food.'],hunter:['Hunting','Sometimes brings back food.'],scout:['Scouting','Sometimes finds water. Cancels group noise when sneaking.'],tech:['Repairs','Sometimes scrounges ammo. Helps with clever solutions.'],leader:['Leadership','+1 morale every turn. Helps in talks.'],fighter:['Fighting','Helps in fights.'],driver:['Driving','Helps when running.'],kin:['Family','Lifts your morale, but needs protecting.']},
 flagChip:{base:'You claim a base',nomad:'You take to the road',leader:'You lead the group',raiderAlly:'You ride with the gang',raiderEnemy:'The gang wants you dead',settled:'You are inside the walls',garden:'A garden is growing',rifle:'You now carry a rifle',filter:'You now have a water filter',map:'You now have a map',cure:'The cure is spreading'},
 unflagChip:{base:'You lose your base',raiderAlly:'You leave the gang'},
 loyChip:(n,d,f)=>`${n} trusts you ${d>0?'more':'less'}`,loyAllChip:d=>`The group trusts you ${d>0?'more':'less'}`,
 restartH:'Start again?',restartP:'Your current run will be lost.',restartSame:'Same survivor, from the start',restartNew:'New survivor',cancel:'Cancel'
},
he:{
 brand:'ימים אחרי',restart:'התחלה מחדש',langLbl:'שפה',
 lede:`משחק הישרדות זומבים שבו כל בחירה עולה במשהו. בחירת מסלול, מדינה, עבר וגיל, ואז ההחלטה איך לחיות את סוף העולם.`,
 roadH:'בחירת מסלול',
 roads:{5:['5 שנים','המסלול הקצר ביותר','לשרוד את הקריסה ואת השנים הקשות הראשונות. כ-20 החלטות.'],15:['15 שנים','המסלול הארוך','מזדקנים, מאבדים אנשים ורואים את העולם משתנה. כ-36 החלטות.'],20:['20 שנים','המסלול המלא','דור שלם אחרי הנפילה. כ-48 החלטות.']},
 cont:(y,n)=>`להמשיך: שנה ${y}, ${n}`,
 rules:[['הבחירות משנות אותך.','בריאות, הידבקות, מורל, אספקה, צלקות וכמה מהאנושיות נשארה.'],['הבחירות משנות את העולם.','המגפה מתפשטת, הסדר מתפורר, ואנשים שעזרת להם או התעלמת מהם חוזרים.'],['העבר קובע.','רופאים מרפאים טוב יותר, חיילים מכים חזק יותר, ולכל מקצוע יש דלתות שאף אחד אחר לא פותח.'],['שתי בחירות, מטבע אחד.','לכל שאלה שתי תשובות. בוחרים אחת, והמטבע מחליט איך זה ילך.']],
 hWho:'פרטי הדמות',pWho:'שם, מין וגיל. הגיל משפיע על הגוף, ובמסלולים הארוכים מזדקנים.',name:'שם',roll:'שם אקראי',sex:'מין',male:'זכר',female:'נקבה',age:'גיל',skin:'גוון עור',road:'מסלול',
 yearsShort:n=>`${n} שנים`,
 hWhere:'איפה בעולם?',pWhere:'כל מדינה מתחילה במקום אחר. ככל שהמצב גרוע יותר, נשארו פחות אנשים שיעזרו.',random:'אקראי',unknown:'לא ידוע',pRandomLoc:'המשחק בוחר מדינה באקראי. עד ההגעה לא ידוע כמה המצב גרוע.',outbreak:'מגפה',order:'סדר',
 hBg:'מה עשית לפני כן?',pBg:'העבר קובע חוזקות, ציוד התחלתי ובחירות שרק לך יש.',pRandomBg:'לתת לגורל לבחור את העבר.',
 begin:'להתחיל',randAll:'הכול אקראי',maxHp:n=>`בריאות מרבית ${n}.`,stockTxt:(f,w,m,a)=>`מתחיל עם ${f} אוכל, ${w} מים, ${m} תרופות ו-${a} תחמושת.`,stockUnknown:'האספקה ההתחלתית תלויה במדינה ובעבר.',bgRandom:'עבר: אקראי',
 sexWord:{m:'זכר',f:'נקבה'},idLine:(sex,age)=>`${sex}, גיל ${age}.`,
 ageLbl:{young:['צעיר','מהיר וחד עין, חסר ניסיון.'],prime:['בשיא','מאוזן, עם קצת יותר כוח וידע.'],veteran:['ותיק','חכם ובעל קשרים, אבל איטי ונוקשה יותר.']},
 stg:{early:'מגפה בתחילתה',spreading:'מתפשטת',crisis:'משבר',collapse:'קריסה',dead:'עולם מת'},
 ord:{holding:'מחזיק',strained:'מתוח',breaking:'נשבר',anarchy:'אנרכיה'},
 hum:{beacon:'מגדלור',decent:'הגון',hardened:'קשוח',ruthless:'חסר רחמים'},
 stats:{health:'בריאות',strength:'כוח',stamina:'סיבולת',stealth:'התגנבות',wits:'פיקחות',charisma:'כריזמה'},
 sups:{food:'אוכל',water:'מים',meds:'תרופות',ammo:'תחמושת'},
 seasons:{autumn:'סתיו',winter:'חורף',spring:'אביב',summer:'קיץ'},
 year:'שנה',decision:(n,tt)=>`החלטה ${n} מתוך ${tt}`,cond:'מצב',tri:{green:'קל',yellow:'בינוני',red:'קשה'},
 hp:'בריאות',inf:'הידבקות',mor:'מורל',meds:'שימוש בתרופה',medsNote:(h,i)=>`מחזירה כ-${h} בריאות ומורידה כ-${i} הידבקות.`,medsUsed:(h,i)=>`ניתן מינון: בריאות +${h}, הידבקות -${i}.`,
 hWorld:'דוח מצב',hFile:'תיק ניצול',hSector:'אזור',hStatus:'מצב',roadTag:i=>`מסלול 0${i}`,yourHum:'האנושיות שלך',hMarks:'צלקות',noMarks:'אין עדיין.',
 marks:{scarred:['צלקת','זרים נרתעים. בדיקות כריזמה -1.'],limp:['צליעה','בדיקות סיבולת והתגנבות -1.'],haunted:['רדוף','המורל יורד מעט בכל תור.'],trusted:['אמין','אנושיות 75 ומעלה. בדיקות כריזמה +1.'],ruthless:['חסר רחמים','אנושיות מתחת ל-25. כוח +1, כריזמה -1.']},
 hGroup:'חוליה',alone:'לבד. חוליה אוכלת יותר, אבל עוזרת כמעט בכול.',hJournal:'יומן שטח',nothing:'עדיין כלום.',
 head:(y,s)=>`שנה ${y}, ${s}`,chose:'הבחירה:',check:(st,r,v,dc,ok)=>`בדיקת ${st}: הוטל ${r} + ${v} = ${r+v} מול ${dc}. ${ok?'הצלחה.':'כישלון.'}`,
 joins:(n,f)=>`${n} הצטרף${f?'ה':''} אליך`,gone:(n,f)=>`${n} איננ${f?'ה':'ו'} עוד`,markGain:m=>`סימן חדש: ${m}`,statGain:(k,d)=>`${k} ${d>0?'+':'\u2212'}${Math.abs(d)} לצמיתות`,
 costs:(n,r)=>`עולה ${n} ${r}`,needsBg:l=>`נדרש: ${l}`,lack:r=>`אין מספיק ${r}`,needAmmo:'נדרשת תחמושת',needGroup:'נדרשת קבוצה',unavailable:'לא זמין',noRoll:'ללא הטלה',
 odds:{safe:'בטוח',good:'סיכוי טוב',risky:'מסוכן',long:'הימור'},
 parts:{stat:(k,v)=>`${k} ${v}`,bg:(b,v)=>`${b} +${v}`,sit:v=>`נסיבות ${v>0?'+':'-'}${Math.abs(v)}`,noise:()=>'רעש קבוצה -1',group:v=>`קבוצה +${v}`,limp:()=>'צליעה -1',scarred:()=>'צלקת -1',trusted:()=>'אמין +1',ruthless:v=>`חסר רחמים ${v>0?'+1':'-1'}`,morale:()=>'מורל נמוך -1',hurt:()=>'פצוע קשה -1',danger:v=>`המגפה מעלה את הקושי ב-${v}`},
 tipEnd:dc=>`הטלת קובייה של 10 והתגברות על ${dc}.`,
 next:(y,s)=>`הלאה: שנה ${y}, ${s}`,seeEnd:'לראות איך זה נגמר',
 notes:{perk:(n,res,k,lbl)=>`בזכות ${n}: ${lbl} +${k}.`,base:()=>'הבסיס נותן לילות בטוחים: בריאות +2, מורל +1.',rations:(n,g)=>`מנות: -${n} אוכל, -${n} מים${g?` (עבור ${g+1} אנשים)`:''}.`,settled:()=>'היישוב חולק מלאי: +1 אוכל, +1 מים.',garden:()=>'הגינה מזינה: +1 אוכל.',hungry:()=>'היה רעב. בריאות -8, מורל -4.',thirsty:()=>'לא היו מים. בריאות -12, מורל -4.',fever:()=>'החום בוער. בריאות -5.',feverish:()=>'חום קל. בריאות -2.',recover:n=>`החלמה קלה. בריאות +${n}.`,despair:()=>'הייאוש שוחק. בריאות -5.',slip:(o,r)=>`העולם מחליק: ${o>0?`מגפה +${o}`:''}${o>0&&r>0?', ':''}${r>0?`סדר -${r}`:''}.`,birthday:a=>`מלאו ${a} שנים.`},
 endT:{death:'המסע נגמר',turned:'הפכת לאחד מהם',good:'בנית משהו',dark:'שרדת, במחיר',dead:'האחרונים שנשארו',def:'שרדת'},
 e:{years:n=>`${n} שנים אחרי הנפילה, עדיין כאן.`,settled:'חיים מאחורי חומות של יישוב שעזרת להחזיק.',nomad:'לא נמצאה חומה לגור מאחוריה, רק שורה ארוכה של דרכים.',cure:'התרופה שהתחילה כשמועה במעבדה סוף סוף משנה את המספרים.',group:(names,n)=>`${names} עדיין איתך.`,alone:'אין איתך אף אחד, וכבר התרגלת.',humHi:'אנשים זוכרים איך התייחסת אליהם. שואלים לדעתך לפני שמחליטים משהו.',humLo:'אנשים זוכרים מה עשית כדי להגיע לכאן. שומרים מרחק, וממשיכים להסתכל.',humMid:'עשית מה שהיה צריך. ברוב הימים אפשר לחיות עם זה.',worldDead:'מעבר לפינה שלך, רוב העולם עדיין איננו.',worldMid:'העולם שבור, אבל מתחיל להיזכר איך לעבוד.',worldGood:'האורות חוזרים להידלק במקומות שלא ציפית להם.',age:a=>`היום גיל ${a}.`,
  death:x=>`הסיפור נגמר כאן, בסוף ״${x}״. מישהו, יום אחד, אולי ימצא את היומן ויקרא מה ניסית.`,deathR:x=>`הסיפור נגמר כאן, בגלל ${x}. מישהו, יום אחד, אולי ימצא את היומן ויקרא מה ניסית.`,turned:`החום מנצח באחת השעות הקטנות. כשהעיניים נפתחות זה לא מרגיש כמו התעוררות. הדבר האחרון שנשאר הוא רעב שהוא לא שלך.`,
  causes:{starved:'רעב',thirst:'צמא',fever:'החום',despair:'ייאוש',night:'הלילה'}},
 facts:{years:'שנות הישרדות',dec:'החלטות שהתקבלו',age:'גיל בסוף',group:'עדיין איתך',out:'מגפה',ord:'סדר',hum:'אנושיות'},
 legacyH:'מה שהשארת מאחור',everyH:'רישום שטח מלא',newSurvivor:'ניצול חדש',retry:n=>`לנסות שוב עם ${n}`,
 rolling:'מגלגלים...',skip:'לדלג',edgePos:'לטובתך: ',edgeNeg:'נגדך: ',andW:' ו',
 edge:{training:'ההכשרה שלך',group:'הקבוצה',gear:'הציוד',rep:'המוניטין',situation:'המצב',outbreak:'המגפה',marks:'פציעות ישנות',state:'המצב שלך',noise:'רעש הקבוצה',years:'הדרך הארוכה',past:'בחירה קודמת'},
 nothingChanges:'שום דבר לא משתנה.',loyalty:'נאמנות',
 roles:{medic:['רפואה','מרפא אותך +2 בריאות בכל תור.'],cook:['בישול','מותח את האוכל: לפעמים +1 אוכל.'],hunter:['ציד','לפעמים מביא אוכל.'],scout:['סיור','לפעמים מוצא מים. מבטל את רעש הקבוצה בהתגנבות.'],tech:['תיקונים','לפעמים מוצא תחמושת. עוזר בפתרונות מתוחכמים.'],leader:['מנהיגות','+1 מורל בכל תור. עוזר בשיחות.'],fighter:['לחימה','עוזר בקרבות.'],driver:['נהיגה','עוזר בבריחה.'],kin:['משפחה','מעלה את המורל, אבל צריך הגנה.']},
 flagChip:{base:'תפסת בסיס',nomad:'יצאת לדרך',leader:'לקחת הובלה',raiderAlly:'הצטרפת לכנופיה',raiderEnemy:'הכנופיה רוצה בנפילתך',settled:'נכנסת מאחורי החומות',garden:'גינה גדלה',rifle:'עכשיו יש רובה',filter:'עכשיו יש מסנן מים',map:'עכשיו יש מפה',cure:'התרופה מתפשטת'},
 unflagChip:{base:'איבדת את הבסיס',raiderAlly:'עזבת את הכנופיה'},
 loyChip:(n,d,f)=>`${n} ${f?'סומכת':'סומך'} עליך ${d>0?'יותר':'פחות'}`,loyAllChip:d=>`הקבוצה סומכת עליך ${d>0?'יותר':'פחות'}`,
 restartH:'להתחיל מחדש?',restartP:'ההתקדמות במשחק הנוכחי תאבד.',restartSame:'אותה דמות, מההתחלה',restartNew:'דמות חדשה',cancel:'ביטול'
}};
const t=(k,...a)=>{let v=UI[LANG][k];if(v===undefined)v=UI.en[k];return typeof v==='function'?v(...a):v;};
const tt=(g,k)=>{const d=UI[LANG][g]||UI.en[g];return d[k]!==undefined?d[k]:UI.en[g][k];};
const seasonN=s=>tt('seasons',s);
const statN=k=>tt('stats',k);
const supN=k=>tt('sups',k);
const randName=sex=>pick((LANG==='he'?HE.names:NAMES_EN)[sex]);
const timeText=()=>{const x=timeOf(G.w.day);return t('head',x.year,seasonN(x.season));};

/* localized event content */
const heOf=ev=>LANG==='he'?HEV[ev.id]:null;
function tTitle(ev,ctx){const h=heOf(ev);if(h&&h.t!=null)return typeof h.t==='function'?h.t(G,ctx):h.t;return evTitle(ev,ctx);}
function tText(ev,ctx){const h=heOf(ev);if(h&&h.x!=null)return typeof h.x==='function'?h.x(G,ctx):h.x;return evText(ev.text,ctx);}
function tChoice(ev,ci){const h=heOf(ev),c=h&&h.c&&h.c[ci],ch=ev.choices[ci];return{label:c?c[0]:ch.label,sub:c?c[1]:ch.sub};}
function tResult(ev,ci,br,ctx){
  const h=heOf(ev),c=h&&h.c&&h.c[ci],ch=ev.choices[ci];
  let v=null;if(c)v=(br==='lose')?c[3]:c[2];
  if(v==null)v=ch[br].text;
  return evText(v,ctx);
}

const Lx=v=>(v&&typeof v==='object'&&!Array.isArray(v)&&'en' in v)?v[LANG]:v;
function vTitle(){const d=G.cur.dyn,ev=EVMAP[G.cur.id];const base=d?Lx(d.title):tTitle(ev,G.cur.ctx);return ev&&ev.pro?`${t('prologue',ev.pro,3)} \u00b7 ${base}`:base;}
function vText(){const d=G.cur.dyn;return d?Lx(d.text):tText(EVMAP[G.cur.id],G.cur.ctx);}
function vChoice(ci){const d=G.cur.dyn;if(d){const c=d.choices[ci];return{label:Lx(c.label),sub:Lx(c.sub)};}return tChoice(EVMAP[G.cur.id],ci);}
function vResult(res){const d=G.cur.dyn;if(d)return Lx(d.choices[res.ci][res.br].text);return tResult(EVMAP[G.cur.id],res.ci,res.br,G.cur.ctx);}
function ctxName(){const c=G.cur.ctx||{};return c.m||(c.member&&c.member.name)||'';}

/* creation: one page per step */
Object.assign(UI.en,{sWho:'Who you are',sWhere:'Where',sPast:'Your past',sReady:'Ready',next:'Next',back:'Back',change:'Change',
  stepOf:(a,b)=>`Step ${a} of ${b}`,prologue:(n,m)=>`Prologue ${n}/${m}`,sReadyH:'Your survivor',sReadyP:'This is who starts the end of the world. You can still change anything.'});
Object.assign(UI.he,{sWho:'הדמות',sWhere:'המקום',sPast:'העבר',sReady:'מוכנים',next:'הבא',back:'חזרה',change:'שינוי',
  stepOf:(a,b)=>`שלב ${a} מתוך ${b}`,prologue:(n,m)=>`פרולוג ${n}/${m}`,sReadyH:'הניצול',sReadyP:'זה מי שמתחיל את סוף העולם. אפשר עדיין לשנות הכול.'});

/* dilemmas: choices with a price and no dice */
Object.assign(UI.en,{dilPill:'A choice, not a chance'});
Object.assign(UI.he,{dilPill:'בחירה, לא הימור'});

