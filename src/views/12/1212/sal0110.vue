
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchMain()"
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
                <!-- <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('ordNo')"
                    v-model="ordNo"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  ></v-text-field>
                </v-col> -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="custName"
                    item-value="custCode"
                    :items="custCodeList"
                    v-model="custCodeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('custName')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="partNo"
                    dense
                    outlined
                    clearable
                    color="primary"
                    class="required mx-1"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-menu
                    ref="frDeliDateCal"
                    v-model="frDeliDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$search'"
                        :label="$t('estimatedDeliveryDate')"
                        v-model="frDeliDate"
                        dense
                        outlined
                        readonly
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="frDeliDate" no-title @input="frDeliDateCal = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="toDeliDateCal"
                    v-model="toDeliDateCal"
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
                        v-model="toDeliDate"
                        dense
                        outlined
                        color="primary"
                        readonly
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="toDeliDate" :min="frDeliDate" no-title @input="toDeliDateCal = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical headerTitle="shippingPlanRegistration" :useBtnList="['btnExcel']" @btnExcel="btnExcel" @btnSave="btnSave">
          <template v-slot:body>
            <v-layout column overflow-auto>
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
                  :column-hiding-enabled="false"
                  column-resizing-mode="widget"
                  @cell-prepared="onCellPrepared"
                  @content-Ready="addMenuItems"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumnFixing :enabled="true" />

                  <!-- <DxColumn
                    data-field="facCode"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('facCode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  /> -->
                  <DxColumn
                    data-field="custcode"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('custCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="custname"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('custName')"
                    data-type="string"
                    width="auto"
                    alignment="left"
                    :allow-editing="false"
                  />

                  <DxColumn
                    data-field="partno"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partNo')"
                    data-type="string"
                    width="auto"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partname"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partName')"
                    data-type="string"
                    width="auto"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="parttype"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partType')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partspec"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partSpec')"
                    data-type="string"
                    width="auto"
                    alignment="left"
                    :allow-editing="false"
                  />

                  <DxColumn
                    data-field="planqty"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('planQty')"
                    alignment="right"
                    width="auto"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="qty"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('orderVolume')"
                    alignment="right"
                    width="auto"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="nowqty"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('nowQty')"
                    alignment="right"
                    width="auto"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
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
import iCardVertical from '@/components/common/iCardVertical.vue'

import ISystemBar from '@/components/common/iSystemBar.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import DxDateBox from 'devextreme-vue/date-box'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getSal0110, createSal0110 } from '@/api/view/sal0110'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxColumnFixing, DxGroupItem, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getWorkDate } from '@/api/view/bas0130'
import { getComCode } from '@/utils/token'
import { getAccount } from '@/api/view/sal0010'
//  가상컬럼  계산값 로직 아직없음 [잔량]
export default {
  name: 'sal0110',
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
      endDate: null,
      toDeliDateCal: false,
      frDeliDateCal: false,
      //콤보박스 관련
      facCodeList: [],
      // ordNoList: [],
      ilnoList: [],
      custCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      //검색관련
      facCodeSelect: '',
      // ordNo: '',
      ilNoSelect: '',
      custName: '',
      custCodeSelect: '',
      itemTypeSelect: '',
      partTypeSelect: '',
      partNo: '',
      addHeaderArray: [],
      addArray: [],
      holyArray: [],
      totalOption: [],
      frDeliDate: getDateFormat(new Date()),
      toDeliDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7))),
      //그리드 ref
      mainGridRef: 'mainGridRef',
      // 그리드 관련
      mainGrid: [],

      totalTarget: [],
      //
    }
  },

  created() {
    const param = {
      comCode: getComCode()
    }

    //거래처명 조회조건
    getAccount(param).then(res => {
      this.custCodeList = res.list
    })
  },

  beforeMount() {
    this.comboListSet()
  },

  mounted() {
    // this.doSearchMain(true)
  },

  watch: {
    frDeliDate: function (value) {
      if (new Date(value) > new Date(this.toDeliDate)) {
        this.toDeliDate = value
      }
    },
  },

  computed: {
    mainGridInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
  },

  methods: {
    addMenuItems(e) {
      this.totalTarget = e

      if (!e.component.__summaryIsNotAdded) {
        e.component.option('summary.totalItems', this.totalOption)
        e.component.__summaryIsNotAdded = true
      }
    },

    //엑셀 다운로드
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '출하계획관리.xlsx') // 엑셀파일 만듬
    },

    onCellPrepared(e) {
      let found = this.holyArray.find((item) => item.date === e.column.dataField)
      if (found !== undefined && e.rowType === 'header') {
        if (found.weekend === 6) {
          e.cellElement.style.color = 'blue'
        } else {
          e.cellElement.style.color = 'red'
        }
      }
    },

    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },

    async btnSave() {
      let message = ''
      this.mainGridInstance.saveEditData()
      let selectedMainRows = await this.mainGridInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.mainGridInstance.beginUpdate()
          createSal0110(selectedMainRows, true)
            .then((res) => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
            })
            .catch((error) => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.mainGridInstance.endUpdate()
              this.mainGridInstance.clearSelection()
              this.mainGridInstance.saveEditData()
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'ITEM_TYPE,PART_TYPE,',
      }
      getCmChildCode(params).then((res) => {
        res.list
          .filter((word) => word.code === 'ITEM_TYPE')
          .forEach((e) => {
            this.itemTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
        res.list
          .filter((word) => word.code === 'PART_TYPE')
          .forEach((e) => {
            this.partTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
      })
      getFactoryInfoData({ comCode: getComCode() })
        .then((res) => {
          res.list.forEach((e) => {
            this.facCodeList.push({
              text: e.facName,
              value: e.facCode,
            })
          })
        })
        .finally(() => {
          this.facCodeSelect = this.facCodeList[0].value
        })
    },

    btnSearchMain() {
      this.doSearchMain()
    },

    getDateFormat(date) {
      return getDateFormat(date)
    },

    async doSearchMain() {
      try {
        this.mainGrid = []
        this.openLoading()
        let params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect,
          // ordNo: this.ordNo,
          ordNo: null,
          custCode: this.custCodeSelect,
          partNo: this.partNo,
          itemType: this.itemTypeSelect,
          partType: this.partTypeSelect,
          toDeliDate: this.toDeliDate,
          frDeliDate: this.frDeliDate,
          custName: this.custName,
        }
        let resData = await getSal0110(params)
        const rowData = [...resData.list[0]]
        const holidayData = [...resData.list[1]]
        this.holyArray = []
        this.addHeaderArray.forEach((e) => {
          this.mainGridInstance.deleteColumn(e)
        })
        this.addHeaderArray = []
        let cnt = 0
        rowData.forEach((e) => {
          e.id = cnt++
          let array = Object.keys(e).filter((word) => Number(word.substr(0, 4)))
          array.forEach((item) => {
            console.log(item);
            //날짜 데이터 걸러내기
            let keyName = item
            e[keyName] = e[item]
            this.addHeaderArray.push(keyName)
            this.addHeaderArray = [...new Set(this.addHeaderArray)]
          })
        })
        this.addHeaderArray = this.addHeaderArray.sort((a, b) => new Date(a) - new Date(b))
        holidayData.forEach((e) => {
          //휴일 데이터
          let year = e.workDate.substr(0, 4)
          let month = e.workDate.substr(5, 2)
          let day = e.workDate.substr(8)
          let date = new Date(year, month - 1, day).getDay()
          console.log("test ",date);
          if (e.holiType === '2') {
            this.holyArray.push({
              date: e.workDate,
              weekend: date,
            })
          }
        })
        this.totalOption = [
          {
            showInGroupFooter: 'true',
            column: 'nowqty',
            summaryType: 'sum',
            customizeText: this.customizeText,
            displayFormat: '합계',
          },
        ]
        this.addHeaderArray.forEach((e) => {
          let year = e.substr(0, 4)
          let month = e.substr(5, 2)
          let day = e.substr(8)
          let date = 'weekArray[' + new Date(year, month - 1, day).getDay() + ']'
          let columnOption = {
            dataField: e,
            customizeText: this.customizeText,
            allowEditing: false,
            alignment: 'right',
            caption: `${e.substr(2)} [${this.$t(date)}]`,
            width: "auto"
          }
          this.totalOption.push({
            showInGroupFooter: 'true',
            column: e,
            summaryType: 'sum',
            customizeText: this.customizeText,
            displayFormat: '{0}',
          })
          this.mainGridInstance.addColumn(columnOption)
        })
        this.mainGrid = rowData
        this.totalTarget.component.__summaryIsNotAdded = false //요약 제어
        this.endLoading()
      } catch (error) {
        if (error === null) {
          this.endLoading()
          notify(this.$t('noData'), 'error', 1500)
        } else {
          this.endLoading()
          notify(error, 'error', 1500)
        }
      }
    },
  },
}
</script>