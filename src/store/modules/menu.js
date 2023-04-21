import { getToken, getUserId } from '@/utils/token'
import store from '@/store'
import { isUseAPI } from '@/utils/check'
import localStore from '@/utils/localStore'
import { getUserMenu } from '@/api/system/menuManage' // 메뉴 api 호출
import routers from '@/router'

export default {
  state: {
    menus: [],
    routeMenus: [],
    treeMenus: [],
    subTreeMenus: [],
    flag: {
      asideVisiable: true,
      asideUse: true,
      tagViewUse: true,
      headerUse: true,
      footerUse: true,
      myMenuVisible: false,
      fullscreen: false,
      isLayoutHideMode: false
    }
  },

  //data를 변경할때
  mutations: {
    // 전체 화면에서 레이아웃을 다 감추는 모드 사용 여부
    SET_LAYOUT_HIDE_MODE(state, flag) {
      state.flag.isLayoutHideMode = flag
    },
    SET_HEADER_USE: function(state, flag) {
      state.flag.headerUse = flag
    },
    SET_TAG_VIEW_USE: function(state, flag) {
      state.flag.tagViewUse = flag
    },
    SET_ASIDE_MENU_USE: (state, flag) => {
      state.flag.asideUse = flag
    },
    SET_FOOTER_USE: function(state, flag) {
      state.flag.footerUse = flag
    },
    SET_FULLSCREEN: function(state, flag) {
      state.flag.fullscreen = flag
    },
    SET_MENU: (state, menus) => {
      state.menus = menus
    },
    SET_ROUTE_MENU: (state, routeMenus) => {
      state.routeMenus = routeMenus
    },
    SET_TREE_MENU: (state, treeMenus) => {
      state.treeMenus = treeMenus
    },
    SET_SUB_TREE_MENU: (state, subTreeMenus) => {
      state.subTreeMenus = subTreeMenus
    }
  },
  //methods
  actions: {
    async GetMenus({ commit }, userInfo) {
      console.log('######userInfo --> ' + JSON.stringify(userInfo))
      return await new Promise((resolve, reject) => {
        // 초기화
        commit('SET_MENU', [])
        commit('SET_ROUTE_MENU', [])
        commit('SET_TREE_MENU', [])
        commit('SET_SUB_TREE_MENU', [])
        let menuList = []
        let routeMenuList = []
        let menuTreeList = []
        let menuSubTreeList = []
        //도메인에 해당하는 전체 메뉴 조회
        getUserMenu(userInfo)
          .then(response => {
            //console.log('######menuResult --> ', response.list.length)
            //수정사항: 초기셋팅으로 메뉴정보가 하나도 없을 경우
            if (response.list.length > 0) {
              //console.log('########## authMenu : ' + JSON.stringify(menuList))
              // menuTreeList 데이터셋 생성
              // 부모 메뉴 데이터 셋 생성
              menuList.push('') //상단매뉴 엑티브 오류 빈값
              _.cloneDeep(response.list).forEach((item, index) => {
                // console.log('######menuResult --> ' , index + ' -> ' , item)
                // console.log('######menuResult --> ',index + ' -> ',item.menuCode, item.paCode, item.pgCode)
                if(item.paCode == null || item.paCode == '') {
                  // console.log('######menuList --> ' , item)
                  menuList.push(item)
                } else if( (item.paCode != null && item.paCode != '') && ( item.pgCode == null || item.pgCode == '') ) {
                  // console.log('######menuTreeList --> ' , item)
                  menuTreeList.push({
                    comCode: item.comCode,
                    //proCode: item.proCode,
                    sysType: item.sysType,
                    menuCode: item.menuCode,
                    menuName: item.menuName,
                    moduleCode: item.moduleCode,
                    paCode: item.paCode,
                    pgCode: item.pgCode,
                    sortFlag: item.sortFlag,
                    remark: item.remark,
                    icon: item.icon,
                    userFlag: item.userFlag,
                    makeDate: item.makeDate,
                    maker: item.maker,
                    editDate: item.editDate,
                    editor: item.editor,
                    children: []
                  })
                }
              })
              // console.log('######menuList --> ' , menuList)
              // console.log('######menuTreeList --> ' , menuTreeList)
              _.cloneDeep(response.list).forEach((item, index) => {
                // console.log('######menuTreeList item--> ' , item)
                if ( (item.paCode != null && item.pgCode != null) && (item.paCode != '' && item.pgCode != '') ) {
                  let inx = menuTreeList.findIndex(element => element.menuCode == item.paCode)
                  // console.log('######menuTreeList inx--> ' , inx)
                  if(inx >= 0) {
                    let menu = {
                      comCode: item.comCode,
                      //proCode: item.proCode,
                      sysType: item.sysType,
                      menuCode: item.menuCode,
                      menuName: item.menuName,
                      moduleCode: item.moduleCode,
                      paCode: item.paCode,
                      pgCode: item.pgCode,
                      sortFlag: item.sortFlag,
                      remark: item.remark,
                      icon: item.icon,
                      userFlag: item.userFlag,
                      makeDate: item.makeDate,
                      maker: item.maker,
                      editDate: item.editDate,
                      editor: item.editor,
                      infoUrl: `/${item.moduleCode}/${item.paCode}/${item.menuCode}`,
                      children: []
                    }
                    menuTreeList[inx].children.push(menu)
                    routeMenuList.push(menu)
                  }
                } 
              })
              
              let menuCode = userInfo.menuCode ? userInfo.menuCode : menuList[1].menuCode
              // console.log('menuCode',menuCode)
              menuTreeList.find(element => {
                if(element.moduleCode == menuCode)
                  menuSubTreeList.push(element)
              })

              // console.log("menuList : ", menuList)
              // console.log("routeMenuList : ", routeMenuList)
              // console.log("menuTreeList : ", menuTreeList)
              // console.log("menuSubTreeList : ", menuSubTreeList)
              //console.log('en2',routers.meta.menu_id)

              commit('SET_MENU', menuList)
              commit('SET_ROUTE_MENU', routeMenuList)
              commit('SET_TREE_MENU', menuTreeList)
              commit('SET_SUB_TREE_MENU', menuSubTreeList)
              
            }
          })
          .catch(error => {
            reject(error)
          }),
          resolve()
      })
    },
    async GetSubMenus({ commit }, flag) {
      return await new Promise((resolve, reject) => {
        commit('SET_SUB_TREE_MENU', flag)
        resolve()
      })
      
    },
    SetHeaderUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_HEADER_USE', flag)
    },
    SetTagViewUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_TAG_VIEW_USE', flag)
    },
    SetASideMenuUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_ASIDE_MENU_USE', flag)
    },
    SetFooterUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_FOOTER_USE', flag)
    },
    SetLayoutHideMode({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_LAYOUT_HIDE_MODE', flag)
    },
    SetFullScreen({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_FULLSCREEN', flag)
      localStore.set('fullscreen', this.isFullscreen) // 추후 사용이 필요 할 수도 있어서 넣어 둠
      if (store.state.menu.flag.isLayoutHideMode === true) {
        commit('SET_HEADER_USE', !flag)
        commit('SET_TAG_VIEW_USE', !flag)
        commit('SET_ASIDE_MENU_USE', !flag)
        commit('SET_FOOTER_USE', !flag)
      }
    }
  },

  getters: {
    //computed
  }
}
