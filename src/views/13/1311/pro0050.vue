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
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="facCodeSelect"
                    :label="$t('facName')"
                    :items="facCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :prepend-inner-icon="'$search'"
                    :label="$t('workNo')"
                    v-model="workNo"
                    dense
                    outlined
                    color="primary"
                    class="required mx-1"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="frPlanDateCal"
                    v-model="frPlanDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$search'"
                        :label="$t('orderDate')"
                        v-model="frPlanDate"
                        dense
                        outlined
                        color="primary"
                        class="required mx-1"
                        clearable
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="frPlanDate"
                      no-title
                      @input="frPlanDateCal = false"
                      :day-format="(date) => { return new Date(date).getDate(); }"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-menu
                    ref="ttoPlanDateCal"
                    v-model="toPlanDateCal"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :prepend-inner-icon="'$search'"
                        :label="$t('endDate')"
                        v-model="toPlanDate"
                        dense
                        outlined
                        color="primary"
                        class="required mx-1"
                        clearable
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="toPlanDate"
                      :min="frPlanDate"
                      no-title
                      @input="toPlanDateCal = false"
                      :day-format="(date) => { return new Date(date).getDate(); }"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="12" class="pa-2 pr-2">
        <i-card-vertical
          headerTitle="workOrderManagement"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete',
            'btnConfirm',
            'btnCancel',
            'btnHold',
            'btnExit'
          ]"
          @btnAdd="btnAdd('작업지시관리')"
          @btnSave="btnSave('작업지시관리')"
          @btnDelete="btnDelete('작업지시관리')"
          @btnConfirm="btnConfirm()"
          @btnCancel="btnCancel()"
          @btnHold="btnHold()"
          @btnExit="btnExit()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="mainGrid"
                  class="listBox"
                  :ref="mainGridRef"
                  :data-source="mainGrid"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  :column-auto-width="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @editing-start="editingStart"
                  @editor-preparing="overrideOnValueChanged"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" mode="multiple" />

                  <DxPager :show-page-size-selector="false" />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  >
                    <DxLookup :data-source="facCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="planDate"
                    :caption="$t('orderDate')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="workDate"
                    :caption="$t('workDate')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="workNo"
                    :caption="$t('workNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="planNo"
                    width="auto"
                    :caption="$t('planNo')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="pathName"
                    width="auto"
                    :caption="$t('pathTypeName')"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="workCode"
                    :caption="$t('workCode')"
                    width="auto"
                    :visible="false"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  ></DxColumn>
                  <DxColumn
                    data-field="workName"
                    :caption="$t('workName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  ></DxColumn>

                  <DxColumn
                    data-field="workDecode"
                    :visible="false"
                    :caption="$t('workDecode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="workDeName"
                    :caption="$t('workDename')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="orderState"
                    :caption="$t('orderStateName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="orderStateList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="priCode"
                    :caption="$t('priority')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  >
                    <DxLookup :data-source="priCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="pathCode"
                    :visible="false"
                    :caption="$t('pathCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="workCrew"
                    width="auto"
                    :caption="$t('workCrewName')"
                    data-type="string"
                    alignment="center"
                  >
                    <DxLookup :data-source="workCrewList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="partType"
                    :caption="$t('partType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="partTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="itemType"
                    :caption="$t('itemType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  >
                    <DxLookup :data-source="itemTypeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="orderQty"
                    :caption="$t('orderQty')"
                    :customize-text="customizeText"
                    width="auto"
                    data-type="number"
                    alignment="right"
                  />
                  <DxColumn
                    data-field="lotNo"
                    :caption="$t('lotNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="remark"
                    :caption="$t('remark')"
                    width="500"
                    data-type="string"
                    alignment="center"
                  />

                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
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
      </v-col>
    </v-row>
    <DxPopup
      :visible.sync="itemPopup"
      :show-close-button="true"
      :show-title="true"
      title="품목정보 선택"
      height="auto"
      width="40%"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGridRef"
                  :data-source="popupInfoGrid"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @CellDblClick="popListDbClickPart"
                >
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partTypeNm"
                    :caption="$t('partTypeNm')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="itemTypeNm"
                    :caption="$t('itemTypeNm')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partSpec"
                    :caption="$t('partSpec')"
                    data-type="string"
                    alignment="center"
                    :min-width="150"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection
                    select-all-mode="allMode"
                    :show-check-boxes-mode="checkBoxesMode"
                    mode="multiple"
                  />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="insertData()"
          >{{ $t('choice') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="cancelBtn"
            @click="itemPopup = false"
          >{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <DxPopup
      :visible.sync="itemPopup2"
      :show-close-button="true"
      :show-title="true"
      :title="$t('pathName')"
      height="auto"
      width="40%"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText2">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGrid2Ref"
                  :data-source="popupInfoGrid2"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @CellDblClick="popListDbClickPath"
                >
                  <DxColumn
                    data-field="pathCode"
                    :caption="$t('pathCode')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="pathTypeNM"
                    :caption="$t('pathTypeName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="pathName"
                    :caption="$t('pathName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="pathType"
                    :caption="$t('pathType')"
                    data-type="string"
                    alignment="center"
                    :visible="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection
                    select-all-mode="allMode"
                    :show-check-boxes-mode="checkBoxesMode"
                    mode="multiple"
                  />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="pathInsert()"
          >{{ $t('choice') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="cancelBtn"
            @click="itemPopup2 = false"
          >{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <DxPopup
      :visible.sync="itemPopup3"
      :show-close-button="true"
      :show-title="true"
      :title="$t('workDename')"
      height="auto"
      width="70%"
      max-width="400px"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText3">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGrid3Ref"
                  :data-source="popupInfoGrid3"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @CellDblClick="popListDbClickItem"
                >
                  <DxColumn
                    data-field="workDename"
                    :caption="$t('workDename')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection
                    select-all-mode="allMode"
                    :show-check-boxes-mode="checkBoxesMode"
                    mode="multiple"
                  />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="workInsert()"
          >{{ $t('choice') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="cancelBtn"
            @click="itemPopup3 = false"
          >{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <DxPopup
      :visible.sync="itemPopup4"
      :show-close-button="true"
      :show-title="true"
      :title="$t('workName')"
      height="auto"
      width="70%"
      max-width="400px"
    >
      <v-row no-gutters>
        <v-col>
          <i-card-vertical :headerTitle="popupHeaderText4">
            <template v-slot:body>
              <v-col column>
                <DxDataGrid
                  id="itemInfo"
                  class="doubleListBox08"
                  :ref="popupInfoGrid4Ref"
                  :data-source="popupInfoGrid4"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :column-auto-width="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @CellDblClick="popListDbClickItem2"
                >
                  <DxColumn
                    data-field="workName"
                    :caption="$t('workName')"
                    data-type="string"
                    alignment="center"
                    :min-width="170"
                    width="auto"
                    :allow-editing="false"
                  />

                  <DxPaging :enabled="false" />
                  <DxSelection
                    select-all-mode="allMode"
                    :show-check-boxes-mode="checkBoxesMode"
                    mode="multiple"
                  />

                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="workInsert2()"
          >{{ $t('choice') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="cancelBtn"
            @click="itemPopup4 = false"
          >{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
  </v-container>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import themes from 'devextreme/ui/themes'
import { DxDataGrid, DxColumn, DxPager, DxLookup } from 'devextreme-vue/data-grid'

import baseview from '@/components/base/baseview.vue' // base page 추가

import notify from 'devextreme/ui/notify' // message
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxPopup } from 'devextreme-vue/popup'
import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드
import { getUserId, getComCode } from '@/utils/token' //토큰
import { getCmChildCode } from '@/api/system/cmCodeManage' //공통코드
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

import {
  getPro0050,
  createPro0050,
  delPro0050,
  getPartInfo,
  getPathInfo,
  getBas0034,
  getBas0035,
  ordState,
  getPathWorkInfo
} from '@/api/view/pro0050'
export default {
  name: 'pro0050',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    DxPager,
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxPopup
  },
  data() {
    return {
      //콤보박스
      facCodeList: [],
      frPlanDateCal: false,
      toPlanDateCal: false,
      frPlanDate: getDateFormat(new Date()),
      toPlanDate: getDateFormat(new Date()),
      orderStateList: [],
      priCodeList: [],
      pathCodeList: [],
      workCrewList: [],
      workCodeList: [],
      workDecodeList: [],
      partTypeList: [],
      itemTypeList: [],

      popupDataPart: [],
      popupDataPath: [],
      popupDataItem: [],
      popupDataItem2: [],

      //검색조건
      facCodeSelect: '',
      workNo: '',
      //그리드데이터
      mainGrid: [],
      popupInfoGrid: [],
      popupInfoGrid2: [],
      popupInfoGrid3: [],
      popupInfoGrid4: [],
      //팝업
      itemPopup: false, //팝업 상태관리
      itemPopup2: false,
      itemPopup3: false,
      itemPopup4: false,
      popupHeaderText: null, //팝업 타이틀
      popupHeaderText2: null,
      popupHeaderText3: null,
      popupHeaderText4: null,
      targetRow: {},
      clickPartNo: null,
      //ref
      mainGridRef: 'mainGridRef',
      popupInfoGridRef: 'popupInfoGridRef',
      popupInfoGrid2Ref: 'popupInfoGrid2Ref',
      popupInfoGrid3Ref: 'popupInfoGrid3Ref',
      popupInfoGrid4Ref: 'popupInfoGrid4Ref',
      changeValue: [],
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick'
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.mainGridRef)
    },
    popupInfoGridInstance() {
      return this.GetDataGrid(this.popupInfoGridRef)
    },
    popupInfoGridInstance2() {
      return this.GetDataGrid(this.popupInfoGrid2Ref)
    },
    popupInfoGridInstance3() {
      return this.GetDataGrid(this.popupInfoGrid3Ref)
    },
    popupInfoGridInstance4() {
      return this.GetDataGrid(this.popupInfoGrid4Ref)
    }
  },
  watch: {
    changeValue: function() {
      this.gridMainInstance.cellValue(this.changeValue[0].row.rowIndex, 'workDecode', '')
      this.gridMainInstance.cellValue(this.changeValue[0].row.rowIndex, 'workDeName', '')
    }
  },
  methods: {
    async popListDbClickPart(e) {
      this.popupDataPart = e

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)

      let params = {
        comCode: getComCode(),
        partNo: this.popupDataPart.data.partNo
      }
      let resArray = await getPathInfo(params)

      if (resArray.list.length !== 0) {
        let copyPathName = ''
        let mainPath = resArray.list.find(word => word.pathType === '01')
        if (mainPath) {
          copyPathName = mainPath.pathName
        } else {
          copyPathName = resArray.list[0].pathName
        }
        this.gridMainInstance.cellValue(rowIndex, 'pathName', copyPathName)
      }

      let copyPartName = this.popupDataPart.data.partName
      let copyPartNo = this.popupDataPart.data.partNo
      let copyPathCode = this.popupDataPart.data.pathCode

      let copyPartType = this.popupDataPart.data.partType
      let copyItemType = this.popupDataPart.data.itemType

      this.gridMainInstance.cellValue(rowIndex, 'partName', copyPartName)
      this.gridMainInstance.cellValue(rowIndex, 'partNo', copyPartNo)
      this.gridMainInstance.cellValue(rowIndex, 'pathCode', copyPathCode)

      this.gridMainInstance.cellValue(rowIndex, 'partType', copyPartType)
      this.gridMainInstance.cellValue(rowIndex, 'itemType', copyItemType)
      this.itemPopup = false
      this.gridMainInstance.saveEditData()
    },
    async popListDbClickPath(e) {
      this.popupDataPath = e
      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)

      this.gridMainInstance.cellValue(rowIndex, 'pathCode', this.popupDataPath.data.pathCode)
      this.gridMainInstance.cellValue(rowIndex, 'pathCode', this.popupDataPath.data.pathCode)
      this.gridMainInstance.cellValue(rowIndex, 'pathType', this.popupDataPath.data.pathType)
      this.gridMainInstance.cellValue(rowIndex, 'pathName', this.popupDataPath.data.pathName)
      this.itemPopup2 = false
    },
    async popListDbClickItem(e) {
      this.popupDataItem = e

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workDecode', this.popupDataItem.data.workDeCode)
      this.gridMainInstance.cellValue(rowIndex, 'workDeName', this.popupDataItem.data.workDename)
      this.itemPopup3 = false
    },
    async popListDbClickItem2(e) {
      this.popupDataItem2 = e

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workName', this.popupDataItem2.data.workName)
      this.gridMainInstance.cellValue(rowIndex, 'workCode', this.popupDataItem2.data.workCode)
      this.itemPopup4 = false
    },

    //보류
    async btnHold() {
      let message = ''
      let param = []
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //진행상태에서만 보류 가능하도록
      for (let i = 0; i < selectedMainRows.length; i++) {
        if (selectedMainRows[i].orderState != '30') {
          notify('진행상태에서만 보류 가능합니다.', 'error', 1500)
          return
        }
      }
      //유효성 체크
      for (let row of selectedMainRows) {
        if (row.__created__ === true) {
          this.vToastify(`${this.$t('requiredCheck')}[${this.$t('facCode')}]`, 'warn')
          return
        }
        let object = {
          comCode: row.comCode,
          facCode: row.facCode,
          workNo: row.workNo,
          workCode: row.workCode,
          orderState: row.orderState,
          btnOrderState: '40'
        }
        param.push(object)
      }
      this.vToastifyPrompt(
        this.$t('holdCheck'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()

          ordState(param, true)
            .then(res => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify('보류되었습니다', 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.listClickData = selectedMainRows[0]
              this.doSearhMainGrid()
            })
        },
        null,
        true
      )
    },
    //강제종료
    async btnExit() {
      let message = ''
      let param = []
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      //생성 또는 확정 상태일때 강제종료 x
      if (selectedMainRows[0].orderState === '10') {
        notify('강제종료는 진행 또는 보류 상태에서만 가능합니다.', 'error', 1500)
        return
      }
      if (selectedMainRows[0].orderState === '20') {
        notify('강제종료는 진행 또는 보류 상태에서만 가능합니다.', 'error', 1500)
        return
      }

      //유효성 체크
      for (let row of selectedMainRows) {
        if (row.__created__ === true) {
          this.vToastify(`${this.$t('requiredCheck')}[${this.$t('facCode')}]`, 'warn')
          return
        }

        let object = {
          comCode: row.comCode,
          facCode: row.facCode,
          workNo: row.workNo,
          workCode: row.workCode,
          orderState: row.orderState,
          btnOrderState: '50'
        }
        param.push(object)
      }
      this.vToastifyPrompt(
        this.$t('exitCheck'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()

          ordState(param, true)
            .then(res => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify('강제종료 되었습니다.', 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.listClickData = selectedMainRows[0]
              this.doSearhMainGrid()
            })
        },
        null,
        true
      )
    },
    //확정
    async btnConfirm() {
      let message = ''
      let param = []
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      for (let i = 0; i < selectedMainRows.length; i++) {
        if (selectedMainRows[i].orderState != '10') {
          notify('생성상태에서만 확정할 수 있습니다.', 'error', 1500)
          return
        }
      }
      //유효성 체크
      for (let row of selectedMainRows) {
        if (row.__created__ === true) {
          this.vToastify(`${this.$t('requiredCheck')}[${this.$t('facCode')}]`, 'warn')
          return
        }
        let object = {
          comCode: row.comCode,
          facCode: row.facCode,
          workNo: row.workNo,
          workCode: row.workCode,
          orderState: row.orderState,
          btnOrderState: '20'
        }
        param.push(object)
      }
      this.vToastifyPrompt(
        this.$t('doConfirmData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          ordState(param, true)
            .then(res => {
              //  message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify('확정되었습니다.', 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.listClickData = selectedMainRows[0]
              this.doSearhMainGrid()
            })
        },
        null,
        true
      )
    },
    //취소
    async btnCancel() {
      let message = ''
      let parameter = []
      let param = await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //취소는 확정상태일때만 가능하도록 -> 확정에서 취소시 생성으로 변경
      for (let i = 0; i < selectedMainRows.length; i++) {
        if (selectedMainRows[i].orderState != '20') {
          notify('확정상태에서만 취소 가능합니다.', 'error', 1500)
          return
        }
      }

      //유효성 체크
      for (let row of selectedMainRows) {
        if (row.__created__ === true) {
          this.vToastify(`${this.$t('requiredCheck')}[${this.$t('facCode')}]`, 'warn')
          return
        }
        let object = {
          comCode: row.comCode,
          facCode: row.facCode,
          workNo: row.workNo,
          workCode: row.workCode,
          orderState: row.orderState,
          btnOrderState: '99'
        }
        parameter.push(object)
      }
      this.vToastifyPrompt(
        this.$t('cancleCheck'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()

          ordState(parameter, true)
            .then(res => {
              this.doSearhMainGrid(false)
              //message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify('취소되었습니다.', 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.listClickData = selectedMainRows[0]
              this.doSearhMainGrid()
            })
        },
        null,
        true
      )
    },
    //값변경 감지
    overrideOnValueChanged(e) {
      if (e.dataField == 'workCode' || e.dataField == 'facCode') {
        const a = this.changeValue
        const onValueChanged = e.editorOptions.onValueChanged
        e.editorOptions.onValueChanged = function(args) {
          onValueChanged.apply(this, arguments)
          a.pop()
          a.push(e)
        }
      }
    },
    //작업반 삽입
    async workInsert() {
      let selectedRows = await this.popupInfoGridInstance3.getSelectedRowsData()

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workDecode', selectedRows[0].workDeCode)
      this.gridMainInstance.cellValue(rowIndex, 'workDeName', selectedRows[0].workDename)
      this.itemPopup3 = false
    },
    async workInsert2() {
      let selectedRows = await this.popupInfoGridInstance4.getSelectedRowsData()

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)
      this.gridMainInstance.cellValue(rowIndex, 'workName', selectedRows[0].workName)
      this.gridMainInstance.cellValue(rowIndex, 'workCode', selectedRows[0].workCode)
      this.itemPopup4 = false
    },
    //경로 삽입
    async pathInsert() {
      let selectedRows = await this.popupInfoGridInstance2.getSelectedRowsData()
      if (!selectedRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)

      let selectData = selectedRows[0]
      this.gridMainInstance.cellValue(rowIndex, 'pathCode', selectData.pathCode)
      this.gridMainInstance.cellValue(rowIndex, 'pathCode', selectData.pathCode)
      this.gridMainInstance.cellValue(rowIndex, 'pathType', selectData.pathType)
      this.gridMainInstance.cellValue(rowIndex, 'pathName', selectData.pathName)
      this.itemPopup2 = false
    },
    //품번 삽입
    async insertData() {
      let selectedRows = await this.popupInfoGridInstance.getSelectedRowsData()
      if (!selectedRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      let rowIndex = this.gridMainInstance.getRowIndexByKey(this.targetRow.key)

      let insertData = selectedRows[0]
      let params = {
        comCode: getComCode(),
        partNo: insertData.partNo
      }
      let resArray = await getPathInfo(params)

      if (resArray.list.length !== 0) {
        let copyPathName = ''
        let mainPath = resArray.list.find(word => word.pathType === '01')
        if (mainPath) {
          copyPathName = mainPath.pathName
        } else {
          copyPathName = resArray.list[0].pathName
        }
        this.gridMainInstance.cellValue(rowIndex, 'pathName', copyPathName)
      }

      let copyPartName = insertData.partName
      let copyPartNo = insertData.partNo
      let copyPathCode = insertData.pathCode

      let copyPartType = insertData.partType
      let copyItemType = insertData.itemType

      this.gridMainInstance.cellValue(rowIndex, 'partName', copyPartName)
      this.gridMainInstance.cellValue(rowIndex, 'partNo', copyPartNo)
      this.gridMainInstance.cellValue(rowIndex, 'pathCode', copyPathCode)

      this.gridMainInstance.cellValue(rowIndex, 'partType', copyPartType)
      this.gridMainInstance.cellValue(rowIndex, 'itemType', copyItemType)
      this.itemPopup = false
      this.gridMainInstance.saveEditData()
    },
    async pathSet(partNo, partName) {
      this.popupHeaderText2 = `[${partNo}]${partName}`
      this.itemPopup2 = true
      this.clickPartNo = partNo

      let params = {
        comCode: getComCode(),
        partNo: this.clickPartNo
      }
      let resArray = await getPathInfo(params)
      let cont = 0
      resArray.list.forEach(e => {
        e.id = cont++
      })
      this.popupInfoGrid2 = resArray.list
      this.popupInfoGrid2.clearSelection()
    },
    //편집제어
    async editingStart(e) {
      console.log('eeeee', e)
      this.gridMainInstance.saveEditData()
      this.targetRow = e
      if (e.column.dataField === 'workDeName') {
        //작업반명 수정불가
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
          e.cancel = true
          return
        }
      }
      if (e.column.dataField === 'workName') {
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
          e.cancel = true
          return
        }
      }
      if (e.column.dataField === 'orderQty') {
        //작업반명 수정불가
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
          e.cancel = true
          return
        }
      }
      if (e.column.dataField === 'priCode') {
        //우선순위 수정불가
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
          e.cancel = true
        }
      }
      if (e.column.dataField === 'workName') {
        e.cancel = true
        if (e.data.pathCode === '') {
          notify(`${this.$t('pathTypeCheck')}`, 'error', 1500)
        } else {
          let params = {
            comCode: getComCode(),
            facCode: e.data.facCode,
            pathCode: e.data.pathCode
          }
          let resData = await getPathWorkInfo(params)
          let cnt = 0
          resData.list.forEach(e => {
            e.id = cnt++
          })

          this.itemPopup4 = true
          this.popupInfoGrid4 = [...resData.list]
        }
      }
      if (e.column.dataField === 'workDeName') {
        e.cancel = true
        if (e.data.workCode === '' || e.data.facCode === '') {
          notify(`${this.$t('requiredCheck')} [${this.$t('facName')}, ${this.$t('workName')}]`, 'error', 1500)
        } else {
          let params = {
            comCode: getComCode(),
            facCode: e.data.facCode,
            workCode: e.data.workCode
          }
          let resData = await getBas0035(params)
          let cnt = 0
          resData.list.forEach(e => {
            e.id = cnt++
          })

          this.itemPopup3 = true
          this.popupInfoGrid3 = [...resData.list]
        }
      }
      if (
        e.column.dataField === 'partNo' ||
        e.column.dataField === 'partName' ||
        e.column.dataField === 'partType' ||
        e.column.dataField === 'itemType'
      ) {
        //상태값 제어
        if (e.data.orderState === '' || e.data.orderState === '10') {
          this.popupInfoGrid = []
          this.popupInfoGridInstance.clearSelection()
          e.cancel = true
          this.itemPopup = true
          let params = {
            comCode: getComCode()
          }
          let resData = await getPartInfo(params)

          let cont = 0
          //대표경로 없는거 걸러내기
          const filterArray = resData.list.filter(word => word.pathCode !== null)
          filterArray.forEach(e => {
            e.id = cont++
          })

          this.popupInfoGrid = [...filterArray]
        } else {
          e.cancel = true
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
        }
      }
      if (e.column.dataField === 'workCrew') {
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
          e.cancel = true
        }
      }
      if (e.column.dataField === 'workName') {
        //작업장명 수정불가
        if (!(e.data.orderState === '' || e.data.orderState === '10')) {
          notify(this.$t('orderStateCheckUpdate'), 'error', 1500)
          e.cancel = true
        }
      }
      if (e.column.dataField === 'pathName') {
        if (e.data.partNo === '') {
          notify(this.$t('partNoCheck'), 'error', 1500)
        } else {
          if (e.data.orderState === '' || e.data.orderState === '10') {
            this.pathSet(e.data.partNo, e.data.partName)
          } else {
            notify(this.$t('orderStateCheck'), 'error', 1500)
            e.cancel = true
          }
        }
        e.cancel = true
      }
    },
    //숫자 포메터
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    // row추가
    btnAdd() {
      let newRow = {
        id: this.mainGrid.length + 1,
        comCode: getComCode(),
        facCode: this.facCodeList[0].value,
        workNo: '',
        planDate: new Date().toISOString().substr(0, 10),
        workDate: '',
        workCode: '',
        workDecode: '',
        orderState: '',
        priCode: '10',
        pathCode: '',
        workCrew: '10',
        partNo: '',
        partName: '',
        partType: '',
        partTypeNm: '',
        itemType: '',
        itemTypeNm: '',
        orderQty: 0,
        lotNo: '',
        remark: '',
        planNo: '',
        makeDate: '',
        maker: '',
        editor: '',
        __created__: true,
        __modified__: false
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', -1)
      this.gridMainInstance.saveEditData()
    },
    // 저장버튼
    async btnSave() {
      let message = ''
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //유효성 체크
      for (let row of selectedMainRows) {
        if (!row.facCode || !row.workCode || !row.workDecode || !row.partNo) {
          this.vToastify(`${this.$t('requiredCheck')}[${this.$t('facCode')}]`, 'warn')
          return
        }
        if (row.__created__ !== true) {
          row.__modified__ = true
          row.editor = getUserId()
        }
        row.planDate = row.planDate.substr(0, 10)
        row.workDate = row.workDate.substr(0, 10)
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()

          createPro0050(selectedMainRows, true)
            .then(res => {
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify('저장되었습니다.', 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.listClickData = selectedMainRows[0]
              this.doSearhMainGrid()
            })
        },
        null,
        true
      )
    },
    //삭제버튼
    async btnDelete() {
      let message = ''
      await this.gridMainInstance.saveEditData()
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      //삭제는 생성상태에서만 가능하도록
      if (selectedMainRows[0].orderState === '20') {
        notify('생성상태에서만 삭제 할 수 있습니다.', 'error', 1500)
        return
      }
      if (selectedMainRows[0].orderState === '30') {
        notify('생성상태에서만 삭제 할 수 있습니다.', 'error', 1500)
        return
      }
      if (selectedMainRows[0].orderState === '40') {
        notify('생성상태에서만 삭제 할 수 있습니다.', 'error', 1500)
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()

          delPro0050(selectedMainRows, true)
            .then(res => {
              this.doSearhMainGrid(false)
              message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
              notify('삭제되었습니다.', 'success', 1500)
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.gridMainInstance.saveEditData()
              this.gridMainInstance.option('focusedRowKey', undefined)
              this.gridMainInstance.clearSelection()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //검색버튼
    btnSearch() {
      this.doSearhMainGrid()
    },
    //콤보배열셋팅
    async comboListSet() {
      try {
        let facRes = await getFactoryInfoData({ comCode: getComCode() })
        facRes.list.forEach(e => {
          this.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
        })
        this.facCodeSelect = this.facCodeList[0].value
        let params = {
          comCode: getComCode(),
          codegr: '',
          code: 'ORDER_STATE,PRI_CODE,WORK_CREW,PART_TYPE,ITEM_TYPE'
        }
        let commonCodeList = await getCmChildCode(params)
        commonCodeList.list
          .filter(word => word.code === 'ORDER_STATE' && word.codegr === 'PRO')
          .forEach(e => {
            this.orderStateList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
        commonCodeList.list
          .filter(word => word.code === 'PRI_CODE' && word.codegr === 'PRO')
          .forEach(e => {
            this.priCodeList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
        commonCodeList.list
          .filter(word => word.code === 'WORK_CREW' && word.codegr === 'PRO')
          .forEach(e => {
            this.workCrewList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })

        commonCodeList.list
          .filter(word => word.code === 'PART_TYPE' && word.codegr === 'COM')
          .forEach(e => {
            this.partTypeList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
        commonCodeList.list
          .filter(word => word.code === 'ITEM_TYPE' && word.codegr === 'COM')
          .forEach(e => {
            this.itemTypeList.push({
              value: e.sysCode,
              text: e.sysName
            })
          })

        params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect
        }
        let workCodeRes = await getBas0034(params)
        workCodeRes.list.forEach(e => {
          this.workCodeList.push({
            value: e.workCode,
            text: e.workName
          })
        })
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    //메인그리드 조회
    async doSearhMainGrid(event) {
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.facCodeSelect,
          workNo: this.workNo,
          frPlanDate: this.frPlanDate,
          toPlanDate: this.toPlanDate
        }
        this.openLoading()
        let cnt = 0
        let resData = await getPro0050(params)
        resData.list.forEach(e => {
          e.id = cnt++
        })
        this.mainGrid = resData.list
        this.gridMainInstance.clearSelection()
        this.gridMainInstance.saveEditData()
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)

        this.endLoading()
      }
    }
  },
  beforeMount() {},
  mounted() {
    this.comboListSet().then(() => {
      // this.doSearhMainGrid()
    })
  }
}
</script>

<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
.btn {
  background-color: #879b77;
  color: white;
}
</style>
