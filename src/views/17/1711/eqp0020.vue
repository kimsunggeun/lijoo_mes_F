<!--공장정보-->
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <i-card-top class="d-md-flex" 
     :useBtnList="['btnSearch']" 
       @btnSearch="btnSearch()"
      >

      <template v-slot:body>
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
        </v-row>
      </template>
    </i-card-top>
    <v-row no-gutters>
      <v-col cols="3" class="pa-2">
         
         
        <v-tabs>
          <v-tab class="mr-2">{{$t('equipmentType')}}</v-tab>
          <v-tab-item>
            <i-card-vertical
              headerTitle="equipmentTypeheaderTitle"
           
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="typeInfo"
                      class="listBox06"
                      :ref="typeInfoRef"
                      :data-source="typeInfo"
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
                      @focused-row-changed="onFocusedRowChanged"
                    >
                      <DxPaging :enabled="false" />
                      <DxSelection mode="single" :allow-select-all="false" />
                      <DxScrolling column-rendering-mode="virtual" />

                      <DxColumn
                        data-field="eqCode"
                        :caption="$t('eqCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                       
                        
                      />
                      <DxColumn
                        data-field="eqName"
                        :caption="$t('eqName')"
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
                      
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <v-col cols="9" class="pa-2">
        <v-tabs>
          <!-- <v-tab class="mr-2" @click="seachDetail('일상점검')" >{{$t('dailyInspection')}}</v-tab>
          <v-tab class="mr-2" @click="seachDetail('정기점검')" >{{$t('periodicInspection')}}</v-tab> -->
          <v-tab class="mr-2" @click="tapitem2='10', doSearhDetailGrid()">{{$t('dailyInspection')}}</v-tab>
          <v-tab class="mr-2" @click="tapitem2='20', doSearhDetailGrid()">{{$t('periodicInspection')}}</v-tab>
          
          <!-------------------------------------------------------------------------------공정 정보------------------------------------------------------------------------------------------>
          <v-tab-item>
            <i-card-vertical
              headerTitle="checkListheaderTitle"
              :useBtnList="[
                'btnAdd', //신규
                'btnSave', //저장
                'btnDelete', //삭제
              ]"
              @btnAdd="btnAdd('일상점검')"
              @btnSave="btnSave('일상점검')"
              @btnDelete="btnDelete('일상점검')"
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="dailyInspInfo"
                      class="listBox06"
                      :ref="dailyInspInfoRef"
                      :data-source="dailyInspInfo"
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
                      parent-id-expr="comCode"
                      @editor-preparing="onEditorPreparing"
                    >
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                      <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <!-- <DxColumn 
                        data-field="comCode" 
                        :caption="$t('comCode')" 
                        width="auto" 
                        data-type="string" 
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      /> -->
                    
                      <DxColumn
                      data-field="eqInsType"
                      :caption="$t('eqInspType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :set-cell-value="(newData, value) => {
                        newData.eqInsType = value
                        newData.eqInsCode = value
                      }"
                      :allow-editing="false"
                     
                    >
                    <DxLookup :data-source="EQINSTYPEList" display-expr="name" value-expr="code" />
                      </DxColumn>

                      <!-- <DxColumn
                      data-field="eqCode"
                      :caption="$t('eqCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      
                    >
                    <DxLookup :data-source="eqCodeList" display-expr="eqName" value-expr="eqCode" />
                      </DxColumn> -->
                 
                 

                      <DxColumn
                        data-field="eqInspNo"
                        :caption="$t('eqInspNo')"
                        width="auto"
                        data-type="number"
                        alignment="right"
                        format="#,###"
                       css-class="devest-grid-header-require"
                       :editor-options="{ max: 9999999999 }"
                     />
                     
                
                    
                      <DxColumn
                        data-field="eqInsCode"
                        :caption="$t('eqInspCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :visible="false"
                        :allow-editing="false"
                      
                       
                      >
                      </DxColumn>

                      <DxColumn
                      data-field="insType"
                      :caption="$t('insType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                   >
                      <DxLookup :data-source="insTypeList" display-expr="name" value-expr="code" />
                      </DxColumn>


                      <DxColumn
                      data-field="insMeth"
                      :caption="$t('insMeth')"
                      width="auto"
                      data-type="string"
                      alignment="center"     
                   >
                   <DxLookup :data-source="insMethList" display-expr="name" value-expr="code" />
                      </DxColumn>


                      <DxColumn
                      data-field="jugCode"
                      :caption="$t('jugCodeh')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :set-cell-value="(newData, value) => {
                        newData.jugCode = value
                        newData.insBase = null
                        newData.insUpp = null
                        newData.insLow = null
                      }"
                     >
                   <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code" />
          
                      </DxColumn>
                      <DxColumn
                      data-field="insUnit"
                      :caption="$t('insUnit')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                   >
                   <DxLookup :data-source="insUnitList" display-expr="name" value-expr="code" />
                      </DxColumn>
                      <DxColumn
                      data-field="insBase"
                      :caption="$t('insBase')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                     :editor-options="{ maxLength: 20 }"
                   />
                      <DxColumn
                      data-field="insUpp"
                      :caption="$t('insUpp')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                     :editor-options="{ maxLength: 10 }"
                   />
                      <DxColumn
                      data-field="insLow"
                      :caption="$t('insLow')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                     :editor-options="{ maxLength: 10 }"
                   />
                      <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="string"
                      alignment="left"
                     :editor-options="{ maxLength: 255 }"
                   />

                      <DxColumn 
                    data-field="userFlag" 
                    :caption="$t('userFlag')" 
                    width="auto" 
                    data-type="boolean" 
                    alignment="center" 
                    edit-cell-template="checkBoxEditor" />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    
                    
                      <DxColumn data-field="maker" 
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
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-tab-item>
          <!---------------------------------------------------------------------정기점검------------------------------------------------------------------------------------------>
          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="checkListheaderTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
              @btnAdd="btnAdd('정기점검')"
              @btnSave="btnSave('정기점검')"
              @btnDelete="btnDelete('정기점검')"
              >
                <template v-slot:body>
                  <v-layout column>
                    <DxDataGrid
                      id="cycleInspInfo"
                      class="listBox06"
                      :ref="cycleInspInfoRef"
                      :data-source="cycleInspInfo"
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
                      @editor-preparing="onEditorPreparing"
                    >
                      <DxPaging :enabled="false" />
                      <DxSelection show-check-boxes-mode="always" />
                      <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                      <!-- <DxColumn 
                        data-field="comCode" 
                        :caption="$t('comCode')" 
                        width="auto" 
                        data-type="string" 
                        :allow-editing="false"
                        
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      /> -->
                    
                      <DxColumn
                      data-field="eqInsType"
                      :caption="$t('eqInspType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :set-cell-value="(newData, value) => {
                        newData.eqInsType = value
                        newData.eqInsCode = value
                      }"
                      :allow-editing="false"
                     
                    >
                    <DxLookup :data-source="EQINSTYPEList" display-expr="name" value-expr="code" />
                      </DxColumn>

                      <!-- <DxColumn
                      data-field="eqCode"
                      :caption="$t('eqCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                    <DxLookup :data-source="eqCodeList" display-expr="eqName" value-expr="eqCode" />
                      </DxColumn> -->
                 
                 

                      <DxColumn
                        data-field="eqInspNo"
                        :caption="$t('eqInspNo')"
                        width="auto"
                        data-type="number"
                        alignment="right"
                        format="#,###"
                       css-class="devest-grid-header-require"
                       :editor-options="{ max: 9999999999 }"
                     />
                     
                
                    
                      <DxColumn
                        data-field="eqInsCode"
                        :caption="$t('eqInspCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :visible="false"
                        :allow-editing="false"
                       
                      >
                      </DxColumn>

                      <DxColumn
                      data-field="insType"
                      :caption="$t('insType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                   >
                      <DxLookup :data-source="insTypeList" display-expr="name" value-expr="code" />
                      </DxColumn>


                      <DxColumn
                      data-field="insMeth"
                      :caption="$t('insMeth')"
                      width="auto"
                      data-type="string"
                      alignment="center"     
                   >
                   <DxLookup :data-source="insMethList" display-expr="name" value-expr="code" />
                      </DxColumn>


                      <DxColumn
                      data-field="jugCode"
                      :caption="$t('jugCodeh')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :set-cell-value="(newData, value) => {
                        newData.jugCode = value
                        newData.insBase = null
                        newData.insUpp = null
                        newData.insLow = null
                      }"
                     >
                   <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code" />
          
                      </DxColumn>
                      <DxColumn
                      data-field="insUnit"
                      :caption="$t('insUnit')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                   >
                   <DxLookup :data-source="insUnitList" display-expr="name" value-expr="code" />
                      </DxColumn>
                      <DxColumn
                      data-field="insBase"
                      :caption="$t('insBase')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                     :editor-options="{ maxLength: 20 }"
                   />
                      <DxColumn
                      data-field="insUpp"
                      :caption="$t('insUpp')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                     :editor-options="{ maxLength: 10 }"
                   />
                      <DxColumn
                      data-field="insLow"
                      :caption="$t('insLow')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                     :editor-options="{ maxLength: 10 }"
                   />
                      <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="string"
                      alignment="left"
                     :editor-options="{ maxLength: 255 }"
                   />

                      <DxColumn 
                    data-field="userFlag" 
                    :caption="$t('userFlag')" 
                    width="auto" 
                    data-type="boolean" 
                    alignment="center" 
                    edit-cell-template="checkBoxEditor" />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    
                    
                      <DxColumn data-field="maker" 
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
                      
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import 'devextreme/data/odata/store'
import notify from 'devextreme/ui/notify' // message
import themes from 'devextreme/ui/themes'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getUserId, getComCode } from '@/utils/token'
import { getEqp0020grd,createEqp0020,deleteEqp0020} from '@/api/view/eqp0020'
import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드
import { getFacilityInfoData } from '@/api/view/bas0036' // 설비정보(메인그리드)


