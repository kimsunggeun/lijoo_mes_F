<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top class="d-md-flex">
          <template v-slot:body>
            <v-row class="mb-2">
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 업로드 리스트 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="excelCode"
                  :label="$t('baseInfoExcelUpload')"
                  :items="excelCodeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                  @change="excelCodeChange"
                />
              </v-col>
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
                <v-btn
                  outlined
                  width="100px"
                  height="30px"
                  class="mt-2 btn"
                  ref="uploadRef"
                  @click="uploadBtn()"
                ><v-icon>$upload</v-icon>{{$t('upload')}}</v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-2" no-gutters>
      <v-col cols="12" class="pt-0">
        <i-card-vertical
          :headerTitle="headTitle"
          :useBtnList="['btnExcel','btnSave']"
          @btnExcel="btnExcel()"
          @btnSave="btnSave()"
        >
          <template v-if="this.excelCode === 'A0'" v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="uploadBase"
                  class="listBox"
                  :ref="uploadBaseRef"
                  :data-source="uploadBaseData"
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
                  :selection="{ mode:'none' }"
                  @cellPrepared="mainPrepared"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="baseInfoExcelUpload"
                    :caption="$t('baseInfoExcelUpload')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
          <template v-else-if="this.excelCode === 'A10'" v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="uploadAccount"
                  class="listBox"
                  :ref="uploadAccountRef"
                  :data-source="uploadAccountData"
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
                  :selection="{ mode:'none' }"
                  @cellPrepared="mainPrepared"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="no"
                    :caption="$t('number')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="custName"
                    :caption="$t('custName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="custType"
                    :caption="$t('custTypeNm')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  >
                    <DxLookup
                      :data-source="custTypeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="matType"
                    :caption="$t('matTypeNm')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  >
                    <DxLookup
                      :data-source="matTypeList"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="custNo"
                    :caption="$t('comNumber')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="name"
                    :caption="$t('name')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="conType"
                    :caption="$t('conType')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="secType"
                    :caption="$t('secType')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="postNo"
                    :caption="$t('postNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="addr"
                    :caption="$t('addr')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="tel"
                    :caption="$t('tel')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="fax"
                    :caption="$t('fax')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="email"
                    :caption="$t('email')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="manName"
                    :caption="$t('manName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="manTel"
                    :caption="$t('manTel')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="manAddr"
                    :caption="$t('manAddr')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="500"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="codeChk"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :visible="false"
                  />

                  <DxColumn 
                        data-field="" 
                        caption="" 
                        data-type="string" 
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
          <!-- 품목정보 등록 그리드 -->
          <template v-else-if="this.excelCode === 'E10'" v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="uploadItem"
                  class="listBox"
                  :ref="uploadItemRef"
                  :data-source="uploadItemData"
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
                  :selection="{ mode:'none' }"
                  @cellPrepared="mainPrepared"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="unit"
                    :caption="$t('unit')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="inWh"
                    :caption="$t('inWh')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="outWh"
                    :caption="$t('outWh')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="lotSize"
                    :caption="$t('lotSize')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="spec"
                    :caption="$t('spec')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="itemType"
                    :caption="$t('itemType')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partType"
                    :caption="$t('partType')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />

                  <DxColumn
                    data-field="safeCnt"
                    :caption="$t('safeCnt')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="inInsp"
                    :caption="$t('inInsp')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="proInsp"
                    :caption="$t('proInsp')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="rotInsp"
                    :caption="$t('rotInsp')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="outInsp"
                    :caption="$t('outInsp')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="lastInsp"
                    :caption="$t('lastInsp')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="supInsp"
                    :caption="$t('supInsp')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="leadTime"
                    :caption="$t('leadTime')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="weightYn"
                    :caption="$t('weightYn')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="weight"
                    :caption="$t('weight')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="userDef1"
                    :caption="$t('userDef1')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="userDef2"
                    :caption="$t('userDef2')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="userDef3"
                    :caption="$t('userDef3')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="500"
                    data-type="string"
                    alignment="left"
                    :allow-editing="true"
                  />
                  <DxColumn 
                        data-field="" 
                        caption="" 
                        data-type="string" 
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
          <!-- BOM정보 등록 그리드 -->
          <template v-else-if="this.excelCode === 'F10'" v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="uploadBom"
                  class="listBox"
                  :ref="uploadBomRef"
                  :data-source="uploadBomData"
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
                  column-resizing-mode="widget"
                  :selection="{ mode:'none' }"
                  @cellPrepared="mainPrepared"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <!-- 품번 Column -->
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 경로유형 Column -->
                  <DxColumn
                    data-field="pathType"
                    :caption="$t('pathType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 경로코드 Column -->
                  <DxColumn
                    data-field="pathCode"
                    :caption="$t('pathCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <!-- 공정순서 Column -->
                  <DxColumn
                    data-field="pathNo"
                    :caption="$t('pathNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <!-- 공정코드 Column -->
                  <DxColumn
                    data-field="proCode"
                    :caption="$t('proCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <!-- 레벨 Column -->
                  <DxColumn
                    data-field="level"
                    :caption="$t('level')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <!-- 모품번 Column -->
                  <DxColumn
                    data-field="paPartNo"
                    :caption="$t('paPartNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <!-- 자목품순번 Column -->
                  <DxColumn
                    data-field="no"
                    :caption="$t('No')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <!-- 자품번 코드 Column -->
                  <DxColumn
                    data-field="childPartNo"
                    :caption="$t('childPartNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 소진량 Column -->
                  <DxColumn
                    data-field="amount"
                    :caption="$t('consumption')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 비고 Column -->
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="500"
                    data-type="string"
                    alignment="center"
                    :allow-editing="true"
                  />
                  <DxColumn 
                        data-field="" 
                        caption="" 
                        data-type="string" 
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
          <template v-else-if="this.excelCode === 'G10'" v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="uploadItemByCust"
                  class="listBox"
                  :ref="uploadItemByCustRef"
                  :data-source="uploadItemByCustData"
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
                  column-resizing-mode="widget"
                  :selection="{ mode:'none' }"
                  @cellPrepared="mainPrepared"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <!-- 품번 Column -->
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="500"
                  />
                  <DxColumn 
                        data-field="" 
                        caption="" 
                        data-type="string" 
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <!-- 업로드 팝업 -->
    <uploadPopup ref="uploadPopup" @select="getSelectData" />
  </v-container>
