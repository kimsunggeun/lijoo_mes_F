<template>
  <v-app class="responsive" id="layout">
    <div v-if="layoutType != 'PDA'">
      <!-- topbar -->
      <v-app-bar 
        app 
        clipped-left
        fixed
        elevation="2"
        color="app_bar_bg"
        v-if="!isPop"
        id="layoutAppBar">
        <v-app-bar-nav-icon @click="isDrawer" color="app_bar_title" />
        <!-- <div class="mr-5" v-if="$vuetify.theme.dark">
          <v-img :src="require(`@/assets/images/ci/iwelding_logo.png`)" width="130" contain to="#" @click="goHome()"
            style="cursor: pointer" />
        </div>-->
        <v-img
          :src="require(`@/assets/images/ci/header_ko_ci.png`)"
          max-width="130"
          height="50px"
          contain
          to="#"
          @click="goHome()"
          class="mr-19"
          style="cursor: pointer"
        />

        <!-- menu -->
        <v-toolbar-items >
          <!-- class="hidden-sm-and-down" -->
          <template>
            <!-- <div v-if="item.items" :key="item.icon">
              <v-menu offset-y>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn tile class="elevation-0 px-5 font-weight-bold" height="100%" v-bind="attrs" v-on="on"
                    color="transparent app_bar_title--text" active-class="primary lighten-1">
                    <v-icon v-if="item.icon" class="mr-2">
                      {{ item.icon }}
                    </v-icon>
                    {{ $t(item.title) }}
                  </v-btn>
                </template>
                <v-list color="menu_bg">
                  <v-list-item v-for="sub_item in item.items" :key="sub_item.icon" :to="sub_item.to"
                    active-class="primary lighten-1">
                    <v-list-item-title class="menu_title--text">{{ $t(sub_item.title) }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>-->
            <!-- <div v-else :key="item.icon"> -->
            <v-sheet
              class="mx-auto app_bar_bg"
              :max-width="windowWidth - 390"
            >
              <v-slide-group
                v-model="model"
                active-class="transparent-50"
                class="fill-height"
                show-arrows
              >
                <v-slide-item
                  v-for="(item, i) in menuData" :key="i"
                  v-slot:default="{ active }"
                >
                  <v-card 
                    :color="active ? undefined : 'transparent app_bar_title--text'"
                  >
                    <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                    >
                      <v-scale-transition>
                        <v-btn v-if="item"
                          tile
                          :key="i"
                          @click="menuClick(item.menuCode)"
                          :value="item.menuCode"
                          class="elevation-0 px-5 py-5 font-weight-bold"
                          height="100%"
                          color="transparent app_bar_title--text"
                          active-class
                        >
                          <v-icon v-if="item.icon" class="mr-2">${{ item.icon }}</v-icon>
                          {{ item.menuName }}
                        </v-btn>
                      </v-scale-transition>
                    </v-row>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
            <!-- <v-btn-toggle v-model="toggleBtn" class="filters-group" @change="fnChangeBtn">
              <div v-for="(item) in menuData" :key="item.sortFlag">
                <v-btn
                  tile
                  :key="item.sortFlag"
                  @click="menuClick(item.menuCode)"
                  :value="item.menuCode"
                  class="elevation-0 px-5 font-weight-bold"
                  height="100%"
                  color="transparent app_bar_title--text"
                  active-class
                >
                  <v-icon v-if="item.icon" class="mr-2">${{ item.icon }}</v-icon>
                  {{ item.menuName }}
                </v-btn>
              </div>
            </v-btn-toggle> -->
          </template>
        </v-toolbar-items>
        <v-spacer />
        <v-icon color="app_bar_title" class="pa-2" @click="changeFullscreen">$fullscreen</v-icon>
        <!-- i18n -->
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text color="menu_title" class="pa-2">
              <img :src="activeLang.image" width="20" />
            </v-btn>
          </template>
          <v-list dense color="menu_bg">
            <v-list-item
              v-for="(lang, index) in langs"
              :key="index"
              @click="langClick(lang)"
              color="menu_title"
            >
              <v-list-item-title>
                <img :src="lang.image" width="20" />
                {{ lang.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <!-- <v-switch v-model="$vuetify.theme.dark" class="ml-3" @change="changeTheme($vuetify.theme.dark)">
        </v-switch> -->

        <div class="text-right">
          <v-menu offset-y min-width="160">
            <template v-slot:activator="{ on }">
              <v-btn icon large v-on="on">
                <v-icon color="app_bar_title">$person</v-icon>
              </v-btn>
            </template>
            <v-list class="text-center" id="my-info" color="login_pop_bg login_pop_text--text">
              <v-avatar color="secondary darken-2" class="mb-2 mt-4">
                <img v-if="image != ''" :src="image"/>
                <!-- <span v-else class="menu_title--text text-h5">{{ user.initials }}</span> -->
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">{{ user.email }}</p>
              <!-- <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text class="px-3">
                <v-badge :content="mailCount" color="error" overlap height="100%">
                  <v-icon color="menu_title">$mail</v-icon>
                </v-badge>
              </v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text class="px-3" color="menu_title" to='/myPage'>
                나의정보
              </v-btn>-->
              <v-divider></v-divider>
              <div class="bg_W">
              <v-btn depressed text class="login_pop_btn py-6 text-left pl-2" color="login_pop_text" @click="changePw()"><v-icon>$change_pw</v-icon>  {{$t('pwChange')}}
              </v-btn>
            </div>
              <v-divider></v-divider>
              <div class="bg_W">
              <v-btn depressed text class="login_pop_btn py-6 text-left pl-2" color="login_pop_text" @click="logout()"><v-icon>$logout</v-icon>  {{$t('logout')}}</v-btn>
            </div>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>

      <!-- navbar -->
      <v-navigation-drawer
        v-bind="$attrs"
        app
        clipped
        floating
        class="elevation-8"
        v-model="drawer"
        color="nav_bg"
        mobile-breakpoint=0
      >
        <v-list dense nav expand>
          <template v-for="(item, index) in menuTreeData">
            <default-list-group v-if="item.children" :key="`group-${index}`" :item="item" />
            <default-list-item
              v-else
              :key="`item-${index}`"
              :item="item"
              style="background-color: #F2F6F1"
            />
          </template>
        </v-list>
      </v-navigation-drawer>

      <!-- theme Generater -->
      <!-- <v-layout hidden-md-and-down>
        <v-btn fab small color="primary" app fixed right bottom @click.stop="drawerTheme = !drawerTheme">
          <v-icon>$setting</v-icon>
        </v-btn>
        <v-navigation-drawer width="600" app right floating temporary overlay-opacity="0" v-model="drawerTheme"
          color="nav_bg">
          <theme-generator />
        </v-navigation-drawer>
      </v-layout>-->

      <!-- mainview -->
      <v-main
        class="fill-height container_bg content--text"
        id="mainContent"
      > <!-- :class="drawer?'line-draw':'line-draw2'" -->
        <!--태그 뷰 v-if="needTagsView" -->
        <tags-view v-if="!isScreenFull && !isPop"/>
        <router-view />
        <VueToastify :notifyAction="notifyAction"></VueToastify>
      </v-main>

      <pwPopup ref="pwPopup"/>
    </div>
    <div v-else class="text-center">
        <v-menu offset-y min-width="160">
          <template v-slot:activator="{ on }">
            <v-btn icon large v-on="on">
              <v-icon color="primary">$person</v-icon>
            </v-btn>
          </template>
          <v-list class="text-center" id="my-info" color="login_pop_text--text">
            <v-avatar color="secondary darken-2" class="mb-2">
              <img v-if="image != ''" :src="image"/>
              <!-- <span v-else class="menu_title--text text-h5">{{ user.initials }}</span> -->
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">{{ user.email }}</p>
            <v-divider></v-divider>
            <div class="text-left bg_W">
            <v-btn depressed text class="login_pop_btn py-6" color="login_pop_text" @click="changePw()">
              <!-- <v-icon>$info</v-icon> -->
              비밀번호 변경
            </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="text-left bg_W">
            <v-btn depressed text class="login_pop_btn py-6" color="login_pop_text" @click="logout()"><v-icon>$logout</v-icon>로그아웃</v-btn>
            </div>
          </v-list>
        </v-menu>
        <router-view />
        <VueToastify :notifyAction="notifyAction"></VueToastify>
    </div>   
  </v-app>
</template>

<script>
import ResizeMixin from '@/layout/mixin/ResizeHandler'
import { mapState } from 'vuex'

import { fn_Logout } from '@/framework/login/login'
import DefaultListItem from '@/layout/navbar/ListItem' // 단일 메뉴
import DefaultListGroup from '@/layout/navbar/ListGroup' // 그룹 메뉴
//import ThemeGenerator from '@/layout/ThemeGenerator.vue' // 테마
import TagsView from '@/layout/tagview'
import VueToastify from '@/components/toastify/VueToastify.vue'
import pwPopup from '@/components/common/popups/passwordPopup'

import { isMobile } from '@/utils/check'
import { getUserId, getComCode, getUserImage } from '@/utils/token'
import localStore from '@/utils/localStore'
import { thistle } from 'color-name'

export default {
  name: 'DefaultLayout',
  components: {
    DefaultListItem,
    DefaultListGroup,
    //ThemeGenerator,
    TagsView,
    VueToastify,
    pwPopup
  },
  mixins: [ResizeMixin],
  data: () => ({
    // i18n
    languageMenu: true,
    activeLang: '',
    langs: [
      {
        id: 'ko',
        name: '한국어',
        image: require('@/assets/images/flags/ko.png')
      },
      {
        id: 'en',
        name: 'English',
        image: require('@/assets/images/flags/en.png')
      }
    ],
    // main
    drawer: true,
    drawerTheme: false,
    model: 1,
    toggle: '',
    menuBtn: '',
    // app-bar
    dialog: false,
    user: {
      initials: 'i-gns',
      fullName: getUserId(),
      email: ''
    },
    userInfo: {
      comCode: getComCode(),
      userId: getUserId(),
      lanCode: localStore.get('locale')
    },
    isPop: false,
    layoutType: '',
    windowWidth: 0,
    // mailCount: 124
  }),
  created() {
    this.setLocale()
    this.layoutType = localStore.get('start-page')
    // console.log('layoutType',this.layoutType)
    this.$EventBus.$on('App_Bar_MenuClick', e => {
      this.menuClick(e)
    })
    if(isMobile())
      this.$store.dispatch('app/setIsScreenFull', false)
    
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => false, //state.settings.fixedHeader
      isScreenFull: state => state.app.isScreenFull
    }),
    // isPop() {
    //     return localStore.get('moduleCode') == '30' ? true : false
    // },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    menuData() {
      return this.$store.state.menu.menus
    },
    menuTreeData() {
      return this.$store.state.menu.subTreeMenus
    },
    image() {
      if(getUserImage()) {
        // console.log('image', getUserImage())
        let binaryString = window.atob(getUserImage())
        let binaryLen = binaryString.length
        let bytes = new Uint8Array(binaryLen)
        for (let a = 0; a < binaryLen; a++) {
            let ascii = binaryString.charCodeAt(a)
            bytes[a] = ascii
        }
        let blob = new Blob([bytes], {
            type: 'application/octet-stream'
        })
        return URL.createObjectURL(blob)
      }
      
      return null
    },
  },
  methods: {
    // 기존 ESG 소스 ('로딩중..' 표시 기능)
    notifyAction(notifyInfo, action) {
      // console.log('notifyAction',notifyInfo)
      // console.log('notifyAction',action)
      // console.log('notifyAction',this.$route.meta.menu_id)
      this.$EventBus.$emit(`${this.$route.meta.menu_id}_notifyAction`, { notifyInfo: notifyInfo, action: action })
    },
    isDrawer() {
      this.drawer = !this.drawer
    },
    changePw() {
      this.$refs.pwPopup.open()
    },
    changeFullscreen() {
      if(localStore.get('moduleCode') == '30')
        this.drawer = false
        
      const documentElement = document.documentElement
      // console.log('element',documentElement)
      if (documentElement.requestFullscreen) documentElement.requestFullscreen()
      else if (documentElement.webkitRequestFullscreen) documentElement.webkitRequestFullscreen()
      else if (documentElement.mozRequestFullScreen) documentElement.mozRequestFullScreen()
      else if (documentElement.msRequestFullscreen) documentElement.msRequestFullscreen()
      

    },
    // 윈도우의 가로 크기를 담을 변수
    handleResize(e) {
      this.isPop = localStore.get('moduleCode') == '30' ? true : false  //POP 가 아니면 상단 메뉴 숨기지 않음.

      if(localStore.get('moduleCode') == '30' && this.isPop == true && window.innerHeight != screen.height)
        this.isPop = false  //POP 메뉴에 스크린풀 헤제시 상단메뉴 표시.
      
      this.windowWidth = window.innerWidth;
      // console.log('handleResize isMobile',isMobile())
      //console.log('handleResize window', window.innerHeight)
      //console.log('handleResize screen', screen.height)
      //풀스크린 여부
      this.$store.dispatch('app/setIsScreenFull', window.innerHeight == screen.height)
    },
    menuClick(menuCode) {
      
      if(!menuCode)
        menuCode = this.menuCode
      else
        this.menuCode = menuCode

      console.log('menuClick', menuCode)
      
      if(menuCode == '30')
        this.model = menuCode - 19
      else if(menuCode == '40')
        this.model = menuCode - 28
      else
        this.model = menuCode - 10
        
      this.drawer = true
      this.$store.dispatch('app/openSideBar', true)
      
      //console.log('menuClick toggleBtn : ',this.toggleBtn)
      if (menuCode != '' && menuCode != 'dashboard') {
        
        let clickMenuTreeData = []
        this.$store.state.menu.treeMenus.find(element => {
          if (element.moduleCode == menuCode) {
            clickMenuTreeData.push(element)
          }
        })
        this.$store.dispatch('GetSubMenus', clickMenuTreeData)
      }
    },
    setLocale() {
      if (this.$localStore.get('locale') == 'ko') {
        this.activeLang = this.$envs.framework.supportLocales.ko
        this.$vuetify.lang.current = 'ko'
        this.$i18n.locale = 'ko'
      } else {
        this.activeLang = this.$envs.framework.supportLocales.en
        this.$vuetify.lang.current = 'en'
        this.$i18n.locale = 'en'
      }
      this.userInfo.menuCode = this.menuCode
      this.$store.dispatch('GetMenus', this.userInfo)
      // this.$EventBus.$emit('lanCode', this.$localStore.get('locale'))
    },
    // langClick(lang) {
    //   this.activeLang = lang
    //   this.userInfo.lanCode = lang.id
    //   this.userInfo.menuCode = this.menuCode

    //   // this.$store.dispatch('GetMenus', this.userInfo)
    //   if (lang.id == 'ko') {
    //     this.$localStore.set('locale', 'ko')
    //     this.$vuetify.lang.current = 'ko'
    //     this.$i18n.locale = 'ko'
    //   } else {
    //     this.$localStore.set('locale', 'en')
    //     this.$vuetify.lang.current = 'en'
    //     this.$i18n.locale = 'en'
    //   }
    //   this.$EventBus.$emit('lanCode', lang.id)
    // },
    // 로그아웃
    logout() {
      fn_Logout()
    },
    changeTheme(theme) {
      if (theme) {
        this.$localStore.set('theme', 'dark')
      } else {
        this.$localStore.set('theme', 'light')
      }
    },
    goHome() {
      this.$router.push('/dashboard')
    },
    isVisibleLayout(layout) {
      return this.$store.state.menu.flag[layout] || !this.$store.state.menu.flag.isLayoutHideMode
    }
  }
}
</script>
<style lang="scss" scoped>
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) {
  background: #455b59;
  color: rgba(0, 0, 0, 0.87);
}
::v-deep .v-list-group__header {
  background: #e5ebf9 !important;
  padding-left: 10px !important;
}
.v-list {padding: 0px 0;}

.bg_W{background:#ffffff;}
.login_pop_btn{width:100%;}
</style>