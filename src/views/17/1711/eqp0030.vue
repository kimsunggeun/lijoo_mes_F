<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch()">
          <template v-slot:body>
            <!-- 조회 Area -->
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="facCodeparms"
                  :label="$t('facName')"
                  :items="factoryList"
                  item-text="facName"
                  item-value="facCode"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="eqListSeach"
                  :label="$t('eqName')"
                  :items="eqList"
                  item-text="eqName"
                  item-value="eqCode"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
       
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical headerTitle="equipmentTypeheaderTitle">
            <!-- 설비정보 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="gridDataSource1"
                  class="doubleListBox04"
                  :ref="gridRef1"
                  :data-source="gridDataSource1"
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
                  @focused-row-changed="onFocusedMainRowChanged"
                >
                  <!-- @row-click="onRowclick" -->
                  <!-- <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"   />
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center"  :allow-editing="false" >
                  <DxLookup :data-source="factoryList" display-expr="facName" value-expr="facCode" />
                  </DxColumn> -->

                  <DxColumn data-field="eqCode" :caption="$t('eqCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"> 
                  </DxColumn>
                  <DxColumn data-field="eqName" :caption="$t('eqName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="eqSpec" :caption="$t('eqSpec')" width="auto" data-type="string" alignment="center" :allow-editing="false"  />
                  <DxColumn data-field="eqGrade" :caption="$t('eqGrade')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="eqState" :caption="$t('eqState')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="makeCom" :caption="$t('makeCom')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="perCom" :caption="$t('perCom')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="proDate" :caption="$t('proDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="makeQty" :caption="$t('makeQty')" width="auto" data-type="string"  alignment="center" :allow-editing="false" />
                  <DxColumn data-field="insDate" :caption="$t('insDate')"  width="auto" data-type="string"  alignment="center" :allow-editing="false" />
                  <DxColumn data-field="desDate" :caption="$t('desDate')" width="auto" data-type="string"  alignment="center" :allow-editing="false" />
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
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-tabs v-model="tabVal" @change="doSearchDetail()">
        <!-- <v-tab @click="tabChange('일상점검')">{{$t('dailyInspection')}}</v-tab>
        <v-tab @click="tabChange('정기점검')">{{$t('periodicInspection')}}</v-tab> -->
        <v-tab href="#10">{{$t('dailyInspection')}}</v-tab>
        <v-tab href="#20">{{$t('periodicInspection')}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabVal">
        <v-tab-item :value="'10'">
          <i-card-vertical
            headerTitle="dailyInspectionGT"
            :useBtnList="['btnAdd', 'btnSave','btnDelete']"
            @btnAdd="btnAdd('tab1')"
            @btnSave="btnSave('tab1')"
            @btnDelete="btnDelete('tab1')"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox04"
                    :ref="gridRef2"
                    :data-source="gridDataSource2"
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
                    @focused-row-changed="onFocusedRowChanged"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    <DxEditing mode="cell" />
                    <!-- <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" /> -->
                    <DxColumn data-field="inspDate" :caption="$t('inspDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="eqInsType" :caption="$t('eqInspType')" width="auto" data-type="string" alignment="center" :allow-editing="false" 
                    :set-cell-value="(newData, value) => {
                        newData.eqInsType = value
                        newData.eqInsCode = value
                      }">
                      <DxLookup :data-source="EQINSTYPELookUp" display-expr="name" value-expr="code" />
                    </DxColumn>
                    <DxColumn data-field="eqCode" :caption="$t('eqName')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                    <DxLookup :data-source="eqCodeLookUp" display-expr="eqName" value-expr="eqCode" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="eqInspNo" :caption="$t('inspNo')" width="auto" data-type="number" alignment="right" format="#,###" :allow-editing="false" >
                  
                    </DxColumn>
                    <DxColumn data-field="eqInsCode" :caption="$t('eqInspCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false">
                
                    </DxColumn>
                    <DxColumn data-field="insType" :caption="$t('insType')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                      <DxLookup :data-source="insTypeLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>

                  
                    <DxColumn data-field="insMeth" :caption="$t('insMeth')" width="auto" data-type="string" alignment="center"  :allow-editing="false" >
                    <DxLookup :data-source="insMethLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="jugCode" :caption="$t('jugCodeh')" width="auto" data-type="string" alignment="center"  :allow-editing="false" >
                    <DxLookup :data-source="jugCodeLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="insUnit" :caption="$t('insUnit')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="insUnitLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="insBase" :caption="$t('insBase')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                    
                    </DxColumn>
                    <DxColumn data-field="insUpp" :caption="$t('insUpp')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="insLow" :caption="$t('insLow')"  width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="judge" :caption="$t('judge')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                      <DxLookup :data-source="judgeLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="meaValue" :caption="$t('meaValue')" width="auto" data-type="string" alignment="center" edit-cell-template="myEditor" 
                    :set-cell-value="(newData, value) => {
                      passFail(newData,value)
                      }" css-class="devest-grid-header-require"
                      />

              
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true"
                              :editor-options="{ maxLength: 255 }" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto"  data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn 
                      data-field="" 
                      caption="" 
                      data-type="string" 
                      alignment="center"
                      width="auto"
                      :allow-editing="false"
                    />
    

                    <template #myEditor="{ data : cellInfo }">
                      <DxSelectBox
                        v-if="cellInfo.data.jugCode == '10'"
                        :value="cellInfo.value"
                        :data-source="sampleLookup"
                        display-expr="name"
                        value-expr="code"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                      <DxTextBox
                        v-else
                        :value="cellInfo.value"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                    </template>

                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />

                  
              
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item :value="'20'">
          <i-card-vertical
            headerTitle="periodicInspectionGT"
            :useBtnList="['btnAdd', 'btnSave','btnDelete']"
            @btnAdd="btnAdd('tab2')"
            @btnSave="btnSave('tab2')"
            @btnDelete="btnDelete('tab2')"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="gridDataSource3"
                    class="doubleListBox04"
                    :ref="gridRef3"
                    :data-source="gridDataSource3"
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
                    @focused-row-changed="onFocusedRowChanged"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                    <DxEditing mode="cell" />
                    <!-- <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" /> -->
                    <DxColumn data-field="inspDate" :caption="$t('inspDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="eqInsType" :caption="$t('eqInspType')" width="auto" data-type="string" alignment="center" :allow-editing="false" 
                    :set-cell-value="(newData, value) => {
                        newData.eqInsType = value
                        newData.eqInsCode = value
                      }">
                      <DxLookup :data-source="EQINSTYPELookUp" display-expr="name" value-expr="code" />
                    </DxColumn>
                    <DxColumn data-field="eqCode" :caption="$t('eqName')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                    <DxLookup :data-source="eqCodeLookUp" display-expr="eqName" value-expr="eqCode" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="eqInspNo" :caption="$t('inspNo')" width="auto" data-type="number" alignment="right" format="#,###" :allow-editing="false" >
                  
                    </DxColumn>
                    <DxColumn data-field="eqInsCode" :caption="$t('eqInspCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false">
                
                    </DxColumn>
                    <DxColumn data-field="insType" :caption="$t('insType')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                      <DxLookup :data-source="insTypeLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>

                  
                    <DxColumn data-field="insMeth" :caption="$t('insMeth')" width="auto" data-type="string" alignment="center"  :allow-editing="false" >
                    <DxLookup :data-source="insMethLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="jugCode" :caption="$t('jugCodeh')" width="auto" data-type="string" alignment="center"  :allow-editing="false" >
                    <DxLookup :data-source="jugCodeLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="insUnit" :caption="$t('insUnit')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="insUnitLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="insBase" :caption="$t('insBase')" width="auto" data-type="string" alignment="center" :allow-editing="false" >
                    
                    </DxColumn>
                    <DxColumn data-field="insUpp" :caption="$t('insUpp')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="insLow" :caption="$t('insLow')"  width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="judge" :caption="$t('judge')" width="auto" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                      <DxLookup :data-source="judgeLookUp" display-expr="name" value-expr="code" ></DxLookup>
                    </DxColumn>
                    <DxColumn data-field="meaValue" :caption="$t('meaValue')" width="auto" data-type="string" alignment="center" edit-cell-template="myEditor" css-class="devest-grid-header-require"
                    :set-cell-value="(newData, value) => {
                      passFail(newData,value)
                      }"
                      />

                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true"
                              :editor-options="{ maxLength: 255 }" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd hh:mm:ss" />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto"  data-type="date" alignment="center" :allow-editing="false" format="yyyy-MM-dd hh:mm:ss" />
                    <DxColumn 
                      data-field="" 
                      caption="" 
                      data-type="string" 
                      alignment="center"
                      width="auto"
                      :allow-editing="false"
                    />
    
                    <template #myEditor="{ data : cellInfo }">
                      <DxSelectBox
                        v-if="cellInfo.data.jugCode == '10'"
                        :value="cellInfo.value"
                        :data-source="sampleLookup"
                        display-expr="name"
                        value-expr="code"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                      <DxTextBox
                        v-else
                        :value="cellInfo.value"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                    </template>



                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
      </v-tabs-items>
    </v-row>

    <eqp0030pop :showAddEqp0030="showAddEqp0030" :tab="tabVal" :params="focusedRowData" @ok="okEqp0030" @close="showAddEqp0030 = false" />
  </v-container>
