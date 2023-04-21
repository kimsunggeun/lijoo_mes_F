import request from '@/utils/request'



//스탑타임조회

export function getStopTime(param) {
    let data = param
    return request({
        url: `/api/eqp/getStopTime`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}









//[작업장 조회]
export function getBas0034(param) {
    let data = param
    return request({
        url: `/api/pop/getBas0034`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[작업반 조회]
export function getBas0035(param) {
    let data = param
    return request({
        url: `/api/pop/getBas0035`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[pop설정 저장]
export function setPro0020(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0020`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[pop설정 저장]
export function getPro0020(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0020`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

//[pop설정 삭제]
export function delPro0020(param) {
    let data = param
    return request({
        url: `/api/pop/delPro0020`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
///////////////////////////////////////////////////////////////////////////
//[pop작업환경 조회]
export function getPro0021(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0021`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[pop작업환경 조회]
export function setPro0021(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0021`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[pop 부서 명단]
export function getWorkerList(param) {
    let data = param
    return request({
        url: `/api/pop/getWorkerList`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
///////////////////////////////////////////////////////////////
//[pop 작업환경 조회]
export function getPro00(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0022`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[pop 작업자 지정 저장]
export function setPro0022(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0022`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

//[pop 작업지시 팝업 조회]
export function getPro0050(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0050`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[pop 작업지시 상태 버튼]
export function setPro0050(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0050`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
/////////////////////////////////////////////////////////
//[자재투입(공정재고)조회]
export function getPro0023(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0023`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[자재투입]
export function setPro0023(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0023`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[자재투입 수동 데이터]
export function getPro23Select(param) {
    let data = param
    return request({
        url: `/api/pop/getPro23Select`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
///////////////////////////////////////////////////////////////////////////
//[실적등록]
export function setPro0025(param) {
    let data = param
    return request({
        url: `/api/pop/setPro0025`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
///////////////////////////////////////////////////////////////////////////
//[실적등록->작업이력 그리드]
export function getPro0026(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0026`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[실적등록 -> 작업이력 삭제]
export function getBack(param) {
    let data = param
    return request({
        url: `/api/pop/getBack`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[작업이력]
export function getPro0025(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0025`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
//[작업이력 탭 투입자재 조회]
export function getPro0024(param) {
    let data = param
    return request({
        url: `/api/pop/getPro0024`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}
// 조회 설비 가동.비가동 조회
export function getEqp0010(param) {
    let data = param

    return request({
        url: `/api/eqp/getEqp0010`,
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
export function getEqp0010Main(param) {
    let data = param

    return request({
        url: `/api/eqp/getEqp0010Main`,
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
// 조회 설비 가동.비가동 조회
export function setOperating(param) {
    let data = param

    return request({
        url: `/api/eqp/setOperating`,
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

// 조회 공정검사
export function getProcess(param) {
    let data = param

    return request({
        url: `/api/eqp/getProcess`,
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
// 저장 공정검사
export function setProcess(param) {
    let data = param
    return request({
        url: `/api/eqp/setProcess`,
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

// 공정이동표/부품식별표 출력
export function exportRpt(param) {
    let data = param
    let responseType = "blob"

    return request({
        url: `/api/pop/exportRpt`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data,
        responseType: responseType
    })
}