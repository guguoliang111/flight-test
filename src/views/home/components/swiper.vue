<template>
  <div class="swiper_box">
     <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
        <swiper-slide style="background: red; border-radius: 4px;" v-for="(item,index) in 4" :key="index">
          <!-- <a> -->
            <!-- <img :src="item.img" /> -->
            {{item}}
          <!-- </a> -->
        </swiper-slide>
        <!-- 如果需要分页器 slot插槽 会自动往里面渲染分页器-->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 如果需要导航按钮 -->
      </swiper>
      <div class="swiper-button-prev" @click="prev" slot="button-prev"></div>
        <div class="swiper-button-next" @click="next" slot="button-next"></div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: '',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        // 轮播图的方向，也可以是vertical方向horizontal
        direction: 'vertical',
        // 自动播放
        // autoplay: false,
        // 环路播放
        loop: true,
        // 切换效果
        effect: 'cube',
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // cubeEffect: {
        //   slideShadows: true,
        //   shadow: true,
        //   shadowOffset: 100,
        //   shadowScale: 0.6
        // }
      },
      // 分页器
      pagination: {
        el: '.swiper-pagination',
        // clickable设置为true时，点击分页器的指示点分页器会控制Swiper切换
        clickable: true
      }
      // 前进后退按钮
    }
  },
  computed: {},
  watch: {},
  methods: {
    prev () {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    next () {
      this.$refs.mySwiper.$swiper.slideNext()
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper_box {
  position: relative;
  z-index: 999;
  width: 150px;
  height: 300px;
  // background-color: firebrick;
  .swiper-button-next:after, .swiper-button-prev:after  {
    display: none;
  }
  .swiper-button-prev {
    position: absolute;
    top: -6px;
    left: 0px;
    width: 150px;
    height: 20px;
    background: url(../../../assets/images/top.png) no-repeat;
    background-color: #fff;
    border-radius: 4px;
    z-index: 999;
  }
  .swiper-button-next {
    position: absolute;
    top: 328px;
    left: 0px;
    width: 150px;
    height: 20px;
    background-color: #fff;
    border-radius: 4px;
    background: url(../../../assets/images/bot.png) no-repeat;
    z-index: 999;
  }
  .swiper {
    height: 300px;
    .swiper-slide {
      height: 150px;
      width: 100%;
    }
  }
}
</style>
