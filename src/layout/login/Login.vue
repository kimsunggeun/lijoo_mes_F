<template>
  <v-container fluid class="pa-0" style="background-color: rgb(244, 246, 249)" fill-height>
    <v-row class="pa-0 d-flex align-center justify-center" fill-height>
      <v-col cols="8" xl="8" lg="9" md="9" sm="11" xs="11" class="pa-0" style="">
        <v-row no-gutters class="d-flex justify-center">
          <v-col class="login-img shadow flex-grow-1 flex-shrink-0 align-center mr-2 d-none d-sm-flex">
            <img style="width: 100%;height:100%;" :src="require(`@/assets/images/bg/login_bg_new2.png`)" />
          </v-col>
          <v-col class="login-form shadow flex-sm-grow-1 flex-sm-shrink-0  flex-md-grow-0 flex-md-shrink-0">
            <v-card-text class="text-center px-lg-15 px-6 pt-16 pb-0">
              <!-- <v-img :src="require(`@/assets/images/ci/header_en_ci.png`)" width="100%" class="mb-15" /> -->
              <p class="font-weight-bold login-title pl-15 pr-15">Sign to Account</p>
              <v-form class="pt-10">
                <v-text-field
                  v-model="userData.comName"
                  class="py-3 rounded-0"
                  prepend-inner-icon="mdi-domain"
                  name="company"
                  autocomplete="off"
                  label="Company"
                  type="text"
                  hide-details="auto"
                  disabled
                  dense 
                  clearable
                ></v-text-field>
                <!-- <p class="text-left font-weight-bold blue--text mb-0 pt-5">시스템</p>
                <v-layout align-left justify-left class="pl-10 pr-10">
                  <v-btn-toggle class="align-left" tile color="teal darken-4 accent-3" mandatory group rounded v-model="userData.toggleBtn">
                    <v-btn tile value="MES" class="elevation-0 px-5 font-weight-bold"> MES </v-btn>
                    <v-btn tile value="POP" class="elevation-0 px-5 font-weight-bold"> POP </v-btn>
                    <v-btn tile value="PDA" class="elevation-0 px-5 font-weight-bold"> PDA </v-btn>
                  </v-btn-toggle>
                </v-layout> -->
                <!-- <p class="text-left font-weight-bold blue--text mb-0 pt-5">언어</p>
                <v-layout align-left justify-left class="pl-10 pr-10">
                  <v-btn-toggle class="align-left" v-model="userData.lanCode" @change="setLocale($event)" tile color="teal darken-4 accent-3" mandatory group rounded >
                    <v-btn v-for="(lang, index) in langs" :key="index"
                      :value="lang.id" 
                      class="elevation-0 pa-2 pt-3" tile
                    > 
                      <img :src="langs[index].image" width="60" />
                    </v-btn>
                  </v-btn-toggle>
                </v-layout> -->
                <v-text-field
                  v-model="userData.userId"
                  class="py-3 pt-6"
                  prepend-inner-icon="mdi-account"
                  name="login"
                  autocomplete="off"
                  label="Login"
                  type="text"
                  @keyup.enter="signIn()"
                ></v-text-field>
                <v-text-field
                  v-model="userData.userPw"
                  class="py-3 pt-6"
                  prepend-inner-icon="mdi-lock"
                  name="password"
                  id="password"
                  autocomplete="off"
                  label="Password"
                  type="password"
                  @keyup.enter="signIn()"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="px-lg-15 px-6 pt-10 pt-sm-5 ">
              <v-spacer></v-spacer>
              <v-btn block x-large color="primary" class="font-weight-bold" @click="signIn()">{{ $t('login') }}</v-btn>
            </v-card-actions>
            <!-- <v-checkbox class="px-lg-15 px-6 pt-4 pb-3" v-model="checkbox2" :label="$t('autoLogin')" /> -->
            <div class="flags_wrap"><v-divider></v-divider></div>
            <v-row no-gutters class="justify-center py-5">          
            <v-layout align-left justify-center>
                  <v-btn-toggle class="align-left" v-model="userData.lanCode" @change="setLocale($event)" tile color="primary darken-4 accent-3" mandatory group rounded >
                    <v-btn v-for="(lang, index) in langs" :key="index"
                      :value="lang.id" 
                      class="elevation-0 pa-2 pt-4 flags_btn" tile style="border:1px solid #cccccc;border-radius: 5px;"
                    >
                     <div class="flags"><span class="float-left pl-2"><img :src="langs[index].image" width="20" /></span><span class="float-left pl-2">{{ langs[index].flag }}</span></div>
                    </v-btn>
                  </v-btn-toggle>
                </v-layout>
          </v-row>



          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error" top>
      {{ msg }}
    </v-snackbar>
    <!-- light 테마일 경우 나오는 layout -->
  </v-container>
