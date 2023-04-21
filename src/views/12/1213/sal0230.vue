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
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.facCode"
                    :label="$t('facName')"
                    :items="comboBoxList.facCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.custNameList"
                    v-model="searchValue.custCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('custName')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field 
                    v-model="searchValue.partNm" 
                    label="품명" 
                    dense 
                    outlined 
                    hide-details="auto"
                    class="mx-1" 
                    clearable />
                </v-col>
              </v-row>

              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 반품일 캘린더 -->
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
                        :prepend-inner-icon="'$search'"
                        :label="$t('returnDate')"
                        v-model="searchValue.workFrDate"
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
                      v-model="searchValue.workFrDate" 
                      no-title 
                      @input="calMenuState.workFrDateCal = false" 
                      :day-format="(date) => { return new Date(date).getDate(); }"
                    />
                  </v-menu>
                </v-col>
                <!-- ~ -->
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
                        :prepend-inner-icon="'$search'"
                        :label="$t('endDate')"
                        v-model="searchValue.workDate"
                        dense
                        outlined
                        color="primary"
                        readonly
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker 
                      v-model="searchValue.workDate" 
                      :min="searchValue.workFrDate" 
                      no-title 
                      @input="calMenuState.workDateCal = false"
                      :day-format="(date) => { return new Date(date).getDate(); }" 
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
          headerTitle="shipmentReturnStatus"
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
                  :ref="gridData.mainGrid.ref"
                  :data-source="gridData.mainGrid.data"
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
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  column-resizing-mode="widget"
                  @editing-start="editingStart"
                >
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="gridData.autoExpandAll" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <!--********************************************************************-->

                        <!-- 회사코드 -->
                        <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 공장코드 -->
                        <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 반품일 -->
                        <DxColumn data-field="retDate" :caption="$t('returnDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품번호 -->
                        <DxColumn data-field="retNo" caption="반품번호" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 출하 LOT -->
                        <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품전산번호 -->
                        <DxColumn data-field="retLotDetail" :caption="$t('retLotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품불량사유코드 -->
                        <DxColumn
                          data-field="custCode"
                          :caption="$t('custName')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboBoxList.custNameList" display-expr="text" value-expr="value" opened="true" /> 
                        </DxColumn>
                        <!-- 품번 -->
                        <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" :visible="true" alignment="left" :allow-editing="false" />
                        <!-- 품명 -->
                        <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" :visible="true" alignment="left" :allow-editing="false" />
                        <!-- 출하일련번호 -->
                        <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" :visible="true" alignment="center" :allow-editing="false" />
                        <!-- 출하전산번호 -->
                        <DxColumn data-field="lotDetail" :caption="$t('shipmentLotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품구분 코드 -->
                        <DxColumn
                          data-field="retCode"
                          :caption="$t('retCode')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                         <DxLookup :data-source="comboBoxList.retCodeList" display-expr="text" value-expr="value" opened="true" /> 
                        </DxColumn>
                        <!-- 반품불량사유코드 -->
                        <DxColumn
                          data-field="retType"
                          :caption="$t('retType')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboBoxList.retTypeList" display-expr="text" value-expr="value" opened="true" /> 
                        </DxColumn>
                        <!-- 반품 창고코드 -->
                        <DxColumn
                          data-field="locCode"
                          :caption="$t('retWhCode')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboBoxList.locCodeList" display-expr="text" value-expr="value" opened="true" /> 
                        </DxColumn>
                        <!-- 반품수량 -->
                        <DxColumn
                          data-field="retQty"
                          :caption="$t('retQty')"
                          width="auto" 
                          data-type="string"
                          alignment="right"
                          :allow-editing="false"
                          :customize-text="customizeText"
                        />
                        <!-- 비고 -->
                        <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                        <DxColumn/>
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
import { getCustCodeName } from '@/api/view/bas0044'
import { DxDataGrid, DxColumn, DxGrouping, DxGroupPanel, DxLookup } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import { getSal0230 } from '@/api/view/sal0230'
import { getOutWh } from '@/api/view/pop0040'
import { getFactoryInfoData } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'
import { getDateFormat, getPreMonth } from '@/utils/common.js'

export default {
  name: 'sal0230',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxLookup
  },

  data() {
    return {
      //콤보박스
      comboBoxList: {
        facCodeList: [],
        retTypeList: [],
        retCodeList: [],
        locCodeList: [],
        custNameList: []
      },
      //검색 값
      searchValue: {
        facCode: '',
        custCode: '',
        partNm: '',
        workFrDate: getPreMonth(2),
        workDate: getDateFormat(new Date())
      },
      //검색일자
      calMenuState: {
        workFrDateCal: false,
        workDateCal: false
      },
      //그리드 데이터
      gridData: {
        mainGrid: {
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
      },
      custCode: [],
      inType: []
    }
  },
  computed: {
    griMainInstance() {
      return this.GetDataGrid(this.gridData.mainGrid.ref)
    }
  },
  methods: {
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
          custCode: this.searchValue.custCode,
          partNm: this.searchValue.partNm,
          workDate: this.searchValue.workDate,
          workFrDate: this.searchValue.workFrDate
        }
        let gridDataRes = await getSal0230(params)
        let copyArray = [...gridDataRes.list]
        this.gridData.mainGrid.data = copyArray
        console.log(this.gridData.mainGrid.data);
      } catch (error) {
        this.vToastify(error, 'warn')
        return
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
         * 공장코드 콤보박스 설정
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
         let custNameInfo = {
          comCode: getComCode()
        }
        let custNameRes = await getCustCodeName(custNameInfo)
        custNameRes.list.forEach(e => {
          this.comboBoxList.custNameList.push({
            text: e.custName,
            value: e.custCode
          })
        })

        /*
         * 창고코드 콤보박스 설정
         **/
        let locCodeInfo = {
          comCode: getComCode()
        }
        let locCodeRes = await getOutWh(locCodeInfo)
        locCodeRes.list.forEach(e => {
          this.comboBoxList.locCodeList.push({
            text: e.locName,
            value: e.locCode
          })
        })
        /*
         * 반품구분 코드 콤보박스 설정
         **/
        let retCodeInfo = {
          comCode: getComCode(),
          codegr: 'COM',
          code: 'SELECT_TYPE'
        }
        let retCodeRes = await getCmChildCode(retCodeInfo)
        retCodeRes.list.forEach(e => {
          this.comboBoxList.retCodeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })

        /*
         * 반품사유 코드 콤보박스 설정
         **/
        let retTypeInfo = {
          comCode: getComCode(),
          codegr: 'COM',
          code: 'DEF_CODE'
        }
        let retTypeRes = await getCmChildCode(retTypeInfo)
        retTypeRes.list.forEach(e => {
          this.comboBoxList.retTypeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
      } catch (error) {
        notify(error, 'error', 4500)
      }
    },
    //엑셀버튼
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다
      workSheet['!cols'] = [{width: 15}]
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, `${this.$t('purchaseOrderStatusDetails')}.xlsx`) // 엑셀파일 만듬
    }
  },
  beforeMount() {
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
