import { log } from 'console'
import { defineStore } from 'pinia'
import { SwallPaperTy } from '~/wallpaper'

//背景图相关
export const useWallpaperStore = defineStore('wallpaper', {
  state: () => {
    return {
      currentWallpaper: {} as SwallPaperTy
    }
  },
  getters: {
    //获取当前背景信息
    getCurrentWallpaper: (state) => {
      //需要执行一次state
      // state.currentWallpaper
      return JSON.parse(localStorage.getItem('CURRENT-WALLPAPER') as string)
    },
    //获取all背景信息
    getAllPictureWallpaper: () => JSON.parse(localStorage.getItem('WALLPAPER-PICTURE') as string),
    //获取主题色
    getCurrentWallpaperThemeColor: (state) => state.currentWallpaper.themeColor
  },
  actions: {
    //设置背景图
    SET_CurrentWallpaper(swallpaperObj: any = {}): void {
      console.log('swallpaperObj', swallpaperObj)
      if (Object.keys(swallpaperObj).length === 0) return

      if (swallpaperObj.attribute === 'picture') {
        // 设置的背景是图片 设置背景
        const domApp = document.querySelector('#app') as HTMLElement;
        domApp.style.background = `url(${swallpaperObj.url}) no-repeat`;
        domApp.style.backgroundSize = 'cover';
        domApp.style.backgroundAttachment = 'fixed';
      }

      this.$patch((state) => {
        state.currentWallpaper = swallpaperObj
        localStorage.setItem('CURRENT-WALLPAPER', JSON.stringify(swallpaperObj))
      })
    },
    GET_CurrentWallpaper: () => {
      return JSON.parse(localStorage.getItem('CURRENT-WALLPAPER') as string)
    },
  }
})
