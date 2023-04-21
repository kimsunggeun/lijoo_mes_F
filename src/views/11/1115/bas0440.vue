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
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="facName"
                    item-value="facCode"
                    :items="facCodeList"
                    v-model="facCodeSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facName')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-text="name"
                    item-value="code"
                    :items="meaGrList"
                    v-model="meaGrSelect"
                    :prepend-inner-icon="'$search'"
                    :label="$t('meaGp')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-text-field
                    color="primary"
                    class="required mx-1"
                    v-model="meaName"
                    :prepend-inner-icon="'$search'"
                    :label="$t('meaName')"
                    dense
                    outlined
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-menu
                    ref="sDateCal"
                    v-model="sDateCal"
                    :close-on-content-click="false"
                    :return-value.sync="sDate"
                    max-width="290px"
                    min-width="auto"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="primary"
                        class="required mx-1"
                        v-model="sDate"
                        :prepend-inner-icon="'$search'"
                        :label="$t('purDate')"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="sDate" no-title scrollable @input="dateInput"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="eDateCal"
                    v-model="eDateCal"
                    :close-on-content-click="false"
                    :return-value.sync="eDate"
                    max-width="290px"
                    min-width="auto"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="primary"
                        class="required mx-1"
                        v-model="eDate"
                        :prepend-inner-icon="'$search'"
                        label="~"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="eDate"
                      :min="sDate"
                      no-title
                      scrollable
                      @input="dateInput2"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <v-row class="pa-2">
          <i-card-vertical
            headerTitle="meaInfo"
            :useBtnList="[ 
            'btnExcel', // 엑셀 다운로드
            'btnCorrection',  // 수정
            'btnAdd', // 추가
            'btnDelete' // 삭제
            ]"
            @btnCorrection="btnCorrection()"
            @btnExcel="btnExcel()"
            @btnAdd="btnAdd()"
            @btnDelete="btnDelete()"
          >
            <template v-slot:body>
              <v-layout column>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="meaInfoGrid"
                    class="listBox03"
                    :ref="meaInfoGridRef"
                    :data-source="meaInfoGrid"
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
                    @rowClick="popupOpen"
                  >
                    <DxSelection show-check-boxes-mode="none" />
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
                      :caption="$t('facName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    >
                      <DxLookup
                        :data-source="facCodeList"
                        display-expr="facName"
                        value-expr="facCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="meaGr"
                      :caption="$t('meaGp')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="meaGrList" display-expr="name" value-expr="code" />
                    </DxColumn>
                    <DxColumn
                      data-field="meaCode"
                      :caption="$t('meaCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="meaName"
                      :caption="$t('meaName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="meaSpec"
                      :caption="$t('meaSpec')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="meaGrade"
                      :caption="$t('meaGrade')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="meaGradeList" display-expr="name" value-expr="code" />
                    </DxColumn>
                    <DxColumn
                      data-field="meaState"
                      :caption="$t('meaState')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="meaStateList" display-expr="name" value-expr="code" />
                    </DxColumn>
                    <DxColumn
                      data-field="depCode"
                      :caption="$t('depName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="depCodeList"
                        display-expr="depName"
                        value-expr="depCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="name"
                      :caption="$t('mName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="assNo"
                      :caption="$t('assNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="proCom"
                      :caption="$t('proCompanny')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="supCom"
                      :caption="$t('supCompanny')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="manuDate"
                      :caption="$t('manuDate')"
                      width="auto"
                      data-type="date"
                      format="yyyy-MM-dd"
                      aligment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="purDate"
                      :caption="$t('purDate')"
                      width="auto"
                      data-type="date"
                      format="yyyy-MM-dd"
                      aligment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="corrYN"
                      :caption="$t('corrYN')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="corrYNList" display-expr="name" value-expr="code" />
                    </DxColumn>
                    <DxColumn
                      data-field="corrAgency"
                      :caption="$t('corrAgency')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="corrMonth"
                      :caption="$t('corrMonth')"
                      width="auto"
                      data-type="number"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="corrsDate"
                      :caption="$t('corrsDate')"
                      width="auto"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="correDate"
                      :caption="$t('correDate')"
                      width="auto"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="corrStd"
                      :caption="$t('corrStd')"
                      width="auto"
                      data-type="number"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="corrMax"
                      :caption="$t('corrMax')"
                      width="auto"
                      data-type="number"
                      format="#,##0.##"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="corrMin"
                      :caption="$t('corrMin')"
                      width="auto"
                      data-type="number"
                      format="#,##0.##"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="modelNo"
                      :caption="$t('modelNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="false"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
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
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
        <bas0440Popup1
          ref="bas0440Popup1"
          @btnSave="btnSavePop"
          @close="close"
          :pop1Visible="pop1Visible"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import themes from 'devextreme/ui/themes'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getUserId, getUserCd, getComCode } from '@/utils/token'
