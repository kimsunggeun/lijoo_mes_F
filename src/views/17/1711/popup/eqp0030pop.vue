<template>
    <DxPopup 
        :dragEnabled="true" 
        :visible="showAddEqp0030" 
        :title="`${tab === '10' ? '일상점검' : '정기점검'} 추가`"
        :show-close-button="true" 
        :show-title="true"
        height="120px" 
        width="315px"
        container=".v-application"
        @hidden="onHidden"
    >
        <div class="d-flex align-center">
            <span class="pr-1">검사일 :</span>
            <DxDateBox v-model="inspDate" display-format="yyyy-MM-dd" width="120" class="popupDate" />
            <iButton color="btn_bg" :text="'검사 생성'" :iconPre="true" :icon="'confirm'" @click="ok" />
        </div>
    </DxPopup>
</template>

<script>
import baseview from '@/components/base/baseview'
import { DxPopup } from 'devextreme-vue/popup'
import DxDateBox from 'devextreme-vue/date-box'
import iButton from '@/components/common/iButton'

import { getEqp0020grd } from '@/api/view/eqp0020'
import { getEqp0030Detail } from '@/api/view/eqp0030'
import { getCurrentDate } from '@/utils/common'

export default {
    name: 'eqp0030pop',
    mixins: [baseview],
    components: {
        DxPopup,
        DxDateBox,
        iButton
    },
    props: {
        showAddEqp0030: {
            type: Boolean,
            default() {
                return false
            }
        },
        tab: {
            type: String,
            default() {
                return ''
            }
        },
        params: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    watch: {
        showAddEqp0030: {
            handler(newVal, oldVal) {
                this.init(newVal)
            },
            immediate: true
        }
    },
    data() {
        return {
            inspDate: ''
        }
    },
    methods: {
        init(val) {
            if(val) {
                this.inspDate = getCurrentDate()
            } else {
                this.inspDate = ''
            }
        },
        async ok() {
            this.params.eqInsType = this.tab
            this.params.userFlag = 'Y'
            
            if(!await this.checkCnt()) {
                return
            }
            
            this.openLoading()
            await getEqp0020grd(this.params).then(res => {
                // console.log('params', this.params)
                // console.log('res', res)

                this.$emit('ok', {
                    date: this.inspDate,
                    list: res.list
                })
            }).finally(() => {
                this.endLoading()
            })
        },
        async checkCnt() {
            let result = false

            const param = {
                comCode: this.params.comCode,
                facCode: this.params.facCode,
                eqCode: this.params.eqCode,
                inspDate: this.inspDate,
                eqInsType: this.tab
            }

            await getEqp0030Detail(param).then(res => {
                // console.log('getEqp0030DetailRes', res)

                if(res.list.length < 1) {
                    result = true
                } else {
                    this.vToastify('해당 검사일 데이터가 있습니다.<br>점검 데이터 삭제 후 생성해주세요.', 'warn')
                }
            })

            return result
        },
        onHidden(e) {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>