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
                  />
                </v-col>
                <!-- <v-col cols="2">
                  <v-autocomplete
                    :prepend-inner-icon="'$search'"
                    :label="$t('whCode')"
                    v-model="searchValue.whCode"
                    :items="comboBoxList.whCodeList"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  ></v-autocomplete>
                </v-col> -->
                <v-col cols="2">
                  <v-autocomplete
                    :prepend-inner-icon="'$search'"
                    :label="$t('inType')"
                    v-model="searchValue.inType"
                    :items="comboBoxList.inTypeList"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  ></v-autocomplete>
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
                        :prepend-inner-icon="'$search'"
                        :label="$t('returnDate')"
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
                        :prepend-inner-icon="'$search'"
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
        <i-card-vertical
          headerTitle="returnStatus"
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
                  column-resizing-mode="widget"
                  :ref="gridData.mainGird.ref"
                  :data-source="gridData.mainGird.data"
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
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="gridData.autoExpandAll" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />

                  <!--********************************************************************-->

                  <DxColumn data-field="comName" :caption="$t('comName')" width="auto" data-type="string" alignment="center" :visible="false"/>
                  <DxColumn data-field="facName" :caption="$t('facName')" width="auto" data-type="string" alignment="center" :visible="false"/>
                  <DxColumn data-field="retDate" :caption="$t('returnDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="inType" :caption="$t('inType')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="inTypeData" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false"/>
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false"/>
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="retCode" :caption="$t('retCode')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="retCodeData" display-expr="sysName" value-expr="sysCode"/> 
                  </DxColumn>
                  <DxColumn data-field="inQty" :caption="$t('inQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false"/>
                  <DxColumn data-field="retQty" :caption="$t('retQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false"/>
                  <DxColumn data-field="retAmount" :caption="$t('retAmount')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false"/>
                  <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn/>
                  <DxSummary>
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="qty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    /><DxGroupItem
                      :show-in-group-footer="true"
                      column="inQty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem column="qty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
                    <DxTotalItem column="inQty" summary-type="sum" :customize-text="customizeText" display-format="Total: {0}" />
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
import { getMat0270 } from '@/api/view/mat0270'
import { getOutWh } from '@/api/view/pop0040'
import { getFactoryInfoData } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat } from '@/utils/common.js'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'
import { getCustomName } from '@/api/view/bas0310'
import { getAccount } from '@/api/view/mat0010'

export default {
  name: 'mat0270',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxLookup,
    DxGroupPanel,

    DxGroupItem,
    DxSummary,
    DxTotalItem
  },

  data() {
    return {
      //콤보박스
      comboBoxList: {
        comCodeList: [],
        facCodeList: [],
        whCodeList: [],
        inTypeList: []
      },
      //검색 값
      searchValue: {
        comCode: '',
        facCode: '',
        whCode: '',
        inType: '',
        workFrDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() - 7))),
        workDate: getDateFormat(new Date())
      },
      //vuetify 달력 model
      calMenuState: {
        frRegiDateCal: false,
        toRegiDateCal: false
      },
      //그리드 데이터
      gridData: {
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
      },
      custCode: [],
      inType: [],
      inTypeData: [],
      retCodeData: []
    }
  },
  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y'
    }

    //입고구분
    let params2 = {
      comCode: getComCode(),
      codegr: 'MAT',
      code: 'IN_TYPE',
      userFlag: 'Y'
    }
    let params3 = {
      comCode: getComCode(),
      code: 'SELECT_TYPE',
      codegr: 'COM',
      userFlag: 'Y'
    }
    Promise.all([getAccount(params), getCmChildCode(params2), getCmChildCode(params3)])
      .then(res => {
        this.custCode = res[0].list.slice()
        this.inType = res[1].list.slice()
        this.inTypeData = res[1].list.slice()
        this.retCodeData = res[2].list.slice()
      })
      .catch(error => {})
  },
  computed: {
    griMainInstance() {
      return this.GetDataGrid(this.gridData.mainGird.ref)
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
          workFrDate: this.searchValue.workFrDate,
          workDate: this.searchValue.workDate,
          inType: this.searchValue.inType,
          whCode: this.searchValue.whCode
        }
        let gridDataRes = await getMat0270(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.id = cont++
          e.makeDate = e.makeDate.substr(0, 10)
        })
        this.gridData.mainGird.data = copyArray
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
         * 창고코드 콤보박스 설정
         **/
        let whCodeInfo = {
          comCode: getComCode()
        }
        let whCodeRes = await getOutWh(whCodeInfo)
        whCodeRes.list.forEach(e => {
          this.comboBoxList.whCodeList.push({
            text: e.locName,
            value: e.locCode
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
      } catch (error) {
        notify(error, 'error', 4500)
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
      //this.mainGridSearch()
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
