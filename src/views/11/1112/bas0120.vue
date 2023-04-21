<!--공장정보-->
<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="5" class="pa-2">
        <v-tabs>
          <v-tab class="mr-2">{{$t('tabFactoryInfoTitle')}}</v-tab>
          <v-tab-item>
            <i-card-vertical
              headerTitle="factoryInfoTitle"
              :useBtnList="[
                //'btnAdd', //신규
                'btnSave', //저장
                //'btnDelete' //삭제
              ]"
              @btnAdd="btnAdd('공장정보')"
              @btnSave="btnSave('공장정보')"
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="factoryInfo"
                      class="listBox05"
                      :ref="factoryInfoRef"
                      :data-source="factoryInfo"
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
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @editing-start="bas0030EditingStart"
                      @focused-row-changed="listClick"
                    >
                      <DxPaging :enabled="false" />
                      <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                      <DxScrolling column-rendering-mode="virtual" />

                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="facName"
                        :caption="$t('facName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="facNumber"
                        :caption="$t('facNumber')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="name"
                        :caption="$t('facRepName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="postNo"
                        :caption="$t('postNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn data-field="addr" :caption="$t('addr')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="tel" :caption="$t('tel')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="fax" :caption="$t('fax')" width="auto" data-type="string" alignment="center" :allow-editing="true" />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false" />
                      <DxColumn width="auto" :allow-editing="false" />  
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <v-col cols="7" class="pa-2">
        <v-tabs>
          <v-tab class="mr-2" @click="tabChange('공정정보')">{{$t('tabProcessInfoTitle')}}</v-tab>
          <v-tab class="mr-2" @click="tabChange('창고정보')">{{$t('tabWarehouseInfoTitle')}}</v-tab>
          <v-tab class="mr-2" @click="tabChange('작업장정보')">{{$t('tabWorkStationInfoTitle')}}</v-tab>
          <v-tab class="mr-2" @click="tabChange('설비정보')">{{$t('tabEquipmentInfoTitle')}}</v-tab>
          <v-tab class="mr-2" @click="tabChange('경로정보')">{{$t('tabRouteInfoTitle')}}</v-tab>
          <!-------------------------------------------------------------------------------공정 정보------------------------------------------------------------------------------------------>
          <v-tab-item>
            <i-card-vertical
              headerTitle="processInfoTitle"
              :useBtnList="[
                'btnAdd', //신규
                'btnSave', //저장
                'btnDelete', //삭제
              ]"
              @btnAdd="btnAdd('공정정보')"
              @btnSave="btnSave('공정정보')"
              @btnDelete="btnDelete('공정정보')"
            >
              <template v-slot:body>
                <v-layout column>
                  <v-col cols="12" class="pa-0">
                    <DxDataGrid
                      id="processInfo"
                      class="listBox05"
                      :ref="processInfoRef"
                      :data-source="processInfo"
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
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      :search-input.sync="inputData"
                      parent-id-expr="comCode"
                      @editing-start="bas0031EditingStart"
                      @row-updating="rowUpdated"
                    >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="proCode"
                        :caption="$t('proCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="proName"
                        :caption="$t('proName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="catType"
                        :caption="$t('catType')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup :data-source="catType" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      
                      <DxColumn
                        data-field="makeDate"
                        :caption="$t('makeDate')"
                        width="auto"
                        data-type="string"
                        format="yyyy-MM-dd hh:mm:ss"
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
                        format="yyyy-MM-dd hh:mm:ss"
                        alignment="center"
                        :allow-editing="false"
                      />
                       <DxColumn width="auto" :allow-editing="false" />  
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-tab-item>
          <!---------------------------------------------------------------------창고 정보, 창고 위치 정보------------------------------------------------------------------------------------------>
          <!-------창고 정보------->
          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="warehouseInfoTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
                @btnAdd="btnAdd('창고정보')"
                @btnSave="btnSave('창고정보')"
                @btnDelete="btnDelete('창고정보')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <DxDataGrid
                      id="warehouseInfo"
                      class="doubleListBox"
                      :ref="warehouseInfoRef"
                      :data-source="warehouseInfo"
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
                      @focused-row-changed="onFocusedRowChanged"
                      @editing-start="bas0032EditingStart"
                      @row-updating="rowUpdated"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="whCode"
                        :caption="$t('whCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="whName"
                        :caption="$t('whName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn data-field="whType" :caption="$t('whType')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                        <DxLookup :data-source="whType" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="whDesc"
                        :caption="$t('whDesc')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
            <v-row>
              <!-------창고 위치 정보------->
              <i-card-vertical
                headerTitle="warehouseLocInfoTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
                @btnAdd="btnAdd('창고위치정보')"
                @btnSave="btnSave('창고위치정보')"
                @btnDelete="btnDelete('창고위치정보')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <DxDataGrid
                      id="warehouseLocInfo"
                      class="doubleListBox"
                      :ref="warehouseLocInfoRef"
                      :data-source="warehouseLocInfo"
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
                      @editing-start="bas0033EditingStart"
                      @row-updating="rowUpdated_warehouseDetail"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxScrolling column-rendering-mode="virtual" />

                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="whCode"
                        :caption="$t('whCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="locCode"
                        :caption="$t('locCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="locName"
                        :caption="$t('locName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
          </v-tab-item>

          <!---------------------------------------------------------------------작업장, 작업반 정보------------------------------------------------------------------------------------------>
          <!-------작업장 정보------->
          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="workStationInfo"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
                @btnAdd="btnAdd('작업장정보')"
                @btnSave="btnSave('작업장정보')"
                @btnDelete="btnDelete('작업장정보')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <DxDataGrid
                      id="workShopInfo"
                      class="doubleListBox"
                      :ref="workShopInfoRef"
                      :data-source="workShopInfo"
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
                      @focused-row-changed="onFocusedRowChanged2"
                      @editing-start="bas0034EditingStart"
                      @row-updating="rowUpdated"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="workCode"
                        :caption="$t('workCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="workName"
                        :caption="$t('workName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="workType"
                        :caption="$t('workType')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup :data-source="workType" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="workDesc"
                        :caption="$t('workDesc')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="depCode"
                        :caption="$t('depCode')"
                        width="auto"
                        data-type="sring"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
            <!-------작업반 정보------->
            <v-row>
              <i-card-vertical
                headerTitle="workGroupInfo"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
                @btnAdd="btnAdd('작업반정보')"
                @btnSave="btnSave('작업반정보')"
                @btnDelete="btnDelete('작업반정보')"
              >
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <DxDataGrid
                      id="workPartyInfo"
                      class="doubleListBox"
                      :ref="workPartyInfoRef"
                      :data-source="workPartyInfo"
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
                      @editing-start="bas0035EditingStart"
                      @row-updating="rowUpdated_workShopDetail"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxScrolling column-rendering-mode="virtual" />
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="workCode"
                        :caption="$t('workCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="workDecode"
                        :caption="$t('workDecode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="workDename"
                        :caption="$t('workDename')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn
                        data-field="workDedesc"
                        :caption="$t('workDedesc')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      />
                      <DxColumn data-field="proCode" :caption="$t('proName')"  width="auto" data-type="string" alignment="center" :allow-editing="true">
                        <DxLookup :data-source="processInfo" display-expr="proName" value-expr="proCode" />
                      </DxColumn>
                      <DxColumn data-field="inWh" :caption="$t('inWh')" width="auto" data-type="string" alignment="center" :allow-editing="true">
                        <DxLookup :data-source="inWh" display-expr="locName" value-expr="locCode" />
                      </DxColumn>
                      <DxColumn data-field="outWh" :caption="$t('outWh')" width="auto" data-type="string" alignment="center" :allow-editing="true" allow-visible="false">
                        <DxLookup :data-source="outWh" display-expr="locName" value-expr="locCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />    
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPaging :enabled="false" />
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
          </v-tab-item>
          <!---------------------------------------------------------------------설비 정보------------------------------------------------------------------------------------------>
          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="equipmentInfo"
                :useBtnList="[
                  'btnCorrection', //수정
                  'btnAdd', //신규
                  'btnDelete', //삭제
                ]"
                @btnCorrection="btnCorrection()"
                @btnAdd="btnAdd('설비정보')"
                @btnDelete="btnDelete('설비정보')"
              >
                <template v-slot:body>
                  <v-layout column>
                    <DxDataGrid
                      id="facilityInfo"
                      class="listBox05"
                      :ref="facilityInfoRef"
                      :data-source="facilityInfo"
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
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @editing-start="bas0036EditingStart"
                      @rowClick="popupOpen"
                      @row-updating="rowUpdated"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxSelection show-check-boxes-mode="none" />
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="blobUrl"
                        :caption="$t('eqpImage')"
                        width="120px"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        cell-template="cellTemplate"
                      />
                      <DxColumn
                        data-field="eqCode"
                        :caption="$t('eqCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                        css-class="devest-grid-header-require"
                        
                      />
                      <DxColumn
                        data-field="eqName"
                        :caption="$t('eqName')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="eqSpec"
                        :caption="$t('eqSpec')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="eqGrade"
                        :caption="$t('eqGrade')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup :data-source="eqGrade" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="eqState"
                        :caption="$t('eqState')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup :data-source="eqState" display-expr="sysName" value-expr="sysCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="makeCom"
                        :caption="$t('makeCom')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="perCom"
                        :caption="$t('perCom')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="proDate"
                        :caption="$t('proDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="insDate"
                        :caption="$t('insDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="desDate"
                        :caption="$t('desDate')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="dayInspYn"
                        :caption="$t('dayInspYn')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="false"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn
                        data-field="dayInspDt"
                        :caption="$t('dayInspDt')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="dayInspNextDt"
                        :caption="$t('dayInspNextDt')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="periInspYn"
                        :caption="$t('periInspYn')"
                        width="auto"
                        data-type="boolean"
                        alignment="center"
                        :allow-editing="false"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn
                        data-field="periInspCycle"
                        :caption="$t('periInspCycle')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="periInspDt"
                        :caption="$t('periInspDt')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="periInspNextDt"
                        :caption="$t('periInspNextDt')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="preStr"
                        :caption="$t('preStr')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="moldLoc"
                        :caption="$t('moldLoc')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="false"
                      >
                        <DxLookup :data-source="moldLoc" display-expr="locName" value-expr="locCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="userFlag"
                        :caption="$t('userFlag')"
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                        :allow-editing="false"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />  
                     <template #cellTemplate="{ data }">
                      <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" >
                      <h4 class="noImageText" v-else>No Image</h4>
                    </template>
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
          </v-tab-item>
          <!---------------------------------------------------------------------경로 유형, 경로 정보------------------------------------------------------------------------------------------>
          <!-------경로 정보(라우팅)------->
          <v-tab-item>
            <v-row>
              <i-card-vertical
                headerTitle="routeInfoTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
                @btnAdd="btnAdd('경로정보')"
                @btnSave="btnSave('경로정보')"
                @btnDelete="btnDelete('경로정보')"
              >
                <template v-slot:body>
                  <v-layout column>
                    <DxDataGrid
                      id="routing"
                      class="doubleListBox"
                      :ref="routingRef"
                      :data-source="routing"
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
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @focused-row-changed="onFocusedRowChanged3"
                      @editing-start="bas0037EditingStart"
                      @row-updating="rowUpdated"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathCode"
                        :caption="$t('pathCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="pathName"
                        :caption="$t('pathName')"
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
                        :cell-template="multiLookupTemplet"
                        edit-cell-template="multiPorEditor"
                        :calculate-filter-expression="calculateFilterExpression"
                      >
                        <DxLookup :data-source="processInfo" display-expr="proName" value-expr="proCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="sortFlag"
                        :caption="$t('sortFlag')"
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />  
                      <template #multiPorEditor="{ data: cellInfo }">    
                        <!--
                        <v-autocomplete
                          :items="processInfo"
                          item-text="proName"
                          item-value="proCode"
                          @change="(value) => onMultiProcChanged(value, cellInfo)"
                          dense
                          multiple
                        ></v-autocomplete>
                        -->
                        <DxTagBox
                          :data-source="processInfo"
                          :show-selection-controls="true"
                          :max-displayed-tags="3"
                          :show-multi-tag-only="false"
                          @value-changed="(value) => onMultiProcChanged(value, cellInfo)"
                          :search-enabled="true"
                          value-expr="proCode"
                          display-expr="proName"
                        />
                      </template>
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
            <!-------경로 정보 상세------->
            <v-row>
              <i-card-vertical
                headerTitle="routeInfoDetailTitle"
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave', //저장
                  'btnDelete', //삭제
                ]"
                @btnAdd="btnAdd('경로정보상세')"
                @btnSave="btnSave('경로정보상세')"
                @btnDelete="btnDelete('경로정보상세')"
              >
                <template v-slot:body>
                  <v-layout column>
                    <DxDataGrid
                      id="RouteDetailInfo"
                      class="doubleListBox"
                      :ref="RouteDetailInfoRef"
                      :data-source="RouteDetailInfo"
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
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @editing-start="bas0038EditingStart"
                      @row-updating="rowUpdated_pathDetail"
                      >
                      <DxPaging :enabled="false" />
                      <DxEditing mode="cell"/>
                      <DxColumn
                        data-field="comCode"
                        :caption="$t('comCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="facCode"
                        :caption="$t('facCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                        :visible="false"
                      />
                      <DxColumn
                        data-field="pathCode"
                        :caption="$t('pathCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="proCode"
                        :caption="$t('proCode')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      >
                        <DxLookup :data-source="proCode" display-expr="proName" value-expr="proCode" />
                      </DxColumn>
                      <DxColumn
                        data-field="procNo"
                        :caption="$t('procNo')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                        css-class="devest-grid-header-require"
                      />
                      <DxColumn
                        data-field="whCode"
                        :caption="$t('whCode_autoInput')"
                        width="auto"
                        data-type="string"
                        alignment="center"
                        :allow-editing="true"
                      >
                        <DxLookup :data-source="whCode" display-expr="locName" value-expr="locCode" />
                      </DxColumn>
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
                        width="65"
                        data-type="boolean"
                        alignment="center"
                        edit-cell-template="checkBoxEditor"
                      />
                      <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
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
                      <DxColumn width="auto" :allow-editing="false" />
                      <template #checkBoxEditor="{ data: cellInfo }">
                        <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                      </template>
                      <DxPager :show-page-size-selector="false" />
                    </DxDataGrid>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <bas0120Popup
      ref="bas0120Popup"
      @btnSave="btnSavePop" @close="close" :popVisible="popVisible" 
    />
    <imagePopup ref="imagePopup"/>
  </v-container>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import DxTagBox from 'devextreme-vue/tag-box';
