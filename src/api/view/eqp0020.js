import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 메인 조회
export function getEqp0020grd(param) {
    let data = param
    return request({
        url: `/api/getEqp0020grd`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

 //저장
export function createEqp0020(param) {
    let data = param
    return request({
        url: `/api/createEqp0020`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//삭제
export function deleteEqp0020(param) {
    let data = param
    return request({
        url: `/api/deleteEqp0020`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}