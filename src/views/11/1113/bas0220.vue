<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="['btnSearch']"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row no-gutters class="center pa-2 mr-0">
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 회사명 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchComCode"
                  :label="$t('comName')"
                  :items="comCodeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
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
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 품목군 -->
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  item-text="text"
                  item-value="value"
                  :items="itemTypeList"
                  v-model="searchItemType"
                  :prepend-inner-icon="'$search'"
                  :label="$t('itemType')"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 제품군 -->
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  item-text="text"
                  item-value="value"
                  :items="partTypeList"
                  v-model="searchPartType"
                  :prepend-inner-icon="'$search'"
                  :label="$t('partType')"
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
                  color="primary"
                  class="mt-2"
                />
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="5" class="pa-2">
        <i-card-vertical headerTitle="itemSelection" >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <!-- 품목선택 -->
              <DxDataGrid
                id="itemSelection"
                class="listBox05"
                :ref="itemSelectionRef"
                :data-source="itemSelection"
                :hover-state-enabled="true"
                :allow-column-resizing="true"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="true"
                :width="grid.width"
                :show-row-lines="true"
                column-resizing-mode="widget"
                key-expr="id"
                :focused-row-enabled="true"
                :column-hiding-enabled="false"
                :selection="{ mode:'none' }"
                @focused-row-changed="focusedRowChanged_itemSelection"
                @cellClick="itemRowClick"
              >
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn
                  data-field="id"
                  caption="No"
                  width="auto"
                  data-type="string"
                  alignment="right"
                  :allow-editing="false"
                />                    
                <DxColumn
                  data-field="partNo"
                  :caption="$t('partNo')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="partName"
                  :caption="$t('partName')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="spec"
                  :caption="$t('spec')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="bomOx"
                  caption="BOM"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false"/>
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="7" class="pa-2">
        <i-card-vertical headerTitle="bomInfoTitle">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <DxTreeList
                id="itemSelectionDetail"
                class="listBox05"
                :ref="itemSelectionDetailRef"
                :data-source="itemSelectionDetail"
                :hover-state-enabled="true"
                :allow-column-resizing="true"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="true"
                :width="grid.width"
                :show-row-lines="true"
                :focused-row-enabled="true"
                :column-hiding-enabled="false"
                :selection="{ mode:'none' }"
                :auto-expand-all="true"
                column-resizing-mode="widget"
                key-expr="id"
                parent-id-expr="parentId"
              >         
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn
                    data-field="parentId"
                    caption="ParentId"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="id"
                    caption="id"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="level"
                    :caption="$t('level')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="pathType"
                    :caption="$t('pathTypeName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="pathType"
                      display-expr="sysName"
                      value-expr="sysCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="pathName"
                    :caption="$t('pathName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="proCode"
                    :caption="$t('proName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="proCode"
                      display-expr="proName"
                      value-expr="proCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="paPartNo"
                    caption="부모품번"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                    :visible="true"
                  />                                                      
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="spec"
                    :caption="$t('spec')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="unitName"
                    caption="단위"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="amount"
                    caption="소요량"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false"/>
              </DxTreeList>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import iPageTitle from '@/components/common/iPageTitle.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxPopup } from 'devextreme-vue/popup'
import { DxScrollView } from 'devextreme-vue/scroll-view'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing , DxLookup} from 'devextreme-vue/data-grid'
import { DxTreeList, DxFilterRow, DxSearchPanel } from 'devextreme-vue/tree-list'
import { getCurrentDate } from '@/utils/common.js'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getItemInfo, getBomExplosion} from '@/api/view/bas0220'
import { getComCode } from '@/utils/token'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'

import { getCompany } from '@/api/system/companyManage'
import { getFacCode } from '@/api/view/bas0215'
//import { getItemSelectForBOM } from '@/api/view/bas0040'

import { getBas0011Detail } from '@/api/view/bas0011'
import { getProCodeName } from '@/api/view/bas0042'

