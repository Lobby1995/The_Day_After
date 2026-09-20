#!/usr/bin/env node
/* Tiny dev server: rebuilds on every request, so edit a file and refresh the browser. */
const http=require('http');
const {buildHtml}=require('./build');
const port=+process.env.PORT||8080;
http.createServer((req,res)=>{
  try{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(buildHtml());}
  catch(e){res.writeHead(500,{'Content-Type':'text/plain'});res.end(String(e.stack||e));}
}).listen(port,()=>console.log(`http://localhost:${port}  (rebuilds on refresh)`));
