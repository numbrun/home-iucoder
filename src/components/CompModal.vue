<template>
    <div>
        <a-button type="primary" @click="showModal">Open Modal</a-button>
        <a-modal width="40%" :closable=false wrapClassName="comp-modal" ref="modalRef" v-model:open="open"
            :wrap-style="{ overflow: 'hidden' }" @ok="handleOk" :footer="null">
            <template #title>
                <div ref="modalTitleRef" style="width: 100%; cursor: move">
                    <div class="modal-header">
                        <span @click="handleOk" class="close icon-btn" title="关闭">
                            <i class="d-icon" style="transform: scale(.7);">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="12" height="12" viewBox="0 0 11 11" fill="currentColor">
                                    <path id="形状结合" fill-rule="evenodd" opacity="1"
                                        d="M8.55 10.58L5.5 7.53L2.45 10.58C1.89 11.14 0.98 11.14 0.42 10.58C-0.14 10.02 -0.14 9.11 0.42 8.55L3.47 5.5L0.42 2.45C-0.14 1.89 -0.14 0.98 0.42 0.42C0.98 -0.14 1.89 -0.14 2.45 0.42L5.5 3.47L8.55 0.42C9.11 -0.14 10.02 -0.14 10.58 0.42C11.14 0.98 11.14 1.89 10.58 2.45L7.53 5.5L10.58 8.55C11.14 9.11 11.14 10.02 10.58 10.58C10.02 11.14 9.11 11.14 8.55 10.58Z">
                                    </path>
                                </svg>
                            </i>
                        </span>
                        <!-- <span class="adjust icon-btn" title="放大/缩小">
                            <i class="d-icon" style="transform: scale(.7);">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="12" height="12" viewBox="0 0 11 11" fill="currentColor">
                                    <path id="形状" fill-rule="evenodd" opacity="1"
                                        d="M2.3,4.5v4.2h4.2c0.55,0 1,0.45 1,1v0.3c0,0.55 -0.45,1 -1,1h-5c-0.83,0 -1.5,-0.67 -1.5,-1.5v-5c0,-0.55 0.45,-1 1,-1h0.3c0.55,0 1,0.45 1,1zM9.5,0c0.83,0 1.5,0.67 1.5,1.5v5c0,0.55 -0.45,1 -1,1h-0.3c-0.55,0 -1,-0.45 -1,-1v-4.2h-4.2c-0.55,0 -1,-0.45 -1,-1v-0.3c0,-0.55 0.45,-1 1,-1z">
                                    </path>
                                </svg>
                            </i>
                        </span> -->
                    </div>
                </div>
            </template>
            <div class="modal-body">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </div>
            <template #modalRender="{ originVNode }">
                <div :style="transformStyle">
                    <component :is="originVNode" />
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, CSSProperties, watch, watchEffect } from 'vue';
import { useDraggable } from '@vueuse/core';
const open = ref<boolean>(true);
const modalTitleRef = ref<HTMLElement | null>(null);
const showModal = () => {
    open.value = true;
};
const { x, y, isDragging } = useDraggable(modalTitleRef);
const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
};
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalTitleRef.value.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});
watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});

watchEffect(() => {
    if (startedDrag.value) {
        transformX.value =
            preTransformX.value +
            Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
            startX.value;
        transformY.value =
            preTransformY.value +
            Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
            startY.value;
    }
});
const transformStyle = computed<CSSProperties>(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});
</script>
<style lang="scss">
.comp-modal {
    .ant-modal-content {
        padding: 0;
        min-height: 300px;
        overflow-x: hidden;
        // background-image: url($wallThumb);
        // background-size: cover;
        // background-position: center;
        // background-repeat: no-repeat;
        backdrop-filter: blur(20px);
        background-color: rgba(255,255,255, .5);
    }

    .modal-header {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 6px 0;

        .icon-btn {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            margin-left: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .d-icon {
                color: rgba($color: #000000, $alpha: .4);
            }
        }

        .close {
            background: #ff5f57;
        }

        .adjust {
            background-color: #28c840;
        }
    }

    .modal-body {
        padding: 0 10px;
        overflow-x: hidden;
    }
}
</style>
  
  