import request from '@/utils/request'

//예비품 정보 조회
export function getMainList(param) {
    let data = param

    return request({
        url: `/api/getMainList`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

//입고내역 조회
export function getReceiptDetailList(param) {
    let data = param

    return request({
        url: `/api/getReceiptDetailList`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

//출고내역 조회
export function getDeliDetailList(param) {
    let data = param

    return request({
        url: `/api/getDeliDetailList`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

// 입고내역, 출고내역 저장
export function saveDetailInfo(param) {
    let data = param

    return request({
        url: `/api/saveDetailInfo`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}