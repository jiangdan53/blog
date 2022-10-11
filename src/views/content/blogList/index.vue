<template>
<contentLayout v-loding="isLoding" > 
  <template v-slot:headerImg>
    <HederInmage
    :ishearder="true"
    ref="headerimg"
    :bgimage="banner && banner.bigImg" 
    >
      <template v-slot:header :data="data && data">
        <HaederCom  :isHeader="true" :text="banner" :atrcle="data"></HaederCom>
      </template>
    </HederInmage>
  </template>
  <template #content>
       <div class="catalogue">
    <Catalogue v-if="Catalogue && Catalogue.length!== 0" :toc="Catalogue" :isClass="false"></Catalogue>
    </div>
     <div class="listto">
     <ul>
      <li v-for="item in data && data.rows" :key="item.id">
          <h2 @click="MyRoute(item.category.id)" >标题： {{item.title}}</h2>
        <Atrcle :ArtcleData="item"/>
        <p>摘要: {{item.description}}</p>
        <div class="btnTitile">
        <p @click.stop="MyRoute(item.category.id)"> <Icon type="yanjing" :interval="8"  />点击查看....</p>
        <span>{{item.category.name}}</span>
        </div>
      </li>
    </ul>
    <ThurPage v-if="data && data.total" :totlo="data && data.total" :curIndex="routeInfo.curIndex" @chengePage="chengePage"/>
    </div>  
  </template>
</contentLayout>
</template>

<script>
import contentLayout from '@/views/content/layout';
import HederInmage from "@/components/haederImg";
import Atrcle from '@/components/ArticleInformation';
import HaederCom from "@/components/haederImg/haederComponent";
import Icon from '@/components/Icon'
import Catalogue from '@/components/catalogue';
import ThurPage from '@/components/ThurPage'
import {getBanderImg} from '@/api/bander';
import {getBlogs,getBlogCategories} from '@/api/blog';
import fetchData from '@/mixins/fetchData'
export default {
  mixins:[fetchData()],
  data(){
    return {
      banner:{},
      Catalogue:[]
    }
  },
  computed:{
    isTure(){
      if(this.data=== null){
        return false
      }else{
        return true
      }
    },
    routeInfo(){
      return {
        limit:+this.$route.query.limit || 10,
        curIndex:+this.$route.query.curIndex || 1
      }
    },
    categoryId(){
      return +this.$route.params.categoryId || -1 
    }
  },
  watch:{
    async $route(){
    this.isLoding = true
     this.data = await this.fetchData();
     this.isLoding = false;
    }
  },
  methods:{
    chengePage(number){
      let query = this.routeInfo;
      query.curIndex = number
      this.curIndex = query.curIndex;
      this.$router.push({
        name:'bloglist',
        params:{
          blogtype:this.$route.params.blogtype,
          categoryId:this.categoryId
        },
        query,
      })
    },
   async fetchData(){
      return await getBlogs(this.routeInfo.curIndex,this.routeInfo.limit,this.categoryId)
    },
    MyRoute(category){
       this.$router.push({
        name:'blogarticl',
        params:{
          blogtype:this.$route.params.blogtype,
          id:category
        },
        query:this.$route.query
       })
    }
  },
  async created(){
    let oData = await getBanderImg();
    this.banner = oData[Math.floor(Math.random() * 3)]
    this.Catalogue = await getBlogCategories();
  },
  beforeRouteLeave(to,from,next){
    if(window.history.state){
   window.localStorage.setItem(`${from.params.blogtype}`,JSON.stringify({historyKey:window.history.state.key,scrollTop:+document.getElementsByClassName('content')[0].scrollTop}))
    }
    next();
  },
  beforeRouteUpdate(to,from,next){

    if(window.history.state){
      if(to.params.blogtype !== from.params.blogtype){
    window.localStorage.setItem(`${from.params.blogtype}`,JSON.stringify({historyKey:window.history.state.key,scrollTop:+document.getElementsByClassName('content')[0].scrollTop}))
      }
    }
    next();
  },
components:{
  contentLayout,
  HederInmage,
  Atrcle,
  HaederCom,
  Icon,
  Catalogue,
  ThurPage
},

}
</script>

<style lang="less" scoped>
    li{
  color: #6f6c6a;
  word-wrap: break-word;
  position: relative;
  cursor: pointer;
  padding: 10px 13px;
  margin: 15px 10px;
  border-radius: 8px;
  background-color: rgba(255, 245, 245, 0.5);
  box-shadow: 1px 1px 10px 1px  #c5dec8 ;
  transition: all 0.5s;
  .btnTitile{
    display: flex;
    align-items: center;
    span{
      font-size: 12px;
      box-sizing: border-box;
      position:absolute;
      right: 20px;
      padding:10px 13px; 
      border-radius: 5px;
      background-color: #f5f0e5;
      color: #3e639b;
    }
  }
  &:hover{
    transform: scale(1.02);
  }
  h2{
    margin: 10px 0px 10px 0px;
  }
  p{
    margin: 10px 0px 10px 0px;

  }
}

</style>