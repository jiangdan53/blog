<template>
  <div class="Thur">
    <ul class="ThurUl">
        <li @click="chengePage(1)" :class="{noCheng:curIndex === 1}">首页</li>
        <li @click="chengePage(curIndex - 1)" :class="{noCheng:curIndex === 1}">上一页</li>
        <li  v-for="item in showPages" :key="item" :class="{active:item === curIndex}" @click="chengePage(item)">{{item}}</li>
        <li @click="chengePage(curIndex +1 )" :class="{noCheng:curIndex === totloPage}">下一页</li>
        <li @click="chengePage(totloPage)" :class="{noCheng:curIndex === totloPage}">尾页</li>
    </ul>
  </div>
</template>

<script>
export default {
props:{
    limit:{
        type:Number,
        default:10
    },
    totlo:{
        type:Number,
        required:true
    },
    curIndex:{
        type:Number,
    },
    pageNumber:{
        type:Number,
        default:5
    }
},
computed:{
    totloPage(){
        return Math.ceil(this.totlo / this.limit)
    },
    getPageMix(){
        let mix = this.curIndex - Math.floor(this.pageNumber / 2);
        if(mix < 1 || this.totloPage < 5){
            mix = 1
        }else if(this.curIndex === this.totloPage){
            mix = this.curIndex - 4
        }
        return mix
    },
    getPageMax(){
        let max = this.curIndex + Math.floor(this.pageNumber / 2);
        if(max > this.totloPage){
            max = this.totloPage
        }else if(this.totloPage > 5 && max < 5){
            max = 5
        }else if(this.totloPage < 5){
            max = this.totloPage
        }
        return max
    },
    showPages(){
        let arr = [];
        for(let i = this.getPageMix; i <= this.getPageMax; i ++){
            arr.push(i)
        }
        return arr
    }
},
created(){
    // 判断当前数据量是否等于当前页码 如果不等直接触发chengePage函数通知父组件
    if(this.totloPage < this.curIndex){
        this.chengePage(this.curIndex)
    }
},
updated(){
      if(this.totloPage < this.curIndex){
        this.chengePage(this.curIndex)
    }
},
methods:{
    chengePage(Number){
        if(Number < 1){
            Number = 1
        }
        if(Number > this.totloPage){
            Number = this.totloPage
        }
        if(Number === this.curIndex){
            return 
        }
        this.$emit('chengePage',Number);
    }
}
}
</script>

<style lang="less" scoped>
.Thur{
    width: 100%;
    margin: 10px 0px 10px 0px;
    position: relative;
    display: flex;
    justify-content: center;
    .ThurUl{
        display: flex;
        text-align: center;
        li{
        margin: 0px 5px 0px 5px;
        padding: 5px 8px;
        border: 1px solid #d5cdd8;
        border-radius:3px;
        font-size: 12px;
        color: #9eabb3;
        cursor: pointer;
        &.active{
            border: none;
            color: red;
        }
        &.noCheng{
            cursor: not-allowed;
            background-color: rgb(65, 63, 63);
        }
        }
    }
}
</style>