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

const bas0030Menu = {
  bas0031Detail: [
    {
      comCode: "COM0001",
      facCode: "D1",
      proCode: "11",
      proName: "단조",
      proType: "1",
      catType: "단조",
      sortFlag: "생산공정",
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
      proCode: "22",
      proName: "포장",
      proType: "2",
      catType: "포장",
      sortFlag: "생산공정",
      reamrk: "test",
      userFlag: "test",
      makeDate: getCurrentDate(),
      maker: "admin",
      editDate: getCurrentDate(),
      editor: "admin",
    },
  ],
}

export default bas0030Menu