import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импортируем маршрутизатор

const app = createApp(App)

app.use(router) // Используем маршрутизатор

if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();  // Сообщаем, что WebApp готов
    window.Telegram.WebApp.expand(); // Делаем окно по всей высоте
}

app.mount('#app')
