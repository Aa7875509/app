import Vue from 'vue'
import Router from 'vue-router'
import login from '@/commons/publics/login'
import menus from '@/components/menus.vue'
import card from '@/components/menus/index'
import index from '@/components/menus/card'
import mine from '@/components/menus/mine'
import adddialog from '@/components/menus/adddialog'
import editdialog from '@/components/menus/editdialog'
import register from '@/components/menus/register'




Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/menus',
      redirect: '/index',
      component: menus,
      children: [{
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/card',
          name: 'card',
          component: card
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine,

        },
        // {
        //   path: '/share',
        //   name: 'share',
        //   component: share
        // },
      ]
    },{
      path: '/adddialog',
      name: 'adddialog',
      component: adddialog
    },{
      path: '/editdialog',
      name: 'editdialog',
      component: editdialog
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]
})
