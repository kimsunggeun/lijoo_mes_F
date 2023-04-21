<template>
    <v-container fluid align-start ma-0 pa-2 class="container-height">
      <v-expansion-panels v-model="model" focusable>
        <v-expansion-panel
          v-for="(panel,i) in panels"
          :key="i"
        >
          <v-expansion-panel-header>{{panel.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-if="panel.type=='1'">
              <v-tabs v-model="tab">
                <v-tab
                  v-for="item in items"
                  :key="item.type"
                >
                  {{ item.title }}
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items"
                  :key="item.type">
                  <!-- {{ item.type }} -->
                  <sys0030Print :repType="item.type" />
                </v-tab-item>
              </v-tabs-items>
            </div>
            <div v-if="panel.type=='2'">
              <sys0030Constraint/>
            </div>
            <!-- <div v-if="panel.type=='3'">
              <sys0030Overflow/>
            </div> -->
            <div v-if="panel.type=='4'">
              <sys0030Dashboard/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </template>
  
  <script>
    import notify from 'devextreme/ui/notify' // message

    import baseview from '@/components/base/baseview.vue' // base page 추가
    import { getUserId, getComCode } from '@/utils/token'

    import sys0030Print from '@/views/20/2011/sys0030Page/sys0030Print'
    import sys0030Constraint from '@/views/20/2011/sys0030Page/sys0030Constraint'
    // import sys0030Overflow from '@/views/20/2011/sys0030Page/sys0030Overflow'
    import sys0030Dashboard from '@/views/20/2011/sys0030Page/sys0030Dashboard'

    export default {
      name: 'setting',
      mixins: [baseview], // base page 추가 및 권한 처리
      components: {
        sys0030Print,
        sys0030Constraint,
        // sys0030Overflow,
        sys0030Dashboard
      },
      data() {
        return {
          tab: null,
          model: 0,
          panels: [
            {
              title: '■ 출력물 설정',
              type: '1'
            },
            {
              title: '■ 실적등록 제약조건',
              type: '2'
            },
            // {
            //   title: '■ 과입출 비율',
            //   type: '3'
            // },
            {
              title: '■ 대시보드 관리',
              type: '4'
            },
          ],
          items: [
            {
              title: '공정이동표',
              type: 'PRO_TRANS'
            },
            {
              title: '자재입고표',
              type: 'MTRL_IN'
            },
            {
              title: '외주 자재출고증',
              type: 'MTRL_OUT'
            },
            {
              title: '부품식별표(완제품)',
              type: 'PART_IDNT'
            },
            {
              title: '거래명세표',
              type: 'TRNSC'
            }
          ],
          
        }
      },
      computed: {
      },
      beforeCreate() {
        
      },
      beforeMount() {
      },
      mounted() {
      },
      methods: {
        
      }
    }
  </script>