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
                    item-text="name"
                    item-value="code"
                    :items="insCodeList"
                    v-model="insCodeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('insName')"
                    dense
                    outlined
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="partNoInput"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="3" class="pa-2">
        <i-card-vertical style="color: black" headerTitle="inspectionType" :useBtnList="['btnCopy']" @btnCopy="btnPopup()">
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
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @focused-row-changed="focusedRowChanged_inspecTypeGrid"
                  @cellClick="listClick"
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
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
                    data-field="insCodeName"
                    :caption="$t('insName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="9" class="pa-2">
        <i-card-vertical
          headerTitle="qualityStandardInfo"
          :useBtnList="[
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnSave="btnSave('품질기준정보')"
          @btnDelete="btnDelete('품질기준정보')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="qualityMasterInfo"
                  class="listBox"
                  :ref="quaStanInfoGridRef"
                  :data-source="quaStanInfoGrid"
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
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                  @editor-preparing="overrideOnValueChanged"
                  @row-updating="rowUpdated"
                >
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="insCode"
                    :caption="$t('insCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="insCodeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="insType"
                    :caption="$t('insType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="insTypeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="insMeth"
                    :caption="$t('insMeth')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="insMethList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="jugCodeh"
                    css-class="devest-grid-header-require"
                    :caption="$t('jugCodeh')"
                    width="auto"
                    :allow-editing="false"
                    data-type="string"
                    alignment="center"
                  >
                    <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="inspNo"
                    css-class="devest-grid-header-require"
                    :caption="$t('inspNo')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    format="#,###"
                    :allow-editing="true"
                  />
                  <DxColumn data-field="insUnit" :caption="$t('insUnit')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                    <DxLookup :data-source="insUnitList" display-expr="name" value-expr="code" />
                  </DxColumn>

                  <DxColumn data-field="insBase" :caption="$t('insBase')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                  <DxColumn data-field="insUpp" :caption="$t('insUpp')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                  <DxColumn data-field="insLow" :caption="$t('insLow')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                  <DxColumn data-field="insCnt" :caption="$t('insCnt')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                    <DxLookup :data-source="sample" display-expr="text" value-expr="value" />
                  </DxColumn>

                  <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true" />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                    edit-cell-template="checkBoxEditor"
                  />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
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
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <DxPopup :visible.sync="itemPopup" :show-close-button="true" :show-title="true" :title="popupText.title" height="auto" width="40%">
      <v-row no-gutters>
        <v-col class="pa-0 ma-0">
          <i-card-vertical :headerTitle="popupText.header">
            <template v-slot:body>
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
                >
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" :allow-editing="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="left"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partName" :caption="$t('partName')" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="spec"
                    :caption="$t('spec')"
                    data-type="string"
                    alignment="left"
                    :min-width="150"
                    width="auto"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="count"
                    :caption="$t('regItem')"
                    data-type="string"
                    alignment="right"
                    width="auto"
                    :allow-editing="false"
                  />
                </DxDataGrid>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="insertData()"> {{ $t('copy') }} </v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="itemPopup = false">
            {{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup, DxPager } from 'devextreme-vue/data-grid'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getUserId, getComCode } from '@/utils/token'
