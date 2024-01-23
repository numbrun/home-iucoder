import { log } from 'console'
import { defineStore } from 'pinia'
// import { SwallPaperTy } from '~/wallpaper'

//背景图相关
export const useWallpaperStore = defineStore('wallpaper', {
  state: () => {
    return {
      currentWallpaper: {}
      // currentWallpaper: {} as SwallPaperTy
    }
  },
  getters: {
    getCurrentWallpaper: (state) => {
      console.log('getCurrentWallpaper')
      return JSON.parse(localStorage.getItem('CURRENTWALLPAPER') as string)
    },
    // getCurrentWallpaper: (state) => state.currentWallpaper,
    getAllPictureWallpaper: () => JSON.parse(localStorage.getItem('WALLPAPER-PICTURE') as string),
    getCurrentWallpaperThemeColor: (state) => state.currentWallpaper.themeColor
  },
  actions: {
    //设置背景图
    SET_CURRENTWALLPAPER(swallpaperObj: any): void {
      this.$patch((state) => {
        state.currentWallpaper = swallpaperObj
        localStorage.setItem('CURRENTWALLPAPER', JSON.stringify(swallpaperObj))
      })
    }
  }
})
