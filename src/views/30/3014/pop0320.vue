<template>
  <v-container
    fluid
    align-start
    ma-0
    pa-2
    :class="isScreenFull ? 'containerFull-height' : 'container-height'"
  >
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{$t('LotMerger')}}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText3"><v-icon class="mr-1 green_icon">$calendar_clock</v-icon>
          {{
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
          }}
        </span>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn width="40" height="40" color="RefreshBtn" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px">mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-0 pa-0">
        <i-card-vertical 
          headerTitle="inputLotDetail" 
          class="required mx-1" 
          dense 
          outlined
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters>
                <v-col cols="3" class="pa-1 pt-0">
                  <v-text-field
                    :label="$t('lotDetail')"
                    outlined
                    dense
                    clearable
                    v-model="searchLotDetail"
                    @keyup.enter="click()"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="pb-2 ml-1">
                  <v-btn
                    depressed
                    class="px-3"
                    color="rgb(44,73,184)"
                    height="30"
                    width="15%"
                    @click="click()"
                  >
                    <v-icon color="white" size="20px" class="pr-1">mdi-arrow-left-bottom-bold</v-icon>
                  </v-btn>
                  <v-btn
                    depressed
                    class="px-3 ml-1"
                    color="rgb(44,73,184)"
                    height="30"
                    width="15%"
                    fontWeight="13px"
                    @click="openPopup()"
                  >
                    <v-icon color="white" size="20px" class="pr-1">mdi-plus-box-multiple-outline</v-icon>
                  </v-btn>
                  <v-btn
                    depressed
                    class="class=rounded-0 ml-1 font-weight-bold pl-1 pr-6 white--text"
                    color="rgb(44,73,184)"
                    height="30"
                    width="30%"
                    @click="clear()"
                  >
                    <v-icon color="white" size="20px" class="pr-1">mdi-refresh</v-icon>새로고침
                  </v-btn>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-vertical headerTitle="nowStatus" outlined>
          <template v-slot:body>
            <v-layout column>
              <v-row class="d-sm-flex flex-sm-row justify-sm-center">
                <v-col cols="3" class="pa-1 pt-1 pb-0">
                  <v-text-field
                    :menu-props="{offsetY:true}"
                    :label="$t('partCode')"
                    color="primary"
                    class="required mx-1 center-input"
                    :items="partCodeList"
                    outlined
                    dense
                    height="32"
                    disabled
                    v-model="partCode"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="pa-1 pt-1 pb-0">
                  <v-text-field
                    :label="$t('partName')"
                    color="primary"
                    class="required mx-1 center-input"
                    outlined
                    dense
                    height="32"
                    disabled
                    v-model="partName"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="pa-1 pt-1 pb-0">
                  <v-text-field
                    :label="$t('locName')"
                    color="primary"
                    class="required mx-1 center-input"
                    outlined
                    dense
                    height="32"
                    disabled
                    v-model="locName"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-sm-flex flex-sm-row justify-sm-center pt-1">
                <v-col cols="3" class="pa-1 pt-1 pb-2">
                  <v-text-field
                    :label="$t('lotNo')"
                    outlined
                    dense
                    color="primary"
                    class="required mx-1 center-input"
                    disabled
                    v-model="lotNo"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="pa-1 pt-1 pb-2">
                  <v-text-field
                    :label="$t('inRegiDate')"
                    v-model="inRegiDate"
                    color="primary"
                    class="required mx-1 center-input"
                    outlined
                    dense
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="3"></v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-vertical
          headerTitle="divMergeSave"
          :useBtnList="[
            'btnCancel',
            'btnSave'
          ]"
          @btnCancel="btnCancel()"
          @btnSave="btnSave()"
        >
          <template v-slot:body>
            <DxDataGrid
              id="Pop0320MainGrid"
              class="listBox15"
              :ref="DxDataGridPopRef"
              :data-source="Pop0320MainGrid"
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
              <DxSelection mode="multiple" />
              <DxColumn data-field="id" :caption="$t('id')" data-type="string" :visible="false" />
              <DxColumn
                data-field="partNo"
                width="auto"
                :caption="$t('partCode')"
                data-type="string"
                alignment="center"
                :allow-editing="false"
              />
              <DxColumn
                data-field="partName"
                width="auto"
                :caption="$t('partName')"
                data-type="string"
                alignment="center"
                :allow-editing="false"
              />
              <DxColumn
                data-field="lotNo"
                width="auto"
                :caption="$t('lotNumber')"
                data-type="string"
                alignment="center"
                :allow-editing="false"
              />
              <DxColumn
                data-field="lotDetail"
                :caption="$t('lotDetail')"
                data-type="string"
                width="auto"
                alignment="center"
                :allow-editing="false"
              />

              <DxColumn
                data-field="stockQty"
                width="auto"
                :caption="$t('qty')"
                data-type="string"
                alignment="center"
                :allow-editing="false"
              />
              <DxColumn
                data-field="locCode"
                :caption="$t('locCode')"
                :visible="false"
                data-type="string"
                :allow-editing="false"
              />
              <DxColumn
                data-field="stockType"
                :caption="$t('stockType')"
                :visible="false"
                data-type="string"
                :allow-editing="false"
              />
              <DxColumn
                data-field="stockAmount"
                :caption="$t('stockAmount')"
                :visible="false"
                data-type="string"
                :allow-editing="false"
              />
              <DxColumn
                data-field="regiDate"
                :caption="$t('regiDate')"
                :visible="false"
                data-type="string"
                :allow-editing="false"
              />
              <DxColumn />
            </DxDataGrid>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <pop0320Popup1
      ref="pop0320Popup1"
      :popVisible="popVisible"
      @close="close"
      @setInput="setInput"
      @setInput2="setInput2"
    ></pop0320Popup1>
  </v-container>
