import Vue from 'vue'
import Router from 'vue-router'
import login from '@/commons/publics/login'
import menus from '@/components/menus.vue'
import index from '@/components/menus/index'
import card from '@/components/menus/card'
import mine from '@/components/menus/mine'
import share from '@/components/menus/share'
import wallet from '@/components/menus/mine/wallet/wallet'
import tixian from '@/components/menus/mine/wallet/tixian'
import code from '@/components/menus/share/code'
import message from '@/components/menus/share/message'
import security from '@/components/menus/mine/security'
import addGesture from '@/components/menus/mine/addGesture'
import backGesture from '@/components/menus/mine/backGesture'
import editGesture from '@/components/menus/mine/editGesture'
import realName from '@/components/menus/mine/realName'
import assets from '@/components/menus/mine/assets'
import abouUs from '@/components/menus/mine/abouUs'
import commonProblem from '@/components/menus/mine/commonProblem'
import activationCode from '@/components/menus/mine/activationCode'
import cardSubmitPlan from '@/components/menus/card/cardSubmitPlan'
import cardPreview from '@/components/menus/card/cardPreview'
import cardPlan from '@/components/menus/card/cardPlan'
import cardEstablishComplete from '@/components/menus/card/cardEstablishComplete'
import cardConfirmPayment from '@/components/menus/card/cardConfirmPayment'
import cardAddPlan from '@/components/menus/card/cardAddPlan'
import cardAdd from '@/components/menus/card/cardAdd'
import cardEditCard from '@/components/menus/card/cardEditCard'
import tatalAssets from '@/components/menus/mine/wallet/tatalAssets'
import oneShare from '@/components/menus/mine/wallet/oneShare'
import twoShare from '@/components/menus/mine/wallet/twoShare'
import tixianjilu from '@/components/menus/mine/wallet/tixianjilu'


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
        {
          path: '/share',
          name: 'share',
          component: share
        },

      ]
    }, {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '/code',
      name: 'code',
      component: code
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: tixian
    },
    {
      path: '/tatalAssets',
      name: 'tatalAssets',
      component: tatalAssets
    },
    {
      path: '/security/:isBindGesturePassword',
      name: 'security',
      component: security,
      props: true
    },
    {
      path: '/abouUs',
      name: 'abouUs',
      component: abouUs
    },
    {
      path: '/addGesture',
      name: 'addGesture',
      component: addGesture
    },
    {
      path: '/backGesture',
      name: 'backGesture',
      component: backGesture
    },
    {
      path: '/editGesture',
      name: 'editGesture',
      component: editGesture
    },
    {
      path: '/oneShare',
      name: 'oneShare',
      component: oneShare
    },
    {
      path: '/twoShare',
      name: 'twoShare',
      component: twoShare
    },
    {
      path: '/assets',
      name: 'assets',
      component: assets
    },
    {
      path: '/tixianjilu',
      name: 'tixianjilu',
      component: tixianjilu
    },
    {
      path: '/realName',
      name: 'realName',
      component: realName
    },{
      path: '/cardSubmitPlan',
      component: cardSubmitPlan
    },{
      path: '/cardPlan',
      component: cardPlan
    },{
      path: '/cardEstablishComplete',
      component: cardEstablishComplete
    },{
      path: '/cardConfirmPayment',
      component: cardConfirmPayment
    },{
      path: '/cardAddPlan',
      component: cardAddPlan
    },{
      path: '/cardAdd',
      component: cardAdd
     },{
      path: '/message',
      component: message
     },{
      path: '/cardEditCard',
      component: cardEditCard
     }
     ,{
      path: '/activationCode',
      component: activationCode
     },{
      path: '/commonProblem',
      component: commonProblem
     }
  ]
})