import { getInspecType, getQuaStanInfo, setQuaStanInfo, delQuaStanInfo, getPartList, setPartCopy } from '@/api/view/bas0420'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getDepInfo, getItemInfo, saveItem, deleteItem } from '@/api/view/bas0440'

import bas0440Popup1 from '@/views/11/1112/popup/bas0440Popup1'

export default {
  name: 'bas0440',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    'i-card-vertical': ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    bas0440Popup1
  },
  data() {
    return {
      //검색조건 관련
      facCodeSelect: '',
      meaGrSelect: '',
      meaName: '',
      sDateCal: '',
      sDate: getPreMonth(1),
      eDateCal: '',
      eDate: getCurrentDate(),
      //콤보박스 리스트
      facCodeList: [],
      meaGrList: [],
      meaGradeList: [],
      meaStateList: [],
      corrYNList: [],
      depCodeList: [],
      //그리드 관련
      meaInfoGrid: [],
      meaInfoGridRef: 'meaInfoGridRef',
      focusedRow: {},
      //팝업
      pop1Visible: false,
      popupData: {},
      //변수
      unused: ''
    }
  },
  computed: {
    meaInfoGridInstance() {
      return this.GetDataGrid(this.meaInfoGridRef)
    }
  },
  methods: {
    getDateFormat(date) {
      return getDateFormat(date)
    },
    dateInput(e) {
      this.sDate = e
      this.sDateCal = false
      this.$refs.sDateCal.save(e)
      if (this.sDate > this.eDate) {
        this.eDate = this.sDate
      }
    },
    dateInput2(e) {
      if (this.sDate === '') {
        return
      }
      this.eDate = e
      this.eDateCal = false
      this.$refs.eDateCal.save(e)
    },
    //공통코드 콤보박스
    comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'MEA_GR,MEA_GRADE,MEA_STATE,USER_YN'
      }
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'MEA_GR') //계측기그룹
          .forEach(e => {
            this.meaGrList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'MEA_GRADE') //계측기등급
          .forEach(e => {
            this.meaGradeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'MEA_STATE') //계측기상태
          .forEach(e => {
            this.meaStateList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'USER_YN') //사용유무
          .forEach(e => {
            this.corrYNList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      })
      getDepInfo({ comCode: getComCode() }).then(res => {
        res.list.forEach(e => {
          this.depCodeList.push({
            depCode: e.depCode,
            depName: e.depName
          })
        })
      })
      getFactoryInfoData({ comCode: getComCode() })
        .then(res => {
          res.list.forEach(e => {
            this.facCodeList.push({
              facCode: e.facCode,
              facName: e.facName
            })
          })
        })
        .finally(() => {
          this.facCodeSelect = this.facCodeList[0].facCode
        })

      this.corrYNList.forEach(e => {
        if (e.name == '미사용') {
          this.unused = e.code
        }
      })
    },
    popupOpen(e) {
      this.popupData = e.data
      this.popupData.__created__ = false
      this.popupData.__modified__ = true
    },
    //조회
    btnSearch() {
      this.doSearchMain()
    },
    async doSearchMain() {
      try {
        if (!this.sDate || !this.eDate) {
          notify(this.$t('bas0440SearchInput'), 'error', 1500)
          return
        }

        this.openLoading()
        let params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect,
          meaGr: this.meaGrSelect,
          meaName: this.meaName,
          frPurDate: this.sDate,
          toPurDate: this.eDate
        }
        getItemInfo(params).then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.meaInfoGrid = res.list
        })
      } catch (error) {
        if (error === null) {
          this.endLoading()
          notify(this.$t('noData'), 'error', 1500)
        } else {
          this.endLoading()
          notify(error, 'error', 1500)
        }
      } finally {
        this.endLoading()
      }
    },
    //추가
    btnAdd() {
      let row = {
        id: this.meaInfoGrid.length == 0 ? 0 : this.meaInfoGrid.length + 1,
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        meaGr: '',
        meaCode: '',
        meaName: '',
        meaSpec: '',
        meaGrade: '',
        meaState: '',
        depCode: '',
        mName: getUserCd(),
        assNo: '',
        proCom: '',
        supCom: '',
        manuDate: '',
        purDate: getCurrentDate(),
        corrYN: this.unused,
        corrAgency: '',
        corrMonth: '',
        corrsDate: '',
        correDate: '',
        corrStd: '',
        corrMax: '',
        corrMin: '',
        modelNo: '',
        remark: '',
        userFlag: 'Y',
        maker: getUserId(),
        editDate: '',
        editor: '',
        __modified__: false,
        __created__: true
      }

      this.pop1Visible = true
      this.$refs.bas0440Popup1.open(
        'add',
        row,
        this.facCodeList,
        this.meaGrList,
        this.meaGradeList,
        this.meaStateList,
        this.depCodeList,
        this.corrYNList
      )
    },
    //수정
    async btnCorrection() {
      let selectedRows = await this.meaInfoGridInstance.getSelectedRowsData()
      if (!selectedRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.popupData = selectedRows[0]
      this.pop1Visible = true
      this.$refs.bas0440Popup1.open(
        'mod',
        this.popupData,
        this.facCodeList,
        this.meaGrList,
        this.meaGradeList,
        this.meaStateList,
        this.depCodeList,
        this.corrYNList
      )
    },
    //삭제
    async btnDelete() {
      let message = ''
      this.meaInfoGridInstance.saveEditData()
      let selectedMainRows = await this.meaInfoGridInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.meaInfoGridInstance.beginUpdate()
          deleteItem(selectedMainRows, true)
            .then(res => {
              notify(this.$t('deleted'), 'success', 1500)
              this.doSearchMain()
            })
            .catch(error => {
              notify(error, 'error', 1500)
              this.endLoading()
            })
            .finally(() => {
              this.meaInfoGridInstance.saveEditData()
              this.meaInfoGridInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    async btnSavePop(items) {
      let messageGubun = ''
      let data = []
      let success = true
      if (!items.popupData[0].facCode || !items.popupData[0].meaCode) {
        this.vToastify(this.$t('bas0440RequiredInput1'), 'warn')
        return
      }

      if (items.popupData[0].__created__ === true) {
        messageGubun = 'doSaveData'
        items.popupData[0].maker = getUserId()

        let params2 = {
          comCode: items.popupData[0].comCode,
          custCode: items.popupData[0].custCode
        }
      } else {
        messageGubun = 'doFixData'
        items.popupData[0].editor = getUserId()
      }
      this.vToastifyPrompt(
        this.$t(messageGubun),
        'info',
        current => {
          this.openLoading()
          saveItem(items.popupData)
            .then(res => {
              let message = items.popupData[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
              this.doSearchMain()
              this.pop1Visible = false
            })
            .catch(error => {
              notify(error, 'error', 1500)
              this.endLoading()
            })
            .finally(() => {
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('meaInfoGrid')) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, 'example.xlsx') // 엑셀파일 만듬
    },
    close() {
      this.pop1Visible = false
    }
  },

  mounted() {
    //this.doSearhinspecTypeGrid(true)
  },
  beforeMount() {
    this.comboListSet()
  }
}
</script>

<style scoped>
.btn {
  background-color: #879b77;
  color: white;
}
</style>
