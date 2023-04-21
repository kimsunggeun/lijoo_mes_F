<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top class="d-md-flex">
          <template v-slot:body>
            <v-row class="mb-2">
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <!-- 파일 업로드 -->
                <v-file-input
                  :label="$t('fileUpload')"
                  class="mt-2"
                  outlined
                  dense
                  clearable
                  type="file"
                  @change="readFile"
                  :accept="fileAccept"
                ></v-file-input>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-btn outlined width="100px" height="30px" class="mt-2 upload_btn" @click="uploadBtn()"><v-icon>$upload</v-icon>{{ $t('upload') }}</v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical headerTitle="uploadProducPlan" :useBtnList="['btnExcel', 'btnSave']" @btnExcel="btnExcel" @btnSave="btnSave">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="uploadMainGrid"
                  class="listBox"
                  :ref="uploadRef"
                  :data-source="uploadDataSource"
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
                  :selection="{ mode: 'none' }"
                  @cellPrepared="mainPrepared"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn data-field="no" :caption="$t('number')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :visible="false" />
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="left" :visible="false" />
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="planDate"
                    :caption="$t('planDate')"
                    width="auto"
                    data-type="date"
                    alignment="cneter"
                    format="yyyy-MM-dd"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('regiDate')"
                    width="auto"
                    data-type="date"
                    alignment="cneter"
                    format="yyyy-MM-dd"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="planQty"
                    :caption="$t('planQty')"
                    width="auto"
                    data-type="number"
                    format="#,###"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn caption width="auto" :allow-editing="false" />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <DxPopup
      :visible.sync="cellVisible"
      :show-close-button="true"
      :show-title="true"
      :title="$t('UploadInformationSetting')"
      height="60%"
      width="60%"
    >
      <v-row class="pa-2">
        <v-col cols="6" class="pa-0">
          <i-card-vertical headerTitle="qualityStandardInfo">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="required"
                  :ref="requiredRef"
                  :data-source="required"
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
                  @rowClick="requiredClick"
                  @cellPrepared="cellPrepared"
                  class="doubleListBox"
                  :selection="{ mode: 'none' }"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="designation"
                    :caption="$t('designation')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="mapping" caption="mapping" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
        <v-col cols="1" class="iconClass">
          <v-icon large @click="arrClick">$rChevron</v-icon>
        </v-col>
        <v-col cols="5" class="pa-0">
          <i-card-vertical headerTitle="excelEntryInfo">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="excelEntry"
                  :ref="excelEntryRef"
                  :data-source="excelEntry"
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
                  @rowClick="excelEntryClick"
                  class="doubleListBox"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxSelection show-check-boxes-mode="always" mode="none" />
                  <DxColumn
                    data-field="header"
                    :caption="$t('ExcelColumnName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="mt-2 btn" ref="confirmBtn" @click="confirmBtn()">{{ $t('confirm') }}</v-btn>
          <v-btn outlined width="80px" height="40px" class="mt-2 btn" ref="cancelBtn" @click="close()">{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>
<script>
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import baseview from '@/components/base/baseview.vue' // base page 추가

import iCardVertical from '@/components/common/iCardVertical.vue'
import iDataTable from '@/components/common/iDataTable.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import themes from 'devextreme/ui/themes'
import notify from 'devextreme/ui/notify' // message

import { DxPopup } from 'devextreme-vue/popup'
import { DxDataGrid, DxColumn, DxScrolling } from 'devextreme-vue/data-grid'
import { getUserId, getComCode } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getBas0011Detail } from '@/api/view/bas0011'
import { getProUpload, saveProUpload } from '@/api/view/pro0020'

