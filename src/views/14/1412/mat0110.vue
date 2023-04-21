<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top 
          class="d-md-flex" 
          outlined 
          :useBtnList="['btnSearch']" 
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2" md="2" class="mr-2">
                  <v-autocomplete 
                    :menu-props="{ offsetY: true }" 
                    color="primary" 
                    v-model="searchFacCode"
                    :label="$t('facName')" 
                    :items="facCodeList"
                    item-text="text"
                    item-value="value" 
                    :prepend-inner-icon="$t('$search')"                    
                    dense 
                    outlined
                    @change="updateFacCode"
                  />
                </v-col>
                <v-col cols="2" md="2" class="mr-2">
                  <v-autocomplete 
                    :menu-props="{ offsetY: true }" 
                    color="primary" 
                    v-model="searchLocCode"
                    :label="$t('locName')"
                    :items="locCodeList"
                    item-text="text"
                    item-value="value" 
                    :prepend-inner-icon="$t('$search')"  
                    dense 
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2" md="2" class="mr-2">
                  <v-autocomplete 
                    :menu-props="{ offsetY: true }" 
                    color="primary" 
                    v-model="searchItemType"
                    label="품목군" 
                    :items="itemTypeList"
                    item-text="text"
                    item-value="value" 
                    :prepend-inner-icon="$t('$search')"  
                    dense 
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2" md="2" class="mr-2">
                  <v-autocomplete 
                    :menu-props="{ offsetY: true }" 
                    color="primary" 
                    v-model="searchPartType"
                    label="제품군" 
                    :items="partTypeList"
                    item-text="text"
                    item-value="value" 
                    :prepend-inner-icon="$t('$search')"                    
                    dense 
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2" md="2" class="mr-2">
                  <v-text-field 
                    color="primary" 
                    :label="$t('partNo')"
                    v-model="partNoInput" 
                    :prepend-inner-icon="$t('$search')"                     
                    dense 
                    outlined
                    clearable
                    @keydown.enter="btnSearch()"
                  />
                </v-col>                              
                <v-row no-gutters>
                  <v-col cols="2" class="mr-2">
                    <v-file-input 
                      :label="$t('fileUpload')"
                      class="mt-2 pl"
                      outlined
                      dense
                      clearable
                      type="file"
                      style="border-radius:5px"
                      @change="inputfile"
                      :accept="fileAccept"
                    />
                  </v-col>
                  <v-col cols="auto" class="pa-2 pt-0 pl-0 pb-0">
                    <v-btn
                      outlined
                      width="150px"
                      height="30px"
                      class="mt-2 btn2"
                      ref="cancelBtn"
                      @click="btnExcelUpload()"
                    >
                    <v-icon>$upload</v-icon>        
                    엑셀 업로드
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" class="pa-2 pt-0 pl-0 pb-0">
                    <v-btn
                      outlined
                      width="150px"
                      height="30px"
                      class="mt-2 btn"
                      ref="cancelBtn"
                      @click="btnExcelDownload()"
                    >
                    <v-icon>$excel</v-icon>
                    엑셀 다운로드
                    </v-btn>
                  </v-col>
                </v-row>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2">
        <i-card-vertical 
          headerTitle="재고실사등록" 
          :useBtnList="['btnConfirm', 'btnEditCancel']" 
          @btnConfirm="btnRegistConfirm()" 
          @btnEditCancel="btnRegistCancel()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <!-- <v-col cols="12" class="pa-0"> -->
                <DxDataGrid 
                  id="manualRegistGrid" 
                  class="listBox03" 
                  :ref="manualRegistGridRef" 
                  :data-source="manualRegistGrid"
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
                  :disablePagination="true" 
                  :column-hiding-enabled="false"
                  @cellClick="itemRowClickRegistGrid"
                >
                  <DxSelection 
                    select-all-mode="allMode"
                    show-check-boxes-mode="always" 
                    mode="multiple" 
                  />
                  <DxScrolling 
                    column-rendering-mode="virtual"
                  />
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />                      
                  <DxColumn 
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="facCode" 
                    :caption="$t('facCode')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="locCode" 
                    :caption="$t('locCode')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    :visible="false" 
                  />                      
                  <DxColumn 
                    data-field="locName" 
                    :caption="$t('locName')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false"  
                  />
                  <DxColumn 
                    data-field="itemType" 
                    :caption="$t('itemType')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="partType" 
                    :caption="$t('partType')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false"  
                  />                                                                
                  <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="left" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="lotNo" 
                    :caption="$t('lotNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="lotDetail" 
                    :caption="$t('lotDetail')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="regiDate" 
                    :caption="$t('regiDate')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="regiNo" 
                    :caption="$t('regiNo')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="stockQty" 
                    :caption="$t('stockQty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="right"
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="realQty" 
                    :caption="$t('realQty')" 
                    width="auto" 
                    data-type="string" 
                    alignment="right" 
                    :set-cell-value="setRealQty"
                  />
                  <DxColumn 
                    data-field="realState" 
                    :caption="$t('realState')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="stockType" 
                    :caption="$t('stockType')"
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="regiType" 
                    :caption="$t('regiType')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="printType" 
                    :caption="$t('printType')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="userFlag" 
                    :caption="$t('userFlag')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="remark" 
                    :caption="$t('remark')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <DxColumn 
                    data-field="makeDate" 
                    :caption="$t('makeDate')" 
                    width="auto" 
                    data-type="date" 
                    format="yyyy-MM-dd" 
                    alignment="center" 
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="maker" 
                    :caption="$t('maker')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn 
                    data-field="editDate" 
                    :caption="$t('editDate')" 
                    width="auto" 
                    data-type="date" 
                    format="yyyy-MM-dd" 
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
                  <DxColumn/>
                  <DxPaging :enabled="false"/>
                  <DxPager :show-page-size-selector="false"/>
                </DxDataGrid>
              <!-- </v-col> -->
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ICardVertical from '@/components/common/iCardVertical.vue'
  import ICardTop from '@/components/common/iCardTop.vue'

  import { DxDataGrid, DxColumn, DxScrolling, DxPager, DxSelection } from 'devextreme-vue/data-grid'
  import DxDateBox from 'devextreme-vue/date-box'
  
  import baseview from '@/components/base/baseview.vue' // base page 추가
  import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

  import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
  import { getUserId, getComCode } from '@/utils/token'
  import { getFacInfo } from '@/api/system/userManage'
  import { getWarehouseLocInfoData } from '@/api/view/bas0033'
  import { getBas0011Detail } from '@/api/view/bas0011'
  import { getMat0110, insertMat0110 } from '@/api/view/mat0017'

  import * as XLSX from 'xlsx'
  import notify from 'devextreme/ui/notify'

  export default {
    name: 'mat0110',
    mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
    components: {
      ICardVertical,
      DxDataGrid,
      DxColumn,
      DxScrolling,
      DxPager,
      DxSelection,
    },

    data() {
      return {
        //조회 조건
        searchFacCode: '',
        searchLocCode: '',
        searchItemType: '',
        searchPartType: '',
        partNoInput: '',

        //조회 리스트
        facCodeList: [],
        locCodeList: [],
        itemTypeList: [],
        partTypeList: [],

        //그리드리스트
        manualRegistGrid: [],
        manualRegistGridRef: 'manualRegistGridRef',
        excelRegistGrid:[],
        excelRegistGridRef:'excelRegistGridRef',

        registGridClickData: null,
        excelFileData:[],

        fileAccept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    },

    created() {
      const searchCode = {
        comCode: getComCode(),
        facCode: null,
        whCode: null,
        workCode: null,
        pathCode: null
      }

      //공장명 조회조건 리스트 가져오기
      getFacInfo(searchCode).then(res => {
        res.list.forEach((item, i) => {
          this.facCodeList.push({
            value: item.facCode,
            text: item.facName
          })
        })
        this.searchFacCode = res.list[0].facCode
        //창고위치명 조회조건 리스트 가져오기
        searchCode.facCode = this.searchFacCode
        getWarehouseLocInfoData(searchCode).then(res => {
          res.list.forEach((item, i) => {
            this.locCodeList.push({
              value: item.locCode,
              text: item.locName
            })
          })
        })
      })

      //품목군, 제품군 조회조건 리스트 가져오기
      const itemType = {
        comCode: searchCode.comCode,
        codegr: 'COM',
        code: 'ITEM_TYPE'
      }
      const partType = {
        comCode: searchCode.comCode,
        codegr: 'COM',
        code: 'PART_TYPE'        
      }

      Promise.all([getBas0011Detail(itemType), getBas0011Detail(partType)])
        .then(res => {
          res[0].list.forEach(item => {
            this.itemTypeList.push({
              value: item.sysCode,
              text: item.sysName
            })
          })
          res[1].list.forEach(item => {
            this.partTypeList.push({
              value: item.sysCode,
              text: item.sysName
            })
          })
        })
    },

    computed: {
      gridManualRegistInstance() {
        return this.GetDataGrid(this.manualRegistGridRef)
      },
    },

    mounted() {

    },

    methods: {
      updateFacCode() {
        let searchCode = {
          comCode: getComCode(),
          facCode: this.searchFacCode,
          whCode: null,
          workCode: null,
          pathCode: null
        }
        //창고위치명 조회조건 리스트 가져오기
        getWarehouseLocInfoData(searchCode).then(res => {
          res.list.forEach((item, i) => {
            this.locCodeList.push({
              value: item.locCode,
              text: item.locName
            })
          })
        })
      },

      btnSearch() {
        this.doSearchMainList()
      },

      btnRegistConfirm() {
        this.vToastifyPrompt(
          '편집한 내용을 확정 하시겠습니까?',
          'info',
          current => {
            this.doRegistConfirm()
          },
          null,
          true
        )        
      },

      btnRegistCancel() {
        this.doRegistCancel()
      },

      itemRowClickRegistGrid(e) {
        if (e.rowIndex !== -1) {
          if (e.data) {
            this.registGridClickData = e.data
          } else {
            this.registGridClickData = null
          }
        }
      },

      btnExcelDownload() {
        this.doExcelDownload()
      },

      btnExcelUpload() {
        this.doExcelUpload()
      },     

      doSearchMainList() {
        this.manualRegistGrid = []
        this.openLoading('searching')
        this.gridManualRegistInstance.clearSelection()
        const searchData = {
          comCode: getComCode(),
          facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
          locCode: this.searchLocCode == null ? '' : this.searchLocCode.toString(),
          itemType: this.searchItemType == null ? '' : this.searchItemType.toString(),
          partType: this.searchPartType == null ? '' : this.searchPartType.toString(),
          partNo: this.partNoInput == null ? '' : this.partNoInput.toString()
        }
        getMat0110(searchData)
          .then(res1 => {
            this.manualRegistGrid = res1.list
          })
          .finally(() => {
            this.endLoading()
          })         
      },

      async doRegistConfirm() {
        this.gridManualRegistInstance.saveEditData()
        var selectedRegistRows = await this.gridManualRegistInstance.getSelectedRowsData()
        let messageGubun = 'doSaveData'

        if (selectedRegistRows.length === 0) {
          notify(this.$t('SelectCheck'), 'error')
          return
        }

        for (var row of selectedRegistRows) {
          
          if (parseInt(row.realQty) < 0) {
            notify('실사수량은 0보다 커야 합니다', 'error', 3000)
            return
          }

          row.__created__ = true
          row.__modified__ = false
          row.comCode = getComCode()

          if (row.regiNo == null || row.regiNo == '0') {
            row.regiNo = 1
          } else {
            row.regiNo = parseInt(row.regiNo) + 1
          }

          row.realState = ''

          if (row.regiType === '수작업등록') {
            row.regiType = '10'
          } else if (row.regiType === '엑셀등록') {
            row.regiType = '20'
          } else {
            row.regiType = '10'
          }       

          row.maker = getUserId()
          row.editor = getUserId()
        }

        insertMat0110(selectedRegistRows, true)
          .then(res => {
            notify(this.$t('Saved'), 'success', 3000)
          })
          .catch(error => {
            notify(error, 'error', 3000)
            this.endLoading()
          })
          .finally(() => {
            this.gridManualRegistInstance.endUpdate()
            this.doSearchMainList()
            this.endLoading()
          })
      },

      doRegistCancel() {
        this.vToastifyPrompt(
          '편집을 취소 하시겠습니까?',
          'info',
          current => {
            this.doSearchMainList()
          },
          null,
          true
        )
      },
      
      async doExcelDownload() {
        if (this.manualRegistGrid.length > 0) {
          this.gridManualRegistInstance.saveEditData()
          var selectedRegistRows = await this.gridManualRegistInstance.getSelectedRowsData()
          if (selectedRegistRows.length > 0) {
            let excelData = []
            for (var item of selectedRegistRows) {
              excelData.push({
                comCode: item.comCode,
                facCode: item.facCode,
                partNo: item.partNo,
                lotDetail: item.lotDetail,
                regiDate: item.regiDate,
                regiNo: item.regiNo == null ? '0' : item.regiNo,
                stockQty: item.stockQty,
                realQty: item.realQty,
                remark: item.remark,
              })
            }
            const workBook = XLSX.utils.book_new()
            const workSheet = XLSX.utils.json_to_sheet(excelData)
            XLSX.utils.book_append_sheet(workBook, workSheet, 'InventoryCounting')
            XLSX.writeFile(workBook, 'InventoryCounting.xlsx')
          } else {
            notify(this.$t('noData'), 'error', 3000)
          }
        } else {
          notify(this.$t('noData'), 'error', 3000)
        }
      },

      inputfile(e) {
        var file = e
        var reader = new FileReader();
        var excelFileDate = null;
        reader.onload = (e) => {
          let data = reader.result
          let workBook = XLSX.read(data, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD' })
          workBook.SheetNames.forEach(sheetName =>{
          console.log('excelSheet', workBook.Sheets[sheetName])
          let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {raw:false})
          console.log('rows', rows);
          this.excelFileData = rows.filter(() => true)
          }) 
        }
        reader.readAsBinaryString(file)
      },      

      doExcelUpload() {
        if (this.excelFileData.length > 0) {
          // eslint-disable-next-line no-inner-declarations
          function findItem(src, destArray) {
            for (var i = 0; i < destArray.length; ++i) {
              if (src.comCode === destArray[i].comCode && 
                  src.facCode === destArray[i].facCode && 
                  src.partNo === destArray[i].partNo && 
                  src.lotDetail === destArray[i].lotDetail) {
                    return i
              }
            }
            return -1
          }
          this.excelFileData.forEach(item => {
            let findIndex = findItem(item, this.manualRegistGrid)
            if (findIndex > -1) {
              this.manualRegistGrid[findIndex].realQty = item.realQty
              this.manualRegistGrid[findIndex].regiType = '엑셀등록'
              this.manualRegistGrid[findIndex].remark = item.remark
            }
          })
        } else {
          notify(this.$t('noData'), 'error', 3000)
        }
      },
      setRealQty(newData, value, currData){
        if(Number(currData.stockQty) < Number(value)){
          console.log("currData", currData)
          console.log("value", value)
          return
        }
        if(currData.realQty !== value){
          newData.realQty = value
          newData.realState = '진행'
          newData.regiType = '수작업등록'
        }
      }
    }
  }
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
.btn {
  background-color: #2b51eb;
  color: white;
}
.btn2 {
  background-color: #ffffff;
  color: #2b51eb;
  border:1px solid #2b51eb;
}
</style>