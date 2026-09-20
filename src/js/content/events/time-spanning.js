
/* ---------- events for the long road ---------- */
const yrO=()=>G.w.outbreak>=85?0:G.w.outbreak>=60?1:G.w.outbreak>=35?2:3;
const yrR=()=>G.w.order>=65?0:G.w.order>=35?1:2;
add({id:'year_review',title:()=>`Year ${timeOf(G.w.day).year} Begins`,
 text:()=>[`The dead still outnumber the living by a wide margin.`,`The dead are everywhere, but the world is learning their habits.`,`The outbreak has settled into something you can plan around.`,`The numbers are falling. Whole districts are quiet.`][yrO()]+` `+[`Some kind of order is holding.`,`Order is patchy: pockets of law between long stretches of nothing.`,`Order died a long time ago.`][yrR()]+` `+(G.p.group.length?`${listNames(G.p.group.map(m=>m.name))} ${G.p.group.length>1?'are':'is'} still with you.`:`You are on your own.`)+` A new year is a good time to decide what kind of survivor to become.`,
 choices:[
  {label:`Train your body`,sub:`Push hard while there's time.`,cost:{food:1},out:{text:`Runs at dawn, pull-ups on a bent lamppost, water carried up stairs. By spring your body is a different tool.`,stat:{strength:1},hp:4}},
  {label:`Study and plan`,sub:`Maps, notes, and lessons learned the hard way.`,out:{text:`You draw maps, list mistakes, and rehearse every bad night. It turns out that paying attention is a skill.`,stat:{wits:1},morale:2}},
  {label:`Practice moving unseen`,sub:`Silence is a survival skill.`,out:{text:`You learn where floors creak, how far a whisper carries, and how to make yourself boring to a hungry thing.`,stat:{stealth:1}}},
  {label:`Spend the season with people`,sub:`Stories, meals, and other reasons to keep going.`,out:{text:`You talk. You listen. You laugh at something that isn't funny, and it helps more than you'd expect.`,stat:{charisma:1},morale:8}},
  {label:`Rest and recover`,sub:`Nobody can run forever.`,out:{text:`For a season you do very little, on purpose. It feels like stealing. It works.`,hp:22,morale:10,inf:-5}}
 ]});
add({id:'winter',title:`The Hard Cold`,cond:()=>timeOf(G.w.day).season==='winter',w:14,
 text:`Winter settles in. The nights are long, the wind finds every gap, and the dead move slowly, but so does everything else. You need fuel, warmth, and something to eat.`,
 choices:[
  {label:`Gather firewood`,sub:`Cold work, but honest.`,check:{stat:'strength',dc:8},
   win:{text:`Splintered pallets, a fallen tree, half a fence. It burns well. You sleep warm for the first time in a week.`,morale:5,hp:6},
   lose:{text:`You slip on black ice, and the axe finds your leg instead of the branch. The fire is small tonight.`,hp:-10,morale:-3}},
  {label:`Huddle down and ration`,sub:`Sleep, save energy, wait for spring.`,cost:{food:1},out:{text:`You sleep fourteen hours a day and dream about heating. It isn't living, but it's surviving.`,morale:3,hp:8}},
  {label:`Raid a cabin for blankets and stores`,sub:`Somebody left in a hurry.`,check:{stat:'stealth',dc:9,danger:true},
   win:{text:`A hunter's cabin, mostly intact. Blankets, canned stew, a working stove. Whoever lived here won't be back.`,food:3,water:1,morale:4},
   lose:{text:`Whoever lived here never left.`,hp:-8,inf:8}}
 ]});
add({id:'planting',title:`A Patch of Earth`,cond:()=>(timeOf(G.w.day).season==='spring'||timeOf(G.w.day).season==='summer')&&!G.flags.garden&&G.w.day>=T(4),once:true,w:10,
 text:`Behind a ruined garden centre you find seed packets, some still sealed, and a patch of ground the dead haven't trampled. Nothing says the world is over like planting something you won't harvest for months. Nothing says it isn't like doing it anyway.`,
 choices:[
  {label:`Plant a garden`,sub:`Slow food, and food that doesn't run out.`,check:{stat:'wits',dc:8},
   win:{text:`Beans, potatoes, some hardy greens. It takes work and patience, and one afternoon of fighting off crows. By summer you're eating what you grew.`,morale:6,flag:'garden'},
   lose:{text:`Too dry, too shady, too late. The seedlings die, and you learn something about soil the hard way.`,morale:-3,food:-1}},
  {label:`Get everyone to help`,sub:`Many hands make a garden.`,need:()=>G.p.group.length>=1,needKey:'needGroup',out:{text:`A dozen hands make a garden in an afternoon. Somebody hums. Somebody laughs. It's a good day.`,morale:10,humanity:3,flag:'garden'}},
  {label:`Take the seeds and move on`,sub:`You may plant them somewhere safer.`,out:{text:`They're light, and they're hope. You tuck them into a pocket and keep walking.`,food:1}}
 ]});
