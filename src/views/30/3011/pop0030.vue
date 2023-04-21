<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{ $t('otherWarehousing') }}</span>
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
        <v-btn width="40" height="40" color="RefreshBtn" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px"> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!--*************************************************************************************************-->
    <!-- 입고정보 입력란 -->
    <v-col cols="12" class="pa-2 pt-0">
      <i-card-vertical 
        style="color: black;"
        headerTitle="receivingInfoInput" 
        class="pb-2"
      >
        <template v-slot:body>
          <v-row>
            <v-col cols="2" class="pa-1 pt-1 pb-0">
              <v-autocomplete
                :menu-props="{ offsetY: true }"
                v-model="searchCustCode"
                :label="$t('warehousingPlace')"
                :items="custCodeList"
                item-text="text"
                item-value="value"
                dense
                outlined
                @change="custCodeChange"
              />
            </v-col>
            <v-col cols="2" class="pa-1 pt-1 pb-0">
              <v-text-field 
                v-model="searchPartNo" 
                :label="$t('partCode')" 
                dense 
                outlined 
                readonly 
                @click="partNoClick"
                :disabled="disabledCtr"/>
            </v-col>
            <v-col cols="2" class="pa-1 pt-1 pb-0 ml-6">
              <v-autocomplete
                :menu-props="{ offsetY: true }"
                v-model="searchInType"
                :label="$t('inType')"
                :items="inTypeList"
                item-text="text"
                item-value="value"
                dense
                outlined
              />
            </v-col>
            <v-col cols="2" class="pa-1 pt-1 pb-0 ml-6">
              <v-autocomplete
                :menu-props="{ offsetY: true }"
                v-model="searchInCate"
                :label="$t('inCate')"
                :items="inCateList"
                item-text="text"
                item-value="value"
                dense
                outlined
              />
            </v-col>
            <v-col cols="2" class="pa-1 pt-1 pb-0 ">
              <v-autocomplete
                :menu-props="{ offsetY: true }"
                v-model="searchInWh"
                :label="$t('inWh')"
                :items="inWhList"
                item-text="text" 
                item-value="value" 
                dense
                outlined
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" class="pa-1 pt-1 pb-0">
              <v-text-field 
                v-model="addLotNo" 
                max-width="200px" 
                :label="$t('lotNo')" 
                item-text="text" 
                item-value="value" 
                dense 
                outlined 
                clearable
                disabled
              />
            </v-col>
            <v-col cols="2" class="pa-1 pt-1 pb-0 ">
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
            <v-col cols="2" class="pa-1 pt-1 pb-0 ">
              <v-text-field 
                v-model="addBoxQty" 
                :label="$t('boxQty')" 
                item-text="text"
                item-value="value" 
                dense 
                outlined 
                clearable @input="inputBoxQty"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              />
            </v-col>
            <v-icon>mdi-equal</v-icon>
            <v-col cols="2" class="pa-1 pt-1 pb-0">
              <v-text-field 
                v-model="addSumQty" 
                :label="$t('totalQty')"
                item-text="text" 
                item-value="value" 
                dense 
                outlined 
                :disabled="true"
              />
            </v-col>
            <v-col cols="2" class="pa-1 pt-1 pb-0 ">
              <v-text-field
                v-model="addRemark"
                :label="$t('remark')"
                item-text="text"
                item-value="value"
                offset="0"
                dense
                outlined
                clearable
              />
            </v-col>
            <v-col cols="1.2" class="pa-1 pt-1 pb-0 addBtn">
              <v-btn 
                depressed 
                class="pt-0 white--text pr-2" 
                color="rgb(43,81,235)"
                height="30" 
                width="100%" 
                @click="addClick"
              >
                <v-icon class="mr-1">mdi-plus</v-icon>추가
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </i-card-vertical>
    </v-col>
    <v-row no-gutters>
      <!-- 입고정보 등록란 -->
      <v-col cols="12" class="pa-2">
        <i-card-vertical
          style="color: black; "
          headerTitle="receivingInfoSave"
          :useBtnList="[
            'btnReceivingInfo', //입고현황
            'btnCancel', //취소
            'btnSave' //저장
          ]"
          @btnSave="btnSave"
          @btnCancel="btnCancel"
          @btnReceivingInfo="showReceivingInfo"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
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
                  @focused-row-changed="focusedRowChanged_ItemPop" 
                  @CellDblClick="selectedItem"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection 
                    select-all-mode="allPages" 
                    :show-check-boxes-mode="checkBoxesMode" 
                    mode="multiple" 
                  />
                  <DxScrolling column-rendering-mode="virtual" />
                  <!-- 품목코드 -->
                  <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partCode')" 
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
                  >
                    <dxLookup 
                      :data-source="partNameList" 
                      display-expr="partName" 
                      value-expr="partNo" 
                    />
                  </DxColumn>
                  <!-- 입고구분 -->
                  <DxColumn 
                    data-field="inType" 
                    :caption="$t('inType')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  >
                    <dxLookup 
                      :data-source="inTypeList2" 
                      display-expr="sysName" 
                      value-expr="sysCode" 
                    />
                  </DxColumn>
                  <!-- 입고유형 -->
                  <DxColumn 
                    data-field="inCate" 
                    :caption="$t('inCate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  >
                    <dxLookup 
                      :data-source="inCateList2" 
                      display-expr="sysName" 
                      value-expr="sysCode" 
                    />
                  </DxColumn>
                  <!-- 입고창고 -->
                  <DxColumn 
                    data-field="inWh" 
                    :caption="$t('inWh')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  >
                    <DxLookup 
                      :data-source="inWhList" 
                      display-expr="text" 
                      value-expr="value" 
                    />
                  </DxColumn>
                  <!-- LOT NO -->
                  <DxColumn 
                    data-field="lotNo" 
                    :caption="$t('lotNumber')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                  />
                  <!-- 수량 -->
                  <DxColumn 
                    data-field="qty" 
                    :caption="$t('qty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                  />
                  <!-- 비고 -->
                  <DxColumn 
                    data-field="remark" 
                    :caption="$t('remark')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
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
                  column-resizing-mode="widget"
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
                  <DxColumn 
                    data-field="partNo2" 
                    :caption="$t('partNo')" 
                    data-type="string" 
                    alignment="center" 
                    :min-width="150" 
                    width="200" 
                    css-class="devest-grid-header-require" 
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
                    data-field="spec" 
                    :caption="$t('spec')" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                  />
                  <DxSelection show-check-boxes-mode="none" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="selectedItem">
            <v-icon>$save</v-icon>{{ $t('choice') }}
            <!-- SAVE -->
          </v-btn>
          <v-btn tile outlined width="80px" class="CancelBtn" ref="cancelBtn" @click="close">
            <v-icon>$cancel</v-icon>{{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <pop0030Popup 
      ref="pop0030Popup"
      :popVisible="popVisible"
      @close="close"
    />
    <!--*************************************************************************************************-->
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import { DxPopup } from 'devextreme-vue/popup'

import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxLookup, DxEditing } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getAccount } from '@/api/view/mat0010'
import { getPartNo, getInWh } from '@/api/view/mat0013'
import { createMat0013 } from '@/api/view/pop0030'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'

