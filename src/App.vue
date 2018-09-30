<template>
  <div>
    <app-header></app-header>
    <mu-container>
      <router-view></router-view>
    </mu-container>
  </div>
</template>

<script>
import Header from "./components/header.vue";
var url = "";
const debug = true;
if (debug) url = "http://soulcode.cn:8080/justsoso/api/";
else url = "https://soulcode.cn/justsoso/api/";

export default {
  url,
  components: {
    appHeader: Header
  }
};
</script>

<style>
.container {
  height: 100%;
}
</style>
