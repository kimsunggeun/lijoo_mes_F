<template>
  <DxPopup
    :dragEnabled="true"
    :visible.sync="popVisible"
    :title="$t('reserveStockInfo')"
    :show-close-button="true"
    :show-title="true"
    height="700px"
    width="1000px"
    @hidden="close"
  >
    <DxScrollView height="100%" width="100%">
      <v-row dense style="border-bottom: 1px solid black">
        <v-col cols="auto">
          <span class="btnTextStyle">{{ $t('mainItem') }}</span>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-form>
            <v-col cols="12">
              <v-row dense style="margin-top: 10px">
                <v-col cols="6">
                  <span class="popupText">{{ $t('comCode') }} *</span>
                  <v-text-field v-model="comCode" dense outlined hide-details="auto" readonly background-color="#fff2e0" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('facCode') }} *</span>
                  <v-select
                    v-model="facCode"
                    :items="facCodeList"
                    item-value="value"
                    item-text="text"
                    single-line
                    dense
                    outlined
                    hide-details="auto"
                    background-color="#fff2e0"
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('resourceClassification') }}</span>
                  <v-select v-model="jobType" :items="jobTypeList" item-value="value" item-text="text" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('partNo') }} *</span>
                  <v-text-field v-model="partNo" dense outlined hide-details="auto" :readonly="AccountEditing" background-color="#fff2e0" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('partName') }}</span>
                  <v-text-field v-model="partName" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('spec') }}</span>
                  <v-text-field v-model="spec" return-object single-line clearable outlined dense class="popField"> </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('nowStatusqty') }}</span>
                  <v-text-field v-model="qty" return-object single-line outlined dense class="popField" readonly></v-text-field>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('optimumStockage') }}</span>
                  <v-text-field v-model="safeQty" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('grade') }}</span>
                  <v-text-field v-model="grade" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('manufacturingLeadTime') }}</span>
                  <v-text-field v-model="regDate" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('exchangeRate') }}</span>
                  <v-select v-model="unit" :items="currCodeList" item-value="value" item-text="text" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('price') }}</span>
                  <v-text-field v-model="price" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('storageLocation') }}</span>
                  <v-select
                    v-model="stockCode"
                    :items="stockCodeList"
                    item-value="value"
                    item-text="text"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('userFlag') }}</span>
                  <v-checkbox v-model="userFlag" :label="`${userFlag ? $t('use') : $t('unused')} `"></v-checkbox>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <p class="popupText">{{ $t('reserveStockImg') }}</p>
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
                  <DxButton class="retryButton" text="Retry" :visible="retryButtonVisible" @click="onClick" />
                  <div style="text-align: center">
                    <img :ref="imgRef" class="uploadedImage" :src="url" />
                  </div>
                </v-col>
              </v-row>

              <v-row dense style="border-bottom: 1px solid black; margin-top: 10px">
                <v-col cols="auto">
                  <span class="btnTextStyle">{{ $t('registrantInfo') }}</span>
                </v-col>
                <v-spacer />
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('makeDate') }}</span>
                  <v-text-field v-model="makeDate" dense outlined hide-details="auto" readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('maker') }}</span>
                  <v-text-field v-model="maker" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('editDate') }}</span>
                  <v-text-field v-model="editDate" dense outlined hide-details="auto" readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('editor') }}</span>
                  <v-text-field v-model="editor" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="btnSave('사원')">
            <v-icon>$save</v-icon>{{ $t('save') }}
            <!-- SAVE -->
          </v-btn>
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="close()"> <v-icon>$cancel</v-icon>{{ $t('cancel') }} </v-btn>
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
import DxButton from 'devextreme-vue/button'
import { getUserId, getComCode } from '@/utils/token'
import { getCurrentDate } from '@/utils/common.js'

