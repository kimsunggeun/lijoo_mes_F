<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch', //조회
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
                    :items="facCodeList"
                    v-model="searchFacCode"
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
                    :items="meaGrList"
                    v-model="searchMeaGrList"
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
                    v-model="searchMeaName"
                    :prepend-inner-icon="'$search'"
                    :label="$t('meaName')"
                    dense
                    outlined
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <!--
              <v-row no-gutters class="center pa-2 mr-0">
                <v-col cols="2">
                  <v-menu
                    ref="DateCal"
                    v-model="DateCal"
                    :close-on-content-click="false"
                    :return-value.sync="monDate"
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
                        v-model="monDate"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="monDate" type="month" no-title scrollable @input="dateInput"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              -->
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3" class="pa-2">
        <i-card-vertical style="color: black" headerTitle="meaInfo">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="meaInfoGrid"
                  class="listBox"
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
                  @focused-row-changed="listClick"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="true" />
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
                    data-field="facCode"
                    :caption="$t('facName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  >
                    <DxLookup
                      :data-source="facCodeList"
                      display-expr="facName"
                      value-expr="facCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="meaGr"
                    :group-index="0"
                    :caption="$t('meaGp')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="meaGrList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="meaCode"
                    :caption="$t('meaCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="meaName"
                    :caption="$t('meaName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="meaSpec"
                    :caption="$t('meaSpec')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="meaState"
                    :caption="$t('meaState')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="meaStateList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="corrMonth"
                    :caption="$t('corrMonth')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="corrPreDate"
                    :caption="$t('corrPreDate')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="corrNextDate"
                    :caption="$t('corrNextDate')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  />
                  <DxColumn width="auto" :allow-editing="false" />  
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="9" class="pa-2">
        <i-card-vertical
          headerTitle="corrInfo"
          :useBtnList="[
            'btnExcel', // 엑셀 다운로드
            'btnCorrection', //수정
            'btnAdd', //신규
            'btnDelete', //삭제
          ]"
          @btnExcel = "btnExcel()"
          @btnCorrection="btnCorrection()"
          @btnAdd="btnAdd()"
          @btnDelete="btnDelete()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="corrInfoGrid"
                  class="listBox"          
                  :ref="corrInfoGridRef"
                  :data-source="corrInfoGrid"
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
                  @focused-row-changed="listClick2"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                    <DxColumn 
                    data-field="blobUrl" 
                    :caption="$t('icon')" 
                    data-type="string" 
                    alignment="center" 
                    :allow-editing="false" 
                    cell-template="cellTemplate"
                    width="120px"
                     
                    />
                  <DxColumn
                    data-field="corrMonth"
                    :caption="$t('corrMonth')"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :visible="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="corrPreDate"
                    :caption="$t('corrPreDate')"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="corrDate"
                    :caption="$t('corrDate')"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="corrNo"
                    :caption="$t('corrNo')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="corrNextDate"
                    :caption="$t('corrNextDate')"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="corrAgency"
                    :caption="$t('corrAgency')"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="corrJudge"
                    :caption="$t('corrJudge')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  >
                    <DxLookup :data-source="corrJudgeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <DxColumn
                    data-field="corrReason"
                    :caption="$t('corrReason')"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                    width="500px"
                  />

                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    width="auto"
                  />
                  <DxColumn width="auto" :allow-editing="false" />                 
                  <template #cellTemplate="{ data }">
                    <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" >
                    <h4 class="noImageText" v-else>No Image</h4>
                  </template>
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                  <DxSelection show-check-boxes-mode="none" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <DxPopup 
      :dragEnabled="true" 
      :visible.sync="popVisible" 
      :title="$t('employeeInfo')"
      :show-close-button="true" 
      :show-title="true"  
      height="700px" 
      width="1000px"
    >
      <DxScrollView height="100%" width="100%">
        <v-row dense style="border-bottom: 1px solid black;">
          <v-col cols="auto">
            <span class="btnTextStyle">{{$t('mainItem')}}</span>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-form>
              <v-col cols="12">
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="6">
                    <span class="popupText">{{ $t('comCode') }} *</span>
                    <v-text-field v-model="comCode" dense outlined hide-details="auto" readonly
                    background-color="#fff2e0" />
                  </v-col>
                  <v-col cols="6">
                    <span class="popupText">{{ $t('facCode') }}</span>
                    <v-text-field v-model="facCode" dense outlined hide-details="auto" readonly
                    background-color="#fff2e0" />
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="6">
                    <span class="popupText">{{ $t('meaCode') }} *</span>
                    <v-text-field v-model="meaCode" dense outlined hide-details="auto" readonly
                    background-color="#fff2e0" />
                  </v-col>
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrMonth') }}</span>
                    <v-text-field v-model="corrMonth" dense outlined hide-details="auto" readonly/>
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrPreDate') }}</span>
                    <v-text-field v-model="corrDateOld" dense outlined hide-details="auto" readonly/>
                  </v-col>
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrDate') }} *</span>
                    <v-text-field v-model="corrDate" type="date" dense outlined hide-details="auto" @input="inputCorrDate"
                    background-color="#fff2e0" />
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrNo') }} *</span>
                    <v-text-field v-model="corrNo" dense outlined hide-details="auto"
                    background-color="#fff2e0" />
                  </v-col>
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrNextDate') }}</span>
                    <v-text-field v-model="corrDateNew" type="date" :min="corrDate" dense outlined hide-details="auto"/>
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrAgency') }}</span>
                    <v-text-field v-model="corrAgency" dense outlined hide-details="auto"/>
                  </v-col>
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrJudge') }}</span>
                    <v-autocomplete v-model="corrJudge" :items="corrJudgeList" item-value="code" item-text="name" dense outlined
                    />
                  </v-col>

                </v-row>
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="6">
                    <span class="popupText">{{ $t('corrReason') }}</span>
                    <v-text-field v-model="corrReason" dense outlined hide-details="auto"/>
                  </v-col>
                  <v-col cols="6">
                    <!-- 사용유무 -->
                    <span class="popupText">{{ $t('userFlag') }}</span>
                    <v-checkbox v-model="userFlag" :label="`${userFlag ? $t('use') : $t('unused')} `"></v-checkbox>
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: 10px;">
                  <v-col cols="12">
                    <span class="popupText">{{ $t('remark') }}</span>
                    <v-text-field v-model="remark" dense outlined hide-details="auto"/>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12">
                    <p class="popupText">{{ $t('icon') }}</p>
                    <DxFileUploader :ref="fileUploaderRef" :multiple="false" :select-button-text="$t('upload')"
                      :labelText="$t('dropFile')" accept="image/*" upload-mode="useForm" readyToUploadMessage=""
                      :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png', '.bmp', '.ico']" @value-changed="onValueChanged" />
                    <DxButton class="retryButton" text="Retry" :visible="retryButtonVisible" @click="onClick"/>
                    <div style="text-align: center;">
                      <iframe :ref="imgRef" frameborder="0" scrolling="auto" class="uploadedImage" :src="url"></iframe>
                    </div>
                  </v-col>
                </v-row>
                <v-row dense style="border-bottom: 1px solid black; margin-top: 10px;">
                  <v-col cols="auto">
                      <span class="btnTextStyle">{{ $t('registrantInfo') }}</span>
                  </v-col>
                <v-spacer />
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                      <span class="popupText">{{ $t('makeDate') }}</span>
                      <v-text-field v-model="makeDate" dense outlined hide-details="auto"
                      clearable readonly />
                  </v-col>
                  <v-col cols="6">
                      <span class="popupText">{{ $t('maker') }}</span>
                      <v-text-field v-model="maker" dense outlined hide-details="auto"
                      clearable readonly />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                      <span class="popupText">{{ $t('editDate') }}</span>
                      <v-text-field v-model="editDate" dense outlined hide-details="auto"
                      clearable readonly />
                  </v-col>
                  <v-col cols="6">
                      <span class="popupText">{{ $t('editor') }}</span>
                      <v-text-field v-model="editor" dense outlined hide-details="auto"
                      clearable readonly />
                  </v-col>
                </v-row>
              </v-col>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="right">
            <v-btn tile outlined  width="80px" class="releaseBtn" ref="cancelBtn" 
            @click="btnSave">
            <v-icon>$save</v-icon>{{$t('save')}}
            <!-- SAVE -->
            </v-btn>
            <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn"
            @click="close">
            <v-icon>$cancel</v-icon>{{$t('cancel')}}
            </v-btn>
          </v-col>
        </v-row>
      </DxScrollView>
    </DxPopup>
    <imagePopup ref="imagePopup"/>
  </v-container>
