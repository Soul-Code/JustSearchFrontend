<template>
    <mu-flex justify-content="center">
        <mu-card raised class="card-main">
            <mu-flex wrap="wrap" v-bind:justify-content="isPc?'between':'center'">
                <mu-flex fill>
                    <mu-card class="card-info" style="">
                        <mu-card-title class="title-name" :title="userInfo.name">
                        </mu-card-title>
                        <mu-list dense>
                            <mu-list-item>
                                当前个人积分：{{userInfo.score}}分
                            </mu-list-item>
                            <mu-list-item v-if="userInfo.qq">
                                QQ：{{userInfo.qq}}
                            </mu-list-item>
                            <mu-list-item v-if="userInfo.tel">
                                TEL：{{userInfo.tel}}
                            </mu-list-item>
                        </mu-list>
                        <mu-list v-if="userInfo.team.id">
                            <mu-sub-header>我的队伍</mu-sub-header>
                            <mu-list-item avatar button :ripple="true">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/logo.png">
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>{{userInfo.team.name}}</mu-list-item-title>
                                    <mu-list-item-sub-title>当前队伍积分：{{userInfo.team.score}}分</mu-list-item-sub-title>
                                </mu-list-item-content>
                                <mu-list-item-action>
                                    <mu-tooltip placement="top" content="退出队伍">
                                        <mu-button icon color="blue">
                                            <mu-icon value="reply"></mu-icon>
                                        </mu-button>
                                    </mu-tooltip>
                                </mu-list-item-action>
                            </mu-list-item>
                            <mu-list-item avatar :ripple="true" button>
                                <mu-list-item-action class="avatar-member">
                                    <mu-icon value="person"></mu-icon>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>{{userInfo.team.leader.name}}</mu-list-item-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-list-item v-for="mem in userInfo.team.mems" :key="mem.id" avatar :ripple="true" button>
                                <mu-list-item-action class="avatar-member">
                                    <mu-icon value="person"></mu-icon>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>{{mem.name}}</mu-list-item-title>
                                </mu-list-item-content>
                                <mu-list-item-action v-if="userInfo.team.leader.id == userInfo.id">
                                    <mu-tooltip placement="top" content="踢出队员">
                                        <mu-button icon color="error">
                                            <mu-icon value="close"></mu-icon>
                                        </mu-button>
                                    </mu-tooltip>
                                </mu-list-item-action>
                            </mu-list-item>
                        </mu-list>
                    </mu-card>
                </mu-flex>
                <mu-flex fill>
                    <div class="demo-vsteper-container">
                        <mu-stepper :active-step="vactiveStep" orientation="vertical">
                            <mu-step>
                                <mu-step-label>
                                    报名比赛
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        <span v-if="!userInfo.tel">登陆成功，现在点击下面的按钮输入信息来报名~</span>
                                        <span v-else>报名成功，您现在可以点击下面的按钮修改信息~</span>
                                    </p>
                                    <mu-button class="demo-step-button" @click="regsiter" color="primary">
                                        <span v-if="!userInfo.tel">点我报名</span>
                                        <span v-else>修改信息</span>
                                    </mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandleNext">下一步</mu-button>

                                    <mu-dialog :title="userInfo.tel?'修改信息':'请完善信息进行报名'" width="400px" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openRegister">

                                        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                                            <mu-form-item label-float label="手机号" help-text="请保证手机号码通信畅通！" prop="tel" :rules="telRules">
                                                <mu-text-field type="number" v-model="validateForm.tel" prop="tel"></mu-text-field>
                                            </mu-form-item>
                                            <mu-form-item class="lastone" label-float label="QQ" prop="qq" :rules="qqRules">
                                                <mu-text-field type="number" v-model="validateForm.qq" prop="qq"></mu-text-field>
                                            </mu-form-item>
                                        </mu-form>

                                        <mu-button slot="actions" @click="openRegister = false">返回</mu-button>
                                        <mu-button slot="actions" color="success" @click="submit">
                                            <span v-if="!userInfo.tel">确认报名</span>
                                            <span v-else>确认修改</span>
                                        </mu-button>
                                    </mu-dialog>

                                </mu-step-content>
                            </mu-step>
                            <mu-step v-if="!userInfo.team.id">
                                <mu-step-label>
                                    加入/创建队伍
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        参加比赛的小可爱们，恭喜你们报名成功啦。现在的你们可以选择<strong>创建</strong>属于自己的队伍（你将成为队长），或者选择<strong>加入</strong>别人的队伍~
                                    </p>
                                    <mu-button class="demo-step-button" @click="joinTeam" color="primary">加入队伍</mu-button>
                                    <mu-button class="demo-step-button" @click="createTeam" color="primary">创建队伍</mu-button>

                                    <mu-dialog title="创建新的队伍" width="400px" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openNewTeam">

                                        <mu-form ref="form" :model="newTeamForm" class="mu-demo-form">
                                            <mu-form-item label-float label="队伍名称" prop="teamname" :rules="teamnameRules">
                                                <mu-text-field type="text" v-model="newTeamForm.teamname" prop="teamname"></mu-text-field>
                                            </mu-form-item>

                                            <mu-form-item label-float label="头像" prop="avatar" :rules="avatarRules">
                                                <mu-text-field type="file" v-model="newTeamForm.avatar" prop="avatar"></mu-text-field>
                                            </mu-form-item>
                                        </mu-form>

                                        <mu-button slot="actions" @click="openRegister = false">返回</mu-button>
                                        <mu-button slot="actions" color="success" @click="submitCreate">确认创建</mu-button>
                                    </mu-dialog>

                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step v-if="userInfo.team.id">
                                <mu-step-label>
                                    分享队伍
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        恭喜你已经拥有了自己的队伍哦，但是由于你的队伍成员不满三人，暂时无法参赛呢，你可以选择分享队伍，让更多的小伙伴加入哦~
                                        <br>
                                        <span style="color:red">
                                            <strong> 注意！请慎重选择你的队友，一旦开始比赛，队友将不可更换。
                                                现场赛时会验证身份，一旦发现代替他人参赛者，主办方有权取消其比赛资格！有队员来不了的同学会吃亏的哟~
                                            </strong>
                                        </span>
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">分享队伍</mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step>
                                <mu-step-label>
                                    预选赛
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">参加比赛</mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step>
                                <mu-step-label>
                                    团队赛
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">参加比赛</mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step>
                                <mu-step-label>
                                    个人赛
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明预选赛说明
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">参加比赛</mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                        </mu-stepper>
                        <p v-if="vfinished">
                            都完成啦!
                            <a href="javascript:;" @click="vreset">点这里</a>可以重置
                        </p>
                    </div>
                </mu-flex>
            </mu-flex>
        </mu-card>
    </mu-flex>
