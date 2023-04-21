import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//재고실사 조회
export function getMat0110(param) {
  let data = param

  return request({
    url: `/api/getMat0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//재고실사 등록
export function insertMat0110(param) {
  let data = param

  return request({
    url: `/api/insertMat0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//재고실사 찾기 : 전산번호
export function getMat0110FromLotDetail(param) {
  let data = param

  return request({
    url: `/api/getMat0110FromLotDetail`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//재고실사현황 마스터 조회
export function getMat0120(param) {
  let data = param

  return request({
    url: `/api/getMat0120`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })  
}

//재고실사현황 디테일 조회
export function getMat0120Detail(param) {
  let data = param

  return request({
    url: `/api/getMat0120Detail`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })    
}