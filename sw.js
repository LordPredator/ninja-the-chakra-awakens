const CACHE="ninja-selfcontained-v05";
const ROOT=new URL("./",self.location).href;
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll([ROOT,ROOT+"index.html"]))) });
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(ROOT+"index.html",c));return r}).catch(()=>caches.match(ROOT+"index.html")));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
