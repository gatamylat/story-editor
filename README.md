# Story Editor Pro - PWA

Профессиональный редактор историй для Instagram и социальных сетей. Работает как Progressive Web App на всех устройствах, включая iPhone и iPad.

## 🚀 Возможности

- ✅ Работает полностью офлайн
- ✅ Устанавливается как приложение на iOS/Android
- ✅ Автосохранение в LocalStorage
- ✅ Сохранение/загрузка проектов в файлы
- ✅ Адаптирован для мобильных устройств
- ✅ Поддержка жестов и тач-управления

## 📱 Установка на iPhone/iPad

1. Откройте сайт в Safari
2. Нажмите кнопку "Поделиться" (квадрат со стрелкой)
3. Выберите "На экран «Домой»"
4. Нажмите "Добавить"

Приложение появится на главном экране как обычное приложение.

## 🛠 Развертывание на GitHub Pages

### Шаг 1: Создание репозитория

1. Создайте новый репозиторий на GitHub
2. Назовите его `story-editor` (или любое другое имя)

### Шаг 2: Структура файлов

```
story-editor/
├── index.html          # Основной файл приложения
├── manifest.json       # PWA манифест
├── sw.js              # Service Worker
├── README.md          # Этот файл
└── icons/             # Папка с иконками
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-167.png
    ├── icon-180.png
    ├── icon-192.png
    ├── icon-256.png
    ├── icon-384.png
    ├── icon-512.png
    └── icon-1024.png
```

### Шаг 3: Создание иконок

Для генерации иконок нужно создать исходное изображение 1024x1024px и использовать один из способов:

#### Способ 1: Онлайн генератор
Используйте https://www.pwabuilder.com/imageGenerator

#### Способ 2: Photoshop/GIMP
Создайте иконки вручную в нужных размерах

#### Способ 3: Скрипт для ImageMagick
```bash
#!/bin/bash
# Требуется ImageMagick
# brew install imagemagick (на Mac)
# apt-get install imagemagick (на Linux)

# Создаем папку для иконок
mkdir -p icons

# Исходный файл должен быть 1024x1024
SOURCE="icon-source.png"

# Генерируем все размеры
convert $SOURCE -resize 16x16 icons/icon-16.png
convert $SOURCE -resize 32x32 icons/icon-32.png
convert $SOURCE -resize 72x72 icons/icon-72.png
convert $SOURCE -resize 96x96 icons/icon-96.png
convert $SOURCE -resize 128x128 icons/icon-128.png
convert $SOURCE -resize 144x144 icons/icon-144.png
convert $SOURCE -resize 152x152 icons/icon-152.png
convert $SOURCE -resize 167x167 icons/icon-167.png
convert $SOURCE -resize 180x180 icons/icon-180.png
convert $SOURCE -resize 192x192 icons/icon-192.png
convert $SOURCE -resize 256x256 icons/icon-256.png
convert $SOURCE -resize 384x384 icons/icon-384.png
convert $SOURCE -resize 512x512 icons/icon-512.png
convert $SOURCE -resize 1024x1024 icons/icon-1024.png
```

#### Временное решение (базовая иконка)
Создайте простую иконку с эмодзи:
```html
<!-- Сохраните как icon-generator.html и откройте в браузере -->
<!DOCTYPE html>
<html>
<head>
  <title>Icon Generator</title>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const sizes = [16, 32, 72, 96, 128, 144, 152, 167, 180, 192, 256, 384, 512, 1024];
    
    sizes.forEach(size => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      // Градиентный фон
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      // Эмодзи
      ctx.font = `${size * 0.6}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📱', size/2, size/2);
      
      // Скачивание
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `icon-${size}.png`;
        a.click();
      });
    });
  </script>
</body>
</html>
```

### Шаг 4: Загрузка файлов

1. Загрузите все файлы в репозиторий:
```bash
git add .
git commit -m "Initial PWA setup"
git push origin main
```

### Шаг 5: Включение GitHub Pages

1. Перейдите в Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Нажмите Save

### Шаг 6: Обновление путей

После включения GitHub Pages, обновите пути в файлах:

В `index.html`:
```javascript
// Замените
navigator.serviceWorker.register('sw.js')
// На
navigator.serviceWorker.register('/story-editor/sw.js')
```

В `manifest.json`:
```json
{
  "start_url": "/story-editor/",
  "scope": "/story-editor/"
}
```

В `sw.js`:
```javascript
const urlsToCache = [
  '/story-editor/',
  '/story-editor/index.html',
  '/story-editor/manifest.json',
  // и т.д.
];
```

## 🎨 Дизайн иконки

Рекомендуемый дизайн для иконки:
- Градиентный фон (#667eea → #764ba2)
- Белый символ редактора или камеры по центру
- Закругленные углы для iOS (будут добавлены автоматически)

## 📋 Требования

### Минимальные требования:
- iOS 11.3+ (для PWA)
- Android 5+ с Chrome
- Современный браузер с поддержкой Service Workers

### Поддерживаемые браузеры:
- Safari (iOS) ✅
- Chrome (Android/Desktop) ✅
- Edge ✅
- Firefox ✅

## 🔧 Локальная разработка

Для тестирования локально:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Откройте http://localhost:8000

## 📝 Встроенные шрифты

Для полной офлайн работы нужно встроить шрифты. Конвертируйте шрифты в base64:

1. Скачайте шрифт Inter с https://fonts.google.com/specimen/Inter
2. Конвертируйте в base64: https://www.base64encode.org/
3. Вставьте в CSS вместо комментария

Или используйте системные шрифты (уже настроено как fallback).

## 🚨 Известные особенности iOS

1. **LocalStorage в Private Mode**: Не работает в приватном режиме Safari
2. **Лимит LocalStorage**: ~5-10MB
3. **Автоочистка**: iOS может очистить данные при нехватке памяти
4. **Жесты**: Отключены стандартные жесты браузера для лучшего UX

## 📱 Оптимизация для iOS

Приложение оптимизировано для iOS:
- Отключен выбор текста где не нужно
- Убрана подсветка при тапе
- Увеличен размер шрифта в полях ввода (предотвращает зум)
- Поддержка Safe Area (iPhone X+)
- Оптимизированы тач-события

## 🔄 Обновление приложения

Service Worker автоматически обновляет кэш при изменении версии. Измените `CACHE_NAME` в `sw.js` при обновлении.

## 📄 Лицензия

MIT License - свободное использование и модификация.

## 🆘 Поддержка

Создайте Issue в репозитории при возникновении проблем.

---

**Версия:** 2.0  
**Автор:** Story Editor Team  
**Сайт:** https://ваш-username.github.io/story-editor/
