import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useStore = defineStore('main', {
  // 其他的配置项...
  state: () => {
    return {
      // 定义状态
    }
  },
  getters: {},
  actions: {},
})


