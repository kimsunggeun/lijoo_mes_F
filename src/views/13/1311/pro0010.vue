<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 공장명 조회조건 -->
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :items="facCodeList"
                    item-text="text"
                    item-value="value"
                    v-model="facCodeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facName')"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 품번 조회조건 -->
                <v-col cols="12" md="2">
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
                <!-- 계획 시작일 조회조건 -->
                <v-col cols="2">
                  <v-menu
                    ref="frPlanDateCal"
                    v-model="frPlanDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$search'"
                        :label="$t('orderDate')"
                        v-model="frPlanDate"
                        dense
                        outlined
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="frPlanDate"
                      no-title
                      @input="frPlanDateCal = false"
                      :day-format="
                        date => {
                          return new Date(date).getDate()
                        }
                      "
                    />
                  </v-menu>
                </v-col>
                <!-- 계획 종료일 조회조건 -->
                <v-col cols="2">
                  <v-menu
                    ref="ttoPlanDateCal"
                    v-model="toPlanDateCal"
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
                        v-model="toPlanDate"
                        dense
                        outlined
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="toPlanDate"
                      :min="frPlanDate"
                      no-title
                      @input="toPlanDateCal = false"
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
      <!-- 생산계획관리 그리드 -->
      <v-col class="pa-2">
        <i-card-vertical style="color: black" headerTitle="ProdPlanManagement" :useBtnList="[]">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="CustDetailGrid1"
                  class="doubleListBox08"
                  :ref="dxDataGridRef"
                  :data-source="pro0011Grid"
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
                  @editing-start="pro0011EditingStart"
                  @focused-row-changed="focusedRowChanged_pro0011Grid"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <!-- 회사코드 column -->
                  <DxColumn
                    data-field="comcode"
                    :caption="$t('comCode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                    :fixed="true"
                    fixed-position="left"
                    width="auto"
                  />
                  <!-- 공장코드 column -->
                  <DxColumn
                    data-field="faccode"
                    :caption="$t('facName')"
                    :fixed="true"
                    fixed-position="left"
                    :allow-editing="false"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  >
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 품번코드 column -->
                  <DxColumn
                    data-field="partno"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <!-- 품명 column -->
                  <DxColumn
                    data-field="partname"
                    :fixed="true"
                    fixed-position="left"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <!-- 계획수량 column -->
                  <DxColumn
                    data-field="planqty"
                    :caption="$t('planQty')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :fixed="true"
                    fixed-position="left"
                    :customize-text="customizeText"
                    width="auto"
                  />
                  <!-- 작지수량 column -->
                  <DxColumn
                    data-field="wocnt"
                    caption="작지수량"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :fixed="true"
                    fixed-position="left"
                    :customize-text="customizeText"
                    width="auto"
                  />
                  <DxColumn :fixed="true" fixed-position="right" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" mode="single" />
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
      <!-- 작지대상품목 그리드 -->
      <v-col cols="12" class="pa-2">
        <i-card-vertical
          headerTitle="ItemSubjectWorkOrder"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnAdd="btnAdd('')"
          @btnSave="btnSave('')"
          @btnDelete="btnDelete('')"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="departmentInformation"
                  class="doubleListBox08"
                  :ref="departmentInfoRef"
                  :data-source="departmentInfoData"
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
                  @editing-start="editingStart"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <!-- 공장코드 column -->
                  <DxColumn data-field="facCode" :caption="$t('facName')" width="auto" data-type="string" alignment="center">
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 계획일  column-->
                  <DxColumn data-field="planDate" :caption="$t('orderDate')" width="auto" data-type="date" format="yyyy-MM-dd" alignment="center" />
                  <!-- 생산일 column -->
                  <DxColumn
                    data-field="workDate"
                    :caption="$t('workDate')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 작업지시번호 column -->
                  <DxColumn data-field="workNo" :caption="$t('workNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 생산계획번호 column -->
                  <DxColumn
                    data-field="planNo"
                    :caption="$t('planNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <!-- 작업장명 column -->
                  <DxColumn
                    data-field="workCode"
                    :caption="$t('workName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="workCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>

                  <DxColumn
                    data-field="workDecode"
                    :visible="false"
                    :caption="$t('workDecode')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />
                  <!-- 작업반명 column -->
                  <DxColumn
                    data-field="workDeName"
                    :caption="$t('workDename')"
                    :min-width="120"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />
                  <!-- 작업지시상태 column -->
                  <DxColumn
                    data-field="orderState"
                    :caption="$t('orderStateName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="orderStateList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 우선순위 column -->
                  <DxColumn data-field="priCode" :caption="$t('priority')" width="auto" data-type="string" alignment="center">
                    <DxLookup :data-source="priCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 경로유형명 column -->
                  <DxColumn
                    data-field="pathCode"
                    width="180"
                    :caption="$t('pathTypeName')"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="pathTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 작업조 column -->
                  <DxColumn data-field="workCrew" width="auto" :caption="$t('workCrewName')" data-type="string" alignment="center">
                    <DxLookup :data-source="workCrewList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 품번 column -->
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <!-- 품명 column -->
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <!-- 제품군 코드 column -->
                  <DxColumn data-field="partType" :caption="$t('partType')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="partTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 품목군 코드 column -->
                  <DxColumn data-field="itemType" :caption="$t('itemType')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="itemTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 지시량 column -->
                  <DxColumn
                    data-field="orderQty"
                    :caption="$t('orderQty')"
                    :customize-text="customizeText"
                    width="auto"
                    data-type="number"
                    alignment="right"
                  />
                  <!-- LOT column -->
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" />
                  <!-- 비고 column -->
                  <DxColumn data-field="remark" :caption="$t('remark')" width="500px" data-type="string" alignment="center" />
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
                  <DxPager :show-page-size-selector="false" />
                  <DxPaging :enabled="true" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <DxPopup
      :visible.sync="itemPopup"
      :show-close-button="true"
      :show-title="true"
      :title="$t('workDename')"
      height="auto"
      width="70%"
      max-width="400px"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGridRef"
                  :data-source="popupInfoGrid"
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
                  @rowDblClick="insertDbClick()"
                >
                  <DxColumn
                    data-field="workDename"
                    :caption="$t('workDename')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" mode="multiple" />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="workInsert()">{{ $t('choice') }}</v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="itemPopup = false">{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
//DevExtreme
import ICardVertical from '@/components/common/iCardVertical.vue'
import themes from 'devextreme/ui/themes'
import { DxDataGrid, DxColumn, DxLookup, DxPager } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import notify from 'devextreme/ui/notify' // message
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxPopup } from 'devextreme-vue/popup'
// API
import { getDateFormat } from '@/utils/common.js'
import { getComCode, getUserId } from '@/utils/token'
import { getPro0010, getPro0010Detail, upsertPro0010, deletePro0010, getBas0040 } from '@/api/view/pro0010'
import { getFactoryInfoData } from '@/api/view/bas0030' //공장정보
import { getBas0034, getBas0035 } from '@/api/view/pro0050' //작업장, 작업반 정보
import { getCmChildCode } from '@/api/system/cmCodeManage' //공통코드
import { getRoutingInfo } from '@/api/view/bas0037' //경로유형 정보

