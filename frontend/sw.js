self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('on push: ', data);
  
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});