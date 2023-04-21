<template>
    <div>
        <v-row dense align="center">
            <v-col cols="12">
                <v-row dense>
                    <v-col cols="5" style="border-bottom: 1px solid black;">
                        <span class="titleText">{{$t('제약조건 항목 설정')}}</span>
                    </v-col>
                </v-row>
                <!-- <i-card-vertical headerTitle="제약조건 항목 설정" >
                    <template v-slot:body>            
                        <v-layout column > -->
                <v-row dense>
                    <v-col cols="5" >
                        <!-- 그리드 Main -->
                        <DxDataGrid
                            id="constraint"
                            ref="dxDataGridRef"
                            :data-source="constInfo"
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
                            <DxColumn data-field="constName" :caption="$t('mainItem')" width="300px" data-type="string" alignment="center" :allow-editing="false"/>
                            <DxColumn data-field="userFlag" :caption="$t('situation')" width="auto" data-type="boolean" alignment="center" edit-cell-template="checkButton"/>
                            <template #checkButton="{ data: cellInfo }">
                                <DxButton
                                    class="ma-2"
                                    :text="cellInfo.value ? '설정중' : '미설정'"
                                    :type="cellInfo.value ? 'success' : 'danger'"
                                    @click="clickButton(cellInfo)"
                                ></DxButton>
                            </template>
                            <DxSelection  mode="none"/>
                            <DxPaging :enabled="false" />
                            <DxPager  :show-page-size-selector="false" :show-info="false"/>
                        </DxDataGrid>
                        <span class="pl-8">
                            설명: 제약조건 항목을 선택합니다.
                        </span>
                        <v-spacer />
                        <span class="pl-8">
                            예시: 일상점검 또는 공정검사가 미사용일 경우, 이사용인 항목은 제약되지 않음.
                        </span>
                        <v-spacer />
                        <span class="pl-0">
                            주의사항: 필요한 항목을 미사용으로 체크하지 않도록 주의하세요.
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
                        <!-- <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn"
                        @click="close()">
                        <v-icon>$cancel</v-icon>{{$t('cancel')}}
                        </v-btn> -->
                    </v-col>
                </v-row>
                        <!-- </v-layout>
                    </template>
                </i-card-vertical> -->
            </v-col>
        </v-row>
        
    </div>
    
  </template>
  
  <script>
    import baseview from '@/components/base/baseview.vue' // base page 추가
    import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
    import { DxDataGrid, DxScrolling, DxColumn, DxSelection, DxPaging, DxPager } from 'devextreme-vue/data-grid'
    import DxButton from 'devextreme-vue/button'
    import notify from 'devextreme/ui/notify' // message

    import { getUserId, getComCode } from '@/utils/token'
    import { getConstInfo, updateConstInfo } from '@/api/system/systemManage'

    export default {
      name: 'test',
      mixins: [baseview, BaseDataGrid],
      components: {
        DxDataGrid,
        DxScrolling,
        DxColumn,
        DxSelection,
        DxPaging,
        DxPager,
        DxButton
      },
      props: {
       
      },
      watch: {
        
      },
      data() {
        return {
            constInfoRef: 'dxDataGridRef',
            constInfo: [
                // {
                //     id: 1,
                //     gubun: '설비관리-일상점검',
                //     status: false
                // },
                // {
                //     id: 2,
                //     gubun: '설비관리-정기점검',
                //     status: false
                // },
                // {
                //     id: 3,
                //     gubun: '공정검사-조품점검',
                //     status: false
                // },
                // {
                //     id: 4,
                //     gubun: '작업조건-조건검사',
                //     status: true
                // },
                // {
                //     id: 5,
                //     gubun: '자재투입-투입검사',
                //     status: false
                // },
                // {
                //     id: 5,
                //     gubun: '자재투입-투입검사',
                //     status: false
                // },
            ],
        }
      },
      computed: {
        constInfoInstance() { return this.GetDataGrid(this.constInfoRef) }
      },
      methods: {
        async searchConstInfo() {
            await getConstInfo({}).then(res => {
                // console.log("getDashboardInfo : ",res.list)
                this.constInfo = res.list
                this.constInfo.forEach((item, index) => {
                        item.id = item.constType,
                        item.userFlag = item.userFlag === 'Y' ? true : false
                })
                console.log("searchConstInfo : ",this.constInfo);
                // this.items.push({})  
            })  
        },
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
            this.vToastifyPrompt(
                this.$t('doSaveData'),
                'info',
                async (current) => {
                    this.openLoading()
                    this.constInfo.forEach(item => {
                        item.userFlag = item.userFlag ? 'Y' : 'N'
                        item.editor = getUserId()
                    })
                    
                    await updateConstInfo(this.constInfo)
                    .then(res => {
                        notify(this.$t('Saved'), 'success', 1500)
                        this.constInfo = []
                        this.searchConstInfo()
                    })
                    .catch((error) => {
                        console.log('error', error)
                        notify(error, 'error', 1500)
                        this.endLoading()
                    })
                    .finally(() => {
                      this.endLoading()
                    })
                },
                null,
                true
            )
        }
      },    
      created() {
        this.searchConstInfo()
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