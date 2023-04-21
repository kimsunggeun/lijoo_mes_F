<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{ $t('otherRelease2') }}</span>
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
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pa-0">
        <i-card-vertical headerTitle="otherRelease">
          <template v-slot:body>
            <v-row no-gutters class="center pb-4 pt-4 mr-0" align="center">
              <v-col cols="2">
                <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mx-1" v-model="custCodeSelect"
                  :label="$t('custName')" :items="custCodeList" item-text="custName" item-value="custCode"
                  :prepend-inner-icon="'$search'" dense outlined clearable @change="updateCustCode" />
              </v-col>
              <v-col cols="2">
                <v-autocomplete class="pl-2" :label="$t('whName')" v-model="locCodeSelect" :items="locCodeList"
                  item-text="text" item-value="value" dense outlined clearable @change="updateLocCode" />
              </v-col>
              <v-col cols="2">
                <!-- 품번검색 -->
                <v-text-field class="pl-1" :prepend-inner-icon="'$search'" :label="$t('partNo')" v-model="partNoInput"
                  dense outlined color="primatry" clearable @input="updatePartNo" />
              </v-col>
              <v-col cols="5" />
              <v-col cols="1">
                <v-btn width="125" height="30" color="#2c49b8" class="ml-2" @click="doSearchMain()">
                  <span style="color:#fff">{{ $t('search') }}</span>
                </v-btn>
              </v-col>
            </v-row>
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
                  <v-row no-gutters class="center pa-2 mr-0">
                    <v-col cols="2">
                      <v-text-field class="lotDetail-field" :label="$t('lotDetail')" v-model="curSelectLotDetail" dense
                        outlined clearable @input="scanLotDetail" />
                    </v-col>
                    <v-col cols="9">
                    </v-col>
                    <v-col cols="1">
                      <v-btn width="125" height="30" color="#2c49b8" class="ml-4 mr-4" @click="btnRegistShipment()">
                        <span style="color:#fff">{{ $t('release') }}</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-layout>
              </v-col>
            </v-row>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid id="bottomGrid" class="doubleListBox11" :ref="bottomGridRef" :data-source="bottomGrid"
                  :remote-operations="false" :hover-state-enabled="true" :allow-column-resizing="true"
                  :column-auto-width="true" :allow-column-reordering="true" :row-alternation-enabled="true"
                  :show-borders="true" :width="grid.width" :show-row-lines="true" key-expr="id"
                  :focused-row-enabled="true" :column-hiding-enabled="false" @cellClick="itemRowClickInventoryStatus"
                  @cell-prepared="onCellPrepared" @content-Ready="addMenuItems">
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumnFixing :enabled="true" />
                  <DxColumn data-field="id" caption="No" width="auto" data-type="string" alignment="center"
                    :allow-editing="false" :visible="true" />
                  <DxColumn data-field="locCode" :caption="$t('locCode')" width="auto" data-type="string"
                    alignment="center" :allow-editing="false" :visible="false" />
                  <DxColumn data-field="locName" :caption="$t('locName')" width="auto" data-type="string"
                    alignment="center" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="stockType" :caption="$t('stockType')" width="auto" data-type="string"
                    alignment="center" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left"
                    :allow-editing="false" :visible="true" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string"
                    alignment="left" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center"
                    :allow-editing="false" :visible="true" />
                  <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string"
                    alignment="center" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="stockQty" caption="재고량" width="auto" data-type="number" format="#,##0"
                    alignment="right" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="outQty" :caption="$t('outQty')" data-type="number" format="#,##0" width="auto"
                    alignment="right" :allow-editing="true" :visible="true" :set-cell-value="setOutQty" />
                  <DxColumn data-field="price" caption="단가" width="auto" data-type="number" format="#,##0"
                    alignment="right" :allow-editing="true" :visible="true" :set-cell-value="setPrice" />
                  <DxColumn data-field="amount" caption="금액" width="auto" data-type="number" format="#,##0"
                    alignment="right" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="eventCd" :caption="$t('eventCd')" width="auto" data-type="number" format="#,##0"
                    alignment="center" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string"
                    alignment="center" :allow-editing="false" />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center"
                    :allow-editing="false" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string"
                    alignment="center" :allow-editing="false" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center"
                    :allow-editing="false" />
                  <DxColumn />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
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

