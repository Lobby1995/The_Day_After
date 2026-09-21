/* openers: day 1, one per country */
add({id:'open_usa',open:true,loc:'usa',title:`The City Is Burning`,
 text:`The power has just gone out. The sirens stopped an hour ago, which is worse. From the window you watch a National Guard truck sit abandoned in the intersection, doors open, engine still running. Something moves in the shadow of its cab. Out in the hallway, someone is pounding on your neighbor's door, and nobody is answering.`,
 choices:[
  {label:`Slip out the back and make for the suburbs`,sub:`Move before the streets fill up.`,check:{stat:'stamina',dc:10,danger:true},
   win:{text:`You keep low and keep moving, ducking through service alleys. By dusk the skyline is behind you and the streets are quieter. Quieter isn't safe. But it's something.`,morale:5,water:1},
   lose:{text:`A crowd of them spills around a corner. You get away, but not cleanly, and not without something catching your arm.`,hp:-15,inf:15,morale:-8}},
  {label:`Barricade the apartment and take stock`,sub:`Safe for now. Not forever.`,
   out:{text:`You drag the couch against the door and count what you have. The pounding next door stops. You decide not to think about why.`,morale:-4,flag:'barricaded'}},
  {label:`Raid the abandoned units on your floor`,sub:`Take what the dead won't need.`,check:{stat:'stealth',dc:9},
   win:{text:`Three doors, three sets of kitchen cupboards. You take everything that isn't nailed down and try not to read the family photos.`,food:3,water:2,humanity:-8,flag:'looter'},
   lose:{text:`Behind the third door, something that used to be a person is still very much at home.`,hp:-12,inf:10,morale:-6}}
 ]});
add({id:'open_brazil',open:true,loc:'brazil',title:`Blackout in the Megacity`,
 text:`The power went out an hour ago and has not come back. Elevators stuck, traffic lights dead, millions of people in the dark. Word spreads by phone that the sick are attacking people in hospitals. Down in the street, the noise is building, and your building's stairwell is filling with the sound of people deciding what to do.`,
 choices:[
  {label:`Get the building's residents organized on the roof`,sub:`A group on high ground beats a crowd on the street.`,check:{stat:'charisma',dc:9},
   win:{text:`You stand on a water tank and say what needs saying. By midnight the roof has lookouts, a rationing list, and a superintendent named Tiago who knows every stairwell in the block.`,humanity:6,order:2,join:{name:'Tiago',trait:`Building superintendent, knows every stairwell`},flag:'rooftop'},
   lose:{text:`Everyone has a better idea, and all of them are loud. The meeting falls apart before it starts.`,morale:-6}},
  {label:`Push through the streets to reach your family`,sub:`The far side of the city is a long way.`,check:{stat:'stamina',dc:11,danger:true},
   win:{text:`You run, hide, run again, and arrive at dawn to a door that opens on your sister's tired, astonished face.`,morale:10,food:1,join:{name:'Lucia',trait:`Your sister`}},
   lose:{text:`You make it halfway, then the dark corners start to move. You crawl back to shelter with a torn jacket and a burning shoulder.`,hp:-20,inf:20,morale:-10}},
  {label:`Ration what you have and hold out at home`,sub:`Let the panic burn itself out.`,
   out:{text:`You lock the door and line up cans on the kitchen counter. Outside the noise crests and, for a few hours, recedes.`,morale:-3,flag:'barricaded'}}
 ]});
add({id:'open_uk',open:true,loc:'uk',title:`No More Trains`,
 text:`Every train out of the city has been cancelled. The news reader on the television will not look at the camera. The pubs are still open, which is either reassuring or absurd. Cordons are going up around London, and out in the rain, an Army lorry idles at the end of your street.`,
 choices:[
  {label:`Head for family in the countryside`,sub:`It's a long walk, and a longer one if you meet company.`,check:{stat:'stamina',dc:9},
   win:{text:`Two days of hedgerows and back roads. By the end of it you have wet boots, a blister the size of a coin, and a distant relative's farmhouse chimney in sight.`,food:2,water:2,morale:8,flag:'countryside'},
   lose:{text:`Somewhere between two villages you make a wrong turn. You lose a day, a water bottle, and a piece of your arm to something that was in the ditch.`,hp:-8,inf:10,water:-1,morale:-5}},
  {label:`Stay put and wait for the government`,sub:`There will be an announcement. There is always an announcement.`,
   out:{text:`You sit through a very British silence. When the cordons finally reach your street, they are facing outward, and the soldiers are not looking at you.`,morale:-5,outbreak:4,flag:'waited'}},
  {label:`Loot the corner shop while the owner is away`,sub:`Nobody's coming back to lock up.`,check:{stat:'stealth',dc:8},
   win:{text:`The shutters are half down, and the till has already been emptied. The tins of soup and boxes of tea are still on the shelves, for now.`,food:3,water:2,humanity:-6,flag:'looter'},
   lose:{text:`The shop isn't empty. The owner is behind the counter, and he is not the man he was.`,hp:-6,inf:8,morale:-4}}
 ]});
add({id:'open_japan',open:true,loc:'japan',title:`Last Train From Shinjuku`,
 text:`The station is packed, and eerily orderly. Announcements repeat in a calm voice asking passengers to remain patient. Further down the platform, people are stepping away from something in a slow, polite wave, and the wave is coming closer. The trains have stopped. The lights, for now, are still on.`,
 choices:[
  {label:`Walk home through the city`,sub:`Miles of neon and empty streets.`,check:{stat:'stamina',dc:9,danger:true},
   win:{text:`You walk for six hours through streets that are quiet, and cold, and lit like a movie set. You reach your door with a sore back and a full set of limbs.`,food:1,morale:3,flag:'walkedHome'},
   lose:{text:`In a narrow alley off the main road you meet something that doesn't move like a person. You make it home, but not before it takes a piece of you.`,hp:-10,inf:8}},
  {label:`Lock yourself in a convenience store`,sub:`The 24-hour kind. It has everything, and a steel shutter.`,check:{stat:'stealth',dc:8},
   win:{text:`The shutter clangs down behind you. The shelves are stocked, the fridges are humming, and the door is locked from the inside.`,food:3,water:3,meds:1,flag:'barricaded'},
   lose:{text:`Someone already locked themselves in. They are not the first person to have had the idea, and not the only thing in the store.`,hp:-12,inf:12,morale:-5}},
  {label:`Help people stay calm and reach the evacuation center`,sub:`Order is the only thing holding.`,check:{stat:'charisma',dc:9},
   win:{text:`You take a stranger's elbow, then another. A line forms. It moves. By the end of the night you have walked two hundred people to the school gym, and one man who won't stop thanking you.`,humanity:10,order:4,join:{name:'Haruto',trait:`Salaryman and marathon runner`}},
   lose:{text:`The line breaks into a stampede on the stairs. You are swept down the steps with everyone else.`,hp:-8,morale:-6,order:-3}}
 ]});
