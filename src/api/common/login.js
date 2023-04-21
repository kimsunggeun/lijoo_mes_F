import loginMockupData from './mock/login.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import Cookies from 'js-cookie'
import { isUseAPI } from '@/utils/check'
import { getToken, setToken, getID, setID, setUserId, getUserId, getRefreshToken } from '@/utils/token'

export function loginByPassword(userInfo) {  
  let apitest = true
  if (!isUseAPI() && apitest) {    
    return new Promise(function(resolve, reject) {
      console.log('Login API Mock-up')
      console.log('res : ', loginMockupData[userInfo.userId])
      console.log('pw : ', loginMockupData[userInfo.userId].userPw)
      console.log('userPw : ', userInfo.userPw)
      let res = loginMockupData[userInfo.userId]
      let pw = loginMockupData[userInfo.userId].userPw
      res.success = true
      if (res && pw === userInfo.userPw) {
        resolve(res)
        setToken(userInfo.userId) // mockup에서는 토큰값이 userCd로 사용한다.
        setID(userInfo.userId)
        Cookies.set('UserId', userInfo.userId)
        Cookies.set('comCode', userInfo.comCode)
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }
  return request({
    url: '/com/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: userInfo,
    meta: {
      useErrorMessage: false,
      useTokenUpdate: true,
      apiVersion: '1.0.0'
    }
  })
}

export function getUserInfoBySession(userInfo) {
  //let domainCd = 'iwelding'
  let apitest = true
  if (!isUseAPI() && apitest) {
    // restful api를 사용하지 않을 경우 login.json에 등록된 계정만 가져온다.
    return new Promise(function(resolve, reject) {
      // local에서는 token 값에 userId를 넣는다.
      let res = loginMockupData[userInfo.userId]
      if (res) {
        resolve(res) // 기존 토큰 값 있는 여부 확인
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }

  return request({
    url: '/com/getUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      userId: userInfo.userId,
      comCode: userInfo.comCode
    },
    meta: { apiVersion: '1.0.0' },
  })
}

export function logout() {
  return new Promise(function(resolve, reject) {
    console.log('logout', resolve)
    resolve()
  })
}


export function reissueToekn(tokenInfo) {
  let userRefreshToken = getRefreshToken()
  console.log('** userRefreshToken : ' + userRefreshToken)
  return request({
    url: '/com/reissue',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      userId: tokenInfo.userId,
      refreshToken: userRefreshToken,
      comCode: tokenInfo.comCode
    },
    meta: {
      useErrorMessage: true,
      useTokenUpdate: true,
      apiVersion: '1.0.0'
    }
  })
}