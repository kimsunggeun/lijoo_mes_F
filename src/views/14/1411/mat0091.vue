
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top class="d-md-flex" outlined :useBtnList="[
                      'btnSearch', //조회
        ]" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-row >
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
                  @change="onChange"
                  dense outlined>
                </v-autocomplete>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchItemTypeCode"
                  :label="$t('itemTypeNm')"
                  :items="itemTypeCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'" 
                  @change="onChange"
                  dense outlined>
                </v-autocomplete>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchPartTypeCode"
                  :label="$t('partTypeNm')"
                  :items="partTypeCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  @change="onChange"
                  dense outlined>
                </v-autocomplete>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchPartNoCode"
                  :label="$t('partNo')"
                  :items="partNoCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'" 
                  dense outlined>
                </v-autocomplete>
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
                    <v-text-field
                      label="등록일"
                      v-model="startDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable  @input="dateInput"/>
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
                    <v-text-field
                      label="~"
                      v-model="endDate"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" :min="startDate" no-title scrollable  @input="dateInput2"/>
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0 pt-2">
        <i-card-vertical headerTitle="ProdPlanManagement" 
        :useBtnList="[
          'btnCreate' //생성
        ]"
        @btnCreate="btnCreate()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="matlReqtInfo" 
                  class="doubleListBox09" 
                  :ref="matlReqtInfoRef" 
                  :data-source="matlReqtInfo"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @cell-prepared="onCellPrepared"
                  >
                  <DxScrolling column-rendering-mode="virtual" />

                  <DxColumn
                    data-field="faccode"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('facName')"
                    :min-width="150"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="ilno"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('ilno')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partno"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partname"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="regidate"
                    :caption="$t('regiDate')"
                    data-type="date"
                    alignment="center"
                    format="yyyy-MM-dd"
                    :allow-editing="false"
                    :fixed="true"
                    fixed-position="left"
                  />
                 
                  <DxColumn
                    data-field="planqty"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('planQty')"
                    data-type="string"
                    alignment="center"
                    :customize-text="customizeText"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="wocnt"
                    :caption="$t('작지수량')"
                    data-type="string"
                    alignment="center"
                    :fixed="true"
                    fixed-position="left"
                    :customize-text="customizeText"
                    :allow-editing="false"
                  />
                  <DxColum/>
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                  </template>
                  <DxPaging :enabled="false" />
                  <!-- <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" /> -->
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />

                  <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row no-gutters> 
      <i-card-vertical headerTitle="matlReqtDetail" :useBtnList="[
       'btnExcel'
      ]" @btnExcel="btnExcel" >
        <template v-slot:body>
          <v-layout column>
            <v-col cols="12" class="pa-0">
              <DxDataGrid 
                id="matlReqtDetailInfo" 
                class="doubleListBox09" 
                :ref="matlReqtDetailInfoRef" 
                :data-source="matlReqtDetailInfo"
                :remote-operations="false" 
                :hover-state-enabled="true" 
                :allow-column-resizing="true"
                :allow-column-reordering="true" 
                :row-alternation-enabled="true" 
                :show-borders="true"
                :width="grid.width" 
                :show-row-lines="true" key-expr="id" 
                :focused-row-enabled="true"
                :disablePagination="false" 
                :column-hiding-enabled="false"
                :visible="true"
                @editing-start="mat0016EditingStart"
                @cell-prepared="onCellPrepared2"
                @exporting="onExporting"
                >

                <DxExport :enabled="true" />
                <DxPaging :enabled="false" />
                <DxScrolling column-rendering-mode="virtual" />
                <DxSelection mode="single" :allow-select-all="false" />
                <!-- <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" /> -->
                <DxPager :show-page-size-selector="false" />
                
                <DxColumn
                  data-field="partNo"
                  :fixed="true"
                  fixed-position="left"
                  :caption="$t('partNo')"
                  data-type="string"
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
                <DxColumn 
                  data-field="stockQty"
                  :fixed="true"
                  fixed-position="left"
                  :caption="$t('stock')" 
                  data-type="string" 
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
                <DxColum/>
              </DxDataGrid>
            </v-col>
          </v-layout>
        </template>
      </i-card-vertical>
    </v-row>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import { DxDataGrid, DxColumn, DxLookup, DxExport, DxToolbar } from 'devextreme-vue/data-grid'
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';
import { Workbook } from 'exceljs';

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'
// import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getItemSelect } from '@/api/view/bas0040'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getPro0010 } from '@/api/view/pro0010'
import { createMat0091, getMat0091 } from '@/api/view/mat0091'

