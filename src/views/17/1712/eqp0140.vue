<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-value="facCode"
                    item-text="facName"
                    :items="comboBoxList.facCodeList"
                    v-model="searchValue.facCode"
                    :prepend-inner-icon="'$search'"
                    :label="$t('facName')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    item-value="code"
                    item-text="name"
                    :items="comboBoxList.meaGrList"
                    v-model="searchValue.meaGr"
                    :prepend-inner-icon="'$search'"
                    :label="$t('meaGp')"
                    dense
                    outlined
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    color="primary"
                    class="required mx-1"
                    v-model="searchValue.meaName"
                    :prepend-inner-icon="'$search'"
                    :label="$t('meaName')"
                    dense
                    outlined
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-menu
                    ref="DateCal"
                    v-model="calMenuState.corrDateCal"
                    :close-on-content-click="false"
                    max-width="290px"
                    min-width="auto"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="primary"
                        class="required mx-1"
                        :prepend-inner-icon="'$search'"
                        :label="$t('corrDate')"
                        v-model="searchValue.corrDate"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="searchValue.corrDate"
                      type="month"
                      @input="calMenuState.corrDateCal = false"
                      no-title
                      scrollable
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row no-gutters class="center pa-2 mr-0">
      <i-card-vertical style="color: black" headerTitle="meaCorrState">
        <template v-slot:body>
          <v-layout column>
            <v-col cols="12" class="pa-0">
              <DxDataGrid
                id="meaInfoGrid"
                class="listBox03"
                :ref="meaInfoGridRef"
                :data-source="meaInfoGrid"
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
                :disablePagination="false"
                :column-hiding-enabled="false"
                :column-auto-width="true"
              >
                <DxPaging :enabled="false" />
                <DxScrolling column-rendering-mode="virtual" />
                <DxSelection show-check-boxes-mode="none" />
                <DxPager :show-page-size-selector="false" />
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
                  data-field="blobUrl"
                  :caption="$t('icon')"
                  width="auto"
                  data-type="string"
                  alignment="centet"
                  :allow-editing="false"
                  cell-template="cellTemplate"
                />

                <DxColumn data-field="facCode" :caption="$t('facName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="meaGr" :caption="$t('meaGp')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="comboBoxList.meaGrList" display-expr="name" value-expr="code"></DxLookup>
                </DxColumn>
                <DxColumn data-field="meaCode" :caption="$t('meaCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="meaName" :caption="$t('meaName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="meaSpec" :caption="$t('meaSpec')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="meaGrade" :caption="$t('meaGrade')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="meaState" :caption="$t('meaState')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="comboBoxList.meaStateList" display-expr="name" value-expr="code"></DxLookup>
                </DxColumn>
                <DxColumn data-field="depCode" :caption="$t('depName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="name" :caption="$t('mName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="assNo" :caption="$t('assNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="proCompanny" :caption="$t('proCompanny')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                <DxColumn data-field="supCompanny" :caption="$t('supCompanny')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="manuDate" :caption="$t('manuDate')" width="auto" data-type="date" format="yyyy-MM-dd" alignment="center" :allow-editing="false" />
                <DxColumn data-field="purDate" :caption="$t('purDate')" width="auto" data-type="date" format="yyyy-MM-dd" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrYn" :caption="$t('corrYN')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" edit-cell-template="checkBoxEditor"/>
                <DxColumn data-field="corrAgency" :caption="$t('corrAgency')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrMonth" :caption="$t('corrMonth')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrDateOld" :caption="$t('corrPreDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrDate" :caption="$t('corrDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrDateNew" :caption="$t('corrNextDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrNo" :caption="$t('corrNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrJudge" :caption="$t('corrJudge')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                  <DxLookup :data-source="comboBoxList.corrJudgeList" display-expr="name" value-expr="code"></DxLookup>
                </DxColumn>
                <DxColumn data-field="corrReason" :caption="$t('corrReason')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrSdate" :caption="$t('corrsDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrEdate" :caption="$t('correDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrStd" :caption="$t('corrStd')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrMax" :caption="$t('corrMax')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="corrMin" :caption="$t('corrMin')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="modelNo" :caption="$t('modelNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" :allow-editing="false" edit-cell-template="checkBoxEditor"/>
                <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="makeDate" :caption="$t('makeDate')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editDate" :caption="$t('editDate')" data-type="string" alignment="center" :allow-editing="false" width="auto" />
                  <template #cellTemplate="{ data }">
                    <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" >
                  </template>
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                <DxColumn 
                  data-field="" 
                  caption="" 
                  data-type="string" 
                  alignment="center"
                  width="auto"
                  :allow-editing="false"
                />
              </DxDataGrid>
            </v-col>
          </v-layout>
        </template>
      </i-card-vertical>
    </v-row>
    <imagePopup ref="imagePopup"/>
  </v-container>
</template>

<script>
import { DxDataGrid, DxEditing, DxColumn, DxLookup, DxPager } from 'devextreme-vue/data-grid'
import DxButton from 'devextreme-vue/button'
import themes from 'devextreme/ui/themes'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getUserId, getComCode } from '@/utils/token'
import { getMonthFormat, getCurrentDate } from '@/utils/common.js'
import { getEqp0140 } from '@/api/view/eqp0140'
import { getFacilityInfoData } from '@/api/view/bas0036'
import imagePopup from '@/views/11/1112/popup/imagePopup'

export default {
  name: 'eqp0140',
  mixins: [baseview, BaseDataGrid],

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxPager,
    imagePopup
  },
  data() {
    return {
      uploadBtn: [],
      //검색 값
      searchValue: {
        comCode: getComCode(),
        facCode: '',
        meaGr: '',
        meaName: '',
        corrDate: getMonthFormat()
      },
      //콤보박스 및 룩업박스
      comboBoxList: {
        facCodeList: [],
        meaGrList: [],
        meaStateList: [],
        corrJudgeList: []
      },
      //캘린더
      calMenuState: {
        corrDateCal: false
      },
      listClickData: null,
      // 파일
      fileUploaderRef: 'fu',
      imgRef: 'popPdf',
      retryButtonVisible: false,
      fileName: '',
      blobUrl: '',
      //그리드 관련
      meaInfoGrid: [],
      corrInfoGrid: [],
      //그리드  Ref
      meaInfoGridRef: 'meaInfoGridRef',
      corrInfoGridRef: 'corrInfoGridRef',
      //로우헤더
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick'
    }
  },
  computed: {
    meaInfoGridInstance() {
      return this.GetDataGrid(this.meaInfoGridRef)
    },
    url() {
      return this.blobUrl
    }
  },
  methods: {
    imgClick(e) {//이미지 클릭 팝업
      this.$refs.imagePopup.open(e)
    },
    onClick() {
      this.fileUploader.reset()
      this.imageElement.setAttribute('src', '')
      this.retryButtonVisible = false
    },
    btnSearch() {
      this.doSearhmeaInfoGrid()
    },
    //계측기 마스터 테이블 조회
    doSearhmeaInfoGrid() {
      //초기화
      this.meaInfoGrid = []
      this.openLoading('searching')
      //파라미터
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeSelect,
        meaGr: this.searchValue.meaGr,
        meaName: this.searchValue.meaName,
        corrDate: this.searchValue.corrDate
      }
      //조회
      getEqp0140(params)
        .then(res => {
          console.log("레스렛스",res)
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
            if (e.insImage) {
              let binaryString = window.atob(e.imageBase64)
              let binaryLen = binaryString.length
              let bytes = new Uint8Array(binaryLen)
              for (let a = 0; a < binaryLen; a++) {
                let ascii = binaryString.charCodeAt(a)
                bytes[a] = ascii
              }
              let blob = new Blob([bytes], {
                type: e.contentType
              })
              e.blobUrl = URL.createObjectURL(blob) + '#view=fitH'
            }
          })

          this.meaInfoGrid = res.list
          // console.log('this.meaInfoGrid', this.meaInfoGrid)
        })
        .finally(() => {
          this.endLoading()
        })
    },
    async comboListSet() {
      let params = {
        comCode: getComCode(),
        code: 'MEA_GR,MEA_STATE,CORR_JUDGE,USER_YN'
      }
      //공장명 콤보박스
      getFactoryInfoData({ comCode: getComCode() })
        .then(res => {
          res.list.forEach(e => {
            this.comboBoxList.facCodeList.push({
              facCode: e.facCode,
              facName: e.facName
            })
          })
        })
        .finally(() => {
          this.searchValue.facCode = this.comboBoxList.facCodeList[0].facCode
        })

      //계측기그룹 콤보박스 및 룩업박스
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'MEA_GR') //계측기그룹
          .forEach(e => {
            this.comboBoxList.meaGrList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        //계측기 상태 룩업박스
        res.list
          .filter(word => word.code === 'MEA_STATE')
          .forEach(e => {
            this.comboBoxList.meaStateList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        //검교정판정 룩업박스
        res.list
          .filter(word => word.code === 'CORR_JUDGE') //검교정판정
          .forEach(e => {
            this.comboBoxList.corrJudgeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      })
    }
  },
  mounted() {},
  created() {
    // this.doSearhmeaInfoGrid()
  },
  beforeMount() {
    this.comboListSet()
  }
}
</script>
<style lang="less" scoped>
.uploadedImage {
  height: 100px;
  margin-left: 7px;
  margin-bottom: 7px;
  text-align: center;
}
</style>
