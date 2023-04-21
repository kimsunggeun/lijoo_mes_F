<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top class="d-md-flex" outlined :useBtnList="[
          'btnSearch', //조회
        ]" @btnSearch="btnSearchMain()">
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1"
                    :items="facCodeList" v-model="searchValue.facCode" item-text="text" item-value="value" :prepend-inner-icon="$t('$search')" :label="$t('facName')" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mx-1"
                   :items="custCodeList" v-model="searchValue.custCode" item-text="text" item-value="value" :prepend-inner-icon="$t('$search')" :label="$t('custName')" dense clearable outlined>
                  </v-autocomplete>
                </v-col>
                  <v-col cols="12" md="2" class="mr-2">
                    <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="mx-1"
                    :items="partTypeList" v-model="searchValue.partType" item-text="text" item-value="value" :prepend-inner-icon="$t('$search')" :label="$t('partType')" dense outlined>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="mr-2">
                    <v-text-field v-model="searchValue.partName" :label="$t('partName')" dense outlined hide-details="auto"
                      :prepend-inner-icon="$t('$search')"  class="mx-1" clearable />
                  </v-col>
                </v-row>
                <v-row no-gutters class="center pa-2 mr-0">
                  <v-col cols="12" md="2" class="mt-0 mr-2">
                    <v-menu
                      ref="frDeliDateCal"
                      v-model="frDeliDateCal"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :prepend-inner-icon="'$search'"
                          :label="$t('outDate')"
                          v-model="searchValue.frDeliDate"
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
                        v-model="searchValue.frDeliDate" 
                        no-title 
                        @input="frDeliDateCal = false" 
                        :day-format="(date) => { return new Date(date).getDate(); }" 
                      />
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="2" class="mt-0 mr-2">
                    <v-menu
                      ref="toDeliDateCal"
                      v-model="toDeliDateCal"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :prepend-inner-icon="'$search'"
                          :label="$t('endDate')"
                          v-model="searchValue.toDeliDate"
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
                        v-model="searchValue.toDeliDate" 
                        no-title 
                        @input="toDeliDateCal = false" 
                        :day-format="(date) => { return new Date(date).getDate(); }" 
                      />
                    </v-menu>
                  </v-col>
                </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2">
        <i-card-vertical 
          headerTitle="shippingStatement" 
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="mainInfo" 
                  class="doubleListBox04" 
                  key-expr="id" 
                  :data-source="mainGrid"
                  :ref="mainGridRef"
                  column-resizing-mode="widget"
                  :remote-operations="false" 
                  :hover-state-enabled="true" 
                  :allow-column-resizing="true"
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true" 
                  :show-borders="true"
                  :width="grid.width" 
                  :show-row-lines="true" 
                  :focused-row-enabled="true"
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  @focused-row-changed="focusedRowChanged_status"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection show-check-boxes-mode="always" mode="multiple" />
                  <DxPager :show-page-size-selector="false" />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :visible="false"
                  />                  
                  <!-- 거래처명 Column -->
                  <!-- <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                  </DxColumn>    -->
                  <DxColumn 
                    data-field="custName" 
                    :caption="$t('custName')" 
                    width="auto" 
                    data-type="string" 
                    alignment="left"
                    :allow-editing="false" 
                  />                  
                  <!-- 수주번호 Column -->
                  <DxColumn 
                    data-field="ordNo" 
                    :caption="$t('ordNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    />
                  <!-- 순번 Column -->
                  <DxColumn
                    data-field="no"
                    :caption="$t('number')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                  />                  
                  <!-- 출하일 Column -->
                  <D<DxColumn 
                    data-field="outDate" 
                    :caption="$t('outDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false" 
                  />
                  <!-- (출하번호)일련번호 Column -->
                  <DxColumn
                    data-field="ilno"
                    :caption="$t('shippingNumber')"
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
                    alignment="left"
                    :allow-editing="false" 
                  />
                  <!-- 출하량 Column -->
                  <DxColumn 
                    data-field="qty" 
                    :caption="$t('outQty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="right"
                    :allow-editing="false" 
                  />      
                  <!-- 단위 Column -->
                  <DxColumn 
                    data-field="unit" 
                    :caption="$t('partUnit')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false" 
                  />
                                   <!-- 등록자 Column -->
                  <DxColumn 
                    data-field="maker" 
                    :caption="$t('maker')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 등록일 Column -->
                  <DxColumn 
                    data-field="makeDate" 
                    :caption="$t('makeDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 수정자 Column -->
                  <DxColumn 
                    data-field="editor" 
                    :caption="$t('editor')" 
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
                  <!-- 비고 Column -->
                  <DxColumn 
                    data-field="remark" 
                    :caption="$t('remark')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />                       
                  <DxColumn/>
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" class="pa-2">
        <i-card-vertical 
          headerTitle="inspectionDetails"
          :useBtnList="['btnSave', 'btnCancel']"
          @btnSave="btnSave('저장')"
          @btnCancel="btnCancel('취소')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="shptChkInfo" 
                  class="doubleListBox04" 
                  :data-source="insGrid"
                  :ref="insGridRef"
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
                  :column-hiding-enabled="false"
                  :selection="{ mode:'none' }"
                  @editing-start="editingStart"
                  @cellPrepared="cellPrepared"
                  @FocusedCellChanged="onRowUpdated"
                  >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxEditing mode="cell" />

                  <DxColumn 
                    data-field="comCode" 
                    :caption="$t('comCode')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                    :visible="false"
                  />

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
                  <DxColumn
                    data-field="inspNo"
                    :caption="$t('inspNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />                                    
                  <!-- 검사유형 Column -->
                  <DxColumn  
                    data-field="insCode" 
                    :caption="$t('insCode')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  >
                  <DxLookup
                      :data-source="insCodeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                  />
                  </DxColumn>
                  <!-- 검사항목 Column -->
                  <DxColumn 
                    data-field="insType" 
                    :caption="$t('insType')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  >
                  <DxLookup
                      :data-source="insTypeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>

                  <!-- 측정방법 Column -->           
                  <DxColumn 
                    data-field="insMeth" 
                    :caption="$t('insMeth')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  >
                  <DxLookup
                    :data-source="insMethList"
                    display-expr="sysName"
                    value-expr="sysCode"
                  />  
                  </DxColumn>
                  <!-- 판정방법 Column -->
                  <DxColumn 
                    data-field="jugCodeh" 
                    :caption="$t('jugCodeh')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false" 
                  >
                  <DxLookup
                      :data-source="jugCodehList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>                  
                  
                  <!-- 검사기준 Column -->
                  <DxColumn 
                    data-field="insBase" 
                    :caption="$t('insBase')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="insUnit"
                    :caption="$t('insUnit')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="insUnitList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>                  
                  <!-- 상한치 Column -->
                  <DxColumn 
                    data-field="insUpp" 
                    :caption="$t('insUpp')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 하한치 Column -->
                  <DxColumn 
                    data-field="insLow" 
                    :caption="$t('insLow')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                   <DxColumn
                      data-field="insBase"
                      :caption="$t('insBase')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />                  
                  <!-- 판정 Column -->
                  <DxColumn 
                    data-field="judge" 
                    :caption="$t('judge')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false" 
                  >
                  <DxLookup
                      :data-source="judgeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                      data-field="insCnt"
                      :caption="$t('insCnt')"
                      width="auto"
                      data-type="number"
                      alignment="right"
                      format="#,##0"
                      :allow-editing="false"
                    />
                  <!-- 시료 Column -->
                    <DxColumn data-field="sample" :caption="$t('sample')" alignment="center">
                      <DxColumn
                        data-field="sample1"
                        :caption="$t('sampleQty1')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample2"
                        :caption="$t('sampleQty2')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample3"
                        :caption="$t('sampleQty3')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample4"
                        :caption="$t('sampleQty4')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample5"
                        :caption="$t('sampleQty5')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                    </DxColumn>
                  <!-- (출하번호)일련번호 Column -->
                  <DxColumn
                    data-field="ilno"
                    :caption="$t('ilno')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 일련번호 순번 Column   -->
                  <DxColumn 
                    data-field="serialNo" 
                    :caption="$t('serialNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 출하번호 Column -->
                  <DxColumn 
                    data-field="dlvNo" 
                    :caption="$t('dlvNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />                  
                  <!-- 출하번호 순번(번호) Column -->
                  <DxColumn 
                    data-field="dlvSeq" 
                    :caption="$t('dlvSeq')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />                  
                  
                  <!-- 등록자 Column -->
                  <DxColumn 
                    data-field="maker" 
                    :caption="$t('maker')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 등록일 Column -->
                  <DxColumn 
                    data-field="makeDate" 
                    :caption="$t('makeDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 수정자 Column -->
                  <DxColumn 
                    data-field="editor" 
                    :caption="$t('editor')" 
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
                  <DxColumn data-field="inspDate" />
                  <DxColumn 
                    data-field="inspDate" 
                    :caption="$t('inspDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="inspTime" 
                    :caption="$t('inspTime')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                  />
                  <!-- 비고 Column -->
                  <DxColumn 
                    data-field="remark" 
                    :caption="$t('remark')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />                  
                  <template #myEditor="{ data : cellInfo }">
                      <DxSelectBox
                        v-if="cellInfo.data.jugCodeh == '10'"
                        :value="cellInfo.value"
                        :data-source="sampleList"
                        display-expr="sysName"
                        value-expr="sysCode"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                      <DxTextBox
                        v-else
                        :value="cellInfo.value"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                    </template>
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />

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
import iCardVertical from '@/components/common/iCardVertical.vue'
import { getAccount} from '@/api/system/accountManage'
import ISystemBar from '@/components/common/iSystemBar.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import DxSelectBox from 'devextreme-vue/select-box'
import DxTextBox from 'devextreme-vue/text-box'
import DxDateBox from 'devextreme-vue/date-box'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getQat0060, getInspection, createQat0060, deleteQat0060 } from '@/api/view/qat0060'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxLookup, DxScrolling, DxColumnFixing, DxGroupItem, DxSummary, DxTotalItem, DxEditing } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getWorkDate } from '@/api/view/bas0130'
import { getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getFacName } from '@/api/view/qat0010'
import { getCustCodeName } from '@/api/view/bas0044'
import themes from 'devextreme/ui/themes'
//  가상컬럼  계산값 로직 아직없음 [잔량]
export default {
  name: 'qat0060',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxLookup,
    ICardTop,
    DxEditing,
    DxSelectBox,
    DxTextBox
  },
  data() {
    return {
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      endDate: null,
      toDeliDateCal: false,
      frDeliDateCal: false,
      facCodeList: [],
      custCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      //검색 값
      searchValue: {
        comCode: getComCode(),
        facCode: '',
        custCode: '',
        partType: '',
        partName: '',
        frDeliDate: getPreMonth(2),
        toDeliDate: getDateFormat(new Date())
      },

      mainGrid: [],
      statusGrid: [],
      // 검사내역
      insGrid: [],
      mainGridRef: "mainGridRef",
      statusGridRef: "statusGridRef",
      insGridRef: "insGridRef",

      //LookUp
      comCodeList: [],
      // facCodeList: [],
      // custCodeList: [],
      insList: [],
      insCodeList: [],
      insTypeList: [],
      insMethList: [],
      jugCodehList: [],
      insUnitList: [],
      sampleList: [],
      judgeList: [],
      custCode: [],
    }
  },
  created() {
     this.lookupList()
  },
  beforeMount() {
    this.comboListSet()
  },
  mounted() {
    // this.doSearchMain(true)
  },
  watch: {
    frDeliDate: function (value) {
      if (new Date(value) > new Date(this.toDeliDate)) {
        this.toDeliDate = value
      }
    },
  },
  computed: {
    mainGridInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
    statusGridInstance() {
      return this.GetDataGrid(this.statusGridRef)
    },
    insGridInstance() {
      return this.GetDataGrid(this.insGridRef)
    },    

  },
  methods: {
    //LookUp 관련
    async lookupList() {
      //공장명
      const comCode = {
        comCode: getComCode()
      }
      //입고상태
      const inStatus = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'IN_STATE'
      }
      //검사유형 코드
      const insType = {
        comCode: getComCode(),
        code: 'INPT,INS_TYPE,INS_METH,JUG_CODEH,UNIT,SAMPLE,JUDGE'
      }
      const comCodeData = {
        comCode: getComCode()
      }
      getCompany(comCodeData).then(res => {
        res.list.forEach(e => {
          this.comCodeList.push({
            value: e.comCode,
            text: e.comName
          })
        })
        this.searchComCode = res.list[0].comCode
      })
      getFacName(comCodeData).then(res => {
        res.list.forEach(e => {
          this.facCodeList.push({
            value: e.facCode,
            text: e.facName
          })
        })
        this.searchFacCode = res.list[0].facCode
      })
      await Promise.all([getFacName(comCode), getCustCodeName(comCode), getCmChildCode(inStatus), getCmChildCode(insType)]).then(res => {
        //거래처
        let cnt = 0
        //입고상태
        this.insList = res[2].list
        //검사유형
        res[3].list
          .filter(word => word.code === 'INPT')
          .forEach(e => {
            this.insCodeList.push(e)
          })
        //검사항목
        res[3].list
          .filter(word => word.code === 'INS_TYPE')
          .forEach(e => {
            this.insTypeList.push(e)
            console.log(this.insTypeList,'asd')
          })
        //측정방법
        res[3].list
          .filter(word => word.code === 'INS_METH')
          .forEach(e => {
            this.insMethList.push(e)
          })
        //판정방법
        res[3].list
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push(e)
          })
        //검사단위
        res[3].list
          .filter(word => word.code === 'UNIT')
          .forEach(e => {
            this.insUnitList.push(e)
          })
        //시료
        res[3].list
          .filter(word => word.code === 'SAMPLE')
          .forEach(e => {
            this.sampleList.push(e)
          })
        //판정
        res[3].list
          .filter(word => word.code === 'JUDGE')
          .forEach(e => {
            this.judgeList.push(e)
          })
      })
    },


    addMenuItems(e) {
      this.totalTarget = e

      if (!e.component.__summaryIsNotAdded) {
        e.component.option('summary.totalItems', this.totalOption)
        e.component.__summaryIsNotAdded = true
      }
    },
    //엑셀 다운로드
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('mainGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '출하계획관리.xlsx') // 엑셀파일 만듬
    },
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
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },

    editingStart(e) {
      console.log('컬럼',e.cancel)
      let cnt = e.data.insCnt
      let sample = e.data.sample
      console.log('시료수',cnt)
      console.log('index', e.column.index)      
      // 만약 시료수(e.data.insCnt)의 수가 2라면 
      // cnt 개수 만큼 sample 컬럼이 수정되어야함
      // 컬럼으로 해당컬럼 수정되도록
      console.log('샘플 수량', e.sample.index);

      for (let i = 0; i < 5 - cnt; i++) {        
        // 5에서 2를 뺀 3보다 i값이 적을때만 for문 작동 (0,1,2)
        // console.log('cnt', cnt)
        if (e.column.index == 20 - i) {
          console.log('index2', e.column.index) 
          // 만약 컬럼 인덱스가 18-i인 17, 16, 15인 컬럼을
          e.cancel = true // 작성하지 못하게 막음
        }
      }
    },
    //검사내역 cellPrepared
    cellPrepared(e) {
      if (e.rowType === 'data') {
        let cnt = e.data.insCnt
        if (e.column.index > 15 && e.column.index <= 20) {
          if (e.column.index > 15 + parseInt(cnt) && e.column.index <= 20) {
            e.cellElement.style.backgroundColor = 'red'
          }
        }
      }
    },

    onRowUpdated(e) {
      //행이 업데이트 된 후 실행되는 함수(행의 어느 컬럼이든 값이 바뀌면 실행함)
      if (e.row.data.jugCodeh == '20') {
        //컬럼의 값을 바꿨는데 그게 판정방법이 치수인 행이라면
        //치수
        const Rpm = e.row.data // 입력된 값을 Rpm에 저장 (ex.시료1에 12 입력 => Rpm = 12)
        let arr = new Array(Rpm.insCnt) // insCnt(2) 크기만큼의 배열을 만듦

        for (let i = 1; i <= Rpm.insCnt; i++) {
          // i가 2보다 작거나 같을때까지 반복
          arr[i - 1] = Rpm['sample' + i] // arr[0]에 Rpm[sample+1]의 값을 넣음, arr[1]에 Rpm[sample+2]의 값을 넣음
        }
        let chk = arr.find(e => e === null)
        if (chk === undefined) {
          for (let i = 0; i < Rpm.insCnt; i++) {
            // Rpm.insCnt = 2 // 0,1, 2번반복
            if (typeof arr[i] !== 'undefined') {
              //만약 arr[0] 또는 arr[1]의 값이 undefined이 아니라면
              if (parseInt(Rpm.insUpp) < parseInt(arr[i]) || (parseInt(Rpm.insLow) > parseInt(arr[i]) && arr[i] != null)) {
                return this.insGridInstance.cellValue(e.row.key - 1, 'judge', 20)
              } else {
                this.insGridInstance.cellValue(e.rowIndex, 'judge', 10)
              }
            }
            if (arr[i] === undefined || arr[i] === null || arr[i] === '') {
              if (arr[i] != null) return this.insGridInstance.cellValue(e.rowIndex, 'judge', 20)
            }
          }
        }
      }
      if (e.row.data.jugCodeh == '10') {
        // OK/NG
        const Rpm2 = e.row.data
        let arr2 = new Array(Rpm2.insCnt)
        for (let i = 1; i <= Rpm2.insCnt; i++) {
          arr2[i - 1] = Rpm2['sample' + i]
        }
        let chk = arr2.find(e => e === null)
        if (chk === undefined) {
          let array = arr2.find(e => e === 'NG')
          if (array === 'NG') {
            return this.insGridInstance.cellValue(e.rowIndex, 'judge', 20)
          } else {
            this.insGridInstance.cellValue(e.rowIndex, 'judge', 10)
          }
        }
      }
      // for (let i = 0; i < Rpm2.insCnt; i++) {
      //   if (typeof arr2[i] !== 'undefined') {
      //     if (arr2[i] != 'OK') {
      //       return this.insGridInstance.cellValue(e.rowIndex, 'judge', 20)
      //     }
      //     if (arr2[i] === 'OK') {
      //       this.insGridInstance.cellValue(e.rowIndex, 'judge', 10)
      //     }
      //   }
      // }
    },

    // 저장
    async btnSave() {
      
      let message = ''
      this.insGridInstance.saveEditData()
      let selectedMainRows = await this.insGridInstance.getSelectedRowsData()
      selectedMainRows.forEach(e => {
        e.__created__ = true
      })
      console.log('selectedMainRows11111',selectedMainRows)
      
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.insGridInstance.beginUpdate()
          createQat0060(selectedMainRows, true)
            .then((res) => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
              console.log("res저장", res)
            })
            .catch((error) => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.insGridInstance.endUpdate()
              this.insGridInstance.clearSelection()
              this.insGridInstance.saveEditData()
              this.endLoading()
            })
        },
        null,
        true
      )
    },


    async btnCancel() {
      console.log("취소입니다~")
      let message = ''
      this.insGridInstance.saveEditData()
      let selectedMainRows = await this.insGridInstance.getSelectedRowsData()
      selectedMainRows.forEach(e => {
        e.__created__ = true
      })
      console.log('CCCancelselectedMainRows',selectedMainRows)
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('cancleCheck'),
        'info',
        (current) => {
          this.openLoading()
          this.insGridInstance.beginUpdate()
          deleteQat0060(selectedMainRows, true)
            .then((res) => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
              console.log("res취소", res)
            })
            .catch((error) => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.insGridInstance.endUpdate()
              this.insGridInstance.clearSelection()
              this.insGridInstance.saveEditData()
              this.endLoading()
            })
        },
        null,
        true
      )
    },


    comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'ITEM_TYPE,PART_TYPE',
      }
      getCmChildCode(params).then((res) => {
        res.list
        .filter((word) => word.code === 'ITEM_TYPE')
          .forEach((e) => {
            this.partTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
        res.list
        .filter((word) => word.code === 'PART_TYPE')
          .forEach((e) => {
            this.partTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
      })

      getCmChildCode({ comCode: getComCode() })
      //검사항목
      .then((res)=>{
        res.list.filter(x=> x.code ==="INS_TYPE")
        // console.log(res,'as')
        this.push(res)
      })
      //측정방법
      .then((res)=>{
        res.list.filter(x=> x.code ==="INS_METH")
        // console.log(res,'as')
        this.push(res)
      })
      // 판정방법
      .then((res)=>{
        res.list.filter(x=> x.code ==="JUDGE")
        // console.log(res,'as')
        this.push(res)
      })
      // 판정
      .then((res)=>{
        res.list.filter(x=> x.code ==="JUG_CODEH")
        // console.log(res,'as')
        this.push(res)
      })
      // 검사유형
      .then((res)=>{
        res.list.filter(x=> x.code ==="INPT")
        // console.log(res,'INPTas') // 여기
        this.push(res)
      })
      // 시료
      .then((res)=>{
        res.list.filter(x=> x.code ==="SAMPLE")
        // console.log(res,'INPTas') // 여기
        this.push(res)
      })

      getFactoryInfoData({ comCode: getComCode() })
        .then((res) => {
          res.list.forEach((e) => {
            this.facCodeList.push({
              text: e.facName,
              value: e.facCode,
            })
          })
        })
        .finally(() => {
          this.searchValue.facCode = this.facCodeList[0].value
        })
      getAccount({ comCode: getComCode() })
        .then((res) => {
          res.list.forEach((e) => {
            this.custCodeList.push({
              text: e.custName,
              value: e.custCode,
            })
          })
        })
        
      
    },
    btnSearchMain() {
      this.doSearchMain()
    },
    getDateFormat(date) {
      return getDateFormat(date)
    },
    async doSearchMain() {
      this.openLoading()
      console.log("hi");
      // this.mainGridInstance.beginUpdate()
      
      let mainGridParam = {
        comCode: getComCode(),
        facCode: this.searchValue.facCode,
        custCode: this.searchValue.custCode,
        partType: this.searchValue.partType,
        partName: this.searchValue.partName,
        frDate: this.searchValue.frDeliDate,
        toDate: this.searchValue.toDeliDate
      }
      getQat0060(mainGridParam)
        .then(res => {
          console.log('res',res)
          this.mainGrid = res.list
        })
        .catch(err => {
          console.log(err)
        })

      // this.mainGridInstance.endUpdate()
      this.endLoading()
      /*
      //TODO :
      1. 메인 그리드 조회
      2. rowchange 이벤트에서 출하로트현황 데이터 조회
      searchSal0130(selectedMainRows, true)
        .then((res) => {
          notify(this.$t(message), 'success', 1500)
        })
        .catch((error) => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.endLoading()
        })
      */
    },
    focusedRowChanged_status(focusedRow){
      this.getFocusedRowStatus(focusedRow.row.data)
    },
    focusedRowChanged_history(focusedRow){
      console.log("aaa",focusedRow.row.data);
    },
    getFocusedRowStatus(focusedRow){
      let insParam = {
        comCode: getComCode(),
        facCode: focusedRow.facCode,
        ordNo: focusedRow.ordNo,
        ilno: focusedRow.ilno,
        no: focusedRow.no,
        partNo: focusedRow.partNo,
        insCode: 'OQC'
      }
      getInspection(insParam).then(res => {
        console.log("res123", res);
        this.insGrid = res.list
        this.insGridInstance.option('focusedRowIndex', -1)
      })
    }
  },
}
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
