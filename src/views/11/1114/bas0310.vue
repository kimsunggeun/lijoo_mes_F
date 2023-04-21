<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    v-model="custNameSelect"
                    :items="custNameList"
                    :prepend-inner-icon="'$search'"
                    :label="$t('custName')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    v-model="custTypeNmSelect"
                    item-value="value"
                    :label="$t('custTypeNm')"
                    :prepend-inner-icon="'$search'"
                    :items="custTypeNmList"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="5" class="pa-2">
        <i-card-vertical
          headerTitle="customer"
          :useBtnList="[]"
          @btnAdd="btnAdd('거래처')"
          @btnSave="btnSave('거래처')"
          @btnDelete="btnDelete('거래처')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="accountInfo"
                  class="listBox"
                  :ref="custGridRef"
                  :data-source="custGrid"
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
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                  @focused-row-changed="focusedRowChanged_custGrid"
                  @cellClick="custGridClick"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxColumn data-field="comCode" :caption="$t('comCode')" data-type="string" alignment="center" :visible="false" />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    width="auto"
                    :allow-editing="false"
                    data-type="string"
                    alignment="left"
                  />
                  <DxColumn data-field="custName" :caption="$t('custName')" width="auto" data-type="string" :allow-editing="false" alignment="left" />
                  <DxColumn
                    data-field="custTypeNm"
                    :caption="$t('custTypeNm')"
                    width="auto"
                    data-type="string"
                    :allow-editing="false"
                    alignment="left"
                  />
                  <DxColumn
                    data-field="matTypeNm"
                    :caption="$t('matTypeNm')"
                    width="auto"
                    data-type="string"
                    :allow-editing="false"
                    alignment="left"
                  />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="makeDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />      
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" /> 
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />                 
                  <DxColumn/>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="7" class="pa-2">
        <v-row>
          <i-card-vertical
            class="mb-7"
            headerTitle="itemInfoTitle"
            :useBtnList="[
              'btnAdd', //신규
              'btnSave', //저장
              'btnDelete' //삭제
            ]"
            @btnAdd="btnAdd('품목정보')"
            @btnSave="btnSave('품목정보')"
            @btnDelete="btnDelete('품목정보')"
          >
            <template v-slot:body>
              <v-layout column>
                <v-row>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="itemInfo"
                      class="doubleListBox08"
                      :ref="itemInfoGridRef"
                      :data-source="itemInfoGrid"
                      :remote-operations="false"
                      :hover-state-enabled="true"
                      :allow-column-resizing="true"
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true"
                      :column-auto-width="true"
                      :show-borders="true"
                      :width="grid.width"
                      :show-row-lines="true"
                      key-expr="id"
                      :focused-row-enabled="true"
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @focused-row-changed="focusedRowChanged_itemInfo"
                      @cellClick="itemInfoGridClick"
                      :on-row-inserted="e => e.component.navigateToRow(e.key)"
                      @row-updating="rowUpdated"
                    >
                      <DxColumn
                        data-field="partNo"
                        :caption="$t('partNo')"
                        data-type="string"
                        alignment="left"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="partName"
                        :caption="$t('partName')"
                        data-type="string"
                        alignment="left"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn data-field="partSpec" :caption="$t('partSpec')" data-type="string" alignment="left" :allow-editing="false" width="auto" />

                      <DxColumn
                        data-field="inInsp"
                        :caption="$t('inInsp')"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        :visible="false"
                        data-type="boolean"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="supInsp"
                        :allow-editing="false"
                        :caption="$t('supInsp')"
                        alignment="center"
                        :visible="false"
                        edit-cell-template="checkBoxEditor"
                        data-type="boolean"
                      />
                      <DxColumn
                        data-field="outInsp"
                        :allow-editing="false"
                        :caption="$t('outInsp')"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        data-type="boolean"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        width="auto"
                      />
                      <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" alignment="left" width="500" />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="makeDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />      
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn/>
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <!-- 옵션 -->
                      <DxPager :show-page-size-selector="false" />
                      <DxPaging :enabled="false" />
                      <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    </DxDataGrid>
                  </v-col>
                </v-row>
              </v-layout>
            </template>
          </i-card-vertical>
          <i-card-vertical
            headerTitle="unitPriceInfoTitle"
            :useBtnList="[
              'btnAdd', //신규
              'btnSave', //저장
              'btnDelete' //삭제
            ]"
            @btnAdd="btnAdd('단가정보')"
            @btnSave="btnSave('단가정보')"
            @btnDelete="btnDelete('단가정보')"
          >
            <template v-slot:body>
              <v-layout column>
                <v-row>
                  <v-col cols="12" class="pa-0 pt-2">
                    <DxDataGrid
                      id="unitPriceInfo"
                      class="doubleListBox08"
                      :ref="priceGridRef"
                      :data-source="priceGrid"
                      :remote-operations="false"
                      :hover-state-enabled="true"
                      :allow-column-resizing="true"
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true"
                      :show-borders="true"
                      :width="grid.width"
                      :show-row-lines="true"
                      :column-auto-width="true"
                      key-expr="id"
                      :focused-row-enabled="true"
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @row-updating="rowUpdated"
                      :on-row-inserted="e => e.component.navigateToRow(e.key)"
                    >
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        data-type="string"
                        :visible="false"
                        alignment="center"
                      />
                      <DxColumn
                        data-field="partNo"
                        :caption="$t('partNo')"
                        data-type="string"
                        alignment="left"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="custCode"
                        :caption="$t('custName')"
                        data-type="string"
                        alignment="left"
                        width="auto"
                      >
                        <DxLookup :data-source="custNameList" display-expr="text" value-expr="value" />
                      </DxColumn>
                      <DxColumn data-field="appStartDate" :caption="$t('appStartDate')" data-type="date" format="yyyy-MM-dd" alignment="center" width="auto" css-class="devest-grid-header-require"/>
                      <DxColumn
                        data-field="appEndDate"
                        :caption="$t('appEndDate')"
                        data-type="date"
                        format="yyyy-MM-dd"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="modiYN"
                        :caption="$t('modiYN')"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        width="auto"
                      />
                      <DxColumn
                        data-field="appYN"
                        :caption="$t('appYN')"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        width="auto"
                      />

                      <DxColumn
                        data-field="price"
                        data-type="number"
                        :customize-text="customizeText"
                        :caption="$t('price')"
                        width="auto"
                        alignment="right"
                        format="#,###"
                        css-class="devest-grid-header-require"
                      ></DxColumn>

                      <DxColumn data-field="unit" :caption="$t('unit')" width="auto" data-type="string" alignment="center" :allow-editing="true" css-class="devest-grid-header-require">
                        <DxLookup :data-source="unitList" display-expr="text" value-expr="value" />
                      </DxColumn>

                      <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        width="auto"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="makeDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />      
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn/>
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <!-- 옵션 -->
                      <DxPager :show-page-size-selector="false" />
                      <DxPaging :enabled="false" />
                      <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    </DxDataGrid>
                  </v-col>
                </v-row>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>

    <DxPopup :visible.sync="itemPopup" :show-close-button="true" :show-title="true" :title="$t('itemInfo')" height="auto" width="40%">
      <v-row>
        <v-col>
          <i-card-vertical headerTitle :headerTitle2="popupHeaderText">
            <template v-slot:body>
              <v-layout column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGridRef"
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
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @cellClick="popupSelectEvent"
                  @row-updating="rowUpdated"
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
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
                    alignment="left"
                    :min-width="150"
                    width="200"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partName" :caption="$t('partName')" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partSpec" :caption="$t('partSpec')" data-type="string" alignment="left" :allow-editing="false" />

                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" :allow-editing="false" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="insertData()">{{ $t('plus') }}</v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="itemPopup = false">{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxPager, DxLookup } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message

