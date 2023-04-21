<!-- 자재투입 현황 -->
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 공장명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="facCodeSelect"
                    :label="$t('facName')"
                    :items="facCodeList"
                    @change="comboChange('factory')"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 작업장 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :prepend-inner-icon="'$search'"
                    :label="$t('workName')"
                    v-model="workCodeSelect"
                    :items="workCodeList"
                    @change="comboChange('workCode')"
                    item-text="text"
                    item-value="value"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 작업반 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :prepend-inner-icon="'$search'"
                    :label="$t('workDename')"
                    v-model="workDecodeSelect"
                    :items="workDecodeList"
                    item-text="text"
                    item-value="value"
                    :disabled="disabledState.workDecode"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 생산 구분 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :items="proTypeList"
                    v-model="proTypeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('productType')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 품번 -->
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="partNo"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 투입품번 -->
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('inPartNo')"
                    v-model="inPartNo"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  />
                </v-col>
                <!-- 투입품명 -->
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('inPartName')"
                    v-model="inPartName"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  />
                </v-col>
                <!-- 투입일 선택 -->
                <v-col cols="2">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$search'"
                        :label="$t('inDate2')"
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
                      :day-format="
                        date => {
                          return new Date(date).getDate()
                        }
                      "
                    />
                  </v-menu>
                </v-col>
                <!-- ~ -->
                <v-col cols="2">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
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
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical headerTitle="partInputStatus" :useBtnList="[]">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="mainGrid"
                  class="listBox08"
                  :ref="girdData.mainGird.ref"
                  :data-source="girdData.mainGird.data"
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
                >
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="girdData.autoExpandAll" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <!-- 공장코드 -->
                  <!-- <DxColumn 
                  data-field="facCode" :caption="$t('facCode')" width="auto"
                  data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="facCodeList"
                     display-expr="text" value-expr="value" />
                  </DxColumn> -->
                  <!-- 작업일련번호 -->
                  <!-- <DxColumn 
                  data-field="ilno" :caption="$t('ilno')" width="auto" 
                  data-type="string" alignment="center" :allow-editing="false" /> -->
                  <!-- 작업지시번호 -->
                  <DxColumn 
                    data-field="workNo" 
                    :caption="$t('workNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" />
                  <!-- 실적 LOT번호 -->
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('perLotNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 투입일자 -->
                  <DxColumn
                    data-field="inDate"
                    :caption="$t('inDate2')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 투입 LOT번호 -->
                  <DxColumn
                    data-field="inLotDetail"
                    :caption="$t('inLotNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 투입품번 -->
                  <DxColumn
                    data-field="inPartNo"
                    :caption="$t('inPartNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 투입품명 -->
                  <DxColumn
                    data-field="inPartName"
                    :caption="$t('inPartName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 투입수량 -->
                  <DxColumn
                    data-field="inQty"
                    :caption="$t('inQty2')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 작업장 -->
                  <DxColumn
                    data-field="workCode"
                    :caption="$t('workName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 작업반 -->
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDename')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 생산 구분 -->
                  <DxColumn
                    data-field="proType"
                    :caption="$t('productType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 불량코드 -->
                  <DxColumn
                    data-field="defCode"
                    :caption="$t('faultyName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 품번 -->
                  <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" />
                  <!-- 품명 -->
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 수량 -->
                  <DxColumn 
                    data-field="qty" 
                    :caption="$t('qty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" />
                  <!-- 작업명 -->
                  <DxColumn
                    data-field="eventCd"
                    :caption="$t('operationName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 등록자 -->
                  <DxColumn 
                    data-field="maker" 
                    :caption="$t('maker')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" />
                  <!-- 등록일 -->
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 수정자 -->
                  <DxColumn 
                    data-field="editor" 
                    :caption="$t('editor')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" />
                  <!-- 수정일 -->
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="auto"
                    data-type="string"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <DxSummary>
                    <DxTotalItem 
                      column="inQty" 
                      summary-type="sum" 
                      :customize-text="customizeText" 
                      display-format="Total: {0}" 
                    />
                    <DxTotalItem 
                      column="qty" 
                      summary-type="sum" 
                      :customize-text="customizeText" 
                      display-format="Total: {0}" 
                    />
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
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { DxDataGrid, DxColumn, DxLookup, DxGroupItem, DxSummary, DxGrouping, DxGroupPanel, DxTotalItem } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import notify from 'devextreme/ui/notify'

import { getCurrentDate } from '@/utils/common.js'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'

import { getPro0190 } from '@/api/view/pro0190'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getBas0034, getBas0035 } from '@/api/view/pro0050'
import { getProcInfo } from '@/api/view/bas0031'

