<template>
  <div>
    <!-- 可以巧妙利用a标签实现按钮带有提示功能 -->
    <a :title="title">
      <!-- 只能用v-bind 不能简写: -->
      <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title'],
  mounted() {
    // $attrs属于组件的一个属性，可以获取到父组件传递过来的props参数
    // 对于子组件而言，父组件给的数据可以利用props接收但需要注意的
    // 如果子组件通过props接收的属性，在$attrs是接收不到的
    console.log(this.$attrs);
    // $listener属于组件的一个属性，可以获取父组件身上的方法
    console.log(this.$listeners)
  }
}
</script>

<style lang='less' scoped>

</style>