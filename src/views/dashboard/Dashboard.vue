<template>
  <v-container fluid fill-height align-start ma-0 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-0">
        <vueHorizontalList class="dashboard-height" :items="items" :options="options">
          <template v-slot:default="{ item }">
            <div class="item" :key="item.id" >
                <component :is="item.dbName" class="item"/>
            </div>
          </template>
        </vueHorizontalList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import vueHorizontalList from 'vue-horizontal-list'
  import { getDashboardInfo, updateDashboardInfo } from '@/api/system/systemManage'

  export default {
    name: 'Dashboard',
    components: {
      vueHorizontalList
    },
    computed: {
    },
    data() {
      return {
        options: {
          responsive: [{
              start: 0,
              end: 2500,
              size: 1
            }, //?
            {
              end: 5000,
              size: 2
            },
            {
              end: 7500,
              size: 3
            },
            {
              //end: 1600,
              size: 4
            },
            /* {
              size: 5
            }, */
          ],
          list: {
            windowed: 1200, // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
            padding: 0 // Because: #app {padding: 80px 24px;}
          },
          position: {
            start: 0 // 시작 아이템
          },
          navigation: {
            start: 0 // 시작 아이템
          },
          autoplay: {
            play: true, // 자동 시작 여부
            repeat: true, // 반복 여부
            speed: 20000 // 속도
          }
        },
        items: [],
        supportedComponents: []
      }
    },
    created() {
      getDashboardInfo({userFlag: 'Y'}).then(res => {
          console.log("getDashboardInfo : ",res.list)
          this.items = res.list
          this.options.autoplay.speed = this.items[0].autoTime
          
          this.supportedComponents = this.items.forEach((componentName, index) => {
              componentName.id = index
              this.$options.components[componentName.dbName] = () => import("../"+componentName.dbUrl+".vue")
          })
      })
    },
    updated() {
      console.log("updated")
      let element = document.getElementsByClassName('vhl-list')[0];
      element.scrollLeft = 0
    }

  }
</script>

<style lang="scss" scoped>
  $appBarHeight: 64px;
  $appTagview: 34px;
  $paddingHeight: 8px;
  item {
    width: 100%;
    // height: 100%;
    background: #f7fafc;
    overflow: hidden;
    display: flex;
  }
  .container--fluid {
    max-width: 99%!important;
  }

  .dashboard-height {
    height: 100vh;
    max-height: calc(100vh - (#{$appBarHeight} + #{$appTagview} + (#{$paddingHeight} * 4)));
  }
</style>