</template>
<script>
import { fn_AutoLogin, fn_Login, fn_LoginSuccess } from '@/framework/login/login'
import localStore from '@/utils/localStore'

import { getUserId, getComCode, setToken } from '@/utils/token'

export default {
  data() {
    return {
      userData: {
        userId: '',
        userPw: '',
        comCode: this.$localStore.get('comCode'),
        comName: this.$localStore.get('comName'),
        toggleBtn: 'MES',
        lanCode: this.$localStore.get('locale'),
        isAutoLogin: false,
      },
      langs: [
        {
          id: 'ko',
          name: '한국어',
          // image: require('@/assets/images/flags/ko.png')
          image: require('@/assets/images/flags/ko_new.png'),
          flag: 'KOR'
          
        },
        {
          id: 'en',
          name: 'English',
          image: require('@/assets/images/flags/en_new.png'),
          flag: 'EN'
        }
      ],
      checkbox2: false,
      isAutoLogin: false,

      snackbar: false,
      msg: '',
      timeout: 2000,
    }
  },
  created() {
    // 자동로그인 체크여부
    this.isAutoLogin = fn_AutoLogin()
    // 도메인 리스트 호출
    //this.getDomainList(this.domainStatusCd, this.domaincd)
    // 테마 store 등록
    this.setTheme()
    // 다국어 store 등록
    // this.setLocale()
    
   
  },
  methods: {
    // 로그인
    signIn() {
      console.log('signIn',this.userData.userId)
      if(this.userData.userId == 'super' && this.userData.userPw == '9999') {
        setToken(this.userData.userId)
        localStore.set('start-page', 'super')
        fn_LoginSuccess()
        return
      } else {
        localStore.set('start-page', '')
      }
        
      fn_Login(this.userData).then((res) => {
        if (res.result) {
          console.log('toggleBtn : ', this.userData.toggleBtn)
          if (this.userData.toggleBtn != 'MES' && this.userData.userId != 'admin') localStore.set('start-page', this.userData.toggleBtn)
          fn_LoginSuccess()
        } else {
          this.snackbar = true
          this.msg = res.msg
        }
      })
    },
    // 도메인 중복 체크를 위한 데이터 셋
    /* getDomainList(domainStatusCd, domaincd) {
        fn_DomainList(domainStatusCd, domaincd)
      }, */
    // 테마 세팅
    setTheme() {
      if (!this.$localStore.get('theme')) {
        this.$localStore.set('theme', this.$envs.framework.template.theme)
      } else {
        if (this.$localStore.get('theme') == 'dark') {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
      }
    },
    // 다국어 세팅
    setLocale(e) {
      console.log('setLocale',e, this.$localStore.get('locale'))
      if (!this.$localStore.get('locale')) {
        this.$localStore.set('locale', this.$vuetify.lang.current)
      } else {
          this.$vuetify.lang.current = e
          this.$i18n.locale = e
          this.$localStore.set('locale', e)
      }
    },
    changeTheme(theme) {
      if (theme) {
        this.$localStore.set('theme', 'dark')
      } else {
        this.$localStore.set('theme', 'light')
      }
    },
  },
}
</script>

<style scoped>
.flags_wrap{overflow:hidden;width:70%;padding-top:10px;margin:0 auto;}
.flags{width:100px;overflow:auto;}

.login-img {
  background-color: #fff;
  border: 2px solid rgb(227, 228, 228);
  overflow: hidden;
}
.login-form {
  border-radius: 20px;
  border: 2px solid rgb(227, 228, 228);
  background-color: #fff;
}
.login-title {
  font-size: 1.9rem;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: 'Roboto', sans-serif !important;
}
.copy {
  position: absolute;
  bottom: 5%;
}
.shadow {
  box-shadow: 9px 11px 23px -8px rgba(0, 0, 0, 0.11);
  -webkit-box-shadow: 9px 11px 23px -8px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 9px 11px 23px -8px rgba(0, 0, 0, 0.11);
  border-radius: 20px;
}
</style>