add({id:'open_canada',open:true,loc:'canada',title:`The Border Holds`,
 text:`On the news, the United States has come apart at the seams, and the border patrol has sealed every crossing. Convoys, spike strips, floodlights. Refugees are gathering at the line. Your town is quiet, but everyone is watching the south, and everyone is wondering how long a fence can hold.`,
 choices:[
  {label:`Volunteer with the border patrol reserve`,sub:`Hold the line with the people who are holding it.`,check:{stat:'strength',dc:8},
   win:{text:`They hand you a vest, a radio, and a stretch of fence. It's boring, and frightening, and it feels like the most useful thing you've done in years.`,order:6,outbreak:-3,humanity:3,flag:'borderAlly'},
   lose:{text:`A refugee breaks the line, and he's already gone. He takes a piece of your forearm with him before the guards drop him.`,hp:-10,inf:8,morale:-5}},
  {label:`Stock up and head north to a cabin`,sub:`Get away from the fence, and from everything else.`,check:{stat:'wits',dc:8},
   win:{text:`You buy what the shops still sell, pack the truck, and go. The cabin is cold, and hidden, and yours.`,food:3,water:3,morale:5,flag:'cabin'},
   lose:{text:`An early snowstorm on the highway. You dig out, but it costs you a night, some water, and some patience.`,hp:-8,water:-1,morale:-5}},
  {label:`Sneak south to help the refugees at the fence`,sub:`It's the right thing to do, and it's dangerous.`,check:{stat:'charisma',dc:10,danger:true},
   win:{text:`You bring water, blankets, and a medical kit. You spend the night among strangers who are hungry, afraid, and unfailingly polite. One of them, Amira, was a nurse before all this, and she asks if she can come with you.`,humanity:12,outbreak:3,morale:5,join:{name:'Amira',trait:`Refugee, former nurse`}},
   lose:{text:`The crowd surges. Somebody grabs you, somebody screams, and you come away with a bruise and a bite that stings more than it should.`,hp:-15,inf:20,outbreak:5,humanity:5}}
 ]});
add({id:'open_israel',open:true,loc:'israel',title:`Patient Zero Lands`,
 text:`A passenger on a flight from the United States collapsed in the arrivals hall and bit two paramedics before the airport was locked down. Your phone buzzes with alerts. The neighborhood chat has exploded. Somewhere in the country, someone is infected. Nobody knows who.`,
 choices:[
  {label:`Seal yourself in the safe room and gather supplies`,sub:`Reinforced concrete, a steel door, a water tank.`,
   out:{text:`Reinforced concrete and a steel door were built for other threats. They will do. You haul in water, tins, and every battery in the house, and wait to see what the morning brings.`,food:1,water:1,morale:5,flag:'sealed'}},
  {label:`Head for the nearest base to volunteer`,sub:`Someone is going to need extra hands.`,check:{stat:'strength',dc:9},
   win:{text:`The gate guard looks tired and grateful. By nightfall you have a rifle, a borrowed helmet, and a place on a roster.`,order:4,morale:5,ammo:1,flag:'militaryContact'},
   lose:{text:`The road to the base is jammed with panicking cars. Someone in a car window is not panicking, and reaches for you.`,hp:-10,inf:10}},
  {label:`Alert the building and organize the neighbors`,sub:`Everyone should know what's coming.`,check:{stat:'charisma',dc:8},
   win:{text:`You knock on every door. Most people listen. One of them, Yael, served as a combat medic, and she quietly starts sorting a first aid kit.`,humanity:8,order:3,join:{name:'Yael',trait:`Neighbor, former combat medic`}},
   lose:{text:`Half the building thinks you are overreacting, and the other half is already panicking. You spend the night arguing on the stairs.`,morale:-5,order:-2}}
 ]});
add({id:'open_australia',open:true,loc:'australia',title:`Odd Reports From Sydney`,
 text:`The news calls it an unusual respiratory illness. Hospitals in Sydney have shut their doors, and the internet is full of videos nobody can quite explain. Here, life goes on. The beach is open, the shops are open. But the supermarket shelves are starting to empty, and a cold feeling says this is the calm before something.`,
 choices:[
  {label:`Stockpile before the panic hits`,sub:`Be there before everyone else.`,check:{stat:'wits',dc:7},
   win:{text:`You make a list, you make a plan, and you do it in one efficient sweep. The trolley is heavy. You don't make eye contact with anyone else's empty one.`,food:4,water:3,morale:3,order:-2},
   lose:{text:`A scrum at the tinned goods. Elbows, shouting, a woman crying over a bag of rice. You leave with less than you came for and a bruised rib.`,hp:-5,food:1,water:1,order:-3}},
  {label:`Warn your neighbors and organize the street`,sub:`People listen when you're calm.`,check:{stat:'charisma',dc:8},
   win:{text:`You knock on doors and share what you know. Most of your neighbors take it seriously. Ruth, a retired paramedic from down the road, quietly offers to help.`,humanity:8,morale:5,order:3,outbreak:-2,join:{name:'Ruth',trait:`Retired paramedic`}},
   lose:{text:`Half your neighbors laugh it off. The other half look at you like you're the problem.`,morale:-5,humanity:2}},
  {label:`Drive inland toward the outback`,sub:`Distance is the only vaccine.`,check:{stat:'wits',dc:8},
   win:{text:`Red dirt, long roads, and a full tank. The horizon is empty in every direction, and it's the most reassuring thing you've ever seen.`,food:1,water:2,morale:5,flag:'inland'},
   lose:{text:`The car overheats a long way from anywhere. It takes a day and most of your water to get it moving again.`,hp:-5,water:-2}}
 ]});

