<template>
    <v-container fluid align-start ma-0 pa-2 class="container-height">
      <v-row no-gutters fill-height>
        <v-col cols="12" class="pa-1 pt-0">
          <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch(true)">
            <template v-slot:body>
              <v-row class="mb-2">
                <v-col cols="2" class="pa-2 pt-0 pb-0">
                  <!-- 회사명 -->
                  <v-autocomplete
                    :menu-props="{offsetY: true}"
                    color="primary"
                    class="required mt-2"
                    v-model="searchComCode"
                    :label="$t('comName')"
                    :items="comCodeList"
                    item-text="text"
                    item_value="value"
                    prepend-inner-icon="$search"
                    dense
                    outlined
                    @change="updateComCode"
                  />
                </v-col>
                <v-col cols="2" class="pa-2 pt-0 pb-0">
                  <!-- 공장명 -->
                  <v-autocomplete
                    :menu-props="{offsetY: true}"
                    color="primary"
                    class="required mt-2"
                    v-model="searchFacCode"
                    :label="$t('facName')"
                    :items="facCodeList"
                    item-text="text"
                    item_value="value"
                    prepend-inner-icon="$search"
                    dense
                    outlined
                    clearable
                    @change="updateFacCode"
                  />
                </v-col>
                <v-col cols="2" class="pa-2 pt-0 pb-0">
                  <!-- 위치명 -->
                  <v-autocomplete
                    :menu-props="{offsetY: true}"
                    color="primary"
                    class="mt-2"
                    v-model="searchLocCode"
                    :label="$t('locName')"
                    :items="locCodeList"
                    item-text="text"
                    item_value="value"
                    prepend-inner-icon="$search"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="2" class="pa-2 pt-0 pb-0">
                  <!-- 품번검색 -->
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('partNo')"
                    v-model="partNoInput"
                    dense
                    outlined
                    color="primatry"
                    class="mt-2"
                    clearable
                    @keydown.enter="btnSearch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </i-card-top>
        </v-col>
        <v-col cols="5" class="pa-2">
          <i-card-vertical :headerTitle="$t('inventoryInfoMaster')" >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <!-- 품목선택 -->
                <DxDataGrid
                  id="itemGrid"
                  class="listBox"
                  :ref="itemGridRef"
                  :data-source="itemGrid"
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
                  :auto-navigate-to-focused-row="true"
                  :disablePagination="false"
                  column-resizing-mode="widget"
                  @focused-row-changed="focusedRow"
                >
                  <DxScrolling column-rendering-mode="virtual"/>
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="50"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locCode"
                    :caption="$t('locCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locName"
                    :caption="$t('locName')"
                    width="80"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false" />
                  <DxColumn 
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="150"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false" />
                  <DxColumn 
                    data-field="partName"
                    :caption="$t('partName')"
                    width="200"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false" />
                  <DxColumn 
                    data-field="stockQty"
                    :caption="$t('stockQty')"
                    width="100"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false" />
                  <DxColumn 
                    data-field="stockAmount"
                    :caption="$t('stockAmount')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false" />
                  <DxColumn/>
                  <DxPaging :enabled="false"/>
                  <DxPager :show-page-size-selector="false"/>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
        <v-col cols="7" class="pa-2">
          <i-card-vertical :headerTitle="$t('inventoryInfoDetail')" >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="itemGridDetail"
                  class="listBox"
                  :ref="itemGridDetailRef"
                  :data-source="itemGridDetail"
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
                  :selection="{ mode:'none' }"
                  column-resizing-mode="widget"
                >
                  <!-- <DxGrouping :auto-expand-all="autoExpandAll" /> -->
                  <DxScrolling column-rendering-mode="virtual"/>
                  <!-- <DxColumn 
                    :group-index="0" 
                    data-field="State" /> -->
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="50"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="lotNo"
                    :caption="$t('lotNo')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"/>                  
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('lotDetail')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"/>
                  <DxColumn
                    data-field="stockQty"
                    :caption="$t('stockQty')"
                    data-type="string"
                    width="auto"
                    alignment="right"
                    :allow-editing="false"/>
                    <DxColumn
                    data-field="stockAmount"
                    :caption="$t('stockAmount')"
                    data-type="string"
                    width="auto"
                    alignment="right"
                    :allow-editing="false"/>                    
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('regiDate')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"/>
                  <DxColumn
                    data-field="stockType"
                    :caption="$t('stockType')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"/>
                  <DxColumn
                    data-field="eventCd"
                    :caption="$t('eventCd')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"/>  
                  <DxColumn/>
                  <DxPaging :enabled="false"/>
                  <DxPager :show-page-size-selector="false"/>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
    import iCardVertical from '@/components/common/iCardVertical.vue'
    import ICardTop from '@/components/common/iCardTop.vue'
    import { DxDataGrid, DxColumn, DxScrolling, DxPager } from 'devextreme-vue/data-grid'
  
    import baseview from '@/components/base/baseview.vue' // base page 추가
    import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
  
    import { getComCode, getStore, setStore } from '@/utils/token'
    import { getCompany } from '@/api/system/companyManage'
    import { getFacInfo } from '@/api/system/userManage'
    import { getWarehouseLocInfoData } from '@/api/view/bas0033'

    import { getMat0210 } from '@/api/view/mat0020'
    import { getMat0210Detail } from '@/api/view/mat0021'
  
    export default {
      name: 'mat0210',
      mixins: [baseview, BaseDataGrid],
      components: {
        'i-card-vertical': iCardVertical,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        ICardTop,
        DxPager,
      },
      data() {
        return {
          searchMain: [],
          searchDetail: [],
          //조회 조건
          searchComCode: '',
          searchFacCode: '',
          searchLocCode: '',
          partNoInput: '',
          //조회리스트
          comCodeList: [],
          facCodeList: [],
          locCodeList: [],
          //그리드 관련
          itemGrid: [],
          itemGridRef: 'itemGridRef',
          itemGridDetail: [],
          itemGridDetailRef: 'itemGridDetailRef',
          //그리드 클릭이벤트 관련
          itemGridClickData: null,
          autoExpandAll: true,
          cellVisible: false,
          focusedData: []
        }
      },
      async beforeCreate() {
        const companyCode = {
          comCode: getComCode()
        }

        const searchCode = {
          comCode: getComCode(),
          facCode: null,
          whCode: null,
          workCode: null,
          pathCode: null
        }

        await Promise.all([
          //회사명 조회조건 리스트 가져오기
          getCompany(companyCode),
          //공장명 조회조건 리스트 가져오기
          getFacInfo(searchCode)
        ]).then( res => {
          res[0].list.forEach((item, i) => {
            this.comCodeList.push({
              value: item.comCode,
              text: item.comName
            })
          })
          this.searchComCode = res[0].list[0].comCode

          res[1].list.forEach((item, i) => {
            this.comCodeList.push({
              value: item.comCode,
              text: item.comName
            })
          })
          this.searchComCode = res[1].list[0].comCode
          res[1].list.forEach((item, i) => {
            this.facCodeList.push({
              value: item.facCode,
              text: item.facName
            })
          })
          this.searchFacCode = res[1].list[0].facCode
          //위치명 조회조건 리스트 가져오기
          searchCode.facCode = this.searchFacCode;
          getWarehouseLocInfoData(searchCode).then(res => {
            res.list.forEach((item, i) => {
              this.locCodeList.push({
                value: item.locCode,
                text: item.locName
              })
            })
            // this.searchLocCode = res.list[0].locCode
          })
        })
        //this.btnSearch(false)
      },
      created() {    
        
      },
      computed: {
        gridInventoryMasterInstance() {
          return this.GetDataGrid(this.itemGridRef)
        },
        
        gridInventoryDetailInstance() {
          return this.GetDataGrid(this.itemGridDetailRef)
        }, 
      },
      mounted() {
        this.$nextTick(function () {
          
        })
      },
      methods: {
        updateComCode() {
          let searchCode = {
            comCode: this.searchComCode,
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
            //위치명 조회조건 리스트 가져오기
            searchCode.facCode = this.searchFacCode;
            getWarehouseLocInfoData(searchCode).then(res => {
              res.list.forEach((item, i) => {
                this.locCodeList.push({
                  value: item.locCode,
                  text: item.locName
                })
              })
              this.searchLocCode = res.list[0].locCode
            })
          })
        },
        updateFacCode() {
          let searchCode = {
            comCode: this.searchComCode,
            facCode: this.searchFacCode,
            whCode: null,
            workCode: null,
            pathCode: null
          }
          //위치명 조회조건 리스트 가져오기
          getWarehouseLocInfoData(searchCode).then(res => {
            res.list.forEach((item, i) => {
              this.locCodeList.push({
                value: item.locCode,
                text: item.locName
              })
            })
            this.searchLocCode = res.list[0].locCode
          })
        },
        //재고 정보 마스터 조회
        btnSearch(flag) {
          this.itemGrid = []
          this.itemGridDetail = []
          this.openLoading('searching')
          
          
          if(getStore('mat0210m') != null) {
            this.searchMain = JSON.parse(getStore('mat0210m'))
          }

          if(this.searchMain.length > 0 && !flag) {
            this.searchComCode = this.searchMain[0].comCode
            this.searchFacCode = this.searchMain[0].facCode
            this.searchLocCode = this.searchMain[0].locCode
            this.partNoInput = this.searchMain[0].partNo
          } else {
            setStore('mat0210d', null)
          }

          const searchData = {
            comCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
            facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
            locCode: this.searchLocCode == null ? '' : this.searchLocCode.toString(),
            partNo: this.partNoInput == null ? '' : this.partNoInput.toString()
          }
          let datam = []
          datam.push(searchData)
          setStore('mat0210m', JSON.stringify(datam))

          getMat0210(searchData)
            .then(res => {
              if (res.success) {
                res.list.forEach((item, i) => {
                  item.stockQty = this.numberWithCommas(item.stockQty);
                  item.stockAmount = this.numberWithCommas(item.stockAmount);
                })
                this.itemGrid = res.list
              }
            })
            .finally(() => {
              this.endLoading()
              if (this.itemGrid.length > 0) {
                this.gridInventoryMasterInstance.clearSelection()
                this.gridInventoryMasterInstance.option('focusedRowIndex', -1)
                let mat0210d = getStore('mat0210d')
                if(mat0210d != null && mat0210d != 'null') {
                  this.searchDetail = JSON.parse(mat0210d)
                  this.gridInventoryMasterInstance.selectRows(this.searchDetail[0].id, true)
                  this.gridInventoryMasterInstance.option('focusedRowIndex', this.searchDetail[0].id - 1)
                  this.itemGridClickData = this.searchDetail[0]
                  this.doSearchDetailList()
                }
              }
            })
        },
        //재고 정보 상세 조회
        focusedRow(e){
          if(e === undefined){
            return
          }
          this.focusedData = e.row.data
          this.selectDetail()
        },
        async selectDetail(){
          if(this.focusedData.length === 0){
            notify(this.$t('SelectCheck'), 'error')
            return
          }
          this.openLoading()
          const searchData = {
            comCode: this.focusedData.comCode,
            facCode: this.focusedData.facCode,
            locCode: this.focusedData.locCode,
            partNo: this.focusedData.partNo
          }
          console.log(searchData);
          getMat0210Detail(searchData)
            .then(res => {
              if (res.success) {
                this.itemGridDetail = res.list
                this.itemGridDetail.forEach((item, i) => {
                  item.stockQty = this.numberWithCommas(item.stockQty);
                  item.stockAmount = this.numberWithCommas(item.stockAmount);
                })            
              }
            })
            .finally(() => {
              this.endLoading()
            })
        }, 
        // 내용이 비었는지 체크
        isEmpty(str) {
          if (typeof str == 'undefined' || str == null || str == '')
            return true
          else
            return false
        },      

        numberWithCommas(money) {
          if (this.isEmpty(money) == true)
            return "0"
          else
            return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        
      }
    }
  </script>
  <style lang="less" scoped>
  
  </style>