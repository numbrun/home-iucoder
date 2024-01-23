<template>
  <router-view />
  <!-- <video autoplay muted loop :src="$pinia.state.value.wallpaper.currentWallpaper.url" id="video"
    v-show="$pinia.state.value.wallpaper.currentWallpaper.atrribute === 'video'">
  </video> -->
</template>

<script lang="ts" setup>
import DataBeforeGuard from '@/dataBeforeGuard';
import { useWallpaperStore } from '@/store/wallpaper';
// const $message: { success: Function } = inject('$message')!;

onBeforeMount(() => {
  DataBeforeGuard.init();
})
onMounted(() => {
  transBackground();
});

function transBackground(): void {
  console.log('useWallpaperStore().谁快', useWallpaperStore().getCurrentWallpaper)
  if (useWallpaperStore().getCurrentWallpaper.attribute === 'picture') {
    // 设置的背景是图片 设置背景
    const domApp = document.querySelector('#app') as HTMLElement;
    domApp.style.background = `url(${useWallpaperStore().getCurrentWallpaper.url}) no-repeat`;
    domApp.style.backgroundSize = 'cover';
    domApp.style.backgroundAttachment = 'fixed';
  }
}
</script>

<style scoped lang="scss"></style>
