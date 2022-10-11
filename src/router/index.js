import Vue from 'vue'
import VueRouter from 'vue-router'
import Bloglist from '@/views/content/blogList'
import {start,done,configure} from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    name: "bloglist",
    path: "/bloglist/:blogtype/:categoryId",
    component:()=>import(/* webpackChunkName:"bloglist"*/'@/views/content/blogList'),
    meta: {
      keepAlive: true,
    }
  },
  {
    name:"blogarticl",
    path:"/actrcle/:blogtype/:id",
    component:()=>import(/* webpackChunkName:"blogArticele"*/'@/views/content/blogArticle'),
    meta: {
      keepAlive: true,
    }
  }

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from,next) => {
  
  if(to.path === '/'){
    next({name:'bloglist',params:{
      blogtype:'web',
      categoryId:-1
    }})
  }
  next()
})
export default router
