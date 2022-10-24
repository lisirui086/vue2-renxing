<template>
  <!-- 轮播图  -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'; // 注意引入的是Swiper
export default {
  name: 'Carousel',
  // 接收数据
  props: ['list'],
  // 监听
  watch: {
    list: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.swiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next', // 右按钮
              prevEl: '.swiper-button-prev', // 左按钮
            },
          })
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