export default {
  name: 'productionPlanManagement',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  ICardVertical,
  DxDataGrid,
  DxColumn,
  components: {
    DxLookup,
    DxPager,
    DxColumn,
    DxPopup
  },
  data() {
    return {
      //품번 저장소
      savePartNo: '',
      savePartName: '',
      saveItemType: '',
      savePartType: '',
      frPlanDateCal: false,
      toPlanDateCal: false,

      //생산계획관리 그리드
      dxDataGridRef: 'dxDataGridRef',
      pro0011Grid: [],

      //작지대상품목 그리드
      departmentInfoRef: 'departmentInfoRef',
      departmentInfoData: [],

      //팝업 그리드
      popupInfoGridRef: 'popupInfoGridRef',
      popupInfoGrid: [],

      reqDtFrom: null,
      values: [],

      //콤보박스
      facCodeList: [],
      workCodeList: [],
      workDecodeList: [],
      itemTypeList: [],
      partTypeList: [],
      unitList: [],
      orderStateList: [],
      priCodeList: [],
      workCrewList: [],
      pathTypeList: [],

      //검색조건
      facCodeSelect: '',
      frPlanDate: getDateFormat(new Date()),
      toPlanDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7))),
      partNo: '',
      holyArray: [], //휴일 배열
      addHeaderArray: [],

      specUnit: [],
      workCodeData: '',

      //팝업
      itemPopup: false,
      popupHeaderText: null,
      targetRow: {}
    }
  },
  computed: {
    //생산계획관리
    pro0011Instance() {
      return this.GetDataGrid(this.dxDataGridRef)
    },
    //작지대상품목
    departmentInfoInstance() {
      return this.GetDataGrid(this.departmentInfoRef)
    },
    //팝업
    popupInfoGridInstance() {
      return this.GetDataGrid(this.popupInfoGridRef)
    }
  },
  methods: {
    formatDate(rowData) {
      const date = new Date(rowData.orderDate)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      return `${year}/${month}/${day}`
    },
    insertDbClick() {
      this.workInsert()
    },
    focusedRowChanged_pro0011Grid(e) {
      if (e.row === undefined) {
        return
      }
      this.handlerJobOrderStatement(e)
    },
    onCellPrepared(e) {
      let found = this.holyArray.find(item => item.date === e.column.dataField)
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
    getDateFormat(date) {
      return getDateFormat(date)
    },
    pro0011EditingStart(e) {
      if (e.data.__created__ === false) {
        //이미 있는데이터일때
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'facCode' ||
          e.column.dataField === 'partNo' ||
          e.column.dataField === 'planDate' ||
          e.column.dataField === 'makeDate' ||
          e.column.dataField === 'maker' ||
          e.column.dataField === 'editDate' ||
          e.column.dataField === 'editor'
        ) {
          e.cancel = true
        }
      } else {
        // 새데이터일때
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'makeDate' ||
          e.column.dataField === 'maker' ||
          e.column.dataField === 'editDate' ||
          e.column.dataField === 'editor'
        ) {
          e.cancel = true
        }
      }
    },
    async comboListSet() {
      //공장코드
      let facRes = await getFactoryInfoData({ comCode: getComCode() })
      facRes.list.forEach(e => {
        this.facCodeList.push({
          text: e.facName,
          value: e.facCode
        })
      })
      this.facCodeSelect = this.facCodeList[0].value
    },

    // 그리드 셀 클릭 시 "작지대상품목" 그리드에 데이터 출력
    async handlerJobOrderStatement(e) {
      this.savePartNo = e.row.values[1]
      this.savePartName = e.row.values[2]
      let param = {
        comCode: getComCode(),
        facCode: this.facCodeSelect
      }

      //경로유형코드
      this.pathTypeList = []
      let pathRes = await getRoutingInfo(param)
      pathRes.list.forEach(e => {
        this.pathTypeList.push({
          value: e.pathCode,
          text: e.pathName
        })
      })
      //작업장 코드
      this.workCodeList = []
      let workCodeRes = await getBas0034(param)
      workCodeRes.list.forEach(e => {
        this.workCodeList.push({
          value: e.workCode,
          text: e.workName
        })
      })
      /* --------------- 공통코드 -------------- */
      let params = {
        comCode: getComCode(),
        codegr: '',
        code: 'ORDER_STATE,PRI_CODE,WORK_CREW,PART_TYPE,ITEM_TYPE,PATH_TYPE'
      }
      let commonCodeList = await getCmChildCode(params)
      //작업지시상태
      this.orderStateList = []
      commonCodeList.list
        .filter(word => word.code === 'ORDER_STATE' && word.codegr === 'PRO')
        .forEach(e => {
          this.orderStateList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })

      //우선순위코드
      this.priCodeList = []
      commonCodeList.list
        .filter(word => word.code === 'PRI_CODE' && word.codegr === 'PRO')
        .forEach(e => {
          this.priCodeList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })
      //작업조 코드
      this.workCrewList = []
      commonCodeList.list
        .filter(word => word.code === 'WORK_CREW' && word.codegr === 'PRO')
        .forEach(e => {
          this.workCrewList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })
      //제품군 코드
      this.partTypeList = []
      commonCodeList.list
        .filter(word => word.code === 'PART_TYPE' && word.codegr === 'COM')
        .forEach(e => {
          this.partTypeList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })
      //품목군 코드
      this.itemTypeList = []
      commonCodeList.list
        .filter(word => word.code === 'ITEM_TYPE' && word.codegr === 'COM')
        .forEach(e => {
          this.itemTypeList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })

      let saveParam = {
        comCode: getComCode(),
        partNo: this.savePartNo
      }
      let saveCode = await getBas0040(saveParam)
      this.savePartType = saveCode.list[0].partType
      this.saveItemType = saveCode.list[0].itemType
      /* --------------- "작지대상품목" 그리드로 넘길 데이터 -------------- */

      this.getDetail()
    },
    getDetail() {
      this.departmentInfoData = []
      let departParams = {
        comCode: getComCode(),
        facCode: this.facCodeList[0].value,
        partNo: this.savePartNo,
        frPlanDate: this.frPlanDate,
        toPlanDate: this.toPlanDate
      }

      getPro0010Detail(departParams).then(res => {
        let resArray = [...res.list]
        let cont = 0
        resArray.forEach(e => {
          e.id = cont++
        })
        this.departmentInfoData = resArray
        this.departmentInfoInstance.clearSelection()
      })
    },
    //작업반 삽입
    async workInsert() {
      let selectedRows = await this.popupInfoGridInstance.getSelectedRowsData()

      let rowIndex = this.departmentInfoInstance.getRowIndexByKey(this.targetRow.key)
      this.departmentInfoInstance.cellValue(rowIndex, 'workDecode', selectedRows[0].workDeCode)
      this.departmentInfoInstance.cellValue(rowIndex, 'workDeName', selectedRows[0].workDename)
      this.itemPopup = false
    },

    //편집 제어
    async editingStart(e) {
      this.targetRow = e
      if (e.column.dataField === 'workDeName') {
        //작업반명 수정불가
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheck'), 'error', 1500)
          e.cancel = true
          return
        }
      }
      if (e.column.dataField === 'workDeName') {
        e.cancel = true
        if (e.data.workCode === '' || e.data.facCode === '') {
          notify(`${this.$t('bas0120PleaseCheck3')}`, 'error', 1500)
        } else {
          let params = {
            comCode: getComCode(),
            facCode: e.data.facCode,
            workCode: e.data.workCode
          }
          let resData = await getBas0035(params)
          let cnt = 0
          resData.list.forEach(e => {
            e.id = cnt++
          })

          this.itemPopup = true
          this.popupInfoGrid = [...resData.list]
        }
      }
    },
    btnAdd() {
      let newRow = {
        id: this.departmentInfoData.length + 1,
        comCode: getComCode(),
        facCode: this.facCodeList[0].value,
        workNo: '',
        planDate: getDateFormat(new Date()),
        workDate: '',
        workCode: '',
        workDecode: this.departmentInfoData.length + 1,
        orderState: '10',
        priCode: '10',
        pathCode: '',
        workCrew: '10',
        partNo: this.savePartNo,
        partName: this.savePartName,
        partType: this.savePartType,
        itemType: this.saveItemType,
        orderQty: '',
        lotNo: '',
        remark: '',
        planNo: '',
        makeDate: '',
        maker: getUserId(),
        editor: '',
        __created__: true,
        __modified__: false
      }

      this.departmentInfoInstance.newRow(newRow)
      this.departmentInfoInstance.selectRows(newRow.id, true)
      this.departmentInfoInstance.option('focusedRowIndex', -1)
      this.departmentInfoInstance.saveEditData()
    },

    async btnSave() {
      await this.departmentInfoInstance.saveEditData()
      let selectAll = await this.departmentInfoInstance.getDataSource()

      let selectedMainRows = await this.departmentInfoInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      for (let row of selectedMainRows) {
        row.planDate = getDateFormat(new Date(row.planDate))
        //필수값 체크
        let valCheckData = await selectAll._items.findIndex(e => {
          if (!e.codeChk) {
            return row.workCode == '' || row.workDeCode == '' || row.pathCode == ''
          }
        })
        if (valCheckData >= 0) {
          return this.vToastify('필수값 체크', 'warn')
        }
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        () => {
          if (selectedMainRows.length > 0) {
            this.departmentInfoInstance.beginUpdate()
          }
          this.openLoading()

          upsertPro0010(selectedMainRows)
            .then(res => {
              if (res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                let departParams = {
                  comCode: getComCode(),
                  facCode: this.facCodeList[0].value,
                  partNo: this.savePartNo,
                  frPlanDate: this.frPlanDate,
                  toPlanDate: this.toPlanDate
                }
                getPro0010Detail(departParams).then(res => {
                  let resArray = [...res.list]
                  let cont = 0
                  resArray.forEach(e => {
                    e.id = cont++
                  })
                  this.departmentInfoData = resArray
                })
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.getDetail()
              this.departmentInfoInstance.endUpdate()
              this.departmentInfoInstance.clearSelection()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    btnSearch() {
      this.pro0011Search()
    },
    async pro0011Search() {
      try {
        this.departmentInfoData = []
        this.openLoading()
        let params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect,
          partNo: this.partNo,
          frPlanDate: this.frPlanDate,
          toPlanDate: this.toPlanDate
        }
        let resData = await getPro0010(params)
        const rowData = [...resData.list[0]]
        const holidayData = [...resData.list[1]]
        this.holyArray = [] //휴일배열 초기화
        this.addHeaderArray.forEach(e => {
          this.pro0011Instance.deleteColumn(e)
        })
        this.addHeaderArray = [] //헤더배열 초기화
        let cnt = 0
        rowData.forEach(e => {
          e.id = cnt++
          let array = Object.keys(e).filter(word => Number(word.substr(0, 4)))
          array.forEach(item => {
            //날짜 데이터 걸러내기
            let keyName = item
            e[keyName] = e[item]
            this.addHeaderArray.push(keyName)
            this.addHeaderArray = [...new Set(this.addHeaderArray)]
          })
        })
        this.savePartNo = rowData[0].partno
        this.savePartName = rowData[0].partname
        this.addHeaderArray = this.addHeaderArray.sort((a, b) => new Date(a) - new Date(b))
        holidayData.forEach(e => {
          //휴일 데이터
          let year = e.workDate.substr(0, 4)
          let month = e.workDate.substr(5, 2)
          let day = e.workDate.substr(8)
          let date = new Date(year, month - 1, day).getDay()

          if (e.holiType === '2') {
            this.holyArray.push({
              date: e.workDate,
              weekend: date
            })
          }
        })
        this.addHeaderArray.forEach(e => {
          let year = e.substr(0, 4)
          let month = e.substr(5, 2)
          let day = e.substr(8)
          let date = 'weekArray[' + new Date(year, month - 1, day).getDay() + ']'
          let columnOption = {
            dataField: e,
            customizeText: this.customizeText,
            allowEditing: false,
            alignment: 'right',
            caption: `${e.substr(2)} [${this.$t(date)}]`
          }
          this.pro0011Instance.addColumn(columnOption) //컬럼추가
        })
        this.pro0011Grid = rowData
        this.endLoading()
      } catch (error) {
        if (error === null) {
          this.endLoading()
          notify(this.$t('noData'), 'error', 1500)
        } else {
          this.endLoading()
          notify(error, 'error', 1500)
        }
      } finally {
        this.pro0011Instance.option('focusedRowIndex', -1)
        this.pro0011Instance.option('focusedRowIndex', 0)
      }
    },
    async btnDelete() {
      let selectedMainRows = await this.departmentInfoInstance.getSelectedRowsData()
      let arrayMainRows = []
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      } else {
        //DB에있는건지 혹은 본인이 추가할려고한건지 확인
        arrayMainRows = selectedMainRows.filter(obj => obj.workNo !== '')
      }
      this.vToastifyPrompt(
        this.$t('삭제하시겠습니까?'),
        'info',
        current => {
          if (arrayMainRows.length > 0) {
            deletePro0010(arrayMainRows).then(res => {
              let departParams = {
                comCode: getComCode(),
                facCode: this.facCodeList[0].value,
                partNo: this.savePartNo,
                frPlanDate: this.frPlanDate,
                toPlanDate: this.toPlanDate
              }
              getPro0010Detail(departParams).then(res => {
                let resArray = [...res.list]
                let cont = 0
                resArray.forEach(e => {
                  e.id = cont++
                })
                this.departmentInfoData = resArray
              })
            })

            this.endLoading()
            notify('삭제 되었습니다.', 'success', 1500)
          } else {
            let departParams = {
              comCode: getComCode(),
              facCode: this.facCodeList[0].value,
              partNo: this.savePartNo,
              frPlanDate: this.frPlanDate,
              toPlanDate: this.toPlanDate
            }
            getPro0010Detail(departParams).then(res => {
              let resArray = [...res.list]
              let cont = 0
              resArray.forEach(e => {
                e.id = cont++
              })
              this.departmentInfoData = resArray
            })

            notify('삭제 되었습니다.', 'success', 1500)
          }
        },
        null,
        true
      )
    }
  },
  mounted() {
    this.comboListSet().then(() => {
      // this.pro0011Search()
    })
  }
}
</script>

<style scoped>
.btn {
  background-color: #879b77;
  color: white;
}
</style>
