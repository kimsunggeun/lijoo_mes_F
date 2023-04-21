<template>
  <DxPopup :dragEnabled="false" :visible.sync="popVisible" :show-close-button="true" :show-title="true"
    :title="$t('customerInfo')" height="700px" width="1000px" @hidden="close">
    <DxScrollView height="100%" width="100%">
      <v-row dense style="border-bottom: 1px solid black;">
        <v-col cols="auto">
          <span :style="btnTextStyle">{{ $t('mainItem') }}</span>
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
                  <span class="popupText">{{ $t('custCode') }} *</span>
                  <v-text-field v-model="custCode" dense outlined hide-details="auto" :readonly="AccountEditing"
                    background-color="#fff2e0" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('custName') }} *</span>
                  <v-text-field v-model="custName" dense outlined hide-details="auto" clearable
                    background-color="#fff2e0" />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('name') }}</span>
                  <v-text-field v-model="name" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('custTypeNm') }} *</span>
                  <v-select v-model="custType" :items="custCodes" item-value="sysCode" item-text="sysName" return-object
                    single-line clearable outlined dense class="popField" background-color="#fff2e0"></v-select>
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('matTypeNm') }} *</span>
                  <v-select v-model="matType" :items="matCodes" item-value="sysCode" item-text="sysName" return-object
                    single-line clearable outlined dense class="popField" background-color="#fff2e0"></v-select>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('comNumber') }}</span>
                  <v-text-field v-model="custNo" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('conType') }}</span>
                  <v-text-field v-model="conType" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('secType') }}</span>
                  <v-text-field v-model="secType" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('postNo') }}</span>
                  <v-text-field v-model="postNo" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('addr') }}</span>
                  <v-text-field v-model="addr" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('tel') }}</span>
                  <v-text-field v-model="tel" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('fax') }}</span>
                  <v-text-field v-model="fax" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('email') }}</span>
                  <v-text-field v-model="email" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('manName') }}</span>
                  <v-text-field v-model="manName" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <span class="popupText">{{ $t('manTel') }}</span>
                  <v-text-field v-model="manTel" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <span class="popupText">{{ $t('manAddr') }}</span>
                  <v-text-field v-model="manAddr" dense outlined hide-details="auto" clearable />
                </v-col>
                <v-col cols="6">
                  <!-- 사용유무 -->
                  <span class="popupText">{{ $t('userFlag') }}</span>
                  <v-checkbox v-model="userFlag" :label="`${userFlag ? $t('use') : $t('unused')} `"></v-checkbox>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <span class="popupText">{{ $t('remark') }}</span>
                  <v-text-field v-model="remark" dense outlined hide-details="auto" clearable />
                </v-col>
              </v-row>
              <v-row dense style="border-bottom: 1px solid black; margin-top: 10px;">
                <v-col cols="auto">
                  <span :style="btnTextStyle">{{ $t('registrantInfo') }}</span>
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
          <v-btn tile outlined width="80px" class="releaseBtn" ref="cancelBtn" @click="btnSave('거래처')">
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
import { DxScrollView } from "devextreme-vue/scroll-view";

export default {
  name: 'test',
  // mixins: [baseview, BaseDataGrid],

  components: {
    DxPopup,
    DxScrollView,
  },
  props: {
    pop2Visible: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    pop2Visible() {
      this.visible(this.pop2Visible)
    }
  },
  computed: {
  },
  data() {
    return {
      popVisible: false,
      AccountEditing: false,
      matCodes: [],
      custCodes: [],
      id: '',
      comCode: '',
      custCode: '',
      custName: '',
      custType: '',
      matType: '',
      custNo: '',
      name: '',
      conType: '',
      secType: '',
      postNo: '',
      addr: '',
      tel: '',
      fax: '',
      email: '',
      manName: '',
      manTel: '',
      manAddr: '',
      userFlag: '',
      remark: '',
      makeDate: '',
      maker: '',
      editDate: '',
      editor: '',
      created: false,
      modified: false,
      btnTextStyle: { color: '#000', 'font-size': '18px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
    }
  },
  methods: {
    visible(e) {
      this.popVisible = e
    },
    btnSave(gbn) {
      let items = {
        gbn: gbn,
        popupData: [{
          id: this.id,
          comCode: this.comCode,
          custCode: this.custCode,
          custName: this.custName,
          custType: this.custType.sysCode ? this.custType.sysCode : this.custType,
          matType: this.matType.sysCode ? this.matType.sysCode : this.matType,
          custNo: this.custNo,
          name: this.name,
          conType: this.conType,
          secType: this.secType,
          postNo: this.postNo,
          addr: this.addr,
          tel: this.tel,
          fax: this.fax,
          email: this.email,
          manName: this.manName,
          manTel: this.manTel,
          manAddr: this.manAddr,
          userFlag: this.userFlag,
          remark: this.remark,
          makeDate: this.makeDate,
          maker: this.maker,
          editDate: this.editDate,
          editor: this.editor,
          __created__: this.created,
          __modified__: this.modified
        }]
      }
      this.$emit('btnSave', items)
    },
    open(gbn, popupData, custCodes, matCodes) {
      this.popVisible = true
      this.id = popupData.id
      this.comCode = popupData.comCode
      this.custCode = popupData.custCode
      this.custName = popupData.custName
      this.custType = popupData.custType
      this.matType = popupData.matType
      this.custNo = popupData.custNo
      this.name = popupData.name
      this.conType = popupData.conType
      this.secType = popupData.secType
      this.postNo = popupData.postNo
      this.addr = popupData.addr
      this.tel = popupData.tel
      this.fax = popupData.fax
      this.email = popupData.email
      this.manName = popupData.manName
      this.manTel = popupData.manTel
      this.manAddr = popupData.manAddr
      this.userFlag = popupData.userFlag
      this.remark = popupData.remark
      this.makeDate = popupData.makeDate
      this.maker = popupData.maker
      this.editDate = popupData.editDate
      this.editor = popupData.editor
      this.created = popupData.__created__
      this.modified = popupData.__modified__

      this.custCodes = custCodes
      this.matCodes = matCodes

      if (gbn == 'add')
        this.AccountEditing = false
      else
        this.AccountEditing = true
    },
    close() {
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
</style>