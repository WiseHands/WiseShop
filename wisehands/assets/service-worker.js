self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  //hack
  var resp = JSON.parse(event.data.text().replace(/SPACE/g, ' '));

  const title = resp.title;
  self.orderId = resp.orderId;
  const options = {
    body: resp.message,
    icon: resp.icon
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('/admin#/')
  );
});