
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getPro0120(param) {
  let data = param 
  return request({
    url: `/api/getPro0120`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

export function getWorkDecode(param) {
  let data = param
  return request({
    url: `/api/getWorkDecode`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
