<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0 pl-0 pb-0">
        <i-card-top class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-row dense align="center">
              <!-- 회사명 선택 -->
              <v-col cols="2">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-1"
                  v-model="searchComCode"
                  :label="$t('comName')"
                  :items="comCodeList"
                  item-text="sysName"
                  item-value="sysCode"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <!-- 사용자명 입력 -->
              <v-col cols="2">
                <v-text-field
                  :label="$t('userName')"
                  color="primary"
                  class="mt-1"
                  v-model="searchUserName"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                />
              </v-col>
              <!-- 메뉴명 입력 -->
              <v-col cols="2">
                <v-text-field
                  :label="$t('menuName')"
                  color="primary"
                  class="mt-1"
                  v-model="searchMenuName"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                />
              </v-col>
              <!-- 조회일 -->
              <v-col cols="2">
                <v-menu
                  ref="frPlanDateCal"
                  v-model="calMenuState.frPlanDateCal"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      :label="$t('inquery')"
                      v-model="searchValue.frPlanDate"
                      dense
                      outlined
                      readonly
                      color="primary"
                      class="required mx-1"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker 
                    v-model="searchValue.frPlanDate" 
                    no-title
                    @input="calMenuState.frPlanDateCal = false"
                    :day-format="(date) => {return new Date(date).getDate()}"
                  />
                </v-menu>
              </v-col>
              <!-- ~ -->
              <v-col cols="2">
                <v-menu
                  ref="toPlanDateCal"
                  v-model="calMenuState.toPlanDateCal"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      :label="$t('endDate')"
                      v-model="searchValue.toPlanDate"
                      dense
                      outlined
                      color="primary"
                      class="required mx-1"
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>
                  <v-date-picker
                    v-model="searchValue.toPlanDate"
                    :min="searchValue.frPlanDate"
                    no-title
                    @input="calMenuState.toPlanDateCal = false"
                    :day-format="(date) => {return new Date(date).getDate()}"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pl-0 pb-0">
        <i-card-vertical 
          :headerTitle="$t('accessHistory')"
          :useBtnList="[]"
        >
          <template v-slot:body>            
            <v-layout column >
              <!-- 그리드 Main -->
              <DxDataGrid
                id="menuStatisticsManage"
                class="listBox"
                :ref="dxDataGridRef"
                :data-source="menuStatisticsData"
                key-expr="id"
                :width="grid.width"
                :show-borders="true"
                :allow-column-resizing="true"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :column-hiding-enabled="false"
                :hover-state-enabled="true"
                :show-row-lines="true"
                :remote-operations="false"
                :focused-row-enabled="true"
                >
                <DxPaging :enabled="false" :page-size="30"/>
                <DxScrolling column-rendering-mode="virtual"/>
                <DxSelection
                    mode="single"
                    :allow-select-all="false"
                />
                <!-- 일자 Column -->
                <DxColumn 
                  data-field="cnntDate" 
                  :caption="$t('currDate')" 
                  data-type="string" 
                  alignment="center" 
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 사용자ID Column -->
                <DxColumn 
                  data-field="userId" 
                  :caption="$t('userId')" 
                  data-type="string" 
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 사용자 Column -->
                <DxColumn 
                  data-field="userName" 
                  :caption="$t('userName')" 
                  data-type="string" 
                  alignment="left"
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 메뉴코드 Column -->
                <DxColumn 
                  data-field="menuCode" 
                  :caption="$t('menuCode')" 
                  data-type="string" 
                  alignment="left"
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 매뉴명 Column -->
                <DxColumn 
                  data-field="menuName" 
                  :caption="$t('menuName')" 
                  data-type="string" 
                  alignment="left"
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 사용횟수 Column -->
                <DxColumn 
                  data-field="cnntCnt" 
                  :caption="$t('cnntCnt')" 
                  data-type="string" 
                  alignment="right"
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 최초 사용시간 Column -->
                <DxColumn 
                  data-field="insertDate" 
                  :caption="$t('insertDate')" 
                  data-type="string" 
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
                <!-- 마지막 사용시간 Column -->
                <DxColumn 
                  data-field="updateDate" 
                  :caption="$t('updateDate')" 
                  data-type="string" 
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
                <DxColumn 
                  data-field="" 
                  caption="" 
                  data-type="string" 
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import iCardVertical from '@/components/common/iCardVertical.vue'
  import baseview from '@/components/base/baseview.vue' // base page 추가
  import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

  import { DxDataGrid, DxColumn, DxSelection, DxScrolling, DxPager } from 'devextreme-vue/data-grid'
  import themes from 'devextreme/ui/themes'
  import notify from 'devextreme/ui/notify' // message

  import { getDateFormat } from '@/utils/common.js'
  import { getCompany } from '@/api/system/companyManage'
  import { getMenuStatistics } from '@/api/system/menuStatisticsManage'
  import { getUserId, getComCode } from '@/utils/token'
  export default {
    name: 'menuManage',
    mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
    components: {
      'i-card-vertical': iCardVertical,
      DxDataGrid,
      DxColumn,
      DxSelection,
      DxScrolling,
      DxPager
    },
    data() {
      return {
        dxDataGridRef: 'dxDataGridRef',
        searchValue: {
          frPlanDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() - 7))),
          toPlanDate: getDateFormat(new Date()),
        },
        //vuetify 달력 model
        calMenuState: {
          frPlanDateCal: false,
          toPlanDateCal: false,
        },
        searchComCode: '',
        comCodeList: [],
        searchUserName: '',
        searchMenuName: '',
        menuStatisticsData: []
      }
    },
    computed: {
      gridMainInstance() {
        return this.GetDataGrid(this.dxDataGridRef)
      },
    },
    beforeMount() {},
    created() {
      //회사명 조회조건 리스트 가져오기
      const companyCode = {
            comCode: getComCode()
      }
      getCompany(companyCode).then(res => {
        res.list.forEach((item, i) => {
          this.comCodeList.push({
            sysCode: item.comCode,
            sysName: item.comName
          })
        })
        this.searchComCode = res.list[0].comCode
      })
    },
    mounted() {},

    methods: {
      btnSearch() {
        this.menuStatisticsData = []
        this.openLoading('searching')
        const searchData = {
          comCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
          userName: this.searchUserName == null ? '' : this.searchUserName.toString(),
          menuName: this.searchMenuName == null ? '' : this.searchMenuName.toString(),
          dateFrom: this.searchValue.frPlanDate,
          dateTo: this.searchValue.toPlanDate,
          lanCode: this.$localStore.get('locale')
        }

        getMenuStatistics(searchData)
          .then(res => {
              this.menuStatisticsData = res.list
          })
          .finally(() => {
            this.endLoading()
          })
      }
    }
  }
</script>