/* location arcs: days 3+, one per country */
const arc=(loc,id,title,text,choices)=>add({id,title,text,loc,arc:true,once:true,cond:()=>G.p.loc===loc&&G.w.day>=T(3),w:30,choices});
arc('usa','arc_usa',`The Overpass`,
 `A National Guard checkpoint still holds an overpass ahead: sandbags, floodlights, a hand-painted sign reading INFECTED WILL BE SHOT. Behind it, a generator hums. Behind you, the dead are drifting closer.`,
 [
  {label:`Approach with your hands up and beg for entry`,sub:`They're scared. Scared people can be reasoned with.`,check:{stat:'charisma',dc:11,bg:{politician:2}},
   win:{text:`A sergeant looks you up and down, glances at what's behind you, and waves you in. It costs you a name, a story, and an oath to stay out of the way.`,food:3,water:3,meds:1,morale:10,order:3,flag:'guardContact'},
   lose:{text:`A warning shot ricochets off the road. You retreat, hands still up, and hear the sergeant swear.`,hp:-10,morale:-8}},
  {label:`Circle round through the storm drains`,sub:`Dark, wet, and out of sight.`,check:{stat:'stealth',dc:9,danger:true},
   win:{text:`You come up on the far side of the overpass, damp and shaking, a long way from anyone. Nobody saw you go.`,water:1,morale:2},
   lose:{text:`The drain isn't empty. Something in the dark has been waiting for company.`,hp:-15,inf:15}},
  {label:`Speak their language`,sub:`Give your old unit and rank.`,tag:['soldier'],
   out:{text:`You give your unit, your rank, and the name of a sergeant major you both know. The rifle drops. They wave you through and give you rations and a box of rounds.`,food:3,water:3,ammo:2,order:2,flag:'guardContact'}}
 ]);
arc('brazil','arc_brazil',`The Rooftop Radio`,
 `From rooftop to rooftop, someone has strung a line of speakers playing a pirate news station. Around you, neighbors are trading what they have. Down below, the streets teem with the infected. Up here, there's a fragile community that needs someone to make decisions.`,
 [
  {label:`Join the rooftop community`,sub:`Stronger together, until it isn't.`,
   out:{text:`You hand over your name and what you can spare. Somebody gives you a plate of rice and beans. Dona Marta, who cooks for everyone, pats your arm.`,food:2,water:2,morale:8,humanity:4,order:3,join:{name:'Dona Marta',trait:`Cooks for everyone`},flag:'rooftopCommunity'}},
  {label:`Trade for antibiotics and ammo`,sub:`Everyone up here wants something.`,check:{stat:'charisma',dc:9,bg:{politician:2}},
   win:{text:`You haggle, you smile, you give something up. When it's done you have a small bag of pills and a small box of bullets.`,meds:2,ammo:2},
   lose:{text:`You are outmaneuvered by a nine-year-old with a calculator. It's humbling.`,food:-2,morale:-5}},
  {label:`Scout the streets for the pirate broadcaster`,sub:`Someone up here knows something.`,check:{stat:'stealth',dc:11,danger:true,bg:{journalist:2,student:1}},
   win:{text:`You follow the cable to a locked stairwell, a battery bank, and a shortwave radio with a hand-lettered sign: TAKE IT, IF YOU CAN CARRY IT. You can.`,order:2,morale:5,flag:'radio'},
   lose:{text:`Halfway down the fourth stairwell, something is waiting in the dark that doesn't want to be scouted.`,hp:-15,inf:12}}
 ]);
arc('uk','arc_uk',`The Standstill`,
 `The motorway is a car park that runs for miles. Doors hang open. A police helicopter passes overhead without stopping. On the hard shoulder, a woman in a hi-vis vest waves at you and asks if you have a car.`,
 [
  {label:`Search the abandoned cars for supplies`,sub:`Miles of glove compartments.`,check:{stat:'wits',dc:9,danger:true},
   win:{text:`Sandwiches, water, a first aid kit, a phone charger. People packed for a long trip, and never took it.`,food:3,water:2,meds:1},
   lose:{text:`In one boot, something knocks. You should have listened. It bites before you finish wondering.`,hp:-8,inf:8}},
  {label:`Follow the hard shoulder to open countryside`,sub:`Away from the cars, away from the crowds.`,check:{stat:'stamina',dc:9},
   win:{text:`By the second day the cars thin out. The fields on either side are startlingly, ordinarily green.`,morale:5,water:-1,flag:'countryside'},
   lose:{text:`The hard shoulder isn't as empty as it looks, and neither are the cars.`,hp:-10,water:-1}},
  {label:`Help the woman. She has a child in the car`,sub:`She has a van, and a plan, and she's terrified.`,
   out:{text:`Her name is Nora. She hasn't slept, hasn't eaten, and has a working van with half a tank. She cries, laughs, and does both at once when you agree to help.`,humanity:8,food:-1,morale:5,join:{name:'Nora',trait:`Has a working van`},flag:'car'}}
 ]);
arc('japan','arc_japan',`The Queue`,
 `The convenience store on your street is still open, and there is a queue. A polite, silent queue, stretching down the block. Everyone is spaced exactly one arm's length apart, watching the one person at the front of the line who is not queueing properly.`,
 [
  {label:`Stand in line and wait your turn`,sub:`Some things are worth being polite about.`,
   out:{text:`You wait forty minutes. When you reach the counter, the clerk hands you two bags and bows. Behind you, someone's stopped queueing properly too.`,food:2,water:2,order:2,morale:-3}},
  {label:`Slip past the queue and raid the storeroom`,sub:`They'll never know. Probably.`,check:{stat:'stealth',dc:9},
   win:{text:`The back door is unlocked. You take what you need, and a little more, and slip out through the alley while the queue shuffles politely on.`,food:4,water:3,humanity:-6,order:-3,flag:'looter'},
   lose:{text:`The storeroom is full of the very thing the queue is watching. It turns around.`,hp:-10,inf:8,morale:-5}},
  {label:`Calm the line and keep it moving`,sub:`A bit of steady leadership.`,tag:['teacher','politician'],check:{stat:'charisma',dc:8,bg:{teacher:2,politician:2}},
   win:{text:`You speak calmly and clearly. Somebody translates. Somebody else steps up to help. The clerk, Aiko, who has the keys to the storeroom, looks at you with real relief.`,order:6,humanity:6,join:{name:'Aiko',trait:`Store clerk with the keys`}},
   lose:{text:`You speak. Nobody listens. The mood in the queue changes anyway.`,morale:-5}}
 ]);
