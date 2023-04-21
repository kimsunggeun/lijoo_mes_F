<template>
  <DxPopup
    :title="$t('itemSelection')"
    :show-title="true"
    :visible.sync="popupVisible"
    :hide-on-outside-click="false"
    :scrollingEnabled="true"
    :width="1000"
    :height="700"
    @hidden="onHidden"
  >
    <v-row no-gutter fill-height>
      <v-col cols="12" class="pa-2 pt-0">
        <v-card-text class="cardCss">
          <v-row>
            <v-col cols="3" class="pa-2 pt-0 pb-0">
              <!-- 회사명 -->
              <v-autocomplete
                :menu-props="{ offsetY: true}"
                color="primary"
                class="rounded-0 mt-2"
                v-model="comCode"
                :label="$t('comName')"
                :items="comCodeList"
                item-text="text"
                item-value="value"
                prepend-inner-icon="$search"
                dense
                outlined
                clearable
              />
            </v-col>
            <v-col cols="3" class="pa-2 pt-0 pb-0">
              <!-- 품목군 -->
              <v-autocomplete
                :menu-props="{ offsetY: true}"
                color="primary"
                class="rounded-0 mt-2"
                v-model="itemType"
                :label="$t('itemType')"
                :items="itemTypeList"
                item-text="text"
                item-value="value"
                prepend-inner-icon="$search"
                dense
                outlined
                clearable
              />
            </v-col>
            <v-col cols="3" class="pa-2 pt-0 pb-0">
              <!-- 제품군 -->
              <v-autocomplete
                :menu-props="{ offsetY: true}"
                color="primary"
                class="rounded-0 mt-2"
                v-model="partType"
                :label="$t('suite')"
                :items="partTypeList"
                item-text="text"
                item-value="value"
                prepend-inner-icon="$search"
                dense
                outlined
                clearable
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-vertical
          headerTitle="itemSelection"
          :useBtnList="['btnSearch','btnChoice']"
          @btnSearch="btnSearch()"
          @btnChoice="btnChoice()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <DxDataGrid
                id="itemPopup"
                class="vh-50"
                :ref="itemPopupRef"
                :data-source="itemPopInfo"
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
                :selection="{ mode:'single' }"
              >
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn
                  data-field="comCode"
                  :caption="$t('comCode')"
                  width="25%"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="partNo"
                  :caption="$t('partNo')"
                  width="25%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="partName"
                  :caption="$t('partName')"
                  width="25%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="spec"
                  :caption="$t('spec')"
                  width="25%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </DxPopup>
</template>

<script>
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import iCardVertical from '@/components/common/iCardVertical.vue'
import { DxPopup } from 'devextreme-vue/popup'
import { DxDataGrid, DxColumn, DxScrolling } from 'devextreme-vue/data-grid'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getBas0011Detail } from '@/api/view/bas0011'
import { getItemSelect } from '@/api/view/bas0040'

export default {
  name: 'itemPop',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxScrolling
  },
  data() {
    return {
      popupVisible: false,
      rowIndex: '',
      //조회 조건
      comCode: '',
      itemType: '',
      partType: '',
      //조회 리스트
      comCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      //그리드 정보
      itemPopupRef: 'itemPopupRef',
      itemPopInfo: []
    }
  },
  created() {},
  mounted() {},
  computed: {
    gridInstance() {
      return this.GetDataGrid(this.itemPopupRef)
    }
  },
  methods: {
    open(e) {
      this.rowIndex = e
      this.getList()
      this.itemPopInfo = []
      this.popupVisible = true
      this.gridInstance.clearSelection()
    },
    onHidden(e) {
      this.popupVisible = false
    },
    getList() {
      //공통코드 리스트 가져오기
      const companyCode = {
        comCode: getComCode()
      }
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
      Promise.all([getCompany(companyCode), getBas0011Detail(itemType), getBas0011Detail(partType)]).then(res => {
        res[0].list.forEach(item => {
          this.comCodeList.push({
            value: item.comCode,
            text: item.comName
          })
        })
        this.comCode = res[0].list[0].comCode
        res[1].list.forEach(item => {
          this.itemTypeList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
        res[2].list.forEach(item => {
          this.partTypeList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
      })
    },
    btnSearch() {
      this.openLoading('searching')
      const searchData = {
        facCode: this.comCode == null ? '' : this.comCode.toString(),
        itemType: this.itemType == null ? '' : this.itemType.toString(),
        partType: this.partType == null ? '' : this.partType.toString()
      }
      getItemSelect(searchData)
        .then(res => {
          if (res.success) {
            this.itemPopInfo = res.list
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },
    async btnChoice() {
      let rows = await this.gridInstance.getSelectedRowsData()
      this.$emit('choice', this.rowIndex, rows)
      this.popupVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .v-icon.v-icon[data-v-88338932] {
  float: left;
}
::v-deep .v-btn.v-size--default[data-v-182ed1a5] {
  width: 65px;
  margin-right: 1px;
}

.cardCss {
  background-color: #e2ebe9;
  padding: 2px;
}
</style>