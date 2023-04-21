import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 계측기 마스터 조회
export function getEqp0140(param) {
    let data = param
    return request({
        url: `/api/getEqp0140`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}