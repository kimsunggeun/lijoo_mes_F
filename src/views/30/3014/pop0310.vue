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
        <span class="headerText2">{{$t('divLotNo')}}</span>
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
                <v-col cols="3" class="pa-2 pt-0">
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
        <i-card-vertical
          headerTitle="nowStatus" 
          outlined
        >
          <template v-slot:body>
            <v-layout column>
              <v-row class="d-sm-flex flex-sm-row justify-sm-center">
                <v-col cols="3" class="pa-1 pt-1 pb-0">
                  <v-text-field
                    :menu-props="{offsetY:true}"
                    :label="$t('partCode')"
                    color="primary"
                    class="center-input required mx-1"
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
                    class="center-input required mx-1"
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
                    class="center-input required mx-1"
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
                    class="center-input required mx-1"
                    disabled
                    v-model="lotNo"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="pa-1 pt-1 pb-2">
                  <v-text-field
                    :label="$t('inRegiDate')"
                    v-model="inRegiDate"
                    color="primary"
                    class="center-input required mx-1"
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
      <v-col cols="5" class="ma-0 pa-1 pt-0">
        <i-card-vertical headerTitle="div" class="divclass customDiv">
          <template v-slot:body>
            <v-row no-gutters>
              <v-col style="background-color:#E5EBF9;" class="vh-10 pt-6">
                <v-row no-gutters>
                  <v-col cols="2" class="pt-2 ml-2">
                    <v-icon size="40px">mdi-database</v-icon>
                  </v-col>
                  <v-col cols="3" class="pt-3">
                    <span style="font-size:35px;">{{beforeDivLot}}</span>
                  </v-col>
                  <v-col cols="2" class="pt-2">
                    <v-icon size="40px">mdi-arrow-left-right-bold</v-icon>
                  </v-col>
                  <v-col class="pt-3" align="center">
                    <span style="font-size:35px;">{{afterDivLot}}</span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="ml-sm-5">
              <v-col cols="1"></v-col>
              <v-col cols="2" class="mt-1">
                <span>LOT수량 :</span>
              </v-col>
              <v-col cols="1">
                <v-btn width="35" height="30" color="white" @click="minusLot()">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-text-field outlined dense class="center-input pt-1" v-model="textLot"></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn width="35" height="30" color="white" @click="plusLot()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="ml-sm-5">
              <v-col cols="1"></v-col>
              <v-col cols="2" class="mt-1">
                <span>BOX수량 :</span>
              </v-col>
              <v-col cols="1">
                <v-btn width="35" height="30" color="white" @click="minusBox()">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-text-field outlined dense class="center-input pt-1" v-model="textBox"></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn width="35" height="30" color="white" @click="plusBox()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  class="rounded-0 ml-1 font-weight-bold pl-1 pr-2 white--text"
                  color="rgb(44,73,184)"
                  width="80"
                  @click="savedivGrid()"
                >
                  <v-icon style="padding-bottom:2px">mdi-plus</v-icon>추가
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="7" class="ma-0 pa-1 pt-0">
        <i-card-vertical
          headerTitle="divInfoSave"
          :useBtnList="[
              'btnCancel',
              'btnSave'
          ]"
          @btnCancel="btnCancel()"
          @btnSave="btnSave()"
        >
          <template v-slot:body>
            <DxDataGrid
              id="Pop0310MainGrid"
              class="listBox15"
              :ref="DxDataGridPopRef"
              :data-source="Pop0310MainGrid"
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
                data-field="partCode"
                width="auto"
                :caption="$t('partCode')"
                data-type="string"
                alignment="center"
              />
              <DxColumn
                data-field="partName"
                width="auto"
                :caption="$t('partName')"
                data-type="string"
                alignment="center"
              />
              <DxColumn
                data-field="lotNumber"
                width="auto"
                :caption="$t('lotNumber')"
                data-type="string"
                alignment="center"
              />
              <DxColumn
                data-field="lotDetail"
                width="auto"
                :caption="$t('lotDetail')"
                data-type="string"
                alignment="center"
              />

              <DxColumn
                data-field="stockQty"
                width="auto"
                :caption="$t('qty')"
                data-type="string"
                alignment="center"
              />
              <DxColumn
                data-field="locCode"
                :caption="$t('locCode')"
                :visible="false"
                data-type="string"
              />
              <DxColumn
                data-field="stockType"
                :caption="$t('stockType')"
                :visible="false"
                data-type="string"
              />
              <DxColumn
                data-field="stockAmount"
                :caption="$t('stockAmount')"
                :visible="false"
                data-type="string"
              />
              <DxColumn
                data-field="regiDate"
                :caption="$t('regiDate')"
                :visible="false"
                data-type="string"
              />
              <DxColumn />
            </DxDataGrid>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <pop0310Popup1
      ref="pop0310Popup1"
      :popVisible="popVisible"
      @close="close"
      @setInput="setInput"
      @setInput2="setInput2"
    ></pop0310Popup1>
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
import pop0310Popup1 from '@/views/30/3014/popup/pop0310Popup1.vue'

