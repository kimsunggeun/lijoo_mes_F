
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 공장명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="facCodeSelect"
                    :label="$t('facName')"
                    :items="facCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 거래처명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    v-model="custCode"
                    :label="$t('custName')"
                    :items="custCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 품목군 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="itemTypeList"
                    v-model="itemTypeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('itemGroup')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 제품군 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="partTypeList"
                    v-model="partTypeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('suite')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 품번 선택 -->
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 생산일 선택 -->
                <v-col cols="2">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :return-value.sync="startDate"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('outDate')"
                        v-model="startDate"
                        dense
                        outlined
                        readonly
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker 
                      v-model="startDate"
                      no-title 
                      @input="dateInput"
                    />
                  </v-menu>
                </v-col>
                <!-- ~ -->
                <v-col cols="2">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="endDate"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('endDate')"
                        v-model="endDate"
                        dense
                        outlined
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                        readonly
                      />
                    </template>
                    <v-date-picker
                      v-model="endDate"
                      :min="startDate"
                      no-title
                      scrollable
                      @input="dateInput2"
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2 pr-2 pt-0">
        <v-tabs>
          <v-tab>{{'출하실적현황'}}</v-tab>
          <v-tab>{{'기타출고현황'}}</v-tab>
          <v-tab-item>
            <!-- 출하실적현황 Grid -->
            <i-card-vertical 
              headerTitle="shipmentPerformanceStatus" 
              :useBtnList="['btnExcel']" 
              @btnExcel="btnExcelMainGrid()"
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="mainGrid"
                      class="listBox07"
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
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      column-resizing-mode="widget"
                    >
                      <!-- 공장코드 Column -->
                      <DxColumn 
                        data-field="facCode" 
                        :allow-editing="false" 
                        :caption="$t('facName')" 
                        data-type="string" 
                        width="auto"
                        alignment="left"
                      >
                        <DxLookup 
                          :data-source="facCodeList" 
                          display-expr="text" 
                          value-expr="value"
                        />
                      </DxColumn>
                      <!-- 출하일 Column -->
                      <DxColumn
                        data-field="outDate"
                        :caption="$t('outDate')"
                        data-type="string"
                        alignment="left"
                        width="auto"
                        :allow-editing="false"
                      />
                      <!-- 거래처명 Column -->
                      <DxColumn 
                        data-field="custName" 
                        :allow-editing="false" 
                        :caption="$t('custName')" 
                        data-type="string" 
                        width="auto"
                        alignment="left"
                      />
                      <!-- 수주번호 Column -->
                      <DxColumn
                        data-field="ordNo"
                        :caption="$t('ordNo')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                      <!-- 수주순번 Column -->
                      <DxColumn
                        data-field="ordTurn"
                        :caption="$t('ordTurn')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />     
                      <!-- 출하 일련번호 Column -->
                      <DxColumn 
                        data-field="ilNo" 
                        :caption="$t('ilNo')" 
                        data-type="string" 
                        alignment="center" 
                        width="auto"
                        :allow-editing="false" 
                      />
                      <!-- 출하순번 Column -->
                      <DxColumn
                        data-field="no"
                        :caption="$t('shipmentNo')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      /> 
                      <!-- 품목군 Column -->
                      <DxColumn
                        data-field="itemType"
                        :caption="$t('itemGroup')"
                        data-type="string"
                        alignment="left"
                        width="auto"
                        :allow-editing="false"
                      >
                        <DxLookup 
                          :data-source="itemTypeList" 
                          display-expr="text" 
                          value-expr="value"
                        />
                      </DxColumn>
                      <!-- 제품군 Column -->
                      <DxColumn 
                        data-field="partType" 
                        :caption="$t('suite')"  
                        data-type="string" 
                        width="auto"
                        alignment="left" 
                        :allow-editing="false" 
                      >
                        <DxLookup 
                          :data-source="partTypeListLookup" 
                          display-expr="text" 
                          value-expr="value" 
                        />
                      </DxColumn>                     
                      <!-- 품번 Column -->
                      <DxColumn
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="left" 
                        :allow-editing="false"
                      />
                      <!-- 품명 Column -->
                      <DxColumn 
                        data-field="partName" 
                        :caption="$t('partName')" 
                        width="auto"
                        data-type="string" 
                        alignment="left" 
                        :allow-editing="false" 
                      />
                      <!-- 규격 Column -->
                      <DxColumn
                        data-field="spec"
                        :caption="$t('spec')"
                        data-type="string"
                        width="auto"
                        alignment="left"
                        :allow-editing="false"
                      />
                      <!-- 단위 Column -->
                      <DxColumn
                        data-field="unit"
                        :customize-text="customizeText"
                        :caption="$t('partUnit')"
                        data-type="string"
                        width="auto"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- LOT Column -->
                      <DxColumn
                        data-field="lotNo"
                        :caption="$t('lotNo')"
                        data-type="string"
                        width="auto"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 전산번호 Column -->
                      <DxColumn
                        data-field="lotDetail"
                        :caption="$t('lotDetail')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                      <!-- 단가 Column -->
                      <DxColumn 
                        data-field="price" 
                        :customize-text="customizeText"
                        :caption="$t('price')" 
                        data-type="string" 
                        alignment="right" 
                        width="auto"
                        :allow-editing="false" 
                      />
                      <!-- 출하전재고량 Column -->
                      <DxColumn
                        data-field="stockQty"
                        :customize-text="customizeText"
                        caption="출하전재고량"
                        data-type="string"
                        width="auto"
                        alignment="right"
                        :allow-editing="false"
                      />
                      <!-- 출하량 Column -->
                      <DxColumn
                        data-field="qty"
                        :customize-text="customizeText"
                        :caption="$t('outQty')"
                        data-type="string"
                        alignment="right"
                        width="auto"
                        :allow-editing="false"
                      />
                      <!-- 금액 Column -->
                      <DxColumn
                        data-field="amount"
                        :customize-text="customizeText"
                        :caption="$t('amount')"
                        data-type="string"
                        alignment="right"
                        width="auto"
                        :allow-editing="false"
                      />
                      <!-- 등록일 Column -->
                      <DxColumn
                        data-field="makeDate"
                        :caption="$t('regiDate')"
                        data-type="string"
                        width="auto"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 등록자 Column -->
                      <DxColumn
                        data-field="maker"
                        :customize-text="customizeText"
                        :caption="$t('maker')"
                        data-type="string"
                        width="auto"
                        alignment="center"
                        :allow-editing="false"
                      />                      
                      <!-- 수정일 Column -->
                      <DxColumn
                        data-field="editDate"
                        :caption="$t('editDate')"
                        data-type="string"
                        width="auto"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 수정자 Column -->
                      <DxColumn
                        data-field="editor"
                        :customize-text="customizeText"
                        :caption="$t('editor')"
                        data-type="string"
                        width="auto"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                      <DxGrouping :auto-expand-all="autoExpandAll" />
                      <DxPaging :enabled="false" />
                      <DxSelection mode="single" :allow-select-all="false" />
                      <DxPager :show-page-size-selector="false" />
                      <DxSummary>
                        <DxGroupItem column="OrderNumber" summary-type="count" display-format="{0} orders" />
                        <DxGroupItem
                          :show-in-group-footer="true"
                          column="orderQty"
                          summary-type="sum"
                          :customize-text="customizeText"
                          display-format="Total: {0}"
                        />
                        <DxGroupItem
                          :show-in-group-footer="true"
                          column="qty"
                          summary-type="sum"
                          :customize-text="customizeText"
                          display-format="Total: {0}"
                        />
                        <DxTotalItem 
                          column="orderQty" 
                          summary-type="sum" 
                          :customize-text="customizeText" 
                          display-format="Total: {0}" 
                        />
                        <DxTotalItem 
                          column="qty" 
                          summary-type="sum" 
                          :customize-text="customizeText" 
                          display-format="Total: {0}" 
                        />
                      </DxSummary>
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>            
          </v-tab-item>
          <v-tab-item>
            <!-- 기타출고현황 Grid -->
            <i-card-vertical 
              headerTitle="■ 기타출고현황" 
              :useBtnList="['btnDelete','btnExcel']" 
              @btnDelete="btnDeleteOtherGrid()"
              @btnExcel="btnExcelOtherGrid()"
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="otherGrid"
                      class="listBox07"
                      :ref="otherGridRef"
                      :data-source="otherGrid"
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
                      column-resizing-mode="widget"
                    >
                      <!-- id Column -->
                      <DxColumn
                        data-field="id"
                        caption="No"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="false"
                      />
                      <!-- 공장코드 Column -->
                      <DxColumn 
                        data-field="facCode" 
                        :allow-editing="false" 
                        :caption="$t('facName')" 
                        width="auto" 
                        data-type="string" 
                        alignment="center"
                      >
                        <DxLookup 
                          :data-source="facCodeList" 
                          display-expr="text" 
                          value-expr="value"
                        />
                      </DxColumn>
                      <!-- 출하일 Column -->
                      <DxColumn
                        data-field="outDate"
                        :caption="$t('outDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 거래처명 Column -->
                      <DxColumn 
                        data-field="custName" 
                        :allow-editing="false" 
                        :caption="$t('custName')" 
                        width="auto" 
                        data-type="string" 
                        alignment="center"
                      />
                      <!-- 출하 일련번호 Column -->
                      <DxColumn 
                        data-field="ilNo" 
                        :caption="$t('ilNo')" 
                        width="auto" 
                        data-type="string" 
                        alignment="center" 
                        :allow-editing="false" 
                      />
                      <!-- 출하순번 Column -->
                      <DxColumn
                        data-field="no"
                        :caption="$t('shipmentNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="true"
                      /> 
                      <!-- 품목군 Column -->
                      <DxColumn
                        data-field="itemType"
                        :caption="$t('itemGroup')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup 
                          :data-source="itemTypeList" 
                          display-expr="text" 
                          value-expr="value"
                        />
                      </DxColumn>
                      <!-- 제품군 Column -->
                      <DxColumn 
                        data-field="partType" 
                        :caption="$t('suite')" 
                        width="auto" 
                        data-type="string" 
                        alignment="center" 
                        :allow-editing="false" 
                      >
                        <DxLookup 
                          :data-source="partTypeListLookup" 
                          display-expr="text" 
                          value-expr="value" 
                        />
                      </DxColumn>                     
                      <!-- 품번 Column -->
                      <DxColumn
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="left" 
                        :allow-editing="false"
                      />
                      <!-- 품명 Column -->
                      <DxColumn 
                        data-field="partName" 
                        :caption="$t('partName')" 
                        width="auto" 
                        data-type="string" 
                        alignment="left" 
                        :allow-editing="false" 
                      />
                      <!-- 규격 Column -->
                      <DxColumn
                        data-field="spec"
                        :caption="$t('spec')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 단위 Column -->
                      <DxColumn
                        data-field="unit"
                        :customize-text="customizeText"
                        :caption="$t('partUnit')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- LOT Column -->
                      <DxColumn
                        data-field="lotNo"
                        :caption="$t('lotNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 전산번호 Column -->
                      <DxColumn
                        data-field="lotDetail"
                        :caption="$t('lotDetail')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 단가 Column -->
                      <DxColumn 
                        data-field="price" 
                        :customize-text="customizeText"
                        :caption="$t('price')" 
                        width="auto" 
                        data-type="string" 
                        alignment="right" 
                        :allow-editing="false" 
                      />
                      <!-- 출하전재고량 Column -->
                      <DxColumn
                        data-field="stockQty"
                        :customize-text="customizeText"
                        caption="출하전재고량"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="false"
                      />
                      <!-- 출하량 Column -->
                      <DxColumn
                        data-field="qty"
                        :customize-text="customizeText"
                        :caption="$t('outQty')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="false"
                      />
                      <!-- 금액 Column -->
                      <DxColumn
                        data-field="amount"
                        :customize-text="customizeText"
                        :caption="$t('amount')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="false"
                      />
                      <!-- 등록일 Column -->
                      <DxColumn
                        data-field="makeDate"
                        :caption="$t('regiDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />                      
                      <!-- 등록자 Column -->
                      <DxColumn
                        data-field="maker"
                        :customize-text="customizeText"
                        :caption="$t('maker')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />                      
                      <!-- 수정일 Column -->
                      <DxColumn
                        data-field="editDate"
                        :caption="$t('editDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <!-- 수정자 Column -->
                      <DxColumn
                        data-field="editor"
                        :customize-text="customizeText"
                        :caption="$t('editor')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                      <DxGrouping :auto-expand-all="autoExpandAll" />
                      <DxPaging :enabled="false" />
                      <!-- <DxSelection mode="single" :allow-select-all="false" /> -->
                      <DxSelection
                        select-all-mode="allPages"
                        :show-check-boxes-mode="checkBoxesMode"
                        mode="multiple"
                      />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox
                          :value="cellInfo.value == 'Y' ? true : false"
                          :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                        />
                      </template>
                      <DxPager :show-page-size-selector="false" />
                      <DxSummary>
                        <DxGroupItem column="OrderNumber" summary-type="count" display-format="{0} orders" />
                        <DxGroupItem
                          :show-in-group-footer="true"
                          column="orderQty"
                          summary-type="sum"
                          :customize-text="customizeText"
                          display-format="Total: {0}"
                        />
                        <DxGroupItem
                          :show-in-group-footer="true"
                          column="qty"
                          summary-type="sum"
                          :customize-text="customizeText"
                          display-format="Total: {0}"
                        />
                        <DxTotalItem 
                          column="orderQty" 
                          summary-type="sum" 
                          :customize-text="customizeText" 
                          display-format="Total: {0}" 
                        />
                        <DxTotalItem 
                          column="qty" 
                          summary-type="sum" 
                          :customize-text="customizeText" 
                          display-format="Total: {0}" 
                        />
                      </DxSummary>
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>             
          </v-tab-item>        
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import themes from 'devextreme/ui/themes'
import {
  DxDataGrid,
  DxColumn,
  DxLookup,
  DxGroupItem,
  DxSummary,
  DxGrouping,
  DxGroupPanel,
  DxSortByGroupSummaryInfo,
  DxTotalItem,
} from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import baseview from '@/components/base/baseview.vue' // base page 추가

