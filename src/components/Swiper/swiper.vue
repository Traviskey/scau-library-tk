
  <template>
  <!--基础存放容器-->
  <div class="swiper-container">
    <!-- 需要进行轮播的部分 -->
    <div class="swiper-wrapper">
      <!-- 每个节点 -->
      <div class="swiper-slide">
        <img
          src="https://img.alicdn.com/bao/uploaded/i1/217042976/O1CN01Qwbw241Xr3ZJRIvcr_!!0-item_pic.jpg"
          alt="计算机网络自顶向下"
          class="swiper-lazy"
        />
      </div>
      <div class="swiper-slide">
        <img
          src="https://img.alicdn.com/bao/uploaded/O1CN017dxJ6F1zfQfWAxn4l_!!6000000006741-0-yinhe.jpg"
          alt="秒速五厘米"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </div>
      <div class="swiper-slide">
        <img

          src="https://img.alicdn.com/bao/uploaded/O1CN01HrTUt91xussf9GGkF_!!6000000006504-0-yinhe.jpg"
          alt="时间简史"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </div>
    </div>

    <!--如果需要使用分页器-->
    <div class="swiper-pagination swiper-pagination-white"></div>

    <!-- 如果需要使用前进后退按钮 -->
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
  </div>
</template>



<script>
import swiper from "swiper";

export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      new Swiper(".swiper-container", {
        //设置轮播的循环方式
        loop: true,

        //设置自动播放间隔时间
        autoplay: 2000,

        // 轮播效果,默认为平滑轮播
        effect: "slide",

        //分页器
        pagination: ".swiper-pagination",

        //前进后退按钮
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",

        // 用户中断轮播后续播
        autoplayDisableOnInteraction: false,
        //懒加载
        lazyLoading: true,
        

      });
    },
  },
};
</script>


<style scoped>
@import "../../../node_modules/swiper/dist/css/swiper.css";
.swiper-container {
  width: 1000px;
  height: 650px;
  margin-top: 40px;
}

.swiper-slide img {
  width: 100%;
  object-fit: cover;
}
</style>
