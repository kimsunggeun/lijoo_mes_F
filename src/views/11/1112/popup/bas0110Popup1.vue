<template>
    <DxPopup :dragEnabled="true" :visible.sync="popVisible" :title="$t('employeeInfo')"
            :show-close-button="true" :show-title="true"  height="700px" width="1000px"
            @hidden="onHidden"
        >
        <DxScrollView height="100%" width="100%">
            <v-row dense style="border-bottom: 1px solid black;">
                <v-col cols="auto">
                    <span class="btnTextStyle">{{$t('mainItem')}}</span>
                </v-col>
                <v-spacer />
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-form>
                    <v-col cols="12">
                        <v-row dense style="margin-top: 10px;">
                            <v-col cols="6">
                                <span class="popupText">{{$t('comCode')}} *</span>
                                <v-text-field v-model="popupData.comCode" dense outlined hide-details="auto" readonly
                                background-color="#fff2e0" />
                            </v-col>
                            <v-col cols="6">
                                <span class="popupText">{{$t('depCode')}}</span>
                                <v-text-field v-model="popupData.depCode" dense outlined hide-details="auto" :readonly="AccountEditing"
                                background-color="#fff2e0" />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="6">
                                <span class="popupText">{{$t('userId')}} *</span>
                                <v-text-field v-model="popupData.userId" dense outlined hide-details="auto" :readonly="AccountEditing"
                                background-color="#fff2e0" />
                            </v-col>
                            <v-col cols="6">
                                <span class="popupText">{{$t('userName')}}</span>
                                <v-text-field v-model="popupData.userName" dense outlined hide-details="auto" 
                                clearable background-color="#fff2e0"/>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="6">
                                <span class="popupText">{{$t('perName')}}</span>
                                <v-select
                                v-model="popupData.perCode"
                                :items="perCodes"
                                item-value="perCode"
                                item-text="perName"
                                single-line
                                clearable
                                outlined
                                dense
                                class="popField"
                                background-color="#fff2e0"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <span class="popupText">{{$t('typeCodeNm')}}</span>
                                <v-select
                                v-model="popupData.typeCode"
                                :items="typeCodes"
                                item-value="sysCode"
                                item-text="sysName"
                                single-line
                                clearable
                                outlined
                                dense
                                class="popField"
                                background-color="#fff2e0"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="6">
                                <span class="popupText">{{$t('facName')}}</span>
                                <v-select
                                v-model="popupData.facCode"
                                :items="facCodes"
                                item-value="facCode"
                                item-text="facName"
                                single-line
                                clearable
                                outlined
                                dense
                                class="popField"
                                background-color="#fff2e0"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <span class="popupText">{{$t('hp')}}</span>
                                <v-text-field v-model="popupData.hp" dense outlined hide-details="auto"
                                clearable/>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="6">
                                <span class="popupText">{{$t('email')}}</span>
                                <v-text-field v-model="popupData.email" dense outlined hide-details="auto"
                                clearable />
                            </v-col>
                            <v-col cols="6">
                                <span class="popupText">{{$t('entDate')}}</span>
                                <v-text-field v-model="popupData.entDate" type="date" dense outlined hide-details="auto"
                                clearable />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="6">
                                <span class="popupText">{{$t('lanCode')}}</span>
                                <v-select
                                v-model="popupData.lanCode"
                                :items="lanCodes"
                                item-value="sysCode"
                                item-text="sysName"
                                single-line
                                clearable
                                outlined
                                dense
                                class="popField"
                                background-color="#fff2e0"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <!-- 사용유무 -->
                                <span class="popupText">{{$t('userFlag')}}</span> 
                                <!-- <v-text-field v-model="userFlag" dense outlined hide-details="auto" maxlength="1"
                                clearable /> -->
                                <v-checkbox
                                v-model="popupData.userFlag"
                                :label="`${popupData.userFlag ? $t('use') : $t('unused')} `"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="12">
                                <span class="popupText">{{$t('remark')}}</span>
                                <v-text-field v-model="popupData.remark" dense outlined hide-details="auto"
                                clearable />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="12">
                                <p class="popupText">{{$t('userImage')}}</p>
                                <DxFileUploader :ref="fileUploaderRef" :multiple="false" 
                                    :select-button-text="$t('upload')"
                                    :labelText="$t('dropFile')"
                                    accept="image/*" upload-mode="useForm" readyToUploadMessage=""
                                    :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png', '.bmp', '.ico']"
                                    :showFileList="false"
                                    @value-changed="onValueChanged"
                                />
                                <div style="text-align: center;">
                                    <img :ref="imgRef" class="uploadedImage" />
                                </div>
                                
                            </v-col>
                        </v-row>
                        <v-row dense style="border-bottom: 1px solid black; margin-top: 10px;">
                        <v-col cols="auto">
                            <span class="btnTextStyle">{{$t('registrantInfo')}}</span>
                        </v-col>
                        <v-spacer />
                        </v-row>
                        <v-row dense>
                        <v-col cols="6">
                            <span class="popupText">{{$t('makeDate')}}</span>
                            <v-text-field v-model="popupData.makeDate" dense outlined hide-details="auto"
                            clearable readonly />
                        </v-col>
                        <v-col cols="6">
                            <span class="popupText">{{$t('maker')}}</span>
                            <v-text-field v-model="popupData.maker" dense outlined hide-details="auto"
                            clearable readonly />
                        </v-col>
                        </v-row>
                        <v-row dense>
                        <v-col cols="6">
                            <span class="popupText">{{$t('editDate')}}</span>
                            <v-text-field v-model="popupData.editDate" dense outlined hide-details="auto"
                            clearable readonly />
                        </v-col>
                        <v-col cols="6">
                            <span class="popupText">{{$t('editor')}}</span>
                            <v-text-field v-model="popupData.editor" dense outlined hide-details="auto"
                            clearable readonly />
                        </v-col>
                        </v-row>
                    </v-col>
                    </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" align="right">
                    <v-btn tile outlined  width="80px" class="releaseBtn" ref="cancelBtn" 
                    @click="btnSave('사원')">
                    <v-icon>$save</v-icon>{{$t('save')}}
                    <!-- SAVE -->
                    </v-btn>
                    <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn"
                    @click="close()">
                    <v-icon>$cancel</v-icon>{{$t('cancel')}}
                    </v-btn>
                </v-col>
            </v-row>
        </DxScrollView>
    </DxPopup>
  </template>
  
  <script>
    import { DxPopup } from 'devextreme-vue/popup';
    import DxFileUploader from 'devextreme-vue/file-uploader';
    import notify from 'devextreme/ui/notify' // message
    import { DxScrollView } from "devextreme-vue/scroll-view";
    import DxButton from 'devextreme-vue/button'

    export default {
      name: 'test',
      // mixins: [baseview, BaseDataGrid],
    
      components: {
        DxPopup,
        DxScrollView,
        DxFileUploader,
        // DxButton
      },
      props: {
        pop1Visible: {
            type: Boolean,
            default: false
        },
      },
      watch: {
        pop1Visible() {
            this.visible(this.pop1Visible)
        },
      },
      data() {
        return {
            popVisible: false,
            AccountEditing: false,
            fileUploaderRef: 'fu',
            imgRef: 'popImg',
            fileName: '',
            perCodes: [],
            typeCodes: [],
            facCodes: [],
            lanCodes: [],

            popupData: {},
        }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    computed: {
        fileUploader: function() {
            return this.$refs[this.fileUploaderRef].instance;
        },
        imageElement: function() {
            return this.$refs[this.imgRef];
        },
    },
    methods: {
        visible(e) {
            this.popVisible = e
        },
        onValueChanged(e) {
            console.log("????",e)
            if(e.value.length <= 0)
            {
                return;
            }

            if(e.value[0].type.substr(0,5) != 'image') {
                notify('Image ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
                return
            }
            let reader = new FileReader();
            reader.onload = (args) => {
                this.fileName = e.value[0].name    
                this.popupData.userImage = e.value[0].name   
                console.log('args.target.result', args.target.result) 
                this.popupData.blobUrl = args.target.result
                this.imageElement.setAttribute('src', this.popupData.blobUrl)
            }
            reader.readAsDataURL(e.value[0] ? e.value[0] : this.blobUrl); // convert to base64 string
            this.popupData.fileModified = true
        },
        btnSave(gbn) {
            console.log("fileUploader",this.fileUploader._files)
            this.popupData.file = this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null

            //file: this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null,
            let items = {
                gbn: gbn,
                popupData: this.popupData
            }


            this.$emit('btnSave', items)
            
        },
        open(gbn, popupData, items) {
            //this.popVisible = true
            this.popupData = JSON.parse(JSON.stringify(popupData))
            this.popupData.blobUrl = popupData.blobUrl
            this.perCodes = items.perCodes
            this.typeCodes = items.typeCodes
            this.facCodes = items.facCodes
            this.lanCodes = items.lanCodes

            if(gbn == 'add') {
                this.AccountEditing = false
            } else {
                this.AccountEditing = true
            }
            //No Image인 경우 아이콘 표기되지 않도록
            if(popupData.blobUrl){
                this.imageElement.setAttribute('src', popupData.blobUrl)
            }
        },
        close() {
            this.popVisible = false
        },
        onHidden(e) {
            // Handler of the 'hidden' event
            this.fileUploader.reset()
            this.$emit('close')
        },
    },    
    }
    </script>

    <style lang="less" scoped>
    .releaseBtn {
        background-color: rgb(135,155,119);
        margin-right: 6px;
        font-size: 12pt;
        color: white;
    }
    .popupText {
        color: rgb(135,155,119);
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