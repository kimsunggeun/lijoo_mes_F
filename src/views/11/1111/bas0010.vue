+<template>
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
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="name"
                    item-value="code"
                    :items="codegrList"
                    v-model="codegrSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('codegr')"
                    dense
                    outlined
                    multiple
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="text"
                    item-value="value"
                    :items="userFlagList"
                    v-model="userFlagSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('userFlag')"
                    dense
                    outlined
                    multiple
                    clearable
                  >
                  </v-autocomplete>
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
          headerTitle="commonCodeTitle"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnAdd="btnAdd('공통코드')"
          @btnSave="btnSave('공통코드')"
          @btnDelete="btnDelete('공통코드')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="bas0010MainGrid"
                  class="listBox"
                  :ref="dxDataGridRef"
                  :data-source="bas0010MainGrid"
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
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                  @focused-row-changed="focusRowChanged_MainGrid"
                  @editing-start="bas0010EditingStart"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />

                  <DxColumn
                    data-field="codegr"
                    :caption="$t('codegr')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="codegrList" display-expr="name" value-expr="code" />
                  </DxColumn>

                  <DxColumn
                    data-field="code"
                    :caption="$t('code')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn data-field="codeName" :caption="$t('codeName')" width="auto" data-type="string" alignment="left" />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                  />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="cnter" />
                  <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="6" class="pa-2">
        <i-card-vertical
          headerTitle="commonCodeDetail"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnAdd="btnAdd('공통코드상세')"
          @btnSave="btnSave('공통코드상세')"
          @btnDelete="btnDelete('공통코드상세')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="bas0011DetailGrid"
                  class="listBox"
                  :ref="dxDataGridDetailRef"
                  :data-source="bas0011DetailGrid"
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
                  column-resizing-mode="widget"
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                  @editing-start="bas0011EditingStart"
                  @row-updating="rowUpdated"
                >
                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" alignment="center" :visible="false" />
                  <DxColumn
                    data-field="codegr"
                    :caption="$t('codegr')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="codegrList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="code"
                    :caption="$t('code')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="sysCode"
                    :caption="$t('sysCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn data-field="sysName" :caption="$t('sysName')" width="auto" data-type="string" alignment="left" />
                  <DxColumn data-field="sortFlag" :caption="$t('sortFlag')" width="auto" data-type="number" alignment="right" format="#,###" />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                  />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>

                  <DxColumn 
                        data-field="" 
                        caption="" 
                        data-type="string" 
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                  <!-- 옵션 -->
                  <DxPager :show-page-size-selector="false" />
                  <DxPaging :enabled="false" />
                  <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxSelection select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />
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
import { DxDataGrid, DxEditing, DxColumn, DxLookup, DxPager } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message

import { getCmCode, getCmChildCode, createCmCode, createCmChildCode, deleteCmCode, deleteCmChildCode } from '@/api/system/cmCodeManage'
import { getCurrentDate } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'

