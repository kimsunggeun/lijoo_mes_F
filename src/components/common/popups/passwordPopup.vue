<template>
    <DxPopup
        :show-title="true"
        :title="$t('changePassword')"
        :visible.sync="popupVisible"
        :hide-on-outside-click="hideOnOutsideClick"
        :scrollingEnabled="true"
        :max-width="500" :min-width="500"
        :height="320"
        @hidden="onHidden"
        :max-height="'calc(100% - 28px)'"
        :show-close-button="true"
    >
        <v-row dense style="border-bottom: 1px solid black;">
            <v-col cols="auto">
                <span class="btnTextStyle">{{$t('mainItem')}}</span>
            </v-col>
            <v-spacer />
        </v-row>
        <v-row no-gutters>
                <v-col cols="12">
                    <v-form>
                        <v-row dense style="margin-top: 10px;">
                            <v-col cols="12">
                                <span class="popupText">{{$t('existingPassword')}}</span>
                                <v-text-field v-model="ePassword" dense outlined hide-details="auto"
                                @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" clearable />
                            </v-col>
                        </v-row>
                        <v-row dense style="margin-top: 10px;">
                            <v-col cols="12">
                                <span class="popupText">{{$t('changePassword')}}</span>
                                <v-text-field v-model="cPassword" dense outlined hide-details="auto"
                                @click:append="show2 = !show2" :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" clearable />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
        </v-row>
        <v-row>
                <v-col cols="12" align="right">
                    <v-btn tile outlined  width="80px" class="releaseBtn" ref="cancelBtn" 
                    @click="btnChange()">
                    <v-icon>$pencil</v-icon>{{$t('change')}}
                    <!-- SAVE -->
                    </v-btn>
                    <v-btn tile outlined width="80px" class="CancelBtn" ref="cancelBtn"
                    @click="onHidden()">
                    <v-icon>$cancel</v-icon>{{$t('cancel')}}
                    </v-btn>
                </v-col>
            </v-row>
    </DxPopup>
  
</template>

<script>
import baseview from '@/components/base/baseview.vue' // base page 추가

import {DxPopup} from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' // message

import { updateUserPass } from '@/api/system/userManage'
import { getUserId, getComCode } from '@/utils/token'

export default {
    name:'changePasswordPopup',
    mixins: [baseview],
    components:{
        DxPopup
    },
    data(){
        return{
            popupVisible: false,
            ePassword: '',
            cPassword: '',
            show1: false,
            show2: false
        }
    },
    methods:{
        hideOnOutsideClick(e) {
            this.popupVisible = false
            return e.target === document.getElementsByClassName("dx-overlay-wrapper dx-popup-wrapper dx-overlay-modal dx-overlay-shader")[0];
        },
        open(){
            this.popupVisible = true
            this.ePassword = ''
            this.cPassword = ''
        },     
        onHidden(e) {
            console.log('onHidden')
            // Handler of the 'hidden' event
            this.popupVisible = false
        },
        btnChange() {
            if(this.ePassword.trim() === '' || this.cPassword.trim() === ''){
                this.vToastify(this.$t('passwordMsg'), 'warn')
                return
            }

            this.vToastifyPrompt(
                this.$t('doChangeData'),
                'info',
                current => {
                    this.openLoading()
                    let params = {
                        comCode : getComCode(),
                        userId : getUserId(),
                        userPassword : this.ePassword.trim(),
                        userChangePassword : this.cPassword.trim()
                    }
                    updateUserPass(params)
                    .then(res => {
                        notify(this.$t('changePasswordMsg'), 'success', 1500)
                        this.popupVisible = false
                    })
                    .catch(error => {
                        notify(this.$t('passwordErrorMsg'), 'error', 1500)
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
    }
}
</script>

<style scoped>
.releaseBtn {
    background-color: rgb(43,81,235);
    border-radius:5px;
    margin-right: 6px;
    font-size: 12pt;
    color: white !important;
}

.CancelBtn {
    background-color: rgb(255,255,255);
    border-radius:5px;
    margin-right: 6px;
    font-size: 12pt;
    color: rgb(51, 51, 51) !important;
}


.popupText {
    color: rgb(43,81,235);
}
.buttonClear {
    margin-left: 7px;
}
.btnTextStyle {
     color: '#000';
     font-size: '18px';
     letter-spacing: '0.5px';
     font-weight: 'bold';
     line-height: 1.8;
}
</style>