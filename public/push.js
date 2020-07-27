var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BLPvhilg3z2TqARvuPIleS6dsyyFHTsdRkemk9zrwEPOu5-Dy1AhaQUoFjbINCx02Z2sv-P-W-MytTFoZxDWqw0",
    "privateKey": "uooaQuAV7GKAto1EfVSlorAktKgKgiVQTgvmMCedARk"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
    )
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f8ew6tvT6ys:APA91bF2XL8eBKPWmCW82ADYv5mcFmQnpni9u7QEOWyapUJJmCB_wR0X0zdkBcfV39Qvy9rPeP_355yXp7Fk3Li1fMRrBoPlP-iDZniLsGsW5watcZy-pQwhZ8fE2rNQe3tahLeBG-Nj",
    "keys": {
        "p256dh": "BD3rt/rT4prB+04u1tWa5LD0Hu6X39zyBaADLuy2cYAEroiFUoY6FrTZ1NkF/ANFpRAsRepSR2UJGB3pIT+bF7w=",
        "auth": "owuARvNx7/R1bfJUZHAMhg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '359402949166',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
    );