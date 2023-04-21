<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-row class="mb-2">
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 공장명 -->
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  :label="$t('facName')"
                  :items="facCodeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 자원구분 -->
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchJobType"
                  :label="$t('resourceClassification')"
                  :items="jobTypeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 사용유무 -->
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchUserFlag"
                  :label="$t('userFlag')"
                  :items="userFlagList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="7" class="pa-1">
        <i-card-vertical
          headerTitle="reserveStockInfo"
          :useBtnList="['btnCorrection', 'btnAdd', 'btnDelete']"
          @btnCorrection="btnCorrection()"
          @btnAdd="btnAdd('예비품 정보')"
          @btnDelete="btnDelete('예비품 정보')"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <!-- 예비품 정보 -->
              <DxDataGrid
                id="mainGrid"
                class="listBox"
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
                @focused-row-changed="focusedRowChanged_mainGrid"
                @cellClick="mainListClick"
                @rowClick="popupOpen"
              >
                <DxSelection show-check-boxes-mode="none" />
                <DxScrolling column-rendering-mode="virtual" />
                <!-- 공장코드 -->
                <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="right" :visible="false" :allow-editing="false" css-class="devest-grid-header-require"/>                

                <!-- 공장명 -->
                <DxColumn data-field="facName" :caption="$t('facName')" width="auto" data-type="string" alignment="right" :allow-editing="false" css-class="devest-grid-header-require"/>
                <!-- 자원구분 -->
                <DxColumn
                  data-field="jobType"
                  :caption="$t('resourceClassification')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                >
                  <DxLookup :data-source="jobTypeList" display-expr="text" value-expr="value"
                /></DxColumn>
                <!-- 예비품이미지 -->
                <DxColumn
                  data-field="blobUrl"
                  :caption="$t('reserveStockImg')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  cell-template="cellTemplate"
                />
                <!-- 공장코드 -->
                <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="right" :visible="false" :allow-editing="false" css-class="devest-grid-header-require"/>                
                <!-- 예비품번 -->
                <DxColumn
                  data-field="partNo"
                  :caption="$t('reserveStockNo')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                  css-class="devest-grid-header-require"
                />
                <!-- 예비품명 -->
                <DxColumn
                  data-field="partName"
                  :caption="$t('reserveStockName')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <!-- 규격 -->
                <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <!-- 적정재고 -->
                <DxColumn
                  data-field="safeQty"
                  :caption="$t('optimumStockage')"
                  width="auto"
                  data-type="number" format="#,###" alignment="right"
                  :allow-editing="false"
                />
                <!-- 등급 -->
                <DxColumn data-field="grade" :caption="$t('grade')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <!-- 제작소요일 -->
                <DxColumn
                  data-field="regDate"
                  :caption="$t('manufacturingLeadTime')"
                  width="auto"
                  data-type="number" format="#,###" alignment="right"
                  :allow-editing="false"
                />
                <!-- 환종 -->
                <DxColumn data-field="unit" :caption="$t('exchangeRate')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="currCodeList" display-expr="text" value-expr="value" />
                </DxColumn>
                <!-- 단가 -->
                <DxColumn data-field="price" :caption="$t('unitPrice')" width="auto" data-type="number" format="#,###" alignment="right" :allow-editing="false" />
                <!-- 보관위치 -->
                <DxColumn
                  data-field="stockCode"
                  :caption="$t('storageLocation')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                >
                  <DxLookup :data-source="stockCodeList" display-expr="text" value-expr="value" />
                </DxColumn>
                <!-- 사용유무 -->
                <DxColumn
                  data-field="userFlag"
                  :caption="$t('userFlag')"
                  width="auto"
                  data-type="boolean"
                  alignment="center"
                  :allow-editing="false"
                  edit-cell-template="checkBoxEditor"
                />
                <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <!-- 등록일 -->
                <DxColumn data-field="makeDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn width="auto" :allow-editing="false" />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />

                <template #cellTemplate="{ data }">
                  <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" />
                  <h4 v-else class="noImageText">No Image</h4>
                </template>
                <template #checkBoxEditor="{ data: cellInfo }">
                  <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                </template>
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="5" class="pa-1">
        <i-card-vertical
          headerTitle="reserveStockResourceInfo"
          :useBtnList="['btnAdd', 'btnSave', 'btnDelete']"
          @btnAdd="btnAdd('예비품별 자원정보')"
          @btnSave="btnSave()"
          @btnDelete="btnDelete('예비품별 자원정보')"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <!-- 예비품별 자원정보 -->
              <DxDataGrid
                id="detailGrid"
                class="listBox"
                :ref="detailGridRef"
                :data-source="detailGrid"
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
                @editing-start="reserveStockEditingStart"
              >
                <DxSelection show-check-boxes-mode="none" />
                <DxScrolling column-rendering-mode="virtual" />
                <!-- 예비품번 -->
                <DxColumn data-field="partNo" :caption="$t('reserveStockNo')" data-type="string" alignment="right" :allow-editing="false" :visible="false" />
                <!-- 자원구분 -->
                <DxColumn data-field="jobType" :caption="$t('resourceClassification')" data-type="string" alignment="right" :visible="false">
                  <DxLookup :data-source="jobTypeList" display-expr="text" value-expr="value" />
                </DxColumn>
                <!-- 설비그룹 -->
                <DxColumn data-field="eqCode" :caption="$t('eqCode')" data-type="string" alignment="center" width="auto" :allow-editing="true" css-class="devest-grid-header-require">
                  <DxLookup :data-source="facilityList" display-expr="text" value-expr="value" />
                </DxColumn>
                <!-- 등록자 -->
                <DxColumn data-field="maker" :caption="$t('maker')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                <!-- 등록일 -->
                <DxColumn data-field="makeDate" :caption="$t('regiDate')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                <!-- 수정자 -->
                <DxColumn data-field="editor" :caption="$t('editor')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                <!-- 수정일 -->
                <DxColumn data-field="editDate" :caption="$t('editDate')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                
                <DxColumn width="auto" :allow-editing="false" />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <bas0260Popup ref="bas0260Popup" @btnSave="btnSavePop" @close="close" :popVisible="popVisible" />
    <imagePopup ref="imagePopup" />
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import iPageTitle from '@/components/common/iPageTitle.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import themes from 'devextreme/ui/themes'
import { DxPopup } from 'devextreme-vue/popup'
import { DxScrollView } from 'devextreme-vue/scroll-view'
import { DxDataGrid, DxColumn, DxLookup, DxScrolling, DxGrouping, DxEditing, DxPager } from 'devextreme-vue/data-grid'
import { getCurrentDate } from '@/utils/common.js'
import imagePopup from '@/views/11/1113/popup/imagePopup'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message

