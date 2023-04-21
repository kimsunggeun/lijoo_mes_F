<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="[
          'btnSearch' //조회
        ]" @btnSearch="btnSearchMain()">
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mt-2" v-model="searchFacCode"
                  label="공장명" :items="facCodeList" item-text="text" item-value="value" :prepend-inner-icon="'$search'"
                  dense outlined />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mt-2" v-model="searchCustCode"
                  label="거래처명" :items="custCodeList" item-text="text" item-value="value" :prepend-inner-icon="'$search'"
                  dense outlined clearable />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="startDate"
                  transition="scale-transition" offset-y max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field label="수주일" v-model="startDate" dense outlined readonly v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable @input="dateInput" :day-format="(date) => { return new Date(date).getDate(); }"/>
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="endDate"
                  transition="scale-transition" offset-y max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field label="~" v-model="endDate" outlined dense readonly v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" :min="startDate" no-title scrollable @input="dateInput2" :day-format="(date) => { return new Date(date).getDate(); }"/>
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="4" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical headerTitle="orderStatus" :useBtnList="[]">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid 
                   id="ordStatusInfo" 
                   class="doubleListBox03" 
                   :ref="ordStatusInfoRef"
                   :data-source="ordStatusInfo" 
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
                   :column-hiding-enabled="false" 
                   :focused-row-key="focusedRowKey"
                   @focused-row-changed="focusedRowChanged_orderSelect"
                   >
                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="regiDate" :caption="$t('ordDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="custCode" display-expr="custName" value-expr="custCode" />
                    </DxColumn>
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false" />
                    <DxColumn/>
                    <DxSelection show-check-boxes-mode="none" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
      <v-col cols="8" class="pa-0">
        <i-card-vertical headerTitle="deliStatus" :useBtnList="[
          'btnDeliAdd' //추가         //구매발주정보상세
        ]" @btnDeliAdd="btnDeliAdd()">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                 id="deliStatusInfo" 
                 class="doubleListBox03" 
                 :ref="deliStatusInfoRef"
                 :data-source="deliStatusInfo" 
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
                 :column-hiding-enabled="false" 
                 :focused-row-key="deliStatusFocusKey"
                 @focused-row-changed="focusedRowChanged_DeliSelect">
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" :visible="false" />
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" :visible="false" />
                  <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="true" />
                  <DxColumn data-field="no" :caption="$t('number')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="deliDate" :caption="$t('deliDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="stockQty" :caption="$t('stockQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" :visible="false" />
                  <DxColumn data-field="qty" :caption="$t('ordQty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="amount" :caption="$t('amount')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="inQty" :caption="$t('inQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="remQty" :caption="$t('remQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="waitQty" :caption="$t('waitQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="retQty" :caption="$t('retQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false" />
                  <DxColumn/>
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection select-all-mode="allPages" mode="multiple" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-tabs>
        <v-tab @click="tabChange('구매입고등록')">{{ $t('deliReg') }}</v-tab>
        <v-tab @click="tabChange('구매입고정보상세')">{{ $t('deliInfo') }}</v-tab>
        <v-tab-item>
          <i-card-vertical headerTitle="purchWarinReg" :useBtnList="[
            'btnSave', 'btnDelete' //저장, 삭제
          ]" @btnSave="btnSave('구매입고등록')" @btnDelete="btnDelete('구매입고등록')">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid 
                   id="deliRegInfo" 
                   class="doubleListBox05" 
                   :ref="deliRegInfoRef" 
                   :data-source="deliRegInfo"
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
                   :column-hiding-enabled="false" 
                   >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxColumn data-field="id" :caption="$t('id')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" :visible="true" />
                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false" />
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" :visible="false" />
                    <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" :visible="true" />
                    <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" :visible="true" />
                    <DxColumn data-field="no" :caption="$t('number')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" width="auto" data-type="date" alignment="center" :allow-editing="true" format="yyyy-MM-dd" :set-cell-value="setRegiDate" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="ilNo" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="inType" :caption="$t('inType')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="inWh" :caption="$t('locName')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                      <DxLookup :data-source="locCode" display-expr="inWhname" value-expr="inWhcode" />
                    </DxColumn>
                    <DxColumn data-field="qty" :caption="$t('remOrdQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="inQty" :caption="$t('inQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="true" :set-cell-value="setQtyValue" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="makeQty" :caption="$t('makeQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="true" :set-cell-value="setMakeQtyValue" />
                    <DxColumn data-field="boxQty" :caption="$t('boxQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="inPrice" :caption="$t('inPrice')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="true" :set-cell-value="setInPriceValue" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="inAmount" :caption="$t('inAmount')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="remQty" :caption="$t('remQty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="inStatus" :caption="$t('status')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="inStatus" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn data-field="remark" :caption="$t('remark')" width="auto" data-type="string" alignment="left" :allow-editing="true" />
                    <DxColumn data-field="printType" :caption="$t('printType')" width="auto" data-type="string" alignment="left" :allow-editing="true" />
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd" />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn/>
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item>
          <i-card-vertical headerTitle="purchWarinRegDetail" :useBtnList="['btnDelete']"
            @btnDelete="btnDelete('구매입고정보상세')">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid 
                   id="deliInfo" 
                   class="doubleListBox05" 
                   :ref="deliInfoRef" 
                   :data-source="deliInfo"
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
                   column-resizing-mode="widget"
                   :column-hiding-enabled="false"
                   @focused-row-changed="focusedRowChanged_deliInfo"
                   >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="ordNo" :caption="$t('ordNo_mat0020')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="no" :caption="$t('number')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="regiDate" :caption="$t('inRegiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="ilNo" caption="입고번호(일련번호)" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="serialNo" :caption="$t('serialNo')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="inWh" :caption="$t('locName')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="locCode" display-expr="inWhname" value-expr="inWhcode" />
                    </DxColumn>
                    <DxColumn data-field="lotNo" :caption="$t('purchLotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="lotDetail" :caption="$t('purchLotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="qty" :caption="$t('qty')" width="auto" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="supplyYn" :caption="$t('supplyYn')" width="auto" data-type="boolean" edit-cell-template="checkBoxEditor" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="inInspYn" :caption="$t('waitQtyYn')" width="auto" data-type="boolean" edit-cell-template="checkBoxEditor" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500px" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="printType" :caption="$t('printType')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" cell-template="checkBoxEditor"/>
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn/>
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)"></DxCheckBox>
                    </template>
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection :allowSelectAll="false" select-all-mode="allPages" mode="multiple" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { getMat0010Info, createMat0010, getAccount } from '@/api/view/mat0010'
import { getMat0011Info, createMat0011 } from '@/api/view/mat0011'
import { getMat0012Info, createMat0012, deleteMat0012 } from '@/api/view/mat0012'
import { getMat0018Info, createMat0018, deleteMat0018 } from '@/api/view/mat0018'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getInWhcodeName } from '@/api/view/bas0042'
export default {
  name: 'sal0010',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    ICardTop,
    DxLookup
  },
  data() {
    return {
      focusedRowKey: -1,  //구매발주정보 포커스 키
      deliStatusFocusKey: -1,   //구매발주정보 상세 포커스 키
      ordStatusInfo: [], //구매 발주정보
      deliStatusInfo: [], //구매 발주정보 상세
      deliRegInfo: [], //구매 입고 등록
      deliInfo: [], //구매 입고정보 상세
      ordStatusInfoRef: 'OrdStatuseInfoRef',
      deliStatusInfoRef: 'deliStatusInfoRef',
      deliRegInfoRef: 'deliRegInfoRef',
      deliInfoRef: 'deliInfoRef',
      reqDtFrom: getPreMonth(0),
      reqDtTo: getPreMonth(-2),
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },

      ordStatusInfoData: [], //발주현황 데이터
      deliStatusInfoData: [], //납품현황 데이터

      facCodeList: [],
      custCodeList: [],
      searchFacCode: '',
      searchCustCode: '',
      makeQty: [],
      lotSizeData: [],
      startDate: getPreMonth(2),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',

      registGridArray: [],

      custCode: [],
      inStatus: [],
      locCode: [],
      tabKey: 0,
      firstData: '',
      rowIndex: '',
 
      selectedCustCode: '',
    }
  },
  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y'
    }

    //검사유형
    let params2 = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_STATE',
      userFlag: 'Y'
    }

    //창고위치
    let params3 = {
      comCode: getComCode()
    }

    Promise.all([getAccount(params), getCmChildCode(params2), getInWhcodeName(params3)])
      .then(res => {
        this.custCode = res[0].list.slice()
        this.inStatus = res[1].list.slice()
        this.locCode = res[2].list.slice()
      })
      .catch(error => { })
  },
  created() {
    //공장명 조회조건
    const comCodeData = {
      comCode: getComCode()
    }
    getFactoryInfoData(comCodeData).then(res => {
      res.list.forEach(e => {
        this.facCodeList.push({
          value: e.facCode,
          text: e.facName
        })
      })
      this.searchFacCode = res.list[0].facCode
    })

    const custCodeData = {
      comCode: getComCode()
    }
    getAccount(custCodeData).then(res => {
      res.list.forEach(e => {
        this.custCodeList.push({
          value: e.custCode,
          text: e.custName
        })
      })
    })
  },
  computed: {
    ordStatusInstance() {
      return this.GetDataGrid(this.ordStatusInfoRef)
    },
    deliStatusInstance() {
      return this.GetDataGrid(this.deliStatusInfoRef)
    },
    deliRegInstance() {
      return this.GetDataGrid(this.deliRegInfoRef)
    },
    deliInfoInstance() {
      return this.GetDataGrid(this.deliInfoRef)
    }
  },
  watch: {
    focusedRowKey: function (value) {
      if (value > -1) {
        let array = this.ordStatusInfo
        let index = value
        this.doSearchDeliStatus(array[index])
      }
    },
    deliStatusFocusKey: function (value) {
      if (value > -1) {
        let array = this.deliStatusInfo
        let index = value
        this.doSearchDeliInfo(array[index])

      }
    }
  },
  mounted() { },
  methods: {
    btnSearchMain() {
      this.doSearchMain()
      this.registGridArray = []
    },
    //------------------------------------------------------------------------조회버튼-------------------------------------------------------------------------------------//
    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },
    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },

    /////////////////////////////////////////////구매 발주정보 조회/////////////////////////////////////////////
    async doSearchMain() {
      try {
        this.ordStatusInfo = []
        this.focusedRowKey = -1  // 포커스 취소
        this.deliStatusInfo = []
        this.deliInfo = []
        this.openLoading('searching')
        let params = {
          comCode: getComCode(),
          facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
          custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
          startDate: this.startDate == null ? '' : this.startDate,
          endDate: this.endDate == null ? '' : this.endDate,
          ordState: '20'
        }
        let cnt = 0
        let res = await getMat0010Info(params)
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.ordStatusInfo = res.list
          if (this.ordStatusInfo.length) {
            this.focusedRowKey = 0
          } else {
            this.ordStatusInfoData = []
            this.deliStatusInfoData = []
        }
        this.ordStatusInstance.clearSelection()

      } catch (error) {
        console.log('doSearchMain(error)')
      } finally {
        this.endLoading()
      }
    },
    /////////////////////////////////////////////구매 발주정보 포커스 로우 체인지/////////////////////////////////////////////
    focusedRowChanged_orderSelect(e) {
      this.focusedRowKey = e.component.option('focusedRowKey')
      this.selectedCustCode = e.row.data.custCode
      // console.log('test',e)
      // if (e.row) {
      //   this.doSearchDeliStatus(e.row.data)
      // }
    },

    /////////////////////////////////////////////구매 발주정보 상세 조회/////////////////////////////////////////////
    async doSearchDeliStatus(data) {
      let obj = {}
      if (data) {

        obj = data
        // 구매 입고정보 상세 데이터
      } else {
        obj = this.deliStatusInfo[this.deliStatusFocusKey]
      }
      let params = {
        comCode: getComCode(),
        facCode: obj.facCode,
        regiDate: obj.regiDate,
        ordNo: obj.ordNo,
        no: obj.no
      }
      this.deliInfo = []
      this.deliStatusFocusKey = -1
      this.openLoading('searching')
      getMat0011Info(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
		
        this.deliStatusInfo = res.list

          if (this.deliStatusInfo.length) {
            this.deliStatusFocusKey = 0
          }
          if(this.rowIndex){
            this.deliStatusFocusKey = this.rowIndex
          }
        this.deliStatusInstance.clearSelection()
      }).catch(error => { 
        notify(error, 'error', 3000)
        this.registGridArray = []
      }).
      finally(() => {
        this.endLoading()
      })
    },
    /////////////////////////////////////////////구매 발주정보 상세 포커스 로우 체인지/////////////////////////////////////////////

    async focusedRowChanged_DeliSelect(e) {
      this.deliStatusFocusKey = e.component.option('focusedRowKey')

      this.rowIndex = e.rowIndex
      // if (e.row === undefined) {
      //   return
      // }
      this.deliStatusInfoData = e.row.data
      // this.deliStatusInfoData.ordNo = this.ordStatusInfoData.ordNo
      // this.doSearchDeliInfo()
    },
    focusedRowChanged_deliInfo(e){
      this.deliInfoInstance.option('selectionFilter', ['id', '=', e.row.key])
    },
    doSearchDeliReg() {
      this.deliRegInfo = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.deliStatusInfoData.facCode,
        regiDate: this.deliStatusInfoData.regiDate,
        ordNo: this.deliStatusInfoData.ordNo,
        no: this.deliStatusInfoData.no
      }
      getMat0012Info(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.deliRegInfoData = res.list

        //this.deliRegInfo = res.list
      })
    },
    doSearchDeliInfo(data) {
      if(this.tabKey == 0){
        return
      }
      let obj = {}
      if(data){
         obj = data
        // 구매 입고정보 상세 데이터
      }else{
         obj = this.deliStatusInfo[this.deliStatusFocusKey]
      }
      if (obj === undefined) {
        return
      }
        let params = {
        comCode: getComCode(),
        facCode: obj.facCode,
        regiDate: obj.regiDate,
        ordNo: obj.ordNo,
        no: obj.no
      }
      this.deliInfo = []
      this.openLoading('searching')

      getMat0018Info(params)
        .then(res => {
          this.deliInfo = res.list
          this.deliInfoInstance.clearSelection()
        })
        .finally(() => {
          this.endLoading()
        })
     
    },
    //------------------------------------------------------------------------추가버튼-------------------------------------------------------------------------------------//
    async btnDeliAdd() {
      let selectedMainRows = await this.deliStatusInstance.getSelectedRowsData()
      if (selectedMainRows.length === 0) {
        notify(this.$t('mat0012AddCheck'), 'error')
        return
      }

      for (let i = 0; i < selectedMainRows.length; i++) {
        if (selectedMainRows[i].remQty === '0') {
          notify(this.$t('추가할 납품잔량이 없습니다'), 'error')
          return
        }

        if (this.deliRegInfo.length > 0) {
          const custCodeFound = this.deliRegInfo.find(
          x => x.custCode === this.selectedCustCode)

          if (custCodeFound === undefined) {
            notify('다른 거래처의 항목은 추가할 수 없습니다', 'error')
            return
          }
        }

        const ordFound = this.deliRegInfo.find(
          x => x.ordNo === selectedMainRows[i].ordNo && x.no === selectedMainRows[i].no)

        if (ordFound !== undefined) {
          notify('발주번호와 발주순번이 동일한 항목은 추가할 수 없습니다', 'error')
          return
        }
      }

      for (let i = 0; i < selectedMainRows.length; i++) {
        // let newInsert = {
        //   custCode: this.selectedCustCode,
        //   ordNo: selectedMainRows[i].ordNo,
        //   no: selectedMainRows[i].no
        // }
        // this.registGridArray.push(newInsert)

        var newRow = {
          id: this.deliRegInfo.length + 1,
          comCode: getComCode(),
          facCode: selectedMainRows[i].facCode,
          custCode: this.selectedCustCode,
          ordNo: selectedMainRows[i].ordNo,
          no: selectedMainRows[i].no,
          regiDate: getCurrentDate(),
          ilNo: '',
          inType: '구매입고',
          partNo: selectedMainRows[i].partNo,
          partName: selectedMainRows[i].partName,
          spec: selectedMainRows[i].spec,
          qty: selectedMainRows[i].remQty,
          inQty: '',
          makeQty: selectedMainRows[i].lotSize,
          boxQty: '',
          inPrice: selectedMainRows[i].price,
          inAmount: '',
          remark: '',
          printType: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          inStatus: selectedMainRows[i].inInsp == 'Y' ? '30' : '20',
          inWh: selectedMainRows[i].inWh,
          partType: selectedMainRows[i].partType,
          __created__: true,
          __modified__: false
        }

        this.deliRegInstance.newRow(newRow)
        this.deliRegInstance.selectRows(newRow.id, true)
        this.deliRegInstance.option('focusedRowIndex', 1)
        this.deliStatusInstance.clearSelection()
      }
    },

    //----------------------------------------------------------------------저장버튼-------------------------------------------------------------------------------------------//
    async btnSave(gbn) {
      if (gbn === '구매입고등록') {
        let messageGubun = ''
        this.deliRegInstance.saveEditData()
        this.deliStatusInstance.saveEditData()
        var selectedDetailRows = await this.deliRegInstance.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        for (var row of selectedDetailRows) {
          if(row.inQty <= 0){
            this.vToastify(this.$t('입고량은 1개 이상이어야 합니다.'), 'warn')
            return
          }
          if (!row.regiDate || !row.inQty || !row.inPrice) {
            this.vToastify(this.$t('필수항목 입력하세요 [입고일, 입고량, 입고단가]'), 'warn')
            return
          }
          if (row.__created__ === false) {
            messageGubun = 'doFixData'
            row.__modified__ = true
            row.comCode = getComCode()
            row.editor = getUserId()
          } else if (row.__created__ === true) {
            messageGubun = 'doSaveData'
            row.comCode = getComCode()
            row.maker = getUserId()
          }
          if (row.regiDate.length > 10) {
            row.regiDate = row.regiDate.substr(0, 10)
          }
        }

        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          current => {
            this.openLoading()
            this.deliRegInstance.beginUpdate()
            this.deliStatusInstance.beginUpdate()
            let cnt = 0

            createMat0012(selectedDetailRows, true)
              .then(res => {
                let message = ''
                message = selectedDetailRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 3000)
                this.registGridArray = []
                this.doSearchDeliStatus()
                this.registGridArray = []
                this.deliRegInfo = []
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.deliRegInstance.endUpdate()
                this.deliStatusInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //----------------------------------------------------------------------삭제버튼------------------------------------------------------------------------------------------//
    async btnDelete(gbn) {
      var selectedDetailRows = null;
      if (gbn === '구매입고등록') {
        this.deliRegInstance.saveEditData()
        selectedDetailRows = await this.deliRegInstance.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.doCancelRegist()
          },
          null,
          true
        )
      }
      else if (gbn === '구매입고정보상세') {
        this.deliInfoInstance.saveEditData()
        selectedDetailRows = await this.deliInfoInstance.getSelectedRowsData() // 구매입고등록 데이터
        for (let i = 0; i < selectedDetailRows.length; i++) {
          selectedDetailRows[i].custCode = this.selectedCustCode
        }
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        for(let i = 0; i < selectedDetailRows.length; i++){
          if(selectedDetailRows[i].supplyYn === 'Y'){
            notify('외주 입고 등록된 품목은 이 곳에서 삭제할 수 없습니다.', 'error', 3000)
            return
          }
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.deliInfoInstance.beginUpdate()
            deleteMat0018(selectedDetailRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 3000)
                this.registGridArray = []
                this.doSearchDeliStatus()
                this.doSearchDeliInfo()
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.deliInfoInstance.endUpdate()
                this.endLoading()      
              })
          },
          null,
          true
        )
      }
    },

    async doCancelRegist() {
      var selectedRegistRows = await this.deliRegInstance.getSelectedRowsData()

      for (let i = 0; i < selectedRegistRows.length; ++i) {
        for (let j = 0; j < this.deliRegInfo.length; ++j) {
          if (selectedRegistRows[i].id === this.deliRegInfo[j].id) {
            this.deliRegInfo.splice(j, 1)
            continue
          }
        }
      }

      let newId = 1

      for (var k = 0; k < this.deliRegInfo.length; ++k) {
        this.deliRegInfo[k].id = newId++
      }

      this.deliRegInstance.saveEditData()
      this.deliRegInstance.clearSelection()
    },

    //----------------------------------------------------------------------셀 클릭 이벤트---------------------------------------------------------------------------------------//
    //입고량 입력에 대한 이벤트
    setQtyValue(newData, value, currentRowData) {
      if (currentRowData.makeQty === '0' || currentRowData.makeQty === '') {
        //구성량이 0이거나 ''일때
        if (Number(currentRowData.qty) < value) {
          //입고량이 납품잔량보다 많을경우 납품잔량수를 넣음
          newData.inQty = currentRowData.qty
          return
        }
        //구성량이 0일때 입고량만 업데이트 됨
        newData.inQty = value
        return
      } else {
        //구성량엔 1 이상의 값이 들어있는 상태
        if (Number(currentRowData.qty) < value) {
          //입고량이 납품잔량보다 많을경우 납품잔량수를 넣음
          value = currentRowData.qty
        }
      }
      //구성량의 값이 1 이상이고 [구성량 <= 입고량 <= 납품잔량]일 경우
      newData.inQty = value
      newData.boxQty = Math.ceil(value / currentRowData.makeQty)
      newData.inAmount = Math.round(value * currentRowData.inPrice * 100) / 100
      //newData.inAmount = value * currentRowData.inPrice
      newData.remQty = currentRowData.qty - value
    },

    //구성량 입력에 대한 이벤트
    setMakeQtyValue(newData, value, currentRowData) {
      if (currentRowData.inQty === '0' || currentRowData.inQty === '') {
        //입고량이 0이거나 ''일때
        if (Number(currentRowData.qty) < value) {
          //구성량이 납품잔량보다 많을 경우 납품잔량수를 넣음
          value = currentRowData.qty
          return
        }
        //입고량이 0일때 구성량만 업데이트 됨
        newData.makeQty = value
        return
      } else {
        //입고량이 1 이상일 때
        if (Number(currentRowData.inQty) < Number(value)) {
          // 구성량이 입고량보다 많을 경우 입고량과 값이 같게
          value = currentRowData.inQty
        }
        if (value === '0') {
          value = 1
        }
        //입고량이 1 이상이며 구성량 <= 입고량, 구성량 <= 납품잔량일 경우
        newData.makeQty = value
        newData.boxQty = Math.ceil(currentRowData.inQty / value)
        newData.inAmount = currentRowData.inQty * currentRowData.inPrice
        newData.remQty = currentRowData.qty - currentRowData.inQty
      }
    },
    setInPriceValue(newData, value, currentRowData) {
      newData.inPrice = value
      newData.inAmount = value * currentRowData.inQty
    },
    tabChange(e){
      if(e === '구매입고등록'){
        this.tabKey = 0
      } else {
        this.tabKey = 1
        this.doSearchDeliInfo()
      }
    },
    setRegiDate(newData, value, currentRowData) {
      this.deliRegInstance.beginUpdate()
      this.deliRegInfo.forEach(element => {
        element.regiDate = getDateFormat(value)
      })
      this.deliRegInstance.endUpdate()
    }
  }
}
</script>
<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>