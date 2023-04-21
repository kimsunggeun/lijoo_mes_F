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
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="name"
                    item-value="code"
                    :items="insList"
                    v-model="insSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('inspection')"
                    dense
                    outlined
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
      <v-col cols="3" class="pa-2">
        <i-card-vertical
          style="color: black"
          headerTitle="inspectionType"
          :useBtnList="[]"
          @btnAdd="btnAdd('검사유형')"
          @btnSave="btnSave('검사유형')"
          @btnDelete="btnDelete('검사유형')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="inspecTypeGrid"
                  class="listBox"
                  :ref="inspecTypeGridRef"
                  :data-source="inspecTypeGrid"
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
                  @focused-row-changed="focusedRowChanged_inspecTypeGrid"
                  @cellClick="listClick"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxColumn data-field="insCode" :caption="$t('insCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="insName" :caption="$t('insName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn 
                    data-field="" 
                    caption="" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="9" class="pa-2">
        <i-card-vertical
          headerTitle="inspectionItems"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnAdd="btnAdd('검사항목')"
          @btnSave="btnSave('검사항목')"
          @btnDelete="btnDelete('검사항목')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="InspecItemGrid"
                  class="listBox"
                  key-expr="id"
                  :ref="inspecItemGridRef"
                  :data-source="inspecItemGrid"
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
                  :column-auto-width="true"
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                  @row-updating="rowUpdated"
                >
                  <DxColumn
                    data-field="insCode"
                    :caption="$t('insCode')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                    width="auto"
                  >
                    <DxLookup :data-source="insList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="insType"
                    :caption="$t('insType')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                  >
                    <DxLookup :data-source="insTypeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="insMeth"
                    :caption="$t('insMeth')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                  >
                    <DxLookup :data-source="insMethList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="jugCodeh"
                    :caption="$t('jugCodeh')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                  >
                    <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                    width="auto"
                  />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn 
                    data-field="" 
                    caption="" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />

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
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getUserId, getComCode } from '@/utils/token'
import { getInspecType, getInspecItem, saveInspecItem, delInspecItem } from '@/api/view/bas0410'
export default {
  name: 'bas0410',
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
      //검색조건 관련
      insSelect: '',

      userFlagSelect: '',
      //그리드 클릭이벤트 관련
      listClickData: null,
      //그리드 관련
      inspecItemGrid: [],
      inspecTypeGrid: [],
      //팝업관련
      //그리드  Ref
      inspecTypeGridRef: 'inspecTypeGridRef',
      inspecItemGridRef: 'inspecItemGridRef',
      //로우헤더
      checkBoxesMode: 'always',
      //Ref

      //공통코드 콤보박스리스트
      insList: [],
      insTypeList: [],
      insMethList: [],
      jugCodehList: [],
      userFlagList: []
    }
  },
  computed: {
    inspecTypeGridInstance() {
      return this.GetDataGrid(this.inspecTypeGridRef)
    },
    inspecItemGridInstance() {
      return this.GetDataGrid(this.inspecItemGridRef)
    }
  },
  methods: {
    rowUpdated(e) {
      this.inspecItemGridInstance.selectRows(e.key, true)
    },
    btnAdd(gbn) {
      if (gbn === '검사항목') {
        let newRow = {
          comCode: getComCode(),
          id: this.inspecItemGrid.length,
          insCode: this.listClickData.insCode,
          insType: '',
          insMeth: '',
          jugCodeh: '',
          userFlag: 'Y',
          makeDate: '',
          maker: getUserId(),
          editor: '',
          __modified__: false,
          __created__: true
        }
        this.inspecItemGridInstance.newRow(newRow)
        this.inspecItemGridInstance.selectRows(newRow.id, true)

        this.inspecItemGridInstance.option('focusedRowIndex', -1)
        this.inspecItemGridInstance.saveEditData()
      }
    },
    async btnSave(gbn) {
      let message = ''
      if (gbn === '검사항목') {
        await this.inspecItemGridInstance.saveEditData()
        let selectedMainRows = await this.inspecItemGridInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (let row of selectedMainRows) {
          if (!row.insCode || !row.insType || !row.insMeth || !row.jugCodeh) {
            this.vToastify(
              `${this.$t('requiredCheck')} [${this.$t('insCode')}, ${this.$t('insType')}, ${this.$t('insMeth')}, ${this.$t('jugCodeh')}]`,
              'warn'
            )

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
            this.inspecItemGridInstance.beginUpdate()
            saveInspecItem(selectedMainRows, true)
              .then(res => {
                this.doSearchinspecItemGrid()
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.inspecItemGridInstance.endUpdate()
                this.inspecItemGridInstance.clearSelection()
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
      if (gbn === '검사항목') {
        await this.inspecItemGridInstance.saveEditData()
        let selectedMainRows = await this.inspecItemGridInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.inspecItemGridInstance.beginUpdate()

            delInspecItem(selectedMainRows, true)
              .then(res => {
                this.doSearchinspecItemGrid()
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.inspecItemGridInstance.endUpdate()
                this.inspecItemGridInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    listClick(e) {
      if (e.rowIndex !== -1 && e.rowType === 'data') {
        this.priceGrid = []

        if (e.data) {
          this.listClickData = e.data
        } else {
          this.listClickData = null
        }

        this.doSearchinspecItemGrid()
      }
    },
    focusedRowChanged_inspecTypeGrid(e) {
      if (e.row === undefined) {
        return
      }
      this.priceGrid = []
      this.listClickData = e.row.data
      this.doSearchinspecItemGrid()
    },
    btnSearch() {
      this.doSearhInspecTypeGrid()
    },
    //검사항목 테이블 조회
    doSearchinspecItemGrid() {
      this.inspecItemGridInstance.option('focusedRowKey', undefined)
      this.inspecItemGridInstance.clearSelection()
      this.inspecItemGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        insCode: this.listClickData.insCode
      }

      getInspecItem(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.inspecItemGrid = res.list
        })
        .finally(() => {
          this.endLoading()
        })
    },

    //검사유형 테이블 조회
    doSearhInspecTypeGrid(event) {
      this.inspecTypeGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        insCode: this.insSelect
      }

      if (event) {
        params.insCode = ''
      }
      getInspecType(params)
        .then(res => {
          if (event) {
            res.list.forEach(element => {
              this.insList.push({
                name: element.insName,
                code: element.insCode
              })
            })
          }
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.inspecTypeGrid = res.list
        })
        .finally(() => {
          this.endLoading()
          this.inspecTypeGridInstance.option('focusedRowIndex', 0)
          this.listClickData = this.inspecTypeGrid[0]

          this.doSearchinspecItemGrid()
        })
    },
    async comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'INS_TYPE,JUG_CODEH,INS_METH,USER_YN'
      }

      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'INS_TYPE')
          .forEach(e => {
            this.insTypeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'INS_METH')
          .forEach(e => {
            this.insMethList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'USER_YN')
          .forEach(e => {
            this.userFlagList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      })
    }
  },
  mounted() {
    this.comboListSet()
  },
  created() {}
}
</script>
<style lang="less" scoped></style>
