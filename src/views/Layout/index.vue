<template>
  <div class="Blog">
    <Nav :liftHidden="liftHidden" @navshow="NavShow" />
    <div class="content" ref="contentref">
      <div class="menu" :class="menuClass" @click="NavShow">
        <div v-show="!ismenutext">
          <Icon type="menu" :interval="4" />MEUN
        </div>
        <div v-show="ismenutext">
          <Icon type="menu" :interval="4" />
        </div>
      </div>
      <router-view ref="header"></router-view>
    </div>
  </div>
</template>

<script>
// 导入组件
import Nav from "@/views/nav";
import Icon from "@/components/Icon";
import HederInmage from "@/components/haederImg";
import mainScroll from "@/mixins/mainScroll.js";
import RigthNav from "@/components/rigthNav";
import {Delay,Throttle} from '@/utls'
export default {
  mixins: [mainScroll("contentref")],
  data() {
    return {
      portait: "",
      size: 150,
      cont: 0,
      isloding: true,
      liftHidden: false,
      domScrollObj:{}
    };
  },
  computed: {
    menuClass() {
      return this.ismenutext ? "menuIcon" : "";
    },
    bgimage() {
      const bg = require("@/assets/img/home.jpg");
      return bg;
    }
  },
  methods: {
    NavShow() {
      this.liftHidden = !this.liftHidden;
    },
    contentScroll(dom) {
       let maxscroll = window.innerHeight * 0.8;
      let that = this
      try {
        maxscroll =
          this.$refs.header.$refs.headerimg.$el.getBoundingClientRect().height *
          0.8;
      } catch (err) {}
      if (!dom) {
        this.ismenutext = false;
        return;
      }
      this.ismenutext = dom.scrollTop > maxscroll;
    },
    
  },
  watch:{
    async $route(){
         let isHistory = JSON.parse(window.localStorage.getItem(`${this.$route.params.blogtype}`))
       if((isHistory && window.history.state ) && window.history.state.key === isHistory.historyKey){
        this.target = 0
         await Delay(500);
        this.$bus.$emit('setMainscroll',isHistory.scrollTop)
        }else{
        this.$refs.contentref.scrollTop = 0;
        }
      isHistory = null
    }
  },
  created() {
    const imgsrc = require("@/assets/img/portait.jpg");
    this.portait = imgsrc;
    let Throttles = Throttle(this.contentScroll,16,true)
    this.$bus.$on("mainScroll", Throttles);
  },
  //局部注册组件
  components: {
    Nav,
    Icon,
    HederInmage,
    RigthNav
  }
};
</script>

<style scoped lang="less">
@import "@/assets/less/color.less";
.Blog {
  color: @txtColor;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .content {
    width: 100%;
    position: relative;
    overflow: overlay;
    // scroll-behavior: smooth; // 滚动条匀速滚动属性
    &::-webkit-scrollbar {
      // 设置滚动条容器的宽度
      width: 4px;
      height: 100%;
    }
    &::-webkit-scrollbar-track {
      // 设置滚动条滑轨的背景
      border-radius: 0;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      //设置滚动条样式
      border: 1px solid #fff;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.3);
    }
    .skeleton-circular {
      width: 175px;
      height: 175px;
    }
   
    .menu {
      z-index: 101;
      position: fixed;
      top: 10px;
      left: 10px;
      padding: 5px 8px;
      border: 1px solid rgba(235, 255, 255, 0.8);
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      cursor: pointer;
      color: #fff;
      text-indent: 2px;
      &:hover {
        color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.5);
      }
      &.menuIcon {
        background-color: #000;
        border-left: none;
        left: 0px;
        border-radius: 0 5px 5px 0;
      }
    }
  }
}
</style>

