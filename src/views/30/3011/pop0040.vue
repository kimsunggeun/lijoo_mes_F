<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{$t('materialMove')}}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText1">{{
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
        <v-btn width="40" height="40" color="#879B77" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px"> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- ------------------------------------------------------------------------------------- -->
    <v-row no-gutters>
      <!-- 창고 이동 -->
      <v-col cols="12" class="pa-2">
        <i-card-vertical
          headerTitle="moveWh"
          :useBtnList="['btnSearch'] " @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
            <!-- 출고창고 선택 -->
              <v-col cols="2" class="pa-1 pt-1 pb-2">
                <v-autocomplete
                  v-model="searchOutWh"
                  :label="$t('outWh')"
                  :items="outWhList"
                  item-value="value"
                  item-text="text"
                  outlined
                  dense
                  height="32"
                ></v-autocomplete>
              </v-col>
              <!-- 입고창고 선택 -->
              <v-col cols="2" class="pa-1 pt-1 pb-2">
                <v-autocomplete
                  v-model="searchInWh"
                  :label="$t('inWh')"
                  :items="inWhList"
                  item-value="value"
                  item-text="text"
                  outlined
                  dense
                  height="32"
                ></v-autocomplete>
              </v-col>
              <!-- 품목 코드 입력창 -->
              <v-col cols="2" class="pa-1 pt-1 pb-2">
                <v-text-field
                  v-model="searchPartNo"
                  :label="$t('partCode')"
                  outlined 
                  dense 
                  height="32"
                  @keydown.enter="btnSearchMain()"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <!-- 이동정보 상세 -->
      <v-col cols="12" class="pa-2">
        <i-card-vertical
          headerTitle="moveInfoDetail"
          :useBtnList="['btnMove']"
          @btnMove="btnMove"
        >
          <template v-slot:body>
            <v-row>
              <!-- 전산번호 입력창 -->
              <v-col cols="2" class="pa-1 pt-1 pb-2">
                <v-text-field
                  v-model="searchLotDetail"
                  :label="$t('lotDetail')"
                  outlined
                  dense 
                  height="32"
                  @input="inputLotDetail"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-layout column>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="moveItemInfo"
                    class="doubleListBox13"
                    :ref="moveItemInfoRef"
                    :data-source="moveItemInfo"
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

                    <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                  <!-- 컬럼 -->
                    <DxColumn 
                    data-field="locCode" 
                    :caption="$t('outWh')" 
                    width="auto"
                    data-type="string"
                    :allow-editing="false"
                    alignment="center"
                    >
                      <DxLookup :data-source="locCode" display-expr="locName" value-expr="locCode"/>
                    </DxColumn>
                    <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partCode')" 
                    width="auto"
                    data-type="string"
                    :allow-editing="false"
                    />
                    <!-- 품명 컬럼 -->
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                    >
                      <dxLookup :data-source="partNameList" display-expr="partName" value-expr="partNo" />
                    </DxColumn>
                    <!-- LOT NO 컬럼 -->
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('lotNumber')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      alignment="center"                    
                    />
                    <!-- 전산번호 컬럼 -->
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      alignment="center"
                    />
                    <!-- LOT 수량 컬럼 -->
                    <DxColumn
                      data-field="stockQty"
                      :caption="$t('lotAmount')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      alignment="right"
                    />
                    <!-- 입고날짜 컬럼 -->
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('receiptDate')"
                      width="auto"
                      data-type="string"
                      :allow-editing="false"
                      alignment="center"
                    />
                    <DxColumn/>
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    <DxSelection 
                      select-all-mode="allMode" 
                      :show-check-boxes-mode="checkBoxesMode" 
                      mode="multiple"
                    />
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

import { DxPopup } from 'devextreme-vue/popup'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getOutWh, getMat0021, getPartNo, createMat0020, createMat0031 } from '@/api/view/pop0040'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import IButton from '../../../components/common/iButton.vue'

