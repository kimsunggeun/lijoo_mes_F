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
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="facCodeList"
                    v-model="facCodeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facName')"
                    dense
                    outlined
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="selectMonthCal"
                    v-model="selectMonthCal"
                    :close-on-content-click="false"
                    transition="scale-transitionq"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$search'"
                        :label="$t('yearMonth')"
                        v-model="selectMonth"
                        dense
                        readonly
                        outlined
                        color="primary"
                        class="required mx-1"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="selectMonth" type="month" no-title @input="selectMonthCal = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="pa-2">
        <i-card-vertical
          style="color: black"
          headerTitle="workHourBreakTime"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete', //삭제
          ]"
          @btnAdd="btnAdd('근무시간')"
          @btnSave="btnSave('근무시간')"
          @btnDelete="btnDelete('근무시간')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="workingHourGrid"
                  class="listBox"
                  :ref="workingHourGridRef"
                  :data-source="workingHourGrid"
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
                  :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
                  @editing-start="workingHourGridEditingStart"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />

                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facName')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                    :min-width="120"
                  >
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>

                  <DxColumn
                    data-field="workType"
                    :caption="$t('workingType')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                  >
                    <DxLookup :data-source="workTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="workCode"
                    :caption="$t('workClassification')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                  >
                    <DxLookup :data-source="workCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>

                  <DxColumn data-field="startTime" :caption="$t('startTime')" data-type="string" alignment="center" width="auto" />
                  <DxColumn data-field="endTime" :caption="$t('endTime')" data-type="string" alignment="center" width="auto" />
                  <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" alignment="center" width="500px" />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                    width="auto"
                  />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <DxColumn data-field="maker" :caption="$t('maker')" data-type="string" alignment="center" :allow-editing="false"  width="auto"/>
                  <DxColumn data-field="editDate" :caption="$t('editDate')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <DxColumn data-field="editor" :caption="$t('editor')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="6" class="pa-2">
        <i-card-vertical
          headerTitle="workingDays"
          :useBtnList="[
            'btnCreate', //생성
            'btnSave', //저장
          ]"
          @btnAdd="btnAdd('근무일등록')"
          @btnSave="btnSave('근무일등록')"
          @btnDelete="btnDelete('근무일등록')"
          @btnCreate="btnCreate('근무일등록')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="workingDayGrid"
                  class="listBox"
                  key-expr="id"
                  :ref="workingDayGridRef"
                  :data-source="workingDayGrid"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  column-resizing-mode="widget"
                  :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
                  @editor-preparing="overrideOnValueChanged"
                  @cell-prepared="onCellPrepared"
                  @row-updating="rowUpdated"
                >
               

                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facName')"
                    data-type="string"
                    :min-width="120"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                    width="auto"
                  >
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="workDate"
                    :caption="$t('currDate')"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :min-width="120"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                    width="auto"
                  />

                  <DxColumn
                    data-field="week"
                    :caption="$t('week')"
                    css-class="devest-grid-header-require"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="holiType"
                    css-class="devest-grid-header-require"
                    :caption="$t('holiType')"
                    data-type="string"
                    :min-width="120"
                    alignment="center"
                    width="auto"
                  >
                    <DxLookup :data-source="holyTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>

                  <DxColumn data-field="holiName" :caption="$t('holiName')" alignment="center" width="auto"/>
                  <!-- <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                  /> -->
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" alignment="center" :allow-editing="false" width="auto"/>
                  <DxColumn data-field="maker" :caption="$t('maker')" alignment="center" :allow-editing="false" width="auto"/>
                  <DxColumn data-field="editDate" :caption="$t('editDate')" alignment="center" :allow-editing="false" width="auto"/>
                  <DxColumn data-field="editor" :caption="$t('editor')" alignment="center" :allow-editing="false" width="auto"/>
                  <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />

                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                  </template>
                     <!-- 옵션 --> 
                  <DxPager :show-page-size-selector="false" />
                  <DxPaging :enabled="false" />
                  <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <template>
      <v-dialog ref="dialog" v-model="timeSelectData.isShowValue" :return-value.sync="time" persistent width="290px">
        <v-time-picker v-model="timeSelectData.timeValue" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="timeSelectData.isShowValue = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="insertTime()"> OK </v-btn>
        </v-time-picker>
      </v-dialog>
    </template>
  </v-container>
