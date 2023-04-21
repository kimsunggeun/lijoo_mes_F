/*
  # 메뉴 데이터 형식
    {
      comCode: String,      //회사코드
      proCode: String,      //공장코드
      sysType: String,      //시스템구분
      menuCode: String,     //메뉴코드
      moduleCode: String,   //모듈코드
      menuName: String,     //매뉴명
      paCode: String,       //부모메뉴코드
      pgCode: String,       //프로그램코드
      sortFlag: String,     //정렬순서
    }
*/

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

const bas0034Menu = {
  bas0034Detail: [
    {
    comCode:"COM0001",
    facCode:"D1",
    workCode:"101010",
    workName:"PUSH ROD",
    workType:"생산",
    workDesc:"1공장 조립 작업장",
    depCode:"27",
    sortFlag:"생산공정",
    remark:"",
    userFlag:"사용",
    makeDate:getCurrentDate(),
    maker:"테스터",
    editDate:getCurrentDate(),
    editor:"테스터"  
    },
    {
    comCode:"COM0002",
    facCode:"D2",
    workCode:"202020",
    workName:"PUSH ROD",
    workType:"생산",
    workDesc:"1공장 조립 작업장",
    depCode:"27",
    sortFlag:"생산공정",
    remark:"",
    userFlag:"사용",
    makeDate:getCurrentDate(),
    maker:"테스터",
    editDate:getCurrentDate(),
    editor:"테스터"  
    },
  ],
}

export default bas0034Menu