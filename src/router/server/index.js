export default [
    {
        path: 'person-info',
        fullPath: '/server/person-info',
        name: 'PersonInfo',
        label: '个人中心',
        meta: {
            title: '首页统计'
        },
        component: () => import('@/views/server/components/person-info')
    },
    {
        path: 'note-manage',
        fullPath: '/server/note-manage',
        name: 'NoteManage',
        label: '笔记管理',
        meta: {
            title: '笔记管理'
        },
        component: () => import('@/views/server/components/note-manage')
    },
    {
        path: 'category-manage',
        fullPath: '/server/category-manage',
        name: 'CategoryManage',
        label: '类目管理',
        meta: {
            title: '类目管理'
        },
        component: () => import('@/views/server/components/category-manage')
    },
    {
        path: 'log-check',
        fullPath: '/server/log-check',
        name: 'LogCheck',
        label: '查看日志',
        meta: {
            title: '查看日志'
        },
        component: () => import('@/views/server/components/log-check')
    },
    {
        path: 'account-manage',
        fullPath: '/server/account-manage',
        name: 'AccountManage',
        label: '账户管理',
        meta: {
            title: '账户管理'
        },
        component: () => import('@/views/server/components/account-manage')
    },
]