arc('canada','arc_canada',`Refugees at the Fence`,
 `A crowd of refugees presses against the border fence a few miles up the road. Some of them are visibly sick. The guards have orders: nobody crosses. One guard catches your eye and lowers his voice. He can look away for ten minutes, if you want to help someone through.`,
 [
  {label:`Let a family through the fence`,sub:`Ten minutes. No questions.`,check:{stat:'stealth',dc:10},
   win:{text:`You cut the wire, wave a boy through, then his sister, then no one else. You don't ask their names. They give you one anyway. Sami is fifteen, and he doesn't say anything about his parents.`,humanity:12,order:-2,outbreak:4,join:{name:'Sami',trait:`Teenage refugee`},flag:'openedGate'},
   lose:{text:`A spotlight swings across the fence. The guard shouts. You run, empty-handed.`,hp:-8,order:-3,humanity:3,morale:-5}},
  {label:`Report the crowd and keep your post`,sub:`Rules are rules.`,
   out:{text:`You call it in. Trucks arrive. When you look again, the crowd has thinned, and you don't ask where it went.`,order:4,outbreak:-2,humanity:-8,morale:-8,flag:'keptGate'}},
  {label:`Hand out water and blankets`,sub:`It's not much, but it's something.`,cost:{water:2},
   out:{text:`You pass water through the wire. Hands, grateful and dirty, reach for it. Nobody says thank you. Everyone means it.`,humanity:8,morale:5,order:1}}
 ]);
arc('israel','arc_israel',`The Sweep`,
 `Word comes down the street: the passengers from that flight were released before the lockdown. Somewhere in the country, a dozen infected people are moving through ordinary streets. Sirens don't sound, because sirens are for other things, and the army is asking for volunteers to sweep neighborhoods.`,
 [
  {label:`Volunteer for a neighborhood sweep`,sub:`Someone has to check the stairwells.`,check:{stat:'strength',dc:10,danger:true,bg:{soldier:2}},
   win:{text:`Stairwell by stairwell, door by door. It takes all night. In the morning, three streets are safer than they were, and you can barely lift your arms.`,order:6,outbreak:-6,humanity:5,ammo:1,flag:'militaryContact'},
   lose:{text:`Behind the fourth door, the resident was not on the roster. Neither was what he did to you.`,hp:-15,inf:15}},
  {label:`Stay in the safe room and follow the updates`,sub:`You are not a soldier. Probably.`,
   out:{text:`You hear it on the radio, in fragments. Somebody, somewhere, is doing it without you. It is a long night, and nobody comes to your door.`,morale:3,outbreak:3,order:-2,food:-1}},
  {label:`Report for reserve duty`,sub:`Your unit needs you.`,tag:['soldier'],
   out:{text:`Your unit is short on people who know what they're doing. You get a rifle, a roster, and a target list. It isn't clean, and it isn't easy, but it works.`,ammo:3,order:6,outbreak:-6,humanity:3,hp:-5,flag:'militaryContact'}}
 ]);
arc('australia','arc_australia',`The Supermarket`,
 `The reports are no longer calling it unusual. At the supermarket, a fight breaks out over the last crates of water, and a man near the automatic doors is coughing something dark into his sleeve. The police are late.`,
 [
  {label:`Grab supplies and go while they fight`,sub:`Nobody's watching the shelves.`,check:{stat:'stealth',dc:8},
   win:{text:`You take what you can carry and walk out the wrong way through the loading dock. Behind you, the shouting gets worse.`,food:3,water:3,humanity:-4,order:-3},
   lose:{text:`The coughing man turns as you pass. He's faster than he should be.`,hp:-10,inf:10}},
  {label:`Step in and calm the crowd`,sub:`Someone has to.`,check:{stat:'charisma',dc:10},
   win:{text:`You raise your voice, then you lower it. The fight breaks up. Somebody takes the coughing man out the back and closes the door.`,order:5,humanity:8,outbreak:-3},
   lose:{text:`You get an elbow in the face for your trouble.`,hp:-12,order:-3}},
  {label:`Assess the coughing man`,sub:`You know what you're looking at.`,tag:['doctor'],
   out:{text:`One look, and you know. You get the crowd back, get the staff to lock the door, and call it in. It won't save everyone, but it will save some.`,order:5,outbreak:-5,humanity:6}}
 ]);

/* generic events */
add({id:'walker',wild:true,once:true,title:`One in the Alley`,cond:()=>G.w.outbreak>=12,w:12,
 text:`A single infected shambles between two dumpsters, head lolling. It hasn't noticed you yet. It stands exactly where you need to go.`,
 choices:[
  {label:`Fight it hand to hand`,sub:`Quick and quiet, if you're strong enough.`,check:{stat:'strength',dc:8,danger:true,bg:{soldier:2,firefighter:1}},
   win:{text:`You put it down and stand over it, shaking. It was somebody's father once. You take a moment. Then you keep moving.`,morale:-2,stat:{strength:1}},
   lose:{text:`It gets a hand on you. Teeth catch your sleeve, then something worse. You kill it, but it takes a while, and you know what the sting in your forearm means.`,hp:-15,inf:25,mark:'scarred'}},
  {label:`Sneak past it`,sub:`Let it be someone else's problem.`,check:{stat:'stealth',dc:8,danger:true},
   win:{text:`You slide past with your back to the wall, breathing through your teeth. It never turns.`,morale:2},
   lose:{text:`A bottle rolls under your foot. It turns, and the chase is short and ugly.`,hp:-8,inf:12}},
  {label:`Shoot it`,sub:`Loud. Very loud.`,cost:{ammo:1},
   out:{text:`One clean shot. The echo rolls down the street for a long time, and somewhere far off, something answers.`,outbreak:2,morale:1}},
  {label:`Throw something to lure it away`,sub:`Old trick. Sometimes it works.`,check:{stat:'wits',dc:7,danger:true},
   win:{text:`A thrown bottle shatters in the far alley. The creature lurches after it, and you're gone before it finds the sound.`},
   lose:{text:`Your throw goes wide and clips the dumpster. It's on you before you've finished cursing.`,hp:-6,inf:10}}
 ]});
