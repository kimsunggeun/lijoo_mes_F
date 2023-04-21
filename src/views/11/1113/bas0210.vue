<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" class="pa-1 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-row class="mb-2">
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 공장명 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchComCode"
                  :label="$t('comCode')"
                  :items="comCodeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 품목군 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchItemType"
                  :label="$t('itemType')"
                  :items="itemTypeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 제품군 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchPartType"
                  :label="$t('suite')"
                  :items="partTypeList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <!-- 사용유무 -->
                <v-autocomplete
                  :menu-props="{offsetY: true}"
                  color="primary"
                  class="mt-2"
                  v-model="searchUserFlag"
                  :label="$t('userFlag')"
                  :items="userFlagList"
                  item-text="text"
                  item_value="value"
                  prepend-inner-icon="$search"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
      <v-col cols="4" class="pa-1">
        <v-tabs color="#000">
          <v-tab class="mr-2">{{$t('tabItemSelection')}}</v-tab>
          <v-tab-item>
            <i-card-vertical headerTitle="itemSelection">
              <template v-slot:body>
                <v-layout column overflow-auto>
                  <!-- 품목선택 -->
                  <DxDataGrid
                    id="itemSelection"
                    class="listBox04"
                    :ref="itemSelectionRef"
                    :data-source="itemSelection"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    column-resizing-mode="widget"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    :selection="{ mode:'none' }"
                    @focused-row-changed="focusedRowChanged_itemSelection"
                    @row-click="itemRowClick"
                  >
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxColumn
                      data-field="id"
                      caption="No"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="comCode"
                      :caption="$t('codeName')"
                      data-type="string"
                      alignment="left"
                      :visible="false"
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
                      data-field="spec"
                      :caption="$t('spec')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="sysName"
                      :caption="$t('suite')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                  </DxDataGrid>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <v-col cols="8" class="pa-1">
        <v-tabs color="#000" @change="tabChange">
          <v-tab class="mr-2">{{$t('tabItemInfoTitle')}}</v-tab>
          <v-tab class="mr-2">{{$t('tabCustomerInfo')}}</v-tab>

          <v-tab-item>
            <i-card-vertical
              headerTitle="itemInfoTitle"
              :useBtnList="[
                'btnAdd', //신규
                'btnSave', //저장
                'btnDelete' //삭제
              ]"
              @btnAdd="btnAdd('item')"
              @btnSave="btnSave('item')"
              @btnDelete="btnDelete('item')"
            >
              <template v-slot:body>
                <v-layout column overflow-auto>
                  <!-- 품목정보 -->
                  <DxDataGrid
                    id="itemInfo"
                    class="listBox04"
                    :ref="itemInfoRef"
                    :data-source="itemInfoData"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    column-resizing-mode="widget"
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
                      data-field="partNo"
                      :caption="$t('partNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="partName"
                      :caption="$t('partName')"
                      width="auto"
                      data-type="string"
                      alignment="left"
                      :allow-editing="true"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="spec"
                      :caption="$t('spec')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="itemType"
                      :caption="$t('itemTypeNm')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    >
                      <DxLookup
                        :data-source="lookup.itemType"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="partType"
                      :caption="$t('partTypeNm')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    >
                      <DxLookup
                        :data-source="lookup.partType"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="unit"
                      :caption="$t('unit')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    >
                      <DxLookup
                        :data-source="lookup.unit"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="inWh"
                      :caption="$t('inWhName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    >
                      <DxLookup
                        :data-source="lookup.inWhcode"
                        display-expr="inWhname"
                        value-expr="inWhcode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="outWh"
                      :caption="$t('outWhName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    >
                      <DxLookup
                        :data-source="lookup.outWhcode"
                        display-expr="inWhname"
                        value-expr="inWhcode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="lotSize"
                      :caption="$t('lotSize')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="safeCnt"
                      :caption="$t('safeCnt')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="inInsp"
                      :caption="$t('inInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="proInsp"
                      :caption="$t('proInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="rotInsp"
                      :caption="$t('rotInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="outInsp"
                      :caption="$t('outInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="lastInsp"
                      :caption="$t('lastInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="supInsp"
                      :caption="$t('supInsp')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn
                      data-field="leadTime"
                      :caption="$t('leadTime')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="weightYn"
                      :caption="$t('weightYn')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    >
                      <DxLookup
                        :data-source="lookup.userFlag"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="weight"
                      :caption="$t('weight')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="userDef1"
                      :caption="$t('userDef1')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="userDef2"
                      :caption="$t('userDef2')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="userDef3"
                      :caption="$t('userDef3')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500px"
                      data-type="string"
                      alignment="center"
                      :allow-editing="true"
                    />
                    <DxColumn
                      data-field="userFlag"
                      :caption="$t('userFlag')"
                      width="auto"
                      data-type="boolean"
                      alignment="center"
                      :allow-editing="true"
                      edit-cell-template="checkBoxEditor"
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
                      data-field="maker"
                      :caption="$t('maker')"
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
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection
                      select-all-mode="allMode"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                    <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />
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
          </v-tab-item>

          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="customerInfoByItemTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete' //삭제
                ]"
                @btnAdd="btnAdd('customInfo')"
                @btnSave="btnSave('customInfo')"
                @btnDelete="btnDelete('customInfo')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <!-- 품목별 거래처정보 -->
                    <DxDataGrid
                      id="itemCustomInfo"
                      class="doubleListBox02"
                      :ref="itemCustomInfoRef"
                      :data-source="itemCustomInfoData"
                      :remote-operations="false"
                      :hover-state-enabled="true"
                      :allow-column-resizing="true"
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true"
                      :show-borders="true"
                      :width="grid.width"
                      :show-row-lines="true"
                      column-resizing-mode="widget"
                      key-expr="id"
                      :focused-row-enabled="true"
                      :column-hiding-enabled="false"
                      @focused-row-changed="focusedRowChanged_itemCustomInfo"
                      @CellDblClick="custPopOpen"
                      @row-click="itemCustRowClick"
                      @editing-start="itemCustEditingStart"
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
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="true"
                      />
                      <DxColumn
                        data-field="custCode"
                        :caption="$t('custName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        css-class="devest-grid-header-require"
                      >
                      <DxLookup
                        :data-source="lookup.custCode"
                        display-expr="custName"
                        value-expr="custCode"
                      />
                      </DxColumn>
                      <DxColumn
                        data-field="custType"
                        :caption="$t('custTypeNm')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        css-class="devest-grid-header-require" 
                      >
                        <DxLookup
                          :data-source="lookup.custType"
                          display-expr="sysName"
                          value-expr="sysCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="matType"
                        :caption="$t('matTypeNm')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        css-class="devest-grid-header-require" 
                      >
                        <DxLookup
                          :data-source="lookup.matType"
                          display-expr="sysName"
                          value-expr="sysCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="name"
                        :caption="$t('name')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="true"
                        css-class="devest-grid-header-require" 
                      />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
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
                        data-field="maker"
                        :caption="$t('maker')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      
                      <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                      <DxSelection
                        select-all-mode="allMode"
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
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
            <v-row class="mt-9">
              <i-card-vertical
                headerTitle="unitPriceInfoTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete' //삭제
                ]"
                @btnAdd="btnAdd('price')"
                @btnSave="btnSave('price')"
                @btnDelete="btnDelete('price')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <!-- 단가정보 -->
                    <DxDataGrid
                      id="priceInfo"
                      class="doubleListBox02"
                      :ref="priceInfoRef"
                      :data-source="priceInfoData"
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
                      @editing-start="priceEditingStart"
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
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="custCode"
                        :caption="$t('custCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="appStartDate"
                        :caption="$t('appStartDate')"
                        width="auto"
                        data-type="date"
                        alignment="center"
                        format="yyyy-MM-dd"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="appEndDate"
                        :caption="$t('appEndDate')"
                        width="auto"
                        data-type="date"
                        alignment="center"
                        format="yyyy-MM-dd"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="modiYn"
                        :caption="$t('modiYN')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="appYn"
                        :caption="$t('appYN')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn
                        data-field="price"
                        :caption="$t('price')"
                        width="auto"
                        data-type="number"
                        format="#,###.##"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="unit"
                        :caption="$t('unit')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.unitCURR"
                          display-expr="sysName"
                          value-expr="sysCode"
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
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
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
                        data-field="maker"
                        :caption="$t('maker')"
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
                        data-field="editor"
                        :caption="$t('editor')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn  data-field="" caption="" data-type="string"  alignment="center" width="auto" :allow-editing="false" />
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                      <DxSelection
                        select-all-mode="allMode"
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
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="pathTypeTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete' //삭제
                ]"
                @btnAdd="btnAdd('pathType')"
                @btnSave="btnSave('pathType')"
                @btnDelete="btnDelete('pathType')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <!-- 경로유형(경로정보 Tab) -->
                    <DxDataGrid
                      id="pathType"
                      class="doubleListBox02"
                      :ref="pathTypeRef"
                      :data-source="pathTypeData"
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
                      @focused-row-changed="pathTypeFocRowchange"
                      @editing-start="pathTypeEditingStart"
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
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathType"
                        :caption="$t('pathTypeName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.pathType"
                          display-expr="sysName"
                          value-expr="sysCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="pathCode"
                        :caption="$t('pathName')"
                        width="15%"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.pathCode"
                          display-expr="pathName"
                          value-expr="pathCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="inWhcode"
                        :caption="$t('inWhName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.inWhcode"
                          display-expr="inWhname"
                          value-expr="inWhcode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="remark"
                        :caption="$t('remark')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
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
                        data-field="maker"
                        :caption="$t('maker')"
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
                        data-field="editor"
                        :caption="$t('editor')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxPaging :enabled="false" />
                      <DxSelection
                        select-all-mode="allMode"
                        :show-check-boxes-mode="checkBoxesMode"
                        mode="multiple"
                      />
                      <DxPager :show-page-size-selector="false" />
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
            <v-row class="mt-9">
              <i-card-vertical
                headerTitle="routeInfoTitle"
                :useBtnList="['btnSave']"
                @btnSave="btnSave('routeInfo')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <!-- 경로정보 -->
                    <DxDataGrid
                      id="routeInfo"
                      class="doubleListBox02"
                      :ref="routeInfoRef"
                      :data-source="routeInfoData"
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
                        :visible="false"
                      />
                      <DxColumn
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathType"
                        :caption="$t('pathTypeName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup
                          :data-source="lookup.pathType"
                          display-expr="sysName"
                          value-expr="sysCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="pathCode"
                        :caption="$t('pathName')"
                        width="150px"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup
                          :data-source="lookup.pathCode"
                          display-expr="pathName"
                          value-expr="pathCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="pathNo"
                        :caption="$t('pathNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="proCode"
                        :caption="$t('proName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup
                          :data-source="lookup.proCode"
                          display-expr="proName"
                          value-expr="proCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="matCost"
                        :caption="$t('matCost')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="proCost"
                        :caption="$t('proCost')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="labCost"
                        :caption="$t('labCost')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="remark"
                        :caption="$t('remark')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
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
                        data-field="maker"
                        :caption="$t('maker')"
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
                        data-field="editor"
                        :caption="$t('editor')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxPaging :enabled="false" />
                      <DxSelection
                        select-all-mode="allMode"
                        :show-check-boxes-mode="checkBoxesMode"
                        mode="multiple"
                      />
                      <DxPager :show-page-size-selector="false" />
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
          </v-tab-item>

          <v-tab-item>
            <v-row>
              <i-card-vertical headerTitle="pathTypeTitle">
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <!-- 경로유형(BOM Tab) -->
                    <DxDataGrid
                      id="pathType2"
                      class="doubleListBox02"
                      :ref="pathTypeRef2"
                      :data-source="pathTypeData2"
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
                      @focused-row-changed="pathTypeFocRowchange2"
                      :selection="{ mode:'none' }"
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
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathType"
                        :caption="$t('pathTypeName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.pathType"
                          display-expr="sysName"
                          value-expr="sysCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="pathCode"
                        :caption="$t('pathCode')"
                        width="15%"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.pathCode"
                          display-expr="pathName"
                          value-expr="pathCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="inWhcode"
                        :caption="$t('inWhName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.inWhcode"
                          display-expr="inWhname"
                          value-expr="inWhcode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="remark"
                        :caption="$t('remark')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
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
                        data-field="maker"
                        :caption="$t('maker')"
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
                        data-field="editor"
                        :caption="$t('editor')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />

                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
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
            <v-row class="mt-9">
              <i-card-vertical
                headerTitle="bomInfoTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete' //삭제
                ]"
                @btnAdd="btnAdd('bom')"
                @btnSave="btnSave('bom')"
                @btnDelete="btnDelete('bom')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <!-- BOM정보 -->
                    <DxDataGrid
                      id="bomInfo"
                      class="doubleListBox02"
                      :ref="bomInfoRef"
                      :data-source="bomInfoData"
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
                      @CellDblClick="itemPopOpen"
                      @editing-start="bomInfoEditingStart"
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
                        data-field="partNo"
                        :caption="$t('partNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathType"
                        :caption="$t('pathTypeName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathCode"
                        :caption="$t('pathCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathNo"
                        :caption="$t('pathNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="proCode"
                        :caption="$t('proName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup
                          :data-source="lookup.proCode"
                          display-expr="proName"
                          value-expr="proCode"
                        />
                      </DxColumn>
                      <DxColumn
                        data-field="level"
                        :caption="$t('level')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="paPartNo"
                        :caption="$t('paPartNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="no"
                        :caption="$t('No')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="childPartNo"
                        :caption="$t('childPartNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="amount"
                        :caption="$t('consumption')"
                        width="auto"
                        data-type="number"
                        format="#,###"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="remark"
                        :caption="$t('remark')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="true"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn
                        data-field="makeDate"
                        :caption="$t('makeDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        format="yyyy-MM-dd"
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
                        data-field="editDate"
                        :caption="$t('editDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        format="yyyy-MM-dd"
                      />
                      <DxColumn
                        data-field="editor"
                        :caption="$t('editor')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
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
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <!-- 품목정보 추가 팝업창 -->
    <DxPopup
      :visible.sync="itemInfoVisible"
      :show-close-button="true"
      :show-title="true"
      :title="$t('itemInfo')"
      height="700px"
      width="1000px"
    >
      <DxScrollView height="100%" width="100%">
        <v-row dense style="border-bottom: 1px solid black;">
          <v-col cols="auto">
            <span class="mainItem">{{$t('mainItem')}}</span>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row no-gutters style="padding:10px;">
          <v-col class="itemPop" cols="12">
            <!-- Line1 -->
            <v-row dense style="margin-top:10px;">
              <!-- 품번 -->
              <v-col cols="6">
                <span>{{$t('partNo')+'*'}}</span>
                <v-text-field
                  v-model="itemPopPartNo"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                  background-color="#fff2e0"
                ></v-text-field>
              </v-col>
              <!-- 품명 -->
              <v-col cols="6">
                <span>{{$t('partName')+'*'}}</span>
                <v-text-field
                  v-model="itemPopPartName"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                  background-color="#fff2e0"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Line2 -->
            <v-row dense>
              <!-- 규격 -->
              <v-col cols="6">
                <span>{{$t('spec')}}</span>
                <v-text-field
                  v-model="itemPopSpec"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                  background-color="#fff2e0"
                ></v-text-field>
              </v-col>
              <!-- 품목군 코드 -->
              <v-col cols="6">
                <span>{{$t('itemType')}}</span>
                <v-select
                  v-model="itemTypeSelect"
                  :items="itemTypePopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  background-color="#fff2e0"
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line3 -->
            <v-row dense>
              <!-- 제품군 코드 -->
              <v-col cols="6">
                <span>{{$t('partType')}}</span>
                <v-select
                  v-model="partTypeSelect"
                  :items="partTypePopList"
                  item-text="text"
                  item-value="value"
                  clearable
                  dense
                  outlined
                  background-color="#fff2e0"
                ></v-select>
              </v-col>
              <!-- 단위 코드 -->
              <v-col cols="6">
                <span>{{$t('unit')}}</span>
                <v-select
                  v-model="unitSelect"
                  :items="unitPopList"
                  item-text="text"
                  item-value="value"
                  clearable
                  dense
                  outlined
                  background-color="#fff2e0"
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line4 -->
            <v-row dense>
              <!-- 입고창고 코드 -->
              <v-col cols="6">
                <span>{{$t('inWh')}}</span>
                <v-select
                  v-model="inWhSelect"
                  :items="whPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  background-color="#fff2e0"
                ></v-select>
              </v-col>
              <!-- 출고창고 코드 -->
              <v-col cols="6">
                <span>{{$t('outWh')}}</span>
                <v-select
                  v-model="outWhSelect"
                  :items="whPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  background-color="#fff2e0"
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line5 -->
            <v-row dense>
              <!-- 로트크기 -->
              <v-col cols="6">
                <span>{{$t('lotSize')}}</span>
                <v-text-field
                  v-model="itemPopLotSize"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                  background-color="#fff2e0"
                ></v-text-field>
              </v-col>
              <!-- 안전재고 -->
              <v-col cols="6">
                <span>{{$t('safeCnt')}}</span>
                <v-text-field v-model="itemPopSafeCnt" dense outlined hide-details="auto" clearable></v-text-field>
              </v-col>
            </v-row>
            <!-- Line6 -->
            <v-row dense>
              <!-- 입고검사 유무 -->
              <v-col cols="6">
                <span>{{$t('inInsp')}}</span>
                <v-select
                  v-model="inInspSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <!-- 공정검사 유무 -->
              <v-col cols="6">
                <span>{{$t('proInsp')}}</span>
                <v-select
                  v-model="proInspSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line7 -->
            <v-row dense>
              <!-- 순회검사 유무 -->
              <v-col cols="6">
                <span>{{$t('rotInsp')}}</span>
                <v-select
                  v-model="rotInspSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <!-- 출하검사 유무 -->
              <v-col cols="6">
                <span>{{$t('outInsp')}}</span>
                <v-select
                  v-model="outInspSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line8 -->
            <v-row dense>
              <!-- 최종검사 유무 -->
              <v-col cols="6">
                <span>{{$t('lastInsp')}}</span>
                <v-select
                  v-model="lastInspSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <!-- 공급처 출하검사여부 -->
              <v-col cols="6">
                <span>{{$t('supInsp')}}</span>
                <v-select
                  v-model="supInspSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line9 -->
            <v-row dense>
              <!-- 리드타임 -->
              <v-col cols="6">
                <span>{{$t('leadTime')}}</span>
                <v-text-field
                  v-model="itemPopLeadTime"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                ></v-text-field>
              </v-col>
              <!-- 단중사용여부 -->
              <v-col cols="6">
                <span>{{$t('weightYn')}}</span>
                <v-select
                  v-model="weightYnSelect"
                  :items="userYnPopList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <!-- Line10 -->
            <v-row dense>
              <!-- 단중 -->
              <v-col cols="6">
                <span>{{$t('weight')}}</span>
                <v-text-field v-model="itemPopWeight" dense outlined hide-details="auto" clearable></v-text-field>
              </v-col>
              <!-- 사용유무 -->
              <v-col cols="6">
                <span>{{$t('userFlag')}}</span>
                <v-checkbox
                  v-model="itemPopUserFlag"
                  :label="`${itemPopUserFlag ? $t('use') : $t('unused')} `"
                ></v-checkbox>
              </v-col>
            </v-row>
            <!-- Line11 -->
            <v-row dense>
              <!-- 사용자정의1 -->
              <v-col cols="6">
                <span>{{$t('userDef1')}}</span>
                <v-text-field
                  v-model="itemPopUserDef1"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                ></v-text-field>
              </v-col>
              <!-- 사용자정의2 -->
              <v-col cols="6">
                <span>{{$t('userDef2')}}</span>
                <v-text-field
                  v-model="itemPopUserDef2"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Line12 -->
            <v-row dense>
              <!-- 사용자정의3 -->
              <v-col cols="6">
                <span>{{$t('userDef3')}}</span>
                <v-text-field
                  v-model="itemPopUserDef3"
                  dense
                  outlined
                  hide-details="auto"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Line13 -->
            <v-row dense>
              <!-- 비고 -->
              <v-col cols="12">
                <span>{{$t('remark')}}</span>
                <v-text-field v-model="itemPopRemark" dense outlined hide-details="auto" clearable></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense style="border-bottom: 1px solid black; margin-top:10px;">
          <v-col cols="auto">
            <span class="mainItem">{{$t('registrantInfo')}}</span>
          </v-col>
          <v-spacer />
        </v-row>
        <!-- 등록정보 -->
        <v-row no-gutters style="padding:10px;">
          <v-col cols="12">
            <v-row dense class="itemPop">
              <!-- 등록일 -->
              <v-col cols="6">
                <span>{{$t('makeDate')}}</span>
                <v-text-field
                  v-model="itemPopMakeDate"
                  dense
                  outlined
                  hide-details="auto"
                  :readonly="true"
                ></v-text-field>
              </v-col>
              <!-- 등록자 -->
              <v-col cols="6">
                <span>{{$t('maker')}}</span>
                <v-text-field
                  v-model="itemPopMaker"
                  dense
                  outlined
                  hide-details="auto"
                  :readonly="true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense class="itemPop">
              <!-- 수정일 -->
              <v-col cols="6">
                <span>{{$t('editDate')}}</span>
                <v-text-field
                  v-model="itemPopEditDate"
                  dense
                  outlined
                  hide-details="auto"
                  :readonly="true"
                ></v-text-field>
              </v-col>
              <!-- 수정자 -->
              <v-col cols="6">
                <span>{{$t('editor')}}</span>
                <v-text-field
                  v-model="itemPopEditor"
                  dense
                  outlined
                  hide-details="auto"
                  :readonly="true"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="right">
            <v-btn tile outlined width="80px" class="releaseBtn" @click="itemSave">
              <v-icon>$save</v-icon>
              {{$t('save')}}
            </v-btn>
            <v-btn
              tile
              outlined
              width="80px"
              class="releaseBtn"
              @click="itemInfoVisible = !itemInfoVisible"
            >
              <v-icon>$cancel</v-icon>
              {{$t('cancel')}}
            </v-btn>
          </v-col>
        </v-row>
      </DxScrollView>
    </DxPopup>
    <itemPopup ref="grdItemData" @choice="getItemChoice" />
    <custPopup ref="grdCustData" @choice="getCustChoice" />
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import iPageTitle from '@/components/common/iPageTitle.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import themes from 'devextreme/ui/themes'
import { DxPopup } from 'devextreme-vue/popup'
import { DxScrollView } from 'devextreme-vue/scroll-view'
import { DxDataGrid, DxColumn, DxLookup, DxScrolling, DxGrouping, DxEditing, DxPager } from 'devextreme-vue/data-grid'
import { getCurrentDate } from '@/utils/common.js'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import notify from 'devextreme/ui/notify' // message