import { DxPopup } from 'devextreme-vue/popup'
import { getInspecType, getQuaStanInfo, setQuaStanInfo, delQuaStanInfo, getPartList, setPartCopy } from '@/api/view/bas0420'
export default {
  name: 'bas0420',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxPopup,
    DxPager
  },
  data() {
    return {
      //검색조건 관련
      sample: [
        {
          text: '1개',
          value: 1
        },
        {
          text: '2개',
          value: 2
        },
        {
          text: '3개',
          value: 3
        },
        {
          text: '4개',
          value: 4
        },
        {
          text: '5개',
          value: 5
        }
      ],
      partNoInput: '',
      insCodeSelect: '',
      //그리드 클릭이벤트 관련
      listClickData: null,
      //그리드 관련
      inspecTypeGrid: [],
      quaStanInfoGrid: [],
      popupInfoGrid: [],
      //팝업관련
      itemPopup: false,
      popupText: {
        title:'', 
        header:''
      },
      //그리드 Ref
      inspecTypeGridRef: 'inspecTypeGridRef',
      quaStanInfoGridRef: 'quaStanInfoGridRef',
      popupInfoGridRef: 'popupInfoGridRef',

      //공통코드 콤보박스 리스트
      insCodeList: [],
      insTypeList: [],
      insMethList: [],
      jugCodehList: [],
      insUnitList: [],
      partNoList: [],

      //로우헤더
      checkBoxesMode: 'always',
      changeValue: [],
      
    }
  },
  computed: {
    inspecTypeGridInstance() {
      return this.GetDataGrid(this.inspecTypeGridRef)
    },
    quaStanInfoGridInstance() {
      return this.GetDataGrid(this.quaStanInfoGridRef)
    },
    popupInfoGridInstance() {
      return this.GetDataGrid(this.popupInfoGridRef)
    },
    popTitle() {
      return 
    }
  },
  watch: {
    listClickData: function() {
      this.popupText.title = this.$t('itemInfo') +  ' [' + this.listClickData.insCodeName + ']'
      this.popupText.header = ` ${this.listClickData.partNo} (${this.listClickData.partName}) `
    }, 
    changeValue: function() {
      this.quaStanInfoGridInstance.cellValue(this.changeValue[0].row.rowIndex, 'userFlag', 'Y')
    }
  },
  methods: {
        rowUpdated(e) {
      this.quaStanInfoGridInstance.selectRows(e.key, true)
    },
    //편집이벤트
    overrideOnValueChanged(e) {
      if (e.dataField == 'inspNo') {
        const a = this.changeValue
        const onValueChanged = e.editorOptions.onValueChanged
        e.editorOptions.onValueChanged = function(args) {
          onValueChanged.apply(this, arguments)
          a.pop()
          a.push(e)
        }
      }
    },
    //공통코드 콤보박스
    async comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'INS_METH,INS_TYPE,INPT,JUG_CODEH,UNIT'
      }
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'INPT')
          .forEach(e => {
            this.insCodeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'INS_TYPE')
          .forEach(e => {
            this.insTypeList.push({
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
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'UNIT')
          .forEach(e => {
            this.insUnitList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      })
    },
    //검사유형 조회
    async doSearhinspecTypeGrid() {
      this.inspecTypeGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        partNo: this.partNoInput,
        insCode: this.insCodeSelect
      }
      await getInspecType(params)
        .then(res => {
          this.inspecTypeGrid = res.list
          let cnt = 0
          res.list.forEach(element => {
            element.id = cnt++
          })
        })
        .catch(error => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.inspecTypeGridInstance.endUpdate()
          this.inspecTypeGridInstance.clearSelection()
          this.inspecTypeGridInstance.option('focusedRowIndex', 0)
          this.listClickData = this.inspecTypeGrid[0]
          this.doSearhquaStanInfoGrid()
          this.endLoading()
        })
    },
    //품질기준정보 조회
    doSearhquaStanInfoGrid() {
      this.quaStanInfoGrid = []
      if(!this.listClickData){
        return
      }
      getQuaStanInfo(this.listClickData)
        .then(res => {
          let cnt = 0
          res.list.forEach(element => {
            element.comCode = this.listClickData.comCode
            element.partNo = this.listClickData.partNo
            element.partName = this.listClickData.partName
            element.id = cnt++
          })
          this.quaStanInfoGrid = res.list
        })
        .catch(error => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.quaStanInfoGridInstance.endUpdate()
          this.quaStanInfoGridInstance.clearSelection()
          this.endLoading()
        })
    },
    //검사유형 클릭이벤트
    listClick(e) {
      if (e.rowIndex !== -1 && e.rowType === 'data') {
        this.quaStanInfoGrid = []
        if (e.data) {
          this.listClickData = e.data
          this.doSearhquaStanInfoGrid()
        } else {
          this.listClickData = null
        }
      }
    },
    focusedRowChanged_inspecTypeGrid(e) {
      if (e.row === undefined) {
        return
      }
      this.quaStanInfoGrid = []
      this.listClickData = e.row.data
      this.doSearhquaStanInfoGrid()
    },
    //검색
    btnSearch() {
      this.doSearhinspecTypeGrid()
    },
    //추가
    btnAdd(gbn) {
      if (gbn === '품질기준정보') {
        if (this.listClickData !== null) {
          let newRow = {
            comCode: getComCode(),
            id: this.quaStanInfoGrid.length,
            partNo: this.listClickData.partNo,
            inspNo: '',
            insCode: this.listClickData.insCode,
            insType: '',
            insMeth: '',
            jugCodeh: '',
            insUnit: '',
            insBase: '',
            insUpp: '',
            insLow: '',
            insCnt: '',
            remark: '',
            userFlag: 'N',
            makeDate: '',
            maker: getUserId(),
            editDate: '',
            editor: '',
            __modified__: false,
            __created__: true
          }
          this.quaStanInfoGridInstance.newRow(newRow)
          this.quaStanInfoGridInstance.selectRows(newRow.id, true)
          this.quaStanInfoGridInstance.option('focusedRowIndex', -1)
          this.quaStanInfoGridInstance.saveEditData()
        } else {
          this.vToastify(this.$t('SelectCheck'), 'warn')
        }
      }
    },
    //저장
    async btnSave(gbn) {
      let message = ''
      if (gbn === '품질기준정보') {
        await this.quaStanInfoGridInstance.saveEditData()
        let selectedMainRows = await this.quaStanInfoGridInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (let row of selectedMainRows) {
          if (!row.insCode || !row.insType || !row.insMeth || !row.inspNo) {
            this.vToastify(
              `${this.$t('requiredCheck')} [${this.$t('insCode')},${this.$t('inspNo')},${this.$t('insType')},${this.$t('insMeth')}]`,
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
            this.quaStanInfoGridInstance.beginUpdate()

            setQuaStanInfo(selectedMainRows, true)
              .then(res => {
                this.doSearhquaStanInfoGrid(false)
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.quaStanInfoGridInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //삭제
    async btnDelete(gbn) {
      let message = ''
      if (gbn === '품질기준정보') {
        await this.quaStanInfoGridInstance.saveEditData()
        let selectedMainRows = await this.quaStanInfoGridInstance.getSelectedRowsData()

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.quaStanInfoGridInstance.beginUpdate()

                delQuaStanInfo(selectedMainRows, true)
                .then(res => {
                  this.doSearhquaStanInfoGrid()
                  message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                  notify(this.$t(message), 'success', 1500)
                })
                .catch(error => {
                  notify(error, 'error', 1500)
                })
                .finally(() => {
                  this.quaStanInfoGridInstance.endUpdate()
                  this.quaStanInfoGridInstance.clearSelection()
                  this.endLoading()
                })
          },
          null,
          true
        )
      }
    },

    //팝업
    btnPopup() {
      //선택 체크 
      if(!this.listClickData){
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }
      this.popupInfoGrid = []
      getPartList(this.listClickData)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })

          this.popupInfoGrid = res.list
        })
        .catch(error => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.popupInfoGridInstance.endUpdate()
          this.popupInfoGridInstance.clearSelection()
          this.endLoading()
        })
      this.itemPopup = true
    },
    //팝업 확인
    async insertData() {

      await this.popupInfoGridInstance.saveEditData()
      let selectedMainRows = await this.popupInfoGridInstance.getSelectedRowsData()
      //선택 체크
      if(!selectedMainRows.length){
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }
      selectedMainRows.forEach(e => {
        e.selPartNo = this.listClickData.partNo
        e.tarPartNo = e.partNo,
        e.selInsCode = this.listClickData.insCode
        e.maker = getUserId()
      })
      setPartCopy(selectedMainRows, true)
        .then(res => {
          notify(`${this.$t('Saved')}`, 'success', 1500)
        })
        .catch(error => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.itemPopup = false
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
