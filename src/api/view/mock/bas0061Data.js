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

const bas0061Menu = {

  bas0061Main: [
    {
      comCode:"COM0001",
      partNo:"D1",
      inspNo:"test",
      insCode:"test",
      insType:"스마트공장장",
      insMeth:"000",
      jugCodeh:"test",
      insUnit:"test",
      insBase:"test",
      insUpp:"test",
      insLow:"test",
      insCnt:"test",
      remark:"test",
      userFlag:"11111",
      makeDate: getCurrentDate(),
      maker: "test",
      editDate: getCurrentDate(),
      editor: "test",
    },
    {
      comCode:"COM0002",
      partNo:"D2",
      inspNo:"test2",
      insCode:"test2",
      insType:"스마트공장장",
      insMeth:"000",
      jugCodeh:"test2",
      insUnit:"test2",
      insBase:"test2",
      insUpp:"test2",
      insLow:"test2",
      insCnt:"test2",
      remark:"test2",
      userFlag:"22222",
      makeDate: getCurrentDate(),
      maker: "test",
      editDate: getCurrentDate(),
      editor: "test",
    }
  ]
}

export default bas0061Menu