//console.log('service worker......');

const cacheName = "app-shell-rs";
const dynamicCacheName = 'dynamic-cache-v1';
const assets = [
    '/',
    'pages/default.html',
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

//cache size limit function
const limitCacheSize = (name, size) =>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys =>{
            if(keys.length > size){
                cache.delete(key[0]).then(limitCacheSize(name,size))
            }
        })
    });
}

//install sw
self.addEventListener('install', ev => {
    // console.log('sw instalado');
    ev.waitUntil(
        caches.open(cacheName).then(cache =>{
            cache.addAll(assets);
        })
    );
});

//activar evento
self.addEventListener('activate', evt=>{
    //console.log('sw activado');
    evt.waitUntil(//borrar cache antiguas y actualizar por nuevas cuando se actualiza el codigo
        caches.keys().then(keys =>{
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key =>caches.delete()));
        })
    )
});

// evento fetch 
self.addEventListener('fetch', evt =>{
    //console.log(evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes =>{
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    limitCacheSize(dynamicCacheName, 15);
                    return fetchRes;
                })
            });
        }).catch(() =>{
            if(evt.request.url.indexOf('.hmlt') > 1){
                return caches.match('pages/default.html');
            }
            
        })
    );
});

