
<template>
  <div class="weather">
    <div id="he-plugin-standard"></div>
  </div>
</template>         
<script setup>
window.WIDGET = {
  "CONFIG": {
    "layout": "1",
    "width": "550",
    "height": "200",
    "background": "1",
    "dataColor": "FFFFFF",
    "borderRadius": "5",
    "key": "fcd4fc1e48a144a483b7af74284229b8"
  }
}
onMounted(() => {
    weather()
});
const weather = () => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
    "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.body.appendChild(s);
};
</script>
<style lang="scss" scoped>
.weather {
  width: 60px !important;
  height: 100%;
}
</style>