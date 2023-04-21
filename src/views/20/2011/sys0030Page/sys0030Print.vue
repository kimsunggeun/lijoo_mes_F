<template>
    <div>
        <v-row dense align="center">
            <v-col cols="4" >
                <v-carousel
                    hide-delimiter-background
                    show-arrows-on-hover
                >
                    <v-carousel-item
                        v-for="(slide, i) in slides"
                        :key="i"
                    >
                        <v-sheet> 
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card class="py-md-0 rounded-lg elevation-5 align-center justify-center"
                                        outlined >
                                        <v-img :src="slide.image"
                                            contain
                                            max-height="450"
                                            width="auto" >
                                            <template v-if="slide.userFlag">
                                                <v-row
                                                    class="fill-height"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <v-img :src="require(`@/assets/images/etc/check.png`)" max-width="80" max-height="90"/>
                                                </v-row>
                                            </template>
                                        </v-img>
                                        <v-fade-transition  v-if="!slide.userFlag">
                                            <v-overlay
                                                v-if="hover"
                                                absolute
                                                color="#036358"
                                            >
                                                <v-btn icon @click="clickButton(slide)">
                                                    <v-img :src="require(`@/assets/images/etc/check.png`)" max-width="80" max-height="90"/>
                                                </v-btn>
                                            </v-overlay>
                                        </v-fade-transition>
                                    </v-card>  
                                </template>
                            </v-hover>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="4" align="right">
                <v-btn tile outlined  width="80px" class="releaseBtn" ref="cancelBtn" 
                @click="btnSave">
                    <v-icon>$save</v-icon>{{$t('save')}}
                </v-btn>
            </v-col>
        </v-row>
    </div>
  </template>
  
  <script>
    import baseview from '@/components/base/baseview.vue' // base page 추가
    import notify from 'devextreme/ui/notify' // message

    import { getUserId, getComCode } from '@/utils/token'
    import { getPrintInfo, updatePrintInfo } from '@/api/system/systemManage'
    export default {
      name: 'test',
      mixins: [baseview],
      components: {
      },
      props: {
        repType: {
            type: String,
            default: ''
        },
      },
      watch: {
        slides() {
            return this.slides
        },
        repType() {
            this.itemType(this.type)
        }
        
      },
      data() {
        return {
          slides: [
            // {
            //     image: require(`@/assets/images/etc/A6B.jpg`),
            //     type: 'A',
            //     check: true
            // },
            // {
            //     image: require(`@/assets/images/etc/LabelB.jpg`),
            //     type: 'B',
            //     check: false
            // },
            // {
            //     image: require(`@/assets/images/etc/A6B.jpg`),
            //     type: 'C',
            //     check: false
            // },
            // {
            //     image: require(`@/assets/images/etc/LabelB.jpg`),
            //     type: 'D',
            //     check: false
            // },
            // {
            //     image: require(`@/assets/images/etc/A6B.jpg`),
            //     type: 'F',
            //     check: false
            // },
          ],
       
        }
      },
      computed: {
        
      },
      methods: {
        itemType(item) {
            console.log('itemType',item)
            this.repType = item
        },
        async proTransactionInfo() {
            await getPrintInfo({reportCode: this.repType}).then(res => {
                // console.log("getDashboardInfo : ",res.list)
                this.slides = res.list
                this.slides.forEach((item, index) => {
                        item.image = require(`@/assets/images/etc/${item.reportType}.png`)
                        // reportType: item.reportType,
                        // typeName: item.typeName,
                        // sizeName: item.sizeName,
                        // deviceName: item.deviceName,
                        // explain: item.explain,
                        item.userFlag = item.userFlag === 'Y' ? true : false
                })
                // console.log("getSubMenuComp : ",this.supportedComponents);
                // this.items.push({})  
            })  
        },
        clickButton(e) {
            console.log('clickButton',e)
            this.slides.forEach(item => {
                if(item.reportType === e.reportType)
                    item.userFlag = true
                else
                    item.userFlag = false
            })
        },
        btnSave() {
            console.log('btnSave')
            this.vToastifyPrompt(
                this.$t('doSaveData'),
                'info',
                async (current) => {
                    this.openLoading()
                    this.slides.forEach(item => {
                        item.userFlag = item.userFlag ? 'Y' : 'N'
                        item.editor = getUserId()
                    })
                    
                    await updatePrintInfo(this.slides)
                    .then(res => {
                        notify(this.$t('Saved'), 'success', 1500)
                        this.proTransactionInfo()
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
        console.log('print1 created')
      },
      beforeMount() {
      },
      mounted() {
        this.proTransactionInfo()
      },
      updated() {
        console.log('print1 updated')
      }
    }
  </script>
  
  <style lang="less" scoped>
    .releaseBtn {
        background-color: rgb(43,81,235);
        margin-right: 6px;
        font-size: 12pt;
        color: white;
    }
  </style>