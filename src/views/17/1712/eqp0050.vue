<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0">
        <i-card-top class="d-md-flex" :useBtnList="['btnSearch']" @btnSearch="btnSearch()">
          <template v-slot:body>
            <!-- 조회 Area -->
            <v-row>
              <v-col cols="2" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="facCodeparms"
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
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-col cols="12" class="pa-0">
        <v-row class="pr-2">
          <i-card-vertical 
            headerTitle="equipmentInfo"     
          >
            <!-- 설비정보 -->
            <template v-slot:body>
              <v-layout column overflow-auto>
                <DxDataGrid
                  id="facilityInfo"
                  class="doubleListBox04"
                  :ref="facilityInfoRef"
                  :data-source="facilityInfo"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  container-height:50%
                  :show-row-lines="true"
                  :disabled="false"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  @rowClick="popupOpen"
                  @focused-row-changed="onFocusedRowChanged"
                >
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />
                  <DxSelection show-check-boxes-mode="none" />

                  <DxColumn
                    data-field="comCode"
                    :caption="$t('comCode')"
                    width="auto"
                    data-type="string"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="facCode"
                    :caption="$t('facCode')"
                    width="auto"
                    data-type="string"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="blobUrl"
                    :caption="$t('eqpImage')"
                    width="120px"
                    data-type="string"
                    alignment="center"
                    cell-template="cellTemplate"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="eqCode"
                    :caption="$t('eqCode')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="eqName"
                    :caption="$t('eqName')"
                    width="auto"
                    data-type="string"
                    alignment="left"
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
                    data-field="proCode"
                    :caption="$t('proCode_facGrp')"
                    width="auto"
                    data-type="sring"
                    alignment="center"
                    :allow-editing="false"
                  />
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
                    data-field="sortFlag"
                    :caption="$t('sortFlag')"
                    width="auto"
                    data-type="string"
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
                    data-type="boolean"
                    alignment="center"
                    edit-cell-template="checkBoxEditor"
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
                  <template #cellTemplate="{ data }">
                    <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" >
                    <h4 class="noImageText" v-else>No Image</h4>
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
        <v-tab @click="seachDetail('수리현황')">수리현황</v-tab>
        <v-tab @click="seachDetail('점검항목')">{{$t('checkList')}}</v-tab>
        <v-tab @click="seachDetail('예비품정보')"> 예비품정보</v-tab>
        <!-- 수리현황 -->
        <v-tab-item>
          <i-card-vertical
            headerTitle="repairStatus"
            :useBtnList="[]"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0 ">
                  <DxDataGrid
                    id="gridDataSource2"
                    class="doubleListBox"
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
                  >

                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <!-- <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" /> -->
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    
                    <!-- 회사명 -->
                    <DxColumn
                      data-field="comCode"
                      :caption="$t('comCode')"
                      width="auto"
                      data-type="string"
                      :visible="false"
                    />

                    <!-- 공장명 -->
                    <DxColumn
                      data-field="facCode"
                      :caption="$t('facCode')"
                      width="auto"
                      data-type="string"
                      :visible="false"
                    />

                    <!-- 수리번호 -->
                    <DxColumn
                      data-field="repNo"
                      :caption="$t('repNo')"
                      width="auto"
                      alignment="center"
                      data-type="number"
                      :allow-editing="false"
                    />

                    <!-- 발생일 -->
                    <DxColumn
                      data-field="occDate"
                      :caption="$t('occDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 조치일 -->
                    <DxColumn
                      data-field="actDate"
                      :caption="$t('actDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 설비코드 -->
                    <DxColumn
                      data-field="eqCode"
                      :caption="$t('eqCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 설비명 -->
                    <DxColumn
                      data-field="eqName"
                      :caption="$t('eqName')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :visible="false"
                    />

                    <!-- 수리내역 -->
                    <DxColumn
                      data-field="repRemark"
                      :caption="$t('repRemark')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 수리업체 -->
                    <DxColumn
                      data-field="repCust"
                      :caption="$t('repCust')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 작업자 -->
                    <DxColumn
                      data-field="worker"
                      :caption="$t('worker')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 수리금액 -->
                    <DxColumn
                      data-field="repAmount"
                      :caption="$t('repAmount')"
                      width="auto"
                      data-type="number"
                      format="#,###"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <!-- 비고 -->
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 등록자 -->
                    <DxColumn
                      data-field="maker" 
                      :caption="$t('maker')" 
                      width="auto" 
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false"
                    />

                    <!-- 등록일 -->
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 수정자 -->
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 수정일 -->
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
        </v-tab-item>
        <!-- 점검항목 -->
        <v-tab-item>
          <i-card-vertical
            headerTitle="checkListheaderTitle"
            :useBtnList="[]"
          >
            <template v-slot:body>
              <v-layout column overflow-auto>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid 
                   id="gridDataSource3" 
                   class="doubleListBox" 
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
                   :selection="{ mode:'none' }"
                   >

                    <DxScrolling column-rendering-mode="virtual" />
                    <DxEditing mode="cell" />
                    <DxPaging :enabled="false" />
                    <DxPager :show-page-size-selector="false" />
                    <!-- <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" /> -->
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                    
                    <!-- 회사명 -->
                    <DxColumn
                      data-field="comCode"
                      :caption="$t('comCode')"
                      width="auto"
                      data-type="string"
                      :visible="false"
                    />

                    <!-- 설비점검 구분 -->
                    <DxColumn
                      data-field="eqInsType"
                      :caption="$t('eqInspType')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      :allow-editing="false"
                    >
                    <DxLookup :data-source="EQINSTYPEList" display-expr="name" value-expr="code" />
                    </DxColumn>

                    <!-- 설비코드 -->
                    <DxColumn
                      data-field="eqCode"
                      :caption="$t('eqCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 검사순서 -->
                    <DxColumn
                      data-field="eqInspNo"
                      :caption="$t('eqInspNo')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 설비 점검항목 코드 -->
                    <DxColumn
                      data-field="eqInsCode"
                      :caption="$t('eqInspCode')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 검사항목 코드 -->
                    <DxColumn
                      data-field="insType"
                      :caption="$t('insType')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    >
                    <DxLookup :data-source="insTypeList" display-expr="name" value-expr="code" />
                    </DxColumn>

                    <!-- 측정방법 코드 -->
                    <DxColumn
                      data-field="insMeth"
                      :caption="$t('insMeth')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    >
                    <DxLookup :data-source="insMethList" display-expr="name" value-expr="code" />
                    </DxColumn>

                    <!-- 판정방법 코드 -->
                    <DxColumn
                      data-field="jugCode"
                      :caption="$t('jugCodeh')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    >
                    <DxLookup :data-source="jugCodehList" display-expr="name" value-expr="code" />
                    </DxColumn>

                    <!-- 검사단위 코드 -->
                    <DxColumn
                      data-field="insUnit"
                      :caption="$t('insUnit')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                    <DxLookup :data-source="insUnitList" display-expr="name" value-expr="code" />
                    </DxColumn>
                    
                    <!-- 검사기준 -->
                    <DxColumn
                      data-field="insBase"
                      :caption="$t('insBase')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 상한치 -->
                    <DxColumn
                      data-field="insUpp"
                      :caption="$t('insUpp')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 하한치 -->
                    <DxColumn
                      data-field="insLow"
                      :caption="$t('insLow')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 판정 -->
                    <DxColumn
                      data-field="judge"
                      :caption="$t('judge')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 측정값 -->
                    <DxColumn
                      data-field="meaValue"
                      :caption="$t('meaValue')"
                      width="auto"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 비고 -->
                    <DxColumn
                      data-field="remark"
                      :caption="$t('remark')"
                      width="500"
                      data-type="number"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <!-- 등록자 -->
                    <DxColumn data-field="maker" 
                      :caption="$t('maker')" 
                      width="auto" 
                      data-type="string" 
                      alignment="center" 
                      :allow-editing="false"
                    />

                    <!-- 등록일 -->
                    <DxColumn
                      data-field="makeDate"
                      :caption="$t('makeDate')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 수정자 -->
                    <DxColumn
                      data-field="editor"
                      :caption="$t('editor')"
                      width="auto"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <!-- 수정일 -->
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
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col cols="12" class="pa-0">
              <i-card-vertical
              headerTitle="reserveStockInfo"
              :useBtnList="[]"
              @btnCorrection="btnCorrection()"
              >
              <template v-slot:body>
                <v-layout column overflow-auto>
                <!-- 예비품 정보 -->
                <DxDataGrid
                  id="mainGrid"
                  class="doubleListBox"
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
                  key-expr="id"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                  @cellClick="mainListClick"
                  @rowClick="popupOpen"
                >
                <DxSelection show-check-boxes-mode="none" />
                  <DxScrolling column-rendering-mode="virtual" />
                  <!-- 예비품이미지 -->
                  <DxColumn
                  data-field="spareImage"
                  :caption="$t('reserveStockImg')"
                  width="120px"
                  data-type="string"
                  alignment="center"
                  :allow-editing="false"
                  cell-template="cellTemplate"
                  />
                  <!-- 공장명 -->
                  <DxColumn data-field="facCode" :caption="$t('facName')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 자원구분 -->
                  <DxColumn
                    data-field="jobType"
                    :caption="$t('resourceClassification')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                  <DxLookup :data-source="jobTypeList" display-expr="name" value-expr="code" />
                  </DxColumn>
                  <!-- 예비품번 -->
                  <DxColumn
                    data-field="partNo"
                    :caption="$t('reserveStockNo')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 예비품명 -->
                  <DxColumn
                    data-field="partName"
                    :caption="$t('reserveStockName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 규격 -->
                  <DxColumn data-field="spec" :caption="$t('spec')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 적정재고 -->
                  <DxColumn
                    data-field="safeQty"
                    :caption="$t('optimumStockage')"
                    width="auto"
                    data-type="number"
                    format="#,###"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <!-- 예비품 구분 -->
                  <DxColumn
                    data-field="spareType"
                    :caption="$t('spareType')"
                    width="auto"
                    data-type="string"
                    :allow-editing="false"
                    alignment="center"
                  >
                    <DxLookup :data-source="spareTypeList" display-expr="name" value-expr="code">
                    </DxLookup>
                  </DxColumn>
                  <!-- 등급 -->
                  <DxColumn data-field="grade" :caption="$t('grade')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- 제작소요일 -->
                  <DxColumn
                    data-field="regDate"
                    :caption="$t('manufacturingLeadTime')"
                    width="auto"
                    data-type="number"
                    format="#,###"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <!-- 환종 -->
                  <DxColumn data-field="unit" :caption="$t('exchangeRate')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                  <!-- 단가 -->
                  <DxColumn data-field="price" :caption="$t('unitPrice')" width="auto" data-type="number" format="#,###" alignment="right" :allow-editing="false" />
                  <!-- 보관위치 -->
                  <DxColumn
                    data-field="stockCode"
                    :caption="$t('storageLocation')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="stockCodeList" display-expr="text" value-expr="value" />
                  </DxColumn>
                  <!-- 금액 -->
                  <DxColumn
                    data-field="amount"
                    :caption="$t('amount')"
                    width="auto"
                    data-type="number"
                    format="#,###"
                    alignment="right"
                    :allow-editing="false"
                  />
                  <!-- 사용유무 -->
                  <DxColumn
                    data-field="userFlag"
                    :caption="$t('userFlag')"
                    width="auto"
                    data-type="boolean"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <!-- 등록일 -->
                  <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="left" :allow-editing="false" />

                  <DxColumn 
                    data-field="" 
                    caption="" 
                    data-type="string" 
                    alignment="center"
                    width="auto"
                    :allow-editing="false"
                  />
                  
                  <DxPaging :enabled="false" />
                  <DxPager :show-page-size-selector="false" />

                  <template #cellTemplate="{ data }">
                    <img ref="img" v-if="data.value" class="uploadedImage" :src="data.value" @click="imgClick(data)" />
                    <h4 class="noImageText" v-else>No Image</h4>
                  </template>
                  </DxDataGrid>
                  </v-layout>
                </template>            
              </i-card-vertical>
            </v-col>
            <!-- 예비품별 자원정보 -->
          <!-- <v-col cols="5" class="pl-5 pt-0">
            <i-card-vertical
              headerTitle="reserveStockResourceInfo"
              :useBtnList="[]"
            >
              <template v-slot:body>
                <v-layout column overflow-auto>
              <DxDataGrid
                id="detailGrid"
                class="doubleListBox"
                :ref="detailGridRef"
                :data-source="detailGrid"
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
              <DxSelection show-check-boxes-mode="none" />
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn data-field="partNo" :caption="$t('reserveStockNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="jobType" :caption="$t('resourceClassification')" width="auto" data-type="string" alignment="center" :allow-editing="false"><DxLookup :data-source="jobTypeList" display-expr="name" value-expr="code" /></DxColumn>
                <DxColumn data-field="eqCode" :caption="$t('eqCode')" width="auto" data-type="string" alignment="center" :allow-editing="false"/>
                <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false" />
                <DxColumn data-field="makeDate" :caption="$t('regiDate')" width="auto" data-type="date" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="date" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false" />
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
              </DxDataGrid>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-col> -->
          </v-row>          
        </v-tab-item>
      </v-tabs>
    </v-row>
    <bas0260Popup ref="bas0260Popup" @close="close" :popVisible="popVisible" />
    <imagePopup ref="imagePopup" />
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
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFacilityStatusItem, getChecklistItem, getSparpartInfo,  getSparpartResInfo} from '@/api/view/eqp0050'
import { getFactoryInfoData } from '@/api/view/bas0030' //공장코드
import { getFacilityInfoData } from '@/api/view/bas0036' // 설비정보(메인그리드)
import bas0260Popup from '@/views/11/1113/popup/bas0260Popup'
import imagePopup from '@/views/11/1113/popup/imagePopup'
import { getWarehouseLocInfoData } from '@/api/view/bas0033'

