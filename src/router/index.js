import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/index',
        name: '首页',
        component: () => import('../views/Index.vue'),
    }
] 

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router