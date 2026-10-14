const C="risk-calc-v3",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png"];
function htmlReq(r){return r.mode==="navigate"||r.destination==="document"||(r.headers.get("accept")||"").indexOf("text/html")!==-1}
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
if(htmlReq(e.request)){
e.respondWith(fetch(e.request).then(res=>{
if(res&&res.ok){var page=res.clone(),root=res.clone();caches.open(C).then(c=>{c.put("./index.html",page);c.put("./",root)})}
return res}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html")).then(r=>r||caches.match("./"))));
return}
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
