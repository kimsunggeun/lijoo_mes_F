<template>
  <v-card fill-height rounded>
    <v-card-title class="font-weight-bold card_title--text text-lg-h6 text-sm-h5 body-1 pa-0">
      {{ $t(headerTitle) + (headerTitle2 != '' ? ' (' + headerTitle2 + ')' : '') }}

      <i-search-panel :searchPanel="searchPanel"></i-search-panel>
      <slot name="radioTag" v-if="radio"> {{}} </slot>
      <slot name="inputTag" v-if="input"> {{}} </slot>
      <div v-if="IsUseAddition" class="additionCss"><slot name="addition"> </slot></div>
 
      <v-spacer v-if="!input"/>

      <slot name="switch"> </slot>
      <i-button-list
        :useBtnList="useBtnList"
        :refresh="refresh"
        :upload="upload" 
        :fileType="fileType"
        @fileUpload="fileUpload"
        @btnRefreshClick="clickRefresh"
        @btnClick="clickButton"
      />
    </v-card-title>
    <!-- <v-divider class="mx-2" v-if="divider"></v-divider> -->
    <v-card-text class="pa-0 pt-1">
      <!-- <i-system-bar></i-system-bar> -->
      <slot name="body"> {{}} </slot>
    </v-card-text>
  </v-card>
</template>

<script>
import iButtonList from './iButtonList.vue'
import iSearchPanel from '@/components/common/iSearchPanel.vue'
import iSystemBar from '@/components/common/iSystemBar.vue'

export default {
  name: 'i-card-vertical',
  components: {
    // 'i-system-bar': iSystemBar,
    iButtonList,
    iSearchPanel,
  },
  props: {
    headerTitle: {
      type: String,
      default: '제목',
    },
    headerTitle2: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'card_bg',
    },
    divider: {
      type: Boolean,
      default: false,
    },
    // 버튼 리스트
    useBtnList: {
      type: Array,
      default: () => [''],
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    IsUseAddition: {
      type: Boolean,
      default: false,
    },
    upload: {
      type: Boolean,
      default: false,
    },
    fileType: {
      type: String,
    },
    radio: {
      type: Boolean,
      default: false,
    },
    input: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchPanel: false,
    }
  },
  mounted() {
    this.foundGridComponent()
  },
  methods: {
    fileUpload(file) {
      this.$emit('fileUpload', file)
    },
    // 버튼 클릭 시 각 id별로 이벤트생성
    clickButton(targetButton) {
      this.$emit(targetButton.id)
    },
    clickRefresh() {
      this.$emit('btnRefreshClick')
    },
    foundGridComponent() {
      // 그리드 찾기
      let childrenCompoent = this.$children[0].$children
      let gridComponent = childrenCompoent.find((element) => {
        return element.instance ? element.instance.NAME === 'dxDataGrid' || element.instance.NAME === 'dxTreeList' : false
      })
      this.searchPanel = !!gridComponent
    },
  },
}
</script>

<style lang="scss" scoped>
.additionCss {
  font-size: medium;
  font-weight: 600;
  margin-left: 5px;
  color: #222;
}
</style>
