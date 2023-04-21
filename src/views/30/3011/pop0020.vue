<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{ $t('undeliveredWarehousing') }}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText3"><v-icon class="mr-1 green_icon">$calendar_clock</v-icon>{{
          display.time.year +
            '-' +
            display.time.month +
            '-' +
            display.time.day +
            ' [' +
            display.time.week +
            '] ' +
            display.time.hour +
            ':' +
            display.time.minutes +
            ':' +
            display.time.second
        }}</span>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn 
          width="40" 
          height="40" 
          color="RefreshBtn" 
          class="mr-1" 
          @click="totalRefresh()"
        >
          <v-icon color="white" size="40px"> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- ■ 발주정보 -->
    <v-row no-gutters>
      <v-row>
        <v-col cols="5" class="pa-0">
          <v-col cols="12" class="pa-2 pt-2 pb-2 flex">
            <i-card-vertical 
              style="color: black;" 
              headerTitle="orderStatus2"
            >
              <template v-slot:body>
                <v-row no-gutters>
                  <!-- 입고처 -->
                  <v-col cols="10" class="pa-1 pt-1 pb-0">
                    <v-autocomplete
                      :menu-props="{ offsetY: true }"
                      v-model="searchCustCode"
                      :label="$t('warehousingPlace')"
                      :items="custCodeList"
                      item-text="text"
                      item-value="value"
                      dense
                      outlined
                      clearable
                      @change="custCodeChange"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <!-- 발주번호 -->
                  <v-col cols="10" class="pa-1 pt-1 pb-0">
                    <v-autocomplete
                      :menu-props="{ offsetY: true }"
                      v-model="searchOrdNo"
                      :label="$t('ordNo_mat0020')"
                      :items="ordNoList"
                      item-text="text"
                      item-value="value"
                      dense
                      outlined
                      clearable
                      @click="ordNoClick"
                      @change="ordNoChange"
                    />
                  </v-col>
                </v-row>
              </template>
            </i-card-vertical>
          </v-col>
        </v-col>
        <!-- 입고정보 입력란 -->
        <v-col cols="7" class="pa-0">
          <v-col cols="12" class="pa-2 pt-2 flex">
            <i-card-vertical style="color: black; " headerTitle="receivingInfoInput">
              <template v-slot:body>
                <v-row no-gutters>
                  <!-- LOT -->
                  <v-col cols="4" class="pa-1 pl-1 pt-1 pb-0 pr-4">
                    <v-text-field
                      v-model="addLotNo"
                      :label="$t('lotNo')"
                      dense
                      outlined
                      clearable
                      disabled
                    />
                  </v-col>
                  <!-- 창고정보 -->
                  <v-col cols="4" class="pa-1 pl-2 pt-1 pb-0 pr-2">
                    <v-autocomplete
                      :menu-props="{ offsetY: true }"
                      v-model="addInWh"
                      :label="$t('tabWarehouseInfoTitle')"
                      :items="addInWhList"
                      item-text="text"
                      item-value="value"
                      dense
                      outlined
                      clearable
                    />
                  </v-col>

                  <v-col cols="2" class="pt-1 pb-0 pl-4">
                    <v-btn 
                      depressed
                      outlined
                      class="pt-0 primary--text" 
                      color="rgb(255,255,255)" 
                      height="30" 
                      width="100%"
                      @click="openPopup()"
                    ><v-icon class="mr-1">$file_document</v-icon>
                      입고현황 
                    </v-btn>
                  </v-col>
                  <v-col cols="2" class="pt-1 pb-0 pl-3 pr-1">
                    <v-btn 
                      depressed 
                      class="pt-0 white--text" 
                      color="rgb(43,81,235)"
                      height="30" 
                      width="100%" 
                      @click="btnAdd"
                    > 
                      <v-icon class="mr-1">mdi-plus</v-icon>추가 
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <!-- 표준수량 -->
                  <v-col class="pt-1 pl-1 pb-1 px-0">
                    <v-text-field 
                      v-model="addQty" 
                      :label="$t('standardQty')" 
                      item-text="text" 
                      item-value="value" 
                      dense 
                      outlined 
                      clearable 
                      @input="inputQty"
                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    />
                  </v-col>
                  <v-icon>mdi-close</v-icon>
                  <!-- BOX 수량 -->
                  <v-col class="pt-1 pb-1 px-0">
                    <v-text-field 
                      v-model="addBoxQty" 
                      :label="$t('boxQty')" 
                      item-text="text" 
                      item-value="value" 
                      dense 
                      outlined 
                      clearable 
                      @input="inputBoxQty" 
                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    />
                  </v-col>
                  <v-icon>mdi-equal</v-icon>
                  <!-- 총수량 -->
                  <v-col class="pt-1 pb-1 pl-0 pr-1">
                    <v-text-field 
                      v-model="addSumQty" 
                      :label="$t('totalQty')" 
                      item-text="text" 
                      item-value="value" 
                      readonly 
                      dense 
                      outlined 
                      :disabled="true"
                    />
                  </v-col>
                </v-row>
              </template>
            </i-card-vertical>
          </v-col>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <!-- 발주정보 상세란 -->
        <v-col cols="5" class="pa-2">
          <i-card-vertical 
            style="color: black" 
            headerTitle="orderInfoDetail"
          >
            <template v-slot:body>
              <!-- 발주정보 상세란 상단 조회버튼 -->
              <v-layout column>
                <v-col class="pa-0 pt-3">
                  <DxDataGrid
                    id="ordInfoDetail"
                    class="doubleListBox16"
                    :ref="ordInfoDetailRef"
                    :data-source="ordInfoDetail"
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
                    :disablePagination="false"
                    :column-hiding-enabled="false"
                    @focused-row-changed="focusedRowchanged_ordInfo"
                  >
                    <DxEditing 
                      :allow-updating="false" 
                      :allow-adding="true"
                      mode="cell" 
                    />
                    <DxPaging :enabled="false" />
                    <DxSelection show-check-boxes-mode="none" />
                    <!-- 납기일 -->
                    <DxColumn 
                      data-field="deliDate" 
                      :caption="$t('deliDate')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="false" 
                      
                    />
                    <!-- 품번 -->
                    <DxColumn 
                      data-field="partNo" 
                      :caption="$t('partNo')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <!-- 품명 -->
                    <DxColumn 
                      data-field="partName" 
                      :caption="$t('partName')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <!-- 잔량 -->
                    <DxColumn 
                      data-field="remQty" 
                      :caption="$t('nowQty')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <!-- 발주 수량 -->
                    <DxColumn 
                      data-field="qty" 
                      :caption="$t('ordQty')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <!-- 입고량 -->
                    <DxColumn 
                      data-field="inQty" 
                      :caption="$t('inQty')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <!-- 입고대기 -->
                    <DxColumn 
                      data-field="waitQty" 
                      :caption="$t('waitQty')" 
                      data-type="string" 
                      width="auto" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <DxColumn/>
                    <DxPager :show-page-size-selector="false" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
        <!-- 입고정보 등록란 -->
        <v-col cols="7" class="pa-2">
          <i-card-vertical
            class="pt-2"
            style="color: black; "
            headerTitle="receivingInfoAdd"
            :useBtnList="[
              'btnSave', //저장
              'btnCancel', //취소

            ]"
            @btnSave="btnSave"
            @btnCancel="btnCancel"
          >
            <template v-slot:body>
              <v-layout column>
                <v-col cols="12" class="pa-0 pt-1">
                  <DxDataGrid
                    id="receivingInfo"
                    class="listBox09"
                    :ref="receivingInfoRef"
                    :data-source="receivingInfo"
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
                    :disablePagination="false"
                    :column-hiding-enabled="false"
                  >
                    <DxPaging :enabled="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxColumn 
                      data-field="comCode" 
                      :caption="$t('deliDate')"
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="true" 
                      :visible="false"
                    />
                    <!-- 납기일 -->
                    <DxColumn 
                      data-field="deliDate" 
                      :caption="$t('deliDate')" 
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false" 
                    />
                    <!-- 품번 -->
                    <DxColumn 
                      data-field="partNo" 
                      :caption="$t('partNo')" 
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false" 
                    />
                    <!-- 품명 -->
                    <DxColumn 
                      data-field="partName" 
                      :caption="$t('partName')" 
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false" 
                    />
                    <!-- Lot No -->
                    <DxColumn 
                      data-field="lotNo" 
                      :caption="$t('lotNumber')" 
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false" 
                    />
                    <!-- 입고창고 -->
                    <DxColumn 
                      data-field="inWh" 
                      :caption="$t('inWh')" 
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="true"
                    >
                      <DxLookup 
                        :data-source="inWh" 
                        display-expr="locName" 
                        value-expr="locCode" 
                      />
                    </DxColumn>
                    <!-- 입고량 -->
                    <DxColumn 
                      data-field="inQty" 
                      :caption="$t('inQty')" 
                      width="auto"
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="true" 
                    />
                    <DxColumn/>
                    <DxPager :show-page-size-selector="false" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
    </v-row>
    <pop0020Popup
      ref="pop0020Popup"
      :popVisible="popVisible"
      @close="close"
    />
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'

