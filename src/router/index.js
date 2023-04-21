import Vue from 'vue'
import VueRouter from 'vue-router'
import envs from '@/envs'

import Layout from '@/layout/layout.vue'
import Login from '@/layout/login/Login.vue'
import Logout from '@/layout/login/Logout'

import pageNotFound from '@/components/common/error/404'

import { getToken, getUserId, getComCode } from '@/utils/token'
import localStore from '@/utils/localStore'
import { getDateFormat } from '@/utils/common.js'
import { saveMenuStatistics } from '@/api/system/menuStatisticsManage'

import dashboard from './modules/dashboard' //대시보드
import pdaDashboard from './modules/pdaDashboard' //PDA대시보드
// import help from './modules/help' //환경설정>도움말
//import layoutSample from './modules/help/layoutSample' //환경설정>도움말>레이아웃샘플
//import uiExample from './modules/help/uiExample' //환경설정>도움말>UI예제

//import system from './modules/system' //시스템관리

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/pageNotFound',
      component: pageNotFound,
    },
    {
      path: '/',
      redirect: '/pageNotFound',
      component: Layout,
      children: [
        dashboard,
        pdaDashboard
        // help,
        /*layoutSample,
        uiExample*/
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

router.beforeEach(function (to, from, next) {
  console.log('router to : ',to)
  localStore.set('moduleCode', to.meta.nemu_code)
  // localStore.set('menuCode', to.meta.menu_id)

  

  // if (!to.matched.length) {
  //   //next('/pageNotFound');
  //   let startPage = localStore.get('start-page')
  //   startPage == 'PDA' ? next('/pdaDashboard') : next('/dashboard')
  //   // next('/dashboard')
  // } else {
    let loginWhiteList = [...envs.framework.whiteList]
    // 세션 적용 되면 이곳 로직 변경
    if (
      !loginWhiteList.some(path => {
        return path === to.path
      })
    ) {
      if (to.query.id) {
        console.log('단독 페이지호출시 next(/login)되던것을 막음')
      } else {
        if (!getToken() && to.path !== '/login') {
          next('/login')
          return
        } else {
          if (!getToken() && to.path !== '/blank' && to.path !== '/not-found') {
            next('/blank')
            return
          // }
        }
      }
    }

    if(to.name != 'logout' && to.name != 'login' && to.name != 'dashboard' && to.name != 'pdaDashboard' && to.name != undefined) {
      const params = {
        comCode : getComCode(),
        userId : getUserId(),
        moduleCode : to.meta.nemu_code,
        menuCode: to.meta.menu_id,
        cnntDate: getDateFormat(new Date()),
      }
      console.log('saveMenuStatistics',params)
      saveMenuStatistics(params)
    }

    next()
  }
})

//네비게이션 가드(전역 가드) : 사용자의 인증 정보가 없으면 특정 페이지에 접근하지 못하게 할 때 사용하는 기술입니다.
//router.beforeEach( function (to, from, next) {
//to : 이동할 url
//from : 현재 url
//next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수

//to: 이동할 url에 해당하는 라우팅 객체
//console.log("routing 1 : '" + to.path + "'" );
//console.log("routing 2 : '" + from.path + "'" );

//store.dispatch('SetHeaderUse', to.meta.headerView !== false)

// if (to.matched.some(function (routeInfo)
// {
//   console.log("routeInfo.meta.authRequired: " + routeInfo.meta.authRequired)
//     return routeInfo.meta.authRequired;
// })) {
//     next('/login')
//     return

// } else {
//     console.log("routing success : '" + to.path + "'" )
//     next();
//     return
// }

//})

export default router
