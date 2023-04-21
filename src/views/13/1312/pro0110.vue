
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
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
                    @change="comboChange('factory')"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined

                  />
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.itemType"
                    :label="$t('itemType')"
                    :items="comboBoxList.itemTypeList"
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
                    class="required mx-1"
                    v-model="searchValue.partType"
                    :label="$t('partType')"
                    :items="comboBoxList.partTypeList"
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
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.workCodeList"
                    v-model="searchValue.workCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('workCode')"
                    @change="comboChange('workCode')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.workDecodeList"
                    v-model="searchValue.workDecode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('workDecode')"
                    :disabled="disabledState.workDecode"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
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
                        :prepend-inner-icon="'$search'"
                        :label="$t('orderDate')"
                        v-model="searchValue.frPlanDate"
                        dense
                        outlined
                        readonly
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="searchValue.frPlanDate"
                     no-title 
                     @input="calMenuState.frPlanDateCal = false"
                    :day-format="
                        date => {
                          return new Date(date).getDate()
                        }
                      "></v-date-picker>
                  </v-menu>
                </v-col>
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
                        :prepend-inner-icon="'$search'"
                        :label="$t('endDate')"
                        v-model="searchValue.toPlanDate"
                        dense
                        outlined
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="searchValue.toPlanDate"
                      :min="searchValue.frPlanDate"
                      no-title
                      :day-format="
                        date => {
                          return new Date(date).getDate()
                        }
                      "
                      @input="calMenuState.toPlanDateCal = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="searchValue.partNo"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  ></v-text-field>
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
          headerTitle="workOrderProgressStatus"
          :useBtnList="[
            'btnExcel', //신규
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
                  <DxColumn data-field="comCode"  :caption="$t('comCode')" data-type="string" alignment="center" :visible="false" />
                  <DxColumn data-field="planDate" :caption="$t('orderDate')" data-type="string" alignment="center" :allow-editing="false" width = "auto" />
                  <DxColumn data-field="workCrew" :caption="$t('workCrewName')" data-type="string" alignment="center" :allow-editing="false" width = "auto"/>
                  <DxColumn data-field="workCode" :caption="$t('workName')" data-type="string" alignment="center" :allow-editing="false" width = "auto" />
                  <DxColumn data-field="workDecode" :caption="$t('workDename')" data-type="string" alignment="center" :allow-editing="false" width = "auto"/>

                  <DxColumn data-field="workNo" :caption="$t('workNo')" data-type="string" alignment="center" :allow-editing="false" width = "auto"/>

                  <DxColumn data-field="orderState" :caption="$t('orderStateName')" data-type="string" alignment="center" :allow-editing="false" width = "auto">
                    <DxLookup :data-source="comboBoxList.orderStateList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn data-field="priCode" :caption="$t('priority')" data-type="string" alignment="center" :allow-editing="false" width = "auto">
                    <DxLookup :data-source="comboBoxList.priCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn data-field="itemType" :caption="$t('itemTypeNm')" data-type="string" alignment="center" :allow-editing="false" width = "auto">
                    <DxLookup :data-source="comboBoxList.itemTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn data-field="partType" :caption="$t('partTypeNm')" data-type="string" alignment="center" :allow-editing="false" width = "auto">
                    <DxLookup :data-source="comboBoxList.partTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn data-field="partNo" :caption="$t('partNo')" data-type="string" alignment="center" :allow-editing="false"  width = "auto"/>
                  <DxColumn data-field="partName" :caption="$t('partName')" data-type="string" alignment="center" :allow-editing="false"  width = "auto"/>
                  <DxColumn data-field="partSpec" :caption="$t('partSpec')" data-type="string" alignment="center" :allow-editing="false"  width = "auto"/>

                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" data-type="string" alignment="center" :allow-editing="false"  width = "auto"/>

                  <DxColumn data-field="unit" :caption="$t('partUnit')" data-type="string" alignment="center" :allow-editing="false" width = "auto">
                    <DxLookup :data-source="comboBoxList.unitList" display-expr="text" value-expr="value" />
                  </DxColumn>

                  <DxColumn
                    data-field="orderQty"
                    :caption="$t('orderQty')"
                    data-type="string"
                    alignment="right"
                    :customize-text="customizeText"
                    :allow-editing="false"
                    width = "auto"
                  />
                  <DxColumn
                    data-field="qty"
                    :caption="$t('qty')"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                    width = "auto"
                  />
                  <DxColumn
                    data-field="proRate"
                    :caption="$t('proRate')"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="percent"
                    width = "auto"
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
import { getPro0110 } from '@/api/view/pro0110'
import { getFactoryInfoData } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat } from '@/utils/common.js'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'

