<template>
  <div>
    <app-header :is-logined="isLogin"></app-header>
    <mu-container>
      <router-view @Login="Login1"></router-view>
    </mu-container>
  </div>
</template>

<script>
import Header from "./components/header.vue";
var url = "";
const debug = false;
if (debug) url = "http://soulcode.cn:8080/justsoso/api/";
else url = "https://soulcode.cn/justsoso/api/";

export default {
  url,
  components: {
    appHeader: Header
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    Login1() {
      console.log("APP中事件被调用");
      this.isLogin = true;
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
</style>