</template>
<script>
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import baseview from '@/components/base/baseview.vue' // base page 추가
import iCardVertical from '@/components/common/iCardVertical.vue'
import uploadPopup from '@/components/common/popups/uploadPopup'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxLookup, DxScrolling } from 'devextreme-vue/data-grid'

//API
import { getComCode } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getBas0011Detail } from '@/api/view/bas0011'
import { saveAccountInfo, savePartTypeInfo, saveBomInfo, saveItemByCustInfo, getCustCode, itemByCustOverlap, partTypeOverlap } from '@/api/view/bas0020'


export default {
  name: 'bas0020',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxScrolling,
    uploadPopup
  },
  data() {
    return {
      fileAccept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

      headTitle: 'baseInfoExcelUpload',
      excelId: 'uploadBase', //엑셀그리드 아이디
      excelFileName: '기준정보엑셀 업로드.xlsx',

      excelCode: 'A0',
      excelCodeList: [],

      //베이스 화면
      uploadBaseData: [],
      uploadBaseRef: 'uploadBaseRef',
      //거래처 등록
      uploadAccountData: [],
      uploadAccountRef: 'uploadAccountRef',
      //품목정보 등록
      uploadItemData: [],
      uploadItemRef: 'uploadItemRef',
      //BOM정보 등록
      uploadBomData: [],
      uploadBomRef: 'uploadBomRef',
      //거래처별 품목 등록
      uploadItemByCustData: [],
      uploadItemByCustRef: 'uploadItemByCustRef',

      //거래처 업로드(List Data)
      custTypeList: [],
      matTypeList: [],
      //팝업 관련
      cellVisible: false,
      tmpResult: [],
      tmpResult2: [],
      a:'',
      dupValueList: []
    }
  },
  created() {
    //기준정보엑셀 업로드 가져오기
    const excelUpload = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'EXCEL_UPLOAD'
    }
    getBas0011Detail(excelUpload).then(res => {
      res.list.forEach(item => {
        if(item.userFlag === 'Y') {
          this.excelCodeList.push({
          value: item.sysCode,
          text: item.sysName
          })
        }
      })
    })
  },
  computed: {
    //거래처
    gridCustInstance() { 
      return this.GetDataGrid(this.uploadAccountRef) 
    },
    //품목
    gridItemInstance() {
      return this.GetDataGrid(this.uploadItemRef) 
    },
    //BOM정보
    gridBomInstance() {
      return this.GetDataGrid(this.uploadBomRef)
    },
    //거래처별 품목
    gridItemByCustInstance() {
      return this.GetDataGrid(this.uploadItemByCustRef)
    }
  },
  methods: {
    //거래처엑셀 업로드 코드 선택
    excelCodeChange(e) {
      if (e == 'A10') {
        this.custList()
        this.headTitle = 'uploadAccount'
        this.excelId = 'uploadAccount'
        this.excelFileName = '거래처 업로드.xlsx'
        this.excelCode = 'A10'
      } else if (e == 'E10') {
        this.headTitle = 'uploadItem'
        this.excelId = 'uploadItem'
        this.excelFileName = '품목정보 업로드.xlsx'
        this.excelCode = 'E10'
      } else if (e == 'F10') {
        this.headTitle = 'uploadBom'
        this.excelId = 'uploadBom'
        this.excelFileName = 'BOM정보 업로드.xlsx'
        this.excelCode = 'F10'
      } else if (e == 'G10') {
        this.headTitle = 'uploadItemByCust'
        this.excelId = 'uploadItemByCust'
        this.excelFileName = '거래처별 품목 업로드.xlsx'
        this.excelCode = 'G10'
      } else {
        this.headTitle = 'baseInfoExcelUpload'
        this.excelId = 'uploadBase'
        this.excelCode = 'A0'
        this.excelFileName = '기준정보엑셀 업로드'
      }
    },
    //custList 가져오기
    async custList() {
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
        }
        reader.readAsBinaryString(file)
      } else {
        this.$refs.uploadPopup.init()
        this.uploadAccountData = []
      }
    },
    //cell준비
    async mainPrepared(e) {
      if (this.excelCode == 'A0') {
        console.log(e)
      } else if(this.excelCode == 'A10') {
        if(e.rowType=='data') {
          let overlap = await getCustCode({
            comCode: getComCode(),
            custCode: e.data.custCode
          })
          if(e.data.custCode == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('custCode')}]`
          } else if(e.data.custName == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('custName')}]`
          } else if(e.data.custType == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('custType')}]`
          } else if(e.data.matType == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('matType')}]`
          } else if(e.data.custCode == overlap.list[0].custCode) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `중복된 데이터가 있습니다.`
          }
        }
      } else if(this.excelCode == 'E10') {
        if(e.rowType=='data') {
          let overlap = await partTypeOverlap({
            comCode: getComCode(),
            partNo: e.data.partNo,
            partName: e.data.partName,
            unit: e.data.unit,
            spec: e.data.spec,
            inWh: e.data.inWh,
            outWh: e.data.outWh,
            lotSize: e.data.lotSize
          })
          if(e.data.partNo == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('partNo')}]`
          } else if(e.data.partName == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('partName')}]`
          } else if(e.data.unit == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('unit')}]`
          } else if(e.data.inWh == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('inWh')}]`
          } else if(e.data.outWh == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('outWh')}]`
          } else if(e.data.lotSize == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('lotSize')}]`
          } else if(e.data.partNo == overlap.list[0].partNo && e.data.partName == overlap.list[0].partName && e.data.spec == overlap.list[0].spec && e.data.inWh == overlap.list[0].inWh && e.data.outWh == overlap.list[0].outWh && e.data.lotSize == overlap.list[0].lotSize) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `중복된 데이터가 있습니다.`
          }
        }
      } else if(this.excelCode == 'G10') {
        if(e.rowType == 'data') {
          //중복값 확인 Parameter
          let overlap = await itemByCustOverlap({
            comCode: getComCode(),
            partNo: e.data.partNo,
            custCode: e.data.custCode
          })
          if(e.data.partNo == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('partNo')}]`
          } else if(e.data.custCode == null) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `${this.$t('noData')}`+`[${this.$t('custCode')}]`
          } else if(e.data.custCode == overlap.list[0].custCode) {
            e.cellElement.style.backgroundColor = '#fc3232'
            e.data.remark = `중복된 데이터가 있습니다.`
          }
        }
      }
    },
    //업로드 Button
    uploadBtn() {
      const params = {
        excelCode: this.excelCode,
        tmpResult: this.tmpResult,
        tmpResult2: this.tmpResult2
      }
      this.$refs.uploadPopup.open(params)
    },
    //엑셀 다운로드 Button
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById(this.excelId)) // table id를 넣어주면된다

      const workBook = this.$xlsx.utils.book_new() // 새 시트 생성
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1') // 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, this.excelFileName) // 엑셀파일 만듬
    },
    //저장Button
    async btnSave() {
      if (this.excelCode == 'A0') {
        return this.vToastify('기준정보 화면입니다.', 'warn')
      } else if (this.excelCode == 'A10') {
        console.log("click_A10")
        await this.gridCustInstance.saveEditData()
        let selectAll = await this.gridCustInstance.getDataSource()
        console.log("click_A10",selectAll._items)
        if (!selectAll._items.length > 0) {
          return this.vToastify('업로드 내용이 없습니다.', 'warn')
        }
        //필수값 체크
        let valCheckData = await selectAll._items.findIndex(e => {
          if (!e.codeChk) {
            return e.data.custCode == null || e.data.custName == null || e.data.custType == null || e.data.matType == null
          }
        console.log("중복값 체크", valCheckData)
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
              this.gridCustInstance.beginUpdate()
            }
            this.openLoading()
            saveAccountInfo(selectAll._items)
            .then(res => {
              if (res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                this.uploadAccountData = []
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridCustInstance.endUpdate()
              this.gridCustInstance.clearSelection()
              this.endLoading()
            })
          },
          null,
          true
        )
      } else if(this.excelCode == 'E10') {
        await this.gridItemInstance.saveEditData()
        let selectAll = await this.gridItemInstance.getDataSource()

        if (!selectAll._items.length > 0) {
          return this.vToastify('업로드 내용이 없습니다.', 'warn')
        }
        //필수값 체크
        let valCheckData = await selectAll._items.findIndex(e => {
          if (!e.codeChk) {
            return e.partNo == null || e.partName == null || e.unit == null || e.inWh == null || e.outWh == null || e.lotSize == null
          }
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
              this.gridItemInstance.beginUpdate()
            }
            this.openLoading()
            savePartTypeInfo(selectAll._items)
            .then(res => {
              if (res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                this.uploadAccountData = []
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridItemInstance.endUpdate()
              this.gridItemInstance.clearSelection()
              this.endLoading()
            })
          },
          null,
          true
        )
      } else if(this.excelCode == 'F10') {
        await this.gridBomInstance.saveEditData()
        let selectAll = await this.gridBomInstance.getDataSource()

        if (!selectAll._items.length > 0) {
          return this.vToastify('업로드 내용이 없습니다.', 'warn')
        }

        //유효성 체크
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            if (selectAll._items.length > 0) {
              this.gridBomInstance.beginUpdate()
            }
            this.openLoading()
            saveBomInfo(selectAll._items)
            .then(res => {
              if (res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                this.uploadAccountData = []
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridBomInstance.endUpdate()
              this.gridBomInstance.clearSelection()
              this.endLoading()
            })
          },
          null,
          true
        )
      } else if(this.excelCode == 'G10') {
        await this.gridItemByCustInstance.saveEditData()
        let selectAll = await this.gridItemByCustInstance.getDataSource()
        console.log("저장 데이터 체크::", selectAll._items)

        if (!selectAll._items.length > 0) {
          return this.vToastify('업로드 내용이 없습니다.', 'warn')
        }

        //필수값 체크
        let valCheckData = await selectAll._items.findIndex(e => {
          if (!e.codeChk) {
            return e.partNo == null || e.custCode == null
          }
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
              this.gridItemByCustInstance.beginUpdate()
            }
            this.openLoading()
            saveItemByCustInfo(selectAll._items)
            .then(res => {
              if (res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                this.uploadAccountData = []
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              console.log("error",error)
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridItemByCustInstance.endUpdate()
              this.gridItemByCustInstance.clearSelection()
              this.endLoading()
            })
          },
          null,
          true
        )
      }
    },
    //--------- 업로드 팝업 ----------
    getSelectData(e) {
      if(e.excelCode == 'A10') {
        this.uploadAccountData = e.list
      } else if(e.excelCode == 'E10') {
        this.uploadItemData = e.list
      } else if(e.excelCode == 'F10') {
        this.uploadBomData = e.list
      } else if(e.excelCode == 'G10') {
        this.uploadItemByCustData = e.list
      }
    }
  }
}
</script>
<style scoped>
.btn {
  background-color: #ffffff;
  color: #2b51eb;
  border:1px solid #2b51eb;
}
::v-deep.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__prepend-outer {
  margin-top: 3px;
}
</style>