export default {
  name: 'eqp0020',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
  },
  data() {
    return {
      typeInfo: [],

      dailyInspInfo: [],

      cycleInspInfo: [],

      inspMethodList: [],

      typeInfoRef: 'typeInfoRef', //설비타입

      dailyInspInfoRef: 'dailyInspInfoRef', //일상점검

      cycleInspInfoRef: 'cycleInspInfoRef', //정기점검

      checkBoxesMode: 'always',//themes.current().startsWith('material') ? 'always' : 'onClick',

      focusedRowData:[],

      tapitem:"일상점검",
      tapitem2:"10",


      jugCodehList: [{ code: '', name: '' }],
      EQINSTYPEList:[],
      insTypeList:[{ code: '', name: '' }],
      insMethList:[{ code: '', name: '' }],
      insUnitList:[{ code: '', name: '' }],
      eqCodeList:[{ code: '', name: '' }],
      
      facCodeparms: '',
      factoryList: []
    }
  },

   computed: {
    //설비타입
    gridMainInstance() {
      return this.GetDataGrid(this.typeInfoRef)
    },
    //일상점검
    dailyInspInfoInstance() {
      return this.GetDataGrid(this.dailyInspInfoRef)
    }, 
    //정기점검
    cycleInspInfoInstance() {
      return this.GetDataGrid(this.cycleInspInfoRef)
    }

  },
  beforeCreate() {

  },

  created() {

  },
  mounted(){
    // this.btnSearch()
    this.comboListSet()
  },

  methods: {

      //이벤트
      onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'insBase':
            
            e.editorOptions.readOnly = e.row.data.jugCode == '10'
            break;
          case 'insUpp':
            e.editorOptions.readOnly = e.row.data.jugCode == '10'
            break;
          case 'insLow':
            e.editorOptions.readOnly = e.row.data.jugCode == '10'
            break;

      
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },







