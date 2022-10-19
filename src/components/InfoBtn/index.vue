<template>
  <div class="infoBtn">
    <ul  v-if="isShow">
        <li v-for="item in infoArr" :key="item.type"  @click="scrollTop(item.type)" >
            <Icon :type="item.type" :class="{'rotate':item.type === 'xianxia' && isRoutet }"/>
            <div class="info-artcle show" v-if="item.title">
            <img   v-if="item.imgSrc" :src="item.imgSrc" :alt="item.title">
            <div v-else class="artcle-text">{{item.title}}</div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import {Throttle} from '@/utls/index'
export default {
    data(){
        return {
            infoArr:[
                {type:'wachat',imgSrc:'/img/portait.7e7ccab7.jpg',title:'微信'},
                {type:'qq',imgSrc:'/img/portait.7e7ccab7.jpg',title:'QQ'},
                {type:'github',imgSrc:'/img/portait.7e7ccab7.jpg',title:'GitHunb'},
                {type:'phone',title:"123456789"},
                {type:'xianxia'},
            ],
            isShow:false,
            isRoutet:false,
            contentDom:null,
        }
    },
    created(){
        let ThrottleFun = Throttle((dom)=>{
        this.contentDom = dom
         this.isShow=  dom.scrollTop > dom.getBoundingClientRect().height * .5 ;
         this.isRoutet = dom.scrollTop > dom.getBoundingClientRect().height *1.1 ;
         })
        this.$bus.$on('mainScroll',ThrottleFun)
    },
    methods:{
        scrollTop(type){
            if(type === 'xianxia'){
            if(this.isRoutet){
                this.$bus.$emit('setMainscroll',0 - this.contentDom.scrollTop)
            }else{
                this.$bus.$emit('setMainscroll',this.contentDom.scrollHeight - this.contentDom.scrollTop)
            }
            }
        }
    },
components:{
    Icon
}
}
</script>

<style lang="less" scoped>
.infoBtn{
    ul{
        li{
            background-color: #c5c5cc;
            font-size: 24px;
            padding: 5px;
            border-radius: 50%;
            margin: 2px;
            display: flex;
            justify-content: space-between;
            position: relative;
            &:hover{
                cursor: pointer;
                .info-artcle{
                    transform: scale(1);
                }
            }
            .rotate{
                transform: rotate(180deg);
            }
        .info-artcle{
            width: 100px;
            height: 100px;
            position: absolute;
            text-align: center;
            display: flex;
            align-items: center;
            top: -25px;
            background-color: #000;
            transform-origin: center center;
            transform: scale(0);
            transition: all  0.5s;
            left: -105px;
            border-radius: 5px;
            font-size: 12px;
            img{
                margin: 0 auto;
                width: 90%;
                height: 90%;
                border-radius: inherit;
                object-fit: cover;
            }
            &::after{
                z-index: -99;
                display: block;
                 width: 10px;
                height: 10px;
                transform: rotate(45deg) ;
                position: absolute;
                right: -2px;
                top: 38px;
                content:' ';
                background-color: #000;
            }
        }
        }
    }
}
</style>