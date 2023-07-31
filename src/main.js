import { createApp } from "vue";
import BootstrapVue3 from 'bootstrap-vue-3'
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
const appInstance = createApp(App);
appInstance.use(BootstrapVue3)
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
