<template>
  <div class="ya-matter flex flex-direction align-center">
    <header class="flex justify-center align-center">
      <SearchEngine class="se" />
      <!-- <button type="button" @click="addNewWidget('https://files.codelife.cc/website/12306.svg', '12306')">
        添加图标</button> -->
    </header>
    <a-dropdown :trigger="['contextmenu']" :overlayStyle="{ 'width': '110px' }">
      <main>

        <section class="grid-stack beautiful-sm-scroll">

          <!-- <template v-for="item of homeList" :key="item">
            <div class="grid-stack-item">
              <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                <img :src="item.src" style="width: 4vw; height: 4vw; border-radius: 20px; min" class="shadow-md" />
                <p style='filter: drop-shadow(0px 2px 7px rgba(0,0,0,.8));' class="cl-ant-p sg-omit-sm text-white-sm">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </template> -->
        </section>
      </main>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
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

<script lang="ts">
import { GridStack } from 'gridstack';
import SearchEngine from '@/components/SearchEngine.vue';
import { useGridsStore } from '@/store/grids';
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {
    SearchEngine
  },
  setup() {
    const $message: { success: Function } = inject('$message')!;
    let grid: any;
    let homeList = ref<any>([])
    let homeList2 = ref<any>([])

    onMounted(() => {
      grid = GridStack.init({
        float: false,
        cellHeight: '60px',
        // cellHeight: '8vh',
        minRow: 1
      });
      grid.enableResize(false);

      // 监听到dragstop
      grid.on('dragstop', (event: any, element: any) => {
        const node = element.gridstackNode;
        // $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`);
      });

      loadHomeJson();
    });

    function loadHomeJson() {
      console.log('useGridsStore()', useGridsStore().getSelectedGrids.icon)
      useGridsStore().getSelectedGrids.icon.forEach(v => {
        addNewWidget(v.src, v.name);
        homeList.value.push(v)
      });

      // console.log('homeList', homeList.value)
    }

    function addNewWidget(src: string, name: string) {
      const el = `
        <div class="grid-stack-item">
          <div class="grid-stack-item-content flex flex-direction justify-around align-center">
            <img src="${src}" style="width: 4vw; height: 4vw; border-radius: 20px; min" class="shadow-md" />
            <p style='filter: drop-shadow(0px 2px 7px rgba(0,0,0,.8));' class="cl-ant-p sg-omit-sm text-white-sm">${name}</p>
          </div>
        </div>
      `;
      // const el = `
      //   <div class="grid-stack-item">
      //     <div class="grid-stack-item-content flex flex-direction justify-around align-center">
      //       <img src="${src}" style="width: 4vw; height: 4vw; border-radius: 20px; min" class="shadow-md" />
      //       <p style='filter: drop-shadow(0px 2px 7px rgba(0,0,0,.8));' class="cl-ant-p sg-omit-sm text-white-sm">${name}</p>
      //     </div>
      //   </div>
      // `;
      grid.addWidget(el, { w: 1, h: 2 });
    }

    return {
      addNewWidget,
      homeList
    };
  }
});
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 30vh;
}

main {
  width: 90%;
  height: 70vh;
  //background-color: rgba(255, 228, 196, 0.294);

  section {
    width: 100%;
    max-height: 100%;
    overflow-y: scroll;
  }
}
</style>
