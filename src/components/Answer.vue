<template>
  <mu-container id="orderFullScreen" class="answer-main">
    <mu-dialog title="比赛时间未到" width="360" :esc-press-close="false" :overlay-close="false" :open.sync="openConNotStartDialog">
      比赛时间未到~
      <mu-button slot="actions" flat color="primary" @click="go_out">Close</mu-button>
    </mu-dialog>
    <mu-dialog title="恭喜你回答完毕所有题目！" width="400" :overlay-close="false" :open.sync="openConHasFinishedDialog">
      您的所有题目已经回答完毕哟~ 现在随时可以滚动到最上面点击结束作答完成当前比赛~
      <mu-button slot="actions" flat color="primary" @click="openConHasFinishedDialog=false">我知道了</mu-button>
    </mu-dialog>

    <mu-flex justify-content="center" align-items="center" wrap="wrap">

      <!-- Stepper-比赛阶段 -->
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
      <h1 v-if="isFinished && !forbidden" style="margin:100px;">恭喜你回答完毕所有题目！</h1>
      <h1 v-if="forbidden" style="margin:100px;">{{txt}}</h1>
      <!-- Menu-显示 -->
      <mu-menu placement="top-start" open-on-hover :open.sync="show" v-if="!isFinished">
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
      <!-- Dialog-结束作答 -->
      <mu-button v-if="this.question_num <= this.answered_num_all && !isFinished" color="red" class="btn-page-setting" @click="endAnswerDialog=true">结束作答</mu-button>
      <mu-dialog title="确认结束作答？" width="500" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="endAnswerDialog">
        结束作答意味着你选择主动放弃某些题目的第二次提交机会，提交后你的比赛时间将会停止，较少的比赛时间会使你在同等分数的前提下排名靠前！
        <mu-button slot="actions" @click="endAnswerDialog=false">我再想想</mu-button>
        <mu-button v-loading="loadingEndAnswer" data-mu-loading-size="24" slot="actions" color="red" @click="endAnswer">确认结束</mu-button>
      </mu-dialog>
    </mu-flex>
    <!-- abu写的 计时器 -->
    <mu-paper v-if="openClock && !isFinished" class="demo-paper" :style="{top:CountDown_position,'background-color':color_change,color:font_color,'font-weight':font_weight,'font-size':font_size}" :z-depth="4">
      <mu-flex wrap="wrap" direction="column" justify-content="center" align-items="center" style="height:100%">
        <p>距离结束还有</p>
        <p>{{CountDown}}</p>
      </mu-flex>
    </mu-paper>

    <mu-flex v-if="!isFinished" class="demo-linear-progress">
      <mu-linear-progress :value="(answered_num_all/question_num)*100" mode="determinate" size=5 color="green"></mu-linear-progress>
    </mu-flex>
    <!-- 可爱的题目们~ -->
    <mu-expansion-panel v-if="!isFinished" v-loading="loading1" class="expand_panel" v-for="(question,index) in questions" :style="questions[index].answered_num>=2?'pointer-events: none;':''" :expand.sync="expand_list[index]" :key="question.pk">
      <mu-flex slot="header" style="margin:13px 10px;font-size:16px" fill direction="row" justify-content="between" align-items="center">

        <div>
          {{question.pk}}.{{question.fields.question_text}}
          <mu-badge v-if="question.answered_choices>=0" :content="near_by_answered(question)" color="secondary"></mu-badge>
        </div>

        <mu-button slot="action" :color="questions[index].answered_num>=2?'red':'primary'" @click.stop="submit_answer(question.pk,index)">{{questions[index].answered_num==1?"再提交一次":
          (questions[index].answered_num>=2?"不能再提交了哦":"提交答案")}}</mu-button>

      </mu-flex>
      <mu-flex class="select-control-group" wrap="wrap">
        <mu-flex class="select-control-row" fill :key="item" v-for="(item,i) in question.fields.choices.split(',')">
          <mu-radio :value="i" v-model="answers[index]" :label="item+' '+' '+' '"></mu-radio>
        </mu-flex>
      </mu-flex>
    </mu-expansion-panel>
    
    

    <mu-flex v-if="!isFinished" justify-content="center" style="margin: 32px 0;">
      <mu-pagination raised :total="question_num" :current.sync="current" @change="change_pages"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>

