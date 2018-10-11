<template>
  <mu-container id="orderFullScreen" class="answer-main">
    <mu-dialog title="Dialog" width="360" :esc-press-close="false" :overlay-close="false" :open.sync="openDialog">
      比赛时间未到~
      <mu-button slot="actions" flat color="primary" @click="go_out">Close</mu-button>
    </mu-dialog>
    <mu-flex justify-content="center" align-items="center" wrap="wrap">
      <mu-stepper :active-step="activeStep" class="content-stepper">
        <mu-step>
          <mu-step-label>
            预选赛
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            团体赛
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            复活赛
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            个人赛
          </mu-step-label>
        </mu-step>
      </mu-stepper>

      <mu-menu placement="top-start" open-on-hover :open.sync="show">
        <mu-button color="primary" class="btn-page-setting">显示</mu-button>
        <mu-list slot="content">
          <mu-list-item class="clock" button :ripple="false" @click="openClock = !openClock">
            <mu-list-item-title>
              倒计时
            </mu-list-item-title>
            <mu-list-item-action>
              <mu-switch v-model="openClock" readonly></mu-switch>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item button @click="expand_all">
            <mu-list-item-title>展开所有</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="close_all">
            <mu-list-item-title>收缩所有</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>

      <mu-button color="red" class="btn-page-setting" @click="endAnswer">结束作答</mu-button>
      <!-- (scrollTop>84)?'top:50%':'top:10%' -->

    </mu-flex>
    <!-- abu写的 计时器 -->
    <mu-paper v-if="openClock" class="demo-paper" :style="{top:CountDown_position,'background-color':color_change,color:font_color,'font-weight':font_weight,'font-size':font_size}" :z-depth="4">
      <mu-flex wrap="wrap" direction="column" justify-content="center" align-items="center" style="height:100%">
        <p>距离结束还有</p>
        <p>{{CountDown}}</p>
      </mu-flex>
    </mu-paper>

    <mu-flex class="demo-linear-progress">
      <mu-linear-progress :value="(answered_num_all/question_num)*100" mode="determinate" size=5 color="green"></mu-linear-progress>
    </mu-flex>
    <!-- 可爱的题目们~ -->
    <mu-expansion-panel v-loading="loading1" class="expand_panel" v-for="(question,index) in questions" :style="questions[index].answered_num>=2?'pointer-events: none;':''" :expand.sync="expand_list[index]" :key="question.pk">
      <mu-flex slot="header" style="margin:13px 10px;font-size:16px" fill direction="row" justify-content="between" align-items="center">
        {{question.pk}}.{{question.fields.question_text}}
        <mu-button slot="action" :color="questions[index].answered_num==2?'red':'primary'" @click.stop="submit_answer(question.pk,index)">{{questions[index].answered_num==1?"再提交一次":
          (questions[index].answered_num>=2?"不能再提交了哦":"提交答案")}}</mu-button>
      </mu-flex>
      <mu-flex class="select-control-group" wrap="wrap">
        <mu-flex class="select-control-row" fill :key="item" v-for="(item,i) in question.fields.choices.split(',')">
          <mu-radio :value="i" v-model="answers[index]" :label="item+' '+' '+' '"></mu-radio>
        </mu-flex>
      </mu-flex>
    </mu-expansion-panel>

    <mu-flex justify-content="center" style="margin: 32px 0;">
      <mu-pagination raised :total="question_num" :current.sync="current" @change="change_pages"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>
<style>
.answer-main {
  margin-top: 10px;
}

.content-stepper {
  width: 70%;
  min-width: 420px;
}

.select-control-row {
  margin: 10px 10px;
}

@media screen and (min-width: 800px) {
  .expand_panel {
    margin-left: 80px;
    margin-right: 80px;
  }
  .demo-linear-progress {
    margin-left: 80px;
    margin-right: 80px;
  }
}

.demo-paper {
  width: 150px;
  text-align: center;
  height: 90px;
  position: fixed;

  right: 0;
  z-index: 999;
  margin: 10px 20px;
  font-size: 100%;
}

@media screen and (max-width: 500px) {
  .demo-paper {
    display: none;
  }
  .btn-page-setting {
    margin-bottom: 15px;
    margin-left: 10px;
  }
  .clock {
    display: none;
  }
}