</template>

<script>
import { DxDataGrid, DxEditing, DxColumn, DxLookup, DxPager, DxGrouping, DxGroupPanel } from 'devextreme-vue/data-grid'
import { DxPopup } from 'devextreme-vue/popup';
import DxFileUploader from 'devextreme-vue/file-uploader'
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
import { DxScrollView } from "devextreme-vue/scroll-view";
import { getHeaderItem, getDetailItem, saveCorrItem, deleteCorrItem } from '@/api/view/eqp0070'
import imagePopup from '@/views/11/1112/popup/imagePopup'
export default {
  name: 'eqp0070',
  mixins: [baseview, BaseDataGrid],

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    DxPager,
    DxFileUploader,
    DxButton,
    DxPopup,
    DxScrollView,
    DxGrouping,
    DxGroupPanel,
    imagePopup
  },
  data() {
    return {
      //검색조건 관련
      searchFacCode: '',
      searchMeaGrList: '',
      searchMeaName: '',
      DateCal: '',
      monDate: getMonthFormat(new Date()),
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
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      autoExpandAll: true,
      //공통코드 콤보박스리스트
      facCodeList: [],
      meaGrList: [],
      corrJudgeList: [],
      corrYNList: [],
      meaStateList: [],

      popVisible: false,
      comCode: '',
      facCode: '',
      meaCode: '',
      corrMonth: '',
      corrDateOld: '',
      corrDate: '',
      corrNo: '',
      corrDateNew: '',
      corrAgency: '',
      corrJudge: '',
      corrReason: '',
      remark: '',
      userFlag: true,
      makeDate: '',
      maker: '',
      editDate: '',
      editor: '',
      created: true,
      modified: false,
      corrInfoData: []

    }
  },
  computed: {
    meaInfoGridInstance() {
      return this.GetDataGrid(this.meaInfoGridRef)
    },
    corrInfoGridInstance() {
      return this.GetDataGrid(this.corrInfoGridRef)
    },
    fileUploader: function() {
      return this.$refs[this.fileUploaderRef].instance
    },
    imageElement: function () {
      return this.$refs[this.imgRef];
    },
    url() {
      return this.blobUrl
    }
  },
  methods: {
    btnAdd() {
      if(this.listClickData === null || this.listClickData.length === 0){
        notify('계측기 마스터 데이터를 선택해 주십시오', 'error', 2000)
        return
      }
      this.popVisible= true
      this.comCode = this.listClickData.comCode
      this.facCode = this.listClickData.facCode,           //공장코드
      this.meaCode = this.listClickData.meaCode,           //계측기코드
      this.corrMonth = this.listClickData.corrMonth,        //검교정의뢰 주기(월)
      this.corrDateOld = this.listClickData.corrPreDate
      this.corrDate = '',                                 //검교정일
      this.corrNo  = '',                                  //검교정 차수
      this.corrDateNew = ''                               //차기 검교정일
      this.corrAgency = ''                                //검교정의뢰 기관
      this.corrJudge = ''                                 //검교정 판정
      this.corrReason = ''                                //판정사유
      this.remark = ''                                    //비고
      this.insImage = ''                                  //이미지
      this.userFlag = true                                //사용유무         
      this.fileModified = false
      this.created = true
      this.modified = false
    },
    // 저장
    async btnSave() {
 
      if (this.retryButtonVisible) {
        this.retryButtonVisible = false
      }
      if (!this.comCode || !this.facCode || !this.meaCode || !this.corrDate || !this.corrNo){
        this.vToastify(this.$t('필수항목 입력하세요 [회사코드, 공장코드, 계측기코드, 검교정일, 검교정 차수]'), 'warn')
        return
      }
      let messageGubun = ''
      let newRow = {
        file: this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null,
        data : [{
        comCode : this.listClickData.comCode,           //회사코드
        facCode : this.listClickData.facCode,           //공장코드
        meaCode : this.listClickData.meaCode,           //계측기코드
        corrMonth: this.listClickData.corrMonth,        //검교정의뢰 주기(월)
        corrDateOld: this.listClickData.corrPreDate,    //이전 검교정일
        corrDate: this.corrDate,          //검교정일
        corrNo: this.corrNo,              //검교정 차수
        corrDateNew: this.listClickData.corrNextDate,    //차기 검교정일
        corrAgency: this.corrAgency,      //검교정의뢰 기관
        corrJudge: this.corrJudge,        //검교정 판정
        corrReason: this.corrReason,      //판정사유
        remark: this.remark,              //비고
        insImage: this.insImage,          //이미지
        userFlag: this.userFlag == true ? 'Y' : 'N',          //사용유무
        makeDate: this.makeDate,          //등록일
        maker: this.maker,                 //등록자
        fileModified: this.fileUploader._files.length > 0 ? true : false,
        created: this.created,
        modified: this.modified
        }]
      }
      let data = newRow.data
      if (data[0].created === false) {
        messageGubun = 'doFixData'
        data[0].modified = true
      } else if (data[0].created === true) {
        messageGubun = 'doSaveData'
        data[0].modified = false
      }
      this.vToastifyPrompt(
        this.$t(messageGubun),
        'info',
        current => {
          this.openLoading()
          this.corrInfoGridInstance.beginUpdate()
          let datas = new FormData()
          if (newRow.file != null)
            datas.append('file', newRow.file)
          for (var key in data[0]) {
            datas.append(key, data[0][key])
            console.log("datas 확인", `${key}: ${datas.get(key)}`)
          }
          saveCorrItem(datas)
            .then(res => {
              let message = data[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.corrInfoGridInstance.endUpdate()
              this.doSearchcorrInfoGrid()
              this.popVisible = false
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    async btnDelete() {
      // 삭제
      let message = ''
      await this.corrInfoGridInstance.saveEditData()
      let selectedMainRows = await this.corrInfoGridInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.corrInfoGridInstance.beginUpdate()

          deleteCorrItem(selectedMainRows, true)
            .then(res => {
              this.doSearchcorrInfoGrid()
              notify(this.$t('deleted'), 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.corrInfoGridInstance.endUpdate()
              this.corrInfoGridInstance.clearSelection()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    onValueChanged(e) {
      if (e.value.length > 0) {
        if (e.value[0].type.substr(0, 5) != 'image') {
          this.onClick()
          notify('Image ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
          return
        }
        let reader = new FileReader();
        reader.onload = (args) => {
          this.insImage = e.value[0].name
          this.blobUrl = args.target.result
          this.imageElement.setAttribute('src', this.blobUrl);
        }
        reader.readAsDataURL(e.value[0] ? e.value[0] : this.blobUrl); // convert to base64 string

        this.retryButtonVisible = true
      }
    },
    listClick2(e){
      this.corrInfoData = []
      this.corrInfoData = e.row.data
    },
    btnCorrection(){
      if(this.corrInfoData.length === 0){
        notify('수정할 데이터를 선택해 주십시오', 'error', 3000)
        return;
      }
      var rowData = this.corrInfoData

      let messageGubun = ''
      //file = this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null,
      this.comCode = rowData.comCode           //회사코드
      this.facCode= rowData.facCode           //공장코드
      this.meaCode= rowData.meaCode           //계측기코드
      this.corrMonth= rowData.corrMonth        //검교정의뢰 주기(월)
      this.corrDateOld= rowData.corrPreDate    //이전 검교정일
      this.corrDate= rowData.corrDate          //검교정일
      this.corrNo= rowData.corrNo              //검교정 차수
      this.corrDateNew= rowData.corrNextDate    //차기 검교정일
      this.corrAgency= rowData.corrAgency      //검교정의뢰 기관
      this.corrJudge= rowData.corrJudge        //검교정 판정
      this.corrReason= rowData.corrReason      //판정사유
      this.remark= rowData.remark              //비고
      this.insImage= rowData.insImage          //이미지
      this.userFlag= rowData.userFlag == 'Y' ? true : false,          //사용유무
      this.makeDate= rowData.makeDate          //등록일
      this.maker= rowData.maker                //등록자
      this.fileModified= this.fileUploader._files.length > 0 ? true : false
      this.created= false
      this.modified= true
      this.popVisible = true
      // this.corrInfoGridInstance.option('focusedRowIndex', -1)
    },
    onClick() {
      this.fileUploader.reset()
      this.imageElement.setAttribute('src', '')
      this.retryButtonVisible = false
    },
    // onValueChanged(e) {
    //   console.log('onValueChanged')
    //   if (e.value.length > 0) {
    //     // if (e.value[0].type != 'application/pdf') {
    //     //   this.onClick()
    //     //   notify('PDF ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
    //     //   return
    //     // }

    //     let reader = new FileReader()
    //     reader.onload = args => {
    //       this.fileName = e.value[0].name
    //       this.blobUrl = args.target.result
    //       this.imageElement.setAttribute('src', this.blobUrl)
    //     }

    //     reader.readAsDataURL(e.value[0] ? e.value[0] : this.blobUrl + '#view=fitH&toolbar=0') // convert to base64 string
    //     this.retryButtonVisible = true
    //   }
    // },
    listClick(e) {
        this.listClickData = e.row.data
        this.doSearchcorrInfoGrid()
    },
    btnSearch() {
      this.doSearhmeaInfoGrid()
    },
    btnExcel(){
      let workSheet = this.$xlsx.utils.table_to_sheet(document.getElementById('corrInfoGrid'))
      
      workSheet['!cols'] = [{width: 10},{width: 13},{width: 10},{width: 13},{width: 16},{width: 10},{width: 16},{width: 12},{width: 10},{width: 13},{width: 12},{width: 13},{width: 12}]
      const workBook = this.$xlsx.utils.book_new()
      this.$xlsx.utils.book_append_sheet(workBook, workSheet, 'example')
      this.$xlsx.writeFile(workBook, '검교정 정보.xlsx')
    },
    dateInput(e){
      this.monDate = e
      this.DateCal = false
      this.$refs.DateCal.save(e)
    },
    inputCorrDate(e){
      if(new Date(this.corrDateNew) < new Date(e)){
        this.corrDateNew = this.corrDate
      }
    },
    //계측기 마스터 테이블 조회
    doSearhmeaInfoGrid() {
      console.log("게측기마스타ㅓ")
      this.meaInfoGrid = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
        meaGr: this.searchMeaGrList,
        meaName: this.searchMeaName,
        //corrDate: this.monDate
      }
      console.log("조회할때 파람",params)
      getHeaderItem(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
          })
          this.meaInfoGrid = res.list
        })
        .finally(() => {
          this.endLoading()
          this.meaInfoGridInstance.option('focusedRowIndex', 1)
          this.listClickData = this.meaInfoGrid[0]
          this.doSearchcorrInfoGrid() // 디테일 조회
        })
    },
    //계측기 검교정 테이블 조회
    doSearchcorrInfoGrid() {
      this.corrInfoGrid = []
      this.openLoading('searching')
      if(this.listClickData === undefined){
        this.endLoading()
        return
      }
      let params = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
        meaCode: this.listClickData.meaCode
      }
      getDetailItem(params)
        .then(res => {
          let cnt = 0
          res.list.forEach((e) => {
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
                type: e.contentType,
              })
              e.blobUrl = URL.createObjectURL(blob) + '#view=fitH'//&toolbar=0'
            }
          })
          this.corrInfoGrid = res.list
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


      // 공통코드 셋팅
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'MEA_GR') //계측기그룹
          .forEach(e => {
            this.meaGrList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'MEA_STATE') //계측기상태
          .forEach(e => {
            this.meaStateList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'CORR_JUDGE') //검교정판정
          .forEach(e => {
            this.corrJudgeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'USER_YN')
          .forEach(e => {
            this.corrYNList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
      })
    },
    imgClick(e) {//이미지 클릭 팝업
      this.$refs.imagePopup.open(e)
    },
    close(){
      this.popVisible = false
    }
  },
  async mounted() {
    //공장 셋팅
    await getFactoryInfoData({ comCode: getComCode() })
      .then(res => {
        res.list.forEach(e => {
          this.facCodeList.push({
            facCode: e.facCode,
            facName: e.facName
          })
        })
      })
      .finally(() => {
        this.searchFacCode = this.facCodeList[0].facCode
      })

  },

  created() { 
  },
  beforeMount() {
    this.comboListSet()
  }
}
</script>
<style lang="less" scoped>
.uploadedImage {
  width: 100px;
  height: 100px;
  object-fit: scale-down;
  // margin-left: 7px;
  // margin-bottom: 7px;
  // text-align: center;
}
.noImageText {
  width: 100px;
  height: 100px;
  display : flex;
  justify-content : center;
  align-items : center;
}
.btnTextStyle {
  color: '#000';
  font-size: '18px';
  letter-spacing: '0.5px';
  font-weight: 'bold';
  line-height: 1.8;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar {
  display: block !important;
}
::v-deep .dx-datagrid-header-panel .dx-toolbar .dx-toolbar-after {
  display: none !important;
}
.releaseBtn {
    background-color: rgb(135,155,119);
    margin-right: 6px;
    font-size: 12pt;
    color: white;
}
</style>