</template>
<script>
import iCardVertical from '@/components/common/iCardVertical.vue'

import { DxPopup } from 'devextreme-vue/popup'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxPager, DxScrolling, DxGrouping, DxEditing, DxSelection } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import IButton from '../../../components/common/iButton.vue'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getPop0310, createMat0021, updateMat0021 } from '@/api/view/pop0310'
import { saveMergeLot, updateMergeLot, mergedLotSaveUpdateMat0021 } from '@/api/view/pop0320'
import pop0320Popup1 from '@/views/30/3014/popup/pop0320Popup1.vue'

export default {
  name: 'pop0320',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    pop0320Popup1,
    DxPager,
    DxSelection,
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
      gridData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'mainGirdRef'
        },
        checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick'
      },
      errorCode: 0,
      state: this.$store.state.app.isScreenFull,
      partCodeList: '',
      partNameList: '',
      locationName: '',
      Pop0320MainGrid: [],
      DxDataGridPopRef: 'DxDataGridPopRef',
      searchLotDetail: '',
      partCode: '',
      partName: '',
      locName: '',
      lotNo: '',
      inRegiDate: '',
      popVisible: false,
      cont: 0, //그리드에 들어갈 id
      stockAmount: 0,
      stockType: 0,
      unitPirce: 0,
      lotNumber: '',
      sumQty: 0, //병합수량합계
      sumAmount: 0 //병합금액 합계
    }
  },
  created() {},
  watch: {},
  computed: {
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    deliRegInstance() {
      return this.GetDataGrid(this.DxDataGridPopRef)
    }
  },
  beforeMount() {},
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
    click() {
      //validation check
      if (this.searchLotDetail == '') {
        notify(this.$t('전산번호를 입력해주세요.'), 'error', 1500)
        return
      }
      for (let i = 0; i < this.Pop0320MainGrid.length; i++) {
        if (this.searchLotDetail === this.Pop0320MainGrid[i].lotDetail) {
          notify(this.$t('중복된 전산번호 입니다.'), 'error', 1500)
          return
        }
      }
      const params = {
        lotDetail: this.searchLotDetail,
        comCode: getComCode()
      }
      getPop0310(params).then(res => {
        if (res.list.length == 0) {
          notify(this.$t('존재하지 않는 전산번호 입니다.'), 'error', 1500)
          return
        }
        for (let i = 0; i < this.Pop0320MainGrid.length; i++) {
          if (res.list[0].locCode != this.Pop0320MainGrid[i].locCode || res.list[0].partNo != this.Pop0320MainGrid[i].partNo) {
            notify(this.$t('첫번째로 스캔한 품목,창고랑 다릅니다.'), 'error', 1500)
            return
          }
        }

        if (res.list.length != 0) {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
          this.partCode = res.list[0].partNo
          this.partName = res.list[0].partName
          this.lotNo = res.list[0].lotNo
          this.locName = res.list[0].locName
          this.inRegiDate = res.list[0].regiDate
          res.list[0].id = this.cont
          this.Pop0320MainGrid.push(res.list[0])
          this.cont++
        }
      })
      this.calcSaveData()
    },
    openPopup() {
      let popData = {
        popVisible: true
      }
      this.$refs.pop0320Popup1.open(popData)
    },
    close() {
      console.log('팝업이 닫힙니다.')
    },
    clear() {
      this.searchLotDetail = ''
      this.partCode = ''
      this.partName = ''
      this.locName = ''
      this.lotNo = ''
      this.inRegiDate = ''
      this.cont = 0
      ;(this.sumQty = 0), //병합수량합계
        (this.sumAmount = 0) //병합금액 합계
      this.Pop0320MainGrid = []
      notify(this.$t('초기화되었습니다.'), 'success', 1500)
    },
    afterSave() {
      this.searchLotDetail = ''
      this.partCode = ''
      this.partName = ''
      this.locName = ''
      this.lotNo = ''
      this.inRegiDate = ''
      this.cont = 0
      ;(this.sumQty = 0), //병합수량합계
        (this.sumAmount = 0) //병합금액 합계
      this.Pop0320MainGrid = []
      notify(this.$t('저장되었습니다.'), 'success', 1500)
    },
    setInput(processData) {
      (this.searchLotDetail = processData.lotDetail),
        (this.partCode = processData.partNo),
        (this.partName = processData.partName),
        (this.locName = processData.locationName),
        (this.lotNo = processData.lot),
        (this.inRegiDate = processData.makeDate),
        (this.beforeDivLot = processData.qty)
      ;(this.saveBeforeDivLot = processData.qty), (this.textBox = 0), (this.textLot = 0)
    },
    setInput2(stockData) {
      (this.searchLotDetail = stockData[0].lotDetail),
        (this.partCode = stockData[0].partNo),
        (this.partName = stockData[0].partName),
        (this.locName = stockData[0].locName),
        (this.locCode = stockData[0].locCode),
        (this.lotNo = stockData[0].lotNo),
        (this.inRegiDate = stockData[0].regiDate),
        (this.stockType = stockData[0].stockType),
        (this.stockAmount = stockData[0].stockAmount),
        (this.Pop0320MainGrid = stockData)
      this.deliRegInstance.selectAll()
    },
    async btnCancel() {
      let selectedMainRows = await this.deliRegInstance.getSelectedRowsData()
      let cancelRows = []
      let newId = 0
      this.Pop0320MainGrid.forEach(e => {
        e.id = newId++
      })
      if (selectedMainRows.length > 0) {
        let findIndexList = []
        for (let i = 0; i < selectedMainRows.length; i++) {
          let findIndex = this.Pop0320MainGrid.findIndex(x => x.id === selectedMainRows[i].id)
          if (findIndex > -1) {
            findIndexList.push(findIndex)
          }
        }
        for (let i = 0; i < this.Pop0320MainGrid.length; i++) {
          if (findIndexList.indexOf(this.Pop0320MainGrid[i].id) === -1) {
            cancelRows.push(this.Pop0320MainGrid[i])
          }
        }

        this.Pop0320MainGrid = cancelRows
        let newId = 0

        for (let i = 0; i < this.Pop0320MainGrid.length; i++) {
          this.Pop0320MainGrid[i].id = newId++
        }

        this.deliRegInstance.saveEditData()
        this.deliRegInstance.clearSelection()
      } else {
        notify(this.$t('취소할 정보를 선택해 주세요.'), 'error', 1500)
        return
      }
    },
    calcSaveData() {
      //병합될 데이터의 수량과 금액을 계산하는 함수
      for (let i = 0; i < this.Pop0320MainGrid.length; i++) {
        this.sumQty += parseInt(this.Pop0320MainGrid[i].stockQty)
        this.sumAmount += parseInt(this.Pop0320MainGrid[i].stockAmount)
      }
    },
    btnSave() {
      this.calcSaveData()
      let saveRow = this.Pop0320MainGrid
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          try {
            saveRow[0].sumQty = String(this.sumQty)
            saveRow[0].sumAmount = String(this.sumAmount)
            saveRow[0].comCode = getComCode()
            saveRow[0].facCode = 'FAC01'
            saveRow[0].amount = String(this.qty)
            this.Pop0320MainGrid.forEach(e => {
              e.comCode = getComCode()
              e.facCode = 'FAC01'
              e.qty = String(this.sumQty)
              e.amount = String(this.sumAmount)
              e.oldLotDetail = e.lotDetail
              e.lotDetail = saveRow[0].lotDetail
              e.oldQty = e.stockQty
              e.oldAmount = e.stockAmount
            })
            saveMergeLot(this.Pop0320MainGrid)
            updateMergeLot([saveRow[0]])
            mergedLotSaveUpdateMat0021(this.Pop0320MainGrid.slice(1))
          } catch (error) {
            notify(error, 'error', 1500)
            return
          } finally {
            this.endLoading()
            this.afterSave()
          }
        },
        null,
        true
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.span {
  text-align: center;
}
.btnStyle {
  text-align: right;
}
.center {
  justify-content: center;
}
::v-deep .center-input input {
  text-align: center;
}
</style>