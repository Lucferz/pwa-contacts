//console.log('service worker......');

const cacheName = "app-shell-rs";
const assets = [
    '/',
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];
caches.open(cacheName).then(cache =>{
    cache.addAll(assets);
})
.catch(ev =>{
    console.log('Error en cacheo', ev);
});


//install sw
self.addEventListener('install', ev => {
    console.log('sw instalado');
});

//activar evento
self.addEventListener('activate', evt=>{
    console.log('sw activado');
});

// evento fetch 
self.addEventListener('fetch', evt =>{
    console.log(evt);
});