import notify from 'devextreme/ui/notify' // message
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getFactoryInfoData } from '@/api/view/bas0030'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'
import { getCmChildCode } from '@/api/system/cmCodeManage' //공통코드
import { getCustomName } from '@/api/view/bas0310'
import { getSal0220, getSal0220OtherRelease, deleteSal0220OhterRelease } from '@/api/view/sal0220'

export default {
  name: 'sal0220',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxTotalItem,
    DxGrouping,
    DxLookup,
    DxSummary,
    DxGroupItem,
    DxGroupPanel,
  },

  data() {
    return {
      //콤보박스
      facCodeList: [],
      custCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      partTypeListLookup:[],
      ordStateList: [],
      startDate: getDateFormat(new Date(new Date().setDate(new Date().getDate() - 7))),
      endDate: getDateFormat(new Date()),
      menu1: '',
      menu2: '',

      //검색조건
      facCodeSelect: '',
      custCodeSelect: '',
      partNo: '',
      itemTypeSelect: '',
      partTypeSelect: '',
      custCode: '',
      ordNo: '',

      //그리드
      mainGrid: [],
      otherGrid: [],
      //ref
      mainGridRef: 'mainGridRef',
      otherGridRef: 'otherGridRef',

      autoExpandAll: true,
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

    }
  },

  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },

    gridOtherInstance() {
      return this.GetDataGrid(this.otherGridRef)
    },
  },

  methods: {
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },

    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
      console.log("startDate:::", this.e)
    },

    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
      console.log("endDate:::", this.e)
    },

    btnSearch() {
      this.doSearhMainGrid()
      this.doSearchOtherGrid()
    },

    btnExcelMainGrid() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '■ 출하실적현황.xlsx') // 엑셀파일 만듬
    },

    btnDeleteOtherGrid() {
      this.vToastifyPrompt(
        '선택한 항목들의 출고를 삭제 하시겠습니까?',
        'info',
        current => {
          this.doDeleteOtherShipment()
        },
        null,
        true
      )
    },

    btnExcelOtherGrid() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('otherGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '■ 기타출고현황.xlsx') // 엑셀파일 만듬
    },

    async comboListSet() {
      let cmChildRes = await getCmChildCode({
        comCode: getComCode(),
        code: 'ORD_STATE,ITEM_TYPE,PART_TYPE',
      })

      let custRes = await getCustomName({
        comCode: getComCode(),
        custCode: '',
        custType: '',
      })

      let facRes = await getFactoryInfoData({ comCode: getComCode() })
      facRes.list.forEach((e) => {
        this.facCodeList.push({
          text: e.facName,
          value: e.facCode,
        })
      })

      this.facCodeSelect = this.facCodeList[0].value
      custRes.list.forEach((e) => {
        this.custCodeList.push({
          value: e.custCode,
          text: e.custName,
        })
      })

      cmChildRes.list
        .filter((word) => word.code === 'ORD_STATE')
        .forEach((e) => {
          this.ordStateList.push({
            value: e.sysCode,
            text: e.sysName,
          })
        })

      cmChildRes.list
        .filter((word) => word.code === 'ITEM_TYPE')
        .forEach((e) => {
          this.itemTypeList.push({
            value: e.sysCode,
            text: e.sysName,
          })
        })

      cmChildRes.list
        .filter((word) => word.code === 'PART_TYPE')
        .forEach((e) => {
          this.partTypeList.push({
            value: e.sysCode,
            text: e.sysName,
          })
          this.partTypeListLookup.push({
            value: e.sysCode,
            text: e.sysName,
          })
        })
    },

    async doSearhMainGrid() {
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect,
          custCode: this.custCode,
          partNo: this.partNo,
          itemType: this.itemTypeSelect,
          partType: this.partTypeSelect,
          ordNo: this.ordNo,
          startDate:this.startDate,
          endDate:this.endDate,
        }
        
        this.openLoading()
        let cnt = 0
        let resData = await getSal0220(params)
        resData.list.forEach((e) => {
          e.id = cnt++
        })
        this.mainGrid = resData.list
        this.gridMainInstance.saveEditData()
        this.endLoading()
      } catch (error1) {
        notify(error1, 'error', 1500)
        this.endLoading()
      }
    },

    async doSearchOtherGrid() {
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        custCode: this.custCode,
        partNo: this.partNo,
        itemType: this.itemTypeSelect,
        partType: this.partTypeSelect,
        ordNo: null,
        startDate:this.startDate,
        endDate:this.endDate,
      }
      
      this.openLoading()
      let cnt = 0

      getSal0220OtherRelease(params)
        .then(resData => {
          if (resData.success) {
            resData.list.forEach((e) => {
              e.id = cnt++
            })

            this.otherGrid = resData.list            
          }
        })
        .catch((error2) => {
          notify(error2, 'error', 1500)
        })
        .finally(() => {
          this.gridOtherInstance.saveEditData()
          this.endLoading()
        })
    },

    async doDeleteOtherShipment() {
      this.gridOtherInstance.saveEditData()
      var selectedStatusRows = await this.gridOtherInstance.getSelectedRowsData()

      if (selectedStatusRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
          return    
      }

      deleteSal0220OhterRelease(selectedStatusRows)
        .then(res => {
          notify(this.$t('Saved'), 'success', 3000)
          this.gridOtherInstance.clearSelection()
        })
        .catch(error => {
          notify(error, 'error', 3000)
        })
        .finally(() => {
          this.doSearchOtherGrid()
        })
    },
  },

  beforeMount() {
  },

  mounted() {
    this.comboListSet().then(() => {
      this.doSearhMainGrid()
      this.doSearchOtherGrid()
    })
  },

}
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar {
  display: block !important;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-after {
  display: none !important;
}
</style>
