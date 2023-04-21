import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import envs from '@/envs'
import _ from 'lodash'
import Cookies from 'js-cookie'
import localStore from '@/utils/localStore'
import Layout from '@/layout/layout.vue'

import { setComCode, getComCode } from '@/utils/token'
import { getRouterMenu } from '@/api/system/menuManage' // 메뉴 api 호출

// vuescroll 추가
// import vuescroll from 'vue-scroll'
import './assets/icons' // icon
import svgicon from '@/components/svgicon' // svg component
import * as xlsx from 'xlsx'
// Splitpanes
// import 'splitpanes/dist/splitpanes.css'

// 전체 화면 사용시 레이아웃 감추는 여부 설정
//store.dispatch('SetLayoutHideMode', target.layoutHideMode ? target.layoutHideMode : false)

//toastify
//import VueToastify from 'vue-toastify'

//vueToastify
/* Vue.use(VueToastify, {
  position: 'center-center',
  canTimeout: false,
  theme: 'light',
  iconEnabled: true,
  withBackdrop: true
}) */

// vueDaumPostcode
import VueDaumPostcode from 'vue-daum-postcode'
Vue.use(VueDaumPostcode, { scriptUrl: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" })

// draggable
import { Draggable } from 'draggable-vue-directive' 

Vue.use({
  install(Vue, options) {
    Vue.directive('draggable', Draggable)
  }
})
Vue.use(VueDaumPostcode)

//Devextreme
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import 'devexpress-diagram/dist/dx-diagram.css'

//Devextreme Grid default setting
import '@/components/options/dxEnvs.js'

// Devextreme 언어 설정
import { locale } from 'devextreme/localization'

// vuetify theme loading
import vuetify from '@/plugins/vuetify'
// import '@/plugins/firebase'
// echart 라이브러리 및 테마 로딩
import '@/assets/theme/echart/index.js'

Vue.config.productionTip = false

Vue.component('svg-icon', svgicon) // register globally

// 전역 설정
Vue.prototype.$envs = envs
Vue.prototype.$Cookies = Cookies
Vue.prototype.$_ = _
Vue.prototype.$localStore = localStore
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$xlsx = xlsx

// i18n
import VueI18n from 'vue-i18n'
import messages from '@/i18n/custom'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'ko', // set locale
    fallbackLocale: 'en',
    messages,     // set locale messages
})

let DynamicRouteInfo = [] //20220323 BY LYJ [동적 라우팅 처리]
// let list = []
// import dashboard from './router/modules/dashboard' //대시보드

let vm = new Vue({
  router,
  store,
  vuetify,
  i18n,
  methods: {
    async getDynamicRoutes(list) {
      // getProgramData('')
      //모든 메뉴를 라우팅 구성
      // await getRouterMenu({comCode: getComCode()})
        // .then(response => {
          // DynamicRouteInfo.push(dashboard)
          // console.log('getDynamicRoutes list',list)
          _.cloneDeep(list).forEach(route => {
            
            //if(route.paCode != null && route.pgCode != null)
              this.createAndAppendRoute(route)
          })

          //init route
          let newRoute = {
            path: '/',
            redirect: '/pageNotFound',
            component: Layout,
            children: DynamicRouteInfo
          }

          this.$router.addRoutes([newRoute])

          
        // })
        // .catch(error => {
        //   console.log(error)
        // })
        // .finally(() => {})
    },
    createAndAppendRoute: route => {
      //if (route.name == 'dashboard') {
      let newRoute = {
        path: `/${route.menuCode}`,
        name: `${route.menuCode} + ${route.menuName}`,
        //component: () => import('@/views/dashboard/Dashboard.vue'),
        // component: () => import('../../frontend/src/views/dashboard/Dashboard.vue'),
        //component: () => import(`@/views${route.path}/${route.component}.vue`),
        component: () => import(`@/views/${route.moduleCode}/${route.paCode}/${route.pgCode}.vue`),
        // meta: { proc_cd: `${route.progCd}`, title: `${route.progNm}`, affix: `${route.affix}` == 'Y' ? true : false, svcType: route.svcType },
        meta: { nemu_code: `${route.moduleCode}`, menu_id: `${route.menuCode}`, title: `${route.menuName}`, affix: false },
        // params: { proc_cd: `${route.progCd}`, title: `${route.progNm}`, affix: `${route.affix}` == 'Y' ? true : false }
        // query: route.name == 'dashboard' ? { tMenu: '1000', lvl: 0 } : undefined
      }
      DynamicRouteInfo.push(newRoute)
      //this.$router.addRoutes([newRoute])
      // }
    }
  },
  beforeCreate() {
    localStore.set('comCode', 'COM0001')
    localStore.set('comName', '(주)일주지앤에스')
    setComCode('COM0001')
    
    // localStore.set('comCode', 'COM0002')
    // localStore.set('comName', '티허브')
    // setComCode('COM0002')

    getRouterMenu({comCode: this.$localStore.get('comCode')})
        .then(response => {
          // list = response.list
          // console.log('beforeCreate list',response)
          this.getDynamicRoutes(response.list)
    })
  },
  created() {
    // Devextreme 언어 설정(for 캘린더)
    locale(this.$i18n.locale)
  },
  render: h => h(App)
}).$mount('#app')
