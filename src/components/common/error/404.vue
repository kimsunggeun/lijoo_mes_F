<template>
  <v-app>
    <v-container fluid fill-height class="container_bg">
      <v-layout align-center justify-center>
        <v-card outlined width="382" color="card_bg" class="card-radis">
          <!-- 사이트 로고 -->
          <v-card-title class="app_bar_bg">
          <!-- <v-img :src="require(`@/assets/images/ci/iwelding_logo_w.png`)" contain height="25px"></v-img> -->
          </v-card-title>
          <v-divider/>
          <!-- 에러 이미지 -->
          <v-img :src="require(`@/assets/images/error/404error2.png`)" contain height="130px" class="ma-5"></v-img>
          <!-- 메인 에러 메시지 -->
          <v-card-title class="sub_title--text">
            <b>{{ $t('errorTitle') }}</b>
          </v-card-title>
          <!-- 서브 에러 메시지 -->
          <v-card-subtitle class="sub_title--text">
            <b>{{ $t('errorSubTitle') }}</b>
          </v-card-subtitle>
          <v-divider/>
          <!-- 버튼 -->
          <v-card-actions>
            <v-btn text color="warning" class="pl-3 pr-3" @click="goMain()"><b>{{ $t('back') }}</b></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <!-- 상세내용 구역 -->
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text class="sub_title--text">
                <v-row class="ma-0">
                  {{ $t('errorMsg1') }}
                </v-row>
                <v-row class="ma-0">
                  {{ $t('errorMsg2') }}
                </v-row>
                <v-row class="ma-0">
                  {{ $t('errorMsg3') }}
                </v-row>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'pageNotFound',
  data: () => ({
    show: false,
  }),
  created() {
    // 테마 store 등록
    this.setTheme()
    // 다국어 store 등록
    this.setLocale()
  },
  methods: {
    back() {
      this.$router.go(-2)
    },
    goMain() {
      this.$router.push('/dashboard')
    },
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
    setLocale() {
      if (!this.$localStore.get('locale')) {
        this.$localStore.set('locale', this.$vuetify.lang.current)
      } else {
        if (this.$localStore.get('locale') == 'ko') {
          this.$vuetify.lang.current = 'ko'
          this.$i18n.locale = 'ko'
        } else {
          this.$vuetify.lang.current = 'en'
          this.$i18n.locale = 'en'
        }
      }
    },
  }
}
</script>

<style scoped>
.card-radis{
  border-radius: 4px !important;
}
</style>
