<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{$t('inventoryCounting2')}}</span>
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
    <v-row no-gutters class="pa-2">
      <v-col cols="12">
        <i-card-vertical style="align-items: center;" headerTitle="inventoryCounting">
          <template v-slot:body>
            <v-layout column>
              <v-row>
                <v-col cols="3" class="mr-2">
                  <v-text-field
                    :label="$t('lotDetail')"
                    v-model="lotDetailData"
                    item-text="text"
                    item-value="value"
                    @input="scanLotDetail"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="1">
                  <v-btn width="80" height="30" color="rgb(44,73,184)" class="ml-0 mr-4" @click="btnAdd()">
                    <span style="color:#fff">{{$t('plus')}}</span>
                  </v-btn>
                </v-col>
                <v-row style="place-content: space-evenly stretch;">
                  <v-col cols="1">
                    <v-btn width="50" height="30" color="white" v-on:click="minusQty">
                      <v-icon color="black" small>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="2" class="mr-2">
                    <v-text-field
                      class="qty-field"
                      :label="$t('realQty')"
                      v-model="curRealQty"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="1">
                    <v-btn width="50" height="30" color="white" v-on:click="plusQty">
                      <v-icon color="black" small>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="3" class="mr-2">
                    <v-text-field
                      class="remark-field"
                      :label="$t('remark')"
                      v-model="curRemark"
                      outlined
                      dense
                      @keyup.enter="applyRemark"
                    />
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      width="80"
                      height="30"
                      color="rgb(44,73,184)"
                      class="ml-0 mr-4"
                      @click="btnApply()"
                    >
                      <span style="color:#fff">{{$t('apply')}}</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-row>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <!-- 아래 그리드 -->
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <i-card-vertical
          headerTitle="inventoryCounting"
          :useBtnList="['btnDelete', 'btnRegi']"
          @btnDelete="btnEmptyList()"
          @btnRegi="btnRegist()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <DxDataGrid
                id="mainGrid"
                class="listBox14"
                :ref="mainGridRef"
                :data-source="mainGrid"
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
                :disablePagination="true"
                :column-hiding-enabled="false"
                :selection="{ mode:'none' }"
                @cellClick="itemRowClickMainGrid"
                @cell-prepared="onFocusedCellChanged"
              >
                <!-- <DxSelection 
                  select-all-mode="allMode"
                  show-check-boxes-mode="always" 
                  mode="multiple" 
                />-->
                <DxScrolling column-rendering-mode="virtual" />
                <!-- <DxColumnFixing :enabled="true" /> -->
                <DxColumn
                  data-field="id"
                  caption="No"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="locCode"
                  :fixed="true"
                  fixed-position="center"
                  :caption="$t('locCode')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="locName"
                  :caption="$t('locName')"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="partNo"
                  :caption="$t('partNo')"
                  data-type="string"
                  width="auto"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="partName"
                  :caption="$t('partName')"
                  data-type="string"
                  width="auto"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="lotNo"
                  :caption="$t('lotNo')"
                  data-type="string"
                  width="auto"
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
                  data-field="regiDate"
                  :caption="$t('regiDate')"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="regiNo"
                  caption="실사순번"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="stockQty"
                  :caption="$t('stockQty')"
                  data-type="string"
                  width="auto"
                  alignment="right"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="realQty"
                  :caption="$t('realQty')"
                  data-type="string"
                  width="auto"
                  alignment="right"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="realState"
                  :caption="$t('realState')"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="remark"
                  :caption="$t('remark')"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="editDate"
                  :caption="$t('editDate')"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="editor"
                  :caption="$t('editor')"
                  data-type="string"
                  width="auto"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import ICardTop from '@/components/common/iCardTop.vue'

import DxDateBox from 'devextreme-vue/date-box'
import { DxDataGrid, DxColumn, DxScrolling, DxColumnFixing, DxGroupItem, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid'

import notify from 'devextreme/ui/notify' // message

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getSal0110, createSal0110 } from '@/api/view/sal0110'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getWorkDate } from '@/api/view/bas0130'
import { getComCode, getUserId } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getCompany } from '@/api/system/companyManage'

import { getMat0110FromLotDetail, insertMat0110 } from '@/api/view/mat0017'

