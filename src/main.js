import Vue from "vue";

import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

import Toast from "muse-ui-toast";
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Loading from 'muse-ui-loading';
//使用Vue原生路由
import VueRouter from "vue-router";
import { routes } from "./routes.js";

import { theme } from "muse-ui";

import App from "./App.vue";

//让axios携带csrf头和cookies
import axios from "axios";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  // console.log(document.cookie);
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  let regex = /.*csrftoken=([^;.]*).*$/;
  config.headers["X-CSRFToken"] =
    document.cookie.match(regex) === null
      ? null
      : document.cookie.match(regex)[1];
  return config;
});
Vue.prototype.$axios = axios;


Vue.use(MuseUI);
Vue.use(VueRouter);

Vue.use(Toast);
Vue.use(Loading);

Vue.prototype.url = App.url;

//主题设置
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
    isLogin,
    userInfo
  },
  render: h => h(App),
});