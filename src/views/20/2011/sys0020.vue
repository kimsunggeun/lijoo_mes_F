<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0 pl-0 pb-0">
        <i-card-top class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row>
              <v-col cols="3" class="pa-2 pt-0 pb-0">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="mt-2"
                  v-model="gubun"
                  label="구분"
                  :items="gubunList"
                  item-text="matNm"
                  item-value="matCd"
                  :prepend-inner-icon="`$search`"
                  dense
                  outlined
                  multiple
                  clearable
                />
              </v-col>
            </v-row>
          </template>
        </i-card-top>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4" class="pa-2">
        <i-card-vertical headerTitle="permissionGroupInfo" 
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
          ]"
          @btnAdd="btnAdd()"
          @btnSave="btnSave('permission')"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <DxDataGrid
                id="permissionGroupInfo"
                class="listBox"
                :ref="permissionGroupInfoRef"
                :data-source="permissionGroupInfo"
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
                :column-hiding-enabled="false"
                @cellClick="listClick"
                @editing-start="mainEditingStart"
              >
                <DxScrolling column-rendering-mode="virtual"/>
                <DxColumn data-field="perCode" :caption="$t('permissionGroup')" width="48%" data-type="string" alignment="left" />
                <DxColumn data-field="perName" :caption="$t('perName')" width="48%" data-type="string" alignment="left" />
                <DxColumn data-field=""  caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                <DxPaging :enabled="false"/>
                <DxSelection
                    mode="single"
                    :allow-select-all="false"
                />

              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="8" class="pa-2">
        <i-card-vertical headerTitle="menuList" 
          :useBtnList="[
              'btnSave', //저장
            ]"
            @btnSave="btnSave('menuList')"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <DxTreeList
                id="menuList"
                class="TreeListBox"
                :ref="menuListRef"
                :data-source="menuList"
                :hover-state-enabled="true"
                :allow-column-resizing="true"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="true"
                :width="grid.width"
                :show-row-lines="true"
                key-expr="id"
                parent-id-expr="headId"
                :focused-row-enabled="true"
                :column-hiding-enabled="false"
                :autoExpandAll="true"
                :selection="{ mode:'multiple' , recursive:true }"
                :selected-row-keys="rowKey"
                :expanded-row-keys="expandedRowKeys"
                @selection-changed="onSelectionChanged"
              >
                <DxScrolling column-rendering-mode="virtual"/>
                <DxColumn data-field="menuName" :caption="$t('menuName')" :customize-text="column_customizeText" width="auto" data-type="string" alignment="left" :allow-editing="false" />
                <DxPaging :enabled="true" :page-size="10"/>
              </DxTreeList>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import iCardVertical from '@/components/common/iCardVertical.vue'
  import iPageTitle from '@/components/common/iPageTitle.vue'
  import iDataTable from '@/components/common/iDataTable.vue'
  import ISystemBar from '@/components/common/iSystemBar.vue'
  import ICardTop from '@/components/common/iCardTop.vue'
  import { DxDataGrid, DxColumn , DxScrolling , DxGrouping , DxEditing } from 'devextreme-vue/data-grid'
  import { DxTreeList } from 'devextreme-vue/tree-list';
  import DxDateBox from 'devextreme-vue/date-box'
  import baseview from '@/components/base/baseview.vue' // base page 추가
  import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
  import notify from 'devextreme/ui/notify' // message

  import { getAuthGroup , getMenuAuthGroup , createAuthGroup , createMenuAuthGroup } from '@/api/view/sys0020'
  import { getMenuList } from '@/api/view/sys0021'

  import { getUserId, getComCode } from '@/utils/token'
