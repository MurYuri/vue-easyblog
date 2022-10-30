import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: '首页',
        redirect: '/login'

    },
    {
        path: '/login',
        name: '登录',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/test',
        name: '测试',
        component: () => import('../views/TestView.vue'),
    },
] 

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router