export default ({
  name: 'CustClass',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxExport,
    DxToolbar
},
  data() {
    return {
      matlReqtInfo: [],
      matlReqtInfoRef: 'matlReqtInfoRef',
      matlReqtDetailInfo: [],
      matlReqtDetailInfoRef: 'matlReqtDetailInfoRef',
      startDate: getDateFormat(new Date()),
      endDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7))),
      searchComCode: getComCode(),
      searchFacCode: '',
      facCodeList: [],
      searchItemTypeCode: '',
      itemTypeCodeList: [],
      searchPartTypeCode: '',
      partTypeCodeList: [],
      searchPartNoCode: '',
      partNoCodeList: [],
      partNoCodeTempList: [],
      menu1: '',
      menu2: '',
      holyArray: [], //휴일 배열
      holyArray2: [], //휴일 배열
      addHeaderArray: [],
      addHeaderArray2: [],
      created: true
      //checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
    }
  },
  beforeMount() {
    const comCodeData = {
      comCode: getComCode()
    }
    const itemCodeData = {
      comCode: getComCode(),
      code: 'ITEM_TYPE,PART_TYPE,'
    }
    const partNoCodeData = {
      facCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
      itemType: '',
      partType: '',
      userFlag: 'Y'
    }
      
    Promise.all([
      getFactoryInfoData(comCodeData),
      getCmChildCode(itemCodeData),
      getItemSelect(partNoCodeData),
      getFactoryInfoData(comCodeData)
    ])
    .then((res) => {
      res[0].list.forEach(item => {
        this.facCodeList.push({
          value: item.facCode,
          text:item.facName
        })
      })
      this.searchFacCode = this.facCodeList[0].value

      this.itemTypeCodeList.push({
          value: '',
          text: '전체'
      })
      this.partTypeCodeList.push({
          value: '',
          text: '전체'
      })

      this.partNoCodeList.push({
          value: '',
          text: '전체'
      })
      res[1].list
      .filter(word => word.code === 'ITEM_TYPE')
      .forEach((item) => {
        this.itemTypeCodeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })

      res[1].list
      .filter(word => word.code === 'PART_TYPE')
      .forEach((item) => {
        this.partTypeCodeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })

      res[2].list.forEach(item => {
        this.partNoCodeList.push({
          value: item.partNo,
          text: item.partNo + '(' + item.partName + ')'
        })
      })
      this.partNoCodeTempList = res[2].list

      res[3].list.forEach(item => {
        this.facCodeList.push({
          value: item.facCode,
          text: item.facName
        })
      })
    })
    .catch((error) => { })
    
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.matlReqtInfoRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.matlReqtDetailInfoRef)
    },
    // partNoCodeList() {
    //   return this.partNoCodeList
    // }
  },
  mounted() {
    
  },
  methods: {
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
    onCellPrepared2(e) {
      let found = e.column.added != undefined ? this.holyArray2.find((item) => item.date === e.column.added.name) : undefined
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
    mat0016EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'ilNo' || e.column.dataField === 'regiDate' || e.column.dataField === 'partNo') {
          e.cancel = true
        }
      }
    },
    onChange() {
      console.log('onChange')
      this.partNoCodeList = []
      this.partNoCodeList.push({
          value: '',
          text: '전체'
      })
      this.partNoCodeTempList
      .filter(items => {
        if(this.searchItemTypeCode !== '') {
          if(this.searchPartTypeCode !== '') {
            if(items.comCode === this.searchComCode && items.itemType === this.searchItemTypeCode && items.partType === this.searchPartTypeCode)
              return true
          } else {
            if(items.comCode === this.searchComCode && items.itemType === this.searchItemTypeCode )
              return true
          }
        } else {
          if(this.searchPartTypeCode !== '') {
            if(items.comCode === this.searchComCode &&  items.partType === this.searchPartTypeCode)
              return true
          } else {
            if(items.comCode === this.searchComCode )
              return true
          }
        }
        return false
      })
      .forEach((item) => {
        this.partNoCodeList.push({
          value: item.partNo,
          text: item.partNo + '(' + item.partName + ')'
        })
      })
    },
    btnSearch() {
      this.doSearchMainList()
    },
   dateInput(e){
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate){
        this.endDate = this.startDate + 7
      }
    },
    dateInput2(e) {
      if (this.startDate === ''){
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },
    async doSearchMainList() {
      try {
        this.openLoading()
        this.matlReqtInfo = []
        this.matlReqtDetailInfo = []
        let params = {
          comCode: this.searchComCode,
          facCode: this.searchFacCode,
          partNo: this.searchPartNoCode,
          frPlanDate: this.startDate,
          toPlanDate: this.endDate,
          regiDate: this.startDate
        }

        let resData = await getPro0010(params)
        let rowData = [...resData.list[0]]
        let holidayData = [...resData.list[1]]
        this.holyArray = [] //휴일배열 초기화
        this.addHeaderArray.forEach((e, index) => {
         this.gridMainInstance.deleteColumn(e)
        })
        this.addHeaderArray = [] //헤더배열 초기화
        let cnt = 0
        rowData.forEach((e) => {
          e.id = cnt++
          let array = Object.keys(e).filter((word) => Number(word.substr(0, 4)))
          array.forEach((item) => {
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

          if (e.holiType === '2') {
            this.holyArray.push({
              date: e.workDate,
              weekend: date,
            })
          }
        })
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
          }
          
          this.gridMainInstance.addColumn(columnOption) //컬럼추가
        })
        this.matlReqtInfo = rowData

        this.doSearchDetailList(params)
       
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
    async doSearchDetailList(e) {
      try {
       
        let params = {
          comCode: e.comCode,
          facCode: e.facCode,
          regiDate: e.regiDate,
        }

        let resData = await getMat0091(params)
        let rowData = [...resData.list[0]]
        let holidayData = [...resData.list[1]]
        this.holyArray2 = [] //휴일배열 초기화
        this.addHeaderArray2.forEach((e, index) => {
          
          this.gridDetailInstance.deleteColumn(`currQty${index}`)
          this.gridDetailInstance.deleteColumn(`expQty${index}`)
          this.gridDetailInstance.deleteColumn(`reqQty${index}`)
          this.gridDetailInstance.deleteColumn(`lackQty${index}`)
          this.gridDetailInstance.deleteColumn(e)
        })

        this.addHeaderArray2 = [] //헤더배열 초기화
        let dates = []
        holidayData = holidayData.sort((a, b) => new Date(a.workDate) - new Date(b.workDate))
        holidayData.forEach((e, index) => {
          //휴일 데이터
          let year = e.workDate.substr(0, 4)
          let month = e.workDate.substr(5, 2)
          let day = e.workDate.substr(8)
          dates.push(new Date(year, month - 1, day).getDay())
          if (e.holiType === '2') {
            this.holyArray2.push({
              date: e.workDate,
              weekend: dates[index],
            })
           
          }
          this.addHeaderArray2.push(e.workDate)
        })
        this.addHeaderArray2.forEach((e, index) => {
          let date = 'weekArray[' + dates[index] + ']'
          let columnOption = {
            caption: `${e.substr(2)} [${this.$t(date)}]`,
            name: e,
            width: "auto",
            columns: [
              {
                dataField: `currQty${index}`,
                name: `currQty${index}`,
                customizeText: this.customizeText,
                allowEditing: false,
                alignment: 'right',
                caption: '현재',
                width: "auto",
              },
              {
                dataField: `reqQty${index}`,
                name: `reqQty${index}`,
                customizeText: this.customizeText,
                allowEditing: false,
                alignment: 'right',
                caption: '소진수량',
                width: "auto",
              },
              {
                dataField: `expQty${index}`,
                name: `expQty${index}`,
                customizeText: this.customizeText,
                allowEditing: false,
                alignment: 'right',
                caption: '미입고',
                width: "auto",
              },
              {
                dataField: `lackQty${index}`,
                name: `lackQty${index}`,
                customizeText: this.customizeText,
                allowEditing: false,
                alignment: 'right',
                caption: '부족수량',
                width: "auto",
              }
            ]
          }
           //컬럼추가
          this.gridDetailInstance.addColumn(columnOption)
          
        })
        this.matlReqtDetailInfo = rowData
        this.endLoading()
      } catch (error) {
        if (error === null) {
          this.endLoading()
          notify(this.$t('matlReqtDetail') + ' ' + this.$t('noData'), 'error', 1500)
        } else {
          this.endLoading()
          notify(error, 'error', 1500)
        }
      }
    },
    onExporting(e) {
      // e.selectedRowsOnly = false
      console.log('onExporting', e)
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('sheet')
      
      exportDataGrid({
          component: e.component,
          worksheet: worksheet,
          selectedRowsOnly: false,
          customizeCell: function(options) {
              const excelCell = options
              excelCell.font = { name: 'Arial', size: 12 }
              excelCell.alignment = { horizontal: 'left' }
          } 
      }).then(() => {
        workbook.xlsx.writeBuffer()
        .then( buffer => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }),
             this.matlReqtDetailInfo[0].fromDate + '_' + this.matlReqtDetailInfo[0].toDate + '자재소요량.xlsx')//this.matlReqtDetailInfo[0].fromDate + '_' + this.matlReqtDetailInfo[0].toDate + 
        }).catch( err => console.log("Error writing excel export", err))
      })

      e.cancel = true
    },
    btnExcel() {
      if(this.matlReqtDetailInfo.length <= 0) {
        notify(this.$t('ProdPlanManagement') + ' ' + this.$t('noData'), 'error', 1500)
        return
      }
      this.gridDetailInstance.selectAll()
      this.gridDetailInstance.exportToExcel(true)
    },
    async btnCreate() {
      let message = ''
      if(this.matlReqtInfo.length <= 0) {
        notify(this.$t('ProdPlanManagement') + ' ' + this.$t('noData'), 'error', 1500)
        return
      }
        
      if(this.matlReqtDetailInfo.length > 0) {
        message = this.matlReqtDetailInfo[0].fromDate + ' ~ ' + this.matlReqtDetailInfo[0].toDate 
                  + '에 ' + this.$t('newCreate2')
        this.created = true
      } else  {
        message = this.$t('newCreate')
        this.created = false
      }
      let partNoList = []
      this.matlReqtInfo.forEach((e) => {
        partNoList.push(e.partno)
      })

      this.vToastifyPrompt(
        message,
        'info',
        async (current) => {
          this.openLoading()
          let params = {
            comCode: this.searchComCode,
            facCode: this.searchFacCode,
            pathType: '01',
            partNoArray: partNoList,
            regiDate: this.startDate,
            fromDate: this.startDate,
            toDate: this.endDate,
            maker: getUserId(),
            __created__: this.created
          }
          console.log('btnCreate',params)
          await createMat0091(params)
            .then((res) => {
              notify(this.$t('createMsg'), 'success', 1500)
              this.doSearchMainList()
            })
            .catch((error) => {
              console.log(error)
              notify(error, 'error', 1500)
              this.endLoading()
            })
            .finally(() => {
              this.endLoading()
            })
        },
        null,
        true
      )
    }
  }
})
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
