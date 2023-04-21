<template>
    <v-container fluid align-start ma-0 pa-2 class="container-height">
      <v-row no-gutters fill-height>
        <!-- <i-page-title title="menuManage"/>     -->
        <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0 pl-0 pb-0">
          <i-card-top class="d-md-flex"
            :useBtnList="[
              'btnSearch', //조회
            ]"
            @btnSearch="search(false)"
          >
            <template v-slot:body>
              <v-row dense align="center">
                <v-col cols="3">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mt-1"
                    v-model="sysSelect"
                    :label="$t('sysType')"
                    :items="sysList"
                    item-text="sysName"
                    item-value="sysCode"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    multiple
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mt-1"
                    v-model="moduleSelect"
                    :label="$t('moduleCode')"
                    :items="moduleList"
                    item-text="moduleCode"
                    item-value="moduleCode"
                    :prepend-inner-icon="'$search'"
                    dense
                    outlined
                    multiple
                    clearable
                    
                  />
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="mt-1"
                    v-model="lanCodeSelect"
                    :label="$t('lanCode')"
                    :items="lanCode"
                    item-text="sysName"
                    item-value="sysCode"
                    :prepend-inner-icon="'$search'"
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
        <v-col cols="12" sm="12" lg="12" class="pa-2 pl-0 pb-0">
          <i-card-vertical headerTitle=""
                :useBtnList="[
                  'btnAdd', //신규
                  'btnSave',
                ]"
                style="height: 100%;"
                @btnAdd="btnAdd()"
                @btnSave="btnSave()"
              >
            <template v-slot:body>            
              <v-layout column >
                  <!-- 그리드 Main -->
                  <DxDataGrid
                    id="menuManage"
                    class="listBox"
                    :ref="dxDataGridRef"
                    :data-source="gridData"
                    key-expr="id"
                    :width="grid.width"
                    :show-borders="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :column-hiding-enabled="false"
                    :hover-state-enabled="true"
                    :show-row-lines="true"
                    :remote-operations="false"
                    :focused-row-enabled="true"
                    @editing-start="onEditingStart"
                    >
                    <DxPaging :enabled="false" :page-size="30"/>
                    <DxKeyboardNavigation
                      :edit-on-key-press="true"
                      enter-key-action="startEdit"
                      enter-key-direction="row"
                    />
                    <DxEditing
                      :allow-updating="true"
                      :allow-deleting="false"
                      :allow-adding="true"
                      :select-text-on-edit-start="true"
                      start-edit-action="dblClick"
                      mode="cell"
                    />
                    <!-- :selection="{ mode:'none' }" -->
                    <DxScrolling column-rendering-mode="virtual"/>
                    <DxColumn data-field="sysType" :caption="$t('sysType')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="menuCode" :caption="$t('menuCode')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="menuName" :caption="$t('menuName')" :customize-text="column_customizeText" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="lanCode" :caption="$t('lanCode')" width="auto" alignment="center" >
                      <DxLookup
                        :data-source="lanCode"
                        display-expr="sysName"
                        value-expr="sysCode"
                      />
                    </DxColumn>
                    <DxColumn data-field="moduleCode" :caption="$t('moduleCode')" width="auto" data-type="string" alignment="center" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="moduleName" :caption="$t('moduleName')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="paCode" :caption="$t('paCode')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="pgCode" :caption="$t('pgCode')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="sortFlag" :caption="$t('sortFlag')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="userFlag" :caption="$t('userFlag')" width="auto" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" />
                    <DxColumn data-field="remark" :caption="$t('remark')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="makeDate" :caption="$t('makeDate')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="maker" :caption="$t('maker')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="editDate" :caption="$t('editDate')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field="editor" :caption="$t('editor')" width="auto" data-type="string" alignment="center" />
                    <DxColumn data-field=""  caption="" data-type="string" alignment="center" width="auto" :allow-editing="false" />
                    <DxPager :show-page-size-selector="false" />
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false" 
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>
                    
                    <DxSelection
                      select-all-mode="allPages"
                      :show-check-boxes-mode="checkBoxesMode"
                      mode="multiple"
                    />
                  </DxDataGrid>
              </v-layout>
            </template>
          </i-card-vertical>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
    import iCardVertical from '@/components/common/iCardVertical.vue'
    import { DxDataGrid, DxKeyboardNavigation, DxColumn, DxLookup, DxScrolling, DxEditing, DxSelection, DxPager } from 'devextreme-vue/data-grid'
    import themes from 'devextreme/ui/themes'

    import notify from 'devextreme/ui/notify' // message

    import baseview from '@/components/base/baseview.vue' // base page 추가
    import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
 
    import { getAllMenu, createMenu} from '@/api/system/menuManage'
    import { getCmChildCode } from '@/api/system/cmCodeManage'
    import { getUserId, getComCode } from '@/utils/token'
    export default {
      name: 'menuManage',
      mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
      components: {
        'i-card-vertical': iCardVertical,
        DxDataGrid,
        DxKeyboardNavigation,
        DxColumn,
        DxLookup,
        DxScrolling,
        DxEditing,
        DxSelection,
        DxPager
      },
      data() {
        return {
          dxDataGridRef: 'menuManage',
          gridData: [],
          sysList: [],
          sysSelect: [],
          moduleList: [],
          moduleSelect: [],
          lanCode: [],
          lanCodeSelect: [],
          checkBoxvalue: undefined,
          checkBoxesMode: themes.current().startsWith('material') ? 'always' : 'onClick',
        }
      },
      computed: {
        gridMainInstance() {
          return this.GetDataGrid(this.dxDataGridRef)
        }
      },
      beforeMount() {
        let params = {
          comCode: getComCode(),
          codegr: 'COM',
          code: 'LAN_CODE',
          userFlag: 'Y'
        }

        let params2 = {
          comCode: getComCode(),
          codegr: 'COM',
          code: 'SYS_TYPE',
          userFlag: 'Y'
        }
        Promise.all([
          getCmChildCode(params),
          getCmChildCode(params2),
        ])
        .then( res => {
          console.log('res ', res)
          // this.partnerIdList = res[0].listResponse.list.slice()
          // this.partnerIdList.unshift({ code: '', desc: '전체' })
          
          if(res[0].list.length > 0)
            this.lanCode = res[0].list.slice()
          else {
            this.lanCode = [{
              sysCode : 'ko',
              sysName : '한글'
            }]
          }
          if(res[1].list.length > 0)
            this.sysList = res[1].list.slice()
          else {
            this.sysList = [{
              sysCode : 'MES',
              sysName : 'MES'
            }]
          }
        })
        .catch(error => {})
      },
      mounted() {
        this.search(true)
      },
      methods: {
        async search(event) {
          this.openLoading('searching')
          this.gridMainInstance.clearSelection()
          let params = {
            comCode: getComCode(),
            sysType: this.sysSelect.toString(),
            moduleCode: this.moduleSelect.toString(),
            lanCode: this.lanCodeSelect.toString()
          }
          // console.log('params', params)
          getAllMenu(params).then(res => {
            // console.log("RES : " , res)
            let moduleName = []
            res.list.forEach(e => {
              if(e.moduleCode == e.menuCode) {
                this.lanCode.forEach((item, i) => {
                  if(e.lanCode == item.sysCode)
                    moduleName[i] = e.menuName
                  
                })
              }
              
              this.lanCode.forEach((item, i) => {
                if(e.lanCode == item.sysCode)
                    e.moduleName = moduleName[i]
              })

              e.__modified__ = false
              e.__created__ = false
            });
            this.gridData = res.list
            
            if(event) {
              // this.sysList = res.list.filter((v, i) => res.list.findIndex(x => x.sysType === v.sysType) === i).map(v => v.sysType)
              this.moduleList = res.list.filter((v, i) => res.list.findIndex(x => x.moduleCode === v.menuCode) === i).map(v => v.moduleCode)
            }
            
            // console.log("moduleList : " , this.moduleList)
          }).finally(() => {
            this.endLoading()
          })
        },
        onEditingStart(e) {
          // console.log('onEditingStart')
          if (e.data.__created__ === false) {
            if (e.column.dataField === 'sysType' || e.column.dataField === 'menuCode' 
            || e.column.dataField === 'lanCode' || e.column.dataField === 'moduleName'
            || e.column.dataField === 'makeDate' || e.column.dataField === 'maker'
            || e.column.dataField === 'editDate' || e.column.dataField === 'editor') {
              e.cancel = true
            }
          } else {
            if (e.column.dataField === 'moduleName'
            || e.column.dataField === 'makeDate' || e.column.dataField === 'maker'
            || e.column.dataField === 'editDate' || e.column.dataField === 'editor') {
              e.cancel = true
            }
          }
        },
        column_customizeText(cellInfo) {
          return cellInfo.value//this.$t(cellInfo.value)
        },
        btnAdd() {
          let newRow = {
            id: this.gridData.length == 0 ? 0 : this.gridData.length + 1,
            comCode: getComCode(),
            //proCode: '',
            sysType: '',
            menuCode: '',
            moduleCode: '',
            menuName: '',
            paCode: '',
            pgCode: '',
            // icon: 'folder',
            sortFlag: '',
            userFlag: 'Y',
            makeDate: '',
            maker: getUserId(),
            editDate: '',
            remark: '',
            __modified__: false,
            __created__: true

          }
          this.gridMainInstance.clearSelection()
          this.gridMainInstance.newRow(newRow)
          this.gridMainInstance.saveEditData()
          this.gridMainInstance.selectRows(newRow.id, true)
          this.gridMainInstance.option('focusedRowIndex', -1)
          this.gridMainInstance.option('focusedRowKey', this.gridMainInstance.option('dataSource').length)
        },
        async btnSave() {
          await this.gridMainInstance.saveEditData()
          let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
          // let selectedRowKeys = await this.gridMainInstance.getSelectedRowKeys()
          
          if (!selectedMainRows.length) {
            this.vToastify(this.$t('SelectCheck'), 'warn')
            return
          }

          for (let row of selectedMainRows) {
            if (row.__created__ !== true) {
              row.__modified__ = true
              row.editor = getUserId()
            }
          }
          
          for(let row of selectedMainRows) {
            console.log('row',row)
            if(!row.menuCode || !row.moduleCode){
              this.vToastify(this.$t('sys0010AddCheck'), 'warn')
              // notify(this.$t('sys0010AddCheck'), 'success', 1500)
              return
            }
          }
          this.vToastifyPrompt(
            this.$t('doSaveData'),
            'info',
            current => {
              this.openLoading()
              this.gridMainInstance.beginUpdate() 
              let message = ''
              createMenu(selectedMainRows, true)
                .then(res => {
                  this.search(false)
                  message = selectedMainRows[0].__created__ == true ? 'Saved' :  'changed'
                  notify(this.$t(message), 'success', 1500)
                })
                .catch(error => {
                  console.log("error : " , error)
                  notify(error, 'error', 1500)
                  this.endLoading()
                })
                .finally(() => {
                  this.gridMainInstance.endUpdate()
                  this.endLoading()
                })
            },
            null,
            true
          )
        },
      }
    }
  </script>