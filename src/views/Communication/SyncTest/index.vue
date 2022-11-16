<template>
  <div>
    小明爸爸现有{{money}}元
    
    <h2>不使用sync修饰符</h2>
    <Children1 :money="money" @update:money="money = $event" />

    <h2>使用sync修饰符</h2>
    <Children2 :money.sync="money" />
    <hr>
  </div>
</template>

<script>
import Children1 from '@/views/Communication/SyncTest/Children1.vue'
import Children2 from '@/views/Communication/SyncTest/Children2.vue'
export default {
  name: 'SyncTest',
  components: { Children1, Children2 },
  data() {
    return {
      money:10000
    }
  }
}
</script>

<style lang='less' scoped>
</style>