// Pinia Store
import { defineStore } from 'pinia'
export const SAVE_USER_MUTATION = 'SAVE_USER_MUTATION';
export const SAVE_HOME_MUTATION = 'SAVE_HOME_MUTATION';
export const SAVE_ALL = 'SAVE_ALL';


export const useAuthUserStore = defineStore('auth/user', {
    // convert to a function
    state: () => ({
        // 用户数据
        user: {
            id: 'localhost@qq.com',
            name: '本地用户',
            headImg: '',
            token: '',
            code: 1,
            records: [],
            config: {
                // 色值｜图片链接| base64
                bg: import('@/assets/img/wallpaper/3.jpeg'),
                headerFontColor: '#ffffff',
                // 背景模糊度 0-10
                bgFilter: 0,
                // 背景明暗0-1（黑）
                bgLightness: 0,
                // 明亮模式
                lightMode: false,
                // 极简模式
                simpleMode: false,
                // 配色
                theme: {},
            },
        },
        // 全部站点
        sites: [],
        // 选中订阅源的站点
        categorySites: [],
        // 侧栏折叠
        showWrapLeft: true,
        showWrapSidebar: true,
        showWrapSidebarSocket: false,
        showWrapConnect: false,
        showWrapSign: false,
        showWrapPerson: false,
        showForm: false,

        // 主题配置
        themeConfig: {
            pure: [],
            wallpaper: [],
            defaultWallpaper: {},
        },

        // 系统配置
        appConfig: {
            // 配别配置加载情况
            loaded: false,

            article: {
                id: '',
                course: '',
                about: '',
                help: '',
            },
            site: {
                name: '几百块',
                logoURL: import('@/assets/img/logo/favicon.svg'),
                redirectURL: 'http://huasen.cc/',
                guidePageName: '几百块guidePageName',
                guidePageUrl: 'http://huasen.cc/',
                footerHtml: '',
                serviceQRCodeUrl: import('@/assets/img/logo/weixin.png'),
                openLabelClassification: false,
            },
        },
    }),
    getters: {
        // 可以获得其他的getters
        getUserName: (state) => {
            return state.user.name;
        }
    },
    actions: {
        // 万能
        commitAll(state: any, payload: any) {
            const merge = function merge(s: any, p: any) {
                // 异常处理
                if (Object.prototype.toString.call(p) !== '[object Object]' || s === p) {
                    return false;
                }
                Object.keys(p).forEach(key => {
                    if (typeof s[key] === typeof p[key]) {
                        // 类型相等时，若state值不为对象，则直接覆盖
                        if (Object.prototype.toString.call(s[key]) === '[object Object]') {
                            // 更新值为对象，并且不为空，则需要递归遍历，否则直接覆盖
                            if (Object.prototype.toString.call(p[key]) === '[object Object]' && Object.keys(p[key]).length !== 0) {
                                merge(s[key], p[key]);
                            } else {
                                s[key] = p[key];
                            }
                        } else {
                            s[key] = p[key];
                        }
                    } else {
                        // state值和更新值类型不相等时，直接覆盖更新
                        s[key] = p[key];
                    }
                });
            };
            merge(state, payload);
        },
        // no context as first argument, use `this` instead
        // mutations can now become actions, instead of `state` as first argument use `this`
        updateUser() {
        },
        // easily reset state using `$reset`
        clearUser() {
            this.$reset()
        }
    }
})