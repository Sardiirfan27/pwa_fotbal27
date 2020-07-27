importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/rincian_team.html', revision: '1' },
  { url: '/pages/beranda.html', revision: '1' },
  { url: '/pages/klasemen.html', revision: '1' },
  { url: '/pages/pertandingan.html', revision: '1' },
  { url: '/pages/team.html', revision: '1' },
  { url: '/pages/team_favorit.html', revision: '1' },
  { url: '/css/materialize.css', revision: '1' },
  { url: '/css/stylesheet.css', revision: '1' },
  { url: '/js/materialize.js', revision: '1' },
  { url: '/js/get_api.js', revision: '1' },
  { url: '/js/data_pages.js', revision: '1' },
  { url: '/js/detail_module.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/init_jquery.js', revision: '1' },
  { url: '/js/jquery.js', revision: '1' },
  { url: '/js/op_database.js', revision: '1' },
  { url: '/js/nav_module.js', revision: '1' },
  { url: '/js/register_notif.js', revision: '1' },
  { url: '/js/rincian_data.js', revision: '1' },
  { url: '/image/juara.jpg', revision: '1'},
  { url: '/image/laliga1.jpg', revision: '1'},
  { url: '/image/laliga.jpg', revision: '1'},
  { url: '/image/notif.png', revision: '1'},
  { url: '/image/laligaico.ico', revision: '1'},
  { url: '/image/liga1.jpg', revision: '1'},
  { url: '/image/icon.png', revision: '1'},
  { url: '/image/icon192.png', revision: '1'},
]);


workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);

//agar halaman rincian_team kesimpan di chache
workbox.routing.registerRoute(
  new RegExp('/rincian_team.html'),
  workbox.strategies.staleWhileRevalidate()
);


// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);


} else {
  console.log(`Workbox gagal dimuat`);
}

//siapkan dulu service worker untuk menerima datanya
self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
      body = event.data.text();
  } else {
      body = 'Push message no payload';
  }
  var options = {
      body: body,
      icon: 'image/notif.png',
      vibrate: [100, 50, 100],
      data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
      }
  };
  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  );
});