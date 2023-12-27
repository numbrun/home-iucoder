
import { createApp } from 'vue'
const app = createApp(App)
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store';//？

//？？？
import '@/plugin/directive.js';
// import '@/plugin/element-ui/index.js';
import '@/plugin/animate.js';
import '@/components/common/index.js';
import lodash from 'lodash';
// import i18n from '@/config/i18n.config.js';
import tool from '@/utils/index.js';
import constant from '@/constant/index.js';
// import api from '@/network/api.js';
import storage from '@/plugin/storage.js';
// app.prototype.TOOL = tool;
app.config.globalProperties.$TOOL = tool;
app.config.globalProperties.$CONSTANT = constant;
// app.prototype.API = api;

// 添加全局属性
app.config.globalProperties.$myProperty = 'myValue';

// 添加全局方法
app.config.globalProperties.$STORAGE = storage
// app.prototype.STORAGE = storage;


// app.prototype.LODASH = lodash;
// app.config.productionTip = false;


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'






app.use(createPinia())
app.use(router)
app.use(store)
app.use(ElementPlus)


app.mount('#app')



//----------------
// import './assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'


// const app = createApp(App)


// app.use(createPinia())
// app.use(router)

// app.mount('#app')
