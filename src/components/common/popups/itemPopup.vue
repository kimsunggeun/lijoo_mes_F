<template>
  <DxPopup
    :title="$t('tabItemInfoTitle')"
    :show-title="true"
    :visible.sync="popupVisible"
    :hide-on-outside-click="false"
    :scrollingEnabled="true"
    width="40%"
    height="auto"
    @hidden="onHidden"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-vertical headerTitle="tabItemInfoTitle">
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
                @CellDblClick="btnChoice"
                :selection="{ mode:'single' }"
              >
                <DxScrolling column-rendering-mode="virtual" />
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
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="spec"
                  :caption="$t('spec')"
                  width="25%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="lotSize"
                  :caption="$t('lotSize')"
                  width="25%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" align="right">
        <v-btn outlined width="80px" class="releaseBtn" @click="btnChoice">{{ $t('choice') }}</v-btn>
        <v-btn
          outlined
          width="80px"
          class="releaseBtn"
          @click="popupVisible = false"
        >{{ $t('cancel') }}</v-btn>
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
      this.itemPopInfo = []
      this.popupVisible = true
      this.btnSearch()
      this.gridInstance.clearSelection()
    },
    onHidden(e) {
      this.popupVisible = false
    },
    btnSearch() {
      this.openLoading('searching')
      const searchData = {
        facCode: getComCode()
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
.releaseBtn {
  background-color: rgb(135, 155, 119);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}
.cardCss {
  background-color: #e2ebe9;
  padding: 2px;
}
</style>