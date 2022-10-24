<template>
  <div>
    <Header v-show="$route.meta.isShow"></Header>
    <router-view></router-view>
    <!-- 在home，search显示 在login，register隐藏-->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
export default {
  name: 'App',
  components: { Header, Footer },
  mounted() {
    // 通过vuex发请求 获取数据 存储仓库中
    this.$store.dispatch('categoryList')
  },
}
</script>

<style lang='less' scoped>

</style>
