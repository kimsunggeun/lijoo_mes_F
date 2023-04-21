<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  :label="$t('facName')"
                  :items="facCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchCustCode"
                  :label="$t('subcontractorName')"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  :clearable="custCodeClear"
                  :readonly="custCodeReadOnly"
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-text-field
                  class="mt-2"
                  v-model="searchPartNo"
                  :label="$t('partNo')"
                  outlined
                  dense
                  :clearable="custCodeClear"
                  height="32"
                  @keydown.enter="btnSearchMain()"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field :label="$t('outRegiDate')" v-model="startDate" dense outlined readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    no-title
                    scrollable
                    @input="dateInput"
                    :day-format="
                      date => {
                        return new Date(date).getDate()
                      }
                    "
                  />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field label="~" v-model="endDate" outlined dense readonly v-bind="attrs" v-on="on" />
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :min="startDate"
                    no-title
                    scrollable
                    @input="dateInput2"
                    :day-format="
                      date => {
                        return new Date(date).getDate()
                      }
                    "
                  />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <i-card-vertical
          headerTitle="outInfoDetail"
          :useBtnList="[
            'btnDeliAdd' //추가
          ]"
          @btnDeliAdd="btnDeliAdd()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="outInfoDetail"
                  class="doubleListBox03"
                  :ref="outInfoDetailRef"
                  :data-source="outInfoDetail"
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
                  @focused-row-changed="focusedRowChanged_outInfoDetail"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="ilno"
                    :caption="$t('ilno')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                    :visible="true"
                  />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('outCustCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                    :visible="true"
                  >
                    <DxLookup :data-source="custCode" display-expr="custName" value-expr="custCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="workNo"
                    :caption="$t('workNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="proType"
                    :caption="$t('outProType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="proType" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn data-field="defCode" :caption="$t('badCode')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="defCode" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn data-field="proCode" :caption="$t('proCode')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="proCode" display-expr="proName" value-expr="proCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="eventCd"
                    :caption="$t('outEventCd')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="eventCd" display-expr="sysName" value-expr="sysCode" />
                  </DxColumn>
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="number"
                    format="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="partName" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="qty"
                    :caption="$t('qty')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="lotNo" :caption="$t('outLotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('outLotDetail')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    css-class="devest-grid-header-require"
                  />
                  <DxColumn
                    data-field="outDate"
                    :caption="$t('outDate2')"
                    width="auto"
                    data-type="string"
                    format="date"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="outQty"
                    :caption="$t('outQty2')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="outDeliQty"
                    :caption="$t('outDeliQty')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="outNonDeliQty"
                    :caption="$t('outNonDeliQty')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="outWaitDeliQty"
                    :caption="$t('outWaitDeliQty')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="makeDate"
                    :caption="$t('makeDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    format="yyyy-MM-dd"
                  />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn
                    data-field="editDate"
                    :caption="$t('editDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    format="yyyy-MM-dd"
                  />
                  <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection select-all-mode="allPages" mode="multiple" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-tabs>
        <v-tab @click="tabChange('공정외주납품등록')">{{ $t('outItemReg2') }}</v-tab>
        <v-tab @click="tabChange('공정외주납품등록상세')">{{ $t('outItemRegDetail2') }}</v-tab>
        <v-tab-item>
          <i-card-vertical
            headerTitle="outItemReg"
            :useBtnList="[
              'btnSave' //저장
            ]"
            @btnSave="btnSave"
            @btnDelete="btnDelete"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="outItemReg"
                    class="doubleListBox05"
                    :ref="outItemRegRef"
                    :data-source="outItemReg"
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
                    @focused-row-changed="focusedRowChanged_DeliReg"
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
                      data-field="facCode"
                      :caption="$t('facCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="ordNo"
                      :caption="$t('ordNo_mat0020')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="inDate"
                      :caption="$t('deliveryDt')"
                      width="auto"
                      data-type="date"
                      alignment="center"
                      :allow-editing="true"
                      format="yyyy-MM-dd"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="ilno"
                      :caption="$t('ilno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('outLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn data-field="inType" :caption="$t('inType')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="partNo2" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false">
                      <DxLookup :data-source="partNoList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <DxColumn
                      data-field="qty"
                      :caption="$t('remOrdQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inQty"
                      :caption="$t('inQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="true"
                      :set-cell-value="setQtyValue"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="makeQty"
                      :caption="$t('makeQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="true"
                      :set-cell-value="setMakeQtyValue"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="boxQty"
                      :caption="$t('boxQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="proCost"
                      :caption="$t('proCost')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="true"
                      :set-cell-value="setInPriceValue"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="inAmount"
                      :caption="$t('inAmount')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="remQty"
                      :caption="$t('remQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn data-field="proType" :caption="$t('proType2')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                      <DxLookup :data-source="proType2" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn
                      data-field="outInspCode"
                      :caption="$t('outProcessChkProgressStat')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="outInspCode" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="true" />
                    <DxColumn
                      data-field="printType"
                      :caption="$t('printType')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="false"
                    >
                      <DxLookup :data-source="printType" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                      :visible="false"
                    />
                    <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item>
          <i-card-vertical headerTitle="outItemRegDetail" :useBtnList="['btnDelete']" @btnDelete="btnDelete">
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="outItemRegDetail"
                    class="doubleListBox05"
                    :ref="outItemRegDetailRef"
                    :data-source="outItemRegDetail"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    :key-expr="['comCode', 'facCode', 'inIlno']"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
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
                      data-field="facCode"
                      :caption="$t('facCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="ilno"
                      :caption="$t('workingIlno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn data-field="workNo" :caption="$t('workNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('outLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inDate"
                      :caption="$t('deliveryDt')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inIlno"
                      :caption="$t('deliveryNoIlno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn data-field="inNo" :caption="$t('outNo')" width="auto" data-type="string" alignment="right" :allow-editing="false" />
                    <DxColumn
                      data-field="nextProcNo"
                      :caption="$t('nextProcessName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('outProcessWhsLotNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="outLotDetail"
                      :caption="$t('outProcessWhsLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn data-field="proType" :caption="$t('proType2')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                      <DxLookup :data-source="proType3" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn data-field="partNo" :caption="$t('partNo')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn data-field="partNo2" :caption="$t('partName')" width="auto" data-type="string" alignment="left" :allow-editing="false">
                      <DxLookup :data-source="partNoList" display-expr="text" value-expr="value" />
                    </DxColumn>
                    <DxColumn
                      data-field="qty"
                      :caption="$t('deliveryQty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inPrice"
                      :caption="$t('mfglPrice')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="inAmount"
                      :caption="$t('mfglAmount')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="outInspCode"
                      :caption="$t('outProcessChkProgressStat')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="outInspCode2" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn data-field="remark" :caption="$t('remark')" width="500" data-type="string" alignment="left" :allow-editing="false" />
                    <DxColumn
                      data-field="printType"
                      :caption="$t('printType')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="false"
                    >
                      <DxLookup :data-source="printType2" display-expr="sysName" value-expr="sysCode" />
                    </DxColumn>
                    <DxColumn
                      data-field="outYn"
                      :caption="$t('processStoreYn')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="false"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                    />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                    />
                    <DxColumn data-field="" caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import { saveMenuStatistics } from '@/api/system/menuStatisticsManage'
import { getPartNo } from '@/api/view/pop0040'
import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { getAccount_out0010, getUserId_out0010 } from '@/api/view/out0010'
import { getPro0026, createOut0011, getOut0011, deleteOut0011 } from '@/api/view/out0030'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { getMat0011Info } from '@/api/view/mat0011'
import { getMat0012Info } from '@/api/view/mat0012'
import { getMat0018Info } from '@/api/view/mat0018'
import { getProcessName } from '@/api/view/bas0031'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
export default {
  name: 'out0030',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    ICardTop,
    DxLookup
  },
  data() {
    return {
      rowFlag: true,
      outInfoDetail: [], //공정외주 정보상세
      outItemReg: [], //공정외주 납품등록
      outItemRegDetail: [], //공정외주 납품등록 상세
      outInfoDetailRef: 'outInfoDetailRef',
      outItemRegRef: 'outItemRegRef',
      outItemRegDetailRef: 'outItemRegDetailRef',
      reqDtFrom: getPreMonth(0),
      reqDtTo: getPreMonth(-2),
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },

      ordStatusInfoData: [], //발주현황 데이터
      outInfoDetailData: [], //납품현황 데이터
      searchFacCode: '',
      facCodeList: [],
      custCodeList: [],
      searchComCode: '',
      searchCustCode: '',
      searchPartNo: '',
      makeQty: [],
      lotSizeData: [],
      startDate: getPreMonth(2),
      endDate: getCurrentDate(),
      menu1: '',
      menu2: '',
      custCode: [],
      proCode: [],
      inStatus: [],
      eventCd: [],
      partNoList: [],
      proType: [],
      proType2: [],
      proType3: [],
      outInspCode: [],
      outInspCode2: [],
      printType: [],
      printType2: [],
      defCode: [],
      tabKey: '',
      depCode: '',
      rowCount: [],
      custCodeReadOnly: false,
      custCodeClear: true
    }
  },
  async beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
      userId: getUserId()
    }

    //검사유형
    let params2 = {
      comCode: getComCode(),
      codegr: '',
      code: 'IN_STATE',
      userFlag: 'Y'
    }
    let params3 = {
      comCode: getComCode()
    }

    let params4 = {
      comCode: getComCode(),
      codegr: '',
      code: 'EVENT_CD',
      userFlag: 'Y'
    }
    let params5 = {
      comCode: getComCode(),
      codegr: '',
      code: 'PRO_TYPE',
      userFlag: 'Y'
    }
    let params6 = {
      comCode: getComCode(),
      codegr: '',
      code: 'DEF_CODE',
      userFlag: 'Y'
    }
    let params7 = {
      comCode: getComCode(),
      codegr: '',
      code: 'OUT_INSP_CODE',
      userFlag: 'Y'
    }
    let params8 = {
      comCode: getComCode(),
      codegr: '',
      code: 'PRINT_TYPE',
      userFlag: 'Y'
    }

    Promise.all([
      getAccount(params),
      getCmChildCode(params2),
      getProcessName(params3),
      getCmChildCode(params4),
      getCmChildCode(params5),
      getCmChildCode(params6),
      getCmChildCode(params7),
      getCmChildCode(params8),
      getOut0011(params3)
    ])
      .then(res => {
        this.custCode = res[0].list.slice()
        this.inStatus = res[1].list.slice()
        this.proCode = res[2].list.slice()
        this.eventCd = res[3].list.slice()
        this.proType = res[4].list.slice()
        this.proType2 = res[4].list.slice()
        this.proType3 = res[4].list.slice()
        this.defCode = res[5].list.slice()
        this.outInspCode = res[6].list.slice()
        this.outInspCode2 = res[6].list.slice()
        this.printType = res[7].list.slice()
        this.printType2 = res[7].list.slice()
        this.partNoList = res[8].list.slice()
      })
      .catch(error => {})
  },
  async created() {
    // const params = {
    //   comCode : getComCode(),
    //   userId : getUserId(),
    //   moduleCode : this.$localStore.get('moduleCode'),
    //   menuCode: this.$localStore.get('menuCode'),
    //   cnntDate: getDateFormat(new Date()),
    // }
    // saveMenuStatistics(params)
    //유저 아이디 조회
    const param3 = {
      comCode: getComCode(),
      userId: getUserId()
    }
    getUserId_out0010(param3).then(res => {
      this.depCode = res.list[0].depCode
      this.checkId()
    })

    //공장명 조회조건
    const comCodeData = {
      comCode: getComCode()
    }
    await getFactoryInfoData(comCodeData).then(res => {
      res.list.forEach(e => {
        this.facCodeList.push({
          value: e.facCode,
          text: e.facName
        })
      })
      this.searchFacCode = res.list[0].facCode
    })
    let partNoRes = await getPartNo({ comCode: getComCode() })
    partNoRes.list.forEach(e => {
      this.partNoList.push({
        text: e.partName,
        value: e.partNo
      })
    })
  },
  computed: {
    outInfoDetailInstance() {
      return this.GetDataGrid(this.outInfoDetailRef)
    },
    outItemRegInstance() {
      return this.GetDataGrid(this.outItemRegRef)
    },
    outItemRegDetailInstance() {
      return this.GetDataGrid(this.outItemRegDetailRef)
    }
  },
  watch: {
    focusedRowKey: function(value) {
      if (value > -1) {
        let array = this.outInfoDetailData
        let index = value
        this.doSearchDeliStatus(array[index])
      }
    }
  },
  mounted() {},
  methods: {
    btnSearchMain() {
      this.doSearchMain()
      this.outItemReg = []
      this.rowCount = []
    },
    checkId() {
      const custCodeData = {
        comCode: getComCode()
      }
      if (this.depCode === 'OUT') {
        this.custCodeReadOnly = true
        this.custCodeClear = false
        getAccount_out0010(custCodeData).then(res => {
          res.list.forEach(e => {
            this.custCodeList.push({
              value: e.custCode,
              text: e.custName
            })
          })
          this.searchCustCode = this.custCodeList[0].value
        })
      } else {
        getAccount(custCodeData).then(res => {
          res.list.forEach(e => {
            this.custCodeList.push({
              value: e.custCode,
              text: e.custName
            })
          })
          // this.searchCustCode = this.custCodeList[0].value
        })
      }
    },
    tabChange(tab) {
      if (tab == '공정외주납품등록상세') {
        this.doSearchDetail()
      }
    },
    //------------------------------------------------------------------------조회버튼-------------------------------------------------------------------------------------//
    dateInput(e) {
      this.startDate = e
      this.menu1 = false
      this.$refs.menu1.save(e)
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },
    dateInput2(e) {
      if (this.startDate === '') {
        return
      }
      this.endDate = e
      this.menu2 = false
      this.$refs.menu2.save(e)
    },
    doSearchMain() {
      //구매발주정보 조회
      this.ordStatusInfo = []
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
        custCode: this.searchCustCode == null ? '' : this.searchCustCode.toString(),
        partNo: this.searchPartNo == null ? '' : this.searchPartNo.toString(),
        startDate: this.startDate == null ? '' : this.startDate,
        endDate: this.endDate == null ? '' : this.endDate,
        facCode: this.searchFacCode == null ? '' : this.searchFacCode.toString(),
        ordState: '20'
      }
      if (params.comCode === '' || params.startDate === '' || params.endDate === '') {
        notify('필수 조회조건을 입력해 주십시오 [공장명, 출고 시작일, 출고 종료일]', 'error', 3000)
        this.endLoading()
        return
      }

      getPro0026(params)
        .then(res => {
          let cnt = 0
          res.list.forEach(e => {
            e.id = cnt++
            if (e.proCost === null) {
              e.proCost = '0'
            }
          })
          this.outInfoDetail = res.list
        })
        .finally(() => {
          this.outInfoDetailInstance.clearSelection()
          this.outInfoDetailInstance.option('focusedRowIndex', -1)
          this.outInfoDetailInstance.option('focusedRowIndex', 0)
          this.endLoading()
        })
    },
    doSearchDetail() {
      let params = {
        comCode: getComCode(),
        facCode: this.outInfoDetailData.facCode,
        ilno: this.outInfoDetailData.ilno,
        workNo: this.outInfoDetailData.workNo,
        lotDetail: this.outInfoDetailData.lotDetail
      }
      getOut0011(params).then(res => {
        let cnt = 0
        res.list.forEach(e => {
          e.partNo2 = e.partNo
          e.id = cnt++
        })
        this.outItemRegDetail = res.list
      })
    },
    //------------------------------------------------------------------------추가버튼-------------------------------------------------------------------------------------//
    async btnDeliAdd() {
      let selectedMainRows = await this.outInfoDetailInstance.getSelectedRowsData()
      if (selectedMainRows.length === 0) {
        notify(this.$t('mat0012AddCheck'), 'error')
        return
      }
      for (let i = 0; i < selectedMainRows.length; i++) {
        //중복확인을 위한 플래그
        this.rowFlag = true

        if (!selectedMainRows[i].outNonDeliQty || selectedMainRows[i].outNonDeliQty < 1) {
          this.rowFlag = false
          notify(this.$t('선택한 목록중 납품잔량이 부족한 품목은 추가되지 않았습니다.'), 'error')
          return
        } else {
          for (let j = 0; j < this.rowCount.length; j++) {
            if (this.rowCount[j] == selectedMainRows[i].ilno + selectedMainRows[i].lotDetail) {
              this.rowFlag = false
            }
          }
        }

        if (this.rowFlag) {
          this.rowCount.push(selectedMainRows[i].ilno + selectedMainRows[i].lotDetail)

          var newRow = {
            id: this.outItemReg.length + 1,
            comCode: getComCode(),
            facCode: selectedMainRows[i].facCode,
            ordNo: selectedMainRows[i].ordNo,
            no: selectedMainRows[i].no,
            custCode: selectedMainRows[i].custCode,
            inDate: getCurrentDate(),
            ilno: selectedMainRows[i].ilno,
            workNo: selectedMainRows[i].workNo,
            lotDetail: selectedMainRows[i].lotDetail,
            inType: '구매입고',
            partNo: selectedMainRows[i].partNo,
            partNo2: selectedMainRows[i].partNo,
            qty: selectedMainRows[i].outNonDeliQty, //잔량
            inQty: '', //입고량
            makeQty: selectedMainRows[i].lotSize, //구성량
            boxQty: '', //박스수량
            proCost: selectedMainRows[i].proCost, //단가
            inAmount: '', //금액
            proType: selectedMainRows[i].proType, //납품구분(생산구분)
            outInspCode: selectedMainRows[i].supInsp == 'N' ? '10' : '20',
            remark: '',
            printType: '',
            userFlag: 'Y',
            makeDate: getCurrentDate(),
            maker: getUserId(),
            editDate: '',
            editor: '',
            inWh: selectedMainRows[i].inWh,
            partType: selectedMainRows[i].partType
          }
          this.outItemRegInstance.newRow(newRow)
          this.outItemRegInstance.selectRows(newRow.id, true)
          this.outItemRegInstance.option('focusedRowIndex', 1)
          this.outInfoDetailInstance.clearSelection()
        } else {
          notify(this.$t('이미 납품추가한 품목입니다. 아래의 공정외주 납품등록 화면을 확인해주세요.'), 'error')
        }
      }
    },
    focusedRowChanged_orderSelect(e) {
      if (e.row === undefined) {
        return
      }

      this.ordStatusInfoData = e.row.data

      this.doSearchDeliStatus()
    },
    focusedRowChanged_outInfoDetail(e) {
      if (e.row === undefined) {
        return
      }
      this.outInfoDetailData = e.row.data
      if (this.outInfoDetail.length === 0) {
        this.outInfoDetailData = []
      }
      this.doSearchDetail()
      if (this.outItemRegDetail.length > 0) this.outItemRegDetailInstance.clearSelection()
    },
    focusedRowChanged_DeliReg(e) {
      if (e.row === undefined) {
        return
      }
      this.outItemRegData = e.row.data
    },
    //----------------------------------------------------------------------저장버튼-------------------------------------------------------------------------------------------//
    async btnSave() {
      this.outItemRegInstance.saveEditData()
      var selectedDetailRows = await this.outItemRegInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      for (var row of selectedDetailRows) {
        if (row.inQty <= 0) {
          notify('입고량은 1개 이상이어야 합니다.', 'error', 1500)
          return
        }
        if (!row.inQty || !row.makeQty || !row.proCost) {
          this.vToastify(this.$t('필수항목 입력하세요 [입고량, 구성량, 가공비]'), 'warn')
          return
        }
        if (row.inDate.length > 10) {
          row.inDate = row.inDate.substr(0, 10)
        }
      }
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.outInfoDetailInstance.beginUpdate()
          this.outItemRegInstance.beginUpdate()
          let cnt = 0
          createOut0011(selectedDetailRows, true)
            .then(res => {
              notify(this.$t('Saved'), 'success', 3000)
              this.rowCount = []
              this.outInfoDetailInstance.endUpdate()
              this.outItemRegInstance.endUpdate()
              this.doSearchMain()
              this.outItemReg = []
            })
            .catch(error => {
              notify(error, 'error', 3000)
              this.endLoading()
            })
            .finally(() => {
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    //----------------------------------------------------------------------삭제버튼-------------------------------------------------------------------------------------------//
    async btnDelete(gbn) {
      this.outItemRegDetailInstance.saveEditData()
      var selectedDetailRows = await this.outItemRegDetailInstance.getSelectedRowsData() // 구매입고등록 데이터
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.outInfoDetailInstance.beginUpdate()
          this.outItemRegInstance.beginUpdate()
          let cnt = 0

          let keys = ['comCode', 'facCode', 'ilno', 'workNo', 'lotDetail', 'inIlno', 'maker']
          let uniqueValues = new Set()

          for (let d of selectedDetailRows) {
            let values = keys.map(key => d[key])
            uniqueValues.add(JSON.stringify(values))
          }

          let newData = Array.from(uniqueValues, str => {
            let values = JSON.parse(str)
            return Object.fromEntries(keys.map((key, i) => [key, values[i]]))
          })

          let jsonResult = JSON.stringify(newData)

          deleteOut0011(jsonResult, true)
            .then(res => {
              notify(this.$t('deleted'), 'success', 3000)
              this.rowCount = []
            })
            .catch(error => {
              notify(error, 'error', 333000)
              this.rowCount = []
              this.endLoading()
            })
            .finally(() => {
              this.outInfoDetailInstance.endUpdate()
              this.outItemRegInstance.endUpdate()
              this.doSearchMain()
              this.outItemReg = []
              this.rowCount = []
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    //----------------------------------------------------------------------셀 클릭 이벤트---------------------------------------------------------------------------------------//
    //입고량 입력에 대한 이벤트
    setQtyValue(newData, value, currentRowData) {
      if (currentRowData.makeQty === '0' || currentRowData.makeQty === '') {
        //구성량이 0이거나 ''일때
        if (Number(currentRowData.qty) < value) {
          //입고량이 납품잔량보다 많을경우 납품잔량수를 넣음
          newData.inQty = currentRowData.qty
          return
        }
        //구성량이 0일때 입고량만 업데이트 됨
        newData.inQty = value
        return
      } else {
        //구성량엔 1 이상의 값이 들어있는 상태
        if (Number(currentRowData.qty) < value) {
          //입고량이 납품잔량보다 많을경우 납품잔량수를 넣음
          value = currentRowData.qty
        } else if (value < 0) {
          value = 0
        }
      }
      //구성량의 값이 1 이상이고 [구성량 <= 입고량 <= 납품잔량]일 경우
      newData.inQty = value
      newData.boxQty = Math.ceil(value / currentRowData.makeQty)
      newData.inAmount = Math.round(value * currentRowData.proCost * 100) / 100
      //newData.inAmount = value * currentRowData.proCost
      newData.remQty = currentRowData.qty - value
    },

    //구성량 입력에 대한 이벤트
    setMakeQtyValue(newData, value, currentRowData) {
      if (currentRowData.inQty === '0' || currentRowData.inQty === '') {
        //입고량이 0이거나 ''일때
        if (Number(currentRowData.qty) < value) {
          //구성량이 납품잔량보다 많을 경우 납품잔량수를 넣음
          value = currentRowData.qty
          return
        }
        //입고량이 0일때 구성량만 업데이트 됨
        newData.makeQty = value
        return
      } else {
        //입고량이 1 이상일 때
        if (Number(currentRowData.inQty) < Number(value)) {
          // 구성량이 입고량보다 많을 경우 입고량과 값이 같게
          value = currentRowData.inQty
        }
        if (value === '0') {
          value = 1
        }
        //입고량이 1 이상이며 구성량 <= 입고량, 구성량 <= 납품잔량일 경우
        newData.makeQty = value
        newData.boxQty = Math.ceil(currentRowData.inQty / value)
        newData.inAmount = currentRowData.inQty * currentRowData.proCost
        newData.remQty = currentRowData.qty - currentRowData.inQty
      }
    },
    setInPriceValue(newData, value, currentRowData) {
      newData.proCost = value
      newData.inAmount = value * currentRowData.inQty
    }
  }
}
</script>
<style scoped>
.fontWeight {
  font-weight: bolder;
  color: #202772;
}
</style>
