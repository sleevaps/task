import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { userStore } from '@/modules/user'


import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/',
            component: DefaultLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Dashboard
                }
            ]
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        }
    ]
})

router.beforeEach((to) => {
    const isAuth = userStore.state.isAuth

    if (to.meta.requiresAuth && !isAuth) {
        return { name: 'login' }
    }

    if (to.name === 'login' && isAuth) {
        return { name : 'dashboard' }
    }
})

export default router