import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getUserId, getComCode } from '@/utils/token'

import { getCustomName, getItem, getPart, setCustPart, delCustPart, getPriceInfo, setPriceInfo, delPriceInfo } from '@/api/view/bas0310'
import { DxPopup } from 'devextreme-vue/popup'

export default {
  name: 'bas0310',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리

  components: {
    DxPopup,
    DxPager,
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup
  },
  data() {
    return {
      //검색조건 관련
      custNameSelect: '',
      custNameList: [],
      custTypeNmList: [],
      custTypeNmSelect: '',
      userFlagList: [],
      userFlagSelect: '',
      unitList: [],
      //그리드 클릭이벤트 관련
      custGridClickData: null,
      itemInfoGridClickData: null,
      popupSelectData: null,

      //그리드 관련
      custGrid: [],
      itemInfoGrid: [],
      popupInfoGrid: [],
      priceGrid: [],

      //팝업관련
      itemPopup: false,
      popupHeaderText: null,
      //그리드 Ref
      popupInfoGridRef: [],
      custGridRef: 'custGridRef',
      itemInfoGridRef: 'itemInfoGridRef',
      priceGridRef: 'priceGridRef',
      //로우헤더
      amountEditorOptions: { format: 'currency', showClearButton: true },
      checkBoxesMode: 'always'
    }
  },
  computed: {
    custGridInstance() {
      return this.GetDataGrid(this.custGridRef)
    },

    itemInfoInstance() {
      return this.GetDataGrid(this.itemInfoGridRef)
    },
    priceInstance() {
      return this.GetDataGrid(this.priceGridRef)
    },
    popupInfoInstance() {
      return this.GetDataGrid(this.popupInfoGridRef)
    }
  },
  watch: {
    custGridClickData: function() {
      this.popupHeaderText = `${this.custGridClickData.custName} (${this.custGridClickData.custTypeNm}/${this.custGridClickData.matTypeNm})`
    }
  },

  methods: {
    rowUpdated(e) {
      e.component.selectRows(e.key, true)
    },
    customizeText(cellInfo) {
      return cellInfo.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    //팝업그리드 행 선택시 이벤트
    popupSelectEvent(e) {
      this.popupSelectData = e.data
    },
    //품목정보 클릭 이벤트
    itemInfoGridClick(e) {
      if (e.rowIndex !== -1 && e.rowType === 'data') {
        this.priceGrid = []

        if (e.data) {
          this.itemInfoGridClickData = e.data
        } else {
          this.itemInfoGridClickData = null
        }

        this.doSearchPriceGrid()
        this.priceInstance.clearSelection()
      }
    },
    focusedRowChanged_itemInfo(e) {
      if (e.row === undefined) {
        return
      }
      this.priceGrid = []
      this.itemInfoGridClickData = e.row.data
      this.doSearchPriceGrid()
      this.priceInstance.clearSelection()      
    },
    //팝업창에서 버튼클릭시 이벤트
    async insertData() {
      let selectedMainRows = await this.popupInfoInstance.getSelectedRowsData()

      let copyArray = JSON.parse(JSON.stringify(selectedMainRows))
      copyArray.forEach(item => {
        item.__created__ = true
        item.comCode = getComCode()
        item.maker = getUserId()
        item.userFlag = 'Y'
        item.id = this.itemInfoGrid.length++
        item.custCode = this.custGridClickData.custCode
        item.custName = this.custGridClickData.custName
        item.custType = this.custGridClickData.custType
      })

      copyArray.forEach(e => {
        this.itemInfoInstance.newRow(e)
        this.itemInfoInstance.selectRows(e.id, true)
        this.popupInfoInstance.clearSelection()
        this.priceGrid = []
        this.priceInstance.refresh()
      })
      this.itemInfoInstance.saveEditData()
      this.itemPopup = false
    },

    btnSearch() {
      this.doSearchCustGrid()
    },
    //거래처별품목 선택 이벤트
    custGridClick(e) {
      this.itemInfoInstance.clearSelection()
      this.priceInstance.clearSelection()
      if (e.rowIndex !== -1 && e.rowType === 'data') {
        this.itemInfoGrid = []

        if (e.data) {
          this.custGridClickData = e.data
        } else {
          this.custGridClickData = null
        }
        this.doSearchitemInfoGrid()
      }
    },
    focusedRowChanged_custGrid(e) {
      if (e.row === undefined) {
        return
      }
      this.itemInfoInstance.clearSelection()
      this.priceInstance.clearSelection()
      this.itemInfoGrid = []
      this.custGridClickData = e.row.data
      this.doSearchitemInfoGrid()
    },
    //거래처 테이블 조회
    doSearchCustGrid(event) {
      this.custGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        custCode: this.custNameSelect,
        custType: this.custTypeNmSelect
      }
      if (event) {
        params.custCode = ''
        params.custType = ''
      }
      getCustomName(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            this.custNameList.push({
              value: e.custCode,
              text: e.custName
            })
            e.id = cnt++
          })
          this.custGrid = res.list
        })
        .finally(() => {
          this.endLoading()
          this.custGridInstance.option('focusedRowIndex', 0)
          this.custGridClickData = this.custGrid[0]
          this.doSearchitemInfoGrid()
        })
    },
    //품목정보 테이블 조회
    doSearchitemInfoGrid() {
      let params = {
        comCode: getComCode(),
        custCode: this.custGridClickData.custCode
      }

      getItem(params)
        .then(res => {
          this.itemInfoGrid = [] // 초기화

          if (this.custGridClickData === '') {
            this.itemInfoGrid = res.list
          } else {
            let cnt = 0

            res.list.forEach(e => {
              e.id = cnt++
              e.comCode = getComCode()
              e.custCode = this.custGridClickData.custCode
              e.matType = this.custGridClickData.matType
              e.matTypeNm = this.custGridClickData.matTypeNm
              this.itemInfoGrid.push(e)
            })
          }
        })
        .finally(() => {
          this.endLoading()
          this.itemInfoInstance.option('focusedRowIndex', 0)
          this.itemInfoGridClickData = this.itemInfoGrid[0]
          this.doSearchPriceGrid()
        })
    },

    //단가정보 테이블 조회
    doSearchPriceGrid() {
      if (this.itemInfoGridClickData !== undefined) {
        let params = {
          comCode: getComCode(),
          custCode: this.itemInfoGridClickData.custCode,
          custName: this.itemInfoGridClickData.custName,
          custType: this.itemInfoGridClickData.custType,
          partNo: this.itemInfoGridClickData.partNo,
          userFlag: this.userFlagSelect
        }
        getPriceInfo(params)
          .then(res => {
            this.priceGrid = [] // 초기화

            if (this.custGridClickData === '') {
              this.priceGrid = res.list
            } else {
              let cnt = 0

              res.list.forEach(e => {
                e.id = cnt++

                this.priceGrid.push(e)
              })
            }
          })
          .finally(() => {
            this.endLoading()
          })
      } else {
        this.priceGrid = []
      }
    },

    //추가버튼
    btnAdd(gbn) {
      if (gbn === '품목정보') {
        if (this.custGridClickData !== null) {
          let params = {
            comCode: getComCode()
          }
          getPart(params)
            .then(res => {
              this.popupInfoGrid = res.list
              let cnt = 0
              this.popupInfoGrid.forEach(item => {
                item.id = cnt++
              })
            })
            .finally(() => {
              this.endLoading()
            })
          this.itemPopup = true
        }
      } else if (gbn === '단가정보') {
        let newRow = {
          comCode: getComCode(),
          id: this.priceGrid.length,
          partNo: this.itemInfoGridClickData.partNo,
          custCode: this.itemInfoGridClickData.custCode,
          appStartDate: new Date().toISOString(),
          appEndDate: '9999-12-31',
          modiYN: 'N',
          appYN: 'Y',
          price: '',
          unit: '',
          remark: '',
          userFlag: 'Y',
          makeDate: '',
          maker: getUserId(),
          editDate: '',
          editor: '',
          __modified__: false,
          __created__: true
        }
        this.priceInstance.newRow(newRow)
        this.priceInstance.selectRows(newRow.id, true)

        this.priceInstance.option('focusedRowIndex', -1)
        this.priceInstance.saveEditData()
      }
    },
    //저장버튼
    async btnSave(gbn) {
      let message = ''
      if (gbn === '품목정보') {
        await this.itemInfoInstance.saveEditData()
        let selectedMainRows = await this.itemInfoInstance.getSelectedRowsData()
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (let row of selectedMainRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          current => {
            this.openLoading()
            this.itemInfoInstance.beginUpdate()
            setCustPart(selectedMainRows, true)
              .then(res => {
                this.doSearchitemInfoGrid()
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.itemInfoInstance.endUpdate()
                this.itemInfoInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '단가정보') {
        await this.priceInstance.saveEditData()
        let selectedMainRows = await this.priceInstance.getSelectedRowsData()
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        for (let row of selectedMainRows) {
          if (!row.appStartDate || !row.unit || !row.price) {
            this.vToastify(`${this.$t('requiredCheck')} [${this.$t('appStartDate')},${this.$t('unit')},${this.$t('price')}]`, 'warn')
            return
          }
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }
        selectedMainRows.forEach(e => {
          e.appStartDate = e.appStartDate.substr(0, 10)
          e.appEndDate = e.appEndDate.substr(0, 10)
        })
        //유효성 체크

        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          current => {
            this.openLoading()
            this.priceInstance.beginUpdate()
            setPriceInfo(selectedMainRows, true)
              .then(res => {
                this.doSearchPriceGrid()
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.priceInstance.endUpdate()
                this.priceInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    async btnDelete(gbn) {
      let message = ''
      if (gbn === '품목정보') {
        await this.itemInfoInstance.saveEditData()
        let selectedMainRows = await this.itemInfoInstance.getSelectedRowsData()
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.itemInfoInstance.beginUpdate()
            delCustPart(selectedMainRows, true)
              .then(res => {
                this.doSearchitemInfoGrid(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.itemInfoInstance.endUpdate()
                this.itemInfoInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '단가정보') {
        await this.priceInstance.saveEditData()
        let selectedMainRows = await this.priceInstance.getSelectedRowsData()
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.priceInstance.beginUpdate()
            delPriceInfo(selectedMainRows, true)
              .then(res => {
                this.doSearchPriceGrid(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.priceInstance.endUpdate()
                this.priceInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    async comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'BIZ_GROUP,USER_YN,CURR_CODE'
      }
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'BIZ_GROUP')
          .forEach(e => {
            this.custTypeNmList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'USER_YN')
          .forEach(e => {
            this.userFlagList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'CURR_CODE') //단위코드
          .filter(word => word.userFlag === 'Y')
          .forEach(e => {
            this.unitList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
      })
    }
  },
  mounted() {
    this.comboListSet()
  },
  beforeMount() {}
}
</script>

<style scoped>
.btn {
  background-color: #879b77;
  color: white;
}
</style>