import { getComCode, getUserId } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getCompany } from '@/api/system/companyManage'
import { getFacName } from '@/api/view/sal0120'
import { getCustCodeName, getItemCustomInfo } from '@/api/view/bas0044'
import { getPop0430, createPop0430, getItemListWithCustCode } from '@/api/view/pop0430'
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

      //콤보박스 관련
      facCodeList: [],
      ordNoList: [],
      custCodeList: [],
      locCodeList: [],

      //검색관련
      facCodeSelect: '',
      custCodeSelect: '',
      locCodeSelect: '',
      partNoInput: '',

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
            if (item.locName.includes('제품창고1')) {
              this.locCodeSelect = item.locCode
            }
          })
        })
        //this.doSearchInventoryStatus()
      })
    },

    updateCustCode() {

    },

    updateLocCode() {
      //this.doSearchInventoryStatus()
    },

    updatePartNo() {
      //this.doSearchInventoryStatus()
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

    scanLotDetail() {
      if (this.isEmpty(this.curSelectLotDetail)) {
        return
      }
      this.doFindLotDetailData()
    },

    async btnRegistShipment() {
      let selectedRegistRows = await this.bottomGridInstance.getSelectedRowsData()
      if (selectedRegistRows.length === 0) {
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
        false
      )
    },

    getDateFormat(date) {
      return getDateFormat(date)
    },

    doSearchMain() {
      this.doSearchInventoryStatus()
    },

    async doSearchInventoryStatus() {
      let ItemListSelectedCustCode = []
      if (this.isEmpty(this.custCodeSelect) == false) {
        const processGetItemList = new Promise((resolve, reject) => {
          const searchItemWithCustCode = {
            comCode: getComCode(),
            custCode: this.custCodeSelect
          }
          getItemListWithCustCode(searchItemWithCustCode).then(res => {
            if (res.success) {
              ItemListSelectedCustCode = res.list
              resolve('success')
            }
          })
        })
        const resultGetItemList = await processGetItemList
      }

      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        locCode: this.locCodeSelect,
        partNo: this.partNoInput
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
            if (this.isEmpty(this.custCodeSelect) === false && ItemListSelectedCustCode.length > 0) {
              if (ItemListSelectedCustCode.includes(res.list[i].partNo) == false)
                continue
            }
            if (parseInt(res.list[i].stockQty) > 0) {
              const searchResult = {
                id: newId++,
                comCode: res.list[i].comCode,
                facCode: res.list[i].facCode,
                locCode: res.list[i].locCode,
                locName: res.list[i].locName,
                stockType: res.list[i].stockType,
                eventCd: res.list[i].eventCd,
                partNo: res.list[i].partNo,
                partName: res.list[i].partName,
                stockQty: res.list[i].stockQty,
                outQty: res.list[i].stockQty,
                price: (Math.round(parseInt(res.list[i].stockAmount) / parseInt(res.list[i].stockQty))),
                amount: res.list[i].stockAmount,
                regiDate: res.list[i].regiDate,
                lotNo: res.list[i].lotNo,
                lotDetail: res.list[i].lotDetail,
                userFlag: res.list[i].userFlag,
                makeDate: res.list[i].makeDate,
                maker: res.list[i].maker,
                editDate: res.list[i].editDate,
                editor: res.list[i].editor
              }
              this.bottomGrid.push(searchResult)
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
      if (this.isEmpty(this.custCodeSelect)) {
        this.vToastify('거래처를 선택하여야만 합니다', 'warn')
        return
      }

      this.bottomGridInstance.saveEditData()
      let selectedRegistRows = await this.bottomGridInstance.getSelectedRowsData()

      if (selectedRegistRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
        return
      }

      let arrInsertData = []
      let inputIlNoCount = 1
      let todayIlNoString = dayjs(new Date()).format('YYMMDD')
      let curOutNo = 1

      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        custCode: null,
        partNo: null,
        startDate: getCurrentDate(),
        endDate: getCurrentDate()
      }

      getPop0430(searchData)
        .then(async res => {
          const calInputIlNoCount = new Promise((resolve, reject) => {
            if (res.list.length > 0) {
              for (var i = 0; i < res.list.length; ++i) {
                let ilNo = parseInt(res.list[i].ilNo.slice(-4))
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
              facCode: this.facCodeSelect,
              ilNo: todayIlNoString + this.fillZero(4, inputIlNoCount),
              no: curOutNo++,
              outDate: dayjs(new Date()).format('YYYY-MM-DD'),
              outInspYn: null,
              custCode: this.custCodeSelect,
              partNo: selectedRegistRows[i].partNo,
              lotNo: selectedRegistRows[i].lotNo,
              lotDetail: selectedRegistRows[i].lotDetail,
              locCode: selectedRegistRows[i].locCode,
              stockQty: selectedRegistRows[i].stockQty,
              outQty: selectedRegistRows[i].outQty,
              price: selectedRegistRows[i].price,
              amount: selectedRegistRows[i].amount,
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
            if (insertData.outQty < 1) {
              notify("출하량은 1개 이상이어야 합니다", 'error', 1500)
              return
            }
            arrInsertData.push(insertData)
          }

          createPop0430(arrInsertData)
            .then(res => {
              notify(this.$t('Saved'), 'success', 3000)
            })
            .catch(error1 => {
              notify(error1, 'error', 3000)
            })
            .finally(() => {
              this.doSearchInventoryStatus()
              this.bottomGridInstance.endUpdate()
            })
        })
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
      } else if (isRemove === true) {
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

    setOutQty(newData, value, currData) {
      if (currData.stockQty < value) {
        newData.outQty = currData.stockQty
        newData.amount = parseInt(currData.stockQty) * parseInt(currData.price)
      } else {
        newData.outQty = value
        newData.amount = parseInt(value) * parseInt(currData.price)
      }
    },

    setPrice(newData, value, currData) {
      newData.price = value
      newData.amount = parseInt(value) * parseInt(currData.outQty)
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