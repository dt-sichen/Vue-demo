<template>
    <div class="show">
        <!-- 依据案例欢迎界面和答题界面布局是相同的所以引入到同一个组件里面 -->
        <header class="head">
            <h3 class="head-hometips" v-if="connectComponent == 'home'">欢迎来到专项训练</h3>
            <h3 class="head-questiontips" v-if="connectComponent == 'question'">题目{{ itemNum }}</h3>
        </header>
        <div class="content">
            <!-- 首页内容 -->
            <h4 class="content-hint" v-if="connectComponent == 'home'">认真审题加油完成哦</h4>
            <!-- 题目界面内容 -->
            <div class="content-topic" v-if="connectComponent == 'question'">
                <div class="content-topic-question">
                    {{ problems[itemNum-1].stem }}
                </div>
                <div class="content-topic-answer">
                    <ul>
                        <!-- 这边ABCD的显示由chooseType函数实现显示 -->
                        <li style="margin-bottom: 4px" v-for="(item, index) in problems[itemNum-1].answer" @click="choosed(index)">
                            <span :class="{'beenchoosed':choosedId == index}">{{ chooseType(index) }}. </span>
                            <span :class="{'beenchoosed':choosedId == index}">{{ item.describe }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 结算界面内容 -->
            <div class="content-score" v-if="connectComponent == 'score'">总分为:{{ totleScore }}</div>
        </div>
        <footer class="foot">
            <div class="foot-home" v-if="connectComponent == 'home'">
                <!-- 首页按钮点击路由到题目界面 -->
                <router-link to="question" class="" style="font-weight:400">开始做题</router-link>
            </div>
            <div class="foot-questiontips" v-if="connectComponent == 'question'">
                <!-- 这边判定一下到最后一题的时候显示 -->
                <span style="font-weight: 400;" @click="submitChoose" v-if="itemNum < problems.length">下一题</span>
                <span style="font-weight: 400;" v-else @click="submitAnswer">交 卷</span>
            </div>
        </footer>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'show',
    props: [
        'connectComponent'
    ],
    created() {
        // 页面在首页的时候初始化一下所有的值
        if(this.fatherComponent == 'home') {
            this.initializeData();
        }
    },
    computed: mapState([
        'itemNum',
        'result',
        'problems',
        'rightResult',
        'totleScore'
    ]),
    data() {
        return {
            choosedId: null // 用于存所选答案索引
        }
    },
    methods: {
        chooseType: type => {
            switch(type){
                case 0: return 'A';
                case 1: return 'B';
                case 2: return 'C';
                case 3: return 'D';
            }
        },
        choosed(type) {
            this.choosedId = type;
        },
        submitChoose() {
            // 当点击下一题时我们提交当前所选答案值
            if(this.choosedId != null) {
                //保存答案, 题目索引加一，跳到下一题
                this.addNum(this.choosedId);
                this.choosedId = null;
            }
            else {
                alert('还未选择答案');
            }
        },
        ...mapActions([
            'addNum', 'initializeData', 'countScore'
        ]),
        submitAnswer() {
            if(this.choosedId != null) {
                // 交卷按钮任然要保存最后一个题答案，并且路由到结算页面
                this.addNum(this.choosedId);
                this.choosedId = null;
                this.countScore();
                this.$router.push('score');
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .show {
        position: relative;
    }
    .head {
        position: absolute;
        left: 120px;
        top: 60px;
        &-hometips {
            font-weight: 800;
        }
    }
    .content {
        position: absolute;
        left: 120px;
        top: 100px;
        &-hint {
            font-weight: 400;
        }
        &-topic {
            &-question {
                margin-bottom: 10px;
            }
        }
    }
    .foot {
        position: absolute;
        left: 160px;
        top: 625px;
    }
    .beenchoosed {
        color: orange;
    }
</style>