export default {
  name: 'bas0220',
  mixins: [baseview, BaseDataGrid],
  components: {
    // 'i-page-title': iPageTitle,
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    //DxGrouping,
    //DxEditing,
    ICardTop,
    //DxPopup,
    //DxScrollView,
    DxTreeList,
    DxLookup,
    //DxFilterRow,
    //DxSearchPanel,
  },

  data() {
    return {
      //조회 조건
      searchComCode: '',
      searchFacCode: '',
      searchItemType: '',
      searchPartType: '',
      partNoInput: '',
      
      //조회리스트
      comCodeList: [],
      facCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      partNoList: [],

      itemSelection: [],
      itemSelectionRef: 'itemSelectionRef',
      itemSelectionDetail: [],
      itemSelectionDetailRef: 'itemSelectionDetailRef',
      
      //그리드 클릭이벤트 관련
      itemSelectionClickData: null,

      autoExpandAll: true,

      cellVisible: false,

      //경로유형, 공정명
      pathType: [],
      proCode: []
    }
  },

  created() {
    //회사명 조회조건 리스트 가져오기
    const companyCode = {
      comCode: getComCode()
    }

    getCompany(companyCode).then(res => {
      res.list.forEach((item, i) => {
        this.comCodeList.push({
          value: item.comCode,
          text: item.comName
        })
      })
      this.searchComCode = res.list[0].comCode
    })

    getFacCode(companyCode).then(res => {
      console.log('res', res)
      res.list.forEach(item => {
        this.facCodeList.push({
          value: item.facCode,
          text: item.facName
        })
      })
      this.searchFacCode = res.list[0].facCode
    })

    //공통코드 조회조건 리스트 가져오기
    const itemType = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'ITEM_TYPE'
    }
    const partType = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'PART_TYPE'
    }
    const userYn = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'USER_YN'
    }
    const pathType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'PATH_TYPE'
    }
    const proCode = {
        comCode: getComCode()
    }
    Promise.all([getBas0011Detail(itemType), getBas0011Detail(partType), getBas0011Detail(pathType), getProCodeName(proCode),])
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
        this.searchPartType = res[1].list.find(item => { 
            if(item.sysName === '제품')  {return true;}
        }).sysCode
        this.pathType = res[2].list
        this.proCode = res[3].list
      })
  },

  computed: {
    gridItemInstance() {
      return this.GetDataGrid(this.itemInformationRef)
    },
    gridBomInstance() {
      return this.GetDataGrid(this.bomInformationRef)
    }
  },

  mounted() {

  },

  methods: {
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow') {
        var valueChanged = this.onCellValueChanged
        e.editorOptions.onValueChanged = args => {
          if (e.index > 0) valueChanged(args.value, e, 'L')
        }
      }
    },

    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        return
      }
    },

    btnSearchMain() {
      this.doSearchItemInfo()
    },

    doSearchItemInfo() {
      this.itemSelection = []
      this.openLoading('searching')
      const searchData = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
        itemType: this.searchItemType == null ? '' : this.searchItemType.toString(),
        partType: this.searchPartType == null ? '' : this.searchPartType.toString(),
        partNo: this.partNoInput == null ? '' : this.partNoInput.toString()
      }
      getItemInfo(searchData)
        .then(res => {
          if (res.success) {
            res.list.forEach(e => {
              e.id = Number(e.id)
            })
            this.itemSelection = res.list
          }
        })
        .finally(() => {
          this.itemSelectionDetail = []
          this.endLoading()
        })
    },

    doSearchBomInfo() {
      this.openLoading('searching')
      const searchData = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
        itemType: null,
        partType: null,
        partNo: this.itemSelectionClickData.partNo
      }

      this.itemSelectionDetail = []

      getBomExplosion(searchData)
        .then(res => {
          if (res.success) {
            res.list.forEach((item, i) => {
              item.amount = this.numberWithCommas(item.amount)

              // if (parseInt(item.level) > 0)
                this.itemSelectionDetail.push(item)
            })
            // this.itemSelectionDetail = res.list
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },

    itemRowClick(e) {
      // if (e.rowIndex !== -1) {
      //   this.itemSelectionDetail = []
      //   if (e.data) {
      //     this.itemSelectionClickData = e.data
      //     this.doSearchBomInfo()
      //   } else {
      //     this.itemSelectionClickData = null
      //   }     
      // }
    },

    focusedRowChanged_itemSelection(e) {
      if (e.row === undefined) {
        return
      }
      this.itemSelectionDetail = []
      this.itemSelectionClickData = e.row.data
      this.doSearchBomInfo()
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