<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
          'btnSearch', //조회
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
                  v-model="searchComCode"
                  label="공장명"
                  :items="comCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchCustCode"
                  label="검사구분"
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
                  label="구분"
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
                  label="거래처명"
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
                  label="품목구분"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                />
              </v-col>
              <v-row>
                <v-col cols="2" class="pa-2 pt-2 pb-2">
                  <v-menu
                    ref="startCal"
                    v-model="startCal"
                    :close-on-content-click="false"
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('deliveryDt')"
                        v-model="startDate"
                        dense
                        outlined
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title @input="startInput" />
                  </v-menu>
                </v-col>
                <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                  <v-menu
                    ref="endCal"
                    v-model="endCal"
                    :close-on-content-click="false"
                    :return-value.sync="endDate"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('endDate')"
                        v-model="endDate"
                        dense
                        outlined
                        clearable
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" :min="startDate" no-title @input="endInput" />
                  </v-menu>
                </v-col>
                <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mt-2"
                    v-model="searchCustCode"
                    label="처리구분"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                  />
                </v-col>
              </v-row>
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
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <v-date-picker
                    v-model="endDate"
                    :min="startDate"
                    no-title
                    scrollable
                    @input="dateInput2"
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
            headerTitle="deliveryInformation"
            :useBtnList="[
          'btnConfirm'
          ]"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="ordStatusInfo"
                    class="doubleListBox03"
                    :ref="ordStatusInfoRef"
                    :data-source="ordStatusInfo"
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
                    @focused-row-changed="focusedRowChanged_orderSelect"
                  >
                    <DxColumn
                      data-field="facName"
                      :caption="$t('facName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="division"
                      :caption="$t('division')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="deliveryDt"
                      :caption="$t('deliveryDt')"
                      width="auto"
                      data-type="date"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="custName"
                      :caption="$t('custName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="deliveryNo"
                      :caption="$t('deliveryNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="spec"
                      :caption="$t('spec')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="deliveryQty2"
                      :caption="$t('deliveryQty2')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="partUnit"
                      :caption="$t('partUnit')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="clsfPrcs"
                      :caption="$t('clsfPrcs')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="judge"
                      :caption="$t('judge')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="WarehousingQty"
                      :caption="$t('WarehousingQty')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="center"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="inspectionReport"
                      :caption="$t('inspectionReport')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxSelection show-check-boxes-mode="none" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical
            headerTitle="inspectionDetails"
            :useBtnList="[
          'inspectionStandard',
          'btnSave'
          ]"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="ordStatusInfo"
                    class="doubleListBox03"
                    :ref="ordStatusInfoRef"
                    :data-source="ordStatusInfo"
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
                    @focused-row-changed="focusedRowChanged_orderSelect"
                  >
                    <DxColumn
                      data-field="facName"
                      :caption="$t('facName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="number"
                      :caption="$t('number')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="inspectionClause"
                      :caption="$t('inspectionClause')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="inspectionMethod"
                      :caption="$t('inspectionMethod')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="measureMethod"
                      :caption="$t('measureMethod')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="standardValue"
                      :caption="$t('standardValue')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="insUpp"
                      :caption="$t('insUpp')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="insLow"
                      :caption="$t('insLow')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="center"
                    />
                    <DxColumn
                      data-field="judge"
                      :caption="$t('judge')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn caption="시료">
                      <DxColumn
                        data-field="시료1"
                        :caption="$t('시료1')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료2"
                        :caption="$t('시료2')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료3"
                        :caption="$t('시료3')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료4"
                        :caption="$t('시료4')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료5"
                        :caption="$t('시료5')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료6"
                        :caption="$t('시료6')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료7"
                        :caption="$t('시료7')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료8"
                        :caption="$t('시료8')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료9"
                        :caption="$t('시료9')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      <DxColumn
                        data-field="시료10"
                        :caption="$t('시료10')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :data-source="custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('regiDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                    <DxSelection show-check-boxes-mode="none" />
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
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { createMat0012, deleteMat0018, getAccount_out0010, getUserId_out0010 } from '@/api/view/out0010'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { getProcInfo, getProcessName } from '@/api/view/bas0031'
import { getMat0011Info } from '@/api/view/mat0011'
import { getMat0012Info } from '@/api/view/mat0012'
import { getMat0018Info } from '@/api/view/mat0018'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
export default {
  name: 'out0030',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    //DxScrolling,
    ICardTop
    //DxLookup
  },
  data() {
    return {
      ordStatusInfo: [], //구매 발주정보
      deliStatusInfo: [], //구매 발주정보 상세
      deliRegInfo: [], //구매 입고 등록
      deliInfo: [], //구매 입고정보 상세
      ordStatusInfoRef: 'OrdStatuseInfoRef',
      deliStatusInfoRef: 'deliStatusInfoRef',
      deliRegInfoRef: 'deliRegInfoRef',
      deliInfoRef: 'deliInfoRef',
      reqDtFrom: getPreMonth(0),
      reqDtTo: getPreMonth(-2),
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      ordStatusInfoData: [], //발주현황 데이터
      deliStatusInfoData: [], //납품현황 데이터

      comCodeList: [],
      custCodeList: [],
      searchComCode: '',
      searchCustCode: '',
      makeQty: [],
      lotSizeData: [],
      startDate: getPreMonth(2),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      rowCount: [],
      custCode: [],
      inStatus: [],
      tabKey: '',
      depCode: ''
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

    Promise.all([getAccount(params), getCmChildCode(params2)])
      .then(res => {
        this.custCode = res[0].list.slice()
        this.inStatus = res[1].list.slice()
        this.depCode = res[2].list[0].depCode
      })
      .catch(error => {})
  },
  async created() {
    //유저 아이디 조회
    const param3 = {
      userId: getUserId()
    }
    getUserId_out0010(param3).then(res => {
      this.depCode = res.list[0].depCode
      console.log('유저아이디', res)
    })

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

    const custCodeData = {
      comCode: getComCode()
    }

    if (this.depCode === 'OUT') {
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
        this.searchCustCode = this.custCodeList[0].value
      })
    }
  },
  computed: {
    ordStatusInstance() {
      return this.GetDataGrid(this.ordStatusInfoRef)
    },
    deliStatusInstance() {
      return this.GetDataGrid(this.deliStatusInfoRef)
    },
    deliRegInstance() {
      return this.GetDataGrid(this.deliRegInfoRef)
    },
    deliInfoInstance() {
      return this.GetDataGrid(this.deliInfoRef)
    }
  },
  mounted() {},
  methods: {
    btnSearchMain() {
      this.doSearchMain()
      this.doSearchDeliReg()
      this.rowCount = []
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
      this.ordStatusInfo = []
      //this.openLoading('searching')
      let params = {
        comCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
        facCode: 'FAC01',
        ordState: '20'
      }
      getMat0010Info(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.ordStatusInfo = res.list
          if (this.ordStatusInfo.length === 0) {
            this.ordStatusInfoData = []
            this.deliStatusInfoData = []
            this.doSearchDeliStatus()
            this.doSearchDeliInfo()
          }
        })
        .finally(() => {
          this.ordStatusInstance.option('focusedRowIndex', -1)
          this.ordStatusInstance.option('focusedRowIndex', 0)
          this.ordStatusInstance.clearSelection()
          this.endLoading()
        })
    },

    doSearchDeliStatus() {
      // 구매 발주정보 상세 조회
      this.deliStatusInfo = []
      //this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.ordStatusInfoData.facCode,
        regiDate: this.ordStatusInfoData.regiDate,
        ordNo: this.ordStatusInfoData.ordNo
      }
      getMat0011Info(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.deliStatusInfoData = res.list
          this.deliStatusInfo = res.list
        })
        .finally(() => {
          this.deliStatusInstance.option('focusedRowIndex', -1)
          this.deliStatusInstance.option('focusedRowIndex', 0)
          this.deliStatusInstance.clearSelection()

          this.endLoading()
        })
    },

    doSearchDeliReg() {
      this.deliRegInfo = []
      //this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.deliStatusInfoData.facCode,
        regiDate: this.deliStatusInfoData.regiDate,
        ordNo: this.deliStatusInfoData.ordNo,
        no: this.deliStatusInfoData.no
      }
      getMat0012Info(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.deliRegInfoData = res.list
        //this.deliRegInfo = res.list
      })
    },
    doSearchDeliInfo() {
      this.deliInfo = []
      //this.openLoading('searching')

      let params = {
        comCode: getComCode(),
        facCode: this.deliStatusInfoData.facCode,
        regiDate: this.deliStatusInfoData.regiDate,
        ordNo: this.deliStatusInfoData.ordNo,
        no: this.deliStatusInfoData.no
      }
      getMat0018Info(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.deliInfo = res.list
        })
        .finally(() => {
          this.endLoading()
        })
        .finally(() => {
          this.deliInfoInstance.option('focusedRowIndex', -1)
          this.deliInfoInstance.option('focusedRowIndex', 0)
          this.deliInfoInstance.clearSelection()
          this.endLoading()
        })
    },
    //------------------------------------------------------------------------추가버튼-------------------------------------------------------------------------------------//
    async btnremOrdAdd() {
      let selectedMainRows = await this.deliStatusInstance.getSelectedRowsData()
      if (selectedMainRows.length === 0) {
        notify(this.$t('mat0012AddCheck'), 'error')
        return
      }
      if (this.rowCount !== []) {
        for (let i = 0; i < selectedMainRows.length; i++) {
          for (let r = 0; r < 1000; r++) {
            if (this.rowCount[r] == selectedMainRows[i].ordNo + selectedMainRows[i].no) {
              notify(this.$t('mat0012AddCheck2'), 'error')
              return
            }
          }
        }
      }
      for (let i = 0; i < selectedMainRows.length; i++) {
        this.rowCount.push(selectedMainRows[i].ordNo + selectedMainRows[i].no)
      }
      for (let i = 0; i < selectedMainRows.length; i++) {
        if (selectedMainRows[i].remQty === '0') {
          notify(this.$t('추가할 납품잔량이 없습니다'), 'error')
          return
        }
        var newRow = {
          id: this.deliRegInfo.length + 1,
          comCode: getComCode(),
          facCode: selectedMainRows[i].facCode,
          ordNo: selectedMainRows[i].ordNo,
          no: selectedMainRows[i].no,
          regiDate: getCurrentDate(),
          ilNo: '',
          inType: '구매입고',
          partNo: selectedMainRows[i].partNo,
          qty: selectedMainRows[i].remQty,
          inQty: '',
          makeQty: selectedMainRows[i].lotSize,
          boxQty: '',
          inPrice: selectedMainRows[i].price,
          inAmount: '',
          remark: '',
          printType: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          inStatus: selectedMainRows[i].inInsp == 'Y' ? '10' : '20',
          inWh: selectedMainRows[i].inWh,
          partType: selectedMainRows[i].partType,
          __created__: true,
          __modified__: false
        }
        this.deliRegInstance.newRow(newRow)
        this.deliRegInstance.selectRows(newRow.id, true)
        this.deliRegInstance.option('focusedRowIndex', 1)
      }
    },
    focusedRowChanged_orderSelect(e) {
      if (e.row === undefined) {
        return
      }

      this.ordStatusInfoData = e.row.data
      this.doSearchDeliStatus()
    },
    focusedRowChanged_DeliSelect(e) {
      if (e.row === undefined) {
        return
      }
      this.deliStatusInfoData = e.row.data
      //this.doSearchDeliReg()
      if (this.tabKey === '구매입고정보상세') {
        this.doSearchDeliInfo()
      }
    },
    focusedRowChanged_DeliReg(e) {
      if (e.row === undefined) {
        return
      }
      this.deliRegInfoData = e.row.data
    },
    tabChange(e) {
      this.tabKey = e
      if (e === '구매입고정보상세') {
        this.doSearchDeliStatus()
      }
    },
    //----------------------------------------------------------------------저장버튼-------------------------------------------------------------------------------------------//
    async btnSave(gbn) {
      if (gbn === '구매입고등록') {
        let messageGubun = ''
        this.deliRegInstance.saveEditData()
        this.deliStatusInstance.saveEditData()
        var selectedDetailRows = await this.deliRegInstance.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        for (var row of selectedDetailRows) {
          if (!row.inQty || !row.inPrice) {
            this.vToastify(this.$t('필수항목 입력하세요 [입고량, 입고단가]'), 'warn')
            return
          }
          if (row.__created__ === false) {
            messageGubun = 'doFixData'
            row.__modified__ = true
            row.comCode = getComCode()
            row.editor = getUserId()
          } else if (row.__created__ === true) {
            messageGubun = 'doSaveData'
            row.comCode = getComCode()
            row.maker = getUserId()
          }
          if (row.regiDate.length > 10) {
            row.regiDate = row.regiDate.substr(0, 10)
          }
        }
        console.log('저장될 데이터', selectedDetailRows)
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          current => {
            this.openLoading()
            this.deliRegInstance.beginUpdate()
            this.deliStatusInstance.beginUpdate()
            let cnt = 0

            createMat0012(selectedDetailRows, true)
              .then(res => {
                let message = ''
                message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 3000)
                this.rowCount = []
              })
              .catch(error => {
                notify(error, 'error', 3000)
                this.rowCount = []
                this.endLoading()
              })
              .finally(() => {
                this.deliRegInstance.endUpdate()
                this.deliStatusInstance.endUpdate()
                this.doSearchDeliStatus()
                this.doSearchDeliReg()
                this.doSearchDeliinfo()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //----------------------------------------------------------------------삭제버튼-------------------------------------------------------------------------------------------//
    async btnDelete(gbn) {
      if (gbn === '구매입고정보상세') {
        this.deliInfoInstance.saveEditData()
        var selectedDetailRows = await this.deliInfoInstance.getSelectedRowsData() // 구매입고등록 데이터
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.deliInfoInstance.beginUpdate()
            deleteMat0018(selectedDetailRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 3000)
              })
              .catch(error => {
                notify(error, 'error', 3000)
                this.rowCount = []
                this.doSearchMain()
                this.endLoading()
              })
              .finally(() => {
                this.deliInfoInstance.endUpdate()
                this.rowCount = []
                this.doSearchMain()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },

    //----------------------------------------------------------------------셀 클릭 이벤트---------------------------------------------------------------------------------------//
    //입고량 입력에 대한 이벤트
    setQtyValue(newData, value, currentRowData) {
      if (currentRowData.makeQty === '0' || currentRowData.makeQty === '') {
        //구성량이 0이거나 ''일때
        if (Number(currentRowData.qty) < value) {
          //입고량이 납품잔량보다 많을경우 납품잔량수를 넣음
          newData.inQty = currentRowData.qty
          return
        }
        //구성량이 0일때 입고량만 업데이트 됨
        newData.inQty = value
        return
      } else {
        //구성량엔 1 이상의 값이 들어있는 상태
        if (Number(currentRowData.qty) < value) {
          //입고량이 납품잔량보다 많을경우 납품잔량수를 넣음
          value = currentRowData.qty
        }

        if (Number(value) < Number(currentRowData.makeQty)) {
          //입고량이 구성량보다 작을 경우 구성량과 동일한 값을 가지게 됨
          value = currentRowData.makeQty
        }
      }
      //구성량의 값이 1 이상이고 [구성량 <= 입고량 <= 납품잔량]일 경우
      newData.inQty = value
      newData.boxQty = Math.ceil(value / currentRowData.makeQty)
      newData.inAmount = Math.round(value * currentRowData.inPrice * 100) / 100
      //newData.inAmount = value * currentRowData.inPrice
      newData.remQty = currentRowData.qty - value
    },

    //구성량 입력에 대한 이벤트
    setMakeQtyValue(newData, value, currentRowData) {
      if (currentRowData.inQty === '0' || currentRowData.inQty === '') {
        //입고량이 0이거나 ''일때
        if (Number(currentRowData.qty) < value) {
          //구성량이 납품잔량보다 많을 경우 납품잔량수를 넣음
          value = currentRowData.qty
          return
        }
        //입고량이 0일때 구성량만 업데이트 됨
        newData.makeQty = value
        return
      } else {
        //입고량이 1 이상일 때
        if (Number(currentRowData.inQty) < Number(value)) {
          // 구성량이 입고량보다 많을 경우 입고량과 값이 같게
          value = currentRowData.inQty
        }
        if (Number(currentRowData.qty) < Number(value)) {
          // 구성량이 납품잔량보다 많을 경우 납품잔량수를 넣음, 이 때 입고량은 구성량보다 적을 수 없으므로 입고량에도 납품잔량수를 넣음
          value = currentRowData.qty
          newData.inQty = currentRowData.qty
        }
        if (value === '0') {
          value = 1
        }
        //입고량이 1 이상이며 구성량 <= 입고량, 구성량 <= 납품잔량일 경우
        newData.makeQty = value
        newData.boxQty = Math.ceil(currentRowData.inQty / value)
        newData.inAmount = currentRowData.inQty * currentRowData.inPrice
        newData.remQty = currentRowData.qty - currentRowData.inQty
      }
    },
    setInPriceValue(newData, value, currentRowData) {
      newData.inPrice = value
      newData.inAmount = value * currentRowData.inQty
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