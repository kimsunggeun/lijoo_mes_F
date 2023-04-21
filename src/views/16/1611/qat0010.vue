<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
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
                <v-col cols="2">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1"
                    v-model="schCustCode"
                    :label="$t('custName')"
                    :items="custCodeList"
                    item-text="text"
                    item-value="value"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
            </v-layout>
            <!-- Date Picker -->
            <v-row no-gutters class="center pa-2 mr-0">
              <v-col cols="2">
                <v-menu
                  ref="startCal"
                  v-model="startCal"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      :label="$t('inRegiDate')"
                      v-model="startDate"
                      dense
                      outlined
                      color="primary"
                      readonly
                      class="required mx-1"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    no-title
                    @input="startInput"
                    :day-format="(date) => {return new Date(date).getDate();}"
                  />
                </v-menu>
              </v-col>
              <v-col cols="2">
                <v-menu
                  ref="endCal"
                  v-model="endCal"
                  :close-on-content-click="false"
                  :return-value.sync="endDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      :label="$t('endDate')"
                      v-model="endDate"
                      dense
                      outlined
                      readonly
                      color="primary"
                      class="required mx-1"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :min="startDate"
                    no-title
                    @input="endInput"
                    :day-format="(date) => {return new Date(date).getDate();}"
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
        <v-row class="pr-2">
          <i-card-vertical headerTitle="receiptInfo">
            <!-- 납품정보 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="sal0120Grid1"
                  class="doubleListBox03"
                  :ref="gridRef1"
                  :data-source="gridDataSource1"
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
                  :selection="{ mode:'none' }"
                  @focused-row-changed="focusedRowChanged_grid1"
                >
                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="custCode"
                    :caption="$t('custCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="custCode"
                      display-expr="custName"
                      value-expr="custCode"
                    />
                  </DxColumn>
                  <DxColumn
                    data-field="ordNo"
                    :caption="$t('ordNo_mat0020')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="no"
                    :caption="$t('number')"
                    width="auto"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="regiDate"
                    :caption="$t('inRegiDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="ilno"
                    :caption="$t('ilno')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('partNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
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
                  data-field="locCode"
                    :caption="$t('locName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup
                      :data-source="locCode"
                      display-expr="inWhname"
                      value-expr="inWhcode" />
                  </DxColumn>
                  <DxColumn
                    data-field="inQty"
                    :caption="$t('inQty')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="makeQty"
                    :caption="$t('makeQty')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
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
                    data-field="inPrice"
                    :caption="$t('inPrice')"
                    width="auto"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
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
                    data-field="inStatus"
                    :caption="$t('status')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                  
                  <DxLookup
                    :data-source="statusList"
                    display-expr="sysName"
                    value-expr="sysCode"
                  />
                  </DxColumn>
                  <DxColumn
                    data-field="supplyYn"
                    :caption="$t('supplyYn')"
                    width="auto"
                    data-type="boolean"
                    alignment="center" 
                    :allow-editing="false" 
                    edit-cell-template="checkBoxEditor"
                  />
                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="left"
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
                    alignment="left"
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
                    data-field="ilno2"
                    :caption="$t('partName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    :allow-editing="false"
                  />
                  <DxColumn />
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection  mode="single"/>
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox
                      :value="cellInfo.value == 'Y' ? true : false"
                      :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                    />
                  </template>
                </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-tabs>
        <v-tab @click="tabChange('검사내역')">{{$t('inspectionDetails2')}}</v-tab>
        <v-tab-item>
          <i-card-vertical
            headerTitle="inspectionDetails"
            :useBtnList="['btnSave','btnCancel']"
            @btnSave="btnSave('tab1')"
            @btnCancel="btnCancel('tab1')"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox05"
                    :ref="gridRef2"
                    :data-source="gridDataSource2"
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
                    :selection="{ mode:'none' }"
                    @editing-start="editingStart"
                    @cellPrepared="cellPrepared"
                    @FocusedCellChanged="onRowUpdated"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxColumn
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
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
                      data-field="inspNo"
                      :caption="$t('inspNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="insCode"
                      :caption="$t('insCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="insCodeList"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="insType"
                      :caption="$t('insType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="insTypeList"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="insMeth"
                      :caption="$t('insMeth')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="insMethList"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="jugCodeh"
                      :caption="$t('jugCodeh')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="jugCodehList"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="insUnit"
                      :caption="$t('insUnit')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="insUnitList"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="insUpp"
                      :caption="$t('insUpp')"
                      width="auto"
                      data-type="number"
                      alignment="right"
                      format="#,##0"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="insLow"
                      :caption="$t('insLow')"
                      width="auto"
                      data-type="number"
                      alignment="right"
                      format="#,##0"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="insBase"
                      :caption="$t('insBase')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="judge"
                      :caption="$t('judge')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup
                        :data-source="judgeList"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="insCnt"
                      :caption="$t('insCnt')"
                      width="auto"
                      data-type="number"
                      alignment="right"
                      format="#,##0"
                      :allow-editing="false"
                    />
                    <DxColumn data-field="sample" :caption="$t('sample')" alignment="center">
                      <DxColumn
                        data-field="sample1"
                        :caption="$t('sampleQty1')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample2"
                        :caption="$t('sampleQty2')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample3"
                        :caption="$t('sampleQty3')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample4"
                        :caption="$t('sampleQty4')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                      <DxColumn
                        data-field="sample5"
                        :caption="$t('sampleQty5')"
                        width="auto"
                        data-type="string"
                        alignment="right"
                        :allow-editing="true"
                        edit-cell-template="myEditor"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="maker"
                      :caption="$t('maker')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
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
                      format="yyyy-MM-dd"
                    />
                    
                    <DxColumn data-field="comCode" :visible="false" />
                    <DxColumn data-field="facCode" :visible="false" />
                    <DxColumn data-field="ilno" :visible="false" />
                    <DxColumn data-field="ordNo" :visible="false" />
                    <DxColumn data-field="no" :visible="false" />
                    <DxColumn data-field="regiDate" :visible="false" />
                    <DxColumn data-field="inQty" :visible="false" />
                    <DxColumn data-field="makeQty" :visible="false" />
                    <DxColumn data-field="boxQty" :visible="false" />
                    <DxColumn data-field="inAmount" :visible="false" />
                    <DxColumn data-field="locCode" :visible="false" />
                    <DxColumn />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <template #myEditor="{ data : cellInfo }">
                      <DxSelectBox
                        v-if="cellInfo.data.jugCodeh == '10'"
                        :value="cellInfo.value"
                        :data-source="sampleList"
                        display-expr="sysName"
                        value-expr="sysCode"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                      <DxTextBox
                        v-else
                        :value="cellInfo.value"
                        :onValueChanged="(value) => onCellValueChanged(value.value, cellInfo)"
                      />
                    </template>
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-tab-item>
        <v-tab-item>
          <i-card-vertical
            headerTitle="receiptDetails"
            :useBtnList="[
            'btnDelete'
          ]"
            @btnDelete="btnDelete('입고내역')"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="gridDataSource3"
                    class="doubleListBox05"
                    :ref="gridRef3"
                    :data-source="gridDataSource3"
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
                      data-field="facCode"
                      :caption="$t('facCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="ordNo"
                      :caption="$t('ordNo_mat0020')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="no"
                      :caption="$t('number')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('inRegiDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="ilno"
                      caption="입고번호(일련번호)"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="serialNo"
                      :caption="$t('serialNo')"
                      width="auto"
                      data-type="string"
                      alignment="right"
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
                      :caption="$t('purchLotNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('purchLotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="qty"
                      :caption="$t('qty')"
                      width="auto"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <!-- <DxColumn
                      data-field="printType"
                      :caption="$t('printType')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="false"
                    /> -->
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
                      alignment="left"
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
                      alignment="left"
                      :allow-editing="false"
                    />
                    <DxColumn />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
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
import iDataTable from '@/components/common/iDataTable.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxButton, DxScrollView, DxLookup, DxEditing } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'
import DxTextBox from 'devextreme-vue/text-box'
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' // message
import { getCurrentDate, getPreMonth } from '@/utils/common.js'
import themes from 'devextreme/ui/themes'
import { getUserId, getComCode } from '@/utils/token'
import { getUser } from '@/api/system/userManage'
import { getDelInfo, getInsDetails, getMaxOrdNo, saveInsDetails, getFacName, getMat0018Info, deleteQat0010 } from '@/api/view/qat0010'
import { getCustCodeName } from '@/api/view/bas0044'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getMat0010Info, getAccount } from '@/api/view/mat0010'
import { text } from 'body-parser'
import { getCompany } from '@/api/system/companyManage'
import { getInWhcodeName } from '@/api/view/bas0042'
export default {
  name: 'qat0010',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxLookup,
    ICardTop,
    DxEditing,
    DxSelectBox,
    DxTextBox
  },
  data() {
    return {
      checkBoxesMode: 'always',
      //납품정보
      gridDataSource1: [],
      gridRef1: 'gridRef1',
      //검사내역
      gridDataSource2: [],
      gridRef2: 'gridRef2',
      //입고내역
      gridDataSource3: [],
      gridRef3: 'gridRef3',

      //입고대기 여부
      inInspYn: '',
	
      //LookUp
      comCodeList: [],
      facCodeList: [],
      custCodeList: [],
      statusList: [],
      insCodeList: [],
      insTypeList: [],
      insMethList: [],
      jugCodehList: [],
      insUnitList: [],
      sampleList: [],
      judgeList: [],
      locCode: [],

      //달력
      startCal: false,
      endCal: false,
      startDate: getCurrentDate(),
      endDate: getCurrentDate(),

      //조회 변수
      searchComCode: '',
      searchFacCode: '',
      schCustCode: '',

      //검사내역-판정방법코드
      jugCodeh: true,

      //입고상태
      inStatus: '',
      mainGridData: [],
      custCode: [],
      rowIndex: ''      
    }
  },
  watch: {
    
  },
  beforeMount() {
    //거래처명
    let params = {
      comCode: getComCode(),
      userFlag: 'Y',
      userId: getUserId()
    }
    Promise.all([getAccount(params)])
      .then(res => {
        res[0].list.forEach(e => {
          this.custCodeList.push({
            value: e.custCode,
            text: e.custName
          })
        })
        this.custCode = res[0].list.slice()
      })
      .catch(error => {})
  },
  computed: {
    gridFist() {
      return this.GetDataGrid(this.gridRef1)
    },
    gridSecond() {
      return this.GetDataGrid(this.gridRef2)
    }
  },
  created() {
    this.lookupList()
  },
  methods: {
    //LookUp 관련
    async lookupList() {
      //공장명
      const comCode = {
        comCode: getComCode()
      }
      //입고상태
      const inStatus = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'IN_STATE'
      }
      //검사유형 코드
      const insType = {
        comCode: getComCode(),
        code: 'INPT,INS_TYPE,INS_METH,JUG_CODEH,UNIT,SAMPLE,JUDGE'
      }
      const comCodeData = {
        comCode: getComCode()
      }
      getCompany(comCodeData).then(res => {
        res.list.forEach(e => {
          this.comCodeList.push({
            value: e.comCode,
            text: e.comName
          })
        })
        this.searchComCode = res.list[0].comCode
      })
      getFacName(comCodeData).then(res => {
        res.list.forEach(e => {
          this.facCodeList.push({
            value: e.facCode,
            text: e.facName
          })
        })
        this.searchFacCode = res.list[0].facCode
      })
      await Promise.all([getFacName(comCode), getCustCodeName(comCode), getCmChildCode(inStatus), getCmChildCode(insType), getInWhcodeName(comCode)]).then(res => {
        //거래처
        let cnt = 0
        //입고상태
        this.statusList = res[2].list
        //검사유형
        res[3].list
          .filter(word => word.code === 'INPT')
          .forEach(e => {
            this.insCodeList.push(e)
          })
        //검사항목
        res[3].list
          .filter(word => word.code === 'INS_TYPE')
          .forEach(e => {
            this.insTypeList.push(e)
          })
        //측정방법
        res[3].list
          .filter(word => word.code === 'INS_METH')
          .forEach(e => {
            this.insMethList.push(e)
          })
        //판정방법
        res[3].list
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push(e)
          })
        //검사단위
        res[3].list
          .filter(word => word.code === 'UNIT')
          .forEach(e => {
            this.insUnitList.push(e)
          })
        //시료
        res[3].list
          .filter(word => word.code === 'SAMPLE')
          .forEach(e => {
            this.sampleList.push(e)
          })
        //판정
        res[3].list
          .filter(word => word.code === 'JUDGE')
          .forEach(e => {
            this.judgeList.push(e)
          })
        //위치명
        this.locCode = res[4].list
      })
    },
    //시작일 선택
    startInput(e) {
      this.startCal = false
      this.startDate = e
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate
      }
    },
    //종료일 선택
    endInput(e) {
      this.endCal = false
      this.$refs.endCal.save(e)
    },
    //조회 Button
    btnSearch() {
      this.doSearchMain()
    },
    doSearchMain() {
      this.openLoading()
      const srcData = {
        comCode: this.searchComCode,
        facCode: 'FAC01',
        custCode: this.schCustCode,
        startDate: this.startDate,
        endDate: this.endDate
      }
      getDelInfo(srcData)
        .then(res => {
          if (res.success) {
            this.gridDataSource1 = res.list
          }
          if (this.gridDataSource1.length === 0) {
            this.mainGridData = []
            this.gridDataSource2 = []
            this.gridDataSource3 = []
            this.doSearchDetail()
          }
        })
        .finally(() => {
          this.gridFist.option('focusedRowIndex', -1)
          this.gridFist.option('focusedRowIndex', 0)
          this.gridFist.clearSelection()
          this.gridSecond.clearSelection()
          this.endLoading()
        })
    },
    //검사내역 조회
    doSearchDetail() {
      getInsDetails(this.mainGridData)
        .then(res => {
          if (res.success) {
            res.list.forEach(e => {
              if (e.judge === '' || e.judge === null) {
                this.judge = '30'
              }
              e.inPrice = this.mainGridData.inPrice
            })
            this.gridDataSource2 = res.list
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },
    focusedRowChanged_grid1(e) {
      if (e.row === undefined) {
        return
      }
      this.rowIndex = e.rowIndex
      this.inStatus = e.row.data.inStatus
      this.mainGridData = e.row.data
      this.doSearchDetail()
    },
    editingStart(e) {
      let cnt = e.data.insCnt
      // 만약 시료수(e.data.insCnt)의 수가 2라면
      for (let i = 0; i < 5 - cnt; i++) {
        // 5에서 2를 뺀 3보다 i값이 적을때만 for문 작동 (0,1,2)
        if (e.column.index == 18 - i) {
          // 만약 컬럼 인덱스가 18-i인 17, 16, 15인 컬럼을
          e.cancel = true // 작성하지 못하게 막음
        }
      }
    },
    //검사내역 cellPrepared
    cellPrepared(e) {
      if (e.rowType === 'data') {
        let cnt = e.data.insCnt
        if (e.column.index > 13 && e.column.index <= 18) {
          if (e.column.index > 13 + parseInt(cnt) && e.column.index <= 18) {
            e.cellElement.style.backgroundColor = 'red'
          }
        }
      }
    },

    onRowUpdated(e) {
      //행이 업데이트 된 후 실행되는 함수(행의 어느 컬럼이든 값이 바뀌면 실행함)
      if (e.row.data.jugCodeh == '20') {
        //컬럼의 값을 바꿨는데 그게 판정방법이 치수인 행이라면
        //치수
        const Rpm = e.row.data // 입력된 값을 Rpm에 저장 (ex.시료1에 12 입력 => Rpm = 12)
        let arr = new Array(Rpm.insCnt) // insCnt(2) 크기만큼의 배열을 만듦

        for (let i = 1; i <= Rpm.insCnt; i++) {
          // i가 2보다 작거나 같을때까지 반복
          arr[i - 1] = Rpm['sample' + i] // arr[0]에 Rpm[sample+1]의 값을 넣음, arr[1]에 Rpm[sample+2]의 값을 넣음
        }
        let chk = arr.find(e => e === null)
        if (chk === undefined) {
          for (let i = 0; i < Rpm.insCnt; i++) {
            // Rpm.insCnt = 2 // 0,1, 2번반복
            if (typeof arr[i] !== 'undefined') {
              //만약 arr[0] 또는 arr[1]의 값이 undefined이 아니라면
              if (parseInt(Rpm.insUpp) < parseInt(arr[i]) || (parseInt(Rpm.insLow) > parseInt(arr[i]) && arr[i] != null)) {
                return this.gridSecond.cellValue(e.row.key - 1, 'judge', 20)
              } else {
                this.gridSecond.cellValue(e.rowIndex, 'judge', 10)
              }
            }
            if (arr[i] === undefined || arr[i] === null || arr[i] === '') {
              if (arr[i] != null) return this.gridSecond.cellValue(e.rowIndex, 'judge', 20)
            }
          }
        }
      }
      if (e.row.data.jugCodeh == '10') {
        // OK/NG
        const Rpm2 = e.row.data
        let arr2 = new Array(Rpm2.insCnt)
        for (let i = 1; i <= Rpm2.insCnt; i++) {
          arr2[i - 1] = Rpm2['sample' + i]
        }
        let chk = arr2.find(e => e === null)
        if (chk === undefined) {
          let array = arr2.find(e => e === 'NG')
          if (array === 'NG') {
            return this.gridSecond.cellValue(e.rowIndex, 'judge', 20)
          } else {
            this.gridSecond.cellValue(e.rowIndex, 'judge', 10)
          }
        }
      }
      // for (let i = 0; i < Rpm2.insCnt; i++) {
      //   if (typeof arr2[i] !== 'undefined') {
      //     if (arr2[i] != 'OK') {
      //       return this.gridSecond.cellValue(e.rowIndex, 'judge', 20)
      //     }
      //     if (arr2[i] === 'OK') {
      //       this.gridSecond.cellValue(e.rowIndex, 'judge', 10)
      //     }
      //   }
      // }
    },
    //저장버튼
    async btnSave(tab) {
      if (tab === 'tab1') {
        await this.gridSecond.saveEditData()
        let selectAll = await this.gridSecond.getSelectedRowsData()
        if (selectAll.length === 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
      console.log('selec',selectAll[selectAll.length - 1])
        if (this.inStatus === '40') {
          return this.vToastify('[입고상태]가 [검사입고]인 데이터는 저장 할 수 없습니다.', 'warn')
        }
        for (let i = 0; i < selectAll.length; i++) {
          if (selectAll[i].judge === null) {
            this.vToastify('판정되지 않은 정보가 있습니다.', 'warn')
          }
          selectAll[i].ilno = this.mainGridData.ilno
        }
        console.log('selectAll',selectAll)
        // 유효성 체크
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridSecond.beginUpdate()
            saveInsDetails(selectAll)
              .then(res => {
                if (res.success) {
                  this.gridDataSource2 = []
                  this.btnSearch()

                  notify('Saved', 'success', 3000)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.gridSecond.endUpdate()
                this.gridSecond.clearSelection()
                this.btnSearch()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //취소버튼
    async btnCancel(gbn) {
      if (gbn === 'tab1') {
        var selectedMainRows = await this.gridSecond.getSelectedRowsData()
        for(let i = 0; i < selectedMainRows.length; i++){
          selectedMainRows[i].custCode = this.mainGridData.custCode
        }
        if (selectedMainRows.length <= 0) {
          return this.vToastify('선택된 데이터가 없습니다.', 'warn')
        }
        getMat0018Info(this.mainGridData)
          .then(res =>
            res.list.forEach(e => {
              this.inInspYn = e.inInspYn
            })
          )
        for (let i=0; i < selectedMainRows.length; i++){
          selectedMainRows[i].inStatus2 = '30'
          selectedMainRows[i].ilno2 = this.mainGridData.ilno
          selectedMainRows[i].inInspYn = this.inInspYn
        }
        // setTimeout(function() {
        // },500)
        if (selectedMainRows[0].judge === null){
          this.vToastify('삭제할 데이터가 없습니다.', 'warn')
          return
        }
        console.log('rows : ', selectedMainRows)
        this.vToastifyPrompt(
          this.$t('cancleCheck'),
          'info',
          () => {
            this.openLoading()
            this.gridSecond.beginUpdate()
            deleteQat0010(selectedMainRows)
              .then(res => {
                notify('취소되었습니다.', 'success', 3000)
              })
              .catch(error => {
                notify(error, 'error', 3000)
              })
              .finally(() => {
                this.gridSecond.endUpdate()
                this.gridSecond.clearSelection()
                this.doSearchMain()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    tabChange(e) {
      if (e === '입고내역') {
        this.gridFist.option('focusedRowIndex', -1)
        this.gridFist.option('focusedRowIndex', this.rowIndex)
      }
      if (e === '검사내역') {
        this.gridFist.option('focusedRowIndex', -1)
        this.gridFist.option('focusedRowIndex', this.rowIndex)
      }
    }
  }
}
</script>
<style scoped>
</style>