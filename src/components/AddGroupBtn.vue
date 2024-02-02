<template>
  <a-popover trigger="click" color="rgba(0,0,0,.2)" :overlayStyle="{ 'color': '#fff' }" overlayClassName='add-popover'
    :overlayInnerStyle="{
      'backdrop-filter': 'blur(20px)',
    }" placement="right" v-model:open="data.visible">
    <template #title>
      <span style="color: #fff;">
        添加分类
      </span>
    </template>
    <template #content>
      <div class="group">
        <div class="group-icons flex flex-wrap">
          <AntdIcon class="s-group-icon" v-for="item in data.groupIcons" :name="item.iconName"
            :style="'font-size: 22px; color: #fff; margin-left: 10px; margin-top: 6px; padding: 4px; border-radius: 4px'"
            :class="{ selected: data.selectedIcon === item.iconName }" @click="selectIcon(item)"></AntdIcon>
        </div>
      </div>
      <a-input-group compact style="margin-top: 28px;">
        <a-input :bordered="false" class="search-ipt" v-model:value="data.groupName" style="width: calc(100% - 99px)"
          placeholder="输入分类名称" />
        <a-button ghost @click="submitGroup">添加分类</a-button>
      </a-input-group>
    </template>
    <slot />
  </a-popover>
</template>

<script lang="ts" setup>
const { proxy } = getCurrentInstance();

import router from '@/router';
import { useAppStore } from '@/store/app';

let data = ref({
  visible: false,
  groupName: '常用',
  selectedIcon: 'HeartOutlined',
  groupIcons: [
    {
      iconName: 'HeartOutlined',
      iconText: '常用',
    },
    {
      iconName: 'MailOutlined',
      iconText: '邮箱',
    },
    {
      iconName: 'PictureOutlined',
      iconText: '图片',
    },
    {
      iconText: '购物',
      iconName: 'ShoppingCartOutlined'
    },
    {
      iconText: '阅读',
      iconName: 'ReadOutlined'
    },
    {
      iconText: '金融',
      iconName: 'PayCircleOutlined'
    },
    {
      iconText: '工具',
      iconName: 'ToolOutlined'
    },
    {
      iconText: '摄影',
      iconName: 'VideoCameraOutlined'
    },
    {
      iconText: '旅游',
      iconName: 'CarOutlined'
    },
    {
      iconText: '音乐',
      iconName: 'CustomerServiceOutlined'
    },
    {
      iconText: '服务器',
      iconName: 'CloudOutlined'
    }
  ]
})
function selectIcon(row: any = {}) {
  data.value.selectedIcon = row.iconName;
  data.value.groupName = row.iconText;
}
const submitGroup = () => {
  if (data.value.groupName.length === 0 || data.value.selectedIcon.length === 0) return;

  if (useAppStore().routes[0].children.length > 8) {
    proxy.$message.error('最多9个分组!');
    return;
  }

  if (useAppStore().getRouteIsExisted(data.value.selectedIcon.toLowerCase())) {
    proxy.$message.error('此类型模块已存在!');
    return;
  }

  const localStorageExistedAsyncRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES')!);
  console.log('localStorageExistedAsyncRoutes',localStorageExistedAsyncRoutes)
  const routeObj = {
    path: data.value.selectedIcon.toLowerCase(),
    name: data.value.selectedIcon.toLowerCase(),
    meta: {
      title: data.value.groupName,
      icon: data.value.selectedIcon
    },
    component: () => import('@/views/common-template/index.vue')
  };

  console.log('localStorageExistedAsyncRoutes',localStorageExistedAsyncRoutes)
  if (localStorageExistedAsyncRoutes) {
    localStorageExistedAsyncRoutes.push(routeObj);
    localStorage.setItem('ASYNC_ROUTES', JSON.stringify(localStorageExistedAsyncRoutes));
  } else {
    localStorage.setItem('ASYNC_ROUTES', JSON.stringify([routeObj]));
  }

  // 创建成功后加入创建模块的grids列表
  localStorage.setItem(data.value.groupName.toUpperCase(), JSON.stringify({
    icon: [],
    component: []
  }));

  // 动态添加一个路由，往fater父路由中添加
  router.addRoute('father', routeObj);
  data.value.visible = false;

  // 刷新侧边栏UI
  proxy.$nextTick(() => {
    useAppStore().ADD_ASYNC_ROUTES(routeObj);
  });
}

</script>

<style scoped lang="scss">
.group-icons {
  width: 260px;
  height: 66px;
  margin-bottom: 10px;

  .s-group-icon {
    color: #fff;

    &:hover {
      background-color: #fff3;
    }

    &.selected {
      background-color: #fff3;
    }
  }
}

.search-ipt {
  background-color: rgba(255, 255, 255, 0.8);
  /* 调整模糊程度 */
  backdrop-filter: blur(5px);
  height: 32px;
}
</style>
