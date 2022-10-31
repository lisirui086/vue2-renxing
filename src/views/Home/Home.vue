<template>
  <div>
    <!-- 使用三级联动组件 它是全局组件不需要再import了-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- ：list开启父传子 -->
    <Floor v-for="(f,index) in floorList" :key="f.id" :list='f'/>
    <Brand/>
  </div>
</template>

<script>
// 引入ListContainer组件
import ListContainer from '@/views/Home/ListContainer/ListContainer'
import Recommend from '@/views/Home/Recommend/Recommend'
import Rank from '@/views/Home/Rank/Rank'
import Like from '@/views/Home/Like/Like'
import Floor from '@/views/Home/Floor/Floor'
import Brand from '@/views/Home/Brand/Brand'
// 引入vuex
import { mapState } from "vuex";
export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 派发action 获取floor组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style lang='less' scoped>
</style>
