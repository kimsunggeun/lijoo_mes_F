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
                    class="mx-1"
                    v-model="searchValue.custCode"
                    :label="$t('custName')"
                    :items="comboBoxList.custCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="searchValue.partNo"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                    @keydown.enter="btnSearch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partName')"
                    v-model="searchValue.partName"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                    @keydown.enter="btnSearch()"
                  ></v-text-field>
                </v-col>
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
                    :prepend-inner-icon="'$search'"
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
                        :prepend-inner-icon="'$search'"
                        :label="$t('inRegiDate')"
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
                        :prepend-inner-icon="'$search'"
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

                <!-- <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partName')"
                    v-model="searchValue.partNm"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  ></v-text-field>
                </v-col> -->
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical
          headerTitle="purchOrderStatus"
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
                  column-resizing-mode="widget"
                  :ref="girdData.mainGird.ref"
                  :data-source="girdData.mainGird.data"
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
                  @editing-start="editingStart"
                >
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="autoExpandAll" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <!--********************************************************************-->
                  <DxColumn data-field="comCode" :caption="$t('comCode')" data-type="string" width="auto" alignment="center" :visible="false"/>
                  <DxColumn data-field="facCode" :caption="$t('facCode')" data-type="string" width="auto" alignment="center" :visible="false"/>
                  <DxColumn data-field="custCode" :caption="$t('custName')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="custCode" display-expr="custName" value-expr="custCode" />
                  </DxColumn>
                  <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="ilNo" :caption="$t('ilno')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="inType" :caption="$t('inType')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="inType" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="150" data-type="string" alignment="left" :allow-editing="false"/>
                  <DxColumn data-field="partName" :caption="$t('partName')" width="200" data-type="string" alignment="left" :allow-editing="false"/>
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="qty" :caption="$t('qty')" data-type="string" width="auto" alignment="right" :customize-text="customizeText" :allow-editing="false"/>
                  <DxColumn data-field="remark" :caption="$t('remark')" width="250" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="printType" :caption="$t('printType')" data-type="boolean" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="userFlag" :caption="$t('userFlag')" data-type="boolean" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="maker" :caption="$t('maker')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="editDate" :caption="$t('editDate')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="editor" :caption="$t('editor')" data-type="string" width="auto" alignment="center" :allow-editing="false"/>
                  <DxColumn/>
                  <DxSummary>
                    <DxGroupItem column="OrderNumber" summary-type="count" display-format="{0} orders" />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="qty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="{0}"
                    />
                    <DxTotalItem column="qty" summary-type="sum" :customize-text="customizeText" display-format="{0}" />
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
import { getMat0230 } from '@/api/view/mat0230'
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
  name: 'mat0230',
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
    DxTotalItem,
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
        orderStateList: [],
        inTypeList:[],
      },
      //검색 값
      searchValue: {
        facCode: '',
        partNo: '',
        partName: '',
        inType: '',
        itemType: '',
        partType: '',
        custCode: '',
        frRegiDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() - 7))),
        toRegiDate: getDateFormat(new Date()),
      },
      //vuetify 달력 model
      calMenuState: {
        frRegiDateCal: false,
        toRegiDateCal: false,
      },
      //그리드 데이터
      girdData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'ref',
        },
        autoExpandAll: true,
        checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      },
      //비활성화 관련
      disabledState: {
        workDecode: true,
      },
      custCode: [],
      inType: [],
    }
  },
  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
    }


    //입고구분
    let params2 = {
      comCode: getComCode(),
      codegr: 'MAT',
      code: 'IN_TYPE',
      userFlag: 'Y',
    }
    Promise.all([
      getAccount(params),
      getCmChildCode(params2),
    ])
      .then((res) => {
        this.custCode = res[0].list.slice()

        this.inType = res[1].list.slice()
      })
      .catch((error) => { })
  },
  computed: {
    griMainInstance() {
      return this.GetDataGrid(this.girdData.mainGird.ref)
    },
  },
  methods: {
    //편집제어
    editingStart(e) {
      e.cancel = true
    },
    //퍼센트 포맷터
    percent(cellInfo) {
      return  `${Math.floor(cellInfo.valueText)} %`
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
          inType: this.searchValue.inType,
          partNo: this.searchValue.partNo,
          partName: this.searchValue.partName,
          custCode: this.searchValue.custCode,
        }
        let gridDataRes = await getMat0230(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach((e) => {
          e.id = cont++
          e.makeDate = e.makeDate.substr(0,10)
          if(e.printType === 'N' || e.printType === '' || e.printType === null){
            e.printType = false
          } else {
            e.printType = true
          }
          if(e.userFlag === 'N' || e.userFlag === '' || e.userFlag === null){
            e.userFlag = false
          } else {
            e.userFlag = true
          }
        })
        this.girdData.mainGird.data = copyArray
        console.log("copyarry",copyArray)
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
        let params = {
          comCode: getComCode(),
          code: 'ITEM_TYPE,PART_TYPE,UNIT,ORDER_STATE,UNIT,IN_TYPE',
        }
        ////////////////////////////////////////////////////////////////////
        let cmCodeRes = await getCmChildCode(params)
        let custCodeRes = await getCustomName(params)
        let facCodeRes = await getFactoryInfoData(params)
        let inTypeRes = await getCmChildCode(params)
        ////////////////////////////////////////////////////////////////////
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
          .filter((word) => word.code === 'IN_TYPE' && word.codegr === 'MAT')
          .forEach((e) => {
            this.comboBoxList.inTypeList.push({
              text: e.sysName,
              value: e.sysCode,
            })
          })

        ////////////////////////////////////////////////////////////////////
        facCodeRes.list.forEach((e) => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode,
          })
        })
        ////////////////////////////////////////////////////////////////////
        custCodeRes.list.forEach((e) => {
          this.comboBoxList.custCodeList.push({
            text: e.custName,
            value: e.custCode,
          })
        })
        ////////////////////////////////////////////////////////////////////
        this.searchValue.facCode = this.comboBoxList.facCodeList[0].value

        ////////////////////////////////////////////////////////////////////
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
    },
  },
  mounted() {
    this.comboListSet().then(() => {
    })
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