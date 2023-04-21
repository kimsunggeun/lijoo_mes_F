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
                    v-model="facCode"
                    :items="facCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facName')"
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
                    v-model="workCode"
                    :items="workCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    :label="$t('workName')"
                    @change="comboChange('workCode')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 작업반명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="workDecodeSelector"
                    :items="workDecodeSelectList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    :label="$t('workDename')"
                    dense
                    outlined
                    clearable
                    @click="handlerWorkDecodeList"
                  />
                </v-col>
                <!-- 품번 선택 -->
                <v-col cols="2">
                  <v-text-field :label="$t('partNo')" v-model="partNo" dense outlined color="primary" class="required mx-1" clearable />
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 공정 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="proCode"
                    :items="proCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    :label="$t('proName')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical headerTitle="regiOfProPerformance" :useBtnList="['btnExcel']" @btnExcel="btnExcel()">
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
                  <!-- 공장코드 Column -->
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 작업일련번호 Column -->
                  <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 작업지시코드 Column -->
                  <DxColumn data-field="workNo" :caption="$t('workNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 품번 Column -->
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <!-- 품명 Column -->
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <!-- 수량 Column -->
                  <DxColumn data-field="qty" :caption="$t('qty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <!-- 품목규격 Column -->
                  <DxColumn
                    data-field="partSpec"
                    :caption="$t('partSpec')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- LOT Column -->
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 전산번호 Column -->
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('lotDetail')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 생산구분코드 Column -->
                  <DxColumn
                    data-field="proType"
                    :caption="$t('productType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="proTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 불량코드 Column -->
                  <DxColumn
                    data-field="defCode"
                    :caption="$t('faultyName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="defCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 이전 공정명 Column -->
                  <DxColumn
                    data-field="preProCode"
                    :caption="$t('beforeProcessName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="proCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 공정명 Column -->
                  <DxColumn data-field="proCode" :caption="$t('proName')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="proCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 이전 작업장 Column -->
                  <DxColumn
                    data-field="preWorkCode"
                    :caption="$t('preWorkName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="workCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 작업장명 Column -->
                  <DxColumn data-field="workCode" :caption="$t('workName')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="workCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 이전 작업반 Column -->
                  <DxColumn
                    data-field="preWorkDecode"
                    :caption="$t('preWorkDename')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="workDecodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 작업반 Column -->
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDename')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="workDecodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 이전 창고 Column -->
                  <DxColumn
                    data-field="preWhCode"
                    :caption="$t('preWhName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="whCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 창고 Column -->
                  <DxColumn data-field="whCode" :caption="$t('whName')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="whCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 작업명 코드 Column -->
                  <DxColumn
                    data-field="eventCd"
                    :caption="$t('operationName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="eventCdList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 재공종류 Column -->
                  <DxColumn
                    data-field="stockType"
                    :caption="$t('workInProcessSort')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="stockTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                    <!-- 비고 Column -->
                    <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" alignment="center" width="500px" :allow-editing="false" />
                  <!-- 등록자 column -->
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 등록일 column -->
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 수정자 column -->
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 수정일 column -->
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
                    <DxGroupItem column="OrderNumber" summary-type="count" display-format="{0} orders" />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="orderQty"
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
                    <DxTotalItem column="orderQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="qty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
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
import { DxDataGrid, DxColumn, DxLookup, DxGroupItem, DxSummary, DxGrouping, DxGroupPanel, DxTotalItem } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'

import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'

/* API */
import { getProcInfo } from '@/api/view/bas0031'
import { getBas0034, getBas0035 } from '@/api/view/pro0050' //작업장
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getWarehouseLocInfoData } from '@/api/view/bas0033' //창고위치

import { getPro0120, getWorkDecode } from '@/api/view/pro0120'

