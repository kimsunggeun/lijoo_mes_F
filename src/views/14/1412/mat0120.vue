<template>
    <v-container fluid align-start ma-0 pa-2 class="container-height">
      <v-row no-gutters>
        <v-col cols="12" class="pa-1 pt-0">
          <i-card-top class="d-md-flex" 
            :useBtnList="['btnSearch']" 
            @btnSearch="btnSearch()"
          >
            <template v-slot:body>
              <v-layout column>
                <v-row class="mb-2">
                  <v-col cols="2" class="pa-2 pt-0 pb-0">
                    <!-- 공장명 -->
                    <v-autocomplete
                      :menu-props="{offsetY: true}"
                      color="primary"
                      class="mt-2"
                      v-model="searchFacCode"
                      :label="$t('facName')"
                      :items="facCodeList"
                      item-text="text"
                      item_value="value"
                      prepend-inner-icon="$search"
                      dense
                      outlined
                      @change="updateFacCode"
                    />
                  </v-col>
                  <v-col cols="2" class="pa-0 pr-2">
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
                  <v-col cols="2" class="pa-0 pr-2">
                    <!-- 품목군 -->
                    <v-autocomplete 
                      :menu-props="{offsetY: true}" 
                      color="primary" 
                      class="mt-2" 
                      v-model="searchItemType"
                      :label="$t('itemType')" 
                      :items="itemTypeList"
                      item-text="text"
                      item-value="value" 
                      :prepend-inner-icon="$t('$search')"  
                      dense 
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col cols="2" class="pa-0 pr-2">
                    <!-- 제품군 -->
                    <v-autocomplete 
                      :menu-props="{offsetY: true}" 
                      color="primary" 
                      class="mt-2" 
                      v-model="searchPartType"
                      :label="$t('partType')" 
                      :items="partTypeList"
                      item-text="text"
                      item-value="value" 
                      :prepend-inner-icon="$t('$search')"                    
                      dense 
                      outlined
                      clearable
                    />
                  </v-col>                
                  <v-col cols="2" class="pa-0 pr-2">
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
                  <v-row no-gutters>
                    <v-col cols="2" class="pa-2 pt-2 pb-2">
                    <v-menu
                    ref="menuStartDate"
                    v-model="menuStartDate"  
                    :close-on-content-click="false"
                    :return-value.sync="startDate"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="실사일"
                          v-model="startDate"
                          dense
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker 
                        v-model="startDate" 
                        no-title scrollable 
                        @input="dateInputStartDate"
                      />
                    </v-menu>
                    </v-col>
                    <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                    <v-menu
                    ref="menuEndDate"
                    v-model="menuEndDate"  
                    :close-on-content-click="false"
                    :return-value.sync="endDate"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="~"
                          v-model="endDate"
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker 
                        v-model="endDate" 
                        :min="startDate" 
                        no-title scrollable 
                        @input="dateInputEndDate"
                      />
                    </v-menu>
                    </v-col>
                  </v-row>
                </v-row>
              </v-layout>          
            </template>
          </i-card-top>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" class="pa-2">
          <i-card-vertical headerTitle="재고실사현황 마스터" >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <!-- 품목선택 -->
                <DxDataGrid
                  id="itemGrid"
                  class="listBox03"
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
                  @cellClick="itemRowClick"
                >
                  <DxScrolling column-rendering-mode="virtual"/>
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="8%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locCode"
                    :caption="$t('locCode')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locName"
                    :caption="$t('locName')"
                    width="20%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="itemType" 
                    :caption="$t('itemType')" 
                    width="18%" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="partType" 
                    :caption="$t('partType')" 
                    width="18%" 
                    data-type="string" 
                    alignment="center" 
                    css-class="devest-grid-header-require" 
                    :allow-editing="false"  
                  />                     
                  <DxColumn 
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="*"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="regiDate"
                    :caption="실사일"
                    width="12%"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false" 
                    :visible="false"
                  />
                  <DxColumn/>
                  <DxPaging :enabled="false"/>
                  <DxPager :show-page-size-selector="false"/>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
        <v-col cols="8" class="pa-2">
          <i-card-vertical headerTitle="재고실사현황 상세" >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="itemGridDetail"
                  class="listBox03"
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
                  :column-hiding-enabled="false"
                  :selection="{ mode:'none' }"
                >
                  <!-- <DxGrouping :auto-expand-all="autoExpandAll" /> -->
                  <DxScrolling column-rendering-mode="virtual"/>
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="4%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="lotNo"
                    :caption="$t('lotNo')"
                    width="10%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />                  
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('lotDetail')"
                    width="14%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="regiDate" 
                    caption="실사일" 
                    width="10%" 
                    data-type="string" 
                    alignment="center"  
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="regiNo" 
                    caption="등록순번" 
                    width="6%" 
                    data-type="string" 
                    alignment="right"  
                    :allow-editing="false"
                  />                  
                  <DxColumn
                    data-field="stockQty"
                    caption="전산수량"
                    width="8%"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                    <DxColumn
                    data-field="realQty"
                    :caption="$t('realQty')"
                    width="8%"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />                    
                  <DxColumn
                    data-field="regiType"
                    :caption="$t('regiType')"
                    width="10%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                    <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="*"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />                    
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="10%"
                    data-type="string"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    width="10%"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />  
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
    import { DxPopup } from 'devextreme-vue/popup';
    import { DxScrollView } from "devextreme-vue/scroll-view";
    import { DxDataGrid, DxColumn , DxScrolling , DxGrouping , DxEditing, DxPager } from 'devextreme-vue/data-grid'
    import baseview from '@/components/base/baseview.vue' // base page 추가
    import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
    import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
    import { getComCode } from '@/utils/token'
    import { getFacInfo } from '@/api/system/userManage'
    import { getWarehouseLocInfoData } from '@/api/view/bas0033'
    import { getBas0011Detail } from '@/api/view/bas0011'
    import { getMat0120 } from '@/api/view/mat0017'
    import { getMat0120Detail } from '@/api/view/mat0017'
  
    export default {
      name: 'mat0120',
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
          //조회 조건
          searchFacCode: '',
          searchLocCode: '',
          searchItemType: '',
          searchPartType: '',          
          partNoInput: '',
          startDate: getPreMonth(1),
          endDate: getCurrentDate(),
          menuStartDate: '',
          menuEndDate: '',
 
          //조회리스트
          facCodeList: [],
          locCodeList: [],
          itemTypeList: [],
          partTypeList: [],          
  
          //그리드 관련
          itemGrid: [],
          itemGridRef: 'itemGridRef',
          itemGridDetail: [],
          itemGridDetailRef: 'itemGridDetailRef',

          //그리드 클릭이벤트 관련
          itemGridClickData: null,
  
          autoExpandAll: true,
  
          cellVisible: false,
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
        gridInventoryMasterInstance() {
          return this.GetDataGrid(this.itemGridRef)
        },
        
        gridInventoryDetailInstance() {
          return this.GetDataGrid(this.itemGridDetailRef)
        }, 
      },

      mounted() {
  
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
        btnSearch() {
          this.doSearchMasterList()
        },

        dateInputStartDate(e) {
          this.startDate = e
          this.menuStartDate = false
          this.$refs.menuStartDate.save(e)
          if (this.startDate > this.endDate) {
            this.endDate = this.startDate
          }
        },

        dateInputEndDate(e) {
          if (this.startDate === '') {
            return
          }
          this.endDate = e
          this.menuEndDate = false
          this.$refs.menuEndDate.save(e)
        },        

        doSearchMasterList() {
          this.itemGrid = []
          this.openLoading('searching')
          this.gridInventoryMasterInstance.clearSelection()
          const searchData = {
            comCode: getComCode(),
            facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
            locCode: this.searchLocCode == null ? '' : this.searchLocCode.toString(),
            itemType: this.searchItemType == null ? '' : this.searchItemType.toString(),
            partType: this.searchPartType == null ? '' : this.searchPartType.toString(),            
            partNo: this.partNoInput == null ? '' : this.partNoInput.toString(),
            startDate: this.startDate == null ? '' : this.startDate,
            endDate: this.endDate == null ? '' : this.endDate
          }

          getMat0120(searchData)
            .then(res => {
              if (res.success) {
                this.itemGrid = res.list
              }
            })
            .finally(() => {
              this.endLoading()
              if (this.itemGrid.length > 0) {
                this.itemGridClickData = this.itemGrid[0]
                this.doSearchDetailList()
              }
            })
        },

        //재고 정보 상세 조회
        doSearchDetailList() {
          this.itemGridDetail = []
          this.openLoading('searching')

          const searchData = {
            comCode: this.itemGridClickData.comCode,
            facCode: this.itemGridClickData.facCode,
            locCode: this.itemGridClickData.locCode,
            partNo: this.itemGridClickData.partNo,
            startDate: this.startDate == null ? '' : this.startDate,
            endDate: this.endDate == null ? '' : this.endDate
          }

          getMat0120Detail(searchData)
            .then(res => {
              if (res.success) {
                this.itemGridDetail = res.list
              }
            })
            .finally(() => {
              this.endLoading()
            })
        },        

        itemRowClick(e) {
          if (e.rowIndex !== -1) {
            this.itemGridDetail = []

            if (e.data) {
              this.itemGridClickData = e.data
            } else {
              this.itemGridClickData = null
            }
            this.doSearchDetailList()
          }        
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