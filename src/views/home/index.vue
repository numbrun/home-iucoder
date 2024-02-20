<template>
  <a-dropdown :trigger="['contextmenu']" :overlayStyle="{ 'width': '110px' }">
    <div class="ya-matter flex flex-direction align-center home-box">
      <header :style="modeStore.GET_Mode ? 'margin-top: 18vh;' : ''"
        class="flex flex-direction justify-center align-center">
        <HeadDate @click="clickHeadDate" />
        <SearchEngine class="se" />
      </header>
      <main v-show="!modeStore.GET_Mode">
        <section class="grid-stack beautiful-sm-scroll">
        </section>
      </main>
      <footer v-if="modeStore.GET_Mode" class="footer-box">
        <BottomSentence />
      </footer>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click.stop="addNewWidget()">
          <AntdIcon :name="'PlusOutlined'" :style="'font-size: 14px'" />
          <span style="float: right;">添加图标</span>
        </a-menu-item>
        <a-menu-item key="2" @click.stop="changeWallImg()">
          <AntdIcon :name="'SwapOutlined'" :style="'font-size: 14px'" />
          <span style="float: right;">切换壁纸</span>
        </a-menu-item>
        <a-menu-item key="3" @click.stop="compact()">
          <AntdIcon :name="'AppstoreOutlined'" :style="'font-size: 14px'" />
          <span style="float: right;">整理图标</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { GridStack } from 'gridstack';
import SearchEngine from '@/components/SearchEngine.vue';
import HeadDate from './HeadDate.vue';
import HeadCalendar from './HeadCalendar.vue';
import BottomSentence from './BottomSentence.vue';
import { useGridsStore } from '@/store/grids';
import { onMounted, createApp } from "vue";
import { GrideModuleTy, navIconConfig, GridComponentTy } from '~/grid'
import { useWallpaperStore } from '@/store/wallpaper';
import { useModeStore } from '@/store/useMode';
const app = createApp({});
const $message: { success: Function } = inject('$message')!;
let grid: any;
const modeStore = useModeStore()

onMounted(() => {
  grid = GridStack.init({
    float: false,
    disableResize: true,
    acceptWidgets: true, //接受从其他网格或外部拖动的小部件
    minRow: 1,
    cellHeight: "90px",//一个单元格高度
    margin: 10,
    animate: false, // show immediate (animate: true is nice for user dragging though)
    columnOpts: {
      breakpointForWindow: true,  // test window vs grid size
      breakpoints: [{ w: 700, c: 4 }, { w: 850, c: 6 }, { w: 1000, c: 8 }, { w: 1200, c: 12 }]
    },
    // resizable: { handles: 'ne' },
  })
  grid.enableResize(false);
  grid.column(12, 'moveScale');


  // 监听到dragstop
  grid.on('dragstop', (event: any, element: any) => {
    const node = element.gridstackNode;
    // $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`);
  });
  loadHomeJson();
  window.handleClick = handleClick
});

//当项目从网格中删除时调用
const removed = () => {
  grid.on('removed', function (event: Event, items: any[]) {
    items.forEach(function (item) {
    });
  });
}

