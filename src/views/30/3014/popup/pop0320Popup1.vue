<template>
  <v-container>
    <DxPopup
      :visible.sync="popVisible"
      :show-close-button="true"
      :show-title="true"
      height="700px"
      width="1500px"
      @hidden="onHidden"
    >
      <v-row no-gutters>
        <v-tabs class="pop0320Popup">
          <v-tab class="mr-2">{{ $t('stock') }}</v-tab>
          <v-tab v-if="false" class="mr-2">{{ $t('workInProcess') }}</v-tab>
          <!-----------------------------------재고---------------------------------------------->
          <v-tab-item>
            <v-row>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  color="primary"
                  class="required"
                  item-text="text"
                  item-value="value"
                  :items="whNmList"
                  :label="$t('whName')"
                  v-model="searchLocCode"
                  outlined
                  dense
                  @keyup.enter="btnstocksearch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-text-field
                  color="primary"
                  class="required"
                  item-text="text"
                  item-value="value"
                  :items="partNoList"
                  :label="$t('partCode')"
                  v-model="searchPartNo2"
                  outlined
                  dense
                  @keyup.enter="btnstocksearch()"
                ></v-text-field>
              </v-col>
              <v-col cols="4"></v-col>
              <v-col col="2" md="2">
                <v-btn
                  depressed
                  class="pa-2 pt-0 pb-0 white--text"
                  color="rgb(44,73,184)"
                  height="30"
                  width="100%"
                  @click="btnstocksearch()"
                >
                  <v-icon size="20px" class="pr-1">mdi-magnify</v-icon>조회
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <i-card-vertical headerTitle="titleStock">
                <template v-slot:body>
                  <DxDataGrid
                    id="pop0320PopupGrid"
                    class="vh-40"
                    style="width:100%"
                    :ref="dxDataGridPopupGridRef"
                    :data-source="pop0320PopupGrid"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :disablePagination="false"
                    :column-hiding-enabled="false"
                    :column-auto-width="true"
                    :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
                    @cellClick="onSelectionChanged"
                  >
                    <DxColumn
                      data-field="locName"
                      :caption="$t('whName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
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
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="stockQty"
                      :caption="$t('stockQty')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('regiDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn />
                    <DxPaging :enabled="false" />
                    <!-- 페이지 스크롤 기능 넣는 코드-->
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                  </DxDataGrid>
                </template>
              </i-card-vertical>
            </v-row>

            <v-row>
              <v-col cols="10"></v-col>
              <v-col cols="1">
                <v-btn
                  depressed
                  class="white--text"
                  color="rgb(44,73,184)"
                  height="30"
                  width="100%"
                  @click="onEmit2()"
                >선택</v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  depressed
                  class="white--text"
                  color="rgb(44,73,184)"
                  height="30"
                  width="100%"
                  @click="onHidden()"
                >닫기</v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
          <!-----------------------------------재고끝---------------------------------------------->
          <!-----------------------------------재공---------------------------------------------->
          <v-tab-item>
            <v-row>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  color="primary"
                  class="required"
                  item-text="text"
                  item-value="value"
                  :items="locationList"
                  v-model="searchLocation"
                  :label="$t('locationProcess')"
                  outlined
                  dense
                  @keyup.enter="btnworkInProcesssearch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  color="primary"
                  class="required"
                  item-text="text"
                  item-value="value"
                  :items="workName"
                  v-model="searchWork"
                  :label="$t('workDename')"
                  outlined
                  dense
                  @keyup.enter="btnworkInProcesssearch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-text-field
                  color="primary"
                  class="required"
                  v-model="searchPartNo"
                  :label="$t('partCode')"
                  outlined
                  dense
                  @keyup.enter="btnworkInProcesssearch()"
                ></v-text-field>
              </v-col>
              <v-col cols="1"></v-col>
              <v-col col="2" md="2">
                <v-btn
                  depressed
                  class="pa-2 pt-0 pb-0 white--text"
                  color="rgb(44,73,184)"
                  height="30"
                  width="100%"
                  @click="btnworkInProcesssearch()"
                >
                  <v-icon size="20px">mdi-magnify</v-icon>조회
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <i-card-vertical headerTitle="titleWorkInProcess">
                <template v-slot:body>
                  <DxDataGrid
                    id="pop0320PopupGrid"
                    class="vh-40"
                    :ref="dxDataGridPopupGrid2"
                    :data-source="pop0320PopupGrid2"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :show-row-lines="true"
                    key-expr="id"
                    :selection="{ mode: 'single' }"
                    :focused-row-enabled="true"
                    :disablePagination="false"
                    :column-hiding-enabled="false"
                    :column-auto-width="true"
                    :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
                    @focused-row-changed="onSelectionChangedProcess"
                  >
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                    <DxColumn
                      data-field="proCode"
                      :caption="$t('processName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
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
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="qty"
                      :caption="$t('lotAmount')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="workDecode"
                      :caption="$t('workDetail')"
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
                      :visible="false"
                    />
                    <DxColumn />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxScrolling column-rendering-mode="virtual" />
                  </DxDataGrid>
                </template>
              </i-card-vertical>
            </v-row>
            <v-row>
              <v-col cols="10"></v-col>
              <v-col cols="1">
                <v-btn
                  depressed
                  class="white--text"
                  color="rgb(44,73,184)"
                  height="30"
                  width="100%"
                  @click="onEmit()"
                >선택</v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  depressed
                  class="white--text"
                  color="rgb(44,73,184)"
                  height="30"
                  width="100%"
                  @click="onHidden()"
                >닫기</v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
          <!-----------------------------------재공끝---------------------------------------------->
        </v-tabs>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup'
import iCardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxDataGrid, DxColumn, DxScrolling, DxPager, DxPaging, DxSelection } from 'devextreme-vue/data-grid'
import { getComCode } from '@/utils/token'
import { getpartNo, getwhNm, getwork, getWorkProcess, getstock } from '@/api/view/pop0310'
import { getBas0035 } from '@/api/view/pro0050'
import { getFacCode } from '@/api/system/companyManage'
import { getProcInfo } from '@/api/view/bas0031'
import notify from 'devextreme/ui/notify'
import themes from 'devextreme/ui/themes'
export default {
  name: 'Pop0320Popup',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
    'i-card-vertical': iCardVertical,
    DxPager,
    DxPaging,
    DxSelection,
    DxScrolling
  },
  data() {
    return {
      se: [],
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      popVisible: false,
      pop0320PopupGrid: [],
      pop0320PopupGrid2: [],
      dxDataGridPopupGridRef: 'dxDataGridPopupGridRef',
      dxDataGridPopupGrid2Ref: 'dxDataGridPopupGrid2Ref',
      partNoList: [],
      whNmList: [],
      locationList: [],
      workName: [],
      searchPartNo: '',
      searchPartNo2: '',
      searchLocCode: '',
      searchLocation: '',
      searchWork: '',
      processData: [],
      stockData: [],
      tabKey: '',
      unitPirce: 0,
      selectedRowStockData: [], //재고에서 선택된 데이터가 들어올 배열
      firstSelectedRowStockData: [], //재고에서 첫번째로 선택된 데이터가 들어갈 배열
      boolCheckStockData: false, //첫번째로 선택된 데이터인지 아닌지 판별하는 boolean
      keys: 0, //재고에서 선택된 로우의 숫자
      finalStockData: [], //selectedRowStockData에 있는 데이터를 검증하고 그리드에 보내줄 데이터 (체크된 데이터들)
      cnt: 0 //그리드 id 값
    }
  },
  computed: {
    deliRegInstance() {
      return this.GetDataGrid(this.dxDataGridPopupGridRef)
    }
  },
  created() {
    const param = {
      //조회조건 파라미터
      comCode: getComCode(),
      facCode: 'FAC01'
    }
    getpartNo(param).then(res => {
      //품목 코드 가져오기
      res.list.forEach(item => {
        this.partNoList.push({
          value: item.partNo,
          text: item.partNo
        })
      })
    }),
      getwork(param).then(res => {
        //공정 가져오기
        res.list.forEach(item => {
          this.locationList.push({
            value: item.workDecode,
            text: item.workDename
          })
        })
      }),
      getwhNm(param).then(res => {
        //창고명 가져오기
        res.list.forEach(item => {
          this.whNmList.push({
            value: item.locCode,
            text: item.locName
          })
        })
      }),
      getProcInfo(param).then(res => {
        //작업반명 가져오기
        res.list.forEach(item => {
          this.workName.push({
            text: item.proName,
            value: item.proCode
          })
        })
      })
  },
  methods: {
    onSelectionChangedProcess(e) {
      this.processData = {
        lotDetail: e.row.data.lotDetail,
        partNo: e.row.data.partNo,
        partName: e.row.data.partName,
        locationName: e.row.data.proCode,
        lot: e.row.data.lotNo,
        makeDate: e.row.data.makeDate,
        qty: e.row.data.qty
      }
    },
    onEmit() {
      //재공선택시 실행
      if (this.processData.length == 0) {
        notify(this.$t('데이터를 선택해 주세요.'), 'error', 1500)
        return
      } else {
        this.$emit('setInput', this.processData)
        this.onHidden()
        this.processData = [] //팝업을 닫을때 데이터 초기화
      }
    },
    onEmit2() {
      //재고선택시 실행
      this.selectedRowStockData.unshift(this.firstSelectedRowStockData[0])
      const result = [...new Set(this.selectedRowStockData)]
      if (this.keys.length === 0) {
        notify(this.$t('병합할 데이터를 선택해 주세요.'), 'error', 1500)
        this.firstSelectedRowStockData = []
        this.selectedRowStockData = []
        this.boolCheckStockData = false
        return
      }
      if (this.selectedRowStockData.length < 2) {
        notify(this.$t('병합할 데이터를 선택해 주세요.'), 'error', 1500)
        return
      } else {
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < this.keys.length; j++) {
            if (result[i].id == this.keys[j]) {
              this.finalStockData.push(result[i])
            }
          }
        }
        this.$emit('setInput2', this.finalStockData)
        this.onHidden()
        this.firstSelectedRowStockData = []
        this.selectedRowStockData = []
        this.finalStockData = []
        this.stockData = [] //팝업을 닫을때 데이터 초기화
        this.cnt = 0
      }
    },
    open(data) {
      this.popVisible = data.popVisible
      console.log('팝업이 열립니다.')
    },
    onHidden() {
      //팝업이 닫힐때 실행되는 함수
      this.clear()
      console.log('팝업이 닫힙니다.')
    },
    //재공 조회
    btnworkInProcesssearch() {
      let param = {
        partNo: this.searchPartNo,
        location: this.searchLocation,
        work: this.searchWork,
        comCode: getComCode(),
        facCode: 'FAC01'
      }
      getWorkProcess(param).then(res => {
        res.list.forEach(e => {
          e.id = this.cnt++
        })
        if (res.list.length == 0) {
          notify(this.$t('데이터가 없습니다.'), 'error', 1500)
          this.pop0320PopupGrid = []
        } else {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
        }
        this.pop0320PopupGrid2 = res.list
      })
    },
    //재고 조회
    btnstocksearch(e) {
      let param = {
        partNo: this.searchPartNo2,
        locCode: this.searchLocCode
      }
      getstock(param).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = this.cnt++
        })
        if (res.list.length == 0) {
          notify(this.$t('데이터가 없습니다.'), 'error', 1500)
          this.pop0320PopupGrid2 = []
        } else {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
        }
        this.pop0320PopupGrid = res.list
      })
    },
    async onSelectionChanged(e) {
      this.keys = await this.deliRegInstance.getSelectedRowKeys()
      if (this.keys.length === 0) {
        notify(this.$t('다시 선택 해주세요.'), 'error', 1500)
        this.firstSelectedRowStockData = []
        this.selectedRowStockData = []
        this.boolCheckStockData = false
        return
      }
      if (this.boolCheckStockData === false) {
        this.firstSelectedRowStockData[0] = e.data
        this.boolCheckStockData = true
      } else {
        this.selectedRowStockData.push(e.data)
        //첫번째 배열과 같은 로트번호가 없도록 필터링
        this.selectedRowStockData = this.selectedRowStockData.filter(x => x.lotDetail != this.firstSelectedRowStockData[0].lotDetail)
      }
      if (this.firstSelectedRowStockData.length != 0 && this.selectedRowStockData.length != 0) {
        if (
          this.firstSelectedRowStockData[0].partNo != this.selectedRowStockData[this.selectedRowStockData.length - 1].partNo ||
          this.firstSelectedRowStockData[0].locName != this.selectedRowStockData[this.selectedRowStockData.length - 1].locName
        ) {
          notify(this.$t('첫번째로 선택한 품목코드와 창고가 다른 품목코드는 선택할 수 없습니다.'), 'error', 1500)
          this.selectedRowStockData.pop()
          this.deliRegInstance.deselectRows(e.key)
          return
        }
      }
    },
    clear() {
      this.pop0320PopupGrid = []
      this.pop0320PopupGrid2 = []
      this.selectedRowStockData = []
      this.searchLocCode = ''
      this.searchLocation = ''
      this.searchWork = ''
      this.searchPartNo = ''
      this.searchPartNo2 = ''
      ;(this.popVisible = false), (this.selectedRowStockData = []), (this.firstSelectedRowStockData = []), (this.boolCheckStockData = false)
      this.deliRegInstance.clearSelection()
    }
  }
}
</script>
<style scoped>
::v-deep .pop0320Popup .v-tab--active {
  border-bottom: 2px solid #455b59;
}
</style>