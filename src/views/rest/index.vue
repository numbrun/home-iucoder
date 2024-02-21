<template>
  <CompModal ref="modalRef">
    <template v-slot:content>
      <!-- 插槽的内容放这里 -->
    </template>
  </CompModal>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {

  setup() {
    const modalRef = ref(null)

    onMounted(() => {
      // 在组件mounted后，可以通过$refs访问到组件实例
    })

    return {
      modalRef
    }
  }
}
</script>