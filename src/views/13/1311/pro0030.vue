<template>
  <div>
    <p>테스트화면입니다.</p>
    <DxDateBox
      :value="reqDtFrom"
      display-format="yyyy-MM-dd"
      height="90%"

      @value-changed="
      (e) => {
       alert('dd')
                        
          }"
    />
    <div>선택날짜는 {{reqDtFrom}} 입니다.</div>

    
    
  </div>
</template>

<script>
import ICardVertical from '@/components/common/iCardVertical.vue'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getPro0020, createPro0020, delPro0020 } from '@/api/view/pro0020'
import { getUserId, getComCode } from '@/utils/token'
import DxDateBox from 'devextreme-vue/date-box'
import { DxPopup } from 'devextreme-vue/popup'
export default {
    components: {
    DxDateBox,
  },
  data(){
    return {
      reqDtFrom:new Date()
    }
  },
  methods: {
        change(e) {
           this.reqDtFrom = e.value
         
        }
    }
}
</script>

<style>
</style>