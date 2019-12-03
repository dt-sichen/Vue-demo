import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Score from '../views/Score.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    // 路由两种写法
    {
        path: '/question',
        name: 'question',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Question.vue')
    },
    {
        path: '/score',
        name: 'score',
        component: Score
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
