// Service Worker для Story Editor Pro
const CACHE_NAME = 'story-editor-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-16.png',
  '/icons/icon-32.png',
  '/icons/icon-72.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-144.png',
  '/icons/icon-152.png',
  '/icons/icon-167.png',
  '/icons/icon-180.png',
  '/icons/icon-192.png',
  '/icons/icon-256.png',
  '/icons/icon-384.png',
  '/icons/icon-512.png',
  '/icons/icon-1024.png'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Обработка запросов
self.addEventListener('fetch', event => {
  // Пропускаем не-GET запросы
  if (event.request.method !== 'GET') {
    return;
  }

  // Пропускаем запросы к внешним ресурсам
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кэшированный ответ, если есть
        if (response) {
          return response;
        }

        // Клонируем запрос
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Проверяем, что получили валидный ответ
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Клонируем ответ для кэша
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Если офлайн и нет кэша, показываем офлайн страницу
        return new Response('<h1>Офлайн</h1><p>Приложение недоступно в офлайн режиме для этого запроса.</p>', {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      })
  );
});

// Обработка push-уведомлений (если потребуется в будущем)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Новое уведомление',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Story Editor Pro', options)
  );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Фоновая синхронизация
self.addEventListener('sync', event => {
  if (event.tag === 'sync-projects') {
    event.waitUntil(syncProjects());
  }
});

async function syncProjects() {
  // Здесь можно добавить синхронизацию с сервером
  console.log('Синхронизация проектов...');
}