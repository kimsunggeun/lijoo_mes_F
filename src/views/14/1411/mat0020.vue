<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  label="공장명"
                  :items="facCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchCustCode"
                  label="거래처명"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchOrdState"
                  label="발주상태"
                  :items="ordStateList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      label="수주일"
                      v-model="startDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title @input="dateInput" :day-format="(date) => { return new Date(date).getDate(); }"/>
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      label="~"
                      v-model="endDate"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" :min="startDate" no-title scrollable @input="dateInput2" :day-format="(date) => { return new Date(date).getDate(); }"/>
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="8" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical
            headerTitle="purchOrdInfo"
            :useBtnList="[
            
              'btnAdd', //신규
              'btnSave', //저장
              'btnDelete', //삭제
              'btnConfirm', //확정
              'btnConfirmCancel', //확정취소
            ]"
            @btnConfirm="btnConfirm()"
            @btnConfirmCancel="btnConfirmCancel()"
            @btnAdd="btnAdd('구매발주정보')"
            @btnSave="btnSave('구매발주정보')"
            @btnDelete="btnDelete('구매발주정보')"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="ordStatusInfo"
                    class="doubleListBox07"
                    :ref="ordStatusInfoRef"
                    :data-source="ordStatusInfo"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    column-resizing-mode="widget"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @focused-row-changed="focusedRowChanged_orderInfo"
                    @editing-start="ordStatusInfoEditingStart"
                    @cell-prepared="onCellPrepared"
                    @CellClick="onMainGridCellClick"
                  >
                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="true" />
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="true" />
                    <DxColumn data-field="regiDate" :caption="$t('ordDate')" width="auto" data-type="date" alignment="center" :allow-editing="true" format="yyyy-MM-dd" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="custName" :caption="$t('custName')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                      <DxLookup :data-source="custName" display-expr="custName" value-expr="custCode" />
                    </DxColumn>
                    <DxColumn data-field="ordState" :caption="$t('ordState')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="ordState" display-expr="sysName" value-expr="sysCode" v-model="ordStateData" />
                    </DxColumn>
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="true" edit-cell-template="checkBoxEditor"/>
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn/>
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection  mode="single"/>
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
      <v-col cols="4" class="pa-0">
        <i-card-vertical
          headerTitle="itemChoice"
          :useBtnList="[
            'btnAdd', //신규
          ]"
          @btnAdd="itemAdd('품목선택')"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="itemSelection"
                  class="doubleListBox07"
                  :ref="itemSelectionRef"
                  :data-source="itemSelection"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  column-resizing-mode="widget"
                  key-expr="id"
                  @focused-row-changed="focusedRowChanged_itemInfo"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" />
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" />
                  <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" />
                  <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="unit" :caption="$t('unit')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="unit" display-expr="sysName" value-expr="sysCode"/>
                  </DxColumn>
                  <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn/>
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <i-card-vertical
        headerTitle="deliStatus"
        :useBtnList="[
          'btnSave', //저장
          'btnDelete' //삭제
        ]"
        @btnSave="btnSave('구매발주정보상세')"
        @btnDelete="btnDelete('구매발주정보상세')"
      >
        <template v-slot:body>
          <v-layout column overflow-auto>
            <v-col cols="12" class="pa-0">
              <DxDataGrid
                id="ordStatusInfoDetail"
                class="doubleListBox09"
                :ref="ordStatusInfoDetailRef"
                :data-source="ordStatusInfoDetail"
                :remote-operations="false"
                :hover-state-enabled="true"
                :allow-column-resizing="true"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="true"
                :width="grid.width"
                :show-row-lines="true"
                column-resizing-mode="widget"
                key-expr="id"
                :focused-row-enabled="true"
                :column-hiding-enabled="false"
                @editing-start="onOrdStatusInfoDetailEditingStart"
              >
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" />
                <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" />
                <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="no" :caption="$t('number')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                <DxColumn data-field="regiDate" :caption="$t('ordDate')" width="auto" data-type="date" alignment="center" :allow-editing="true" format="yyyy-MM-dd"  :visible="false" css-class="devest-grid-header-require"/>
                <DxColumn data-field="deliDate" :caption="$t('deliDate')" width="auto" data-type="date" alignment="center" :allow-editing="true" format="yyyy-MM-dd" css-class="devest-grid-header-require"/>
                <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="qty" :caption="$t('ordQty')" width="auto" data-type="number" alignment="right" :allow-editing="true" css-class="devest-grid-header-require"/>
                <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="true" css-class="devest-grid-header-require"/>
                <DxColumn data-field="amount" :caption="$t('amount')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" :calculate-cell-value="setQtyValue"/>
                <DxColumn data-field="inQty" :caption="$t('inQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false"/>
                <DxColumn data-field="remQty" :caption="$t('remQty')" data-type="number" format="#,##0" width="auto" alignment="right" :allow-editing="false" :visible="false" />
                <DxColumn data-field="retQty" :caption="$t('retQty')" width="auto" data-type="number" format="#,##0"  alignment="right" :allow-editing="false"/>
                <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" edit-cell-template="checkBoxEditor"/>
                <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn/>
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
                <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                <template #checkBoxEditor="{ data: cellInfo }">
                  <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                </template>
              </DxDataGrid>
            </v-col>
          </v-layout>
        </template>
      </i-card-vertical>
    </v-row>
    <DxPopup :visible.sync="popupVisible" :show-close-button="true" :show-title="true" :title="$t('addCustomerInfo')"
      height="700px" width="1000px">
    
      <v-row no-gutters>
        <v-col cols="12" class="pa-0 ma-0">
          <i-card-vertical headerTitle="customerInfo" style="padding-top:0px">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-row no-gutters dense style="margin-top: 10px;">
                  <v-col cols="12">
                    <DxDataGrid 
                     id="accountInfo" 
                     class="vh-50" 
                     :ref="accountInfoRef" 
                     :data-source="accountInfo"
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
                     @focused-row-changed="focusedRowChanged_PopupData" 
                     @CellDblClick="popListDbClick"
                     >
                      <DxSelection mode="single" :allow-select-all="false" />
                      <DxPaging :enabled="false" />
                      <!--<DxFilterRow :visible="showFilterRow" /> 검색조건을 컬럼에 붙일때-->
                      <DxColumn data-field="comCode" :caption="$t('comCode')" data-type="string" alignment="center" :visible="false" :allow-editing="false" />
                      <DxColumn data-field="custCode" :caption="$t('custCode')" data-type="string" alignment="center" width="50%" css-class="devest-grid-header-require" :allow-editing="false" />
                      <DxColumn data-field="custName" :caption="$t('custName')" data-type="string" alignment="center" width="50%" :allow-editing="false" />
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                    <v-row>
                      <v-col cols="12" align="right">
                        <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="selectedAccount()">
                          <v-icon>$save</v-icon>{{ $t('choice') }}
                          <!-- SAVE -->
                        </v-btn>
                        <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="close()">
                          <v-icon>$cancel</v-icon>{{ $t('cancel') }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import 'devextreme/data/odata/store'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getUserId, getComCode } from '@/utils/token'
