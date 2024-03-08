<template>
    <a-popover arrowPointAtCenter="true" trigger="click" color="#f8f8f8" :overlayStyle="{ 'color': '#fff' }"
        overlayClassName='set-popover' placement="rightTop" v-model:open="data.visible">
        <template #title>

        </template>
        <template #content>
            <div class="set-box">
                <div class="left">
                    <div class="left-login">
                        <div class="flex left-login-item">
                            <AntdIcon class="left-login-icon" :name="'UserSwitchOutlined'" :style="'font-size: 14px'" />
                            <div class="flex left-login-text">
                                <span style="color: #4a7aff;font-weight: 600;margin-bottom: 3px;">登录/注册</span>
                                <span class="">登录以同步数据</span>
                            </div>
                        </div>
                    </div>
                    <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys"
                        style="width: 230px;flex: 1;;overflow: auto;background: #dadbdf;" :mode="state.mode"
                        :items="items" :theme="state.theme"></a-menu>
                </div>
                <div class="right flex justify-center align-center" style="flex:1">
                    正在开发
                </div>
            </div>
        </template>
    </a-popover>
</template>

<script lang="ts" setup>
const { proxy } = getCurrentInstance();
import { h, reactive } from 'vue';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';
import type { MenuMode, MenuTheme } from 'ant-design-vue';
import { ItemType } from 'ant-design-vue';

let data = ref({
    visible: false,
})

//对外抛出 不抛出拿不到
defineExpose({ data })

const state = reactive({
    mode: 'inline' as MenuMode,
    theme: 'light' as MenuTheme,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
});

function getItem(
    label: string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType;
}
const items: ItemType[] = reactive([
    getItem('基本', '1', h(MailOutlined)),
    getItem('壁纸', '2', h(CalendarOutlined)),
    getItem('主题', 'sub1', h(AppstoreOutlined),),
    getItem('搜索引擎', 'sub2', h(AppstoreOutlined), [
        getItem('默认', '5'),
        getItem('自定义', '6'),
    ]),
    getItem('关于我们', 'sub3', h(SettingOutlined),),
    getItem('相关应用', 'sub4', h(SettingOutlined),),
]);

</script>

<style scoped lang="scss">
.set-box {
    width: 720px;
    height: 570px;
    display: flex;
    overflow: hidden;
    border-radius: 8px;

    .left {
        background: #dadbdf;
        display: flex;
        flex-direction: column;

        .left-login {
            height: 92px;
            padding: 16px;
        }

        .left-login-icon {
            color: #c7cccc;
            width: 35px;
            height: 35px;
            font-size: 35px !important;
            margin-right: 19px;
            margin-left: 3px;
        }

        .left-login-item {
            padding: 12px;
            cursor: pointer;
            background-color: #f5f5f6;
            border-radius: 8px;
        }

        .left-login-text {
            flex-direction: column;
            justify-content: center;
            color: #3a3a3c;
            font-size: 12px;
            line-height: 17px;
        }
    }
}
</style>
<style lang="scss">
.set-popover {
    .ant-popover-arrow {
        display: none;
    }

    .ant-popover-inner {
        padding: 0;
    }
}
</style>