<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <!-- <a class="navbar-brand" href="#">JustSearch</a> -->
        <router-link class="nav-title navbar-brand" to="/">Just搜搜网络答题系统</router-link>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

          <!-- <router-link class="nav-item" to="/" activeClass="active" tag="li">
            <a class="nav-link">主页</a>
          </router-link> -->
          
          <router-link class="nav-item" to="/Login" activeClass="active" tag="li">
            <a class="nav-link">登陆</a>
          </router-link>
          
          <router-link class="nav-item" to="/Answer" activeClass="active" tag="li">
            <a class="nav-link">答题</a>
          </router-link>

          <router-link class="nav-item" to="/Team" activeClass="active" tag="li">
            <a class="nav-link">队伍</a>
          </router-link>

        </ul>
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <!-- <router-link class="nav-item" to="/" activeClass="active" tag="li"> -->
          <!-- <a class="nav-link">上传答案</a> -->
          <li class="nav-item">
            <button class="nav-btn btn btn-success" type="button">上传答案</button>
          </li>
          <!-- </router-link> -->
          <!-- <router-link class="nav-item" to="/Login" activeClass="active" tag="li"> -->
          <!-- <a class="nav-link">退出登陆</a> -->
          <li class="nav-item">
            <button class="nav-btn btn btn-secondary" type="button">退出登陆</button>
          </li>
          <!-- </router-link> -->
        </ul>

        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>
</template>
<style>
.nav-btn{
  margin-left: 6px;
  margin-right: 6px
}
.nav-title{
  margin-right: 15px;
}
</style>