export default {
  name: 'pop0310',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    pop0310Popup1,
    DxPager,
    DxSelection,
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
      Pop0310MainGrid: [],
      DxDataGridPopRef: 'DxDataGridPopRef',
      searchLotDetail: '',
      partCode: '',
      partName: '',
      locName: '',
      lotNo: '',
      inRegiDate: '',
      popVisible: false,
      afterDivLot: 0,
      beforeDivLot: 0,
      saveBeforeDivLot: 0, //lot수량의 원래값을 담고 있는 변수
      textLot: 0, //LOT 수량
      textBox: 1, //BOX 수량
      cont: 0,
      stockAmount: 0,
      stockType: 0,
      unitPrice: 0,
      selectedRowData: []
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
      const params = {
        lotDetail: this.searchLotDetail,
        comCode: getComCode()
      }
      getPop0310(params).then(res => {
        if (res.list.length == 0) {
          notify(this.$t('존재하지 않는 전산번호 입니다.'), 'error', 1500)
          return
        }
        if (res.list.length != 0) {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
          this.partCode = res.list[0].partNo
          this.partName = res.list[0].partName
          this.lotNo = res.list[0].lotNo
          this.locName = res.list[0].locName
          this.inRegiDate = res.list[0].regiDate
          this.beforeDivLot = res.list[0].stockQty
          this.saveBeforeDivLot = res.list[0].stockQty
          this.locCode = res.list[0].locCode
          this.stockAmount = res.list[0].stockAmount
          this.unitPrice = res.list[0].unitPrice
          this.textBox = 0
          this.textLot = 0
        }
      })
    },
    openPopup() {
      let popData = {
        popVisible: true
      }
      this.$refs.pop0310Popup1.open(popData)
    },
    close() {
      console.log('aa')
    },
    clear() {
      this.searchLotDetail = ''
      this.partCode = ''
      this.partName = ''
      this.locName = ''
      this.lotNo = ''
      this.inRegiDate = ''
      this.beforeDivLot = 0
      this.afterDivLot = 0
      this.saveBeforeDivLot = 0
      this.textLot = 0
      this.textBox = parseInt(1)
      this.Pop0310MainGrid = []
      this.cont = 0
      notify(this.$t('초기화 되었습니다.'), 'success', 1500)
    },
    afterSave() {
      this.searchLotDetail = ''
      this.partCode = ''
      this.partName = ''
      this.locName = ''
      this.lotNo = ''
      this.inRegiDate = ''
      this.beforeDivLot = 0
      this.afterDivLot = 0
      this.saveBeforeDivLot = 0
      this.textLot = 0
      this.textBox = parseInt(1)
      this.Pop0310MainGrid = []
      notify(this.$t('저장되었습니다.'), 'success', 1500)
    },
    setInput(processData) {
      (this.searchLotDetail = processData.lotDetail),
        (this.partCode = processData.partNo),
        (this.partName = processData.partName),
        (this.locName = processData.locationName),
        (this.lotNo = processData.lot),
        (this.inRegiDate = processData.makeDate),
        (this.beforeDivLot = processData.qty)((this.saveBeforeDivLot = processData.qty)),
        (this.textBox = 0),
        (this.textLot = 0)
    },
    setInput2(stockData) {
      (this.searchLotDetail = stockData.lotDetail),
        (this.partCode = stockData.partNo),
        (this.partName = stockData.partName),
        (this.locName = stockData.locationName),
        (this.locCode = stockData.locCode),
        (this.lotNo = stockData.lot),
        (this.inRegiDate = stockData.makeDate),
        (this.beforeDivLot = parseInt(stockData.qty)),
        (this.saveBeforeDivLot = stockData.qty),
        (this.stockType = stockData.stockType),
        (this.stockAmount = stockData.stockAmount),
        (this.textBox = 1),
        (this.textLot = 0),
        (this.unitPrice = stockData.unitPrice),
        (this.textLot = stockData.lotSize)
    },
    plusLot() {
      if (this.saveBeforeDivLot === this.textLot) {
        notify(this.$t('더이상 분할할 수 없습니다.'), 'error', 1500)
        return
      }
      if (this.beforeDivLot == 0) {
        notify(this.$t('더이상 분할할 수 없습니다.'), 'error', 1500)
        return
      }
      if (this.textLot > this.beforeDivLot) {
        notify(this.$t('더이상 분할할 수 없습니다.'), 'error', 1500)
        return
      }

      this.textLot = parseInt(this.textLot) + parseInt(1)
    },
    minusLot() {
      if (this.textLot === 0) {
        notify(this.$t('분할 수량은 0 미만이 될 수 없습니다.'), 'error', 1500)
        return
      }
      this.textLot -= 1
    },
    plusBox() {
      if (this.saveBeforeDivLot == this.textBox) {
        notify(this.$t('로트 수량보다 많은 BOX는 분할할 수 없습니다.'), 'error', 1500)
        return
      }
      this.textBox = parseInt(this.textBox) + parseInt(1)
    },
    minusBox() {
      if (this.textBox <= 1) {
        notify(this.$t('Box수량은 1미만이 될 수 없습니다.'), 'error', 1500)
        return
      }
      this.textBox -= 1
    },
    savedivGrid() {
      if (this.textLot * this.textBox > this.beforeDivLot) {
        notify(this.$t('더이상 분할 할 수 없습니다.'), 'error', 1500)
        return
      }
      if (this.beforeDivLot === 0) {
        notify(this.$t('분할할 로트가 없습니다.'), 'error', 1500)
        return
      }
      if (this.textLot === 0 || this.textBox === 0) {
        notify(this.$t('LOT수량 또는 Box수량을 입력해주세요.'), 'error', 1500)
        return
      }
      let divArray = []
      let boxQty = this.textBox
      let newRow = {
        comCode: getComCode(),
        facCode: 'FAC01',
        partCode: this.partCode,
        lotNumber: this.lotNo,
        lotDetail: this.searchLotDetail,
        partName: this.partName,
        stockQty: this.textLot,
        locCode: this.locCode,
        stockType: this.stockType,
        stockAmount: this.stockAmount,
        regiDate: this.inRegiDate
      }
      for (let i = 0; i < boxQty; i++) {
        let object = JSON.parse(JSON.stringify(newRow))
        divArray.push(object)
      }

      divArray.forEach(e => {
        e.id = this.cont++
        this.Pop0310MainGrid.push(e)
      })
      this.deliRegInstance.selectAll()
      this.afterDivLot += this.textLot * this.textBox
      this.beforeDivLot -= this.textLot * this.textBox
      this.cont = 0
    },
    async btnCancel() {
      let selectedMainRows = await this.deliRegInstance.getSelectedRowsData()
      let cancelRows = []
      let deletedQty = 0
      if (selectedMainRows.length === 0) {
        notify(this.$t('취소할 정보를 선택해 주세요.'), 'error', 1500)
        return
      }
      if (selectedMainRows.length > 0) {
        let findIndexList = []
        for (let i = 0; i < selectedMainRows.length; i++) {
          let findIndex = this.Pop0310MainGrid.findIndex(x => x.id === selectedMainRows[i].id)
          if (findIndex > -1) {
            findIndexList.push(findIndex)
            deletedQty += parseInt(selectedMainRows[i].stockQty)
          }
        }

        for (let i = 0; i < this.Pop0310MainGrid.length; i++) {
          if (findIndexList.indexOf(this.Pop0310MainGrid[i].id) === -1) {
            cancelRows.push(this.Pop0310MainGrid[i])
          }
        }

        this.Pop0310MainGrid = cancelRows
        let newId = 0

        for (let i = 0; i < this.Pop0310MainGrid.length; i++) {
          this.Pop0310MainGrid[i].id = newId++
        }

        this.deliRegInstance.saveEditData()
        this.deliRegInstance.clearSelection()
        this.afterDivLot -= deletedQty
        this.beforeDivLot += deletedQty
        this.textLot = 0
        this.textBox = 0
      }
    },
    async btnSave() {
      let saveRow = await this.deliRegInstance.getSelectedRowsData()
      let selectedMainRows = await this.deliRegInstance.getSelectedRowKeys()
      if (saveRow.length == 0) {
        notify(this.$t('저장할 정보를 선택해 주세요.'), 'error', 1500)
        return
      }
      this.vToastifyPrompt('선택한 항목들을 저장 하시겠습니까?', 'info', current => {
        saveRow.forEach(e => {
          (e.userFlag = 'Y'), (e.unitPrice = this.unitPrice)
        })
        createMat0021(saveRow, true)
          .then(res => {
            notify(this.$t('Saved'), 'success', 3000)
          })
          .catch(error => {
            notify(error, 'error', 3000)
          })
          .finally(() => {
            this.afterSave()
          })
        updateMat0021(saveRow, true)
          .then(res => {
            notify(this.$t('Saved'), 'success', 3000)
          })
          .catch(error => {
            notify(error, 'error', 3000)
          })
          .finally(() => {
            this.afterSave()
          }),
          null,
          true
      })
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
.customDiv {
  height: 100vh;
  max-height: calc(100vh - 434.5px);
}
</style>