import pop0030Popup from '@/views/30/3011/popup/pop0030Popup.vue'

export default {
  name: 'pop0030',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxPopup,
    DxColumn,
    DxScrolling,
    DxLookup,
    pop0030Popup
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
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      state: this.$store.state.app.isScreenFull,


      //조회조건 관련
      custCodeList: [],
      searchCustCode: '',
      searchPartNo: '',
      searchInType: '',
      searchInCate: '',
      searchInWh: '',
      inTypeList: [],
      inCateList: [],
      inWhList: [],
      addLotNo: '',
      addQty: '',
      addBoxQty: '',
      addSumQty: '',
      addRemark: '',

      //그리드 관련
      popupInfoGrid: [],
      receivingInfo: [],
      receivingInfoRef: 'receivingInfoRef',
      itemPopupVisible : false,
      partNameList: [],
      inTypeList2: [],
      inCateList2: [],
      
      itemPopData: '',
      partNoReadOnly: true,
      disabledCtr:true,

      //popup
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
      return this.GetDataGrid(this.receivingInfoRef)
    },
  },
  beforeMount() {
    let param = {
      comCode: getComCode()
    }

    getAccount(param).then(res => {
      res.list.forEach(e => {
        this.custCodeList.push({
          text: e.custName,
          value: e.custCode
        })
      })
    })

    const inTypeData = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_TYPE',
      userFlag: 'Y'
    }
    getCmChildCode(inTypeData).then(res => {
      this.inTypeList2 = res.list
      res.list.forEach(e => {
        this.inTypeList.push({
          value: e.sysCode,
          text: e.sysName
        })
      })
    })

    const inCateData = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_CATE',
      userFlag: 'Y'
    }
    getCmChildCode(inCateData).then(res => {
      this.inCateList2 = res.list
      res.list.forEach(e => {
        this.inCateList.push({
          value: e.sysCode,
          text: e.sysName
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
      this.searchPartNo = ''
      this.searchInType = ''
      this.searchInCate = ''
      this.addLotNo = ''
      this.searchInWh = ''
      this.addQty = ''
      this.addBoxQty = ''
      this.addSumQty = ''
      this.addRemark = ''
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
      this.getInWh()
    },
    custCodeChange(e){
      if(e !== null || e !== undefined || e!== ''){
        this.disabledCtr = false
      }
    },
    // 입고창고 GET
    getInWh() {
      let param = {
        comCode: getComCode(), 
        facCode: this.userData.factory.code
      }
      getInWh(param).then(res => {
        res.list.forEach(e => {
        this.inWhList.push({
          value: e.inWh,
          text: e.inWhNm
        })
      })
      })
    },

    partNoClick(){
      if (this.searchCustCode === '' || this.searchCustCode === undefined || this.searchCustCode === null) {
        notify(this.$t('mat0013AddCheck'), 'error', 3000)
        return
      }
      this.itemPopupVisible = true
      let params2 = {
        comCode: getComCode(),
        custCode: this.searchCustCode
      }
      getPartNo(params2).then((res) => {
        let cnt = 0
        this.partNameList = res.list
        res.list.forEach((item) => {
          item.id = cnt++
          item.partNo2 = item.partNo
        })
        this.popupInfoGrid = res.list
      }).finally(() => {
        this.endLoading()
      })

    },
    focusedRowChanged_ItemPop(e){
      this.itemPopData = e.row.data
    },
    selectedItem(){
      this.itemPopupVisible = false
      this.searchPartNo = this.itemPopData.partNo
      this.addLotNo = new Date().toISOString().substring(2, 10).replace(/-/g, '')
      this.addQty = this.itemPopData.lotSize
      this.addBoxQty = 1
      this.addSumQty = this.addQty * this.addBoxQty
      this.searchInType = this.inTypeList[0].value
      this.searchInCate = this.inCateList[0].value
    },
    close(){
      this.itemPopupVisible = false
    },

    inputQty(e) {
      this.addSumQty = e * this.addBoxQty
    },
    inputBoxQty(e) {
      this.addSumQty = e * this.addQty
    },
    addClick(){
      if (!this.searchCustCode || !this.searchPartNo || !this.searchInType || !this.searchInCate || !this.searchInWh ||
          !this.addLotNo || !this.addQty || !this.addBoxQty ) {
        notify('모든 입고정보를 입력해 주십시오 [입고처, 품목 코드, 입고구분, 입고유형, 창고정보, 표준수량, BOX수량]', 'error')
        return
      }
      if (this.addSumQty <= 0){
        notify('수량은 0보다 많아야 합니다', 'error', 3000)
        return
      }
      for (let i = 0; i < this.addBoxQty; i++) {
        let newRow = {
          id : this.receivingInfo.length + 1,
          comCode: getComCode(),
          custCode: this.searchCustCode,
          facCode: this.userData.factory.code,
          partNo: this.searchPartNo,
          partName: this.searchPartNo,
          inType: this.searchInType,
          inCate: this.searchInCate,
          inWh: this.searchInWh,
          lotNo : this.addLotNo,
          makeQty: this.addQty, // 구성량
          boxQty: this.addBoxQty,
          qty: this.addQty,
          remark: this.addRemark,
          regiDate: new Date().toISOString().substring(0, 10),
          maker: getUserId()
        }
        this.gridMainInstance.newRow(newRow)
        this.gridMainInstance.saveEditData()
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 1)
      }
    },
    async btnCancel() {
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

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
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          createMat0013(selectedMainRows)
            .then(res => {
              
              let message = 'Saved'
              notify(this.$t(message), 'success', 3000)
              this.receivingInfo = []
              this.searchCustCode = ''
              this.searchPartNo = ''
              this.searchInWh = ''
              this.searchInType = ''
              this.searchInCate = ''
              this.addLotNo = ''
              this.addQty = ''
              this.addBoxQty = ''
              this.addSumQty = ''
              this.addRemark = ''
              
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
    showReceivingInfo() {
      if(this.receivingInfo.length !== 0) {
        let popData = {
          popVisible: true,
          comCode: getComCode(),
          facCode: this.receivingInfo[0].facCode,
          custCode: this.receivingInfo[0].custCode,
          partNo: this.receivingInfo[0].partNo,
          lotNo: this.receivingInfo[0].lotNo
        }
        this.$refs.pop0030Popup.open(popData)
      } else {
        notify('입고정보를 추가하십시오.', 'error', 1500)
      }
    }
  }
}
</script>
<style scoped>
.releaseBtn {
  background-color:rgb(43,81,235);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}

.CancelBtn {
  background-color:rgb(255,255,255);
  border:1px solid #333333;
  margin-right: 6px;
  font-size: 12pt;
  color:#333333;
}

.boxWidth{
  width : 504px
}

.addBtn {
  text-align: right;
}
</style>
