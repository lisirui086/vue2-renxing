<template>
  <div>
    组件间通信高级（**非常重要，面试必备**）
    <hr />
    <div >
      <router-link class="isClick" to="/communication/eventtest" >event深入</router-link>&emsp;
      <router-link class="isClick" to="/communication/modeltest" >v-model深入</router-link>&emsp;
      <router-link class="isClick" to="/communication/synctest" >属性修饰符sync</router-link>&emsp;
      <router-link class="isClick" to="/communication/attrslisteners" >$attrs与$listeners</router-link>&emsp;
      <router-link class="isClick" to="/communication/childrenparent" >$children与$parent</router-link>&emsp;
      <router-link class="isClick" to="/communication/scopeslot" >作用域插槽scope-slot</router-link>&emsp;
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Communication'
}
</script>

<style lang='less' scoped>
div {
  font-size: 25px;
  color: blue;
}
.isClick:focus{
  color:rgb(255, 0, 0)
}

</style>