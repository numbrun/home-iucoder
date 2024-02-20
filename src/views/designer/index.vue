<template>

  <a-row ref="el" style="margin:0 100px;">
    <template v-for="item in list" :key="item.id" >
      <a-col :span="2" v-if="item.type == 'icon' || item.type == 'add'"
        class="flex flex-direction justify-center align-center"
        style="height:100%;cursor: pointer; height: 90px;margin: 10px;">
        <div style=" height: 70%;" :title='item.name'>
          <img class="app-item-img" :src="item.src" style=" height: 100%; border-radius: 15px;" />
        </div>
        <p style='flex:1;filter: drop-shadow(0px 2px 7px rgba(0,0,0,.1));margin-top: 5px;text-shadow: 0 0 2px #0000004d;'
          class="cl-ant-p sg-omit-sm text-white-sm">{{ item.name }}
        </p>
      </a-col>
      <a-col :span="4" v-else-if="item.type == 'component'" class="flex flex-direction justify-center align-center"
        style="height:100%;cursor: pointer; height: 180px;margin: 10px;">
        <HeadCalendar />
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable, type UseDraggableReturn } from 'vue-draggable-plus'
import { useGridsStore } from '@/store/grids';
import HeadCalendar from '../home/HeadCalendar.vue';


const el = ref()
const list = ref()
onMounted(() => {
  console.log('()..navIconConfig', useGridsStore().getSelectedGrids.navIconConfig)
  list.value = useGridsStore().getSelectedGrids.navIconConfig
})

// 返回值是一个对象，包含了一些方法，比如 start、destroy、pause 等
const draggable = useDraggable<UseDraggableReturn>(el, list, {
  animation: 150,
  onStart() {
    console.log('start')
  },
  onUpdate() {
    console.log('update')
  }
})
</script>