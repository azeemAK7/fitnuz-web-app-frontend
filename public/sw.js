self.addEventListener("push", function (event) {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "Notification", body: event.data.text() };
  }

  const title = data.title || "FitNuz";
  const options = {
    body: data.body || "",
    icon: "/notification-icon.png",
    badge: "/notification-icon.png",
    image: data.image || undefined,
    tag: data.orderId ? "order-" + data.orderId : "fitnuz-notification",
    renotify: true,
    vibrate: [100, 50, 100, 50, 200],
    actions: [
      { action: "view", title: "View Order" },
      { action: "dismiss", title: "Dismiss" },
    ],
    data: {
      url: data.url || "/profile/orders",
      orderId: data.orderId,
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (event.action === "dismiss") return;

  const url = event.notification.data?.url || "/profile/orders";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
