<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  :label="$t('facName')"
                  :items="facCodeList"
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
                  :label="$t('subcontractorName')"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  :clearable="custCodeClear"
                  :readonly="custCodeReadOnly"
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-text-field
                  class="mt-2"
                  v-model="searchPartNo"
                  :label="$t('partNo')"
                  outlined
                  dense
                  :clearable="custCodeClear"
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
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field :label="$t('outRegiDate')" v-model="startDate" dense outlined readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    no-title
                    scrollable
                    @input="dateInput"
                    :day-format="
                      date => {
                        return new Date(date).getDate()
                      }
                    "
                  />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field label="~" v-model="endDate" outlined dense readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :min="startDate"
                    no-title
                    scrollable
                    @input="dateInput2"
                    :day-format="
                      date => {
                        return new Date(date).getDate()
                      }
                    "
                  />
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
            headerTitle="outOfProcessdeliverPrint"
            :useBtnList="['btnTradePrint', 'btnDeliveryPrint']"
            @btnTradePrint="printTransRpt()"
            @btnDeliveryPrint="printMatOutputRpt()"
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
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @focused-row-changed="focusedRowChanged_outProcessInfo"
                  >
                    <DxColumn
                      data-field="comCode"
                      :caption="$t('comCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="facCode"
                      :caption="$t('facCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="ilno"
                      :caption="$t('workingIlno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn data-field="workNo" :caption="$t('workNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('outLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="custCode"
                      :caption="$t('custName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="custCode" display-expr="custName" value-expr="custCode" />
                    </DxColumn>
                    <DxColumn
                      data-field="inDate"
                      :caption="$t('deliveryDt')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inIlno"
                      :caption="$t('deliveryNoIlno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn data-field="inNo" :caption="$t('outNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn
                      data-field="nextProcNo"
                      :caption="$t('nextProcessName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('outProcessWhsLotNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="outLotDetail"
                      :caption="$t('outProcessWhsLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="proType"
                      :caption="$t('proType2')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="proType" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="true" />
                    <DxColumn data-field="partNo2" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="true">
                      <DxLookup :data-source="partNo" display-expr="partName" value-expr="partNo" />
                    </DxColumn>
                    <DxColumn
                      data-field="qty"
                      :caption="$t('deliveryQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inPrice"
                      :caption="$t('mfglPrice')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inAmount"
                      :caption="$t('mfglAmount')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="outInspCode"
                      :caption="$t('outProcessChkProgressStat')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="outInspCode" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn
                      data-field="printType"
                      :caption="$t('printType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    >
                      <DxLookup :data-source="printType" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                    />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                    />
                    <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                    <DxSelection show-check-boxes-mode="none" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection :allowSelectAll="false" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
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
import { saveMenuStatistics } from '@/api/system/menuStatisticsManage'
import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth, getPreDay } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { createMat0012, deleteMat0018, getAccount_out0010, getUserId_out0010 } from '@/api/view/out0010'
import { getOut0011, exportTransRpt, exportMatOutputRpt } from '@/api/view/out0040'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { getProcInfo, getProcessName } from '@/api/view/bas0031'
import { getMat0011Info } from '@/api/view/mat0011'
import { getMat0012Info } from '@/api/view/mat0012'
import { getMat0018Info } from '@/api/view/mat0018'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getPartNo } from '@/api/view/pop0040'
import { getFactoryInfoData } from '@/api/view/bas0030'
export default {
  name: 'out0030',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    ICardTop,
    DxLookup
  },
  data() {
    return {
      outProcessInfo: [], //구매 발주정보
      outProcessInfoRef: 'OrdStatuseInfoRef',

      reqDtFrom: getPreMonth(0),
      reqDtTo: getPreMonth(-2),
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },

      outProcessInfoData: [], //발주현황 데이터
      deliStatusInfoData: [], //납품현황 데이터
      searchFacCode: '',
      facCodeList: [],
      custCodeList: [],
      searchComCode: '',
      searchCustCode: '',
      searchPartNo: '',
      makeQty: [],
      lotSizeData: [],
      startDate: getPreDay(7),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      rowCount: [],
      custCode: [],
      inStatus: [],
      partNo: [],
      custCodeReadOnly: false,
      custCodeClear: true,
      tabKey: '',
      depCode: '',
      proType: [],
      outInspCode: [],
      printType: []
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
    let params3 = {
      comCode: getComCode(),
      codegr: '',
      code: 'PRO_TYPE',
      userFlag: 'Y'
    }
    let params4 = {
      comCode: getComCode(),
      codegr: '',
      code: 'OUT_INSP_CODE',
      userFlag: 'Y'
    }
    let params5 = {
      comCode: getComCode(),
      codegr: '',
      code: 'PRINT_TYPE',
      userFlag: 'Y'
    }
    let params6 = {
      comCode: getComCode()
    }
    Promise.all([
      getAccount(params),
      getCmChildCode(params2),
      getCmChildCode(params3),
      getCmChildCode(params4),
      getCmChildCode(params5),
      getPartNo(params6)
    ])
      .then(res => {
        this.custCode = res[0].list.slice()
        this.inStatus = res[1].list.slice()
        this.proType = res[2].list.slice()
        this.outInspCode = res[3].list.slice()
        this.printType = res[4].list.slice()
        this.partNo = res[5].list.slice()
      })
      .catch(error => {})
  },
  async created() {
    // const params = {
    //   comCode : getComCode(),
    //   userId : getUserId(),
    //   moduleCode : this.$localStore.get('moduleCode'),
    //   menuCode: this.$localStore.get('menuCode'),
    //   cnntDate: getDateFormat(new Date()),
    // }
    // saveMenuStatistics(params)

    //유저 아이디 조회
    const param3 = {
      comCode: getComCode(),
      userId: getUserId()
    }
    getUserId_out0010(param3).then(res => {
      this.depCode = res.list[0].depCode
      this.checkId()
    })

    //공장명 조회조건
    const comCodeData = {
      comCode: getComCode()
    }
    await getFactoryInfoData(comCodeData).then(res => {
      res.list.forEach(e => {
        this.facCodeList.push({
          value: e.facCode,
          text: e.facName
        })
      })
      this.searchFacCode = res.list[0].facCode
    })
  },
  computed: {
    outProcessInstance() {
      return this.GetDataGrid(this.outProcessInfoRef)
    }
  },
  mounted() {},
  methods: {
    btnSearchMain() {
      this.doSearchMain()
    },
    checkId() {
      const custCodeData = {
        comCode: getComCode()
      }
      if (this.depCode === 'OUT') {
        this.custCodeReadOnly = true
        this.custCodeClear = false
        getAccount_out0010(custCodeData).then(res => {
          res.list.forEach(e => {
            this.custCodeList.push({
              value: e.custCode,
              text: e.custName
            })
          })
          this.searchCustCode = this.custCodeList[0].value
        })
      } else {
        getAccount(custCodeData).then(res => {
          res.list.forEach(e => {
            this.custCodeList.push({
              value: e.custCode,
              text: e.custName
            })
          })
          // this.searchCustCode = this.custCodeList[0].value
        })
      }
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
        comCode: getComCode(),
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        partNo: this.searchPartNo == null ? '' : this.searchPartNo,
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
        facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString()
      }
      getOut0011(params)
        .then(res => {
          res.list.forEach(e => {
            e.partNo2 = e.partNo
          })
          this.outProcessInfo = res.list
          this.endLoading()
        })
        .finally(() => {
          this.outProcessInstance.clearSelection()
          this.endLoading()
        })
    },

    async printTransRpt() {
      this.outProcessInstance.saveEditData()
      let params = await this.outProcessInstance.getSelectedRowsData()
      if (params.length <= 0) {
        return
      }

      exportTransRpt(params).then(res => {
        let blob = new Blob([res], {
          type: 'application/pdf'
        })
        window.open(URL.createObjectURL(blob), '_blank')
      })
    },
    async printMatOutputRpt() {
      this.outProcessInstance.saveEditData()
      let params = await this.outProcessInstance.getSelectedRowsData()
      if (params.length <= 0) {
        return
      }

      exportMatOutputRpt(params).then(res => {
        let blob = new Blob([res], {
          type: 'application/pdf'
        })
        window.open(URL.createObjectURL(blob), '_blank')
      })
    },
    focusedRowChanged_outProcessInfo(e) {
      this.outProcessInstance.option('selectionFilter', ['id', '=', e.row.key]) //최종적으로 가공한 데이터들을 넣는다
    }
  }
}
</script>
<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
