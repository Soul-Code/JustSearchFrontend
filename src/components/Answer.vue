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

        <mu-expansion-panel>
            <div slot="header">1.我我是题目的内容我是题目的内容我是题目的内容我是题目的内容</div>
            <mu-radio value="q1" v-model="questions.answer" label="A.有毒"></mu-radio>
            <mu-radio value="q2" v-model="questions.answer" label="B.没毒"></mu-radio>
            <mu-button slot="action" flat color="primary">提交答案</mu-button>
        </mu-expansion-panel>

        <mu-expansion-panel>
            <div slot="header">Panel 2</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">Panel 3</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </mu-expansion-panel>
        <mu-flex justify-content="center" style="margin: 32px 0;">
            <mu-pagination raised :total="1000" :current.sync="current"></mu-pagination>
        </mu-flex>
    </mu-container>
</template>
<style>
.answer-main {
  margin-top: 10px;
}
.content-stepper{
    width: 70%
}
</style>
<script>
export default {
  data() {
    return {
      openDialog: false,
      current: 3,
      activeStep:1,
      questions:[
          {id:'0',question_text:'问题描述1',choices:'有毒,没毒,我不知道~'},
          {id:'1',question_text:'问题描述2',choices:'有气,没气,我知道但是我不告诉你~'},
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    go_out() {
      this.$router.push("myTeam");
    }
  }
};
</script>