document.addEventListener('DOMContentLoaded', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {
      scope: '',
    });
  }

  let userId = getCookie('userId');
  if(!userId) {
    userId = generateRandomString();
    setCookie('userId', userId, 7);
  }
  document.querySelector("#user-id").innerHTML = userId;

  document.querySelector("#btn-subscribe").addEventListener("click", async function() {
    if (!('serviceWorker' in navigator)) return;
  
    const publicVapidKey = 'BAoZTmKIxrsse2ItKFXx3YpT6oVvuVUGCDANnq_z8EyWB0k0YRSaMuv9wGBxQQS78cZejHfrZJq23DAtVJV_M78';
    const registration = await navigator.serviceWorker.ready;
  
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
  
    await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription,
        userId
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
  })
});

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function getCookie(name) {
  let cookieName = name + '=';
  let cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
    }
  }
  return null;
}

function generateRandomString() {
  var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var length = 10;
  var randomString = '';

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};