import {
  getMainList,
  getDetailList,
  saveReserveStockInfo,
  saveReserveStockDetailInfo,
  deleteReserveStockInfo,
  deleteReserveStockDetailInfo,
} from '@/api/view/bas0260'
import { getPathType, getPathCode, getInWhCode, savePathType, deletePathType } from '@/api/view/bas0041'
import { getRouteInfo, updateRouteInfo, getPathCodeName, getInWhcodeName, getProCodeName } from '@/api/view/bas0042'
import { getBomInfo, saveBomInfo, deleteBomInfo } from '@/api/view/bas0043'
import { getCustCodeName, saveItemCustomInfo, deleteCustomInfo } from '@/api/view/bas0044'
import { getPriceInfo, savePriceInfo, deletePriceInfo } from '@/api/view/bas0045'
import { getUserId, getComCode } from '@/utils/token'
import { getFacCode } from '@/api/system/companyManage'
import { getBas0011Detail } from '@/api/view/bas0011'
import bas0260Popup from '@/views/11/1113/popup/bas0260Popup'
import { getWarehouseLocInfoData } from '@/api/view/bas0033'
import { getFacilityInfoData } from '@/api/view/bas0036'

export default {
  name: 'bas0260',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxLookup,
    ICardTop,
    DxPager,
    bas0260Popup,
    imagePopup
  },
  data() {
    return {
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      popVisible: false,
      //조회 조건
      searchFacCode: '',
      searchJobType: '',
      searchUserFlag: '',
      //조회리스트
      facCodeList: [],
      jobTypeList: [],
      userFlagList: [],
      currCodeList: [],

      //콤보박스
      stockCodeList: [],
      facilityList: [],

      //예비품 정보
      mainGrid: [],
      mainGridRef: 'mainGridRef',
      mainFocusedData: null,

      //예비품별 자원정보
      detailGrid: [],
      detailGridRef: 'detailGridRef',

      popupData: [],

      //경로Lookup
      lookup: {
        pathType: [],
        pathCode: [],
        inWhcode: [],
        outWhcode: [],
        userFlag: [],
        custCode: [],
        custType: [],
        matType: [],
        unit: [],
        itemType: [],
        partType: [],
        procCode: [],
      },
    }
  },
  created() {
    //회사명 조회조건 리스트 가져오기
    const facCodeData = {
      comCode: getComCode(),
    }
    getFacCode(facCodeData).then((res) => {
      res.list.forEach((item, i) => {
        this.facCodeList.push({
          value: item.facCode,
          text: item.facName,
        })
      })
      this.searchFacCode = res.list[0].facCode
    })
    //공통코드 조회조건 리스트 가져오기
    const jobType = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'JOB_TYPE',
    }
    const userYn = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'USER_YN',
    }
    const currCode = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'CURR_CODE',
    }
    Promise.all([getBas0011Detail(jobType), getBas0011Detail(userYn), getBas0011Detail(currCode)]).then((res) => {
      res[0].list.forEach((item) => {
        this.jobTypeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })
      res[1].list.forEach((item) => {
        this.userFlagList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })
      res[2].list.forEach((item) => {
        this.currCodeList.push({
          value: item.sysCode,
          text: item.sysName,
        })
      })
    })
  },
  computed: {
    getMainInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
    getDetailInstance() {
      return this.GetDataGrid(this.detailGridRef)
    },
  },
  mounted() {},
  beforeMount() {
    this.getComboBox()
  },
  methods: {
    reserveStockEditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'eqCode') {
          e.cancel = true
        }
      }
    },
    imgClick(e) {
      //이미지 클릭 팝업
      this.$refs.imagePopup.open(e)
    },
    popupOpen(e) {
      this.popupData = e.data
      this.popupData.__created__ = false
      this.popupData.__modified__ = true
    },
    close() {
      this.popVisible = false
    },
    //예비품 조회
    btnSearch() {
      this.doSearchMainList()
      this.doSearchDetailList()
    },
    doSearchMainList() {
      this.openLoading('searching')
      const searchData = {
        comCode: getComCode(),
        facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
        jobType: this.searchJobType == null ? '' : this.searchJobType.toString(),
        userFlag: this.searchUserFlag == null ? '' : this.searchUserFlag.toString(),
      }
      getMainList(searchData)
        .then((res) => {
          res.list.forEach((e) => {
            if (e.spareImage) {
              let binaryString = window.atob(e.spareImageBase64)
              let binaryLen = binaryString.length
              let bytes = new Uint8Array(binaryLen)
              for (let a = 0; a < binaryLen; a++) {
                let ascii = binaryString.charCodeAt(a)
                bytes[a] = ascii
              }
              let blob = new Blob([bytes], {
                type: e.contentType,
              })
              e.blobUrl = URL.createObjectURL(blob)
            }
          })
          this.mainGrid = res.list
          // console.log('mainGrid', res.list)
        })
        .finally(() => {
          this.endLoading()
          this.getMainInstance.option('focusedRowIndex', 0)
          this.mainFocusedData = this.mainGrid[0]
          this.getMainInstance.saveEditData()
          this.doSearchDetailList()
        })
    },
    doSearchDetailList() {
      if(!this.mainFocusedData) {
        return
      }
      
      this.getDetailInstance.clearSelection()
      let params = {
        comCode: getComCode(),
        facCode: this.mainFocusedData.facCode,
        partNo: this.mainFocusedData.partNo,
      }
      getDetailList(params)
        .then((res) => {
          this.detailGrid = []

          if (this.mainFocusedData === '') {
            this.detailGrid = res.list
          } else {
            res.list.forEach((e) => {
              if (this.mainFocusedData.partNo === e.partNo) {
                this.detailGrid.push(e)
              }
            })
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },

    mainListClick(e) {
      if (e.rowType === 'data') {
        if (e.rowIndex !== -1) {
          this.detailGrid = []
          if (e.data) {
            this.mainFocusedData = e.data
          } else {
            this.mainFocusedData = null
          }
          this.doSearchDetailList()
        }
      }
    },
    focusedRowChanged_mainGrid(e) {
      if (e.row === undefined) {
        return
      }
      this.detailGrid = []
      this.mainFocusedData = e.row.data
      this.doSearchDetailList()
    },
    //예비품 정보 수정
    async btnCorrection() {
      this.getMainInstance.saveEditData()
      let selectedMainRows = await this.getMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.popVisible = true
      this.$refs.bas0260Popup.open('mod', this.popupData, this.facCodeList, this.jobTypeList, this.stockCodeList, this.currCodeList)
    },
    //추가 버튼
    btnAdd(type) {
      if (type === '예비품 정보') {
        let newRow = {
          id: this.mainGrid.length + 1,
          comCode: getComCode(),
          facCode: this.searchFacCode,
          jobType: '',
          partNo: '',
          partName: '',
          spec: '',
          qty: 0,
          safeQty: '',
          grade: '',
          regDate: '',
          unit: '',
          price: '',
          stockCode: '',
          spareImage: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }

        this.getMainInstance.clearSelection()
        this.$refs.bas0260Popup.open('add', newRow, this.facCodeList, this.jobTypeList, this.stockCodeList, this.currCodeList)
        this.popVisible = true
      } else if (type === '예비품별 자원정보') {
        let newRow = {
          id: this.detailGrid.length + 1,
          comCode: this.mainFocusedData.comCode,
          facCode: this.mainFocusedData.facCode,
          jobType: '',
          partNo: this.mainFocusedData.partNo,
          partName: this.mainFocusedData.partName,
          eqCode: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        console.log('main : ', this.mainFocusedData)
        this.getDetailInstance.newRow(newRow)
        this.getDetailInstance.selectRows(newRow.id, true)
        this.getDetailInstance.option('focusedRowIndex', -1)
        this.getDetailInstance.saveEditData()
      }
    },
    //예비품 정보 저장
    async btnSavePop(items) {
      let messageGubun = ''
      let data = items.popupData
      let success = true
      if (!data[0].facCode || !data[0].partNo) {
        this.vToastify(this.$t('bas0260RequiredInput1'), 'warn')
        return
      }

      if (data[0].__created__ === true) {
        messageGubun = 'doSaveData'
      } else {
        messageGubun = 'doFixData'
      }

      this.vToastifyPrompt(
        this.$t(messageGubun),
        'info',
        (current) => {
          this.openLoading()
          this.getMainInstance.beginUpdate()
          let datas = new FormData()
          if (items.file != null) datas.append('file', items.file)
          for (var key in data[0]) {
            datas.append(key, data[0][key])
          }
          saveReserveStockInfo(datas)
            .then((res) => {
              let message = data[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
              this.doSearchMainList()
              this.popVisible = false
            })
            .catch((error) => {
              notify(error, 'error', 1500)
              this.endLoading()
            })
            .finally(() => {
              this.getMainInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //예비품별 자원정보 저장
    async btnSave() {
      this.getDetailInstance.saveEditData()
      let selectedDetailRows = await this.getDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      for (var row of selectedDetailRows) {
        if (!row.partNo || !row.eqCode) {
          this.vToastify(this.$t('bas0260RequiredInput2'), 'warn')
          return
        }
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
          this.getDetailInstance.beginUpdate()
          saveReserveStockDetailInfo(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetailList(false)
              let message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
            })
            .catch((error) => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.getDetailInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //삭제 버튼
    async btnDelete(gbn) {
      if (gbn === '예비품 정보') {
        this.getMainInstance.saveEditData()
        var selectedMainRows = await this.getMainInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.getMainInstance.beginUpdate()
            deleteReserveStockInfo(selectedMainRows)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchMainList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.getMainInstance.endUpdate()
                this.getMainInstance.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '예비품별 자원정보') {
        let selectedDetailRows = await this.getDetailInstance.getSelectedRowsData()

        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.getDetailInstance.beginUpdate()
            deleteReserveStockDetailInfo(selectedDetailRows)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDetailList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.getDetailInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },

    //콤보박스
    async getComboBox() {
      const stockCode = {
        comCode: getComCode(),
        facCode: 'FAC01',
      }
      const eqCode = {
        comCode: getComCode(),
        facCode: 'FAC01',
      }

      await Promise.all([getWarehouseLocInfoData(stockCode), getFacilityInfoData(eqCode)]).then((res) => {
        res[0].list.sort((a, b) => {
          if (a.locCode > b.locCode) return 1
          if (a.locCode === b.locCode) return 0
          if (a.locCode < b.locCode) return -1
        })
        res[0].list.forEach((item) => {
          this.stockCodeList.push({
            value: item.locCode,
            text: item.locName,
          })
        })
        res[1].list.forEach((item) => {
          this.facilityList.push({
            value: item.eqCode,
            text: item.eqName,
          })
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .v-text-field.v-text-field--enclosed {
  margin: 0;
  padding-top: 5px;
}
.mainItem {
  color: rgb(0, 0, 0);
  font-size: 18px;
  letter-spacing: 0.5px;
  font-weight: bold;
  line-height: 1.8;
}
.releaseBtn {
  background-color: rgb(135, 155, 119);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}
.itemPop {
  padding: 1px;
  .v-text-field {
    border-radius: 5px;
  }
  > * {
    color: rgb(135, 155, 119);
  }
}
.uploadedImage {
  width: 100px;
  height: 100px;
  object-fit: scale-down;
}
.noImageText {
  height: 100px;
  display : flex;
  justify-content : center;
  align-items : center;
}
</style>