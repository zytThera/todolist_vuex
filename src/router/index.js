import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/todo',
      component:()=>import('../views/Todo.vue')
    },
    {
      path:'*',
      redirect:'./todo'
    }
  ]
})