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

const bas0060Menu = {

  bas0060Main: [
    {
      comCode:"COM0001",
      insCode:"D1",
      insType:"스마트공장장",
      insMeth:"000",
      jugCodeh:"test",
      userFlag:"11111",
      makeDate: getCurrentDate(),
      maker: "test",
      editDate: getCurrentDate(),
      editor: "test",
    },
    {
      comCode:"COM0002",
      insCode:"D2",
      insType:"스마트공장장",
      insMeth:"111",
      jugCodeh:"테스트",
      userFlag:"22222",
      makeDate: getCurrentDate(),
      maker: "테스트",
      editDate: getCurrentDate(),
      editor: "테스트",
    }
  ]
}

export default bas0060Menu