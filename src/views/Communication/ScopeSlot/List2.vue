<template>
  <ul>
    <li v-for="(yige,index) in todos" :key="index">
      <!-- 作用域插槽 -->
    <slot :count="yige" :index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List2',
  // 接收父组件传递的props
  // props: ['todos']
  // props的对象写法
  props: {
    todos: Array
  }
}
</script>

<style lang='less' scoped>
</style>