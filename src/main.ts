import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import '@/assets/css/reset.css';
import '@/assets/css/index.scss'; // global css
import '@/assets/css/flex-class.css'; // 引入flex快写样式

import { message } from 'ant-design-vue';
//vite-plugin-icons 是一个 Vite 插件，用于在项目中使用 SVG 图标。它会将 SVG 图标文件转换为 Vue 组件，并注册到应用程序中，使您可以在代码中以组件的形式使用这些图标。
import 'virtual:svg-icons-register'; // 引入雪碧图注册脚本，到这里雪碧图已经生成
import svgIcon from '@/components/SvgIcon.vue';
import AntdIcon from '@/components/AntdIcon.vue';//这里会极大变大打包文件
import router from './router';
import './initAsyncRoutes';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';


import '@/assets/css/reset.css';

const app = createApp(App);
app.use(createPinia());
app.use(Antd);
app.config.globalProperties.$message = message;
app.component('SvgIcon', svgIcon);
app.component('AntdIcon', AntdIcon); // THEN to get HTML5 drag&drop

//用于从图像（在浏览器中）中提取主颜色。
// import analyze from 'rgbaster'
// const result = await analyze('https://kodo.mboke.top/ytab/iyk7.mp4', { scale: 0.6 })
// console.log(result)

app.use(router).mount('#app');
