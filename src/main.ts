
// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')


import { createApp } from 'vue';
import '@/styles/reset.css';
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets //个人感觉reset不干净，比如input原生组件
import App from './App.vue';

import '@/styles/index.scss'; // global css
import '@/styles/flex-class.css'; // 引入flex快写样式

// pinia
import { createPinia } from 'pinia';

// antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { message } from 'ant-design-vue';

// svg-icon
// import 'virtual:svg-icons-register'; // 引入雪碧图注册脚本，到这里雪碧图已经生成
import svgIcon from '@/icons/SvgIcon.vue';

// antd-icon  //这里会极大变大打包文件
import AntdIcon from '@/icons/AntdIcon.vue';

// router
import router from './router';

import './initAsyncRoutes';

// gridstack
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';

const app = createApp(App);
app.use(createPinia());
app.use(Antd);
app.config.globalProperties.$message = message;
app.component('SvgIcon', svgIcon);
app.component('AntdIcon', AntdIcon); // THEN to get HTML5 drag&drop

// analyze pic theme  这个工具暂时不用，太吃性能了
// import analyze from 'rgbaster'
// const result = await analyze('https://kodo.mboke.top/ytab/iyk7.mp4', { scale: 0.6 })
// console.log(result)

const vm = app.use(router).mount('#app');

console.log(app, 'hahahahahh', vm);
