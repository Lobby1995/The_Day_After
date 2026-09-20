
/* ---------- forks that change how the rest of the game plays ---------- */
add({id:'fork_base',title:`A Place Worth Defending`,cond:()=>G.w.day>=T(4)&&!G.flags.base&&!G.flags.nomad&&!G.flags.settled,once:true,w:14,
 text:`On a rise above the road stands an old water plant: thick concrete walls, a working well, a roof that doesn't leak, and one door. It could be a home. It could also be a trap with a single way out.`,
 choices:[
  {label:`Claim it and dig in`,sub:`Walls and a roof, for as long as they hold.`,check:{stat:'strength',dc:9,danger:true,bg:{soldier:2,firefighter:2},mod:()=>G.p.group.length>=2?1:0},
   win:{text:`It takes three nights and every strong back you have, but the door bars, the roof holds, and the well runs clear. For the first time in a long while, you stop running.`,flag:'base',morale:10,water:2},
   lose:{text:`Something was already living here. You get out with your life and not much else, and the place is lost.`,hp:-18,inf:12,morale:-6}},
  {label:`Keep moving`,sub:`Safety is a rumor. Stay light and hard to find.`,
   out:{text:`You take the road. The building watches you go. There is a freedom in staying loose, and a price, and both will be collected.`,flag:'nomad',morale:3}}
 ]});
add({id:'siege',title:`Night Attack`,cond:()=>G.flags.base&&G.w.day>=T(6),once:true,w:22,
 text:`The alarm rope jerks at two in the morning. Something has found the wall you built, and it is not alone. Everyone in the building is looking at you in the dark.`,
 choices:[
  {label:`Hold the wall`,sub:`Fight at the door, where it matters.`,check:{stat:'strength',dc:10,danger:true,bg:{soldier:2,firefighter:2}},
   win:{text:`You stand at the barred door until the light comes. When it's quiet, the wall is still standing, and so is everyone inside it.`,morale:8,hp:-8,loyAll:1,order:3},
   lose:{text:`The door gives. You fall back bleeding and fight in the corridor until it's over. The stores took a beating.`,hp:-25,inf:15,food:-2,water:-1,morale:-6}},
  {label:`Fall back to the inner room`,sub:`Give up the wall. Save the people.`,check:{stat:'charisma',dc:9},
   win:{text:`You shift shelves, bar the inner door, and hold your breath together. The wall is breached, but nobody is hurt, and by morning they've wandered off.`,morale:2,food:-1,loyAll:1},
   lose:{text:`The inner room holds, but the base doesn't. By dawn there's nothing left to defend, and nowhere left to call yours.`,unflag:'base',hp:-8,food:-2,morale:-10}}
 ]});
add({id:'road_ambush',title:`Ambush on the Road`,cond:()=>G.flags.nomad&&G.w.day>=T(6),once:true,w:20,
 text:`The road narrows between two burned-out trucks. A rope drops across it. Low laughter comes from the ditch.`,
 choices:[
  {label:`Break through`,sub:`Move before they set.`,check:{stat:'stamina',dc:9,danger:true},
   win:{text:`You go through the rope at a run, and something in the ditch swears. You don't look back.`,morale:5},
   lose:{text:`The rope catches, the fall is bad, and they take what they can carry before you get up.`,hp:-15,food:-2,ammo:-1}},
  {label:`Stand and fight`,sub:`They're only looters. Probably.`,check:{stat:'strength',dc:10,bg:{soldier:2}},
   win:{text:`They didn't expect resistance. You leave with their loot and something to think about.`,food:3,ammo:2,humanity:-3},
   lose:{text:`There were more of them than there looked.`,hp:-25,food:-2,morale:-6}}
 ]});
add({id:'fork_raiders',title:`The Gang's Offer`,cond:()=>G.flags.raiderTruce&&!G.flags.raiderAlly&&!G.flags.raiderEnemy&&G.w.day>=T(7),once:true,w:16,
 text:`The road gang you once made peace with wants more than a truce. They want you in the crew: a share of what they take, and a place at their fire. Their leader smiles as if it were a kindness.`,
 choices:[
  {label:`Join them`,sub:`Guns, food, and no more running. For a price.`,
   out:{text:`They don't ask what you've done. They only ask what you can do. By dark you are eating better than you have in a year, and you try not to think about where it came from.`,flag:'raiderAlly',ammo:4,food:3,humanity:-15,order:-4}},
  {label:`Refuse politely`,sub:`You'd rather stay yourself.`,check:{stat:'charisma',dc:9},
   win:{text:`He shrugs, then laughs, then offers his hand. Respect is a currency too.`,morale:3,humanity:3},
   lose:{text:`He doesn't take it well. Nobody says anything, and that's the worst kind of answer.`,flag:'raiderEnemy',hp:-6,morale:-4}}
 ]});
