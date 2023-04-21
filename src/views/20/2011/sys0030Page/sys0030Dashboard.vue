<template>
    <div>
        <v-row dense align="center">
            <v-col cols="12">
                <v-row dense>
                    <v-flex  xs12 sm6 md4 lg3 xl2 class="ma-4" v-for="componentName in items" :key="componentName.id">
                        <v-card class="py-md-0 rounded-lg elevation-5" outlined >
                            <component :is="componentName.dbName" class="layout"/>
                            <v-checkbox class="ma-1 align-center justify-center" 
                                v-model="componentName.userFlag"
                                @change="checkChange(componentName.dbCode, $event)" >
                            </v-checkbox>
                        </v-card>
                    </v-flex>
                </v-row>
                <v-row dense>
                    <v-col cols="2" >
                        <v-text-field
                            :prepend-inner-icon="'$refresh'"
                            :label="$t('autoPlayTime')"
                            v-model="changeTime"
                            dense
                            outlined
                            clearable
                            color="primary"
                            class="ml-4 mt-2 text-center"
                        />
                    </v-col>
                    <v-col cols="10" align="right">
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
    import baseview from '@/components/base/baseview.vue' // base page 추가
    import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
    import notify from 'devextreme/ui/notify' // message

    import { getUserId, getComCode } from '@/utils/token'
    import { getDashboardInfo, updateDashboardInfo } from '@/api/system/systemManage'
    

    export default {
      name: 'test',
      mixins: [baseview, BaseDataGrid],
      components: {
        iCardVertical,
      },
      props: {
       
      },
      watch: {
        
      },
      data() {
        return {
            items: [],
            supportedComponents: [],
            changeTime: '60',
        }
      },
      computed: {
       
      },
      methods: {
        checkChange(code, flag) {
            this.items.findIndex(e => {
                if (e.dbCode == code) {
                    // console.log('checkChange', code, flag)
                    e.userFlag = flag
                }
            })
            console.log('checkChange items', this.items)
        },
        async doDashboardInfo() {
            await getDashboardInfo({userFlag: ''}).then(res => {
                // console.log("getDashboardInfo : ",res.list)
                this.items = res.list
                this.changeTime = this.items[0].autoTime
                this.items.forEach((componentName, index) => {
                    componentName.id = index
                    componentName.userFlag = componentName.userFlag == 'Y' ? true : false
                    
                    this.$options.components[componentName.dbName] = () => import("../../../"+componentName.dbUrl+".vue")
                })
                console.log(this.items)
                // console.log("getSubMenuComp : ",this.supportedComponents);
                // this.items.push({})  
            })  
        },
        btnSave() {
            console.log('btnSave')
            
            this.vToastifyPrompt(
                this.$t('doSaveData'),
                'info',
                async (current) => {
                    this.openLoading()
                    this.items.forEach(item => {
                        item.autoTime = this.changeTime
                        item.userFlag = item.userFlag ? 'Y' : 'N'
                        item.editor = getUserId()
                    })
                    await updateDashboardInfo(this.items)
                    .then(res => {
                        notify(this.$t('Saved'), 'success', 1500)
                        this.doDashboardInfo()
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
        this.doDashboardInfo()
      },
      beforeMount() {
      },
      mounted() {
      },
    }
  </script>
  
  <style lang="less" scoped>
    .layout {
        // width: 50vh;
        height: 40vh;
    }
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
    ::v-deep .v-input__slot {
        justify-content: center !important;
    }
  </style>