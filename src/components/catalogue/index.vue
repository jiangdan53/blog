<template>
  <div class="catalogueBody" >
    <div class="catalogueM" @click.stop="isShow">
      <Icon type="mulu" />
    </div>
    <div class="catalogueContent" v-show="isShuqian">
      <ul class="catalogueUl" v-if="isClass">
        <li v-for="(item,index) in toc" :key="item.anchor" @click.stop="ActiveClass(item.anchor)" >
            <a :href="'#'+item.anchor"  :class="[item.anchor === isCatalogue ? 'active' : '']" >{{index+1}}.{{item.name}}</a>
          <ul v-if="item.children" class="catalogue-ChildrenUl">
            <li  v-for=" (chidren,chiIndex) in item.children" :key="chidren.anchor"  @click.stop="ActiveClass(chidren.anchor)" >
                <a :href="'#'+chidren.anchor" :class="[chidren.anchor === isCatalogue ? 'active' : '']">{{index+1}}-{{chiIndex+1}}{{chidren.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
     <ClassCatalogue v-else :ClassData="toc"/>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import ClassCatalogue from './classification.vue'
import {Throttle} from '@/utls'
export default {
  props: {
    toc: {
      type: Array,
    },
    isClass:{
      type:Boolean
    }
  },
    data(){
    return {
      isCatalogue:'',
      domscroll:0,// 计算滚动条需要移动的距离
      isShuqian:false
    }
  },
  computed:{
    getDom(){
      const doms=[];
    const addDom = (toc)=>{
      for (const item in toc) {
        doms.push(document.getElementById(toc[item].anchor))
        if(toc[item].children && toc[item].children.length){
          addDom(toc[item].children);
        }
      }
    } 
    addDom(this.toc);
    return doms
    }
  },
  created(){
    let ThrottleFun = Throttle(this.setActive,16,true)
    this.$bus.$on('mainScroll',ThrottleFun);
  },
  beforeDestroy(){
    // console.log('目录组件被卸载')
    // 解除事件总线事件时需要 传入指定取消监听事件总线的函数 如果不传入则会导致 取消监听这个事件触发机制的所有监听者 导致其他组件不能正常工作
    // 一旦监听了事件 再组件被卸载时一定即使取消监听否则会导致 内存飙高 因为我们不知道谁触发了 事件总线 导致已被卸载的组件还在一直接收其他组件触发的数据
    
    this.$bus.$off('mainScroll',this.setActive)
  },
  methods:{
    //实现滚动条运输滚动到指定位置；
    // 使用方法 @click.stop="ActiveClass(item.anchor)"
    ActiveClass(anchor){
      //.stop修饰符用阻止事件冒泡
      // this.isCtalogue = anchor
     let b =  document.getElementById(anchor).offsetTop;
     this.$bus.$emit('setMainscroll',b - this.domscroll);
    },
    isShow(){
      this.isShuqian = !this.isShuqian
    },
    setActive(dom){
      if(!dom){
        return 
      }
      this.domscroll = dom.scrollTop;
      const range = 200 ;
      for (const dom of this.getDom) {
        if(!dom){
          continue;
        }
        const top = dom.getBoundingClientRect().top
        if(top >=0 && top < range){
          this.isCatalogue = dom.id;
          return ;
        }else if(top > range){
          return ;
        }else{
          this.isCatalogue = dom.id
        }

      }
    }
  },
  components: {
    Icon,
    ClassCatalogue
  }

};
</script>

<style lang="less" scoped>
.catalogueBody{
  position: absolute;
  top: 10px;
  right: 10px;
  .catalogueM{
    box-sizing: border-box;
    position: absolute;
    font-size: 28px;
    right: 0px;
    border-radius: 5px;
    color: #d8d1c5;
    background-color:#efefef;
    cursor: pointer;
  }
  .catalogueContent{
    padding: 5px 8px;
    background-color: #ceb57f ;
    border-radius: 5px;
    a{
      display: block;
      width: 100%;
      height: 100%;
      color: #d9d0c3;
    }
    .catalogueUl{
      li{
        margin: 5px;
        padding: 2px;
        .catalogue-ChildrenUl{
          li{
            padding-left: 10px;
          }
        }
      }
      .active{
        background-color:#deab45;
        border-radius:3px;
        border-left: 2px solid #be4935;
      }
    }
  }
}
</style>