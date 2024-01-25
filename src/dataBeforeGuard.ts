// 首次相关数据前置守卫
// 服务端数据库中配置变量、本地json数据
import wallpaper from '@/json/wallpaper.json';
import searchEngine from '@/json/searchEngine.json';
import home from '@/json/home.json';
import { useWallpaperStore } from '@/store/wallpaper';


// 抽象类是不允许被实例化
export default abstract class DataBeforeGuard {
  static init() {
    this.initWallpaper();
    this.initHome();
    this.initSearchEngine();
  }
  //初始化背景
  static initWallpaper() {
    //读取全部背景参数 进行设置
    localStorage.setItem('WALLPAPER-PICTURE', JSON.stringify(wallpaper.wallpaperImg));

    const wallpaperStore = useWallpaperStore()
    if (wallpaperStore.GET_CurrentWallpaper()) {
      wallpaperStore.SET_CurrentWallpaper(wallpaperStore.getCurrentWallpaper);
    } else {
      wallpaperStore.SET_CurrentWallpaper(wallpaperStore.getAllPictureWallpaper[0]);
    }
  }
  //初始化搜索引擎列表
  static initSearchEngine() {
    localStorage.setItem('SEARCH-ENGINE', JSON.stringify(searchEngine.searchList));
    // 初始化默认为第一个
    if (!localStorage.getItem('CURRENT-SEARCH-ENGINE')) {
      localStorage.setItem('CURRENT-SEARCH-ENGINE', JSON.stringify(searchEngine.searchList[0]));
    }
  }
  //初始化路由
  static initHome() {
    if (!localStorage.getItem('HOME')) {
      localStorage.setItem('主页', JSON.stringify(home));
    }
  }
}