export default {
  name: 'bas0020',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPopup
  },
  data() {
    return {
      fileAccept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      facCode: '',

      uploadRef: 'uploadRef',
      uploadDataSource: [],

      requiredRef: 'requiredRef',
      excelEntryRef: 'excelEntryRef',

      tempData: [],

      //List Data
      custTypeList: [],
      matTypeList: [],

      //팝업 관련
      cellVisible: false,
      tmpResult: [],
      tmpResult2: [],

      //필수항목
      required: [
        { designation: '순번', id: 1, mapping: '' },
        { designation: '품번', id: 2, mapping: '' },
        { designation: '계획일', id: 3, mapping: '' },
        { designation: '등록일', id: 4, mapping: '' },
        { designation: '계획수량', id: 5, mapping: '' }
      ],
      //엑셀컬럼항목
      excelEntry: [],
      //필수항목 선택
      requiredRowIndex: ''
    }
  },
  created() {
    const searchData = {
      comCode: getComCode(),
      userId: getUserId()
    }
    getUser(searchData).then(res => {
      this.facCode = res.list[0].facCode
    })
    this.selectList()
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.uploadRef)
    },
    gridPopupInstance() {
      return this.GetDataGrid(this.requiredRef)
    },
    gridEntryInstance() {
      return this.GetDataGrid(this.excelEntryRef)
    }
  },
  mounted() {},
  methods: {
    //SelectList 가져오기
    async selectList() {
      const custType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'BIZ_GROUP'
      }
      const matType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'BIZ_TYPE'
      }

      await Promise.all([getBas0011Detail(custType), getBas0011Detail(matType)]).then(res => {
        this.custTypeList = res[0].list
        this.matTypeList = res[1].list
      })
    },
    //파일 읽기
    readFile(e) {
      this.tmpResult = []
      this.tmpResult2 = []
      let file = e
      let reader = new FileReader()
      if (file !== null) {
        reader.onload = file => {
          let data = reader.result
          let workbook = this.$xlsx.read(data, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD' })

          //시트별 row 저장하기
          workbook.SheetNames.forEach(sheet => {
            //헤더값 저장 (rowAll)
            const rowsAll = this.$xlsx.utils.sheet_to_json(workbook.Sheets[sheet], { header: 1 }, { raw: false })
            this.tmpResult.push(rowsAll)
            //cols
            const colsAll = this.$xlsx.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false })
            this.tmpResult2.push(colsAll)
          })

          //첫번째 시트 헤더
          this.tmpResult[0][0].forEach((res, idx) => {
            this.excelEntry.push({
              id: 1 + idx++,
              header: res
            })
          })
        }
        reader.readAsBinaryString(file)
      } else {
        this.excelEntry = []
        this.gridEntryInstance.option('focusedRowIndex', 0)
        this.gridEntryInstance.option('focusedRowIndex', -1)
        this.uploadDataSource = []
      }
    },
    mainPrepared(e) {
      if (e.rowType == 'header') {
        for (let i = 1; i < 4; i++) {
          if (e.columnIndex == i) {
            e.cellElement.style.backgroundColor = '#c0ccf6'
          }
        }
      }
    },
    //업로드
    uploadBtn(e) {
      this.cellVisible = true
      this.required.forEach(e => {
        e.mapping = ''
      })
      this.requiredRowIndex = ''
      this.uploadDataSource = []
      this.gridPopupInstance.option('focusedRowIndex', -1)
      this.gridPopupInstance.option('focusedRowIndex', 0)
    },
    //저장
    async btnSave() {
      await this.gridMainInstance.saveEditData()
      let selectAll = await this.gridMainInstance.getDataSource()

      if (!selectAll._items.length > 0) {
        return this.vToastify('업로드 내용이 없습니다.', 'warn')
      }

      //필수값 체크
      let valCheckData = await selectAll._items.findIndex(e => {
        return e.partNo == null || e.planDate == null
      })

      if (valCheckData >= 0) {
        return this.vToastify('필수값 체크', 'warn')
      }
      //유효성 체크
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        () => {
          if (selectAll._items.length > 0) {
            this.gridMainInstance.beginUpdate()
          }
          this.openLoading()
          saveProUpload(selectAll._items)
            .then(res => {
              if (res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                this.uploadDataSource = []
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.gridMainInstance.clearSelection()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //엑셀 다운로드
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('uploadMainGrid')) // table id를 넣어주면된다
      workSheet['!cols'] = [
        { width: 25 }, //순번
        { width: 25 }, //품번
        { width: 25 }, //품명
        { width: 25 }, //계획일
        { width: 25 }, //등록일
        { width: 25 } //계획수량
      ]
      // 전산번호 2.01564+E10 이런상태일 경우 아래의 if문에서 J 를 문제되는 컬럼명으로 수정후 적용
      // for (let i in workSheet) {
      //   if (i.indexOf('J') != -1) {
      //     workSheet[i].z = '0'
      //   }
      // }
      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, '생산계획(기간별).xlsx') // 엑셀파일 만듬
    },
    //--------- 업로드 팝업 ----------
    //컬럼 색 변경
    cellPrepared(e) {
      if (e.rowType === 'data') {
        for (let i = 1; i < 3; i++) {
          if (e.row.rowIndex == i) {
            e.cellElement.style.color = 'red'
          }
        }
      }
    },
    //로우 인덱스 선택
    requiredClick(e) {
      this.requiredRowIndex = e.rowIndex
    },
    //맵핑
    excelEntryClick(e) {
      //컬럼 rowIndex로 매칭
      this.required[Number(this.requiredRowIndex)].mapping = e.values[0]
    },
    //확인 Button
    confirmBtn() {
      try {
        this.openLoading()
        this.tempData = []
        for (let i = 1; i < 3; i++) {
          if (this.gridPopupInstance.cellValue(i, 'mapping') === '') {
            this.vToastify('필수항목을 mapping 하세요.', 'warn')
            return
          }
        }

        this.tmpResult2[0].forEach(e => {
          this.tempData.push({
            comCode: getComCode(),
            facCode: this.facCode,
            no: e[this.required[0].mapping],
            partNo: e[this.required[1].mapping],
            planDate: e[this.required[2].mapping],
            regiDate: e[this.required[3].mapping],
            planQty: e[this.required[4].mapping]
          })
        })

        getProUpload(this.tempData).then(res => {
          this.uploadDataSource = res.list
        })

        this.cellVisible = false
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    //취소 Button
    close() {
      this.cellVisible = false
    },
    arrClick() {
      this.required[Number(this.requiredRowIndex)].mapping = ''
    }
  }
}
</script>
<style scoped>
.btn {
  background-color: #879b77;
  color: white;
}
::v-deep.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__prepend-outer {
  margin-top: 3px;
}
.iconClass {
  margin-top: 205px;
}
::v-deep.v-icon.v-icon.v-icon--link {
  margin-left: 16px;
}
</style>
