<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="[
          'btnSearch', //조회
        ]" @btnSearch="btnSearchMain()">
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete 
                  :menu-props="{ offsetY: true }" 
                  color="primary" 
                  class="required mt-2" 
                  :label="$t('factory')"
                  item-text="facName" 
                  item-value="facCode" 
                  :items="cboFactoryList" 
                  v-model="searchFacCode"
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
                  :label="$t('custName')" 
                  :items="cboCustList" 
                  item-text="custName" 
                  item-value="custCode" 
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
                  :label="$t('situation')" 
                  :items="ordStateList" 
                  item-text="text" 
                  item-value="value" 
                  :prepend-inner-icon="'$search'"
                  dense outlined clearable />
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
                      label="수주일"
                      v-model="startDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable  @input="dateInput" :day-format="(date) => { return new Date(date).getDate(); }"/>
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
                      label="~"
                      v-model="endDate"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" :min="startDate" no-title scrollable  @input="dateInput2" :day-format="(date) => { return new Date(date).getDate(); }"/>
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
            headerTitle="orderInfo" 
            :useBtnList="[
              'btnAdd', //신규
              'btnSave', //저장
              'btnDelete', //삭제
              'btnConfirm', //확정
              'btnConfirmCancel', //확정취소
            ]"
            @btnConfirm="btnConfirm" 
            @btnConfirmCancel="btnConfirmCancel" 
            @btnAdd="btnAdd('수주정보')"
            @btnSave="btnSave('수주정보')" 
            @btnDelete="btnDelete('수주정보')"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid 
                    id="orderInfo"
                    class="doubleListBox07" 
                    :ref="orderInfoRef" 
                    :data-source="orderInfo"
                    :remote-operations="false" 
                    :hover-state-enabled="true" 
                    :allow-column-resizing="true"
                    :allow-column-reordering="true" 
                    :row-alternation-enabled="true" 
                    :show-borders="true"
                    :width="grid.width" 
                    :show-row-lines="true" key-expr="id" 
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false" 
                    @CellClick="onOrderInfoCellClick"
                    @editing-start="sal0010EditingStart"
                    @focused-row-changed="focusedRowChanged_orderInfo"
                    @cell-prepared="onCellPrepared"
                    >
                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false"/>
                    <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" />
                    <DxColumn data-field="ordDate" :caption="$t('ordDate2')" width="auto" data-type="date" alignment="center" :allow-editing="true" format="yyyy-MM-dd" />
                    <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>                    
                    <DxColumn data-field="custName" :caption="$t('custName')" width="auto" data-type="string" alignment="left" :allow-editing="false">
                      <DxLookup :data-source="custName" display-expr="custName" value-expr="custCode"/>
                    </DxColumn>
                    <DxColumn data-field="ordState" :caption="$t('situation')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="ordState" display-expr="sysName" value-expr="sysCode" v-model="ordStateData"/>
                    </DxColumn>
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection mode="single"/>
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
          :useBtnList="['btnAdd', ]" 
          @btnAdd="itemSelectData"
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
                  key-expr="id"
                  :focused-row-enabled="true" 
                  :column-hiding-enabled="false" 
                  @focused-row-changed="focusedRowChanged_itemSelect"
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
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <i-card-vertical headerTitle="orderDetailInfo" :useBtnList="[
        'btnSave', //저장
        'btnDelete' //삭제
      ]" @btnSave="btnSave('수주세부정보')" @btnDelete="btnDelete('수주세부정보')">
        <template v-slot:body>
          <v-layout column overflow-auto>
            <v-col cols="12" class="pa-0">
              <DxDataGrid 
                id="orderInfoDetail" 
                class="doubleListBox09" 
                :ref="orderInfoDetailRef"
                :data-source="orderInfoDetail" 
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
                <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false"/>
                <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false"/>
                <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="no" :caption="$t('number')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="deliDate" :caption="$t('deliDate')" width="auto" data-type="date" alignment="center" :allow-editing="true" format="yyyy-MM-dd" />
                <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="qty" :caption="$t('qty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="true" :set-cell-value="setQtyValue"/>
                <DxColumn data-field="outQty" :caption="$t('outQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                <DxColumn data-field="nowQty" :caption="$t('nowQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                <DxColumn data-field="planQty" :caption="$t('planQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="true" :set-cell-value="setPriceValue"/>
                <DxColumn data-field="amount" :caption="$t('amount')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true" />
                <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn/>
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
                <DxEditing :allow-updating="true" mode="cell" />
              </DxDataGrid>
            </v-col>
          </v-layout>
        </template>
      </i-card-vertical>
    </v-row>
    <DxPopup :visible.sync="popupVisible" :show-close-button="true" :show-title="true" :title="$t('addCustomerInfo')"
      height="670px" width="1000px">
      <v-row no-gutters>
        <v-col cols="12" class="pa-0 ma-0">
          <i-card-vertical headerTitle="customerInfo" style="padding-top:0px">
            <template v-slot:body >
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
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxEditing, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxPopup } from 'devextreme-vue/popup';
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getOrderInfo, createOrderInfo, deleteOrderInfo, getAccount, getItemInfo, confirmOrderInfo, confirmCancelOrderInfo } from '@/api/view/sal0010'
import { getOrderDetailInfo, createOrderDetail, deleteOrderDetail } from '@/api/view/sal0011'
import { getUserId, getComCode } from '@/utils/token'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'

