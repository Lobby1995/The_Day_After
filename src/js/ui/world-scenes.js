
/* ---------- the world view: places ----------
 * A place is a small map. Every character in a row is one tile:
 *   #  wall      %  tall building     Y  tree      .  floor        @  where you come in     X  where the question waits
 *   T table   K desk   C chair   B bed   S shelf   M machine   V vehicle   O operating table   L lamp   F fire barrel
 *   J boat   Z train car   E crate   N podium   I board   A tent   Q counter   U sofa or armchair   G sandbags   P plant   R rock   g low parapet
 *   w water (cannot be walked on)   r rug and = rails (both walkable)
 * Back walls are on the first row and column, so the front of the room is open and you can see inside.
 */
const WSCENES={};
function wScene(id,o){WSCENES[id]=Object.assign({id,npcs:[],weather:null,tint:null},o);}
const WFLOOR={
  dock:['#4d4232','#453b2d'],
  wood:['#4a3f30','#42382b'],tile:['#353a3f','#2f3439'],concrete:['#343434','#2e2e2e'],carpet:['#3d4523','#373f20'],
  road:['#282828','#2c2c2c'],grass:['#39461f','#33401c'],dirt:['#4a3f2c','#443a28']
};

/* --- the moment: one room for each profession --- */
wScene('room_student',{name:['The Hallway','המסדרון'],floor:'carpet',map:[
 '############',
 '#..I..I..I..',
 '#...........',
 '#.KC..KC.KC.',
 '#...........',
 '#.KC..KC.KC.',
 '#...........',
 '#.KC..KC..X.',
 '#@..........'],
 npcs:[{x:5,y:4,bg:'student',sex:'f',age:22,skin:1,seed:3,face:'l'},{x:9,y:2,bg:'student',sex:'m',age:24,skin:0,seed:8,face:'l'}]});
wScene('room_teacher',{name:['The Classroom','הכיתה'],floor:'wood',map:[
 '############',
 '#..IIIIII...',
 '#...........',
 '#.KC.KC.KC..',
 '#...........',
 '#.KC.KC.KC..',
 '#...........',
 '#.KC.KC.KC.X',
 '#@..........'],
 npcs:[{x:10,y:7,bg:'mechanic',sex:'m',age:41,skin:1,seed:5,face:'r'}]});
wScene('room_soldier',{name:['The Barracks','המגורים'],floor:'concrete',map:[
 '############',
 '#BB.BB.BB...',
 '#...........',
 '#E.........E',
 '#...........',
 '#BB.BB.BB...',
 '#...........',
 '#E.......X..',
 '#@..........'],
 npcs:[{x:8,y:7,bg:'soldier',sex:'m',age:45,skin:2,seed:2,face:'r'}]});
wScene('room_doctor',{name:['The Theatre','חדר הניתוח'],floor:'tile',map:[
 '############',
 '#.M.S..S.M..',
 '#...........',
 '#....LL.....',
 '#....OO..X..',
 '#...........',
 '#..E.....E..',
 '#...........',
 '#@..........'],
 npcs:[{x:8,y:4,bg:'doctor',sex:'f',age:38,skin:0,seed:9,face:'l'}]});
wScene('room_politician',{name:['The Meeting Room','חדר הישיבות'],floor:'wood',map:[
 '############',
 '#.S.......S.',
 '#..C.C.C.C..',
 '#..TTTTTT...',
 '#..TTTTTT...',
 '#..C.CXC.C..',
 '#...........',
 '#...........',
 '#@..........'],
 npcs:[{x:4,y:6,bg:'politician',sex:'m',age:52,skin:0,seed:4,face:'r'},{x:9,y:6,bg:'politician',sex:'f',age:47,skin:2,seed:6,face:'l'}]});
wScene('room_journalist',{name:['The Briefing','מסיבת העיתונאים'],floor:'wood',map:[
 '############',
 '#..IIIIII...',
 '#.....N.....',
 '#.....X.....',
 '#..C.C.C.C..',
 '#...........',
 '#..C.C.C.C..',
 '#.M.......M.',
 '#@..........'],
 npcs:[{x:8,y:2,bg:'politician',sex:'m',age:50,skin:1,seed:7,face:'l'}]});
