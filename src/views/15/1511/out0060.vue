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
                <v-col cols="12" md="2" class="pa-2 pt-0 pb-0">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required"
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

                <v-col cols="12" md="2" class="pa-2 pt-0 pb-0">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required"
                    v-model="searchCustCode"
                    :label="$t('custName')"
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

                <v-col cols="12" md="2" class="pa-2 pt-0 pb-0">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="searchpartNo"
                    dense
                    outlined
                    color="primary"
                    class="mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="pb-2">
                <v-col cols="12" md="2" class="pa-2 pt-0 pb-0 ms-sm-2">
                  <v-menu
                    ref="mnDtFrom"
                    v-model="mnDtFrom"
                    :close-on-content-click="false"
                    :retrun-value.sync="reqDtFrom"
                    max-width="280px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :label="$t('inRegiDate')"
                        v-model="reqDtFrom"
                        class="required"
                        dense
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reqDtFrom"
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
                <v-col cols="12" md="2" class="pa-2 pt-0 pb-0 pr-4">
                  <v-menu ref="mnDtTo" v-model="mnDtTo" :close-on-content-click="false" :return-value.sync="reqDtTo" width="280px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field label="~" v-model="reqDtTo" dense outlined v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reqDtTo"
                      :min="reqDtFrom"
                      class="required"
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
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="7" class="pt-2">
        <i-card-vertical class="pa-2" headerTitle="receiptInfo" :useBtnList="['btnTradePrint']" @btnTradePrint="printTransRpt()">
          <template v-slot:body>
            <v-layout column>
              <DxDataGrid
                id="deliReg"
                class="listBox03"
                :ref="deliRegRef"
                :data-source="deliReg"
                :remote-operations="false"
                :hover-state-enabled="true"
                :allow-column-resizing="true"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="true"
                :show-row-lines="true"
                :width="grid.width"
                :column-auto-width="false"
                key-expr="id"
                :focused-row-enabled="true"
                :disablePagination="false"
                :column-hiding-enabled="false"
                @focused-row-changed="detailSearch"
                column-resizing-mode="widget"
              >
                <DxPaging :enabled="false" />
                <DxSelection mode="multiple" />
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn data-field="facCode" :caption="$t('facName')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="facCodeLookup" display-expr="facName" value-expr="facCode"> </DxLookup>
                </DxColumn>
                <DxColumn
                  data-field="ordNo"
                  :caption="$t('ordNo')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="no"
                  :caption="$t('no')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn data-field="regiDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn
                  data-field="qty"
                  :caption="$t('qty')"
                  width="auto"
                  data-type="number"
                  format="#,###"
                  alignment="right"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="inQty"
                  :caption="$t('inQty')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="makeQty"
                  :caption="$t('makeQty')"
                  width="auto"
                  data-type="string"
                  alignment="right"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="boxQty"
                  :caption="$t('boxQty')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="inPrice"
                  :caption="$t('inPrice')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="inAmount"
                  :caption="$t('inAmount')"
                  width="auto"
                  data-type="number"
                  format="#,###"
                  alignment="right"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="remQty"
                  :caption="$t('remQty')"
                  width="auto"
                  data-type="number"
                  format="#,###"
                  alignment="right"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="remark"
                  :caption="$t('remark')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="userFlag"
                  :caption="$t('userFlag')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
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
                <DxColumn
                  data-field="maker"
                  :caption="$t('maker')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="editDate"
                  :caption="$t('editDate')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="editor"
                  :caption="$t('editor')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="inStatus"
                  :caption="$t('status')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="inType"
                  :caption="$t('inType')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="retAmount"
                  :caption="$t('retAmount')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                <DxPager :show-page-size-selector="false" />
                <DxPaging :enabled="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="5" class="pt-2">
        <i-card-vertical class="pa-2" headerTitle="receivingInfoDetail" :useBtnList="['btnDeliveryPrint']" @btnDeliveryPrint="printTransTag()">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="deliInfo"
                  class="listBox03"
                  :ref="deliInfoRef"
                  :data-source="deliInfo"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :column-auto-width="false"
                  column-resizing-mode="widget"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  parent-id-expr="comCode"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="multiple" />
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="ordNo"
                    :caption="$t('ordNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn data-field="no" :caption="$t('no')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('regiDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="serialNo"
                    :caption="$t('serialNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                    :visible="false"
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
                    :caption="$t('qty')"
                    width="auto"
                    data-type="number"
                    format="#,###"
                    alignment="left"
                    :allow-editing="false"
                  />

                  <DxColumn
                    data-field="inPrice"
                    :caption="$t('inPrice')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="inAmount"
                    :caption="$t('inAmount')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="remQty"
                    :caption="$t('remQty')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
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
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="inInspYn"
                    :caption="$t('waitQtyYn')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="false"
                    edit-cell-template="checkBoxEditor"
                  />
                  <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>

                  <DxColumn
                    data-field="retAmount"
                    :caption="$t('retAmount')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxPager :show-page-size-selector="false" />
                  <DxScrolling column-rendering-mode="virtual" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <!-- <v-col>
          <div>
            <DxPopup
            :visible.sync="popupVisible"
            :show-close-button="true"
            
            :show-title="true"
            :width="300"
            :height="150"
            title = "출력 정보"
            >
            <v-autocomplete
              :menu-props="{ offsetY: true }"
              v-model="printType"
              color="primary"
              :items="printTypeList"
              item-text="text"
              item-value="value"
              label="출력타입"
              dense
              outlined
            ></v-autocomplete>
            <div align="center" style="padding: 5px">
              <v-btn tile outlined width="60px" class="releaseBtn" @click="printTransTag">
                <v-icon>$print</v-icon>
              </v-btn>
            </div>
  
            </DxPopup>
        </div>
        </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import { DxPopup } from 'devextreme-vue/popup'
import 'devextreme/data/odata/store'
import { getDateFormat, getCurrentDate, getPreDay } from '@/utils/common.js'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getUserId, getComCode } from '@/utils/token'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import { getAccount } from '@/api/view/mat0010'
import { getAccount_out0010, getUserId_out0010 } from '@/api/view/out0010'
import { getOut0060VO, geOut0060DVO, exportTransTagRpt, exportTransRpt } from '@/api/view/out0060'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import themes from 'devextreme/ui/themes'