export default {
  name: 'sal0010',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPopup,
    ICardTop,
    DxLookup,
    DxSelection
  },
  data() {
    return {

      cboFactoryList: [],
      cboCustList: [],

      itemSelection: [],
      orderInfo: [],
      orderInfoDetail: [],
      accountInfo: [],
      itemSelectionRef: 'itemSelectionRef',
      orderInfoRef: 'orderInfoRef',
      orderInfoDetailRef: 'orderInfoDetailRef',
      accountInfoRef: 'accountInfoRef',
      orderInfoData: [],
      orderInfoDetailData: [],
      showFilterRow: true,
      popupVisible: false,
      accountPopInfoData: [],
      itemSelectedData: [],

      custName:[],
      unit: [],
      
      searchFacCode: '',
      searchCustCode: '',
      searchDeli: '',
      searchOrdState: '',
      deliCodeList: [],
      ordStateList: [],
      ordStateData: '',
      ordState:'',
      startDate: getPreMonth(1),
      endDate: getCurrentDate(),
      menu1:'',
      menu2:'',

    }
  },

  created() {
    const param = {
      comCode: getComCode()
    }
    getFactoryInfoData(param).then((res) => {
      this.cboFactoryList = res.list
    }).finally(() => {
      this.searchFacCode = this.cboFactoryList[0].facCode
    })
    //거래처명 조회조건
    getAccount(param).then(res => {
      this.cboCustList = res.list
    })
    const ordStateData = {
      comCode: getComCode(),
      codegr: '',
      code: 'ORD_STATE',
      userFlag: 'Y'
    }
    getCmChildCode(ordStateData).then(res =>{
      res.list.forEach(item => {
        this.ordStateList.push({
          value: item.sysCode,
          text: item.sysName
        })
      })
    })
  },

  beforeMount() {
    //단위 코드
    let params = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'UNIT',
      userFlag: 'Y',
    }
    //발주 상태
    let params2 = {
      comCode: getComCode(),
      codegr: '',
      code: 'ORD_STATE',
      userFlag: 'Y',
    } 
    // 거래처명
    let params3 = {
      comCode: getComCode(),
      userFlag: 'Y',
    }  
    Promise.all([
      getCmChildCode(params),
      getCmChildCode(params2),
      getAccount(params3)
    ])
    .then((res) => {
      this.unit = res[0].list.slice()
      this.ordState = res[1].list.slice()
      this.custName = res[2].list.slice()
    })
      .catch((error) => { })
  },

  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.orderInfoRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.itemSelectionRef)
    },
    gridDetailInstance2() {
      return this.GetDataGrid(this.orderInfoDetailRef)
    },
    gridDetailInstance3() {
      return this.GetDataGrid(this.accountInfoRef)
    }
  },

  mounted() {
    this.doSearchAccountInfo()
  },

  methods: {
    sal0010EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'custCode' || e.column.dataField === 'ordDate') {
          e.cancel = true
        }
      }
    },

    btnSearchMain() {
      this.doSearchMain()
    },

    getDateFormat(date) {
      return getDateFormat(date)
    },

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ조회ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//
    dateInput(e){
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate){
        this.endDate = this.startDate
      }
    },

    dateInput2(e) {
      if (this.startDate === ''){
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },

    //수주정보 조회
    doSearchMain(isProgress) {
      this.orderInfo = []
      this.openLoading('searching')
      const params = {
        comCode: getComCode(),
        facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        ordState: this.searchOrdState == null ? '' : this.searchOrdState.toString(),
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
      }
      getOrderInfo(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
          e.custName = ''
          e.custName = e.custCode
        })
        this.orderInfo = res.list
      }).finally(() => {
        this.gridMainInstance.option('focusedRowIndex', -1)
        this.gridMainInstance.option('focusedRowIndex', 0)
        this.endLoading()
      })
    },

    //품목정보 조회
    doSearchDetail1(isProgress) {
      this.itemSelection = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        custCode: this.orderInfoData.custCode
      }
      getItemInfo(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.itemSelection = res.list
        if(!this.orderInfo.length) {
          this.itemSelection = []
        }
      }).finally(() => {
        this.gridDetailInstance.clearSelection()
        this.endLoading()
      })
    },

    //수주세부정보 데이터
    doSearchDetail2(isProgress) {
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.orderInfoData.facCode,
        ordNo: this.orderInfoData.ordNo
      }
      getOrderDetailInfo(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.orderInfoDetail = res.list
        this.orderInfoDetailData = res.list
        if (!this.orderInfo.length) {
          this.orderInfoDetail = []
          this.orderInfoDetailData = []
        }
      }).finally(() => {
        this.gridDetailInstance2.clearSelection()
        this.endLoading()
      })
    },

    //거래처코드 팝업 데이터 조회
    doSearchAccountInfo(){
      let params = {
        comCode: getComCode()
      }
      getAccount(params).then(res => {
        let cnt = 0
        res.list.forEach((e) => {
          e.id = cnt++
        });
        this.accountInfo = res.list
      }).finally(() => {
        this.endLoading()
      })
    },

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ추가버튼ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//
    async btnAdd(gbn) {
      if (gbn === '수주정보') {
        let newRow = {
          id: this.orderInfo.length + 1,
          comCode: getComCode(),
          facCode: 'FAC01',
          ordNo: '',
          ordDate: getCurrentDate(),
          custCode: '',
          custName: '',
          ordState: this.ordStateData = 10,
          remark: '',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridMainInstance.newRow(newRow)
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', -1)
        this.gridMainInstance.option('focusedRowIndex', 1)
      } 
    },

    async itemSelectData() {
      let selectedMainRows = await this.gridDetailInstance.getSelectedRowsData()
      let selectedOrderRows = await this.gridMainInstance.getSelectedRowsData()
        const processSelectRow = new Promise((resolve, reject) => {
          if (selectedMainRows.length === 0) {
            notify(this.$t('SelectCheck'), 'error')
            return
          }
          if (selectedOrderRows[0].ordState === '20') {
            this.vToastify(this.$t('confirmCheckAdd'), 'warn')
            return
          }
          resolve('complete')
      })
      const result = await processSelectRow
      for(let i = 0; i < selectedMainRows.length; i++){
        var newRow = {
          id: this.orderInfoDetail.length + 1,
          comCode: getComCode(),
          facCode: selectedOrderRows[0].facCode,
          ordNo: selectedOrderRows[0].ordNo,
          no: '',
          deliDate: getCurrentDate(),
          partNo: selectedMainRows[i].partNo,
          qty: '',
          outQty: '',
          nowQty: '',
          planQty: '',
          price: selectedMainRows[i].price,
          amount: '',
          remark: '',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance2.newRow(newRow)
        this.gridDetailInstance2.selectRows(newRow.id, true)
      }
      this.gridDetailInstance2.option('focusedRowIndex', 1)    
    },

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ저장버튼, 저장 버튼ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//
    async btnSave(gbn) {
      if (gbn === '수주정보') {
        this.gridMainInstance.saveEditData()
        var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (var row of selectedMainRows) {
          if (row.ordState === '20'){
            this.vToastify(this.$t('confirmCheckUpdate'), 'warn')
            return
          }
          if (!row.ordDate || !row.custCode) {
            this.vToastify(this.$t('필수항목 입력하세요 [수주일, 거래처코드]'), 'warn')
            return
          }
          if (row.__created__ === false) 
          {
            row.__modified__ = true
            row.comCode = getComCode()
            row.editor = getUserId()
          } 
          else if (row.__created__ === true) 
          {
            row.comCode = getComCode()
            row.maker = getUserId()
          }
          row.ordDate = row.ordDate.substr(0,10)
        }
        
        this.openLoading()
        createOrderInfo(selectedMainRows, true)
          .then(res => {
            let message = ''
            
            message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
            notify(this.$t(message), 'success', 3000)
            this.doSearchMain()
          })
          .catch((error) => {
            notify(error, 'error', 3000)
          })
          .finally(() => {
            this.endLoading()
          })       
      } 
      else if (gbn === '수주세부정보') 
      {
        this.gridDetailInstance2.saveEditData()
        var selectedDetailRows = await this.gridDetailInstance2.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        if (this.orderInfoData.ordState === '20') {
          this.vToastify(this.$t('confirmCheckUpdate'), 'warn')
          return
        }

        //유효성 체크
        for (var row1 of selectedDetailRows) {
          if (!row1.deliDate || !row1.qty) {
            this.vToastify(this.$t('필수항목 입력하세요 [납기일, 수량]'), 'warn')
            return
          }
          if (row1.__created__ === false) {
            row1.__modified__ = true
            row1.comCode = getComCode()
            row1.editor = getUserId()
          } else if (row1.__created__ === true) {
            row1.comCode = getComCode()
            row1.maker = getUserId()
          }
          if(row1.deliDate.length > 10){
            row1.deliDate = row1.deliDate.substr(0,10)
          }
        }
        
        this.openLoading()
        createOrderDetail(selectedDetailRows, true)
          .then(res => {
            let message = ''
            message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
            notify(this.$t(message), 'success', 3000)
            this.doSearchDetail2()
          })
          .catch((error) => {
            notify(error, 'error', 3000)
          })
          .finally(() => {
            this.endLoading()
          })
      }
    },

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ삭제버튼, 삭제 버튼ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//
    async btnDelete(gbn) {
      if (gbn === '수주정보') {
        this.gridMainInstance.saveEditData()
        var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        for (let i = 0; i < selectedMainRows.length; i++) {
          if (selectedMainRows[i].ordState === '20') {
            this.vToastify(this.$t('confirmCheckDelete'), 'warn')
            return
          }
        }
        if (this.orderInfoDetailData.length > 0){
          notify(this.$t('subDataCheck'), 'error', 3000)
          return
        }
        
        this.openLoading()
        deleteOrderInfo(selectedMainRows, true)
          .then(res => {
            notify(this.$t('deleted'), 'success', 3000)
            this.doSearchMain()
          })
          .catch(error => {
            notify(error, 'error', 3000)
          })
          .finally(() => {
            this.endLoading()
          })

      } else if (gbn == '수주세부정보') {
        
        this.gridDetailInstance2.saveEditData()
        var selectedDetailRows = await this.gridDetailInstance2.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        if (this.orderInfoData.ordState === '20') {
          this.vToastify(this.$t('confirmCheckDelete'), 'warn')
          return
        }

        this.openLoading()
        deleteOrderDetail(selectedDetailRows, true)
          .then(res => {
            notify(this.$t('deleted'), 'success', 3000)
            this.doSearchDetail2()
          })
          .catch(error => {
            notify(error, 'error', 3000)
          })
          .finally(() => {
            this.endLoading()
          })
      }
    },

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ확정, 확정취소버튼ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//
    async btnConfirm() {
      this.gridMainInstance.saveEditData()
      var row = await this.gridMainInstance.getFocusedRow()
      if (!row) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //유효성 체크
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
        row.__modified__ = true
        row.comCode = getComCode()
        row.editor = getUserId()
      }
      
      var selectedMainRows = [row]
      confirmOrderInfo(selectedMainRows, true)
        .then(res => {
          notify(this.$t('confirmed'), 'success', 3000)
          this.doSearchMain()
        })
        .catch((error) => {
          notify(error, 'error', 3000)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    async btnConfirmCancel() {
      this.gridMainInstance.saveEditData()
      var row = await this.gridMainInstance.getFocusedRow()
      var outQtyCheck = this.orderInfoDetailData
      
      if (!row) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      for(let i = 0; i < outQtyCheck.length; i++){
        if(outQtyCheck[i].outQty > 0){
          notify('출하량이 존재하는 데이터가 있어 확정 취소할 수 없습니다', 'error', 2000)
          return
        }
      }
      //유효성 체크
      if (row.__created__ === true) {
        this.vToastify(this.$t('createdConfirmCancelCheck.'), 'warn')
        row.comCode = getComCode()
        row.maker = getUserId()
        return
      }
      if (row.ordState === '10') {
        this.vToastify(this.$t('notConfirmConfirmCheck.'), 'warn')
        return
      }
      if (row.__created__ === false) {
        row.__modified__ = true
        row.comCode = getComCode()
        row.editor = getUserId()
      }
      
      var selectedMainRows = [row]
      this.openLoading()
      confirmCancelOrderInfo(selectedMainRows, true)
        .then(res => {
          notify(this.$t('cancelled'), 'success', 3000)
          this.doSearchMain()
        })
        .catch((error) => {
          notify(error, 'error', 3000)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡcellClick, focused-row-changedㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//
    listClick(e) {
      this.gridDetailInstance2.beginUpdate()
      if (e.data.qty !== '') {
        e.data.nowQty = e.data.qty
      }
      this.gridDetailInstance2.endUpdate()
    },

    onOrderInfoCellClick(e) {
      if (e.rowType != 'data')
        return;

      this.orderInfoData = e.row.data

      if (e.data.__created__ && (e.column.dataField == 'custCode' || e.column.dataField == 'custName')) {
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

    popListDbClick() {
      this.selectedAccount()
    },

    selectedAccount() {
      this.orderInfoData.custCode = this.accountPopInfoData.custCode
      this.orderInfoData.custName = this.accountPopInfoData.custCode
      this.popupVisible = false
    },

    focusedRowChanged_PopupData(e) {
      this.accountPopInfoData = []
      this.accountPopInfoData = e.row.data
    },

    //수주정보 포커스 체인지
    focusedRowChanged_orderInfo(e) {
      if(e.row === undefined){
        return
      }
      this.orderInfoData = e.row.data
      this.focusedRowChanged_itemSelect()
      this.doSearchDetail1()
      this.doSearchDetail2()
    },

    focusedRowChanged_itemSelect(e) {
      if (e === undefined) {
        return
      }
      this.itemSelectedData = e.row.data
    },

    setQtyValue(newData, value, currentRowData){
      newData.qty = value
      let newQty = value
      newData.nowQty = value
      newData.amount = (newQty * currentRowData.price)
    },

    setPriceValue(newData, value, currentRowData){
      newData.price = value
      let newPrice = value 
      newData.amount = currentRowData.qty * newPrice
    },

    onCellPrepared(e){
      if(e.rowType === 'data' && e.data.ordState == '20' &&e.columnIndex == 4){
        e.cellElement.style.color = e.data.ordState == '20' ? "blue" : "black";
      }
    },

    close() {
      this.popupVisible = false   
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

.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>