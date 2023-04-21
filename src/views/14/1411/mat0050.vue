<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top
          class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch' //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-row>
              <!-- 공장코드 -->
              <v-col cols="2" class="pa-2 pt-0  pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchValue.facCode"
                  :label="$t('facCode')"
                  :items="comboBoxList.facCodeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <!-- 입고구분 -->
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="searchValue.inType"
                  :label="$t('inType')"
                  :items="comboBoxList.inTypeList"
                  item-text="text"
                  item-value="value"
                  :prepend-inner-icon="'$search'"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" class="pa-2 pt-2 pb-2">
                <v-menu
                  ref="workFrDateCal"
                  v-model="calMenuState.workFrDateCal"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :prepend-inner-icon="'$search'"
                      :label="$t('inquiryDate')"
                      v-model="searchValue.workFrDate"
                      dense
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="searchValue.workFrDate" no-title @input="calMenuState.workFrDateCal = false" :day-format="(date) => { return new Date(date).getDate() }"/>
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                  ref="workDateCal"
                  v-model="calMenuState.workDateCal"
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
                      v-model="searchValue.workDate"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="searchValue.workDate"
                    :min="searchValue.workFrDate"
                    no-title
                    scrollable
                    @input="calMenuState.workDateCal = false"
                    :day-format="(date) => { return new Date(date).getDate() }"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
      <!-- 입고 정보 -->
      <v-col cols="5" class="pa-2">
        <i-card-vertical headerTitle="receivingInfo">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="receivingInfo"
                  class="listBox03"
                  :ref="receivingInfoGridData.mainGrid.ref"
                  :data-source="receivingInfoGridData.mainGrid.data"
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
                  column-resizing-mode="widget"
                  @focused-row-changed="focusedRowChanged_getStockStatus"
                >
                  <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                  <DxGrouping :auto-expand-all="receivingInfoGridData.autoExpandAll" />
                  <!-- 회사코드 Column -->
                  <DxColumn
                          data-field="comCode"
                          :caption="$t('comCode')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 공장코드 Column -->
                        <DxColumn
                          data-field="facCode"
                          :caption="$t('facCode')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 입고일 Column -->
                        <DxColumn
                          data-field="regiDate"
                          :caption="$t('regiDate')"
                          width="auto"
                          data-type="string"
                          alignment="right"
                          :allow-editing="false"
                          :visible="false"
                        />                     
                        <!-- 일련번호 Column -->
                        <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                        <!-- 입고구분 Column -->
                        <DxColumn
                          data-field="inType"
                          :caption="$t('inType')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 입고구분명 Column -->
                        <DxColumn
                          data-field="inTypeName"
                          :caption="$t('inType')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <!-- 거래처명Column -->
                        <DxColumn
                          data-field="custName"
                          :caption="$t('custName')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        />                           
                        <!-- 품번코드 Column -->
                        <DxColumn
                          data-field="partNo"
                          :caption="$t('partNo')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <!-- 품명 Column -->
                        <DxColumn
                          data-field="partName"
                          :caption="$t('partName')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <!-- 단위 Column -->
                        <DxColumn
                          data-field="unit"
                          :caption="$t('unit')"
                          width="auto"
                          data-type="unit"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <!-- 스펙 Column -->
                        <DxColumn
                          data-field="spec"
                          :caption="$t('spec')"
                          width="auto"
                          data-type="spec"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <!-- 입고량 Column -->
                        <DxColumn
                          data-field="inQty"
                          :caption="$t('inQty')"
                          width="auto"
                          data-type="string"
                          alignment="right"
                          :allow-editing="false"
                          :customize-text="customizeText"
                        />
                        <!-- 발주번호 Column -->
                        <DxColumn
                          data-field="ordNo"
                          :caption="$t('ordNo')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 순번 Column -->
                        <DxColumn 
                          data-field="no" 
                          :caption="$t('no')" 
                          width="auto" 
                          data-type="string" 
                          alignment="center" 
                          :allow-editing="false"                           
                          :visible="false"
                        />
                        <!-- 비고 Column -->
                        <DxColumn
                          data-field="remark"
                          :caption="$t('remark')"
                          width="500"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <DxColumn/>
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="receivingInfoGridData.checkBoxesMode" mode="single" />
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                  <DxSummary>
                    <DxGroupItem
                      :show-in-group-footer="true"
                      column="inQty"
                      summary-type="sum"
                      display-format="Total: {0}"
                      :customize-text="customizeText"
                    />
                    <DxTotalItem column="inQty" summary-type="sum"  display-format="Total: {0}" :customize-text="customizeText" />
                  </DxSummary>

                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>

      <v-col cols="7" class="pa-2">
        <!-- 재고현황 -->
        <v-row>
          <i-card-vertical headerTitle="stockStatus" :useBtnList="['btnAdd']" @btnAdd="btnAddReturnReg">
            <template v-slot:body>
              <v-layout column>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="stockStatus"
                    class="doubleListBox09"
                    :ref="stockStatusGridData.mainGrid.ref"
                    :data-source="stockStatusGridData.mainGrid.data"
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
                    column-resizing-mode="widget"
                  >
                    <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                    <DxGrouping :auto-expand-all="stockStatusGridData.autoExpandAll" />
                    <!-- 회사코드 Column -->
                    <DxColumn
                      data-field="comCode"
                      :caption="$t('comCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <!-- 공장코드 Column -->
                    <DxColumn
                      data-field="facCode"
                      :caption="$t('facCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <!-- 구매입고 LOT NO Column -->
                    <DxColumn data-field="lotNo" :caption="$t('lotNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                    <!-- 구매입고 전산번호 Column -->
                    <DxColumn
                      data-field="lotDetail"
                      :caption="$t('lotDetail')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <!-- 수량 Column -->
                    <DxColumn
                      data-field="qty"
                      :caption="$t('WarehousingQty')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :customize-text="customizeText"
                    />
                    <!-- 반품량 Column -->
                    <DxColumn
                      data-field="retQty"
                      :caption="('반품량')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :customize-text="customizeText"
                    />
                    <!--  재고량 Column -->
                    <DxColumn
                      data-field="stockQty"
                      :caption="$t('stockQty')"
                      width="auto"
                      data-type="string"
                      alignment="right"
                      :allow-editing="false"
                      :customize-text="customizeText"
                    />
                    <!-- 입련번호 Column -->
                    <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false" />
                    <!-- 발주번호 Column -->
                    <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                    <!-- 순번 Column -->
                    <DxColumn data-field="no" :caption="$t('no')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                    <!-- 입고상태 Column -->
                    <!-- <DxColumn data-field="inStatus" :caption="$t('inStatus')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false"/> -->
                    <!-- 입고일 Column -->
                    <DxColumn
                      data-field="regiDate"
                      :caption="$t('regiDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                      :visible="false"
                    />
                    <DxColumn/>
                    <DxSummary>
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="qty"
                        summary-type="sum"
                        display-format="Total: {0}"
                        :customize-text="customizeText"
                      />
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="retQty"
                        summary-type="sum"
                        display-format="Total: {0}"
                        :customize-text="customizeText"
                      />
                      <DxGroupItem
                        :show-in-group-footer="true"
                        column="stockQty"
                        summary-type="sum"
                        display-format="Total: {0}"
                        :customize-text="customizeText"
                      />

                      <DxTotalItem column="qty" summary-type="sum"  display-format="Total: {0}" />
                      <DxTotalItem column="retQty" summary-type="sum"  display-format="Total: {0}" />
                      <DxTotalItem column="stockQty" summary-type="sum"  display-format="Total: {0}" />
                    </DxSummary>
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <DxSelection select-all-mode="allPages" :show-check-boxes-mode="stockStatusGridData.checkBoxesMode" mode="multiple" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-row>
        <!-- 반품등록 -->
        <v-row>
          <v-tabs>
            <v-tab class="mr-2" @click="tabChange('반품등록')">{{ $t('returnRegis') }}</v-tab>
            <v-tab class="mr-2" @click="tabChange('반품내역')">{{ $t('returnDetail') }}</v-tab>
            <v-tab-item>
              <i-card-vertical headerTitle="returnReg" :useBtnList="['btnRegi', 'btnCancel']" @btnRegi="btnRegiReturn" @btnCancel="btnDeleteReturn">
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <v-col cols="12" class="pa-0">
                      <DxDataGrid
                        id="returnRegis"
                        class="doubleListBox18"
                        :ref="returnRegisGridData.mainGrid.ref"
                        :data-source="returnRegisGridData.mainGrid.data"
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
                        column-resizing-mode="widget"
                      >
                        <DxGroupPanel :visible="true" :empty-panel-text="$t('panelMessage')" />
                        <DxGrouping :auto-expand-all="returnRegisGridData.autoExpandAll" />
                        <DxScrolling column-rendering-mode="virtual" />
                        <DxSelection select-all-mode="allPages" :show-check-boxes-mode="returnRegisGridData.checkBoxesMode" mode="multiple" />
                        <!-- 입고일 Column
                        <DxColumn
                          data-field="regiDate"
                          :caption="$t('returnDate')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        /> -->
                        <!-- 회사코드 Column -->
                        <DxColumn
                          data-field="comCode"
                          :caption="$t('comCode')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 공장코드 Column -->
                        <DxColumn
                          data-field="facCode"
                          :caption="$t('facCode')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 입련번호 Column -->
                        <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                        <!-- 구매입고 LOT NO Column -->
                        <DxColumn
                          data-field="lotNo"
                          :caption="$t('lotNo')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <!-- 구매입고 전산번호 Column -->
                        <DxColumn
                          data-field="lotDetail"
                          :caption="$t('lotDetail')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <!-- 반품사유 Column -->
                        <DxColumn
                          data-field="retCode"
                          :caption="$t('retCode')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="true"
                        >
                         <DxLookup :data-source="comboBoxList.retCodeList" display-expr="name" value-expr="code" opened="true" /> 
                        </DxColumn>
                        <!-- 재고수량 Column -->
                        <DxColumn
                          data-field="retQty"
                          caption="반품수량"
                          width="auto"
                          data-type="string"
                          alignment="right"
                          :allow-editing="true"
                          :customize-text="customizeText"
                          :set-cell-value="setRetQtyValue"
                        />
                        <!-- 순번 Column -->
                        <DxColumn data-field="no" :caption="$t('no')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                        <!--현재고-->
                        <DxColumn
                          data-field="stockQty"
                          caption="현재고량량"
                          width="auto"
                          data-type="string"
                          alignment="right"
                          :allow-editing="true"
                          :visible="false"
                          :customize-text="customizeText"
                        />
                        <!-- 비고 Column -->
                        <DxColumn
                          data-field="remark"
                          :caption="$t('remark')"
                          width="500"
                          data-type="string"
                          alignment="left"
                          :allow-editing="true"
                        />
                        <DxColumn/>
                        <DxSummary>
                          <DxGroupItem
                            :show-in-group-footer="true"
                            column="retQty"
                            summary-type="sum"
                            display-format="Total: {0}"
                            :customize-text="customizeText"
                          />
                          <DxTotalItem column="retQty" summary-type="sum"  display-format="Total: {0}" />
                        </DxSummary>
                        <DxPaging :enabled="false" />
                        <DxPager :show-page-size-selector="false" />
                      </DxDataGrid>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-tab-item>
            <!-- 반품내역 -->
            <v-tab-item>
              <i-card-vertical headerTitle="returnDet" :useBtnList="['btnDelete']" @btnDelete="btnDeleteReturnList">
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <v-col cols="12" class="pa-0">
                      <DxDataGrid
                        id="returnDetail"
                        class="doubleListBox18"
                        :ref="returnDetailGridData.mainGrid.ref"
                        :data-source="returnDetailGridData.mainGrid.data"
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
                        column-resizing-mode="widget"
                      >
                        <DxScrolling column-rendering-mode="virtual" />
                        <!-- 입고일 Column -->
                        <DxColumn
                          data-field="retDate"
                          :caption="$t('returnDate')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <!-- 회사코드 Column -->
                        <DxColumn
                          data-field="comCode"
                          :caption="$t('comCode')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 공장코드 Column -->
                        <DxColumn
                          data-field="facCode"
                          :caption="$t('facCode')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <!-- 순번 Column -->
                        <DxColumn data-field="retNo" :caption="('반품번호')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                        <!-- 입련번호 Column -->
                        <DxColumn data-field="ilno" :caption="$t('ilno')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                        <!-- 구매입고 LOT NO Column -->
                        <DxColumn
                          data-field="lotNo"
                          :caption="$t('lotNo')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <!-- 구매입고 전산번호 Column -->
                        <DxColumn
                          data-field="lotDetail"
                          :caption="$t('lotDetail')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <!-- 반품사유 Column -->
                        <DxColumn
                          data-field="retCode"
                          :caption="$t('retCode')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="true"
                        />
                        <!-- 재고수량 Column -->
                        <DxColumn
                          data-field="retQty"
                          caption="반품수량"
                          width="auto"
                          data-type="string"
                          alignment="right"
                          :allow-editing="false"
                          :customize-text="customizeText"
                          
                        />
                        <!-- 순번 Column -->
                        <DxColumn data-field="no" :caption="$t('no')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>
                        <DxColumn data-field="ordNo" :caption="$t('ordNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" :visible="false"/>

                        <!-- 비고 Column -->
                        <DxColumn
                          data-field="remark"
                          :caption="$t('remark')"
                          width="500"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                        />
                        <DxColumn
                          data-field="retAmount"
                          :caption="$t('retAmount')"
                          width="auto"
                          data-type="string"
                          alignment="left"
                          :allow-editing="false"
                          :visible="false"
                        />
                        <DxColumn/>
                        <DxSummary>
                          <DxGroupItem
                            :show-in-group-footer="true"
                            column="retQty"
                            summary-type="sum"
                            display-format="Total: {0}"
                            :customize-text="customizeText"
                          />
                          <DxTotalItem column="retQty" summary-type="sum"  display-format="Total: {0}" />
                        </DxSummary>

                        <DxSelection select-all-mode="allPages" :show-check-boxes-mode="returnDetailGridData.checkBoxesMode" mode="multiple" />
                        <DxPaging :enabled="false" />
                        <DxPager :show-page-size-selector="false" />
                      </DxDataGrid>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-tab-item>
          </v-tabs>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup, DxGroupItem, DxSummary, DxGrouping, DxGroupPanel, DxTotalItem } from 'devextreme-vue/data-grid'