add({id:'raider_tribute',title:`The Toll Comes Due`,cond:()=>G.flags.raiderAlly,once:true,w:22,
 text:`The gang you joined wants its share. They come for it in daylight, polite and armed: a good portion of your food, or a favor from you that you won't like.`,
 choices:[
  {label:`Pay your share`,sub:`Stay in the crew.`,cost:{food:3},out:{text:`You count it out in silence. They nod like accountants and leave you a box of shells for your trouble.`,ammo:2,order:-1}},
  {label:`Break with the gang`,sub:`Nobody leaves for free.`,check:{stat:'charisma',dc:10},
   win:{text:`They shrug. Nobody stops you, though nobody says goodbye either.`,unflag:'raiderAlly',flag:'raiderTruce',humanity:6,morale:5},
   lose:{text:`They don't take it well.`,unflag:'raiderAlly',flag:'raiderEnemy',hp:-12,ammo:-2}}
 ]});
add({id:'raider_revenge',title:`Payback`,cond:()=>G.flags.raiderEnemy,once:true,w:22,
 text:`Six of them are on the road at dusk, and this time they aren't asking. One is wearing something that used to be yours.`,
 choices:[
  {label:`Ambush them first`,sub:`Strike from the dark.`,check:{stat:'stealth',dc:10},
   win:{text:`They never see it coming. It's over quickly, and you're left with their supplies and a hollow feeling.`,unflag:'raiderEnemy',ammo:3,food:2,morale:5,humanity:-4},
   lose:{text:`They saw you coming from a mile away.`,hp:-22,food:-2,morale:-6}},
  {label:`Buy them off`,sub:`Food and pride.`,cost:{food:3},out:{text:`You buy a truce with more food than you can spare. They leave without looking back, and neither do you.`,unflag:'raiderEnemy',flag:'raiderTruce',morale:-4}}
 ]});
add({id:'fork_leader',title:`They Look To You`,cond:()=>G.p.group.length>=2&&G.w.day>=T(6)&&!G.flags.leader,once:true,w:14,
 text:`Three arguments in one week. Nobody says it out loud, but everyone in the group is waiting for somebody to decide things.`,
 choices:[
  {label:`Take the lead`,sub:`Decide, and own the results.`,check:{stat:'charisma',dc:9,bg:{politician:3,teacher:2,soldier:2}},
   win:{text:`You call a meeting and end it with a plan. Not everyone loves it. Everyone follows it.`,flag:'leader',morale:8,loyAll:1},
   lose:{text:`You try to take charge and it comes out wrong. Some listen. Some don't.`,morale:-5,loyAll:-1}},
  {label:`Insist on a vote every time`,sub:`Slower. Fairer.`,out:{text:`Every decision now takes an hour. Nobody feels ignored.`,morale:3,loyAll:1,humanity:3}}
 ]});

/* ---------- different kinds of danger, so the dead never feel repeated ---------- */
add({id:'z_hospital',wild:true,title:`The Hospital`,cond:()=>G.w.outbreak>=25,once:true,w:12,
 text:`The hospital is half-standing, its emergency doors crushed open. Somewhere inside there is real medicine. Between here and there: a lobby full of shapes.`,
 choices:[
  {label:`Slip in for the pharmacy`,sub:`Quiet feet, quick hands.`,check:{stat:'stealth',dc:10,danger:true,bg:{doctor:2}},
   win:{text:`Past the reception desk, down a stairwell, through a door marked STAFF. The pharmacy is untouched.`,meds:3,morale:2},
   lose:{text:`A gurney rattles. The lobby wakes.`,hp:-15,inf:15}},
  {label:`Lure them out with noise`,sub:`Slower, cleverer.`,check:{stat:'wits',dc:9,danger:true},
   win:{text:`A car alarm in the parking structure pulls the whole lobby outside. The back door is unguarded, and so is the pharmacy.`,meds:2,food:1,outbreak:1},
   lose:{text:`The noise draws more than you wanted.`,hp:-10,inf:8,outbreak:2}}
 ]});
