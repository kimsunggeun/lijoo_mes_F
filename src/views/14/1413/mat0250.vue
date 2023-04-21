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
                <!-- 공장명 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.facCode"
                    :label="$t('facName')"
                    :items="comboBoxList.facCodeList"
                    item-text="text"
                    item-value="value"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 거래처명 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    v-model="searchValue.custCode"
                    :label="$t('custName')"
                    :items="comboBoxList.custCodeList"
                    item-text="text"
                    item-value="value"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 입고구분 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    v-model="searchValue.inType"
                    :label="$t('inType')"
                    :items="comboBoxList.inTypeList"
                    item-text="text"
                    item-value="value"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 입고유형 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    v-model="searchValue.inCate"
                    :label="$t('inCate')"
                    :items="comboBoxList.inCateList"
                    item-text="text"
                    item-value="value"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-menu
                    ref="workFrDateCal"
                    v-model="calMenuState.workFrDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('inRegiDate')"
                        v-model="searchValue.workFrDate"
                        dense
                        outlined
                        color="primary"
                        readonly
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="searchValue.workFrDate" no-title @input="calMenuState.workFrDateCal = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="workDateCal"
                    v-model="calMenuState.workDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('endDate')"
                        v-model="searchValue.workDate"
                        dense
                        outlined
                        readonly
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="searchValue.workDate"
                      :min="searchValue.workFrDate"
                      no-title
                      @input="calMenuState.workDateCal = false"
                    ></v-date-picker>
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
        <v-row>
          <i-card-vertical :headerTitle="$t('privateSupMaterialStatus')">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0 ">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox"
                    :ref="gridData.mainGrid.ref"
                    :data-source="gridData.mainGrid.data"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    column-resizing-mode="widget"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @focused-row-changed="focusedRowChanged_selectDetail"
                  >
                    <DxColumn data-field="comName" :caption="$t('comName')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center"  />
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" :allow-editing="false" :visible="false" alignment="center" />
                    <DxColumn data-field="facName" :caption="$t('facName')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="custCode" :caption="$t('custName')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="inType" :caption="$t('inType')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="inCate" :caption="$t('inCate')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="150" data-type="string" :allow-editing="false" :visible="true" alignment="left" />
                    <DxColumn data-field="inQty" :caption="$t('inQty')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="right" />
                    <DxColumn data-field="makeQty" :caption="$t('makeQty')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="right" />
                    <DxColumn data-field="boxQty" :caption="$t('boxQty')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="right"/>
                    <DxColumn
                      data-field="printType"
                      :caption="$t('printType')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      :visible="true"
                      alignment="center"
                    />
                    <DxColumn data-field="remark" :caption="$t('remark')" width="250" data-type="string" :allow-editing="false" :visible="true" alignment="left"/>
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center"/>
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      :visible="true"
                      alignment="left"
                    />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center"/>
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      :visible="true"
                      alignment="center"
                    />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" :allow-editing="false" :visible="true" alignment="center"/>
                    <DxColumn/>
                    <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                    <DxGrouping :auto-expand-all="gridData.autoExpandAll" />
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="gridData.mainGrid.checkBoxesMode" mode="single" />
                    <DxSummary>
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="inQty"
                        summary-type="sum"
                        :customize-text="customizeText"
                        display-format="Total: {0}"
                      />
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="makeQty"
                        summary-type="sum"
                        :customize-text="customizeText"
                        display-format="Total: {0}"
                      />
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="boxQty"
                        summary-type="sum"
                        :customize-text="customizeText"
                        display-format="Total: {0}"
                      />

                      <DxTotalItem column="inQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                      <DxTotalItem column="makeQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                      <DxTotalItem column="boxQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    </DxSummary>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
        <v-row no-gutters>
          <i-card-vertical :headerTitle="$t('detailStatus')">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox03"
                    :ref="gridDataDetail.mainGrid.ref"
                    :data-source="gridDataDetail.mainGrid.data"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    column-resizing-mode="widget"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @editing-start="editingStart"
                  >
                    <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                    <DxGrouping :auto-expand-all="gridDataDetail.autoExpandAll" />
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="gridDataDetail.mainGrid.checkBoxesMode" mode="single" />
                    <DxPager :show-page-size-selector="false" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    <DxColumn data-field="comName" :caption="$t('comName')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="facName" :caption="$t('facName')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="ilno" :caption="$t('ilno')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="no" :caption="$t('no')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="right" />
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="150" :allow-editing="false" data-type="string" :visible="true" alignment="left" />
                    <DxColumn data-field="partName" :caption="$t('partName')" width="200" :allow-editing="false" data-type="string" :visible="true" alignment="left" />
                    <DxColumn data-field="lotNo" :caption="$t('lotNo')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="qty" :caption="$t('qty')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="right" />
                    <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="left" />
                    <DxColumn data-field="printType" :caption="$t('printType')"  data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" ata-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="maker" :caption="$t('maker')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn data-field="editor" :caption="$t('editor')" data-type="string" width="auto" :allow-editing="false" :visible="true" alignment="center" />
                    <DxColumn/>
                    <DxSummary>
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="qty"
                        summary-type="sum"
                        :customize-text="customizeText"
                        display-format="Total: {0}"
                      />

                      <DxTotalItem column="qty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    </DxSummary>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import { DxDataGrid, DxColumn, DxLookup, DxGroupItem, DxSummary, DxGrouping, DxGroupPanel, DxTotalItem } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import { getMat0250, getMat0250Detail } from '@/api/view/mat0250'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getCustCodeName } from '@/api/view/bas0044'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getCurrentDate } from '@/utils/common.js'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode, getUserId } from '@/utils/token'

