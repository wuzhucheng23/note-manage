export default [
    {
        path: 'list/:type',
        fullPath: '/client/list/:type',
        name: 'ClientList',
        label: '列表',
        component: () => import('@/views/client/components/list')
    },
    {
        path: 'article/:type',
        fullPath: '/client/article/:type',
        name: 'ClientArticle',
        label: '文章',
        component: () => import('@/views/client/components/article')
    },
]