add({id:'z_gas',wild:true,title:`The Gas Station`,cond:()=>G.w.outbreak>=20,once:true,w:10,
 text:`A gas station stands alone at a crossroads, its windows intact. Two figures shamble in the forecourt, kicking at nothing.`,
 choices:[
  {label:`Take them one at a time`,sub:`Quick and quiet.`,check:{stat:'strength',dc:9,danger:true,bg:{soldier:2}},
   win:{text:`Quick and quiet, then a proper look around: water, snacks, a working map on the wall.`,water:2,food:2,flag:'map'},
   lose:{text:`The second one is stronger than the first.`,hp:-12,inf:12}},
  {label:`Burn the forecourt`,sub:`Loud, bright, and final.`,check:{stat:'wits',dc:9,danger:true,bg:{firefighter:2,mechanic:1}},
   win:{text:`The pumps go up like a fireworks display, and nothing comes out of it alive. In the shop, everything is smoked and edible.`,food:3,water:2,outbreak:1},
   lose:{text:`The fire spreads faster than you planned.`,hp:-18,morale:-4}}
 ]});
add({id:'z_river',wild:true,title:`The River Crossing`,cond:()=>G.w.outbreak>=25,once:true,w:10,
 text:`The only bridge is jammed with cars and worse. Below it, the river runs brown and fast.`,
 choices:[
  {label:`Wade across`,sub:`Cold, fast, and now.`,check:{stat:'stamina',dc:9,danger:true},
   win:{text:`Cold to your chest, current at your legs, and a handhold that isn't there. Then dry land.`,morale:3},
   lose:{text:`The current takes your pack and nearly takes you.`,hp:-12,food:-2}},
  {label:`Build a raft`,sub:`Slower. Drier.`,check:{stat:'wits',dc:10,bg:{mechanic:2}},
   win:{text:`Drums, planks, and a lot of rope. It floats. Just.`,morale:5},
   lose:{text:`The raft comes apart in the middle.`,hp:-8,food:-1,morale:-4}}
 ]});
add({id:'z_dogs',wild:true,title:`The Pack`,cond:()=>G.w.outbreak>=30,once:true,w:10,
 text:`A pack of dogs that used to belong to people has found you. They aren't infected. They're just very hungry, and there are nine of them.`,
 choices:[
  {label:`Stand still and stay calm`,sub:`Don't run. Never run.`,check:{stat:'wits',dc:8},
   win:{text:`You breathe, you don't run, and one by one they lose interest.`,morale:2},
   lose:{text:`They test you, and one of them tests harder than the rest.`,hp:-15,inf:10}},
  {label:`Throw them food`,sub:`A meal for a way out.`,cost:{food:1},out:{text:`They fall on it, and you back away very slowly.`,morale:-1}}
 ]});

/* ---------- small stories ---------- */
add({id:'f_storm',title:`The Storm`,cond:()=>G.w.day>=T(3),once:true,w:8,
 text:`The sky goes green, then black. Wind flattens the grass. You have minutes to decide between hiding and pushing on.`,
 choices:[
  {label:`Shelter in a culvert`,sub:`Wet, cramped, out of the wind.`,check:{stat:'wits',dc:7},
   win:{text:`You wait it out ankle-deep in cold water, listening to the world being rearranged. By dawn it's over.`,morale:2,hp:4},
   lose:{text:`The culvert floods faster than you expected. You climb out half-drowned, and nothing stays dry.`,hp:-8,food:-1}},
  {label:`Push on through it`,sub:`Rain covers your tracks, and your noise.`,check:{stat:'stamina',dc:10},
   win:{text:`You cross a mile of open country while the dead keep their heads down. In the ruins of a shed, you find dry stores.`,food:2,water:2},
   lose:{text:`Hail, mud, and a fall you'll feel for a week.`,hp:-15,morale:-4}}
 ]});
