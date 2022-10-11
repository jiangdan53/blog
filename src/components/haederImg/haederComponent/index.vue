<template>
  <div class="Com" >
    <div class="homeCom" :class="isa"  v-if="isHeader">
        <h1>{{ text && text.title}}</h1>
        <p>{{text && text.description}}</p>
        <p>{{text && text.motto}}</p>
    </div>
    <div class="homeCom" v-else  :class="isa">  
    <h1>{{text !== null && text.title}}</h1>
    <Atrcle :ArtcleData="atrcle !== null && atrcle"/>
    <p class="typeText">
   <span >{{text !== null && text.description}}</span>
    </p>
    </div>
   
  </div>
</template>
<script>
import Icon from '@/components/Icon'
import Atrcle from '@/components/ArticleInformation'
export default {
data(){
    return {
        oldVlue:''
    }
},
computed:{
    isa(){
        return this.$parent.$parent.$parent.isLoding ? '':'opcavt'
    }
},
created(){
   
},
props:{
isHeader:{
    type:Boolean,
    required:false,
    default:false
},
atrcle:{
    type:Object,
    required:true
},
text:{
    type:Object,
    required:true
}
},
components:{
    Icon,
    Atrcle,
},
 }
</script>

<style lang="less" scoped>
.Com{
    width: 600px;
    height: 50%;
    align-items: center;
    justify-content: center;
    .homeCom{
        width: 100%; 
        min-height: 160px;
        text-align: center;
        color: rgba(255, 250, 245, 0.9);
        transition: all .5s ease-out ;
        opacity: 0;
        margin-left: -60px;
        &.opcavt{
            opacity: 1;
            margin-left: 0;
        }
      
        h1{
            font-size: 40px;
            line-height: 40px;
        }
        p{
            font-size: 20px;
            line-height: 40px;
        }
        .typeText{
            line-height: 40px;
            span{
            background-color: rgb(201, 224, 30);
            padding: 3px 15px;
            border-radius: 3px;
            }
           
           
            
        }
    }
    
}
</style> 