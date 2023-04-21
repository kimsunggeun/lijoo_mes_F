<template>
    <DxPopup
        :show-title="true"
        :title="$t('icon')"
        :visible.sync="popupVisible"
        :hide-on-outside-click="hideOnOutsideClick"
        :scrollingEnabled="true"
        width="500px" 
        height="auto"
        @hidden="onHidden"
        :max-height="'calc(100% - 28px)'"
        :show-close-button="true"
    >
        <v-row>
            <DxFileUploader 
                :ref="fileUploaderRef"
                :multiple="false"
                :select-button-text="$t('upload')"
                :labelText="$t('dropFile')"
                accept="image/*" 
                upload-mode="useForm" 
                readyToUploadMessage=""
                :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png', '.bmp', '.ico']"
                @value-changed="onValueChanged"
            />
        </v-row>
        <v-row>
            <v-col class="imageClass">
                <img :src="image" width = "130px" height="50px"> 
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="right">
                <v-btn tile outlined  width="80px" class="releaseBtn" ref="cancelBtn" 
                @click="btnSave()">
                <v-icon>$save</v-icon>{{$t('save')}}
                <!-- SAVE -->
                </v-btn>
                <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn"
                @click="close()">
                <v-icon>$cancel</v-icon>{{$t('cancel')}}
                </v-btn>
            </v-col>
        </v-row>
    </DxPopup>
</template>

<script>
import DxFileUploader from 'devextreme-vue/file-uploader';
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify' 
export default {
    name:'comImagePopup',
    components:{
        DxPopup,
        DxFileUploader
    },

    props: {
        pop3Visible: {
            type: Boolean,
                default: false
        }
    },
    data(){
        return{
            title:'',
            popupVisible:false,
            image:'',
            fileUploaderRef: '',
            imgRef: '',
            fileName: '',
            imgCi: '',
            blobUrl: '',

            items: []
        }
    },
    computed: {
        fileUploader: function() {
            return this.$refs[this.fileUploaderRef].instance;
        }
    },
    methods:{
        hideOnOutsideClick(e) {
            this.popupVisible = false
            return e.target === document.getElementsByClassName("dx-overlay-wrapper dx-popup-wrapper dx-overlay-modal dx-overlay-shader")[0];
        },
        open(item){
            console.log("item",item.data)
            this.image = item.data.blobUrl
            this.popupVisible = true
            this.items = item
        },
        onValueChanged(e) {
            if(e.value.length > 0) {
                if(e.value[0].type.substr(0,5) != 'image') {
                    this.onClick()
                    notify('Image ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
                    return
                }
                let reader = new FileReader();
                // FileReader : 비동기적으로 파일의 내용을 읽어들이는 데 사용
                // onload : 읽기 동작이 성공적으로 완료되었을 때 발생
                reader.onload = (args) => {
                    this.fileName = e.value[0].name
                    this.image = args.target.result
                }
                reader.readAsDataURL(e.value[0] ? e.value[0] : this.imgCi); 

                this.items.data.fileModified = true
                this.items.data.modified = true
                this.items.data.fileName = e.value[0].name.substring(0, e.value[0].name.indexOf('.', ""));
            }
        },     
        onHidden(e) {
            console.log('onHidden')
            // Handler of the 'hidden' event
            this.popupVisible = false
        },
        btnSave() {
            this.items.data.file = this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null
            this.items.data.imgCi = this.fileName ? this.fileName : this.image

            let param =  this.items.data
            this.$emit('comImgData', param)
        },
        close() {
            this.popupVisible = false
        }
    }

}
</script>

<style scoped>
.imageClass{
    text-align: center;
    height: 100%;
    /* width: 30%; */
    /* height: 100%; */
}
.uploadedImage {
        height: 100px;
        margin-left: 7px;
        margin-bottom: 7px;
        text-align: center;
    }
.releaseBtn {
    background-color: rgb(135,155,119);
    margin-right: 6px;
    font-size: 12pt;
    color: white;
}

</style>