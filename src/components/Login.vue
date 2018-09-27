<template>
  <div>
    <mu-flex :style="{height:fullHeight-64+'px'}" class="flex-wrapper" direction="column" justify-content="center">
      <mu-flex justify-content="center" class="flex-demo">
        <mu-card>
          <mu-card-title title="请登陆" sub-title="" class="unpadding-bottom"></mu-card-title>
          <mu-card-text class="unpadding-top">
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
              <mu-form-item label-color="green" label-float label="学号" help-text="使用一卡通账号和密码登陆" prop="username" :rules="usernameRules">
                <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
              </mu-form-item>
              <mu-form-item label-float label="密码" prop="password" :rules="passwordRules">
                <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
              </mu-form-item>
              <mu-form-item prop="isAgree" :rules="argeeRules">
                <mu-checkbox label="同意比赛守则" v-model="validateForm.isAgree"></mu-checkbox>
              </mu-form-item>
              <mu-form-item class="last-one">
                <mu-button color="success" @click="submit">提交</mu-button>
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
import axios from "axios";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  console.log(document.cookie);
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  let regex = /.*csrftoken=([^;.]*).*$/;
  config.headers["X-CSRFToken"] =
    document.cookie.match(regex) === null
      ? null
      : document.cookie.match(regex)[1];
  return config;
});
export default {
  data() {
    return {
      isLogin,
      name: "",
      url: this.url,
      fullHeight: window.innerHeight,
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
        username: "16122364",
        password: "123456",
        isAgree: true
      }
    };
  },
  mounted() {
    const that = this;
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
          console.log(this.validateForm);
          axios
            .post(this.url + "login", this.validateForm)
            .then(res => {
              console.log(res);
              if (res.data.isOk) {
                console.log("ok");
                this.show_toast("登陆成功", 0);
                this.$router.push("myTeam");
              } else {
                console.log("not ok");
                this.show_toast(res.data.errmsg, 1);
              }
            })
            .catch(res => {
              console.log(res);
              this.show_toast("服务器连接失败！", 1);
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