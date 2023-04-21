<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="searchMain">
          <template v-slot:body>
            <!-- 조회 Area -->
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="required mt-2"
                  v-model="searchComCode"
                  :label="$t('comName')"
                  :items="comCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchEqInspType"
                  :label="$t('eqInspType')"
                  :items="eqInspTypeList"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-text-field
                  color="primary"
                  class="mt-2"
                  v-model="searchEqCode"
                  :label="$t('eqCode')"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  class="mt-2 mx-1"
                  :prepend-inner-icon="'$search'"
                  v-model="searchJudge"
                  :label="$t('judge')"
                  :items="judgeList"
                  dense
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('InspDt')"
                      color="primary"
                      class="required"
                      v-model="startDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable @input="dateInput" />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                  transition="scale-transition"
                  offset-y
                  readonly
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('endDate')"
                      color="primary"
                      class="required"
                      v-model="endDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" :min="startDate" no-title scrollable @input="dateInput2" />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical headerTitle="eqInspState">
            <!-- 설비점검현황 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="facilityInfo"
                  class="listBox03"
                  :ref="facilityInfoRef"
                  :data-source="facilityInfo"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  :disabled="false"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="true" />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    :visible="false"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    :visible="false"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="inspDate"
                    :caption="$t('inspDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="eqInsType"
                    :caption="$t('eqInspType')"
                    width="auto"
                    data-type="sring"
                    alignment="center"
                    :allow-editing="false"
                  >
                   <DxLookup :data-source="eqInsType" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="eqCode"
                    :caption="$t('eqCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- <DxColumn
                    data-field="eqInspNo"
                    :caption="$t('eqName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  /> -->
                  <DxColumn
                    data-field="eqInsCode"
                    :caption="$t('eqInspCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                   <DxLookup :data-source="jobType" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="insType"
                    :caption="$t('insType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :visible="true"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="insType" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="insMeth"
                    :caption="$t('insMeth')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :visible="true"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="insMeth" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="jugCode"
                    :caption="$t('jugCodeh')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                   >
                    <DxLookup :data-source="jugCodeh" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="insUnit"
                    :caption="$t('insUnit')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="insUnit" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="insBase"
                    :caption="$t('insBase')"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="insUppp"
                    :caption="$t('insUpp')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="insLow"
                    :caption="$t('insLow')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="judge"
                    :caption="$t('judge')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="judge" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="meaValue"
                    :caption="$t('meaValue')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="500"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
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
                  <template #cellTemplate="{ data }">
                    <v-icon x-large v-if="data.value" @click="imgClick(data)">mdi-file-pdf-box</v-icon>
                  </template>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import iCardVertical from '@/components/common/iCardVertical.vue'
import iDataTable from '@/components/common/iDataTable.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxButton, DxScrollView, DxLookup, DxGrouping, DxGroupPanel } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'
import DxTextBox from 'devextreme-vue/text-box'
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' // message
import { getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { getUserId, getComCode } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getEqp0032 } from '@/api/view/eqp0110'

export default {
  name: 'eqp0020',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    ICardTop,
    DxGrouping,
    DxGroupPanel
  },
  data() {
    return {
      //납품정보
      facilityInfo: [],
      facilityInfoRef: 'facilityInfoRef', //설비정보
      //검사내역
      gridDataSource2: [],
      gridRef2: 'gridRef2',
      //입고내역
      gridDataSource3: [],
      gridRef3: 'gridRef3',

      searchComCode: '',
      searchEqInspType: '',
      searchEqCode: '',
      searchJudge: '',
      comCodeList: [],
      eqInspTypeList: [],
      eqCodeList: [],
      judgeList: [],

      autoExpandAll: true,
      //LookUp
      factoryList: [],
      processList: [],
      eqInsType: [],
      judge: [],
      jobType: [],
      insType: [],
      insMeth: [],
      jugCodeh: [],
      insUnit: [],
      inspClsList: [],
      inspMethodList: [],
      inspToolList: [],
      cycleUnitList: [],

      //조회 변수
      schFacCode: '',
      startDate: getPreMonth(2),
      endDate: getCurrentDate(),
      schEqName: '',

      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      menu1: '',
      menu2: ''
    }
  },
  computed: {
    gridMainInstance() { return this.GetDataGrid(this.facilityInfoRef) },
  },
  created() {
    const comCodeData = {
      comCode: getComCode()
    }
    getCompany(comCodeData).then(res => {
      res.list.forEach(e => {
        
        this.comCodeList.push({
          value: e.comCode,
          text: e.comName
        })
      })
      this.searchComCode = res.list[0].comCode
    })
    const eqInsTypeData = {
      comCode: getComCode(),
      codeGr: 'COM',
      code: 'EQ_INS_TYPE'
    }
    getCmChildCode(eqInsTypeData).then(res => {
      this.eqInsType = res.list.slice()
      res.list.forEach(e => {
        this.eqInspTypeList.push({
          value: e.sysCode,
          text: e.sysName
        })
      })
    })
    const corrJudgeData = {
      comCode: getComCode(),
      code: 'CORR_JUDGE'
    }
    getCmChildCode(corrJudgeData).then(res => {
      this.judge = res.list.slice()
      res.list.forEach(e => {
        this.judgeList.push({
          value: e.sysCode,
          text: e.sysName
        })
      })
    })
    
    //검사항목 유형
    let params1 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'JOB_TYPE',
      userFlag: 'Y',
    }
    //검사항목 코드
    let params2 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'INS_TYPE',
      userFlag: 'Y',
    }
    //측정방법 코드
    let params3 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'INS_METH',
      userFlag: 'Y',
    }
    //판정방법 코드
    let params4 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'JUG_CODEH',
      userFlag: 'Y',
    }
    //검사단위 코드
    let params5 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'INS_UNIT',
      userFlag: 'Y',
    }
    

    Promise.all([
      getCmChildCode(params1),        //설비등급 코드
      getCmChildCode(params2),        //검사항목 코드
      getCmChildCode(params3),        //측정방법 코드
      getCmChildCode(params4),        //판정방법 코드
      getCmChildCode(params5),        //검사단위 코드
    ])
    .then(res => {
      this.jobType = res[0].list.slice()
      this.insType = res[1].list.slice()
      this.insMeth = res[2].list.slice()
      this.jugCodeh = res[3].list.slice()
      this.insUnit = res[4].list.slice()

    })
  },
  methods: {
    dateInput(e) {
      this.inspDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },
    dateInput2(e){
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },
    async searchMain() { 
      let params = {
        comCode : this.searchComCode == null ? '' : this.searchComCode,
        eqInsType: this.searchEqInspType == null ? '' : this.searchEqInspType,
        eqCode: this.searchEqCode == null ? '' : this.searchEqCode,
        judge: this.searchJudge == null ? '' : this.searchJudge,
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate
      }

      this.openLoading()

      getEqp0032(params).then(res => {
        let cnt = 1;
        res.list.forEach(e => {
          e.id = cnt++
       })
        this.facilityInfo = res.list
      })
      .catch(error => {
        this.endLoading()
        notify(error, 'error', 1500)
      })
      .finally(() => {
        this.endLoading()
        if(!this.facilityInfo.length){
            notify(this.$t('searchFailed'), 'warning', 1500)
        } else {
          notify(this.$t('searchCompleted'), 'success', 1500)
        }
        this.gridMainInstance.option('focusedRowIndex', -1)
        this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },
  }
}
</script>
<style scoped>
::v-deep .dx-datagrid-header-panel .dx-toolbar {
  display: block !important;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-after {
  display: none !important; 
}
</style>