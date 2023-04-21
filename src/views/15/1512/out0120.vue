<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
              <!-- 공장명 -->
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  :label="$t('facName')"
                  :items="facCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                />
              </v-col>
              <!-- 외주처명 -->
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchCustCode"
                  :label="$t('subcontractorName')"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  :clearable="custCodeClear"
                  :readonly="custCodeReadOnly"
                />
              </v-col>
              <!-- 납품번호 -->
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-text-field
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="inIlnoSelect"
                  :label="$t('deliveryNo')"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  :clearable="custCodeClear"
                />
              </v-col>
              <!-- 품번 -->
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-text-field
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="partNo"
                  :label="$t('partNo')"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  :clearable="custCodeClear"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <!-- 납품일 -->
              <v-col cols="2" class="pa-2 pt-2 pb-2">
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
                    <v-text-field :label="$t('deliveryDt')" v-model="startDate" dense outlined readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    no-title
                    scrollable
                    @input="dateInput"
                    :day-format="
                      date => {
                        return new Date(date).getDate()
                      }
                    "
                  />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
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
                    <v-text-field :label="$t('endDate')" v-model="endDate" outlined dense readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :min="startDate"
                    no-title
                    scrollable
                    @input="dateInput2"
                    :day-format="
                      date => {
                        return new Date(date).getDate()
                      }
                    "
                  />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-tabs>
        <v-tab @click="tabChange('기간별공정외주입고현황')">{{ $t('inOfProcessForwardingStatus2') }}</v-tab>
        <v-tab @click="tabChange('일자별조회')">{{ $t('checkBycurrDate') }}</v-tab>
        <v-tab-item>
          <i-card-vertical headerTitle="inOfProcessForwardingStatus">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="deliRegInfo"
                    class="listBox07"
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
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <!-- 거래처명 -->
                    <DxColumn
                      data-field="custCode"
                      :caption="$t('custName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    >
                      <DxLookup :data-source="custCodeList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <!-- 작업 일련번호 -->
                    <DxColumn
                      data-field="ilno"
                      :caption="$t('workingIlno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 작업지시 번호 -->
                    <DxColumn
                      data-field="workNo"
                      :caption="$t('workNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 공정실적 전산번호 -->
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('outLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 납품일 -->
                    <DxColumn
                      data-field="inDate"
                      :caption="$t('deliveryDt')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 납품번호(일련번호) -->
                    <DxColumn
                      data-field="inIlno"
                      :caption="$t('deliveryNoIlno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 납품순번 -->
                    <DxColumn
                      data-field="inNo"
                      :caption="$t('outNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 다음공정명 -->
                    <DxColumn
                      data-field="nextProcNo"
                      :caption="$t('nextProcessName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 공정외주 입고 로트번호 -->
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('outProcessWhsLotNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 공정실적 전산번호 -->
                    <DxColumn
                      data-field="outLotDetail"
                      :caption="$t('outProcessWhsLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 납품구분(생산구분) -->
                    <DxColumn
                      data-field="proType"
                      :caption="$t('proType2')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    >
                      <DxLookup :data-source="proTypeList" display-expr="text" value-expr="value"></DxLookup>
                    </DxColumn>
                    <!-- 품번 -->
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 품명 -->
                    <DxColumn
                      data-field="partNo2"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    >
                      <DxLookup :data-source="partNoList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <!-- 공정외주 납품수량 -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('outDeliQty')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 가공비 단가 -->
                    <DxColumn
                      data-field="inPrice"
                      :caption="$t('mfglPrice')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 가공비 금액 -->
                    <DxColumn
                      data-field="inAmount"
                      :caption="$t('mfglAmount')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 공정외주검사 진행상태 -->
                    <DxColumn
                      data-field="outInspCode"
                      :caption="$t('outProcessChkProgressStat2')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    >
                      <DxLookup :data-source="inIlnoList" display-expr="text" value-expr="value"></DxLookup>
                    </DxColumn>
                    <!-- 비고 -->
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 라벨출력 구분 -->
                    <DxColumn
                      data-field="printType"
                      :caption="$t('printType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <!-- 사용유무 -->
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <!-- 공장명 -->
                    <DxColumn
                      data-field="facCode"
                      :caption="$t('facName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    >
                      <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <!-- 등록자 -->
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 등록일 -->
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 수정자 -->
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <!-- 수정일 -->
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />

                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" mode="single" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item>
          <i-card-vertical headerTitle="checkBycurrDateTitle">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="deliInfo"
                    class="listBox07"
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
                    :column-hiding-enabled="false"
                    showScrollbar="always"
                    scrollByContent="false"
                    @cellPrepared="cellPrepared"
                  >
                    <DxScrolling column-rendering-mode="virtual" />

                    <DxColumn
                      data-field="custname"
                      :caption="$t('custName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :fixed="true"
                      fixed-position="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="partno"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :fixed="true"
                      fixed-position="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="partname"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :fixed="true"
                      fixed-position="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      v-for="day in month"
                      :data-field="day"
                      :key="day"
                      width="auto"
                      :caption="day.split(',')[0]"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxColumn
                        :data-field="`${day.split(',')[1]}_qty`"
                        :caption="$t('inQty')"
                        width="auto"
                        data-type="number"
                        alignment="right"
                        :customize-text="customizeText"
                        :allow-editing="false"
                      />
                      <DxColumn
                        :data-field="`${day.split(',')[1]}_outQty`"
                        :caption="$t('releaseQty')"
                        width="auto"
                        data-type="number"
                        alignment="right"
                        :customize-text="customizeText"
                        :allow-editing="false"
                      />
                    </DxColumn>
                    <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />

                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection mode="none" :allow-select-all="false" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
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
import { saveMenuStatistics } from '@/api/system/menuStatisticsManage'
import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { createMat0012, deleteMat0018, getAccount_out0010, getUserId_out0010 } from '@/api/view/out0010'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getOut0120, getOut0120byDate } from '@/api/view/out0120'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getPartNo } from '@/api/view/pop0040'
export default {
  name: 'out0120',
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
      // sample: '',
      ordStatusInfo: [], //기간별공정외주입고현황
      deliStatusInfo: [], //구매 발주정보 상세
      deliRegInfo: [], //구매 입고 등록
      deliInfo: [], //구매 입고정보 상세
      ordStatusInfoRef: 'OrdStatuseInfoRef',
      deliStatusInfoRef: 'deliStatusInfoRef',
      deliRegInfoRef: 'deliRegInfoRef',
      deliInfoRef: 'deliInfoRef',
      // checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      ordStatusInfoData: [], //발주현황 데이터
      deliStatusInfoData: [], //납품현황 데이터

      comCodeList: [],
      facCodeList: [],
      custCodeList: [],
      proTypeList: [],
      inIlnoList: [],
      partNoList: [],
      inIlnoSelect: '',
      searchComCode: '',
      searchCustCode: '',
      partNo: '',

      startDate: getPreMonth(1),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      rowCount: [],
      custCode: [],
      depCode: '',
      month: [],
      day: ['일', '월', '화', '수', '목', '금', '토'],
      custCodeReadOnly: false,
      custCodeClear: true
    }
  },
  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
      userId: getUserId()
    }
  },
  async created() {
    // const params = {
    //   comCode : getComCode(),
    //   userId : getUserId(),
    //   moduleCode : this.$localStore.get('moduleCode'),
    //   menuCode: this.$localStore.get('menuCode'),
    //   cnntDate: getDateFormat(new Date()),
    // }
    // saveMenuStatistics(params)
    //유저 아이디 조회
    const param3 = {
      comCode: getComCode(),
      userId: getUserId()
    }
    getUserId_out0010(param3).then(res => {
      this.depCode = res.list[0].depCode
    })

    //공장명 조회조건
    const comCodeData = {
      comCode: getComCode()
    }
    await getFactoryInfoData(comCodeData).then(res => {
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

    if (this.depCode === 'OUT') {
      this.custCodeReadOnly = true
      this.custCodeClear = false
      getAccount_out0010(custCodeData).then(res => {
        res.list.forEach(e => {
          this.custCodeList.push({
            value: e.custCode,
            text: e.custName
          })
        })
        this.searchCustCode = this.custCodeList[0].value
      })
    } else {
      getAccount(custCodeData).then(res => {
        res.list.forEach(e => {
          this.custCodeList.push({
            value: e.custCode,
            text: e.custName
          })
        })
        // this.searchCustCode = this.custCodeList[0].value
      })
    }
  },
  computed: {
    deliStatusInstance() {
      return this.GetDataGrid(this.deliStatusInfoRef)
    },
    deliInfoInstance() {
      return this.GetDataGrid(this.deliInfoRef)
    }
  },
  mounted() {
    this.comboListSet()
  },
  methods: {
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    /**
     * @function checkMonth
     * 계획일 , 종료일 설정후 검색시 일자별 조회 탭의 상단 컬럼에 날짜-요일을 넣어주는 메소드
     * ex) 계획일 2022-01-01 종료일 2022-02-01
     * 1.1~2.1 일까지의 모든 날을 01-01(일),01-02(월) 형식으로 컬럼에 넣어준다
     */
    checkMonth() {
      let startDate = new Date(this.startDate)
      let endDate = new Date(this.endDate)
      this.month = []
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        let year = new Date(date)
          .toISOString()
          .split('T')[0]
          .split('-')[0]
        let month = new Date(date)
          .toISOString()
          .split('T')[0]
          .split('-')[1]
        let day = new Date(date)
          .toISOString()
          .split('T')[0]
          .split('-')[2]

        let param = new Date(date).toISOString().split('T')[0]
        let getDay = this.getDayOfWeek(param)
        let string = String(month + '월' + day + '일(' + getDay + ')')
        this.month.push(string + ',' + String(year + '-' + month + '-' + day))
      }
    },
    /**
     * @function getDayOfWeek
     * 2022-01-01 형식의 날짜가 들어오면 해당 날의 요일을 알려주는 메소드
     * ex) param = 2022-01-01 / return '월'
     * @param {String} param ex) '2022-01-01'
     */
    getDayOfWeek(param) {
      let dayOfWeek = this.day[new Date(param).getDay()]
      return dayOfWeek
    },
    btnSearchMain() {
      this.doSearchMain()
      this.doSearchDeliStatus()
      this.checkMonth()
      this.rowCount = []
    },

    async comboListSet() {
      try {
        let params = {
          comCode: getComCode(),
          code: 'PRO_TYPE,OUT_INSP_CODE'
        }
        //////////////////////////////////////////////////////////////////
        let cmChildRes = await getCmChildCode(params)
        cmChildRes.list
          .filter(word => word.code === 'PRO_TYPE')
          .forEach(e => {
            this.proTypeList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })
        cmChildRes.list
          .filter(word => word.code === 'OUT_INSP_CODE')
          .forEach(e => {
            this.inIlnoList.push({
              text: e.sysName,
              value: e.sysCode
            })
          })
        /* ----- 공장명 -----*/

        let facRes = await getFactoryInfoData({ comCode: getComCode() })
        facRes.list.forEach(e => {
          this.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
        })
        this.facCodeSelect = this.facCodeList[0].value
        this.facCode = this.facCodeList[0].value

        let partNoRes = await getPartNo({ comCode: getComCode() })
        partNoRes.list.forEach(e => {
          this.partNoList.push({
            text: e.partName,
            value: e.partNo
          })
        })
      } catch (error) {
        notify(error, 'error', 1500)
      }
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
    async doSearchMain() {
      //기간별공정외주입고현황 조회
      this.openLoading()
      try {
        if (this.partNo === null) {
          this.partNo = ''
        }
        if (this.inIlnoSelect === null) {
          this.inIlnoSelect = ''
        }
        let params = {
          comCode: getComCode(),
          facCode: this.facCode,
          custCode: this.searchCustCode,
          partNo: '%' + this.partNo + '%',
          inIlno: '%' + this.inIlnoSelect + '%',
          startDate: this.startDate,
          endDate: this.endDate
        }
        console.log('params', params)
        let gridDataRes = await getOut0120(params)
        let copyArray = [...gridDataRes.list]
        let cont = 0
        copyArray.forEach(e => {
          e.makeDate = e.makeDate.substr(0, 10)
          e.partNo2 = e.partNo
          e.id = cont++
        })
        this.deliRegInfo = copyArray
      } catch (error) {
        notify(error, 'error', 1500)
      }
      this.endLoading()
    },

    async doSearchDeliStatus() {
      try {
        this.openLoading()
        if (this.partNo === null) {
          this.partNo = ''
        }
        if (this.inIlnoSelect === null) {
          this.inIlnoSelect = ''
        }

        let params = {
          comCode: getComCode(),
          facCode: this.facCode,
          custCode: this.searchCustCode,
          partNo: '%' + this.partNo + '%',
          inIlno: '%' + this.inIlnoSelect + '%',
          startDate: this.startDate,
          endDate: this.endDate
        }
        let cnt = 0

        let resData = await getOut0120byDate(params)
        const data = [...resData.list[0]]
        data.forEach(e => {
          e.id - cnt++
        })
        this.deliInfo = data
        this.endLoading()
      } catch (error) {
        if (error === null) {
          this.endLoading()
          this.deliInfo = []
        } else {
          this.endLoading()
          notify(error, 'error', 1500)
        }
      }
    },
    tabChange(e) {
      this.tabKey = e
      if (e === '기간별공정외주입고현황') {
        this.doSearchMain()
        this.checkMonth()
      } else {
        this.doSearchDeliStatus()
        this.checkMonth()
      }
      this.checkMonth()
    },
    cellPrepared(e) {
      if (e.rowType == 'data') {
        let count = 1
        let boolean = true
        if (e.component.cellValue(e.rowIndex - 1, e.column.dataField) !== e.component.cellValue(e.rowIndex, e.column.dataField)) {
          e.MergeCellRowStart = true
        }
        if ((e.component.cellValue(e.rowIndex - 1, 'custName') !== e.component.cellValue(e.rowIndex, 'custName'))
        || (e.component.cellValue(e.rowIndex - 1, 'partNo') !== e.component.cellValue(e.rowIndex, 'partNo'))) {
          e.MergePartCellRowStart = true
        }

        if (e.column.dataField === 'custname') {
          if (e.MergeCellRowStart) {
            for (count; boolean; count++) {
              let next = e.component.cellValue(e.rowIndex + count, e.column.dataField)
              let now = e.component.cellValue(e.rowIndex, e.column.dataField)

              if (next !== now) {
                boolean = false
              }
            }

            if (count > 1) {
              e.cellElement.rowSpan = count - 1
              e.cellElement.innerHTML = e.data.custname
            }
          } else {
            e.cellElement.style.display = 'none'
          }
        }
      }
    },
  }
}
</script>
<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