export default {
  name: 'test',
  // mixins: [baseview, BaseDataGrid],

  components: {
    DxPopup,
    DxScrollView,
    DxFileUploader,
    DxButton,
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      AccountEditing: false,
      retryButtonVisible: false,
      fileUploaderRef: 'fu',
      imgRef: 'popImg',
      fileName: '',
      facCodeList: [],
      jobTypeList: [],
      stockCodeList: [],
      currCodeList: [],
      blobUrl: '',
      id: '',
      comCode: '',
      facCode: '',
      jobType: '',
      partNo: '',
      partName: '',
      spec: '',
      qty: '',
      safeQty: '',
      grade: '',
      regDate: '',
      unit: '',
      price: '',
      stockCode: '',
      spareImage: '',
      userFlag: 'Y',
      makeDate: '',
      maker: '',
      editDate: '',
      editor: '',
      created: false,
      modified: false,
    }
  },
  computed: {
    fileUploader: function () {
      return this.$refs[this.fileUploaderRef].instance
    },
    imageElement: function () {
      return this.$refs[this.imgRef]
    },
    url() {
      return this.blobUrl
    },
  },
  methods: {
    onClick() {
      this.fileUploader.reset()
      this.imageElement.setAttribute('src', '')
      this.retryButtonVisible = false
    },
    onValueChanged(e) {
      if (e.value.length > 0) {
        if (e.value[0].type.substr(0, 5) != 'image') {
          this.onClick()
          notify('Image ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
          return
        }

        let reader = new FileReader()
        reader.onload = (args) => {
          this.fileName = e.value[0].name
          this.blobUrl = args.target.result
          this.imageElement.setAttribute('src', this.blobUrl)
        }
        reader.readAsDataURL(e.value[0] ? e.value[0] : this.blobUrl) // convert to base64 string

        this.retryButtonVisible = true
      }
    },
    btnSave() {
      if (this.retryButtonVisible) {
        this.retryButtonVisible = false
      }
      let items = {
        file: this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null,
        popupData: [
          {
            id: this.id,
            comCode: this.comCode,
            facCode: this.facCode,
            jobType: this.jobType,
            partNo: this.partNo,
            partName: this.partName,
            spec: this.spec,
            qty: this.qty,
            safeQty: this.safeQty,
            grade: this.grade,
            regDate: this.regDate,
            unit: this.unit,
            price: this.price,
            stockCode: this.stockCode,
            spareImage: this.fileName ? this.fileName : this.spareImage,
            userFlag: this.userFlag? 'Y':'N',
            makeDate: this.makeDate,
            maker: this.maker,
            editDate: this.editDate,
            editor: this.editor,
            created: this.created,
            modified: this.modified,
            fileModified: this.fileUploader._files.length > 0 ? true : false,
            __created__: this.created,
            __modified__: this.modified,
          },
        ],
      }

      this.$emit('btnSave', items)
    },
    open(gbn, popupData, facCodeList, jobTypeList, stockCodeList, currCodeList) {
      this.id = popupData.id
      this.comCode = popupData.comCode
      this.facCode = popupData.facCode
      this.jobType = popupData.jobType
      this.partNo = popupData.partNo
      this.partName = popupData.partName
      this.spec = popupData.spec
      this.qty = popupData.qty
      this.safeQty = popupData.safeQty
      this.grade = popupData.grade
      this.regDate = popupData.regDate
      this.unit = popupData.unit
      this.price = popupData.price
      this.stockCode = popupData.stockCode
      this.spareImage = popupData.spareImage
      this.makeDate = popupData.makeDate
      this.maker = popupData.maker
      this.editDate = popupData.editDate
      this.editor = popupData.editor
      this.created = popupData.__created__
      this.modified = popupData.__modified__
      this.blobUrl = popupData.blobUrl
      this.facCodeList = facCodeList
      this.jobTypeList = jobTypeList
      this.stockCodeList = stockCodeList
      this.currCodeList = currCodeList
      
      console.log('gbn', gbn)
      if (gbn == 'add') {
        this.AccountEditing = false
      } else {
        console.log(this.blobUrl)
        this.imageElement.setAttribute('src', this.blobUrl)
        this.AccountEditing = true
      }
    },
    close() {
      this.fileUploader.reset()
      this.retryButtonVisible = false
      this.$emit('close')
    },
  },
  created() {},
  beforeMount() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
.releaseBtn {
  background-color: rgb(135, 155, 119);
  margin-right: 6px;
  font-size: 12pt;
  color: white;
}

.popupText {
  color: rgb(135, 155, 119);
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