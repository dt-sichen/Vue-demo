import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ADD_ITEMNUM = 'ADD_ITEMNUM'
const REMBER_ANSWER = 'REMBER_ANSWER'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
const COMPUTED_SCORE = 'COMPUTED_SCORE'
export default new Vuex.Store({
    state: {
        itemNum: 1, // 第几题
        result: [], // 这个数组用来记录
        totleScore: 0,
        rightResult:[1, 1, 1],
        problems:[
            {
                stem: '第一题问题',
                trueanser: 1,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '错误选项'
                    },
                    {
                        optionNumber: 1,
                        describe: '正确选项'
                    },
                    {
                        optionNumber: 2,
                        describe: '错误选项'
                    },
                    {
                        optionNumber: 3,
                        describe: '错误选项'
                    },
                ],
            },
            {
                stem:'第二题问题',
                trueanser: 1,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '错误选项'
                    },
                    {
                        optionNumber: 1,
                        describe: '正确选项'
                    },
                    {
                        optionNumber: 2,
                        describe: '错误选项'
                    },
                    {
                        optionNumber: 3,
                        describe: '错误选项'
                    },
                ],
            },
            {
                stem: '第三题问题',
                trueanser: 1,
                answer:[
                    {
                        // optionNumber这个当做计算成绩的索引值
                        optionNumber: 0,
                        describe: '错误选项'
                    },
                    {
                        optionNumber: 1,
                        describe: '正确选项'
                    },
                    {
                        optionNumber: 2,
                        describe: '错误选项'
                    },
                    {
                        optionNumber: 3,
                        describe: '错误选项'
                    },
                ],
            },
        ]
    },
    mutations: {
        //点击进入下一题
        [ADD_ITEMNUM](state) {
            state.itemNum ++;
        },
        //记录答案
        [REMBER_ANSWER](state, id) {
            state.result.push(id);
        },
        
        // 初始化信息
        [INITIALIZE_DATA](state) {
            state.itemNum = 1;
            state.result = [];
            state.totleScore = 0
        },
        [COMPUTED_SCORE](state) {
            state.result.forEach((item, index) => {
                if (item == state.rightResult[index]) {
                    state.totleScore += 20;
                }
            })
        }
    },
    actions: {
        addNum({ commit, state }, id) {
            //点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
            commit('REMBER_ANSWER', id);
            if (state.itemNum < state.problems.length) {
                commit('ADD_ITEMNUM');
            }
        },
        //初始化信息
        initializeData({ commit }) {
            commit('INITIALIZE_DATA');
        },
        // 计算总分
        countScore({ commit }) {
            commit('COMPUTED_SCORE');
        }
    }
})
