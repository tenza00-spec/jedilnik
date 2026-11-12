/* Moj jedilnik – offline app shell, brez shranjevanja osebnih podatkov ali API klicev. */
const CACHE_NAME='moj-jedilnik-shell-v2-20261112';
const SHELL=['./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('moj-jedilnik-shell-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(resp=>{
      if(resp&&resp.ok){
        const copy=resp.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy)).catch(()=>{}));
      }
      return resp;
    }).catch(()=>caches.match('./index.html').then(cached=>cached||Response.error())));
    return;
  }
  if(!SHELL.some(path=>url.pathname.endsWith('/'+path.slice(2))))return;
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(resp=>{
    if(resp.ok){
      const copy=resp.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)).catch(()=>{}));
    }
    return resp;
  })));
});