<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12" class="pa-2 pt-0">
            <i-card-vertical headerTitle="companyInfoTitle"
              :useBtnList="[
                'btnSave', //저장
              ]" @btnSave="btnSave('회사')"
              >
              <template v-slot:body>
                <v-layout column overflow-auto>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid id="companyInformation" 
                      class="doubleListBox01" 
                      :ref="companyInfoRef"
                      :data-source="companyInformation" 
                      :remote-operations="false" 
                      :hover-state-enabled="true"
                      :allow-column-resizing="true" 
                      :allow-column-reordering="true" 
                      :row-alternation-enabled="true"
                      :show-borders="true" 
                      :width="grid.width" 
                      :show-row-lines="true" 
                      column-resizing-mode="widget"
                      key-expr="id"
                      :focused-row-enabled="true" 
                      :column-hiding-enabled="false"
                      >

                      <DxSelection show-check-boxes-mode="none" />
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="comName" :caption="$t('comName')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="corNumber" :caption="$t('corNumber')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="comNumber" :caption="$t('comNumber')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="name" :caption="$t('name')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="postNo" :caption="$t('postNo')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="addr" :caption="$t('addr')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="tel" :caption="$t('tel')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="fax" :caption="$t('fax')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="blobUrl" :caption="$t('icon')" width="auto" data-type="string" alignment="center" :allow-editing="false" cell-template="cellTemplate" />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn width="auto" :allow-editing="false" />  

                      <template #cellTemplate="{ data }">
                        <img 
                          ref="img"
                          v-if="data.value"
                          class="uploadedImage" 
                          :src="data.value"
                          @click="comImgClick(data)" 
                        >
                      </template>
                      <DxPaging :enabled="false" />
                      <DxPager  :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4" class="pa-2">
            <i-card-vertical headerTitle="departmentInfo" :useBtnList="[
              'btnAdd', //신규
              'btnSave', //저장
              'btnDelete' //삭제
            ]" @btnAdd="btnAdd('부서')" @btnSave="btnSave('부서')" @btnDelete="btnDelete('부서')">
              <template v-slot:body>
                <v-layout column overflow-auto>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid id="departmentInformation" 
                      class="doubleListBox12" 
                      :ref="departmentInformationRef"
                      :data-source="departmentInformation" 
                      :remote-operations="false" 
                      :hover-state-enabled="true"
                      :allow-column-resizing="true" 
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true" 
                      :show-borders="true" :width="grid.width"
                      :show-row-lines="true" 
                      column-resizing-mode="widget"
                      key-expr="id" 
                      :focused-row-enabled="true"
                      :column-hiding-enabled="false" 
                      @cellClick="listClick"
                      @editing-start="bas0021EditingStart">

                      <DxSelection show-check-boxes-mode="single"  />
                      <DxGrouping :auto-expand-all="autoExpandAll" />
                      <DxScrolling column-rendering-mode="virtual" />

                      <DxColumn :group-index="0" data-field="paDecodeGroup" caption="" />
                      <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :visible="true" css-class="devest-grid-header-require"/>
                      <DxColumn data-field="depCode" :caption="$t('depCode')" width="auto" data-type="string" alignment="left" css-class="devest-grid-header-require" />
                      <DxColumn data-field="depName" :caption="$t('depName')" width="auto" data-type="string" alignment="left" :allow-editing="true" />
                      <DxColumn data-field="paDecode" :caption="$t('paDecodeNm')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="true" edit-cell-template="checkBoxEditor" />
                      <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd hh:mm:ss" />
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd hh:mm:ss" />
                      <DxColumn width="auto" :allow-editing="false" />  
                    
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                          :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                      </template>

                      <DxPaging :enabled="false" />
                      <DxPager  :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-col>
          <v-col cols="8" class="pa-2 pb-0">
            <i-card-vertical headerTitle="employeeInfo"
              :useBtnList="[
                'btnInitialization', //비밀번호 초기화
                'btnCorrection', //수정
                'btnAdd', //신규
                'btnDelete' //삭제
              ]"
                
                @btnCorrection="btnCorrection('사원')"
                @btnAdd="btnAdd('사원')"
                @btnDelete="btnDelete('사원')"
                @btnInitialization="btnInitialization()" 
              >
              <template v-slot:body>
                <v-layout column overflow-auto>
                    <DxDataGrid id="griduserInformation" 
                      class="doubleListBox12"
                      :ref="userInformationRef"
                      :data-source="userInformation" 
                      :remote-operations="false" 
                      :hover-state-enabled="true"
                      :allow-column-resizing="true" 
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true" 
                      :show-borders="true" 
                      :width="grid.width"
                      :show-row-lines="true" 
                      column-resizing-mode="widget"
                      key-expr="id" 
                      :focused-row-enabled="true"
                      @rowClick="onGrdUserInfoClick"
                      @editing-start="bas0022EditingStart"
                      :column-hiding-enabled="false"
                    >
                      <DxSelection show-check-boxes-mode="none" />
                      <DxScrolling column-rendering-mode="virtual" />
                    
                      <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :visible="false" :allow-editing="false" css-class="devest-grid-header-require"/>
                      <DxColumn data-field="depCode" :caption="$t('depCode')" width="auto" data-type="string" alignment="left" :visible="false" :allow-editing="false" css-class="devest-grid-header-require"/>
                      <DxColumn data-field="facCode" :caption="$t('facName')" width="auto" data-type="string" alignment="center" :visible="false" :allow-editing="false" css-class="devest-grid-header-require">
                        <DxLookup :data-source="facCodes" display-expr="facName" value-expr="facCode" />
                      </DxColumn>
                      <DxColumn data-field="blobUrl" :caption="$t('userImage')" width="auto" data-type="string" alignment="center" :allow-editing="false" cell-template="cellTemplate" />
                      <DxColumn data-field="userId" :caption="$t('userId')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require"/>
                      <DxColumn data-field="userName" :caption="$t('userName')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require"/>
                      <DxColumn data-field="perCode" :caption="$t('perName')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                        <DxLookup :data-source="perCodes" display-expr="perName" value-expr="perCode" />
                      </DxColumn>
                      <DxColumn data-field="typeCode" :caption="$t('typeCodeNm')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                        <DxLookup :data-source="typeCodes" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn data-field="posiCode" :caption="$t('posiCodeNm')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                        <DxLookup :data-source="posiCodes" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn data-field="hp" :caption="$t('hp')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                      <DxColumn data-field="email" :caption="$t('email')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                      <DxColumn data-field="entDate" :caption="$t('entDate')" width="auto" data-type="string" alignment="center" format="yyyy-MM-dd" :allow-editing="false"/>
                      <DxColumn data-field="lanCode" :caption="$t('lanCode')" width="auto" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                        <DxLookup :data-source="lanCodes" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                      
                      <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="center" :allow-editing="false"/>
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                      <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string"  alignment="center" :allow-editing="false"/>
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/> 
                      <DxColumn width="auto" :allow-editing="false" />  
                      <template #cellTemplate="{ data }">
                        <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" />
                        <h4 v-else class="noImageText">No Image</h4>
                      </template>
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                          :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPaging :enabled="false" />
                      <DxPager  :show-page-size-selector="false" />
                    </DxDataGrid>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <bas0110Popup1
      ref="bas0110Popup1"
      @btnSave="btnSavePop" @close="close" :pop1Visible="pop1Visible" />
    <imagePopup ref="imagePopup"/>
    <comImagePopup ref="comImagePopup" @comImgData="saveComImg"/>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import { DxDataGrid, DxColumn, DxLookup, DxScrolling, DxGrouping, DxEditing, DxPager, DxButton } from 'devextreme-vue/data-grid'
