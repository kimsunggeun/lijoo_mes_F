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
        <v-tabs class="pop0310Popup">
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
                    id="pop0310PopupGrid"
                    class="vh-40"
                    style="width:100%"
                    :ref="dxDataGridPopupGrid1"
                    :data-source="pop0310PopupGrid2"
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
                    @focused-row-changed="onSelectionChangedStock"
                    @CellDblClick="onEmit2()"
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
                    <DxPager :show-page-size-selector="false" />
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
                    id="pop0310PopupGrid"
                    class="vh-40"
                    :ref="dxDataGridPopupGrid1"
                    :data-source="pop0310PopupGrid"
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
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing, DxSelectionm, DxPager, DxPaging } from 'devextreme-vue/data-grid'
import { getComCode } from '@/utils/token'
import { getpartNo, getwhNm, getwork, getWorkProcess, getstock } from '@/api/view/pop0310'
import { getBas0035 } from '@/api/view/pro0050'
import { getFacCode } from '@/api/system/companyManage'
import { getProcInfo } from '@/api/view/bas0031'
import notify from 'devextreme/ui/notify'
export default {
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
    'i-card-vertical': iCardVertical,
    DxPager,
    DxPaging
  },
  data() {
    return {
      popVisible: false,
      pop0310PopupGrid: [],
      pop0310PopupGrid2: [],
      dxDataGridPopupGrid1: '',
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
      unitPirce: 0
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
    onSelectionChangedStock(e) {
      this.stockData = {
        lotDetail: e.row.data.lotDetail,
        partNo: e.row.data.partNo,
        partName: e.row.data.partName,
        locationName: e.row.data.locName,
        lot: e.row.data.lotNo,
        makeDate: e.row.data.regiDate,
        qty: e.row.data.stockQty,
        stockType: e.row.data.stockType,
        stockAmount: e.row.data.stockAmount,
        locCode: e.row.data.locCode,
        unitPrice: e.row.data.unitPrice,
        lotSize: e.row.data.lotSize
      }
    },
    onEmit2() {
      //재고선택시 실행
      if (this.stockData.length == 0) {
        notify(this.$t('데이터를 선택해 주세요.'), 'error', 1500)
        return
      } else {
        this.$emit('setInput2', this.stockData)
        this.onHidden()
        this.stockData = [] //팝업을 닫을때 데이터 초기화
      }
    },
    open(data) {
      this.popVisible = data.popVisible
      console.log('팝업이 열립니다.')
    },
    onHidden() {
      //팝업이 닫힐때 실행되는 함수
      this.pop0310PopupGrid = []
      this.pop0310PopupGrid2 = []
      this.searchLocCode = ''
      this.searchLocation = ''
      this.searchWork = ''
      this.searchPartNo = ''
      this.searchPartNo2 = ''
      this.popVisible = false
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
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        if (res.list.length == 0) {
          notify(this.$t('데이터가 없습니다.'), 'error', 1500)
          this.pop0310PopupGrid = []
        } else {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
        }
        this.pop0310PopupGrid = res.list
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
          e.id = cnt++
        })
        if (res.list.length == 0) {
          notify(this.$t('데이터가 없습니다.'), 'error', 1500)
          this.pop0310PopupGrid2 = []
        } else {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
        }
        this.pop0310PopupGrid2 = res.list
      })
    },
    tabChange(e) {
      this.TabKey = e
    }
  }
}
</script>
<style scoped>
::v-deep .pop0310Popup .v-tab--active {
  border-bottom: 2px solid #455b59;
}
</style>