import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드

export default {
  name: 'out0060',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup
    // DxPopup
  },
  data() {
    return {
      deliRegRef: 'deliRegRef',
      deliInfoRef: 'deliInfoRef',
      popupVisible: false,
      mainFocusedRowData: {},
      deliReg: [],
      deliInfo: [],
      deliInfo2: [],
      facCodeList: [],
      printTypeList: [],
      custCodeList: [],
      printType: '',
      reqDtFrom: getPreDay(7),
      reqDtTo: getCurrentDate(),
      mnDtFrom: '',
      mnDtTo: '',
      searchComCode: '',
      searchCustCode: '',
      searchpartNo: '',

      facCodeparms: '',
      facCodeLookup: [],

      custCodeReadOnly: false,
      custCodeClear: true
    }
  },
  async created() {
    // 로그인시 조회기능 비활성화
    const param3 = {
      comCode: getComCode(),
      userId: getUserId()
    }
    getUserId_out0010(param3).then(res => {
      this.depCode = res.list[0].depCode
      this.checkId()
    })

    ///////

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
    getAccount(custCodeData).then(res => {
      res.list.forEach((item, i) => {
        if (item.custType == '30' || item.custType == '10') {
          this.custCodeList.push({
            value: item.custCode,
            text: item.custName
          })
        }
      })
    })
    this.setPrintType()
  },

  beforeMount() {
    this.facCode()
  },

  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.deliRegRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.deliInfoRef)
    }
  },
  mounted() {
    this.facCode()
  },
  methods: {
    async facCode() {
      let facParm = {
        comCode: getComCode()
      }

      let facCode = await getFactoryInfoData(facParm)
      //공장코드
      this.facCodeLookup = facCode.list
      this.facCodeparms = facCode.list[0].facCode
    },
    /// 조회 기능 비활성화
    checkId() {
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
          this.searchCustCode = this.custCodeList[0].value
        })
      }
    },
    ////////

    setPrintType() {
      for (let i = 0; i < 2; i++) {
        let text = ['프린터', '라벨기']
        let value = ['A4', 'TAG']
        this.printTypeList.push({
          value: value[i],
          text: text[i]
        })
      }
    },

    detailSearch(e) {
      //this.gridMainInstance.option("selectionFilter", ['id', '=', e.row.key])
      this.mainFocusedRowData = e.row.data

      let params = {
        comCode: getComCode(),
        facCode: e.row.data.facCode,
        ilno: e.row.data.ilno
      }
      geOut0060DVO(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })

          this.deliInfo = []
          this.deliInfo = res.list
        })
        .finally(this.gridDetailInstance.clearSelection())
    },
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
    btnSearch(e) {
      this.deliInfo = []
      if (!this.searchFacCode || !this.reqDtFrom || !this.reqDtTo) {
        notify(this.$t('공장명,날짜는 필수입력값 입니다.'), 'error', 1500)
        return
      }

      const searchData = {
        comCode: getComCode(),
        facCode: this.facCodeparms,
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        partNo: this.searchpartNo == null ? '' : this.searchpartNo.toString(),
        regiDate: this.reqDtFrom,
        ordNo: '',
        endDate: this.reqDtTo
      }
      console.log(searchData)
      getOut0060VO(searchData).then(res => {
        let cnt = 0
        if (res.list.length != 0) {
          notify(this.$t('조회되었습니다.'), 'success', 1500)
        }
        this.deliReg = res.list
        if (res.list.length == 0) {
          notify(this.$t('데이터가 없습니다.'), 'error', 1500)
          this.deliInfo = []
        }
      })
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.option('focusedRowIndex', -1)
      this.gridMainInstance.option('focusedRowIndex', 0)
    },

    async printTransRpt(e) {
      this.gridMainInstance.saveEditData()
      let params = await this.gridMainInstance.getSelectedRowsData()

      if (params.length <= 0) {
        return
      }

      exportTransRpt(params).then(res => {
        let blob = new Blob([res], {
          type: 'application/pdf'
        })
        //console.log('getJasperReportTest', blob)
        window.open(URL.createObjectURL(blob), '_blank')
      })
    },
    // async printSet(){
    //   let tagData = await this.gridDetailInstance.getSelectedRowsData()
    //   console.log('tagData', tagData)
    //   if (tagData.length == 0) {
    //       notify(this.$t('SelectCheck'), 'warning', 1500)
    //       return;
    //     }
    //   this.printType = 'A4'
    //   this.popupVisible = true
    // },
    async printTransTag(e) {
      let custCodeFilter = this.custCodeList.filter(x => x.value === this.searchCustCode)

      this.gridDetailInstance.saveEditData()

      let params = this.mainFocusedRowData
      let tagData = await this.gridDetailInstance.getSelectedRowsData()

      if (tagData.length <= 0) {
        return
      }

      // params.printType = this.printType
      params.detailData = tagData
      params.custName = custCodeFilter[0].text
      console.log(params.custName)

      console.log(params)
      exportTransTagRpt(params).then(res => {
        let blob = new Blob([res], {
          type: 'application/pdf'
        })
        // blob.type = 'application/pdf'

        window.open(URL.createObjectURL(blob), '_blank')
        // alert('test : ', res)
      })
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
