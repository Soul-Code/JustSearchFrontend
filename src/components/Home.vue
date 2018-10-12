<template>
    <div>
        <mu-card class="title-card">
            <mu-card-title title="Just搜搜信息检索能力大赛" sub-title="比赛须知"></mu-card-title>
        </mu-card>

        <mu-expansion-panel>
            <div slot="header">报名 10.1-10.15</div>
            以三人为团体报名，每队一个队长，每人限报一队。答题开始之前可以任意更改队伍，答题开始之后信息无法更改。<br/>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">预选赛 10.12-10.16</div>
            1.以团队线上答题的形式，在预选赛期间在网站上答题，共179道，每道题只有两次答题机会，每小题分值相同，按照答题得分进行排名。<br/>
            2.前50组最终进入决赛。
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">团体赛 10.20</div>
            1.以团体为单位进行答题，比赛时间45分钟，共30题，每道题应有两次提交机会，提交错误则罚时2分钟，最终以答题得分和时间得分计算总分数和排名。<br>
            2.排名前25 名的队伍全员直接进入个人 赛。<br>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">复活赛 10.20</div>
            1.本环节为未进入决赛的团体中成员以个人身份参加，角逐个人赛的参赛名额。<br/>
            2.本环节为个人答题，每人共10道题，每道题有两次提交机会，从复活赛开始计时，提交错误罚时2分钟，限时20分钟。<br/>
            3.复活赛复活排名前15名选手。<br>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">个人赛 10.20</div>
            1.个人赛是由团队赛晋级的75人加复活成功的15人组成。个人赛时长为1个小时，共30题，每道题有且只有两次答题机会，提交错误会有罚时，罚时依照y=2^n，【简单：中等：困难 n=0：1：2】。<br>
            2.个人赛过程中，选手可以自主选择题目难度，最终以答题得分和时间得分计算总分数和排名。<br>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">积分规则</div>
            1.每个环节中会有一个分数和总用时，分数为第一参考，用时为第二参考。<br>
            2.预选赛，团体赛，复活赛罚时均为2分钟，个人赛中罚时依照y=2^n，【简单：中等：困难 n=0：1：2】。<br>
            3.预选赛每题分值相同均为2分；团体赛得分比例为【简单：中等：困难=1：3：5】；复活赛每题分值相同均为2分；个人赛积分比例【简单：中等：困难=2：5：8】。<br>
            4.团体赛的得分决定了个人赛的初始积分，团体赛排名前五名的队伍每人初始积分为15积分，第6到15名的队伍初始积分为10积分，其晋级团体赛的队伍初始积分为5积分。成功复活的选手没有积分。<br>
            5.预选赛共150题，题目难度不予显示；团体赛共30题【简单：中等：困难=12：12：6】；复活赛每人共10道题【中等题】；个人赛共30题【简单：中等：困难=9：12：9】。<br>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">注意事项</div>
            1.比赛需提前30分钟入场，比赛开始后不得入场。<br>
            2.比赛过程中出现设备问题，请立即与现场工作人员联系。<br>
            3.比赛过程中发现有违规行为，立即终止比赛取消成绩。<br>
            4.团队赛队伍至少两名队员才能参加比赛。只有通过预选赛的选手才有资格参加团队赛。<br>
            5.本比赛最终解释权归上海大学计算机学院所有。<br>
        </mu-expansion-panel>
        <mu-flex wrap="wrap" v-bind:justify-content="'end'">
            <mu-flex :fill="!isPc">
                <mu-button :round="!isPc" :full-width="!isPc" large color="primary" class="endBtn" to="Login">我要参赛！</mu-button>
            </mu-flex>
        </mu-flex>
    </div>
</template>
<style>
.endBtn{
    margin: 1rem 0
}
.title-card{
    margin: 1rem 0
}
</style>

<script>
export default{
    data(){
        return{
            isPc: document.documentElement.clientWidth > 900,
        }
    }
}
</script>