import { getBas0034, getBas0035 } from '@/api/view/pro0050'

import { userInfo } from 'os'
export default {
  name: 'pro0110',
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

    DxGroupPanel,
  },

  data() {
    return {
      //콤보박스
      comboBoxList: {
        facCodeList: [],
        workCodeList: [],
        workDecodeList: [],
        itemTypeList: [],
        partTypeList: [],
        unitList: [],
        orderStateList: [],
        priCodeList: [],
      },
      //검색 값
      searchValue: {
        facCode: '',
        partNo: '',
  
        workCode: '',
        workDecode: '',
        itemType: '',
        partType: '',
        frPlanDate: getDateFormat(new Date()),
        toPlanDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7))),
      },
      //vuetify 달력 model
      calMenuState: {
        frPlanDateCal: false,
        toPlanDateCal: false,
      },
      //그리드 데이터
      girdData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'ref',
        },
        autoExpandAll: true,
      },
      //비활성화 관련
      disabledState: {
        workDecode: true,
      },
    }
  },
  computed: {
    griMainInstance() {
      return this.GetDataGrid(this.girdData.mainGird.ref)
    },
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
          partNo: this.searchValue.partNo,
      
          workCode: this.searchValue.workCode,
          workDecode: this.searchValue.workDecode,
          itemType: this.searchValue.itemType,
          partType: this.searchValue.partType,
          frPlanDate: this.searchValue.frPlanDate,
          toPlanDate: this.searchValue.toPlanDate,
        }

        let gridDataRes = await getPro0110(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach((e) => {
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
            facCode: this.searchValue.facCode,
          }
          let workCodeRes = await getBas0034(params)
          workCodeRes.list.forEach((e) => {
            this.comboBoxList.workCodeList.push({
              value: e.workCode,
              text: e.workName,
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
            workCode: this.searchValue.workCode,
          }
          let workDeCodeRes = await getBas0035(params)
          this.comboBoxList.workDecodeList = []
          workDeCodeRes.list.forEach((e) => {
            this.comboBoxList.workDecodeList.push({
              value: e.workDeCode,
              text: e.workDename,
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
        let params = {
          comCode: getComCode(),
          code: 'ITEM_TYPE,PART_TYPE,UNIT,ORDER_STATE,PRI_CODE',
        }
        ////////////////////////////////////////////////////////////////////
        let cmCodeRes = await getCmChildCode(params)

        cmCodeRes.list
          .filter((word) => word.code === 'ITEM_TYPE')
          .forEach((e) => {
            this.comboBoxList.itemTypeList.push({
              text: e.sysName,
              value: e.sysCode,
            })
          })
        cmCodeRes.list
          .filter((word) => word.code === 'PART_TYPE')
          .forEach((e) => {
            this.comboBoxList.partTypeList.push({
              text: e.sysName,
              value: e.sysCode,
            })
          })
        cmCodeRes.list
          .filter((word) => word.code === 'UNIT')
          .forEach((e) => {
            this.comboBoxList.unitList.push({
              text: e.sysName,
              value: e.sysCode,
            })
          })
        cmCodeRes.list
          .filter((word) => word.code === 'ORDER_STATE' && word.codegr === 'PRO')
          .forEach((e) => {
            this.comboBoxList.orderStateList.push({
              text: e.sysName,
              value: e.sysCode,
            })
          })
        cmCodeRes.list
          .filter((word) => word.code === 'PRI_CODE' && word.codegr === 'PRO')
          .forEach((e) => {
            this.comboBoxList.priCodeList.push({
              text: e.sysName,
              value: e.sysCode,
            })
          })
        ////////////////////////////////////////////////////////////////////
        let facCodeRes = await getFactoryInfoData(params)
        facCodeRes.list.forEach((e) => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode,
          })
        })
        ////////////////////////////////////////////////////////////////////
        this.searchValue.facCode = this.comboBoxList.facCodeList[0].value
        this.comboChange('factory')
        ////////////////////////////////////////////////////////////////////
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
    },
  },
  mounted() {
    this.comboListSet()
  },
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