<template>
  <DxPopup :dragEnabled="true" :visible.sync="popVisible" :title="$t('equipmentInfo')" :show-close-button="true"
    :show-title="true" height="700px" width="1000px" @hidden="close">
    <DxScrollView height="100%" width="100%">
      <v-row dense style="border-bottom: 1px solid black;">
        <v-col cols="auto">
          <span class="btnTextStyle">{{ $t('mainItem') }}</span>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-form>
            <v-col cols="12">
              <v-row dense style="margin-top: 10px;">
                <v-col cols="6">
                  <span class="popupText">{{ $t('comCode') }} *</span>
                  <v-text-field v-model="comCode" dense outlined hide-details="auto" readonly
                    background-color="#fff2e0" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('facCode') }} *</span>
                  <v-text-field v-model="facCode" dense outlined hide-details="auto" readonly
                    background-color="#fff2e0" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('eqCode') }} *</span>
                  <v-text-field v-model="eqCode" dense outlined hide-details="auto" :readonly="AccountEditing" clearable
                    background-color="#fff2e0" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('eqName') }}</span>
                  <v-text-field v-model="eqName" dense outlined hide-details="auto" clearable
                    background-color="#fff2e0" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('eqSpec') }}</span>
                  <v-text-field v-model="eqSpec" dense outlined hide-details="auto" clearable
                    background-color="#fff2e0" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('eqGrade') }}</span>
                  <v-select v-model="eqGrade" :items="eqGrades" item-value="sysCode" item-text="sysName" return-object
                    single-line clearable outlined dense class="popField" background-color="#fff2e0">
                  </v-select>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('eqState') }}</span>
                  <v-select v-model="eqState" :items="eqStates" item-value="sysCode" item-text="sysName" return-object
                    single-line clearable outlined dense class="popField" background-color="#fff2e0"></v-select>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('makeCom') }}</span>
                  <v-text-field v-model="makeCom" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('perCom') }}</span>
                  <v-text-field v-model="perCom" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('proDate') }}</span>
                  <v-text-field v-model="proDate" type="date" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('insDate') }}</span>
                  <v-text-field v-model="insDate" type="date" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('desDate') }}</span>
                  <v-text-field v-model="desDate" type="date" dense outlined hide-details="auto" clearable />
                </v-col>

              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('dayInspYn') }}</span>
                  <v-checkbox v-model="dayInspYn" :label="`${dayInspYn ? $t('use') : $t('unused')} `"></v-checkbox>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('dayInspDt') }}</span>
                  <v-text-field v-model="dayInspDt" type="String" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('dayInspNextDt') }}</span>
                  <v-text-field v-model="dayInspNextDt" type="String" dense outlined hide-details="auto" readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('periInspYn') }}</span>
                  <v-checkbox v-model="periInspYn" :label="`${periInspYn ? $t('use') : $t('unused')} `"></v-checkbox>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('periInspCycle') }}</span>
                  <v-text-field v-model="periInspCycle" type="String" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('periInspDt') }}</span>
                  <v-text-field v-model="periInspDt" type="String" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('periInspNextDt') }}</span>
                  <v-text-field v-model="periInspNextDt" type="String" dense outlined hide-details="auto" readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('preStr') }}</span>
                  <v-text-field v-model="preStr" type="String" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('moldLoc') }}</span>
                  <v-select v-model="moldLoc" :items="moldLocs" item-value="locCode" item-text="locName" return-object single-line
                    readonly outlined dense class="popField">
                  </v-select>
                </v-col>
                <v-col cols="6">
                  <!-- 사용유무 -->
                  <span class="popupText">{{ $t('userFlag') }}</span>
                  <v-checkbox v-model="userFlag" :label="`${userFlag ? $t('use') : $t('unused')} `"></v-checkbox>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('remark') }}</span>
                  <v-text-field v-model="remark" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <p class="popupText">{{ $t('eqpImage') }}</p>
                  <DxFileUploader :ref="fileUploaderRef" :multiple="false" :select-button-text="$t('upload')"
                    :labelText="$t('dropFile')" accept="image/*" upload-mode="useForm" readyToUploadMessage=""
                    :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png', '.bmp', '.ico']" @value-changed="onValueChanged" />
                  <DxButton class="retryButton" text="Retry" :visible="retryButtonVisible" @click="onClick" />
                  <div style="text-align: center;">
                    <img :ref="imgRef" class="uploadedImage" :src="url"/>
                  </div>
                
                </v-col>
              </v-row>
              <v-row dense style="border-bottom: 1px solid black; margin-top: 10px;">
                <v-col cols="auto">
                  <span class="btnTextStyle">{{ $t('registrantInfo') }}</span>
                </v-col>
                <v-spacer />
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('makeDate') }}</span>
                  <v-text-field v-model="makeDate" dense outlined hide-details="auto" clearable readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('maker') }}</span>
                  <v-text-field v-model="maker" dense outlined hide-details="auto" clearable readonly />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('editDate') }}</span>
                  <v-text-field v-model="editDate" dense outlined hide-details="auto" clearable readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('editor') }}</span>
                  <v-text-field v-model="editor" dense outlined hide-details="auto" clearable readonly />
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
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="close()">
            <v-icon>$cancel</v-icon>{{ $t('cancel') }}
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
    DxButton
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      AccountEditing: false,
      retryButtonVisible: false,
      fileUploaderRef: 'fu',
      imgRef: 'popPdf',
      fileName: '',
      eqGrades: [],
      eqStates: [],
      moldLocs: [],
      blobUrl: '',
      id: '',
      comCode: '',
      facCode: '',
      eqCode: '',
      eqName: '',
      eqSpec: '',
      eqGrade: '',
      proCode: '',
      eqState: '',
      makeCom: '',
      perCom: '',
      proDate: '',
      insDate: '',
      desDate: '',
      eqpImage: '',
      dayInspYn: '',
      dayInspDt: '',
      dayInspNextDt: '',
      periInspYn: '',
      periInspCycle: '',
      periInspDt: '',
      periInspNextDt: '',
      preStr: '',
      moldLoc: '',
      sortFlag: '',
      remark: '',
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
      return this.$refs[this.fileUploaderRef].instance;
    },
    imageElement: function () {
      return this.$refs[this.imgRef];
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
        console.log('onValueChanged ', e.value[0].type)
        if (e.value[0].type.substr(0, 5) != 'image') {
          this.onClick()
          notify('Image ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
          return
        }

        let reader = new FileReader();
        reader.onload = (args) => {
          this.fileName = e.value[0].name
          console.log('onload',this.fileName)
          this.blobUrl = args.target.result
          this.imageElement.setAttribute('src', this.blobUrl);
        }
        reader.readAsDataURL(e.value[0] ? e.value[0] : this.blobUrl + '#view=fitH&toolbar=0'); // convert to base64 string

        this.retryButtonVisible = true
      }
    },
    btnSave(gbn) {
      if (this.retryButtonVisible) {
        this.retryButtonVisible = false
      }
      let items = {
        file: this.fileUploader._files.length > 0 ? this.fileUploader._files[0].value : null,
        popupData: [{
          id: this.id,
          comCode: this.comCode,
          facCode: this.facCode,
          eqCode: this.eqCode,
          eqName: this.eqName,
          eqSpec: this.eqSpec,
          eqGrade: this.eqGrade != 'undefined' ? this.eqGrade.sysCode : '',
          proCode: this.proCode,
          eqState: this.eqState != 'undefined' ? this.eqState.sysCode : '',
          makeCom: this.makeCom,
          perCom: this.perCom,
          proDate: this.proDate,
          insDate: this.insDate,
          desDate: this.desDate,
          eqpImage: this.fileName ? this.fileName : this.eqpImage,
          dayInspYn: this.dayInspYn,
          periInspYn: this.periInspYn,
          periInspCycle: this.periInspCycle,
          sortFlag: this.sortFlag,
          remark: this.remark,
          userFlag: this.userFlag ? 'Y' : 'N',
          makeDate: this.makeDate,
          maker: this.maker,
          editDate: this.editDate,
          editor: this.editor,
          created: this.created,
          modified: this.modified,
          fileModified: this.fileUploader._files.length > 0 ? true : false,
          __created__: this.created,
          __modified__: this.modified
        }]
      }

      // for (var key in items.popupData[0]) {
      // console.log("key " + key + " has value " + items.popupData[0][key]);
      // }

      this.$emit('btnSave', items)

    },
    open(gbn, popupData, eqGrades, eqStates, moldLocs) {
      console.log('open', gbn, popupData, eqGrades, eqStates)
      this.blobUrl = popupData.blobUrl
      this.id = popupData.id
      this.comCode = popupData.comCode
      this.facCode = popupData.facCode,
      this.eqCode = popupData.eqCode,
      this.eqName = popupData.eqName,
      this.eqSpec = popupData.eqSpec,
      this.eqGrade = popupData.eqGrade,
      this.proCode = popupData.proCode,
      this.eqState = popupData.eqState,
      this.makeCom = popupData.makeCom,
      this.perCom = popupData.perCom,
      this.proDate = popupData.proDate,
      this.insDate = popupData.insDate,
      this.desDate = popupData.desDate,
      this.eqpImage = popupData.eqpImage,
      this.sortFlag = popupData.sortFlag,
      this.remark = popupData.remark
      this.makeDate = popupData.makeDate
      this.maker = popupData.maker
      this.editDate = popupData.editDate
      this.editor = popupData.editor
      this.created = popupData.__created__
      this.modified = popupData.__modified__
      this.eqGrades = eqGrades
      this.eqStates = eqStates
      this.moldLocs = moldLocs
      if (gbn == 'add') {
        this.AccountEditing = false
      } else {
        this.imageElement.setAttribute('src', this.blobUrl);
        this.AccountEditing = true
      }
    },
    close() {
      this.fileUploader.reset()
      this.retryButtonVisible = false
      this.$emit('close')
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