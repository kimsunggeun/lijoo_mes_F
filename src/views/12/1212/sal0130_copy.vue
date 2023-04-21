<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top class="d-md-flex" outlined :useBtnList="[
          'btnSearch', //조회
        ]" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                    item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="공장명" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                    item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="검사구분" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                    item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="거래처명" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                    item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="처리구분" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="mr-2">
                  <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                    item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="출하창고" dense outlined>
                  </v-autocomplete>
                </v-col>
                <v-row no-gutters >
                  <span class="fontWeight pt-3 ml-2 mr-2">출하일 : </span>
                  <v-col cols="12" md="2" class="pl-1 mt-2 mr-2">
                    <DxDateBox :value="reqDtFrom" :max="reqDtTo" display-format="yyyy-MM-dd" height="90%" @value-changed="e => { reqDtFrom = e.value && getDateFormat(e.value) }" />
                  </v-col>
                  <v-col cols="12" md="2" class="mt-2 mr-2">
                    <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                      item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="품목군" dense outlined>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="mt-2 mr-2">
                    <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                      item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="제품군" dense outlined>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="mt-2 mr-2">
                    <v-autocomplete :menu-props="{ offsetY: true }" color="primary" class="required mx-1 rounded-0"
                      item-text="matNm" item-value="" :prepend-inner-icon="$t('$search')" label="공장" dense outlined>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" class="mt-2 mr-2">
                    <v-text-field v-model="message1" :value="idSearch" label="품명" dense outlined hide-details="auto"
                      :prepend-inner-icon="$t('$search')" @change="changeInput" clearable />
                  </v-col>
                </v-row>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2">
        <i-card-vertical headerTitle="shptChk" :useBtnList="[
          'btnAdd', //신규
          'btnSave', //저장
          'btnDelete' //삭제
        ]" @btnAdd="btnAdd()" @btnSave="btnSave()" @btnDelete="btnDelete()">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid 
                  id="shptChkInfo" 
                  class="listBox03" 
                  :ref="shptChkInfoRef" 
                  :data-source="shptChkInfo"
                  :remote-operations="false" 
                  :hover-state-enabled="true" 
                  :allow-column-resizing="true"
                  :allow-column-reordering="true" 
                  :row-alternation-enabled="true" 
                  :show-borders="true"
                  :width="grid.width" 
                  :show-row-lines="true" key-expr="id" 
                  :focused-row-enabled="true"
                  :disablePagination="false" 
                  :column-hiding-enabled="false"
                  @editing-start="sal0022EditingStart"
                  >
                  <DxPaging :enabled="false" />
                  <DxSelection show-check-boxes-mode="always" mode="multiple" />

                  <DxColumn data-field="comCode" :caption="$t('comCode')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="facCode" :caption="$t('facCode')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false" />
                  <DxColumn data-field="ilNo" :caption="$t('ilNo')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false" />
                  <DxColumn data-field="no" :caption="$t('no')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false" />
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center"/>
                  <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false" />
                  <DxColumn data-field="insCode" :caption="$t('insCode')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false"/>
                  <DxColumn data-field="proCode" :caption="$t('proCode')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false"/>
                  <DxColumn data-field="insType" :caption="$t('insType')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false"/>
                  <DxColumn data-field="insMeth" :caption="$t('insMeth')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="jugCodeh" :caption="$t('jugCodeh')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="sampleQty1" :caption="$t('sampleQty1')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="sampleQty2" :caption="$t('sampleQty2')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="sampleQty3" :caption="$t('sampleQty3')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="sampleQty4" :caption="$t('sampleQty4')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="sampleQty5" :caption="$t('sampleQty5')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="remark" :caption="$t('remark')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="date" format="yyyy-MM-dd" alignment="center" />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="date" format="yyyy-MM-dd" alignment="center" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" />
                  
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import DxDateBox from 'devextreme-vue/date-box'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getshptChkInfoData } from '@/api/view/sal0022'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'

export default ({
  name: 'shptChk',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxDateBox,
  },
  data() {
    return {
      shptChkInfo: [],
      shptChkInfoRef: 'shptChkInfoRef',             //공장정보 
      reqDtFrom: getPreMonth(2),
      reqDtTo: getPreMonth(-2), 
      message1:''
    }
  },

  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.shptChkInfoRef)
    },

  },
  methods: {
    sal0022EditingStart(e){
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'ordNo' || e.column.dataField === 'ilNo' || e.column.dataField === 'no' || e.column.dataField === 'lotDetail' 
         || e.column.dataField === 'insCode' || e.column.dataField === 'proCode' || e.column.dataField === 'insType') {
          e.cancel = true
        }
      }
    },
    btnSearch() {
      this.doSearchMainList()
    },
    doSearchMainList(isProgress) {
      // this.openLoading('searching')
      // let params = {
      //   comCode: getComCode(),
      // }
      // getshptChkInfoData(params).then(res => {
      //   this.shptChkInfo = res.list
      // }).finally(() => {
      //   this.endLoading()
      // })
    },
    btnAdd() {
      let newRow = {
        id: this.shptChkInfo.length + 1,
        comCode: '',
        facCode: '',
        ordNo: '',
        ilNo: '',
        no: '',
        lotNo: '',
        lotDetail: '',
        insCode: '',
        proCode: '',
        insType:'',
        insMeth:'',
        jugCodeh:'',
        sampleQty1:'',
        sampleQty2: '',
        sampleQty3: '',
        sampleQty4: '',
        sampleQty5: '',
        remark:'',
        makeDate: getCurrentDate(),
        maker: '',
        editDate: getCurrentDate(),
        editor: '',
        State: '',
        __created__: true,
        __modified__: false
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', 1)
    },
    async btnSave() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      let messageGubun = ''
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      //유효성 체크
      for (var row of selectedMainRows) {
        console.log(selectedMainRows)
        if (!row.ordNo || !row.ilNo || !row.no || !row.lotDetail || !row.insCode || !row.proCode || !row.insType) {
          this.vToastify('필수항목 입력하세요.[수주번호, 일련번호, 출하순번, 출하전산번호, 검사유형 코드, 공정코드, 검사항목 코드]', 'warn')
          return
        }
        if (row.__created__ === false) {
          messageGubun = 'doFixData'
          row.__modified__ = true
          row.comCode = getComCode()
          row.editor = getUserId()
        } else if (row.__created__ === true) {
          messageGubun = 'doSaveData'
          row.comCode = getComCode()
          row.maker = getUserId()
        }
      }
      this.vToastifyPrompt(
        this.$t(messageGubun),
        'info',
        // current => {
        //   this.openLoading()
        //   this.gridMainInstance.beginUpdate()
        //   saveWmsPurchasingOrderManageMain(selectedMainRows, true)
        //     .then(res => {
        //       this.doSearchMain(false)
        //     })
        //     .finally(() => {
        //       this.gridMainInstance.endUpdate()
        //       this.doSearchMainList()
        //       this.endLoading()
        //     })
        // },
        null,
        true
      )
    }
  }
})
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
