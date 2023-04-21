import {
  getUserInfoBySession,
  logout,
  reissueToekn
} from '@/api/common/login'
import {
  getToken,
  removeToken,
  setUserId,
  setToken,
  setRefreshToken,
  setCookieToken,
  setComCode,
  setUserImage
} from '@/utils/token'
import localStore from '@/utils/localStore'
import {
  isUseAPI
} from '@/utils/check'

export default {
  state: {
    token: '',
    comCode: '',
    userId: '',
    userName: '',
    clntId: '',
    compId: '',
    plntId: '',
    empNo: '',
    deptCd: '',
    bpCd: '',
    jbl: '',
    jbrp: '',
    trad: '',
    dimDiv: '',
    foreignYn: '',
    roles: [],
    auths: [],
    menuGroup: '',
    menuPermission: '',
    registName: '',
    registPhoneNumber: '',
    buttonPermission: '',
    myMenu: []
  },

  //데이터 변경시
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_COM_CODE: (state, comCode) => {
      state.comCode = comCode
    },
    SET_DIM_DIV: (state, dimDiv) => {
      state.dimDiv = dimDiv
    },
    SET_FOREIGN: (state, foreignYn) => {
      state.foreignYn = foreignYn
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHS: (state, auths) => {
      state.auths = auths
    },
    SET_MENU_GROUP: (state, menuGroup) => {
      state.menuGroup = menuGroup
    },
    SET_COOKIE_TOKEN: (state, token) => {
      state.token = token
    }
  },

  //methods
  actions: {
    LoginByPassword({
      commit
    }, params) {
      let isTest = true
      if (!isUseAPI() && isTest) {
        console.log('Login Mock-up')
        setToken(params.userInfo.userId)
        setCookieToken(params.userInfo.userId)
        let userToken = getToken()
        console.log('토큰', userToken)
        commit('SET_TOKEN', userToken)
        localStore.set('isAutoLogin', params.userInfo.isAutoLogin)
        if (params.userInfo.isAutoLogin === true) {
          localStore.set('token', userToken)
        }
      } else {
        setToken(params.login_res.map.accessToken)
        setRefreshToken(params.login_res.map.refreshToken)
        console.log('loginByPassword - session --> ' + params.userInfo.comCode)
        setComCode(params.userInfo.comCode)
        setUserId(params.userInfo.userId)
        let userToken = getToken()
        localStore.set('isAutoLogin', params.userInfo.isAutoLogin)
        if (params.userInfo.isAutoLogin === true) {
          localStore.set('token', userToken)
        }
      }
    },
    SetUserInfo({
      commit
    }, userInfo) {
      return new Promise(function (resolve, reject) {
        getUserInfoBySession(userInfo)
          .then(response => {
            // response = Array.isArray(response.list) ? response[0] : response
            console.log('loginresponse', response.list[0],response.list[0]['userId'])
            if (response) {
              commit('SET_USER_ID', response.list[0]['userId'])
              commit('SET_USER_NAME', response.list[0]['userName'])

              if(response.list[0]['userImage']) {
                // let img = {
                //   base64: response.list[0]['userImageBase64'],
                //   type: response.list[0]['contentType']
                // }
                setUserImage(response.list[0]['userImageBase64'])
              }
              
              commit('SET_TOKEN', getToken())
              commit('SET_COOKIE_TOKEN', getToken())
              commit('SET_COM_CODE', response['comCode'])
            }
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //토큰 재발급 후 세션에 새로운 토큰 저장
    reissueToekn({
      commit
    }, tokenInfo) {
      return new Promise(function (resolve, reject) {
        reissueToekn(tokenInfo)
          .then(response => {
            //console.log('토큰재발급완료! ', response.accessToken)
            setToken(response.accessToken)
            if (response.refreshToken) {
              //refresh toke은 만료기간이 7일이전에만 재발급함
              //console.log('refresh token 재발급완료! ', response.refreshToken)
              setRefreshToken(response.refreshToken)
            }
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Logout({
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          window.sessionStorage.clear()
          dispatch('ClearSession')
          resolve()
        })
      })
    },
    ClearSession({
      commit
    }) {
      commit('SET_USER_ID', '')
      commit('SET_USER_NAME', '')
      commit('SET_COM_CODE', '')
      commit('SET_TOKEN', '')
      setUserImage('')
      removeToken()
    }
  },

  //computed
  getters: {}
}
