<template>
  <DxPopup
    :visible.sync="visiblePop"
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
                :selection="{ mode:'none' }"
              >
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn
                  data-field="designation"
                  :caption="$t('designation')"
                  width="50%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="mapping"
                  caption="mapping"
                  width="50%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="1" class="iconClass">
        <v-icon large @click="arrClick" >$rChevron</v-icon>
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
                  width="100%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
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
        <v-btn
          outlined
          width="80px"
          height="40px"
          class="mt-2 btn"
          ref="confirmBtn"
          @click="confirmBtn()"
        >{{$t('confirm')}}</v-btn>
        <v-btn
          outlined
          width="80px"
          height="40px"
          class="mt-2 btn2"
          ref="cancelBtn"
          @click="close()"
        >{{$t('cancel')}}</v-btn>
      </v-col>
    </v-row>
  </DxPopup>
</template>

<script>
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxPopup } from 'devextreme-vue/popup'
import { DxDataGrid, DxColumn, DxScrolling } from 'devextreme-vue/data-grid'
import { getUserId, getComCode } from '@/utils/token'

import { getAccountInfo, getPartTypeInfo, getBomInfo, getItemByCustInfo } from '@/api/view/bas0020'
import { timingSafeEqual } from 'crypto'

export default {
  name: 'uploadPopup',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxScrolling
  },
  data() {
    return {
      excelCode: 'A0',
      //그리드
      requiredRef: 'requiredRef',
      excelEntryRef: 'excelEntryRef',

      //팝업관련
      visiblePop: false,
      tmpResult: [],
      tmpResult2: [],
      tempData: [],

      //엑셀 data-source
      excelEntry: [],
      //필수항목 선택
      requiredRowIndex: '',

      //거래처 등록 (필수 항목)
      required: []
    }
  },
  computed: {
    gridPopupInstance() {
      return this.GetDataGrid(this.requiredRef)
    }
  },
  methods: {
    //팝업 open
    async open(params) {
      this.excelCode = await params.excelCode
      this.tmpResult2 = params.tmpResult2
      this.visiblePop = true

      this.required.forEach(e => {
        e.mapping = ''
      })
      this.requiredRowIndex = ''
      this.gridPopupInstance.option('focusedRowIndex', -1)
      this.gridPopupInstance.option('focusedRowIndex', 0)

      this.getRequired(this.excelCode)

      if (this.excelCode == 'A0') {
        this.required = []
      } else if(this.excelCode == 'A10' && params.tmpResult.length > 0) {
        params.tmpResult[0][0].forEach((res, idx) => {
          this.excelEntry.push({
            id: 1 + idx++,
            header: res
          })
        })
      } else if(this.excelCode == 'E10' && params.tmpResult.length > 0) {
        params.tmpResult[0][0].forEach((res, idx) => {
          this.excelEntry.push({
            id: 1 + idx++,
            header: res
          })
        })
      } else if(this.excelCode =='F10' && params.tmpResult.length > 0) {
        params.tmpResult[0][0].forEach((res, idx) => {
          this.excelEntry.push({
            id: 1 + idx++,
            header: res
          })
        })
      } else if(this.excelCode == 'G10' && params.tmpResult.length > 0) {
        params.tmpResult[0][0].forEach((res, idx) => {
          this.excelEntry.push({
            id: 1 + idx++,
            header: res
          })
        })
      }
    },
    getRequired(code) {
      this.excelEntry = []
      if (code == 'A10') {
        this.required = [
          { designation: '순번', id: 1, mapping: '' },
          { designation: '거래처코드', id: 2, mapping: '' },
          { designation: '거래처명', id: 3, mapping: '' },
          { designation: '거래처 유형', id: 4, mapping: '' },
          { designation: '거래 유형', id: 5, mapping: '' },
          { designation: '사업자등록번호', id: 6, mapping: '' },
          { designation: '대표자명', id: 7, mapping: '' },
          { designation: '업태', id: 8, mapping: '' },
          { designation: '업종', id: 9, mapping: '' },
          { designation: '우편번호', id: 10, mapping: '' },
          { designation: '주소', id: 11, mapping: '' },
          { designation: '전화번호', id: 12, mapping: '' },
          { designation: '팩스번호', id: 13, mapping: '' },
          { designation: '이메일', id: 14, mapping: '' },
          { designation: '담당자명', id: 15, mapping: '' },
          { designation: '담당자 연락처', id: 16, mapping: '' },
          { designation: '담당자 이메일', id: 17, mapping: '' },
          { designation: '비고', id: 18, mapping: '' }
        ]
      } else if(code == 'E10') {
        this.required = [
          { designation: '품번', id: 1, mapping: '' },
          { designation: '품명', id: 2, mapping: '' },
          { designation: '단위 코드', id: 3, mapping: '' },
          { designation: '입고창고', id: 4, mapping: '' },
          { designation: '출고창고', id: 5, mapping: '' },
          { designation: '로트크기', id: 6, mapping: '' },
          { designation: '규격', id: 7, mapping: '' },
          { designation: '품목군 코드', id: 8, mapping: '' },
          { designation: '제품군 코드', id: 9, mapping: '' },
          { designation: '안전재고', id: 10, mapping: '' },
          { designation: '입고검사 여부', id: 11, mapping: '' },
          { designation: '공정검사 여부', id: 12, mapping: '' },
          { designation: '순회검사 여부', id: 13, mapping: '' },
          { designation: '출하검사 여부', id: 14, mapping: '' },
          { designation: '최종검사 여부', id: 15, mapping: '' },
          { designation: '공급처출하검사 여부', id: 16, mapping: '' },
          { designation: '리드타임(일수)', id: 17, mapping: '' },
          { designation: '단중사용여부', id: 18, mapping: '' },
          { designation: '단중(kg)', id: 19, mapping: '' },
          { designation: '사용자정의1', id: 20, mapping: '' },
          { designation: '사용자정의2', id: 21, mapping: '' },
          { designation: '사용자정의3', id: 22, mapping: '' },
          { designation: '비고', id: 23, mapping: '' },
        ]
      } else if(code == 'F10') {
        this.required = [
          { designation: '품번', id: 1, mapping: '' },
          { designation: '경로유형', id: 2, mapping: '' },
          { designation: '경로코드', id: 3, mapping: '' },
          { designation: '공정순서', id: 4, mapping: '' },
          { designation: '공정코드', id: 5, mapping: '' },
          { designation: '레벨', id: 6, mapping: '' },
          { designation: '모품번', id: 7, mapping: '' },
          { designation: '자품목순번', id: 8, mapping: '' },
          { designation: '자품번코드', id: 9, mapping: '' },
          { designation: '소진량', id: 10, mapping: '' },
          { designation: '비고', id: 11, mapping: '' },
        ]
      } else if(code == 'G10') {
        this.required = [
          { designation: '품번', id: 1, mapping: '' },
          { designation: '거래처코드', id: 2, mapping: '' },
          { designation: '비고', id: 3, mapping: '' }
        ]
      }
    },
    //컬럼 색 변경
    cellPrepared(e) {
      if (e.rowType === 'data') {
        if (this.excelCode == 'A0') {
          console.log('e',e)
        } else if (e.columnIndex == '0' && this.excelCode == 'A10') {
          for (let i = 0; i < 3; i++) {
            if (e.row.rowIndex == i) {
              e.cellElement.style.color = 'red'
            }
          }
        } else if (e.columnIndex == '0' && this.excelCode == 'E10') {
          for (let i = 0; i < 6; i++) {
            if (e.row.rowIndex == i) {
              e.cellElement.style.color = 'red'
            }
          }
        } else if (e.columnIndex == '0' && this.excelCode == 'G10') {
          for (let i = 0; i < 2; i++) {
            if (e.row.rowIndex == i) {
              e.cellElement.style.color = 'red'
            }
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
      this.tempData = []
      if (this.excelCode == 'A10') {
        for (let i = 0; i < 3; i++) {
          if (this.gridPopupInstance.cellValue(i, 'mapping') === '') {
            this.vToastify('필수항목을 mapping 하세요.', 'warn')
            return
          }
        }
        this.tmpResult2[0].forEach(e => {
          this.tempData.push({
            comCode: getComCode(),
            no: e[this.required[0].mapping],
            custCode: e[this.required[1].mapping],
            custName: e[this.required[2].mapping],
            custType: e[this.required[3].mapping],
            matType: e[this.required[4].mapping],
            custNo: e[this.required[5].mapping],
            name: e[this.required[6].mapping],
            conType: e[this.required[7].mapping],
            secType: e[this.required[8].mapping],
            postNo: e[this.required[9].mapping],
            addr: e[this.required[10].mapping],
            tel: e[this.required[11].mapping],
            fax: e[this.required[12].mapping],
            email: e[this.required[13].mapping],
            manName: e[this.required[14].mapping],
            manTel: e[this.required[15].mapping],
            manAddr: e[this.required[16].mapping],
            remark: e[this.required[17].mapping]
          })
        })
        getAccountInfo(this.tempData).then(res => {
          const param = {
            excelCode: this.excelCode,
            list: res.list
          }
          this.$emit('select', param)
        })
        this.visiblePop = false
      } else if (this.excelCode == 'E10') {
        for (let i = 0; i < 6; i++) {
          if (this.gridPopupInstance.cellValue(i, 'mapping') === '') {
            this.vToastify('필수항목을 mapping 하세요.', 'warn')
            return
          }
        }
        this.tmpResult2[0].forEach(e => {
          this.tempData.push({
            comCode: getComCode(),
            partNo: e[this.required[0].mapping],
            partName: e[this.required[1].mapping],
            unit: e[this.required[2].mapping],
            inWh: e[this.required[3].mapping],
            outWh: e[this.required[4].mapping],
            lotSize: e[this.required[5].mapping],
            spec: e[this.required[6].mapping],
            itemType: e[this.required[7].mapping],
            partType: e[this.required[8].mapping],
            safeCnt: e[this.required[9].mapping],
            inInsp: e[this.required[10].mapping],
            proInsp: e[this.required[11].mapping],
            rotInsp: e[this.required[12].mapping],
            outInsp: e[this.required[13].mapping],
            lastInsp: e[this.required[14].mapping],
            supInsp: e[this.required[15].mapping],
            leadTime: e[this.required[16].mapping],
            weightYn: e[this.required[17].mapping],
            weight: e[this.required[18].mapping],
            userDef1: e[this.required[19].mapping],
            userDef2: e[this.required[20].mapping],
            userDef3: e[this.required[21].mapping],
            remark: e[this.required[22].mapping],
          })
        })
        getPartTypeInfo(this.tempData).then(res => {
          const param = {
            excelCode: this.excelCode,
            list: res.list
          }
          this.$emit('select', param)
        })
        this.visiblePop = false
      } else if (this.excelCode == 'F10') {
        this.tmpResult2[0].forEach(e => {
          this.tempData.push({
            comCode: getComCode(),
            partNo: e[this.required[0].mapping],
            pathType: e[this.required[1].mapping],
            pathCode: e[this.required[2].mapping],
            pathNo: e[this.required[3].mapping],
            proCode: e[this.required[4].mapping],
            level: e[this.required[5].mapping],
            paPartNo: e[this.required[6].mapping],
            no: e[this.required[7].mapping],
            childPartNo: e[this.required[8].mapping],
            amount: e[this.required[9].mapping],
            remark: e[this.required[10].mapping],
          })
        })
        getBomInfo(this.tempData).then(res => {
          const param = {
            excelCode: this.excelCode,
            list: res.list
          }
          this.$emit('select', param)
        })
        this.visiblePop = false
      } else if (this.excelCode == 'G10') {
        for (let i = 0; i < 2; i++) {
          if (this.gridPopupInstance.cellValue(i, 'mapping') === '') {
            this.vToastify('필수항목을 mapping 하세요.', 'warn')
            return
          }
        }
        this.tmpResult2[0].forEach(e => {
          this.tempData.push({
            comCode: getComCode(),
            partNo: e[this.required[0].mapping],
            custCode: e[this.required[1].mapping],
            remark: e[this.required[2].mapping]
          })
        })
        getItemByCustInfo(this.tempData).then(res => {
          console.log(res)
          const param = {
            excelCode: this.excelCode,
            list: res.list
          }
          this.$emit('select', param)
        })
        this.visiblePop = false
      }
    },
    //취소 Button
    close() {
      this.visiblePop = false
    },
    //화살표 버튼
    arrClick() {
      this.required[Number(this.requiredRowIndex)].mapping = ''
    },
    init() {
      this.excelEntry = []
    }
  }
}
</script>

<style scoped>
.btn {
  background-color: #2b51eb;
  color: white;
  margin-right:10px;
}
.btn2 {
  background-color: #ffffff;
  border:1px solid #333333;
  color: #333333;
}
.iconClass {
  /* margin-top: 305px; */
  margin-top:19%;
  height:59px;
}
::v-deep.v-icon.v-icon.v-icon--link {
  margin-left: 16px;
}
</style>