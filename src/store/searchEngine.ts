import { defineStore } from 'pinia'
import { SearchEngineTy } from '~/searchEngine'

//搜索引擎
export const useSearchEngineStore = defineStore('searchEngine', {
  state: () => {
    return {
      currentSearchEngine: JSON.parse(localStorage.getItem('CURRENT-SEARCH-ENGINE')!),
    }
  },
  getters: {
    getAllSearchEngines: () => JSON.parse(localStorage.getItem('SEARCH-ENGINE')!),
    getCurrentSearchEngine: state => state.currentSearchEngine
  },
  actions: {
    //设置当前选中的搜索引擎
    SET_CURRENTSEARCH_ENGINE(searchEngineObj: SearchEngineTy) :void {
      this.$patch((state) => {
        state.currentSearchEngine = searchEngineObj
        localStorage.setItem('CURRENT-SEARCH-ENGINE', JSON.stringify(searchEngineObj))
      })
    }
  }
})
