<template>
  <DxPopup
    :dragEnabled="true"
    :visible.sync="popVisible"
    :title="$t('nowStatus')"
    :show-close-button="true"
    :hide-on-outside-click="false"
    :show-title="true"
    height="auto"
    width="70%"
    @hidden="onHidden"
  >
    <DxScrollView height="100%" width="100%">
      <v-row>
        <v-col cols="12">
          <v-form>
            <v-col cols="12">
              <v-row dense style="margin-top: 10px;">
                <v-col cols="4">
                  <span class="popupText">{{ $t('lotDetail') }} </span>
                  <v-text-field v-model="comCode" dense outlined hide-details="auto" :readonly="AccountEditing" />
                </v-col>
                <v-col cols="4">
                  <span class="popupText">{{ $t('partCode') }} </span>
                  <v-text-field v-model="depCode" dense outlined hide-details="auto" :readonly="AccountEditing" />
                </v-col>
                <v-col cols="4">
                  <span class="popupText">{{ $t('partName') }} </span>
                  <v-text-field v-model="depCode" dense outlined hide-details="auto" :readonly="AccountEditing" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="4">
                  <span class="popupText">{{ $t('currentPlace') }} </span>
                  <v-text-field v-model="comCode" dense outlined hide-details="auto" :readonly="AccountEditing" />
                </v-col>
                <v-col cols="4">
                  <span class="popupText">{{ $t('lotNumber') }} </span>
                  <v-text-field v-model="depCode" dense outlined hide-details="auto" :readonly="AccountEditing" />
                </v-col>
                <v-col cols="4">
                  <span class="popupText">{{ $t('receiptDate') }} </span>
                  <v-menu
                    ref="mnDtFrom"
                    v-model="mnDtFrom"
                    :close-on-content-click="false"
                    :return-value.sync="receiptDate"
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="receiptDate" dense outlined v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="receiptDate" no-title scrollable @input="dateInput" />
                  </v-menu>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="4">
                  <span class="popupText">{{ $t('currentQty') }} </span>
                  <v-text-field v-model="comCode" dense outlined hide-details="auto" :readonly="AccountEditing" />
                </v-col>
              </v-row>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <DxDataGrid
          id="itemInfo"
          class="doubleListBox09"
          :ref="popupInfoGridRef"
          :data-source="sample"
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
          :on-row-inserted="e => e.component.navigateToRow(e.key)"
      
        >
          <DxPaging :enabled="false" />

          <DxPager :show-page-size-selector="false" />
          <DxColumn v-for = "(Column,index) in PopUp" :key="index"
                  :data-field="Column.field" 
                  :caption="getMenuTitle(Column.headcaption)" 
                  :data-type="Column.fieldtype" 
                  :alignment="Column.alignment" 
                  :width = "Column.width"
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

        </DxDataGrid>
      </v-row>
      <v-row>
        <v-col cols="10"></v-col>
        <v-col cols="2">
          <v-btn depressed class="white--text" color="rgb(44,73,184)" height="30" width="100%" @click="close()">
            닫기
          </v-btn>
        </v-col>
      </v-row>
    </DxScrollView>
  </DxPopup>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup'
import DxFileUploader from 'devextreme-vue/file-uploader'
import notify from 'devextreme/ui/notify' // message
import { DxScrollView } from 'devextreme-vue/scroll-view'
import { getComCode, getUserId } from '@/utils/token'
import { getPopUp0330 } from '@/api/view/pop0330'
import DxButton from 'devextreme-vue/button'
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing ,DxLookup } from 'devextreme-vue/data-grid'
//////// 콤보 api

