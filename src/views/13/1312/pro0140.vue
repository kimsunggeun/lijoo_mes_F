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
                    @change="comboChange('factory')"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 설비명 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.eqCodeList"
                    v-model="searchValue.eqCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('eqName')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <!-- 작업장 -->
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
                    :label="$t('workName')"
                    @change="comboChange('workCode')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <!-- 작업반 -->
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
                    :label="$t('workDename')"
                    :disabled="disabledState.workDecode"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <!-- 비가동 코드 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.stopCodeList"
                    v-model="searchValue.stopCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('nonOperationCode')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <!-- 비가동 일자 -->
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
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('nonOperationDate')"
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
                    <v-date-picker
                      v-model="searchValue.frPlanDate"
                      no-title
                      @input="calMenuState.frPlanDateCal = false"
                      :day-format="
                        date => {
                          return new Date(date).getDate()
                        }
                      "
                    ></v-date-picker>
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
                      ></v-text-field>
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
        <i-card-vertical headerTitle="NonOperationStatus" :useBtnList="[]">
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
                  <DxColumn data-field="facCode" :caption="$t('facCode')" data-type="string" alignment="center" :allow-editing="false" width="auto">
                    <DxLookup :data-source="comboBoxList.facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="nonIlno"
                    :caption="$t('nonOperationIlno')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="no"
                    :caption="$t('nonOperationNo')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn data-field="workNo" :caption="$t('workNo')" data-type="string" alignment="center" :allow-editing="false" width="auto" />

                  <DxColumn
                    data-field="workDate"
                    :caption="$t('nonOperationDate')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />

                  <DxColumn data-field="eqName" :caption="$t('eqName')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <DxColumn
                    data-field="workCode"
                    :caption="$t('workCode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="workName"
                    :caption="$t('workName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDecode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="workDename"
                    :caption="$t('workDename')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="stopCode"
                    :caption="$t('nonOperationCode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                    ><DxLookup :data-source="comboBoxList.stopCodeList" display-expr="text" value-expr="value"
                  /></DxColumn>
                  <DxColumn
                    data-field="startTime"
                    :caption="$t('nonOperationTime')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="endTime"
                    :caption="$t('nonOperationEndTime')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="stopTime"
                    :caption="$t('Downtime_minutes')"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" alignment="center" :allow-editing="false" width="500px" />

                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                  <DxColumn data-field="maker" :caption="$t('maker')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    data-type="date"
                    format="yyyy-MM-dd hh:mm:ss"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn data-field="editor" :caption="$t('editor')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    data-type="date"
                    format="yyyy-MM-dd hh:mm:ss"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
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
                      column="partUnit"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />

                    <DxTotalItem column="stopTime" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="defectiveAmount" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
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
import { getPro0140, getBas0035 } from '@/api/view/pro0140'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getFacilityInfo } from '@/api/view/bas0250'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat } from '@/utils/common.js'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'

import { getBas0034 } from '@/api/view/pro0050'

import { userInfo } from 'os'
export default {
  name: 'pro0140',
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
      comboBoxList: {
        facCodeList: [],
        workCodeList: [],
        workDecodeList: [],
        eqCodeList: [],
        stopCodeList: []
      },
      //검색 값
      searchValue: {
        facCode: '',
        partNo: '',
        partNm: '',
        workCode: '',
        workDecode: '',
        itemType: '',
        partType: '',
        frPlanDate: getDateFormat(new Date()),
        toPlanDate: getDateFormat(new Date())
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
          eqCode: this.searchValue.eqCode,
          workCode: this.searchValue.workCode,
          workDecode: this.searchValue.workDecode,
          stopCode: this.searchValue.stopCode,
          frPlanDate: this.searchValue.frPlanDate,
          toPlanDate: this.searchValue.toPlanDate
        }

        let gridDataRes = await getPro0140(params)
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
          //작업장 코드 콤보박스 설정
          let workCodeRes = await getBas0034(params)
          workCodeRes.list.forEach(e => {
            this.comboBoxList.workCodeList.push({
              value: e.workCode,
              text: e.workName
            })
          })
        } else if (target === 'workCode') {
          //작업반 코드 콤보박스 설정
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
        //비가동 코드
        let params = {
          comCode: getComCode(),
          code: 'STOP_CODE'
        }
        let param = {
          comCode: getComCode(),
          facCode: 'FAC01'
        }
        ////////////////////////////////////////////////////////////////////
        let eqCodelist = await getFacilityInfo(param)
        eqCodelist.list.forEach(e => {
          this.comboBoxList.eqCodeList.push({
            text: e.eqName,
            value: e.eqCode
          })
        })

        let cmCodeRes = await getCmChildCode(params)

        cmCodeRes.list
          .filter(word => word.code === 'STOP_CODE')
          .forEach(e => {
            this.comboBoxList.stopCodeList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })
        ////////////////////////////////////////////////////////////////////
        let facCodeRes = await getFactoryInfoData(params)
        facCodeRes.list.forEach(e => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
        })
        ////////////////////////////////////////////////////////////////////
        let facDcodeRes = await getBas0035(params)
        facDcodeRes.list.forEach(e => {
          this.comboBoxList.facDecodeList.push({
            text: e.facName,
            value: e.facCode
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
