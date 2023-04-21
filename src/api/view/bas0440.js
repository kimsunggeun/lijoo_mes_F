import request from '@/utils/request'

// 부서 정보 조회
export function getDepInfo(param) {
    let data = param

    return request({
        url: `/api/bas0440/getDepInfo`,
        method: 'POST',
        meta: {
            apiVersion: '1.0.0'
        },
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        data
    })
}

// 계측기 정보 조회
export function getItemInfo(param) {
    let data = param

    return request({
        url: `/api/bas0440/getItemInfo`,
        method: 'POST',
        meta: {
            apiVersion: '1.0.0'
        },
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        data
    })
}

// 계측기 저장
export function saveItem(param) {
    let data = param

    return request({
        url: `/api/bas0440/saveItem`,
        method: 'POST',
        meta: {
            apiVersion: '1.0.0'
        },
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        data
    })
}

// 계측기 삭제
export function deleteItem(param) {
    let data = param

    return request({
        url: `/api/bas0440/deleteItem`,
        method: 'POST',
        meta: {
            apiVersion: '1.0.0'
        },
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        data
    })
}