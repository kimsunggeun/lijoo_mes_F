<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch()">
          <template v-slot:body>
            <!-- 조회 Area -->
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchFacCode"
                  :label="$t('facName')"
                  :items="factoryList"
                  item-text="facName"
                  item-value="facCode"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchCustomerCode"
                  :label="$t('custName')"
                  :items="custList"
                  item-text="custName"
                  item-value="custCode"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <!-- Date Picker -->
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="startCal"
                  v-model="startCal"
                  :close-on-content-click="false"
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('deliDate')"
                      v-model="startDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                  v-model="startDate" 
                  no-title 
                  @input="startInput"
                  :day-format="(date) => { return new Date(date).getDate() }" />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                  ref="endCal"
                  v-model="endCal"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('endDate')"
                      v-model="endDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                  v-model="endDate" 
                  :min="startDate" 
                  no-title 
                  @input="endInput"
                  :day-format="(date) => { return new Date(date).getDate() }" />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="8" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical headerTitle="orderInfo">
            <!-- 수주현황 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="sal0120Grid1"
                  class="doubleListBox03"
                  :ref="gridRefOrderStatus"
                  :data-source="gridDataOrderStatus"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  column-resizing-mode="widget"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                  :selection="{ mode:'none' }"
                  @focused-row-changed="focusedRowChanged_gridDataOrderStatus"
                  @cellClick="itemRowClickOrderStatus"
                  @content-ready="contentReadyOrderStatus"
                >
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="ordNo"
                    :caption="$t('ordNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="no"
                    :caption="$t('ordTurn')"
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
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="custName"
                    :caption="$t('custName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="ordDate"
                    :caption="$t('ordDate2')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    :allow-editing="false"
                    alignment="center"
                  />
                  <DxColumn
                    data-field="deliDate"
                    :caption="$t('deliDate')"
                    width="auto"
                    data-type="date"
                    format="yyyy-MM-dd"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partName"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="qty"
                    :caption="$t('orderVolume')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="outQty"
                    :caption="$t('outQty')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="nowQty"
                    :caption="$t('nowQty')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="planQty"
                    :caption="$t('plannedAmount')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="price"
                    :caption="$t('unitPrice')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="amount"
                    :caption="$t('amount')"
                    width="auto"
                    data-type="number"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn/>
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
      <v-col cols="4" class="pa-0">
        <i-card-vertical
          headerTitle="stockStatus"
          :useBtnList="['btnAdd']"
          @btnAdd="btnAddRegistGrid()"
        >
          <!-- 재고현황 -->
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="sal0120Grid2"
                  class="doubleListBox03"
                  :ref="gridRefInventoryStatus"
                  :data-source="gridDataInventoryStatus"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  column-resizing-mode="widget"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                  @cellClick="itemRowClickInventoryStatus"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn
                    data-field="id"
                    caption="No"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locCode"
                    :caption="$t('locCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="locName"
                    :caption="$t('locName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="lotNo"
                    :caption="$t('lotNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"                 
                  />                  
                  <DxColumn
                    data-field="lotDetail"
                    :caption="$t('lotDetail')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="stockQty"
                    :caption="$t('stockQty')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="stockAmount"
                    :caption="$t('stockAmount')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :visible="false"
                    :customize-text="customizeText"
                  />                    
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('regiDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="stockType"
                    :caption="$t('stockType')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="eventCd"
                    :caption="$t('eventCd')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="true"
                  /> 
                  <DxColumn/>
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection
                    select-all-mode="allPages"
                    :show-check-boxes-mode="checkBoxesMode"
                    mode="multiple"
                  />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
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
        <v-tab>{{$t('shippingRegistration')}}</v-tab>
        <v-tab>{{$t('shipmentStatus')}}</v-tab>
        <v-tab-item>
          <i-card-vertical
            headerTitle="shptReg"
            :useBtnList="['btnRegi','btnDelete']"
            @btnRegi="btnRegist()"
            @btnDelete="btnDeleteRegistGrid()"
          >
            <!-- 출하등록 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="sal0120Grid3"
                    class="doubleListBox05"
                    :ref="gridRefShipmentRegist"
                    :data-source="gridDataShipmentRegist"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    column-resizing-mode="widget"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @cell-prepared="onFocusedCellChangedRegistGrid"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxColumn
                      data-field="id"
                      caption="No"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
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
                      :caption="$t('ordNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="ordTurn"
                      :caption="$t('ordTurn')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="ilno"
                      :caption="$t('ilno')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="no"
                      :caption="$t('shipmentNo')"
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
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="custName"
                      :caption="$t('custName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="outDate"
                      :caption="$t('outDate')"
                      width="auto"
                      data-type="date"
                      alignment="center"
                      format="yyyy-MM-dd" 
                      css-class="devest-grid-header-require"
                      :allow-editing="true"
                      :visible="true"
                      :set-cell-value="setOutDate"
                    />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="locCode"
                      :caption="$t('locCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="locName"
                      :caption="$t('locName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('lotNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="stockQty"
                      :caption="$t('stockQty')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="outQty"
                      :caption="$t('outQty')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="true"
                      :visible="true"
                      :customize-text="customizeText"
                      :set-cell-value="setQtyValue"
                    />
                    <DxColumn
                      data-field="price"
                      :caption="$t('price')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="amount"
                      :caption="$t('amount')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="outInspYn"
                      :caption="$t('outInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="string"
                      alignment="left"
                      :allow-editing="true"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="date"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
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
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="date"
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
                    <DxColumn/>
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item>
          <i-card-vertical
            headerTitle="■ 출하현황"
            :useBtnList="['btnCancel']"
            @btnCancel="btnDeleteShipmentStatus()"
          >
            <!-- 출하현황 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="sal0120Grid4"
                    class="doubleListBox05"
                    :ref="gridRefShipmentStatus"
                    :data-source="gridDataShipmentStatus"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    column-resizing-mode="widget"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                  >
                  <DxScrolling column-rendering-mode="virtual" />
                    <DxColumn
                      data-field="id"
                      caption="No"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
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
                      data-field="ilno"
                      :caption="$t('ilNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="no"
                      :caption="$t('shipmentNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />                    
                    <DxColumn
                      data-field="ordNo"
                      :caption="$t('ordNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="ordTurn"
                      :caption="$t('ordTurn')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="custName"
                      :caption="$t('custName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="outDate"
                      :caption="$t('outDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="locCode"
                      :caption="$t('locCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="locName"
                      :caption="$t('locName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="lotNo"
                      :caption="$t('lotNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="stockQty"
                      :caption="$t('beforeShipQty')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="qty"
                      :caption="$t('outQty')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="price"
                      :caption="$t('price')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="amount"
                      :caption="$t('amount')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :visible="true"
                      :customize-text="customizeText"
                    />
                    <DxColumn
                      data-field="stockAmount"
                      :caption="$t('stockAmount')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :customize-text="customizeText"
                      :visible="false"
                    />
                    <DxColumn
                      data-field="outInspYn"
                      :caption="$t('outInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="false"
                      edit-cell-template="checkBoxEditor"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="string"
                      alignment="left"
                      :allow-editing="true"
                      :visible="true"
                    />
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="date"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
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
                      data-field="editDate"
                      :caption="$t('editDate')"
                      width="auto"
                      data-type="date"
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
                    <DxColumn/>
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                      />
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
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import iCardVertical from '@/components/common/iCardVertical.vue'
import ICardTop from '@/components/common/iCardTop.vue'

import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView } from 'devextreme-vue/data-grid'
import notify from 'devextreme/ui/notify' // message
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getUserId, getComCode } from '@/utils/token'
import {  getOrdStatusOnDeliveryDate,getSal0120Status, createSal0120, deleteSal0120, getFacName } from '@/api/view/sal0120'
import { getCustCodeName } from '@/api/view/bas0044'
import { isNumeric } from '@/utils/check'

