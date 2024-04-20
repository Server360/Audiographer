const assets = [
	'./manifest.json',
	'./ico.png',
	'./icon.png',
	'./index.html',
	'./main.css',
	'./dist/wavesurfer.js',
	'./dist/plugin/wavesurfer.regions.js',
	'./oneup.js',
	'./app.js',
	'./keys.js',
	'./contextmenu.js',
	'./ui-fx.js',
	'./ui.js',
	'./modal.js',
	'./state.js',
	'./engine.js',
	'./actions.js',
	'./drag.js',
	'./recorder.js',
	'./welcome.js',
	'./fx-pg-eq.js',
	'./fx-auto.js',
	'./local.js',
	'./id3.js',
	'./lzma.js',
	'./lame.js',
	'./fonts/icomoon.ttf',
	'./fonts/icomoon.woff',
	'./favicon.ico',
	'https://server360.github.io/Audiographer/eq.html',
	'https://server360.github.io/Audiographer/sp.html',
	'./test.mp3'

];

self.addEventListener( 'install', async function () {
	const cache = await caches.open( 'audiographer' );
	assets.forEach( function ( asset ) {
		cache.add( asset ).catch( function () {
			console.error( '[SW] Cound\'t cache:', asset );
		});
	});
});

self.addEventListener( 'fetch', async function ( event ) {
	const request = event.request;
	event.respondWith( cacheFirst( request ) );
});

async function cacheFirst( request ) {
	const cachedResponse = await caches.match( request );
	if ( cachedResponse === undefined ) {
		console.error( '[SW] Not cached:', request.url );
		return fetch( request );
	}

	return cachedResponse;
}