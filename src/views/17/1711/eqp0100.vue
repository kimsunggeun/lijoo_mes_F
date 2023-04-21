<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch()">
          <template v-slot:body>
            <!-- 조회 Area -->
            <v-row no-gutters class="center pa-2 mr-0">
              <v-col cols="2" class="pa-1 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="required mt-2"
                  v-model="schFacCode"
                  :label="$t('facName')"
                  :items="factoryList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-1 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="schJobType"
                  :label="$t('resourceClassification')"
                  :items="jobTypeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-1 pt-0 pb-0">
                <v-text-field
                  class="mt-2 mx-1"
                  :prepend-inner-icon="'$search'"
                  :label="$t('reserveStockNo')"
                  v-model="partNo"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-menu
                    ref="sDateCal"
                    v-model="sDateCal"
                    :close-on-content-click="false"
                    :return-value.sync="sDate"
                    max-width="290px"
                    min-width="auto"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="primary"
                        class="required mx-1"
                        v-model="sDate"
                        :prepend-inner-icon="'$search'"
                        :label="$t('inRegiDateAndoutRegiDate')"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="sDate" no-title scrollable @input="dateInput"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="eDateCal"
                    v-model="eDateCal"
                    :close-on-content-click="false"
                    :return-value.sync="eDate"
                    max-width="290px"
                    min-width="auto"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="primary"
                        class="required mx-1"
                        v-model="eDate"
                        :prepend-inner-icon="'$search'"
                        label="~"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="eDate"
                      :min="sDate"
                      no-title
                      scrollable
                      @input="dateInput2"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row dense class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical
            headerTitle="reserveStockInfo"
            :useBtnList="['btnExcel']"
            @btnExcel="btnExcel('main')"
          >
            <!-- 예비품 정보 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="facilityInfo"
                  class="doubleListBox03"
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
                  :column-auto-width="true"
                  @row-click="itemRowClick"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection show-check-boxes-mode="none" />

                  <!-- 공장명 -->
                <DxColumn data-field="facCode" :caption="$t('facName')"  data-type="string" alignment="right"  :allow-editing="false" />
                <!-- 자원구분 -->
                <DxColumn
                  data-field="jobType"
                  :caption="$t('resourceClassification')"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                >
                  <DxLookup :data-source="jobTypeList" display-expr="text" value-expr="value"
                /></DxColumn>
                <!-- 예비품번 -->
                <DxColumn
                  data-field="partNo"
                  :caption="$t('reserveStockNo')"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <!-- 예비품명 -->
                <DxColumn
                  data-field="partName"
                  :caption="$t('reserveStockName')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <!-- 규격 -->
                <DxColumn data-field="spec" :caption="$t('spec')"  data-type="string" alignment="center" :allow-editing="false" />
                <!-- 현재고 -->
                <DxColumn
                  data-field="qty"
                  :caption="$t('nowStatusqty')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <!-- 적정재고 -->
                <DxColumn
                  data-field="safeQty"
                  :caption="$t('optimumStockage')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <!-- 등급 -->
                <DxColumn data-field="grade" :caption="$t('grade')" data-type="string" alignment="center" :allow-editing="false" />
                <!-- 제작소요일 -->
                <DxColumn
                  data-field="regDate"
                  :caption="$t('manufacturingLeadTime')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <!-- 환종 -->
                <DxColumn data-field="unit" :caption="$t('exchangeRate')" data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="currCodeList" display-expr="text" value-expr="value" />
                </DxColumn>
                <!-- 단가 -->
                <DxColumn data-field="price" :caption="$t('unitPrice')" data-type="number" format="#,###" alignment="center" :allow-editing="false" />
                <!-- 보관위치 -->
                <DxColumn
                  data-field="stockCode"
                  :caption="$t('storageLocation')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                >
                  <DxLookup :data-source="stockCodeList" display-expr="text" value-expr="value" />
                </DxColumn>
                <!-- 사용유무 -->
                <DxColumn
                  data-field="userFlag"
                  :caption="$t('userFlag')"
                  data-type="boolean"
                  alignment="center"
                  :allow-editing="false"
                />
                <!-- 등록일 -->
                <DxColumn data-field="makeDate" :caption="$t('regiDate')" data-type="string" alignment="center"  :allow-editing="false" />
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
    <v-row dense class="pa-0">
      <v-tabs color="#000" @change="tabChange">
        <v-tab>{{$t('receiptDetails2')}}</v-tab>
        <v-tab>{{$t('deliDetails2')}}</v-tab>
        <v-tab-item>
          <i-card-vertical
            headerTitle="receiptDetails"
            :useBtnList="[
              'btnExcel',
              'btnAdd',
              'btnSave'
            ]"
            @btnExcel="btnExcel('receipt')"
            @btnAdd="btnAdd('receipt')"
            @btnSave="btnSave('receipt')"
          >
          <!-- 입고내역 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="receiptInfo"
                    class="doubleListBox05"
                    :ref="receiptInfoRef"
                    :data-source="receiptInfo"
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
                    :column-auto-width="true"
                    :selection="{ mode:'none' }"
                    @editor-preparing="onEditorPreparing"

                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />

                    <!-- 예비품 구분 -->
                    <DxColumn
                      data-field="spareType"
                      :caption="$t('spareType')"
                      data-type="string"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="spareTypeList" display-expr="text" value-expr="value">
                      </DxLookup>
                    </DxColumn>
                    <!-- 입고일 -->
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('inRegiDate')"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                    />
                    <!-- 예비품번 -->
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('reserveStockNo')"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <!-- 수량 -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('qty')"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                    />
                    <!-- 단가 -->
                    <DxColumn data-field="price" :caption="$t('unitPrice')" data-type="number" format="#,###" alignment="right" />
                    <!-- 보관위치 -->
                    <DxColumn
                      data-field="stockCode"
                      :caption="$t('storageLocation')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="stockCodeList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <!-- 금액 -->
                    <DxColumn
                      data-field="amount"
                      :caption="$t('amount')"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="gubun"
                      :caption="$t('')"
                      data-type="string"
                      alignment="center"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="seq"
                      :caption="$t('')"
                      data-type="string"
                      alignment="center"
                      :visible="false"
                    />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item>
          <i-card-vertical
            headerTitle="deliDetails"
            :useBtnList="[
              'btnExcel',
              'btnAdd',
              'btnSave'
            ]"
            @btnExcel="btnExcel('deli')"
            @btnAdd="btnAdd('deli')"
            @btnSave="btnSave('deli')"
          >
          <!-- 출고내역 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="releaseInfo"
                    class="doubleListBox05"
                    :ref="releaseInfoRef"
                    :data-source="releaseInfo"
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
                    :column-auto-width="true"
                    @editor-preparing="onEditorPreparing"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />

                    <!-- 예비품 구분 -->
                    <DxColumn
                      data-field="spareType"
                      :caption="$t('spareType')"
                      data-type="string"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="spareTypeList" display-expr="text" value-expr="value">
                      </DxLookup>
                    </DxColumn>
                    <!-- 출고일 -->
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('outRegiDate')"
                      data-type="string"
                      alignment="center"
                    />
                    <!-- 예비품번 -->
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('reserveStockNo')"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <!-- 수량 -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('qty')"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                    />
                    <!-- 단가 -->
                    <DxColumn data-field="price" :caption="$t('unitPrice')" data-type="number" format="#,###" alignment="right" />
                    <!-- 보관위치 -->
                    <DxColumn
                      data-field="stockCode"
                      :caption="$t('storageLocation')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="stockCodeList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <DxColumn
                      data-field="amount"
                      :caption="$t('amount')"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="gubun"
                      :caption="$t('')"
                      data-type="string"
                      alignment="center"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="seq"
                      :caption="$t('')"
                      data-type="string"
                      alignment="center"
                      :visible="false"
                    />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import iCardVertical from '@/components/common/iCardVertical.vue'
