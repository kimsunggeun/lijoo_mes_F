<template>

    <DxPopup
      :visible.sync="popVisible"
      :show-close-button="true"
      :show-title="true"
      height="auto"
      width="1250px"
    >
      <v-row no-gutters class="popUpGrid">
        <i-card-vertical headerTitle="receivingInfoText">
          <template v-slot:body>
            <v-layout column>
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
                <DxColumn
                  data-field="comCode"
                  :caption="$t('comCode')"
                  width="auto"
                  data-type="string"
                  alignment="center"
                  :visible="false"
                  :allow-editing="false"
                />
                <!-- 등록일 -->
                <DxColumn 
                  data-field="regiDate" 
                  :caption="$t('regiDate')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  css-class="devest-grid-header-require" 
                  :allow-editing="false" 
                />
                <!-- 일련번호 -->
                <DxColumn 
                  data-field="ilno" 
                  :caption="$t('ilno')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 거래처코드 -->
                <DxColumn 
                  data-field="custCode" 
                  :caption="$t('custCode')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 품번 -->
                <DxColumn 
                  data-field="partNo" 
                  :caption="$t('partNo')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 품명 -->
                <DxColumn 
                  data-field="partName" 
                  :caption="$t('partName')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 입고구분 -->
                <DxColumn 
                  data-field="inType" 
                  :caption="$t('inType')"
                  width="auto" 
                  data-type="string"
                  alignment="center" 
                  :allow-editing="false" 
                >
                  <DxLookup 
                    :data-source="inTypeList"
                    display-expr="text" 
                    value-expr="value"
                  />
                </DxColumn>
                <!-- 입고유형 -->
                <DxColumn 
                  data-field="inCate" 
                  :caption="$t('inCate')"
                  width="auto" 
                  data-type="string"
                  alignment="center" 
                  :allow-editing="false" 
                >
                <DxLookup 
                  :data-source="inCateList"
                  display-expr="text" 
                  value-expr="value"
                />
                </DxColumn>
                <!-- 입고창고 -->
                <DxColumn 
                  data-field="inWh" 
                  :caption="$t('inWh')"
                  width="auto" 
                  data-type="string"
                  alignment="center" 
                  :allow-editing="false" 
                >
                  <DxLookup 
                    :data-source="inWhList"
                    display-expr="text" 
                    value-expr="value"
                  />
                </DxColumn>
                <!-- 입고량 -->
                <DxColumn 
                  data-field="inQty" 
                  :caption="$t('inQty')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 구성량 -->
                <DxColumn 
                  data-field="makeQty" 
                  :caption="$t('makeQty')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- BOX 수량 -->
                <DxColumn 
                  data-field="boxQty" 
                  :caption="$t('boxQty')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 비고 -->
                <DxColumn 
                  data-field="remark" 
                  :caption="$t('remark')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 등록자 -->
                <DxColumn 
                  data-field="maker" 
                  :caption="$t('maker')"
                  width="auto" 
                  data-type="string" 
                  alignment="center" 
                  :allow-editing="false" 
                />
                <!-- 등록일 -->
                <DxColumn 
                  data-field="makeDate" 
                  :caption="$t('makeDate')"
                  width="auto" 
                  data-type="date"
                  format="yyyy-MM-dd"
                  alignment="center" 
                  :allow-editing="false" 
                />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
            </v-layout>
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
import { getCmChildCode } from '@/api/system/cmCodeManage'

// API
import { getReceiptInfo } from '@/api/view/pop0030'
import { getComCode } from '@/utils/token'
import { getInWh } from '@/api/view/mat0013'


export default {
  name: 'pop0020Popup',
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxLookup,

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
      inTypeList:[], // 입고구분
      inCateList: [], // 입고유형
      partNameList: [], // 품명
      inWhList: [],

      openData: {}
    }
  },
  computed: {
    popupGridInstance() {
      return this.GetDataGrid(this.receiptStatusRef)
    }

  },

  watch: {
    popVisible() {
      this.comboListSet() // 조회
    }
  },

  methods: {
    async open(data) {
      this.popVisible = data.popVisible // 팝업 띄우기
      let cnt = 0
      this.openData = {
        comCode: data.comCode,
        facCode: data.facCode,
        custCode: data.custCode,
        partNo: data.partNo,
        lotNo: data.lotNo
      }
      getReceiptInfo(this.openData).then(res => {
        res.list.forEach((e) => {
          e.id = cnt++
        })
        this.receiptStatusData = res.list
      })
    },
    closePopup() {
      this.receiptStatusData = []
      this.popVisible = false
    },
    async comboListSet() {
      // 입고구분
      const inTypeData = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_TYPE',
      userFlag: 'Y'
      }
      getCmChildCode(inTypeData).then(res => {
        res.list.forEach(e => {
          this.inTypeList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })
      })

      // 입고유형
      const inCateData = {
        comCode: getComCode(),
        codegr: '',
        code: 'IN_CATE',
        userFlag: 'Y'
      }
      getCmChildCode(inCateData).then(res => {
        this.inCateList = res.list
        res.list.forEach(e => {
          this.inCateList.push({
            value: e.sysCode,
            text: e.sysName
          })
        })
      })
      //입고창고
      getInWh(this.openData).then(res => {
        res.list.forEach(e => {
          this.inWhList.push({
            value: e.inWh,
            text: e.inWhNm
          })
        })
      })
    },
  },
}
</script>
<style scoped>
::v-deep .pop0310Popup .v-tab--active {
  border-bottom: 2px solid #455b59;
}

.btnClose {
  justify-content: right;
}
.btnSearch {
  text-align: right;
}
.popUpGrid {
  justify-content: center;
}
</style>