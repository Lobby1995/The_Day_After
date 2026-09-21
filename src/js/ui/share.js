
/* ---------- sharing the end screen ----------
 * A card (an image drawn on a canvas), a line of text, and three ways out: the phone's own share sheet, copy, or save the picture.
 */
const SHARE_HOME='https://lobby1995.github.io/The_Day_After/';
function shareUrl(){try{if(/^https?:/.test(location.href))return location.origin+location.pathname;}catch(e){}return SHARE_HOME;}

/* everything the card and the text say, in one place */
function shareData(){
  const o=G.over,p=G.p,w=G.w;
  const yrs=o.type==='survived'?ROADS[G.cfg.road].years:((w.day-1)*G.mpt/12);
  const y=(Math.round(yrs*10)/10).toString();
  const pts=(G.earned?G.earned.total:0)+(G.earnedExtra||0);
  return{
    name:p.name,who:`${bgN(p.bg,p.sex)} \u00b7 ${locName(p.loc)}`,
    outcome:t(o.type==='survived'?'shareSurvived':o.type==='turned'?'shareTurned':'shareDied',y),type:o.type,
    years:y,decisions:G.log.length,humanity:p.humanity,group:p.group.length,points:pts,url:shareUrl()
  };
}
function shareText(){
  const d=shareData();
  return t('shareLine',d.name,d.who,d.outcome,d.humanity,d.group,d.points,d.url);
}

/* the card. portrait, the game's own colors, the character as they ended */
function drawShareCard(cv){
  const ctx=cv.getContext&&cv.getContext('2d');if(!ctx)return;
  const d=shareData(),he=LANG==='he',W=cv.width,H=cv.height;
  const C={bg:'#141414',surface:'#1f1f1f',border:'#3a3a3a',primary:'#4a5320',primaryH:'#5c6628',secondary:'#8c7b65',accent:'#c27803',text:'#e0e0e0',muted:'#888888'};
  const font=he?"'Rubik','Heebo',Arial,sans-serif":"'Special Elite','Courier New',monospace";
  const align=he?'right':'left',X=he?W-70:70;
  const T=(s,x,y,size,color,weight,al)=>{ctx.font=`${weight||400} ${size}px ${font}`;ctx.fillStyle=color;ctx.textAlign=al||align;ctx.direction=he?'rtl':'ltr';ctx.fillText(s,x,y);};
  ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H);
  /* hazard tape along the top */
  for(let x=-60;x<W+60;x+=70){ctx.fillStyle=C.accent;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+40,0);ctx.lineTo(x+40-30,44);ctx.lineTo(x-30,44);ctx.closePath();ctx.fill();}
  ctx.fillStyle='#000';ctx.fillRect(0,44,W,4);
  ctx.strokeStyle=C.border;ctx.lineWidth=6;ctx.strokeRect(20,20,W-40,H-40);
  T(he?'ימים אחרי':'DAYS AFTER',X,190,he?120:104,C.text,700);
  T(d.name,X,290,68,C.accent,700);
  T(d.who,X,346,34,C.secondary,400);
  /* the survivor, painted the way the game paints them */
  try{
    const tmp=document.createElement('canvas');tmp.width=24;tmp.height=48;
    spriteToCanvas(tmp,sprGame());
    ctx.imageSmoothingEnabled=false;
    const sx=he?70:W-70-240;
    ctx.fillStyle=C.surface;ctx.fillRect(sx-16,384,272,512);ctx.strokeStyle=C.border;ctx.lineWidth=4;ctx.strokeRect(sx-16,384,272,512);
    ctx.drawImage(tmp,sx,400,240,480);
  }catch(e){}
  /* the result */
  const band=d.type==='survived'?C.primaryH:d.type==='turned'?C.secondary:C.accent;
  ctx.fillStyle=band;ctx.fillRect(70,he?924:924,W-140,96);
  T(d.outcome,W/2,988,44,'#141414',700,'center');
  /* the numbers */
  const rows=[[t('shareYears'),d.years],[t('shareDecisions'),d.decisions],[t('shareHumanity'),d.humanity+'%'],[t('shareGroup'),d.group],[t('sharePoints'),'+'+d.points]];
  const colX=he?W-70-300:70+310,labX=he?W-70-320:70;
  rows.forEach((r,i)=>{const y=420+i*98;
    T(r[1],he?70+250:70,y,64,C.text,700,he?'left':'left');
    T(r[0],he?W-70-272-40:70,y+40,28,C.muted,400,he?'right':'left');
  });
  T(d.url.replace(/^https?:\/\//,''),W/2,H-70,30,C.muted,400,'center');
  T(t('shareTag'),W/2,H-112,34,C.secondary,400,'center');
}

function showShare(){
  const txt=shareText();
  const canShare=!!(typeof navigator!=='undefined'&&navigator.share);
  $('modal').innerHTML=`<div class="modal"><div class="dlg sharedlg" role="dialog" aria-modal="true"><h3>${t('shareH')}</h3>
    <canvas id="shareCv" class="sharecv" width="1080" height="1350" aria-label="${esc(t('shareH'))}"></canvas>
    <textarea id="shareTxt" class="sharetxt" readonly rows="4">${esc(txt)}</textarea>
    <div class="row">${canShare?`<button class="btn primary" data-act="shareNative">${t('shareNative')}</button>`:''}<button class="btn${canShare?'':' primary'}" data-act="shareCopy">${t('shareCopy')}</button><button class="btn" data-act="shareSave">${t('shareSave')}</button><button class="btn ghost" data-act="mCancel">${t('shareClose')}</button></div>
    <p class="small" id="shareNote" role="status"></p></div></div>`;
  const cv=$('shareCv');try{drawShareCard(cv);}catch(e){}
}
const shareNote=k=>{const n=$('shareNote');if(n)n.textContent=k?t(k):'';};
function copyShare(){
  const txt=shareText();
  const done=()=>shareNote('shareCopied');
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,()=>{fallbackCopy();});return;}}catch(e){}
  fallbackCopy();
  function fallbackCopy(){try{const ta=$('shareTxt');ta.select();document.execCommand('copy');done();}catch(e){}}
}
function saveShareImage(){
  const cv=$('shareCv');
  try{cv.toBlob(b=>{if(!b)return;const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='days-after.png';document.body.appendChild(a);a.click();a.remove();shareNote('shareSaved');},'image/png');}catch(e){}
}
async function nativeShare(){
  const d=shareData(),data={title:t('brand'),text:shareText(),url:d.url};
  try{
    const cv=$('shareCv');
    if(cv&&cv.toBlob&&navigator.canShare){
      const blob=await new Promise(r=>cv.toBlob(r,'image/png'));
      if(blob){const file=new File([blob],'days-after.png',{type:'image/png'});if(navigator.canShare({files:[file]}))data.files=[file];}
    }
    await navigator.share(data);
  }catch(e){}
}