wScene('room_firefighter',{name:['The Station','תחנת הכיבוי'],floor:'concrete',map:[
 '############',
 '#..S....S...',
 '#...........',
 '#..VVVV.....',
 '#..VVVV..L..',
 '#...........',
 '#E.........E',
 '#.....X.....',
 '#@..........'],
 npcs:[{x:8,y:7,bg:'firefighter',sex:'m',age:48,skin:1,seed:11,face:'l'}]});
wScene('room_mechanic',{name:['The Garage','המוסך'],floor:'concrete',map:[
 '############',
 '#S.S.....MM.',
 '#...........',
 '#..VV....E..',
 '#..VV.......',
 '#...........',
 '#E.......X..',
 '#...........',
 '#@..........'],
 npcs:[{x:8,y:6,bg:'mechanic',sex:'m',age:55,skin:1,seed:12,face:'r'}]});

/* --- the people: what your age puts on your shoulders --- */
wScene('home_young',{name:['Your Room','החדר שלך'],floor:'wood',map:[
 '############',
 '#BB....SSS..',
 '#...........',
 '#...........',
 '#..K.......P',
 '#..X........',
 '#...........',
 '#....rr.....',
 '#@..........']});
wScene('home_mid',{name:['The Kitchen','המטבח'],floor:'tile',map:[
 '############',
 '#SS.QQQQ....',
 '#...........',
 '#...TT......',
 '#...CX.C....',
 '#...........',
 '#.UU.....P..',
 '#...........',
 '#@..........']});
wScene('home_old',{name:['The Living Room','חדר המגורים'],floor:'carpet',map:[
 '############',
 '#..SS...SS..',
 '#...........',
 '#..UL.......',
 '#..X........',
 '#...........',
 '#.....TT....',
 '#...........',
 '#@..........']});

/* --- everywhere else --- */
wScene('street',{outdoor:true,name:['The Street','הרחוב'],floor:'road',map:[
 '%%%%%%%%%%%%',
 '%.E.......G.',
 '%...V..F....',
 '%...........',
 '%..L....V...',
 '%...........',
 '%.....X.....',
 '%...F......L',
 '%@..........']});
wScene('shop',{name:['The Store','החנות'],floor:'tile',map:[
 '############',
 '#SSSSSS.SSS.',
 '#...........',
 '#.SSSS..SSS.',
 '#...........',
 '#.QQQQ..E.E.',
 '#.....X.....',
 '#...........',
 '#@..........']});
wScene('camp',{outdoor:true,name:['The Camp','המחנה'],floor:'dirt',map:[
 'YYYYYYYYYYYY',
 'Y..A..A..A..',
 'Y...........',
 'Y....F......',
 'Y..E....E...',
 'Y.....X.....',
 'Y...........',
 'Y..A........',
 'Y@..........']});
wScene('wild',{outdoor:true,name:['The Road','הדרך'],floor:'grass',map:[
 'YYYYYYYYYYYY',
 'Y....R...Y..',
 'Y..Y........',
 'Y.......R...',
 'Y..V........',
 'Y...........',
 'Y.....X.....',
 'Y.R.....Y...',
 'Y@..........']});


/* --- more places, so the setting follows the text --- */
wScene('hospital',{name:['The Ward','המחלקה'],floor:'tile',map:[
 '############',
 '#B..B..B..M.',
 '#...........',
 '#B..B..B....',
 '#...........',
 '#..QQQ...S..',
 '#.....X.....',
 '#..........M',
 '#@..........'],
 npcs:[{x:7,y:6,bg:'doctor',sex:'f',age:36,skin:2,seed:14,face:'l'}]});
wScene('church',{grow:[1,1],name:['The Chapel','הקפלה'],floor:'wood',map:[
 '############',
 '#....NN.....',
 '#...L..L....',
 '#...........',
 '#.CC.CC.CC..',
 '#...........',
 '#.CC.CC.CC..',
 '#.....X.....',
 '#@..........'],
 npcs:[{x:6,y:2,bg:'politician',sex:'m',age:63,skin:1,seed:15,face:'l'}]});
wScene('station',{outdoor:true,name:['The Platform','הרציף'],floor:'concrete',map:[
 '############',
 '#.ZZZZZZ....',
 '#==========.',
 '#...........',
 '#.C.C....C.L',
 '#...........',
 '#.S......L..',
 '#.....X.....',
 '#@..........']});
