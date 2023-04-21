<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'">
    <v-row no-gutters class="header pa-3">
      <v-col cols="5">
        <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
        <span class="headerText2">{{ $t('outOfProcessForwarding') }}</span>
      </v-col>
      <v-col class="d-flex">
        <span class="headerText3"><v-icon class="mr-1 green_icon">$calendar_clock</v-icon>{{
          display.time.year +
            '-' +
            display.time.month +
            '-' +
            display.time.day +
            ' [' +
            display.time.week +
            '] ' +
            display.time.hour +
            ':' +
            display.time.minutes +
            ':' +
            display.time.second
        }}</span>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn width="40" height="40" color="RefreshBtn" class="mr-1" @click="totalRefresh()">
          <v-icon color="white" size="40px"> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <!-- 외주처 -->
      <v-col cols="5" class="pa-2">
        <i-card-vertical headerTitle="selectSubcontractor">
          <template v-slot:body>
            <v-row>
              <!-- 거래처 선택 -->
              <v-col cols="6" class="pa-1 pt-1 pb-2">
                <v-autocomplete
                  :label="$t('customerSelect')"
                  v-model="custCodeInput"
                  :items="custCodeList"
                  item-text="text"
                  item-value="value"
                  outlined
                  dense
                  height="32"
                  @change="handlerSearchMain"
                />
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
      <!-- 입고 정보 -->
      <v-col cols="7" class="pa-2">
        <i-card-vertical 
          headerTitle="outsourcingDetails"
        >
          <template v-slot:body>
            <v-row>
              <v-col cols="4" class="pa-1 pt-1 pb-2">
                <v-text-field 
                  :label="$t('lotDetail')" 
                  v-model="lotDetailInput"
                  outlined 
                  dense 
                  height="32"
                  @keyup.enter="handlerSearchMain"
                />
              </v-col>
            </v-row>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <!-- 외주출고상세 Grid -->
    <v-row no-gutters>
      <v-col class="pa-2">
        <i-card-vertical 
          headerTitle="" 
          :useBtnList="['btnSave', 'btnCancel']" 
          @btnSave="btnSave"
          @btnCancel="btnCancel"
        >
          <template v-slot:body>
            <!-- 전산번호 입력 -->
            <v-layout column>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="outSourcingProcess"
                  class="listBox06"
                  :ref="outSourcingProcessRef"
                  :data-source="outSourcingProcessData"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :disablePagination="false"
                  :column-hiding-enabled="false"
                  :column-auto-width="true"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn 
                    data-field="comCode" 
                    :caption="$t('comCode')" 
                    width="auto"
                    :visible="false" 
                  />
                  <DxColumn 
                    data-field="partNo" 
                    :caption="$t('partCode')" 
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="partName" 
                    :caption="$t('partName')" 
                    data-type="string" 
                    width="auto"
                    alignment="center"
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="lotDetail" 
                    :caption="$t('lotDetail')" 
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="qty" 
                    :caption="$t('lotAmount')" 
                    data-type="string" 
                    width="auto"
                    alignment="center"
                    :allow-editing="false" 
                  />
                  <DxColumn 
                    data-field="workDename" 
                    :caption="$t('workDetail')" 
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    data-field="lotNo" 
                    :caption="$t('lotNumber')" 
                    data-type="string"
                    width="auto"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn 
                    width="auto"
                  />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxGrouping, DxEditing } from 'devextreme-vue/data-grid'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import IButton from '../../../components/common/iButton.vue'

import { getFactoryInfoData } from '@/api/view/bas0030'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import { getAccount } from '@/api/view/mat0010'
import { getPop0110, setPop0110} from '@/api/view/pop0110'

