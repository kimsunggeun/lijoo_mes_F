<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{ $t('searchLotNo') }}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText3"><v-icon class="mr-1 green_icon">$calendar_clock</v-icon>
          {{
            display.time.year +
              '-' +
              display.time.month +
              '-' +
              display.time.day +
              ' [' +
              display.time.week +
              '] ' +
              display.time.hour +
              ':' +
              display.time.minutes +
              ':' +
              display.time.second
          }}
        </span>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn width="40" height="40" color="RefreshBtn" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px">mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- 메인화면 -->
    <v-row no-gutters class="pa-0 ma-0">
      <v-col cols="12" class="pa-2 pt-2 pb-2 flex">
        <!-- 전산번호 입력란 -->
        <i-card-vertical style="color: black; " headerTitle="inputLotDetail">
          <template v-slot:body>
            <v-row no-gutters>
              <v-col cols="4" class="pa-1 pt-1 pb-1">
                <v-text-field v-model="lotDetailsreach" :label="$t('lotDetail')" item-text="text" item-value="value" dense outlined clearable />
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-1">
                <v-btn depressed class="pt-0 white--text" color="rgb(44,73,184)" height="30" width="100%" @click="btnSeach()">
                  검색
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <!-- 탭란 -->
    <v-row no-gutters class="pa-0 ma-0">
      <v-tabs>
        <v-tab v-if="false" class="mr-2" @click="tabChange('재공')">{{ $t('workInProcess') }}</v-tab>
        <v-tab class="mr-2" @click="tabChange('재고')">{{ $t('stock') }}</v-tab>
        <v-tab v-if="false" class="mr-2" @click="tabChange('불량')">{{ $t('faulty') }}</v-tab>
        <!-- 재공 탭 -->
        <v-tab-item>
          <v-col cols="12" class="pa-2 pt-2 pb-2 flex">
            <v-row no-gutters>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-text-field v-model="sample" :label="$t('partCode')" item-text="text" item-value="value" dense outlined clearable />
              </v-col>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="proCode"
                  :label="$t('processName')"
                  :items="proCodeList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-0">
                <v-btn @click="btnSeach()" depressed class="pt-0 white--text" color="rgb(44,73,184)" height="30" width="100%">
                  조회
                </v-btn>
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-0">
                <v-btn depressed class="pt-0 white--text" color="rgb(44,73,184)" height="30" width="100%">
                  출력
                </v-btn>
              </v-col>

              <v-col cols="4" class="pa-1 pt-1 pb-1"></v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="3" class="pa-1 pt-1 pb-1">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="workDecodeseach"
                  :label="$t('workDetail')"
                  :items="workDecodList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="processInfo"
                  class="listBox13"
                  :ref="processInfoRef"
                  :data-source="grid1"
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
                  @row-click="onFocusedRowChanged"
                >
                  <DxPaging :enabled="false" />

                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="single" />

                  <DxScrolling column-rendering-mode="virtual" />

                  <DxColumn v-for = "(Column,index) in gridColums" :key="index"
                  :data-field="Column.field" 
                  :caption="getMenuTitle(Column.headcaption)" 
                  :data-type="Column.fieldtype" 
                  :alignment="Column.alignment" 
                  :width = "Column.width"
                  :edit-cell-template ="Column.edittemplate"
                  :format ="Column.format"
                  :allow-editing="false"
                 
         
                  >
                  <DxLookup 
                  v-if="Column.lookup"
                  :data-source ="Column.lookup.data"
                  :value-expr="Column.lookup.value"
                  :display-expr="Column.lookup.display" 
                  
                  
                  ></DxLookup>

                  </DxColumn>
                  



                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>

                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <!-- 재고 탭 -->
        <v-tab-item>
          <v-col cols="12" class="pa-2 pt-2 pb-2 flex">
            <v-row no-gutters>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-text-field v-model="sample" :label="$t('partCode')" item-text="text" item-value="value" dense outlined clearable />
              </v-col>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="proCode"
                  :label="$t('processName')"
                  :items="proCodeList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-0">
                <v-btn depressed class="pt-0 white--text" @click="btnSeach()" color="rgb(44,73,184)" height="30" width="100%">
                  조회
                </v-btn>
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-0">
                <v-btn depressed class="pt-0 white--text" color="rgb(44,73,184)" height="30" width="100%">
                  출력
                </v-btn>
              </v-col>

              <v-col cols="4" class="pa-1 pt-1 pb-1"></v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="3" class="pa-1 pt-1 pb-1">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="workDecodeseach"
                  :label="$t('workDetail')"
                  :items="workDecodList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="processInfo"
                  class="listBox13"
                  :ref="processInfoRef"
                  :data-source="grid2"
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
                  :search-input.sync="inputData"

                  @row-click="onFocusedRowChanged"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn v-for = "(Column,index) in gridColums" :key="index"
                  :data-field="Column.field" 
                  :caption="getMenuTitle(Column.headcaption)" 
                  :data-type="Column.fieldtype" 
                  :alignment="Column.alignment" 
                  :width = "Column.width"
                  :edit-cell-template ="Column.edittemplate"
                  :format ="Column.format"
                  :allow-editing="false"
                  >
                  <DxLookup 
                  v-if="Column.lookup"
                  :data-source ="Column.lookup.data"
                  :value-expr="Column.lookup.value"
                  :display-expr="Column.lookup.display" 
                  
                  ></DxLookup>

                  </DxColumn>

                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <!-- 불량 탭 -->
        <v-tab-item>
          <v-col cols="12" class="pa-2 pt-2 pb-2 flex">
            <v-row no-gutters>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-text-field v-model="sample" :label="$t('partCode')" item-text="text" item-value="value" dense outlined clearable />
              </v-col>
              <v-col cols="3" class="pa-1 pt-1 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="proCode"
                  :label="$t('processName')"
                  :items="proCodeList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  clearable
                />
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-0">
                <v-btn @click="btnSeach()" depressed class="pt-0 white--text" color="rgb(44,73,184)" height="30" width="100%">
                  조회
                </v-btn>
              </v-col>
              <v-col cols="1" class="pa-1 pt-1 pb-0">
                <v-btn depressed class="pt-0 white--text" color="rgb(44,73,184)" height="30" width="100%">
                  출력
                </v-btn>
              </v-col>

              <v-col cols="4" class="pa-1 pt-1 pb-1"></v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="3" class="pa-1 pt-1 pb-1">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  v-model="workDecodeseach"
                  :label="$t('workDetail')"
                  :items="workDecodList"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="processInfo"
                  class="listBox13"
                  :ref="processInfoRef"
                  :data-source="grid3"
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
                  :search-input.sync="inputData"

                  @row-click="onFocusedRowChanged"
                >
                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="checkBoxesMode" mode="multiple" />
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn v-for = "(Column,index) in gridColums" :key="index"
                  :data-field="Column.field" 
                  :caption="getMenuTitle(Column.headcaption)" 
                  :data-type="Column.fieldtype" 
                  :alignment="Column.alignment" 
                  :width = "Column.width"
                  :edit-cell-template ="Column.edittemplate"
                  :format ="Column.format"
                  :allow-editing="false"
                  >
                  <DxLookup 
                  v-if="Column.lookup"
                  :data-source ="Column.lookup.data"
                  :value-expr="Column.lookup.value"
                  :display-expr="Column.lookup.display" 
                  
                  ></DxLookup>

                  </DxColumn>
                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
      </v-tabs>
    </v-row>
    <pop0330Popup1 ref="pop0330Popup1" 
    :pop1Visible ="pop1Visible"  
    :sampleList123 ="sampleList123"
    :focusedRowKey = "focusedRowKey"
    @close="close"/>

  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import { getCmChildCode } from '@/api/system/cmCodeManage' // 공통코드
