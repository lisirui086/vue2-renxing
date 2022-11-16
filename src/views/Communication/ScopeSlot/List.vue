<template>
  <ul>
    <li v-for="(item,index) in todos" :key="index">
      <!-- 作用域插槽 -->
    <slot :child="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
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