import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import commonRouter from '@/router/common'
import clientRouter from '@/router/client'
import serverRouter from '@/router/server'

const routes = [
    {
        path: '/',
        redirect: '/common'
    },
    {
        path: '/common',
        fullPath: '/common',
        name: 'common',
        label: '公共路由',
        component: () => import('@/views/common/common-view'),
        redirect: '/common/login',
        children: commonRouter
    },
    {
        path: '/client',
        fullPath: '/client',
        name: 'client',
        label: '客户端路由',
        component: () => import('@/views/client/client-view'),
        redirect: '/client/index',
        children: clientRouter
    },
    {
        path: '/server',
        fullPath: '/server',
        name: 'server',
        label: '服务端路由',
        component: () => import('@/views/server/server-view'),
        redirect: '/server/person-info',
        children: serverRouter
    },
]

const router = new VueRouter({
    routes
})

export default router