import { getItemSelect, getItemInfo, saveItemInfo, updateItemInfo, deleteItemInfo } from '@/api/view/bas0040'
import { getPathType, getPathCode, getInWhCode, savePathType, deletePathType } from '@/api/view/bas0041'
import { getRouteInfo, updateRouteInfo, getPathCodeName, getInWhcodeName, getProCodeName } from '@/api/view/bas0042'
import { getBomInfo, saveBomInfo, deleteBomInfo } from '@/api/view/bas0043'
import { getItemCustomInfo, getCustCodeName, saveItemCustomInfo, deleteCustomInfo } from '@/api/view/bas0044'
import { getPriceInfo, savePriceInfo, deletePriceInfo } from '@/api/view/bas0045'
import { getUserId, getComCode } from '@/utils/token'
import { getCompany } from '@/api/system/companyManage'
import { getBas0011Detail } from '@/api/view/bas0011'
import itemPopup from '@/components/common/popups/itemPopup'
import custPopup from '@/components/common/popups/custPopup'

export default {
  name: 'bas0210',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxScrolling,
    ICardTop,
    DxPopup,
    DxScrollView,
    DxPager,
    itemPopup,
    custPopup
  },
  data() {
    return {
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      //조회 조건
      searchComCode: '',
      searchItemType: '',
      searchPartType: '',
      searchUserFlag: '',
      //조회리스트
      comCodeList: [],
      itemTypeList: [],
      partTypeList: [],
      userFlagList: [],
      //품목 row Params
      items: {
        comCode: '',
        partNo: ''
      },
      //경로유형 row Params
      path: {
        comCode: '',
        partNo: '',
        pathType: '',
        pathCode: ''
      },
      //품목별 거래처정보 row Prams
      custom: {
        comCode: '',
        partNo: '',
        custCode: ''
      },
      //tabIndex
      tabsNo: '',

      //품목선택
      itemSelection: [],
      itemSelectionRef: 'itemSelectionRef',
      //품목정보
      itemInfoData: [],
      itemInfoRef: 'itemInfoRef',
      //경로유형 (경로정보 Tab)
      pathTypeData: [],
      pathTypeRef: 'pathTypeRef',
      //경로정보
      routeInfoData: [],
      routeInfoRef: 'routeInfoRef',
      //경로유형 (BOM정보 Tab)
      pathTypeData2: [],
      pathTypeRef2: 'pathTypeRef2',
      //BOM정보
      bomInfoData: [],
      bomInfoRef: 'bomInfoRef',
      //품목별 거래처정보
      itemCustomInfoData: [],
      itemCustomInfoRef: 'itemCustomInfoRef',
      //단가정보
      priceInfoData: [],
      priceInfoRef: 'priceInformationRef',

      //경로Lookup
      lookup: {
        pathType: [],
        pathCode: [],
        inWhcode: [],
        outWhcode: [],
        userFlag: [],
        custCode: [],
        custType: [],
        matType: [],
        unit: [],
        itemType: [],
        partType: [],
        procCode: [],
        unitCURR: []
      },
      //팝업 Visible
      itemInfoVisible: false,
      itemPopVisible: false,

      //품목정보 팝업 List
      itemTypePopList: [],
      partTypePopList: [],
      unitPopList: [],
      whPopList: [],
      userYnPopList: [],

      //품목정보 팝업 Select
      itemTypeSelect: '',
      partTypeSelect: '',
      unitSelect: '',
      inWhSelect: '',
      outWhSelect: '',
      inInspSelect: '',
      proInspSelect: '',
      rotInspSelect: '',
      outInspSelect: '',
      lastInspSelect: '',
      supInspSelect: '',
      weightYnSelect: '',
      //품목정보 팝업 Text-fields
      itemPopPartNo: '',
      itemPopPartName: '',
      itemPopSpec: '',
      itemPopInWh: '',
      itemPopOutWh: '',
      itemPopLotSize: '',
      itemPopSafeCnt: '',
      itemPopLeadTime: '',
      itemPopWeight: '',
      itemPopUserDef1: '',
      itemPopUserDef2: '',
      itemPopUserDef3: '',
      itemPopRemark: '',
      itemPopUserFlag: true,
      itemPopMakeDate: getCurrentDate(),
      itemPopMaker: getUserId(),
      itemPopEditDate: '',
      itemPopEditor: '',
      //item품목 가져오기 팝업
      itemPopComcode: '',
      itemPopItemType: '',
      itemPopPartType: '',
      //item팝업 그리드 정보
      itemPopItem: [],
      itemPopItemRef: 'itemPopItemRef'
    }
  },
  created() {
    //회사명 조회조건 리스트 가져오기
    const companyCode = {
      comCode: getComCode()
    }
    getCompany(companyCode).then(res => {
      res.list.forEach((item, i) => {
        this.comCodeList.push({
          value: item.comCode,
          text: item.comName
        })
      })
      this.searchComCode = res.list[0].comCode
    })
    //공통코드 조회조건 리스트 가져오기
    const itemType = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'ITEM_TYPE'
    }
    const partType = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'PART_TYPE'
    }
    const userYn = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'USER_YN'
    }
    Promise.all([getBas0011Detail(itemType), getBas0011Detail(partType), getBas0011Detail(userYn)]).then(res => {
      res[0].list.forEach(item => {
        this.itemTypeList.push({
          value: item.sysCode,
          text: item.sysName
        })
      })
      res[1].list.forEach(item => {
        this.partTypeList.push({
          value: item.sysCode,
          text: item.sysName
        })
      })
      res[2].list.forEach(item => {
        this.userFlagList.push({
          value: item.sysCode,
          text: item.sysName
        })
      })
    })
  },
  computed: {
    //품목선택
    gridPartSelect() {
      return this.GetDataGrid(this.itemSelectionRef)
    },
    //품목정보
    gridItemInstance() {
      return this.GetDataGrid(this.itemInfoRef)
    },
    //경로유형
    gridPathInstance() {
      return this.GetDataGrid(this.pathTypeRef)
    },
    //경로정보
    gridRouteInfoInstance() {
      return this.GetDataGrid(this.routeInfoRef)
    },
    //경로유형2
    gridPathInstance2() {
      return this.GetDataGrid(this.pathTypeRef2)
    },
    //BOM정보
    gridBomInstance() {
      return this.GetDataGrid(this.bomInfoRef)
    },
    //품목별 거래처정보
    gridItemCustomInstance() {
      return this.GetDataGrid(this.itemCustomInfoRef)
    },
    //단가정보
    gridPriceInstance() {
      return this.GetDataGrid(this.priceInfoRef)
    }
  },
  mounted() {},
  methods: {
    pathTypeEditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'pathType' || e.column.dataField === 'pathCode') {
          e.cancel = true
        }
      }
    },
    bomInfoEditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'pathNo' || e.column.dataField === 'proCode' || e.column.dataField === 'level') {
          e.cancel = true
        }
      }
    },
    itemCustEditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'custCode') {
          e.cancel = true
        }
      }
    },
    priceEditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'appStartDate') {
          e.cancel = true
        }
      }
    },
    //품목선택 조회
    btnSearch() {
      this.itemSelection = []
      this.itemInfoData = []
      this.openLoading('searching')
      const searchData = {
        facCode: this.searchComCode == null ? '' : this.searchComCode.toString(),
        itemType: this.searchItemType == null ? '' : this.searchItemType.toString(),
        partType: this.searchPartType == null ? '' : this.searchPartType.toString(),
        userFlag: this.searchUserFlag == null ? '' : this.searchUserFlag.toString()
      }
      getItemSelect(searchData)
        .then(res => {
          if (res.success) {
            this.itemSelection = res.list
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },
    //품목선택 row 클릭 Event
    itemRowClick(e) {
      if (e.rowIndex >= 0 && e.rowType == 'data') {
        let param = e.data
        this.items.comCode = param.comCode
        this.items.partNo = param.partNo
        this.tabChange(this.tabsNo)
      }
    },
    focusedRowChanged_itemSelection(e) {
      if (e.row === undefined) {
        return
      }
      let param = e.row.data
      this.items.comCode = param.comCode
      this.items.partNo = param.partNo
      this.tabChange(this.tabsNo)
    },
    //tab선택 및 조회
    tabChange(e) {
      this.tabsNo = e
      if (e == '0' && this.items.comCode && this.items.partNo) {
        this.itemInfoData = []
        this.getLookup()
        this.getItemInfo()
      } else if (e == '1' && this.items.comCode && this.items.partNo) {
        this.itemCustomInfoData = []
        this.priceInfoData = []
        this.getLookup()
        this.getItemCustomInfo()
      } else if (e == '2' && this.items.comCode && this.items.partNo) {
        this.pathTypeData2 = []
        this.bomInfoData = []
        this.getLookup()
        this.getPathType()
      } else if (e == '3' && this.items.comCode && this.items.partNo) {
        this.pathTypeData = []
        this.routeInfoData = []
        this.getLookup()
        this.getPathType()
      }
    },
    //Lookup Data가져오기
    async getLookup() {
      const pathType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'PATH_TYPE'
      }
      const pathCode = {
        comCode: getComCode()
      }
      const inWhcode = {
        comCode: getComCode()
      }
      const userFlag = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'USER_YN'
      }
      const custCode = {
        comCode: getComCode()
      }
      const unit = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'UNIT'
      }
      const itemType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'ITEM_TYPE'
      }
      const partType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'PART_TYPE'
      }
      const proCode = {
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
      const unitCURR = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'CURR_CODE',
        userFlag: 'Y'
      }
      await Promise.all([
        getBas0011Detail(pathType),
        getPathCodeName(pathCode),
        getInWhcodeName(inWhcode),
        getBas0011Detail(userFlag),
        getCustCodeName(custCode),
        getBas0011Detail(unit),
        getBas0011Detail(itemType),
        getBas0011Detail(partType),
        getProCodeName(proCode),
        getBas0011Detail(custType),
        getBas0011Detail(matType),
        getBas0011Detail(unitCURR)
      ]).then(res => {
        this.lookup.pathType = res[0].list
        this.lookup.pathCode = res[1].list
        this.lookup.inWhcode = res[2].list
        this.lookup.outWhcode = res[2].list
        this.lookup.userFlag = res[3].list
        this.lookup.custCode = res[4].list
        this.lookup.unit = res[5].list
        this.lookup.itemType = res[6].list
        this.lookup.partType = res[7].list
        this.lookup.proCode = res[8].list
        this.lookup.custType = res[9].list
        this.lookup.matType = res[10].list
        this.lookup.unitCURR = res[11].list
      })
    },
    //품목정보 조회
    getItemInfo() {
      this.itemInfoData = []
      const searchData = {
        comCode: this.items.comCode,
        partNo: this.items.partNo
      }
      getItemInfo(searchData).then(res => {
        if (res.success) {
          this.itemInfoData = res.list
        }
      })
    },
    //경로유형 조회
    getPathType() {
      const searchData = {
        comCode: this.items.comCode,
        partNo: this.items.partNo
      }
      if (this.tabsNo == '1') {
        this.pathTypeData = []
        getPathType(searchData)
          .then(res => {
            if (res.success) {
              this.pathTypeData = res.list
            }
          })
          .finally(() => {
            this.gridPathInstance.option('focusedRowIndex', -1)
            this.gridPathInstance.option('focusedRowIndex', 0)
            this.gridPathInstance.clearSelection()
            this.gridRouteInfoInstance.clearSelection()
          })
      } else if (this.tabsNo == '2') {
        this.pathTypeData2 = []
        getPathType(searchData)
          .then(res => {
            if (res.success) {
              this.pathTypeData2 = res.list
            }
          })
          .finally(() => {
            this.gridPathInstance2.option('focusedRowIndex', -1)
            this.gridPathInstance2.option('focusedRowIndex', 0)
          })
      }
    },
    //경로유형(경로정보 Tab) Row변경
    pathTypeFocRowchange(e) {
      if (e.rowIndex >= 0 && !e.row.data.__created__) {
        let param = e.row.data
        this.path.comCode = param.comCode
        this.path.partNo = param.partNo
        this.path.pathType = param.pathType
        this.path.pathCode = param.pathCode
        this.getRouteInfo()
      }
    },
    //경로정보
    getRouteInfo() {
      this.routeInfoData = []
      const searchData = {
        comCode: this.path.comCode,
        partNo: this.path.partNo,
        pathType: this.path.pathType,
        pathCode: this.path.pathCode
      }
      getRouteInfo(searchData)
        .then(res => {
          if (res.success) {
            this.routeInfoData = res.list
          }
        })
        .finally(() => {
          this.gridRouteInfoInstance.option('focusedRowIndex', 0)
          this.gridRouteInfoInstance.option('focusedRowIndex', -1)
        })
    },
    //경로유형(BOM Tab) Cell클릭
    pathTypeFocRowchange2(e) {
      if (e.rowIndex >= 0 && e.row && e.row.data) {
        let param = e.row.data
        this.path.comCode = param.comCode
        this.path.partNo = param.partNo
        this.path.pathType = param.pathType
        this.path.pathCode = param.pathCode
        this.getBomInfo()
      }
    },
    //BOM정보
    getBomInfo() {
      this.bomInfoData = []
      const searchData = {
        comCode: this.path.comCode,
        partNo: this.path.partNo,
        pathType: this.path.pathType,
        pathCode: this.path.pathCode
      }
      getBomInfo(searchData)
        .then(res => {
          if (res.success) {
            this.bomInfoData = res.list
          }
        })
        .finally(() => {
          this.gridBomInstance.option('focusedRowIndex', 0)
          this.gridBomInstance.option('focusedRowIndex', -1)
        })
    },
    //품목별 거래처 정보
    getItemCustomInfo() {
      this.itemCustomInfoData = []
      const searchData = {
        comCode: this.items.comCode,
        partNo: this.items.partNo
      }
      getItemCustomInfo(searchData)
        .then(res => {
          if (res.success) {
            this.itemCustomInfoData = res.list
          }
        })
        .finally(() => {
          this.gridItemCustomInstance.option('focusedRowIndex', 0)
          this.gridItemCustomInstance.option('focusedRowIndex', -1)
        })
    },
    //품목별 거래처 정보 Cell클릭
    itemCustRowClick(e) {
      if (e.rowIndex >= 0 && !e.data.__created__) {
        let param = e.data
        this.custom.comCode = param.comCode
        this.custom.partNo = param.partNo
        this.custom.custCode = param.custCode
        this.getPriceInfo()
      }
    },
    focusedRowChanged_itemCustomInfo(e) {
      if (e.row === undefined) {
        return
      }
      if (!e.row.data.__created__) {
        let param = e.row.data
        this.custom.comCode = param.comCode
        this.custom.partNo = param.partNo
        this.custom.custCode = param.custCode
        this.getPriceInfo()        
      }
    },
    //단가정보
    getPriceInfo() {
      this.priceInfoData = []
      const searchData = {
        comCode: this.custom.comCode,
        partNo: this.custom.partNo,
        custCode: this.custom.custCode
      }
      getPriceInfo(searchData).then(res => {
        if (res.success) {
          this.priceInfoData = res.list
        }
      })
    },
    //추가 버튼(품목정보:item, 경로유형:pathType, BOM정보:bom, 품목별거래처정보:customInfo, 단가정보:price)
    btnAdd(type) {
      if (type === 'item') {
        // ** 품목정보 **
        this.itemPopInit() //품목정보 팝업 초기화
        this.popItemList() //공통코드 가져오기
        this.itemInfoVisible = true
      } else if (type === 'pathType') {
        // ** 경로유형 **
        if (this.items.comCode !== '' && this.items.partNo !== '') {
          let newRow = {
            id: this.pathTypeData.length == 0 ? 0 : this.pathTypeData.length + 1,
            comCode: this.items.comCode,
            partNo: this.items.partNo,
            pathType: '',
            pathCode: '',
            inWhcode: '',
            sortFlag: '',
            remark: '',
            userFlag: 'Y',
            makeDate: getCurrentDate(),
            maker: getUserId(),
            __created__: true
          }
          this.gridPathInstance.newRow(newRow)
          this.gridPathInstance.selectRows(newRow.id, true)
          this.gridPathInstance.option('focusedRowIndex', -1)
          this.routeInfoData = []
        } else {
          this.vToastify('선택된 품목이 없습니다.', 'warn')
          return
        }
      } else if (type === 'bom') {
        // ** BOM정보 **
        if (this.pathTypeData2.length > 0 && this.path.comCode !== '' && this.path.partNo !== '') {
          let newRow = {
            id: this.bomInfoData.length == 0 ? 0 : this.bomInfoData.length + 1,
            comCode: this.path.comCode,
            partNo: this.path.partNo,
            pathType: this.path.pathType,
            pathCode: this.path.pathCode,
            pathNo: '',
            proCode: '',
            level: '1',
            paPartNo: this.path.partNo,
            no: '',
            childPartNo: '',
            amount: '',
            userFlag: 'Y',
            remark: '',
            makeDate: getCurrentDate(),
            maker: getUserId(),
            __created__: true
          }
          this.gridBomInstance.newRow(newRow)
          this.gridBomInstance.selectRows(newRow.id, true)
          this.gridBomInstance.option('focusedRowIndex')
        } else {
          this.vToastify('경로유형을 선택해 주세요.', 'warn')
          return
        }
      } else if (type === 'customInfo') {
        if (this.items.comCode !== '' && this.items.partNo !== '') {
          let newRow = {
            id: this.itemCustomInfoData.length == 0 ? 0 : this.itemCustomInfoData.length + 1,
            comCode: this.items.comCode,
            partNo: this.items.partNo,
            custCode: '',
            userFlag: 'Y',
            makeDate: getCurrentDate(),
            maker: getUserId(),
            __created__: true
          }
          this.gridItemCustomInstance.newRow(newRow)
          this.gridItemCustomInstance.selectRows(newRow.id, true)
          this.gridItemCustomInstance.option('focusedRowIndex', -1)
          this.priceInfoData = []
        } else {
          this.vToastify('품목선택을 하세요.', 'warn')
          return
        }
      } else if (type === 'price') {
        if (this.itemCustomInfoData.length > 0 && this.custom.comCode !== '' && this.custom.partNo !== '') {
          let newRow = {
            id: this.priceInfoData.length == 0 ? 0 : this.priceInfoData.length + 1,
            comCode: this.custom.comCode,
            partNo: this.custom.partNo,
            custCode: this.custom.custCode,
            appStartDate: getCurrentDate(),
            appEndDate: '9999-12-31',
            modiYn: '',
            appYn: 'Y',
            price: '',
            unit: 10,
            remark: '',
            userFlag: 'Y',
            makeDate: getCurrentDate(),
            maker: getUserId(),
            __created__: true
          }
          this.gridPriceInstance.newRow(newRow)
          this.gridPriceInstance.selectRows(newRow.id, true)
          this.gridPriceInstance.option('focusedRowIndex', -1)
        } else {
          this.vToastify('품목별 거래처정보를 선택 하세요.', 'warn')
          return
        }
      }
    },
    //저장 버튼
    async btnSave(type) {
      let msg = ''
      if (type === 'item') {
        //품목정보
        this.gridItemInstance.saveEditData()
        let itemRows = await this.gridItemInstance.getSelectedRowsData()
        if (!itemRows.length) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(
          this.$t('doFixData'),
          'info',
          () => {
            this.openLoading()
            this.gridItemInstance.beginUpdate()
            updateItemInfo(itemRows)
              .then(res => {
                if (res.success) {
                  this.getItemInfo()
                  notify(this.$t('changed'), 'sucess', 1500)
                }
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridItemInstance.endUpdate()
                this.gridItemInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (type === 'pathType') {
        //*경로유형*
        this.gridPathInstance.saveEditData()
        let pathRows = await this.gridPathInstance.getSelectedRowsData()
        if (!pathRows.length) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //create or update
        for (let row of pathRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
          }
        }
        //유효성 체크
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridPathInstance.beginUpdate()
            savePathType(pathRows)
              .then(res => {
                if (res.success) {
                  this.getPathType()
                  this.routeInfoData = []
                  msg = pathRows[0].__created__ == true ? 'Saved' : 'changed'
                  notify(this.$t(msg), 'sucess', 1500)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridPathInstance.endUpdate()
                this.gridPathInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (type === 'routeInfo') {
        //*경로정보
        this.gridRouteInfoInstance.saveEditData()
        let routeRows = await this.gridRouteInfoInstance.getSelectedRowsData()
        if (!routeRows.length) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(
          this.$t('doFixData'),
          'info',
          () => {
            this.openLoading()
            this.gridRouteInfoInstance.beginUpdate()
            updateRouteInfo(routeRows)
              .then(res => {
                if (res.success) {
                  this.getRouteInfo()
                  notify('changed', 'sucess', 1500)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridRouteInfoInstance.endUpdate()
                this.gridRouteInfoInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (type === 'bom') {
        //*BOM
        this.gridBomInstance.saveEditData()
        let bomRows = await this.gridBomInstance.getSelectedRowsData()
        if (!bomRows.length) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //create or update
        for (let row of bomRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
          }
        }
        //필수값 체크
        let valCheckData = bomRows.findIndex(e => e.pathNo == '' || e.proCode == '' || e.level == '')
        if (valCheckData >= 0) {
          this.vToastify('필수값 체크', 'warn')
          return
        }
        //유효성 체크 vToastifyPrompt('메시지', 타입, yse, no)
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridBomInstance.beginUpdate()
            saveBomInfo(bomRows)
              .then(res => {
                if (res.success) {
                  this.getBomInfo()
                  msg = bomRows[0].__created__ == true ? 'Saved' : 'changed'
                  notify(this.$t(msg), 'sucess', 1500)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridBomInstance.endUpdate()
                this.gridBomInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (type === 'customInfo') {
        //품목별 거래처정보
        this.gridItemCustomInstance.saveEditData()
        let itemCustRow = await this.gridItemCustomInstance.getSelectedRowsData()
        if (!itemCustRow.length) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //create or update
        for (let row of itemCustRow) {
          if (row.__created__ !== true) {
            row.__modified__ = true
          }
        }
        //필수값 체크
        let valCheckData = itemCustRow.findIndex(e => e.custCode == '')
        if (valCheckData >= 0) {
          this.vToastify('필수값 체크', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridItemCustomInstance.beginUpdate()
            saveItemCustomInfo(itemCustRow)
              .then(res => {
                if (res.success) {
                  this.getItemCustomInfo()
                  msg = itemCustRow[0].__created__ == true ? 'Saved' : 'changed'
                  notify(this.$t(msg), 'sucess', 1500)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridItemCustomInstance.endUpdate()
                this.gridItemCustomInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (type === 'price') {
        //단가정보
        this.gridPriceInstance.saveEditData()
        let priceRows = await this.gridPriceInstance.getSelectedRowsData()
        if (!priceRows.length) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //create or update
        for (let row of priceRows) {
          if (row.__created__ !== true) {
            row.__modified__ = true
          }
        }
        //필수값 체크
        let valCheckData = priceRows.findIndex(e => e.custCode == '' || e.appStartDate == '')
        if (valCheckData >= 0) {
          this.vToastify('필수값 체크', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            this.gridPriceInstance.beginUpdate()
            savePriceInfo(priceRows)
              .then(res => {
                if (res.success) {
                  this.getPriceInfo()
                  msg = priceRows[0].__created__ == true ? 'Saved' : 'changed'
                  notify(this.$t(msg), 'success', 1500)
                } else {
                  this.vToastify(res.msg, 'warn')
                }
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
              .finally(() => {
                this.gridPriceInstance.endUpdate()
                this.gridPriceInstance.clearSelection()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //삭제 버튼
    async btnDelete(type) {
      if (type == 'item') {
        //품목정보 삭제
        let itemRows = await this.gridItemInstance.getSelectedRowsData()
        if (!itemRows.length > 0) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(this.$t('doDeleteData'), 'info', () => {
          this.openLoading()
          deleteItemInfo(itemRows)
            .then(res => {
              if (res.success) {
                this.getItemInfo()
                this.btnSearch()
                notify(this.$t('deleted'), 'sucess', 1500)
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridItemInstance.saveEditData()
              this.gridItemInstance.clearSelection()
              this.endLoading()
            })
        })
      } else if (type == 'pathType') {
        //경로유형 삭제
        let pathRows = await this.gridPathInstance.getSelectedRowsData()
        if (!pathRows.length > 0) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(this.$t('doDeleteData'), 'info', () => {
          this.openLoading()
          deletePathType(pathRows)
            .then(res => {
              if (res.success) {
                this.getPathType()
                this.routeInfoData = []
                notify(this.$t('deleted'), 'sucess', 1500)
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridPathInstance.saveEditData()
              this.gridPathInstance.clearSelection()
              this.endLoading()
            })
        })
      } else if (type == 'bom') {
        //BOM정보 삭제
        let bomRows = await this.gridBomInstance.getSelectedRowsData()
        if (!bomRows.length > 0) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(this.$t('doDeleteData'), 'info', () => {
          this.openLoading()
          deleteBomInfo(bomRows)
            .then(res => {
              if (res.success) {
                this.getBomInfo()
                notify(this.$t('deleted'), 'sucess', 1500)
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridBomInstance.saveEditData()
              this.gridBomInstance.clearSelection()
              this.endLoading()
            })
        })
      } else if (type == 'customInfo') {
        //품목별 거래처정보 삭제
        let customRows = await this.gridItemCustomInstance.getSelectedRowsData()
        if (!customRows.length > 0) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(this.$t('doDeleteData'), 'info', () => {
          this.openLoading()
          deleteCustomInfo(customRows)
            .then(res => {
              if (res.success) {
                this.getItemCustomInfo()
                notify(this.$t('deleted'), 'sucess', 1500)
              } else {
                this.vToastify(res.msg, 'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridItemCustomInstance.saveEditData()
              this.gridItemCustomInstance.clearSelection()
              this.endLoading()
            })
        })
      } else if (type == 'price') {
        //단가정보 삭제
        let priceRows = await this.gridPriceInstance.getSelectedRowsData()
        if (!priceRows.length > 0) {
          this.vToastify('선택된 데이터가 없습니다.', 'warn')
          return
        }
        //유효성 체크
        this.vToastifyPrompt(this.$t('doDeleteData'), 'info', () => {
          this.openLoading()
          deletePriceInfo(priceRows)
            .then(res => {
              if (res.success) {
                this.getPriceInfo()
                notify(this.$t('deleted'), 'sucess', 1500)
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.gridPriceInstance.saveEditData()
              this.gridPriceInstance.clearSelection()
              this.endLoading()
            })
        })
      }
    },
    //// 팝업 Button ////
    //팝업 Init
    itemPopInit() {
      this.itemPopPartNo = ''
      this.itemPopPartName = ''
      this.itemPopSpec = ''
      this.itemTypeSelect = ''
      this.partTypeSelect = ''
      this.unitSelect = ''
      this.inWhSelect = ''
      this.outWhSelect = ''
      this.itemPopLotSize = ''
      this.itemPopSafeCnt = ''
      this.inInspSelect = ''
      this.proInspSelect = ''
      this.rotInspSelect = ''
      this.outInspSelect = ''
      this.lastInspSelect = ''
      this.supInspSelect = ''
      this.itemPopLeadTime = ''
      this.weightYnSelect = ''
      this.itemPopWeight = ''
      this.itemPopUserDef1 = ''
      this.itemPopUserDef2 = ''
      this.itemPopUserDef3 = ''
      this.itemPopRemark = ''
    },
    //품목팝업 SelectList가져오기
    async popItemList() {
      const itemType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'ITEM_TYPE'
      }
      const partType = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'PART_TYPE'
      }
      const unit = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'UNIT'
      }
      const userYn = {
        comCode: getComCode(),
        codegr: 'COM',
        code: 'USER_YN'
      }
      const whCode = {
        comCode: getComCode()
      }

      await Promise.all([
        getBas0011Detail(itemType),
        getBas0011Detail(partType),
        getBas0011Detail(unit),
        getBas0011Detail(userYn),
        getInWhcodeName(whCode)
      ]).then(res => {
        res[0].list.forEach(item => {
          this.itemTypePopList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
        res[1].list.forEach(item => {
          this.partTypePopList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
        res[2].list.forEach(item => {
          this.unitPopList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
        res[3].list.forEach(item => {
          this.userYnPopList.push({
            value: item.sysCode,
            text: item.sysName
          })
        })
        res[4].list.forEach(item => {
          this.whPopList.push({
            value: item.inWhcode,
            text: item.inWhname
          })
        })
      })
    },
    //품목정보 팝업 저장 Button
    itemSave() {
      const params = {
        comCode: getComCode(),
        partNo: this.itemPopPartNo,
        partName: this.itemPopPartName,
        spec: this.itemPopSpec,
        itemType: this.itemTypeSelect,
        partType: this.partTypeSelect,
        unit: this.unitSelect,
        inWh: this.inWhSelect,
        outWh: this.outWhSelect,
        lotSize: this.itemPopLotSize,
        safeCnt: this.itemPopSafeCnt,
        inInsp: this.inInspSelect,
        proInsp: this.proInspSelect,
        rotInsp: this.rotInspSelect,
        outInsp: this.outInspSelect,
        lastInsp: this.lastInspSelect,
        supInsp: this.supInspSelect,
        leadTime: this.itemPopLeadTime,
        weightYn: this.weightYnSelect,
        weight: this.itemPopWeight,
        userFlag: this.itemPopUserFlag,
        userDef1: this.itemPopUserDef1,
        userDef2: this.itemPopUserDef2,
        userDef3: this.itemPopUserDef3,
        remark: this.itemPopRemark
      }
      saveItemInfo(params).then(res => {
        if (res.success) {
          this.itemInfoVisible = false
          this.btnSearch()
        } else {
          this.vToastify(res.msg, 'warn')
        }
      })
    },
    itemPopOpen(e) {
      if (e.columnIndex == '5') {
        this.$refs.grdItemData.open(e.rowIndex)
      }
    },
    getItemChoice(...arg) {
      this.gridBomInstance.cellValue(arg[0], 'childPartNo', arg[1][0].partNo)
    },
    custPopOpen(e) {
      if (e.columnIndex == '2' && e.data.__created__ == true) {
        this.$refs.grdCustData.open(e.rowIndex)
      }
    },
    getCustChoice(...arg) {
      this.gridItemCustomInstance.cellValue(arg[0], 'custCode', arg[1][0].custCode)
      this.gridItemCustomInstance.cellValue(arg[0], 'custType', arg[1][0].custType)
      this.gridItemCustomInstance.cellValue(arg[0], 'matType', arg[1][0].matType)
      this.gridItemCustomInstance.cellValue(arg[0], 'name', arg[1][0].name)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .v-text-field.v-text-field--enclosed {
  margin: 0;
  padding-top: 5px;
}
.mainItem {
  color: rgb(0, 0, 0);
  font-size: 18px;
  letter-spacing: 0.5px;
  font-weight: bold;
  line-height: 1.8;
}
.releaseBtn {
  background-color: rgb(135, 155, 119);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}
.itemPop {
  padding: 1px;
  .v-text-field {
    border-radius: 5px;
  }
  > * {
    color: rgb(135, 155, 119);
  }
}
</style>