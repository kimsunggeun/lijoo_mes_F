import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 계측기 마스터 조회
export function getHeaderItem(param) {
    let data = param
    return request({
        url: `/api/getHeaderItem`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

// 계측기 검교정 조회
export function getDetailItem(param) {
    let data = param
    return request({
        url: `/api/getDetailItem`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

// 계측기 검교정 저장
export function saveCorrItem(param) {
    let data = param
    return request({
        url: `/api/saveCorrItem`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

// 계측기 검교정 삭제
export function deleteCorrItem(param) {
    let data = param
    return request({
        url: `/api/deleteCorrItem`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}