export default {
  name: 'mat0250',
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
      //상세현황 데이터
      selectedDetailData: [],
      //콤보박스
      comboBoxList: {
        facCodeList: [],
        inTypeList: [],
        inCateList: [],
        custCodeList: []
      },
      //검색 값
      searchValue: {
        facCode: '',
        inType: '',
        inCate: '',
        custCode: '',
        workFrDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() - 7))),
        workDate: getDateFormat(new Date())
      },
      //vuetify 달력 model
      calMenuState: {
        workFrDateCal: false,
        workDateCal: false
      },
      //기타/사급자재현황 그리드 데이터
      gridData: {
        mainGrid: {
          //메인그리드
          data: [],
          ref: 'etcMainRef'
        },
        autoExpandAll: true,
        checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick'
      },
      //상세현황 그리드 데이터
      gridDataDetail: {
        mainGrid: {
          //메인그리드
          data: [],
          ref: 'etcDetailRef'
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
    gridMainInstance() {
      return this.GetDataGrid(this.gridData.mainGrid.ref)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.gridDataDetail.mainGrid.ref)
    }
  },
  methods: {
    /*
     * 기타/사급자재현황 상세보기
     **/
    async selectDetail() {
      if (this.selectedDetailData.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
        return
      }
      this.openLoading()
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.selectedDetailData.facCode,
          regiDate: this.selectedDetailData.regiDate,
          ilno: this.selectedDetailData.ilno
        }
        console.log('params', params)
        let gridDataRes = await getMat0250Detail(params)
        console.log('asdasd', gridDataRes)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.id = cont++
        })
        this.gridDataDetail.mainGrid.data = copyArray
      } catch (error) {
        notify(error, 'error', 1500)
      }
      this.endLoading()
    },
    focusedRowChanged_selectDetail(e) {
      if (e === undefined) {
        return
      }
      this.selectedDetailData = e.row.data
      this.selectDetail()
    },

    //편집제어
    editingStart(e) {
      e.cancel = true
    },
    //퍼센트 포맷터
    percent(cellInfo) {
      return `${Math.floor(cellInfo.valueText)} %`
    },
    //숫자 포맷터
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    // 검색기능
    async mainGridSearch() {
      this.openLoading()
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode,
          workFrDate: this.searchValue.workFrDate,
          workDate: this.searchValue.workDate,
          inType: this.searchValue.inType,
          inCate: this.searchValue.inCate,
          custCode: this.searchValue.custCode
        }
        let gridDataRes = await getMat0250(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.id = cont++
        })
        this.gridData.mainGrid.data = copyArray
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
      try {
        /*
         * 공장명 콤보박스 설정
         **/
        let facCodeRes = await getFactoryInfoData({ comCode: getComCode() })
        facCodeRes.list.forEach(e => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
          this.searchValue.facCode = this.comboBoxList.facCodeList[0].value
        })
        /*
         * 거래처명 콤보박스 설정
         **/
        let custCodeRes = await getCustCodeName({ comCode: getComCode() })
        custCodeRes.list.forEach(e => {
          this.comboBoxList.custCodeList.push({
            text: e.custName,
            value: e.custCode
          })
        })
        /*
         * 입고구분 콤보박스 설정
         **/
        let inTypeInfo = {
          comCode: getComCode(),
          codegr: 'MAT',
          code: 'IN_TYPE'
        }
        let inTypeRes = await getCmChildCode(inTypeInfo)
        inTypeRes.list.forEach(e => {
          this.comboBoxList.inTypeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
        /*
         * 입고구분 콤보박스 설정
         **/
        let inCateInfo = {
          comCode: getComCode(),
          codegr: 'MAT',
          code: 'IN_CATE'
        }
        let inCateRes = await getCmChildCode(inCateInfo)
        inCateRes.list.forEach(e => {
          this.comboBoxList.inCateList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    //엑셀버튼
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, `${this.$t('purchaseOrderStatusDetails')}.xlsx`) // 엑셀파일 만듬
    }
  },
  mounted() {
    this.comboListSet().then(() => {
    })
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
