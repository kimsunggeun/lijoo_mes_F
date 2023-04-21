<template>
  <v-container>
    <dxPopup :visible.sync="popVisible" :show-close-button="true" :show-title="true" :title="$t('otr_PvtSupWarinRegPop')" height="700px" width="1000px">
      <DxScrollView height="100%" width="100%">
        <v-row dense style="border-bottom: 1px solid black;">
          <v-col cols="auto">
            <span>주요항목</span>
          </v-col>
          <v-spacer/>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-form>
              <v-col cols="12">
                <v-row dense style="margin-top: 10px;">
                  <v-col>
                    <span>{{$t('comCode')}}</span>
                    <v-text-field class="rounded-0" v-model="comCode" dense outlined hide-details="auto" background-color="#fff2e0" :readonly="true"/>
                  </v-col>
                  <v-col cols="6">
                    <span>{{$t('facCode')}}</span>
                    <v-text-field class="rounded-0" v-model="facCode" dense outlined hide-details="auto" background-color="#fff2e0" :readonly="true"/>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                    <span>{{$t('regiDate')}}*</span>
                    <v-text-field class="rounded-0" v-model="regiDate" dense outlined hide-details="auto" background-color="#fff2e0" :readonly="true"/>
                  </v-col>
                  <v-col cols="6">
                    <span>{{$t('ilno')}}*</span>
                    <v-text-field class="rounded-0" v-model="ilno" dense outlined hide-details="auto" :readonly="true"/>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                    <span>{{$t('inType')}}*</span>
                      <v-select
                      v-model="inTypeCode"
                      :items="inTypeList"
                      item-value="sysCode"
                      item-text="sysName"
                      transition="scale-transition"
                      offset-y
                      single-line
                      clearable
                      outlined
                      dense
                      background-color="#fff2e0"
                      />
                  </v-col>
                  <v-col cols="6">
                    <span>{{$t('inCate')}}*</span>
                      <v-select
                      v-model="inCateCode"
                      :items="inCateList"
                      item-value="sysCode"
                      item-text="sysName"
                      transition="scale-transition"
                      offset-y
                      single-line
                      clearable
                      outlined
                      dense
                      background-color="#fff2e0"
                      />
                  </v-col>
                </v-row>
                <v-row dense>
                  <!-- 거래처코드 -->
                  <v-col cols="6">
                    <span>{{$t('custCode')}}</span>
                    <v-text-field class="rounded-0" v-model="custCode" dense outlined hide-details="auto" background-color="#fff2e0"  @click="custCodeClick" :readonly="true" clearable/>
                  </v-col>
                  <!-- 거래처명 -->
                  <v-col cols="6">
                    <span>{{$t('custName')}}</span>
                    <v-text-field class="rounded-0" v-model="custName" dense outlined hide-details="auto"  :readonly="true" />
                  </v-col>
                </v-row>
                <v-row dense>
                  <!-- 품번 -->
                  <v-col cols="6">
                    <span>{{$t('partNo')}}</span>
                    <v-text-field class="rounded-0" v-model="partNo" dense outlined hide-details="auto" background-color="#fff2e0" @click="partNoClick" :readonly="true" clearable />
                  </v-col>
                  <!-- 입고창고 -->
                  <v-col cols="6">
                    <span>{{$t('inWh')}}</span>
                    <v-select
                      v-model="inWh"
                      :items="inWhList"
                      item-value="inWh"
                      item-text="inWhNm"
                      transition="scale-transition"
                      offset-y
                      single-line
                      clearable
                      outlined
                      dense
                      background-color="#fff2e0"
                      />
                  </v-col>
                </v-row>
                <v-row dense>
                  <!-- 입고량 -->
                  <v-col cols="6">
                    <span>{{$t('inQty')}}</span>
                    <v-text-field class="rounded-0" v-model="inQty" dense outlined hide-details="auto" background-color="#fff2e0" clearable @input="inQtyValueChanged" format="#,##0"/>
                  </v-col>
                  <!-- 구성량 -->
                  <v-col cols="6">
                    <span>{{$t('makeQty')}}</span>
                    <v-text-field class="rounded-0" v-model="makeQty" dense outlined hide-details="auto" background-color="#fff2e0" @input="makeQtyValueChanged"/>
                  </v-col>
                </v-row>
                <v-row dense>
                  <!-- BOX 수량 -->
                  <v-col cols="6">
                    <span>{{$t('boxQty')}}</span>
                    <v-text-field class="rounded-0" v-model="boxQty" dense outlined hide-details="auto" :readonly="true" />
                  </v-col>
                  <!-- 비고 -->
                  <v-col cols="6">
                    <span>{{$t('remark')}}</span>
                    <v-text-field class="rounded-0" v-model="remark" dense outlined hide-details="auto" />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                    <span>{{$t('printType')}}</span>
                    <v-checkbox v-model="printType" :label="`${printType ? $t('print') : $t('notPrint')} `" disabled></v-checkbox>
                  </v-col>
                  <v-col cols="6">
                    <span>{{$t('userFlag')}}</span>
                    <v-checkbox v-model="userFlag" :label="`${userFlag ? $t('use') : $t('unused')} `"></v-checkbox>
                  </v-col>
                </v-row>
                <v-row dense style="border-bottom: 1px solid black; margin-top: 10px;">
                  <v-col cols="auto">
                    <span class="btnTextStyle">{{$t('registrantInfo')}}</span>
                  </v-col>
                  <v-spacer/>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                    <span>{{$t('makeDate')}}</span>
                      <v-text-field class="rounded-0" v-model="makeDate" dense outlined hide-details="auto" :readonly="true" />
                  </v-col>
                  <v-col cols="6">
                    <span>{{$t('maker')}}</span>
                    <v-text-field class="rounded-0" v-model="maker" dense outlined hide-details="auto" :readonly="true" />
                  </v-col>
                </v-row>
                <v-row dense> 
                  <v-col cols="6">
                    <span>{{$t('editDate')}}</span>
                      <v-text-field class="rounded-0" v-model="editDate" dense outlined hide-details="auto" :readonly="true" />
                  </v-col>
                  <v-col cols="6">
                    <span>{{$t('editor')}}</span>
                    <v-text-field class="rounded-0" v-model="editor" dense outlined hide-details="auto" :readonly="true" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" align="right">
                    <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" 
                      @click="btnSave('거래처')">
                      <v-icon>$save</v-icon>{{ $t('save') }}
                    </v-btn>
                    <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn"
                      @click="close('기타사급자재입고')">
                      <v-icon>$cancel</v-icon>{{ $t('cancel') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-form>
          </v-col>
        </v-row>
      </DxScrollView>
    </dxPopup>
    <DxPopup :visible.sync="popupVisible2" :show-close-button="true" :show-title="true" :title="$t('addCustomerInfo')" height="auto" width="40%">
      <v-row no-gutters>
        <v-col cols="12" class="pa-0 ma-0">
          <i-card-vertical headerTitle="customerInfo">
            <template v-slot:body >
              <v-layout column>
                <DxDataGrid 
                id="accountInfo" 
                class="doubleListBox08" 
                :data-source="accountInfo"
                :remote-operations="false" 
                :hover-state-enabled="true" 
                :allow-column-resizing="true"
                :allow-column-reordering="true" 
                :row-alternation-enabled="true" 
                :column-auto-width="true"
                :show-borders="true" 
                :show-row-lines="true" 
                key-expr="id"
                :focused-row-enabled="true" 
                :disablePagination="false" 
                :column-hiding-enabled="false"
                @focused-row-changed="focusedRowChanged_AccountPop" 
                @CellDblClick="selectedAccount"
                  >
                  <!--<DxFilterRow :visible="showFilterRow" /> 검색조건을 컬럼에 붙일때-->
                  <DxColumn data-field="comCode" :caption="$t('comCode')" data-type="string" alignment="center" :visible="false" :allow-editing="false" />
                  <DxColumn data-field="custCode" :caption="$t('custCode')" data-type="string" alignment="center" width="50%" css-class="devest-grid-header-require" :allow-editing="false" />
                  <DxColumn data-field="custName" :caption="$t('custName')" data-type="string" alignment="center" width="50%" :allow-editing="false" />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection select-all-mode="none" show-check-boxes-mode="none" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                  </template>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="selectedAccount()">
            <v-icon>$save</v-icon>{{ $t('choice') }}
            <!-- SAVE -->
          </v-btn>
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="close('거래처정보')">
            <v-icon>$cancel</v-icon>{{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <DxPopup :visible.sync="itemPopupVisible" :show-close-button="true" :show-title="true" :title="$t('itemInfo')" height="auto" width="40%">
      <v-row>
        <v-col>
          <i-card-vertical headerTitle="itemInfo" style="padding-top:0px">
            <template v-slot:body>
              <v-layout column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :data-source="popupInfoGrid"
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
                  @focused-row-changed="focusedRowChanged_ItemPop" 
                  @CellDblClick="selectedItem"
                >
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" data-type="string" alignment="center" :min-width="150" width="200" css-class="devest-grid-header-require" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="spec" :caption="$t('spec')" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="inWh" :caption="$t('inWh')" data-type="string" alignment="center" :allow-editing="false" >
                    <DxLookup :data-source="inWhList" display-expr="inWhNm" value-expr="inWh" />
                  </DxColumn>

                  <DxSelection show-check-boxes-mode="none" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="selectedItem()">
            <v-icon>$save</v-icon>{{ $t('choice') }}
            <!-- SAVE -->
          </v-btn>
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="close('품목정보')">
            <v-icon>$cancel</v-icon>{{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup';
import DxFileUploader from 'devextreme-vue/file-uploader';
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing, DxButton, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import ICardVertical from '@/components/common/iCardVertical.vue'
import { getUserId, getComCode } from '@/utils/token'
import { DxScrollView } from "devextreme-vue/scroll-view";
import { getAccount, getPartNo, getInWh } from '@/api/view/mat0013'
import themes from 'devextreme/ui/themes'

export default{
  name: 'mat0040Popup',
  mixins: [baseview, BaseDataGrid],
  components: {
    ICardVertical,
    DxScrollView,
    DxDataGrid,
    DxColumn,
    DxPopup,
    DxLookup
  },
  data(){
    return{
      popVisible: false,
      comCode:  getComCode(),
      facCode:  '',
      regiDate: '',
      ilno:     '',
      inType:   '',
      inCate:   '',
      custCode: '',
      custName: '',
      partNo:   '',
      inQty:    '',
      makeQty:  '',
      boxQty:   '',
      retQty:   '',
      remark:   '',
      printType:'',
      userFlag: '',
      makeDate: getCurrentDate(),
      maker:    getUserId(),
      editDate: '',
      editor:   '',
      inWh: '',
      popupData:[],

      //콤보박스 데이터
      inTypeList: [],
      inCateList: [],
      inTypeCode: '',
      inCateCode: '',
      inWhList: [],

      //거래처정보 팝업 정보
      popupVisible2: false,
      accountInfo: [],
      accountInfoData: [],
      custCodePopData: [],

      //품목정보 팝업 정보
      itemPopupVisible: false,
      popupInfoGrid:[],
      itemPopData: [],

    }
  },
  beforeMount() {

  },
  computed: {

  },
  mounted() {
    this.doSearchAccountInfo()
  },
  methods: {
    //거래처코드 팝업 데이터 조회
    doSearchAccountInfo() {
      let params = {
        comCode: getComCode()
      }
      getAccount(params).then(res => {
        let cnt = 0
        res.list.forEach((e) => {
          e.id = cnt++
        });
        this.accountInfoData = res.list
        this.accountInfo = res.list
      }).finally(() => {
        this.endLoading()
      })
    },

    //품번 정보 팝업 데이터 조회
    doSearchItemInfo(){
      let params2 = {
        comCode: getComCode(),
        custCode: this.custCode
      }
      getPartNo(params2).then((res) => {
        let cnt = 0
        res.list.forEach((item) => {
          item.id = cnt++
        })
        this.popupInfoGrid = res.list
        console.log("그리드", this.popupInfoGrid)
      }).finally(() => {
        this.endLoading()
      })
    },
    custCodeClick(e){
      this.popupVisible2 = true
      this.partNo = ''
    },
    partNoClick(){
      if(this.custCode === '' || this.custCode === undefined || this.custCode === null){
        notify(this.$t('mat0013AddCheck'), 'error', 3000)
        return
      }
      this.doSearchItemInfo()
      this.itemPopupVisible = true
    },
    open(gbn,popupData,comboBoxData) {
      this.inWh = ''
      this.popVisible = true
      this.popupData = popupData
      this.comCode = this.popupData.comCode
      this.facCode = this.popupData.facCode
      this.regiDate = this.popupData.regiDate
      this.ilno = this.popupData.ilno
      this.inType = this.popupData.inType
      this.inCate = this.popupData.inCate
      this.custCode = this.popupData.custCode
      this.custName = this.popupData.custName
      this.partNo = this.popupData.partNo
      this.inQty = this.popupData.inQty
      this.makeQty = this.popupData.makeQty
      this.boxQty = this.popupData.boxQty
      this.remark = this.popupData.remark
      this.printType = this.popupData.printType
      this.userFlag = this.popupData.userFlag
      this.makeDate = this.popupData.makeDate
      this.maker = this.popupData.maker
      this.inTypeCode = ''
      this.inCateCode = ''
      this.inTypeList = comboBoxData.inTypeCode
      this.inCateList = comboBoxData.inCateCode
      this.getInWh()
    },
    btnSave(){
      let items = {
        comCode: this.comCode,
        facCode: this.facCode,
        regiDate: this.regiDate,
        ilno: this.ilno,
        inType: this.inTypeCode,
        inCate: this.inCateCode,
        custCode: this.custCode,
        partNo: this.partNo,
        inWh: this.inWh,
        inQty: this.inQty,
        makeQty: this.makeQty,
        boxQty: this.boxQty,
        retQty: this.retQty,
        remark: this.remark,
        printType: this.printType ? 'Y' : 'N',
        userFlag: this.userFlag ? 'Y' : 'N',
        makeDate: getCurrentDate(),
        maker: getUserId(),
        __created__: this.popupData.__created__,
        __modified__: this.popupData.__modified__,
      }
      console.log('저장:', items)
      this.$emit('btnSave', items)
    },
    focusedRowChanged_AccountPop(e){
      this.custCodePopData = e.row.data
    },
    focusedRowChanged_ItemPop(e){
      this.inWh = ''
      this.itemPopData = e.row.data.partNo
      this.itemPopInWh = e.row.data.inWh

    },
    inQtyValueChanged(e){
      this.boxQty = Math.ceil(e / this.makeQty)
      if (this.boxQty === Infinity){
        this.boxQty = ''
      }
    },
    makeQtyValueChanged(e){
      this.boxQty = Math.ceil(this.inQty / e)
      if (this.boxQty === Infinity) {
        this.boxQty = ''
      }
    },
    // popListDbClick(){
    //   this.popupVisible2 = false
    //   this.custCode = this.custCodePopData.custCode
    //   this.custName = this.custCodePopData.custName
    // },
    selectedAccount(){
      this.popupVisible2 = false
      this.custCode = this.custCodePopData.custCode
      this.custName = this.custCodePopData.custName
    },
    selectedItem(){
      this.itemPopupVisible = false
      this.partNo = this.itemPopData
      this.inWh = this.itemPopInWh

    },
    close(gbn){
      if(gbn === '기타사급자재입고'){
        this.popVisible = false
      } else if (gbn === '거래처정보'){
        this.popupVisible2 = false
      } else if (gbn === '품목정보'){
        this.itemPopupVisible = false
      }
    },
    getInWh() {
      let param = {
        comCode: this.comCode, 
        facCode: this.facCode
      }
      getInWh(param).then(res => {
        this.inWhList = res.list
      })
    }
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