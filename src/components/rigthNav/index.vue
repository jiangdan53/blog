<template>
  <div class="skeleton" :style="{...skeletonStyle,...optacity}">
        <div v-for="(item,index) in darke" 
        class="item dark"
        :key="'bark' + index"
        :style="{backgroundColor:barkColor,...createStyle(item)}"
        >
        </div>
        <div v-for="(item,index) in lights"
                class="item ligth"
                :style="{...createStyle(item),backgroundColor:lightColor}"
                :key="'ligths' + index"
        >
        </div>
         <div v-for="(item,index) in squares"
                class="item square"
                :style="createStyle(item)"
                :key="'squares' + index"
        >
        </div>
           <div v-for="(item,index) in circulars"
                class="item circular"
                :style="createStyle(item)"
                :key="'circulars' + index"
        >
        </div>
               <div v-for="(item,index) in cylinders"
                class="item cylinder"
                :style="createCylinderStyle(item)"
                :key="'cylinders' + index"
        >
        </div>
  </div>
</template>

<script>
export default {
name:'Skeleton',
data(){
    return {
        darke:[],
        lights:[],
        squares:[],
        circulars:[],
        cylinders:[]
    }
},
props:{
    selector:{
        type:String,
        required:false,
        default:'skeleton'
    },
    backgroundColor:{
        type:String,
        required:false,
        default:'transparent',
    },
    lightColor:{
        type:String,
        required:false,
        default:'white'
    },
    barkColor:{
        type:String,
        required:false,
        default:'#2f3333'
    },
    top:{
        type:String,
        required:false,
        default:'0'
    },
    optacy:{
        type:String,
        required:false,
        default:'0'
    }
    
},
mounted(){
    
    Promise.all([this.selectAll(`${this.selector}-dark`),
    this.selectAll(`${this.selector}-light`),
    this.selectAll(`${this.selector}-square`),
    this.selectAll(`${this.selector}-circular`),
    this.selectAll(`${this.selector}-cylinder`)])
    .then(([darks,lights,squares,circulars,cylinders])=>{
        this.darke = darks;
        this.lights = lights;
        this.squares = squares;
        this.circulars = circulars;
        this.cylinders = cylinders
    })
},
computed:{
    skeletonStyle(){
        return {
            backgroundColor:this.backgroundColor,
            top:this.top
        }
    },
    optacity(){
        return {
         optacity:this.optacy
        }
    }
},
methods:{
    selectAll(skeleton){
        let domlist = document.getElementsByClassName(skeleton);
        return new Promise(res=>{
            let result = [];
            for(let i = 0 ; i < domlist.length;i++){
                result.push(domlist[i].getBoundingClientRect());
            }
            res(result)
        })
    },
    createStyle({width,height,top,left}){
        return {
            width:`${width}px`,
            height:`${height}px`,
            top:`${top}px`,
            left:`${left}px`
        }
    },
    createCyilderStyle(recr){
        return {
            ...this.createStyle(recr),
            'border-radius':`${recr.height/2}px`
        }
    }
},
beforeDestroy(){
    console.log('组件即将被销毁');
},
destroyed() {
console.log('组件被销毁')  
},
}
</script>

<style scoped lang="less">
.skeleton{
    position: fixed;
    top: 0;
    display: block;
    width: 100%;
    height: 100vh;
    z-index: 9997;
    overflow: hidden;
    .item{
        position: fixed;
        display: inline-block;
        background-color: #f5f5f5;
        z-index: 999;
        transition: all .3s;
        &.dark,
        &.light{
            z-index: 1000;
        }
        &.square{
            border-radius: 8px;
        }
        &.circular{
            border-radius: 50%;
        }

    }
}
</style>