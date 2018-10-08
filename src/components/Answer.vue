<template>
  <mu-container class="answer-main">
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
          <!-- <mu-list-item button @click="show_answered = !show_answered"> -->
          <!-- <mu-list-item-title>显示已答</mu-list-item-title>
            <mu-list-item-action>
              <mu-switch v-model="show_answered" readonly></mu-switch>
            </mu-list-item-action> -->
          <!-- </mu-list-item> -->
          <mu-list-item button @click="expand_all">
            <mu-list-item-title>展开所有</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="close_all">
            <mu-list-item-title>收缩所有</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-flex>

    <mu-flex class="demo-linear-progress">
      <mu-linear-progress :value="(linear/page_count)*100" mode="determinate" size=5 color="green"></mu-linear-progress>
    </mu-flex>

    <mu-expansion-panel v-for="(question,index) in questions" :style="questions[index].answered_num>=2?'pointer-events: none;':''" :expand.sync="expand_list[index]" :key="question.pk">
      <!-- <div slot="header">1.我我是题目的内容我是题目的内容我是题目的内容我是题目的内容</div>
            <mu-radio value="q1" v-model="questions.answer" label="A.有毒"></mu-radio>
            <mu-radio value="q2" v-model="questions.answer" label="B.没毒"></mu-radio> -->
      <mu-flex slot="header" style="margin:13px 10px;font-size:16px" fill direction="row" justify-content="between" align-items="center">
        {{question.pk}}.{{question.fields.question_text}}
        <mu-button slot="action" :color="questions[index].answered_num==2?'red':'primary'" @click.stop="submit_answer(question.pk,index)">{{questions[index].answered_num==1?"再次提交":
          (questions[index].answered_num>=2?"不能再提交了哦":"提交答案")}}</mu-button>
      </mu-flex>
      <mu-flex class="select-control-group" wrap="wrap">
        <mu-flex class="select-control-row" fill :key="item" v-for="(item,i) in question.fields.choices.split(',')">
          <mu-radio :value="i" v-model="answers[index]" :label="item+' '+' '+' '"></mu-radio>
        </mu-flex>
      </mu-flex>
    </mu-expansion-panel>

    <mu-flex justify-content="center" style="margin: 32px 0;">
      <mu-pagination raised :total="page_count" :current.sync="current" @change="change_pages"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>
<style>
.demo-linear-progress {
  margin: 0 0;
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

@media screen and (max-width: 500px) {
  .btn-page-setting {
    margin-bottom: 15px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      openDialog: false,
      page_count: 0,
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
      linear: 0,
      expand_list: [false, false, false, false, false, false, false, false, false, false],
      answers: new Array(10),
      time_now:0,
    };
  },
  created() {
    
    var that = this;

    this.$axios
      .post(this.url + "get_questions")
      .then(res => {
        console.log(res);
        if (res.data.isOk) {
          this.questions = res.data.questions;
          this.page_count = res.data.page_count;
          this.linear = res.data.answered_num_all;
          console.log("page_count", this.page_count);
          console.log("test:", this.questions[1].answered_num);
        } else {
          this.questions = [];
        }
      })
      .catch(res => {
        this.show_toast("请再次刷新", 1);
      });
    this.$axios
      .post(this.url + "get_stages")
      .then(res => {
        console.log(res);
        this.stages = res.data.stages;
        this.time_now = res.data.time_now;
        console.log(Date);
        if(this.stages[0].fields.timeStart<this.time_now<this.stages[0].fields.timeEnd){
        this.activeStep=0;
      }
       else if(this.stages[1].fields.timeStart<this.time_now<this.stages[1].fields.timeEnd){
        this.activeStep=1;
      }
      else if(this.stages[2].fields.timeStart<this.time_now<this.stages[2].fields.timeEnd){
        this.activeStep=2;
      }
       else if(this.stages[3].fields.timeStart<this.time_now<this.stages[3].fields.timeEnd){
        this.activeStep=3;
      }
      })
      .catch(res => {
        this.show_toast("请再次刷新", 1);
      });
      

     
  },
  mounted() {},
  computed: {

  },
  methods: {
    go_out() {
      this.$router.push("myTeam");
    },
    change_pages() {
      var that = this;

      this.$axios
        .post(this.url + "get_questions/" + this.current.toString())
        .then(res => {
          console.log(res);
          if (res.data.isOk) {
            this.questions = res.data.questions;
            this.page_count = res.data.page_count;
          } else {
            this.questions = [];
          }
        })
        .catch(res => {
          this.show_toast("请再次刷新", 1);
        });
         for (var i = 0; i < this.questions.length; i++) {
        this.expand_list[i] = false;
      }

    },
    show_toast(string, type) {
      if (type == 1) {
        this.$toast.error(string);
      } else {
        this.$toast.success(string);
      }
    },
    submit_answer(pk, index) {
       if(this.answers[index]===undefined){
        console.log('undefined');
        return
      }
      if (this.questions[index].answered_num == 0) {
        this.linear = this.linear + 1;
      }
      if (this.questions[index].answered_num < 2) {
        this.questions[index].answered_num = this.questions[index].answered_num + 1;
      }
      if (this.questions[index].answered_num >= 2) {
        this.expand_list[index] = false;
      }
     
      this.$axios
        .post(this.url + "submit_answer", { question_pk: pk, choice: this.answers[index] })
        .then(res => {
          // console.log(res);
          if (res.data.isOk) {
            console.log("提交成功", res);
            this.show_toast("提交成功", 0);
            if (this.questions[index].answered_num == 0) {
              this.linear = this.linear + 1;
            }
            if (this.questions[index].answered_num < 2) {
              this.questions[index].answered_num = this.questions[index].answered_num + 1;
            }
            if (this.questions[index].answered_num >= 2) {
              this.expand_list[index] = false;
            }
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
    panel_change(index) {
      // console.log("num in", this.questions[index].answered_num);
      // if (this.questions[index].answered_num >= 2) {
      //   this.expand_list[index] = false;
      //   console.log("panel_change", this.expand_list[index]);
      // } else {
      //   this.expand_list[index] = !this.expand_list[index];
      //   console.log("panel_change", this.expand_list[index]);
      // }
    }
  }
};
</script>
