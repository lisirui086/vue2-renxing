<template>
  <div>
    <h3>女儿小红：有存款{{ money }}</h3>
    <button @click="giveMoney(100)">给BABA钱：50</button>
  </div>
</template>

<script>
// 引入混合mixin
import {giveMoney} from './myMixin'
export default {
  name: 'Danughter',
  mixins: [giveMoney],
  data() {
    return {
      money: 20000
    }
  }
}
</script>

<style lang='less' scoped>

</style>