<template>
  <DxPopup
    :dragEnabled="false"
    :visible.sync="popVisible"
    :show-close-button="true"
    :show-title="true"
    :title="$t('meaInfo')"
    height="700px"
    width="1000px"
    @hidden="close"
  >
    <DxScrollView height="100%" width="100%">
      <v-row dense style="border-bottom: 1px solid black;">
        <v-col cols="auto">
          <span :style="btnTextStyle">{{$t('mainItem')}}</span>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-form>
            <v-col cols="12">
              <v-row dense style="margin-top: 10px;">
                <v-col cols="6">
                  <span class="popupText">{{$t('facName')}} *</span>
                  <v-select
                    v-model="facCode"
                    :items="facCodeList"
                    data-source
                    item-value="facCode"
                    item-text="facName"
                    :readonly="AccountEditing"
                    background-color="#fff2e0"
                    single-line
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('meaGp')}}</span>
                  <v-select
                    v-model="meaGr"
                    :items="meaGrList"
                    item-value="code"
                    item-text="name"
                    single-line
                    clearable
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('meaCode')}} *</span>
                  <v-text-field
                    v-model="meaCode"
                    maxlength="20"
                    dense
                    outlined
                    hide-details="auto"
                    :readonly="AccountEditing"
                    background-color="#fff2e0"
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('meaName')}}</span>
                  <v-text-field
                    v-model="meaName"
                    maxlength="50"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('meaSpec')}}</span>
                  <v-text-field
                    v-model="meaSpec"
                    maxlength="50"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('meaGrade')}}</span>
                  <v-select
                    v-model="meaGrade"
                    :items="meaGradeList"
                    item-value="code"
                    item-text="name"
                    single-line
                    clearable
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('meaState')}}</span>
                  <v-select
                    v-model="meaState"
                    :items="meaStateList"
                    item-value="code"
                    item-text="name"
                    single-line
                    clearable
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('depCode')}}</span>
                  <v-select
                    v-model="depCode"
                    :items="depCodeList"
                    item-value="depCode"
                    item-text="depName"
                    single-line
                    clearable
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('mName')}}</span>
                  <v-text-field
                    v-model="name"
                    maxlength="50"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('assNo')}}</span>
                  <v-text-field
                    v-model="assNo"
                    maxlength="30"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('proCompanny')}}</span>
                  <v-text-field
                    v-model="proCom"
                    maxlength="30"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('supCompanny')}}</span>
                  <v-text-field
                    v-model="supCom"
                    maxlength="30"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('manuDate')}}</span>
                  <DxDateBox v-model="manuDate" display-format="yyyy-MM-dd" class="popupDate" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('purDate')}}</span>
                  <DxDateBox v-model="purDate" display-format="yyyy-MM-dd" class="popupDate" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrYN')}}</span>
                  <v-select
                    v-model="corrYN"
                    :items="corrYNList"
                    item-value="code"
                    item-text="name"
                    single-line
                    clearable
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrAgency')}}</span>
                  <v-text-field
                    v-model="corrAgency"
                    maxlength="30"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrMonth')}}</span>
                  <v-text-field
                    v-model="corrMonth"
                    type="number"
                    hide-details="auto"
                    maxlength="10"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    onkeyup="this.value=this.value.replace(/[^\.0-9]/g,'');"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrsDate')}}</span>
                  <DxDateBox v-model="corrsDate" display-format="yyyy-MM-dd" class />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('correDate')}}</span>
                  <DxDateBox v-model="correDate" display-format="yyyy-MM-dd" class="popupDate" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrStd')}}</span>
                  <v-text-field
                    v-model="corrStd"
                    type="number"
                    hide-details="auto"
                    onkeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrMax')}}</span>
                  <v-text-field
                    v-model="corrMax"
                    type="number"
                    hide-details="auto"
                    maxlength="10"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    onkeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('corrMin')}}</span>
                  <v-text-field
                    v-model="corrMin"
                    type="number"
                    hide-details="auto"
                    maxlength="10"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    onkeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');"
                    dense
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('modelNo')}}</span>
                  <v-text-field
                    v-model="modelNo"
                    maxlength="30"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('userFlag')}}</span>
                  <v-checkbox v-model="userFlag" :label="`${userFlag ? $t('use') : $t('unused')} `"></v-checkbox>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <span class="popupText">{{$t('remark')}}</span>
                  <v-text-field
                    v-model="remark"
                    maxlength="255"
                    dense
                    outlined
                    hide-details="auto"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row dense style="border-bottom: 1px solid black; margin-top: 10px;">
                <v-col cols="auto">
                  <span :style="btnTextStyle">{{$t('registrantInfo')}}</span>
                </v-col>
                <v-spacer />
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('makeDate')}}</span>
                  <v-text-field v-model="makeDate" dense outlined hide-details="auto" readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('maker')}}</span>
                  <v-text-field v-model="maker" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{$t('editDate')}}</span>
                  <v-text-field v-model="editDate" dense outlined hide-details="auto" readonly />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{$t('editor')}}</span>
                  <v-text-field v-model="editor" dense outlined hide-details="auto" readonly />
                </v-col>
              </v-row>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="right">
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="btnSave()">
            <v-icon>$save</v-icon>
            {{$t('save')}}
            <!-- SAVE -->
          </v-btn>
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="close()">
            <v-icon>$cancel</v-icon>
            {{$t('cancel')}}
          </v-btn>
        </v-col>
      </v-row>
    </DxScrollView>
  </DxPopup>
