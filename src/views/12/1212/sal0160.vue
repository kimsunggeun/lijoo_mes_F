<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="[
          'btnSearch', //조회
        ]" @btnSearch="btnSearchMain()">
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete 
                  :menu-props="{ offsetY: true }" 
                  color="primary" 
                  class="required mt-2" 
                  v-model="searchComCode"
                  :label="$t('facName')" 
                  :items="comCodeList" 
                  item-text="text" 
                  item-value="value" 
                  :prepend-inner-icon="'$search'"
                  dense 
                  outlined  
                  />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete 
                  :menu-props="{ offsetY: true }" 
                  color="primary" 
                  class="mt-2" 
                  v-model="searchCustCode"
                  :label="$t('custName')" 
                  :items="custCodeList" 
                  item-text="text" 
                  item-value="value" 
                  :prepend-inner-icon="'$search'"
                  dense outlined 
                  :clearable="custCodeClear" 
                  :readonly="custCodeReadOnly"/>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-text-field 
                  class="mt-2" 
                  v-model="searchPartNo" 
                  :label="$t('partCode')" 
                  outlined 
                  dense 
                  height="32"
                  @keydown.enter="btnSearchMain()"
                  />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu 
                  ref="menu1" 
                  v-model="menu1" 
                  :close-on-content-click="false" 
                  :return-value.sync="startDate"
                  transition="scale-transition" 
                  offset-y max-width="290px" 
                  min-width="auto"
                  >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field :label="$t('outDate')" v-model="startDate" dense outlined readonly v-bind="attrs" v-on="on"/>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable @input="dateInput" />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu 
                  ref="menu2" 
                  v-model="menu2" 
                  :close-on-content-click="false" 
                  :return-value.sync="endDate"
                  transition="scale-transition" 
                  offset-y max-width="290px" 
                  min-width="auto"
                  >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field label="~" v-model="endDate" outlined dense readonly v-bind="attrs" v-on="on"/>
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
          <i-card-vertical
            headerTitle="transactionStatementOutput"
            :useBtnList="[
              'btnTradePrint',
            ]"
            @btnTradePrint="printTransRpt()"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="outProcessInfo"
                    class="listBox03"
                    :ref="outProcessInfoRef"
                    :data-source="outProcessInfo"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="ilno"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    column-resizing-mode="widget"
                    @focused-row-changed="focusedRowChanged_outProcessInfo"
                    @selection-changed="selectionChanged_outProcessInfo"
                  >
                    <DxColumn data-field="id" :caption="$t('id')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>                
                    <DxColumn data-field="ilno" :caption="$t('ilNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="no" :caption="$t('shipmentNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="ordTurn" :caption="$t('ordTurn')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="outDate" :caption="$t('outDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="outInspYn" :caption="$t('outInsp')" width="auto" data-type="boolean" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="custCode" :caption="$t('custName')" width="auto" data-type="string" alignment="left" :allow-editing="false">
                      <DxLookup :data-source="custCode" display-expr="custName" value-expr="custCode" />
                    </DxColumn>
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false"/>
                    <DxColumn data-field="partNo2" :caption="$t('partName')" width="auto" data-type="string" alignment="" :allow-editing="false" >
                      <DxLookup :data-source="partNo" display-expr="partName" value-expr="partNo" />
                    </DxColumn>
                    <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="outNo" :caption="$t('outNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="stockQty" :caption="$t('stockQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="qty" :caption="$t('qty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="amount" :caption="$t('amount')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd" />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxSelection
                      select-all-mode="allMode"
                      show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                      class="dx-selection"
                    />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup, DxSelection } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { createMat0012, deleteMat0018, getAccount_out0010, getUserId_out0010 } from '@/api/view/out0010'
import { getOut0011 } from '@/api/view/out0040'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { getSal0120, exportTransRpt } from '@/api/view/sal0160'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getPartNo } from '@/api/view/pop0040'
export default {
  name: 'out0030',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    ICardTop,
    DxLookup,
    DxSelection
  },

  data() {
    return {
      outProcessInfo: [], //구매 발주정보
      outProcessInfoRef: 'outProcessInfoRef',

      reqDtFrom: getPreMonth(0),
      reqDtTo: getPreMonth(-2),
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      outProcessInfoData: [], //발주현황 데이터
      deliStatusInfoData: [], //납품현황 데이터
      selectedRowsData: [],
      comCodeList: [],
      custCodeList: [],
      searchComCode: '',
      searchCustCode: '',
      searchPartNo: '',
      makeQty: [],
      lotSizeData: [],
      startDate: getPreMonth(2),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      custCode: [],
      partNo: [],
      custCodeReadOnly : false,
      custCodeClear: true,
      currentCheckRow: '',
      currentData: '',
    }
  },

  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
      userId: getUserId()
    }
    //검사유형
    let params2 = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_STATE',
      userFlag: 'Y'
    }
    let params6 = {
      comCode: getComCode(),
    }
    Promise.all([
        getAccount(params), 
        getCmChildCode(params2), 
        getPartNo(params6)
      ])
      .then(res => {
        this.custCode = res[0].list.slice()
        res[0].list.forEach(e => {
          this.custCodeList.push({
            text : e.custName,
            value : e.custCode
          })
        })
        this.inStatus = res[1].list.slice()
        this.partNo = res[2].list.slice()
      })
      .catch(error => {})
  },

  async created() {

    //공장명 조회조건
    const comCodeData = {
      comCode: getComCode()
    }
    await getCompany(comCodeData).then(res => {
      res.list.forEach(e => {
        this.comCodeList.push({
          value: e.comCode,
          text: e.comName
        })
      })
      this.searchComCode = res.list[0].comCode
    })
  },

  computed: {
    outProcessInstance() { return this.GetDataGrid(this.outProcessInfoRef) }
  },

  mounted() {
  },

  methods: {
    btnSearchMain() {
      this.doSearchMain()
    },

    //------------------------------------------------------------------------조회버튼-------------------------------------------------------------------------------------//
    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },

    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },

    doSearchMain() {
      //구매발주정보 조회
      this.outProcessInfo = []
      this.openLoading('searching')
      let params = {
        comCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        partNo: this.searchPartNo == null ? '' : this.searchPartNo,
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
      }
      getSal0120(params)
        .then(res => {
          res.list.forEach(e => {       
            e.partNo2 = e.partNo
            this.currentData = e
          })
          this.outProcessInfo = res.list
          this.endLoading()
        })
        .finally(() => {
          //this.outProcessInstance.option('focusedRowIndex', -1)
          //this.outProcessInstance.option('focusedRowIndex', 0)
          this.outProcessInstance.clearSelection()
          this.endLoading()
        })
    },

    async printTransRpt(){
      this.outProcessInstance.saveEditData()
      let params = await this.outProcessInstance.getSelectedRowsData()
      console.log('printTransRpt',params)
      if(params.length <= 0){
        notify("출력할 데이터를 선택해 주십시오", 'error',2000)
        return;
      }
      
      exportTransRpt(params).then(res => {
        let blob = new Blob([res], {
          type: 'application/pdf'
        })
        //console.log('getJasperReportTest', blob)
        window.open(URL.createObjectURL(blob), '_blank')
      })
    },

    async selectionChanged_outProcessInfo(e) {
    },

    // focusedRowChanged_outProcessInfo(e) {
    //   this.outProcessInstance.option("selectionFilter", ['id', '=', e.row.key])
    // },
  }
}
</script>
<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
.dx-selection td{
    background:red !important;
}
</style>