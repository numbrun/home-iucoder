<template>
  <div class="top-search flex justify-between align-center">
    <a-popover placement="bottomLeft" trigger="click" overlayClassName="poppop" v-model:visible="visible">
      <template #content>
        <main class="card-list flex flex-wrap justify-center align-center beautiful-scroll">
          <div v-for="(item, index) in allSearchEngines" :key="index" class="card flex justify-start align-center shadow"
            @click="chooseSearch(item)">
            <SvgIcon :name="item.slinkLogo" style="font-size: 34px; margin-left: 20px;"></SvgIcon>
            <div style="margin-left: 15px">{{ item.name }}</div>
          </div>
        </main>
      </template>
      <template #title>
        <header class="card-head flex justify-between">
          <div class="card-head-left flex align-center justify-center">选择您的默认搜索引擎:</div>
          <p class="card-head-right flex align-center justify-center cl-ant-p">搜索热词:</p>
        </header>
      </template>
      <SvgIcon :name="currentSearchEngine.slinkLogo" style="font-size: 34px; margin-left: 20px;"></SvgIcon>
    </a-popover>

    <input type="text" class="search-ipt" :value="searchWord"
      @input="searchWord = ($event.target as HTMLInputElement).value" style="font-size: 20px"
      @keyup.enter="enterSubmit" />
    <div>
      <AntdIcon class="search-logo" name="SearchOutlined" style="font-size: 26px; margin-right: 20px;"
        @click.stop="enterSubmit()"></AntdIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { useSearchEngineStore } from '@/store/searchEngine'
import { SearchEngineTy } from '~/searchEngine'
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      visible: false,
      searchWord: '',
    }
  },
  methods: {
    chooseSearch(item: SearchEngineTy) {
      useSearchEngineStore().SET_CURRENTSEARCH_ENGINE(item)
      this.visible = false
    },
    enterSubmit() {
      window.open(useSearchEngineStore().getCurrentSearchEngine.frontLink + this.searchWord)
    }
  },
  setup() {
    const allSearchEngines = useSearchEngineStore().getAllSearchEngines
    const currentSearchEngine = computed(() => useSearchEngineStore().getCurrentSearchEngine)

    return {
      allSearchEngines,
      currentSearchEngine
    }
  }
})
</script>

<style scoped lang="scss">
.top-search {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 3vh auto 20px;
  height: 46px;
  border-radius: 100px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.5);
  /* 调整模糊程度 */
  backdrop-filter: blur(5px);

  .search-ipt {
    width: 470px;
    height: 46px;
    background-color: transparent;
  }

  // .search-logo {
  //   cursor: pointer;
  //   z-index: 20;
  //   margin-right: 20px;
  //   font-size: 16px;

  //   &:hover {
  //     color: #1890ff;
  //   }
  // }
}

.poppop {
  .card-head {
    width: 600px;
    height: 30px;

    .card-head-left {
      font-size: 14px;
      color: #999;
      margin-left: 10px;
    }

    .card-head-right {
      margin-right: 20px;
    }
  }

  .card-list {
    width: 640px;
    height: 300px;
    overflow: auto;
    cursor: pointer;

    .card {
      width: 28%;
      height: 18%;
      background-color: #f9f9f9;
      margin: 10px;
      border-radius: 5px;
      transition: all 1000ms cubic-bezier(0.215, 0.61, 0.355, 1);

      &:hover {
        background: rgba(163, 162, 162, 0.8);
        color: #1890ff;
      }

      img {
        margin-left: 10px;
        width: 30px;
      }

      div {
        margin-left: 10px;
      }
    }
  }
}
</style>
