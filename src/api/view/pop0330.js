import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 메인 조회
export function getPop0330(param) {
    let data = param
    return request({
        url: `/api/pop/getPop0330`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
export function getPopUp0330(param) {
    let data = param
    return request({
        url: `/api/pop/getPopUp0330`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}


// // 디테일조회
// export function getEqp0030Detail(param) {
//     let data = param
//     return request({
//         url: `/api/getEqp0030Detail`,
//         method: 'POST',
//         meta: { apiVersion: '1.0.0' },
//         headers: { 'Content-Type': 'application/json;charset=utf8' },
//         data
//     })
// }

//  //저장
// export function createEqp0030(param) {
//     let data = param
//     return request({
//         url: `/api/createEqp0030`,
//         method: 'POST',
//         meta: { apiVersion: '1.0.0' },
//         headers: { 'Content-Type': 'application/json;charset=utf8' },
//         data
//     })
// }
// //삭제
// export function deleteEqp0030(param) {
//     let data = param
//     return request({
//         url: `/api/deleteEqp0030`,
//         method: 'POST',
//         meta: { apiVersion: '1.0.0' },
//         headers: { 'Content-Type': 'application/json;charset=utf8' },
//         data
//     })
// }