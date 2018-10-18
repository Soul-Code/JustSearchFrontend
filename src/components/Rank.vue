<template>
  <mu-container>
    <mu-paper :z-depth="10" class="demo-list-wrap">
      <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" center>
        <mu-tab>队伍排名</mu-tab>
        <mu-tab>个人排名</mu-tab>
      </mu-tabs>

      <transition-group v-if="active == 0" name="rank" tag="mu-list">
        <mu-divider v-bind:key="0"></mu-divider>
        <template v-for="team in teams">
          <mu-list-item button :ripple="true" v-bind:key="team[0]" class="rank-item">
            <mu-list-item-title>{{team[1]}}</mu-list-item-title>
            <!-- <mu-list-item-action>
              {{ team[2] }} 分
            </mu-list-item-action> -->
          </mu-list-item>
          <mu-divider v-bind:key="team[1]" class="rank-item"></mu-divider>
        </template>
      </transition-group>

      <transition-group v-if="active == 1" name="rank" tag="mu-list">
        <mu-divider v-bind:key="0"></mu-divider>
        <template v-for="user in users">
          <mu-list-item button :ripple="true" v-bind:key="user[0]" class="rank-item">
            <mu-list-item-title>{{user[1]}}</mu-list-item-title>
            <!-- <mu-list-item-action>
              {{ user[2] }} 分
            </mu-list-item-action> -->
          </mu-list-item>
          <mu-divider v-bind:key="user[1]" class="rank-item"></mu-divider>
        </template>
      </transition-group>

    </mu-paper>
  </mu-container>

</template>
<style>
.demo-list-wrap {
  width: 100%;
  margin-top: 30px;
}
.rank-move {
  transition: all 1s;
}
.rank-enter-active,
.rank-leave-active {
  transition: all 1s;
}
.rank-enter, .rank-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.mu-list {
  padding: 0;
}
</style>
<script>
export default {
  data() {
    return {
      teams: [],
      users: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      interval: {},
      active: 0
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  mounted() {},
  methods: {
    refresh() {
      let that = this;
      this.interval = setInterval(function() {
        console.log("刷新~~");
        that.$axios
          .post(that.url + "get_rank", { who: "team" })
          .then(res => {
            console.log(res);
            if (res.data.isOk) {
              console.log("获取信息成功");
              that.teams = res.data.teams;
              that.users = res.data.users;
              that.teams = that.teams.sort((a, b) => b[2] - a[2]);
            } else {
              console.log("获取信息失败，请检查是否有授权信息");
              that.show_toast(res.data.errmsg, 1);
            }
          })
          .catch(res => {
            console.log(res);
            that.show_toast("服务器连接失败！", 1);
          });
      }, 4000);
    },
    show_toast(string, type) {
      // console.log(string)
      if (type == 1) {
        this.$toast.error(string);
      } else {
        this.$toast.success(string);
      }
    }
  },
  created() {
    if (!localStorage.getItem("isLogin")) {
      console.log("jumpToLogin");
      this.$router.push("Login");
      return;
    }
    this.$axios
      .post(this.url + "get_rank", { who: "team" })
      .then(res => {
        console.log(res);
        if (res.data.isOk) {
          console.log("获取信息成功");
          this.teams = res.data.teams;
          this.users = res.data.users;
          this.teams = this.teams.sort((a, b) => b[2] - a[2]);
          this.users = this.users.sort((a, b) => b[2] - a[2]);
        } else {
          console.log("获取信息失败，请检查是否有授权信息");
          this.show_toast(res.data.errmsg, 1);
        }
      })
      .catch(res => {
        console.log(res);
        this.show_toast("服务器连接失败！", 1);
      });
    console.log("mounted");
    this.refresh();
  }
};
</script>