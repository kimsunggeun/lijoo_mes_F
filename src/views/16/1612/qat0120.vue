<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col>
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    :prepend-inner-icon="'$search'"
                    clearable
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    :label="$t('facName')"
                    v-model="searchFacCode"
                    :items="facCodeList"
                    item-text="text"
                    item-value="value"
                    @keyup.enter="btnSearch()"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    clearable
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    :label="$t('partNo')"
                    v-model="searchPartNo"
                    @keyup.enter="btnSearch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2" class="mx-0">
                  <v-menu
                    ref="mnDtFrom"
                    v-model="mnDtFrom"
                    :close-on-content-click="false"
                    :retrun-value.sync="reqDtFrom"
                    max-width="280px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{on, attrs}">
                      <v-text-field
                        :label="$t('등록일')"
                        v-model="reqDtFrom"
                        class="required mx-1"
                        dense
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        @keyup.enter="btnSearch()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reqDtFrom"
                      no-title
                      scrollable
                      @input="dateInput"
                      :day-format="(date) => {return new Date(date).getDate();}"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="mnDtTo"
                    v-model="mnDtTo"
                    :close-on-content-click="false"
                    :return-value.sync="reqDtTo"
                    width="280px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="~"
                        v-model="reqDtTo"
                        dense
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        class="required mx-1"
                        @keyup.enter="btnSearch()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reqDtTo"
                      :min="reqDtFrom"
                      class="required mx-1"
                      no-title
                      scrollable
                      @input="dateInput2"
                      :day-format="(date) => {return new Date(date).getDate();}"
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <i-card-vertical
          headerTitle="faultyInfo"
          :useBtnList="[
            'btnExcel', //엑셀
          ]"
          @btnExcel="btnExcel()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  key-expr="id"
                  id="qat0120MainGrid"
                  class="doubleListBox09"
                  :ref="qat0120MainGridRef"
                  :data-source="qat0120MainGrid"
                  :column-auto-width="true"
                  :width="grid.width"
                  :show-borders="true"
                  :show-row-lines="true"
                  :allow-column-reordering="true"
                  :allow-column-resizing="true"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :row-alternation-enabled="true"
                  @cellClick="searchDefDetail"
                >
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="left"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="left"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="defCnt"
                    :caption="$t('faultyQty')"
                    data-type="string"
                    alignment="center"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn :caption="$t('badType')">
                    <DxColumn
                      data-field="defShape"
                      :caption="$t('defShape')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="defDimension"
                      :caption="$t('defDimension')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="defSetting"
                      :caption="$t('defSetting')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="toolDamage"
                      :caption="$t('toolDamage')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="defIntroduction"
                      :caption="$t('defIntroduction')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="defStamping"
                      :caption="$t('defStamping')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="defOther"
                      :caption="$t('defOther')"
                      data-type="string"
                      alignment="center"
                      :visible="true"
                      :allow-editing="false"
                    />
                  </DxColumn>
                  <DxColumn />
                  <DxSummary>
                    <DxTotalItem column="defCnt" summary-type="sum" display-format="Total: {0}" />
                    <DxTotalItem column="defShape" summary-type="sum" display-format="Total: {0}" />
                    <DxTotalItem
                      column="defDimension"
                      summary-type="sum"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem
                      column="defSetting"
                      summary-type="sum"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem
                      column="toolDamage"
                      summary-type="sum"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem
                      column="defIntroduction"
                      summary-type="sum"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem
                      column="defStamping"
                      summary-type="sum"
                      display-format="Total: {0}"
                    />
                    <DxTotalItem column="defOther" summary-type="sum" display-format="Total: {0}" />
                  </DxSummary>
                  <DxPager :show-page-size-selector="false" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <i-card-vertical
          headerTitle="faultyDetailInfo"
          :useBtnList="[
            'btnExcel', //엑셀
          ]"
          @btnExcel="btnExcelDetail()"
        >
          <template v-slot:body>
            <v-layout>
              <v-col>
                <DxDataGrid
                  key-expr="id"
                  id="qat0120DetailGrid"
                  class="doubleListBox09"
                  :ref="qat0120DetailGridRef"
                  :data-source="qat0120DetailGrid"
                  :column-auto-width="true"
                  :width="grid.width"
                  :show-borders="true"
                  :show-row-lines="true"
                  :allow-column-reordering="true"
                  :allow-column-resizing="true"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :row-alternation-enabled="true"
                >
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('makeDate')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="workName"
                    :caption="$t('workCode')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="workDename"
                    :caption="$t('workDecode')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="prodType"
                    :caption="$t('prodType')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="defCode"
                    :caption="$t('faultyName')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="defCnt"
                    :caption="$t('faultyQty')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="lotNo"
                    :caption="$t('badLot')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('badLotDetail')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />                  
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="true"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    :visible="false"
                  />
                  <DxColumn />
                  <DxSummary>
                    <DxTotalItem column="defCnt" summary-type="sum" display-format="Total: {0}" />
                  </DxSummary>

                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxDataGrid, DxColumn, DxPager, DxScrolling, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid'