export default {
  name: 'pop0110',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxDataGrid,
    DxColumn,

  },
  data() {
    return {
      //유저정보
      userData: {
        company: getComCode(),
        factory: {
          code: ''
        },
        name: ''
      },
      //화면표시 데이터
      display: {
        company: '',
        factory: '',
        time: {
          year: '00',
          month: '00',
          day: '00',
          week: '',
          hour: '00',
          minutes: '00',
          second: '00'
        }
      },
      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000 // 지연시간
      },
      errorCode: 0,
      state: this.$store.state.app.isScreenFull,
      custCodeInput: '',
      custCodeList: [],
      outSourcingProcessRef: 'outSourcingProcessRef',
      outSourcingProcessData: [],
      lotDetailInput: '',
      facCodeData: '',
      transData:[]
    }
  },
  beforeMount() {
    let param = {
      comCode: getComCode(),
    }
    getAccount(param).then(res =>{
      res.list.forEach(e =>{
        this.custCodeList.push({
          value: e.custCode,
          text: e.custName
        })
      })
    })
  },
  computed: {
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    griMainInstance() {
      return this.GetDataGrid(this.outSourcingProcessRef)
    }
  },
  mounted() {
    this.dataSettting()
    this.nowTime()
  },
  destroyed() {
    clearInterval(this.timeFunc)
  },
  methods: {
    nowTime() {
      this.timeFunc = setInterval(() => {
        let date = new Date()
        this.display.time.year = date
          .getFullYear()
          .toString()
          .substr(2)
        this.display.time.month = String(date.getMonth() + 1).padStart(2, '0')
        this.display.time.day = String(date.getDate()).padStart(2, '0')
        this.display.time.week = this.$t(`weekArray[${date.getDay()}]`)
        this.display.time.hour = String(date.getHours()).padStart(2, '0')
        this.display.time.minutes = String(date.getMinutes()).padStart(2, '0')
        this.display.time.second = String(date.getSeconds()).padStart(2, '0')
      }, this.timeCounter.delay)
    },
    //새로고침
    async totalRefresh() {
      this.outSourcingProcessData = []
      this.lotDetailInput = ''
      this.custCodeInput = []
      notify('refresh', 'success', 1500)
    },

    //공장명, 날짜 시간 출력 구문
    async dataSettting() {
      try {
        let params = {
          comCode: getComCode(),
          userId: getUserId()
        }
        let resData = await getCompany(params)
        let userFacData = await getUser(params)
        let factoryList = await getFactoryInfoData(params)

        this.facCodeData = factoryList.list[0].facCode
        this.userData.factory.code = userFacData.list[0].facCode
        // this.userData.name = userFacData.list[0].userName
        this.display.company = resData.list[0].comName
        let factoryFilterData = factoryList.list.filter(word => word.facCode === this.userData.factory.code)
        this.display.factory = factoryFilterData[0].facName
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    async handlerSearchMain() {
      let params = {
        comCode: getComCode(),
        facCode: this.facCodeData,
        lotDetail: this.lotDetailInput  //== null ? '' : this.lotDetailInput.toString()
      }
      let listData = await getPop0110(params)
      listData.list.forEach((e) => {
        e.id = this.outSourcingProcessData.length + 1
        e.custCode = this.custCodeInput
      })
      //중복값
      let found  =  this.outSourcingProcessData.find(obj=>obj.lotDetail === this.lotDetailInput)
      if(found) {
        return notify('중복된 값이 있습니다.', 'error', 1500), this.lotDetailInput = ''
      } 
      //입고처 선택 알림
      if(this.custCodeInput === '') {
        return  notify('외주처를 선택해주세요.', 'error', 1500) , this.lotDetailInput = ''
      }
      for(let i in listData.list) {
        this.griMainInstance.newRow(listData.list[i])
        this.griMainInstance.selectRows(listData.list[i].id, true)
      }
      this.lotDetailInput = ''
    },
    async btnSave() {
      if(this.custCodeInput !== '') {
        if(this.outSourcingProcessData == '') {
          notify('전산번호를 입력해주세요', 'error', 1500)
        } else {
          await this.griMainInstance.saveEditData()
          let selectedMainRows = await this.griMainInstance.getSelectedRowsData()
          this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          () => {
            this.openLoading()
            setPop0110(selectedMainRows).then(res => {
              if(res.success) {
                notify(this.$t('Saved'), 'success', 1500)
                this.outSourcingProcessData = []
              } else {
                this.vToastify(res.msg,'warn')
              }
            })
            .catch(error => {
              notify(error, 'error', 1500)
            })
            .finally(() => {
              this.griMainInstance.endUpdate()
              this.griMainInstance.clearSelection()
              this.endLoading()
            })
          },
          null,
          true
          )
        }
      } else {
        notify('외주처를 선택해주세요', 'error', 1500)
      }
    },
    async btnCancel() {
      let selectedMainRows = await this.griMainInstance.getSelectedRowsData()

      if(!selectedMainRows.length) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
      } else {
        this.vToastifyPrompt(
          this.$t('취소하시겠습니까?'),
          'info', 
          (current) => {
            for(let i in selectedMainRows) {
              this.outSourcingProcessData = this.outSourcingProcessData.filter(el => el.id !== selectedMainRows[i].id)
            }
            notify('취소 되었습니다.', 'success', 1500)
          }
        ),
        null,
        true
      }
    }, 
  }
}
</script>
<style lang="scss" scoped>
.span {
  text-align: center;
}
.btnStyle {
  text-align: right;
}
</style>
