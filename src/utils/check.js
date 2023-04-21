/**
 * 점검 로직이 필요할 경우 이곳에 정리
 */
import envs from '@/envs'

// isUseTargetAPI에 사용되며, 각 API Context Root 별로 사용하기 위해서 플레그 값을 정의
let USE_API = {
  IOT: true
}

export function isIE11() {
  return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0
}

export function isMobile() {
  var mobileArr = [
    'iPhone',
    'iPod',
    'BlackBerry',
    'Android',
    'Windows CE',
    'LG',
    'MOT',
    'SAMSUNG',
    'SonyEricsson'
  ]

  for (var txt in mobileArr) {
    if (navigator.userAgent.match(mobileArr[txt]) != null) {
      return true
    }
  }

  return false
}

export function getAgentType() {
  var agentTypes = ['Electron', 'Cordova', 'Android', 'iOS', 'Windows', 'OSX']

  let checkedTypes = []

  for (var idx in agentTypes) {
    if (navigator.userAgent.match(agentTypes[idx]) != null) {
      checkedTypes.push(agentTypes[idx])
    }
  }

  if (checkedTypes.includes('Electron')) return 'Electron'
  if (checkedTypes.includes('Cordova')) return 'HybridWeb'
  if (checkedTypes.includes('Android') || checkedTypes.includes('iOS')) {
    return 'MobileWeb'
  }

  return 'PCWeb'
}

export function isUseAPI(frcflag) {
  // local 개발 환경 flag
  var isLocal = process.env.NODE_ENV !== 'production'

  if (typeof frcflag === 'boolean') return frcflag

  if (envs.framework.onlyMockup) return false

  return !isLocal || envs.framework.useRestfulAPI
}

export function isUseTargetAPI(target) {
  // local 개발 환경 flag
  var isLocal = process.env.NODE_ENV !== 'production'

  if (envs.framework.onlyMockup) return false

  return !isLocal || envs.framework.useRestfulAPI || USE_API[target]
}

// 아이디 검사를 위한 정규식
// 4-12자의 영문 대소문자 숫자 로만 입력 가능
export function isUserId(userId) {
  var regId = /^[a-zA-Z0-9]{4,12}$/

  if (regId.test(userId)) {
    return true
  }

  return false
}

// 비밀번호 검사를 위한 정규식
// 10~20자의 영문 대소문자, 특수문자와 숫자 로만 입력 가능
export function isPw(pw) {
  var regPw = /^[a-zA-Z0-9`~!@#$%^&*()|;:<>?_\+,.-=/"']{10,20}$/
  if (regPw.test(pw)) {
    return true
  }
  return false
}

// email 검사를 위한 정규식
export function isEmail(email) {
  var regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

  if (regEmail.test(email)) {
    return true
  }

  return false
}

// 휴대폰번호 검사를 위한 정규식
export function isPhoneNumber(phoneNumber) {
  var regPhoneNumber = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/

  if (regPhoneNumber.test(phoneNumber)) {
    return true
  }

  return false
}

// url 검사를 위한 정규식
export function isUrl(urlAdd) {
  var regUrl = /^(https?):\/\/([0-9a-zA-Z|-]+\.)+[a-zA-Z]{2,6}(|:[0-9]+)?(\/\S*)?/

  if (regUrl.test(urlAdd)) {
    return true
  }

  return false
}

// IP4 검사를 위한 정규식
export function isIp4(address) {
  if (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(address)) {
    return true
  }
  return false
}

// 터치원으로 접속했는지 여부를 확인하기 위한 함수
export function isTouchOneLogin() {
  if (touchOneObj.browser === 'ANDROID' || touchOneObj.browser === 'IOS') {
    return true
  }
  return false
}

export function isNumeric(num, opt){
  // 좌우 trim(공백제거)을 해준다.
  num = String(num).replace(/^\s+|\s+$/g, "");
 
  if(typeof opt == "undefined" || opt == "1"){
    // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
    var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
  }else if(opt == "2"){
    // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
    var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
  }else if(opt == "3"){
    // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
    var regex = /^[0-9]+(\.[0-9]+)?$/g;
  }else{
    // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
    var regex = /^[0-9]$/g;
  }
 
  if( regex.test(num) ){
    num = num.replace(/,/g, "");
    return isNaN(num) ? false : true;
  } 
  else { 
    return false;  
  }
}