</template>
<script>
export default {
  data() {
    return {
      vactiveStep: 1,
      isTeamed: true,
      fullWidth: document.documentElement.clientWidth,
      isPc: document.documentElement.clientWidth > 1000,
      userInfo,
      openRegister: false,
      openNewTeam: true,

      telRules: [
        { validate: val => !!val, message: "请填写手机号码" },
        {
          validate: val =>
            /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
              val
            ),
          message: "手机号码有误，请确认输入是否正确"
        }
      ],
      qqRules: [
        { validate: val => !!val, message: "请填写qq号码" },
        {
          validate: val => val.length >= 6 && val.length <= 12,
          message: "qq号码长度不正确"
        }
      ],
      teamnameRules: [
        { validate: val => !!val, message: "请填写队伍名称" },
        {
          validate: val =>
            !/[`~@#$%^&*()+<>:"{},.\/;'·！#￥（——）：；“”‘、，|《。》、【】[\]]/.test(
              val
            ),
          message: "队伍名称不能出现特殊字符"
        }
      ],
      avatarRules: [{ validate: val => !!val, message: "请选择头像" }],
      validateForm: {
        tel: "18111111111",
        qq: "999584621"
      },
      newTeamForm: {
        teamname: "",
        avatar:""
      }
    };
  },
  computed: {
    vfinished() {
      return this.vactiveStep > 4;
    }
  },
  methods: {
    vhandleNext() {
      this.vactiveStep++;
    },
    vhandlePrev() {
      this.vactiveStep--;
    },
    vreset() {
      this.vactiveStep = 0;
    },
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
        if (result) {
          this.$axios
            .post(this.url + "register", this.validateForm)
            .then(res => {
              console.log(res);
              if (res.data.isOk) {
                this.openRegister = false;
                this.vhandleNext();
                this.show_toast("报名成功！", 0);
                this.userInfo = res.data.userInfo;
              } else {
                this.show_toast("报名失败……", 1);
              }
            })
            .catch(res => {
              console.log(res);
              this.show_toast("服务器连接失败，请稍后重试。", 1);
            });
        }
      });
    },

    submitCreate() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.show_toast("队伍创建成功！", 0);
          console.log(this.newTeamForm)
        }
      });
    },
    regsiter() {
      this.openRegister = true;
    },
    createTeam() {
      this.openNewTeam = true;
    },
    joinTeam() {
      this.show_toast("加入队伍成功！", 0);
    },
    shareTeam() {
      //可能会展示二维码
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
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.fullHeight = window.fullHeight;
        that.isPc = that.fullWidth > 1000;
      })();
    };
    //请求刷新组队数据
    this.$axios
      .post(this.url + "getteam")
      .then(res => {
        console.log(res);
        if (res.data.isOk) {
          console.log("获取信息成功");
          this.userInfo = res.data.userInfo;
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

<style>
.demo-vsteper-container {
  max-width: 24rem;
  max-height: 100rem;
  margin: auto;
  margin-left: 2.5rem;
}

.demo-step-content {
  margin: 0 16px;
}

.demo-step-button {
  margin-top: 12px;
  margin-right: 12px;
}

.msg {
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.title-name {
  padding-bottom: 0;
}
.avatar-member {
  padding-left: 3rem;
  padding-right: 0.5rem;
}
.mu-demo-form {
  padding-bottom: 0;
}
.lastone {
  margin-bottom: 0;
}
/* .mu-dialog-body{
    padding-bottom: 0;
} */
.mu-dialog-actions {
  padding-bottom: 15px;
  padding-right: 15px;
}

@media screen and (min-width: 500px) {
  .card-info {
    margin-left: 2rem;
    margin-top: 1rem;
    width: 100%;
    max-width: 375px;
  }

  .card-main {
    margin: 2rem 0;
    padding: 2rem 1rem;
  }
}

@media screen and (max-width: 500px) {
  .demo-vsteper-container {
    margin: auto;
    margin-top: 2rem;
  }
  .card-info {
    width: 100%;
    max-width: 450px;
  }
  .card-main {
    margin: 1rem 0;
    padding: 2rem 2rem;
  }
}
</style>