</template>
  
  <script>
import { DxPopup } from 'devextreme-vue/popup'
import { DxScrollView } from 'devextreme-vue/scroll-view'
import { getDateFormat } from '@/utils/common.js'
import DxDateBox from 'devextreme-vue/date-box'

export default {
  name: 'test',
  // mixins: [baseview, BaseDataGrid],

  components: {
    DxPopup,
    DxScrollView,
    DxDateBox
  },
  props: {
    pop1Visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pop1Visible() {
      this.visible(this.pop1Visible)
    }
  },
  computed: {},
  data() {
    return {
      reqDtFrom: '',
      popVisible: false,
      AccountEditing: false,
      //콤보박스 리스트
      facCodeList: [],
      meaGrList: [],
      meaGradeList: [],
      meaStateList: [],
      corrYNList: [],
      depCodeList: [],
      id: '',
      comCode: '',
      facCode: '',
      meaGr: '',
      meaCode: '',
      meaName: '',
      meaSpec: '',
      meaGrade: '',
      meaState: '',
      depCode: '',
      name: '',
      assNo: '',
      proCom: '',
      supCom: '',
      manuDate: '',
      purDate: '',
      corrYN: '',
      corrAgency: '',
      corrMonth: '',
      corrsDate: '',
      correDate: '',
      corrStd: '',
      corrMax: '',
      corrMin: '',
      modelNo: '',
      remark: '',
      userFlag: '',
      makeDate: '',
      maker: '',
      editDate: '',
      editor: '',
      created: false,
      modified: false,
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 }
    }
  },
  methods: {
    visible(e) {
      this.popVisible = e
    },
    btnSave() {
      let items = {
        popupData: [
          {
            id: this.id,
            comCode: this.comCode,
            facCode: this.facCode,
            meaGr: this.meaGr,
            meaCode: this.meaCode,
            meaName: this.meaName,
            meaSpec: this.meaSpec,
            meaGrade: this.meaGrade,
            meaState: this.meaState,
            depCode: this.depCode,
            mName: this.mName,
            assNo: this.assNo,
            proCom: this.proCom,
            supCom: this.supCom,
            manuDate: getDateFormat(this.manuDate),
            purDate: getDateFormat(this.purDate),
            corrYN: this.corrYN,
            corrAgency: this.corrAgency,
            corrMonth: this.corrMonth,
            corrsDate: getDateFormat(this.corrsDate),
            correDate: getDateFormat(this.correDate),
            corrStd: this.corrStd,
            corrMax: this.corrMax,
            corrMin: this.corrMin,
            modelNo: this.modelNo,
            remark: this.remark,
            userFlag: this.userFlag,
            makeDate: this.makeDate,
            maker: this.maker,
            editDate: this.editDate,
            editor: this.editor,

            __created__: this.created,
            __modified__: this.modified
          }
        ]
      }
      this.$emit('btnSave', items)
    },
    open(gbn, popupData, facCodeList, meaGrList, meaGradeList, meaStateList, depCodeList, corrYNList) {
      this.popVisible = true
      this.id = popupData.id
      this.comCode = popupData.comCode
      this.facCode = popupData.facCode
      this.meaGr = popupData.meaGr
      this.meaCode = popupData.meaCode
      this.meaName = popupData.meaName
      this.meaSpec = popupData.meaSpec
      this.meaGrade = popupData.meaGrade
      this.meaState = popupData.meaState
      this.depCode = popupData.depCode
      this.mName = popupData.mName
      this.assNo = popupData.assNo
      this.proCom = popupData.proCom
      this.supCom = popupData.supCom
      this.manuDate = popupData.manuDate
      this.purDate = popupData.purDate
      this.corrYN = popupData.corrYN
      this.corrAgency = popupData.corrAgency
      this.corrMonth = popupData.corrMonth
      this.corrsDate = popupData.corrsDate
      this.correDate = popupData.correDate
      this.corrStd = popupData.corrStd
      this.corrMax = popupData.corrMax
      this.corrMin = popupData.corrMin
      this.modelNo = popupData.modelNo
      this.remark = popupData.remark
      this.userFlag = popupData.userFlag
      this.makeDate = popupData.makeDate
      this.maker = popupData.maker
      this.editDate = popupData.editDate
      this.editor = popupData.editor

      this.created = popupData.__created__
      this.modified = popupData.__modified__

      this.facCodeList = facCodeList
      this.meaGrList = meaGrList

      this.meaGradeList = meaGradeList
      this.meaStateList = meaStateList
      this.depCodeList = depCodeList
      this.corrYNList = corrYNList

      if (gbn == 'add') this.AccountEditing = false
      else this.AccountEditing = true
    },
    close() {
      this.$emit('close')
    }
  },
  created() {},
  beforeMount() {},
  mounted() {}
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
/deep/.dx-datebox.dx-auto-width .dx-texteditor-input,
.dx-datebox:not(.dx-texteditor-empty).dx-auto-width .dx-texteditor-input {
  margin: -3px;
}
/deep/.dx-texteditor-input,
.dx-texteditor.dx-editor-outlined {
  border-radius: 3px !important;
}
/deep/.dx-texteditor-input,
.dx-texteditor.dx-editor-outlined {
  border-color: rgb(135, 155, 119);
}
</style>