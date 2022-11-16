<template>
  <div>
    <span>小明每次花100元</span>
    <button style="background-color:red;" @click="changeMoney">花钱</button>
    爸爸还剩{{money}}元
  </div>
</template>

<script>
export default {
  name: 'Children2',
  // 接收参数
  props: ['money'],
  methods: {
    changeMoney() {
      this.$emit('update:money', this.money - 200)
      console.log('Children2');
    }
  }
}
</script>

<style lang='less' scoped>
</style>