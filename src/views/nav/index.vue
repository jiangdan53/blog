<template>
  <div class="leftbody" :class="leftBody" @click="isleftShow">
    <div class="left left-bg" :class="lbg"></div>
    <div class="left" :class="hidden">
      <button class="but-hidden" @click="hiddenLift">
        <Icon type="delet" />
      </button>
      <Portait />
      <div class="navLink">
        <ul>
          <li @click="hiddenLift">
            <router-link  :to="{name:'bloglist',params:{blogtype:'web'}}">
              <Icon type="js"  :interval="8"/>WEB基础
            </router-link>
          </li>
          <li @click="hiddenLift">
            <router-link :to="{name:'bloglist',params:{blogtype:'frame',categoryId:-1}}">
              <Icon type="frame" :interval="8" />漫谈框架
            </router-link>
          </li>
            <li @click="hiddenLift">
            <router-link  :to="{name:'bloglist',params:{blogtype:'project',categoryId:-1}}">
              <Icon type="project" :interval="8" />实战集合
            </router-link>
          </li>
             <li @click="hiddenLift">
            <router-link  :to="{name:'bloglist',params:{blogtype:'food',categoryId:-1}}">
              <Icon type="food" :interval="8"/>生活分享
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import Portait from "@/components/portrait";

export default {
  data() {
    return {};
  },
  props: {
    liftHidden: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    isleftShow(e) {
      // e.currentTarget 是绑定该事件的元素
      // e.target 是我们当前点击的元素
      // 这里是因为我们需要在点击导航组件以外的区域时隐藏导航栏
      if (e.currentTarget === e.target) {
        this.$emit("navshow");
      }
    },
    hiddenLift() {
      this.$emit("navshow");
    }
  },
  computed: {
    hidden() {
      return this.liftHidden ? "left-hidden" : "";
    },
    lbg() {
      return this.liftHidden ? "lbg" : "";
    },
    leftBody() {
      return this.liftHidden ? "showLbofy" : "";
    }
  },
  components: {
    Icon,
    Portait
  }
};
</script>

<style lang="scss" scoped lang="less">
@import "@/assets/less/color.less";
.leftbody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
  visibility: hidden;
  z-index: 1002;
  &.showLbofy {
    visibility: visible;
  }
  .left {
    width: 260px;
    height: 100vh;
    background-color: @bg;
    position: absolute;
    transition: all 0.1s cubic-bezier(0.025, 0.9, 0.91, 0.1) 0.4s;
    left: -260px;
    &.left-hidden {
      left: 0;
    }
    cursor: pointer;
    .but-hidden {
      position: absolute;
      font-size: 26px;
      cursor: pointer;
      right: 5px;
      background-color: transparent;
      border: none;
      color: rgba(235, 222, 222, 0.5);
      &:hover {
        color: rgba(235, 222, 222, 0.9);
      }
    }
    &:hover {
      overflow: overlay; //设置 鼠标移入时显示滚动条
    }
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
  }
  .left-bg {
    position: absolute;
    width: 520px;
    left: -520px;
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.025, 0.15, 0.91, 0.1);
  }
  .lbg {
    left: -260px;
    border-radius: 0;
  }
  .navLink {
    ul {
      li {
        width: 80%;
        margin: 10px auto;
        height: 40px;
        line-height: 40px;
        color: #fff;
        a {
          box-sizing: border-box;
          padding-left: 20px;
          display: block;
          width: 100%;
          height: 100%;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 5px;
          &.router-link-active {
            background-color: #8abcd1;
          }
        }
      }
    }
  }
}
</style>