<template>
        <img ref="img" :src="asyncsrc" class="inserted skeleton-circular boxShadow"  :style="porSize" />
</template>
<script>
export default {
    data(){
        return {
            isloding:true,
            asyncsrc:'',
        }
    },
     
    methods:{
        daly(){
            return new Promise(res=>{
                setTimeout(()=>{
                    res()
                },2000)
            })
        },
    async asyncsrcs(){
        await this.daly();
         this.asyncsrc = this.src
     },
    },
    mounted(){
        this.$refs.img.onload = ()=>{
            this.isloding = false
        }
        this.asyncsrcs()
    },
    props:{
        src:{
            type:String,
            required:true
        },
        size:{
            type:Number,
            default: 100
        },
      
    },
    computed:{
        porSize(){
            return `width: ${this.size}px; height: ${this.size}px;`
        },
     
    }
}
</script>

<style scoped lang="less">
@import '@/assets/less/color.less';
        .inserted{
            margin-top: 20px;
            border-radius: 50%;
            object-fit: cover;
            transition: all .5s;
            }
          img[src=""],img:not([src]){
            opacity:0;
         
            }
        .boxShadow{
            box-shadow: 0 10px 10px #f5f5f4;
            backdrop-filter:blur(4px)
        }
        
            
</style>

