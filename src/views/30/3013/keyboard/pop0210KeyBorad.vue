<template >
  <v-row ref="keyBorad" @mouseover="bbb()" @click="ccc($event)" class="keypadNumber" >

  <v-col cols="2" v-for="(i,j) in NumberValue" :key="j">
  <v-btn
  depressed
  @click="aaa(i)"
  class="pa-4"
  width="100%"
  color="primary">
    {{ i.name }}
  </v-btn>
</v-col>

</v-row>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup'
import iCardVertical from '@/components/common/iCardVertical.vue'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing, DxSelectionm, DxPager, DxPaging } from 'devextreme-vue/data-grid'
import { getComCode } from '@/utils/token'
import { getpartNo, getwhNm, getwork, getWorkProcess, getstock } from '@/api/view/pop0310'
import { getBas0035 } from '@/api/view/pro0050'
import { getFacCode } from '@/api/system/companyManage'
import { getProcInfo } from '@/api/view/bas0031'
import notify from 'devextreme/ui/notify'
export default {
  components: {
 
  },
  props:{
    Qty : Number,
    focusInput:Boolean

  },

  data() {
    return {
      NumberValue:[
        {name: 1 ,value : 1} ,
        {name: 2 ,value : 2} ,
        {name: 3 ,value : 3},
        {name: 4 ,value : 4},
        {name: 5 ,value :5},
        {name: 6 ,value : 6},
        {name: 7 ,value : 7},
        {name: 8 ,value : 8},
        {name: 9 ,value : 9},
        {name: 0 ,value : 0},
        {name:'닫기' , value:false},
        {name:'초기화',value:'초기화'}
      ],


   
    }
  },
  beforemounted() {
    document.addEventListener('click', this.handleOutsideClick);

  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);

  },



  methods: {
    handleOutsideClick(event) {
 
      if (this.$refs.keyBorad.contains(event.target) === false) {
       this.$emit('outsideClick')
    }
    },
    
    
    aaa(e){
      this.$emit('focusInput',e)
    },
    bbb(){
      this.$emit('mouseHover',true)
    },
    ccc(e){

      this.$emit('mouseOut',[e.currentTarget,this.$refs.keyBorad])
 
    }
  }
}
</script>
<style scoped>

  .keypadNumber{
    z-index: 999;
    position: absolute;
    background:#F9F9F9;
  }





</style>