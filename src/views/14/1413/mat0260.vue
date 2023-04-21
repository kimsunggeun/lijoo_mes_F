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
                    v-model="searchValue.custCode"
                    :label="$t('standard')"
                    :items="comboBoxList.custCodeList"
                    item-text="text"
                    item-value="value"
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
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.custCode"
                    :label="$t('itemGroup')"
                    :items="comboBoxList.custCodeList"
                    item-text="text"
                    item-value="value"
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
                    v-model="searchValue.custCode"
                    :label="$t('suite')"
                    :items="comboBoxList.custCodeList"
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
                    ref="frRegiDateCal"
                    v-model="calMenuState.frRegiDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('inquiryDate')"
                        v-model="searchValue.frRegiDate"
                        dense
                        outlined
                        color="primary"
                        readonly
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="searchValue.frRegiDate" no-title @input="calMenuState.frRegiDateCal = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="toRegiDateCal"
                    v-model="calMenuState.toRegiDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('endDate')"
                        v-model="searchValue.toRegiDate"
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
                      v-model="searchValue.toRegiDate"
                      :min="searchValue.frRegiDate"
                      no-title
                      @input="calMenuState.toRegiDateCal = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.custCode"
                    :label="$t('division')"
                    :items="comboBoxList.custCodeList"
                    item-text="text"
                    item-value="value"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="searchValue.partName"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.custCode"
                    :label="$t('shipmentWarehouse')"
                    :items="comboBoxList.custCodeList"
                    item-text="text"
                    item-value="value"
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
        <v-row>
          <i-card-vertical :headerTitle="$t('purchaseStatusByCustomer')" :useBtnList="['btnSearch']">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0 ">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox"
                    :ref="gridRef2"
                    :data-source="gridDataSource2"
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
                    :selection="{ mode: 'none' }"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>

                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('facCode')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('ordNo')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('no')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('regiDate')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('ilno')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('partNo')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('qty')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('inQty')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('makeQty')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('boxQty')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('inPrice')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('inAmount')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('remQty')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('status')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('inType')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('remark')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('printType')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('userFlag')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('makeDate')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('maker')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('editDate')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('editor')" width="auto" data-type="string" :visible="true" />
                    <DxColumn/>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
        <v-row>
          <i-card-vertical :headerTitle="$t('detailStatus')" :useBtnList="['btnSearch']">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0 ">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox03"
                    :ref="gridRef2"
                    :data-source="gridDataSource2"
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
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="single" />
                    <DxPager :show-page-size-selector="false" />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>

                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('facCode')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('ordNo')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('no')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('regiDate')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('ilno')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('serialNo')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('partNo')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('lotNo')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('lotDetail')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('qty')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('remark')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('printType')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('userFlag')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('makeDate')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('maker')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('editDate')" width="auto" data-type="string" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('editor')" width="auto" data-type="string" :visible="true" />
                    <DxColumn/>
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
import { getMat0220 } from '@/api/view/mat0220'
import { getFactoryInfoData } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat } from '@/utils/common.js'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getComCode } from '@/utils/token'
import { getCustomName } from '@/api/view/bas0310'

export default {
  name: 'mat0260',
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
        itemTypeList: [],
        partTypeList: [],
        custCodeList: [],
        unitList: [],
        orderStateList: []
      },
      //검색 값
      searchValue: {
        facCode: '',
        partNo: '',
        partName: '',
        ordNo: '',
        itemType: '',
        partType: '',
        custCode: '',
        frRegiDate: getDateFormat(new Date()),
        toRegiDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7)))
      },
      //vuetify 달력 model
      calMenuState: {
        frRegiDateCal: false,
        toRegiDateCal: false
      },
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
          frRegiDate: this.searchValue.frRegiDate,
          toRegiDate: this.searchValue.toRegiDate,
          ordNo: this.searchValue.ordNo,
          partNo: this.searchValue.partNo,
          partName: this.searchValue.partName,
          custCode: this.searchValue.custCode
        }

        let gridDataRes = await getMat0220(params)
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

    //콤보박스 배열 생성
    async comboListSet() {
      try {
        let params = {
          comCode: getComCode(),
          code: 'ITEM_TYPE,PART_TYPE,UNIT,ORDER_STATE,UNIT'
        }
        ////////////////////////////////////////////////////////////////////
        let cmCodeRes = await getCmChildCode(params)
        let custCodeRes = await getCustomName(params)
        let facCodeRes = await getFactoryInfoData(params)
        ////////////////////////////////////////////////////////////////////
        cmCodeRes.list
          .filter(word => word.code === 'ITEM_TYPE')
          .forEach(e => {
            this.comboBoxList.itemTypeList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })
        cmCodeRes.list
          .filter(word => word.code === 'PART_TYPE')
          .forEach(e => {
            this.comboBoxList.partTypeList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })
        cmCodeRes.list
          .filter(word => word.code === 'UNIT')
          .forEach(e => {
            this.comboBoxList.unitList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })
        cmCodeRes.list
          .filter(word => word.code === 'ORDER_STATE' && word.codegr === 'PRO')
          .forEach(e => {
            this.comboBoxList.orderStateList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })

        ////////////////////////////////////////////////////////////////////
        facCodeRes.list.forEach(e => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
        })
        ////////////////////////////////////////////////////////////////////
        custCodeRes.list.forEach(e => {
          this.comboBoxList.custCodeList.push({
            text: e.custName,
            value: e.custCode
          })
        })
        ////////////////////////////////////////////////////////////////////
        this.searchValue.facCode = this.comboBoxList.facCodeList[0].value

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
      this.$xlsx.writeFile(workBook, `${this.$t('purchaseOrderStatusDetails')}.xlsx`) // 엑셀파일 만듬
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
