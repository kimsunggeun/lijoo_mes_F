<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{ $t('materialWarehousing') }}</span>
      </v-col>
      <v-col class="d-flex ">
        <span class="headerText3"
          ><v-icon class="mr-1 green_icon">$calendar_clock</v-icon
          >{{
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
              display.time.minute +
              ':' +
              display.time.second
          }}</span
        >
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn width="40" height="40" color="RefreshBtn" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px"> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!--*************************************************************************************************-->
    <v-row no-gutters class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <!-- 납품 정보 선택란 -->
        <v-col cols="12" class="pa-2 pt-2 pb-2 flex">
          <i-card-vertical style="color: black; " headerTitle="deliveryInfoSelect">
            <template v-slot:body>
              <v-row>
                <v-col cols="3" class="pa-1 pt-1 pb-0">
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
                <v-col cols="3" class="pa-1 pt-1 pb-0">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    v-model="searchIlno"
                    :label="$t('popIlno')"
                    :items="ilnoList"
                    item-text="value"
                    item-value="value"
                    dense
                    outlined
                    @click="clickIlno"
                    @change="doSearchMain"
                  />
                </v-col>
                <v-col cols="2" class="pa-1 pt-1 pb-1"></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="3" class="pa-1 pt-1 pb-1">
                  <v-text-field
                    v-model="searchScanData"
                    :label="$t('inIlnoScan')"
                    item-text="text"
                    item-value="value"
                    @keydown.enter="searchScan"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
            </template>
          </i-card-vertical>
        </v-col>
      </v-col>
      <!-- 납품정보 상세란 -->
      <v-row class="pa-0 ma-0">
        <v-col cols="6" class="pa-2">
          <i-card-vertical
            style="color: black;"
            headerTitle="deliveryInfoDetail"
            :useBtnList="[
              'btnAdd' //추가
            ]"
            @btnAdd="btnAdd()"
          >
            <template v-slot:body>
              <v-row no-gutters>
                <v-col cols="6" class="pa-1 pt-1 pb-1">
                  <v-text-field
                    v-model="searchScanData2"
                    :label="$t('lotDetailScan')"
                    item-text="text"
                    item-value="value"
                    @keydown.enter="searchScan2"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-layout column>
                <DxDataGrid
                  id="deliveryInfo"
                  class="listBox11"
                  :ref="deliveryInfoRef"
                  :data-source="deliveryInfo"
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
                  <DxSelection show-check-boxes-mode="none" />
                  <!-- 등록일 -->
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('regiDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 품번 -->
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 품명 -->
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 전산번호 -->
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('lotDetail')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 납품 수량 -->
                  <DxColumn data-field="qty" :caption="$t('deliveryQty')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 입고 수량 -->
                  <DxColumn
                    data-field="WarehousingQty"
                    :caption="$t('WarehousingQty')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
        <v-col cols="6" class="pa-2">
          <!-- 입고정보 저장 -->
          <i-card-vertical
            style="color: black; "
            headerTitle="receivingInfoSave"
            :useBtnList="['btnCancel', 'btnSave']"
            @btnSave="btnSave"
            @btnCancel="btnCancel"
          >
            <template v-slot:body>
              <v-layout column>
                <v-col cols="12" class="pa-0 pt-pop0010">
                  <DxDataGrid
                    id="receivingInfo"
                    class="listBox11"
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
                    :columnAutoWidth="true"
                  >
                    <DxPaging :enabled="false" />
                    <DxSelection show-check-boxes-mode="none" />
                    <DxScrolling column-rendering-mode="virtual" />
                    <!-- 계획일 -->
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('planDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <!-- 품목코드 -->
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <!-- 전산번호 -->
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <!-- 납품수량 -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('deliveryQty')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <!-- 제조일 -->
                    <DxColumn
                      data-field="proDate"
                      :caption="$t('proDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn />
                    <DxPager :show-page-size-selector="false" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'

import { DxPopup } from 'devextreme-vue/popup'
import { getAccount } from '@/api/view/mat0010'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getMat0018, getMat0018_Scan, getMat0018_LotScan, updateMat0018, getIlno } from '@/api/view/pop0010'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'

export default {
  name: 'pop0010',
  mixins: [baseview, BaseDataGrid],
  components: {
    iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling
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
          second: '00'
        }
      },
      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000 // 지연시간
      },
      errorCode: 0,
      state: this.$store.state.app.isScreenFull,

      //그리드 정보
      deliveryInfo: [],
      receivingInfo: [],

      deliveryInfoRef: 'deliveryInfoRef',
      receivingInfoRef: 'receivingInfoRef',

      custCodeList: [], // 입고처 데이터
      ilnoList: [], // 입고번호 데이터

      searchCustCode: '', // 조회조건에 쓰일 거래처코드
      searchIlno: '', // 조회조건에 쓰일 입고번호
      searchScanData: '',
      searchScanData2: '',

      selectedRowIndex: -1,
      duplicationCheck: [],
      duplicationCheckList: [],
      cnt: 0
    }
  },
  beforeMount() {
    let param = {
      comCode: getComCode()
    }

    getAccount(param).then(res => {
      res.list.forEach(e => {
        this.custCodeList.push({
          value: e.custCode,
          text: e.custName
        })
      })
    })
  },
  created() {},
  watch: {},
  computed: {
    /*
     * 화면 크기에 맞게 dxdataGrid 의 크기를 조절
     **/
    maxHeight() {
      return `${window.innerHeight}px`
    },
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    gridMainInstance() {
      return this.GetDataGrid(this.deliveryInfoRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.receivingInfoRef)
    }
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
        this.display.time.minute = String(date.getMinutes()).padStart(2, '0')
        this.display.time.second = String(date.getSeconds()).padStart(2, '0')
      }, this.timeCounter.delay)
    },
    //새로고침
    async totalRefresh() {
      this.searchCustCode = '' //입고처 선택 초기화
      this.searchIlno = '' //입고번호 선택 초기화
      this.deliveryInfo = [] //납품정보 상세 그리드 초기화
      this.receivingInfo = [] // 입고정보저장 그리드 초기화
      this.searchScanData = '' // 입고번호 스캔 입력 초기화
      this.searchScanData2 = '' // 전산번호 스캔 입력 초기화
      this.ilnoList = [] // 입고번호 데이터 초기화
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
    doSearchMain() {
      this.deliveryInfo = []
      this.duplicationCheckList = []
      let param = {
        comCode: getComCode(),
        custCode: this.searchCustCode,
        ilno: this.searchIlno
      }
      getMat0018(param).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
          e.editor = getUserId()
          if (!this.duplicationCheck.some(i => [e.lotDetail].includes(i))) {
            this.duplicationCheckList.push(e)
          }
        })
        this.deliveryInfo = this.duplicationCheckList
      })
    },
    searchScan() {
      this.clickIlno()
      let param = {
        comCode: getComCode(),
        ilno: this.searchScanData
      }
      let cnt = 0
      getMat0018_Scan(param).then(res => {
        res.list.forEach(e => {
          e.id = cnt++
          e.editor = getUserId()
        })
        this.deliveryInfo = res.list
        for (let i in res.list) {
          this.searchIlno = res.list[i].ilno
        }
      })
    },
    async searchScan2() {
      if (this.searchIlno == '' && this.searchScanData == '') {
        notify('납품정보 선택 후 입력해주세요.', 'error', 1500)
        return
      }
      let params = {
        comCode: getComCode(),
        ilno: this.searchIlno,
        lotDetail: this.searchScanData2
      }
      let tossData = await getMat0018_LotScan(params)
      tossData.list.forEach(e => {
        e.id = this.receivingInfo.length + 1
      })

      let found = this.receivingInfo.find(obj => obj.lotDetail === this.searchScanData2)

      if (!found) {
        for (let i in tossData.list) {
          this.gridDetailInstance.newRow(tossData.list[i])
          this.gridDetailInstance.selectRows(tossData.list[i].id, true)
        }
      } else {
        notify('이미 등록되었습니다.', 'error', 1500)
      }

      this.deliveryInfo = this.deliveryInfo.filter(i => i.lotDetail !== this.searchScanData2)
      this.searchScanData2 = ''
    },
    custCodeChange() {
      this.deliveryInfo = []
      this.receivingInfo = []
      this.searchIlno = []
      this.ilnoList = []
      this.duplicationCheck = []
      this.duplicationCheckList = []
    },
    clickIlno() {
      // 입고처를 선택하고 입고번호 창을 선택하면 입고처에 대한 입고번호를 조회한다
      let param = {
        comCode: getComCode(),
        custCode: this.searchCustCode
      }
      getIlno(param).then(res => {
        res.list.forEach(e => {
          this.ilnoList.push({
            text: e.ilno,
            value: e.ilno
          })
        })
      })
    },
    //데이터 추가
    async btnAdd() {
      var selectedMainRows = this.deliveryInfo
      for (let i = selectedMainRows.length; i > 0; i--) {
        this.duplicationCheck.push(selectedMainRows[i - 1].lotDetail)
        this.gridDetailInstance.newRow(selectedMainRows[i - 1])
        this.gridDetailInstance.selectRows(selectedMainRows[i - 1].id, true)
        this.gridMainInstance.deselectAll()
      }
      this.deliveryInfo = []
      this.gridMainInstance.saveEditData()
      this.gridDetailInstance.option('focusedRowIndex', 1)
    },
    async btnCancel() {
      var selectedDetailRows = this.receivingInfo
      for (let i = selectedDetailRows.length; i > 0; i--) {
        this.gridMainInstance.newRow(selectedDetailRows[i - 1])
        this.gridMainInstance.selectRows(selectedDetailRows[i - 1].id, true)
      }
      this.receivingInfo = []
      this.duplicationCheck = []
      this.duplicationCheckList = []
      this.gridDetailInstance.saveEditData()
      this.gridMainInstance.option('focusedRowIndex', 1)
    },
    async btnSave() {
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          this.gridDetailInstance.beginUpdate()
          updateMat0018(selectedDetailRows, true)
            .then(res => {
              let message = 'Saved'
              notify(this.$t(message), 'success', 3000)
              this.searchScanData = ''
              this.searchIlno = ''
              this.deliveryInfo = []
              this.receivingInfo = []
            })
            .catch(error => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.gridDetailInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    }
  }
}
</script>
<style scoped>
.fixed-height {
  overflow-y: auto;
}
.fontweight {
  font-weight: 900;
}
</style>