wScene('farm',{outdoor:true,name:['The Farm','החווה'],floor:'dirt',map:[
 'YYYYYYYYYYYY',
 'Y.EEE..AA...',
 'Y...........',
 'Y..G.G.G.G..',
 'Y...........',
 'Y.....P.....',
 'Y.EE....Y...',
 'Y.....X.....',
 'Y@..........'],
 npcs:[{x:9,y:5,bg:'mechanic',sex:'f',age:58,skin:0,seed:16,face:'l'}]});
wScene('harbor',{outdoor:true,name:['The Harbor','הנמל'],floor:'dock',map:[
 'wwwwwwwwwwww',
 'w.EE..E..JJ.',
 'w...........',
 'w.G.....G...',
 'w...........',
 'w..EE...L...',
 'w...........',
 'w.....X.....',
 'w@..........']});
wScene('rooftop',{outdoor:true,name:['The Roof','הגג'],floor:'concrete',map:[
 'gggggggggggg',
 'g.M....L.E..',
 'g...........',
 'g.E.....M...',
 'g...........',
 'g...L.......',
 'g.....X.....',
 'g.....E.....',
 'g@..........']});
wScene('basement',{name:['The Cellar','המרתף'],floor:'concrete',tint:'rgba(0,0,0,.28)',map:[
 '############',
 '#SS.EE.FF.S.',
 '#...........',
 '#B..........',
 '#B....TT....',
 '#...........',
 '#E.......E..',
 '#.....X.....',
 '#@..........'],
 npcs:[{x:8,y:6,bg:'teacher',sex:'f',age:49,skin:1,seed:17,face:'l'}]});
wScene('checkpoint',{outdoor:true,name:['The Checkpoint','המחסום'],floor:'road',map:[
 '%%%%%%%%%%%%',
 '%..........G',
 '%.G.G.G.G.G.',
 '%...V....V..',
 '%...........',
 '%.GGGG..GGG.',
 '%.....X.....',
 '%..N.....N..',
 '%@..........'],
 npcs:[{x:7,y:6,bg:'soldier',sex:'m',age:34,skin:2,seed:18,face:'l'}]});
wScene('gasstation',{outdoor:true,name:['The Gas Station','תחנת הדלק'],floor:'road',map:[
 '############',
 '#QQQQ...SS..',
 '#...........',
 '#..M..M..M..',
 '#...........',
 '#..M..M..M..',
 '#...V.......',
 '#.....X.....',
 '#@.......V..']});
wScene('warehouse',{name:['The Warehouse','המחסן'],floor:'concrete',map:[
 '############',
 '#SSSS.SSSS..',
 '#...........',
 '#.EE.EE.EE..',
 '#.EE.EE.EE..',
 '#...........',
 '#V.......E..',
 '#.....X.....',
 '#@..........']});
wScene('cabin',{name:['The Cabin','הבקתה'],floor:'wood',tint:'rgba(60,30,10,.16)',map:[
 '############',
 '#SS....BB...',
 '#...........',
 '#....rrrr...',
 '#.F..rrrr.C.',
 '#...........',
 '#..TT.......',
 '#.....X.....',
 '#@..........']});
wScene('hall',{name:['The Hall','האולם'],floor:'wood',map:[
 '############',
 '#..IIII.....',
 '#...........',
 '#BB.BB.BB.BB',
 '#...........',
 '#BB.BB.BB.BB',
 '#...........',
 '#..TT....X..',
 '#@..........'],
 npcs:[{x:8,y:7,bg:'teacher',sex:'m',age:57,skin:0,seed:19,face:'r'}]});
wScene('market',{outdoor:true,name:['The Market','השוק'],floor:'road',map:[
 '%%%%%%%%%%%%',
 '%.A.A.A.A...',
 '%.Q.Q.Q.Q...',
 '%...........',
 '%..E....E...',
 '%...L...L...',
 '%.....X.....',
 '%..P.....P..',
 '%@..........'],
 npcs:[{x:4,y:3,bg:'mechanic',sex:'f',age:44,skin:3,seed:20,face:'r'}]});
wScene('police',{name:['The Station House','תחנת המשטרה'],floor:'tile',map:[
 '############',
 '#SS...SS.II.',
 '#..........I',
 '#.KC..KC....',
 '#...........',
 '#.QQQQ......',
 '#...........',
 '#.....X.....',
 '#@..........']});

