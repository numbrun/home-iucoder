import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';

type LsRouteTy = Pick<any, 'name' | 'meta' | 'path'>
//左侧路由相关模块
export const useAppStore = defineStore('app', {
  state: () => ({
    cachedViews: [] as Array<string>,
    routes: constantRoutes, // 静态路由和动态路由集合
    isInitAsyncRoutes: false as boolean //动态路由状态
  }),
  getters: {
    getAsyncRoutes: () => JSON.parse(localStorage.getItem('ASYNC_ROUTES')!) || [],
    getIsInitAsyncRoutes: state => state.isInitAsyncRoutes,
    getRouteIsExisted: (): Function => (routeName: string): boolean => {
      const asyncRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES')!) || [];
      if (!asyncRoutes) return false;
      const result = asyncRoutes.findIndex((v: LsRouteTy) => v.name === routeName);
      if (result > -1) {
        return true;
      }
      return false;
    }
  },
  actions: {
    //动态路由增加
    ADD_ASYNC_ROUTES(routeObj: any) {
      this.$patch(state => {
        state.routes[0].children?.push(routeObj);
      });
    },
    //移除路由
    async REMOVE_ASYNC_ROUTE(routerName: string) {
      this.$patch(state => {
        console.log('state.routes', state.routes[0])
        // 过滤掉名称为指定值的路由对象
        const filteredRoutes = state.routes[0].children.filter((route: any) => route.name !== routerName);
        state.routes[0].children = filteredRoutes

        let prevRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES')!) || [];
        console.log('prevRoutes', prevRoutes, routerName)
        const filterPrevRoutes = prevRoutes.filter((route: any) => route.name !== routerName);
        prevRoutes = filterPrevRoutes
        localStorage.setItem('ASYNC_ROUTES', JSON.stringify(prevRoutes));
      });
    },
    // 更改动态路由状态
    MODIFY_ISINITASYNCROUTES(bool: boolean) {
      this.$patch(state => {
        state.isInitAsyncRoutes = bool;
      });
    },
    /* keepAlive缓存操作 */
    // ADD_CACHED_VIEW(view: string) {
    //   this.$patch(state => {
    //     if (state.cachedViews.includes(view)) return;
    //     state.cachedViews.push(view);
    //   });
    // },
    // DEL_CACHED_VIEW(view: string) {
    //   this.$patch(state => {
    //     const index = state.cachedViews.indexOf(view);
    //     index > -1 && state.cachedViews.splice(index, 1);
    //   });
    // },
    // RESET_CACHED_VIEW() {
    //   this.$patch(state => {
    //     state.cachedViews = [];
    //   });
    // }
  }
});
