<template>
  <ContentLayout v-loding="isLoding">
    <template v-slot:headerImg >
    <HederInmage
    :ishearder="false"
    ref="headerimg"
    :bgimage="data && data.thumb " 
    >
      <template v-slot:header>
        <HaederCom  :isHeader="false" :text="data" :atrcle="data"></HaederCom>
      </template>
    </HederInmage>
    </template>
    <template v-slot:content>
    <div class="catalogue">
    <Catalogue :toc="data && data.toc" :isClass="true"></Catalogue>
    </div>
    <div class="markdown-body listto" v-if="isTure">
      <div v-html="data.htmlContent">
      </div>
  
    </div>
    
    </template>
  </ContentLayout>
</template>

<script>
import ContentLayout from '@/views/content/layout';
import HederInmage from "@/components/haederImg";
import HaederCom from "@/components/haederImg/haederComponent";
import fetchData from '@/mixins/fetchData';
import Catalogue from '@/components/catalogue';
import {getBlog} from '@/api/blog'
import 'highlight.js/styles/base16/github.css';
import 'github-markdown-css';
export default {
  name:'blogArticle',
mixins:[fetchData()],
methods:{
    fetchData(){
        return getBlog()
    },
},
computed:{
     isTure(){
      if(this.data === null){
        return false
      }else{
        return true
      }
    }
},
components:{
    ContentLayout,
    HederInmage,
    Catalogue,
    HaederCom
}
}
</script>

<style lang="less" scoped>

</style>