import { from } from 'rxjs'

  export default {
    name: 'sys0020',
    mixins: [baseview, BaseDataGrid],
    components: {
      'i-card-vertical': iCardVertical,
      ISystemBar,
      ICardTop,
      DxDataGrid,
      DxColumn,
      DxScrolling,
      DxEditing,
      DxDateBox,
      DxTreeList
    },
    data() {
      return {
        gubun: '',
        gubunList: ['MES'],
        permissionGroupInfo: [],
        permissionGroupInfoRef: 'permissionGroupInfoRef',

        menuList: [],
        menuListRef: 'menuListRef',
        rowKey: [],

        expandedRowKeys:[],
        editing: true,
        perCode: '',

        //추가선택 메뉴
        addSelect: [],
        //선택해제 메뉴
        deselect: []
      }
    },
    created() {
      // this.$EventBus.$on('lanCode', e => {
      //   console.log("EVENT : " , e)
      //   this.doSearchMenuList(this.perCode)
      // })
    },
    computed: {
      gridMainInstance() {
        return this.GetDataGrid(this.permissionGroupInfoRef)
      },
      gridDetaillInstance() {
        return this.GetDataGrid(this.menuListRef)
      },
    },
    mounted() {
      this.doSearchMain()
    },
    methods:{
      mainEditingStart(e){
        if (e.data.__created__ === false) {
        if (e.column.dataField === 'perCode') {
          e.cancel = true
        }
      }
      },
      doSearchMain(isProgress){
        this.permissionGroupInfo = []
        this.openLoading('searching')
        let params = {
          comCode: getComCode(),
        }
        getAuthGroup(params).then(res => {
          // console.log("RES : " , res)
          res.list.forEach(e => {
            e.__modified__ = false
            e.__created__ = false
          });
          this.permissionGroupInfo = res.list
        }).finally(() => {
          this.endLoading()
        })
      },
      doSearchMenuList(e){
        this.menuList = []
        this.openLoading('searching')
        // console.log(">>>>>>>>>>>>" , this.$localStore.get('locale'))

        let params = {
          comCode: getComCode(),
          perCode: e,
          lanCode: this.$localStore.get('locale')
        }
        getMenuAuthGroup(params).then(res => {
          console.log("RES Menu : " , res)
          
          this.menuList = []
          this.rowKey = []
          let listData = []
          let expRowkeys = []
          this.gridDetaillInstance.clearSelection()
          // this.expandedRowKeys = []

          res.list.forEach(e => {
            if(e.paCode === null || e.paCode === ''){
              e.id = e.menuCode
              // e.id = cnt
              e.headId = 0
              listData.push(e)
            }else if((e.paCode !== null || e.paCode !== '') && (e.pgCode === null || e.pgCode === '')){
              e.id = e.menuCode
              e.headId = e.paCode
              // e.headId = 1
              listData.push(e)
            }else if(e.paCode !== null && e.pgCode !== null){
              e.id = e.menuCode
              e.headId = e.paCode
              // e.headId = 1
              listData.push(e)
            }
            if(e.userFlag == "Y"){
              if((e.pgCode !== null && e.pgCode !== '') && (e.paCode !== null && e.paCode !== ''))
                this.rowKey.push(e.menuCode)
              
              let oneRow = res.list.filter((v, i) => (e.moduleCode === v.moduleCode)).length
              // console.log('oneRow : ',oneRow)
              if(oneRow == 1)
                this.rowKey.push(e.menuCode)
            }
            expRowkeys.push(e.menuCode)
          });
          this.expandedRowKeys = expRowkeys
          // console.log('expandedRowKeys >> ',this.expandedRowKeys)
          this.menuList = listData
        }).finally(() => {
          this.endLoading()
        })
      },
      column_customizeText(cellInfo) {
        return cellInfo.value//this.$t(cellInfo.value)
      },
      listClick(e){
        console.log('listClick',e)
        if(e.data.perCode != this.perCode)
          this.gridDetaillInstance.clearSelection()
          
          this.perCode = e.data.perCode
          this.doSearchMenuList(this.perCode)
          
      },
      btnAdd(gbn) {
        let newRow = {
          id: this.permissionGroupInfo.length + 1, sysType: '', perCode: '', perName: '',
          makeDate: '', maker: getUserId(), editDate: '', editor: '', __modified__: false, __created__: true

        }
        this.gridMainInstance.newRow(newRow)
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 0)
        this.gridMainInstance.option('focusedRowKey', this.gridMainInstance.option('dataSource').length)
        // this.editing = true
      },
      async btnSave(gbn) {
        if(gbn === 'permission') {
          let messageGubun = ''
          this.gridMainInstance.saveEditData()
          var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()

          //유효성 체크
          if (!selectedMainRows.length) {
            this.vToastify(this.$t('SelectCheck'), 'warn')
            return
          }
          for(var row of selectedMainRows){
            if (row.perCode === '' ) {
              this.vToastify(this.$t('sys0020AddCheck'), 'warn')
              return
            }
            if (row.__created__ === false) {
              messageGubun = 'doFixData'
              row.__modified__ = true
              row.comCode = getComCode()
              row.editor = getUserId()
              row.sysType = 'MES'
            } else if(row.__created__ === true) {
              messageGubun = 'doSaveData'
              row.comCode = getComCode()
              row.userFlag = 'Y'
              row.maker = getUserId()
              row.sysType = 'MES'
            }
          }

          this.vToastifyPrompt(
            this.$t(messageGubun),
            'info',
            current => {
              this.openLoading()
              this.gridMainInstance.beginUpdate()
              createAuthGroup(selectedMainRows, true)
                .then(res => {

                })
                .catch(error => {
                  console.log("error : " , error)
                  this.endLoading()
                })
                .finally(() => {
                  this.gridMainInstance.endUpdate()
                  // this.editing = false
                  this.endLoading()
                  let message = ''
                  message = selectedMainRows[0].__created__ == true ? 'Saved' :  'changed'
                  notify(this.$t(message), 'success', 1500)
                  // this.gridMainInstance.clearSelection()
                  this.doSearchMain()
                })
            },
            null,
            true
          ) 
        } else if(gbn === 'menuList') {
          this.gridDetaillInstance.saveEditData()
          let updateData = []
          let menuData = this.menuList
          let deselect = []
          var selectedMainRows = await this.gridDetaillInstance.getSelectedRowsData('all')

          // console.log("updateData" , updateData)

          deselect = this.deselect.filter((v, i) => 
            this.deselect.findIndex(x => x === v) === i);

            selectedMainRows.forEach(e => {

              this.menuList.filter((menu) => {
                if(menu.menuCode == e.menuCode || menu.menuCode == e.paCode || menu.menuCode == e.moduleCode){
                  if(menu.userFlag !== 'Y') {
                    if(menu.perCode === null) {
                      menu.userFlag = 'Y'
                      menu.__modified__ = false
                      menu.__created__ = true
                      menu.maker = getUserId()
                      menu.perCode = this.perCode

                      return updateData.push(menu)
                    
                    }else if(menu.perCode !== null) {
                      menu.userFlag = 'Y'
                      menu.__modified__ = true
                      menu.__created__ = false
                      menu.editor = getUserId()

                      return updateData.push(menu)
                    } 
                  }
                } 
              });
            });


          deselect.forEach(e => {
            let idx = menuData.findIndex(menu => e == menu.menuCode)
            if(idx > -1){
              if(menuData[idx].userFlag == 'Y'){
                menuData[idx].userFlag = 'N'
                menuData[idx].__modified__ = true
                menuData[idx].__created__ = false
                menuData[idx].editor = getUserId()

                updateData.push(menuData[idx])
              }
            } 
            menuData.filter((menu) => {
                if(e == menu.paCode){
                  if(menu.paCode !== null && menu.pGCode !== null && menu.userFlag == 'Y'){
                    menu.userFlag = 'N'
                    menu.__modified__ = true
                    menu.__created__ = false
                    menu.editor = getUserId()

                    updateData.push(menu)

                  }
                }
              }
            )
          });

          const result = updateData.filter((v, i) => 
            updateData.findIndex(x => x.id === v.id) === i);

          // console.log(">>>>>>>>>>>" , result)

          this.vToastifyPrompt(
            this.$t('doSaveData'),
            'info',
            current => {
              this.openLoading()
              this.gridDetaillInstance.beginUpdate()
              createMenuAuthGroup(result, true)
                .then(res => {
                  this.doSearchMenuList(this.perCode)
                  this.addSelect = []
                  this.deselect = []
                })
                .catch(error => {
                  console.log("error : " , error)
                  this.endLoading()
                })
                .finally(() => {
                  this.gridDetaillInstance.endUpdate()
                  let message = 'Saved'
                  notify(this.$t(message), 'success', 1500)
                  // this.gridDetaillInstance.clearSelection()
                  this.endLoading()
                })
            },
            null,
            true
          ) 
        } 
      },
      onSelectionChanged(e){
        this.menuList.forEach(element => {
          // if(element.menuCode == e.currentSelectedRowKeys[0]){
          //   if(element.userFlag !== 'Y'){
          //     this.addSelect.push(e.currentSelectedRowKeys[0])
          //   }
          // }
          if(element.menuCode == e.currentDeselectedRowKeys[0]){
            if(element.userFlag !== 'N'){
              this.deselect.push(e.currentDeselectedRowKeys[0])
            }
          }
        });
      },
      btnSearchMain(){
        // this.openLoading('searching')
        // this.doSearchMain()
        //   .finally(() => {
        //     this.endLoading()
        //   })
      }
    }
  }
</script>