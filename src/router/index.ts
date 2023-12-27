import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue')
    }
  ]
})

export default router


// /*
//  * @Autor:
//  * @Date: 2021-08-25 01:53:35
//  * @LastEditors:
//  * @LastEditTime: 2022-09-19 21:52:11
//  * @Description:
//  */
// import Vue from 'vue';
// import Router from 'vue-router';
// import state from '@/store/state/state';
// import routes from '@/config/router.config.json';

// // 获得路由原型
// const originalPush = Router.prototype.push;
// // 重写router的push方法，避免压入当前展示路由引起的报错
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

// // import Nprogress from 'nprogress';
// // import 'nprogress/nprogress.css';

// Vue.use(Router);

// // 创建路由节点
// const createRoute = routes => {
//   return routes.reduce((processedRoutes, currentRoute) => {
//     processedRoutes.push(processRouteObj(currentRoute));
//     return processedRoutes;
//   }, []);
// };

// // 传入对象作为参数，并且经过对象解构的方式获得变量。
// const processRouteObj = ({ menuCode, children, component, title, ...args }) => {
//   return Object.assign(
//     {
//       meta: { menuCode, children, title },
//       // 引入路由对应的组件
//       component: () => import(/* webpackInclude: /\.(js|vue)$/ */ `@/views/${component}`),
//       // 通过递归调用的方式进行都子路由的处理
//       children: children ? createRoute(children) : [],
//     },
//     args,
//   );
// };

// // 创建路由实例对象
// const router = new Router({
//   mode: 'hash',
//   routes: createRoute(routes),
// });

// // 数组扁平化
// function flatten(arr, parentPath) {
//   let res = [];
//   arr.map(item => {
//     if (item.children && item.children.length != 0) {
//       // 有子路由
//       item.path = parentPath ? `${parentPath}/${item.path}` : item.path;
//       res.push(item.path);
//       res = res.concat(flatten(item.children, item.path));
//     } else {
//       if (parentPath) {
//         res.push(`${parentPath}/${item.path}`);
//       } else {
//         res.push(item.path);
//       }
//     }
//   });
//   return res;
// }
// const routePaths = flatten(router.options.routes);


// // 路由前置守卫
// router.beforeEach(() => {
 
// });

// // 路由后置守卫
// router.afterEach(() => {
// });

// export default router;