add({id:'trader',title:`The Trader`,cond:()=>G.w.day>=T(4),w:8,
 text:`A man pushing an overloaded cart stops at a respectful distance. A hand-lettered sign on the front reads: TRADE, NOT TROUBLE. His rifle is slung, and his smile is careful.`,
 choices:[
  {label:`Haggle`,sub:`Everyone has something they want.`,check:{stat:'charisma',dc:8,bg:{politician:2}},
   win:{text:`Forty minutes of good-natured argument later, you've both been robbed, and you're both delighted.`,food:2,meds:1,ammo:1},
   lose:{text:`He's better at this than you are, and he knows it.`,food:-1,morale:-3}},
  {label:`Trade ammo for medicine`,sub:`Two rounds a dose.`,cost:{ammo:2},out:{text:`He counts the rounds twice, then hands over a small bag of pills.`,meds:2}},
  {label:`Trade food for ammo`,sub:`Better armed than fed.`,cost:{food:2},out:{text:`He weighs the bag, nods, and pushes a box across the cart.`,ammo:3}},
  {label:`Take his cart`,sub:`He's alone.`,check:{stat:'strength',dc:10,bg:{soldier:2}},
   win:{text:`It's over quickly. He doesn't fight for the cart, and that's somehow worse.`,food:4,water:2,ammo:2,humanity:-12},
   lose:{text:`The rifle wasn't for show.`,hp:-20,humanity:-3}}
 ]});
add({id:'bad_water',title:`Something in the Water`,cond:()=>G.w.day>=T(5),w:7,
 text:`The well you have been relying on has turned. It smells wrong, and there's a film on the surface. Somewhere upstream, something died.`,
 choices:[
  {label:`Boil and filter it`,sub:`Slow, smoky, reliable.`,check:{stat:'wits',dc:7,bg:{doctor:2}},
   win:{text:`Fire, cloth, charcoal, and patience. The result tastes awful and keeps you alive.`,water:3},
   lose:{text:`You get it mostly right. Mostly isn't enough.`,hp:-6,inf:5,water:1}},
  {label:`Drink it anyway`,sub:`You're thirsty.`,check:{stat:'health',dc:9},
   win:{text:`You feel queasy for a day. That's all.`,water:3,hp:-3},
   lose:{text:`A night of terrible cramps, and a day of worse.`,water:3,hp:-15,inf:10}},
  {label:`Find another source`,sub:`Wells aren't the only water.`,check:{stat:'stamina',dc:9,danger:true},
   win:{text:`A stream two hills over, still clear. You fill everything you own.`,water:4,morale:3},
   lose:{text:`You find water. You also find what was drinking it.`,hp:-10,inf:8}}
 ]});
add({id:'researcher',title:`The Researcher`,cond:()=>prog()>=.4&&!G.flags.cure,once:true,w:14,
 text:`A woman in a stained lab coat sits on the bumper of a burnt-out ambulance, cradling a battered hard drive. She hasn't slept in a very long time. She says she was on a team working on the outbreak before everything fell apart. She says she's close. She says she needs someone to walk her two days across bad country to a lab with working power.`,
 choices:[
  {label:`Escort her to the lab`,sub:`Two days. Bad country. One chance.`,check:{stat:'stamina',dc:11,danger:true},
   win:{text:`You get her there. She works for a week without leaving the room, then comes out with a small case and a look you'll remember for the rest of your life. It won't fix everything. It's a start.`,outbreak:-18,order:8,humanity:6,morale:12,flag:'cure',join:{name:'Dr. Hale',trait:`Researcher who found a way to slow the outbreak`}},
   lose:{text:`The road is worse than she said. You bring her back alive, barely, but the hard drive doesn't survive.`,hp:-25,inf:20,morale:-8}},
  {label:`Help her read the data`,sub:`You know what you're looking at.`,tag:['doctor'],out:{text:`For three nights you go through her figures together. On the fourth, you find what she missed. She cries. Then she works.`,outbreak:-14,order:6,humanity:6,morale:10,flag:'cure'}},
  {label:`Give her medicine and send her on`,sub:`It's not much of an escort.`,cost:{meds:2},out:{text:`She takes the pills, the water, and a handshake. You never learn if she made it. You choose to believe she did.`,morale:6,humanity:8,outbreak:-3,flag:'cureHelp'}},
  {label:`Turn her away`,sub:`You can't save the world.`,out:{text:`She nods like she expected it and walks on.`,humanity:-8,morale:-4}}
 ]});
