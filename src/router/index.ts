import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue"
import A from '@/pages/A.vue'
import B from "@/pages/B.vue"
import C from "@/pages/C.vue"
import D from "@/pages/D.vue"
import E from "@/pages/E.vue"
import F from "@/pages/F.vue"
import Login from '@/pages/login.vue'
import Signin from '@/pages/signin.vue'
import {UserStore} from "@/stores/user"
import pinia from "@/stores/user"
const store=UserStore(pinia)
if (localStorage.getItem('token')!==null){
  store.token=localStorage.getItem("token") as string
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          name:"a",
          path:'a',
          component:A,
        },
        {
          name:"b",
          path:'b',
          component:B,
        },
        {
          name:"c",
          path:'c',
          component:C,
        },
        {
          name:"d",
          path:'d',
          component:D,
        },
        {
          name:"e",
          path:'e',
          component:E,
        },
        {
          name:"f",
          path:'f',
          component:F,
        },
        {
            path:"/home",
            redirect:"/home/a"
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/signin',
      name:'signin',
      component:Signin
    },
    {
        path:"/",
        redirect:"/login"
    },
  ]
})
router.beforeEach(async(to,from,next)=>{
  if(store.token==="0"){
    next()
  }
  else if(store.token === "1"){
    if(to.name==="signin")
    {
      next()
    }
    else if(to.name==="login")
    {
      next()
      
    }
    else{
      next({name:"login"})
    }
    
  }
  else{
    next()
  }
})
export default router
