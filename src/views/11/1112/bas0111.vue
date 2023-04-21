<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12" class="pa-2">
            <i-card-vertical headerTitle="customerInfo" :useBtnList="[
              'btnExcel', //엑셀
              'btnCorrection', //수정
              'btnAdd', //신규
              'btnDelete' //삭제
            ]" @btnExcel="btnExcel()" @btnAdd="btnAdd('거래처')" @btnCorrection="btnCorrection('거래처')"
              @btnDelete="btnDelete('거래처')">
              >
              <template v-slot:body>
                <v-layout column overflow-auto>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid 
                      id="gridAccountInformation" 
                      class="listBox02" 
                      :ref="accountInformationRef"
                      :data-source="accountInformation" 
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
                      @editing-start="bas0023EditingStart" 
                      @rowClick="popupOpen"
                      >

                      <DxSelection show-check-boxes-mode="none" />
                      <DxScrolling column-rendering-mode="virtual" />

                      <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="left" :visible="true" :allow-editing="false" css-class="devest-grid-header-require" />
                      <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="left" :allow-editing="false" css-class="devest-grid-header-require" />
                      <DxColumn data-field="custName" :caption="$t('custName')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require" />
                      <DxColumn data-field="custType" :caption="$t('custTypeNm')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                        <DxLookup :data-source="custCodes" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn data-field="matType" :caption="$t('matTypeNm')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                        <DxLookup :data-source="matCodes" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn data-field="custNo" :caption="$t('comNumber')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="name" :caption="$t('name')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="conType" :caption="$t('conType')" width="auto" data-type="string" alignment="lecenterft" :allow-editing="false" />
                      <DxColumn data-field="secType" :caption="$t('secType')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="postNo" :caption="$t('postNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="addr" :caption="$t('addr')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="tel" :caption="$t('tel')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="fax" :caption="$t('fax')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="email" :caption="$t('email')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="manName" :caption="$t('manName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="manTel" :caption="$t('manTel')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="manAddr" :caption="$t('manAddr')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" edit-cell-template="checkBoxEditor" />
                      <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd hh:mm:ss" />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd hh:mm:ss" />
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false"/>
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                          :onValueChanged="value => onCheckValueChanged(value, cellInfo)" :disabled="true" />
                      </template>
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <bas0111Popup ref="bas0111Popup" @btnSave="btnSavePop" @close="close" :pop2Visible="pop2Visible" />
    <imagePopup ref="imagePopup" />
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
import { getDepartment, createDepartment, deleteDepartment, checkDepartmentCd } from '@/api/system/departmentManage'
import { getUser, checkByUserId, createUser, deleteUser, initUserPass, getFacInfo } from '@/api/system/userManage'
import { getAccount, createAccount, checkAccountCd, deleteAccount } from '@/api/system/accountManage'

import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getAuthGroup } from '@/api/system/authManage'

import bas0111Popup from '@/views/11/1112/popup/bas0111Popup'
import imagePopup from '@/views/11/1112/popup/imagePopup'