///검색////////
     async btnSearch() {
      
      await this.doSearhMainGrid()
      // await this.doSearhDetailGrid()
    },

    seachDetail(e){
       this.cycleInspInfo = []
        this.dailyInspInfo = []
      
        this.tapitem = e

        this.tapitem2 = e === '일상점검' ? "10":"20"
     
      
      this.doSearhDetailGrid()
    },
    
     async doSearhMainGrid() {

      try {
        let facParm ={
          comCode: getComCode()
        }

        let facCode = await getFactoryInfoData(facParm)
       

        let params = {
        comCode: getComCode(),
        facCode: this.facCodeparms
        // facCode:facCode.list[0].facCode,
        // facName:facCode.list[0].facName,
      }

      // console.log('params', params)
      
        this.openLoading()
        let cnt = 0

        let resData = await getFacilityInfoData(params)
        resData.list.forEach(e => {
          e.id = cnt++
        })



        this.typeInfo = resData.list
        this.eqCodeList = resData.list
        
        this.gridMainInstance.saveEditData()
        this.gridMainInstance.option('focusedRowIndex', 0)
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        
        this.endLoading()
      }
    },

    async doSearhDetailGrid() {
      try {
        this.dailyInspInfo = []
        this.cycleInspInfo = []

        if(this.typeInfo.length < 1 || !this.focusedRowData) {
          return
        }
        
        let params = {
          comCode: getComCode(),
          facCode: this.focusedRowData.facCode,
          eqInsType: this.tapitem2,
          eqCode: this.focusedRowData.eqCode,
          eqInspNo: '',
          eqInsCode:'',
        }
      
      
        this.openLoading()
        let cnt = 0
    
        let resData = await getEqp0020grd(params)
 
        resData.list.forEach(e => {
          e.id = cnt++
        })
        
        if(params.eqInsType === "10"){
          this.dailyInspInfoInstance.clearSelection()
          this.dailyInspInfo = resData.list
        }
        else{
          this.cycleInspInfoInstance.clearSelection()
          this.cycleInspInfo = resData.list
        }

        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        
        this.endLoading()
      }
    },



  // 버튼 추가
  async btnAdd(e) {
    let facParm ={
          comCode: getComCode()
        }

    let AddFacCode = await getFactoryInfoData(facParm)


    if(e == '일상점검'){
    
      let newRow = {
        id: this.dailyInspInfo.length + 1,
        comCode: getComCode(),
        facCode:AddFacCode.list[0].facCode,
        eqInsType:this.tapitem2,
        eqCode:this.focusedRowData.eqCode,
        eqInsCode:this.tapitem2,
        userFlag:'Y',
        __created__: true,
        __modified__: false
      }
      
      this.dailyInspInfoInstance.newRow(newRow)
      await this.dailyInspInfoInstance.selectRows(newRow.id, true)
      this.dailyInspInfoInstance.option('focusedRowIndex', -1)
      }
    if(e == '정기점검'){
      let newRow = {
        id: this.cycleInspInfo.length + 1,
        comCode: getComCode(),
        facCode:AddFacCode.list[0].facCode,
        eqInsType:this.tapitem2,
        eqCode:this.focusedRowData.eqCode,
        eqInsCode:this.tapitem2,
        userFlag:'Y',
        __created__: true,
        __modified__: false
      }
      this.cycleInspInfoInstance.newRow(newRow)
      await this.cycleInspInfoInstance.selectRows(newRow.id, true)
      this.cycleInspInfoInstance.option('focusedRowIndex', -1)
      }


    },

  //저장
 async btnSave(e) {


   
   if(e == '일상점검'){

    await this.dailyInspInfoInstance.saveEditData()
    
      let selectedMainRows = await this.dailyInspInfoInstance.getSelectedRowsData()
     
      if (selectedMainRows.length <= 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
       

      //유효성 체크
      for (let row of selectedMainRows) {
        if (row.__created__ !== true) {
          row.__modified__ = true
          row.editor = getUserId()
        }
        if(row.eqInspNo === '' || row.eqInspNo === null || row.eqInspNo === undefined){
          return  this.vToastify('[필수입력]검사순서', 'warn')
        }

        if(row.__created__ === true){
         let a= this.dailyInspInfo.filter(x=>x.eqInspNo === row.eqInspNo)
          if(a.length >=2 ){
            return  this.vToastify('검사순서는 중복될수 없습니다.', 'warn')
          }
        }

        
      }
      
    
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.dailyInspInfoInstance.beginUpdate()

          createEqp0020(selectedMainRows, true)
            .then(res => {
       
                  this.doSearhDetailGrid(false)
                  notify('Saved', 'success', 3000)
             
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.dailyInspInfoInstance.endUpdate()
  
            })
        },
        null,
        true
      )
    }
   

    if(e == '정기점검'){
      await this.cycleInspInfoInstance.saveEditData()
      let selectedMainRows = await this.cycleInspInfoInstance.getSelectedRowsData()
      if (selectedMainRows.length <= 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
       

      //유효성 체크
      for (let row of selectedMainRows) {
        if (row.__created__ !== true) {
          row.__modified__ = true
          row.editor = getUserId()
        }
        if(row.eqInspNo === '' || row.eqInspNo === null || row.eqInspNo === undefined){
          return  this.vToastify('[필수입력]검사순서', 'warn')
        }

        if(row.__created__ === true){
         let a= this.dailyInspInfo.filter(x=>x.eqInspNo === row.eqInspNo)
          if(a.length >=2 ){
            return  this.vToastify('검사순서는 중복될수 없습니다.', 'warn')
          }
        }

        
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.cycleInspInfoInstance.beginUpdate()

          createEqp0020(selectedMainRows, true)
            .then(res => {
              this.doSearhDetailGrid(false)
              notify(this.$t('save'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.cycleInspInfoInstance.endUpdate()
       
            })
        },
        null,
        true
      )
    }



    },


  //삭제

async btnDelete(e) {
    if(e == '일상점검'){
      await this.dailyInspInfoInstance.saveEditData()
      let selectedMainRows = await this.dailyInspInfoInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.dailyInspInfoInstance.beginUpdate()

          deleteEqp0020(selectedMainRows, true)
            .then(res => {
              // console.log(selectedMainRows)
              // this.doSearhMainGrid(false)
              notify(this.$t('deleted'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.dailyInspInfoInstance.endUpdate()
              this.dailyInspInfoInstance.saveEditData()
              this.endLoading()
              this.doSearhDetailGrid()
            })
        },
        null,
        true
      )
    }
    if(e == '정기점검'){
      await this.cycleInspInfoInstance.saveEditData()
      let selectedMainRows = await this.cycleInspInfoInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.cycleInspInfoInstance.beginUpdate()

          deleteEqp0020(selectedMainRows, true)
            .then(res => {
              this.doSearhDetailGrid(false)
              notify(this.$t('deleted'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.cycleInspInfoInstance.endUpdate()
              this.cycleInspInfoInstance.saveEditData()
              this.endLoading()
              this.doSearhDetailGrid()
            })
        },
        null,
        true
      )
    }
     
    },


//포커스 이벤트
 onFocusedRowChanged(e) {
    // console.log('onFocusedRowChanged', e)
   this.focusedRowData = e.row && e.row.data
   this.doSearhDetailGrid()

    },





  async comboListSet() {
    let facParm ={
      comCode: getComCode()
    }

    let facCode = await getFactoryInfoData(facParm)
    //공장코드
    this.factoryList = facCode.list
    this.facCodeparms = facCode.list[0].facCode

      let params = {
        comCode: getComCode(),
        code: ''
      }
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'EQ_INS_TYPE')
          .forEach(e => {

            this.EQINSTYPEList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'INS_TYPE' && word.userFlag ==='Y')
          .forEach(e => {
            this.insTypeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'INS_METH' && word.userFlag ==='Y')
          .forEach(e => {
            this.insMethList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'INS_UNIT' && word.userFlag ==='Y')
          .forEach(e => {
            this.insUnitList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      
       
      })
    },

  },
}
</script>
<style lang="less" scoped>
.uploadedImage {
  height: 50px;
}
</style>




