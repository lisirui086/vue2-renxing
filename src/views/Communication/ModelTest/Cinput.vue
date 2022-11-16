<template>
  <div style="background:#ccc;height:50px">
    <h1>input包装组件</h1>
    <!-- :value是动态绑定的属性 @input是原生DOM事件 -->
    <input type="text" :value="value" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'Cinput',
  props: ['value']
}
</script>

<style lang='less' scoped>
</style>