add({id:'horde',wild:true,once:true,title:`The Horde`,cond:()=>G.w.outbreak>=40&&G.w.day>=T(3),w:()=>G.w.outbreak>=70?12:8,
 text:`A low sound builds: thousands of feet, a chorus of moaning that vibrates in your teeth. A horde is moving down the main road, and the road you're on runs straight into it.`,
 choices:[
  {label:`Hide and hold perfectly still`,sub:`Let the river of them flow past.`,check:{stat:'stealth',dc:11,danger:true},
   win:{text:`Twenty minutes, or twenty years. You lie in the dark with your hand over your mouth while the dead walk by a body-length away. When the last stragglers pass, you are crying and you don't know when it started.`,morale:-3},
   lose:{text:`A gap in the crowd. A face turns. Then all of them do.`,hp:-25,inf:30,morale:-10}},
  {label:`Run for high ground`,sub:`Out of reach beats out of sight.`,check:{stat:'stamina',dc:10,danger:true},
   win:{text:`Fire escape, ladder, roof. The horde flows through the street below and you watch from above. It takes hours for the sound to fade.`,morale:2},
   lose:{text:`Your legs give out on the last ladder. Something gets a grip on your ankle and drags you down two rungs before you kick free.`,hp:-20,inf:20,morale:-6,mark:'limp'}},
  {label:`Set off an alarm to draw them away`,sub:`Use noise like a weapon.`,check:{stat:'wits',dc:9,danger:true,bg:{firefighter:2,mechanic:2,student:1}},
   win:{text:`A car alarm two blocks away starts to scream. The horde swings toward it like iron filings to a magnet. You slip away in the opposite direction.`,morale:5,outbreak:-1},
   lose:{text:`The alarm goes off, all right, but it's too close. The horde pours toward you, not away.`,hp:-30,inf:25,morale:-8}}
 ]});
add({id:'stranger',title:`A Stranger at the Door`,cond:()=>G.w.day>=T(2),once:true,w:10,
 text:`A woman is standing in the street outside, hands empty, obviously exhausted. She says her name is Mara. She hasn't eaten in two days. She isn't bitten. She lifts her sleeves to show you.`,
 choices:[
  {label:`Share your food`,sub:`It's not much, but it's more than she has.`,cost:{food:2},
   out:{text:`She eats like someone who's forgotten how, then thanks you three times and disappears down the road before you can ask where she's going.`,humanity:10,morale:4,flag:'helpedMara'}},
  {label:`Ask what she knows first`,sub:`Information is worth something.`,check:{stat:'charisma',dc:7},
   win:{text:`She tells you about the roadblocks, the bad neighborhoods, and a pharmacy nobody's found. You give her a meal.`,meds:1,food:-1,humanity:3,flag:'helpedMara'},
   lose:{text:`She has very little to say, and you can't tell if she's hiding something. You give her a meal anyway.`,food:-1,humanity:5,flag:'helpedMara'}},
  {label:`Send her away`,sub:`You can't feed everyone.`,
   out:{text:`You watch her shrink in the distance. It gets very quiet.`,humanity:-10,morale:-3,flag:'turnedAwayMara'}}
 ]});
add({id:'mara_return',title:`Three Quick Knocks`,cond:()=>G.flags.helpedMara&&G.w.day>=T(6),once:true,w:24,
 text:`There's a knock at the door: three quick raps, then two slow ones. You open it a crack. Mara. She looks stronger, and she isn't empty-handed. "I remembered," she says, and holds up a bag.`,
 choices:[
  {label:`Let her in`,sub:`She knows the back roads, and she remembered you.`,
   out:{text:`She's carrying tins, a filter bottle, and a hand-drawn map of a dozen routes across the city. Nobody says anything for a while. It turns out being remembered is worth more than food.`,food:3,water:2,meds:1,humanity:5,morale:8,join:{name:'Mara',trait:`Knows the back roads`}}},
  {label:`Thank her and send her on her way`,sub:`She's got somewhere to be.`,
   out:{text:`She leaves the supplies on your step and goes. You watch her until she's out of sight.`,food:2,morale:3}}
 ]});
add({id:'mara_gone',title:`A Bag by the Road`,cond:()=>G.flags.turnedAwayMara&&G.w.day>=T(6),once:true,w:24,
 text:`Near the road you find a bag you've seen before, and next to it what's left of Mara. She didn't get far. Nobody else is around.`,
 choices:[
  {label:`Bury her`,sub:`It costs time. It costs something else too.`,out:{text:`It takes an hour, a shovel, and most of your composure. You mark the spot with a road sign.`,humanity:3,morale:-8}},
  {label:`Take what she carried`,sub:`She won't need it.`,out:{text:`Half a tin of beans and an empty water bottle. It's a thin haul. It feels thinner than it is.`,food:1,water:1,humanity:-5,morale:-6}},
  {label:`Walk away`,sub:`There's nothing to be done.`,out:{text:`You don't look back. You don't stop thinking about it, either.`,morale:-10,mark:'haunted'}}
 ]});
add({id:'bitten',title:`A Bad Scratch`,cond:()=>G.p.group.length>=1&&G.w.day>=T(4),once:true,w:7,
 pre:()=>({member:pick(G.p.group)}),
 text:(g,c)=>`${c.member.name} keeps tugging a sleeve down over one forearm. You catch a glimpse of it: teeth marks, fresh. "It's just a scratch," they say. Nobody in the room believes it, including them.`,
 choices:[
  {label:`Treat the wound properly`,sub:`You know what to do.`,tag:['doctor'],cost:{meds:1},
   out:{text:(g,c)=>`You scrub, irrigate, and dose it. The fever comes, and breaks, and comes again. ${c.member.name} lives. You saved someone, and for a moment the world feels like it might still work.`,humanity:10,morale:8,flag:'savedFriend'}},
  {label:`Give them medicine`,sub:`It might not be enough.`,cost:{meds:2},check:{stat:'wits',dc:8},
   win:{text:(g,c)=>`The fever spikes, and the drugs win. It's close. ${c.member.name} sleeps for a day and a half, and wakes up hungry.`,humanity:6,morale:6},
   lose:{text:(g,c)=>`It wasn't enough. In the small hours the thumping starts inside the locked room, and you leave before it stops. ${c.member.name} is gone.`,hp:-15,inf:10,morale:-12,lose:'ctx'}},
  {label:`Lock them in a room and hope`,sub:`It might be only a scratch.`,check:{stat:'wits',dc:11},
   win:{text:(g,c)=>`It was only a scratch. ${c.member.name} comes out after two days, pale and furious and very much alive.`,humanity:4,morale:8},
   lose:{text:(g,c)=>`It wasn't a scratch. The door starts to rattle in the night. ${c.member.name} is gone, and you'll never really know how.`,hp:-20,inf:15,morale:-10,lose:'ctx'}},
  {label:`Make the hard call and leave them behind`,sub:`You can't risk everyone.`,
   out:{text:(g,c)=>`Nobody argues. ${c.member.name} watches you go, and neither of you says a word.`,humanity:-15,morale:-12,lose:'ctx',mark:'haunted'}}
 ]});
