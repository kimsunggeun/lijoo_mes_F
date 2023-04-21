<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{$t('plannedShipment')}}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText3"><v-icon class="mr-1 green_icon">$calendar_clock</v-icon>{{
          display.time.year +
          '-' +
          display.time.month +
          '-' +
          display.time.day +
          ' [' +
          display.time.week +
          '] ' +
          display.time.hour +
          ':' +
          display.time.minutes +
          ':' +
          display.time.second
        }}</span>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn width="40" height="40" color="RefreshBtn" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px"> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- 위 그리드 -->
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical headerTitle="ShipmentInformation">
          <template v-slot:body>
            <v-row no-gutters class="center pa-4 mr-0" align="center">
              <v-col cols="2">
                <v-menu
                  ref="outDateCal"
                  v-model="outDateCal"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('outDate')"
                      v-model="fromOutDate"
                      dense
                      outlined
                      readonly
                      class="mx-1"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker 
                    v-model="fromOutDate" 
                    no-title 
                    @input="updateOutDate"
                    :day-format="(date) => { return new Date(date).getDate(); }"
                  />
                </v-menu>
              </v-col>
              <v-col cols="2">
                <v-autocomplete               
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mx-1"
                  v-model="custCodeSelect"
                  :label="$t('custName')"
                  :items="custCodeList"
                  item-text="custName"
                  item-value="custCode"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                  @change="updateCustCode"
                />
              </v-col>
              <v-col cols="2">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mx-1"
                  v-model="ordNoSelect"
                  :label="$t('ordNo')"
                  :items="ordNoList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="5"/>
              <v-col cols="1">
                <v-btn                         
                  width="125" 
                  height="30" 
                  color="#2c49b8" 
                  class="ml-4" 
                  @click="doSearchOrderStatus()"
                >
                <span style="color:#fff">{{ $t('search') }}</span>
                </v-btn>
              </v-col>  
            </v-row>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="topGrid"
                  class="doubleListBox06"
                  :ref="topGridRef"
                  :data-source="topGrid"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :column-auto-width="false"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                  @cellClick="itemRowClickOrderStatus"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumnFixing :enabled="true" />
                  <DxColumn
                    data-field="id"
                    caption="No"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="custName"
                    :caption="$t('custName')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="ordNo"
                    :caption="$t('ordNo')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="no"
                    :caption="$t('ordTurn')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="outDate"
                    :caption="$t('outDate')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="partType"
                    :caption="$t('suite')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    width="auto"
                    alignment="left"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    data-type="string"
                    width="auto"
                    alignment="left"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="orderQty"
                    :caption="$t('orderVolume')"
                    data-type="number"
                    format="#,##0"
                    width="auto"
                    alignment="right"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="nowQty"
                    :caption="$t('nowQty')"
                    data-type="number"
                    format="#,##0"
                    width="auto"
                    alignment="right"
                    :allow-editing="false"
                    :visible="true"
                  />
                    <DxColumn
                      data-field="outQty"
                      :caption="$t('outQty')"
                      data-type="number"
                      format="#,##0"
                      width="auto"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                    />
                  <DxColumn
                    data-field="price"
                    :caption="$t('price')"
                    data-type="number"
                    format="#,##0"
                    width="auto"
                    alignment="right"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="amount"
                    :caption="$t('amount')"
                    data-type="number"
                    format="#,##0"
                    width="auto"
                    alignment="right"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="outInspYn"
                    :caption="$t('outInsp')"
                    data-type="boolean"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    edit-cell-template="checkBoxEditor"
                    :visible="true"
                  />
                  <DxColumn 
                    data-field="makeDate" 
                    :caption="$t('makeDate')" 
                    width="auto" 
                    data-type="date" 
                    alignment="center" 
                    :allow-editing="false" 
                    format="yyyy-MM-dd" 
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
                    data-field="editDate" 
                    :caption="$t('editDate')" 
                    width="auto" 
                    data-type="date" 
                    alignment="center" 
                    :allow-editing="false" 
                    format="yyyy-MM-dd" 
                  />
                  <DxColumn 
                    data-field="editor" 
                    :caption="$t('editor')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                  />  
                  <DxColumn/>
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection
                    select-all-mode="allPages"
                    mode="single"
                  />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <!-- 아래 그리드 -->   
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical headerTitle="ShippingSelection">
          <template v-slot:body>
            <v-row no-gutters>
              <v-col cols="12">
                <v-layout column>
                  <v-row no-gutters class="center pa-4 mr-0">
                    <v-col cols="2">
                      <v-autocomplete
                        class="mx-1 ml-2"
                        :label="$t('whName')"
                        v-model="locCodeSelect"
                        :items="locCodeList"
                        item-text="text"
                        item-value="value"
                        dense
                        outlined
                        clearable
                        @change="updateLocCode"
                      />
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        class="lotDetail-field"
                        :label="$t('lotDetail')"
                        v-model="curSelectLotDetail"
                        dense
                        outlined
                        clearable
                        @input="scanLotDetail"
                      />
                    </v-col>
                    <v-col cols="7">

                    </v-col>
                    <v-col cols="1">
                      <v-btn 
                        width="125" 
                        height="30" 
                        color="#2c49b8" 
                        class="ml-4 mr-4" 
                        @click="btnRegistShipment()"
                      >
                        <span style="color:#fff">{{$t('shipment')}}</span>
                      </v-btn>
                    </v-col>   
                  </v-row>  
                </v-layout>
              </v-col>
            </v-row>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="bottomGrid"
                  class="doubleListBox05"
                  :ref="bottomGridRef"
                  :data-source="bottomGrid"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :column-auto-width="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                  @cellClick="itemRowClickInventoryStatus"
                  @cell-prepared="onCellPrepared"
                  @content-Ready="addMenuItems"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumnFixing :enabled="true" />
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="locCode"
                    :caption="$t('locCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locName"
                    :caption="$t('locName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="stockType"
                    :caption="$t('stockType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn 
                    data-field="lotNo"
                    :caption="$t('lotNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />                  
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('lotDetail')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="stockQty"
                    caption="재고량"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="outQty"
                    :caption="$t('outQty')"
                    data-type="number"
                    format="#,##0"
                    width="auto"
                    alignment="right"
                    :allow-editing="true"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="eventCd"
                    :caption="$t('eventCd')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />    
                    <DxColumn 
                      data-field="makeDate" 
                      :caption="$t('makeDate')" 
                      width="auto" 
                      data-type="date" 
                      alignment="center" 
                      :allow-editing="false" 
                      format="yyyy-MM-dd" 
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
                      data-field="editDate" 
                      :caption="$t('editDate')" 
                      width="auto" 
                      data-type="date" 
                      alignment="center" 
                      :allow-editing="false" 
                      format="yyyy-MM-dd" 
                    />
                    <DxColumn 
                      data-field="editor" 
                      :caption="$t('editor')" 
                      width="auto" 
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false" 
                    />
                    <DxColumn/>          
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection
                    select-all-mode="allPages"
                    mode="multiple"
                  />
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

