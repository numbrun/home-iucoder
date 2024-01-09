<template>
  <div class="ya-matter flex flex-direction align-center">
    <header class="flex flex-direction justify-center align-center">
      <HeadDate @click="handleClick"/>
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
    cellHeight: '50px',//一个单元格高度
    // cellHeight: '8vh',
    minRow: 1,
    column: 12,//一行放几个
  });
  grid.enableResize(false);

  // 监听到dragstop
  grid.on('dragstop', (event: any, element: any) => {
    const node = element.gridstackNode;
    // $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`);
  });

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
  useGridsStore().getSelectedGrids.icon.forEach(v => {
    addNewWidget(v.src, v.name);
    // homeList.value.push(v)
  });

}

function addNewWidget(src: string, name: string) {
  const el = `
    <div class="grid-stack-item" gs-w="1">
      <div class="grid-stack-item-content flex flex-direction justify-around align-center">
        <img src="${src}" style="width: 3vw; height: 3vw; border-radius: 20px; min" class="shadow-md" />
        <p style='filter: drop-shadow(0px 2px 7px rgba(0,0,0,.8));margin-top: 2px;' class="cl-ant-p sg-omit-sm text-white-sm">${name}</p>
      </div>
    </div>
  `;
  grid.addWidget({
    w: 1, h: 2,
    content: el,
  });
}

const handleClick = (event: Event) => {
  console.log('grid-stack-item-content 被点击了!', event.target);
  // 在这里执行你的点击事件处理逻辑
};

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
