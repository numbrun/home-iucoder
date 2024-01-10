//createWebHashHistory｜createWebHistory
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import Layout from '@/layout'
// import { RouterTy } from '~/router'

export const constantRoutes: any = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'father',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '主页', icon: 'HomeOutlined' },
      },
      {
        path: 'coder',
        name: 'coder',
        component: () => import('@/views/coder/index.vue'),
        meta: { title: '编程', icon: 'CodeSandboxOutlined' },
      },
      {
        path: 'designer',
        name: 'designer',
        component: () => import('@/views/designer/index.vue'),
        meta: { title: '设计', icon: 'LikeOutlined' },
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/rest/index.vue'),
        meta: { title: '产品', icon: 'WalletOutlined' },
      },
      {
        path: 'rest',
        name: 'rest',
        component: () => import('@/views/rest/index.vue'),
        meta: { title: '摸鱼', icon: 'CoffeeOutlined' },
      }
    ]
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
  routes: constantRoutes
})


export default router