import { getMat0210Detail } from '@/api/view/mat0021'

export default {

  name: 'sal0120',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    ICardTop
  },
  
  data() {
    return {
      //수주현황
      gridDataOrderStatus: [],
      gridRefOrderStatus: 'gridRefOrderStatus',
      //재고현황
      gridDataInventoryStatus: [],
      gridRefInventoryStatus: 'gridRefInventoryStatus',
      //출하등록
      gridDataShipmentRegist: [],
      gridRefShipmentRegist: 'gridRefShipmentRegist',
      //출하현황
      gridDataShipmentStatus: [],
      gridRefShipmentStatus: 'gridRefShipmentStatus',

      //LookUp
      factoryList: [],
      custList: [],

      //달력
      startCal: false,
      endCal: false,
      startDate: getPreMonth(1),
      endDate: getCurrentDate(),

      //조회 변수
      searchFacCode: '',
      searchCustomerCode: '',

      checkBoxesMode: 'always',
    
      itemGridOrderStatusClickData: null,
      itemGridInventoryStatusClickData: null, 
    }
  },

  computed: {
    gridOrderStatus() {
      return this.GetDataGrid(this.gridRefOrderStatus)
    },
    gridInventoryStatus() {
      return this.GetDataGrid(this.gridRefInventoryStatus)
    },
    gridShipmentRegist() {
      return this.GetDataGrid(this.gridRefShipmentRegist)
    },
    gridShipmentStatus() {
      return this.GetDataGrid(this.gridRefShipmentStatus)
    }
  },

  created() {
    this.lookupList()
  },

  methods: {
    //반품 수량, 금액 입력 범위
    setQtyValue (newData, value, currentRowData) {
      //숫자인지 확인
      if (!isNumeric(value))
      {
        return
      }
      if (Number(value) > Number(currentRowData.stockQty) ) {
        newData.outQty = currentRowData.stockQty
        newData.amount = Number(currentRowData.price) * Number(currentRowData.stockQty)
      }else if(Number(value) <= 0){
        newData.outQty = 1
        newData.amount = Number(currentRowData.price)
      }else {
        newData.outQty = value
        newData.amount = Number(currentRowData.price) * Number(value)

      }
    },

    //숫자 포맷형식 지정
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },

    //LookUp 관련
    async lookupList() {
      //공장명
      const facCon = {
        comCode: getComCode()
      }
      //거래처명
      const custCon = {
        comCode: getComCode()
      }

      await Promise.all([getFacName(facCon), getCustCodeName(custCon)]).then(res => {
        //공장
        this.factoryList = res[0].list
        this.searchFacCode = this.factoryList[0].facCode
        //거래처
        this.custList = res[1].list
      })
    },

    //시작일 선택
    startInput(e) {
      this.startCal = false
      this.startDate = e
    },

    //종료일 선택
    endInput(e) {
      this.endCal = false
      this.$refs.endCal.save(e)
    },    
    
    btnSearch() {
      this.doSearchOrderStatus()
    },

    btnAddRegistGrid() {
      this.doAddShipment()
    },

    btnDeleteRegistGrid() {
      this.vToastifyPrompt(
        '선택한 항목들을 삭제 하시겠습니까?',
        'info',
        current => {
          this.doRemoveShipment()
        },
        null,
        true
      )
    },

    async btnRegist() {
      var selectedRegistRows = await this.gridShipmentRegist.getSelectedRowsData()
      console.log("선택된 데이터",selectedRegistRows)
      if (selectedRegistRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
        return
      }

      this.vToastifyPrompt(
        '선택한 항목들을 출하등록 하시겠습니까?',
        'info',
        current => {
          this.doRegistShipment(selectedRegistRows)
        },
        null,
        true
      )
    },

    btnEditShipmentStatus() {
      this.vToastifyPrompt(
        '선택한 항목들을 저장 하시겠습니까?',
        'info',
        current => {
          this.doEditShipment()
        },
        null,
        true
      )
    },

    btnDeleteShipmentStatus() {
      this.vToastifyPrompt(
        '선택한 항목들의 출하를 취소 하시겠습니까?',
        'info',
        current => {
          this.doCancelShipment()
        },
        null,
        true
      )
    },

    doSearchOrderStatus() {
      const searchData = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
        custCode: this.searchCustomerCode,
        startDate: this.startDate,
        endDate: this.endDate
      }

      this.gridDataOrderStatus = []

      getOrdStatusOnDeliveryDate(searchData).then(res => {
        if (res.success) {
          if (res.list.length < 1) {
            return
          }
          // this.gridDataOrderStatus = []
          for (let i = 0; i < res.list.length; ++i) {
            if (res.list[i].nowQty > 0) {
              this.gridDataOrderStatus.push(res.list[i])
            }
          }

          if (this.isEmpty(this.itemGridOrderStatusClickData) === true) {
            this.itemGridOrderStatusClickData = this.gridDataOrderStatus[0]
          }

          this.doSearchInventoryStatus()
          this.doSearchShipmentStatus()
        }
      })
    },  

    doSearchInventoryStatus() {
      this.gridDataInventoryStatus = []
      this.openLoading('searching')

      const searchData = {
        comCode: getComCode(),
        facCode: this.searchFacCode,
        locCode: null,
        partNo: this.itemGridOrderStatusClickData.partNo
      }

      getMat0210Detail(searchData)
        .then(res => {
          if (res.success) {
            res.list.forEach((item) => {
              if (item.stockQty > 0) {
                this.gridDataInventoryStatus.push(item)
              }             
            })
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },

    //재고 현황 추가 버튼 (출하 등록 그리드) 
    async doAddShipment() {
      var selectedAddRows = await this.gridInventoryStatus.getSelectedRowsData()

      if (selectedAddRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
        return
      }

      for (var i = 0; i < selectedAddRows.length; ++i) {
        if (parseInt(selectedAddRows[i].stockQty) < 1) {
          continue
        }

        const insertData = {
          id: this.gridDataShipmentRegist.length,
          comCode: getComCode(),
          facCode: this.searchFacCode,
          ordNo: this.itemGridOrderStatusClickData.ordNo,
          ordTurn: this.itemGridOrderStatusClickData.no,
          ilno: null,
          no: null,
          custCode: this.itemGridOrderStatusClickData.custCode,
          custName: this.itemGridOrderStatusClickData.custName,
          ordDate: this.itemGridOrderStatusClickData.ordDate,
          closeMonth: this.itemGridOrderStatusClickData.deliDate,
          outDate: getCurrentDate(),
          outInspYn: this.itemGridOrderStatusClickData.outInspYn,
          partNo: this.itemGridOrderStatusClickData.partNo,
          partName: this.itemGridOrderStatusClickData.partName,
          locCode: selectedAddRows[i].locCode,
          locName: selectedAddRows[i].locName,
          lotNo: selectedAddRows[i].lotNo,
          lotDetail: selectedAddRows[i].lotDetail,
          stockQty: selectedAddRows[i].stockQty,
          nowQty: this.itemGridOrderStatusClickData.nowQty,
          outQty: selectedAddRows[i].stockQty,
          price: this.itemGridOrderStatusClickData.price,
          amount: this.itemGridOrderStatusClickData.price * selectedAddRows[i].stockQty,
          remark: null,
          makeDate: null,
          maker: getUserId(),
          editDate: null,
          editor: getUserId(),
          __created__: true,
          __modified__: false
        }
        
        console.log(insertData);
        this.gridDataShipmentRegist.push(insertData)
        this.gridShipmentRegist.selectRows(insertData.id, true)
      }

      this.gridInventoryStatus.clearSelection()     
    },

    //출하등록 등록 버튼
    async doRegistShipment(selectedRegistRows) {
      this.gridShipmentRegist.saveEditData()
      this.openLoading()

      createSal0120(selectedRegistRows).then(res => {
        notify(this.$t('Saved'), 'success', 3000)
        this.doRemoveShipment()      
        this.doSearchOrderStatus()
      }).catch(error => {
        notify(error, 'error', 3000)
      }).finally(() => {
        this.endLoading()
      })

    },

    async doRemoveShipment(selectedRegistRows) {
      var selectedRegistRows = await this.gridShipmentRegist.getSelectedRowsData()
      
      this.gridDataShipmentRegist = this.gridDataShipmentRegist.filter(row => {
        return !selectedRegistRows.includes(row)
      })      
    },

    doSearchShipmentStatus() {
      const searchData = {
        comCode: getComCode(),
        facCode: this.itemGridOrderStatusClickData.facCode,
        ordNo: this.itemGridOrderStatusClickData.ordNo,
        ordTurn: this.itemGridOrderStatusClickData.no,
        custCode: this.itemGridOrderStatusClickData.custCode,
        partNo: this.itemGridOrderStatusClickData.partNo,
      }
      console.log("디테일 조회",searchData)
      getSal0120Status(searchData).then(res => {
          this.gridDataShipmentStatus = res.list
      }).catch(err => {
        notify(err, 'error', 1500)
      })
    },

    async doCancelShipment() {
      this.gridShipmentStatus.saveEditData()
      var selectedStatusRows = await this.gridShipmentStatus.getSelectedRowsData()

      if (selectedStatusRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error')
          return    
      }

      deleteSal0120(selectedStatusRows)
        .then(res => {
          notify(this.$t('Saved'), 'success', 3000)
          this.doRemoveShipment()
          this.gridShipmentStatus.clearSelection()
        })
        .catch(error1 => {
          notify(error1, 'error', 3000)
        })
        .finally(() => {
          this.gridShipmentRegist.endUpdate()             
          this.doSearchOrderStatus()
        })
    },

    contentReadyOrderStatus(e) {
      if (!e.component.getSelectedRowKeys().length) {
        e.component.selectRowsByIndexes(0)
      }

      if (this.isEmpty(this.itemGridOrderStatusClickData) === true) {
        e.component.selectRowsByIndexes(0)
      } else {
        for(let i = 0; i < this.gridDataOrderStatus.length; ++i) {
          if (this.gridDataOrderStatus[i].ordNo === this.itemGridOrderStatusClickData.ordNo && 
            this.gridDataOrderStatus[i].ordTurn === this.itemGridOrderStatusClickData.ordTurn) {
              e.component.selectRowsByIndexes(i)
              return
          }
        }
      }
    },

    //수주현황 Grid_Click_Event
    itemRowClickOrderStatus(e) {
      // if (e.rowIndex !== -1) {
      //   this.changeRowClickOrderStatus(e.data)
      // }
    },

    focusedRowChanged_gridDataOrderStatus(e) {
      if (e.row === undefined) {
        return
      }
      this.changeRowClickOrderStatus(e.row.data)
    },

    //창고재고현황 Grid_Click_Event
    itemRowClickInventoryStatus(e) {
      if (e.rowIndex !== -1) {
        this.changeRowClickInventoryStatus(e.data)      
      }      
    },

    changeRowClickOrderStatus(data) {
      this.itemGridOrderStatusClickData = data
      this.doSearchInventoryStatus()
      this.doSearchShipmentStatus()

      //다른 수주번호 클릭시 출하등록 그리드 비우기
      // let shipList = this.gridDataShipmentRegist     
      // if(shipList.length !== 0){
      //   if(shipList[0].ordNo !== data.ordNo){
      //   this.gridDataShipmentRegist = []
      //   }   
      // } 
    },

    changeRowClickInventoryStatus(data) {
      if (data) {
        this.itemGridInventoryStatusClickData = data
      } else {
        this.itemGridInventoryStatusClickData = null
      }      
    },

    onFocusedCellChangedRegistGrid(e) {
      console.log("eee1231231e",e)
      if (e.rowIndex !== undefined && e.column.dataField === 'qty') {
        if (this.gridDataShipmentRegist.length < 1) {
          return
        }

        let prevQty = parseInt(this.gridDataShipmentRegist[e.rowIndex].outQty)
        let newQty = parseInt(e.value)

        if (prevQty !== newQty) {
          let stockQty = parseInt(this.gridDataShipmentRegist[e.rowIndex].stockQty)

          if (stockQty !== newQty) {
            if (newQty > stockQty) {
              e.component.cellValue(e.row.rowIndex, 'outQty', stockQty)
              this.gridShipmentRegist.saveEditData()
              return
            }

            this.gridDataShipmentRegist[e.rowIndex].outQty = newQty

            let newAmount = newQty * parseInt(this.gridDataShipmentRegist[e.rowIndex].price.replace(/,/g, ''))
            let checkIndexes = new Array()

            for (let index = 0; index < this.gridDataShipmentRegist.length; ++index) {
              if (this.gridDataShipmentRegist[index].stockQty !== this.gridDataShipmentRegist[index].outQty) {
                checkIndexes.push(index)
              }
            }

            e.component.selectRowsByIndexes(checkIndexes)
            this.gridShipmentRegist.saveEditData()
          }
        }
      }
    },

    // 내용이 비었는지 체크
    isEmpty(str) {
      if (typeof str == 'undefined' || str == null || str == '')
        return true
      else
        return false
    },

    setOutDate(newData, value, currentRowData) {
      this.gridShipmentRegist.beginUpdate()
      this.gridDataShipmentRegist.forEach(element => {
        element.outDate = getDateFormat(value)
      });
      this.gridShipmentRegist.endUpdate()
    },

  }
}
</script>

<style scoped>
</style>