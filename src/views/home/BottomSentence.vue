<template>
    <div class="BottomSentence">
        <a-popover trigger="hover" color="rgba(0,0,0,.2)" overlayClassName='iu-popover' :overlayInnerStyle="{
            'backdrop-filter': 'blur(20px)',
        }">
            <template #content>
                <div class="yiyan-box">
                    <AntdIcon @click="copy" class="yiyan-icon" :name="'CopyOutlined'" title="复制" />
                    <AntdIcon @click="next" class="yiyan-icon" :name="'ReloadOutlined'" title="下一个" />
                    <AntdIcon @click="search" class="yiyan-icon" :name="'SearchOutlined'" title="搜索" />
                </div>
            </template>

            <div class="flex align-center">
                <img style="margin-right: 10px;transform: rotate(180deg);"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cW14PC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC42Ij4KICAgICAgICA8ZyBpZD0iMTEuMeavj+aXpeS4gOiogCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgxOS4wMDAwMDAsIC0xMTMyLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0i5Yid5qyh5L2/55SoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAuMDAwMDAwLCA4MjguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0icW14IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MTkuMDAwMDAwLCAzMDQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgb3BhY2l0eT0iMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDMgTDEyLDEyIEwxNCwxMiBMMTQsMTggTDE2LDE4IEwxOCwxMSBMMTgsMyBMMTIsMyBaIE0yLDMgTDIsMTIgTDQsMTIgTDQsMTggTDYsMTggTDgsMTEgTDgsMyBMMiwzIFoiIGlkPSLlvaLnirbnu5PlkIgiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" />
                <p>{{ currentSentence.yiyanTitle || '几百块语录集' }} </p>
                <img style="margin-left: 10px;"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cW14PC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC42Ij4KICAgICAgICA8ZyBpZD0iMTEuMeavj+aXpeS4gOiogCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgxOS4wMDAwMDAsIC0xMTMyLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0i5Yid5qyh5L2/55SoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAuMDAwMDAwLCA4MjguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0icW14IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MTkuMDAwMDAwLCAzMDQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgb3BhY2l0eT0iMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLDMgTDEyLDEyIEwxNCwxMiBMMTQsMTggTDE2LDE4IEwxOCwxMSBMMTgsMyBMMTIsMyBaIE0yLDMgTDIsMTIgTDQsMTIgTDQsMTggTDYsMTggTDgsMTEgTDgsMyBMMiwzIFoiIGlkPSLlvaLnirbnu5PlkIgiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" />
            </div>
            <div class="flex-direction title-box ">
                <div class="title">《{{ currentSentence.yiyanFrom || '几百块语录集' }}》</div>
                <div class="flex align-center justify-center ">
                    <div class="line"></div>
                    {{ currentSentence.yiyanAuthor || '佚名' }}
                    <div class="line"></div>
                </div>
            </div>
        </a-popover>
    </div>
</template>
<script lang="ts"  setup>
import { onMounted, ref } from "vue";
import { getSentence } from "@/api";
import { copyValue } from "@/utils/index";
import { message } from 'ant-design-vue';
import { useBaseConfigStore } from "@/store/index";
const BaseStore = useBaseConfigStore()

let currentSentence = ref({
    show: true,
    yiyanTitle: "有思想、有温度、有态度",
    yiyanAuthor: "百龙",
    yiyanFrom: "几百块语录集",
    yiyanUuid: "8f1b99a6",
});
onMounted(() => {
    if (BaseStore.GET_BaseYiyan?.yiyanUuid) {
        currentSentence.value = BaseStore.GET_BaseYiyan
    }
});
function copy() {
    copyValue(currentSentence.value.yiyanTitle).then((res: Boolean) => {
        if (res) {
            message.success('复制成功');
        }
    })
}
function search() {
    window.open(`https://www.baidu.com/s?wd=${currentSentence.value.yiyanTitle}`)
}
async function next() {
    let res = await getSentence()
    if (res.uuid) {
        currentSentence.value = {
            show: true,
            yiyanTitle: res.hitokoto,
            yiyanAuthor: res.from_who || res.creator,
            yiyanFrom: res.from,
            yiyanUuid: res.uuid,
        }
        BaseStore.SET_yiyan(currentSentence.value)
    }
}
</script>
<style scoped lang="scss">
.BottomSentence {
    color: rgba(245, 245, 250, 0.9);
    text-shadow: 1px 1px 1px rgb(0 0 0 / 16%);
    text-align: center;
    font-size: 16px;

    .title-box {
        margin-top: 16px;
        color: #FFF;
        text-shadow: 1px 1px 1px rgb(0 0 0 / 16%);
        opacity: .6;

        .title {
            margin-bottom: 16px;
        }

        .line {
            --tw-bg-opacity: 1;
            background-color: rgb(255 255 255/var(--tw-bg-opacity));
            height: 1px;
            width: 40px;
            margin: 0 4px;
        }
    }
}

.iu-popover {
    backdrop-filter: blur(12px);
    border-radius: 6px;
    font-size: 12px;
    color: #FFF;
}
</style>
<style  lang="scss">
.iu-popover {
    font-size: 14px;

    .yiyan-box {
        display: flex;
        color: #FFF;
        justify-content: space-between;
        align-items: center;
    }

    .yiyan-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0px;
    }

    .yiyan-icon :hover {
        width: 16px;
        height: 16px;
        color: #eee;
    }

    .ant-popover-inner {
        padding: 0px;
    }
}
</style>
  