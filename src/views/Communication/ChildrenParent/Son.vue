<template>
  <div>
    <h3>儿子小明：有存款{{money}}</h3>
    <button @click="giveMoney(50)">给BABA钱：50</button>
  </div>
</template>

<script>
import { giveMoney } from "./myMixin";
export default {
  name: 'Son',
  mixins: [giveMoney],
  data() {
    return {
      money:30000
    }
  }
}
</script>

<style lang='less' scoped>
</style>