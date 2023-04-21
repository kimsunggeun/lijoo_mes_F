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
                <v-col cols="2">
                  <!-- 공장명 -->
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.facCode"
                    :label="$t('facName')"
                    :items="comboBoxList.facCodeList"
                    @change="comboChange('factory')"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 작업장명 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.workCode"
                    :label="$t('workName')"
                    :items="comboBoxList.workCodeList"
                    @change="comboChange('workCode')"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 작업반명 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.workDecode"
                    :label="$t('workDename')"
                    :items="comboBoxList.workDecodeList"
                    @change="comboChange('workDeCode')"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 불량코드 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.badCodeList"
                    @change="comboChange('badCode')"
                    v-model="searchValue.badCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('badCode')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 조회시작일 -->
                <v-col cols="2">
                  <v-menu
                    ref="frPlanDateCal"
                    v-model="calMenuState.frPlanDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('regiDate')"
                        v-model="searchValue.frPlanDate"
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
                      v-model="searchValue.frPlanDate"
                      no-title
                      @input="calMenuState.frPlanDateCal = false"
                      :day-format="
                        date => {
                          return new Date(date).getDate()
                        }
                      "
                    />
                  </v-menu>
                </v-col>
                <!-- 조회종료일 -->
                <v-col cols="2">
                  <v-menu
                    ref="toPlanDateCal"
                    v-model="calMenuState.toPlanDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('endDate')"
                        v-model="searchValue.toPlanDate"
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
                      v-model="searchValue.toPlanDate"
                      :min="searchValue.frPlanDate"
                      no-title
                      @input="calMenuState.toPlanDateCal = false"
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
        <i-card-vertical
          headerTitle="processDefectStatus"
          :useBtnList="[
            'btnExcel' //신규
          ]"
          @btnExcel="btnExcel()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="mainGrid"
                  class="listBox03"
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
                  <!--********************************************************************-->

                  <!-- 회사코드 Column -->
                  <DxColumn data-field="comCode" :caption="$t('comCode')" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <!-- 공장코드 Column -->
                  <DxColumn data-field="facCode" :caption="$t('facCode')" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <!-- 등록일 Column -->
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('regiDate')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 작업장명 Column -->
                  <DxColumn
                    data-field="workCode"
                    :caption="$t('workName')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 작업반명 Column -->
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDename')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 품번 Column -->
                  <DxColumn data-field="partNo" :caption="$t('partNo')" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <!-- 품명 Column -->
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 생산유형 Column -->
                  <DxColumn
                    data-field="prodType"
                    :caption="$t('prodType')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 불량코드 Column -->
                  <DxColumn data-field="defCode" :caption="$t('badCode')" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <!-- 불량수량 Column -->
                  <DxColumn
                    data-field="defCnt"
                    :caption="$t('faultyQty')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 불량 LOT Column -->
                  <DxColumn data-field="lotNo" :caption="$t('badLot')" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <!-- 불량전산번호 Column -->
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('badLotDetail')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 불량선별 코드 Column -->
                  <DxColumn
                    data-field="selectType"
                    :caption="$t('selectType')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 불량선별 양품수량 Column -->
                  <DxColumn
                    data-field="defOkCnt"
                    :caption="$t('defOkCnt')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  <!-- 불량선별 불량수량 Column -->
                  <DxColumn
                    data-field="defNgCnt"
                    :caption="$t('defNgCnt')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
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
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="defOkCnt"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="defNgCnt"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />

                    <DxTotalItem column="defOkCnt" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="defNgCnt" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
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
import { getPro0130 } from '@/api/view/pro0130'
import { getFactoryInfoData } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat } from '@/utils/common.js'
import { getComCode } from '@/utils/token'

import { getCmChildCode } from '@/api/system/cmCodeManage' //공통코드
import { getBas0034, getBas0035 } from '@/api/view/pro0050'
import { getWorkShopInfoData } from '@/api/view/bas0034'
import { getWorkPartyInfoData } from '@/api/view/bas0035'

import { userInfo } from 'os'
export default {
  name: 'pro0130',
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
    DxGroupItem,

    DxGroupPanel
  },

  data() {
    return {
      //콤보박스
      comboBoxList: {
        facCodeList: [],
        workCodeList: [],
        workDecodeList: [],
        partNameList: [],
        badCodeList: []
      },
      //검색 값
      searchValue: {
        facCode: '',
        workCode: '',
        workDecode: '',
        partNo: '',
        badCode: '',
        frPlanDate: getDateFormat(new Date().toISOString().substr(0, 10)),
        toPlanDate: getDateFormat(new Date().toISOString().substr(0, 10))
      },
      //vuetify 달력 model
      calMenuState: {
        frPlanDateCal: false,
        toPlanDateCal: false
      },
      //그리드 데이터
      girdData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'ref'
        },
        autoExpandAll: true
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
    // 검색기능
    async mainGridSearch() {
      this.openLoading()
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode,
          workFrDate: this.searchValue.frPlanDate,
          workDate: this.searchValue.toPlanDate,
          workCode: this.searchValue.workCode,
          workDecode: this.searchValue.workDecode,
          partNo: this.searchValue.partNo,
          defCode: this.searchValue.badCode
        }

        let gridDataRes = await getPro0130(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.id = cont++
        })
        this.girdData.mainGird.data = copyArray
      } catch (error) {
        notify(error, 'error', 1500)
      }
      this.endLoading()
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
            facCode: this.searchValue.facCode
          }
          let workCodeRes = await getBas0034(params)
          workCodeRes.list.forEach(e => {
            this.comboBoxList.workCodeList.push({
              value: e.workCode,
              text: e.workName
            })
          })
        } else if (target === 'workCode') {
          if (this.searchValue.workCode === null || this.searchValue.workCode === '') {
            this.disabledState.workDecode = true
            this.searchValue.workDecode = ''
          } else {
            this.disabledState.workDecode = false
          }
          let params = {
            comCode: getComCode(),
            facCode: this.searchValue.facCode,
            workCode: this.searchValue.workCode
          }
          let workDeCodeRes = await getBas0035(params)
          this.comboBoxList.workDecodeList = []
          workDeCodeRes.list.forEach(e => {
            this.comboBoxList.workDecodeList.push({
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
         * 작업장명 콤보박스 설정
         **/
        let workCodeInfo = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode
        }
        let workCodeRes = await getWorkShopInfoData(workCodeInfo)
        workCodeRes.list.forEach(e => {
          this.comboBoxList.workCodeList.push({
            text: e.workName,
            value: e.workCode
          })
        })
        //this.searchValue.workCode = this.comboBoxList.workCodeList[0].value
        /*
         * 작업반명 콤보박스 설정
         **/
        let workDecodeInfo = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode,
          workCode: this.searchValue.workCode
        }
        let workDecodeRes = await getWorkPartyInfoData(workDecodeInfo)
        workDecodeRes.list.forEach(e => {
          this.comboBoxList.workDecodeList.push({
            text: e.workDename,
            value: e.workDecode
          })
        })
        //this.searchValue.workDecode = this.comboBoxList.workDecodeList[0].value
        /*
         * 불량코드 콤보박스 설정
         **/
        let badCodeInfo = {
          comCode: getComCode(),
          codegr: 'COM',
          code: 'DEF_CODE'
        }
        let badCodeRes = await getCmChildCode(badCodeInfo)
        badCodeRes.list.forEach(e => {
          this.comboBoxList.badCodeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
        //this.searchValue.badCode = this.comboBoxList.badCodeList[0].value
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
    this.comboListSet().then(() => {
      this.mainGridSearch()
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