import { DxPopup } from 'devextreme-vue/popup'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxLookup, DxScrolling, DxGrouping, DxEditing } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getAccount } from '@/api/view/mat0010'
import { getOrdNo, getMat0011, createMat0012, getCustCode } from '@/api/view/pop0020'
import { getAutoStorage } from '@/api/view/bas0038'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'

import pop0020Popup from '@/views/30/3011/popup/pop0020Popup.vue'

export default {
  name: 'pop0020',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxScrolling,
    pop0020Popup
  },
  data() {
    return {
      //유저정보
      userData: {
        company: getComCode(),
        factory: {
          code: ''
        },
        name: ''
      },
      //화면표시 데이터
      display: {
        company: '',
        factory: '',
        time: {
          year: '00',
          month: '00',
          day: '00',
          week: '',
          hour: '00',
          minutes: '00',
          second: '00'
        }
      },
      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000 // 지연시간
      },
      //그리드 관련
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      searchCustCode:'', //입고처 콤보박스 셀렉트 데이터
      custCodeList:[],   //입고처 콤보박스 데이터
      searchOrdNo:'',    //발주번호 콤보박스 셀렉트 데이터
      ordNoList:[],      //발주번호 콤보박스 데이터
      addLotNo:'',       //LOT 입력 데이터
      addInWh:'',        //창고정보 콤보박스 셀렉트 데이터
      addInWhList:[],    //창고정보 콤보박스 데이터
      addQty: '',
      addBoxQty: '',
      addSumQty: '',
      inWh: '',
      ordInfoDetail:[], //발주정보 상세 데이터
      ordInfoDetailRef: 'ordInfoDetailRef', //발주정보 상세 ref
      ordInfoData: [],
      idCnt: 0,
      receivingInfo:[],
      receivingInfoRef: 'receivingInfoRef',
      searchordNo2:'',

      //PopUp
      popVisible: false
    }
  },
  created() {},
  watch: {},
  computed: {
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    gridMainInstance() {
      return this.GetDataGrid(this.ordInfoDetailRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.receivingInfoRef)
    }
  },
  beforeMount() {
    let param = {
      comCode : getComCode()
    }
    
    getCustCode(param).then(res => {
      res.list.forEach(e =>{
        
        this.custCodeList.push({
          text : e.custName,
          value: e.custCode
        })
      })
    })
    getAutoStorage(param).then(res => {
      this.inWh = res.list.slice()
      res.list.forEach(e => {
        this.addInWhList.push({
          text: e.locName,
          value: e.locCode
        })
      })
    })
  },
  mounted() {
    this.dataSettting()
    this.nowTime()
  },
  destroyed() {
    clearInterval(this.timeFunc)
  },
  methods: {
    nowTime() {
      this.timeFunc = setInterval(() => {
        let date = new Date()
        this.display.time.year = date
          .getFullYear()
          .toString()
          .substr(2)
        this.display.time.month = String(date.getMonth() + 1).padStart(2, '0')
        this.display.time.day = String(date.getDate()).padStart(2, '0')
        this.display.time.week = this.$t(`weekArray[${date.getDay()}]`)
        this.display.time.hour = String(date.getHours()).padStart(2, '0')
        this.display.time.minutes = String(date.getMinutes()).padStart(2, '0')
        this.display.time.second = String(date.getSeconds()).padStart(2, '0')
      }, this.timeCounter.delay)
    },
    //새로고침
    async totalRefresh() {
      this.searchCustCode = ''
      this.searchOrdNo = ''
      this.ordInfoDetail = []
      this.addLotNo = ''
      this.addInWh = ''
      this.addQty = ''
      this.addBoxQty = ''
      this.addSumQty = ''
      this.receivingInfo = []

      notify('refresh', 'success', 1500)
    },
    async dataSettting() {
      try {
        let params = {
          comCode: getComCode(),
          userId: getUserId()
        }
        let resData = await getCompany(params)
        let userFacData = await getUser(params)
        let factoryList = await getFactoryInfoData(params)
        this.userData.factory.code = userFacData.list[0].facCode
        // this.userData.name = userFacData.list[0].userName
        this.display.company = resData.list[0].comName
        let factoryFilterData = factoryList.list.filter(word => word.facCode === this.userData.factory.code)
        this.display.factory = factoryFilterData[0].facName
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    ordNoClick(){
      let param2 = {
        comCode: getComCode(),
        custCode: this.searchCustCode
      }

      getOrdNo(param2).then(res => {
        res.list.forEach(e => {

          this.ordNoList.push({
            text: e.ordNo,
            value: e.ordNo
          })
        })
      })
    },
    ordNoChange(){
      let param = {
        comCode: getComCode(),
        custCode: this.searchCustCode,
        ordNo: this.searchOrdNo
      }
      getMat0011(param).then(res => {
        this.ordInfoDetail = res.list
      })
      this.gridMainInstance.option('focusedRowIndex', -1)
      this.receivingInfo = []
      this.ordInfoData = []
    },
    focusedRowchanged_ordInfo(e){
      if(e.row == undefined){
        return
      }
      var rowData = e.row.data
      this.ordInfoData = rowData
      this.addLotNo = new Date().toISOString().substring(2,10).replace(/-/g,'')
      this.addInWh = rowData.inWh
      if(rowData.remQty < rowData.lotSize){
        this.addQty = rowData.remQty
      } else {
        this.addQty = rowData.lotSize
      }
      this.addBoxQty = 1
      this.addSumQty = this.addQty * this.addBoxQty
    },
    inputQty(e){
      this.addSumQty = e * this.addBoxQty
    },
    inputBoxQty(e){
      this.addSumQty = e * this.addQty
    },
    custCodeChange(){
      this.ordInfoDetail = []
      this.receivingInfo = []
      this.searchOrdNo = []
      this.ordNoList =[]
    },
    btnAdd(){
      if(this.ordInfoData.length == 0){
        notify('추가할 발주정보를 선택해 주십시오', 'error')
        return
      }
      if(this.ordInfoData.remQty <= 0){
        notify('잔량이 없습니다', 'error')
        return
      }
      for (let i = 0; i < this.addBoxQty; i++) {
        let newRow = {
          id: this.idCnt++,
          comCode: getComCode(),
          facCode: this.ordInfoData.facCode,
          deliDate: this.ordInfoData.deliDate,
          partNo: this.ordInfoData.partNo,
          partName: this.ordInfoData.partName,
          lotNo: this.addLotNo,
          no: this.ordInfoData.no,
          inWh: this.addInWh,
          remQty: this.ordInfoData.remQty,
          qty : this.addQty,
          inQty: this.addQty,
          boxQty: this.addBoxQty,
          price: this.ordInfoData.price,
          custCode: this.searchCustCode,
          ordNo: this.searchOrdNo,
          inStatus: this.ordInfoData.inInsp == 'Y' ? '30' : '20',
          amount: this.addQty * this.ordInfoData.price,
          maker: getUserId(),
          stockType: this.ordInfoData.partType
        }
        if (!this.addLotNo || !this.addInWh || !this.addQty || !this.addBoxQty) {
          notify('모든 입고정보를 입력해 주십시오 [LOT, 창고정보, 표준수량, BOX수량]', 'error')
          return
        }
        if (!this.searchCustCode || !this.searchOrdNo) {
          notify('모든 발주정보를 입력해 주십시오 [입고처, 발주번호]', 'error')
          return
        }      
        if (this.addSumQty <= 0) {
          notify('수량은 0보다 많아야 합니다', 'error', 3000)
          return
        }
        this.gridDetailInstance.newRow(newRow)
          this.gridDetailInstance.saveEditData()
        this.gridDetailInstance.selectRows(newRow.id, true)
        this.gridDetailInstance.option('focusedRowIndex', 1)

      }
    },
    async btnCancel(){
      let selectedMainRows = await this.gridDetailInstance.getSelectedRowsData()

      if(!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
      } else {
        this.vToastifyPrompt(
          this.$t('취소하시겠습니까?'),
          'info', 
          (current) => {
            for(let i in selectedMainRows) {
              this.receivingInfo = this.receivingInfo.filter(el => el.id !== selectedMainRows[i].id)
            }
            notify('취소 되었습니다.', 'success', 1500)
          }
        ),
        null,
        true
      }
    },

    async btnSave(){
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if(!selectedDetailRows.length){
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          createMat0012(selectedDetailRows)
            .then(res => {
              let message = 'Saved'
              notify(this.$t(message), 'success', 3000)
              this.ordNoList = []
              this.ordInfoDetail = []
              this.receivingInfo = []
              this.searchCustCode = ''
              this.searchOrdNo = ''
              this.ordNoChange()
              this.endLoading()
              this.addLotNo = ''
              this.addInWh = ''
              this.addQty = ''
              this.addBoxQty = ''
              this.addSumQty = ''
            })
            .catch(error => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    openPopup() {
      if(this.addLotNo == ''){
        notify('추가할 발주정보를 선택해 주십시오', 'error')
        return
      } else {
        let popData = {
          popVisible: true,
          comCode: getComCode(),
          facCode: this.ordInfoData.facCode,
          ordNo: this.searchOrdNo,
          lotNo: this.addLotNo,
          partNo: this.ordInfoData.partNo
        }
        console.log("dddd",popData)
        this.$refs.pop0020Popup.open(popData)
      }
    },
    close() {
      console.log("...")
    }
  }
}
</script>
<style scoped>

</style>