export default {
  name: 'bas0110',
  mixins: [baseview, BaseDataGrid],
  components: {
    "i-card-vertical": iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxScrolling,
    DxPager,
    bas0111Popup,
    imagePopup,
  },
  data() {
    return {
      accountInformationRef: 'accountInformationRef',

      autoExpandAll: true,
      accountInformation: [],

      focusedRowIndex: '1',

      // cellVisible: false,
      pop2Visible: false,
      lanCodes: [],
      //거래처정보 추가
      popupData: {},
      AccountEditing: true,
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
      .then(res => {
        this.lanCodes = res[0].list.slice()
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
      }).catch(error => { })
  },
  mounted() {
    this.doSearchAccount()
  },
  methods: {
    bas0023EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'custCode') {
          e.cancel = true
        }
      }

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
        })
        this.accountInformation = res.list
      }).finally(() => {
        this.endLoading()
      })
    },
    //--------------- 거래처 수정시
    popupOpen(e) {
      this.popupData = e.data
      this.popupData.__created__ = false
      this.popupData.__modified__ = true
    },
    // -------------------------------- Excel Download --------------------------------
    btnExcel() {
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('gridAccountInformation')); // table id를 넣어주면된다
      // let workSheet =  this.$xlsx.utils.sheet_to_html(document.getElementById('uploadCustomerOrder'));

      const workBook = this.$xlsx.utils.book_new()// 새 시트 생성 
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example')// 시트 명명, 데이터 지정
      this.$xlsx.writeFile(workBook, 'example.xlsx')// 엑셀파일 만듬
    },
    // -------------------------------- GRID ROW 추가 --------------------------------
    btnAdd(gbn) {

      if (gbn === '거래처') {
        let row = {
          id: this.accountInformation.length == 0 ? 0 : this.accountInformation.length + 1,
          comCode: getComCode(),
          custCode: '',
          custName: '',
          custType: '',
          matType: '',
          custNo: '',
          name: '',
          conType: '',
          secType: '',
          postNo: '',
          addr: '',
          tel: '',
          fax: '',
          email: '',
          manName: '',
          manTel: '',
          manAddr: '',
          userFlag: 'Y',
          remark: '',
          makeDate: '',
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false
        }
        this.gridDetailInstance2.clearSelection()
        this.pop2Visible = true
        this.$refs.bas0111Popup.open('add', row, this.custCodes, this.matCodes)

      }
    },

    async btnSavePop(items) {
      let messageGubun = ''
      let data = []
      let success = true
      if (items.gbn === '거래처') {
        if (!items.popupData[0].comCode || !items.popupData[0].custCode) {
          this.vToastify(this.$t('requiredInput3'), 'warn')
          return
        }

        if (items.popupData[0].__created__ === true) {
          messageGubun = 'doSaveData'
          items.popupData[0].maker = getUserId()

          let params2 = {
            comCode: items.popupData[0].comCode,
            custCode: items.popupData[0].custCode
          }
          // 거래처코드 중복확인후 저장
          // checkAccountCd(params2)
          //   .then(res => {
          //     this.addAccount(messageGubun, items)
          //   }).catch(error => {
          //     this.vToastify(this.$t('accountCodeOverlap'), 'warn')
          //   })
        } else {
          messageGubun = 'doFixData'
          items.popupData[0].editor = getUserId()
        }
        if(items.popupData[0].userFlag === true){
          items.popupData[0].userFlag = 'Y'
        } else {
          items.popupData[0].userFlag = 'N'
        }
        console.log("items.popupData",items.popupData)
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          current => {
            this.openLoading()
            createAccount(items.popupData)
              .then(res => {
                let message = items.popupData[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchAccount()
                this.pop2Visible = false
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
      }
    },
    // -------------------------------- 삭제 --------------------------------
    async btnDelete(gbn) {
      if (gbn === '거래처') {
        let selectedDetailRows = await this.gridDetailInstance2.getSelectedRowsData()
        if (!selectedDetailRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.gridDetailInstance2.beginUpdate()
            deleteAccount(selectedDetailRows, true)
              .then(res => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchAccount()
              })
              .catch(error => {
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance2.saveEditData()
                this.gridDetailInstance2.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }

    },

    // -------------------------------- 거래처 수정 --------------------------------
    async btnCorrection(gbn) {
      let selectedDetailRows
      // this.popupData.userFlag = 'Y'
        selectedDetailRows = await this.gridDetailInstance2.getSelectedRowsData()
        if(selectedDetailRows[0].userFlag === 'Y'){
          selectedDetailRows[0].userFlag = true
        } else {
          selectedDetailRows[0].userFlag = false
        }
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
        this.pop2Visible = true
        this.$refs.bas0111Popup.open('mod', this.popupData, this.custCodes, this.matCodes)


    },
    close() {
      this.pop1Visible = false
      this.pop2Visible = false
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
  width: 50px;
  height: 50px;
}</style>