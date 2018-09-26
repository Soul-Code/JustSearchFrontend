import Vue from "vue";

import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

import Toast from "muse-ui-toast";
import VueRouter from "vue-router";
import { routes } from "./routes.js";

import { theme } from "muse-ui";

import App from "./App.vue";

Vue.use(MuseUI);
Vue.use(VueRouter);
Vue.use(Toast);
Vue.prototype.url = App.url;

theme.add(
  "teal",
  {
    primary: "#009688",
    secondary: "#ff4081",
    success: "#4caf50",
    warning: "#ffeb3b"
  },
  "light"
);

theme.use("teal");

const router = new VueRouter({
  mode: "history",
  routes
});

var app = new Vue({
  el: "#app",
  router,
  data:{
    isLogin
  },
  render: h => h(App),
});
