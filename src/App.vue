<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
export default {
  components: {
    appHeader: Header
  }
};
</script>

<style>
body{
  padding: 70px
}
</style>
