<template>
  <div class="coent" :style="background">
    <PortaitImg :src="portaitImg" />
    <div class="portrait-list">
      <ul>
        <li><span >姓名:</span><span>丹丹</span></li>
        <li><span>年龄:</span><span>25</span></li>
        <li><span>编程时间:</span><span>3年</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import PortaitImg from '@/components/portraitImg'
export default {
    props:{
        portaitImg:{
            type:String,
            required:false,
            default:require('@/assets/img/portait.jpg')
        },
          backgroundImage:{
            type:String,
            required:false,
            default:require('@/assets/img/portait.gif')
        }
    },
computed:{
       background(){
            return {
                 backgroundImage:`url(${this.backgroundImage})`,
                 objectFit:'cover',
                 backgroundSize:`cover`,
                 backgroundRepeat:'no-repeat',
                 backgroundPosition:'center center'
                }
        },
},
components:{
  PortaitImg
}
};
</script>

<style scoped lang="less">
.coent {
text-align: center;
.portrait-list{
  font-size: 14px;
  ul{
    padding-bottom: 20px;
 li{
    width: 100%;
    padding: 5px 8px;
    span{
      display: inline-flex;
      min-width: 80px;
    }
  }

  }
 
}
}
</style>