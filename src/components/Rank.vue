<template>
    <mu-container>
        <mu-paper :z-depth="10" class="demo-list-wrap">
            <transition-group name="rank" tag="mu-list">
                <mu-divider v-bind:key="0"></mu-divider>
                <template v-for="team in teams" >
                    <mu-list-item button :ripple="true" v-bind:key="team[0]" class="rank-item">
                        <mu-list-item-title>{{team[1]}}</mu-list-item-title>
                        <mu-list-item-action>
                            {{ team[2] }} 分
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-divider v-bind:key="team[1]" class="rank-item"></mu-divider>
                </template>
            </transition-group>
        </mu-paper>
        <mu-button color="success" @click="refresh">刷新</mu-button>
    </mu-container>

</template>
<style>
.demo-list-wrap {
  width: 100%;
  margin-top: 30px;
}
.rank-item {
  transition: all 1s;
}
/* .rank-enter-active, .rank-leave-active {
  transition: all 1s;
} */
.rank-enter, .rank-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.mu-list{
    padding: 0
}
</style>
<script>
export default {
  data() {
    return {
      teams: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    shuffle: function() {
      this.items = _.shuffle(this.items);
    },

    refresh() {
      this.$axios
        .post(this.url + "get_rank", { who: "team" })
        .then(res => {
          console.log(res);
          if (res.data.isOk) {
            console.log("获取信息成功");
            this.teams = res.data.teams;
            this.teams = this.teams.sort((a, b) => b[2] - a[2]);
          } else {
            console.log("获取信息失败，请检查是否有授权信息");
            this.show_toast(res.data.errmsg, 1);
          }
        })
        .catch(res => {
          console.log(res);
          this.show_toast("服务器连接失败！", 1);
        });
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
    }
    this.$axios
      .post(this.url + "get_rank", { who: "team" })
      .then(res => {
        console.log(res);
        if (res.data.isOk) {
          console.log("获取信息成功");
          this.teams = res.data.teams;
          this.teams = this.teams.sort((a, b) => b[2] - a[2]);
        } else {
          console.log("获取信息失败，请检查是否有授权信息");
          this.show_toast(res.data.errmsg, 1);
        }
      })
      .catch(res => {
        console.log(res);
        this.show_toast("服务器连接失败！", 1);
      });
  }
};
</script>