<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{$t('inOfProcessForwarding')}}</span>
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
    <!-- ************************************************************************************ -->
    <v-row no-gutters>
      <!-- 납품 정보 선택 -->
      <v-col cols="5" class="pa-2">
        <i-card-vertical
          headerTitle="selectDeliveryInfo"
        >
          <template v-slot:body>
            <v-row>
            <!-- 거래처 선택 -->
              <v-col cols="6" class="pa-1 pt-1 pb-2">
                <v-autocomplete
                  :label="$t('customerSelect')"
                  v-model="custCode"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  outlined
                  dense
                  height="32"
                  @change="selectCust"
                ></v-autocomplete>
              </v-col>
            <!-- 전표번호 입력창 -->
              <v-col cols="6" class="pa-1 pt-1 pb-2">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="searchIlno"
                  :label="$t('statementNumber')"
                  :items="ilnoList"
                  item-text="value"
                  item-value="value"
                  dense
                  outlined
                  height="32"
                  @change="selectIlno"
                />
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
      <!-- 입고 정보 -->
      <v-col cols="7" class="pa-2">
        <i-card-vertical
          headerTitle="receiptInfo"
        >
          <template v-slot:body>
            <v-row>
            <!-- 품목코드 -->
              <v-col cols="4" class="pa-1 pt-1 pb-2">
                <v-text-field
                  :label="$t('partCode')"
                  v-model="textPartNo"
                  outlined 
                  dense 
                  height="32"
                  disabled
                />
              </v-col>
              <!-- 품명 -->
              <v-col cols="4" class="pa-1 pt-1 pb-2">
                <v-text-field
                  :label="$t('partName')"
                  v-model="textPartName"
                  :items="itemList"
                  item-text="text"
                  item-value="value"
                  outlined 
                  dense 
                  height="32"
                  disabled
                />
              </v-col>
              <!-- 비고 -->
              <v-col cols="4" class="pa-1 pt-1 pb-2">
                <v-text-field
                  :label="$t('remark')"
                  v-model="textRemark"
                  outlined 
                  dense 
                  height="32"
                  disabled
                />
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row no-gutters>
    <!-- 납품정보 상세 -->
      <v-col cols="5" class="pa-2">
        <i-card-vertical
          headerTitle="deliveryInfoDetail"
          :useBtnList="[
            'btnAdd'
          ]"
          @btnAdd="btnAdd"
        >
          <template v-slot:body>
            <!-- 납품정보 상세 -->
            <v-row>
              <v-col cols="4" class="pa-1 pt-1 pb-2">
                <v-text-field
                  :label="$t('statementNumber')"
                  color="black"
                  v-model="searchIlno"
                  outlined 
                  dense 
                  height="32"
                  disabled
                />
              </v-col>
              <v-col cols="4" class="pa-1 pt-1 pb-0">
                <v-text-field
                  :label="$t('outLotDetail')"
                  v-model="outLotDetail"
                  outlined 
                  dense 
                  height="32"
                  @keyup.enter="searchLotDetail"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-layout column>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="bas0011DetailGrid"
                    class="doubleListBox13"
                    :ref="deliveryInfoDetailRef"
                    :data-source="deliveryInfoDetail"
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
                  >
                    <DxPaging :enabled="false" />
                    <DxSelection show-check-boxes-mode="none" />
                    <DxPager :show-page-size-selector="false" />
                    <DxEditing 
                      :allow-updating="false" 
                      :allow-adding="true"
                      mode="cell" 
                    />
                  <!-- 컬럼 -->
                  <!-- 전산번호 컬럼 -->
                    <DxColumn 
                    data-field="outLotDetail" 
                    :caption="$t('outLotDetail')" 
                    data-type="string"
                    />
                    <!-- LOT NO 컬럼 -->
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('lotNumber')"
                      data-type="string"
                    />
                    <!-- 수량 컬럼 -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('qty')"
                      data-type="string"
                      alignment="left"
                    />
                    <!-- 입고량 컬럼 -->
                    <DxColumn
                      data-field="inQty"
                      :caption="$t('inQty')"
                      data-type="string"
                    />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    <!-- 입고정보 저장 -->
      <v-col cols="7" class="pa-2">
        <i-card-vertical
          headerTitle="receiptInfoSave"
          :useBtnList="[
            'btnCancel',
            'btnSave'
          ]"
          @btnCancel="btnCancel"
          @btnSave="btnSave"
        >
          <template v-slot:body>
            <v-row>
              <v-layout column>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="bas0011DetailGrid"
                    class="doubleListBox12"
                    :ref="storedInfoSaveRef"
                    :data-source="storedInfoSave"
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
                    :column-auto-width="true"
                    :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
                  >
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxEditing :allow-updating="false" :allow-adding="true" mode="cell" />
                  <!-- 컬럼 -->
                  <!-- 품목코드 컬럼 -->
                    <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partCode')" 
                    data-type="string"
                    />
                    <!-- LOT NO 컬럼 -->
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('lotNumber')"
                      data-type="string"
                    />
                    <!-- 전산번호 컬럼 -->
                    <DxColumn
                      data-field="outLotDetail"
                      :caption="$t('outLotDetail')"
                      data-type="string"
                      alignment="left"
                    />
                    <!-- 수량 컬럼 -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('qty')"
                      data-type="string"
                    />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getCompany } from '@/api/system/companyManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import { getAccount } from '@/api/view/mat0010'
