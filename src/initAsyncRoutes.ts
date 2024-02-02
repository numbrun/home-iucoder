import { RouteLocationNormalized } from 'vue-router'; // to参数的类型 在vue-router包的声明文件中已经全局导出
import router from '@/router';
// import { RouterRowTy } from '~/router';
import { useAppStore } from '@/store/app';
import { useGridsStore } from '@/store/grids';

// 初始化动态路由
function initAsnycRoutes() {
  const asyncRoutes = useAppStore().getAsyncRoutes;
  if (asyncRoutes && asyncRoutes.length > 0) {
    // 对存储的动态路由进行遍历 增到路由中
    asyncRoutes.forEach((e: any) => {
      e.component = () => import('@/views/common-template/index.vue');
      router.addRoute('father', e);
      useAppStore().MODIFY_ISINITASYNCROUTES(true);
      useAppStore().ADD_ASYNC_ROUTES(e);
    });
  } else {
    useAppStore().MODIFY_ISINITASYNCROUTES(true);
  }
}

//前置守卫
router.beforeEach((to: RouteLocationNormalized, from, next) => {
  if (useAppStore().getIsInitAsyncRoutes) {
    useGridsStore().SYNC_SELECTED_GRIDS(to.meta.title as string);
    next();
  } else {
    initAsnycRoutes();
    next({ ...to, replace: true });
  }
});