import 'devextreme/data/odata/store'
import { getDateFormat, getPreMonth } from '@/utils/common.js'
import ICardVertical from '@/components/common/iCardVertical.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getComCode } from '@/utils/token'
import {
  getMat0012,
  getMat0018,
  getMat0030,
  insertMat0030,
  deleteMat0030,
} from '@/api/view/mat0050'
import { getFactoryInfoData } from '@/api/view/bas0030'
import notify from 'devextreme/ui/notify' // message
import { getCmChildCode } from '@/api/system/cmCodeManage'

export default {
  name: 'mat0050',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    DxGroupItem,
    DxSummary,
    DxGrouping,
    DxGroupPanel,
    DxTotalItem,
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxLookup
  },
  data() {
    return {
      //입고정보 그리드
      receivingInfoGridData: {
        mainGrid: {
          data: [],
          ref: 'receivingInfoRef'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //재고현황 그리드
      stockStatusGridData: {
        mainGrid: {
          data: [],
          ref: 'stockStatusRef'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //반품등록 그리드
      returnRegisGridData: {
        mainGrid: {
          data: [],
          ref: 'returnRegisRef'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //반품내역 그리드
      returnDetailGridData: {
        mainGrid: {
          data: [],
          ref: 'returnDetailRef'
        },
        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //콤보박스 리스트
      comboBoxList: {
        inTypeList: [],
        inStatusList: [],
        facCodeList: [],
        retCodeList: []
      },
      //검색밸류
      searchValue: {
        facCode: '',
        inType: '',
        workFrDate: getPreMonth(2),
        workDate: getDateFormat(new Date())
      },
      //검색일자
      calMenuState: {
        workFrDateCal: false,
        workDateCal: false
      },
      tabKey: 1
    }
  },
  beforeMount() {},
  created() {},
  computed: {
    /*
     * 재고현황 그리드 BaseGrid옵션
     **/
     receivingInfoInstance() {
      return this.GetDataGrid(this.receivingInfoGridData.mainGrid.ref)
    },
    /*
     * 재고현황 그리드 BaseGrid옵션
     **/
    stockStatusInstance() {
      return this.GetDataGrid(this.stockStatusGridData.mainGrid.ref)
    },
    /*
     * 반품등록 그리드 BaseGrid옵션
     **/
    returnRegInstance() {
      return this.GetDataGrid(this.returnRegisGridData.mainGrid.ref)
    },
    /*
     * 반품내역 그리드 BaseGrid옵션
     **/
    returnDetailInstance() {
      return this.GetDataGrid(this.returnDetailGridData.mainGrid.ref)
    }
  },
  mounted() {
    /*
     * 상단 검색 콤보박스 설정
     **/
    this.comboListSet()
  },
  methods: {
    //tab 전환 이벤트
    async tabChange(e){
        if(e === '반품등록'){
          this.tabKey = 1
        }else{
          this.tabKey = 2
          let focusedRow = this.receivingInfoInstance.getFocusedRow()
          if(focusedRow){
            //반품내역 조회
            this.getReturnDetail(focusedRow)
          }
        }
    },


    //반품 수량 입력 범위
    setRetQtyValue (newData, value, currentRowData) {
      if (Number(value) > Number(currentRowData.stockQty) ) {
        newData.retQty = currentRowData.stockQty
      }else if(Number(value) <= 0){
        newData.retQty = 1
      }else {
        newData.retQty = value
      }
    },
    /*
     * 그리드 소계표시 숫자 포맷형식 지정
     **/
     customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },

    //검색버튼
    async btnSearch() {
      this.openLoading()
      let params = {
        comCode: getComCode(),
        facCode: this.searchValue.facCode,
        workFrDate: this.searchValue.workFrDate,
        workDate: this.searchValue.workDate,
        inType: this.searchValue.inType
      }

      getMat0012(params).then(res => {
        if(res.list.length == 0){
          notify(this.$t('noData'), 'error', 1500)
          return
        }

        this.receivingInfoGridData.mainGrid.data = res.list
        this.receivingInfoInstance.option('focusedRowIndex', -1)
        this.receivingInfoInstance.option('focusedRowIndex', 0)
      }).catch(error => {
        notify(error, 'error', 1500)
      }).finally(() => {
        this.endLoading()
      })
    },
    /*
     * 입고정보 -> 재고현황 보기
     **/
    getStockStatus(focusedRow) {
      //재고현황 조회
      getMat0018(focusedRow).then(res => {
        this.stockStatusGridData.mainGrid.data = res.list
      }).catch(error => {
        notify(error, 'error', 1500)
      }).finally(() => {
        this.stockStatusInstance.option('focusedRowIndex', -1)
        this.stockStatusInstance.clearSelection()
      })
      if(this.tabKey === 2){
        this.getReturnDetail(focusedRow)
      }
     
    },

      //반품내역 조회
    getReturnDetail(focusedRow){
      getMat0030(focusedRow).then(res => {
        this.returnDetailGridData.mainGrid.data = res.list
      }).catch(error => {
        notify(error, 'error', 1500)
      }).finally(() => {
        this.returnDetailInstance.option('focusedRowIndex', -1)
        this.returnDetailInstance.clearSelection()
      })
    },
    /*
     * 입고정보 그리드 클릭시 반응
     **/
    focusedRowChanged_getStockStatus(e) {
      this.returnRegisGridData.mainGrid.data = []
      if (!e.row) {
        this.stockStatusGridData.mainGrid.data = []
        return
      }
      this.getStockStatus(e.row.data)
    },

    /*
     * 재고현황 에서 추가시 반품등록으로 이동
     * 재고현황 -> 반품등록
     **/
     async btnAddReturnReg() {
      //반품등록에 추가전 기존 반품등록 선택사항들을 비운다
      let selectedMainRows = await this.stockStatusInstance.getSelectedRowsData()
      console.log("반품추가", selectedMainRows)
      if (selectedMainRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }

      let returnList = this.returnRegisGridData.mainGrid.data

      for (let i = 0; i < selectedMainRows.length; i++) {
        if (!selectedMainRows[i].stockQty || selectedMainRows[i].stockQty <= 0) {
          notify('재고가 부족합니다.', 'error', 1500)
          this.stockStatusInstance.clearSelection()
          continue
        }

        if (returnList.find(x => x.lotDetail == selectedMainRows[i].lotDetail))
        {
          notify('선택목록에 이미 등록되어있는 물품이 포함되어있습니다.', 'error', 1500)
          this.stockStatusInstance.clearSelection()
          continue
        }

        let newRow = {
          comCode: getComCode(),
          facCode: selectedMainRows[i].facCode,
          lotNo: selectedMainRows[i].lotNo,
          lotDetail: selectedMainRows[i].lotDetail,
          qty: selectedMainRows[i].qty,
          retAmount: selectedMainRows[i].retAmount,
          retQty: selectedMainRows[i].stockQty,
          stockQty: selectedMainRows[i].stockQty,
          ilno: selectedMainRows[i].ilno,
          ordNo: selectedMainRows[i].ordNo,
          no: selectedMainRows[i].no,
          id: returnList.length,
        }
        console.log("뉴로우",newRow)
        this.returnRegInstance.newRow(newRow)
        this.returnRegInstance.selectRows(newRow.id, true)

        //반품등록후 재고현황의 체크를 제거
        this.stockStatusInstance.clearSelection()
      }
    },

    /*
     * 반품등록의 등록버튼
     **/
     async btnRegiReturn() {
      let selectedRows = await this.returnRegInstance.getSelectedRowsData()
      if (selectedRows.length === 0) {
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }

      //필수 항목 입력 체크
      for (let row of selectedRows) {
        if (row.retQty === 0 || row.retQty === null) {
          notify('반품 수량을 입력해주세요.', 'error', 1500)
          return
        } else if (!row.retCode) {
          notify('반품 구분 항목을 선택해주세요', 'error', 1500)
          return
        }
      }
      for (let i = 0; i < selectedRows.length; i++) {
        selectedRows[i].retAmount = (selectedRows[i].retAmount * (selectedRows[i].retQty / selectedRows[i].qty)).toString()
      }
      console.log("반품내역 등록", selectedRows)
      //선택중인 입고데이터 
      let receivData = this.receivingInfoInstance.getFocusedRow()
      let param = {
        inType: receivData.inType,
        list: selectedRows
      }

      //반품내역 등록
      insertMat0030(param)
        .then(() => {
          notify('반품내역에 등록되었습니다.', 'success', 1500)          //그리드 비우기
          this.returnRegisGridData.mainGrid.data = []
          this.btnSearch()
        })
        .catch(error => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.endLoading()
        }) 
    },


    /*
     * 반품등록 페이지에서 글 비우기
     **/
    async btnDeleteReturn() {
      if (this.returnRegisGridData.mainGrid.data.length == 0) {
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }
      let selectedRegistRows = await this.returnRegInstance.getSelectedRowsData()
      if (selectedRegistRows.length == 0) {
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }

      for (let select of selectedRegistRows) {
        //선택한 목록 반품등록 리스트에서 삭제
        let grid = this.returnRegisGridData.mainGrid
        grid.data = grid.data.filter(row => row.lotDetail != select.lotDetail)
      }

    },
    
    /*
     * 반품내역 페이지에서 선택한 내역 지우기
     **/
    async btnDeleteReturnList() {
      let selectedMainRows = await this.returnDetailInstance.getSelectedRowsData()
      //선택 점검
      if (selectedMainRows.length <= 0) {
        notify(this.$t('SelectCheck'), 'error', 1500)
        return
      }
      let receivData = this.receivingInfoInstance.getFocusedRow()
      let param = {
        inType: receivData.inType,
        list: selectedMainRows
      }
      console.log("삭제 확인", selectedMainRows)
      //삭제 관련
      deleteMat0030(param)
        .then(() => {
          notify(this.$t('deleted'), 'success', 1500)          //그리드 비우기
          this.returnDetailGridData.mainGrid.data = []
          this.btnSearch()
        })
        .catch(error => {
          notify(error, 'error', 1500)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    /*
     * 상단 검색 콤보박스 배열 생성
     **/
    async comboListSet() {
      try {
        /*
         * 공장코드 콤보박스 설정
         **/
        let facCodeRes = await getFactoryInfoData({ comCode: getComCode() })
        facCodeRes.list.forEach(e => {
          this.comboBoxList.facCodeList.push({
            text: e.facName,
            value: e.facCode
          })
          this.searchValue.facCode = this.comboBoxList.facCodeList[0].value
        })
        /*
         * 입고구분 콤보박스 설정
         **/
        let inTypeInfo = {
          comCode: getComCode(),
          codegr: 'MAT',
          code: 'IN_TYPE'
        }
        let inTypeRes = await getCmChildCode(inTypeInfo)
        inTypeRes.list.forEach(e => {
          this.comboBoxList.inTypeList.push({
            text: e.sysName,
            value: e.sysCode
          })
        })
        /**
         * 반품구분 콤보박스 설정
         */
        let param = {
          comCode: getComCode(),
          code: 'SELECT_TYPE',
          codegr: 'COM'
        }
        let array = await getCmChildCode(param)
        array.list.forEach(e => {
          this.comboBoxList.retCodeList.push({
            name: e.sysName,
            code: e.sysCode
          })
        })
      } catch (error) {
        notify(error, 'error', 1500)
      }
    }
  }
}
</script>
<style scoped></style>
