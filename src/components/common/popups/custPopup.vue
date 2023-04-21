<template>
  <DxPopup
    :title="$t('tabCustomerInfo')"
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
        <i-card-vertical headerTitle="tabCustomerInfo">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <DxDataGrid
                id="custPopup"
                class="vh-50"
                :ref="custPopupRef"
                :data-source="custPopInfo"
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
                  data-field="comCode"
                  :caption="$t('comCode')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="custCode"
                  :caption="$t('custCode')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="custName"
                  :caption="$t('custName')"
                  width="*"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="custType"
                  :caption="$t('custType')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="custTypeNm"
                  :caption="$t('custTypeNm')"
                  width="15%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="matType"
                  :caption="$t('matType')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                  :visible="false"
                />
                <DxColumn
                  data-field="matTypeNm"
                  :caption="$t('matTypeNm')"
                  width="15%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="name"
                  :caption="$t('name')"
                  width="15%"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="conType"
                  :caption="$t('conType')"
                  width="15%"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="secType"
                  :caption="$t('secType')"
                  width="15%"
                  data-type="string"
                  alignment="center"
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
import { getCustPop } from '@/api/view/bas0044'

export default {
  name: 'custPop',
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
      custPopupRef: 'custPopupRef',
      custPopInfo: []
    }
  },
  created() {},
  mounted() {},
  computed: {
    gridInstance() {
      return this.GetDataGrid(this.custPopupRef)
    }
  },
  methods: {
    open(e) {
      this.rowIndex = e
      this.custPopInfo = []
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
        comCode: getComCode()
      }
      getCustPop(searchData)
        .then(res => {
          if (res.success) {
            this.custPopInfo = res.list
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