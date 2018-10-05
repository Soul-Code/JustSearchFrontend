<template>
  <mu-container class="answer-main">
    <mu-dialog title="Dialog" width="360" :esc-press-close="false" :overlay-close="false" :open.sync="openDialog">
      比赛时间未到~
      <mu-button slot="actions" flat color="primary" @click="go_out">Close</mu-button>
    </mu-dialog>
    <mu-flex justify-content="center">
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
    </mu-flex>

    <mu-expansion-panel :key="question.id" v-for="question in questions">
      <!-- <div slot="header">1.我我是题目的内容我是题目的内容我是题目的内容我是题目的内容</div>
            <mu-radio value="q1" v-model="questions.answer" label="A.有毒"></mu-radio>
            <mu-radio value="q2" v-model="questions.answer" label="B.没毒"></mu-radio> -->
      <div slot="header">{{question.question_text}}</div>
      <mu-flex class="select-control-group" align-items="center" wrap="wrap">
        <mu-flex class="select-control-row" justify-content="right"  fill :key="item" v-for="item in question.choices.split(',')">
          <mu-radio :value="item" v-model="questions.answer" :label="item+' '+' '+' '"></mu-radio>
        </mu-flex>
      </mu-flex>
      <mu-button slot="action" flat color="primary">提交答案</mu-button>
    </mu-expansion-panel>

    <mu-expansion-panel>
      <div slot="header">Panel 2</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
      lobortis eget.
    </mu-expansion-panel>
    <mu-expansion-panel>
      <div slot="header">Panel 3</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
      lobortis eget.
    </mu-expansion-panel>
    <mu-flex justify-content="center" style="margin: 32px 0;">
      <mu-pagination raised :total="1000" :current.sync="current" @change="change_pages"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>
<style>
  .answer-main {
    margin-top: 10px;
  }

  .content-stepper {
    width: 70%
  }
  .select-control-row{
      margin: 10px 0
  }

</style>
<script>
  export default {
    data() {
      return {
        openDialog: false,
        current: 3,
        activeStep: 1,
        questions: [{
            id: '0',
            question_text: '问题描述1',
            choices: '有毒,没毒,我不知道~'
          },
          {
            id: '1',
            question_text: '问题描述2',
            choices: '有气222222222222222222222222222222222222,有气222222222222222222222222222222222222,有气222222222222222222222222222222222222,有气222222222222222222222222222222222222'
          },
        ]
      };
    },
    created() {},
    mounted() {},
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
      change_pages(){
          this.questions[1].question_text = "lalala"+this.current
      }
    }
  };

</script>
