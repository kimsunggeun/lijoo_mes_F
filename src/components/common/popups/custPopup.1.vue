<template>
  <DxPopup
    :title="$t('customer')"
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
            <v-col cols="4" class="pa-2 pt-0 pb-0">
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
            <v-col cols="4" class="pa-2 pt-0 pb-0">
              <!-- 거래처 유형 -->
              <v-autocomplete
                :menu-props="{ offsetY: true}"
                color="primary"
                class="rounded-0 mt-2"
                v-model="custType"
                :label="$t('custTypeNm')"
                :items="custTypeList"
                item-text="text"
                item-value="value"
                prepend-inner-icon="$search"
                dense
                outlined
                clearable
              />
            </v-col>
            <v-col cols="4" class="pa-2 pt-0 pb-0">
              <!-- 거래 유형 -->
              <v-autocomplete
                :menu-props="{ offsetY: true}"
                color="primary"
                class="rounded-0 mt-2"
                v-model="matType"
                :label="$t('matTypeNm')"
                :items="matTypeList"
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
          headerTitle="customer"
          :useBtnList="['btnSearch','btnChoice']"
          @btnSearch="btnSearch()"
          @btnChoice="btnChoice()"
        >
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
                />
                <DxColumn
                  data-field="custCode"
                  :caption="$t('custCode')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="false"
                />
                <DxColumn
                  data-field="custName"
                  :caption="$t('custName')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="custType"
                  :caption="$t('custType')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="custTypeNm"
                  :caption="$t('custTypeNm')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="matType"
                  :caption="$t('matType')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="matTypeNm"
                  :caption="$t('matTypeNm')"
                  width="auto"
                  data-type="string"
                  alignment="left"
                  :allow-editing="true"
                />
                <DxColumn
                  data-field="name"
                  :caption="$t('name')"
                  width="auto"
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
      //조회 조건
      comCode: '',
      custType: '',
      matType: '',
      //조회 리스트
      comCodeList: [],
      custTypeList: [],
      matTypeList: [],
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
      this.getList()
      this.custPopInfo = []
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
      const custType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'BIZ_GROUP'
      }
      const matType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'BIZ_TYPE'
      }
      Promise.all([getCompany(companyCode), getBas0011Detail(custType), getBas0011Detail(matType)]).then(res => {
        res[0].list.forEach(item => {
          this.comCodeList.push({
            value: item.comCode,
            text: item.comName
          })
        })
        this.comCode = res[0].list[0].comCode
        res[1].list.forEach(item => {
          this.custTypeList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
        res[2].list.forEach(item => {
          this.matTypeList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
      })
    },
    btnSearch() {
      this.openLoading('searching')
      const searchData = {
        comCode: this.comCode == null ? '' : this.comCode.toString(),
        custType: this.custType == null ? '' : this.custType.toString(),
        matType: this.matType == null ? '' : this.matType.toString()
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

.cardCss {
  background-color: #e2ebe9;
  padding: 2px;
}
</style>