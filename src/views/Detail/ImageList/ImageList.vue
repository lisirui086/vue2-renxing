<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" 
        :class="{ active: currentIndex == index }"
        @click="changeActive(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  // 方法
  methods: {
    // 点谁谁亮
    changeActive(index) {
      this.currentIndex = index
      this.$bus.$emit('changeIndex',index)
    }
  },
  watch: {
    skuImageList(newVal, oldVal) {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // 前进后退
          navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          },
          // 设置slider容器能够同时显示的slides数量(carousel模式)。
          slidesPerView :'3'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>