export default {
  name: 'pop0430',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxColumnFixing,
    'i-card-vertical': iCardVertical
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

      //스캔한 전산번호
      lotDetailData: '',

      //현재 선택된 재고의 실사수량
      curRealQty: 0,

      //현재 선택된 재고의 비고
      curRemark: '',

      // 현재 선택된 Row
      curRowClickData: null,

      //검색관련
      // holyArray: [],
      // totalOption: [],
      // frDeliDate: getDateFormat(new Date()),
      // toDeliDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() + 7))),

      //그리드 ref
      mainGridRef: 'mainGridRef',
      // 그리드 관련
      mainGrid: [],

      totalTarget: []
    }
  },

  created() {},

  beforeMount() {},

  computed: {
    mainGridInstance() {
      return this.GetDataGrid(this.mainGridRef)
    }
  },

  mounted() {
    this.dataSettting()
    this.nowTime()
  },

  destroyed() {
    clearInterval(this.timeFunc)
  },

  watch: {
    frDeliDate: function(value) {
      if (new Date(value) > new Date(this.toDeliDate)) {
        this.toDeliDate = value
      }
    }
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

    // addMenuItems(e) {
    //   this.totalTarget = e

    //   if (!e.component.__summaryIsNotAdded) {
    //     e.component.option('summary.totalItems', this.totalOption)
    //     e.component.__summaryIsNotAdded = true
    //   }
    // },

    // onCellPrepared(e) {
    //   let found = this.holyArray.find((item) => item.date === e.column.dataField)
    //   if (found !== undefined && e.rowType === 'header') {
    //     if (found.weekend === 6) {
    //       e.cellElement.style.color = 'blue'
    //     } else {
    //       e.cellElement.style.color = 'red'
    //     }
    //   }
    // },

    scanLotDetail() {
      this.doAddRealInventoryData()
    },

    btnAdd() {
      this.doAddRealInventoryData()
    },

    btnApply() {
      this.applyData()
    },

    btnEmptyList() {
      this.vToastifyPrompt(
        '목록을 삭제 하시겠습니까?',
        'info',
        current => {
          this.clearMainGrid()
        },
        null,
        true
      )
    },

    btnRegist() {
      this.vToastifyPrompt(
        '등록 하시겠습니까?',
        'info',
        current => {
          this.doRegistConfirm()
        },
        null,
        true
      )
    },

    doAddRealInventoryData() {
      if (!this.lotDetailData) {
        return
      }

      const searchData = {
        comCode: this.userData.company,
        facCode: this.userData.factory.code,
        lotDetail: this.lotDetailData
      }

      getMat0110FromLotDetail(searchData)
        .then(res => {
          if (res.list.length < 1) {
            return
          }

          if (this.mainGrid.length > 0) {
            let findIndex = this.mainGrid.findIndex(x => x.lotDetail === res.list[0].lotDetail)

            if (findIndex > -1) {
              return
            }
          }

          this.mainGrid.push(res.list[0])

          for (let i = 0; i < this.mainGrid.length; ++i) {
            this.mainGrid[i].id = i + 1
          }
        })
        .finally(() => {})
    },

    async doRegistConfirm() {
      await this.mainGridInstance.saveEditData()
      let insertRows = []

      for (var row of this.mainGrid) {
        if (row.realState == '진행') {
          row.__created__ = true
          row.__modified__ = false
          row.comCode = getComCode()

          if (row.regiNo == null || row.regiNo == '0') {
            row.regiNo = 1
          } else {
            row.regiNo = parseInt(row.regiNo) + 1
          }

          row.realState = ''
          row.regiType = '10' // 수작업등록
          row.maker = getUserId()
          row.editor = getUserId()

          insertRows.push(row)
        }
      }

      insertMat0110(insertRows, true)
        .then(res => {
          notify(this.$t('Saved'), 'success', 3000)
        })
        .catch(error => {
          notify(error, 'error', 3000)
          this.endLoading()
        })
        .finally(() => {
          this.mainGridInstance.endUpdate()
          this.clearMainGrid()
          this.endLoading()
        })
    },

    clearMainGrid() {
      this.mainGrid = []
      this.mainGridInstance.clearSelection()
    },

    itemRowClickMainGrid(e) {
      if (e.rowIndex === undefined || e.rowIndex < 0 || this.mainGrid.length < 1) {
        return
      }

      this.curRowClickData = e.data
      this.curRealQty = parseInt(this.mainGrid[e.rowIndex].realQty)
      this.curRemark = this.mainGrid[e.rowIndex].remark
    },

    plusQty() {
      if (this.curRowClickData === undefined || this.curRowClickData === null) {
        return
      }

      this.curRealQty += parseInt(1)
      this.curRowClickData.realQty = this.curRealQty

      if (parseInt(this.curRowClickData.stockQty) !== this.curRealQty) {
        this.curRowClickData.realState = '진행'
      } else {
        this.curRowClickData.realState = ''
      }
    },

    minusQty() {
      if (this.curRowClickData === undefined || this.curRowClickData === null) {
        return
      }

      this.curRealQty -= parseInt(1)

      if (this.curRealQty < 0) {
        this.curRealQty = 0
      }

      this.curRowClickData.realQty = this.curRealQty

      if (parseInt(this.curRowClickData.stockQty) !== this.curRealQty) {
        this.curRowClickData.realState = '진행'
      } else {
        this.curRowClickData.realState = ''
      }
    },

    applyRemark() {
      if (this.curRowClickData === undefined || this.curRowClickData === null) {
        return
      }

      this.curRowClickData.remark = this.curRemark
    },

    applyData() {
      if (this.curRowClickData === undefined || this.curRowClickData === null) {
        return
      }

      this.curRowClickData.realQty = this.curRealQty

      if (parseInt(this.curRowClickData.stockQty) !== parseInt(this.curRealQty)) {
        this.curRowClickData.realState = '진행'
      } else {
        this.curRowClickData.realState = ''
      }

      this.curRowClickData.remark = this.curRemark
    },

    onFocusedCellChanged(e) {
      if (e.column.dataField === 'realQty') {
        if (e.rowIndex === undefined || e.rowIndex < 0 || this.mainGrid.length < 1) {
          return
        }

        let prevRealQty = this.mainGrid[e.rowIndex].realQty
        let curRealQty = e.value

        if (prevRealQty !== curRealQty) {
          let stockQty = this.mainGrid[e.rowIndex].stockQty

          if (stockQty !== curRealQty) {
            this.mainGrid[e.rowIndex].realState = '진행'
            let checkIndexes = new Array()

            for (let index = 0; index < this.mainGrid.length; ++index) {
              if (this.mainGrid[index].realState === '진행') {
                checkIndexes.push(index)
              }
            }

            e.component.selectRowsByIndexes(checkIndexes)
          } else {
            this.mainGrid[e.rowIndex].realState = ''
          }

          this.mainGridInstance.saveEditData()
        }
      }
    },

    getDateFormat(date) {
      return getDateFormat(date)
    }
  }
}
</script>

<style scoped>
.qty-field {
  width: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 14pt;
}
.qty-field input {
  text-align: center;
}

.remark-field {
  width: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 14pt;
}
</style>
>>>>>>> bb0a9df (sad)