import dayjs from 'dayjs'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import iCardVertical from '@/components/common/iCardVertical.vue'

import ISystemBar from '@/components/common/iSystemBar.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import DxDateBox from 'devextreme-vue/date-box'

import { DxDataGrid, DxColumn, DxScrolling, DxColumnFixing, DxGroupItem, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid'

import notify from 'devextreme/ui/notify' // message
import themes from 'devextreme/ui/themes'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getWorkDate } from '@/api/view/bas0130'

import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getSal0120, createSal0120 } from '@/api/view/sal0120'

import { getComCode,getUserId } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getCompany } from '@/api/system/companyManage'
import { getFacName } from '@/api/view/sal0120'
import { getCustCodeName } from '@/api/view/bas0044'
import { getPop0410OrderNo, getPop0410PlannedShipmentInfo } from '@/api/view/pop0410'
import { getMat0210Detail } from '@/api/view/mat0021'
import { getWarehouseLocInfoData } from '@/api/view/bas0033'

export default {
  name: 'pop0410',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxColumnFixing, 
  },

  data() {
    return {

      //유저정보
      userData: {
        company: getComCode(),
        factory: {
          code: '',
        },
        name: '',
      },

      //화면표시 데이터
      display: {
        company: '',
        factory: '',
        time: {
          year: '00',
          month: '00',
          day: '00',
          week: '',
          hour: '00',
          minutes: '00',
          second: '00',
        },
      },

      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000, // 지연시간
      },

      //출하일 관련
      outDateCal: false,

      //콤보박스 관련
      facCodeList: [],
      ordNoList: [],
      custCodeList: [],
      locCodeList: [],

      //검색관련
      facCodeSelect: '',
      ordNoSelect: '',      
      custCodeSelect: '',
      locCodeSelect: '',

      //현재 선택된 전산번호
      curSelectLotDetail: '',

      addHeaderArray: [],
      addArray: [],
      holyArray: [],
      totalOption: [],

      fromOutDate: getDateFormat(new Date()),
      toOutDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7))),

      //그리드 ref
      topGridRef: 'topGridRef',
      bottomGridRef: 'bottomGridRef',

      //그리드 관련
      topGrid: [],
      bottomGrid: [],

      //그리드 클릭 데이터
      itemGridOrderStatusClickData: null,
      itemGridInventoryStatusClickData: null,

      //그리드 선택관련 데이터
      realSelectedIndexList: [],

      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      //일단 남겨둠..
      itemTypeList: [],
      partTypeList: [], 
      totalTarget: [],

      itemTypeSelect: '',
      partTypeSelect: '',
      partNo: '',
      custName: '',
      ilNoSelect: '',

    }
  },

  created() {
    this.lookupList()
  },

  beforeMount() {

  },

  mounted() {
    this.dataSettting()
    this.nowTime()
  },

  destroyed() {
    clearInterval(this.timeFunc)
  },

  watch: {
    fromOutDate: function (value) {
      if (new Date(value) > new Date(this.toOutDate)) {
        this.toOutDate = value
      }
    },
  },

  computed: {
    topGridInstance() {
      return this.GetDataGrid(this.topGridRef)
    },

    bottomGridInstance() {
      return this.GetDataGrid(this.bottomGridRef)
    },
  },

  methods: {
    nowTime() {
      this.timeFunc = setInterval(() => {
        let date = new Date()
        this.display.time.year = date.getFullYear().toString().substr(2)
        this.display.time.month = String(date.getMonth() + 1).padStart(2, '0')
        this.display.time.day = String(date.getDate()).padStart(2, '0')
        this.display.time.week = this.$t(`weekArray[${date.getDay()}]`)
        this.display.time.hour = String(date.getHours()).padStart(2, '0')
        this.display.time.minutes = String(date.getMinutes()).padStart(2, '0')
        this.display.time.second = String(date.getSeconds()).padStart(2, '0')
      }, this.timeCounter.delay)
    },
    //새로고침
    async totalRefresh() {
      notify('refresh', 'success', 1500)
    },

    async dataSettting() {
      try {
        let params = {
          comCode: getComCode(),
          userId: getUserId(),
        }

        let resData = await getCompany(params)
        let userFacData = await getUser(params)
        let factoryList = await getFactoryInfoData(params)
        this.userData.factory.code = userFacData.list[0].facCode
        // this.userData.name = userFacData.list[0].userName
        this.display.company = resData.list[0].comName
        let factoryFilterData = factoryList.list.filter((word) => word.facCode === this.userData.factory.code)
        this.display.factory = factoryFilterData[0].facName
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },

     //LookUp 관련
    async lookupList() {
      //공장명
      const facCon = {
        comCode: getComCode()
      }
      //거래처명
      const custCon = {
        comCode: getComCode()
      }

      await Promise.all([getFacName(facCon), getCustCodeName(custCon)]).then(res => {
        //공장
        this.facCodeList = res[0].list
        this.facCodeSelect = this.facCodeList[0].facCode
        //거래처
        this.custCodeList = res[1].list

        const locCon = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        whCode: null,
        workCode: null,
        pathCode: null        
        }

        getWarehouseLocInfoData(locCon).then(res2 => {
          //창고위치
          this.locCodeList = []
          res2.list.forEach((item, i) => {
            this.locCodeList.push({
              value: item.locCode,
              text: item.locName
            })
          })        
        })
      })

      this.doSearchOrdNo()
    },

    updateOutDate() {
      this.outDateCal = false
      this.doSearchOrdNo()
    },

    updateCustCode() {
      this.doSearchOrdNo()
    },


    updateLocCode() {
      this.doSearchInventoryStatus()
    },

    itemRowClickOrderStatus(e) {
      if (e.rowIndex !== -1) {
        this.changeRowClickOrderStatus(e.data)
      }
    },

    itemRowClickInventoryStatus(e) {
      // if (e.rowIndex !== -1 && e.rowType === 'data') {
      //   this.funcRealSelectedIndexList(e.rowIndex, true)
      //   e.component.deselectAll()
      //   e.component.selectRows(this.realSelectedIndexList)
      // } 
    },

    addMenuItems(e) {
      // this.totalTarget = e

      // if (!e.component.__summaryIsNotAdded) {
      //   e.component.option('summary.totalItems', this.totalOption)
      //   e.component.__summaryIsNotAdded = true
      // }
    },

    onCellPrepared(e) {
      // let found = this.holyArray.find((item) => item.date === e.column.dataField)
      // if (found !== undefined && e.rowType === 'header') {
      //   if (found.weekend === 6) {
      //     e.cellElement.style.color = 'blue'
      //   } else {
      //     e.cellElement.style.color = 'red'
      //   }
      // }
    },

    // customizeText(cellInfo) {
    //   return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    // },

    // async btnSave() {
    //   let message = ''
    //   this.bottomGridInstance.saveEditData()
    //   let selectedMainRows = await this.bottomGridInstance.getSelectedRowsData()
    //   if (!selectedMainRows.length) {
    //     this.vToastify(this.$t('SelectCheck'), 'warn')
    //     return
    //   }

    //   this.vToastifyPrompt(
    //     this.$t('doSaveData'),
    //     'info',
    //     (current) => {
    //       this.openLoading()
    //       this.bottomGridInstance.beginUpdate()
    //       createSal0110(selectedMainRows, true)
    //         .then((res) => {
    //           message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
    //           notify(this.$t(message), 'success', 1500)
    //         })
    //         .catch((error) => {
    //           notify(error, 'error', 1500)
    //         })
    //         .finally(() => {
    //           this.bottomGridInstance.endUpdate()
    //           this.bottomGridInstance.clearSelection()
    //           this.bottomGridInstance.saveEditData()
    //           this.endLoading()
    //         })
    //     },
    //     null,
    //     true
    //   )
    // },

    // comboListSet() {
    //   let params = {
    //     comCode: getComCode(),
    //     code: 'ITEM_TYPE,PART_TYPE,',
    //   }

    //   getCmChildCode(params).then((res) => {
    //     res.list
    //       .filter((word) => word.code === 'ITEM_TYPE')
    //       .forEach((e) => {
    //         this.itemTypeList.push({
    //           value: e.sysCode,
    //           text: e.sysName,
    //         })
    //       })

    //     res.list
    //       .filter((word) => word.code === 'PART_TYPE')
    //       .forEach((e) => {
    //         this.partTypeList.push({
    //           value: e.sysCode,
    //           text: e.sysName,
    //         })
    //       })
    //   })

    //   getFactoryInfoData({ comCode: getComCode() })
    //     .then((res) => {
    //       res.list.forEach((e) => {
    //         this.facCodeList.push({
    //           text: e.facName,
    //           value: e.facCode,
    //         })
    //       })
    //     })
    //     .finally(() => {
    //       this.facCodeSelect = this.facCodeList[0].value
    //     })
    // },

    btnSelectWareHouse() {
      this.doSearchInventoryStatus()
    },

    scanLotDetail() {
      if (this.isEmpty(this.curSelectLotDetail)) {
        return
      }

      this.doFindLotDetailData()
    },

    async btnRegistShipment() {
      let selectedRegistRows = await this.bottomGridInstance.getSelectedRowsData()
      if(selectedRegistRows.length === 0){
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        '선택한 항목들을 출하 하시겠습니까?',
        'info',
        current => {
          this.doRegistShipment()
        },
        null,
        true
      )     
    },

    getDateFormat(date) {
      return getDateFormat(date)
    },

    doSearchOrdNo() {
      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        custCode: this.custCodeSelect,
        outDate: this.fromOutDate
      }

      this.ordNoList = []

      getPop0410OrderNo(searchData).then(res => {
        res.list.forEach((item, i) => {
          this.ordNoList.push({
            text: item.ordNo,
            value: item.ordNo
          })
        })
      })
    },

    doSearchOrderStatus() {
      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        custCode: this.custCodeSelect,
        ordNo: this.ordNoSelect,
        outDate: this.fromOutDate
      }

      this.topGridInstance.clearSelection()
      this.topGrid = []
      this.bottomGrid = []

      getPop0410PlannedShipmentInfo(searchData).then(res => {
        if (res.success) {
          if (res.list.length < 1) {
            return
          }

          this.topGrid = res.list

          //if (this.isEmpty(this.itemGridOrderStatusClickData) === true) {
            this.itemGridOrderStatusClickData = this.topGrid[0]
          //}

          this.doSearchInventoryStatus()
        }
      })      
    },

    doSearchInventoryStatus() {
      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        locCode: this.locCodeSelect,
        partNo: this.itemGridOrderStatusClickData.partNo
      }
      this.bottomGridInstance.clearSelection()
      this.bottomGrid = []

      getMat0210Detail(searchData).then(res => {
        if (res.success) {
          if (res.list.length < 1) {
            return
          }

          let newId = 1
          for (let i = 0; i < res.list.length; ++i) {
            if (parseInt(res.list[i].stockQty) > 0) {
              res.list[i].id = newId++
              res.list[i].outQty = res.list[i].stockQty
              this.bottomGrid.push(res.list[i])
            }
          }
        }
      })
    },

    doSelectInventoryData() {
      if (this.isEmpty(this.itemGridInventoryStatusClickData)) {
        return
      }

      this.curSelectLotDetail = this.itemGridInventoryStatusClickData.lotDetail
    },

    doFindLotDetailData() {
      if (this.bottomGrid.length > 0) {
        for (let i = 0; i < this.bottomGrid.length; ++i) {
          if (this.curSelectLotDetail === this.bottomGrid[i].lotDetail) {
            this.funcRealSelectedIndexList(i, false)
            this.bottomGridInstance.deselectAll()
            this.bottomGridInstance.selectRows(this.realSelectedIndexList)
            break
          }
        }
      }
    },

    async doRegistShipment() {
      this.bottomGridInstance.saveEditData()
      let selectedRegistRows = await this.bottomGridInstance.getSelectedRowsData()

      if (selectedRegistRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
        return    
      }
      let totalOutQty = 0
      let orderNowQty = parseInt(this.itemGridOrderStatusClickData.nowQty)

      for (let i = 0; i < selectedRegistRows.length; ++i) {
        totalOutQty += parseInt(selectedRegistRows[i].outQty)
      }

      if (totalOutQty > orderNowQty) {
        this.vToastify('선택한 수량이 수주잔량보다 많습니다', 'warn')
        return
      }
      
      let arrInsertData = []
      let inputIlNoCount = 1
      let todayIlNoString = dayjs(new Date()).format('YYMMDD')
      let curOutNo = 1
      // let todayOutLotDetailCount = 0
      // let todayOutLotDetailString = 'OUT' + dayjs(new Date()).format('YYMMDD')

      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        ordNo: null,
        ordTurn: null,
        ilNo: null,
        no: null,
        custCode: null,
        startDate: getCurrentDate(),
        endDate: getCurrentDate()    
      }

      getSal0120(searchData)
        .then(async res => {
          const calInputIlNoCount = new Promise((resolve) => {
            if (res.list.length > 0) {
              for (var i = 0; i < res.list.length; ++i) {
                let ilNo = parseInt(res.list[i].ilno.slice(-4))
                if (ilNo >= inputIlNoCount) {
                  inputIlNoCount = ilNo + 1
                }
                
              }
              
            }
            resolve('complete')
          })

          const result = await calInputIlNoCount

          for (var i = 0; i < selectedRegistRows.length; ++i) {
            const insertData = {
              id: i,
              comCode: getComCode(),
              facCode: this.itemGridOrderStatusClickData.facCode,
              ordNo: this.itemGridOrderStatusClickData.ordNo,
              ordTurn: this.itemGridOrderStatusClickData.no,
              ilNo: todayIlNoString + this.fillZero(4, inputIlNoCount),
              no: this.itemGridOrderStatusClickData.no,
              outDate: dayjs(new Date()).format('YYYY-MM-DD'),
              outInspYn: this.itemGridOrderStatusClickData.outInspYn,
              custCode: this.itemGridOrderStatusClickData.custCode,
              partNo: selectedRegistRows[i].partNo,
              lotNo: selectedRegistRows[i].lotNo,
              lotDetail: selectedRegistRows[i].lotDetail,
              locCode: selectedRegistRows[i].locCode,              
              stockQty: selectedRegistRows[i].stockQty,
              qty: selectedRegistRows[i].stockQty,
              outQty: selectedRegistRows[i].outQty,
              price: this.itemGridOrderStatusClickData.price,
              amount: parseInt(this.itemGridOrderStatusClickData.price) * parseInt(selectedRegistRows[i].outQty),
              closeMonth: null,
              closeYn: 'N',
              confirmYn: 'N',
              remark: null,
              makeDate: null,
              maker: getUserId(),
              editDate: null,
              editor: getUserId(),
              __created__: true,
              __modified__: false
            }
            if(insertData.outQty < 1){
              notify("출하량은 1개 이상이어야 합니다", 'error', 1500)
              return
            }
            if (insertData.stockQty < insertData.outQty) {
              notify("출하량은 재고량보다 많을 수 없습니다", 'error', 1500)
              return
            }
            arrInsertData.push(insertData)
            console.log("출하량 확인",insertData)
          }
          createSal0120(arrInsertData)
            .then(res => {
              notify(this.$t('Saved'), 'success', 3000)
            })
            .catch(error1 => {
              notify(error1, 'error', 3000)
            })
            .finally(() => {
              this.bottomGridInstance.endUpdate()             
              this.doSearchOrderStatus()
            })
        })      
    },

    changeRowClickOrderStatus(data) {
      this.itemGridOrderStatusClickData = null

      if (data) {
        this.itemGridOrderStatusClickData = data
        this.doSearchInventoryStatus()
      } else {
        this.itemGridOrderStatusClickData = null
      }
    },

    changeRowClickInventoryStatus(data) {
      this.itemGridInventoryStatusClickData = null

      if (data) {
        this.itemGridInventoryStatusClickData = data
        // this.doSelectInventoryData()
      } else {
        this.itemGridInventoryStatusClickData = null
      }      
    },

    funcRealSelectedIndexList(index, isRemove) {
      let selectedIndex = index + 1
      const findIndex = this.realSelectedIndexList.find(x => x == selectedIndex)

      if (findIndex === undefined) {
      this.realSelectedIndexList.push(selectedIndex)
      } else if (isRemove === true){
        const removeIndex = this.realSelectedIndexList.indexOf(findIndex)

        if (removeIndex > -1)
          this.realSelectedIndexList.splice(removeIndex, 1)
      }
    },

    //남는 길이만큼 0으로 채움
    fillZero(fillLength, num) {
      let str = num.toString()

      if (str.length >= fillLength) {
        return str
      } else {
        return new Array(fillLength - str.length + 1).join('0') + str
      }
    },    

    // 내용이 비었는지 체크
    isEmpty(str) {
      if (typeof str == 'undefined' || str == null || str == '')
        return true
      else
        return false
    },

  },
}
</script>

<style scoped>
.lotDetail-field {
  text-align: center;
  font-weight: bold;
  font-size: 14pt;
}
.doubleListBox04 .dx-row-focused.dx-data-row {
  background-color: orange;
}
</style>