</template>

<script>
import { DxDataGrid, DxEditing, DxColumn, DxLookup, DxPager } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import { DxDateBox, DxCalendarOptions } from 'devextreme-vue/date-box'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getWorkTime, setWorkTime, delWorkTime, getWorkDate, setWorkDate, delWorkDate, setMonthData } from '@/api/view/bas0130'

import { getCurrentDate } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'

export default {
  name: 'bas0130',
  mixins: [baseview, BaseDataGrid],

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,

    DxLookup,
    DxPager,
  },
  data() {
    return {
      //그리드 데이터
      workingHourGrid: [],
      workingDayGrid: [],
      time: null,
      menu2: false,
      modal2: false,
      week: ['일', '월', '화', '수', '목', '금', '토'],
      //시간 삽입 객체
      selectMonthCal: false,
      timeSelectData: {
        target: [],
        timeValue: null,
        isShowValue: false,
      },
      //ref
      workingHourGridRef: 'workingHourGridRef',
      workingDayGridRef: 'workingDayGridRef',
      //콤보박스 배열
      workCodeList: [],
      workTypeList: [],
      facCodeList: [],
      holyTypeList: [],
      //검색조건
      facCodeSelect: '',
      workCodeSelect: '',
      workTypeSelect: '',
      selectMonth: '',
      checkBoxesMode: 'always',
      changeValue: [],
    }
  },

  computed: {
    workingHourGridInstance() {
      return this.GetDataGrid(this.workingHourGridRef)
    },
    workingDayGridInstance() {
      return this.GetDataGrid(this.workingDayGridRef)
    },
  },
  watch: {
    changeValue: function () {
      let rowIndex = this.changeValue[0].row.rowIndex
      let selectDate = this.changeValue[0].row.data.workDate

      let year = selectDate.substr(0, 4)
      let month = selectDate.substr(5, 2)
      let day = selectDate.substr(8, 2)
      let string = new Date(year, month - 1, day)

      this.workingDayGridInstance.cellValue(rowIndex, 'week', this.week[string.getDay()])
    },
  },
  methods: {
    rowUpdated(e) {
      this.workingDayGridInstance.selectRows(e.key, true)
    },
    async btnCreate() {
      let message = ''
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        year: this.selectMonth.substr(0, 4),
        month: this.selectMonth.substr(5),
      }
      let data = await getWorkDate(params)
      console.log(data.list)
      if (data.list.length !== 0) {
        message = `[${this.selectMonth}] ${this.$t('createAlert')}`
      } else {
        message = `[${this.selectMonth}] ${this.$t('newCreate')}`
      }
      this.vToastifyPrompt(
        message,
        'info',
        (current) => {
          this.openLoading()
          setMonthData(params, true)
            .then(() => {
              this.doSearhworkingDayGrid()
              notify(this.$t('Saved'), 'success', 1500)
              this.endLoading()
            })
            .catch((error) => {
              notify(error, 'error', 1500)
              this.endLoading()
            })
            .finally(() => {})
        },
        null,
        true
      )
    },
    async comboListSet() {
      await getFactoryInfoData({ comCode: getComCode() })
        .then((res) => {
          res.list.forEach((e) => {
            this.facCodeList.push({
              text: e.facName,
              value: e.facCode,
            })
          })
        })
        .finally(() => {})
      this.facCodeSelect = this.facCodeList[0].value
      let params = {
        comCode: getComCode(),
        code: 'WORK_CODE,WORK_TYPE,HOLY_TYPE',
      }
      getCmChildCode(params).then((res) => {
        res.list
          .filter((word) => word.code === 'WORK_CODE')
          .forEach((e) => {
            this.workCodeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
        res.list
          .filter((word) => word.code === 'WORK_TYPE')
          .forEach((e) => {
            this.workTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
        res.list
          .filter((word) => word.code === 'HOLY_TYPE')
          .forEach((e) => {
            this.holyTypeList.push({
              value: e.sysCode,
              text: e.sysName,
            })
          })
      })
    },
    overrideOnValueChanged(e) {
      if (e.dataField == 'workDate') {
        const array = this.changeValue
        const onValueChanged = e.editorOptions.onValueChanged
        e.editorOptions.onValueChanged = function (args) {
          onValueChanged.apply(this, arguments)
          array.pop()
          array.push(e)
        }
      }
    },
    insertTime() {
      this.$refs.dialog.save(this.timeSelectData.timeValue)

      let rowIndex = this.workingHourGridInstance.getRowIndexByKey(this.timeSelectData.target.key)
      let target = this.timeSelectData.target.column.dataField
      let value = this.timeSelectData.timeValue

      this.workingHourGridInstance.cellValue(rowIndex, target, value)
      this.workingHourGridInstance.saveEditData()
    },
    workingHourGridEditingStart(e) {
      if (e.column.dataField === 'startTime' || e.column.dataField === 'endTime') {
        e.cancel = true
        this.timeSelectData.target = e
        if (e.column.dataField === 'startTime') {
          this.timeSelectData.timeValue = e.data.startTime === '' ? '08:30' : e.data.startTime
        }
        if (e.column.dataField === 'endTime') {
          this.timeSelectData.timeValue = e.data.endTime === '' ? '17:30' : e.data.endTime
        }
        this.timeSelectData.isShowValue = true
      }
    },

    async doSearhworkingHourGrid(event) {
      this.workingHourGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        workType: this.workTypeSelect,
        workCode: this.workCodeSelect,
      }

      if (event) {
        params.facCode = ''
        params.workType = ''
        params.workCode = ''
      }
      await getWorkTime(params)
        .then((res) => {
          let cnt = 0
          res.list.forEach((e) => {
            e.id = cnt++
          })
          this.workingHourGrid = res.list
        })
        .finally(() => {
          this.endLoading()
          this.workingHourGridInstance.option('focusedRowIndex', 0)

          this.workingHourGridInstance.saveEditData()
        })
    },
    async doSearhworkingDayGrid(event) {
      this.workingDayGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        year: this.selectMonth.substr(0, 4),
        month: this.selectMonth.substr(5),
      }

      if (event) {
        params.facCode = this.facCodeSelect
        params.year = this.selectMonth.substr(0, 4)
        params.month = this.selectMonth.substr(5)
      }
      await getWorkDate(params)
        .then((res) => {
          let cnt = 0
          res.list.forEach((e) => {
            e.id = cnt++
          })
          this.workingDayGrid = res.list
        })
        .finally(() => {
          this.endLoading()
          this.workingDayGridInstance.option('focusedRowIndex', 0)
          this.workingDayGridInstance.saveEditData()
        })
    },
    btnAdd(gbn) {
      if (gbn === '근무시간') {
        let newRow = {
          id: this.workingHourGrid.length === 0 ? 0 : this.workingHourGrid.length,
          comCode: getComCode(),
          facCode: '',
          workType: '',
          workCode: '',
          startTime: '',
          endTime: '',
          remark: '',
          userFlag: 'Y',
          makeDate: '',
          maker: getUserId(),
          editDate: '',
          editor: '',
          __modified__: false,
          __created__: true,
        }
        this.workingHourGridInstance.newRow(newRow)
        this.workingHourGridInstance.selectRows(newRow.id, true)
        this.workingHourGridInstance.option('focusedRowIndex', -1)
        this.workingHourGridInstance.saveEditData()
      } else if (gbn === '근무일등록') {
        let newRow = {
          id: this.workingDayGrid.length === 0 ? 0 : this.workingDayGrid.length,
          comCode: getComCode(),
          facCode: '',
          workDate: null,
          week: null,
          holiType: '',
          holiName: '',
          remark: '',
          userFlag: 'Y',
          makeDate: '',
          maker: getUserId(),
          editDate: '',
          editor: '',
          __modified__: false,
          __created__: true,
        }
        this.workingDayGridInstance.newRow(newRow)
        this.workingDayGridInstance.selectRows(newRow.id, true)
        this.workingDayGridInstance.option('focusedRowIndex', -1)
        this.workingDayGridInstance.saveEditData()
      }
    },
    async btnSave(gbn) {
      let message = ''
      if (gbn === '근무시간') {
        await this.workingHourGridInstance.saveEditData()
        let selectedMainRows = await this.workingHourGridInstance.getSelectedRowsData()
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (let row of selectedMainRows) {
          if (!row.facCode || !row.workType || !row.workCode) {
            this.vToastify(`${this.$t('requiredCheck')} [${this.$t('facCode')}, ${this.$t('workType')}, ${this.$t('workCode')}]`, 'warn')

            return
          }
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }

        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          (current) => {
            this.openLoading()
            this.workingHourGridInstance.beginUpdate()
            setWorkTime(selectedMainRows, true)
              .then((res) => {
                this.doSearhworkingHourGrid()
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch((error) => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.workingHourGridInstance.endUpdate()
                this.workingHourGridInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '근무일등록') {
        await this.workingDayGridInstance.saveEditData()
        let selectedMainRows = await this.workingDayGridInstance.getSelectedRowsData()
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (let row of selectedMainRows) {
          if (!row.facCode || !row.workDate || !row.holiType) {
            this.vToastify(`${this.$t('requiredCheck')} [${this.$t('facCode')}, ${this.$t('workType')}, ${this.$t('holiType')}]`, 'warn')

            return
          }
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
          let year = row.workDate.substr(0, 4)
          let month = row.workDate.substr(5, 2)
          let day = row.workDate.substr(8, 2)

          row.workDate = `${year}-${month}-${day}`
        }
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          (current) => {
            this.openLoading()
            this.workingDayGridInstance.beginUpdate()
            setWorkDate(selectedMainRows, true)
              .then((res) => {
                this.doSearhworkingHourGrid()
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch((error) => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.workingDayGridInstance.endUpdate()
                this.workingDayGridInstance.clearSelection()
                this.workingDayGridInstance.saveEditData()

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
      if (gbn === '근무시간') {
        await this.workingHourGridInstance.saveEditData()
        let selectedMainRows = await this.workingHourGridInstance.getSelectedRowsData()
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.workingHourGridInstance.beginUpdate()
            delWorkTime(selectedMainRows, true)
              .then((res) => {
                this.doSearhworkingHourGrid(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch((error) => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.workingHourGridInstance.endUpdate()
                this.workingHourGridInstance.clearSelection()
                this.workingHourGridInstance.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '근무일등록') {
        await this.workingDayGridInstance.saveEditData()
        let selectedMainRows = await this.workingDayGridInstance.getSelectedRowsData()
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.workingDayGridInstance.beginUpdate()
            delWorkDate(selectedMainRows, true)
              .then((res) => {
                this.doSearhworkingDayGrid(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch((error) => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.workingDayGridInstance.endUpdate()
                this.workingDayGridInstance.clearSelection()
                this.workingDayGridInstance.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    onCellPrepared(e) {
      if (
        e.rowType === 'data' &&
        (e.column.dataField === 'workDate' || e.column.dataField === 'week' || e.column.dataField === 'holiType') &&
        e.data.holiType === '2'
      ) {
        if (e.data.week === '토') {
          e.cellElement.style.color = 'blue'
        } else {
          e.cellElement.style.color = 'red'
        }
      }
    },
    btnSearch() {
      this.doSearhworkingHourGrid()
      this.doSearhworkingDayGrid()
    },
  },
  mounted() {
    this.comboListSet().then(() => {
      this.doSearhworkingHourGrid(true)
      this.doSearhworkingDayGrid(true)
    })
  },
  created() {},
  beforeMount() {
    this.selectMonth = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
  },
}
</script>
<style lang="less" scoped>
</style>