import DxCheckBox from 'devextreme-vue/check-box'
import { DxPopup } from 'devextreme-vue/popup';
import DxDateBox from 'devextreme-vue/date-box'
import themes from 'devextreme/ui/themes'
import notify from 'devextreme/ui/notify' // message
import { getMat0010Info, createMat0010, getAccount, deleteMat0010, getItemInfo, confirmMat0010, confirmCancelMat0010 } from '@/api/view/mat0010'
import { getMat0011Info, createMat0011, deleteMat0011 } from '@/api/view/mat0011'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
export default {
  name: 'mat0020',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxLookup,
    DxColumn,
    DxPopup
  },
  data() {
    return {
      mainRowKey: [],
      facCodeList: [],
      searchFacCode: '',
      custCodeList: [],
      searchCustCode: '',
      ordStateList: [],
      searchOrdState: '',
      startDate: getPreMonth(1),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      ordStatusInfo: [],//구매발주정보
      accountInfo: [],
      itemSelection: [],//품목선택
      ordStatusInfoDetail: [],//구매발주정보상세
      ordStatusInfoRef: 'ordStatusInfoRef',
      accountInfoRef: 'accountInfoRef',
      itemSelectionRef: 'itemSelectionRef',
      ordStatusInfoDetailRef: 'ordStatusInfoDetailRef',
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      checkBoxesMode: 'always',
      ordStatusInfoData: [],
      ordStatusLocation: [],
      popupVisible: false,
      accountPopInfoData: [],
      custName: [],
      ordState: [],
      ordStateData: '',
      itemSelectData:[],
      unit:[],
      testitem:[],
      rowIndex: 0
    }
  },
  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
    }

    //발주상태
    const params2 = {
      comCode: getComCode(),
      codegr: '',
      code: 'ORD_STATE',
      userFlag: 'Y'
    }
    let params3 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'UNIT',
      userFlag: 'Y',
    }
    Promise.all([
      getAccount(params),
      getCmChildCode(params2),
      getCmChildCode(params3)
    ])
      .then((res) => {
        this.custName = res[0].list.slice()
        this.ordState = res[1].list.slice()
        this.unit = res[2].list.slice()
      })
      .catch((error) => { })
  },
  created() {
    const comCodeData = {
      comCode: getComCode()
    }
    getFactoryInfoData(comCodeData).then(res => {
      res.list.forEach(item => {
        this.facCodeList.push({
          value: item.facCode,
          text: item.facName
        })
      })
      this.searchFacCode = res.list[0].facCode
    })

    const custCodeData = {
      comCode: getComCode()
    }
    getAccount(custCodeData).then(res => {
      res.list.forEach((item, i) => {
        this.custCodeList.push({
          value: item.custCode,
          text: item.custName
        })
      })
    })
    const ordStateData = {
      comCode: getComCode(),
      codegr: '',
      code: 'ORD_STATE',
      userFlag: 'Y'
    }

    getCmChildCode(ordStateData).then(res => {
      res.list.forEach(item => {
        this.ordStateList.push({
          value: item.sysCode,
          text: item.sysName
        })
      })
    })
  },
  computed: {
    ordStatusInstance() { return this.GetDataGrid(this.ordStatusInfoRef) },
    itemSelectionInstance() {return this.GetDataGrid(this.itemSelectionRef) },
    ordStatusDetailInstance() { return this.GetDataGrid(this.ordStatusInfoDetailRef) },
  },

  mounted() {
  },
  methods: {
    ordStatusInfoEditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'custCode' || e.column.dataField === 'custName' || e.column.dataField === 'regiDate' || e.column.dataField === 'userFlag') {
          e.cancel = true
        }
      }
    },
    onOrdStatusInfoDetailEditingStart(e) {
      var focusedRow = this.ordStatusInstance.getFocusedRow()

      if (focusedRow && focusedRow.ordState == '20')
      {
        e.cancel = true     
      } 
    },

    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },
    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },
    btnSearchMain(){
      this.doSearchMain()
    },
    //----------------------------------------------------------------------------조회버튼----------------------------------------------------------------------------//
    doSearchMain() {         //구매발주정보 조회
      this.ordStatusInfo = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        ordState: this.searchOrdState == null ? '' : this.searchOrdState.toString(),
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
      }
      getMat0010Info(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
          e.custName = ''
          e.custName = e.custCode
        })
        this.ordStatusInfo = res.list
        if(this.ordStatusInfo.length === 0){
          this.ordStatusInfoData = []
          this.doSearchItem()
          this.doSearchDetail()
        }
        this.ordStatusInstance.option('focusedRowIndex', -1)
        this.ordStatusInstance.option('focusedRowIndex', this.rowIndex)
        this.ordStatusInfoData = this.ordStatusInfo[this.rowIndex]
      }).finally(() => {
        // this.ordStatusInstance.clearSelection()
        this.endLoading()
      })
    },
    doSearchDetail(){   // 구매 발주정보 상세 조회
        this.deliStatusInfo = []
        this.openLoading('searching')
        let params = {
          comCode: getComCode(),
          facCode: this.ordStatusInfoData.facCode,
          regiDate: this.ordStatusInfoData.regiDate,
          ordNo: this.ordStatusInfoData.ordNo,
        }

        getMat0011Info(params).then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
            this.lotSizeData = e.lotSize
          })
          this.testitem = res.list
          this.ordStatusInfoDetail = res.list
          this.ordStatusDetailInstance.option('focusedRowIndex', -1)
          this.ordStatusDetailInstance.option('focusedRowIndex', 0)
          this.ordStatusDetailInstance.clearSelection()
        }).finally(() => {
          this.endLoading()
        })
    },
    doSearchItem(){
      let params = {
        comCode: getComCode(),
        custCode: this.ordStatusInfoData.custCode
      }
      getItemInfo(params).then(res =>{
        let count = 0
        res.list.forEach(e => {
          e.id = count++
        })
        this.itemSelection = res.list
        this.itemSelectionInstance.option('focusedRowIndex', -1)
        this.itemSelectionInstance.option('focusedRowIndex', 0)
        this.itemSelectionInstance.clearSelection()
      }).finally(() => {
        this.endLoading()
      })


    },
    //----------------------------------------------------------------------------추가버튼----------------------------------------------------------------------------//
    btnAdd(gbn){
      if(gbn === '구매발주정보'){
        let newRow = {
          id : this.ordStatusInfo.length + 1,
          comCode: getComCode(),
          facCode: 'FAC01',
          regiDate: getCurrentDate(),
          ordNo: '',
          custCode: '',
          ordState: '10',
          userFlag: true,
          makeDate: getCurrentDate(),
          maker: getUserId(),
          __created__ : true,
          __modified__ : false,
        }
        this.ordStatusInstance.newRow(newRow)
        this.ordStatusInstance.selectRows(newRow.id, true)
        this.ordStatusInstance.option('focusedRowIndex', -1)
        this.ordStatusInstance.option('focusedRowIndex', 0)
      }
    },
    async itemAdd() {
      var mainData = await this.ordStatusInstance.getFocusedRow()
      var selectedData = await this.itemSelectionInstance.getSelectedRowsData()
      if(selectedData.length === 0){
        notify(this.$t('SelectCheck'), 'error')
        return
      }
      if(this.ordStatusInfoData.ordState === '20') {
        notify(this.$t('confirmCheckAdd'), 'error')
        return
      }

      for(let i = 0; i < selectedData.length; i++) {
        let newRow = {
          id: this.ordStatusInfoDetail.length + 1,
          comCode: getComCode(),
          facCode: this.ordStatusInfoData.facCode,
          ordNo: this.ordStatusInfoData.ordNo,
          regiDate: mainData.regiDate,
          deliDate: '',
          partNo: selectedData[i].partNo,
          partName: selectedData[i].partName,
          spec: selectedData[i].spec,
          qty: '',
          inQty: '0',
          price: selectedData[i].price,
          amount: '',
          remQty: '0',
          retQty: '',
          userFlag: 'Y',
          __created__: true,
          __modified__: false,
        }
        this.ordStatusDetailInstance.newRow(newRow)
        this.ordStatusDetailInstance.selectRows(newRow.id, true)
        this.ordStatusDetailInstance.option('focusedRowIndex', 0)
      }
      this.itemSelectionInstance.clearSelection()
    },
    //----------------------------------------------------------------------------저장버튼----------------------------------------------------------------------------//
    async btnSave(gbn){
      if(gbn === '구매발주정보'){
        let messageGubun = ''
        this.ordStatusInstance.saveEditData()
        var selectedMainRows = await this.ordStatusInstance.getSelectedRowsData()
        if (selectedMainRows.length === 0) {
          notify(this.$t('selectCheck'), 'error')
          return
        }
        for(var row of selectedMainRows){

          if(row.ordState === '20'){
            notify(this.$t('confirmCheckUpdate'), 'error')
            return
          }
          if (!row.regiDate || !row.custCode){
            this.vToastify(this.$t('필수항목 입력하세요 [발주일, 거래처코드]'), 'warn')
            return
          }
          if (row.__created__ === false) {
            messageGubun = 'doFixData'
            row.__modified__ = true
            row.comCode = getComCode()
            row.editor = getUserId()
          } else if (row.__created__ === true) {
            messageGubun = 'doSaveData'
            row.comCode = getComCode()
            row.maker = getUserId()
          }
          if (row.regiDate.length > 10) {
            row.regiDate = row.regiDate.substr(0, 10)
          }
          if(row.userFlag == false){
            row.userFlag = 'N'
          } else {
            row.userFlag = 'Y'
          }
        }

        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          yes => {
            this.openLoading()
            createMat0010(selectedMainRows, true)
              .then(res => {
                let message = ''
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 3000)
                this.doSearchMain()
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if(gbn === '구매발주정보상세'){
        let messageGubun = ''
        this.ordStatusDetailInstance.saveEditData()
        var selectedDetailRows = await this.ordStatusDetailInstance.getSelectedRowsData()
        if (selectedDetailRows.length === 0) {
          notify(this.$t('selectCheck'), 'error')
          return
        }
        if(this.ordStatusInfoData.ordState === '20'){
          notify(this.$t('confirmCheckUpdate'), 'error')
          return
        }
        for (var row1 of selectedDetailRows) {
          if (row1.inQty > 0) {
            notify(this.$t('입고된 데이터는 수정할 수 없습니다.'), 'error')
            return
          }
          if (!row1.regiDate || !row1.deliDate || !row1.qty || !row1.price) {
            this.vToastify(this.$t('필수항목 입력하세요 [발주일, 납기일, 발주수량, 단가]'), 'warn')
            return
          }
          if (row1.qty <= 0) {
            notify(this.$t('발주 수량은 0개 이상이어야 합니다.'), 'error')
            return
          }
          if (row1.__created__ === false) {
            messageGubun = 'doFixData'
            row1.__modified__ = true
            row1.comCode = getComCode()
            row1.editor = getUserId()
          } else if (row1.__created__ === true) {
            messageGubun = 'doSaveData'
            row1.comCode = getComCode()
            row1.maker = getUserId()
          }
          if (row1.regiDate.length > 10) {
            row1.regiDate = (row1.regiDate.toString()).substr(0, 10)
          }
          if (row1.deliDate.length > 10) {
            row1.deliDate = (row1.deliDate.toString()).substr(0, 10)
          }
          if (new Date(row1.regiDate) > new Date(row1.deliDate)){
            notify(this.$t('overRegiDate'), 'error')
            return
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          current => {
            this.openLoading()
            this.ordStatusDetailInstance.beginUpdate()

            createMat0011(selectedDetailRows, true)
              .then(res => {
                let message = ''
                message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 3000)
                this.doSearchDetail()

              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.ordStatusDetailInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //----------------------------------------------------------------------------삭제버튼----------------------------------------------------------------------------//
    async btnDelete(gbn){
      if (gbn === '구매발주정보'){
        this.ordStatusInstance.saveEditData()
        var selectedMainRows = await this.ordStatusInstance.getSelectedRowsData()

        if (selectedMainRows.length === 0) {
          notify(this.$t('SelectCheck'), 'error', 3000)
          return
        }
        for (var row of selectedMainRows){
          if (row.ordState === '20') {
            notify(this.$t('confirmCheckDelete'), 'error', 3000)
            return
          }
        }
        if (this.ordStatusInfoDetail.length !== 0) {
          notify(this.$t('subDataCheck'), 'error', 3000)
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.ordStatusInstance.beginUpdate()
            deleteMat0010(selectedMainRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 3000)
                this.doSearchMain()
              })
              .catch(error => {
                notify(error, 'error', 3000,)
              })
              .finally(() => {
                this.ordStatusInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '구매발주정보상세') {
        this.ordStatusDetailInstance.saveEditData()
        var selectedDetailRows = await this.ordStatusDetailInstance.getSelectedRowsData()
        if (selectedDetailRows.length === 0) {
          notify(this.$t('SelectCheck'), 'error', 3000)
          return
        }
        if(this.ordStatusInfoData.ordState === '20'){
          this.vToastify(this.$t('confirmCheckDelete'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.ordStatusDetailInstance.beginUpdate()
            deleteMat0011(selectedDetailRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 3000)
                this.doSearchDetail()
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.ordStatusDetailInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //----------------------------------------------------------------------------확정, 확정 취소 버튼----------------------------------------------------------------------------//
    async btnConfirm() {
      this.ordStatusInstance.saveEditData()
      var selectedMainRows = await this.ordStatusInstance.getSelectedRowsData()
      let messageGubun = ''
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //유효성 체크
      for (var row of selectedMainRows) {

        if (row.__created__ === true) {
          this.vToastify(this.$t('createdConfirmCheck'), 'warn')
          row.comCode = getComCode()
          row.maker = getUserId()
          return
        }
        if (row.ordState === '20') {
          this.vToastify(this.$t('alreadyConfirm'), 'warn')
          return
        }
        if (row.__created__ === false) {
          messageGubun = 'doConfirmData'
          row.__modified__ = true
          row.comCode = getComCode()
          row.editor = getUserId()
        }
      }
      await this.vToastifyPrompt(

        this.$t(messageGubun),
        'info',
        current => {
          this.openLoading()
          this.ordStatusInstance.beginUpdate()
          confirmMat0010(selectedMainRows, true)
            .then(res => {
              notify(this.$t('confirmed'), 'success', 3000)
              this.doSearchMain()
            })
            .catch((error) => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.ordStatusInstance.endUpdate()
              this.rowIndex = selectedMainRows[0].id
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    async btnConfirmCancel() {
      this.ordStatusInstance.saveEditData()
      var selectedMainRows = await this.ordStatusInstance.getSelectedRowsData()
      for(let i = 0; i < this.ordStatusInfoDetail.length; i++){
        if(this.ordStatusInfoDetail[i].inQty > 0){
          this.vToastify(this.$t('입고량이 존재해 확정 취소할 수 없습니다.'), 'warn')
          return
        }
      }
      let messageGubun = ''
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //유효성 체크
      for (var row of selectedMainRows) {
        if (row.__created__ === true) {
          this.vToastify(this.$t('createdConfirmCancelCheck'), 'warn')
          row.comCode = getComCode()
          row.maker = getUserId()
          return
        }
        if (row.ordState === '10') {
          this.vToastify(this.$t('notConfirmConfirmCheck'), 'warn')
          return
        }
        if (row.__created__ === false) {
          messageGubun = 'doConfirmCancelData'
          row.__modified__ = true
          row.comCode = getComCode()
          row.editor = getUserId()
        }

      }
      this.vToastifyPrompt(

        this.$t(messageGubun),
        'info',
        current => {
          this.openLoading()
          this.ordStatusInstance.beginUpdate()

          confirmCancelMat0010(selectedMainRows, true)
            .then(res => {
              notify(this.$t('cancelled'), 'success', 3000)
              this.doSearchMain()
            })
            .catch((error) => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.ordStatusInstance.endUpdate()
              this.rowIndex = selectedMainRows[0].id
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //----------------------------------------------------------------------------cellClick이벤트----------------------------------------------------------------------------//
    onCellPrepared(e) {
      if (e.rowType == 'header')
        return;

      if(e.column.dataField == 'ordState' && e.data.ordState == '20'){
          e.cellElement.style.color = e.data.ordState == '20' ? "blue" : "black";
      }
    },
    focusedRowChanged_orderInfo(e){
      if(e.row === undefined){
        return
      }
      this.ordStatusInfoData = e.row.data
      this.doSearchItem()
      this.doSearchDetail()
    },
    focusedRowChanged_PopupData(e){
      if (e.row === undefined) {
        return
      }
      this.accountPopInfoData = e.row
    },
    focusedRowChanged_itemInfo(e){
      if (e.row === undefined) {
        return
      }
      this.itemSelectData = e.row.data
    },
    onMainGridCellClick(e){

      if (e.rowType != 'data')
        return

      this.ordStatusLocation = e
      if ((e.column.dataField == 'custCode' || e.column.dataField == 'custName') && e.data.__created__ === true){
        this.popupVisible = true
      }
      if (this.popupVisible === true) {
        this.openLoading('searching')
        let params = {
          comCode: getComCode()
        }
        //거래처코드 팝업 데이터 조회
        getAccount(params).then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          });
          this.accountInfo = res.list
        }).finally(() => {
          this.endLoading()
        })
      }
    },
    popListDbClick(e) {
      this.accountPopInfoData = e
      this.selectedAccount()
    },

    selectedAccount() {
      //.cellValue(로우인덱스, 해당 로우인덱스의 컬럼 명, 해당 컬럼에 넣을 데이터 값)
      this.ordStatusInstance.cellValue(this.ordStatusLocation.rowIndex, 'custCode', this.accountPopInfoData.data.custCode)
      this.ordStatusInstance.cellValue(this.ordStatusLocation.rowIndex, 'custName', this.accountPopInfoData.data.custCode)
      this.popupVisible = false
    },
    close(){
      this.popupVisible = false
    },
    setQtyValue(rowData){
      return rowData.qty * rowData.price;
    },
  }
}
</script>
<style scoped>
.releaseBtn {
  background-color: rgb(135, 155, 119);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}

</style>