import { getdefStatus, getDefDetail, getDefQtyDetail } from '@/api/view/qat0120'
import { getProcInfo } from '@/api/view/bas0031'
import { getComCode } from '@/utils/token'
import { getDateFormat, getCurrentDate, getPreDay } from '@/utils/common.js'
import { getFacName } from '@/api/view/qat0010'
import { getwork } from '@/api/view/pop0310'
import notify from 'devextreme/ui/notify' // message
import themes from 'devextreme/ui/themes'
export default {
  name: 'qat0120',
  mixins: [baseview, BaseDataGrid],
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxTotalItem,
    DxSummary
  },
  data() {
    return {
      searchFacCode: '',
      searchPartNo: '',
      facCodeList: [],
      qat0120MainGridRef: 'qat0120MainGridRef',
      qat0120DetailGridRef: 'qat0120DetailGridRef',
      qat0120MainGrid: [],
      qat0120DetailGrid: [],
      reqDtFrom: getCurrentDate(),
      reqDtTo: getCurrentDate(),
      mnDtFrom: '',
      mnDtTo: ''
    }
  },
  created() {
    let param = {
      comCode: getComCode(),
      code: 'def_code',
      facCode: 'FAC01'
    }
    //공장명 가져오기
    getFacName(param).then(res => {
      res.list.forEach(item => {
        this.facCodeList.push({
          value: item.facCode,
          text: item.facName
        })
      })
    })
  },
  computed: {
    MainGrid() {
      return this.GetDataGrid(this.qat0120MainGridRef)
    }
  },
  methods: {
    dateInput(e) {
      this.reqDtFrom = e
      this.mnDtFrom = false
      this.$refs.mnDtFrom.save(e)
      if (this.reqDtFrom > this.reqDtTo) {
        this.reqDtTo = this.reqDtFrom
      }
    },
    dateInput2(e) {
      if (this.reqDtFrom === '') {
        return
      }
      this.reqDtTo = e
      this.mnDtTo = false
      this.$refs.mnDtTo.save(e)
    },
    btnSearch() {
      const param = {
        comCode: getComCode(), //회사코드
        facCode: 'FAC01', //공장코드
        partNo: this.searchPartNo, //품번
        reqDtFrom: this.reqDtFrom, //from
        reqDtTo: this.reqDtTo //to
      }
      getdefStatus(param).then(res => {
        let cnt = 0
        if (res.list.length != 0) {
          res.list.forEach(e => {
            e.id = cnt++
          })
          notify(this.$t('조회되었습니다.'), 'success', 1500)
        }
        this.qat0120MainGrid = res.list
        if (res.list.length == 0) {
          notify(this.$t('데이터가 없습니다.'), 'error', 1500)
          this.qat0120MainGrid = []
        }
      })
    },
    searchDefDetail(e) {
      const param = {
        comCode: getComCode(),
        facCode: 'FAC01',
        partNo: e.data.partNo
      }
      if (e.column.dataField === 'defCnt') {
        getDefQtyDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'defShape') {
        param.defCode = 'A10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'defDimension') {
        param.defCode = 'B10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'defSetting') {
        param.defCode = 'C10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'toolDamage') {
        param.defCode = 'D10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'defIntroduction') {
        param.defCode = 'E10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'defStamping') {
        param.defCode = 'F10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
      if (e.column.dataField === 'defOther') {
        param.defCode = 'Z10'
        getDefDetail(param).then(res => {
          let cnt = 0
          if (res.list.length != 0) {
            res.list.forEach(e => {
              e.id = cnt++
            })
            notify(this.$t('조회되었습니다.'), 'success', 1500)
          }
          this.qat0120DetailGrid = res.list
          if (res.list.length == 0) {
            notify(this.$t('데이터가 없습니다.'), 'error', 1500)
            this.qat0120DetailGrid = []
          }
        })
      }
    },
    async btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('qat0120MainGrid')) //input my data
      workSheet['!cols'] = [
        { width: 20 }, //품번
        { width: 20 }, //품명
        { width: 15 }, //불량수량
        { width: 15 }, //형상불량
        { width: 15 }, //치수불량
        { width: 15 }, //셋팅불량
        { width: 15 }, //공구파손
        { width: 15 }, //소개불량
        { width: 15 }, //찍힘불량
        { width: 15 } //기타불량
      ]
      const workBook = this.$xlsx.utils.book_new() // create new shee
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // input sheetname,data
      this.$xlsx.writeFile(workBook, '불량현황.xlsx') //create excel file
    },

    btnExcelDetail() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('qat0120DetailGrid')) // table id를 넣어주면된다
      workSheet['!cols'] = [
        { width: 15 }, //등록일
        { width: 15 }, //작업장 코드
        { width: 15 }, //작업반 코드
        { width: 20 }, //품번
        { width: 20 }, //품명
        { width: 15 }, //생산 유형
        { width: 15 }, //불량명
        { width: 15 }, //불량수량
        { width: 20 }, //불량LOT
        { width: 25 }, //불량전산번호
        { width: 15 }, //불량선별 코드
        { width: 20 }, // 불량선별 양품수량
        { width: 20 }, //불량선별불량수량
        { width: 20 } //비고
      ]
      for (let i in workSheet) {
        if (i.indexOf('J') != -1) {
          //불량전산번호 컬럼 데이터포맷 설정
          workSheet[i].z = '0'
        }
      }
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '불량현황상세정보.xlsx') // 엑셀파일 만듬
    }
  }
}
</script>