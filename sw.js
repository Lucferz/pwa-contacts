//console.log('service worker......');

//install sw
self.addEventListener('install', ev => {
    console.log('sw instalado');
});

//activar evento
self.addEventListener('activate', evt=>{
    console.log('sw activado');
});