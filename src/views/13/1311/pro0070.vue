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
                <!-- 공장명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.facCode"
                    :label="$t('facName')"
                     @change="comboChange('factory')"
                    :items="comboBoxList.facCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                  />
                </v-col>
                <!-- 비가동 코드 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :label="$t('nonOperationCode')"
                    v-model="stopCodeSelect"
                    :items="stopCodeList"
                    item-text="sysName"
                    item-value="sysCode"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 작업장명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :label="$t('workName')"
                     @change="comboChange('workCode')"
                    v-model="searchValue.workCode"
                    :items="comboBoxList.workCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 작업반명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                     @change="comboChange('workDeCode')"
                    :label="$t('workDename')"
                      v-model="searchValue.workDecode"
                    :items="comboBoxList.workDecodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <!-- 설비명 선택 -->
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    :label="$t('eqName')"
                    v-model="eqCodeSelect"
                    :items="comboBoxList.eqNameList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <!-- 조회일 -->
                <v-col cols="2">
                  <v-menu
                    ref="frPlanDateCal"
                    v-model="calMenuState.frPlanDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$calendar'"
                        :label="$t('nonOperationDate')"
                        v-model="workDate"
                        dense
                        outlined
                        clearable
                        readonly
                        color="primary"
                        class="required mx-1 rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="workDate"
                      no-title
                      @input="calMenuState.frPlanDateCal = false"
                      :day-format="(date) => { return new Date(date).getDate(); }"
                    />
                  </v-menu>
                </v-col>

               
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2 pr-2">
        <i-card-vertical
          headerTitle="facOperationStatus"
          :useBtnList="[
            'btnAdd', //추가
            'btnSave', //저장
            'btnDelete', //삭제
          ]"
          @btnAdd="btnAdd('')"
          @btnSave="btnSave('')"
          @btnDelete="btnDelete('')"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="main"
                  class="listBox03"
                  :ref="mainGridRef"
                  :data-source="mainGrid"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  :column-auto-width="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @editing-start="editingStart"
                  @row-click="startEdit"
           
                
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                    <!-- 비가동 순번 Column -->
                  <DxColumn 
                    data-field="no" 
                    :caption="$t('nonOperationNo')" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <!-- 비가동일련번호 Column -->
                  <DxColumn 
                    data-field="nonIlno" 
                    :caption="$t('nonOperationIlno')"
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
     
                  <!-- 작업지시번호 Column -->
                  <DxColumn 
                    data-field="workNo" 
                    :caption="$t('workNo')" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                  />
                  <!-- 비가동 일자 Column -->
                  <DxColumn 
                    data-field="workDate" 
                    :caption="$t('nonOperationDate')" 
                    data-type="date" 
                    format="yyyy-MM-dd"
                    alignment="center"
                    width="auto"
                  />
                  <!-- 작업장코드 Column -->
                  <DxColumn 
                    data-field="workCode" 
                    :caption="$t('workName')" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    css-class="devest-grid-header-require"
                  >
                  <DxLookup :data-source="comboBoxList.workCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 작업반코드 Column -->
                  <DxColumn
                    data-field="workDecode"
                    :caption="$t('workDecode')"
                    :visible="false"
                    :min-width="120"
                    data-type="string"
                    alignment="center"
                    width="auto"
                  />
                   <DxColumn
                    data-field="workDename"
                    :caption="$t('workDename')"
                    :min-width="120"
                    data-type="string"
                    alignment="center"
                    width="auto"
                    css-class="devest-grid-header-require"
                  />
                  <!-- 설비코드 Column -->
                  <DxColumn 
                    data-field="eqCode" 
                    :caption="$t('eqCode')" 
                    :visible="false"
                    data-type="string" 
                    alignment="center"
                    width="auto"
                  >
                  </DxColumn>
                  <DxColumn 
                    data-field="eqName" 
                    :caption="$t('eqName')" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    css-class="devest-grid-header-require"
                  >
                  </DxColumn>
                  <!-- 비가동코드 Column -->
                  <DxColumn 
                    data-field="stopCode" 
                    :caption="$t('nonOperationCode')" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    css-class="devest-grid-header-require"
                  >
                  <DxLookup :data-source="stopCodeList" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <!-- 비가동 시작시간 Column -->
                  <DxColumn 
                    data-field="startTime" 
                    :caption="$t('nonOperationTime')" 
                    alignment="center"
                    data-type="date"
                    format="yyyy-MM-dd HH:mm"
                    edit-cell-template="startTime"
                    :set-cell-value="(newData, value) => setCellValueStart(newData, value)"
                    width="auto"
                    css-class="devest-grid-header-require"
                  />
                  <template #startTime="{data :cellInfo}">
                    <DxDateBox 
                     type="datetime"
                    :value="cellInfo.value"
                     format="yyyy-MM-dd HH:mm"
                    :onValueChanged="(value) => onValueChanged(value, cellInfo)"
                   
                    />
                  </template>

                  <!-- 비가동 종료시간 Column -->
                  <DxColumn 
                    data-field="endTime" 
                    :caption="$t('nonOperationEndTime')" 
                     data-type="date"
                    format="yyyy-MM-dd HH:mm"
                    alignment="center"
                     :set-cell-value="(newData, value) => setCellValueEnd(newData, value)"
                    edit-cell-template="endTime"
                    width="auto"
                    css-class="devest-grid-header-require"
                  />
                  <template #endTime="{data :cellInfo}">
                    <DxDateBox 
                     type="datetime"
                      format="yyyy-MM-dd HH:mm"
                    :value="cellInfo.value"
                    :onValueChanged="(value) => onValueChanged(value, cellInfo)"
                    
                    />
                  </template>
                
                
                  <!-- 비가동시간(분) Column -->
                  <DxColumn 
                    data-field="stopTime" 
                    :caption="$t('Downtime_minutes')" 
                    data-type="number" 
                    format="#,##0"
                    :allow-editing="false"
                    alignment="center"
                    width="auto"
                  />

                  
                    <!-- 비고 Column -->
                  <DxColumn 
                    data-field="remark" 
                    :caption="$t('remark')" 
                    data-type="string" 
                    alignment="center"
                    width="500"
                  />
                  <!-- 회사코드 Column -->
                  <DxColumn 
                    data-field="comCode" 
                    :caption="$t('comCode')" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                    width="auto"
                  />
                 
                  <!-- 공장코드 Column -->
                  <DxColumn 
                    data-field="facCode" 
                    :caption="$t('facCode')" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  >
                  <DxLookup :data-source="comboBoxList.facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
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
                    data-field="editor"
                    :caption="$t('editor')"
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
                    data-field="" 
                    caption="" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                <DxSelection select-all-mode="allMode" mode="multiple" />
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
       <DxPopup
      :visible.sync="itemPopup3"
      :show-close-button="true"
      :show-title="true"
      :title="$t('workDename')"
      height="auto"
      width="70%"
      max-width="400px"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText3">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGrid3Ref"
                  :data-source="popupInfoGrid3"
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
                  @CellDblClick="popListDbClickItem"
                >
                  <DxColumn
                    data-field="workDename"
                    :caption="$t('workDename')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="workInsert()"> {{ $t('choice') }} </v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="itemPopup3 = false">
            {{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <DxPopup
      :visible.sync="itemPopup1"
      :show-close-button="true"
      :show-title="true"
      :title="$t('eqName')"
      height="auto"
      width="70%"
      max-width="400px"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText1">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGrid1Ref"
                  :data-source="popupInfoGrid1"
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
                  @CellDblClick="popListDbClickEqItem"
                >
                  <DxColumn
                    data-field="eqName"
                    :caption="$t('eqName')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="eqInsert()"> {{ $t('choice') }} </v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="itemPopup1 = false">
            {{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <DxPopup
      :visible.sync="itemPopup2"
      :show-close-button="true"
      :show-title="true"
      :title="$t('workNo')"
      height="auto"
      width="70%"
      max-width="400px"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText2">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGrid2Ref"
                  :data-source="popupInfoGrid2"
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
                  @CellDblClick="popListDbClickWorkNo"
                >
                  <DxColumn
                    data-field="workNo"
                    :caption="$t('workNo')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="workNoInsert()"> {{ $t('choice') }} </v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="itemPopup2 = false">
            {{ $t('cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import themes from 'devextreme/ui/themes'
import { DxDataGrid, DxColumn, DxPager, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import DxDateBox from 'devextreme-vue/date-box'
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' // message
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드
import { getUserId, getComCode } from '@/utils/token' //토큰
import { getCmChildCode } from '@/api/system/cmCodeManage' //공통코드
import { getWorkShopInfoData } from '@/api/view/bas0034'
import { getWorkPartyInfoData } from '@/api/view/bas0035'
import { getFacilityInfoData } from '@/api/view/bas0036'

import { getPro0070,getBas0035,delPro0070,createPro0070,getBas0090, getPro0021 } from '@/api/view/pro0070'
export default {
  name: 'pro0070',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    DxPager,
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxPopup,
    DxDateBox
  },
  data() {
    return {
      searchValue: {
        facCode:'',
        workCode: '',
        workDecode: '',
        eqName:''
      },
      comboBoxList: {
        facCodeList: [],
        workCodeList: [],
        workDecodeList: [],
        eqNameList:[],
       },

      calMenuState: {
        frPlanDateCal: false,
        toPlanDateCal: false,
      },
      mainGridRef:'main',
      mainGrid:[],
      facCodeSelect:'',
      stopCodeList:[],
      stopCodeSelect:'',
    
      eqCodeSelect:'',
      workDate:'', 
      comCodeList:[],
     disabledState: {
        workDecode: true
      },
      startdate :'',
      resultdate :'',
      enddate:'',

   popupInfoGrid3Ref: 'popupInfoGrid3Ref',
   popupInfoGrid3: [],
   popupInfoGrid1Ref: 'popupInfoGrid1Ref',
   popupInfoGrid1: [],
   popupInfoGrid2Ref: 'popupInfoGrid2Ref',
   popupInfoGrid2: [],
   checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
   popupHeaderText3: null,
   popupHeaderText1: null,
   popupHeaderText2: null,
   itemPopup3: false,
   itemPopup1: false,
   itemPopup2: false,
   targetRow: {},
   Stime:''
    }
    
    
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
    popupInfoGridInstance3() {
      return this.GetDataGrid(this.popupInfoGrid3Ref)
    },
    popupInfoGridInstance1() {
      return this.GetDataGrid(this.popupInfoGrid1Ref)
    },
    popupInfoGridInstance2() {
      return this.GetDataGrid(this.popupInfoGrid2Ref)
    }

  },
  watch: {
  
  },

  beforeMount() {
    this.startTime = ''
    this.endTime=''
    

    Promise.all([    
  
   getCmChildCode({comCode: getComCode()}),
    getComCode(),
    ])
      .then( res => {
        this.stopCodeList =res[0].list.filter(x=>x.code =="STOP_CODE")

        this.comCodeList =res[1]
     
      })
      .catch(error => {})
  },
  methods: {
    async popListDbClickEqItem(e) {
      this.popupDataEqItem = e

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'eqCode', this.popupDataEqItem.data.eqCode)
      this.gridMainInstance.cellValue(rowIndex, 'eqName', this.popupDataEqItem.data.eqName)
      this.itemPopup1 = false
    },
    async popListDbClickItem(e) {
      this.popupDataItem = e

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workDecode', this.popupDataItem.data.workDeCode)
      this.gridMainInstance.cellValue(rowIndex, 'workDename', this.popupDataItem.data.workDename)
      this.itemPopup3 = false
    },
    async popListDbClickWorkNo(e) {
      this.popupDataItem = e

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workNo', this.popupDataItem.data.workNo)
      this.itemPopup2 = false
    },
    async editingStart(e) {
      this.gridMainInstance.saveEditData()
      this.targetRow = e
      if (e.column.dataField === 'workDename') {
        e.cancel = true
        if (e.data.workCode === '' || e.data.facCode === '') {
          notify(`${this.$t('requiredCheck')} [${this.$t('facName')}, ${this.$t('workName')}]`, 'error', 1500)
        } else {
          let params = {
            comCode: getComCode(),
            facCode: e.data.facCode,
            workCode: e.data.workCode
          }
          let resData = await getBas0035(params)
          let cnt = 0
          resData.list.forEach(e => {
            e.id = cnt++
          })

          this.itemPopup3 = true
          this.popupInfoGrid3 = [...resData.list]
        }
      }
      if (e.column.dataField === 'eqName') {
        e.cancel = true
        if (e.data.workDecode === '' || e.data.facCode === '') {
          notify(`${this.$t('requiredCheck')} [${this.$t('facName')}, ${this.$t('workDename')}]`, 'error', 1500)
        } else {
          let params = {
            comCode: getComCode(),
            facCode: e.data.facCode,
            workDecode: e.data.workDecode 
          }
          let resData = await getBas0090(params)
          let cnt = 0
          resData.list.forEach(e => {
            e.id = cnt++
          })

          this.itemPopup1 = true
          this.popupInfoGrid1 = [...resData.list]
        }
      }
      if (e.column.dataField === 'workNo') {
        e.cancel = true
        if (e.data.workCode === '' || e.data.workDecode === '' || e.data.facCode === '') {
          notify(`${this.$t('requiredCheck')} [${this.$t('facName')}, ${this.$t('workDename')}, ${this.$t('workNo')}]`, 'error', 1500)
        } else {
          let params = {
            comCode: getComCode(),
            facCode: e.data.facCode,
            workCode: e.data.workCode,
            workDecode: e.data.workDecode 
          }
          let resData = await getPro0021(params)
          let cnt = 0
          resData.list.forEach(e => {
            e.id = cnt++
          })

          this.itemPopup2 = true
          this.popupInfoGrid2 = [...resData.list]
        }
      }
    },


    startEdit(e){
      console.log(e.data)
      this.Stime = e.data.startTime 

    },


 onValueChanged(value,cellInfo){
      cellInfo.setValue(value.value)
      

   this.startdate = this.gridMainInstance.cellValue(cellInfo.rowIndex, 'startTime')
   
   this.enddate = this.gridMainInstance.cellValue(cellInfo.rowIndex, 'endTime')

    
      },

    dateFormat(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
       
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
       

        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        } ,




   setCellValueStart(newData, value){
      
 

      let b =  new Date(this.enddate)

      let a =  new Date(value)

      let c = a.getTime() - b.getTime() ;
     
     this.resultdate = c / (60 * 1000) ;
     
     newData.stopTime = Math.abs(this.resultdate)

     if(isNaN(newData.stopTime) === true){
      newData.stopTime = 0
     }

     if(newData.endTime == null){
      newData.stopTime = 0
     }

     
     
     newData.startTime = this.dateFormat(value)
    
     newData.endTime = null

     },

  
    setCellValueEnd(newData, value){

    
     
      

      
      
      
    
       let b =  new Date(this.startdate)

       let a =  new Date(value)

       let c = a.getTime() - b.getTime() ;
      
      this.resultdate = c / (60 * 1000) ;
      
      newData.stopTime = Math.abs(this.resultdate)

      newData.endTime = this.dateFormat(value)

     if(isNaN(newData.stopTime) === true){
       newData.stopTime = 0
      }


      let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"/\s/]/gi // 특정문자 제거
      
      

      
      if(Number(this.Stime.replace(reg, '') > Number(newData.endTime.replace(reg, '')))){
        console.log(this.Stime,newData.endTime)
        this.vToastify(`비가동 시작 시각보다 작을 수 없습니다.`, 'warn')
        return  newData.endTime = null , newData.stopTime = 0 
      }
 
     
      },

      

 
    



 
    //작업반 삽입
  


   async workInsert() {
      let selectedRows = await this.popupInfoGridInstance3.getSelectedRowsData()

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workDecode', selectedRows[0].workDeCode)
      this.gridMainInstance.cellValue(rowIndex, 'workDename', selectedRows[0].workDename)
      this.itemPopup3 = false
    },

    async eqInsert() {
      let selectedRows = await this.popupInfoGridInstance1.getSelectedRowsData()

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'eqCode', selectedRows[0].eqCode)
      this.gridMainInstance.cellValue(rowIndex, 'eqName', selectedRows[0].eqName)
      this.itemPopup1 = false
    },

    async workNoInsert() {
      let selectedRows = await this.popupInfoGridInstance2.getSelectedRowsData()

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workNo', selectedRows[0].workNo)
      this.itemPopup2 = false
    },
 
    //편집제어
  
    //숫자 포메터
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    // row추가
   async btnAdd() {
    this.startdate = ''
    this.endTime = ''
    
       let params = {
          comCode: getComCode(),
        }
      let AddFacCode = await getFactoryInfoData(params) // facCode
   
       let newRow = {
        id: this.mainGrid.length + 1,
        comCode: getComCode(),
        facCode:AddFacCode.list[0].facCode,
       
        workDate:new Date().toISOString().substr(0, 10),
        __created__: true,
        __modified__: false
      }

      this.gridMainInstance.newRow(newRow)
      await this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', -1)
    },
    
    // 저장버튼
    async btnSave() {
      
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      //유효성 체크
      for (let row of selectedMainRows) {
        console.log('row',!row.facCode)
        if (!row.facCode || !row.eqCode || !row.workCode || !row.workDecode || !row.stopCode || !row.startTime || !row.endTime) {
          console.log('row',row)
          this.vToastify(`${this.$t('requiredCheck')}`, 'warn')
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
          this.gridMainInstance.beginUpdate()

          createPro0070(selectedMainRows, true)
            .then(res => {
              this.doSearhMainGrid(false)
           
              notify(this.$t('save'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
              
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.doSearhMainGrid()
            })
        },
        null,
        true
      )
    },
    //삭제버튼
    async btnDelete() {
      let message = ''
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

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

          delPro0070(selectedMainRows, true)
            .then(res => {
              this.doSearhMainGrid(false)
              notify(this.$t('deleted'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.gridMainInstance.saveEditData()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //검색버튼
    btnSearch() {
      this.doSearhMainGrid()
    },
    //콤보배열셋팅
      async comboListSet() {
       try {
        /*
         * 공장명 콤보박스 설정
         **/
         let facCodeRes = await getFactoryInfoData({ comCode: getComCode() })
        facCodeRes.list.forEach(e => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
          this.searchValue.facCode = this.comboBoxList.facCodeList[0].value

        })
        /*
         * 작업장명 콤보박스 설정
         **/
        let workCodeInfo = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode
        }
   
        let workCodeRes = await getWorkShopInfoData(workCodeInfo)
        workCodeRes.list.forEach(e => {
          this.comboBoxList.workCodeList.push({
            text: e.workName,
            value: e.workCode
          })
        })
        // this.searchValue.workCode = this.comboBoxList.workCodeList[0].value
        /*
         * 작업반명 콤보박스 설정
         **/
       let workDeCodeInfo = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode,
          workCode: this.searchValue.workCode
        }
        let workDeCodeRes = await getWorkPartyInfoData(workDeCodeInfo)
        workDeCodeRes.list.forEach(e => {
          this.comboBoxList.workDecodeList.push({
            text: e.workDename,
            value: e.workDecode
          })
        })
          /*
         * 설비명 콤보박스 설정
         **/
       let eqName = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode,
          whCode: ''
        }
        let eqNameRes = await getFacilityInfoData(eqName)
        eqNameRes.list.forEach(e => {
          this.comboBoxList.eqNameList.push({
            text: e.eqName,
            value: e.eqCode
          })
        })
        this.searchValue.eqName = this.comboBoxList.eqNameList[0].value
        
      } catch (error) {
        notify(error, 'error', 1500)
      }
    
      

      
      },
 async comboChange(target) {
      try {
        //공장
        if (target === 'factory') {
          let params = {
            comCode: getComCode(),
            facCode: this.searchValue.facCode
          }
          let workCodeRes = await getWorkShopInfoData(params)
          workCodeRes.list.forEach(e => {
            this.comboBoxList.workCodeList.push({
              value: e.workCode,
              text: e.workName
            })
          })
        }
        //작업장
        else if (target === 'workCode') {
          if (this.searchValue.workCode === null || this.searchValue.workCode === '') {
            this.disabledState.workDecode = true
            this.searchValue.workDecode = ''
          } else {
            this.disabledState.workDecode = false
          }
        //작업반
          let params = {
            comCode: getComCode(),
            facCode: this.searchValue.facCode,
            workCode: this.searchValue.workCode
          }
          let workDeCodeRes = await getWorkPartyInfoData(params)
          this.comboBoxList.workDecodeList = []
          workDeCodeRes.list.forEach(e => {
            this.comboBoxList.workDecodeList.push({
              value: e.workDecode,
              text: e.workDename
            })
          })
        }
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
 
    //메인그리드 조회
    async doSearhMainGrid(event) {
    this.startdate = ''
    this.endTime = ''

      try {
        let params = {
          comCode: getComCode(),
          facCode: this.searchValue.facCode,
          stopCode:this.stopCodeSelect,
          workCode:this.searchValue.workCode,
          workDecode:this.searchValue.workDecode,
          eqCode:this.eqCodeSelect,
          workDate:this.workDate,

        }
        console.log('param',params)
        this.openLoading()
        let cnt = 0
       
        let resData = await getPro0070(params)
        
        resData.list.forEach(e => {
          e.id = cnt++
        })
        this.mainGrid = resData.list
        this.gridMainInstance.clearSelection()
        this.gridMainInstance.saveEditData()
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)

        this.endLoading()
      }
    },

  },

  mounted() {
    this.comboListSet().then(() => {})
  }
}
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
.btn {
  background-color: #879b77;
  color: white;
}
</style>