export default {
  name: 'pop0040',
  mixins: [baseview, BaseDataGrid],
  components: {
    "i-card-vertical": iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup
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
      
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      errorCode: 0,
      state: this.$store.state.app.isScreenFull,

      //그리드 관련
      moveItemInfo: [],
      moveItemInfoRef: 'moveItemInfoRef',

      searchInWh: '',
      searchOutWh: '',
      searchPartNo: '',
      outWhList: [],
      inWhList: [],
      locCode: [],
      partNameList: [],
      searchLotDetail: '',
      
    }
  },
  created() {},
  watch: {
  },
  computed: {
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    gridMainInstance() {
      return this.GetDataGrid(this.moveItemInfoRef)
    },
  },
  beforeMount() {
    let param = {
      comCode : getComCode()
    }
    getOutWh(param).then(res => {
      this.locCode = res.list
      res.list.forEach(e => {
        this.outWhList.push({
          value: e.locCode,
          text: e.locName
        })
        this.inWhList.push({
          value: e.locCode,
          text: e.locName
        })
      });
    })
    let params2 = {
      comCode: getComCode(),
    }
    getPartNo(params2).then((res) => {
      let cnt = 0
      this.partNameList = res.list
    }).finally(() => {
      this.endLoading()
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
      this.searchInWh = ''
      this.searchOutWh = ''
      this.searchPartNo = ''
      this.moveItemInfo = []
      this.searchLotDetail = ''
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
        this.userData.factory.code = userFacData.list[0].facCode
        // this.userData.name = userFacData.list[0].userName
        this.display.company = resData.list[0].comName
        let factoryFilterData = factoryList.list.filter((word) => word.facCode === this.userData.factory.code)
        this.display.factory = factoryFilterData[0].facName
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },

    btnSearchMain(){
      let param = {
        comCode: getComCode(),
        locCode: this.searchOutWh == null ? '' : this.searchOutWh,
        partNo: this.searchPartNo == null ? '' : this.searchPartNo
      }
      if(param.locCode === null || param.locCode === ''){
        notify('출고창고를 선택해 주십시오', 'error', 1500)
        return
      }
      getMat0021(param).then( res=> {
        res.list.forEach(e => {
          e.makeDate = new Date().toISOString().substring(0, 10)
          e.partName = e.partNo
        })
        this.moveItemInfo = res.list
      })
    },

    inputLotDetail(e){
      for(let i = 0; i < this.moveItemInfo.length; i++){
        if(this.moveItemInfo[i].lotDetail === e){
          let id = this.moveItemInfo[i - 1].id
          this.gridMainInstance.option('focusedRowIndex', id)
        }
      }
    },
    async btnMove(){
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      for(let i = 0; i < selectedMainRows.length; i++){
        selectedMainRows[i].inWh = this.searchInWh
        selectedMainRows[i].makeDate = new Date().toISOString().substring(0, 10)
        selectedMainRows[i].maker = getUserId()
      }

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      if(!this.searchInWh){
        notify('이동할 입고창고를 선택해 주십시오', 'error', 1500)
        return
      }
      if (this.searchInWh === this.searchOutWh) {
        notify('같은 창고로 이동시킬 수 없습니다', 'error', 1500)
        return
      }
      this.vToastifyPrompt(
        this.$t('doMoveData'),
        'info',
        current => {
          this.openLoading()
          createMat0020(selectedMainRows)
            .then(res => {
              notify(this.$t('moved'), 'success', 3000)
            })
          createMat0031(selectedMainRows)
            .catch(error => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.searchOutWh = ''
              this.searchInWh = ''
              this.searchPartNo = ''
              this.moveItemInfo = []
              this.searchLotDetail = ''
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
.header {
  background-color: rgb(69, 91, 89);
  color: white;
}
.headerText1 {
  font-size: 18pt;
  font-weight: bold;
}
.headerText2 {
  font-size: 14pt;
  color: rgb(219, 210, 175);
  font-weight: bold;
  padding-left: 10px;
}

.span {
  color: white;
  text-align: center;
}
.selectOrInput {
  place-content: center;
}

</style>