add({id:'rebuild',title:`Rebuilding`,cond:()=>prog()>=.6&&!G.flags.builder,once:true,w:14,
 text:`Somewhere along the way, the emergency turned into a long, hard life. Small towns are lighting their lamps again. Somebody has to decide what gets rebuilt first, and somebody is looking at you.`,
 choices:[
  {label:`Take charge of the rebuilding`,sub:`Lead, or watch someone else do it badly.`,check:{stat:'charisma',dc:9,bg:{politician:3,teacher:2}},
   win:{text:`You draw up a list, argue over it, and start on the first item. It's slow, and loud, and by the end of the season there's a school with a roof.`,order:12,humanity:6,morale:8,flag:'builder'},
   lose:{text:`Everybody agrees that something should be done, and nobody agrees what. It ends in shouting.`,morale:-6,order:-2}},
  {label:`Get the power back on`,sub:`One switch, a thousand consequences.`,check:{stat:'wits',dc:10,bg:{mechanic:4,firefighter:1}},
   win:{text:`A borrowed generator, a hand-drawn diagram, and a lot of copper wire. On the fourth try, a string of bulbs comes on. Somebody starts crying, and then everybody is.`,order:8,morale:8,flag:'builder'},
   lose:{text:`The first attempt puts you on your back, ears ringing.`,hp:-8,morale:-3}},
  {label:`Set up a clinic`,sub:`The best rebuild is a well person.`,tag:['doctor'],out:{text:`A folding table, a lamp, and a sign. By evening there's a line around the block.`,order:6,humanity:8,outbreak:-4,flag:'builder'}},
  {label:`Keep your head down`,sub:`You've done enough.`,out:{text:`You let others take it on. You tell yourself it isn't cowardice. Mostly.`,morale:3}}
 ]});
add({id:'settle_council',once:true,title:`The Council`,cond:()=>G.flags.settled,w:14,
 text:`The settlement's council meets in the old gym, and the agenda is grim. Rations are short, some of the sick are hiding their fevers, and a group of new arrivals is waiting at the gate. Everyone looks toward the people who've been here longest. You are one of them.`,
 choices:[
  {label:`Speak for the newcomers`,sub:`Yesterday, that was you.`,check:{stat:'charisma',dc:9},
   win:{text:`You remind them who they were on the day they arrived. The vote goes your way, narrowly. One of the newcomers, Sofia, is a hunter, and she looks at you like you've given her back a year.`,humanity:8,order:2,join:{name:'Sofia',trait:`Newcomer, skilled hunter`}},
   lose:{text:`Nobody is listening. The gate stays shut.`,morale:-5,order:-2}},
  {label:`Vote to seal the gate`,sub:`Safety first, and no exceptions.`,out:{text:`The gate stays closed. The strangers sit outside until dark, then go. You don't watch.`,order:3,humanity:-10,outbreak:-2}},
  {label:`Push for fever checks at the gate`,sub:`A middle path.`,check:{stat:'wits',dc:7,bg:{doctor:3}},
   win:{text:`A table, a thermometer, and a rule: nobody comes in without a check. It works, and it's humane, and it takes about four minutes per person.`,outbreak:-4,order:4,humanity:3},
   lose:{text:`The idea is good, but the details are not. It gets voted down.`,morale:-3}}
 ]});
