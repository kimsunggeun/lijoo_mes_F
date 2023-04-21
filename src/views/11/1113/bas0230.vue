<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top 
          class="d-md-flex" 
          :useBtnList="['btnSearch']" 
          @btnSearch="btnSearch()"
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
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchItemType"
                  :label="$t('itemType')"
                  :items="itemTypeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 제품군 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchPartType"
                  :label="$t('suite')"
                  :items="partTypeList"
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
                ></v-text-field>
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
                <DxScrolling column-rendering-mode="virtual"/>
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
                  :allow-editing="false" />
                <DxColumn 
                  data-field="partName"
                  :caption="$t('partName')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false" />
                <DxColumn 
                  data-field="spec"
                  :caption="$t('spec')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false" />
                <DxColumn 
                  data-field="bomOx"
                  caption="BOM"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false" />
                <DxColumn />
                <DxPaging :enabled="false"/>
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
                <!-- <DxGrouping :auto-expand-all="true" /> -->
                <DxScrolling column-rendering-mode="virtual" />
                <!-- <DxColumn :group-index="0" data-field="State" /> -->
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
                  :allow-editing="true"
                  columnDefs: gridOptions.columnDefs,
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
  import { DxPopup } from 'devextreme-vue/popup';
  import { DxScrollView } from "devextreme-vue/scroll-view";
  import { DxDataGrid, DxColumn , DxScrolling , DxGrouping , DxEditing , DxLookup} from 'devextreme-vue/data-grid'
  import { getCurrentDate } from '@/utils/common.js'

  import baseview from '@/components/base/baseview.vue' // base page 추가
  import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

  import { getCompany } from '@/api/system/companyManage'
  import { getFacCode } from '@/api/view/bas0215'
  import { getBas0011Detail } from '@/api/view/bas0011'

  import { getItemInfo, getBomImplosion} from '@/api/view/bas0230'
  //import { getItemSelectForBOM } from '@/api/view/bas0040'
  import { getBomInfo } from '@/api/view/bas0043'
  import { getUserId, getComCode } from '@/utils/token'
  import { DxTreeList } from 'devextreme-vue/tree-list'
  import { getProCodeName } from '@/api/view/bas0042'

  export default {
    name: 'bas0230',
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

        //FOCUS 품번
        focusPartNo: '',

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
            if(item.sysName === '원자재')  {return true;}
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
      }, 
    },
    methods: {
      //품목선택 조회
      btnSearch() {
        this.itemSelection = []
        this.openLoading('searching')
        const searchData = {
          comCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
          facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
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

      async doSearchBomInfo() {
        this.openLoading('searching')
        const searchData = {
          comCode: getComCode(),
          facCode: this.searchFacCode,
          itemType: null,
          partType: null,
          partNo: this.itemSelectionClickData.partNo
        }

        getBomImplosion(searchData)
          .then(res => {
            if (res.success) {
              res.list.forEach((item, i) => {
                item.amount = this.numberWithCommas(item.amount);
                this.itemSelectionDetail.push(item)
              })
              // this.itemSelectionDetail = res.list
              //this.$refs.itemSelectionDetailRef.fontWeight = "bolder"
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
        //     this.focusPartNo = e.data.partNo
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
        this.focusPartNo = e.row.data.partNo
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
.fontWeight {
  font-weight: bolder;
  color: #0015ff;
}
</style>