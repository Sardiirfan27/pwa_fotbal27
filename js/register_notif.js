//register service worker
const registrationSW = () => {
  if('serviceWorker' in navigator){
        return navigator.serviceWorker.register('./service-worker.js')
          .then (function (registration) { 
            console.log('Register Service worker telah Berhasil')
          return registration;
          })
          .catch(function (err) {
            console.log('Register Tidak Berhasil', err);
          })
  }else {
    console.log('Service Worker tidak di dukung')
  }
}

//ijin Notifikasi
const requestPermission = () => {
    if('Notification' in window) {
      Notification.requestPermission().then(result => {
        if(result === 'denied'){
          console.log("Fitur notifikasi tidak diijinkan.");
          return;
        } else if (result === 'default'){
          console.error("Pengguna menutup menutup permission.");
          return;
        }
        console.log('Notification tercapai');
        
        if (('PushManager' in window)) {
          console.log('PushManager exist!');

          navigator.serviceWorker.getRegistration().then(function(registration) {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array ("BLPvhilg3z2TqARvuPIleS6dsyyFHTsdRkemk9zrwEPOu5-Dy1AhaQUoFjbINCx02Z2sv-P-W-MytTFoZxDWqw0")
            }).then(sub => {
              console.log('Berhasil melakukan subscribe dengan endpoint:' + sub.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ' + btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ' + btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))));
            }).catch(err => console.log('Gagal Subscribe : ',err))
          
          })
        }
      })
    }
}

//mengubahnya dalam bentuk  Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
  .replace(/-/g, '+')
  .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}   

export {
  registrationSW,
  requestPermission,
}