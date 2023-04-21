<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" outlined :useBtnList="[
                  'btnSearch', //조회
        ]" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  label="공장명"
                  :items="comCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchInTypeCode"
                  label="입고구분"
                  :items="inTypeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchInCateCode"
                  label="입고유형"
                  :items="inCateList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchCustCode"
                  label="거래처명"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0 mt-2">
                <v-text-field 
                  label="품번" 
                  class="search-text-field"
                  v-model="searchPartNoCode"
                  dense 
                  outlined 
                  color="primary" 
                  hide-details="auto"
                  :prepend-inner-icon="'$search'" 
                  @keydown.enter="btnSearch()" 
                  clearable 
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      label="수주일"
                      v-model="startDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title @input="dateInput" :day-format="(date) => { return new Date(date).getDate(); }" />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      label="~"
                      v-model="endDate"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate" :min="startDate" no-title scrollable @input="dateInput2" :day-format="(date) => { return new Date(date).getDate(); }"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="5" class="pa-2">
        <i-card-vertical headerTitle="otr_PvtSupWarinReg" :useBtnList="[
          'btnAdd', //추가
          'btnDelete' //삭제
        ]" @btnAdd="btnAdd" @btnDelete="btnDelete('구매 입고 등록')">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="purchWhsInfo" 
                  class="doubleListBox17" 
                  :ref="purchWhsInfoRef" 
                  :data-source="purchWhsInfo"
                  :remote-operations="false" 
                  :hover-state-enabled="true" 
                  :allow-column-resizing="true"
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true" 
                  :width="grid.width" 
                  :show-row-lines="true" 
                  key-expr="id" 
                  :focused-row-enabled="true"
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  @focused-row-changed="focused_purchWhsInfo"
                >
                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                  <DxColumn data-field="regiDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="inType" :caption="$t('inType')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="inType" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn data-field="inCate" :caption="$t('inCate')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="inCate" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn data-field="custCode" :caption="$t('custCode')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="custCode" display-expr="custName" value-expr="custCode" />
                  </DxColumn>
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="inQty" :caption="$t('inQty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="makeQty" :caption="$t('makeQty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="boxQty" :caption="$t('boxQty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="retQty" :caption="$t('retQty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="remark" :caption="$t('remark')" width="auto" data-type="string" alignment="center" :allow-editing="false" />  
                  <DxColumn data-field="printType" :caption="$t('printType')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" />      
                  <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn/>
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="7" class="pa-2">
        <i-card-vertical headerTitle="otr_PvtSupWarinDetail" :useBtnList="[]">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="purchWhsDetailInfo" 
                  class="doubleListBox17" 
                  :ref="purchWhsDetailInfoRef"
                  :data-source="purchWhsDetailInfo" 
                  :remote-operations="false" 
                  :hover-state-enabled="true"
                  :allow-column-resizing="true" 
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true"
                  :show-borders="true" 
                  :width="grid.width" 
                  :show-row-lines="true" key-expr="id"
                  :focused-row-enabled="true" 
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  parent-id-expr="comCode"
                >
                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                  <DxColumn data-field="regiDate" :caption="$t('regiDate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>    
                  <DxColumn data-field="no" :caption="$t('no')" width="auto" data-type="string" alignment="right" :allow-editing="false"/>
                  <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn data-field="qty" :caption="$t('qty')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="remark" :caption="$t('remark')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="printType" :caption="$t('printType')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" /> 
                  <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn/>
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <mat0040Popup ref="mat0040Popup" @btnSave="btnSavePop" />
  </v-container>
</template>

<script>
import { getFacCode } from '@/api/system/companyManage'
import { defineComponent } from '@vue/composition-api'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import 'devextreme/data/odata/store';
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getUserId, getComCode } from '@/utils/token'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import { getMat0013Info, createMat0013, deleteMat0013, getAccount } from '@/api/view/mat0013'
import { getMat0014Info, createMat0014, deleteMat0014 } from '@/api/view/mat0014'
import mat0040Popup from '@/views/14/1411/popup/mat0040Popup.vue'
import dxButton from 'devextreme/ui/button';
import notify from 'devextreme/ui/notify' // message
import { getCmChildCode } from '@/api/system/cmCodeManage'
import themes from 'devextreme/ui/themes'

