import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'; // 第三方库声明文件自动插入（很重要！）

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // vueSetupExtend(), // vue script setup syntax support the name attribute 再script标签中可以设置当前setup的name
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-router'
      ],
      // auto generation auto-imports.d.ts file  //自动生成auto-imports.d.ts文件
      // auto-imports.d.ts 文件的解释：
      // 在 d.ts 声明文件中，任何的 declare 默认就是 global 的了，所以你在 d.ts 文件中是不能出现 declare global 的。只有在模块文件中的定义，如果想要全局就使用 declare global
      // 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
      // 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      path: 'path-browserify' // 解决在浏览器中使用类似node原生path模块的问题
    }
  },
  css: {
    preprocessorOptions: {
      //define global scss variable 全局css变量可使用
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
})
