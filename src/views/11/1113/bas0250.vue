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
                    :label="$t('jobType')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
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
          headerTitle="jobsetupType"
          :useBtnList="[]"
          @btnAdd="btnAdd('잡셋업유형')"
          @btnSave="btnSave('잡셋업유형')"
          @btnDelete="btnDelete('잡셋업유형')"
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
                  <DxColumn data-field="jobType" :caption="$t('jobType')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="jsuName" :caption="$t('jsuName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
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
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="9" class="pa-2">
        <i-card-vertical
          headerTitle="jobsetupItems"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnAdd="btnAdd('잡셋업항목')"
          @btnSave="btnSave('잡셋업항목')"
          @btnDelete="btnDelete('잡셋업항목')"
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
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  :on-row-inserted="e => e.component.navigateToRow(e.key)"
                  @editing-start="onEditingStart"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                  <!-- 잡셋업 유형 -->
                  <DxColumn
                    data-field="jobType"
                    :caption="$t('jobType')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    :visible="false"
                    :allow-editing="false"
                    width="auto"
                  >
                    <DxLookup :data-source="insList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <!-- 공장코드 -->
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                  ></DxColumn>
                  <!-- 작업반 코드 -->
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDecode')"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    width="auto"
                  >
                    <DxLookup :data-source="workDecodeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <!-- 설비코드 -->
                  <DxColumn data-field="eqCode" :caption="$t('eqCode')" data-type="string" alignment="center" css-class="devest-grid-header-require" width="auto">
                    <DxLookup :data-source="facStCodeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <!-- 인터페이스 유무 -->
                  <DxColumn data-field="infYn" :caption="$t('infYn')" data-type="string" alignment="center" width="auto">
                    <DxLookup :data-source="infYnList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <!-- 비고 -->
                  <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" alignment="left" width="500" />
                  <!-- 사용유무 -->
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                    width="auto"
                  />
                  <!-- 작성자 -->
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 작성일 -->
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <!-- 수정자 -->
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 수정일 -->
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
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" :allow-editing="false" />
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
import { getInspecType, getFacItem, saveInspecItem, delInspecItem, getWorkShopInfo, getFacilityInfo } from '@/api/view/bas0250'
export default {
  name: 'bas0250',
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
      insSelect: this.insSelect,

      userFlagSelect: '',
      //그리드 클릭이벤트 관련
      listClickData: '',
      //그리드 관련
      inspecItemGrid: [],
      inspecTypeGrid: [],
      //팝업관련
      //그리드  Ref
      inspecTypeGridRef: 'inspecTypeGridRef',
      inspecItemGridRef: 'inspecItemGridRef',
      //로우헤더
      checkBoxesMode: 'always',//themes.current().startsWith('material') ? 'always' : 'onClick',
      //Ref

      //공통코드 콤보박스리스트
      insList: [],
      workDecodeList: [],
      facStCodeList: [],
      infYnList: [],
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
  // 저장 및 수정
  methods: {
    onEditingStart(e) {
      if(e.column.dataField == 'workDecode' || e.column.dataField == 'eqCode'){
        if(e.data.__created__ == false){
          e.cancel = true
        }
      }
    },
    btnAdd(gbn) {
      if (gbn === '잡셋업항목') {
        let newRow = {
          comCode: getComCode(),
          facCode: 'FAC01',
          id: this.inspecItemGrid.length,
          jobType: this.listClickData.jobType,
          workDecode: '',
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
      if (gbn === '잡셋업항목') {
        await this.inspecItemGridInstance.saveEditData()
        let selectedMainRows = await this.inspecItemGridInstance.getSelectedRowsData()
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (let row of selectedMainRows) {
          if (!row.jobType || !row.workDecode) {
            this.vToastify(`${this.$t('requiredCheck')} [${this.$t('jobType')}, ${this.$t('workDecode')}]`, 'warn')

            return
          }
          if (row.__created__ !== true) {
            row.__modified__ = true
            row.editor = getUserId()
          }
        }
        this.vToastifyPrompt(
          selectedMainRows[0].__created__ == true ? this.$t('doSaveData') : this.$t('doFixData'),
          'info',
          current => {
            this.openLoading()
            this.inspecItemGridInstance.beginUpdate()
            console.log('rows', selectedMainRows)
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
    // 삭제
    async btnDelete(gbn) {
      let message = ''
      if (gbn === '잡셋업항목') {
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
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'deleted'
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
      if (e.rowIndex !== -1) {
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
    // 조회
    btnSearch() {
      this.doSearhInspecTypeGrid()
    },
    //잡셋업 항목 테이블 조회
    doSearchinspecItemGrid() {
      this.inspecItemGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        jobType: this.listClickData.jobType,
        facCode: 'FAC01',
        userFlag: this.userFlagSelect
      }
      
      getFacItem(params)
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

    //잡셋업 유형 테이블 조회
    doSearhInspecTypeGrid() {
      this.inspecTypeGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        jobType: this.insSelect
      }
      if (typeof params.jobType === 'undefined' || params.jobType === null) {
        params.jobType = ''
      }

      getInspecType(params)
        .then(res => {
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
    comboListSet() {
      
      let params = {
        comCode: getComCode(),
        code: 'USER_YN'
      }
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'USER_YN')
          .forEach(e => {
            this.userFlagList.push({
              code: e.sysCode,
              name: e.sysName
            })
            this.infYnList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      })
      let params2 = {
        comCode: getComCode(),
        facCode: 'FAC01'
      }
      getWorkShopInfo(params2).then(res => {
        res.list.forEach(e => {
          this.workDecodeList.push({
            code: e.workDecode,
            name: e.workDename
          })
        })
      })
      getFacilityInfo(params2).then(res => {
        res.list.forEach(e => {
          this.facStCodeList.push({
            code: e.eqCode,
            name: e.eqName
          })
        })
      })

      let params3 = {
        comCode: getComCode(),
        jobType: ''
      }
      getInspecType(params3).then(res => {
            
          res.list.forEach(element => {
            this.insList.push({
              name: element.jsuName,
              code: element.jobType
            })
          })
      })
    }
  },
  mounted() {
  },
  created() {},
  beforeMount() {
    this.comboListSet()
  }
}
</script>
<style lang="less" scoped></style>
