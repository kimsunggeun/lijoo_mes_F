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
        <span class="headerText2">{{$t('WorkInProcessLotCreate')}}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText3">
          <v-icon class="mr-1 green_icon">$calendar_clock</v-icon>
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
    <!-- ■ 로트정보 입력 -->
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <i-card-vertical headerTitle="InputLotInfo" :useBtnList="['btnAdd']" @btnAdd="btnAdd">
          <template v-slot:body>
            <!-- 상단 -->
            <v-row>
              <!-- 품목코드 선택 -->
              <v-col cols="2" class="pa-1 pt-1 pb-0">
                <v-text-field
                  v-model="searchPartNo"
                  :label="$t('partCode')"
                  outlined
                  dense
                  height="32"
                  @click="partNoClick"
                  readonly
                />
              </v-col>
              <!-- 경로유형 선택 -->
              <v-col cols="2" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  v-model="searchPathCode"
                  :label="$t('PathType')"
                  :items="pathCodeList"
                  item-value="value"
                  item-text="text"
                  outlined
                  dense
                  height="32"
                  clearable
                  @change="pathCodeChange"
                  :disabled="disabledPathCode"
                ></v-autocomplete>
              </v-col>
              <!-- 공정 선택 -->
              <v-col cols="2" class="pa-1 pt-1 pb-0 ml-6">
                <v-autocomplete
                  v-model="searchProCode"
                  :label="$t('processName')"
                  :items="proCodeList"
                  item-value="value"
                  item-text="text"
                  outlined
                  dense
                  height="32"
                  clearable
                  @change="proCodeChange"
                  :disabled="disabledProCode"
                ></v-autocomplete>
              </v-col>
              <!-- 작업반 선택 -->
              <v-col cols="2" class="pa-1 pt-1 pb-0 ml-6">
                <v-autocomplete
                  v-model="searchWorkDecode"
                  :label="$t('workDetail')"
                  :items="workDecodeList"
                  item-value="value"
                  item-text="text"
                  outlined
                  dense
                  height="32"
                  clearable
                  @change="workDecodeChange"
                  :disabled="disabledWorkDecode"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- 하단 -->
            <v-row>
              <!-- Lot No 입력 -->
              <v-col cols="2" class="pa-1 pt-0 pb-2">
                <v-text-field
                  v-model="addLotNo"
                  :label="$t('lotNumber')"
                  outlined
                  dense
                  height="32"
                ></v-text-field>
              </v-col>

              <!-- 표준수량 입력 -->
              <v-col cols="2" class="pa-1 pt-0 pb-2">
                <v-text-field
                  v-model="addQty"
                  :label="$t('standardQty')"
                  outlined
                  dense
                  height="32"
                  @input="inputQty"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                />
              </v-col>
              <v-icon>mdi-close</v-icon>
              <!-- BOX수량 입력 -->
              <v-col cols="2" class="pa-1 pt-0 pb-2">
                <v-text-field
                  v-model="addBoxQty"
                  :label="$t('boxQty')"
                  outlined
                  dense
                  height="32"
                  @input="inputBoxQty"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                ></v-text-field>
              </v-col>
              <v-icon class="pb-2">mdi-equal</v-icon>
              <!-- 총수량 입력 -->
              <!-- 조건 === 0 ?  true : false-->
              <v-col cols="2" class="pa-1 pt-0 pb-2">
                <v-text-field
                  v-model="addSumQty"
                  :label="$t('totalQty')"
                  outlined
                  dense
                  height="32"
                  :disabled="true"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>

    <!-- ■ 로트정보 저장 -->
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <i-card-vertical
          headerTitle="saveLotInfo"
          :useBtnList="[
            'btnCancel',
            'btnSave',
          ]"
          @btnCancel="btnCancel()"
          @btnSave="btnSave()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="lotRegInfo"
                  class="doubleListBox11"
                  :ref="lotRegInfoRef"
                  :data-source="lotRegInfo"
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
                  :column-auto-width="true"
                  :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />

                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 품번 Column -->
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment
                    :allow-editing="false"
                  />
                  <!-- 품명 Column -->
                  <DxColumn
                    data-field="partNo2"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="partNo" display-expr="partName" value-expr="partNo" />
                  </DxColumn>
                  <DxColumn
                    data-field="pathCode"
                    :caption="$t('pathCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="pathCode"
                      display-expr="pathName"
                      value-expr="pathCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="proCode"
                    :caption="$t('proName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="proCode" display-expr="proName" value-expr="proCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDename')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="workDecode"
                      display-expr="workDename"
                      value-expr="workDecode"
                      :allow-editing="false"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="qty"
                    :caption="$t('qty')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="lotNo"
                    :caption="$t('lotNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                  <DxSelection select-all-mode="allMode" mode="multiple" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <DxPopup
      :visible.sync="itemPopupVisible"
      :show-close-button="true"
      :show-title="true"
      :title="$t('itemInfo')"
      height="auto"
      width="40%"
    >
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
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="center"
                    :min-width="150"
                    width="200"
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
          <v-btn
            tile
            outlined
            width="80px"
            class="releaseBtn"
            ref="cancelBtn"
            @click="selectedItem"
          >
            <v-icon>$save</v-icon>
            {{ $t('choice') }}
            <!-- SAVE -->
          </v-btn>
          <v-btn tile outlined width="80px" class="CancelBtn" ref="cancelBtn" @click="close">
            <v-icon>$cancel</v-icon>
            {{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'

import { DxPopup } from 'devextreme-vue/popup'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import IButton from '../../../components/common/iButton.vue'
import { getPartNo } from '@/api/view/pop0040'
import { getProcessName } from '@/api/view/bas0031'
import { getPathCode, getProCode, getWorkDecode, getWorkDecode2, createPro0026 } from '@/api/view/pop0350'

export default {
  name: 'pop0350',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxPopup,
    DxLookup
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
      errorCode: 0,
      state: this.$store.state.app.isScreenFull,

      itemPopupVisible: false,

      popupInfoGrid: [],

      //조회조건
      partNoList: [],
      pathCodeList: [],
      proCodeList: [],
      workDecodeList: [],
      searchPartNo: '',
      searchPathCode: '',
      searchProCode: '',
      searchWorkDecode: '',
      addLotNo: '',
      addQty: '',
      addBoxQty: '',
      addSumQty: '',
      lotSize: '',
      addRemark: '',

      //그리드
      lotRegInfo: [],
      lotRegInfoRef: 'lotRegInfoRef',
      partNo: [],
      pathCode: [],
      workDecode: [],

      disabledPathCode: true,
      disabledProCode: true,
      disabledWorkDecode: true,

      //lookUp
      proTypeList: [],
      defCodeList: [],
      proCode: [],
      whCodeList: [],
      workCodeList: [],

      stockTypeList: [],
      eventCdList: [],
      itemPopupData: ''
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
      return this.GetDataGrid(this.lotRegInfoRef)
    }
  },
  beforeMount() {
    let params = {
      comCode: getComCode()
    }

    Promise.all([getProcessName(params), getWorkDecode2(params)]).then(res => {
      this.proCode = res[0].list.slice()
      this.workDecode = res[1].list.slice()
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
    partNoClick() {
      this.itemPopupVisible = true
      this.doSearchItemInfo()
    },

    doSearchItemInfo() {
      let params2 = {
        comCode: getComCode()
      }
      getPartNo(params2)
        .then(res => {
          this.partNo = res.list.slice()
          let cnt = 0
          res.list.forEach(item => {
            item.id = cnt++
            this.partNoList.push({
              text: item.partName,
              value: item.partNo
            })
          })
          this.popupInfoGrid = res.list
        })
        .finally(() => {
          this.endLoading()
        })
    },
    focusedRowChanged_ItemPop(e) {
      this.itemPopupData = e.row.data.partNo
      this.lotSize = e.row.data.lotSize
    },
    selectedItem() {
      this.searchPartNo = this.itemPopupData
      this.itemPopupVisible = false

      let params = {
        comCode: getComCode(),
        partNo: this.itemPopupData
      }
      this.pathCodeList = []
      this.searchPathCode = ''
      getPathCode(params)
        .then(res => {
          if (res.list.length === 0) {
            notify('경로 유형이 존재하지 않는 품목입니다.', 'warning', 1500)
            return
          }
          this.pathCode = res.list.slice()
          res.list.forEach(e => {
            this.pathCodeList.push({
              text: e.pathName,
              value: e.pathCode
            })
            this.disabledPathCode = false
          })
        })
        .finally(() => {
          this.searchPathCode = ''
          this.searchProCode = ''
          this.searchWorkDecode = ''
          this.addLotNo = ''
          this.addQty = ''
          this.addBoxQty = ''
          this.addSumQty = ''
          this.lotRegInfo = []
          this.proCodeList = []
          this.workDecodeList = []
        })
    },
    close() {
      this.itemPopupVisible = false
    },
    pathCodeChange() {
      let params = {
        comCode: getComCode(),
        pathCode: this.searchPathCode
      }
      this.proCodeList = []
      this.workDecodeList = []
      this.searchProCode = ''
      this.searchWorkDecode = ''
      getProCode(params).then(res => {
        res.list.forEach(e => {
          this.proCodeList.push({
            text: e.proName,
            value: e.proCode
          })
        })
      })
      this.disabledProCode = false
    },
    proCodeChange() {
      let params = {
        comCode: getComCode(),
        proCode: this.searchProCode
      }
      this.workDecodeList = []
      this.searchWorkDecode = ''
      getWorkDecode(params).then(res => {
        res.list.forEach(e => {
          this.workDecodeList.push({
            text: e.workDename,
            value: e.workDecode
          })
        })
      })
      this.disabledWorkDecode = false
    },
    workDecodeChange() {
      this.addLotNo = new Date()
        .toISOString()
        .substring(2, 10)
        .replace(/-/g, '')
      this.addQty = this.lotSize
      this.addBoxQty = '1'
      this.addSumQty = this.addQty * this.addBoxQty
    },
    inputQty(e) {
      this.addSumQty = e * this.addBoxQty
    },
    inputBoxQty(e) {
      this.addSumQty = e * this.addQty
    },
    ///////////////////////////////////////////////////////////////////////////데이터 추가///////////////////////////////////////////////////////////////////////////////////////
    btnAdd() {
      if (
        !this.searchPartNo ||
        !this.searchPathCode ||
        !this.searchProCode ||
        !this.searchWorkDecode ||
        !this.addLotNo ||
        !this.addQty ||
        !this.addBoxQty
      ) {
        notify('필수 로트정보를 입력해 주십시오 [품목, 경로유형, 공정, 작업반, Lot No, 표준수량, BOX수량]', 'error', 3000)
        return
      }
      if (this.addSumQty <= 0) {
        notify('수량은 0보다 많아야 합니다', 'error', 3000)
        return
      }
      for (let i = 0; i < this.addBoxQty; i++) {
        let newRow = {
          id: this.lotRegInfo.length + 1,
          comCode: getComCode(),
          facCode: 'FAC01',
          partNo: this.searchPartNo,
          partNo2: this.searchPartNo,
          pathCode: this.searchPathCode,
          proCode: this.searchProCode,
          workDecode: this.searchWorkDecode,
          qty: this.addQty,
          lotNo: this.addLotNo,
          makeDate: new Date().toISOString().substring(0, 10),
          maker: getUserId()
        }

        this.gridMainInstance.newRow(newRow)
        this.gridMainInstance.saveEditData()
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 1)
      }
    },
    async btnCancel() {
      var selectedRowkeys = await this.gridMainInstance.getSelectedRowKeys()
      let idx
      if (!selectedRowkeys.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      for (let i = 0; i < selectedRowkeys.length; i++) {
        idx = this.gridMainInstance.getRowIndexByKey(selectedRowkeys[i])
        this.gridMainInstance.deleteRow(idx)
      }
      this.gridMainInstance.saveEditData()
      notify(this.$t('취소되었습니다.'), 'success', 1500)
    },
    async btnSave() {
      var selectedRowData = await this.gridMainInstance.getSelectedRowsData()

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          createPro0026(selectedRowData)
            .then(res => {
              notify(this.$t('Saved'), 'success', 3000)
            })
            .catch(error => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.lotRegInfo = []
              this.searchPartNo = ''
              this.searchPathCode = ''
              this.searchProCode = ''
              this.searchWorkDecode = ''
              this.pathCodeList = []
              this.proCodeList = []
              this.workDecodeList = []
              this.addLotNo = ''
              this.addQty = ''
              this.boxQty = ''
              this.addSumQty = ''
              this.addRemark = ''
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
<style lang="scss" scoped>
.releaseBtn {
  background-color: rgb(43, 81, 235);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}
.CancelBtn {
  background-color: rgb(255, 255, 255);
  border: 1px solid #333333;
  margin-right: 6px;
  font-size: 12pt;
  color: #333333;
}
</style>