import { getinIlno, getPop0120, setPop0120 } from '@/api/view/pop0120'
import { getItemInfo } from '@/api/view/bas0040'
import { emitWarning } from 'process'

export default {
  name: 'pop0120',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
  },
  data() {
    return {
      //유저정보
      userData: {
        company: getComCode(),
        factory: {
          code: '',
        },
        name: '',
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
          second: '00',
        },
      },
      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000, // 지연시간
      },
      //그리드 관련
      deliveryInfoDetailRef: 'deliveryInfoDetailRef',
      storedInfoSaveRef: 'storedInfoSaveRef',
      deliveryInfoDetail: [],
      storedInfoSave: [],
      //autocomplete
      custCode: '',
      searchIlno: '',

      custCodeList: [],
      ilnoList: [],

      errorCode: 0,
      state: this.$store.state.app.isScreenFull,

      facCodeData: '',
      listData: [],

      //입고정보 autoComplete
      textPartNo: '',
      textPartName: '',
      textRemark: '',
      itemList: [],

      //검색조건
      outLotDetail: '',

      checkLotDetail: '',
      checkId: ''
    }
  },
  computed: {
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    //납품정보상세
    griDelivertInfoInstance() {
      return this.GetDataGrid(this.deliveryInfoDetailRef)
    },
    //입고정보저장
    griStoredInfoInstance() {
      return this.GetDataGrid(this.storedInfoSaveRef)
    },
  },
  beforeMount() {
    let param = {
      comCode: getComCode(),
    }
    getAccount(param).then(res =>{
      res.list.forEach(e =>{
        this.custCodeList.push({
          value: e.custCode,
          text: e.custName
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
        this.display.time.year = date.getFullYear().toString().substr(2)
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
      this.custCode = ''
      this.searchIlno= ''
      this.deliveryInfoDetail = []
      this.storedInfoSave= []
      this.textPartNo = ''
      this.textPartName = ''
      this.textRemark = ''
      notify('refresh', 'success', 1500)
    },
    async dataSettting() {
      try {
        let params = {
          comCode: getComCode(),
          userId: getUserId(),
        }
        let resData = await getCompany(params)
        let userFacData = await getUser(params)
        let factoryList = await getFactoryInfoData(params)
        this.facCodeData = factoryList.list[0].facCode
        this.userData.factory.code = userFacData.list[0].facCode
        // this.userData.name = userFacData.list[0].userName
        this.display.company = resData.list[0].comName
        let factoryFilterData = factoryList.list.filter((word) => word.facCode === this.userData.factory.code)
        this.display.factory = factoryFilterData[0].facName
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    selectCust() {
      this.deliveryInfoDetail = []
      this.ilnoList = []
      let param = {
        comCode: getComCode(),
        facCode: this.facCodeData,
        custCode: this.custCode
      }
      getinIlno(param).then(res => {
        res.list.forEach(e => {
          this.ilnoList.push({
            text: e,
            value: e
          })
        })
      })
    },
    selectIlno() {
      this.listData= []
      let cnt = 1;
      let detailParam = {
        comCode: getComCode(),
        facCode: this.facCodeData,
        custCode: this.custCode,
        inIlno: this.searchIlno
      }
      getPop0120(detailParam).then(res => {
        res.list.forEach(e => {
          e.id = cnt++
          this.listData.push(e)
        })
        this.deliveryInfoDetail = this.listData
      })
    },

    // '공정실적 전산번호' 입력 후 엔터 / 스캔 시 '입고정보 저장' 그리드로 데이터 입력
    async searchLotDetail() {
      // '공정실적 전산번호' 입력시 관련 데이터를 가져올 Parameters
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeData,
        custCode: this.custCode,
        inIlno: this.searchIlno,
        outLotDetail: this.outLotDetail
      }
      // 품명을 가져오기위한 Parameter
      let itemRes = await getItemInfo({
        comCode: getComCode(),
        facCode: this.facCodeData,
        partNo: this.deliveryInfoDetail[0].partNo
      })
      itemRes.list.forEach((e) => {
        this.itemList.push({
          value: e.partNo,
          text: e.partName
        })
      })
      let scanData = await getPop0120(params)
      scanData.list.forEach((e) => {
        e.id = this.storedInfoSave.length + 1
      })
      //중복값이 있을 경우 알림
      let found = this.storedInfoSave.find(obj=>obj.outLotDetail === this.outLotDetail)

      if(!found) {
        this.textPartName = this.itemList[0].text //품명
        this.textPartNo = this.deliveryInfoDetail[0].partNo //품목코드
        this.textRemark = this.deliveryInfoDetail[0].remark //비고

        this.griStoredInfoInstance.newRow(scanData.list[0])
        this.griStoredInfoInstance.selectRows(scanData.list[0].id, true)
      } else {
        notify('이미 등록되었습니다.', 'error', 1500)
      }
      this.deliveryInfoDetail = this.deliveryInfoDetail.filter(i=> i.outLotDetail !== this.outLotDetail)
      this.outLotDetail = ''
      if(this.deliveryInfoDetail.length === 0) {
        this.outLotDetail = ''
        this.searchIlno = []
      }
    },

    async btnAdd() {
      let itemRes = await getItemInfo({
        comCode: getComCode(),
        facCode: this.facCodeData,
        partNo: this.deliveryInfoDetail[0].partNo
      })
      itemRes.list.forEach((e) => {
        this.itemList.push({
          value: e.partNo,
          text: e.partName
        })
      })

      let found = this.storedInfoSave.find(obj=>obj.outLotDetail === this.deliveryInfoDetail[0].outLotDetail)
      if(!found) {
        this.textPartNo = this.deliveryInfoDetail[0].partNo
        this.textPartName = this.itemList[0].text
        this.textRemark = this.deliveryInfoDetail[0].remark

        for(let i in this.deliveryInfoDetail) {
          delete i.id
          let addData = this.deliveryInfoDetail
          addData.forEach((e) => {
            e.id = e.outLotDetail
          })
          this.griStoredInfoInstance.newRow(addData[i])
          this.griStoredInfoInstance.selectRows(addData[i].id, true)
        }
      } else {
        notify('이미 등록되었습니다.', 'error', 1500)
      }
      this.outLotDetail = ''
      this.searchIlno = []
      this.deliveryInfoDetail = []
    },

    async btnCancel() {
      this.griStoredInfoInstance.saveEditData()
      let selectedMainRows = await this.griStoredInfoInstance.getSelectedRowsData()
      if(!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      } 
      this.vToastifyPrompt(
        this.$t('취소하시겠습니까?'),
        'info', 
        (current) => {
          for(let i of selectedMainRows) {
            this.storedInfoSave = this.storedInfoSave.filter(x=> x.id !== i.id)
            this.searchIlno = i.inIlno
          }
          this.deliveryInfoDetail = selectedMainRows
          this.textPartNo = ''
          this.textPartName = ''
          this.textRemark = ''
          this.endLoading()
          notify('취소 되었습니다.', 'success', 1500)
        },
        null,
        true
      )
    },
    async btnSave() {
      await this.griStoredInfoInstance.saveEditData()

      let selectedMainRows = await this.griStoredInfoInstance.getSelectedRowsData()
      if(!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        () => {
          this.openLoading()
          setPop0120(selectedMainRows).then(res => {
            if(res.success) {
              notify(this.$t('Saved'), 'success', 1500)
              this.deliveryInfoDetail = []
              this.storedInfoSave = []
              this.searchIlno= ''
              this.deliveryInfoDetail = []
              this.storedInfoSave= []
              this.textPartNo = ''
              this.textPartName = ''
              this.textRemark = ''
            } else {
              this.vToastify(res.msg,'warn')
            }
          })
          .catch(error => {
            notify(error, 'error', 1500)
            this.deliveryInfoDetail = []
            this.storedInfoSave = []
          })
          .finally(() => {
            this.griStoredInfoInstance.endUpdate()
            this.griStoredInfoInstance.clearSelection()
            this.endLoading()
          })
        },
        null,
        true
      )
    }
  },
}
</script>
<style lang="scss" scoped>
.span {
  text-align: center;
}
.btnStyle {
  text-align: right;
}

</style>

