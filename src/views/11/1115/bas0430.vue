<template>
  <v-container fluid align-start ma-0 pa-2 class="container-height">
    <i-card-vertical class="pa-2 pt-0 fill-height"
      headerTitle="inspectionStandardSheet"
    >
      <template v-slot:body>
        <v-layout column>
          <v-row no-gutters>
            <v-col cols="12" class="pa-2">
              <DxFileManager
                ref="fileManager"
                :allowed-file-extensions="['.pdf']"
                :file-system-provider="fileItems"
                :onFileUploaded="onFileUploaded"
                :onFileUploading="onFileUploading"
                :onItemDeleting="onItemDeleting"
                :onSelectedFileOpened="onSelectedFileOpened"
              >
                <DxPermissions
                  :delete="true"
                  :upload="true"
                />
                <DxItemView ref="itemView" mode="thumbnails"/>
                <DxToolbar>
                  <DxItem
                    name="showNavPane"
                    :visible="false"
                  />
                  <DxItem name="separator"/>
                  <DxItem name="upload"/>
                  <!-- <DxItem name="refresh"/> -->

                  <DxFileSelectionItem name="delete"/>
                  <DxFileSelectionItem name="separator"/>
                  <DxFileSelectionItem name="clearSelection"/>
                </DxToolbar>
                <DxContextMenu>
                  <!-- <DxItem name="create"/>
                  <DxItem
                    name="rename"
                    :begin-group="true"
                  />
                  <DxItem name="delete"/> -->
                  <DxItem name="refresh"/>
                </DxContextMenu>
                <DxUpload ref="upload" :max-file-size="1000000"/>
                <DxNotifications 
                  :show-panel="false"
                  :show-popup="false"
                />
              </DxFileManager>
            </v-col>
          </v-row>
        </v-layout>
      </template>
    </i-card-vertical>
  </v-container>
</template>

<script>
  import iCardVertical from '@/components/common/iCardVertical.vue'
  import { DxFileManager, DxToolbar, DxItem, DxFileSelectionItem, DxPermissions, DxUpload
        ,DxItemView, DxContextMenu, DxNotifications } from 'devextreme-vue/file-manager'
  import { getDataList, saveData, deleteData, getDataFile } from '@/api/view/bas0240'
  import { getUserId, getComCode } from '@/utils/token'

  import baseview from '@/components/base/baseview.vue' // base page 추가
  import notify from 'devextreme/ui/notify' // message

  export default {
    name: 'bas0430',
    mixins: [baseview],
    components: {
      iCardVertical,
      DxFileManager,
      DxToolbar,
      DxItem,
      DxFileSelectionItem,
      DxPermissions,
      DxUpload,
      DxItemView,
      DxContextMenu,
      DxNotifications
    },
    data() {
      return {
        fileItems: [],
      }
    },
    created() {
    },
    computed: {
    },
    mounted() {
      this.doSearchDataList()
    },
    methods: {
      async onFileUploading(e) {
        // console.log("onFileUploading>>>>>>>>>" , e, e.fileData)
        this.openLoading('searching')
        e.cancel = true
        let params = {
          comCode: getComCode(),
          upType: e.destinationDirectory.dataItem.upType,
          proCode: e.destinationDirectory.dataItem.proCode,
          upFileName: e.fileData.name,
          upFileSize: e.fileData.size,
          created: true
        }
        let datas = new FormData()
        datas.append('file', e.fileData)
        for (var key in params) {
          datas.append(key, params[key])
          // console.log('datas',key, params[key]);
        }
        await saveData(datas).then(res => {
          notify(this.$t('save'), 'success', 1500)
          this.doSearchDataList()
          this.endLoading()
        })
        .catch(error => {
          // console.log('error',error)
          // notify(error, 'success', 1500)
          notify(this.$t('fileNameDuplicateMsg'), 'error', 1500)
          this.endLoading()
        })
        
      },
      async onItemDeleting(e) {
        this.openLoading('searching')
        e.cancel = true
        let params = {
          comCode: getComCode(),
          upType: e.item.dataItem.upType,
          proCode: e.item.dataItem.proCode,
          upFileName: e.item.name,
          upFileSize: e.item.size,
        }
        // console.log("onItemDeleting>>>>>>>>>" , e, params)
        await deleteData(params).then(res => {
          notify(this.$t('deleted'), 'success', 1500)
          this.doSearchDataList()
        }).catch(error => {
          notify(error, 'error', 1500)
        }).finally(() => {
          this.endLoading()
        })
      },
      onSelectedFileOpened(e) {
        // console.log("onSelectedFileOpened>>>>>>>>>" , e)
        this.openLoading('searching')
        let params = {
          comCode: getComCode(),
          upType: e.file.dataItem.upType,
          proCode: e.file.dataItem.proCode,
          upFileName: e.file.name,
          upFileSize: e.file.size,
        }

        getDataFile(params).then(res => {
          // console.log('res',res)
          let binaryString = window.atob(res.list[0].imageBase64)
          let binaryLen = binaryString.length
          let bytes = new Uint8Array(binaryLen)
          for (let a = 0; a < binaryLen; a++) {
              let ascii = binaryString.charCodeAt(a)
              bytes[a] = ascii
          }
          let blob = new Blob([bytes], {
              type: res.list[0].contentType,
          })
          window.open(URL.createObjectURL(blob) + '#view=fitH', '_blank')
        }).catch(error => {
          notify(error, 'error', 1500)
        }).finally(() => {
          this.endLoading()
        })
      },
      doSearchDataList() {
        this.openLoading('searching')
        let fileForderList = []
        let params = {
          comCode: getComCode(),
          upType: 'IS',
        }
        
        getDataList(params).then(res => {
          let temp = ''
          res.list.forEach(e => {
            if(temp != e.proCode) {
              temp = e.proCode
              fileForderList.push({
                name: e.proCode + '(' + e.proName + ')',
                upType: e.upType,
                proCode: e.proCode,
                proName: e.proName,
                isDirectory: true,
                items: []
              })
            }
          })

          res.list.forEach(e => {
            if(e.upFileName) {
              let inx = fileForderList.findIndex(element => element.proCode == e.proCode)
              if(inx >= 0) {
                let file = {
                  name: e.upFileName,
                  size: e.upFileSize,
                  upType: e.upType,
                  proCode: e.proCode,
                  proName: e.proName
                }
                fileForderList[inx].items.push(file)
              }
            }
          })
          // console.log('fileForderList',fileForderList)
          this.fileItems = fileForderList
        }).catch(error => {
          notify(error, 'error', 1500)
        }).finally(() => {
          this.endLoading()
        })
      },
    }
  }
</script>
<style lang="less" scoped>
::v-deep .dx-dropdowneditor-overlay .dx-popup-content {
    padding: 0px;
}
::v-deep .dx-toolbar-after {
  .dx-item.dx-toolbar-item.dx-toolbar-button.dx-filemanager-toolbar-viewmode-item {
    display: none;
  }
}
</style>