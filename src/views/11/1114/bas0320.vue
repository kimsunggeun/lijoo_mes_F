<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters fill-height>
      <v-col cols="12" class="pa-2 pt-0 pl-0 pb-0">
        <i-card-top class="d-md-flex"
          outlined
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
              <v-col cols="2" class="pa-2 pt-2 pl-2 pb-0">
                <v-menu
                 ref="mnDtFrom"
                 v-model="mnDtFrom"  
                 :close-on-content-click="false"
                 :return-value.sync="reqDtFrom"
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :label="$t('searchFromAndSaveDt')"
                      v-model="reqDtFrom"
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="reqDtFrom"
                    no-title 
                    scrollable  
                    @input="dateInput"
                    :day-format="(date) => { return new Date(date).getDate() }"
                  />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-2 pl-0 pb-0">
                <v-menu
                 ref="mnDtTo"
                 v-model="mnDtTo"  
                 :close-on-content-click="false"
                 :return-value.sync="reqDtTo"
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      label="~"
                      v-model="reqDtTo"
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="reqDtTo" 
                    :min="reqDtFrom" 
                    no-title 
                    scrollable 
                    @input="dateInput2"
                    :day-format="(date) => { return new Date(date).getDate() }"
                  />
                </v-menu>
              </v-col>
              <v-col cols="2" class="pa-2 pt-0 pl-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  :label="$t('currCode')"
                  :items="currCodeList"
                  item-value="sysCode"
                  item-text="sysName"
                  v-model="currCode"
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
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <i-card-vertical 
          class="pr-2"
          headerTitle="exchangeInfoTitle"
          :useBtnList="[
              'btnLoad', //저장
          ]"
          @btnLoad="btnLoad()"
        >
          <template v-slot:body>
            <v-layout column>
              <DxDataGrid
                id="exchangeRateInformation"
                class="listBox"
                :ref="exchangeRateInformationRef"
                :data-source="exchangeRateInformation"
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
                <DxPaging :enabled="false" />
                <DxPager :show-page-size-selector="false" />
                <DxSelection mode="none" />
                <DxScrolling column-rendering-mode="virtual"/>
                <DxColumn data-field="comCode" :caption="$t('comName')" width="auto" data-type="string" alignment="left" :allow-editing="false" :visible="false" >
                  <DxLookup :data-source="companyList" display-expr="comName" value-expr="comCode"/>
                </DxColumn>
                <DxColumn data-field="currDate" :caption="$t('currDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="currCode" :caption="$t('currCode')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="currName" :caption="$t('currName')" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxColumn data-field="price" :caption="$t('price2')" width="auto" data-type="number" format="#,###.##" alignment="right" :allow-editing="false" />
                <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                <DxColumn />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  //layout
  import iCardVertical from '@/components/common/iCardVertical.vue'
  import iPageTitle from '@/components/common/iPageTitle.vue'
  import ICardTop from '@/components/common/iCardTop.vue'
  //component
  import { DxDataGrid, DxColumn , DxScrolling , DxEditing, DxLookup, DxPaging, DxPager, DxSelection } from 'devextreme-vue/data-grid'
  import DxDateBox from 'devextreme-vue/date-box'
  import ISystemBar from '@/components/common/iSystemBar.vue'
  import baseview from '@/components/base/baseview.vue' // base page 추가
  import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
  //api
  import { getExchangeRateInfo, setExrateInfoManage } from '@/api/view/bas0320'
  import { getCmChildCode} from '@/api/system/cmCodeManage'
  import { getCompany } from '@/api/system/companyManage'
  //util
  import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
  import { getUserId, getComCode } from '@/utils/token'
  import notify from 'devextreme/ui/notify' // message

  export default {
    name: 'bas0320',
    mixins: [baseview, BaseDataGrid],
    components: {
    "i-page-title": iPageTitle,
    "i-card-vertical": iCardVertical,
    // iCardVertical,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxEditing,
    DxDateBox,
    ISystemBar,
    DxLookup,
    DxPager,
    DxPaging,
    DxSelection,
},
    data() {
      return {
        exchangeRateInformation: [],
        exchangeRateInformationRef: 'exchangeRateInformationRef',

        reqDtFrom: getCurrentDate(),
        reqDtTo: getCurrentDate(),
        currCode: '',
        currCodeList: [],
        companyList:[],
        mnDtFrom:'',
        mnDtTo:'',
      }
    },
    created() {

      let param = {
          comCode: getComCode(),
          code: "CURR_CODE"
      }

      getCmChildCode(param).then((res) => {
        this.currCodeList = res.list
      })
      
      let param2 = {
        comCode : ""
      }
      
      getCompany(param2).then((res) => {
        this.companyList = res.list
      })

    },
    mounted() {
    },
    computed: {
    },
    methods: {
      
      getDateFormat(date) {
        return getDateFormat(date)
      },
      dateInput(e){
        this.reqDtFrom = e
        this.mnDtFrom = false
        this.$refs.mnDtFrom.save(e)
        if (this.reqDtFrom > this.reqDtTo){
          this.reqDtTo = this.reqDtFrom
        }
      },
      dateInput2(e) {
        if (this.reqDtFrom === ''){
          return
        }
        console.log(e)
        this.reqDtTo = e
        this.mnDtTo = false
        this.$refs.mnDtTo.save(e)
      },
      doSearchMain(isProgress){
        this.openLoading('searching')

        let params = {
          comCode: getComCode(),
          dtFrom: this.reqDtFrom,
          dtTo: this.reqDtTo,
          currCode: this.currCode,
        }

        getExchangeRateInfo(params).then(res => {
          this.exchangeRateInformation = res.list
        }).finally(() => {
          this.endLoading()
        })
      },
      btnSearchMain() {
        this.doSearchMain()        
      },
      btnLoad()
      {
        this.openLoading('save')

        let params = {
          comCode: getComCode(),
          dtFrom: this.reqDtFrom,
          dtTo: this.reqDtTo,
          currCode: this.currCode,
        }

        this.openLoading()
        setExrateInfoManage(params)
          .then((res) => {
            this.doSearchMain() 
          })
          .catch((error) => {
            notify(error, 'error', 1500)
          })
          .finally(() => {
            this.endLoading()
          })
      }
    }
  }
</script>
<style lang="less" scoped>

</style>