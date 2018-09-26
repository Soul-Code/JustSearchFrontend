<template>
    <mu-flex justify-content="center">
        <mu-card raised class="card-main">
            <mu-flex wrap="wrap" v-bind:justify-content="isPc?'between':'center'">
                <mu-flex fill>
                    <mu-card class="card-info" style="">
                        <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title">
                            <img src="../assets/logo.png">
                        </mu-card-media> -->
                        <mu-card-title class="title-name" title="姓名">
                        </mu-card-title>
                        <mu-list dense>
                            <mu-list-item>
                                当前个人积分：50分
                            </mu-list-item>
                            <mu-list-item>
                                QQ：123456789
                            </mu-list-item>
                            <mu-list-item>
                                TEL：18111111111
                            </mu-list-item>
                        </mu-list>
                        <!-- <mu-card-title class="title-name" title="我的队伍："></mu-card-title> -->
                        <mu-list>
                            <mu-sub-header>我的队伍</mu-sub-header>
                            <mu-list-item avatar button :ripple="true">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <img src="../assets/logo.png">
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>队伍名称</mu-list-item-title>
                                    <mu-list-item-sub-title>当前队伍积分：99分</mu-list-item-sub-title>
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

                                    <mu-list-item-title>组员1</mu-list-item-title>
                                </mu-list-item-content>
                                <mu-list-item-action>
                                    <!-- <mu-list-item-after-text>15 min</mu-list-item-after-text> -->

                                    <mu-tooltip placement="top" content="踢出队员">
                                        <mu-button icon color="error">
                                            <mu-icon value="close"></mu-icon>
                                        </mu-button>
                                    </mu-tooltip>
                                    <!-- <mu-checkbox color="yellow700" v-model="selects" value="value1" uncheck-icon="star_border" checked-icon="close"></mu-checkbox> -->
                                </mu-list-item-action>
                            </mu-list-item>
                        </mu-list>

                        <!-- <mu-card-text>
                            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                            调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                            似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                            找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                        </mu-card-text>
                        <mu-card-actions>
                            <mu-button flat>Action 1</mu-button>
                            <mu-button flat>Action 2</mu-button>
                        </mu-card-actions> -->
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
                                        登陆成功，现在点击下面的按钮输入信息来报名~
                                    </p>
                                    <mu-button class="demo-step-button" @click="vhandleNext" color="primary">点我报名</mu-button>
                                </mu-step-content>
                            </mu-step>
                            <mu-step v-if="!isTeamed">
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
      vactiveStep: 0,
      isTeamed: false,
      fullWidth: document.documentElement.clientWidth,
      isPc: document.documentElement.clientWidth > 1000
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
    createTeam() {},
    joinTeam() {}
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