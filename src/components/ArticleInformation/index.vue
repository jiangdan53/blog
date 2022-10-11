<template>
  <div class="articleInfo">
    <span><Icon type="shijian" :interval="5"/>发表于：{{date()}}</span>
    <span><Icon type="yanjing" :interval="5"/>阅读量：{{ArtcleData.scanNumber}}</span>
    <span><Icon type="msg"  :interval="5"/>评论：{{ArtcleData.commentNumber}}</span>
    <span><Icon type="huo" :interval="5"/>推荐:{{ArtcleData.tuijian}}</span>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import moment from 'moment'
export default {
  props:{
    ArtcleData:{
      type:Object,
      required:false
    }
  },
  computed:{
   
  },
  methods:{
  date(){
      return moment(Number(this.ArtcleData.createDate)).format('YYYY-MM-DD HH:mm')
    }
  },
components:{
    Icon
}
}
</script>

<style lang="less" scoped>
.articleInfo{
  padding: 10px 15px;
}
</style>