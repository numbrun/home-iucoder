import { defineStore } from 'pinia'

const storageBase = JSON.parse(localStorage.getItem('CURRENT-BASECONFIG') as string) || {}

console.log('storageBase', storageBase)

//基础配置
export const useBaseConfigStore = defineStore('baseConfig', {
    // 其他的配置项...
    state: () => {
        return {
            // 定义状态
            // conciseMode: JSON.parse(localStorage.getItem('CURRENT-MODE') as string) || false
            baseConfig: {
                yiyan: {
                    show: true,
                    yiyanTitle: storageBase.yiyan?.yiyanTitle || '',
                    yiyanAuthor: storageBase.yiyan?.yiyanAuthor || '',
                    yiyanFrom: storageBase.yiyan?.yiyanFrom || '',
                    yiyanUuid: storageBase.yiyan?.yiyanUuid || '',
                }

            },
        }
    },
    getters: {
        GET_BaseYiyan: (state) => state.baseConfig?.yiyan || {}
    },
    actions: {
        //设置一言句子配置
        SET_yiyan(obj: any): void {
            if (Object.keys(obj).length === 0) return
            this.$patch((state) => {
                state.baseConfig.yiyan = obj
                localStorage.setItem('CURRENT-BASECONFIG', JSON.stringify(state.baseConfig))
            })
        },
    },
})


