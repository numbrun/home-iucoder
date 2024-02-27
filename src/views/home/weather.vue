
<template>
  <div class="weather">
    <div id="he-plugin-standard"></div>
  </div>
</template>         
<script setup>
window.WIDGET = {
  //宽：高=3:1
  "CONFIG": {
    "layout": "1",
    "width": "420",
    "height": "200",
    "background": "1",
    "dataColor": "fff",
    "borderRadius": "15",
    "key": "fcd4fc1e48a144a483b7af74284229b8"
    // 2b4e91a4f094492ea3c78e97c5e51594
  }
}
onMounted(() => {
  weather()
  setTimeout(() => {
    let document = window.document.querySelectorAll('.wv-lt-refresh')[0]
    document.style.display = 'none'
  }, 100);
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
  width: 100%;
  height: 100%;
}
</style>