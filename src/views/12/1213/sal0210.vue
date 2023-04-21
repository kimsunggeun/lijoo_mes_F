
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="facCodeSelect"
                    :label="$t('facName')"
                    :items="facCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('custName')"
                    v-model="custName"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partName')"
                    v-model="partName"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="itemTypeList"
                    v-model="itemTypeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('itemTypeNm')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="partTypeList"
                    v-model="partTypeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('partTypeNm')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('ordNo')"
                    v-model="ordNo"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="ordStateList"
                    v-model="ordStateSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('ordState')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <!-- 수주일 선택 -->
                <v-col cols="2">
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
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('ordDate2')"
                        v-model="startDate"
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
                      v-model="startDate"
                      no-title 
                      @input="dateInput"
                    />
                  </v-menu>
                </v-col>
                <!-- ~ -->
                <v-col cols="2">
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
                      <v-text-field
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('endDate')"
                        v-model="endDate"
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
                      v-model="endDate"
                      :min="startDate"
                      no-title
                      scrollable
                      @input="dateInput2"
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2 pr-2">
        <i-card-vertical headerTitle="orderProgressStatus" :useBtnList="['btnExcel']" @btnExcel="btnExcel()">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="mainGrid"
                  class="listBox03"
                  :ref="mainGridRef"
                  :data-source="mainGrid"
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
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  column-resizing-mode="widget"
                >
                  <DxColumn data-field="facCode" :allow-editing="false" :caption="$t('facName')" width="auto" data-type="string" alignment="left">
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="ordNo"
                    :caption="$t('ordNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="no" :caption="$t('ordTurn')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="ordDate" :caption="$t('ordDate2')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="custName" :caption="$t('custName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="deliDate"
                    :caption="$t('deliDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="ordState" :allow-editing="false" :caption="$t('ordState')" width="auto" data-type="string" alignment="center">
                    <DxLookup :data-source="ordStateList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="itemType"
                    :caption="$t('itemTypeNm')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partType"
                    :caption="$t('partTypeNm')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partSpec" :caption="$t('partSpec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="partUnit"
                    :caption="$t('partUnit')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="planQty"
                    :customize-text="customizeText"
                    :caption="$t('planQty')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="outQty"
                    :customize-text="customizeText"
                    :caption="$t('outQty')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="qty"
                    :customize-text="customizeText"
                    :caption="$t('qty')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="nowQty"
                    :customize-text="customizeText"
                    :caption="$t('nowQty')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="price"
                    :customize-text="customizeText"
                    :caption="$t('price')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="amount"
                    :customize-text="customizeText"
                    :caption="$t('amount')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!--- 옵션-->
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="autoExpandAll" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSummary>
                    <DxGroupItem column="OrderNumber" summary-type="count" display-format="{0} orders" />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="amount"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="price"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="qty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="nowQty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="outQty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="planQty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem column="amount" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="price" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="qty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="nowQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="outQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="planQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                  </DxSummary>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import themes from 'devextreme/ui/themes'
import {
  DxDataGrid,
  DxColumn,
  DxLookup,
  DxGroupItem,
  DxSummary,
  DxGrouping,
  DxGroupPanel,
  DxSortByGroupSummaryInfo,
  DxTotalItem,
} from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import baseview from '@/components/base/baseview.vue' // base page 추가

import notify from 'devextreme/ui/notify' // message
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getFactoryInfoData } from '@/api/view/bas0030'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'
import { getCmChildCode } from '@/api/system/cmCodeManage' //공통코드
import { getCustomName } from '@/api/view/bas0310'
import { getSal0210 } from '@/api/view/sal0210'
export default {
  name: 'shptProgStatInfo',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxTotalItem,
    DxGrouping,
    DxLookup,
    DxSummary,
    DxGroupItem,
    DxGroupPanel,
  },
  data() {
    return {
      //콤보박스
      facCodeList: [],
      custCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      ordStateList: [],
      startDate: getDateFormat(getPreMonth(1)),
      endDate: getDateFormat(new Date()),
      menu1: '',
      menu2: '',

      //검색조건
      facCodeSelect: '',
      custCodeSelect: '',
      partName: '',
      itemTypeSelect: '',
      partTypeSelect: '',
      custName: '',
      ordNo: '',
      ordStateSelect: '',

      //그리드
      mainGrid: [],

      //ref
      mainGridRef: 'mainGridRef',
      autoExpandAll: true,
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
    }
  },

  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
  },

  methods: {
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },

    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
      console.log("startDate:::", this.e)
    },

    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
      console.log("endDate:::", this.e)
    },    

    btnSearch() {
      this.doSearhMainGrid()
    },

    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '수주진행현황.xlsx') // 엑셀파일 만듬
    },

    async comboListSet() {
      let cmChildRes = await getCmChildCode({
        comCode: getComCode(),
        code: 'ORD_STATE,ITEM_TYPE,PART_TYPE',
      })
      let custRes = await getCustomName({
        comCode: getComCode(),
        custCode: '',
        custType: '',
      })
      let facRes = await getFactoryInfoData({ comCode: getComCode() })
      facRes.list.forEach((e) => {
        this.facCodeList.push({
          text: e.facName,
          value: e.facCode,
        })
      })
      this.facCodeSelect = this.facCodeList[0].value
      custRes.list.forEach((e) => {
        this.custCodeList.push({
          value: e.custCode,
          text: e.custName,
        })
      })
      cmChildRes.list
        .filter((word) => word.code === 'ORD_STATE')
        .forEach((e) => {
          this.ordStateList.push({
            value: e.sysCode,
            text: e.sysName,
          })
        })
      cmChildRes.list
        .filter((word) => word.code === 'ITEM_TYPE')
        .forEach((e) => {
          this.itemTypeList.push({
            value: e.sysCode,
            text: e.sysName,
          })
        })
      cmChildRes.list
        .filter((word) => word.code === 'PART_TYPE')
        .forEach((e) => {
          this.partTypeList.push({
            value: e.sysCode,
            text: e.sysName,
          })
        })
    },

    async doSearhMainGrid(event) {
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect,
          custName: this.custName,
          partName: this.partName,
          itemType: this.itemTypeSelect,
          partType: this.partTypeSelect,
          ordNo: this.ordNo,
          ordState: this.ordStateSelect,
          startDate: this.startDate,
          endDate: this.endDate
        }
        this.openLoading()
        let cnt = 0
        let resData = await getSal0210(params)
        resData.list.forEach((e) => {
          e.id = cnt++
        })
        this.mainGrid = resData.list
        this.gridMainInstance.saveEditData()
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        this.endLoading()
      }
    },
  },

  beforeMount() {

  },

  mounted() {
    this.comboListSet().then(() => {
      this.doSearhMainGrid()
    })
  },
}
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar {
  display: block !important;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-after {
  display: none !important;
}
</style>
