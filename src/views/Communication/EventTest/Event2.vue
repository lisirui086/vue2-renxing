<template>
  <div>
    <h1>Event2组件</h1>
    <button @click="$emit('click','分发自定义click事件')">分发自定义click事件</button><br/>
    <button>分发自定义xxx事件</button><br/>
  </div>
</template>

<script>
export default {
  name: 'Event2'
}
</script>

<style lang='less' scoped>
</style>