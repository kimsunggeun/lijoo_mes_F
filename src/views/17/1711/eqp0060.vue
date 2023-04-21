<!--공장정보-->
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <i-card-top class="d-md-flex" 
     :useBtnList="['btnSearch']" 
       @btnSearch="btnSearch()"
      >
      <template v-slot:body>
        <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-value="facCode"
                    item-text="facName"
                    :items="facCodeList"
                    v-model="searchFacCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facName')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-layout>
      </template>
    </i-card-top>
    <v-row no-gutters>
      <v-col cols="3" class="pa-2">
            <i-card-vertical
              headerTitle="equipmentTypeheaderTitle"
              
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="typeInfo"
                      class="listBox"
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
                      column-resizing-mode="widget"
                      @focused-row-changed="onFocusedRowChanged"
                    >
                      <DxPaging :enabled="false" />
                      <DxSelection mode="single" :allow-select-all="false" />
                      <DxScrolling column-rendering-mode="virtual" />
                      
                      <DxColumn
                        data-field="eqCode"
                        :caption="$t('eqCode')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="eqName"
                        :caption="$t('eqName')"
                        data-type="string"
                        alignment="center"
                        width="auto"
                        :allow-editing="false"
                      />
                      <DxColumn/>

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
      </v-col>

      <v-col cols="9" class="pa-2">
            <i-card-vertical
              headerTitle = "repairDetailReg"
              :useBtnList="[
                'btnAdd', //신규
                'btnSave', //저장
                'btnDelete', //삭제
              ]"
              @btnAdd="btnAdd()"
              @btnSave="btnSave()"
              @btnDelete="btnDelete()"
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="dailyInspInfo"
                      class="listBox"
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
                      column-resizing-mode="widget"
                      parent-id-expr="comCode"
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
                        :visible="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="eqCode"
                        :caption="$t('eqCode')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="repNo"
                        :caption="$t('repNo')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        width="auto"
                      />
                      <DxColumn
                        data-field="regDate"
                        :caption="$t('repDetailRegDate')"
                        data-type="date"
                        format="yyyy-MM-dd"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="occDate"
                        :caption="$t('occDate')"
                        data-type="date"
                        format="yyyy-MM-dd"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="actDate"
                        :caption="$t('actDate')"
                        data-type="date"
                        format="yyyy-MM-dd"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="repRemark"
                        :caption="$t('repRemark')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="repCust"
                        :caption="$t('repCust')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="worker"
                        :caption="$t('worker')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="repAmount"
                        :caption="$t('repAmount')"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                        width="auto"
                      />
                      <DxColumn
                        data-field="remark"
                        :caption="$t('remark')"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        width="500px"
                      />
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
import { getFacilityItem, createEqp0050, deleteEqp0050} from '@/api/view/eqp0060'
import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드
import { getFacilityInfoData } from '@/api/view/bas0036' // 설비정보(메인그리드)


export default {
  name: 'eqp0050',
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

      dailyInspInfoRef: 'dailyInspInfoRef', //수리내역등록

      checkBoxesMode: 'always',

      focusedRowData:[],
      searchFacCode: '',

      jugCodehList: [],
      EQINSTYPEList:[],
      jobsetupList:[],

      //공통코드 콤보박스리스트
      facCodeList: [],
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

    getFactoryInfoData({ comCode: getComCode() })
      .then(res => {
        res.list.forEach(e => {
          this.facCodeList.push({
            facCode: e.facCode,
            facName: e.facName
          })
        })
      })
      .finally(() => {
        this.searchFacCode = this.facCodeList[0].facCode
      })
  },

  methods: {
///검색////////
     btnSearch() {
      this.doSearhMainGrid()
      this.doSearhDetailGrid()
    },
    
     async doSearhMainGrid() {
      try {

        let params = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
      }
      
        this.openLoading()
        let cnt = 0

        let resData = await getFacilityInfoData(params)
     
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

    async doSearhDetailGrid() {
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.focusedRowData.facCode,
          eqCode: this.focusedRowData.eqCode,
        }
      
        this.openLoading()
        let cnt = 0

        let resData = await getFacilityItem(params)
        resData.list.forEach(e => {
          e.id = cnt++
        })
        this.dailyInspInfo = resData.list
        this.dailyInspInfoInstance.clearSelection()
        this.gridMainInstance.saveEditData()

        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        
        this.endLoading()
      }
    },

  // 버튼 추가
  async btnAdd() {
       let newRow = {
        id: this.dailyInspInfo.length + 1,
        comCode: getComCode(),
        facCode: this.focusedRowData.facCode,
        eqCode: this.focusedRowData.eqCode,
        __created__: true,
        __modified__: false
      }
      
      this.dailyInspInfoInstance.newRow(newRow)
      await this.dailyInspInfoInstance.selectRows(newRow.id, true)
      this.dailyInspInfoInstance.option('focusedRowIndex', -1)
    },

  //저장
 async btnSave() {
  let test = 0;
      await this.dailyInspInfoInstance.saveEditData()
      this.dailyInspInfoInstance.saveEditData()
        var selectedMainRows = await this.dailyInspInfoInstance.getSelectedRowsData()
        let messageGubun = ''
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

      //유효성 체크
      for (let row of selectedMainRows) {
        if(row.actDate <= row.occDate){
          this.vToastify('조치일이 발생일보다 클 수 없습니다.', 'warn')
          return
        }

        if (row.__created__ !== true) {
          row.__modified__ = true
          row.editor = getUserId()
        }
        // if (row.regDate !== null){
        //   row.regDate = '2022-02-02'
        // }
      }

      var a = selectedMainRows[0]

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.dailyInspInfoInstance.beginUpdate()
          selectedMainRows.forEach(e => {
          })
          createEqp0050(selectedMainRows, true)
            .then(res => {
              this.doSearhDetailGrid(false)
          
              notify(this.$t('Saved'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
   
            })
            .finally(() => {
              this.dailyInspInfoInstance.endUpdate()
              this.doSearhDetailGrid()
              this.endLoading()
            })
        },
        null,
        true
      )

    },


  //삭제
async btnDelete() {
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
          deleteEqp0050(selectedMainRows, true)
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
     
    },


//포커스 이벤트
 onFocusedRowChanged(e) {
   this.focusedRowData = e.row && e.row.data
   this.cycleInspInfo = []
   this.dailyInspInfo = []
   this.doSearhDetailGrid()
  },

  },
}
</script>
<style lang="less" scoped>
.uploadedImage {
  height: 50px;
}
</style>