/* what the country looks like from the street */
const WWEATHER={
  usa:{tint:'rgba(120,40,10,.20)',fx:'embers'},brazil:{tint:'rgba(90,50,10,.16)',fx:null},uk:{tint:'rgba(20,30,50,.30)',fx:'rain'},
  japan:{tint:'rgba(70,20,80,.20)',fx:null},canada:{tint:'rgba(120,150,190,.14)',fx:'snow'},israel:{tint:'rgba(150,90,20,.14)',fx:null},australia:{tint:null,fx:null}
};

/* which place a question happens in: chosen by what the question is about.
   the prologue and the profession arcs have rooms of their own; everything else is placed by name below, and anything unnamed is the street. */
const WPLACE={
  /* country arcs */
  us_1:'street',us_2:'checkpoint',us_3:'wild',us_4:'gasstation',us_5:'wild',us_6:'harbor',
  br_1:'rooftop',br_2:'rooftop',br_3:'basement',br_4:'street',br_5:'checkpoint',br_6:'harbor',
  uk_1:'checkpoint',uk_2:'station',uk_3:'checkpoint',uk_4:'farm',uk_5:'farm',uk_6:'farm',
  jp_1:'hall',jp_2:'hall',jp_3:'hall',jp_4:'hall',jp_5:'harbor',jp_6:'harbor',
  ca_1:'harbor',ca_2:'camp',ca_3:'checkpoint',ca_4:'camp',ca_5:'wild',ca_6:'wild',
  il_1:'basement',il_2:'basement',il_3:'basement',il_4:'basement',il_5:'basement',il_6:'harbor',
  au_1:'market',au_2:'farm',au_3:'wild',au_4:'farm',au_5:'station',au_6:'harbor',
  arc_usa:'street',arc_brazil:'rooftop',arc_uk:'street',arc_japan:'station',arc_canada:'checkpoint',arc_israel:'street',arc_australia:'market',
  /* country events */
  c_usa_1:'hall',c_usa_2:'checkpoint',c_usa_3:'church',c_usa_4:'shop',c_usa_5:'checkpoint',
  c_br_1:'rooftop',c_br_2:'street',c_br_3:'market',c_br_4:'hospital',c_br_5:'street',
  c_uk_1:'street',c_uk_2:'church',c_uk_3:'checkpoint',c_uk_4:'gasstation',c_uk_5:'basement',
  c_jp_1:'street',c_jp_2:'home_mid',c_jp_3:'station',c_jp_4:'church',c_jp_5:'harbor',
  c_ca_1:'wild',c_ca_2:'hall',c_ca_3:'wild',c_ca_4:'cabin',c_ca_5:'camp',
  c_il_1:'basement',c_il_2:'market',c_il_3:'checkpoint',c_il_4:'wild',c_il_5:'rooftop',
  c_au_1:'camp',c_au_2:'gasstation',c_au_3:'wild',c_au_4:'harbor',c_au_5:'hospital',
  /* everyday events */
  walker:'street',horde:'street',stranger:'home_mid',mara_return:'home_mid',mara_gone:'wild',bitten:'hospital',raiders:'checkpoint',radio:'rooftop',
  safezone:'checkpoint',fever:'hospital',quiet_night:'camp',abandoned_car:'wild',smoke:'rooftop',school:'room_teacher',wounded_soldier:'hospital',
  checkpoint:'checkpoint',gate_outbreak:'checkpoint',looter_retribution:'street',group_argument:'camp',supply_drop:'warehouse',year_review:'camp',
  winter:'cabin',planting:'farm',trader:'market',bad_water:'farm',researcher:'hospital',rebuild:'camp',settle_council:'hall',settle_breach:'checkpoint',
  caravan:'market',child:'camp',road_gang:'wild',fork_base:'camp',siege:'checkpoint',road_ambush:'wild',fork_raiders:'checkpoint',raider_tribute:'checkpoint',
  raider_revenge:'street',fork_leader:'camp',z_hospital:'hospital',z_gas:'gasstation',z_river:'harbor',z_dogs:'street',f_storm:'cabin',f_dog:'street',
  f_letter:'home_mid',f_piano:'church',
  loot_farm:'farm',loot_pharmacy:'shop',loot_police:'police',loot_garage:'room_mechanic',loot_camp:'camp',loot_ambulance:'hospital',loot_warehouse:'warehouse',
  g_mission:'street',g_sick:'camp',g_sacrifice:'camp',g_theft:'camp',g_leave:'camp',g_recruit:'camp',g_bond:'camp',
  /* armed encounters and dilemmas */
  arm_hunt:'wild',arm_dogs:'wild',arm_breach:'checkpoint',arm_roof:'rooftop',arm_sniper:'street',arm_toll:'checkpoint',arm_watch:'farm',
  dil_cache:'wild',dil_two:'shop',dil_dose:'basement',dil_promise:'wild',dil_fire:'wild',
  /* echoes of earlier choices */
  echo_barricaded:'home_mid',echo_sealed:'home_mid',echo_waited:'street',echo_rooftop:'rooftop',echo_borderAlly:'checkpoint',echo_keptGate:'checkpoint',
  echo_guardContact:'checkpoint',echo_militaryContact:'room_soldier',echo_countryside:'farm',echo_cabin:'cabin',echo_car:'wild',echo_savedFriend:'camp',
  echo_walkedHome:'home_old',echo_inland:'farm',echo_garden:'farm',echo_newborn:'hospital',echo_fallen:'camp'
};
function worldSceneId(evId){
  const id=evId||(G.cur&&G.cur.id)||'';
  if(/^pro_age_/.test(id))return['home_young','home_mid','home_old'][+id.slice(-1)]||'home_mid';
  if(/^pro_/.test(id)&&WSCENES['room_'+id.slice(4)])return'room_'+id.slice(4);
  /* a profession's own chapters happen in that profession's world */
  const bgArc={st_:'room_student',te_:'room_teacher',so_:'room_soldier',po_:'room_politician',jo_:'room_journalist',ff_:'room_firefighter',me_:'room_mechanic',doc_:'hospital'};
  const pre=id.slice(0,3);if(bgArc[pre])return bgArc[pre];
  if(bgArc[id.slice(0,4)])return bgArc[id.slice(0,4)];
  const pm=id.match(/^pair_(student|teacher|soldier|politician|journalist|firefighter|mechanic|doctor|doc)_/);
  if(pm)return pm[1]==='doctor'||pm[1]==='doc'?'hospital':'room_'+pm[1];
  if(/^cs_/.test(id))return'camp';
  if(/^open_/.test(id))return'street';
  if(/^echo_dil/.test(id))return'wild';
  return WPLACE[id]||'street';
}