</template>

<script>
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import iCardVertical from '@/components/common/iCardVertical.vue'
import iDataTable from '@/components/common/iDataTable.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup, DxEditing } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'
import DxTextBox from 'devextreme-vue/text-box'
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' // message
import { getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { getUserId, getComCode } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getDelInfo, getInsDetails, getInsDetails2, saveInsDetails, getFacName, getMat0018Info, deleteQat0010 } from '@/api/view/qat0010'
import { getCustCodeName } from '@/api/view/bas0044'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { text } from 'body-parser'

import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드
import { getFacilityInfoData } from '@/api/view/bas0036' //
import { getEqp0030,getEqp0030Detail,deleteEqp0030,createEqp0030 } from '@/api/view/eqp0030' // 설비정보(메인그리드)

import eqp0030pop from './popup/eqp0030pop'

export default {
  name: 'qat0010',
  mixins: [baseview, BaseDataGrid],
  components: {
    eqp0030pop,
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxLookup,
    ICardTop,
    DxEditing,
    DxSelectBox,
    DxTextBox
  },
  data() {
    return {
      showAddEqp0030: false,

      //납품정보
      gridDataSource1: [],
      gridRef1: 'gridRef1',
      //일상점검
      gridDataSource2: [],
      gridRef2: 'gridRef2',
      //정기점검
      gridDataSource3: [],
      gridRef3: 'gridRef3',






      //달력
      startCal: false,
      endCal: false,
      startDate: getCurrentDate(),
      endDate: getCurrentDate(),

      //검색조건
      schFacCode: '',
      eqListSeach: '',

      //검사내역-판정방법코드
   

      //입고상태
      inStatus: '',

      checkBoxesMode: 'always',//themes.current().startsWith('material') ? 'always' : 'onClick',
      focusedRowData: null,
      custCode: [],
      rowIndex: '',
      facCodeparms:'',
      tapitem:"10",
      tabVal: '10',
      focusedDetialRowData:[],

      //룩업
      eqList: [],
      factoryList:[],
      eqCodeLookUp:[],
      EQINSTYPELookUp:[],
      insTypeLookUp:[],
      insMethLookUp:[],
      jugCodeLookUp:[],
      insUnitLookUp:[],
      judgeLookUp:[],
      sampleLookup:[]
      
    }
  },
  watch: {},
  beforeMount() {
    // this.btnSearch()

    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
      userId: getUserId()
    }
    Promise.all([
      getAccount(params),

    ])
      .then((res) => {
        res[0].list.forEach(e => {
          this.custCodeList.push({
            value: e.custCode,
            text: e.custName
          })
        })
        this.custCode = res[0].list.slice()
      })
      .catch((error) => { })
  },
  computed: {
    gridFist() {
      return this.GetDataGrid(this.gridRef1)
    },
    gridSecond() {
      return this.GetDataGrid(this.gridRef2)
    },
    gridThird() {
      return this.GetDataGrid(this.gridRef3)
    }
  },
  created() {
    this.lookupList()
  },
  methods: {
  

  async passFail(newData,value){
   
    
    console.log(this.focusedDetialRowData)
    let upAndLower = [this.focusedDetialRowData.insBase, this.focusedDetialRowData.insUpp,this.focusedDetialRowData.insLow]
    let upAndLowerMax = Math.max.apply(null,upAndLower)
    let upAndLowerMin = Math.min.apply(null,upAndLower)
    

    if(this.focusedDetialRowData.jugCode == '10'){
      newData.meaValue = value
      newData.meaValue === 'OK' ? newData.judge = '10'  : newData.judge = '20'
    } 
    else if(this.focusedDetialRowData.insLow !== null && this.focusedDetialRowData.insUpp !== null){
     if(upAndLowerMax >= value && upAndLowerMin <= value ){
      newData.meaValue = value
      newData.judge = '10'
    } 
    else {
      newData.meaValue = value
      newData.judge = '20'
    }
    }
   


    

 
    
    },
    //LookUp 관련
    async lookupList() {
      let facParm ={
          comCode: getComCode()
        }

        let facCode = await getFactoryInfoData(facParm)
        //공장코드
        this.factoryList = facCode.list
        this.facCodeparms = facCode.list[0].facCode

        let params = {
          comCode: getComCode(),
          facCode:facCode.list[0].facCode,
          eqCode:this.eqListSeach
        }
        let EqcodeRes =  await getFacilityInfoData(params)
        this.eqList = EqcodeRes.list
        this.eqCodeLookUp = EqcodeRes.list
        //설비코드

     let param = {
        comCode: getComCode(),
        code: ''
      }
      getCmChildCode(param).then(res => {
     
        res.list
          .filter(word => word.code === 'EQ_INS_TYPE')
          .forEach(e => {

            this.EQINSTYPELookUp.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'INS_TYPE' && word.userFlag ==='Y')
          .forEach(e => {
            this.insTypeLookUp.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'INS_METH' && word.userFlag ==='Y')
          .forEach(e => {
            this.insMethLookUp.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'JUG_CODEH' && word.userFlag ==='Y')
          .forEach(e => {
            this.jugCodeLookUp.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'INS_UNIT' && word.userFlag ==='Y')
          .forEach(e => {
            this.insUnitLookUp.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'JUDGE' && word.userFlag ==='Y')
          .forEach(e => {
          
            this.judgeLookUp.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'SAMPLE' && word.userFlag ==='Y')
          .forEach(e => {
        
            this.sampleLookup.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      
       
      })
    },
        



   
async btnSearch() {
      await this.doSearhMainGrid()
      // await this.doSearchDetail()
    },
async doSearhMainGrid() {
  this.gridDataSource2 = []
  this.gridDataSource3 = []


try {


  let params = {
  comCode: getComCode(),
  facCode:this.facCodeparms,
  eqCode:this.eqListSeach
}

  this.openLoading()
  let cnt = 0

  let resData = await getEqp0030(params)
 
  resData.list.forEach(e => {
    e.id = cnt++
  })
  this.gridDataSource1 = resData.list
  this.gridFist.saveEditData()

  this.gridFist.option('focusedRowIndex',0)


  
  this.endLoading()
} catch (error) {
  notify(error, 'error', 1500)
  
  this.endLoading()
}
},

    //검사내역 조회
    async doSearchDetail(){
      if(this.gridDataSource1.length < 1 || !this.focusedRowData) {
        return
      }
      // console.log('bbb')

      let params = {
        comCode:getComCode(),
        facCode:this.facCodeparms,
        eqCode:this.focusedRowData.eqCode,
        eqInsType:this.tabVal,
        eqInsCode:this.tabVal,
      }

      // console.log('params', params)

      this.openLoading()
      
      await getEqp0030Detail(params).then(res => {
     
      let cnt = 0
      res.list.forEach(e => {
        e.id = cnt++
      })
      
      if(params.eqInsType === '10'){
        this.gridSecond.clearSelection()
        this.gridDataSource2 = res.list
      }
      else{
        this.gridThird.clearSelection()
        this.gridDataSource3 = res.list
      }
      
      
      
      }).finally(() => {
        this.endLoading()
      })

    },
    //입고내역 조회
 
    onRowclick(e) {
      // console.log('onRowclick', e)
      this.focusedRowData = e.data
      this.gridDataSource2 = []
      this.gridDataSource3 = []
      this.doSearchDetail()
     },

     onFocusedMainRowChanged(e) {
      // console.log('onFocusedMainRowChanged', e)
      this.focusedRowData = e.row.data
      // console.log('focusedRowData', this.focusedRowData)
      this.gridDataSource2 = []
      this.gridDataSource3 = []
      this.doSearchDetail()
     },


     //데이터
     onFocusedRowChanged(e){
      // console.log('onFocusedRowChanged', e)
      this.focusedDetialRowData = e.row.data

     },

     btnAdd(tab) {
      if(this.gridDataSource1.length < 1) {
        return this.vToastify('설비타입이 없습니다.', 'warn')
      }

      this.showAddEqp0030 = true
     },

     okEqp0030(e) {
      // console.log('okEqp0030', e)
      this.showAddEqp0030 = false

      const data = e.list
      const date = e.date

      for(let i = 0; i < data.length; i++) {
        const row = data[i]
        const newRow = {
          id: this.tabVal === '10' ? this.gridDataSource2.length + 1 : this.gridDataSource3.length + 1,
          comCode: row.comCode,
          facCode: row.facCode,
          eqCode: row.eqCode,
          eqInsCode: row.eqInsCode,
          eqInsType: row.eqInsType,
          eqInspNo: row.eqInspNo,
          inspDate: date,
          insBase: row.insBase,
          insLow: row.insLow,
          insUpp: row.insUpp,
          insMeth: row.insMeth,
          insType: row.insType,
          insUnit: row.insUnit,
          jugCode: row.jugCode,
          __created__: true,
          __modified__: false
        }

        if(this.tabVal === '10') {
          this.gridSecond.newRow(newRow)
          this.gridSecond.selectRows(newRow.id, true)
          this.gridSecond.option('focusedRowIndex', 1)
        } else {
          this.gridThird.newRow(newRow)
          this.gridThird.selectRows(newRow.id, true)
          this.gridThird.option('focusedRowIndex', 1)
        }
      }
     },
   

    //저장버튼
    async btnSave(tab) {
   

      if (tab === 'tab1') {
        await this.gridSecond.saveEditData()
        var selectedgridSecondRows = await this.gridSecond.getSelectedRowsData()
        if (selectedgridSecondRows.length <= 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
        for(let tab1 of selectedgridSecondRows){

          if(tab1.meaValue == null || tab1.meaValue == ''){
            return this.vToastify('[필수입력]측정값', 'warn')
          }
        }
   
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridSecond.beginUpdate()
            createEqp0030(selectedgridSecondRows)
              .then(res => {
             
                if (res.success) {
                  this.doSearchDetail()
                  notify('Saved', 'success', 3000)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
          
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.gridSecond.endUpdate()
                this.gridSecond.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )}


        if (tab === 'tab2') {
        await this.gridThird.saveEditData()
        var selectedgridThirdRows = await this.gridThird.getSelectedRowsData()
        if (selectedgridThirdRows.length <= 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
        for(let tab2 of selectedgridThirdRows){
      
          if(tab2.meaValue == null || tab2.meaValue == ''){
            return this.vToastify('[필수입력]측정값', 'warn')
          }
        }
  

        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridThird.beginUpdate()
            createEqp0030(selectedgridThirdRows)
              .then(res => {
                if (res.success) {
                  
            
                  this.doSearchDetail()

                  notify('Saved', 'success', 3000)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.gridThird.endUpdate()
                this.gridThird.clearSelection()
                 this.doSearchDetail()
                this.endLoading()
              })
          },
          null,
          true
        )}




    },




    //삭제버튼
    async btnDelete(gbn){
      if(gbn === 'tab1'){
        let selectedgridSecondRows = await this.gridSecond.getSelectedRowsData()
  // console.log('selectedgridSecondRows', selectedgridSecondRows)
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          () => {
            
            this.openLoading(selectedgridSecondRows)
            this.gridSecond.beginUpdate()
            deleteEqp0030(selectedgridSecondRows)
              .then(res => {
                notify(this.$t('deleted'), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.gridSecond.endUpdate()
                this.gridSecond.clearSelection()
                this.doSearchDetail()
                this.endLoading()
              })
          },
          null,
          true
        )
      }


      
      if(gbn === 'tab2'){
        let selectedgridThirdRows = await this.gridThird.getSelectedRowsData()
        if (selectedgridThirdRows.length <= 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
        
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridThird.beginUpdate()
            deleteEqp0030(selectedgridThirdRows)
              .then(res => {
                notify(this.$t('deleted'), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.gridThird.endUpdate()
                this.gridThird.clearSelection()
                this.doSearchDetail()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    tabChange(e){
      // this.tapitem= e ==='일상점검' ? '10':'20'
      this.doSearchDetail()
    }
  }
}

</script>
<style scoped>
</style>