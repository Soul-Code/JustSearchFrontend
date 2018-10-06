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
      <div slot="header" style="margin:15px 10px">{{question.fields.question_text}}</div>
      <mu-flex class="select-control-group" align-items="center" wrap="wrap">
        <mu-flex class="select-control-row" justify-content="right"  fill :key="item" v-for="item in question.fields.choices.split(',')">
          <mu-radio :value="item" v-model="questions.answer" :label="item+' '+' '+' '"></mu-radio>
        </mu-flex>
      </mu-flex>
      <mu-button slot="action" flat color="primary">提交答案</mu-button>
    </mu-expansion-panel>

    
    <mu-flex justify-content="center" style="margin: 32px 0;">
      <mu-pagination raised :total="page_count" :current.sync="current" @change="change_pages"></mu-pagination>
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
        page_count:0,
        current: 1,
        activeStep: 1,
        questions: [{
          "model":"",
          "fields":{
            "question_text":"",
            "difficulty":0,
            "choices":""        
          },
          "pk":0,
        }],
      };
    },
    created() {
        var that = this;
        
        this.$axios
          .post(this.url + "get_questions/"+(this.current).toString())
          .then(res => {
            console.log(res);
            if (res.data.isOk) {
              this.questions = res.data.questions
              this.page_count = res.data.page_count
             
            } else {
              this.questions = [];
            }
          })
          .catch(res=>{
            this.show_toast("请再次刷新",1)
          });
    },
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
        var that = this;
     
        this.$axios
          .post(this.url + "get_questions/"+(this.current).toString())
          .then(res => {
            console.log(res);
            if (res.data.isOk) {
              this.questions = res.data.questions
              this.page_count = res.data.page_count
               
            } else {
              this.questions = [];
            }
          })
          .catch(res=>{
            this.show_toast("请再次刷新",1)
          });
      },
      show_toast(string,type){
        if (type == 1) {
        this.$toast.error(string);
      } else {
        this.$toast.success(string);
      }
      }
    }
  };

</script>