export default {
  name: 'pro0010',
  mixins: [baseview, BaseDataGrid],

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    DxPager
  },
  data() {
    return {
      dxDataGridRef: 'dxDataGridRef',
      dxDataGridDetailRef: 'dxDataGridDetailRef',
      bas0010MainGrid: [],
      bas0011DetailGrid: [],
      listClickData: null,
      codeList: [],
      codegrSelect: '',
      userFlagSelect: '',
      userFlagList: [
        {
          text: '사용함',
          value: 'Y'
        },
        { text: '사용안함', value: 'N' }
      ],
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      //공통코드 콤보박스리스트
      codegrList: []
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.dxDataGridDetailRef)
    }
  },
  methods: {
    rowUpdated(e) {
      this.gridDetailInstance.selectRows(e.key, true)
    },
    async codegrListPro() {
      let param = {
        comCode: getComCode(),
        code: 'GR_CODE',
        codegr: 'COM'
      }
      let array = await getCmChildCode(param)
      array.list.forEach(e => {
        this.codegrList.push({
          name: e.sysName,
          code: e.sysCode
        })
      })
    },
    // PK 인부분 수정[편집]기능 제어
    bas0010EditingStart(e) {
      if (e.data.__created__ === false) {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'codegr' ||
          e.column.dataField === 'code' ||
          e.column.dataField === 'makeDate' ||
          e.column.dataField === 'maker' ||
          e.column.dataField === 'editDate' ||
          e.column.dataField === 'editor'
        ) {
          e.cancel = true
        }
      } else {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'makeDate' ||
          e.column.dataField === 'maker' ||
          e.column.dataField === 'editDate' ||
          e.column.dataField === 'editor'
        ) {
          e.cancel = true
        }
      }
    },
    bas0011EditingStart(e) {
      if (e.data.__created__ === false) {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'codegr' ||
          e.column.dataField === 'code' ||
          e.column.dataField === 'sysCode' ||
          e.column.dataField === 'makeDate' ||
          e.column.dataField === 'maker' ||
          e.column.dataField === 'editDate' ||
          e.column.dataField === 'editor'
        ) {
          e.cancel = true
        }
      } else {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'codegr' ||
          e.column.dataField === 'makeDate' ||
          e.column.dataField === 'maker' ||
          e.column.dataField === 'editDate' ||
          e.column.dataField === 'editor'
        ) {
          e.cancel = true
        }
      }
    },
    btnSearch() {
      this.doSearchMainList()
      this.doSearchDetailList()
    },
    doSearchMainList(event) {
      this.openLoading('searching')
      let params = {}
      if (event) {
        params = {
          comCode: getComCode(),
          codegr: '',
          userFlag: ''
        }
      } else {
        params = {
          comCode: getComCode(),
          codegr: this.codegrSelect.toString(),
          userFlag: this.userFlagSelect.toString()
        }
      }
      getCmCode(params)
        .then(res => {
          this.bas0010MainGrid = res.list
          res.list.forEach(item => {
            for (let i = 0; i < this.codegrList.length; i++) {
              if (item.codegr === this.codegrList[i].code) {
                item.codegrName = this.codegrList[i].name
              }
            }
          })
          if (event) {
            res.list.forEach(item => {
              this.codeList.push({
                value: item.code,
                text: item.codeName
              })
            })
          }
        })
        .finally(() => {
          this.endLoading()
          this.gridMainInstance.option('focusedRowIndex', 0)
          this.listClickData = this.bas0010MainGrid[0]
          this.gridMainInstance.saveEditData()
          this.doSearchDetailList()
        })
    },
    doSearchDetailList(e) {
      this.openLoading('searching')
      this.gridDetailInstance.clearSelection()
      let params = {
        comCode: getComCode(),
        codegr: this.listClickData.codegr,
        code: this.listClickData.code
      }

      getCmChildCode(params)
        .then(res => {
          this.bas0011DetailGrid = [] // 초기화

          if (this.listClickData === '') {
            this.bas0011DetailGrid = res.list
          } else {
            // let cnt = 0
            // this.bas0011OriginData = 0
            res.list.forEach(e => {
              if (this.listClickData.codegr === e.codegr && this.listClickData.code === e.code) {
                // e.id = cnt++
                // this.bas0011OriginData = e.id
                this.bas0011DetailGrid.push(e)
              }
            })
          }
        })
        .finally(() => {
          this.endLoading()
          // console.log(this.bas0011DetailGrid)
        })
    },
    // listClick(e) {
    //   if (e.rowType === 'data') {
    //     if (e.rowIndex !== -1) {
    //       this.bas0011DetailGrid = []
    //       if (e.data) {
    //         this.listClickData = e.data
    //       } else {
    //         this.listClickData = null
    //       }
    //       this.doSearchDetailList()
    //     }
    //   }
    // },
    focusRowChanged_MainGrid(e) {
      if (e.row === undefined) {
        return
      }
      this.bas0011DetailGrid = []
      this.listClickData = e.row.data
      this.doSearchDetailList()      
    },
    btnAdd(gbn) {
      if (gbn === '공통코드') {
        let check = this.bas0010MainGrid.findIndex(e => e.__created__ === true)
        if (check === -1) {
          let newRow = {
            id: this.bas0010MainGrid.length + 1,
            comCode: getComCode(),
            codegr: '',
            code: '',
            codeName: '',
            userFlag: 'Y',
            makeDate: '',
            maker: getUserId(),
            editDate: '',
            editor: '',
            __modified__: false,
            __created__: true
          }
          this.gridMainInstance.newRow(newRow)
          this.gridMainInstance.selectRows(newRow.id, true)
          this.gridMainInstance.option('focusedRowIndex', -1)
          this.gridMainInstance.saveEditData()
        } else {
          notify(this.$t('newArrowCheck'), 'error', 1500)
        }
      } else if (gbn === '공통코드상세') {
        let newRow = {
          id: this.bas0011DetailGrid.length + 1,
          comCode: this.listClickData.comCode,
          codegr: this.listClickData.codegr,
          code: this.listClickData.code,
          sysCode: '',
          codeName: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __modified__: false,
          __created__: true
        }
        this.gridDetailInstance.newRow(newRow)
        this.gridDetailInstance.selectRows(newRow.id, true)
        this.gridDetailInstance.option('focusedRowIndex', -1)
        this.gridDetailInstance.saveEditData()
      }
    },
    async btnSave(gbn) {
      let message = ''
      if (gbn === '공통코드') {
        await this.gridMainInstance.saveEditData()
        let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (let row of selectedMainRows) {
          let id = row.id
          console.log(id)
          if (!row.codegr || !row.code) {
            this.vToastify(`${this.$t('requiredCheck')}[${this.$t('codegr')}, ${this.$t('code')}]`, 'warn')
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
          current => {
            this.openLoading()
            this.gridMainInstance.beginUpdate()

            createCmCode(selectedMainRows, true)
              .then(res => {
                this.doSearchMainList(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridMainInstance.endUpdate()
                this.listClickData = selectedMainRows[0]
                this.doSearchDetailList()
              })
          },
          null,
          true
        )
      } else if (gbn === '공통코드상세') {
        await this.gridDetailInstance.saveEditData()
        let selectedMainRows = await this.gridDetailInstance.getSelectedRowsData()
        console.log(selectedMainRows)
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row of selectedMainRows) {
          if (!row.codegr || !row.code || !row.sysCode) {
            this.vToastify(`${this.$t('requiredCheck')}[${this.$t('codegr')}, ${this.$t('code')},${this.$t('sysCode')}]`, 'warn')
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
          current => {
            this.openLoading()
            this.gridDetailInstance.beginUpdate()
            createCmChildCode(selectedMainRows, true)
              .then(res => {
                this.doSearchDetailList(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridDetailInstance.endUpdate()
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
      if (gbn === '공통코드') {
        await this.gridMainInstance.saveEditData()
        let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.gridMainInstance.beginUpdate()

            deleteCmCode(selectedMainRows, true)
              .then(res => {
                this.doSearchMainList(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridMainInstance.endUpdate()
                this.gridMainInstance.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '공통코드상세') {
        await this.gridDetailInstance.saveEditData()
        let selectedMainRows = await this.gridDetailInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row of selectedMainRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.gridDetailInstance.beginUpdate()
            deleteCmChildCode(selectedMainRows, true)
              .then(res => {
                this.doSearchDetailList(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridDetailInstance.endUpdate()

                this.endLoading()
              })
          },
          null,
          true
        )
      }
    }
  },
  mounted() {
    this.codegrListPro().then(() => {
      this.doSearchMainList(true)
    })
  },
  created() {
    // const params = {
    //     comCode : getComCode(),
    //     userId : getUserId(),
    //     moduleCode : this.$localStore.get('moduleCode'),
    //     menuCode: this.$localStore.get('menuCode'),
    //     cnntDate: getDateFormat(new Date()),
    // }
    // saveMenuStatistics(params)
  },
  beforeMount() {}
}
</script>
<style lang="less" scoped></style>
