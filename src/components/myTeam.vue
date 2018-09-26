<template>
    <mu-flex justify-content="center" >
        <mu-card raised class="card-main">
            <mu-flex justify-content="between">
                <mu-flex>
                    <mu-card>
                        你好
                    </mu-card>
                </mu-flex>
                <mu-flex>
                    <div class="demo-vsteper-container">
                        <mu-stepper :active-step="vactiveStep" orientation="vertical">
                            <mu-step>
                                <mu-step-label>
                                    报名比赛
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        点击下面的按钮来报名~
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">点我报名</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step>
                                <mu-step-label>
                                    完善信息
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        点击下面的按钮完善信息~
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">完善信息</mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step v-if="isTeamed">
                                <mu-step-label>
                                    加入/创建队伍
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        参加比赛的小可爱们，你们可以选择创建属于自己的队伍（你将成为队长），或者选择加入别人的队伍~
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">加入队伍</mu-button>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">创建队伍</mu-button>
                                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step v-if="isTeamed">
                                <mu-step-label>
                                    分享队伍
                                </mu-step-label>
                                <mu-step-content>
                                    <p>
                                        恭喜你已经拥有了自己的队伍哦，但是由于你的队伍成员不满三人，暂时无法参赛呢，你可以选择分享队伍，让更多的小伙伴加入哦~
                                        <br>
                                        <span style="color:red">
                                            <strong> 注意！请慎重选择你的队友， 现场赛时会验证身份,一旦发现队伍人员不齐或者代替他人参赛者，主办方有权取消其比赛资格！
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
      vactiveStep: 3,
      isTeamed: true
    };
  },
  computed: {
    vfinished() {
      return this.vactiveStep > 3;
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
    createTeam() {},
    joinTeam() {}
  }
};
</script>

<style>
.demo-vsteper-container {
  max-width: 24rem;
  max-height: 100rem;
  margin: auto;
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
.card-main {
  margin: 2rem 0;
  padding: 2rem 0;
}
</style>