import { getUserId, getComCode } from '@/utils/token'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message

import { getCompany, createCompany } from '@/api/system/companyManage'
import { getDepartment , createDepartment , deleteDepartment , checkDepartmentCd } from '@/api/system/departmentManage'
import { getUser, checkByUserId, createUser, deleteUser, initUserPass, getFacInfo } from '@/api/system/userManage'
import { getAccount , createAccount , checkAccountCd , deleteAccount } from '@/api/system/accountManage'

import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getAuthGroup } from '@/api/system/authManage'

import bas0110Popup1 from '@/views/11/1112/popup/bas0110Popup1'
import imagePopup from '@/views/11/1112/popup/imagePopup'
import comImagePopup from '@/views/11/1112/popup/comImagePopup'

export default {
  name: 'bas0110',
  mixins: [baseview, BaseDataGrid],
  components: {
    "i-card-vertical": iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxScrolling,
    DxGrouping,
    DxPager,
    bas0110Popup1,
    imagePopup,
    comImagePopup
},
  data() {
    return {
      companyInfoRef: 'companyInfoRef',
      departmentInformationRef: 'departmentInformationRef',
      userInformationRef: 'userInformationRef',
      accountInformationRef: 'accountInformationRef',

      autoExpandAll: true,
      companyInformation: [],
      departmentInformation: [],
      userInformation: [],
      accountInformation: [],

      listClickData: '',
      focusedRowIndex: '1',

      // cellVisible: false,
      pop1Visible: false,
      pop2Visible: false,
      pop3Visible: false,
      cancelBtn: true,
      saveBtn: true,
      lanCodes: [],
      //권한그룹코드
      perCodes: [],
      //사원유형
      typeCodes: [],
      //직위
      posiCodes: [],
      checkbox1: true,
      facCodes: [],
      //거래처정보 추가
      popupData: {},
      AccountEditing: true,
      clickData:[],
      //거래처유형 코드
      custCodes: [],
      //거래유형 코드
      matCodes: [],
      items: {
        perCodes: [],
        typeCodes: [],
        posiCodes: [],
        lanCodes: []
      }
    }
  },
  computed: {
    gridCompanyInstance() {
      return this.GetDataGrid(this.companyInfoRef)
    },
    gridMainInstance() {
      return this.GetDataGrid(this.departmentInformationRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.userInformationRef)
    },
    gridDetailInstance2() {
      return this.GetDataGrid(this.accountInformationRef)
    }
  },
  beforeMount() {
    //언어코드
    let params = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'LAN_CODE',
      userFlag: 'Y'
    }
    //거래처유형
    let params2 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'BIZ_GROUP',
    }
    //거래유형
    let params3 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'BIZ_TYPE',
    }
    //사원유형
    let params4 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'EMP_TYPE',
    }
    //직위
    let params5 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'PSNT',
    }
    //공장명
    let params6 = {
      comCode: getComCode(),
    }

    Promise.all([
      getCmChildCode(params),
      //권한그룹
      getAuthGroup(params),
      getCmChildCode(params2),
      getCmChildCode(params3),
      getCmChildCode(params4),
      getCmChildCode(params5),
      getFacInfo(params6),
    ])
    .then( res => {
      if(res[0].list.length > 0)
      this.lanCodes = res[0].list.slice()
      else {
        this.lanCodes = [{
          sysCode : 'ko',
          sysName : '한국어'
        }]
      }
      this.perCodes = res[1].list.slice()
      this.custCodes = res[2].list.slice()
      this.matCodes = res[3].list.slice()
      this.typeCodes = res[4].list.slice()
      this.posiCodes = res[5].list.slice()
      // console.log('공장데이터',res[6])
      this.facCodes = res[6].list.slice()

      this.items = {
        perCodes: this.perCodes,
        typeCodes: this.typeCodes,
        facCodes: this.facCodes,
        lanCodes: this.lanCodes
      }
    }).catch(error => {})
  },
  mounted() {
    this.doSearchCompany()
    this.doSearchDepartment()
    this.doSearchUser()
    this.doSearchAccount()
  },
  methods: {
    bas0021EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'depCode') {
          e.cancel = true
        }
      }
    },
    bas0022EditingStart(e) {
      // if (e.data.__created__ === false) {
        // if (e.column.dataField === 'comCode' || e.column.dataField === 'depCode' || e.column.dataField === 'userId') {
          e.cancel = true
        // }
      // }
    },
    //--------------- 회사정보
    doSearchCompany(isProgress) {
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
      }
      getCompany(params).then(res => {
        console.log("resresrse", res.list)
        res.list.forEach(e => {
          // e.created = false
          // e.modified = true
          let binaryString = window.atob(e.ciImageBase64)
          let binaryLen = binaryString.length
          let bytes = new Uint8Array(binaryLen)
          for (let a = 0; a < binaryLen; a++) {
            let ascii = binaryString.charCodeAt(a)
            bytes[a] = ascii
          }
          let blob = new Blob([bytes], {
            type: e.contentType
          })
          e.blobUrl = URL.createObjectURL(blob);
        });
        this.companyInformation = res.list
      }).finally(() => {
        this.endLoading()
      })
    },
    //--------------- 부서정보
    doSearchDepartment(isProgress) {
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
      }
      getDepartment(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
          e.paDecodeGroup = e.paDecode
        });
        this.departmentInformation = res.list
      }).finally(() => {
        this.endLoading()
      })
    },
    //--------------- 사원정보
    doSearchUser(isProgress) {
      this.userInformation = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
      }
      getUser(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
          if(e.userImage){
            let binaryString = window.atob(e.userImageBase64)
            let binaryLen = binaryString.length
            let bytes = new Uint8Array(binaryLen)
            for (let a = 0; a < binaryLen; a++) {
                let ascii = binaryString.charCodeAt(a)
                bytes[a] = ascii
            }
            let blob = new Blob([bytes], {
                type: e.contentType ,
            })
            e.blobUrl = URL.createObjectURL(blob);
          }
        })
        if (this.listClickData === '') {
          this.userInformation = res.list
        } else {
          res.list.forEach(e => {
            if (e.depCode === this.listClickData) {
              this.userInformation.push(e)
            }
          });
        }
      }).finally(() => {
        this.endLoading()
      })
    },
    //--------------- 거래처정보
    doSearchAccount(isProgress) {
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
      }
      getAccount(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
          // let idx = this.custTypeList.findIndex(element => element.sysCode === e.typeCode)
          // e.typeCode = this.custTypeList[idx].sysName
        })
        this.accountInformation = res.list
      }).finally(() => {
        this.endLoading()
      })
    },
    listClick(e) { 
      console.log("eeee",e)
      if (e.data) {
        this.listClickData = e.data.depCode
      } else {
        this.listClickData = ''
      }
      this.doSearchUser()
    },
    imgClick(e) {//이미지 클릭 팝업
      this.$refs.imagePopup.open(e)
    },
    comImgClick(param) { // 회사정보 그리드의 이미지 팝업
      this.$refs.comImagePopup.open(param)
    },
    //--------------- 사원선택시
    onGrdUserInfoClick(e) {
      this.popupData = e.data
    },
    // -------------------------------- Excel Download --------------------------------
    btnExcel(){
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('gridAccountInformation')); // table id를 넣어주면된다
      // let workSheet =  this.$xlsx.utils.sheet_to_html(document.getElementById('uploadCustomerOrder'));

      const workBook = this.$xlsx.utils.book_new()// 새 시트 생성 
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example')// 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, 'example.xlsx')// 엑셀파일 만듬
    },
    // -------------------------------- GRID ROW 추가 --------------------------------
    btnAdd(gbn) {
      if (gbn === '부서') {
        this.clickData = []
        let newRow = {
          id: this.departmentInformation.length == 0 ? 0 : this.departmentInformation.length + 1,
          comCode: getComCode(),
          depCode: '',
          depName: '',
          paDecode: '',
          paDecodeGroup: '',
          userFlag: 'Y',
          remark: '',
          makeDate: '',
          maker: getUserId(),
          editDate: '',
          editor: '',
          State: '',
          __created__: true,
          __modified__: false,

        }
        this.gridMainInstance.clearSelection()
        this.gridMainInstance.newRow(newRow)
        this.gridMainInstance.selectRows(newRow.id, true)
        // this.gridDetailInstance.option('focusedRowIndex', 1)
      } else if (gbn === '사원') {
        // 부서 선택 확인
        if(this.listClickData === ''){
          this.vToastify(this.$t('departmentsSelected'), 'warn')
          return
        }
        let check = this.userInformation.findIndex((e) => e.created === 'true')
        if (check === -1) {
          let row = {
            id: this.userInformation.length == 0 ? 0 : this.userInformation.length + 1,
            comCode: getComCode(),
            depCode: this.listClickData,
            userId: '',
            userName: '',
            perCode: '',
            typeCode: '',
            posiCode: '',
            facCode: 'FAC01',
            hp: '',
            email: '',
            entDate: '',
            lanCode: '',
            userFlag: 'Y',
            userImage: '',
            remark: '',
            makeDate: '',
            maker: getUserId(),
            blobUrl: '',
            editDate: '',
            editor: '',
            created: 'true',
            modified: 'false',
          }
          this.gridDetailInstance.clearSelection()
          this.pop1Visible = true
          this.$refs.bas0110Popup1.open('add', row, this.items)
          
          // this.gridDetailInstance.clearSelection()
          // this.gridDetailInstance.newRow(newRow)
          // this.gridDetailInstance.selectRows(newRow.id, true)
          // this.gridDetailInstance.option('focusedRowIndex', -1)
        } else {
          notify('신규 행이 존재합니다.', 'error', 1500)
        }
      }
    },
    // -------------------------------- 저장 --------------------------------
    async btnSave(gbn) {
      if (gbn === '부서') {
        this.gridMainInstance.saveEditData()
        let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
        // __created__ = true 저장, __modified__ = true 수정
        let messageGubun = ''

        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (let row of selectedMainRows) {
          if (!row.comCode || !row.depCode) {
            this.vToastify(this.$t('requiredInput'), 'warn')
            return
          }
          if (row.__created__ === false) {
            messageGubun = 'doFixData'  //수정 하시겠습니까?
            row.__modified__ = true
            row.comCode = getComCode()
            row.editor = getUserId()
          } else if (row.__created__ === true) {
            messageGubun = 'doSaveData'  //저장 하시겠습니까?
            row.comCode = getComCode()
            row.maker = getUserId()
          }
        }

        let praams = {
          comCode: selectedMainRows[0].comCode,
          depCode: selectedMainRows[0].depCode
        }
        // 부서코드 중복 확인후 저장
        // checkDepartmentCd(praams)
        //   .then(res => {
        //     if(res.success === false && selectedMainRows[0].__created__ === true ) {
        //       this.vToastify(this.$t('departmentCodeOverlap'), 'warn')
        //       return
        //     } else {
        //     }
        //   }).catch(error => {
        //     console.log("error : ", error)
        //     notify(error, 'error', 1500)
        //     this.endLoading()
        //   })

          this.vToastifyPrompt(
            this.$t(messageGubun),
            'info',
              current => {
                this.openLoading()
                this.gridMainInstance.beginUpdate()
                createDepartment(selectedMainRows)
                  .then(res => {
                    // this.doSearchMain(false)
                    let message = ''
                    message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                    notify(this.$t(message), 'success', 1500)
                    this.doSearchDepartment()

                  })
                  .catch(error => {
                    // notify(this.$t('error'), 'warn', 1500)
                    notify(error, 'error', 1500)
                    this.endLoading()
                  })
                  .finally(() => {
                    this.gridMainInstance.endUpdate()
                    this.endLoading()
                  })
              },
              null,
              true
            )
            
      } else if (gbn === '회사') {
        console.log(this.gridCompanyInstance)
        this.gridCompanyInstance.saveEditData()
        let compInfo = await this.gridCompanyInstance.getFocusedRow()
        if (!compInfo) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        /*
        let datas = new FormData()
        
        let items = {
          //gbn: gbn,
          file: this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null,
          popupData: [{
              id: this.id,
              comCode: this.comCode,
              depCode: this.depCode,
              userId: this.userId,
              userName: this.userName,
              perCode: this.perCode.perCode ? this.perCode.perCode : this.perCode,
              typeCode: this.typeCode.sysCode ? this.typeCode.sysCode : this.typeCode,
              posiCode: this.posiCode,
              facCode: this.facCode.facCode ? this.facCode.facCode : this.facCode,
              hp: this.hp,
              email: this.email,
              entDate: this.entDate,
              lanCode: this.lanCode.sysCode ? this.lanCode.sysCode : this.lanCode,
              userFlag: this.userFlag,
              userImage: this.fileName ? this.fileName : this.userImage,
              remark: this.remark,
              makeDate: this.makeDate,
              maker: this.maker,
              editDate: this.editDate,
              editor: this.editor,
              created: this.created,
              modified: this.modified,
              fileModified: this.fileUploader._files.length > 0 ? true : false,
              __created__: this.created,
              __modified__: this.modified
          }]
        }

        if(items.file != null)
          datas.append('file', items.file)
        for (var key in items.popupData[0]) {
          datas.append(key, items.popupData[0][key])
          // console.log('datas',key, items.popupData[0][key]);
        }
        */
        this.vToastifyPrompt(
          this.$t('doFixData'),
          'info',
          current => {
            this.openLoading()
            this.gridCompanyInstance.beginUpdate()
            createCompany(compInfo)
              .then(res => {
                notify(this.$t('changed'), 'success', 1500)
                this.doSearchCompany()
              })
              .catch(error => {
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridCompanyInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    saveComImg(param) {
      this.gridCompanyInstance.getFocusedRow()
      console.log(param)
      this.vToastifyPrompt(
        this.$t('저장하시겠습니까'),
        'info',
        current => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          let compData = new FormData()
          for(let i in param) {
            compData.append(i, param[i])
          }
          createCompany(compData)
          .then(res => {
            notify(this.$t('저장되었습니다.'), 'success', 1500)
            this.$refs.comImagePopup.close()
            this.doSearchCompany()
          })
          .catch(error => {
            notify(error, 'error', 1500)
            this.endLoading()
          })
          .finally(() => {
            this.gridDetailInstance.endUpdate()
            this.endLoading()
          })
        }
      )
    },

    btnSavePop(items) {
      console.log("btnSavePop",items.popupData)
      let messageGubun = ''        
      if (items.gbn === '사원') {
        
        //유효성 체크
        if(items.popupData.entDate){
          items.popupData.entDate = items.popupData.entDate.slice(0, 10)
        }
        if (!items.popupData.comCode || !items.popupData.depCode 
        || !items.popupData.userId || !items.popupData.lanCode) {
          this.vToastify(this.$t('requiredInput2'), 'warn')
          return
        }
        if (items.popupData.created != 'true') {
          messageGubun = 'doFixData'
          items.popupData.modified = 'true'
          items.popupData.editor = getUserId()
        } else {
          messageGubun = 'doSaveData'
          items.popupData.maker = getUserId()
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          current => {
            this.openLoading()
            // beginUpdate() 메서드가 호출 된 후 endUpdate() 메서드가 호출될때까지 UI를 업데이트 하지 않음.
            this.gridDetailInstance.beginUpdate()
            let datas = new FormData()
            console.log("확인",items.popupData)
            for (var key in items.popupData) {
              if (key == 'file' && items.popupData.file == null)
                continue

              datas.append(key, items.popupData[key])
            }
            console.log("datas??",datas)
            createUser(datas)
              .then(res => {
                // this.doSearchMain(false)
                let message = items.popupData.created == 'true' ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchUser()
                this.pop1Visible = false
              })
              .catch(error => {
                notify(error, 'error', 1500)
                this.endLoading()
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
    // -------------------------------- 삭제 --------------------------------
    async btnDelete(gbn){
      if(gbn === '부서'){
        let selectedDetailRows = await this.gridMainInstance.getSelectedRowsData()

        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        if (this.userInformation.length){
          this.vToastify(this.$t('employeesRegistered'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.gridMainInstance.beginUpdate()
            deleteDepartment(selectedDetailRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDepartment()
              })
              .catch(error => {
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridMainInstance.saveEditData()
                this.gridMainInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if(gbn === '사원'){
        let selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()

        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.gridDetailInstance.beginUpdate()
            deleteUser(selectedDetailRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchUser()
              })
              .catch(error => {
                notify(error, 'error', 3000)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance.saveEditData()
                this.gridDetailInstance.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    // -------------------------------- 비밀번호 초기화 --------------------------------
    async btnInitialization(){
      console.log("비밀번호초기화 : ")
      this.gridDetailInstance.saveEditData()

      let selectedUserRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedUserRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      let params = {
        userPassword: '1111',
				editor: getUserId(),
        comCode: getComCode(),
        userId:selectedUserRows[0].userId
      }

      this.vToastifyPrompt(
        this.$t('resetYourPassword'),
        'info',
        current => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          initUserPass(params)
            .then(res => {
              notify(this.$t('resetPassword'), 'success', 1500)
              this.doSearchUser()
            })
            .catch(error => {
              notify(error, 'error', 1500)
              this.endLoading()

            })
            .finally(() => {
              this.gridDetailInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    // -------------------------------- 사원 정보 수정 --------------------------------
    async btnCorrection(gbn) {
      let selectedDetailRows
      // this.popupData.userFlag = 'Y'
      selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.$refs.bas0110Popup1.open('mod', this.popupData, this.items)
      this.pop1Visible = true
    },
    close() {
        this.pop1Visible = false
        this.pop2Visible = false
        this.pop3Visible = false
    }
  }

}
</script>
<style lang="less" scoped>
::v-deep .v-text-field.v-text-field--enclosed {
  margin: 0;
  padding-top: 5px;
}
.uploadedImage {
  width: 70px;
  height: 70px;
  object-fit: scale-down;
}
.noImageText {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>