import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import './assets/css/main.scss'
import 'bootstrap'

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price) + ' ₽'
  }
}

app.use(store).mount('#app');