const handleClick = (option: navIconConfig) => {
  if (option.type === "icon") {
    window.open(option.url, '_blank')
  }
  if (option.type === "component") {
  }
  if (option.type === "add") {

  }
}
//整理图标
const compact = () => {
  grid.compact();
}
//更改模式
const clickHeadDate = () => {
  modeStore.SET_Mode()
}
//切换壁纸
const changeWallImg = () => {
  const wallpaperStore = useWallpaperStore()
  let _current = wallpaperStore.GET_CurrentWallpaper()
  let currentId = _current.wallpaperId++
  if (_current.wallpaperId > wallpaperStore.getAllPictureWallpaper.length) {
    currentId = 0
  }
  wallpaperStore.SET_CurrentWallpaper(wallpaperStore.getAllPictureWallpaper[currentId]);
}
function loadHomeJson() {

  console.log('useGridsStore().getSelectedGrids.navIconConfig',useGridsStore().getSelectedGrids.navIconConfig)

  useGridsStore().getSelectedGrids.navIconConfig.forEach((v, i) => {
    if (v.type == 'icon' || v.type == 'add') {
      addNewWidget(v);
    } else if (v.type == 'component') {
      // addComponent2(v, i);
    }
  });
  // useGridsStore().getSelectedGrids.navIconConfig.forEach((v, i) => {
  //   if (v.type == 'component') {
  //     addComponent(v, i);
  //   }
  // });
  // addComponent2();
  // addComponent2();
}
function addComponent(row: navIconConfig, index) {
  let sizew = row.size.split('x')[0]
  let sizeh = row.size.split('x')[1]
  // 添加一个网格项
  grid.addWidget({
    w: sizew,
    h: sizeh,
    content: '',
  });
}
function addComponent2() {
  let items = [...new Set(document.querySelectorAll('.grid-stack-item-content'))]
  const content: any = items[3]
  const itemDom = document.createElement("div");
  itemDom.setAttribute("id", "card_");
  itemDom.setAttribute("style", "height: 100%;overflow: hidden;");
  // itemDom.style = 'height: 100%;'
  const app = createApp(HeadCalendar, { name: "xiaoming2" });
  app.mount("#card_");

  content.appendChild(itemDom);
  // content.innerHTML = itemDom

  // 添加一个网格项
  grid.addWidget({
    w: 2,
    h: 2,
    content: content,
  });
}
function loadGridItem(widget) {
  // 把组件仿佛第九个方块中
  // 找到第九个方块
  // let widgetEl = widget.el;
  // let content = widgetEl.querySelector(".grid-stack-item-content");

  let itemDom = document.createElement("div");
  itemDom.setAttribute("id", "card_" + widget._id);

  // 把组件放入方块中
  // content.appendChild(itemDom);


  // 局部注册组件，组件放入方块中
  let WidgetComponent = app.component('HeadCalendar', HeadCalendar);
  return ''
  // // 调整大小，echarts图resize
  // grid.on('resizestop', function (event, gridEl) {
  //   // 当你缩放暂停，触发条件，重新绘图resize
  //   instance.handleResize()
  // })
}

function addNewWidget(option: any = {}) {
  //传递对象需要json.stringify()把javascript对象转换成json字符串;事件名后边需要跟单引号
  //onclick='deleteFun($f"$fISON.stringify(row)}"})
  const el = `
        <div 
            onClick = 'handleClick(${JSON.stringify(option)})'
            style="height:100%;cursor: pointer;"
            class="flex flex-direction justify-center align-center">
            <div  style=" height: 70%;"  title="${option.name}">
              <img class="app-item-img" src="${option.src}"
                style=" height: 100%; border-radius: 15px;" />
            </div>
            <p style='flex:1;filter: drop-shadow(0px 2px 7px rgba(0,0,0,.1));margin-top: 5px;text-shadow: 0 0 2px #0000004d;' class="cl-ant-p sg-omit-sm text-white-sm">${option.name}</p>
        </div>
      `;
  grid.addWidget({
    w: 1, h: 1,
    content: el,
  });
}

// 删除一个网格项
// const item = grid.getItems()[0];
// grid.removeWidget(item);

// // 移动一个网格项
// const itemToMove = grid.getItems()[0];
// grid.moveWidget(itemToMove, 2, 2);

// // 调整网格项的大小
// const itemToResize = grid.getItems()[0];
// grid.resizeWidget(itemToResize, 4, 2);


</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 30vh;
  min-height: 200px;
}

.home-box {
  position: relative;

  main {
    width: 90%;
    height: 70vh;

    section {
      width: 100%;
      max-height: 100%;
      overflow-y: scroll;
    }

  }

  footer {
    position: absolute;
    bottom: 8vh;
  }
}
</style>
