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
                    v-model="searchValue.insCode"
                    :label="$t('inspection')"
                    :items="comboBoxList.insCodeList"
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
                    class="required mx-1"
                    clearable
                    @keydown.enter="mainGridSearch"
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
                    class="required mx-1"
                    clearable
                    @keydown.enter="mainGridSearch"
                  ></v-text-field>
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
                        :label="$t('lotDate')"
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
                    <v-date-picker
                      v-model="searchValue.frRegiDate"
                      no-title
                      @input="calMenuState.frRegiDateCal = false"
                      :day-format="(date) => {return new Date(date).getDate();}"
                    ></v-date-picker>
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
                      :day-format="(date) => {return new Date(date).getDate();}"
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
                </v-col>-->
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical
          headerTitle="chkCurrSitch"
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
                  @editing-start="editingStart"
                  @cellPrepared="cellPrepared"
                >
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="autoExpandAll" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <!--********************************************************************-->
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                  />              
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="inspDate"
                    :caption="$t('inspDate')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />                    
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="inspNo"
                    :caption="$t('inspNo')"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="insCode"
                    :caption="$t('insCode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="insCodeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="insType"
                    :caption="$t('insType')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="insTypeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="insMeth"
                    :caption="$t('insMeth')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="insMethList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="jugCodeh"
                    :caption="$t('jugCodeh')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="jugCodehList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="insUnit"
                    :caption="$t('insUnit')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="insUnitList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="judge"
                    :caption="$t('judge')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="judgeList" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="sample1"
                    :caption="$t('sampleQty1')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="sample2"
                    :caption="$t('sampleQty2')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="sample3"
                    :caption="$t('sampleQty3')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="sample4"
                    :caption="$t('sampleQty4')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="sample5"
                    :caption="$t('sampleQty5')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="insImage"
                    :caption="$t('icon')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="printType"
                    :caption="$t('printType')"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <DxSummary>
                    <DxGroupItem
                      column="OrderNumber"
                      summary-type="count"
                      display-format="{0} orders"
                    />
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="qty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="{0}"
                    />
                    <DxTotalItem
                      column="qty"
                      summary-type="sum"
                      :customize-text="customizeText"
                      display-format="{0}"
                    />
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
import { getQat0010 } from '@/api/view/qat0110'
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
    DxTotalItem
  },

  data() {
    return {
      //콤보박스
      comboBoxList: {
        facCodeList: [],
        insCodeList: [],
        itemTypeList: [],
        partTypeList: [],
        custCodeList: [],
        unitList: [],
        orderStateList: [],
        inTypeList: []
      },
      insCodeList: [],
      insTypeList: [],
      insMethList: [],
      jugCodehList: [],
      insUnitList: [],
      judgeList: [],

      //검색 값
      searchValue: {
        facCode: '',
        partNo: '',
        partName: '',
        inType: '',
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
      autoExpandAll: true,
      girdData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'ref'
        },

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
  async beforeMount() {
    //거래처명

    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y'
    }
    Promise.all([getAccount(params)])
      .then(res => {
        this.custCode = res[0].list.slice()
      })
      .catch(error => {})

    const insType = {
      comCode: getComCode(),
      code: 'INPT,INPT1,INS_TYPE,INS_METH,JUG_CODEH,UNIT,SAMPLE,JUDGE'
    }
    await Promise.all([getCmChildCode(insType)])
      .then(res => {
        console.log('resrers', res)
        res[0].list
          .filter(word => word.code === 'INPT')
          .forEach(e => {
            this.insCodeList.push(e)
          })
        res[0].list
          .filter(word => word.code === 'INS_TYPE')
          .forEach(e => {
            this.insTypeList.push(e)
          })
        res[0].list
          .filter(word => word.code === 'INS_METH')
          .forEach(e => {
            this.insMethList.push(e)
          })
        res[0].list
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push(e)
          })
        res[0].list
          .filter(word => word.code === 'UNIT')
          .forEach(e => {
            this.insUnitList.push(e)
          })
        res[0].list
          .filter(word => word.code === 'JUDGE')
          .forEach(e => {
            this.judgeList.push(e)
          })
      })
      .catch(error => {})
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
          custCode: this.searchValue.custCode,
          frRegiDate: this.searchValue.frRegiDate,
          toRegiDate: this.searchValue.toRegiDate,
          insCode: this.searchValue.insCode,
          partNo: this.searchValue.partNo,
          partName: this.searchValue.partName
        }
        let gridDataRes = await getQat0010(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.id = cont++
        })
        this.girdData.mainGird.data = copyArray
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
          code: 'INPT,ITEM_TYPE,PART_TYPE,UNIT,ORDER_STATE,UNIT,IN_TYPE'
        }
        ////////////////////////////////////////////////////////////////////
        let cmCodeRes = await getCmChildCode(params)
        let custCodeRes = await getCustomName(params)
        let facCodeRes = await getFactoryInfoData(params)
        let inTypeRes = await getCmChildCode(params)
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
          .filter(word => word.code === 'IN_TYPE' && word.codegr === 'MAT')
          .forEach(e => {
            this.comboBoxList.inTypeList.push({
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
        inTypeRes.list
          .filter(word => word.code === 'INPT')
          .forEach(e => {
            this.comboBoxList.insCodeList.push({
              text: e.sysName,
              value: e.sysCode
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
        notify(error, 'error', 4500)
      }
    },
    cellPrepared(e) {},
    //엑셀버튼
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      workSheet['!cols'] = [
        { width: 10 }, //공장코드 넓이
        { width: 15 }, //거래처코드 넓이
        { width: 25 }, //품번
        { width: 25 }, //품명
        { width: 10 }, //검사순서
        { width: 15 }, //검사유형 코드
        { width: 20 }, //검사항목 코드
        { width: 20 }, // 측정방법 코드
        { width: 15 }, //판정방법 코드
        { width: 15 }, //검사단위코드
        { width: 10 }, //판정
        { width: 10 }, //시료1
        { width: 10 }, //시료2
        { width: 10 }, //시료3
        { width: 10 }, //시료4
        { width: 10 }, //시료5
        { width: 10 }, //이미지
        { width: 15 }, //비고
        { width: 15 }, //라벨출력 구분
        { width: 10 }, //사용유무
        { width: 10 }, //등록자
        { width: 15 }, //등록일
        { width: 15 }, //수정일
        { width: 10 } //수정자
      ]
      workSheet
      console.log('workSheet', workSheet)
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, `${this.$t('검사현황')}.xlsx`) // 엑셀파일 만듬
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