import { getCmChildCode } from '@/api/system/cmCodeManage' // 공통코드
import { getFactoryInfoData } from '@/api/view/bas0030'
import { getProcInfo } from '@/api/view/bas0031' /// 공정
import { getBas0034 } from '@/api/view/pro0050' //작업장
import {  getWorkDecode } from '@/api/view/pro0120'// 작업반
import { getWarehouseLocInfoData } from '@/api/view/bas0033'//창고
////////////////

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
export default {
  name: 'test',
  mixins: [baseview, BaseDataGrid],

  components: {
    DxPopup,
    DxScrollView,
    // DxFileUploader,
    // DxButton,
    DxDataGrid,
    DxColumn,
    DxLookup,

  },
  props: {
    sampleList123:{type:Array},
    pop1Visible: {
      type: Boolean,
      default: false
    },
    
  },
  watch: {
    pop1Visible() {
     console.log(this.sampleList123)
      this.btnSeach() // 조회
      this.visible(this.pop1Visible)
    }
  },
  data() {
    return {
      receiptDate: '',
      mnDtFrom: '',
      popupInfoGridRef: 'popupInfoGridRef',
      sample123: [],
      popVisible: false,
      AccountEditing: false,
      retryButtonVisible: false,
      fileUploaderRef: 'fu',
      imgRef: 'popImg',
      fileName: '',
      perCodes: [],
      typeCodes: [],
      facCodes: [],
      lanCodes: [],
      id: '',
      comCode: '',
      blobUrl: '',
      depCode: '',
      userId: '',
      userName: '',
      perCode: '',
      typeCode: '',
      posiCode: '',
      facCode: '',
  
      hp: '',
      email: '',
      entDate: '',
      lanCode: '',
      userImage: '',
      userFlag: 'Y',
      remark: '',
      makeDate: '',
      maker: '',
      editDate: '',
      editor: '',
      created: false,
      modified: false,
      sample: [],

      //데이터 바인딩 (컬럼)
      PopUp:[],
      PopUpgrid:[],
      factoryLookup:[],
      defcodeLookup:[],
      protypeLookup:[],
      workCodeLookup:[],
      eventCdLookup:[],
      whCodeLookup:[],
      workDecodList:[],
      proCodeList:[]

    }
  },
  computed: {
    url() {
      return this.blobUrl
    }
   
  },


beforeMount(){

  this.comboListSet()
 
  this.PopUp.push(
    
    { headcaption: "comCode", field:"comCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "facCode", field:"facCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.factoryLookup, 
          value:"value", 
          display:"text",
          }
        },
      
      { headcaption: "locCode", field:"locCode", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.whCodeLookup, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "stockType", field:"stockType", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "eventCd", field:"eventCd", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true,
      lookup:{
          data:this.eventCdLookup, 
          value:"value", 
          display:"text",
          }
        },
      { headcaption: "partNo", field:"partNo", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "stockQty", field:"stockQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "stockAmount", field:"stockAmount", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "regiDate", field:"regiDate", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "lotNo", field:"lotNo", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "lotDetail", field:"lotDetail", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "userFlag", field:"userFlag", fieldtype:"boolean" , format:"",  alignment:"center", width : "auto",  visible : true, edittemplate:"checkBoxEditor" },
      { headcaption: "makeDate", field:"makeDate", fieldtype:"date" , format:"yyyy-MM-dd",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "maker", field:"maker", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "editDate", field:"editDate", fieldtype:"date" , format:"yyyy-MM-dd",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "editor", field:"editor", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "outQty", field:"outQty", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
      { headcaption: "selectType", field:"selectType", fieldtype:"string" , format:"",  alignment:"center", width : "auto",  visible : true},
  )
       
        
     
      


},



  methods: {

    

      async  btnSeach(){

      //////// 메인데이터그리드 조회///////
      let parms = {
        comCode: getComCode(),
        facCode: this.sampleList123[0].facCode,
        proCode: '',
        workDecode: '',
        lotDetail: this.sampleList123[0].lotDetail,
        defCode: '' 
      }

          let cnt = 0
          let gridlist = await getPopUp0330(parms)
          gridlist.list.map(x => x.id = cnt++)
          console.log(gridlist)
          this.sample = gridlist.list
   
      },


    dateInput(e) {
     
      this.receiptDate = e
      this.mnDtFrom = false
      this.$refs.mnDtFrom.save(e)
    },
    close() {
      this.depCode  = ''
      this.comCode  = ''
      this.mnDtFrom = ''
     
      this.$emit('close', false)
     
    },
    visible(e) {
      this.popVisible = e
    },
    





    onHidden(e) {
  
      this.$emit('close', false)
      // Handler of the 'hidden' event
      this.popVisible = false
    },

    getMenuTitle (id) {
      return this.$t(id)
    },

    // 콤보 조회
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
  },
}
</script>

<style lang="less" scoped>
.releaseBtn {
  background-color: rgb(43, 81, 235);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}
.popupText {
  color: rgb(51, 51, 51);
}
.buttonClear {
  margin-left: 7px;
}
.uploadedImage {
  height: 100px;
  margin-left: 7px;
  margin-bottom: 7px;
  text-align: center;
}
.btnTextStyle {
  color: '#000';
  font-size: '18px';
  letter-spacing: '0.5px';
  font-weight: 'bold';
  line-height: 1.8;
}
</style>