import iDataTable from '@/components/common/iDataTable.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup, DxEditing } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'
import DxTextBox from 'devextreme-vue/text-box'
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' // message
import { getCurrentDate, getMonthFormat } from '@/utils/common.js'
import themes, { current } from 'devextreme/ui/themes'
import { getUserId, getComCode } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getBas0011Detail } from '@/api/view/bas0011'
import { getFacCode } from '@/api/system/companyManage'
import { getWarehouseLocInfoData } from '@/api/view/bas0033'
import { getMainList, getReceiptDetailList, getDeliDetailList, saveDetailInfo } from '@/api/view/eqp0100'

export default {
  name: 'eqp0100',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxLookup,
    ICardTop,
    DxEditing,
  },
  data() {
    return {
      //조회조건
      sDateCal: '',
      sDate: getMonthFormat(new Date()) + '-01',
      eDateCal: '',
      eDate: getCurrentDate(),
      schFacCode: '',
      schJobType: '',
      //예비품 정보
      facilityInfo: [],
      facilityInfoRef: 'facilityInfoRef',
      //검사내역
      receiptInfo: [],
      receiptInfoRef: 'receiptInfoRef',
      //입고내역
      releaseInfo: [],
      releaseInfoRef: 'releaseInfoRef',
      //tabIndex
      tabsNo: '',

      //LookUp
      factoryList: [],
      jobTypeList: [],
      currCodeList: [],
      stockCodeList: [],
      spareTypeList: [],

      items: {
        comCode: '',
        partNo: '',
        facCode: ''
      },

      checkBoxesMode: 'always',
    }
  },
  computed: {
    getMainInstance() {
      return this.GetDataGrid(this.facilityInfoRef)
    },
    getReceiptInstance() {
      return this.GetDataGrid(this.receiptInfoRef)
    },
    getReleaseInstance() {
      return this.GetDataGrid(this.releaseInfoRef)
    },
  },
  beforeCreate() {},
  created() {
    const facCodeData = {
      comCode: getComCode(),
    }
    getFacCode(facCodeData).then((res) => {
      res.list.forEach((item) => {
        this.factoryList.push({
          value: item.facCode,
          text: item.facName,
        })
      })
      this.schFacCode = res.list[0].facCode
    })
    const stockCode = {
      comCode: getComCode(),
      facCode: 'FAC01',
    }
    getWarehouseLocInfoData(stockCode).then((res) => {
      res.list.forEach((item) => {
        this.stockCodeList.push({
          value: item.locCode,
          text: item.locName,
        })
      })
    })
    const jobType = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'JOB_TYPE',
    }
    const currCode = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'CURR_CODE',
    }
    const spareType = {
      comCode: getComCode(),
      codegr: 'EQP',
      code: 'SPARE_TYPE'
    }
    Promise.all([getBas0011Detail(jobType), getBas0011Detail(currCode), getBas0011Detail(spareType)]).then((res) => {
      res[0].list.forEach((item) => {
        this.jobTypeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })
      res[1].list.forEach((item) => {
        this.currCodeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })
      res[2].list.forEach((item) => {
        this.spareTypeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })
    })
  },
  methods: {
    onEditorPreparing(e){
      if(e.dataField == 'qty' || e.dataField == 'price'){
        var data = e.row.data
        if(e.value != null){
          data.amount = data.qty * data.price
          console.log('t : ',e)
        }else{
          console.log('e',e)
          if(e.dataField == 'qty'){
            data.qty = "0"
          }else{
            data.price = "0"
          }
          e.value = 0
        }
      }
    },
    dateInput(e) {
      this.sDate = e
      this.sDateCal = false
      this.$refs.sDateCal.save(e)
      if (this.sDate > this.eDate) {
        this.eDate = this.sDate
      }
    },
    dateInput2(e) {
      if (this.sDate === '') {
        return
      }
      this.eDate = e
      this.eDateCal = false
      this.$refs.eDateCal.save(e)
    },
    btnSearch() {
      this.facilityInfo = []
      this.openLoading('searching')
      const searchData = {
        comCode: getComCode(),
        facCode: this.schFacCode == null ? '' : this.schFacCode.toString(),
        jobType: this.schJobType == null ? '' : this.schJobType.toString(),
        partNo: this.partNo == null ? '' : this.partNo.toString(),
      }
      getMainList(searchData)
        .then((res) => {
          if (res.success) {
            this.facilityInfo = res.list
          }
        })
        .finally(() => {
          this.endLoading()
          this.getMainInstance.option('focusedRowIndex', 0)
          this.mainFocusedData = this.facilityInfo[0]
          this.tabChange(this.tabsNo)
          this.getMainInstance.saveEditData()
        })
    },
    itemRowClick(e) {
      if (e.rowIndex >= 0 && e.rowType == 'data') {
        this.mainFocusedData = e.data
        this.tabChange(this.tabsNo)
      }
    },
    tabChange(e) {
      this.tabsNo = e
      if (e == '0') {
        this.receiptInfo = []
        this.getReceiptDetailList()
      } else if (e == '1') {
        this.releaseInfo = []
        this.getDeliDetailList()
      }
    },
    getReceiptDetailList() {

      this.getReceiptInstance.clearSelection()
      this.receiptInfo = []
      const searchData = {
        comCode: getComCode(),
        facCode: this.mainFocusedData.facCode,
        partNo: this.mainFocusedData.partNo,
        spareType: '10',
        frRegiDate: this.sDate,
        toRegiDate: this.eDate
      }
      getReceiptDetailList(searchData).then(res => {
        if (res.success) {
          this.receiptInfo = res.list
        }
      })
    },
    getDeliDetailList() {
      
      this.getReleaseInstance.clearSelection()
      this.releaseInfo = []
      const searchData = {
        comCode: getComCode(),
        facCode: this.mainFocusedData.facCode,
        partNo: this.mainFocusedData.partNo,
        spareType: '20',
        frRegiDate: this.sDate,
        toRegiDate: this.eDate
      }
      getDeliDetailList(searchData).then(res => {
        if (res.success) {
          this.releaseInfo = res.list
        }
      })
    },
    btnAdd(type) {
      if (type === 'receipt') {
        let newRow = {
          id: this.receiptInfo.length + 1,
          comCode: this.mainFocusedData.comCode,
          facCode: this.mainFocusedData.facCode,
          regiDate: getCurrentDate(),
          spareType: '10',
          partNo: this.mainFocusedData.partNo,
          qty: 0,
          price: this.mainFocusedData.price == '' || this.mainFocusedData.price == null ? '0' : this.mainFocusedData.price,
          stockCode: this.mainFocusedData.stockCode,
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          gubun: '입고',
          __created__: true,
          __modified__: false,
        }
        this.getReceiptInstance.newRow(newRow)
        this.getReceiptInstance.selectRows(newRow.id, true)
        this.getReceiptInstance.option('focusedRowIndex', -1)
        this.getReceiptInstance.saveEditData()
      } else if (type === 'deli') {
        let newRow = {
          id: this.releaseInfo.length + 1,
          comCode: this.mainFocusedData.comCode,
          facCode: this.mainFocusedData.facCode,
          regiDate: getCurrentDate(),
          spareType: '20',
          partNo: this.mainFocusedData.partNo,
          qty: 0,
          price: this.mainFocusedData.price == '' || this.mainFocusedData.price == null ? '0' : this.mainFocusedData.price,
          stockCode: this.mainFocusedData.stockCode,
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          gubun: '출고',
          __created__: true,
          __modified__: false,
        }
        this.getReleaseInstance.newRow(newRow)
        this.getReleaseInstance.selectRows(newRow.id, true)
        this.getReleaseInstance.option('focusedRowIndex', -1)
        this.getReleaseInstance.saveEditData()
      }
    },
    async btnSave(type) {
      if (type === 'receipt') {
        this.getReceiptInstance.saveEditData()
        let selectedDetailRows = await this.getReceiptInstance.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        for (var row of selectedDetailRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }

        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          (current) => {
            this.openLoading()
            this.getReceiptInstance.beginUpdate()
            saveDetailInfo(selectedDetailRows)
              .then((res) => {
                this.btnSearch()
                let message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch((error) => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.getReceiptInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (type === 'deli') {
        this.getReleaseInstance.saveEditData()
        let selectedDetailRows = await this.getReleaseInstance.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        for (var row of selectedDetailRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }

        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          (current) => {
            this.openLoading()
            this.getReleaseInstance.beginUpdate()
            saveDetailInfo(selectedDetailRows)
              .then((res) => {
                this.btnSearch()
                let message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch((error) => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.getReleaseInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    btnExcel(type) {
      if (type === 'main') {
        let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('facilityInfo')) // table id를 넣어주면된다

        workSheet['!cols'] = [{width: 10},{width: 10},{width: 12},{width: 24},{width: 10},{width: 10},{width: 10},{width: 11},{width: 12},{width: 11},{width: 12},{width: 24},{width: 12},{width: 11}]
        const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
        this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example') // 시트 명명, 데이터 지정
        this.$xlsx.writeFile(workBook, '예비품 정보.xlsx') // 엑셀파일 만듬
      } else if (type === 'receipt') {
        let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('receiptInfo')) // table id를 넣어주면된다

        workSheet['!cols'] = [{width: 8},{width: 11},{width: 12},{width: 15},{width: 10},{width: 11},{width: 24},{width: 11},{width: 12},{width: 12},{width: 12},{width: 12}]
        const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
        this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example') // 시트 명명, 데이터 지정
        this.$xlsx.writeFile(workBook, '입고내역.xlsx') // 엑셀파일 만듬
      } else if (type === 'deli'){
        let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('releaseInfo')) // table id를 넣어주면된다

        workSheet['!cols'] = [{width: 8},{width: 11},{width: 12},{width: 15},{width: 10},{width: 11},{width: 24},{width: 11},{width: 12},{width: 12},{width: 12},{width: 12}]
        const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
        this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example') // 시트 명명, 데이터 지정
        this.$xlsx.writeFile(workBook, '출고내역.xlsx') // 엑셀파일 만듬
      }
    },
  },
}
</script>
<style scoped>
</style>