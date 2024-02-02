<template>
  <div class="top-search flex justify-between align-center">
    <a-popover color="rgba(255, 255, 255, 0.8)" placement="bottom" trigger="click" overlayClassName="searchPopop"
      v-model:open="visible">
      <template #title>
        <header class="card-head flex justify-between">
          <div class="card-head-left flex align-center justify-center">选择默认搜索引擎</div>
          <p class="card-head-right">添加</p>
        </header>
      </template>
      <template #content>
        <main class="card-list  beautiful-scroll justify-between flex flex-wrap">
          <div v-for="(item, index) in allSearchEngines" :key="index" class="card flex justify-start align-center"
            @click="chooseSearch(item)">
            <SvgIcon :name="item.slinkLogo" style="font-size: 26px; margin-left: 10px;"></SvgIcon>
            <div style="margin-left: 8px">{{ item.name }}</div>
          </div>
        </main>
      </template>
      <SvgIcon :name="currentSearchEngine.slinkLogo" style="font-size: 34px; margin-left: 20px;"></SvgIcon>
    </a-popover>

    <a-auto-complete class="search-ipt" v-model:value="searchWord" :options="options" style="font-size: 20px"
      placeholder="输入搜索内容" :bordered="false" :allow-clear="true" @keyup.enter="enterSubmit" @select="onSelect"
      @search="onSearch">
      <template #clearIcon>
        <close-outlined style="background: transparent;font-size: 16px;" />
      </template>
    </a-auto-complete>
    <div>
      <AntdIcon class="search-logo" name="SearchOutlined" style="font-size: 26px; margin-right: 20px;"
        @click.stop="enterSubmit()">
      </AntdIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearchEngineStore } from '@/store/searchEngine'
import { SearchEngineTy } from '~/searchEngine'
import { CloseOutlined } from '@ant-design/icons-vue';

interface MockVal {
  value: string;
}

const visible = ref(false);
const searchWord = ref('');
const options = ref<MockVal[]>([]);

const onSearch = (searchText: string) => {
  options.value = !searchText
    ? []
    : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
};
const mockVal = (str: string, repeat = 1): MockVal => {
  return {
    value: str.repeat(repeat),
  };
};
const onSelect = (value: string) => {
};

//点击搜索引擎
const chooseSearch = (item: SearchEngineTy) => {
  useSearchEngineStore().SET_CURRENTSEARCH_ENGINE(item)
  visible.value = false
}
const enterSubmit = () => {
  window.open(useSearchEngineStore().getCurrentSearchEngine.frontLink + searchWord.value)
}
const allSearchEngines = useSearchEngineStore().getAllSearchEngines
const currentSearchEngine = computed(() => useSearchEngineStore().getCurrentSearchEngine)
</script>

<style scoped lang="scss">
.top-search {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 3vh auto 20px;
  height: 46px ;
  border-radius: 100px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  /* 调整模糊程度 */
  backdrop-filter: blur(5px);

  .search-ipt {
    width: 100%;
    background-color: transparent;
  }
}

.searchPopop {
  box-shadow: 0 0 10px 3px #00000029;

  .card-head {
    width: 100%;
    height: 30px;

    .card-head-left {
      font-size: 14px;
      color: #777;
    }

    .card-head-right {
      font-size: 14px;
      color: $red-400;
      cursor: pointer;
    }
  }

  .card-list {
    width: 100%;
    max-width: 500px;
    overflow: auto;
    cursor: pointer;
    padding: 0;

    .card {
      width: 15%;
      height: 12%;
      min-width: 100px;
      min-height: 50px;
      background-color: #fff;
      border-radius: 5px;
      transition: all 1000ms cubic-bezier(0.215, 0.61, 0.355, 1);
      margin-right: 10px;
      margin-bottom: 10px;

      &:hover {
        background: rgba(163, 162, 162, 0.8);
        color: $red-400;
      }

      img {
        margin-left: 0px;
        width: 30px;
      }

      div {
        margin-left: 10px;
      }
    }
  }
}
</style>
<style  lang="scss">
.top-search {
  .ant-select-clear {
    background: transparent;
  }
}
</style>
