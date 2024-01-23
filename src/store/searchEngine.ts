import { defineStore } from 'pinia'
import { SearchEngineTy } from '~/searchEngine'

//搜索引擎
export const useSearchEngineStore = defineStore('searchEngine', {
  state: () => {
    return {
      currentSearchEngine: JSON.parse(localStorage.getItem('CURRENTSEARCH-ENGINE')!),
    }
  },
  getters: {
    getAllSearchEngines: () => JSON.parse(localStorage.getItem('SEARCH-ENGINE')!),
    getCurrentSearchEngine: state => state.currentSearchEngine
  },
  actions: {
    //设置当前选中的搜索引擎
    SET_CURRENTSEARCH_ENGINE(searchEngineObj: SearchEngineTy) :void {
      console.log('searchEngineObj',searchEngineObj)
      this.$patch((state) => {
        state.currentSearchEngine = searchEngineObj
        localStorage.setItem('CURRENTSEARCH-ENGINE', JSON.stringify(searchEngineObj))
      })
    }
  }
})