import { getBas0034, getBas0035 } from '@/api/view/pro0050' //작업장
import { getOutWh } from '@/api/view/pop0040'//창고코드
import { DxPopup } from 'devextreme-vue/popup'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getPop0330 } from '@/api/view/pop0330'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import IButton from '../../../components/common/iButton.vue'
import pop0330Popup1 from '@/views/30/3014/popup/pop0330Popup1.vue'
import { getWarehouseLocInfoData } from '@/api/view/bas0033'
import { getProcInfo } from '@/api/view/bas0031' /// 공정
import {  getWorkDecode } from '@/api/view/pro0120'// 작업반
export default {
  name: 'pop0330',
  mixins: [baseview, BaseDataGrid],
  components: {
    "i-card-vertical": iCardVertical,
    DxDataGrid,
    DxColumn,
    DxPopup,
    DxScrolling,
    pop0330Popup1,
    DxLookup
},
  data() {
    return {

      tab:'0',

 

      pop1Visible: false,
      listClickData: '',
      //유저정보
      userData: {
        company: getComCode(),
        factory: {
          code: ''
        },
        name: ''
      },
      //화면표시 데이터
      display: {
        company: '',
        factory: '',
        time: {
          year: '00',
          month: '00',
          day: '00',
          week: '',
          hour: '00',
          minutes: '00',
          second: '00'
        }
      },
      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000 // 지연시간
      },
      //그리드 관련
      gridData: {
       
        mainGird: {
          //메인그리드
          data: [],
          ref: 'mainGirdRef'
        },
        checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick'
      },


      //팝업 그리드
      sampleList123: [],
      grid1:[],
      grid2:[],
      grid3:[],



      sample:'',
      sample1: '',
      sample2: '',
      sample3: '',
      sample4: '',
      sample5: '',
      sample6: '',
      sample7: '',
      sample8: '',
      sample9: '',
      sample10: '',



      processInfoRef: 'processInfoRef',
      popupInfoGridRef: 'popupInfoGridRef',
      checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
      userInformationRef: 'userInformationRef',
      errorCode: 0,
      state: this.$store.state.app.isScreenFull,
      //porps
      focusedTestRowData:[],
      //조회관련
      lotDetailsreach:'',
      workDecodList:[],
      workDecodeseach:'',
      proCodeList:[],
   
      proCode:'',
      facCode:'',


      //룩업
      factoryLookup:[],
      defcodeLookup:[],
      protypeLookup:[],
      workCodeLookup:[],
      eventCdLookup:[],
      whCodeLookup:[],

      

      focusedRowKey:'',
      /// 그리드 칼럼
      sampleList:[],
      gridColums:[],
    }
  },
  created() {},
  watch: {},
  computed: {
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    griMainInstance() {
      return this.GetDataGrid(this.processInfoRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.userInformationRef)
    }
  },
  beforeMount() {
    
    this.dataSettting(),
    this.nowTime(),
    this.comboListSet(),
        // 칼럼
       
  this.gridColums.push(
      { headcaption: "comCode", field:"comCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "facCode", field:"facCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.factoryLookup, 
          value:"value", 
          display:"text",
          }
        },
      
      { headcaption: "ilno", field:"ilno", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "workNo", field:"workNo", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "proType", field:"proType", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.protypeLookup, 
          value:"value", 
          display:"text",
          }
      },
      { headcaption: "defCode", field:"defCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.defcodeLookup, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "preProCode", field:"preProCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.proCodeList, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "proCode", field:"proCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
        lookup:{
          data:this.proCodeList, 
          value:"value", 
          display:"text",
          }
      },
      { headcaption: "preWorkCode", field:"preWorkCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.workCodeLookup, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "workCode", field:"workCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
        lookup:{
          data:this.workCodeLookup, 
          value:"value", 
          display:"text",
          }
      },
      { headcaption: "preWorkDecode", field:"preWorkDecode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.workDecodList, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "whCode", field:"whCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.whCodeLookup, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "eventCd", field:"eventCd", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.eventCdLookup, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "stockType", field:"stockType", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "partNo", field:"partNo", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "preQty", field:"preQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "preLotNo", field:"preLotNo", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "lotNo", field:"lotNo", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "lotDetail", field:"lotDetail", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "cancelFlag", field:"cancelFlag", fieldtype:"boolean" , format:"",  alignment:"center", width : "auto",  visible : true,edittemplate:"checkBoxEditor"},
      { headcaption: "userFlag", field:"userFlag", fieldtype:"boolean" , format:"",  alignment:"center", width : "auto",  visible : true, edittemplate:"checkBoxEditor" },
      { headcaption: "makeDate", field:"makeDate", fieldtype:"date" , format:"yyyy-MM-dd",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "maker", field:"maker", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "editDate", field:"editDate", fieldtype:"date" , format:"yyyy-MM-dd",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "custCode", field:"custCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "outDate", field:"outDate", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "outQty", field:"outQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "outDeliQty", field:"outDeliQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "outNonDeliQty", field:"outNonDeliQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "outWaitDeliQty", field:"outWaitDeliQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true}, 
    )
    
//////////////////
  },
  mounted() {
  },
  
  destroyed() {
    clearInterval(this.timeFunc)
  },
  methods: {
      //탭 이벤트
      tabChange(e){
        if(e === '불량'){
            this.tab = '1'
            this.btnSeach()
            this.grid1 =[]
            this.grid2 = []
        }
        if(e === '재공'){
            this.tab = '0'
            this.btnSeach()
            this.grid1 =[]
            this.grid3 = []
        }
        else{
          this.tab = '0'
          this.btnSeach()
          this.grid2 =[]
          this.grid3 = []
        }
    
      },











  async  btnSeach(){

    //////// 메인데이터그리드 조회///////
     let parms = {
      comCode: getComCode(),
      facCode: this.facCode,
      proCode: this.proCode,
      workDecode: this.workDecodeseach,
      lotDetail: this.lotDetailsreach,
      defCode: this.tab
      
     }
 
  let cnt = 0
        let grid1list = await getPop0330(parms)
        grid1list.list.map(x => x.id = cnt++)
        if( this.tab == '0'){
        this.grid1 = grid1list.list
        this.grid2 = grid1list.list
          }
       else if( this.tab == ''){
        this.grid1 = []
        this.grid2= []
        this.grid3 = grid1list.list
          }
       

},

    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        this.pop1Visible = true
        }
     
      },

    close(param) {
      this.pop1Visible = param
    },
    //오류 해결용
    inputData(e) {},
    listClick(e) {
      if (e.rowType === 'data') {
        if (e.rowIndex !== -1) {
          this.bas0011DetailGrid = []
          if (e.data) {
            this.listClickData = e.data
          } else {
            this.listClickData = null
          }
          this.doSearchDetailList()
        }
      }
    },


    // btnAdd(param) {
    //   if (param == '검색') {
    //   } else if (param === '사원') {
    //     let row = {
    //       id: 'id',
    //       comCode: getComCode(),
    //       depCode: this.listClickData,
    //       userId: '',
    //       userName: '',
    //       perCode: '',
    //       typeCode: '',
    //       posiCode: '',
    //       facCode: 'FAC01',
    //       hp: '',
    //       email: '',
    //       entDate: '',
    //       lanCode: '',
    //       userFlag: 'Y',
    //       userImage: '',
    //       remark: '',
    //       makeDate: '',
    //       maker: getUserId(),
    //       editDate: '',
    //       editor: '',
    //       __created__: true,
    //       __modified__: false
    //     }
    //     this.gridDetailInstance.clearSelection()
    //     this.pop1Visible = true
    //     this.$refs.pop0330Popup1.open('add', row, this.items)
    //   }
    // },
    nowTime() {
      this.timeFunc = setInterval(() => {
        let date = new Date()
        this.display.time.year = date
          .getFullYear()
          .toString()
          .substr(2)
        this.display.time.month = String(date.getMonth() + 1).padStart(2, '0')
        this.display.time.day = String(date.getDate()).padStart(2, '0')
        this.display.time.week = this.$t(`weekArray[${date.getDay()}]`)
        this.display.time.hour = String(date.getHours()).padStart(2, '0')
        this.display.time.minutes = String(date.getMinutes()).padStart(2, '0')
        this.display.time.second = String(date.getSeconds()).padStart(2, '0')
      }, this.timeCounter.delay)
    },
    //새로고침
    async totalRefresh() {
      notify('refresh', 'success', 1500)
    },
    async dataSettting() {
    
      /// 공장데이터
      let paramsCompany = {
          comCode: getComCode(),
          userId: getUserId()
        }
    
    let resData = await getCompany(paramsCompany)
    let factoryList = await getFactoryInfoData(paramsCompany)
 
    this.display.company =  resData.list[0].comName,
    this.display.factory = factoryList.list[0].facName
    
    //////////////////

    }, 


         //데이터
    onFocusedRowChanged(e){
 
     
      this.focusedTestRowData = e.data
      
      
      this.sampleList123 = [e.data]
      this.pop1Visible = true
     
      
     },



     //콤보조회
     async comboListSet() {
     
      //공통코드 parmas
      let paramsComCode = {
        comCode: getComCode(),
        code: ''
      }
      /////// 공통코드//////////
      getCmChildCode(paramsComCode).then(res => {
        //불량
        res.list
          .filter(word => word.code === 'DEF_CODE')
          .forEach(e => {
            this.defcodeLookup.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
          //생산
        res.list
          .filter(word => word.code === 'PRO_TYPE')
          .forEach(e => {
            this.protypeLookup.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
        res.list
          .filter(word => word.code === 'PRO_TYPE')
          .forEach(e => {
            this.eventCdLookup.push({
              value: e.sysCode,
              text: e.sysName
            })
          })
    
      })

    let params = {
          comCode: getComCode(),
        }
    let factoryList = await getFactoryInfoData(params)
     factoryList.list.forEach((e) => {
              this.factoryLookup.push({
                value: e.facCode,
                text: e.facName
              })
            })
           
    this.facCode = factoryList.list[0].facCode


     let paramsWork = {
      comCode: getComCode(),
      facCode: this.facCode,
     }
     
     //공정 조회
      let proCodeRes = await getProcInfo(paramsWork)
            proCodeRes.list.forEach((e) => {
              this.proCodeList.push({
                value: e.proCode,
                text: e.proName
              })
            })
      // 작업장 
      let workCode = await getBas0034(paramsWork)
           workCode.list.forEach((e)=>{
            this.workCodeLookup.push({
              value:e.workCode,
              text:e.workName
            })

           })

    




      /////// 작업반 
      let workDecodeRes = await getWorkDecode(paramsWork)
            workDecodeRes.list.forEach((e) => {
              this.workDecodList.push({
                value: e.workDecode,
                text: e.workDename
              })
            })

      //창고코드
      let paramswh = {
        comCode: getComCode(),
        facCode: this.facCode,
        whCode: '',
      }
    let whCode =  await getWarehouseLocInfoData(paramswh)
          whCode.list.forEach((e)=>{
            this.whCodeLookup.push({
              value:e.locCode,
              text:e.locName
            })
          })
 
         
     


    },

    // 그리드 
    getMenuTitle (id) {
      return this.$t(id)
    },


 
   
  }
}
</script>
<style lang="scss" scoped>
.span {
  text-align: center;
}
.btnStyle {
  text-align: right;
}
</style>
