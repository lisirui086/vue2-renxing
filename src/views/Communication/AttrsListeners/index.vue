<template>
  <div>
    <h2>自定义Hover提示的按钮</h2>
    <HintButton type="success" icon="el-icon-delete" size="mini" title="提示" @click="isAlert" />
  </div>
</template>

<script>
import HintButton from '@/views/Communication/AttrsListeners/HintButton'
export default {
  name: 'AttrsListeners',
  components: { HintButton },
  methods: {
    isAlert() {
      alert(666)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
