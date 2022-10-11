<template>
 <i class="iconfont icon-container"  :style="IconStyle"  :class="IconClass" ></i>
</template>

<script>
export const MyIcons = {
    warning:'icon-warning-circle',
    msg:'icon-message',
    inputMsg:'icon-edit-square',
    wachat:'icon-wechat-fill',
    live:'icon-heart',
    fabulous:'icon-like',
    low:'icon-unlike',
    err:'icon-error',
    star:'icon-star',
    github:'icon-github-fill',
    search:'icon-search',
    phone:'icon-whatsapp',
    qq:'icon-QQ-circle-fill',
    filter:'icon-filter',
    group:'icon-team',
    eimo:'icon-frown',
    project:'icon-xiangmu',
    food:'icon-meishi-',
    letfbut:'icon-zuo',
    rigthbut:'icon-you',
    nonetwork:'icon-jiance',
    ok:'icon-queren-01',
    stat:'icon-tongji',
    tongz:'icon-tongzhi',
    delet:'icon-shanchu',
    dow:'icon-daoweiye',
    menu:'icon-menu',
    huo:'icon-huo',
    shang:'icon-shang',
    shijian:'icon-shijian',
    yanjing:'icon-yanjing',
    js:'icon-web',
    frame:'icon-vue',
    mulu:'icon-mulu',
    xianshang:'icon-xiangshang3',
    xianxia:'icon-xiangxia5'
}
export default {
    data(){
        return {
            routate:''
        }
    },
props:{
    //父组件传入需要的icon类型 
    type:{
        // 数据类型检查
        type:String,
        // 是否必填
        required:true
    },
    interval:{
        type:Number,
        requried:false,
        default:0
    },
    reveresal:{
        type:Boolean,
        required:false,
        default:false
    },
    ispadding:{
        type:Boolean,
        required:false,
        default:false
    }
},
computed:{
    //根据传入的type选定图标
    IconClass(){
        let str = '';
        if(this.reveresal){
            str='reveresal'
        }else if(this.ispadding){
            str="ispadding"
        }
        return MyIcons[this.type] + ` ` + str
    },
    IconStyle(){
        return {
            marginRight:`${this.interval}px`,
             marginLeft:`${this.interval}px`,
        }
    },
},
}
</script>

<style scoped lang="less">
@import '//at.alicdn.com/t/c/font_3576814_req280fgn7.css';
.iconfont{
   display: inline-block;
   color: inherit;
   font-size: inherit;
   transition: 0.5s;
   /* ingerit 继承父级元素的样式类型*/
}
.reveresal{
    transform: rotate(90deg);

}
.ispadding{
    padding: 5px 5px;
    background-color: red;
    border-radius: 50%;
}
</style>

