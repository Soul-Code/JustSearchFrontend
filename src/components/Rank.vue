<template>
    <mu-container>
        <mu-paper :z-depth="10" class="demo-list-wrap">

            <mu-list>

                <mu-list-item v-for="team in teams" :key="team.id" button :ripple="true">
                    <mu-list-item-title>{{team[1]}}</mu-list-item-title>
                    <mu-list-item-action>
                        {{ team[2] }} 分
                    </mu-list-item-action>
                </mu-list-item>

                <!-- <mu-divider></mu-divider>

                <mu-list-item button :ripple="true">
                    <mu-list-item-title>队员2</mu-list-item-title>
                    <mu-list-item-action>
                        {{ add(6) }}分
                    </mu-list-item-action>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item button :ripple="true">
                    <mu-list-item-title>{{ name }}</mu-list-item-title>
                    <mu-list-item-action>
                        0分
                    </mu-list-item-action>
                </mu-list-item> -->

            </mu-list>
        </mu-paper>

    </mu-container>

</template>
<style>
.demo-list-wrap {
  width: 100%;
  margin-top: 30px;
}
</style>
<script>
export default {
  data() {
    return {
      teams: []
    };
  },
  methods: {},
  mounted() {
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