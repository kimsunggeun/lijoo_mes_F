<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top class="d-md-flex" outlined :useBtnList="[
          'btnSearch', //조회
        ]" @btnSearch="btnSearchMain()">
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1"
                    :items="facCodeList" v-model="searchValue.facCode" item-text="text" item-value="value" :prepend-inner-icon="$t('$search')" :label="$t('facName')" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mx-1"
                   :items="custCodeList" v-model="searchValue.custCode" item-text="text" item-value="value" :prepend-inner-icon="$t('$search')" :label="$t('custName')" dense clearable outlined>
                  </v-autocomplete>
                </v-col>
                  <v-col cols="12" md="2" class="mr-2">
                    <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mx-1"
                    :items="partTypeList" v-model="searchValue.partType" item-text="text" item-value="value" :prepend-inner-icon="$t('$search')" :label="$t('partType')" dense outlined>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="mr-2">
                    <v-text-field v-model="searchValue.partName" :label="$t('partName')" dense outlined hide-details="auto"
                      :prepend-inner-icon="$t('$search')"  class="mx-1" clearable />
                  </v-col>
                </v-row>
                <v-row no-gutters class="center pa-2 mr-0">
                  <v-col cols="12" md="2" class="mt-0 mr-2">
                    <v-menu
                      ref="frDeliDateCal"
                      v-model="frDeliDateCal"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :prepend-inner-icon="'$search'"
                          :label="$t('outDate')"
                          v-model="searchValue.frDeliDate"
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
                        v-model="searchValue.frDeliDate" 
                        no-title 
                        @input="frDeliDateCal = false" 
                        :day-format="(date) => { return new Date(date).getDate(); }" 
                      />
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="2" class="mt-0 mr-2">
                    <v-menu
                      ref="toDeliDateCal"
                      v-model="toDeliDateCal"
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
                          v-model="searchValue.toDeliDate"
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
                        v-model="searchValue.toDeliDate" 
                        no-title 
                        @input="toDeliDateCal = false" 
                        :day-format="(date) => { return new Date(date).getDate(); }" 
                      />
                    </v-menu>
                  </v-col>
                </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="7" class="pa-2">
        <!-- <i-card-vertical 
          headerTitle="shippingStatement" 
          :useBtnList="[
            'shipResult', //출하성적표
          ]" 
        > -->
        <i-card-vertical 
          headerTitle="shippingStatement" 
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="mainInfo" 
                  class="doubleListBox04" 
                  key-expr="id" 
                  :data-source="mainGrid"
                  :ref="mainGridRef"
                  column-resizing-mode="widget"
                  :remote-operations="false" 
                  :hover-state-enabled="true" 
                  :allow-column-resizing="true"
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true" 
                  :show-borders="true"
                  :width="grid.width" 
                  :show-row-lines="true" 
                  :focused-row-enabled="true"
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  @focused-row-changed="focusedRowChanged_status"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection show-check-boxes-mode="always" mode="multiple" />
                  <DxPager :show-page-size-selector="false" />
                  <!-- 수주번호 Column -->
                  <DxColumn 
                    data-field="ordNo" 
                    :caption="$t('ordNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    />
                  <!-- 출하번호 Column -->
                  <D<DxColumn 
                    data-field="ilno" 
                    :caption="$t('shippingNumber')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 출하일 Column -->
                  <D<DxColumn 
                    data-field="outDate" 
                    :caption="$t('outDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false" 
                  />
                  <!-- 거래처명 Column -->
                  <D<DxColumn 
                    data-field="custName" 
                    :caption="$t('custName')" 
                    width="auto" 
                    data-type="string" 
                    alignment="left"
                    :allow-editing="false" 
                  />
                  <!-- 품번 Column -->
                  <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="left"
                    :allow-editing="false" 
                  />
                  <!-- 품명 Column -->
                  <DxColumn 
                    data-field="partName" 
                    :caption="$t('partName')" 
                    width="auto" 
                    data-type="string" 
                    alignment="left"
                    :allow-editing="false" 
                  />
                  <!-- 규격 Column -->
                  <DxColumn 
                    data-field="spec" 
                    :caption="$t('spec')" 
                    width="auto" 
                    data-type="string"
                    alignment="left"
                    :allow-editing="false" 
                  />
                  <!-- 출하량 Column -->
                  <DxColumn 
                    data-field="qty" 
                    :caption="$t('outQty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="right"
                    :allow-editing="false" 
                  />      
                  <!-- 단위 Column -->
                  <DxColumn 
                    data-field="unit" 
                    :caption="$t('partUnit')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false" 
                  />                           
                  <DxColumn/>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="5" class="pa-2">
        <i-card-vertical headerTitle="shippingLotCurrent">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="statusInfo" 
                  class="doubleListBox04" 
                  key-expr="id" 
                  column-resizing-mode="widget"
                  :data-source="statusGrid"
                  :ref="statusGridRef"
                  :remote-operations="false" 
                  :hover-state-enabled="true" 
                  :allow-column-resizing="true"
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true" 
                  :show-borders="true"
                  :width="grid.width" 
                  :show-row-lines="true" 
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  :focused-row-enabled="true"
                  @focused-row-changed="focusedRowChanged_history"
                  >
                  <DxPaging :enabled="false" />
                  <DxSelection show-check-boxes-mode="always" mode="multiple" />
                  <DxPager :show-page-size-selector="false" />
                  <DxColumn
                    data-field="comCode"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :visible="false"
                  />
                  <!-- 창고명 Column -->
                  <DxColumn 
                    data-field="locName" 
                    :caption="$t('whName')" 
                    width="auto" 
                    data-type="string" 
                    alignment="right"
                    :allow-editing="false"  
                  />
                  <!-- 생산로트번호 Column -->
                  <DxColumn 
                    data-field="lotNo" 
                    :caption="$t('lotNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                  />
                  <!-- 로트번호 Column -->
                  <DxColumn 
                    data-field="lotDetail" 
                    :caption="$t('lotNum')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                  />
                  <!-- 수량 Column -->
                  <DxColumn 
                    data-field="qty" 
                    :caption="$t('qty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="right" 
                    :allow-editing="false" 
                  />       
                  <DxColumn/>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" class="pa-2">
        <!-- <i-card-vertical 
          headerTitle="inspectionDetails"
          :useBtnList="[
            'inspectionStandard', //검사기준서
            'btnDeside'//확정
          ]" 
        > -->
        <i-card-vertical 
          headerTitle="inspectionDetails"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="shptChkInfo" 
                  class="doubleListBox04" 
                  :remote-operations="false" 
                  :hover-state-enabled="true" 
                  :allow-column-resizing="true"
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true" 
                  :show-borders="true"
                  :width="grid.width" 
                  :show-row-lines="true" key-expr="id" 
                  :focused-row-enabled="true"
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  column-resizing-mode="widget"
                  >
                  <DxPaging :enabled="false" />
                  <DxSelection show-check-boxes-mode="always" mode="multiple" />
                  <!-- 창고명 Column -->
                  <DxColumn 
                    data-field="number" 
                    :caption="$t('number')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 검사항목 Column -->
                  <DxColumn 
                    data-field="inspectionClause" 
                    :caption="$t('inspectionClause')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 검사방법 Column -->
                  <DxColumn 
                    data-field="inspectionMethod" 
                    :caption="$t('inspectionMethod')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 측정방법 Column -->
                  <DxColumn 
                    data-field="measureMethod" 
                    :caption="$t('measureMethod')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 기준치 Column -->
                  <DxColumn 
                    data-field="standardValue" 
                    :caption="$t('standardValue')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 상한치 Column -->
                  <DxColumn 
                    data-field="insUpp" 
                    :caption="$t('insUpp')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 하한치 Column -->
                  <DxColumn 
                    data-field="insLow" 
                    :caption="$t('insLow')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 판정 Column -->
                  <DxColumn 
                    data-field="judge" 
                    :caption="$t('judge')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 시료 Column -->
                  <DxColumn data-field="sample" :caption="$t('sample')" alignment="center">
                    <DxColumn data-field="sample1" :caption="$t('sampleQty1')" width="auto" data-type="string" alignment="right" :allow-editing="true" edit-cell-template="myEditor" />
                    <DxColumn data-field="sample2" :caption="$t('sampleQty2')" width="auto" data-type="string" alignment="right" :allow-editing="true" edit-cell-template="myEditor" />
                    <DxColumn data-field="sample3" :caption="$t('sampleQty3')" width="auto" data-type="string" alignment="right" :allow-editing="true" edit-cell-template="myEditor" />
                    <DxColumn data-field="sample4" :caption="$t('sampleQty4')" width="auto" data-type="string" alignment="right" :allow-editing="true" edit-cell-template="myEditor" />
                    <DxColumn data-field="sample5" :caption="$t('sampleQty5')"  width="auto" data-type="string" alignment="right" :allow-editing="true" edit-cell-template="myEditor" />
                  </DxColumn>
                  <!-- 등록자 Column -->
                  <DxColumn 
                    data-field="maker" 
                    :caption="$t('maker')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 등록일 Column -->
                  <DxColumn 
                    data-field="regiDate" 
                    :caption="$t('regiDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 수정자 Column -->
                  <DxColumn 
                    data-field="editor" 
                    :caption="$t('editor')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 수정일 Column -->
                  <DxColumn 
                    data-field="editDate" 
                    :caption="$t('editDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <!-- 비고 Column -->
                  <DxColumn 
                    data-field="remark" 
                    :caption="$t('remark')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
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
import iCardVertical from '@/components/common/iCardVertical.vue'
import { getAccount} from '@/api/system/accountManage'
import ISystemBar from '@/components/common/iSystemBar.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import DxDateBox from 'devextreme-vue/date-box'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getSal0110, createSal0110 } from '@/api/view/sal0110'
import { getSal0130, getOutStatus } from '@/api/view/sal0130'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxColumnFixing, DxGroupItem, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getWorkDate } from '@/api/view/bas0130'
import { getComCode } from '@/utils/token'
//  가상컬럼  계산값 로직 아직없음 [잔량]
export default {
  name: 'sal0130',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
  },
  data() {
    return {
      endDate: null,
      toDeliDateCal: false,
      frDeliDateCal: false,
      facCodeList: [],
      custCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      //검색 값
      searchValue: {
        comCode: getComCode(),
        facCode: '',
        custCode: '',
        partType: '',
        partName: '',
        frDeliDate: getPreMonth(2),
        toDeliDate: getDateFormat(new Date())
      },

      mainGrid: [],
      statusGrid: [],
      mainGridRef: "mainGridRef",
      statusGridRef: "statusGridRef"
    }
  },
  created() {},
  beforeMount() {
    this.comboListSet()
  },
  mounted() {
    // this.doSearchMain(true)
  },
  watch: {
    frDeliDate: function (value) {
      if (new Date(value) > new Date(this.toDeliDate)) {
        this.toDeliDate = value
      }
    },
  },
  computed: {
    mainGridInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
    statusGridInstance() {
      return this.GetDataGrid(this.statusGridRef)
    },
  },
  methods: {
    addMenuItems(e) {
      this.totalTarget = e

      if (!e.component.__summaryIsNotAdded) {
        e.component.option('summary.totalItems', this.totalOption)
        e.component.__summaryIsNotAdded = true
      }
    },
    //엑셀 다운로드
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '출하계획관리.xlsx') // 엑셀파일 만듬
    },
    onCellPrepared(e) {
      let found = this.holyArray.find((item) => item.date === e.column.dataField)
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
    async btnSave() {
      let message = ''
      this.mainGridInstance.saveEditData()
      let selectedMainRows = await this.mainGridInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.mainGridInstance.beginUpdate()
          createSal0110(selectedMainRows, true)
            .then((res) => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
            })
            .catch((error) => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.mainGridInstance.endUpdate()
              this.mainGridInstance.clearSelection()
              this.mainGridInstance.saveEditData()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'ITEM_TYPE,PART_TYPE,',
      }
      getCmChildCode(params).then((res) => {
        res.list
        .filter((word) => word.code === 'ITEM_TYPE')
          .forEach((e) => {
            this.partTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
        res.list
        .filter((word) => word.code === 'PART_TYPE')
          .forEach((e) => {
            this.partTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
      })
      getFactoryInfoData({ comCode: getComCode() })
        .then((res) => {
          res.list.forEach((e) => {
            this.facCodeList.push({
              text: e.facName,
              value: e.facCode,
            })
          })
        })
        .finally(() => {
          this.searchValue.facCode = this.facCodeList[0].value
        })
      getAccount({ comCode: getComCode() })
        .then((res) => {
          res.list.forEach((e) => {
            this.custCodeList.push({
              text: e.custName,
              value: e.custCode,
            })
          })
        })
        console.log(this.custCodeList);
      
    },
    btnSearchMain() {
      this.doSearchMain()
    },
    getDateFormat(date) {
      return getDateFormat(date)
    },
    async doSearchMain() {
      this.openLoading()
      console.log("hi");
      // this.mainGridInstance.beginUpdate()
      
      let mainGridParam = {
        comCode: getComCode(),
        facCode: this.searchValue.facCode,
        custCode: this.searchValue.custCode,
        partType: this.searchValue.partType,
        partName: this.searchValue.partName,
        frDate: this.searchValue.frDeliDate,
        toDate: this.searchValue.toDeliDate
      }
      getSal0130(mainGridParam)
        .then(res => {
          console.log('res',res)
          this.mainGrid = res.list
        })
        .catch(err => {
          console.log(err)
        })

      // this.mainGridInstance.endUpdate()
      this.endLoading()
    },
    focusedRowChanged_status(focusedRow){
      this.getFocusedRowStatus(focusedRow.row.data)
    },
    focusedRowChanged_history(focusedRow){
      console.log(focusedRow.row.data);
    },
    getFocusedRowStatus(focusedRow){
      let statusParam = {
        comCode: getComCode(),
        facCode: focusedRow.facCode,
        ordNo: focusedRow.ordNo,
        ilno: focusedRow.ilno
      }
      getOutStatus(statusParam).then(res => {
        this.statusGrid = res.list
        this.statusGridInstance.option('focusedRowIndex', -1)
      })
    }
  },
}
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