/* ---------- how many zombies, and why ----------
 * None until the outbreak has really begun in that country (a quiet start in Israel, Australia, Canada); they grow with the outbreak.
 * The first minutes of the story are kept clear, except where the country is already falling apart (the United States).
 * The scene changes it (streets are worse than a rooftop), and events about zombies always have some.
 */
const WZ_PLACE={street:1,wild:1,checkpoint:1,gasstation:1,market:1,station:1,hospital:1,harbor:0,warehouse:0,shop:0,police:0,church:0,hall:0,farm:0,basement:0,rooftop:-1,camp:-1,cabin:-2,home_young:-2,home_mid:-2,home_old:-2};
const WZ_EVENT={horde:4,siege:3,gate_outbreak:3,arm_breach:3,arm_roof:2,walker:1,z_hospital:2,z_gas:2,z_river:1,z_dogs:1,bitten:1,arm_dogs:1};
const WZ_CALM=/^(dil_|echo_dil|f_|cs_|g_|year_review|quiet_night|child|planting|rebuild|trader|caravan|settle_council|fork_leader|stranger|mara_)/;
function worldZombieCount(evId,sceneId,outbreak){
  const base=Math.max(0,Math.floor((outbreak-20)/14));           // 0 until the outbreak passes about 34%, then one more for every 14
  if(/^pro_/.test(evId))return outbreak>=80?1:0;                  // the first two scenes: only where the country is already falling
  if(/^open_/.test(evId))return Math.min(base,2);                  // the first night
  let n=base>0?base+(WZ_PLACE[sceneId]||0):0;                    // a place changes how bad it is, but it cannot make it start
  if(WZ_CALM.test(evId))n-=2;
  if(WZ_EVENT[evId])n=Math.max(n,WZ_EVENT[evId]);
  return Math.max(0,Math.min(5,n));
}

