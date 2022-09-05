export default [
    {
        path: 'login',
        fullPath: '/common/login',
        name: 'CommonLogin',
        label: '登陆',
        component: () => import('@/views/common/components/login')
    },
    {
        path: 'register',
        fullPath: '/common/register',
        name: 'CommonRegister',
        label: '注册',
        component: () => import('@/views/common/components/register')
    },
]
