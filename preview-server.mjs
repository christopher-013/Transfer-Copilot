import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root=path.resolve("dist");
const server=http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname)}catch{res.writeHead(400);return res.end()}
const file=path.resolve(root,"."+pathname+(pathname.endsWith("/")?"index.html":""));
if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);return res.end("Not found")}const ext=path.extname(file);res.writeHead(200,{"Content-Type":({".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"})[ext]||"application/octet-stream","Cache-Control":"no-store"});res.end(data)})});
server.listen(4173,"127.0.0.1",()=>console.log("Local: http://127.0.0.1:4173/"));

