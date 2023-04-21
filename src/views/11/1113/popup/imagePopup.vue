<template>
    <DxPopup
        :show-title="true"
        :title="$t('ReserveStockImage')"
        :visible.sync="popupVisible"
        :hide-on-outside-click="hideOnOutsideClick"
        :scrollingEnabled="true"
        :max-width="1000" :min-width="500"
        :height="700"
        @hidden="onHidden"
        :max-height="'calc(100% - 28px)'"
        :show-close-button="true"
    >
        <div class="imageClass">
            <img :src="image"> 
        </div>
    </DxPopup>
  
</template>

<script>
import {DxPopup} from 'devextreme-vue/popup'
export default {
    name:'imagePopup',
    components:{
        DxPopup
    },
    data(){
        return{
            title:'',
            popupVisible:false,
            image:''
        }
    },
    methods:{
        hideOnOutsideClick(e) {
            this.popupVisible = false
            return e.target === document.getElementsByClassName("dx-overlay-wrapper dx-popup-wrapper dx-overlay-modal dx-overlay-shader")[0];
        },
        open(item){
            console.log(item)
            this.image = item.data.blobUrl
            this.popupVisible = true
        },        
        onHidden(e) {
            console.log('onHidden')
            // Handler of the 'hidden' event
            this.popupVisible = false
        },
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
.imageClass img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

</style>