export default {
  name: 'eqp0050',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxLookup,
    ICardTop,
    DxEditing,
    //DxSelectBox,
    bas0260Popup,
    imagePopup,
    //DxTextBox
  },
  data() {
    return {
      //설비정보
      facilityInfo: [],
      facilityInfoRef: 'facilityInfoRef', //설비정보
      //수리현황
      gridDataSource2: [],
      gridRef2: 'gridRef2',
      //점검항목
      gridDataSource3: [],
      gridRef3: 'gridRef3',
      //예비품 정보
      popVisible: false,
      mainGrid: [],
      mainGridRef: 'mainGridRef',
      mainFocusedData: null,
      //예비품별 자원정보
      detailGrid: [],
      detailGridRef: 'detailGridRef',

      tapitem: '수리현황',


      //LookUp
      factoryList: [],
      processList: [],
      jugCodehList: [],
      EQINSTYPEList:[],
      insTypeList:[],
      insMethList:[],
      insUnitList:[],
      jobTypeList:[],
      eqCodeList:[],
      eqGrade: [],
      eqState: [],
      inspClsList: [],
      inspMethodList: [],
      inspToolList: [],
      cycleUnitList: [],
      focusedRowData:[],
      spareTypeList:[],
      stockCodeList:[],

      //조회 변수
      schFacCode: '',
      schEqName: '',

      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',

      facCodeparms:'',
    }
  },
  computed: {
    //설비타입
    gridMainInstance() {
      return this.GetDataGrid(this.facilityInfoRef)
    },
  },
  beforeCreate() {

  },
  created() {
    const stockCode = {
      comCode: getComCode(),
      facCode: 'FAC01',
    }
    getWarehouseLocInfoData(stockCode).then((res) => {
      res.list.forEach((item) => {
        this.stockCodeList.push({
          value: item.locCode,
          text: item.locName,
        })
      })
    })
  },
  mounted(){
    // this.btnSearch()
    this.comboListSet()
  },
  methods: {
    //설비정보 POPUP/////////////////////////
    imgClickMain(e) {//이미지 클릭 팝업
      window.open(e.value, '_blank')
    },
    imgClick(e) {
      //이미지 클릭 팝업
      if(!e.data.blobUrl) e.data.blobUrl = e.data.spareImage
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
    btnSearch() {
      this.doSearhMainGrid()
      this.doSearhDetailGrid()
    },
    seachDetail(e){
       this.cycleInspInfo = []
        this.gridDataSource2 = []
        this.gridDataSource3 = []
      
        this.tapitem = e

      this.doSearhDetailGrid(this.tapitem)
    },
    async doSearhMainGrid() {
      try {
        let facParm ={
          comCode: getComCode(),
        }

        let facCode = await getFactoryInfoData(facParm)


        let params = {
        comCode: getComCode(),
        facCode: this.facCodeparms,
        // facName:facCode.list[0].facName,
      }
      
        this.openLoading()
        let cnt = 0
        let resData = await getFacilityInfoData(params)
     
        resData.list.forEach(e => {
          e.id = cnt++
          if(e.eqpImage) {
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
            // console.log('blob',blob)
            e.blobUrl = URL.createObjectURL(blob) + '#view=fitH'//&toolbar=0'
            // console.log('blob',e.blobUrl)
          }
        })


        this.facilityInfo = resData.list
        this.gridMainInstance.saveEditData()
        this.gridMainInstance.option('focusedRowIndex', 0)
        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        
        this.endLoading()
      }
    },
    async doSearhDetailGrid() {
      try {
        let params = {
          comCode: getComCode(),
          facCode: this.focusedRowData.facCode,
          eqInsType: this.tapitem,
          eqCode: this.focusedRowData.eqCode,
          eqInspNo: '',
        }
      
        this.openLoading()
        let cnt = 0
        if(params.eqInsType === "수리현황"){
          let resData = await getFacilityStatusItem(params)
          resData.list.forEach(e => {
          e.id = cnt++
        })
          this.gridDataSource2 = resData.list        
        }
        else if(params.eqInsType === "점검항목"){
          let resData = await getChecklistItem(params)
          resData.list.forEach(e => {
          e.id = cnt++
        })
          this.gridDataSource3 = resData.list
        }
        else {
          await getSparpartInfo(params)
        .then((res) => {
          res.list.forEach((e) => {
            e.amount = e.price * e.qty
            if (e.spareImage) {
              let binaryString = window.atob(e.spareImageBase64)
              let binaryLen = binaryString.length
              let bytes = new Uint8Array(binaryLen)
              for (let a = 0; a < binaryLen; a++) {
                let ascii = binaryString.charCodeAt(a)
                bytes[a] = ascii
              }
              let blob = new Blob([bytes], {
                type: e.contentType,
            })
              e.spareImage = URL.createObjectURL(blob)
            }
          })
          this.mainGrid = res.list
          // console.log('mainGrid', res.list)
        })
        .finally(() => {
          this.endLoading()
          // this.getMainInstance.option('focusedRowIndex', 0)
          this.mainFocusedData = this.mainGrid[0]
          // this.getMainInstance.saveEditData()
          this.doSearchDetailList()
        })
        }
        this.gridMainInstance.saveEditData()

        this.endLoading()
      } catch (error) {
        notify(error, 'error', 1500)
        
        this.endLoading()
      }
    },
    
    doSearchDetailList() {
      // let params = {
      //   comCode: getComCode(),
      //   facCode: this.mainFocusedData.facCode,
      //   partNo: this.mainFocusedData.partNo,
      //   eqCode: this.focusedRowData.eqCode
      // }
      // getSparpartResInfo(params)
      //   .then((res) => {
      //     this.detailGrid = []

      //     if (this.mainFocusedData === '') {
      //       this.detailGrid = res.list
      //     } else {
      //       res.list.forEach((e) => {
      //         if (this.mainFocusedData.partNo === e.partNo) {
      //           this.detailGrid.push(e)
      //         }
      //       })
      //     }
      //   })
      //   .finally(() => {
      //     this.endLoading()
      //   })
    },
    mainListClick(e) {
      if (e.rowType === 'data') {
        if (e.rowIndex !== -1) {
          this.detailGrid = []
          if (e.data) {
            this.mainFocusedData = e.data
          } else {
            this.mainFocusedData = null
          }
          this.doSearchDetailList()
        }
      }
    },
    //포커스 이벤트
    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data
      this.cycleInspInfo = []
      this.gridDataSource2 = []
      this.doSearhDetailGrid()

    },

    async comboListSet() {
      let facParm ={
        comCode: getComCode()
      }

      let facCode = await getFactoryInfoData(facParm)
      //공장코드
      this.factoryList = facCode.list
      this.facCodeparms = facCode.list[0].facCode
      
      let params = {
        comCode: getComCode(),
        code: ''
      }
      getCmChildCode(params).then(res => {
        res.list
          .filter(word => word.code === 'JUG_CODEH')
          .forEach(e => {
            this.jugCodehList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'EQ_INS_TYPE')
          .forEach(e => {
            this.EQINSTYPEList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'INS_TYPE' && word.userFlag ==='Y')
          .forEach(e => {
            this.insTypeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'INS_METH' && word.userFlag ==='Y')
          .forEach(e => {
            this.insMethList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'INS_UNIT' && word.userFlag ==='Y')
          .forEach(e => {
            this.insUnitList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
          res.list
          .filter(word => word.code === 'JOB_TYPE' && word.userFlag ==='Y')
          .forEach(e => {
            this.jobTypeList.push({
              code: e.sysCode,
              name: e.sysName
            })           
          })
          res.list
          .filter(word => word.code === 'SPARE_TYPE' && word.userFlag === 'Y')
          .forEach(e => {
            this.spareTypeList.push({
              code: e.sysCode,
              name: e.sysName
            })
          })
       
      })
    },

  }
}
</script>
<style scoped>
::v-deep .v-text-field.v-text-field--enclosed {
  margin: 0;
  /* padding-top: 5px; */
}
.mainItem {
  color: rgb(0, 0, 0);
  font-size: 18px;
  letter-spacing: 0.5px;
  font-weight: bold;
  line-height: 1.8;
}
.uploadedImage {
  width: 100px;
  height: 100px;
  object-fit: scale-down;
  /* width: 50px;
  height: 50px; */
}
.noImageText {
  width: 100px;
  height: 100px;
  display : flex;
  justify-content : center;
  align-items : center;
}
</style>