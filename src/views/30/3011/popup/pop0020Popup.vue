<template>
    <DxPopup
      :visible.sync="popVisible"
      :show-close-button="true"
      :show-title="true"
      height="auto"
      width="900px"
    >
      <v-row no-gutters>
        <i-card-vertical headerTitle="receivingInfoText">
          <template v-slot:body>
            <DxDataGrid
              id="pop0020PopupGrid"
              class="doubleListBox15"
              :ref="receiptStatusRef"
              :data-source="receiptStatusData"
              :remote-operations="false"
              :hover-state-enabled="true"
              :allow-column-resizing="true"
              :allow-column-reordering="true"
              :row-alternation-enabled="true"
              :show-borders="true"
              :show-row-lines="true"
              key-expr="id"
              :selection="{ mode: 'single' }"
              :focused-row-enabled="true"
              :disablePagination="false"
              :column-hiding-enabled="false"
              :column-auto-width="true"
              :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
            >
              <!-- 납기일 -->
              <DxColumn 
                data-field="regiDate" 
                :caption="$t('deliDate')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- 품번 -->
              <DxColumn 
                data-field="partNo" 
                :caption="$t('partNo')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- 품명 -->
              <DxColumn
                data-field="partName" 
                :caption="$t('partName')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              >
              </DxColumn>
              <!-- 잔량 -->
              <DxColumn 
                data-field="remQty" 
                :caption="$t('nowQty')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- 발주 수량 -->
              <DxColumn 
                data-field="qty" 
                :caption="$t('ordQty')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- 입고량 -->
              <DxColumn 
                data-field="inQty"
                :caption="$t('inQty')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- LotNo -->
              <DxColumn 
                data-field="lotNo" 
                :caption="$t('lotNumber')" 
                data-type="string" 
                width="auto" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- 전산번호 -->
              <DxColumn 
                data-field="lotDetail" 
                :caption="$t('lotDetail')" 
                data-type="string" 
                width="110" 
                alignment="center" 
                :allow-editing="false" 
              />
              <!-- 공백컬럼 -->
              <DxColumn
              
              />
              <DxPaging :enabled="false" />
              <DxPager :show-page-size-selector="false" />
            </DxDataGrid>
          </template>
        </i-card-vertical>
      </v-row>
      <v-row class="btnClose">
        <v-col cols="1">
          <v-btn
            depressed
            class="white--text"
            color="rgb(135,155,119)"
            height="35"
            width="100%"
            @click="closePopup()"
          >
            {{ this.$t('close') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
</template>

<script>
// 데이터그리드 사용시 베이스 추가
import iCardVertical from '@/components/common/iCardVertical.vue'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' 

// DevExtreme
import { DxPopup } from 'devextreme-vue/popup'
import { DxDataGrid, DxColumn, DxPager, DxPaging, DxLookup } from 'devextreme-vue/data-grid'
import notify from 'devextreme/ui/notify'

// API
import { getMat0012 } from '@/api/view/pop0020'

export default {
  name: 'pop0020Popup',
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
    "i-card-vertical": iCardVertical,
    DxPager,
    DxPaging,
},
  data() {
    return {
      popVisible: false,
      //그리드 관련
      receiptStatusData: [],
      receiptStatusRef: 'receiptStatusRef',

      partNameList: [] // 품명

    }
  },
  computed: {
    popupGridInstance() {
      return this.GetDataGrid(this.receiptStatusRef)
    }
  },
  beforeMount() {

  },
  methods: {
    async open(data) {
      this.popVisible = data.popVisible // 팝업 띄우기
      let params = {
        comCode: data.comCode,
        facCode: data.facCode,
        ordNo: data.ordNo,
        lotNo: data.lotNo,
        partNo: data.partNo
      }
      getMat0012(params).then(res => {
        this.receiptStatusData = res.list
      })
    },
    closePopup() {
      this.receiptStatusData = []
      this.popVisible = false
    },
  }
}
</script>
<style scoped>
::v-deep .pop0310Popup .v-tab--active {
  border-bottom: 2px solid #455b59;
}

.btnClose {
  justify-content: right;
}
</style>