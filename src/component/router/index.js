/*
* @Author: zengxianlin
* @Date:   2016-11-28 09:24:11
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-13 23:31:36
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const route = new VueRouter({
  routes: [{
    path: '/home', component: require('../home')
  }, {
    path: '/classify', component: require('../classify'),children:[]
  }, {
    path: '/my', component: require('../my')
  }, {
     path: '/search', component: require('../search')
   },{
    path: '/detail/:proId',name:"detail" ,component: require('../detail')
  },{
    path: '/categoryList/:pclassId',name:'categoryList', component: require('../categoryList')
  },
  {
    path: '*', redirect: '/home'
  }]
})
export default route