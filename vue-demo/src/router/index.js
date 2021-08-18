import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import a from '@/components/a'
import b from '@/components/b'
import c from '@/components/c'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/a',
      name: 'a',
      component: a
    },{
      path: '/b',
      name: 'b',
      component: b
    },{
      path: '/c',
      name: 'c',
      component: c
    }
  ]
})