export default {
  name: 'mat0020',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    mat0040Popup,
    DxLookup,

},
  data() {
    return {
      purchWhsInfo: [],
      purchWhsDetailInfo: [],
      startDate: getPreMonth(2),
      endDate: getCurrentDate(),  
      listClickData: '',
      purchWhsInfoRef: 'purchWhsInfoRef',             //공장정보
      purchWhsDetailInfoRef: 'purchWhsDetailInfoRef',   //공정정보
      popVisible: false,
      searchFacCode: '',
      searchInTypeCode: '',
      searchInCateCode: '',
      searchCustCode: '',
      searchPartNoCode: '',
      comCodeList: [],
      inTypeList: [],
      inCateList: [],
      custCodeList: [],
      comboBoxData: {
        inTypeCode: [],
        inCateCode: [],
      },
      inType:[],
      inCate:[],
      custCode:[],
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      purchWhsInfoData: [],
      menu1: '',
      menu2: '',
    }
  },
  beforeMount() {
    let params = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_TYPE',
      userFlag: 'Y'
    }

    let params2 = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_CATE',
      userFlag: 'Y'
    }
    let params3 = {
      comCode: getComCode()
    }
    Promise.all([
      getCmChildCode(params),
      getCmChildCode(params2),
      getAccount(params3)
    ])
      .then((res) => {
        
        this.inType = res[0].list.slice()
        this.inCate = res[1].list.slice()
        this.custCode = res[2].list.slice()
        this.comboBoxData = {
          inTypeCode: this.inType,
          inCateCode: this.inCate
        }
      })
      .catch((error) => { })


  },
  created(){
    const facCodeData = {
      comCode: getComCode()
    }
    getFacCode(facCodeData).then(res => {
      res.list.forEach(e => {
        this.comCodeList.push({
          value: e.facCode,
          text: e.facName
        })
      })
      this.searchFacCode = res.list[0].facCode
    })

    const inTypeData = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_TYPE',
      userFlag: 'Y'
    }
    getCmChildCode(inTypeData).then(res => {
      res.list.forEach(e => {

        this.inTypeList.push({
          value: e.sysCode,
          text: e.sysName
        })
      })
    })

    const inCateData = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_CATE',
      userFlag: 'Y'
    }
    getCmChildCode(inCateData).then(res => {
      res.list.forEach(e => {
        this.inCateList.push({
          value: e.sysCode,
          text: e.sysName
        })
      })
    })

    const custCodeData = {
      comCode: getComCode(),
    }
    //거래처명 조회조건
    getAccount(custCodeData).then(res => {
      res.list.forEach((item, i) => {
        this.custCodeList.push({
          value: item.custCode,
          text: item.custName
        })
      })
    })
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.purchWhsInfoRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.purchWhsDetailInfoRef)
    },
  },
  mounted() {
  },
  methods: {
    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },
    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },
    btnSearch(){
      this.doSearchMainList()
    },
    doSearchMainList(isProgress) {
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.searchFacCode == null ? '' : this.searchFacCode,
        inType: this.searchInTypeCode == null ? '' : this.searchInTypeCode,
        inCate: this.searchInCateCode == null ? '' : this.searchInCateCode,
        custCode: this.searchCustCode == null ? '' : this.searchCustCode,
        partNo: this.searchPartNoCode == null ? '' : this.searchPartNoCode,
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
      }
      getMat0013Info(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.purchWhsInfo = res.list
        if (this.purchWhsInfo.length === 0) {
          this.purchWhsInfoData = []
          this.doSearchDetailList()
        }
      }).finally(() => {
        if(!this.purchWhsInfo.length == 0){
          this.gridMainInstance.option('focusedRowIndex', -1)
          this.gridMainInstance.option('focusedRowIndex', 0)
          this.gridMainInstance.clearSelection()
        }

        this.endLoading()
      })
    },
    doSearchDetailList(){
      let params = {
        comCode: this.purchWhsInfoData.comCode,
        facCode: this.purchWhsInfoData.facCode,
        regiDate: this.purchWhsInfoData.regiDate,
        ilno: this.purchWhsInfoData.ilno
      }
      getMat0014Info(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.id = cnt++
        })
        this.purchWhsDetailInfo = res.list
      }).finally(() => {
        this.endLoading()
      })

    },
    btnAdd() {
      let row = {
        comCode: getComCode(),
        facCode: 'FAC01',
        regiDate: getCurrentDate(),
        ilno: '',
        inType: '',
        inCate: '',
        custCode: '',
        partNo: '',
        inQty: '',
        makeQty: '',
        boxQty: '',
        retQty: '',
        remark: '',
        printType: false,
        userFlag: true,
        makeDate: getCurrentDate(),
        maker: getUserId(),
        __created__: true,
        __modified__: false
      }
      this.$refs.mat0040Popup.open('add', row, this.comboBoxData)
    },
    async btnDelete(){
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

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
          deleteMat0013(selectedMainRows, true)
            .then(res => {
              notify(this.$t('deleted'), 'success', 3000)
            })
            .catch(error => {
              notify(error, 'error', 3000,)
              this.endLoading()
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.doSearchMainList()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    async btnSavePop(items){
      let list = []
      list.push(items)
      let messageGubun='doSaveData'
      if(!list[0].inType || !list[0].inCate || !list[0].custCode || !list[0].partNo || !list[0].inWh || !list[0].inQty || !list[0].makeQty){
      this.vToastify('필수항목 입력하세요 [입고구분, 입고유형, 거래처코드, 품번, 입고창고, 입고량, 구성량]', 'warn')
        return
      }
      if(Number(list[0].inQty) < Number(list[0].makeQty)){
        this.vToastify(this.$t('overMakeQty'), 'warn')
        return
      }
      if (list[0].boxQty <= 0 || isNaN(list[0].boxQty)) {
        this.vToastify(this.$t('입고량 또는 구성량은 1개 이상이어야 합니다.'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t(messageGubun),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          createMat0013(list)
            .then(res => {
              let message = ''
              message = list[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 3000)
              this.popVisible = false
              this.endLoading()
            })
            .catch(error => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.$refs.mat0040Popup.close('기타사급자재입고')
              this.doSearchMainList()
              this.endLoading()
            })
        },
      )
    },
    
    focused_purchWhsInfo(e){
      if(e.row === undefined){
        return
      }
      this.purchWhsInfoData = e.row.data
      this.doSearchDetailList()
    },
  }
}
</script>
<style scoped>

</style>
