<template>
  <!-- 左侧导航栏 -->
  <div id="sidebar" class="sd flex flex-direction justify-center align-center">
    <div class="sd-top"></div>
    <div class="sd-mid flex flex-direction  align-center">
      <Link :to="resolvePath(routes[0].path, item.path)" v-for="item in routes[0].children" :key="item.path">
      <a-dropdown :trigger="['contextmenu']" :overlayStyle="{ 'width': '80px' }">
        <div style="margin: 5px 0;" class="sd-mid-div flex flex-direction justify-around align-center"
          :class="{ active: selectedRouteName === item.name }" @click.stop="chooseBlock(item.name!)">
          <AntdIcon :name="item.meta?.icon" :style="atdIconSelected(item.name!)"></AntdIcon>
          <span class="sg-omit-sm" :class="{ active: selectedRouteName === item.name }">{{ item.meta?.title }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <!-- <a-menu-item key="1">编辑</a-menu-item> -->
            <a-menu-item key="2" @click.stop="deleteRoute(item)">删除</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      </Link>
      <AddGroupBtn>
        <AntdIcon :name="'PlusOutlined'" style="
        font-size: 20px;
        color: rgb(198, 211, 221);
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
         ">
        </AntdIcon>
      </AddGroupBtn>
    </div>
    <div class="sd-bottom"></div>
  </div>
</template>

<script lang="ts" setup>
import path from 'path';
import { useAppStore } from '@/store/app';
import Link from './Link.vue';
import AddGroupBtn from '@/components/AddGroupBtn.vue';
import { isExternal, calcContrastColor } from '@/utils/validate';
import { useWallpaperStore } from '@/store/wallpaper';
import router from '@/router';
const { proxy } = getCurrentInstance();
const route = useRoute();

let sidebarThemeColor = ref(useWallpaperStore().getCurrentWallpaperThemeColor)
let fontColor = ref(calcContrastColor(useWallpaperStore().getCurrentWallpaperThemeColor))
const selectedRouteName = ref<string>('');
const routerBasic = ['home', 'coder', 'designer', 'product', 'rest']

onMounted(() => {
  //赋值 高亮
  selectedRouteName.value = route.name as string
});
function atdIconSelected(name: string) {
  return 'font-size: 20px; color: #eeeeee';
}
async function deleteRoute(item: any) {
  if (routerBasic.includes(item.name)) {
    proxy.$message.error('系统内置，无法删除');
    return
  }
  // router.removeRoute(item.name);
  // 移除路由
  useAppStore().REMOVE_ASYNC_ROUTE(item.name)
  //当前删除的路由 是当下进入的路由则去首页
  if (item.name == route.name) {
    router.replace(`home`);
    selectedRouteName.value = 'home'
  }
}
const appStore = useAppStore();

const routes = computed(() => appStore.routes);

console.log('routes', routes.value[0].children)

// 二级子路由需要拼接path 例如：/noob-guide/account-login
const resolvePath = (basePath: string, routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(basePath)) {
    return basePath;
  }
  return path.resolve(basePath, routePath);
};

const chooseBlock = (routeName: string) => {
  selectedRouteName.value = routeName!;
};

</script>

<style scoped lang="scss">
.sd {
  width: 100%;
  height: 100%;
  background-color: v-bind(sidebarThemeColor); //计算出背景色
  backdrop-filter: blur(2px);

  .sd-mid {
    width: 100%;
    height: 60%;

    .sd-mid-div {
      width: 50px;
      height: 50px;

      &.active {
        background-color: #ffffff26;
      }

      span {
        font-weight: 500;
        color: v-bind(fontColor);
        font-size: 12px;
        line-height: 18px;

        &.active {
          // color: v-bind(fontColor);
          // color: #e9e9e999;
        }
      }
    }
  }
}
</style>
