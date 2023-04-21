import store from '@/store'
import router from '@/router'
import localStore from '@/utils/localStore'
import {
    loginByPassword
} from '@/api/common/login'
import { getDateFormat } from '@/utils/common.js'
import { saveMenuStatistics } from '@/api/system/menuStatisticsManage'
import { getUserId, getComCode } from '@/utils/token'
/*
 * 로그인을 위한 함수 정의
 * api 사용를 위해 아래 2개 페이지 수정 필요
 * src/api/common/login.js [let apitest = true]
 * scr/store/modules/user.js [LoginByPassword => let isTest = true]
 */

// 자동 로그인 체크
export function fn_AutoLogin() {
    return Boolean(localStore.get('isAutoLogin'))
}

// 로그인
// [Object] userData (userId, userPw, comCode, isAutoLogin)
export function fn_Login(userData) {
    return new Promise(function (resolve, reject) {
        let RESULT = {
            result: false,
            msg: '사용자 정보를 입력해주세요.'
        }
        // 로딩 시작 함수 만들기
        //if (domainData.value !== '') {
            if (!userData.userId || userData.userId === '') {
                RESULT.result = false
                RESULT.msg = '사용자 아이디를 입력해주세요.'
                resolve(RESULT)
                return
            }
            if (!userData.userPw || userData.userPw === '') {
                RESULT.result = false
                RESULT.msg = '비밀번호를 입력해주세요.'
                resolve(RESULT)
                return
            }

            let userInfo = {
                userId: userData.userId,
                userPw: userData.userPw,
                comCode: userData.comCode,
                perCode: userData.toggleBtn,
                isAutoLogin: userData.isAutoLogin
            }

            let map = ''

            loginByPassword(userInfo).then(login_res => {
                // 로그인 성공 
                if (login_res.success) {
                    console.log('loginByPassword : ', login_res)
                    store
                        .dispatch('LoginByPassword', {
                            userInfo,
                            login_res
                        })
                        .then(response => {
                            store
                                .dispatch('SetUserInfo', {
                                    userId: userData.userId,
                                    comCode: userData.comCode
                                })
                                .then(response => {
                                    console.log('SetUserInfo',response)
                                    // store
                                    //     .dispatch('GetMenus', {
                                    //         userId: userData.userId,
                                    //         comCode: userData.comCode
                                    //     })
                                    //     .then(response => {
                                            RESULT.result = login_res.success
                                            RESULT.msg = login_res.msg
                                            resolve(RESULT)
                                            return
                                        // })
                                })
                        })
                        .catch(reject => {
                            RESULT.result = false
                            RESULT.msg = '사용자 정보 조회에 실패하였습니다. 관리자에 문의해주세요'
                            resolve(RESULT)
                            return
                        })
                } else {
                    RESULT.result = login_res.success
                    RESULT.msg = login_res.msg
                    resolve(RESULT)
                    return
                }
            }).catch(reject => {
                RESULT.result = false
                RESULT.msg = 'Id 와 Password 확인바랍니다.'
                resolve(RESULT)
                return
            })
        /* } else {
            RESULT.result = false
            RESULT.msg = '도메인을 확인해주세요'
            resolve(RESULT)
            return
        }  */       
    })
}

// 성공 페이지 이동
export function fn_LoginSuccess() {
    const params = {
        comCode : getComCode(),
        userId : getUserId(),
        moduleCode : 'login',
        menuCode: 'login',
        cnntDate: getDateFormat(new Date())
    }
    console.log('fn_LoginSuccess',params)
    saveMenuStatistics(params)
    let startPage = localStore.get('start-page')
    console.log('startPage',startPage)
    if (startPage) {
        if(startPage == 'PDA') {
            // store.dispatch('app/setIsScreenFull', true)
            router.push('/pdaDashboard')
        } else if(startPage == 'super') {
            router.push('/sys0010')
        } else {
            router.push('/dashboard')
        }
    } else {
        router.push('/dashboard')
    }
}

// 로그아웃
export function fn_Logout() {
    router.push('/logout')
}