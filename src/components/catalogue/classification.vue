<template>
  <div>
    <ul>
       <h3>分类</h3>  
       <li v-for="item in AllClass" :key="item.id" :class="{active:item.isSlelect}" @click="classRoute(item.id)">{{item.name}} ({{item.articleCount}}) 篇</li>
    </ul>
  </div>
</template>

<script>
export default {
props:{
    ClassData:{
        type:Array
    }
},
computed:{
    categoryId(){
        return +this.$route.params.categoryId || -1
    },
    AllClass(){
        let Allclass = 0
            for (const item of this.ClassData) {
                Allclass += item.articleCount
            }
        const result = [
            {
                name:'全部',
                id:-1,
                articleCount:Allclass,
            },
            ...this.ClassData
        ]  
        return result.map(it=>({
            ...it,
            isSlelect: it.id === this.categoryId
        }))
    }
},
methods:{
    classRoute(id){
        this.$router.push({
            name:'bloglist',
            query:this.$route.query,
            params:{
                blogtype:this.$route.params.blogtype,
                categoryId:id
            }
        })
    }
}
}
</script>

<style lang="less" scoped>
ul{
    li{
    min-width: 120px;
    padding: 5px 8px;
    margin: 3px 5px;
    cursor: pointer;
    &.active{
         background-color:#deab45;
        border-radius:3px;
        border-left: 2px solid #be4935; 
    }
    &:hover{
        background-color: #dab6b0;
        border-radius:3px;

    }
    }
}
</style>