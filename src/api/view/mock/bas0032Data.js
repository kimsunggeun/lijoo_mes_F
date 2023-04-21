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

const bas0032Menu = {
  bas0032Detail: [
    {
      comCode: "COM0001",
      facCode: "D1",
      whCode: "200010",
      whName: "생산1팀",
      whType: "작업반창고",
      whDesc: "내부창고",
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
      whCode: "200020",
      whName: "생산2팀",
      whType: "외주창고",
      whDesc: "외부창고",
      sortFlag: "생산공정",
      reamrk: "test",
      userFlag: "test",
      makeDate: getCurrentDate(),
      maker: "test",
      editDate: getCurrentDate(),
      editor: "test",
    },
  ],
}

export default bas0032Menu