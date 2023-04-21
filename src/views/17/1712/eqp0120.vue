<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" 
          :useBtnList="['btnSearch']" 
          @btnSearch="searchEquip"
        >
          <template v-slot:body>
            <!-- 조회 Area -->
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="required mt-2"
                  v-model="schFacCode"
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
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                 ref="menu1"
                 v-model="menu1"  
                 :close-on-content-click="false"
                 :return-value.sync="inspDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('*점검일자')"
                      color="primary"
                      class="required"
                      v-model="inspDate"
                      dense
                      outlined
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="inspDate" no-title scrollable @input="dateInput"/>
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  :label="$t('proCode')"
                  :items="processList"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-text-field
                  class="mt-2 mx-1"
                  :prepend-inner-icon="'$search'"
                  :label="$t('*설비명')"
                  v-model="schEqName"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical 
            headerTitle="*정기점검"            
            :useBtnList="['btnSave']"
          >
            <!-- 설비정보 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="facilityInfo"
                  class="doubleListBox08"
                  :ref="facilityInfoRef"
                  :data-source="facilityInfo"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  :disabled="false"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection show-check-boxes-mode="none" />

                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="inspNo"
                    :caption="$t('*점검번호')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="proCode"
                    :caption="$t('proCode_facGrp')"
                    width="auto"
                    data-type="sring"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="eqCode"
                    :caption="$t('eqCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="eqName"
                    :caption="$t('eqName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                  />
                  <DxColumn
                    data-field="eqSpec"
                    :caption="$t('eqSpec')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="eqGrade"
                    :caption="$t('eqGrade')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :visible="true"
                  >
                    <DxLookup :data-source="eqGrade" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="eqState"
                    :caption="$t('eqState')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :visible="true"
                  >
                    <DxLookup :data-source="eqState" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn 
                    data-field="inspUser" 
                    :caption="$t('*점검자')" 
                    width="auto" 
                    data-type="string" 
                    alignment="center" 
                  />
                  <DxColumn
                    data-field="inspDate"
                    :caption="$t('*점검일자')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="inspTime"
                    :caption="$t('*점검시간')"
                    width="auto"
                    data-type="date"
                    format="hh:mm"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  />
                  <template #cellTemplate="{ data }">
                    <v-icon x-large v-if="data.value" @click="imgClick(data)">mdi-file-pdf-box</v-icon>
                  </template>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pa-0 pr-2">
      <i-card-vertical
        headerTitle="*점검 항목"
      >
        <template v-slot:body>
          <v-layout column overflow-auto>
            <v-col cols="12" class="pa-0 ">
              <DxDataGrid
                id="gridDataSource2"
                class="doubleListBox07"
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
                :selection="{ mode:'none' }"
              >

                <DxScrolling column-rendering-mode="virtual" />
                <DxEditing mode="cell" />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
                <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                <template #checkBoxEditor="{ data: cellInfo }">
                  <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                </template>
                
                <DxColumn
                  data-field="comCode"
                  :caption="$t('comCode')"
                  width="auto"
                  data-type="string"
                  :visible="false"
                />
                <DxColumn
                  data-field="eq_insp_no"
                  :caption="$t('*항목번호')"
                  width="auto"
                  data-type="number"
                  :visible="false"
                />
                <DxColumn
                  data-field="no"
                  :caption="$t('*순번')"
                  width="auto"
                  data-type="number"
                  alignment="right"
                />
                <DxColumn
                  data-field="insp_cls"
                  :caption="$t('*분류')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                >                      
                  <DxLookup :data-source="inspClsList" display-expr="sysName" value-expr="sysCode" />
                </DxColumn>
                <DxColumn
                  data-field="insp_item_desc"
                  :caption="$t('*점검항목')"
                  width="500"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                />
                <DxColumn
                  data-field="insp_method"
                  :caption="$t('*평가방식')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                >
                  <DxLookup :data-source="inspMethodList" display-expr="sysName" value-expr="sysCode" />
                </DxColumn>
                <DxColumn
                  data-field="insp_tool"
                  :caption="$t('*점검방법')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                >                        
                  <DxLookup :data-source="inspToolList" display-expr="sysName" value-expr="sysCode" />
                </DxColumn>
                <DxColumn
                  data-field="min_val"
                  :caption="$t('*최소허용값')"
                  width="auto"
                  data-type="number"
                  alignment="right"
                />
                <DxColumn
                  data-field="max_val"
                  :caption="$t('*최대허용값')"
                  width="auto"
                  data-type="number"
                  alignment="right"
                />
                <DxColumn
                  data-field="rslt_val"
                  :caption="$t('*측정값')"
                  width="auto"
                  data-type="number"
                  alignment="right"
                />
                <DxColumn
                  data-field="rslt_grade"
                  :caption="$t('*평가등급')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                />
                <DxColumn
                  data-field="insp_rslt"
                  :caption="$t('*점검결과')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                />
                <DxColumn
                  data-field="remark"
                  :caption="$t('remark')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                />
              </DxDataGrid>
            </v-col>
          </v-layout>
        </template>
      </i-card-vertical>
    </v-row>
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
import { getCmChildCode } from '@/api/system/cmCodeManage'

export default {
  name: 'eqp0020',
  mixins: [baseview, BaseDataGrid],
  components: {
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
      //납품정보
      facilityInfo: [],
      facilityInfoRef: 'facilityInfoRef', //설비정보
      //검사내역
      gridDataSource2: [],
      gridRef2: 'gridRef2',
      //입고내역
      gridDataSource3: [],
      gridRef3: 'gridRef3',

      //LookUp
      factoryList: [],
      processList: [],
      eqGrade: [],
      eqState: [],
      inspClsList: [],
      inspMethodList: [],
      inspToolList: [],
      cycleUnitList: [],

      //조회 변수
      schFacCode: '',
      inspDate: '',
      schEqName: '',

      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      
      menu1:'',
    }
  },
  computed: {
  },
  beforeCreate() {

  },
  created() {

  },
  methods: {
    searchEquip() {

    },
    dateInput(e){
      this.inspDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
    },
  }
}
</script>
<style scoped>
</style>