add({id:'raiders',wild:true,title:`Toll Road`,cond:()=>G.w.order<45&&G.w.day>=T(4),w:10,
 text:`Three men with pipes and a stolen police shotgun block the road. They call it a toll. It's the kind of toll that ends with your bag on the ground.`,
 choices:[
  {label:`Pay what they ask`,sub:`A meal is cheaper than a fight.`,cost:{food:2},out:{text:`They take it with a grin and wave you on. It's the humiliation that stays with you.`,morale:-6,humanity:-2}},
  {label:`Fight`,sub:`Three against one, and you're the one.`,check:{stat:'strength',dc:11,bg:{soldier:2}},
   win:{text:`It's ugly, and short, and you're the one still standing. You go through their pockets. You don't like yourself much.`,ammo:2,food:2,morale:8,humanity:-3,order:2,stat:{strength:1}},
   lose:{text:`They don't fight fair. You come away with fewer things and more bruises.`,hp:-25,food:-2,morale:-8}},
  {label:`Talk them down`,sub:`Everyone wants to be reasonable.`,check:{stat:'charisma',dc:10},
   win:{text:`You find a name in common. Then a place. Then a reason. They let you pass, and one tells you which bridge is out.`,morale:5,flag:'raiderTruce'},
   lose:{text:`Talking is not what they're here for.`,hp:-10,food:-2}},
  {label:`Cut a deal`,sub:`Everyone needs a friend in a bad world.`,tag:['politician'],
   out:{text:`You promise favors from a world that may no longer exist. It works. It's the most convincing thing you've ever done.`,order:3,flag:'raiderTruce',morale:3}},
  {label:`Show the weapon`,sub:`A bluff, or not.`,need:()=>G.p.sup.ammo>=1,needKey:'needAmmo',
   out:{text:`You rack the slide, and the mood on the road changes. Nobody wants to be first to find out if you'll use it.`,humanity:-2,morale:3}}
 ]});
add({id:'radio',title:`A Voice in the Static`,cond:()=>G.w.day>=T(6)&&!G.flags.rumor,w:()=>(G.flags.radio?14:7)+Math.max(0,G.w.day-T(6)),
 text:()=>(G.flags.radio?`The shortwave crackles and hisses. Then, under the noise: a voice.`:`You pass a shop with a battery radio still running off a dying cell. Static. Then a voice.`)+` It repeats the same message on a loop: a name, a set of coordinates, and a promise of clean water, medicine, and walls. A safe zone, somewhere along the old highway.`,
 choices:[
  {label:`Write down the coordinates`,sub:`It could be a trap. It could be the only chance left.`,
   out:{text:`You copy it out twice and fold the paper into your boot. Whatever the day brings, you now have a direction.`,morale:10,flag:'rumor',markDay:'rumorDay'}},
  {label:`Try to trace the signal`,sub:`Is it real?`,tag:['journalist','student','mechanic'],check:{stat:'wits',dc:8},
   win:{text:`Direction, strength, repeated cadence. It's not a recording, and it's not a trap. It's a person, reading a script, in a room somewhere. Probably.`,morale:12,stat:{wits:1},flag:['rumor','verified'],markDay:'rumorDay'},
   lose:{text:`You get the coordinates, but nothing else. You can't tell if it's real.`,morale:3,flag:'rumor',markDay:'rumorDay'}},
  {label:`Ignore it. It's probably bait`,sub:`Hope is expensive.`,out:{text:`You've learned not to buy hope on credit. You turn the dial and the voice fades.`,morale:-2}}
 ]});
add({id:'safezone',title:`The Gate`,cond:()=>G.flags.rumor&&!G.flags.settled&&G.w.day>=Math.max(T(10),(G.flags.rumorDay||0)+T(4)),w:()=>24+Math.max(0,G.w.day-T(10)),
 text:()=>`You've followed the rumor as far as it goes. Beyond a burnt-out overpass, a chain-link fence catches the morning light, and a hand-painted banner above the gate reads: SAFE ZONE. WATER. MEDICINE. SHELTER.${G.flags.verified?` The signal you traced matches. This is real.`:` You still don't know if it's real.`} Between you and the gate: half a mile of open ground, and things moving in the ditches.`,
 choices:[
  {label:`Sprint for the gate`,sub:`Everything you've got, all at once.`,check:{stat:'stamina',dc:12,danger:true,mod:()=>(G.flags.car?2:0)+(G.flags.verified?1:0)},
   win:{text:`Lungs on fire, legs gone, you hit the gate at full speed. Hands drag you through. Behind you, the fence rattles under a hundred fingers, and holds.`,flag:'settled',markDay:'settledDay',morale:15,order:3},
   lose:{text:`You make it three-quarters of the way. Then the ditches wake up.`,hp:-25,inf:25,morale:-6}},
  {label:`Creep along the tree line`,sub:`Slow, quiet, and hard to see.`,check:{stat:'stealth',dc:11,danger:true,mod:()=>G.flags.verified?1:0},
   win:{text:`An hour of crawling, inch by inch, using every shadow. When you reach the wire, a hand reaches down through it and pulls you up.`,flag:'settled',markDay:'settledDay',morale:15,order:3},
   lose:{text:`A twig, a sneeze, a bad step. Something in the ditch lifts its head.`,hp:-20,inf:20,morale:-5}},
  {label:`Signal the guards and hold out for cover`,sub:`Make someone on the wall want to save you.`,check:{stat:'charisma',dc:10,mod:()=>(G.flags.guardContact?2:0)+(G.flags.militaryContact?2:0)},
   win:{text:`A spotlight swings toward you, then a truck, engine roaring, a man on the back with a rifle. Covering fire rakes the ditches. You walk into the safe zone with your head down and your hands up.`,flag:'settled',markDay:'settledDay',morale:15,order:3},
   lose:{text:`The lights sweep past you. Nobody answers. You lie in the grass for an hour with your heart hammering.`,morale:-6,hp:-4}},
  {label:`Not yet. Watch for another day`,sub:`Look for a better moment.`,out:{text:`You watch the gate through the night. Trucks come and go. Nothing gets in or out without a fight. You've learned something, at least.`,morale:-2,food:-1}}
 ]});
add({id:'fever',title:`Fever`,cond:()=>G.p.inf>=35,w:14,
 text:`Your skin is hot to the touch and your vision swims. The scratches from the last few days are red and angry. You can feel it, a slow tide rising in your blood.`,
 choices:[
  {label:`Take medicine`,sub:`It might be enough.`,cost:{meds:1},out:{text:`The pills are bitter, and the fever eases over the next few hours. You sleep for a long time.`,inf:-30,hp:5}},
  {label:`Sweat it out`,sub:`Some bodies fight it off.`,check:{stat:'health',dc:9},
   win:{text:`Night sweats, shaking, and then, near dawn, a clear head. You'll live. For a while.`,inf:-15,hp:-5},
   lose:{text:`It gets worse before it gets worse. You come to in the morning weaker and hotter.`,inf:10,hp:-12}},
  {label:`Manage the fever yourself`,sub:`You know exactly what a body can bear.`,tag:['doctor'],out:{text:`Cold water, careful rest, precise sips. It's uncomfortable and effective.`,inf:-20,hp:-3}}
 ]});