.btn-page-setting {
  margin-left: 10px;
}
.demo-paper p {
  margin: 6px 0;
}
</style>
<script>
export default {
  data() {
    return {
      openDialog: false,
      question_num: 0,
      current: 1,
      activeStep: 1,
      questions: [
        {
          model: "",
          fields: {
            question_text: "",
            difficulty: 0,
            choices: ""
          },
          pk: 0,
          submit_times: 0
        }
      ],
      stages: [],
      show: false,
      show_answered: true,
      answered_num_all: 0,
      expand_list: [false, false, false, false, false, false, false, false, false, false],
      answers: new Array(10),
      time_now: 0,
      times: 0,

      CountDown_position: "10%",
      color_change: "white",
      color_flag: false,
      font_color: "black",
      font_weight: "normal",
      font_size: "130%",

      flash_15: 15,
      flash_5: 15,
      flash_last: 15,
      flash_15_flag: false,
      flash_5_flag: false,
      flash_last_flag: false,

      timer: null,

      second: 0,
      minute: 0,
      hour: 0,

      CountDown: "",

      scrollTop: 0,
      openClock: true,
      loading1: false
    };
  },
  created() {
    if (!localStorage.getItem("isLogin")) {
      console.log("jumpToLogin");
      this.$router.push("Login");
      return;
    }
    var that = this;
    this.loading1 = true;

    this.$axios
      .post(this.url + "get_questions")
      .then(res => {
        console.log(res);
        if (res.data.isOk) {
          this.questions = res.data.questions;
          this.question_num = res.data.page_count;
          this.answered_num_all = res.data.answered_num_all;
          console.log("question_num", this.question_num);
          console.log("test:", this.questions[1].answered_num);
        } else {
          this.questions = [];
          this.show_toast(res.data.errmsg, 1);
        }
        this.loading1 = false;
      })
      .catch(res => {
        this.show_toast("出错啦~", 1);
        this.loading1 = false;
      });
    this.$axios
      .post(this.url + "get_stages")
      .then(res => {
        console.log(res);
        this.stages = res.data.stages;
        this.time_now = res.data.time_now;
        if (this.stages[0].fields.timeStart < this.time_now < this.stages[0].fields.timeEnd) {
          this.activeStep = 0;
        } else if (this.stages[1].fields.timeStart < this.time_now < this.stages[1].fields.timeEnd) {
          this.activeStep = 1;
        } else if (this.stages[2].fields.timeStart < this.time_now < this.stages[2].fields.timeEnd) {
          this.activeStep = 2;
        } else if (this.stages[3].fields.timeStart < this.time_now < this.stages[3].fields.timeEnd) {
          this.activeStep = 3;
        }

        // this.times = 900;
        this.times = this.stages[this.activeStep].fields.timeEnd - this.time_now;
        this.timer = setInterval(() => {
          this.hour = this.times / (60 * 60);
          var middle = this.times % (60 * 60);
          this.minute = middle / 60;
          middle = middle % 60;
          this.second = middle;
          if (parseInt(this.hour) >= 24) {
            var day = this.hour / 24;
            var hour = this.hour % 24;
            this.CountDown = parseInt(day).toString() + "天" + " " + parseInt(hour).toString() + "小时";
          } else {
            if (this.hour < 10) {
              if (this.second < 10 && this.minute >= 10) {
                this.CountDown =
                  "0" +
                  parseInt(this.hour).toString() +
                  ":" +
                  parseInt(this.minute).toString() +
                  ":0" +
                  parseInt(this.second).toString();
              } else if (this.second >= 10 && this.minute < 10) {
                this.CountDown =
                  "0" +
                  parseInt(this.hour).toString() +
                  ":0" +
                  parseInt(this.minute).toString() +
                  ":" +
                  parseInt(this.second).toString();
              } else if (this.second < 10 && this.minute < 10) {
                this.CountDown =
                  "0" +
                  parseInt(this.hour).toString() +
                  ":0" +
                  parseInt(this.minute).toString() +
                  ":0" +
                  parseInt(this.second).toString();
              } else {
                this.CountDown =
                  "0" +
                  parseInt(this.hour).toString() +
                  ":" +
                  parseInt(this.minute).toString() +
                  ":" +
                  parseInt(this.second).toString();
              }
            } else {
              if (this.second < 10 && this.minute >= 10) {
                this.CountDown =
                  parseInt(this.hour).toString() +
                  ":" +
                  parseInt(this.minute).toString() +
                  ":0" +
                  parseInt(this.second).toString();
              } else if (this.second >= 10 && this.minute < 10) {
                this.CountDown =
                  parseInt(this.hour).toString() +
                  ":0" +
                  parseInt(this.minute).toString() +
                  ":" +
                  parseInt(this.second).toString();
              } else if (this.second < 10 && this.minute < 10) {
                this.CountDown =
                  parseInt(this.hour).toString() +
                  ":0" +
                  parseInt(this.minute).toString() +
                  ":0" +
                  parseInt(this.second).toString();
              } else {
                this.CountDown =
                  parseInt(this.hour).toString() +
                  ":" +
                  parseInt(this.minute).toString() +
                  ":" +
                  parseInt(this.second).toString();
              }
            }
          }
          if (this.hour < 1 && this.minute < 1 && this.second < 1) {
            clearInterval(this.timer);
          }

          if (parseInt(this.hour) == 0 && parseInt(this.minute) == 15) this.flash_15_flag = true;
          if (this.flash_15_flag && this.flash_15 >= 0) {
            if (!this.color_flag) this.set_font_alart();
            else this.set_font_normal();
            this.flash_15 -= 1;
          } else if (parseInt(this.hour) == 0 && parseInt(this.minute) == 5) this.flash_5_flag = true;
          if (this.flash_5_flag && this.flash_5 >= 0) {
            console.log("this is the flash function");
            if (!this.color_flag) this.set_font_alart();
            else this.set_font_normal();
            this.flash_5 -= 1;
          } else if (parseInt(this.hour) == 0 && parseInt(this.minute) == 0 && parseInt(this.second) == 15)
            this.flash_last_flag = true;
          if (this.flash_last_flag && this.flash_last >= 0) {
            if (!this.color_flag) this.set_font_alart();
            else this.set_font_normal();
            this.flash_last -= 1;
          }
          this.times = this.times - 1;
        }, 1000);

        console.log(Date);
      })
      .catch(res => {
        console.log("res in catch:", res);
        this.show_toast("请再次刷新", 1);
      });
    window.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 84) {
        this.CountDown_position = "30%";
      } else {
        this.CountDown_position = "10%";
      }
    });
  },
  computed: {
    //   question_comped() {
    // //   console.log(text)
    // //    var array =  text.split(",")
    // //    console.log(array)
    //     console.log(this.questions[1].choices)
    //    return 2
    //   }
  },
  methods: {
    go_out() {
      this.$router.push("myTeam");
    },
    change_pages() {
      var that = this;
      for (var i = 0; i < this.questions.length; i++) {
        this.expand_list[i] = false;
      }
      this.$axios
        .post(this.url + "get_questions/" + this.current.toString())
        .then(res => {
          console.log(res);
          if (res.data.isOk) {
            this.questions = res.data.questions;
            this.question_num = res.data.page_count;
          } else {
            this.questions = [];
          }
        })
        .catch(res => {
          this.show_toast("请再次刷新", 1);
        });
    },
    submit_answer(pk, index) {
      if (this.answers[index] === undefined) {
        console.log("undefined");
        return;
      }
      if (this.questions[index].answered_num == 0) {
        //答题数目加1
        this.answered_num_all = this.answered_num_all + 1;
      }
      if (this.questions[index].answered_num < 2) {
        this.questions[index].answered_num = this.questions[index].answered_num + 1;
      }
      if (this.questions[index].answered_num >= 2) {
        this.expand_list[index] = false;
      }
      console.log(this.questions[[index].answered_num]);
      console.log('还有', this.question_num-this.answered_num_all,'未答的题');
      if( this.question_num-this.answered_num_all == 0){
        console.log('所有题目都答完啦')
        //todo：弹窗说点击结束答题才能停止计时
      }

      this.$axios
        .post(this.url + "submit_answer", {
          question_pk: pk,
          choice: this.answers[index]
        })
        .then(res => {
          // console.log(res);
          if (res.data.isOk) {
            console.log("提交成功", res);
            this.show_toast("提交成功", 0);
            // localStorage.setItem("isLogin", 1);
            // localStorage.setItem("userid", this.validateForm.username);
            // this.$router.push("myTeam");
            // this.$emit("Login");
          } else {
            console.log("提交失败");
            this.show_toast(res.data.errmsg, 1);
            // this.loading1 = false;
          }
        })
        .catch(res => {
          // console.log(res);
          this.show_toast("发生错误", 1);
          // this.loading1 = false;
        });
    },
    endAnswer() {
      //结束答题
      //todo：向服务器发消息说我答完题了，可以停止计时了
    },
    //工具函数：
    show_toast(string, type) {
      if (type == 1) {
        this.$toast.error(string);
      } else {
        this.$toast.success(string);
      }
    },
    expand_all() {
      for (var i = 0; i < this.questions.length; i++) {
        if (this.questions[i].answered_num < 2) {
          this.expand_list[i] = true;
        }
      }
      this.show = false;
    },
    close_all() {
      for (var i = 0; i < this.questions.length; i++) {
        this.expand_list[i] = false;
      }

      this.show = false;
    },
    set_font_normal() {
      this.color_change = "white";
      this.color_flag = false;
      this.font_color = "black";
      this.font_weight = "normal";
      this.font_size = "130%";
    },
    set_font_alart() {
      this.color_change = "#ff5252";
      this.color_flag = true;
      this.font_color = "white";
      this.font_weight = "bold";
      this.font_size = "140%";
    }
  }
  // handleScroll () {
  //   console.log(document.body.scrollTop)
  //   console.log(document.documentElement.scrollTop)
  // },
};
</script>
