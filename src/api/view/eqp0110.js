import request from '@/utils/request'

// 메인 조회
export function getEqp0032(param) {
    let data = param
    return request({
        url: `/api/eqp0110/getEqp0032`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}