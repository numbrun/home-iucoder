import { defineStore } from 'pinia'
import { GrideModuleTy, navIconConfig, GridComponentTy } from '~/grid'

export const useGridsStore = defineStore('grids', {
  state: () => {
    return {
      selectedGrids: {} as GrideModuleTy
    }
  },
  getters: {
    getSelectedGrids: (state) => state.selectedGrids
  },
  actions: {
    SYNC_SELECTED_GRIDS(name: string) {
      this.$patch((state) => {
        if (name) {
          state.selectedGrids = JSON.parse(localStorage.getItem(name.toUpperCase())!)
        }
      })
    },

    SELECTED_GRIDS_MODIFY(name: string, actionObj: { action: 'DEC' | 'INC', grid: GridComponentTy | navIconConfig }) {
      this.$patch((state) => {
        if (actionObj.action === 'DEC') {
          if (actionObj.grid.type === 'icon') {
            state.selectedGrids.icon.push(actionObj.grid)
          } else {
            state.selectedGrids.component.push(actionObj.grid)
          }
        } else {
          if (actionObj.grid.type === 'icon') {
            state.selectedGrids.icon = state.selectedGrids.icon.filter(v => v.name !== actionObj.grid.name)
          } else {
            state.selectedGrids.component = state.selectedGrids.component.filter(v => v.name !== actionObj.grid.name)
          }
        }
        localStorage.setItem(name.toUpperCase(), JSON.stringify(state.selectedGrids))
      })
    },
  }
})
