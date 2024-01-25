import { defineStore } from 'pinia'
//模式 简洁模式｜常规模式
export const useModeStore = defineStore('useMode', {
  // 其他的配置项...
  state: () => {
    return {
      // 定义状态
      conciseMode: JSON.parse(localStorage.getItem('CURRENT-MODE') as string) || false
    }
  },
  getters: {
    GET_Mode: (state) => state.conciseMode
  },
  actions: {
    //设置当前模式
    SET_Mode(): void {
      this.$patch((state) => {
        state.conciseMode = !state.conciseMode
        localStorage.setItem('CURRENT-MODE', JSON.stringify(state.conciseMode))
      })
    },
  },
})


