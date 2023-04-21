
import request from '@/utils/request'

//반품현황 조회
export function getMat0270(param) {
    let data = param
    console.log("데이터 확인", data)
    return request({
        url: `/api/getMat0270`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
    
    