/*
 * @Autor:
 * @Date: 2022-02-11 00:45:10
 * @LastEditors:
 * @LastEditTime: 2022-10-20 22:17:27
 * @Description: 侧边导航栏配置
 */
const navs = [
  // {
  //   name: '极简主页',
  //   path: '/home',
  //   iconClass: 'iconfont icon-iconset0278',
  // },
  // {
  //   name: '文章笔记',
  //   path: '/article',
  //   iconClass: 'iconfont icon-iconset0156',
  // },
  {
    name: '在线剪切板',
    path: 'https://note.iucoder.com/',
    iconClass: 'iconfont icon-iconset0278',
    isIframe: true,//是否为嵌套页面
  },
  {
    name: '登陆信息便捷复制',
    path: 'https://env.iucoder.com/',
    iconClass: 'iconfont icon-iconset0156',
    isIframe: true,//是否为嵌套页面
    isOpen: false, //新窗口打开
  },
];
export default navs;
