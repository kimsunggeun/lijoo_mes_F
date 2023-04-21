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
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-layout column>
              <!-- 공장명 / 검사구분 / 거래처명 / 처리구분 / 출하창고 -->
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 공장명 선택 -->
                <v-col cols="2" class="mr-2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.facCodeList"
                    v-model="searchValue.facCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facCode')"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 거래처명 선택 -->
                <v-col cols="2" class="mr-2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mx-1"
                    item-text="text"
                    item-value="value"
                    :items="comboBoxList.custNameList"
                    v-model="searchValue.custCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('custName')"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 품명 -->
                <v-col cols="2" class="mr-2">
                  
                  <v-text-field 
                    v-model="searchValue.partNm" 
                    label="품명" 
                    dense 
                    outlined 
                    hide-details="auto"
                    class="mx-1" 
                    clearable />
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 출하일 캘린더 -->
                <v-col cols="2" class="mr-2">
                  <v-menu
                    ref="workFrDateCal"
                    v-model="calMenuState.workFrDateCal"
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
                        v-model="searchValue.workFrDate"
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
                      v-model="searchValue.workFrDate" 
                      no-title 
                      @input="calMenuState.workFrDateCal = false" 
                      :day-format="(date) => { return new Date(date).getDate(); }"
                    />
                  </v-menu>
                </v-col>
                <!-- ~ -->
                <v-col cols="2" class="mr-2">
                  <v-menu
                    ref="workDateCal"
                    v-model="calMenuState.workDateCal"
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
                        v-model="searchValue.workDate"
                        dense
                        outlined
                        color="primary"
                        readonly
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker 
                      v-model="searchValue.workDate" 
                      :min="searchValue.workFrDate" 
                      no-title 
                      @input="calMenuState.workDateCal = false"
                      :day-format="(date) => { return new Date(date).getDate(); }" 
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <!-- 출하정보상세 -->
      <v-col cols="12" class="pa-2">
        <v-row no-gutters>
          <i-card-vertical
            class="mb-2"
            headerTitle="shipmentInfoDetail"
            :useBtnList="[
              'btnAdd' //신규
            ]"
            @btnAdd="btnAddReturnReg()"
          >
            <template v-slot:body>
              <v-layout column>
                <v-row>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="shipmentInfoDetail"
                      class="doubleListBox02"
                      :ref="gridData.mainGrid.ref"
                      :data-source="gridData.mainGrid.data"
                      :remote-operations="false"
                      :hover-state-enabled="true"
                      :allow-column-resizing="true"
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true"
                      :column-auto-width="true"
                      :show-borders="true"
                      :width="grid.width"
                      :show-row-lines="true"
                      :key-expr="['lotDetail', 'ilno']"
                      :focused-row-enabled="true"
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      column-resizing-mode="widget"
                      @focused-row-changed="focusedRowChanged_shipment"
                    >
                      <DxPaging :enabled="false" />
                      <DxSelection select-all-mode="allMode" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />
                      <DxPager :show-page-size-selector="false" />

                      <!-- 회사코드 -->
                      <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :visible="false" :allow-editing="false" />
                      <!-- 공장코드 -->
                      <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :visible="false" :allow-editing="false" />
                      <!-- 출하일 -->
                      <DxColumn data-field="outDate" :caption="$t('outDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 출하일련번호 -->
                      <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 수주번호 -->
                      <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 수주순번 -->
                      <DxColumn data-field="no" :caption="$t('ordTurn')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 거래처코드 -->
                      <DxColumn data-field="custName" :caption="$t('custName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                      <!-- 품번코드 -->
                      <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                      <!-- 품명코드 -->
                      <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                      <!-- 출하 LOT -->
                      <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 전산번호 -->
                      <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 출하전재고량 -->
                      <DxColumn data-field="stockQty" :caption="$t('stockQty')" width="auto" data-type="string" :visible="false" alignment="right" :allow-editing="false" />
                      <!-- 출하량 -->
                      <DxColumn data-field="qty" :caption="$t('qty')" width="auto" data-type="string" alignment="right" :allow-editing="false" :customize-text="customizeText" />
                      <!-- 단가 -->
                      <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="string" alignment="right" :allow-editing="false" :customize-text="customizeText" />
                      <!-- 금액 -->
                      <DxColumn data-field="amount" :caption="$t('amount')" width="auto" data-type="string" alignment="right" :allow-editing="false" :customize-text="customizeText" />
                      <!--반품수량 -->
                      <DxColumn data-field="retQty" :caption="$t('retQty')" width="auto" data-type="string" alignment="right" :allow-editing="false" :customize-text="customizeText" />
                      <!-- 출하검사여부 -->
                      <DxColumn data-field="outInspYn" :caption="$t('outInsp')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <!-- 비고 -->
                      <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true" />

                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                      </template>
                    </DxDataGrid>
                  </v-col>
                </v-row>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
        <v-row no-gutters>
          <v-tabs>
            <v-tab class="mr-2">{{ $t('returnRegis') }}</v-tab>
            <v-tab class="mr-2">{{ $t('returnDetail') }}</v-tab>
            <!-- 반품등록 탭 -->
            <v-tab-item>
              <i-card-vertical
                headerTitle="returnReg"
                :useBtnList="[
                  'btnRegi', //확정
                  'btnDelete'
                ]"
                @btnRegi="btnRegiReturn"
                @btnDelete="btnDeleteReturn"
              >
                <template v-slot:body>
                  <v-layout column>
                    <v-col cols="12" class="pa-0">
                      <DxDataGrid
                        id="returnReg"
                        class="doubleListBox14"
                        :ref="addGridData.mainGrid.ref"
                        :data-source="addGridData.mainGrid.data"
                        :remote-operations="false"
                        :hover-state-enabled="true"
                        :allow-column-resizing="true"
                        :allow-column-reordering="true"
                        :row-alternation-enabled="true"
                        :show-borders="true"
                        :width="grid.width"
                        :show-row-lines="true"
                        :column-auto-width="true"
                        :key-expr="['lotDetail', 'ilno']"
                        :focused-row-enabled="true"
                        :disablePagination="false"
                        :column-hiding-enabled="false"
                        column-resizing-mode="widget"
                      >
                        <DxPaging :enabled="false" />
                        <DxSelection select-all-mode="allMode" :show-check-boxes-mode="addGridData.checkBoxesMode" mode="multiple" />
                        <!-- 회사코드 -->
                        <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 공장코드 -->
                        <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 출하일련번호 -->
                        <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 반품일 -->
                        <DxColumn data-field="retDate" :caption="$t('returnDate')" width="auto" data-type="string" alignment="center" :allow-editing="true" :visible="false" />
                        <!-- 출하 LOT -->
                        <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 전산번호 -->
                        <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품구분 코드 -->
                        <DxColumn
                          data-field="retCode"
                          :caption="$t('retCode')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="true"
                          css-class="devest-grid-header-require" 
                        >
                         <DxLookup :data-source="comboBoxList.retCodeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 반품불량사유코드 -->
                        <DxColumn
                          data-field="retType"
                          :caption="$t('retType')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="true"
                          css-class="devest-grid-header-require" 
                        >
                          <DxLookup :data-source="comboBoxList.retTypeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 반품 창고코드 -->
                        <DxColumn
                          data-field="locCode"
                          :caption="$t('retWhCode')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="true"
                          css-class="devest-grid-header-require" 
                        >
                          <DxLookup :data-source="comboBoxList.locCodeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 단가 -->
                        <DxColumn data-field="price" :caption="$t('price')" width="auto" data-type="string" alignment="right" :allow-editing="false" :customize-text="customizeText" :visible="false" />
                        <!-- 반품수량 -->
                        <DxColumn
                          data-field="retQty"
                          :caption="$t('retQty')"
                          width="auto" 
                          data-type="string"
                          alignment="right"
                          :allow-editing="true"
                          :set-cell-value="setQty"
                          :customize-text="customizeText"
                          css-class="devest-grid-header-require" 
                        />
                        <DxColumn data-field="qty" :visible="false"/>
                        <DxColumn data-field="beforeRetQty" :visible="false"/>
                        <!--등록자-->
                        <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false"/>
                        <!-- 비고 -->
                        <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true" />
                        <DxColumn></DxColumn>
                        <template #checkBoxEditor="{ data: cellInfo }">
                          <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                        </template>
                        <DxPager :show-page-size-selector="false" />
                      </DxDataGrid>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-tab-item>
            <!-- 반품내역 탭 -->
            <v-tab-item>
              <i-card-vertical
                headerTitle="returnDet"
                :useBtnList="[
                  'btnDelete' //확정
                ]"
                @btnDelete="deleteReturn"
              >
                <template v-slot:body>
                  <v-layout column>
                    <v-col cols="12" class="pa-0">
                      <DxDataGrid
                        id="returnDet"
                        class="doubleListBox14"
                        :ref="retGridData.mainGrid.ref"
                        :data-source="retGridData.mainGrid.data"
                        :remote-operations="false"
                        :hover-state-enabled="true"
                        :allow-column-resizing="true"
                        :allow-column-reordering="true"
                        :row-alternation-enabled="true"
                        :show-borders="true"
                        :width="grid.width"
                        :show-row-lines="true"
                        :column-auto-width="true"
                        :key-expr="['lotDetail', 'ilno', 'retLotDetail']"
                        :focused-row-enabled="true"
                        :disablePagination="false"
                        :column-hiding-enabled="false"
                        column-resizing-mode="widget"
                        :on-row-inserted="e => e.component.navigateToRow(e.key)"
                      >
                        <DxPaging :enabled="false" />

                        <DxSelection select-all-mode="allMode" :show-check-boxes-mode="retGridData.checkBoxesMode" mode="multiple" />
                        <!-- 회사코드 -->
                        <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 공장코드 -->
                        <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 출하일련번호 -->
                        <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" :visible="false" alignment="center" :allow-editing="false" />
                        <!-- 반품일 -->
                        <DxColumn data-field="retDate" :caption="$t('returnDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 출하 LOT -->
                        <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품번호 -->
                        <DxColumn data-field="retNo" caption="반품번호" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <DxColumn data-field="partNo" :visible="false"/>
                        <!-- 출하전산번호 -->
                        <!-- 반품전산번호 -->
                        <DxColumn data-field="retLotDetail" :caption="$t('retLotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 출하전산번호 -->
                        <DxColumn data-field="lotDetail" :caption="$t('shipmentLotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 반품구분 코드 -->
                        <DxColumn
                          data-field="retCode"
                          :caption="$t('retCode')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                         <DxLookup :data-source="comboBoxList.retCodeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 반품불량사유코드 -->
                        <DxColumn
                          data-field="retType"
                          :caption="$t('retType')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboBoxList.retTypeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 반품 창고코드 -->
                        <DxColumn
                          data-field="locCode"
                          :caption="$t('retWhCode')"
                          width="auto" 
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboBoxList.locCodeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 반품수량 -->
                        <DxColumn
                          data-field="retQty"
                          :caption="$t('retQty')"
                          width="auto" 
                          data-type="string"
                          alignment="right"
                          :allow-editing="false"
                        />
                        <!-- 비고 -->
                        <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                        <!-- 비고 -->
                        <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 비고 -->
                        <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                        <!-- 비고 -->
                        <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 비고 -->
                        <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="left" :allow-editing="false" />



                        <DxColumn></DxColumn>

                        <template #checkBoxEditor="{ data: cellInfo }">
                          <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                        </template>
                        <DxPager :show-page-size-selector="false" />
                      </DxDataGrid>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-tab-item>
          </v-tabs>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import { getCustCodeName } from '@/api/view/bas0044'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getWarehouseLocInfoData} from '@/api/view/bas0033'
