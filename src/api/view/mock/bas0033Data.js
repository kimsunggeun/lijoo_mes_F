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

const bas0033Menu = {
  bas0033Detail: [
    {
      comCode: "COM0001",
      facCode: "D1",
      whCode: "200010",
      locCode: "TEST",
      locName: "테스트위치",
      sortFlag: "사용",
      reamrk: "test",
      userFlag: "test",
      makeDate: getCurrentDate(),
      maker: "test",
      editDate: getCurrentDate(),
      editor: "test",
    },
    {
      comCode: "COM0002",
      facCode: "D2",
      whCode: "200020",
      locCode: "TEST",
      locName: "테스트위치",
      sortFlag: "사용",
      reamrk: "test",
      userFlag: "test",
      makeDate: getCurrentDate(),
      maker: "adimin",
      editDate: getCurrentDate(),
      editor: "adimin",
    },
  ],
}

export default bas0033Menu