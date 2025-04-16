# Nuxt 3 Auth App

Простое приложение на Nuxt 3 с логином, хранением сессии, фильтрацией таблицы и использованием SCSS и TypeScript.

## 📦 Стек технологий

- [Nuxt 3](https://nuxt.com)
- [Pinia](https://pinia.vuejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Sass (SCSS)](https://sass-lang.com)
- [CryptoJS](https://www.npmjs.com/package/crypto-js) — для MD5-хеширования
- [vue-multiselect](https://vue-multiselect.js.org) — компонент для мультивыбора

## 🚀 Как запустить

1. Установите зависимости:
```bash
npm install
```

2. Запустите дев-сервер:
```bash
npm run dev
```

## 🔐 Авторизация

- Используются логины и пароли из файла `public/users.json`
- Пароли хранятся в виде MD5-хешей
- Успешный логин сохраняет сессию в `localStorage`
- При обновлении страницы сессия восстанавливается
- После выхода (`logout`) сессия очищается

## 📄 Страницы

### `/`
Страница входа (логин и пароль). В случае ошибки выводится сообщение.

### `/account`
Страница аккаунта, доступна только после входа. Содержит:
- Кнопку "Выход"
- Таблицу пользователей
- Фильтр по дате создания
- Мультивыбор по статусу ("активен"/"неактивен")

## 🛠 Развёртывание на продакшене

Если бы я разворачивал это приложение на PROD-сервере, я бы сделал следующее:

### 1. Подготовка окружения

- Убедился, что установлен Node.js LTS (напр. 18.x)
- Установил `pm2` или другой процесс-менеджер:
  ```bash
  npm install -g pm2
  ```

### 2. Сборка проекта

```bash
npm install
npm run build
```

### 3. Запуск через Nitro (SSR)

```bash
NODE_ENV=production node .output/server/index.mjs
```

Или под управлением `pm2`:

```bash
pm2 start .output/server/index.mjs --name nuxt-auth-app --interpreter node
```

### 4. Настройка Nginx (рекомендовано)

Пример конфигурации Nginx для проксирования на порт SSR-сервера:

```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 5. SSL (через Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com
```

---

После этого приложение будет доступно по HTTPS, работать в SSR-режиме и автоматически перезапускаться при сбоях (если используется `pm2`).

## 💬 Почему TypeScript

- Явная типизация упрощает разработку и уменьшает баги
- Автодополнение и проверка типов на лету

## 🧠 Почему SCSS

- Удобная вложенность
- Переменные, миксины
- Совместимость с Nuxt 3 и модульной архитектурой

## ✅ Реализованные функции

- Авторизация по логину и паролю
- Хеширование пароля (MD5)
- Защищённая страница `/account` (middleware)
- Сохранение сессии
- Фильтрация таблицы по дате и статусу

---

Проект выполнен в учебных целях.