import { getSal0120, getSal0140, insertSal0140, deleteSal0140 } from '@/api/view/sal0140'
import notify from 'devextreme/ui/notify' // message
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getPreMonth } from '@/utils/common.js'
import { getComCode, getUserId } from '@/utils/token'
import { isNumeric } from '@/utils/check'
//  가상컬럼  계산값 로직 아직없음 [잔량]
export default {
  name: 'sal0140',
  mixins: [baseview, BaseDataGrid],
  components: {
    "i-card-vertical": iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup
},
  data() {
    return {
      flag: false,
      //반품내역 리스트
      returnDetailList: [],
      //콤보박스
      comboBoxList: {
        facCodeList: [],
        custNameList: [],
        outInspList: [],
        retTypeList: [],
        retCodeList: [],
        locCodeList: [],
      },
      //검색 값
      searchValue: {
        comCode: getComCode(),
        facCode: '',
        custCode: '',
        partNm: '',
        workFrDate: getPreMonth(2),
        workDate: getDateFormat(new Date())
      },
      //검색일자
      calMenuState: {
        workFrDateCal: false,
        workDateCal: false
      },
      //상세현황 그리드 데이터
      gridData: {
        mainGrid: {
          //메인그리드
          data: [],
          ref: 'ref'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //반품등록 그리드 데이터
      addGridData: {
        mainGrid: {
          //메인그리드
          data: [],
          ref: 'addef'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //반품현황 그리드 데이터
      retGridData: {
        mainGrid: {
          //메인그리드
          data: [],
          ref: 'ref'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      }
    }
  },
  created() {},
  beforeMount() {
    this.comboListSet()
  },
  mounted() {
    // this.doSearchMain(true)
  },
  watch: {
    frDeliDate: function(value) {
      if (new Date(value) > new Date(this.toDeliDate)) {
        this.toDeliDate = value
      }
    }
  },
  computed: {
    /*
     * 출하정보상세 그리드 BaseGrid옵션
     **/
    shipInfoInstance() {
      return this.GetDataGrid(this.gridData.mainGrid.ref)
    },
    /*
     * 반품등록 그리드 BaseGrid옵션
     **/
    returnRegInstance() {
      return this.GetDataGrid(this.addGridData.mainGrid.ref)
    },
    /*
     * 반품내역 그리드 BaseGrid옵션
     **/
    returnDetailInstance() {
      return this.GetDataGrid(this.retGridData.mainGrid.ref)
    }
  },
  methods: {
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
     /*
     * 반품내역에서 선택한 데이터들을 삭제
     **/
    async deleteReturn() {
      let selectedMainRows = await this.returnDetailInstance.getSelectedRowsData()

      deleteSal0140(selectedMainRows).then(() => {
        notify('선택한 반품내역을 삭제하였습니다.', 'success', 2000)
        this.getRetrunDetail()
        this.btnSearchMain()
      }).catch(error => {
        notify(error, 'error', 2000)
      })
    },
    /*
     * 출하정보 상세 클릭시 반품내역 조회
     **/
    async getRetrunDetail() {
      if (this.returnDetailList.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
        return
      }
      this.openLoading()
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.returnDetailList.facCode,
          lotNo: this.returnDetailList.lotNo,
          ilno: this.returnDetailList.ilno,
          no: this.returnDetailList.no,
          lotDetail: this.returnDetailList.lotDetail,
          retCode: this.returnDetailList.retCode,
          retType: this.returnDetailList.retType
        }
        let returnGridDataRes = await getSal0140(params)
        let returnCopyArray = [...returnGridDataRes.list]
        this.retGridData.mainGrid.data = returnCopyArray
      } catch (error) {
        notify(error, 'error', 1500)
      }
      this.endLoading()
    },
    /*
     * 출하정보 상세 클릭 이벤트
     **/
    focusedRowChanged_shipment(e) {
      if (e === undefined) {
        return
      }
      this.returnDetailList = e.row.data
      this.getRetrunDetail()
    },
    /*
     * 반품수량 설정
     **/
    setQty(newData, value, currentRowData) {
     //숫자인지 확인
     if (!isNumeric(value))
      {
        return
      }
      if (Number(value) > Number(currentRowData.qty) - Number(currentRowData.beforeRetQty) ) {
        newData.retQty = Number(currentRowData.qty) - Number(currentRowData.beforeRetQty)
      }else if(Number(value) <= 0){
        newData.retQty = 1
      }else {
        newData.retQty = value
      }
    },
    /*
     * 반품등록의 등록버튼
     **/
    async btnRegiReturn() {
      await this.returnRegInstance.saveEditData()
      let selectedMainRows = await this.returnRegInstance.getSelectedRowsData()
      for(let row of selectedMainRows){
        if (!row.retCode) {
          notify('반품 구분 항목을 선택해주세요', 'error', 1500)
          return
        }else if(!row.retType){
          notify('반품 불량 사유를 선택해주세요', 'error', 1500)
          return
        }else if(!row.locCode){
          notify('창고 코드를 선택해주세요', 'error', 1500)
          return
        }else if(!isNumeric(row.retQty)){
          notify('반품 수량을 입력해주세요', 'error', 1500)
          return
        }
      }
      if (this.addGridData.mainGrid.data.length > 0) {
        insertSal0140(selectedMainRows).then(() => {
          notify('반품내역에 등록되었습니다.', 'success', 2000)
          for (let select of selectedMainRows) {
            //선택한 목록 반품등록 리스트에서 삭제
            this.addGridData.mainGrid.data = this.addGridData.mainGrid.data.filter(
              grid =>
                !(
                  grid.lotDetail == select.lotDetail &&
                  grid.comCode == select.comCode &&
                  grid.facCode == select.facCode &&
                  grid.ilno == select.ilno &&
                  grid.no == select.no &&
                  grid.lotDetail == select.lotDetail
                )
            )
          } 
          this.getRetrunDetail()
          this.btnSearchMain()
        }).catch(error => {
          notify(error, 'error', 2000)
        })
      } else {
        notify(this.$t('반품목록을 선택하여 추가해야 합니다.'), 'error')
        return
      }
    },
    /*
     * 반품등록 페이지에서 글 비우기 (전체 삭제 checkbox single)
     **/
    async btnDeleteReturn() {
      let selectedMainRows = await this.returnRegInstance.getSelectedRowsData()
      if (this.addGridData.mainGrid.data.length == 0) {
        notify('삭제할 품목이 없습니다.', 'error', 2000)
      } else {
        for (let select of selectedMainRows) {
          //선택한 목록 반품등록 리스트에서 삭제
          this.addGridData.mainGrid.data = this.addGridData.mainGrid.data.filter(
            grid =>
              !(
                grid.lotDetail == select.lotDetail &&
                grid.comCode == select.comCode &&
                grid.facCode == select.facCode &&
                grid.ilno == select.ilno &&
                grid.no == select.no &&
                grid.lotDetail == select.lotDetail
              )
          )
        }
      }
      
    },
    /*
     * 출하정보상세 에서 추가시 반품등록으로 이동
     * 출하정보상세 -> 반품등록
     **/
    async btnAddReturnReg() {
      let selectedMainRows = await this.shipInfoInstance.getSelectedRowsData()

      if (selectedMainRows.length === 0) {
        notify('선택된 데이터가 없습니다', 'error')
        return
      }
      for (let retReg of selectedMainRows) {
        if(Number(retReg.qty) - Number(retReg.retQty) <= 0){
          notify('반품가능한 수량이 없습니다.', 'error')
          return
        }
        let newRow = {
          comCode: getComCode(),
          facCode: retReg.facCode,
          ordNo: retReg.ordNo,
          ilno: retReg.ilno,
          no: retReg.no,
          outDate: retReg.outDate,
          partNo: retReg.partNo,
          lotNo: retReg.lotNo,
          lotDetail: retReg.lotDetail,
          remark: retReg.remark,
          price: retReg.price,
          qty: retReg.qty,
          beforeRetQty: retReg.retQty,
          retQty: '',
          maker: getUserId()
        }

        // 중복 체크
        for (let addRow of this.addGridData.mainGrid.data) {
          let retRegVal = retReg.comCode + '/' + retReg.facCode + '/' + retReg.ordNo + '/' + retReg.lotDetail + '/' + retReg.ilno + '/' + retReg.no
          let addRowVal = addRow.comCode + '/' + addRow.facCode + '/' + addRow.ordNo + '/' + addRow.lotDetail + '/' + addRow.ilno + '/' + addRow.no
          if (retRegVal == addRowVal) {
            notify('중복된 값이있습니다.', 'error', 2000)
            return
          }
        }
        this.returnRegInstance.newRow(newRow)
        this.returnRegInstance.selectRows(newRow, true)
      }
      

      this.shipInfoInstance.clearSelection()
    },
    //콤보박스 배열 생성
    async comboListSet() {
      try {
        /*
         * 공장코드 콤보박스 설정
         **/
        let facCodeRes = await getFactoryInfoData({ comCode: getComCode() })
        facCodeRes.list.forEach(e => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
          this.searchValue.facCode = this.comboBoxList.facCodeList[0].value
        })
        /*
         * 거래처명 콤보박스 설정
         **/
        let custNameInfo = {
          comCode: getComCode()
        }
        let custNameRes = await getCustCodeName(custNameInfo)
        custNameRes.list.forEach(e => {
          this.comboBoxList.custNameList.push({
            text: e.custName,
            value: e.custCode
          })
        })

        //불량사유
        let retTypeParam = {
          comCode: getComCode(),
          code: 'DEF_CODE',
          codegr: 'COM'
        }
        let retTypeArr = await getCmChildCode(retTypeParam)
        retTypeArr.list.forEach(e => {
          this.comboBoxList.retTypeList.push({
            name: e.sysName,
            code: e.sysCode
          })
        })
        //반품구분
        let retCodeParam = {
          comCode: getComCode(),
          code: 'SELECT_TYPE',
          codegr: 'COM'
        }

        let retCodeArr = await getCmChildCode(retCodeParam)
        retCodeArr.list.forEach(e => 
        {
          this.comboBoxList.retCodeList.push({
            name: e.sysName,
            code: e.sysCode
          })
        })
      }
      catch (err)
      {
        notify(err, 'error', 2000)
      }
    },
    btnSearchMain() {
      this.mainGridSearch()
    },
    getDateFormat(date) {
      return getDateFormat(date)
    },
    async mainGridSearch() {

      
      //창고코드
      let locCodeParam = {
        comCode: getComCode(),
        facCode: this.searchValue.facCode,
        whCode: ''
      }
      this.comboBoxList.locCodeList = []
      let locCodeArr = await getWarehouseLocInfoData(locCodeParam)
      locCodeArr.list.forEach(e => {
        this.comboBoxList.locCodeList.push({
          name: e.locName,
          code: e.locCode
        })
      })

      this.openLoading()
      try {
        let gridDataRes = await getSal0120(this.searchValue)
        let copyArray = [...gridDataRes.list]
        this.gridData.mainGrid.data = copyArray
        this.shipInfoInstance.saveEditData()
      } catch (error) {
        notify(error, 'error', 1500)
      }
      this.endLoading()
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