add({id:'quiet_night',title:`A Quiet Night`,w:()=>6+(G.p.hp<G.p.maxHp*.5?10:0)+(G.p.morale<40?8:0),
 text:`The night is quiet, unnaturally so. You find a shelter with a door that locks. For a few hours nothing tries to eat you.`,
 choices:[
  {label:`Sleep properly`,sub:`Rest heals.`,out:{text:`It's the first real sleep in days. You wake up stiff, but clear.`,hp:18,morale:3}},
  {label:`Write in your journal and take stock`,sub:`Some things need to be put down somewhere.`,out:{text:`You write until the pen stops. It doesn't fix anything, but it helps.`,morale:9,hp:5}},
  {label:`Use the quiet to scout the neighborhood`,sub:`Someone has to look.`,check:{stat:'stealth',dc:8},
   win:{text:`A dead man's backpack and a kitchen nobody had checked. You come back with something for the pantry.`,food:2,water:1,stat:{stealth:1}},
   lose:{text:`You aren't as alone as you thought.`,hp:-8,inf:6}}
 ]});
add({id:'abandoned_car',wild:true,once:true,title:`The Abandoned Car`,cond:()=>!G.flags.car&&G.w.day>=T(2),w:8,
 text:`A car sits on the shoulder, keys nowhere, doors unlocked. The tank sounds half full. A man in the driver's seat is very still.`,
 choices:[
  {label:`Hotwire it`,sub:`A car changes everything.`,check:{stat:'wits',dc:10,bg:{mechanic:4}},
   win:{text:`Two wires, one screwdriver, and a long breath. The engine catches.`,morale:8,flag:'car'},
   lose:{text:`The alarm goes off, loud and brief, and you spend a very long minute wondering who heard it.`,hp:-5,outbreak:2}},
  {label:`Search it for supplies`,sub:`Let the dead man keep his seat.`,check:{stat:'stealth',dc:7},
   win:{text:`A packet of biscuits, two bottles of water, a torch that still works. You take them and leave the man in peace.`,food:1,water:2,ammo:1},
   lose:{text:`The man isn't dead. He isn't alive, either.`,hp:-5,inf:8}},
  {label:`Leave it`,sub:`Some things aren't worth the trouble.`,out:{text:`You walk on. It's probably fine.`}}
 ]});
add({id:'smoke',wild:true,title:`Smoke on the Horizon`,cond:()=>G.w.day>=T(3),once:true,w:7,
 text:`A column of black smoke rises from a building a few blocks away. Someone might be trapped. Someone might be baiting people to come and look.`,
 choices:[
  {label:`Investigate and rescue whoever is inside`,sub:`If someone's in there, they don't have long.`,check:{stat:'strength',dc:9,bg:{firefighter:4}},
   win:{text:`You get a door open, a window out, and a person through it. His name is Dev, he's coughing, and he says he can fix anything with a battery.`,humanity:8,morale:6,join:{name:'Dev',trait:`Rescued from the fire, good with electronics`}},
   lose:{text:`The heat is worse than you thought. You get out, barely, with nothing but burns and a very bad feeling.`,hp:-14,morale:-3}},
  {label:`Watch from a distance`,sub:`Better safe.`,check:{stat:'stealth',dc:6},
   win:{text:`Two figures run out of the building and disappear into the smoke. Whatever it was, it wasn't your problem.`,morale:-2,humanity:-3},
   lose:{text:`You watch too long. Something notices you watching.`,hp:-6,inf:6}},
  {label:`Loot the neighboring block while everyone's distracted`,sub:`Everyone's looking the other way.`,check:{stat:'stealth',dc:8},
   win:{text:`The street is deserted. You take what you like.`,food:3,water:2,humanity:-5},
   lose:{text:`You aren't the only one with the idea, and the other person has a pipe.`,hp:-8,morale:-3}}
 ]});
add({id:'school',title:`The Locked School`,cond:()=>G.w.day>=T(4),once:true,w:7,
 text:`A school gate is chained shut from the inside. Faces at the windows: children and a few adults. They see you and pull back, not knowing if you're safe.`,
 choices:[
  {label:`Talk to them like a teacher`,sub:`You know how to make people listen.`,tag:['teacher'],check:{stat:'charisma',dc:7,bg:{teacher:3}},
   win:{text:`You speak calmly and clearly, from behind the fence. After a while, someone unlocks the gate. A tired woman, Ms. Cole, the vice principal, shakes your hand.`,food:3,water:2,humanity:10,join:{name:'Ms. Cole',trait:`Vice principal, calm in a crisis`}},
   lose:{text:`They won't open the gate. Not to you, not to anyone.`,morale:-4}},
  {label:`Leave food at the gate and go`,sub:`It's not much.`,cost:{food:1},out:{text:`You leave a bag by the gate and walk away without looking back. It's the most decent thing you've done all week.`,humanity:6,morale:3}},
  {label:`Break in for the supplies`,sub:`They won't miss it.`,check:{stat:'strength',dc:9},
   win:{text:`You get in, and out, with more than you need. From a window on the second floor, a child watches you go.`,food:4,water:3,humanity:-12,order:-3},
   lose:{text:`Someone inside has a fire axe, and they know how to use it.`,hp:-10}}
 ]});
add({id:'wounded_soldier',title:`The Wounded Soldier`,cond:()=>G.w.day>=T(4)&&G.w.order>=20,once:true,w:7,
 text:`A soldier lies against a wall, one leg wrapped in a shirt gone black with blood. He has a radio, a rifle, and maybe three hours.`,
 choices:[
  {label:`Treat the wound`,sub:`You know exactly what to do.`,tag:['doctor'],cost:{meds:1},
   out:{text:`Tourniquet, pressure, stitches, and an hour. He's pale and grateful, and says his name is Reyes.`,ammo:2,humanity:8,join:{name:'Cpl. Reyes',trait:`Wounded soldier, good shot`},flag:'militaryContact'}},
  {label:`Stay with him until the end`,sub:`Nobody should die alone.`,out:{text:`He talks. You listen. When it's over he presses the radio into your hand.`,humanity:6,morale:-8,flag:'radio'}},
  {label:`Take the rifle and go`,sub:`He won't be needing it.`,out:{text:`He watches you take it. He doesn't argue. That's the worst part.`,ammo:3,humanity:-10,morale:-6}}
 ]});
