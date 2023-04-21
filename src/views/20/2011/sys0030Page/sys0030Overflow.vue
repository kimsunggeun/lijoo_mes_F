<template>
    <div>
        <v-row dense align="center">
            <v-col cols="12">
                <v-row dense>
                    <v-col cols="5" style="border-bottom: 1px solid black;">
                        <span class="titleText">{{$t('과입출 비율')}}</span>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="5" >
                        <!-- 그리드 Main -->
                        <DxDataGrid
                            id="constraint"
                            ref="dxDataGridRef"
                            :data-source="gridData"
                            key-expr="id"
                            :width="grid.width"
                            :show-borders="true"
                            :allow-column-resizing="true"
                            :allow-column-reordering="true"
                            :row-alternation-enabled="true"
                            :column-hiding-enabled="false"
                            :hover-state-enabled="false"
                            :show-row-lines="true"
                            :remote-operations="false"
                            :focused-row-enabled="false"
                            >
                            
                            <DxScrolling column-rendering-mode="virtual"/>
                            <DxColumn data-field="option" :caption="$t('옵션')" width="300px" data-type="string" alignment="center" :allow-editing="false"/>
                            <DxColumn data-field="ratio" :caption="$t('비율')" width="auto" data-type="string" alignment="center" :allow-editing="true"/>
                            <DxSelection  mode="none"/>
                            <DxPaging :enabled="false" />
                            <DxPager  :show-page-size-selector="false" :show-info="false"/>
                        </DxDataGrid>
                        <span class="pl-8">
                            설명: 항목별 과입출 비율을 설정합니다.
                        </span>
                        <v-spacer />
                        <span class="pl-8">
                            예시: 과입출 비율 1 = 100%, 1.5 = 150%
                        </span>
                        <v-spacer />
                        <span class="pl-0">
                            주의사항: 비율 설정 100을 입력할경우 10000%의 과입출이 허용되니 주의하십시오.
                        </span>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="5" align="right">
                        <v-btn tile outlined  width="80px" class="releaseBtn" ref="cancelBtn" 
                        @click="btnSave">
                        <v-icon>$save</v-icon>{{$t('save')}}
                        <!-- SAVE -->
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        
    </div>
    
  </template>
  
  <script>
    import iCardVertical from '@/components/common/iCardVertical.vue'
    import { DxDataGrid, DxColumn, DxPager, DxSelection } from 'devextreme-vue/data-grid'
    import DxButton from 'devextreme-vue/button'
    import baseview from '@/components/base/baseview.vue' // base page 추가
    import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

    import notify from 'devextreme/ui/notify' // message

    export default {
      name: 'test',
      mixins: [baseview, BaseDataGrid],
      components: {
        iCardVertical,
        DxDataGrid,
        DxColumn,
        DxPager,
        DxSelection,
        DxButton,
      },
      props: {
       
      },
      watch: {
        
      },
      data() {
        return {
            gridData: [
                {
                    id: 1,
                    option: '외주지시 과생산 비율',
                    ratio: '1'
                },
                {
                    id: 2,
                    option: '포장지시 과포장 비율',
                    ratio: '1'
                },
                {
                    id: 3,
                    option: '구매발주 과입고 비율',
                    ratio: '1.5'
                },
                {
                    id: 4,
                    option: '출하지시 과출고 비율',
                    ratio: '1.6'
                },
                {
                    id: 5,
                    option: '작업지시 과생산 비율',
                    ratio: '1'
                },
            ]
        }
      },
      computed: {
        gridInstance() {
          return this.GetDataGrid('dxDataGridRef')
        }
      },
      methods: {
        async clickButton(e) {
            console.log('clickButton',e)
            e.setValue(!e.values[1])
            await this.gridInstance.saveEditData()
            // this.slides.forEach(item => {
            //     if(item.type === e.type)
            //         item.check = true
            //     else
            //         item.check = false
            // })
        },
        btnSave() {
            console.log('btnSave')
        }
      },    
      created() {
      },
      beforeMount() {
      },
      mounted() {
      },
    }
  </script>
  
  <style lang="less" scoped>
    .titleText {
        color: '#000';
        font-size: '18px';
        letter-spacing: '0.5px';
        font-weight: 'bold';
        line-height: 1.8;
    }
    .releaseBtn {
      background-color: rgb(43,81,235);
        margin-right: 6px;
        font-size: 12pt;
        color: white;
    }
    ::v-deep .dx-datagrid-content > table > tbody > tr > td {
        padding: 12px 0 12px 0;
    }
  </style>