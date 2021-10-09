const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/default.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: { title: '仪表盘', icon: 'el-icon-odometer' }
      },
      {
        path: '/article',
        meta: { title: '文章管理', icon: 'el-icon-document' },
        component: () => import('@/views/Article'),
        children: [
          {
            path: '/article/create',
            component: () => import('@/views/Article/Editor'),
            hidden: false,
            meta: {
              title: '发表文章'
            }
          },
          {
            path: '/article/edit/:id',
            component: () => import('@/views/Article/Editor'),
            hidden: true
          },
          {
            path: '/article/list',
            component: () => import('@/views/Article/List'),
            hidden: false,
            meta: {
              title: '文章列表'
            }
          }
        ]
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/Category'),
        meta: { title: '分类管理', icon: 'el-icon-folder-opened' }
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/Tag'),
        meta: { title: '标签管理', icon: 'el-icon-price-tag' }
      },
      {
        path: '/file',
        name: 'File',
        component: () => import('@/views/File'),
        meta: { title: '文件管理', icon: 'el-icon-picture-outline' }
      },
      {
        path: '/setting',
        name: 'Setting',
        meta: { title: '系统设置', icon: 'el-icon-setting' },
        component: () => import('@/views/Setting'),
        children: [
          {
            path: '/setting/profile',
            component: () => import('@/views/Setting/Profile.vue'),
            hidden: false,
            meta: {
              title: '个人信息'
            }
          },
          {
            path: '/setting/option',
            component: () => import('@/views/Setting/Option.vue'),
            hidden: false,
            meta: {
              title: '站点配置'
            }
          }
        ]
      }
    ]
  },
]

export default routes