import 'devextreme/data/odata/store'
import { getFactoryInfoData, saveFacInfo, deleteFacInfo } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify' // message
import { getProcInfo, saveProcInfo, deleteProcInfo, getProcessName } from '@/api/view/bas0031'
import { getWarehouseInfoData, saveWareHouseInfo, deleteWareHouseInfo } from '@/api/view/bas0032'
import { getWarehouseLocInfoData, saveWareHouseLocInfo, deleteWareHouseLocInfo } from '@/api/view/bas0033'
import { getWorkShopInfoData, saveWorkShopInfo, deleteWorkShopInfo } from '@/api/view/bas0034'
import { getWorkPartyInfoData, saveWorkPartyInfo, deleteWorkPartyInfo } from '@/api/view/bas0035'
import { getFacilityInfoData, saveFacilityInfo, deleteFacilityInfo } from '@/api/view/bas0036'
import { getRoutingInfo, saveRoutingInfo, deleteRoutingInfo } from '@/api/view/bas0037'
import { getRouteDetailInfo, saveRouteDetailInfo, deleteRouteDetailInfo, getAutoStorage } from '@/api/view/bas0038'
import themes from 'devextreme/ui/themes'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getCurrentDate } from '@/utils/common.js'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getUserId, getComCode } from '@/utils/token'
import imagePopup from '@/views/11/1112/popup/imagePopup'
import bas0120Popup from '@/views/11/1112/popup/bas0120Popup'
export default {
  name: 'FactoryInfo',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리

  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup,
    bas0120Popup,
    imagePopup,
    DxTagBox
  },
  data() {
    return {
      popVisible: false,
      popupData: [],
      proName: [],
      catType: [],
      factoryInfo: [],
      processInfo: [],
      warehouseInfo: [],
      warehouseLocInfo: [],
      workShopInfo: [],
      workPartyInfo: [],
      facilityInfo: [],
      routing: [],
      RouteDetailInfo: [],
      listClickData: '',
      factoryInfoRef: 'factoryInfoRef', //공장정보
      processInfoRef: 'processInfoRef', //공정정보
      warehouseInfoRef: 'warehouseInfoRef', //창고정보
      warehouseLocInfoRef: 'warehouseLocInfoRef', //창고위치 정보
      workShopInfoRef: 'workShopInfoRef', //작업장 정보
      workPartyInfoRef: 'workPartyInfoRef', //작업반 정보
      facilityInfoRef: 'facilityInfoRef', //설비정보
      routingRef: 'routingRef', //경로정보(라우팅)
      RouteDetailInfoRef: 'RouteDetailInfoRef', //경로정보 상세
      whCodeData: '',
      workCodeData: '',
      pathCodeData: '',
      TabKey: '공정정보',
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      calculateFilterExpression(filterValue, selectedFilterOperation, target) {
        if (target === 'search' && typeof (filterValue) === 'string') {
          return [this.dataField, 'contains', filterValue];
        }
        return function(data) {
          return (data.proCode || []).indexOf(filterValue) !== -1;
        };
      },
    }
  },
  created() {
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.factoryInfoRef)
    },
    gridDetailInstance1() {
      return this.GetDataGrid(this.processInfoRef)
    },
    gridDetailInstance2() {
      return this.GetDataGrid(this.warehouseInfoRef)
    },
    gridDetailInstance3() {
      return this.GetDataGrid(this.warehouseLocInfoRef)
    },
    gridDetailInstance4() {
      return this.GetDataGrid(this.workShopInfoRef)
    },
    gridDetailInstance5() {
      return this.GetDataGrid(this.workPartyInfoRef)
    },
    gridDetailInstance6() {
      return this.GetDataGrid(this.facilityInfoRef)
    },
    gridDetailInstance7() {
      return this.GetDataGrid(this.routingRef)
    },
    gridDetailInstance8() {
      return this.GetDataGrid(this.RouteDetailInfoRef)
    },
  },

  beforeMount() {
    //공정유형 코드
    let params = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'PROC_TYPE',
      userFlag: 'Y',
    }

    //창고구분 코드
    let params2 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'WH_CLASS',
      userFlag: 'Y',
    }

    //작업장유형 코드
    let params3 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'WS_TYPE',
      userFlag: 'Y',
    }

    //설비등급 코드
    let params4 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'FAC_CLS_CODE',
      userFlag: 'Y',
    }

    //설비상태 코드
    let params5 = {
      comCode: getComCode(),
      codegr: 'COM',
      code: 'FAC_ST_CODE',
      userFlag: 'Y',
    }

    //자동투입창고 코드
    let params6 = {
      comCode: getComCode(),
    }

    //공정명 코드
    let params7 = {
      comCode: getComCode(),
    }

    Promise.all([
      getCmChildCode(params),
      getCmChildCode(params2),
      getCmChildCode(params3),
      getCmChildCode(params4),
      getCmChildCode(params5),
      getAutoStorage(params6),
      getProcessName(params7),
    ])
      .then((res) => {
        // console.log('resresresres', res)
        this.catType = res[0].list.slice()
        this.whType = res[1].list.slice()
        this.workType = res[2].list.slice()
        this.eqGrade = res[3].list.slice()
        this.eqState = res[4].list.slice()
        this.whCode = res[5].list.slice()
        this.inWh = res[5].list.slice()
        this.outWh = res[5].list.slice()
        this.moldLoc = res[5].list.slice()
        this.proCode = res[6].list.slice()
      })
      .catch((error) => {})
  },
  mounted() {
    this.doSearchMainList()
    this.doSearchDetailList()
    // this.warehouseLocInfoData()
    // this.workPartyInfoData()
    // this.RouteDetailInfoData()
  },
  methods: {
    onMultiProcChanged(value, cellInfo) {
      console.log('onMultiProcChanged', value)
      console.log('onMultiProcChanged', value.toString())
      cellInfo.setValue(value.value);
      //cellInfo.component.updateDimensions();
    },
    multiLookupTemplet(container, options) {
      const noBreakSpace = '\u00A0';
      const text = (options.value || []).map((element) => options.column.lookup.calculateCellValue(element)).join(', ');
      container.textContent = text || noBreakSpace;
      container.title = text;
    },
    rowUpdated(e) {
      if(this.TabKey === '공정정보'){
        this.gridDetailInstance1.selectRows(e.key, true)
      } else if(this.TabKey === '창고정보'){
        this.gridDetailInstance2.selectRows(e.key, true)
      } else if(this.TabKey === '작업장정보'){
        this.gridDetailInstance4.selectRows(e.key, true)
      } else if (this.TabKey === '설비정보') {
        this.gridDetailInstance6.selectRows(e.key, true)
      } else if (this.TabKey === '경로정보') {
        this.gridDetailInstance7.selectRows(e.key, true)
      }
    },
    rowUpdated_warehouseDetail(e){
      if(this.TabKey === '창고정보'){
        this.gridDetailInstance3.selectRows(e.key, true)
      }
    },
    rowUpdated_workShopDetail(e) {
      console.log("탭키",this.TabKey)
      if (this.TabKey === '작업장정보') {
        this.gridDetailInstance5.selectRows(e.key, true)
      }
    },
    rowUpdated_pathDetail(e) {
      if (this.TabKey === '경로정보') {
        this.gridDetailInstance8.selectRows(e.key, true)
      }
    },
    //-----------------------------------------컬럼 수정 관리------------------------------------------------------------//
    bas0030EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'facCode') {
          e.cancel = true
        }
      }
    },
    bas0031EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'facCode' || e.column.dataField === 'proCode') {
          e.cancel = true
        }
      }
    },
    bas0032EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'whCode') {
          e.cancel = true
        }
      }
    },
    bas0033EditingStart(e) {
      if (e.data.__created__ === false) {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'facCode' ||
          e.column.dataField === 'whCode' ||
          e.column.dataField === 'locCode'
        ) {
          e.cancel = true
        }
      }
    },
    bas0034EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'facCode' || e.column.dataField === 'workCode') {
          e.cancel = true
        }
      }
    },
    bas0035EditingStart(e) {
      if (e.data.__created__ === false) {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'facCode' ||
          e.column.dataField === 'workCode' ||
          e.column.dataField === 'workDecode'
        ) {
          e.cancel = true
        }
      }
    },
    bas0036EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'facCode' || e.column.dataField === 'eqCode') {
          e.cancel = true
        }
      }
    },
    bas0037EditingStart(e) {
      if (e.data.__created__ === false) {
        if (e.column.dataField === 'comCode' || e.column.dataField === 'facCode' || e.column.dataField === 'pathCode') {
          e.cancel = true
        }
      }
    },
    bas0038EditingStart(e) {
      if (e.data.__created__ === false) {
        if (
          e.column.dataField === 'comCode' ||
          e.column.dataField === 'facCode' ||
          e.column.dataField === 'pathCode' ||
          e.column.dataField === 'proCode' ||
          e.column.dataField === 'procNo'
        ) {
          e.cancel = true
        }
      }
    },
    //-----------------------------------------컬럼 수정 관리------------------------------------------------------------//
    inputData(e) {},
    tabChange(e) {
      this.TabKey = e
      this.doSearchDetailList(this.TabKey)
    },
    //-----------------------------------------공장 정보------------------------------------------------------------//
    doSearchMainList(isProgress) {
      this.openLoading('searching')
      let params = {
        comCode: getComCode(),
      }
      getFactoryInfoData(params)
        .then((res) => {
          let cnt = 0
          res.list.forEach((e) => {
            e.id = cnt++
          })
          this.factoryInfo = res.list
        })
        .finally(() => {
          this.gridMainInstance.option('focusedRowIndex', 0)
          this.listClick()
          this.endLoading()
        })
    },
    doSearchDetailList(e) {
      let params = {
        comCode: getComCode(),
        facCode: this.listClickData.facCode,
        facName: this.listClickData.facName,
      }
      //-----------------------------------------공정 정보------------------------------------------------------------//
      if (this.TabKey === '공정정보') {
        this.processInfo = []
        this.openLoading('searching')
        getProcInfo(params)
          .then((res) => {
            if (this.listClickData === '') {
              this.processInfo = res.list
            } else {
              this.processInfo = []
              let cnt = 0
              res.list.forEach((e) => {
                e.id = cnt++
                if (this.listClickData.comCode === e.comCode && this.listClickData.facCode === e.facCode) {
                  this.processInfo.push(e)
                }
              })
            }
          })
          .finally(() => {
            this.gridDetailInstance1.clearSelection()
            this.endLoading()
          })
      }
      //-----------------------------------------창고 정보------------------------------------------------------------//
      else if (this.TabKey === '창고정보') {
        getWarehouseInfoData(params)
          .then((res) => {
            if (this.listClickData === '') {
              this.warehouseInfo = res.list
            } else {
              let cnt = 0
              this.warehouseInfo = []
              res.list.forEach((e) => {
                e.id = cnt++
                if (this.listClickData.comCode === e.comCode && this.listClickData.facCode === e.facCode) {
                  this.warehouseInfo.push(e)
                }
              })
            }
          })
          .finally(() => {
            this.gridDetailInstance2.option('focusedRowIndex', -1)
            this.gridDetailInstance2.option('focusedRowIndex', 0)
            this.gridDetailInstance2.clearSelection()
            this.gridDetailInstance3.clearSelection()
            this.endLoading()
          })
      }
      //-----------------------------------------작업장 정보------------------------------------------------------------//
      else if (this.TabKey === '작업장정보') {
        getWorkShopInfoData(params)
          .then((res) => {
            if (this.listClickData === '') {
              this.workShopInfo = res.list
            } else {
              let cnt = 0
              this.workShopInfo = []
              res.list.forEach((e) => {
                e.id = cnt++
                if (this.listClickData.comCode === e.comCode && this.listClickData.facCode === e.facCode) {
                  this.workShopInfo.push(e)
                }
              })
            }
          })
          .finally(() => {
            this.gridDetailInstance4.option('focusedRowIndex', -1)
            this.gridDetailInstance4.option('focusedRowIndex', 0)
            this.gridDetailInstance4.clearSelection()
            this.gridDetailInstance5.clearSelection()
            this.endLoading()
          })
      }
      //-----------------------------------------설비 정보------------------------------------------------------------//
      else if (this.TabKey === '설비정보') {
        this.facilityInfo = []
        getFacilityInfoData(params)
          .then((res) => {
            if (this.listClickData === '') {
              this.facilityInfo = res.list
            } else {
              let cnt = 0
              this.facilityInfo = []
              res.list.forEach((e) => {
                e.id = cnt++
                if(e.eqpImage) {
                  console.log(e.imageBase64)
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
                if (this.listClickData.comCode === e.comCode && this.listClickData.facCode === e.facCode) {
                  this.facilityInfo.push(e)
                }
              })
            }
          })
          .finally(() => {
            this.gridDetailInstance6.clearSelection()
            this.endLoading()
          })
      }
      //-----------------------------------------경로 정보------------------------------------------------------------//
      else if (this.TabKey === '경로정보') {
        this.routing = []
        getRoutingInfo(params)
          .then((res) => {
            if (this.listClickData === '') {
              this.routing = res.list
            } else {
              let cnt = 0
              this.routing = []
              res.list.forEach((e) => {
                e.id = cnt++
                if (this.listClickData.comCode === e.comCode && this.listClickData.facCode === e.facCode) {
                  this.routing.push(e)
                }
              })
            }
          })
          .finally(() => {
            this.gridDetailInstance7.option('focusedRowIndex', -1)
            this.gridDetailInstance7.option('focusedRowIndex', 0)
            this.gridDetailInstance7.clearSelection()
            this.gridDetailInstance8.clearSelection()
            this.endLoading()
          })
      }
    },
    //-----------------------------------------창고 위치 정보------------------------------------------------------------//
    warehouseLocInfoData() {
      this.warehouseLocInfo = []
      let params = {
        comCode: getComCode(),
        facCode: this.whCodeData.facCode,
        whCode: this.whCodeData.whCode,
      }
      getWarehouseLocInfoData(params)
        .then((res) => {
          if (this.whCodeData === '') {
            this.warehouseLocInfo = res.list

            this.autoWhCode = res.list
          } else {
            let cnt = 0
            res.list.forEach((e) => {
              e.id = cnt++
              if (this.whCodeData.comCode === e.comCode && this.whCodeData.facCode === e.facCode && this.whCodeData.whCode === e.whCode) {
                this.warehouseLocInfo.push(e)
              }
            })
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },

    //-----------------------------------------작업반 정보------------------------------------------------------------//
    workPartyInfoData() {
      this.workPartyInfo = []
      let params = {
        comCode: getComCode(),
        facCode: this.workCodeData.facCode,
        workCode: this.workCodeData.workCode,
      }
      let params2 = {
        comCode: getComCode(),
      }
      Promise.all([getAutoStorage(params2)])
        .then((res) => {
          this.inWh = res[0].list.slice()
          this.outWh = res[0].list.slice()
        })
        .catch((error) => {})
      getWorkPartyInfoData(params)
        .then((res) => {
          if (this.workCodeData === '') {
            this.workPartyInfo = res.list
          } else {
            let cnt = 0
            res.list.forEach((e) => {
              e.id = cnt++
              if (this.workCodeData.comCode === e.comCode && this.workCodeData.facCode === e.facCode && this.workCodeData.workCode === e.workCode) {
                this.workPartyInfo.push(e)
              }
            })
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },

    //-----------------------------------------경로 상세 정보------------------------------------------------------------//
    RouteDetailInfoData() {
      this.RouteDetailInfo = []
      let params = {
        comCode: getComCode(),
        facCode: this.pathCodeData.facCode,
        pathCode: this.pathCodeData.pathCode,
      }
      let params2 = {
        comCode: getComCode(),
      }
      Promise.all([getAutoStorage(params2)])
        .then((res) => {
          this.whCode = res[0].list.slice()
        })
        .catch((error) => {})
      let params3 = {
        comCode: getComCode(),
      }
      Promise.all([getProcessName(params3)])
        .then((res) => {
          this.proName = res[0].list.slice()
        })
        .catch((error) => {})
      getRouteDetailInfo(params)
        .then((res) => {
          if (this.pathCodeData === '') {
            this.RouteDetailInfo = res.list
          } else {
            this.RouteDetailInfo = []
            let cnt = 0
            res.list.forEach((e) => {
              e.id = cnt++
              if (this.pathCodeData.comCode === e.comCode && this.pathCodeData.facCode === e.facCode && this.pathCodeData.pathCode === e.pathCode) {
                this.RouteDetailInfo.push(e)
              }
            })
          }
        })
        .finally(() => {
          this.endLoading()
        })
    },
    listClick(e) {
      if (e) {
        this.listClickData = e.row.data
        this.doSearchDetailList()
      }
    },
    onFocusedRowChanged(e) {
      if (e.row === undefined) {
        return
      }
      this.whCodeData = ''
      this.whCodeData = e.row.data
      this.warehouseLocInfoData()
    },
    onFocusedRowChanged2(e) {
      if (e.row === undefined) {
        return
      }
      this.workCodeData = ''
      this.workCodeData = e.row.data
      this.workPartyInfoData()
    },
    onFocusedRowChanged3(e) {
      if (e.row === undefined) {
        return
      }
      this.pathCodeData = ''
      this.pathCodeData = e.row.data
      this.RouteDetailInfoData()
    },
    //설비정보 POPUP/////////////////////////
    imgClick(e) {//이미지 클릭 팝업
      this.$refs.imagePopup.open(e)
    },
    popupOpen(e) {
      this.popupData = e.data
      this.popupData.__created__ = false
      this.popupData.__modified__ = true
    },
    close() {
        this.popVisible = false
    },
    //////////////////////////////////////
    btnAdd(gbn) {
      if (gbn === '공장정보') {
        let newRow = {
          id: this.factoryInfo.length + 1,
          comCode: getComCode(),
          facCode: '',
          facName: '',
          facNumber: '',
          name: '',
          postNo: '',
          addr: '',
          tel: '',
          fax: '',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          State: '',
          __created__: true,
          __modified__: false,
        }

        this.gridMainInstance.newRow(newRow)
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 1)
      } else if (gbn === '공정정보') {
        if (!this.factoryInfo.length || this.listClickData === '') {
          notify(this.$t('bas0120PleaseCheck1'), 'error')
          return
        }
        let newRow = {
          id: this.processInfo.length + 1,
          comCode: getComCode(),
          facCode: this.listClickData.facCode,
          facName: this.listClickData.facName,
          proCode: '',
          proName: '',
          proType: '',
          catType: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance1.newRow(newRow)
        this.gridDetailInstance1.selectRows(newRow.id, true)
        this.gridDetailInstance1.option('focusedRowIndex', -1)
      } else if (gbn === '창고정보') {
        if (!this.factoryInfo.length || this.listClickData === '') {
          notify(this.$t('bas0120PleaseCheck1'), 'error')
          return
        }
        let newRow = {
          id: this.warehouseInfo.length + 1,
          comCode: getComCode(),
          facCode: this.listClickData.facCode,
          whCode: '',
          whName: '',
          whType: '',
          whDesc: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance2.newRow(newRow)
        this.gridDetailInstance2.selectRows(newRow.id, true)
        this.gridDetailInstance2.option('focusedRowIndex', -1)
      } else if (gbn === '창고위치정보') {
        if (!this.warehouseInfo.length || this.whCodeData === '') {
          notify(this.$t('bas0120PleaseCheck2'), 'error', 1500)
          return
        }
        if (this.whCodeData.whCode === '') {
          notify(this.$t('bas0120NotFound1'), 'error', 1500)
          return
        }
        let newRow = {
          id: this.warehouseLocInfo.length + 1,
          comCode: getComCode(),
          facCode: this.whCodeData.facCode,
          whCode: this.whCodeData.whCode,
          locCode: '',
          locName: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance3.newRow(newRow)
        this.gridDetailInstance3.selectRows(newRow.id, true)
        this.gridDetailInstance3.option('focusedRowIndex', -1)
      } else if (gbn === '작업장정보') {
        if (!this.factoryInfo.length || this.listClickData === '') {
          notify(this.$t('bas0120PleaseCheck1'), 'error')
          return
        }
        let newRow = {
          id: this.workShopInfo.length + 1,
          comCode: getComCode(),
          facCode: this.listClickData.facCode,
          workCode: '',
          workName: '',
          workType: '',
          workDesc: '',
          depCode: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance4.newRow(newRow)
        this.gridDetailInstance4.selectRows(newRow.id, true)
        this.gridDetailInstance4.option('focusedRowIndex', -1)
      } else if (gbn === '작업반정보') {
        if (!this.workShopInfo.length || this.workCodeData === '') {
          notify(this.$t('bas0120PleaseCheck1'), 'error')
          return
        }
        if (this.workCodeData.workCode === '') {
          notify(this.$t('bas0120NotFound2'), 'error', 1500)
          return
        }
        let newRow = {
          id: this.workPartyInfo.length + 1,
          comCode: getComCode(),
          facCode: this.workCodeData.facCode,
          workCode: this.workCodeData.workCode,
          workDecode: '',
          workDename: '',
          workDedesc: '',
          inWh: '',
          outWh: '',
          perWh: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance5.newRow(newRow)
        this.gridDetailInstance5.selectRows(newRow.id, true)
        this.gridDetailInstance5.option('focusedRowIndex', -1)
      } else if (gbn === '설비정보') {
        if (!this.factoryInfo.length || this.listClickData === '') {
          notify(this.$t('bas0120PleaseCheck1'), 'error')
          return
        }
        let newRow = {
          id: this.facilityInfo.length + 1,
          comCode: getComCode(),
          facCode: this.listClickData.facCode,
          eqCode: '',
          eqName: '',
          eqSpec: '',
          eqGrade: '',
          proCode: '',
          eqState: '',
          makeCom: '',
          perCom: '',
          proDate: '',
          insDate: '',
          desDate: '',
          dayInspYn: '',
          dayInspDt: '',
          dayInspNextDt: '',
          periInspYn: '',
          periInspCycle: '',
          periInspDt: '',
          periInspNextDt: '',
          preStr: '',
          moldLoc: '',
          eqpImage: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }

        this.gridDetailInstance6.clearSelection()
        this.$refs.bas0120Popup.open('add', newRow, this.eqGrade, this.eqState, this.inWh)
        this.popVisible = true
      } else if (gbn === '경로정보') {
        if (!this.factoryInfo.length || this.listClickData === '') {
          notify(this.$t('bas0120PleaseCheck1'), 'erroe')
          return
        }
        let newRow = {
          id: this.routing.length + 1,
          comCode: getComCode(),
          facCode: this.listClickData.facCode,
          pathCode: '',
          pathName: '',
          sortFlag: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance7.newRow(newRow)
        this.gridDetailInstance7.selectRows(newRow.id, true)
        this.gridDetailInstance7.option('focusedRowIndex', -1)
      } else if (gbn === '경로정보상세') {
        if (!this.factoryInfo.length || this.pathCodeData === '') {
          notify(this.$t('bas0120PleaseCheck4'), 'error')
          return
        }
        if (this.pathCodeData.pathCode === '') {
          notify(this.$t('bas0120NotFound3'), 'error', 1500)
          return
        }
        let newRow = {
          id: this.RouteDetailInfo.length + 1,
          comCode: getComCode(),
          facCode: this.pathCodeData.facCode,
          pathCode: this.pathCodeData.pathCode,
          procCode: '',
          procNo: '',
          proName: '',
          whCode: '',
          remark: '',
          userFlag: 'Y',
          makeDate: getCurrentDate(),
          maker: getUserId(),
          editDate: '',
          editor: '',
          __created__: true,
          __modified__: false,
        }
        this.gridDetailInstance8.newRow(newRow)
        this.gridDetailInstance8.selectRows(newRow.id, true)
        this.gridDetailInstance8.option('focusedRowIndex', -1)
      }
    },

    ////////////////////////////////////////////////////////////////저장버튼//////////////////////////////////////////////////////////
    async btnSave(gbn) {
      if (gbn === '공장정보') {
        this.gridMainInstance.saveEditData()
        var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
        let messageGubun = ''
        if (!selectedMainRows.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row of selectedMainRows) {
          if (!row.comCode || !row.facCode) {
            this.vToastify(this.$t('bas0120RequiredInput1'), 'warn')
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
          (current) => {
            this.openLoading()
            this.gridMainInstance.beginUpdate()
            saveFacInfo(selectedMainRows, true)
              .then((res) => {
                this.gridMainInstance.endUpdate()
                let message = ''
                message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchMainList()
                this.doSearchDetailList()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.doSearchMainList()
                this.endLoading()
              })
              .finally(() => {
                this.gridMainInstance.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '공정정보') {
        this.gridDetailInstance1.saveEditData()
        var selectedDetailRows1 = await this.gridDetailInstance1.getSelectedRowsData()
        let messageGubun = ''
        if (!selectedDetailRows1.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (var row1 of selectedDetailRows1) {
          if (!row1.comCode || !row1.facCode || !row1.proCode) {
            this.vToastify(this.$t('bas0120RequiredInput2'), 'warn')
            return
          }
          if (row1.__created__ === false) {
            messageGubun = 'doFixData'
            row1.__modified__ = true
            row1.comCode = getComCode()
            row1.editor = getUserId()
          } else if (row1.__created__ === true) {
            messageGubun = 'doSaveData'
            row1.comCode = getComCode()
            row1.maker = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance1.beginUpdate()
            saveProcInfo(selectedDetailRows1, true)
              .then((res) => {
                this.gridDetailInstance1.endUpdate()
                let message = ''
                message = selectedDetailRows1[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchDetailList()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.doSearchMainList()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance1.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '창고정보') {
        this.gridDetailInstance2.saveEditData()
        var selectedDetailRows2 = await this.gridDetailInstance2.getSelectedRowsData()
        let messageGubun = ''

        if (!selectedDetailRows2.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row2 of selectedDetailRows2) {
          if (!row2.comCode || !row2.facCode || !row2.whCode) {
            this.vToastify(this.$t('bas0120RequiredInput3'), 'warn')
            return
          }
          if (row2.__created__ === false) {
            messageGubun = 'doFixData'
            row2.__modified__ = true
            row2.comCode = getComCode()
            row2.editor = getUserId()
          } else if (row2.__created__ === true) {
            messageGubun = 'doSaveData'
            row2.comCode = getComCode()
            row2.maker = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance2.beginUpdate()
            saveWareHouseInfo(selectedDetailRows2, true)
              .then((res) => {
                this.gridDetailInstance2.endUpdate()
                let message = ''
                message = selectedDetailRows2[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchDetailList()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.doSearchMainList()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance2.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '창고위치정보') {
        this.gridDetailInstance3.saveEditData()
        var selectedDetailRows3 = await this.gridDetailInstance3.getSelectedRowsData()
        let messageGubun = ''

        if (!selectedDetailRows3.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (var row3 of selectedDetailRows3) {
          if (!row3.comCode || !row3.facCode || !row3.whCode || !row3.locCode) {
            this.vToastify(this.$t('bas0120RequiredInput4'), 'warn')
            return
          }
          if (row3.__created__ === false) {
            messageGubun = 'doFixData'
            row3.__modified__ = true
            row3.comCode = getComCode()
            row3.editor = getUserId()
          } else if (row3.__created__ === true) {
            messageGubun = 'doSaveData'
            row3.comCode = getComCode()
            row3.maker = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance3.beginUpdate()
            saveWareHouseLocInfo(selectedDetailRows3, true)
              .then((res) => {
                this.gridDetailInstance3.endUpdate()
                let message = ''
                message = selectedDetailRows3[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.warehouseLocInfoData()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.warehouseLocInfoData()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance3.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '작업장정보') {
        this.gridDetailInstance4.saveEditData()
        var selectedDetailRows4 = await this.gridDetailInstance4.getSelectedRowsData()
        let messageGubun = ''

        if (!selectedDetailRows4.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row4 of selectedDetailRows4) {
          if (!row4.comCode || !row4.facCode || !row4.workCode) {
            this.vToastify(this.$t('bas0120RequiredInput5'), 'warn')
            return
          }
          if (row4.__created__ === false) {
            messageGubun = 'doFixData'
            row4.__modified__ = true
            row4.comCode = getComCode()
            row4.editor = getUserId()
          } else if (row4.__created__ === true) {
            messageGubun = 'doSaveData'
            row4.comCode = getComCode()
            row4.maker = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance4.beginUpdate()
            saveWorkShopInfo(selectedDetailRows4, true)
              .then((res) => {
                this.gridDetailInstance4.endUpdate()
                let message = ''
                message = selectedDetailRows4[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchDetailList()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.doSearchDetailList()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance4.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '작업반정보') {
        this.gridDetailInstance5.saveEditData()
        var selectedDetailRows5 = await this.gridDetailInstance5.getSelectedRowsData()
        let messageGubun = ''

        if (!selectedDetailRows5.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row5 of selectedDetailRows5) {
          if (!row5.comCode || !row5.facCode || !row5.workCode || !row5.workDecode) {
            this.vToastify(this.$t('bas0120RequiredInput6'), 'warn')
            return
          }
          if (row5.__created__ === false) {
            messageGubun = 'doFixData'
            row5.__modified__ = true
            row5.comCode = getComCode()
            row5.editor = getUserId()
          } else if (row5.__created__ === true) {
            messageGubun = 'doSaveData'
            row5.comCode = getComCode()
            row5.maker = getUserId()
          }
        }

        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance5.beginUpdate()
            saveWorkPartyInfo(selectedDetailRows5, true)
              .then((res) => {
                this.gridDetailInstance5.endUpdate()
                let message = ''
                message = selectedDetailRows5[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.workPartyInfoData()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.workPartyInfoData()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance5.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '경로정보') {
        this.gridDetailInstance7.saveEditData()
        var selectedDetailRows7 = await this.gridDetailInstance7.getSelectedRowsData()
        let messageGubun = ''
        
        if (!selectedDetailRows7.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }

        //유효성 체크
        for (var row7 of selectedDetailRows7) {
          if (!row7.comCode || !row7.facCode || !row7.pathCode) {
            this.vToastify(this.$t('bas0120RequiredInput8'), 'warn')
            return
          }
          if (row7.__created__ === false) {
            messageGubun = 'doFixData'
            row7.__modified__ = true
            row7.comCode = getComCode()
            row7.editor = getUserId()
          } else if (row7.__created__ === true) {
            messageGubun = 'doSaveData'
            row7.comCode = getComCode()
            row7.maker = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance7.beginUpdate()
            saveRoutingInfo(selectedDetailRows7, true)
              .then((res) => {
                this.gridDetailInstance7.endUpdate()
                let message = ''
                message = selectedDetailRows7[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.doSearchDetailList()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.doSearchMainList()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance7.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '경로정보상세') {
        this.gridDetailInstance8.saveEditData()
        var selectedDetailRows8 = await this.gridDetailInstance8.getSelectedRowsData()
        let messageGubun = ''
        if (!selectedDetailRows8.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        //유효성 체크
        for (var row8 of selectedDetailRows8) {
          if (!row8.comCode || !row8.facCode || !row8.pathCode || !row8.proCode || !row8.procNo) {
            this.vToastify(this.$t('bas0120RequiredInput9'), 'warn')
            return
          }
          if (row8.__created__ === false) {
            messageGubun = 'doFixData'
            row8.__modified__ = true
            row8.comCode = getComCode()
            row8.editor = getUserId()
          } else if (row8.__created__ === true) {
            messageGubun = 'doSaveData'
            row8.comCode = getComCode()
            row8.maker = getUserId()
          }
        }
        this.vToastifyPrompt(
          this.$t(messageGubun),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance8.beginUpdate()
            saveRouteDetailInfo(selectedDetailRows8, true)
              .then((res) => {
                this.gridDetailInstance8.endUpdate()
                let message = ''
                message = selectedDetailRows8[0].__created__ == true ? 'Saved' : 'changed'
                notify(this.$t(message), 'success', 1500)
                this.RouteDetailInfoData()
                this.endLoading()
              })
              .catch((error) => {
                notify(error, 'error', 1500)
                this.RouteDetailInfoData()
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance8.saveEditData()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
    //설비정보 저장/////////////////////////
    async btnSavePop(items) {
      let data = items.popupData
      let messageGubun = ''
      //유효성 체크
      if (!data[0].comCode || !data[0].facCode || !data[0].eqCode) {
        this.vToastify(this.$t('bas0120RequiredInput7'), 'warn')
        return
      }
      if (data[0].__created__ === false) {
        messageGubun = 'doFixData'
        data[0].__modified__ = true
      } else if (data[0].__created__ === true) {
        messageGubun = 'doSaveData'
      }

      this.vToastifyPrompt(
        this.$t(messageGubun),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance6.beginUpdate()
          let datas = new FormData()
          if(items.file != null)
            datas.append('file', items.file)
          for (var key in data[0]) {
            datas.append(key, data[0][key])
          }
          saveFacilityInfo(datas)
            .then((res) => {
              let message = data[0].__created__ == true ? 'Saved' : 'changed'
              notify(this.$t(message), 'success', 1500)
              this.doSearchDetailList()
              this.popVisible = false
            })
            .catch((error) => {
              notify(error, 'error', 1500)
              this.endLoading()
            })
            .finally(() => {
              this.gridDetailInstance6.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    async btnCorrection() {
      let selectedDetailRows6 = await this.gridDetailInstance6.getSelectedRowsData()

      if (!selectedDetailRows6.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      this.popVisible = true
      this.$refs.bas0120Popup.open('mod',this.popupData, this.eqGrade, this.eqState)
    },
    async btnDelete(gbn) {
      // if (gbn === '공장정보') {
      //   this.gridMainInstance.saveEditData()
      //   var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

      //   if (!selectedMainRows.length) {
      //     this.vToastify(this.$t('SelectCheck'), 'warn')
      //     return
      //   }
      //   this.vToastifyPrompt(
      //     this.$t('doDeleteData'),
      //     'info',
      //     current => {
      //       this.openLoading()
      //       this.gridMainInstance.beginUpdate()
      //       deleteFacInfo(selectedMainRows, true)
      //         .then(res => {
      //           notify(this.$t('deleted'), 'success', 1500)
      //           this.doSearchMainList()
      //         })
      //         .catch(error => {
      //           console.log("error : ", error)
      //           notify(error, 'error', 1500)
      //           this.endLoading()
      //         })
      //         .finally(() => {
      //           this.gridMainInstance.endUpdate()
      //           this.endLoading()
      //         })
      //     },
      //     null,
      //     true
      //   )
      // }
      if (gbn === '공정정보') {
        this.gridDetailInstance1.saveEditData()
        var selectedDetailRows1 = await this.gridDetailInstance1.getSelectedRowsData()

        if (!selectedDetailRows1.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance1.beginUpdate()
            deleteProcInfo(selectedDetailRows1, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDetailList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance1.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '창고정보') {
        this.gridDetailInstance2.saveEditData()
        var selectedDetailRows2 = await this.gridDetailInstance2.getSelectedRowsData()

        if (!selectedDetailRows2.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        if(this.warehouseLocInfo.length){
          this.vToastify(this.$t('subDataCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance2.beginUpdate()
            deleteWareHouseInfo(selectedDetailRows2, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDetailList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance2.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '창고위치정보') {
        this.gridDetailInstance3.saveEditData()
        var selectedDetailRows3 = await this.gridDetailInstance3.getSelectedRowsData()

        if (!selectedDetailRows3.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance3.beginUpdate()
            deleteWareHouseLocInfo(selectedDetailRows3, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.warehouseLocInfoData()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance3.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '작업장정보') {
        this.gridDetailInstance4.saveEditData()
        var selectedDetailRows4 = await this.gridDetailInstance4.getSelectedRowsData()

        if (!selectedDetailRows4.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        if (this.workPartyInfo.length) {
          this.vToastify(this.$t('subDataCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance4.beginUpdate()
            deleteWorkShopInfo(selectedDetailRows4, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDetailList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance4.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '작업반정보') {
        this.gridDetailInstance5.saveEditData()
        var selectedDetailRows5 = await this.gridDetailInstance5.getSelectedRowsData()

        if (!selectedDetailRows5.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance5.beginUpdate()
            deleteWorkPartyInfo(selectedDetailRows5, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.workPartyInfoData()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance5.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '설비정보') {
        this.gridDetailInstance6.saveEditData()
        var selectedDetailRows6 = await this.gridDetailInstance6.getSelectedRowsData()
        if (!selectedDetailRows6.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance6.beginUpdate()
            deleteFacilityInfo(selectedDetailRows6)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDetailList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance6.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '경로정보') {
        this.gridDetailInstance7.saveEditData()
        var selectedDetailRows7 = await this.gridDetailInstance7.getSelectedRowsData()

        if (!selectedDetailRows7.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        if (this.RouteDetailInfo.length) {
          this.vToastify(this.$t('subDataCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance7.beginUpdate()
            deleteRoutingInfo(selectedDetailRows7, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.doSearchDetailList()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance7.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      } else if (gbn === '경로정보상세') {
        this.gridDetailInstance8.saveEditData()
        var selectedDetailRows8 = await this.gridDetailInstance8.getSelectedRowsData()

        if (!selectedDetailRows8.length) {
          this.vToastify(this.$t('SelectCheck'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            this.gridDetailInstance8.beginUpdate()
            deleteRouteDetailInfo(selectedDetailRows8, true)
              .then((res) => {
                notify(this.$t('deleted'), 'success', 1500)
                this.RouteDetailInfoData()
              })
              .catch((error) => {
                console.log('error : ', error)
                notify(error, 'error', 1500)
                this.endLoading()
              })
              .finally(() => {
                this.gridDetailInstance8.endUpdate()
                this.endLoading()
              })
          },
          null,
          true
        )
      }
    },
  },
}
</script>
<style lang="less" scoped>
.uploadedImage {
  width: 100px;
  height: 100px;
  object-fit: scale-down;
  // height: 50px;
}
.noImageText {
  width: 100px;
  height: 100px;
  display : flex;
  justify-content : center;
  align-items : center;
}
</style>