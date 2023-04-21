<template>
  <div class="d-flex">
    <v-file-input
      v-if="upload"
      ref="refFile"
      :label="`${fileType} ${$t('fileUpload')}`"
      class="pt-0 pr-1 uploadWidth"
      v-model="imgFile"
      outlined
      dense
      clearable
      type="file"
      :accept="fType"
      @change="fileUpload"
    />

    <v-btn v-if="refresh" text icon x-large color="blue darken-2" @click="clickRefresh()">
      <v-icon>mdi-cached</v-icon>
    </v-btn>

    <i-button
      v-for="btn in buttonList"
      :key="`btn_${btn.id}`"
      color="btn_bg"
      :iconPre="true"
      :icon="btn.icon"
      :text="btn.text"
      :role="`${btn.id}`"
      @click="clickButton(btn)"
    />

    <v-menu v-if="usePrint" content-class="report-menu" offset-y :close-on-click="true">
      <template v-slot:activator="{ on }">
        <!-- i-button 같은 템플릿으로 한번 감쌀경우 적용이 안되어 v-btn 사용 -->
        <v-btn
          class="rounded-0 ml-1 font-weight-bold pr-7 pl-1 pr-md-6"
          outlined
          v-on="on"
          color="btn_bg"
          :style="`height: 30px;`"
          fontWeight="13px"
          height="30px"
          max-height="30px"
          min-height="30px"
          :role="`${printButton.id}`"
        >
          <v-icon class="float-left" :color="fontColor">${{ printButton.icon }}</v-icon>

          <div class="float-center mx-1" :style="computedFontStyle">{{ printButton.text }}</div>
        </v-btn>
      </template>
      <div v-for="(reportbtn, index) in reportItems" :key="`btn_${reportbtn.role}`">
        <v-divider v-if="index !== 0" style />
        <v-btn
          width="100%"
          depressed
          text
          class="px-3"
          @click="clickButton(reportbtn)"
        >{{ reportbtn.title }}</v-btn>
      </div>
    </v-menu>
  </div>
</template>

<script>
import localStore from '@/utils/localStore'
import notify from 'devextreme/ui/notify' // message
import iButton from './iButton.vue'
import store from '@/store'

