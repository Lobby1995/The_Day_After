/* A tiny software stand-in for a 2D canvas: enough to render the world view to a PNG without a browser.
   Supports: fillStyle (#rgb, #rrggbb, rgb(), rgba()), globalAlpha, fillRect, clearRect, paths (moveTo, lineTo, closePath, fill, stroke), and no-op text. */
const zlib=require('zlib');
function crc32(buf){let c,crc=0xffffffff;for(let n=0;n<buf.length;n++){c=(crc^buf[n])&0xff;for(let k=0;k<8;k++)c=c&1?(c>>>1)^0xedb88320:c>>>1;crc=(crc>>>8)^c;}return(crc^0xffffffff)>>>0;}
function parseColor(s){
  if(typeof s!=='string')return[0,0,0,1];
  let m=s.match(/^#([0-9a-f]{3})$/i);if(m){const h=m[1];return[parseInt(h[0]+h[0],16),parseInt(h[1]+h[1],16),parseInt(h[2]+h[2],16),1];}
  m=s.match(/^#([0-9a-f]{6})$/i);if(m){const h=m[1];return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16),1];}
  m=s.match(/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+))?\s*\)$/i);if(m)return[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]];
  return[0,0,0,1];
}
class SoftCtx{
  constructor(w,h){this.width=w;this.height=h;this.data=new Uint8ClampedArray(w*h*4);this.fillStyle='#000';this.strokeStyle='#000';this.lineWidth=1;this.globalAlpha=1;this.path=[];this.font='';this.textAlign='left';this.direction='ltr';this.imageSmoothingEnabled=false;this.ops=0;}
  _px(x,y,c,a){if(x<0||y<0||x>=this.width||y>=this.height)return;const i=(y*this.width+x)*4,d=this.data;const al=a;if(al>=1){d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=255;}else{d[i]=d[i]*(1-al)+c[0]*al;d[i+1]=d[i+1]*(1-al)+c[1]*al;d[i+2]=d[i+2]*(1-al)+c[2]*al;d[i+3]=255;}}
  fillRect(x,y,w,h){this.ops++;const c=parseColor(this.fillStyle),a=c[3]*this.globalAlpha;const x0=Math.round(x),y0=Math.round(y),x1=Math.round(x+w),y1=Math.round(y+h);for(let yy=y0;yy<y1;yy++)for(let xx=x0;xx<x1;xx++)this._px(xx,yy,c,a);}
  clearRect(x,y,w,h){const s=this.fillStyle,g=this.globalAlpha;this.fillStyle='#000';this.globalAlpha=1;this.fillRect(x,y,w,h);this.fillStyle=s;this.globalAlpha=g;}
  beginPath(){this.path=[];this._cur=null;}
  moveTo(x,y){this._cur=[[x,y]];this.path.push(this._cur);}
  lineTo(x,y){if(!this._cur){this.moveTo(x,y);return;}this._cur.push([x,y]);}
  closePath(){if(this._cur&&this._cur.length)this._cur.closed=true;}
  fill(){this.ops++;const c=parseColor(this.fillStyle),a=c[3]*this.globalAlpha;
    this.path.forEach(poly=>{if(poly.length<3)return;let minY=Infinity,maxY=-Infinity;poly.forEach(p=>{minY=Math.min(minY,p[1]);maxY=Math.max(maxY,p[1]);});
      for(let y=Math.floor(minY);y<=Math.ceil(maxY);y++){const yc=y+.5,xs=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length];if((p[1]<=yc&&q[1]>yc)||(q[1]<=yc&&p[1]>yc)){xs.push(p[0]+(yc-p[1])/(q[1]-p[1])*(q[0]-p[0]));}}
        xs.sort((u,v)=>u-v);for(let i=0;i+1<xs.length;i+=2){for(let x=Math.round(xs[i]);x<Math.round(xs[i+1]);x++)this._px(x,y,c,a);}}});}
  stroke(){this.ops++;const c=parseColor(this.strokeStyle),a=c[3]*this.globalAlpha;const w=Math.max(1,Math.round(this.lineWidth));
    this.path.forEach(poly=>{const n=poly.length;for(let i=0;i<(poly.closed?n:n-1);i++){const p=poly[i],q=poly[(i+1)%n];let x0=Math.round(p[0]),y0=Math.round(p[1]);const x1=Math.round(q[0]),y1=Math.round(q[1]);const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let er=dx+dy;for(;;){for(let a2=0;a2<w;a2++)for(let b2=0;b2<w;b2++)this._px(x0+a2,y0+b2,c,a);if(x0===x1&&y0===y1)break;const e2=2*er;if(e2>=dy){er+=dy;x0+=sx;}if(e2<=dx){er+=dx;y0+=sy;}}}});}
  fillText(){this.ops++;}
  save(){}restore(){}
  toPNG(){const w=this.width,h=this.height,raw=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++){raw[y*(w*4+1)]=0;for(let x=0;x<w*4;x++)raw[y*(w*4+1)+1+x]=this.data[y*w*4+x];}
    const chunk=(t,d)=>{const len=Buffer.alloc(4);len.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc32(td));return Buffer.concat([len,td,c]);};
    const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;ihdr[10]=0;ihdr[11]=0;ihdr[12]=0;
    return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);}
}
module.exports={SoftCtx};
