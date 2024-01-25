import { useWallpaperStore } from '@/store/wallpaper';

//切换壁纸
export const changeWallImg = () => {
const wallpaperStore = useWallpaperStore();
let _current = wallpaperStore.GET_CurrentWallpaper();
console.log('_current', _current);
// wallpaperStore.SET_CurrentWallpaper( _current + 1);
};