add({id:'checkpoint',wild:true,title:`The Checkpoint`,cond:()=>G.w.order>=25&&G.w.day>=T(3),once:true,w:8,
 text:()=>({usa:`A National Guard roadblock has sandbagged the overpass: floodlights, a machine gun nest, and a hand-painted sign reading INFECTED WILL BE SHOT.`,canada:`A border patrol line has thrown spike strips and floodlights across the road. Nobody moves without papers.`,australia:`A police roadblock has closed the highway. Officers in masks wave people back one car at a time.`,israel:`An army roadblock has been thrown across the junction: sandbags, a jeep, and soldiers checking everyone, one by one.`,uk:`A police cordon, with an Army lorry parked behind it, blocks the road. Blue tape and blank faces.`,brazil:`Military police have barricaded the avenue with buses. The rifles point outward, not in.`,japan:`A Self-Defense Force checkpoint stands calmly astride the road. Volunteers in armbands hand out masks in an orderly line.`}[G.p.loc])+` Your route runs straight through it.`,
 choices:[
  {label:`Talk your way through`,sub:`They're tired. Everyone's tired.`,check:{stat:'charisma',dc:10,bg:{politician:3}},
   win:{text:`You say the right things. The officer waves you on with a look that says he'd like to be doing the same.`,food:2,water:2,morale:3,stat:{charisma:1}},
   lose:{text:`They turn you back with more force than you'd expect. You lose a few things and some of your dignity.`,hp:-8,morale:-4,food:-1}},
  {label:`Slip around it`,sub:`There's always a gap.`,check:{stat:'stealth',dc:9,danger:true},
   win:{text:`A drainage ditch, a hedge, a long walk in the dark. You come out the far side without anyone raising the alarm.`,morale:2},
   lose:{text:`The gap isn't empty. You fall into something that grabs back.`,hp:-12,inf:10}},
  {label:`Show your credentials`,sub:`Some jobs open doors.`,tag:['soldier','doctor','journalist','politician'],
   out:{text:`They read your ID twice, then hand it back and step aside. You don't have to explain yourself.`,food:2,water:2,order:1,morale:3}}
 ]});
add({id:'gate_outbreak',title:`What Came Through the Fence`,cond:()=>G.flags.openedGate&&G.w.day>=T(8),once:true,w:20,
 text:`The border guard's warning comes back to you. A cluster of infections is tracing back to the fence, to the night you helped a family through. Nobody knows it was you. You do.`,
 choices:[
  {label:`Come forward and help with the quarantine`,sub:`It's your mess too.`,check:{stat:'charisma',dc:9},
   win:{text:`You tell the truth to a room of tired people. Some are angry. Most are too busy to be. By the end of the week the cluster is contained.`,order:5,outbreak:-6,humanity:6},
   lose:{text:`Nobody believes you. Somebody decides you're a plant. It takes a week to convince them you're not.`,order:-3,morale:-8}},
  {label:`Stay silent`,sub:`It's done. There's no changing it.`,out:{text:`You say nothing. The cluster grows, and you watch it from a distance, carrying a weight you cannot put down.`,humanity:-10,outbreak:4,morale:-6,mark:'haunted'}}
 ]});
add({id:'looter_retribution',title:`You Took Our Things`,cond:()=>G.flags.looter&&G.w.day>=T(7),once:true,w:14,
 text:`A man stands in the road ahead with a bat. You know his face. The places you cleaned out early on belonged to people like him. "You took our stuff," he says, quite calmly.`,
 choices:[
  {label:`Apologize and give some back`,sub:`It's the least you can do.`,cost:{food:2},out:{text:`He takes the food without a word. Then he steps aside. It's not forgiveness, but it's something.`,humanity:8,morale:3}},
  {label:`Fight him`,sub:`You're not backing down.`,check:{stat:'strength',dc:10,bg:{soldier:2}},
   win:{text:`It ends quickly. You step over him and walk on, and you know that you'll be thinking about it later.`,humanity:-5,morale:3},
   lose:{text:`He's angrier than you are. You come away with a broken rib and a lesson.`,hp:-20}},
  {label:`Run`,sub:`Some fights aren't yours.`,check:{stat:'stamina',dc:8},
   win:{text:`You outrun him easily, and hear him shout after you for a long time.`,morale:-2},
   lose:{text:`He's quicker than he looks. You get away, but he gets a good swing in.`,hp:-10}}
 ]});
add({id:'group_argument',title:`Nerves Are Fraying`,cond:()=>G.p.group.length>=2&&G.w.day>=T(6),once:true,w:7,
 text:`Two of your group are shouting about whose turn it is to keep watch. Food is short. Voices carry, and sound is the one thing you can't afford.`,
 choices:[
  {label:`Mediate`,sub:`Be the adult in the room.`,check:{stat:'charisma',dc:8,bg:{teacher:3}},
   win:{text:`You listen to both sides, then to neither, then you make a call. Grudgingly, it holds.`,morale:6},
   lose:{text:`Now they're both angry at you.`,morale:-8}},
  {label:`Split the rations evenly`,sub:`Fair is fair.`,cost:{food:2},out:{text:`Nobody has enough, but everyone has the same. It turns out that matters.`,morale:5,humanity:4}},
  {label:`Side with the strongest`,sub:`Keep the peace by choosing.`,out:{text:`It ends the argument. It doesn't end the resentment.`,morale:-3,humanity:-4}}
 ]});
add({id:'supply_drop',wild:true,title:`The Drop`,cond:()=>G.w.order>=35&&G.w.day>=T(3),once:true,w:6,
 text:`A crate under a parachute drifts down two streets away. Others have seen it too. You can hear the footsteps.`,
 choices:[
  {label:`Rush for it`,sub:`Be first, or be last.`,check:{stat:'stamina',dc:9,danger:true},
   win:{text:`You get there first. The crate is heavy, and full of things that are worth fighting for.`,food:4,water:3,meds:1},
   lose:{text:`You're a second too late, and a second too slow.`,hp:-10,morale:-4}},
  {label:`Wait and watch for the scramble`,sub:`Pick up what's left.`,check:{stat:'stealth',dc:7},
   win:{text:`The scramble burns itself out. You slip in afterwards and take what's left.`,food:2,water:1},
   lose:{text:`Someone spots you loitering, and misjudges your intentions.`,hp:-5}}
 ]});
