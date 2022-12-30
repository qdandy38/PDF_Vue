import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from './App.vue'
import router from "./router";
import "./style/tailwind.css"
import "./style/main.css";
import Icon from "./components/Icon.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('Icon', Icon);

app.mount('#app')
