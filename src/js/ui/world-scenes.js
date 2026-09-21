
/* ---------- the world view: places ----------
 * A place is a small map. Every character in a row is one tile:
 *   #  wall      %  tall building     Y  tree      .  floor        @  where you come in     X  where the question waits
 *   T table   K desk   C chair   B bed   S shelf   M machine   V vehicle   O operating table   L lamp   F fire barrel
 *   E crate   N podium   I board   A tent   Q counter   U sofa or armchair   G sandbags   P plant   R rock   r rug (walkable)
 * Back walls are on the first row and column, so the front of the room is open and you can see inside.
 */
const WSCENES={};
function wScene(id,o){WSCENES[id]=Object.assign({id,npcs:[],weather:null,tint:null},o);}
const WFLOOR={
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
wScene('street',{name:['The Street','הרחוב'],floor:'road',map:[
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
wScene('camp',{name:['The Camp','המחנה'],floor:'dirt',map:[
 'YYYYYYYYYYYY',
 'Y..A..A..A..',
 'Y...........',
 'Y....F......',
 'Y..E....E...',
 'Y.....X.....',
 'Y...........',
 'Y..A........',
 'Y@..........']});
wScene('wild',{name:['The Road','הדרך'],floor:'grass',map:[
 'YYYYYYYYYYYY',
 'Y....R...Y..',
 'Y..Y........',
 'Y.......R...',
 'Y..V........',
 'Y...........',
 'Y.....X.....',
 'Y.R.....Y...',
 'Y@..........']});

/* what the country looks like from the street */
const WWEATHER={
  usa:{tint:'rgba(120,40,10,.20)',fx:'embers'},brazil:{tint:'rgba(90,50,10,.16)',fx:null},uk:{tint:'rgba(20,30,50,.30)',fx:'rain'},
  japan:{tint:'rgba(70,20,80,.20)',fx:null},canada:{tint:'rgba(120,150,190,.14)',fx:'snow'},israel:{tint:'rgba(150,90,20,.14)',fx:null},australia:{tint:null,fx:null}
};

/* which place a question happens in */
function worldSceneId(evId){
  const id=evId||(G.cur&&G.cur.id)||'';
  if(/^pro_age_/.test(id))return['home_young','home_mid','home_old'][+id.slice(-1)]||'home_mid';
  if(/^pro_/.test(id)&&WSCENES['room_'+id.slice(4)])return'room_'+id.slice(4);
  if(/^loot_/.test(id))return'shop';
  if(/^(dil_|echo_dil|arm_)/.test(id))return'wild';
  if(G.flags&&(G.flags.base||G.flags.settled)&&/^(cs_|g_|settle|rebuild|winter|planting|trader|caravan|child)/.test(id))return'camp';
  return'street';
}
