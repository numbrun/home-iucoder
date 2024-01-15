<template>
  <div class="ya-matter flex flex-direction align-center">
    <header class="flex flex-direction justify-center align-center">
      <HeadDate @click="handleClick" />
      <SearchEngine class="se" />

      <div v-html="html"></div>

    </header>
    <a-dropdown :trigger="['contextmenu']" :overlayStyle="{ 'width': '110px' }">
      <main>
        <section class="grid-stack beautiful-sm-scroll">
        </section>
      </main>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click.stop="addNewWidget()">
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
import HeadCalendar from './HeadCalendar.vue';
import { useGridsStore } from '@/store/grids';
import { defineProps, defineEmits, ref, onMounted, render } from "vue";
import { GrideModuleTy, navIconConfig, GridComponentTy } from '~/grid'


const $message: { success: Function } = inject('$message')!;
let grid: any;
const gridItemRef = ref<HTMLElement | null>(null);

onMounted(() => {
  grid = GridStack.init({
    float: false,
    // cellHeight: '120px',//一个单元格高度
    // cellHeight: '8vh',
    minRow: 1,
    // column: 2,//一行放几个
    // cellHeight: "70px",
    // cellWidth: "70px",
    margin: 0,
  });
  grid.enableResize(false);
  grid.column(12, 'moveScale');

  // 监听到dragstop
  grid.on('dragstop', (event: any, element: any) => {
    const node = element.gridstackNode;
    // $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`);
  });
  loadHomeJson();
  const gridStackItemContent: any = document.querySelectorAll('.grid-stack-item-content');
  if (gridStackItemContent && gridStackItemContent.length > 0) {
    gridStackItemContent.forEach((element: HTMLElement) => {
      // element.addEventListener('click', handleClick);
    });
  }
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
  console.log(option)
}

function loadHomeJson() {
  useGridsStore().getSelectedGrids.navIconConfig.forEach(v => {
    if (v.type == 'icon' || v.type == 'add') {
      addNewWidget(v);
    } else if (v.type == 'component') {
      addComponent(v);
    }
  });
}
function addComponent(row: navIconConfig ) {
  let sizew = row.size.split('x')[0]
  let sizeh = row.size.split('x')[1]
  const el2 = `
      <div  style='background:transport;height:100%' >
      <${row.component}/>
      </div>
  `;
  // 添加一个网格项
  const widget = grid.addWidget({
    w: sizew,
    h: sizeh,
    content: el2,
    data1: row
  });
}
function addNewWidget(option: any = {}) {
  //传递对象需要json.stringify()把javascript对象转换成json字符串;事件名后边需要跟单引号
  //onclick='deleteFun($f"$fISON.stringify(row)}"})
  const el = `
        <div 
            onClick = 'handleClick(${JSON.stringify(option)})'
            style="height:100%;"
            class="flex flex-direction justify-center align-center">
            <img src="${option.src}" style="width: 3.5vw; height: 3.5vw; border-radius: 20px;" class="shadow-md" />
            <p style=' filter: drop-shadow(0px 2px 7px rgba(0,0,0,.1));margin-top: 5px;text-shadow: 0 0 2px #0000004d;'
              class="cl-ant-p sg-omit-sm text-white-sm">${option.name}</p>
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


const GridContentComponent = {
  props: {
    itemId: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const { itemId } = toRefs(props)

    onBeforeUnmount(() => {
      console.log(`In vue onBeforeUnmount for item ${itemId.value}`)
    });

    function handleRemove() {
      emit('remove', itemId.value)
    }

    return {
      itemId,
      handleRemove,
    }
  },
  template: `
          <div class="my-custom-grid-item-content">
            <button @click=handleRemove>X</button>
            <p>
              Vue Grid Item Content {{ itemId }}
            </p>
          </div>
        `
}

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
