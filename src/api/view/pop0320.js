import request from '@/utils/request'


//로트병합 저장
export function saveMergeLot(param) {
  let data = param
  console.log('저장데이터', param)
  return request({
    url: `/api/pop/mergeLotSavePro0019`,
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

//로트병합 업데이트
export function updateMergeLot(param) {
  let data = param
  console.log('업데이트데이터', param)
  return request({
    url: `/api/pop/mergeLotUpdateMat0021`,
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

//로트병합될 데이터 업데이트
export function mergedLotSaveUpdateMat0021(param) {
  let data = param
  return request({
    url: `/api/pop/mergedLotSaveUpdateMat0021`,
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


