<template>
  <div>
    <h2>BABA有存款{{money}}</h2>
    <button @click="jieQianFromXM(100)">找小明借钱100</button>
    <button @click="jieQianFromXH(150)">找小红借钱150</button>
    <button @click="jieQianFromChild(200)">找所有孩子借钱200</button>
    <br>
    <!-- ref可以获取标签的节点 -->
    <Son ref="xm" />
    <br>
    <Danughter ref="xh" />
  </div>
</template>

<script>
import Son from '@/views/Communication/ChildrenParent/Son.vue'
import Danughter from '@/views/Communication//ChildrenParent/Danughter.vue'
export default {
  name: 'ChildrenParent',
  components: { Son, Danughter },
  data() {
    return {
      money:1000
    }
  },
  // 方法
  methods: {
    // 向小明借钱100
    jieQianFromXM(money) {
      // 父亲增加100
      this.money += money
      // console.log(this.$refs.xm)
      // ref可以获取真实DOM节点，当然也可以获取子组件标签操作子组件的数据和方法
      this.$refs.xm.money -= money
    },
    // 向女儿小红借钱150
    jieQianFromXH(money) {
      this.money += money
      this.$refs.xh.money -= money
    },
    // 向所有的孩子借钱200
    jieQianFromChild(money) {
      this.money += 2 * money
      // $children 获取组件内所有的子组件数组形式
      // console.log(this.$children) 
      this.$children.forEach(item => item.money -= money)
    }
  }
}
</script>

<style lang='less' scoped>
</style>