import { userInfo } from 'os'
export default {
  name: 'pro0190',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  ICardVertical,
  DxDataGrid,
  DxColumn,
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxTotalItem,
    DxGrouping,
    DxSummary,
    //DxGroupItem,
    DxGroupPanel,
    //DxLookup
  },

  data() {
    return {
      //콤보박스
      facCodeList: [], //공장코드
      workCodeList: [], //공정코드
      proTypeList: [], //공정구분코드
      eventCdList: [], //작업(이벤트)코드
      startDate: new Date().toISOString().substr(0, 10),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      workDecodeList: [],

      //검색조건
      facCodeSelect: '',
      workCodeSelect: '',
      proTypeSelect: '',
      partNo: '',
      workDecodeSelect: '',
      inPartNo: '',
      inPartName: '',

      //그리드 데이터
      girdData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'ref'
        },
        autoExpandAll: true,
        checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick'
      },
      //비활성화 관련
      disabledState: {
        workDecode: true
      }
    }
  },
  computed: {
    griMainInstance() {
      return this.GetDataGrid(this.girdData.mainGird.ref)
    }
  },
  methods: {
    percent(cellInfo) {
      return `${Math.floor(cellInfo.valueText)} %`
    },
    //숫자 포맷터
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
    },
    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },
    // 검색기능
    async mainGridSearch() {
      try {
        this.openLoading()
        if (this.partNo === null) {
          this.partNo = ''
        }
        if (this.inPartNo === null) {
          this.inPartNo = ''
        }
        if (this.inPartName === null) {
          this.inPartName = ''
        }
        let params = {
          comCode: getComCode(),
          facCode: this.facCode,
          partNo: '%' + this.partNo + '%',
          proType: this.proTypeSelect,
          workCode: this.workCodeSelect,
          workDecode: this.workDecodeSelect,
          inPartNo: '%' + this.inPartNo + '%',
          inPartName: '%' + this.inPartName + '%',
          startDate: this.startDate,
          endDate: this.endDate
        }
        let gridDataRes = await getPro0190(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.id = cont++
        })
        this.girdData.mainGird.data = copyArray
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    //검색버튼
    btnSearch() {
      this.mainGridSearch()
    },
    //콤보박스 배열 변경
    async comboChange(target) {
      try {
        if (target === 'factory') {
          let params = {
            comCode: getComCode(),
            facCode: this.facCode
          }

          let workCodeRes = await getBas0034(params)
          workCodeRes.list.forEach(e => {
            this.workCodeList.push({
              value: e.workCode,
              text: e.workName
            })
          })
        } else if (target === 'workCode') {
          if (this.workCodeSelect === null || this.workCodeSelect === '') {
            this.disabledState.workDecode = true
            this.workDecodeList = []
          } else {
            this.disabledState.workDecode = false
          }
          let params = {
            comCode: getComCode(),
            facCode: this.facCode,
            workCode: this.workCodeSelect
          }
          this.workDecodeList = []
          let workDeCodeRes = await getBas0035(params)
          workDeCodeRes.list.forEach(e => {
            this.workDecodeList.push({
              value: e.workDeCode,
              text: e.workDename
            })
          })
        }
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    //콤보박스 배열 생성

    //
    async comboListSet() {
      try {
        let params = {
          comCode: getComCode(),
          code: 'PRO_TYPE'
        }
        ////////////////////////////////////////////////////////////////////
        let cmChildRes = await getCmChildCode(params)
        cmChildRes.list.forEach(e => {
          this.proTypeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })

        /* ----- 공장명 -----*/

        let facRes = await getFactoryInfoData({ comCode: getComCode() })
        facRes.list.forEach(e => {
          this.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
        })
        this.facCodeSelect = this.facCodeList[0].value
        this.facCode = this.facCodeList[0].value
        this.comboChange('factory')
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },

    //엑셀버튼
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, `${this.$t('workOrderProgressStatus')}.xlsx`) // 엑셀파일 만듬
    }
  },
  mounted() {
    this.comboListSet().then(() => {})
  }
}
</script>

<style scoped>
::v-deep .dx-datagrid-header-panel .dx-toolbar {
  display: block !important;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-after {
  display: none !important;
}
</style>