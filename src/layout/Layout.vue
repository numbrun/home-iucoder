<template>
  <div class="layout-wrapper">
    <Sidebar class="sidebar-container flex justify-center align-center" />
    <div class="main-container">
      <AppMain />
    </div>
  </div>
</template>
 
<script lang="ts" setup>
import { Sidebar, AppMain } from './components';

</script>

<style scoped lang="scss">
.layout-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1000;

  .main-container {
    height: 100%;
    margin-left: $sideBarWidth;
    position: relative;
  }

  .sidebar-container {
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 888;
    overflow: hidden;
  }
}
</style>
