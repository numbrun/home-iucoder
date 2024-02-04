import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';

import '@/assets/css/index.scss'; // global css
import '@/assets/css/flex-class.css'; // 引入flex快写样式
import '@/assets/css/reset.css';
import 'amfe-flexible';

import { message } from 'ant-design-vue';
//vite-plugin-icons 是一个 Vite 插件，用于在项目中使用 SVG 图标。它会将 SVG 图标文件转换为 Vue 组件，并注册到应用程序中，使您可以在代码中以组件的形式使用这些图标。
import 'virtual:svg-icons-register'; // 引入雪碧图注册脚本，到这里雪碧图已经生成
import svgIcon from '@/components/SvgIcon.vue';
import AntdIcon from '@/components/AntdIcon.vue';//这里会极大变大打包文件
import CompModal from '@/components/CompModal.vue';
import router from './router';
import './initAsyncRoutes';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-extra.css';

const app = createApp(App);
app.use(createPinia());
app.use(Antd);
app.config.globalProperties.$message = message;
app.component('SvgIcon', svgIcon);
app.component('AntdIcon', AntdIcon); // THEN to get HTML5 drag&drop
app.component('CompModal', CompModal); //全局弹窗组件

//用于从图像（在浏览器中）中提取主颜色。
// import analyze from 'rgbaster'
// const result = await analyze('https://files.codelife.cc/wallpaper/wallspic/20240104c5fib0.jpeg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_92/format,webp', { scale: 0.6 })

app.use(router).mount('#app');
