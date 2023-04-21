import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 메인 조회
export function getMaingrd() {
    return request({
        url: `/api/getMaingrd`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
    })
}

// 서브 조회
export function getDetailgrd(param) {
    let data = param
    return request({
        url: `/api/getDetailgrd`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

 //저장
export function createEqp0010(param) {
    let data = param
    return request({
        url: `/api/createEqp0010`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//삭제
export function deleteEqp0010(param) {
    let data = param
    return request({
        url: `/api/deleteEqp0010`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}