<style>
/* style */
/* 解决按钮样式问题 */
.mu-dialog-actions {
  padding-bottom: 15px;
  padding-right: 15px;
}

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
      openConNotStartDialog: false,
      endAnswerDialog: false,
      openConHasFinishedDialog: false,
      question_num: 0,
      current: 1,
      activeStep: 0,
      questions: [
        {
          model: "",
          fields: {
            question_text: "网站出错啦,请稍后刷新再试试，还是不行就找管理员~~~",
            difficulty: 0,
            choices: ""
          },
          pk: "",
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
      isFinished: false,
      isFinishedDialogShowed: false,
      forbidden: false,
      userInfo,
      txt: "非比赛时间，禁止答题",

      loading1: false,
      loadingEndAnswer: false
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

    // get_stages
    this.$axios
      .post(this.url + "get_stages")
      .then(res => {
        console.log(res);
        this.stages = res.data.stages;
        this.time_now = res.data.time_now;
        this.activeStep = res.data.stage - 1;

        // if (this.stages[0].fields.timeStart < this.time_now < this.stages[0].fields.timeEnd) {
        //   this.activeStep = 0;
        // } else if (this.stages[1].fields.timeStart < this.time_now < this.stages[1].fields.timeEnd) {
        //   this.activeStep = 1;
        // } else if (this.stages[2].fields.timeStart < this.time_now < this.stages[2].fields.timeEnd) {
        //   this.activeStep = 2;
        // } else if (this.stages[3].fields.timeStart < this.time_now < this.stages[3].fields.timeEnd) {
        //   this.activeStep = 3;
        // }

        // this.times = 900;
        if (this.activeStep < 0) {
          this.isFinished = true;
          this.forbidden = true;
          return;
        }
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
            this.this.isFinished = true;
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
        this.show_toast("发生错误", 1);
      });

    this.$axios
      .post(this.url + "get_questions")
      .then(res => {
        console.log(res);
        if (res.data.isOk) {
          this.questions = res.data.questions;
          this.question_num = res.data.page_count;
          this.answered_num_all = res.data.answered_num_all;
          this.isFinished = res.data.isFinished;
          this.userInfo = res.data.userInfo;
          if (this.userInfo.team.mems.length < 3) {
            this.forbidden = true;
            this.isFinished = true;
            this.txt = "您的队伍不满三人无法参赛";
          }
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
    near_by_answered(question) {
      var letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U"
      ];
      return "最近提交：" + letters[parseInt(question.answered_choices)];
    },
    go_out() {
      this.$router.push("myTeam");
    },
    change_pages() {
      var that = this;
      for (var i = 0; i < this.questions.length; i++) {
        this.expand_list[i] = false;
      }
      this.answers = new Array(10);
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
          console.log(res);
          this.show_toast("出现错误", 1);
        });
    },
    submit_answer(pk, index) {
      if (this.answers[index] === undefined) {
        console.log("undefined");
        this.show_toast("请展开题目作答后再提交哦！", 1);
        return;
      }

      console.log(this.questions[[index].answered_num]);
      console.log("还有", this.question_num - this.answered_num_all, "未答的题");
      if (this.question_num <= this.answered_num_all + 1) {
        console.log("所有题目都答完啦");
        //todo：弹窗说点击结束答题才能停止计时
        if (!this.HasFinishedDialogisShowed) {
          this.openConHasFinishedDialog = true;
          this.HasFinishedDialogisShowed = true;
        }
      }
      console.log({
        question_pk: pk,
        choice: this.answers[index]
      });
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
            // this.change_pages();
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
            this.questions[index].answered_choices = this.answers[index];
          } else {
            console.log("提交失败");
            console.log(res);
            this.show_toast(res.data.errmsg, 1);
            // this.loading1 = false;
          }
        })
        .catch(res => {
          // console.log(res);
          this.show_toast("submit_answer发生错误", 1);
          // this.loading1 = false;
        });
    },
    endAnswer() {
      //结束答题
      //todo：向服务器发消息说我答完题了，可以停止计时了
      this.loadingEndAnswer = true;
      this.$axios
        .post(this.url + "submit_answer", {
          allOk: true
        })
        .then(res => {
          // console.log(res);
          if (res.data.isOk) {
            console.log("提交成功", res);
            this.show_toast("提交成功", 0);
            this.isFinished = true;
          } else {
            console.log("提交失败");
            console.log(res);
            this.show_toast(res.data.errmsg, 1);
            // this.loading1 = false;
          }
          this.loadingEndAnswer = false;
          this.endAnswerDialog = false;
        })
        .catch(res => {
          console.log(res);
          this.show_toast("endAnswer发生错误", 1);
          this.loadingEndAnswer = false;
        });
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