add({id:'f_dog',title:`A Stray Dog`,cond:()=>G.w.day>=T(3),once:true,w:8,
 text:`A dog has been following you at twenty paces, thin, watchful, careful. It stops when you stop.`,
 choices:[
  {label:`Feed it`,sub:`One small meal. One big decision.`,cost:{food:1},out:{text:`It eats like it has forgotten what food is, then lies down beside you. By morning it's your dog, and it hears everything.`,join:{name:'Rex',trait:`A stray dog, alert to every sound`,role:'scout'},morale:6}},
  {label:`Shoo it away`,sub:`You can't feed everyone.`,out:{text:`It looks at you for a long moment, then trots off. It's a small loss, and you feel it anyway.`,morale:-2}}
 ]});
add({id:'f_letter',title:`A Letter`,cond:()=>G.w.day>=T(4),once:true,w:8,
 text:`A dead man sits against a wall with a letter pinned under his hand. It's addressed to his daughter, three towns north. It asks whoever finds it to carry it, and to tell her he kept walking.`,
 choices:[
  {label:`Carry it there`,sub:`Out of your way. Very out of your way.`,check:{stat:'stamina',dc:8},
   win:{text:`A girl reads it on a porch, folds it very small, and gives you everything she has: a bag of dried apples and a hug you are not ready for.`,humanity:8,morale:6,food:2},
   lose:{text:`The town is empty. You push the letter under a door and leave with nothing but blisters.`,hp:-6,morale:-2,humanity:3}},
  {label:`Leave it where it is`,sub:`You have your own road.`,out:{text:`He kept walking. That will have to be enough.`,humanity:-3}}
 ]});
add({id:'f_piano',title:`Music in the Ruins`,cond:()=>G.w.day>=T(3),once:true,w:8,
 text:`Somewhere inside a ruined shopping mall, someone is playing a piano. Badly, and with total commitment.`,
 choices:[
  {label:`Stay and listen`,sub:`It costs nothing. It might cost everything.`,check:{stat:'stealth',dc:8},
   win:{text:`You sit on the stairs in the dark until the last note. It's the best hour of the year.`,morale:12,humanity:2},
   lose:{text:`The music was noise, and noise was a dinner bell.`,hp:-10,inf:6,morale:3,outbreak:2}},
  {label:`Move on quietly`,sub:`Some things aren't for you.`,out:{text:`You leave it behind. It follows you for miles.`,morale:-2}}
 ]});

/* ---------- pairs (exactly two options per question) and repeat limits ---------- */
const PAIRS={open_usa:[0,1],open_brazil:[0,2],open_uk:[0,1],open_japan:[1,2],open_canada:[0,2],open_israel:[0,2],open_australia:[0,1],
 arc_usa:[0,1],arc_brazil:[0,2],arc_uk:[0,2],arc_japan:[0,1],arc_canada:[0,2],arc_israel:[0,1],arc_australia:[0,1],
 walker:[0,1],horde:[0,1],stranger:[0,2],mara_return:[0,1],mara_gone:[0,1],bitten:[1,3],raiders:[0,1],radio:[0,2],
 safezone:()=>(G.flags.guardContact||G.flags.militaryContact)?[0,2]:[0,1],
 fever:[0,1],quiet_night:[0,2],abandoned_car:[0,1],smoke:[0,2],school:[1,2],wounded_soldier:[1,2],checkpoint:[0,1],gate_outbreak:[0,1],
 looter_retribution:[0,1],group_argument:[0,1],supply_drop:[0,1],year_review:()=>G.cur.ctx.pair,winter:[0,1],planting:[0,2],trader:[1,2],
 bad_water:[0,2],researcher:[0,3],rebuild:()=>(G.p.bg==='mechanic'||G.p.bg==='firefighter')?[0,1]:[0,3],
 settle_council:[0,1],settle_breach:[0,1],caravan:[0,2],child:[0,1],road_gang:[0,1]};
for(const k in PAIRS)if(EVMAP[k])EVMAP[k].pair=PAIRS[k];
const MAXES={raiders:2,trader:2,bad_water:2,winter:2,fever:2,radio:2,caravan:2,quiet_night:3};
for(const k in MAXES)if(EVMAP[k])EVMAP[k].max=MAXES[k];
EVMAP.year_review.pre=()=>{const a=[0,1,2,3,4];for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return{pair:[a[0],a[1]]};};
