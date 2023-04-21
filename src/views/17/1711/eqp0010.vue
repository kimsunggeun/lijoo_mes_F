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
                  class="required mt-2"
                  v-model="searchComCode"
                  :label="$t('comName')"
                  :items="comCodeList"
                  item-text="text"
                  item-value="value"
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
          <v-tab class="mr-2">{{$t('jobCodetap')}}</v-tab>
          <v-tab-item>
            <i-card-vertical
              headerTitle="jobCodeTitle"
           
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
                        data-field="sysCode"
                        :caption="$t('jobCode')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="sysName"
                        :caption="$t('jsuName')"
                        data-type="string"
                        alignment="center"
                        width="auto"
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
          <v-tab class="mr-2" @click="seachDetail('일상점검')" >{{$t('dailyInspection')}}</v-tab>
          <v-tab class="mr-2" @click="seachDetail('정기점검')" >{{$t('periodicInspection')}}</v-tab>
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
                      @editing-start="onEditingStart"
                    >
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                      <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxColumn 
                        data-field="comCode" 
                        :caption="$t('comCode')" 
                        data-type="string"
                        :allow-editing="false"
                        :visible="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="jobType"
                        :caption="$t('jobsetup')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
                      >
                      <DxLookup :data-source="jobsetupList" display-expr="name" value-expr="code" />
                      </DxColumn>
                      
                      <DxColumn
                      data-field="eqInsType"
                      :caption="$t('eqInspType')"
                      data-type="string"
                      alignment="center"
                      width="auto"
                      :allow-editing="false"
                      >
                                    
                    <DxLookup :data-source="EQINSTYPEList" display-expr="name" value-expr="code" /> 
                      </DxColumn>

                      <DxColumn
                      data-field="eqInsCode"
                      :caption="$t('eqInspCode')"
                      data-type="string"
                      alignment="center"
                      width="auto"
                      css-class="devest-grid-header-require"
                   >
                    <DxLookup :data-source="eqinscodeList" display-expr="name" value-expr="code"/> 
                      </DxColumn>

                      <DxColumn
                        data-field="eqInsName"
                        :caption="$t('eqInspName')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :editor-options="{ maxLength: 50 }"
                     />

                      <DxColumn
                        data-field="jugCode"
                        :caption="$t('jugCodeh')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        
                      >
                      <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code"/>
                      </DxColumn>
                      
                      <DxColumn 
                      data-field="userFlag" 
                      :caption="$t('userFlag')" 
                      data-type="boolean" 
                      alignment="center" 
                      width="auto"
                      edit-cell-template="checkBoxEditor" />

                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                          :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                      </template>
                    
                    
                      <DxColumn data-field="maker" 
                        :caption="$t('maker')" 
                        data-type="string" 
                        alignment="center" 
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="makeDate"
                        :caption="$t('makeDate')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="editor"
                        :caption="$t('editor')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="editDate"
                        :caption="$t('editDate')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
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
                      @editing-start="onEditingStart"
                    >
                      <DxPaging :enabled="false" />
                      <DxSelection show-check-boxes-mode="always" />
                      <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                      <DxColumn 
                      data-field="comCode" 
                      :caption="$t('comCode')" 
                      data-type="string" 
                      :allow-editing="false"
                      width="auto"
                    />
                    <DxColumn
                    data-field="jobType"
                    :caption="$t('jobsetup')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  >
                  <DxLookup :data-source="jobsetupList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                  data-field="eqInsType"
                  :caption="$t('eqInspType')"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  width="auto"
                >
                <DxLookup :data-source="EQINSTYPEList" display-expr="name" value-expr="code" />
                  </DxColumn>


                 <DxColumn
                      data-field="eqInsCode"
                      :caption="$t('eqInspCode')"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      width="auto"
                   >
                    <DxLookup :data-source="eqinscodeList" display-expr="name" value-expr="code" /> 
                      </DxColumn>

                    <DxColumn
                    data-field="eqInsName"
                    :caption="$t('eqInspName')"
                    data-type="string"
                    alignment="center"                    
                    width="auto"
                    :editor-options="{ maxLength: 50 }"
                  >
                
                  </DxColumn>
 
                    <DxColumn
                      data-field="jugCode"
                      :caption="$t('jugCodeh')" 
                      data-type="string"
                      alignment="center"
                      width="auto"
                    >
                    <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code" />
                    </DxColumn>

                    <DxColumn 
                    data-field="userFlag" 
                    :caption="$t('userFlag')" 
                    data-type="boolean" 
                    alignment="center" 
                    width="auto"
                    edit-cell-template="checkBoxEditor" />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    
                  
                    <DxColumn data-field="maker" 
                      :caption="$t('maker')" 
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false"
                      width="auto"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      width="auto"
                    />
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      width="auto"
                    />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      width="auto"
                    />

                    <DxColumn 
                      data-field="" 
                      caption="" 
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false"
                      width="auto"
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
import { getMaingrd,getDetailgrd,deleteEqp0010,createEqp0010} from '@/api/view/eqp0010'
import { getCompany } from '@/api/system/companyManage' // 회사명 조회


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

      checkBoxesMode: 'always',

      focusedRowData:[],

      tapitem:"일상점검",
      tapitem2:"10",

      jugCodehList: [{
              code: '',
              name: ''
            }],
      EQINSTYPEList:[],
      jobsetupList:[],
      eqinscodeList:[],

      comCodeList:[]

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
    const comCodeData = {
      comCode: getComCode()
    }

    getCompany(comCodeData).then(res => {
      res.list.forEach(e => {
        
        this.comCodeList.push({
          value: e.comCode,
          text: e.comName
        })
      })
      this.searchComCode = res.list[0].comCode
    })
  },
  mounted(){
    // this.btnSearch()
    this.comboListSet()
  },

  methods: {
///검색////////
    btnSearch() {
      this.doSearhMainGrid()
      // this.doSearhDetailGrid()
    },
    onEditingStart(e) {
      if(e.column.dataField == 'eqInsCode'){
        if(e.data.__created__ == false){
          e.cancel = true
        }
      }
    },
    seachDetail(e){
       this.cycleInspInfo = []
       this.dailyInspInfo = []
       this.tapitem = e
       this.tapitem2 = e === '일상점검' ? "10":"20"
      
      this.doSearhDetailGrid(this.tapitem)
    },
    
     async doSearhMainGrid() {
      try {
      
        this.openLoading()
        let cnt = 0

        let resData = await getMaingrd()

        resData.list.forEach(e => {
          e.id = cnt++
        })
        this.typeInfo = resData.list
        this.gridMainInstance.saveEditData()

        this.gridMainInstance.option('focusedRowIndex', 0)
        
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        this.endLoading()
      }
    },
     doSearhDetailGrid(){

      let params = {
                comCode: this.searchComCode,
                jobType:this.focusedRowData.sysCode,
                eqInsType:this.tapitem2,
                eqInsCode:'',
              }

      getDetailgrd(params).then(res => {
        let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          
        if(params.eqInsType === '10'){
          this.dailyInspInfoInstance.clearSelection()
          this.dailyInspInfo = res.list
        }
        else{
          this.cycleInspInfoInstance.clearSelection()
          this.cycleInspInfo = res.list
        }

      }).finally(() => {
        this.endLoading()
        
      })
},
  
  // 버튼 추가
  async btnAdd(e) {
    
    if(e == '일상점검'){
      let newRow = {
        id: this.dailyInspInfo.length + 1,
        comCode: this.searchComCode,
        eqInsType:this.tapitem2,
        jobType:this.focusedRowData.sysCode,
        maker : getUserId(),
        userFlag:'Y',
        __created__: true,
        __modified__: false,
      }
      this.dailyInspInfoInstance.newRow(newRow)
      await this.dailyInspInfoInstance.selectRows(newRow.id, true)
      this.dailyInspInfoInstance.option('focusedRowIndex', -1)
      }
    if(e == '정기점검'){
      let newRow = {
        id: this.cycleInspInfo.length + 1,
        comCode: this.searchComCode,
        eqInsType:this.tapitem2,
        jobType:this.focusedRowData.sysCode,
        maker : getUserId(),
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
      if(row.eqInsCode === null || row.eqInsCode ===''|| row.eqInsCode === undefined){
       return this.vToastify('[필수입력]설비 점검 항목 코드', 'warn')
      }
    }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.dailyInspInfoInstance.beginUpdate()

          createEqp0010(selectedMainRows, true)
            .then(res => {
    
              this.doSearhDetailGrid(false)
              
              notify(this.$t('Saved'), 'success', 1500)
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

      for (let row of selectedMainRows) {

        if (row.__created__ !== true) {
          row.__modified__ = true
          row.editor = getUserId()
        }
        if(row.eqInsCode === null || row.eqInsCode ===''|| row.eqInsCode === undefined){
       return this.vToastify('[필수입력]설비 점검 항목 코드', 'warn')
        }
        if(row.eqInsName === null || row.eqInsName ===''|| row.eqInsName === undefined){
        return this.vToastify('[필수입력]설비 점검 명', 'warn')
        }
        }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.cycleInspInfoInstance.beginUpdate()

          createEqp0010(selectedMainRows, true)
            .then(res => {
              this.doSearhDetailGrid(false)
              notify(this.$t('Saved'), 'success', 1500)
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

          deleteEqp0010(selectedMainRows, true)
            .then(res => {
              this.doSearhMainGrid(false)
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

          deleteEqp0010(selectedMainRows, true)
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
    this.gridDataSource2 = []
    this.gridDataSource3 = []
    
   this.focusedRowData = e.row && e.row.data
   
   this.doSearhDetailGrid()
    },





  async comboListSet() {
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
          .filter(word => word.code === 'JOB_TYPE' && word.userFlag ==='Y')
          .forEach(e => {
     
            this.jobsetupList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })


        res.list
          .filter(word => word.code === 'EQ_INS_CODE' && word.userFlag ==='Y')
          .forEach(e => {
            console.log(e)
            this.eqinscodeList.push({
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