export default {
  components: { iButton },
  name: 'i-button-list',
  props: {
    useBtnList: {
      type: Array,
      default: () => ['']
    },
    refresh: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    fileType: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedFontStyle() {
      let fontColor = this.fontColor
      if (this.disabled) {
        fontColor = 'content'
      }
      return {
        color: '#000',
        'font-size': this.fontSize + 'px',
        'letter-spacing': '0.5px',
        'font-weight': this.fontWeight,
        'line-height': 1.8
      }
    }
  },
  data() {
    return {
      // icon은 assets/theme/vuetify/ 적용되고 있는 esg0x.js 참조
      buttonList: [
        { id: 'btnConfirm', text: 'confirm', icon: 'confirm' },
        { id: 'btnCancel', text: 'cancel', icon: 'confirmCancel' },
        { id: 'btnConfirmCancel', text: 'confirmCancel', icon: 'confirmCancel' },
        { id: 'btnHold', text: 'hold', icon: 'apply' },
        { id: 'btnExit', text: 'exit', icon: 'cancel' },
        { id: 'btnCreate', text: 'create', icon: 'pencil' },
        { id: 'btnExcel', icon: 'excel' },
        { id: 'btnInitialization', text: 'initialization', icon: 'pencil' },
        { id: 'btnCorrection', text: 'correction', icon: 'pencil' },
        { id: 'btnSearch', text: 'search', icon: 'search' },
        { id: 'btnAdd', text: 'plus', icon: 'plus' },
        { id: 'btnDeliAdd', text: 'deliPlus', icon: 'plus' },
        { id: 'btnSave', text: 'save', icon: 'save' },
        { id: 'btnDelete', text: 'delete', icon: 'delete' },
        { id: 'btnPrint', text: 'print', icon: 'print' },
        { id: 'btnClose', text: 'close', icon: 'close' },

        //{ id: 'btnCancel', text: 'cancel', icon: 'cancel' },
        { id: 'btnEditCancel', text: 'reload', icon: 'reload' },
        { id: 'btnCapture', text: 'camera', icon: 'camera' },
        { id: 'btnApply', text: 'apply', icon: 'apply' },
        { id: 'btnCopy', text: 'copy', icon: 'copy' },
        { id: 'btnChoice', text: 'choice', icon: 'choice' },
        { id: 'btnLoad', text: 'load', icon: 'save' },
        { id: 'btnTradePrint', text: 'tradePrint', icon: 'print' },
        { id: 'btnDeliveryPrint', text: 'deliverPrint', icon: 'print' },
        { id: 'btnRecvMatlsPrint', text: 'recvMatlsPrint', icon: 'print' },
        { id: 'btnDeliverStatus', text: 'deliverStatus', icon: 'copy' },
        { id: 'btnReceivingInfo', text: 'receivingInfoText', icon: 'list' },
        { id: 'btnMaterialSelection', text: 'materialSelection', icon: 'list' },
        { id: 'btnRefresh', text: 'refresh', icon: 'refresh' },
        { id: 'btnMove', text: 'move', icon: 'move' },
        { id: 'btnCreation', text: 'creationHistory', icon: 'list' },
        { id: 'btnShipmentHistory', text: 'otherShipmentHistory', icon: 'list' },
        { id: 'shipResult', text: 'shipResult', icon: 'list' },
        { id: 'inspectionStandard', text: 'inspectionStandard', icon: 'list' },
        { id: 'receiptAdd', text: 'receiptAdd', icon: 'plus' },
        { id: 'receiptCancel', text: 'receiptCancel', icon: 'cancel' },
        { id: 'shipmentCancel', text: 'shipmentCancel', icon: 'cancel' },
        { id: 'otherRelease2add', text: 'otherRelease2add', icon: 'plus' },
        { id: 'btnDeside', text: 'deside', icon: 'save' },
        { id: 'btnRegi', text: 'registration', icon: 'save' }
      ],
      progCd: this.$route.meta.proc_cd,
      menuId: this.$route.query == undefined ? '' : this.$route.query.selMenuid,
      savAh: '', //저장
      schAh: '', //조회
      delAh: '', //삭제
      exlAh: '', //엑셀출력(프린트)
      fn1Ah: '', //기능1
      fn2Ah: '', //기능2
      fn3Ah: '', //기능3
      usePrint: false,
      printButton: null,
      reportItems: [
        { role: 'pptx', title: 'PPT' },
        { role: 'pdf', title: 'PDF' },
        { role: 'docx', title: 'DOCX' },
        // { role: 'html', title: 'WEB'},
        { role: 'xls', title: 'EXCEL' }
      ],
      fontColor: '#000',
      imgFile: null,
      fType: 'image/png, image/jpeg, image/bmp'
    }
  },
  created() {
    // useBtnList에서 받은 id로 필터링
    this.buttonList = this.buttonList.filter(btn => {
      return this.useBtnList.includes(btn.id)
    })

    if (this.fileType != '') this.changeFileType(this.fileType)
  },
  mounted() {
    // this.getAuthority()
    // this.printSetting()
  },
  methods: {
    changeFileType() {
      console.log('changeFileType', this.fileType)
      let type
      switch (this.fileType) {
        case 'image':
          type = 'image/png, image/jpeg, image/bmp'
          break
        case 'excel':
          type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          break
        case 'pdf':
          type = 'application/pdf'
          break
      }
      this.fType = type
    },
    fileUpload(file) {
      if (file) {
        console.log('type ', file.type)
        console.log('fType ', this.fType)
        if (
          (this.fileType == 'image' && file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/bmp') ||
          (this.fileType == 'excel' && file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
          (this.fileType == 'pdf' && file.type != 'application/pdf')
        ) {
          this.$refs['refFile'].clearableCallback()
          notify(this.fileType + ' ' + this.$t('파일을 넣어주세요.'), 'error', 1500)
          return
        } else this.$emit('fileUpload', file)
      }
    },
    clickButton(targetButton) {
      this.$emit('btnClick', targetButton)
    },
    clickRefresh() {
      this.$emit('btnRefreshClick')
    },
    //각 메뉴별 조회, 추가, 저장, 삭제 정보 조회
    getAuthority() {
      // 조회 api
      // 사용자권한메뉴조회
      let authGrps = JSON.parse(localStore.get('myAuthGrps')).find(x => x.progCd == this.progCd && x.menuId == this.menuId)
      if (authGrps != null) {
        this.schAh = authGrps.schAh
        this.savAh = authGrps.savAh
        this.delAh = authGrps.delAh
        this.exlAh = authGrps.exlAh
      }

      //버튼권한별 View
      let authButtonList = this.buttonList.filter(btn => {
        if (
          (btn.id == 'btnSearch' && this.schAh == 'Y') ||
          (btn.id == 'btnAdd' && this.savAh == 'Y') ||
          (btn.id == 'btnSave' && this.savAh == 'Y') ||
          (btn.id == 'btnDelete' && this.delAh == 'Y') ||
          (btn.id == 'btnPrint' && this.savAh == 'Y') ||
          (btn.id == 'btnConfirm' && this.savAh == 'Y') ||
          (btn.id == 'btnApply' && this.savAh == 'Y') ||
          btn.id == 'btnCapture' ||
          btn.id == 'btnEditCancel' ||
          btn.id == 'btnCopy' ||
          btn.id == 'btnDataSearch'
        ) {
          return this.useBtnList.includes(btn.id)
        }
      })
      this.buttonList = authButtonList
    },

    // 레포트용 출력 설정
    printSetting() {
      let findIndex = this.buttonList.findIndex(element => element.id === 'btnPrint')
      this.buttonList
      if (findIndex > -1) {
        this.usePrint = true
        this.printButton = this.buttonList.find(element => element.id === 'btnPrint')
        this.reportItems.forEach(element => {
          Object.assign(element, this.printButton)
        })
        this.buttonList = this.buttonList.filter(element => element.id !== 'btnPrint')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .v-btn {
// background: #ffffff;
// }

.v-btn.v-size--default {
  font-size: 13px;
}

.report-menu {
  z-index: 10 !important;
}

.v-icon.v-icon {
  font-size: 20px;
  padding-right: 4px;
  padding-top: 3px;
}
.uploadWidth {
  width: 260px;
}
</style>
