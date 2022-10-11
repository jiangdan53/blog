<template>
  <div class="headerImage" ref="bg" :class="headerSize" :style="headerBg">
    <div class="haeder-text">
      <slot name="header">默认展示信息</slot>
    </div>
    <button class="animation" @click="setScroll">
      <Icon type="rigthbut" :reveresal="true" />
    </button>
    <HeaderCanvas v-if="ishearder"></HeaderCanvas>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import HeaderCanvas from "./handerCanvas";
export default {
  props: {
    bgimage: {
      type: String,
      required: false
    },

    ishearder: {
      type: Boolean,
      requried: true
    }
  },
  data(){
    return {
      scrollIndex:120,
      target:0,
      a:0
    }
  },
  computed: {
    headerBg() {
        if(this.bgimage){
      return {
          backgroundImage:  `url(${this.bgimage}) `,
          backgroundSize:'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        };
        }
     
    },
    headerSize() {
      return this.ishearder ? "homeimg" : "textimg";
    }
  },
  
  methods:{
    setScroll(){
           this.$bus.$emit('setMainscroll',this.$refs.bg.getBoundingClientRect().height - this.a)
        }
  },
  created(){
   this.$bus.$on('mainScroll',(dom)=>{
    if(!dom){
      return 
    }
            this.a = dom.scrollTop;
          })
  },
components: {
    HeaderCanvas,
    Icon
  }
};
</script>

<style lang="scss" scoped lang="less">
@import "@/assets/less/color.less";

.headerImage {
  width: 100%;
  height: 100vh;
  position: relative;
  background-size: 100% 100%;
  z-index: 999;
  background: #8c8c88;
  .animation {
    position: absolute;
    box-sizing: border-box;
    left: 50%;
    z-index: 1000;
    // top:80%;
    bottom: 20px;
    background-color: transparent;
    border: none;
    color: @txtColor;
    font-size: 28px;
    animation: topbottom 2s infinite;
    transform-origin: 9px 10px;
     &:hover{
    animation-play-state:paused;
  }
  }
 
  /*css动画*/
  @keyframes topbottom {
   0%{
    bottom:45px;
    transform: scale(0.9)  translateX(-50%);
   } 
  50%{
    bottom: 15px;
    transform: scale(1) translateX(-50%)
  }
   100%{
    bottom:45px;
    transform: scale(0.9) translateX(-50%);
 
   }

  }
  &.homeimg {
    height: 100vh;
  }
  &.textimg {
    max-height: 70vh;
  }
  .haeder-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>