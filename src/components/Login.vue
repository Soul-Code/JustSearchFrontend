<template>
  <div>
    <mu-flex :style="{height:fullHeight-64+'px'}" class="flex-wrapper" direction="column" justify-content="center">
      <mu-flex justify-content="center" class="flex-demo">
        <mu-card>
          <mu-card-title title="请登录" sub-title="" class="unpadding-bottom"></mu-card-title>
          <mu-card-text class="unpadding-top">
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">

              <mu-form-item label-color="green" label-float label="学号" help-text="使用一卡通账号和密码登录" prop="username" :rules="usernameRules">
                <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
              </mu-form-item>
              <mu-form-item label-float label="密码" prop="password" :rules="passwordRules">
                <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
              </mu-form-item>

              <mu-form-item prop="isAgree" :rules="argeeRules">
                <mu-checkbox label="同意比赛守则" v-model="validateForm.isAgree"></mu-checkbox>
              </mu-form-item>
              <mu-form-item class="last-one">
                <mu-button color="success" v-loading="loading1" data-mu-loading-size="24" @click="submit">登录</mu-button>
                <mu-button @click="clear">重置</mu-button>
              </mu-form-item>
            </mu-form>
          </mu-card-text>
        </mu-card>
      </mu-flex>
    </mu-flex>
  </div>
</template>
<style>
.flex-wrapper {
  width: 100%;
  height: 256px;
}
.flex-demo {
  width: 100%;
}
.mu-demo-form {
  padding: 0px 20px;
}
.last-one {
  padding: 0;
  margin: 0;
}
.unpadding-bottom {
  padding-bottom: 0;
}
.unpadding-top {
  padding-top: 0;
}
</style>
<script>
export default {
  data() {
    return {
      isLogin,
      name: "",
      url: this.url,
      fullHeight: window.innerHeight,

      loading1: false,

      usernameRules: [
        { validate: val => !!val, message: "必须填写学号" },
        {
          validate: val => /^[1][12345678][0-9]{6}$/.test(val),
          message: "学号有误，请确认输入是否正确"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6 && val.length <= 10,
          message: "密码长度不正确"
        }
      ],
      argeeRules: [{ validate: val => !!val, message: "必须同意比赛守则" }],
      validateForm: {
        username: "",
        password: "",
        isAgree: true
      }
    };
  },
  created() {
    if (localStorage.getItem("isLogin")) {
      this.$router.push("myTeam");
      return;
    }
  },
  mounted() {
    const that = this;
    // console.log(localStorage.getItem("isLogin"));

    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.fullHeight = window.fullHeight;
      })();
    };
  },
  methods: {
    submit() {
      // let that = this;
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
        if (result) {
          this.loading1 = true;
          // console.log(this.validateForm);
          this.$axios
            .post(this.url + "login", this.validateForm)
            .then(res => {
              // console.log(res);
              if (res.data.isOk) {
                console.log("登录成功");
                this.show_toast("登录成功", 0);
                localStorage.setItem("isLogin", 1);
                localStorage.setItem("userid", this.validateForm.username);
                this.$router.push("myTeam");
                this.$emit("Login");
              } else {
                console.log("登录错误");
                this.show_toast(res.data.errmsg, 1);
                this.loading1 = false;
              }
            })
            .catch(res => {
              // console.log(res);
              this.show_toast("服务器连接失败！", 1);
              this.loading1 = false;
            });
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        isAgree: false
      };
    },
    show_toast(string, type) {
      // console.log(string)
      if (type == 1) {
        this.$toast.error(string);
      } else {
        this.$toast.success(string);
      }
    }
  }
};
</script>