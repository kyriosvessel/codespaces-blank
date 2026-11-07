self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'EASY $ FUNDING', {
      body: data.body || 'You have received a new transaction.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'incoming-transaction',
      data: { url: '/?page=transactions' },
      vibrate: [300, 150, 300],
      requireInteraction: true
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});
