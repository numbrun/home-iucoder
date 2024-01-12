<template>
  <div class="ya-matter flex flex-direction align-center">
    <header class="flex flex-direction justify-center align-center">
      <HeadDate @click="handleClick" />
      <SearchEngine class="se" />
    </header>
    <a-dropdown :trigger="['contextmenu']" :overlayStyle="{ 'width': '110px' }">
      <main>
        <section class="grid-stack beautiful-sm-scroll">
        </section>
      </main>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click.stop="addNewWidget('https://files.codelife.cc/website/12306.svg', '12306')">
            <AntdIcon :name="'PlusOutlined'" :style="'font-size: 14px'" />
            <span style="float: right;">添加图标</span>
          </a-menu-item>
          <a-menu-item key="2">
            <AntdIcon :name="'SwapOutlined'" :style="'font-size: 14px'" />
            <span style="float: right;">切换壁纸</span>
          </a-menu-item>
          <a-menu-item key="3">
            <AntdIcon :name="'AppstoreOutlined'" :style="'font-size: 14px'" />
            <span style="float: right;">整理图标</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { GridStack } from 'gridstack';
import SearchEngine from '@/components/SearchEngine.vue';
import HeadDate from './HeadDate.vue';
import { useGridsStore } from '@/store/grids';
import { defineProps, defineEmits, ref, onMounted } from "vue";

const $message: { success: Function } = inject('$message')!;
let grid: any;
let homeList = ref<any>([])
const gridItemRef = ref<HTMLElement | null>(null);

onMounted(() => {
  grid = GridStack.init({
    float: false,
    // cellHeight: '120px',//一个单元格高度
    // cellHeight: '8vh',
    minRow: 1,
    column: 12,//一行放几个
    margin: 10,
  });
  grid.enableResize(false);

  // 监听到dragstop
  grid.on('dragstop', (event: any, element: any) => {
    const node = element.gridstackNode;
    // $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`);
  });

  // grid.on('click', (event: any, element: any) => {
  //   const node = element.gridstackNode;
  //   $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`);
  // });


  loadHomeJson();

  const gridStackItemContent: any = document.querySelectorAll('.grid-stack-item-content');
  if (gridStackItemContent && gridStackItemContent.length > 0) {
    gridStackItemContent.forEach((element: HTMLElement) => {
      element.addEventListener('click', handleClick);
    });
  }
});

//当项目从网格中删除时调用
const removed = () => {
  grid.on('removed', function (event: Event, items: any[]) {
    items.forEach(function (item) {

    });
  });
}

function loadHomeJson() {
  useGridsStore().getSelectedGrids.navIconConfig.forEach(v => {
    if (v.type == 'icon') {
      addNewWidget(v.src, v.name);
    } else if (v.type == 'component') {
      addComponent(v);
    }
    // homeList.value.push(v)
  });

}
function addComponent(row: Object | any) {
  let sizew = row.size.split('x')[0]
  let sizeh = row.size.split('x')[1]
  const el2 = `
      <div style='background:blue;height:100%' >
       ${row.sizeText}
      </div>
  `;



  // 添加一个网格项
  const widget = grid.addWidget({
    w: sizew,
    h: sizeh,
    content: el2,
  });

  // // 监听点击事件（使用事件委托）
  // grid.el.addEventListener('click', (event) => {
  //   // 检查点击的元素是否为目标元素（div）
  //   if (event.target === div) {
  //     // 获取当前点击的行数据
  //     const clickedRow = JSON.parse(event.target.dataset.row);

  //     // 处理点击事件的逻辑
  //     console.log('当前点击的行数据:', clickedRow);
  //   }
  // });

}
function addNewWidget(src: string, name: string) {
  const el = `
    <div class="grid-stack-item" style='height:100%' gs-w="1">
      <div class="grid-stack-item-content flex flex-direction justify-around align-center">
        <img src="${src}" style="width: 3vw; height: 3vw; border-radius: 20px; min" class="shadow-md" />
        <p style='filter: drop-shadow(0px 2px 7px rgba(0,0,0,.8));margin-top: 2px;' class="cl-ant-p sg-omit-sm text-white-sm">${name}</p>
      </div>
    </div>
  `;
  grid.addWidget({
    w: 1, h: 1,
    content: el,
  });
}

const handleClick = (event: Event) => {
  // console.log('grid-stack-item-content 被点击了!', event.target.dataset.row);
  // 在这里执行你的点击事件处理逻辑
};

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

main {
  width: 90%;
  height: 70vh;

  // background-color: rgba(255, 228, 196, 0.294);
  section {
    width: 100%;
    max-height: 100%;
    overflow-y: scroll;
  }
}
</style>