add({id:'settle_breach',once:true,title:`The Wall`,cond:()=>G.flags.settled&&G.w.outbreak>=45,w:10,
 text:`The alarm goes off at three in the morning. A section of the wall has failed, and shapes are pouring through the gap into the yard where the families sleep.`,
 choices:[
  {label:`Hold the breach`,sub:`Someone has to stand there.`,check:{stat:'strength',dc:11,danger:true,bg:{soldier:2,firefighter:2}},
   win:{text:`You stand in the gap with anyone who'll stand with you, and hold until the sun comes up. Seven people are hurt. Nobody is lost.`,order:5,humanity:6,morale:8,hp:-8},
   lose:{text:`The line breaks. You fall back, bleeding, and fight in the courtyard until it's over.`,hp:-25,inf:15,order:-6,morale:-8}},
  {label:`Get everyone to the inner building`,sub:`Save the people, lose the yard.`,check:{stat:'charisma',dc:9},
   win:{text:`You shout, you push, you count heads. By the time the dead reach the yard, it's empty.`,order:4,humanity:5,morale:4},
   lose:{text:`Panic. Screaming. Somebody drops a child. You catch him.`,order:-6,humanity:2,hp:-6}},
  {label:`Fix the wall while they fight`,sub:`Steel, timber, and nerve.`,tag:['mechanic','firefighter'],out:{text:`You work in the dark with a welding torch and a borrowed ladder. By dawn the wall is whole, and you're covered in soot and something worse.`,order:6,morale:6,hp:-10}}
 ]});
add({id:'caravan',title:`The Caravan`,cond:()=>G.flags.settled,w:8,
 text:`A convoy of trucks approaches the gate under a hand-painted flag: drivers, guards, and a woman with a clipboard. They're looking for a place to trade, to rest, to be someone's neighbors for a night.`,
 choices:[
  {label:`Open the gate and trade`,sub:`New faces. New goods.`,check:{stat:'charisma',dc:8},
   win:{text:`Salt, seeds, spare batteries, a case of antibiotics with a torn label. The gate is open all night, and nobody dies.`,food:3,water:2,meds:1,ammo:1,order:3},
   lose:{text:`Somebody's pockets are lighter in the morning, and the caravan is already gone.`,food:-1,order:-2}},
  {label:`Ask what they've seen`,sub:`News is currency.`,check:{stat:'wits',dc:7},
   win:{text:`They talk for hours. There are other settlements, farther north. One of them is growing wheat.`,morale:8,order:2},
   lose:{text:`Half of it is rumor and half of it is lies.`,morale:-2}},
  {label:`Send them away`,sub:`You can't trust anyone.`,out:{text:`The trucks turn back, and nobody speaks for a while.`,order:-2,humanity:-4}}
 ]});
add({id:'child',title:`A New Voice`,cond:()=>(G.p.group.length>=1||G.flags.settled)&&prog()>=.3,once:true,w:9,
 text:`In the night, someone cries out, and then, from the same room, a very small voice answers. A baby, in a world that has almost forgotten how. Everyone crowds at the door.`,
 choices:[
  {label:`Give up your rations for the mother`,sub:`She's feeding two.`,cost:{food:2},out:{text:`She cries, and thanks you, and then eats like a soldier. The baby sleeps.`,morale:14,humanity:8,flag:'newborn'}},
  {label:`Find medicine and help with the birth`,sub:`It's late, and it's difficult.`,check:{stat:'wits',dc:8,bg:{doctor:3}},
   win:{text:`Hours pass, and then a tiny, furious cry. Somebody opens the last bottle of something and everyone has a sip.`,morale:12,humanity:8,flag:'newborn'},
   lose:{text:`It's harder than anyone thought, but in the end mother and child are alive.`,morale:4,hp:-4,flag:'newborn'}},
  {label:`Keep watch at the door all night`,sub:`Guard the sleeping.`,out:{text:`You sit in the dark with a lamp, listening to a very small person breathe. You haven't been this calm in years.`,morale:8,hp:-3,humanity:3}}
 ]});
add({id:'road_gang',title:`Old Friends, Sort Of`,cond:()=>G.flags.raiderTruce&&prog()>=.4,once:true,w:12,
 text:`The road gang you once made peace with is at your door. They aren't threatening. They want something: safe passage through your territory. They'll pay.`,
 choices:[
  {label:`Agree to a trade`,sub:`Everyone eats.`,out:{text:`A handshake, a ledger, and a promise not to ask questions. It's a good deal, and you don't feel good about it.`,food:3,ammo:2,order:2,humanity:-2}},
  {label:`Ask them to help defend the road`,sub:`Turn enemies into neighbors.`,check:{stat:'charisma',dc:9},
   win:{text:`They laugh, then they think, then they agree. It's a strange alliance, but it holds.`,order:6,humanity:2,morale:5},
   lose:{text:`They just laugh.`,morale:-3}},
  {label:`Refuse`,sub:`You don't do business with thugs.`,out:{text:`They shrug and leave. It's uneasy, but it's over.`,morale:2,order:-1}}
 ]});