import { userInfo } from 'os'
export default {
  name: 'pro0120',
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
    DxLookup,
    DxSummary,
    DxGroupItem,
    DxGroupPanel
  },

  data() {
    return {
      //콤보박스
      facCodeList: [],
      proCodeList: [],
      workCodeList: [],
      workDecodeList: [],
      whCodeList: [],
      eventCdList: [],
      defCodeList: [],
      proTypeList: [],
      stockTypeList: [],
      workDecodeSelectList: [],
      //검색 조건
      facCode: '',
      proCode: '', // 공정코드
      workCode: '', // 작업장 코드
      workDecode: '', // 작업반 코드
      whCode: '', // 창고코드
      partNo: '',
      eventCd: '', //작업명코드(이벤트)
      defCode: '',
      proType: '',
      workDecodeSelector: '',
      //그리드 데이터
      girdData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'ref'
        },
        autoExpandAll: true,

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
    comboChange(param) {
      try {
        if (this.workCode === null || this.workCode === '') {
          this.workDecodeSelector = ''
        } 
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    percent(cellInfo) {
      return `${Math.floor(cellInfo.valueText)} %`
    },
    //숫자 포맷터
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    // 검색기능
    async mainGridSearch() {
      this.girdData.mainGird.data = []
      this.openLoading()
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.facCode,
          workCode: this.workCode,
          workDecode: this.workDecodeSelector,
          partNo: this.partNo,
          proCode: this.proCode
        }
        let gridDataRes = await getPro0120(params)

        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
    
          e.id = cont++
        })
        this.girdData.mainGird.data = copyArray
        this.griMainInstance.option('focusedRowIndex',0)

      } catch (error) {
        notify(error, 'error', 1500)
      }
      this.endLoading()
    },
    //검색버튼
    btnSearch() {
      this.mainGridSearch()
    },

    //콤보박스 배열 생성
    async comboListSet() {
      /*----------- 공통코드 parameters -----------*/
      let cmChildRes = await getCmChildCode({
        comCode: getComCode(),
        facCode: this.facCode,
        code: 'EVENT_CD,DEF_CODE,PRO_TYPE,PART_TYPE'
      })

      /*----------- 공장명 -----------*/
      let facRes = await getFactoryInfoData({ comCode: getComCode() })
      facRes.list.forEach(e => {
        this.facCodeList.push({
          text: e.facName,
          value: e.facCode
        })
      })
      this.facCode = this.facCodeList[0].value

      /*----------- 작업장 -----------*/
      let workCodeRes = await getBas0034({
        comCode: getComCode(),
        facCode: this.facCode
      })
      workCodeRes.list.forEach(e => {
        this.workCodeList.push({
          value: e.workCode,
          text: e.workName
        })
      })
      /*----------- 공정 -----------*/
      let proCodeRes = await getProcInfo({
        comCode: getComCode(),
        facCode: this.facCode
      })
      proCodeRes.list.forEach(e => {
        this.proCodeList.push({
          value: e.proCode,
          text: e.proName
        })
      })
      /*----------- 작업반 -----------*/
      let workDecodeRes = await getWorkDecode({
        comCode: getComCode(),
        facCode: this.facCode
      })
      workDecodeRes.list.forEach(e => {
        this.workDecodeList.push({
          value: e.workDecode,
          text: e.workDename
        })
      })
      /*----------- 창고 -----------*/
      let whCodeRes = await getWarehouseLocInfoData({
        comCode: getComCode(),
        facCode: this.facCode
      })
      whCodeRes.list.forEach(e => {
        this.whCodeList.push({
          value: e.locCode,
          text: e.locName
        })
      })
      /*----------- 이벤트 -----------*/
      cmChildRes.list
        .filter(word => word.code === 'EVENT_CD')
        .forEach(e => {
          this.eventCdList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
      /*----------- 불량 -----------*/
      cmChildRes.list
        .filter(word => word.code === 'DEF_CODE')
        .forEach(e => {
          this.defCodeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
      /*----------- 생산구분 -----------*/
      cmChildRes.list
        .filter(word => word.code === 'PRO_TYPE' && word.codegr === 'PRO')
        .forEach(e => {
          this.proTypeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
      /*----------- 재공종류 -----------*/
      cmChildRes.list
        .filter(word => word.code === 'PART_TYPE')
        .forEach(e => {
          this.stockTypeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
    },
    handlerWorkDecodeList() {
      this.workDecodeSelectList = []
      let params = {
        comCode: getComCode(),
        facCode: this.facCode,
        workCode: this.workCode
      }
      getBas0035(params).then(res => {
        res.list.forEach(e => {
          this.workDecodeSelectList.push({
            value: e.workDeCode,
            text: e.workDename
          })
        })
      })
    },
    //엑셀버튼
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, `■ 공정실적 등록(재공).xlsx`) // 엑셀파일 만듬
    }
  },
  mounted() {
    this.comboListSet()
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
