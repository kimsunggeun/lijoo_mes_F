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
  bas0030Main: [
    {
      comCode:"COM0001",
      facCode:"D1",
      facName:"스마트공장장",
      facNumber:"000",
      name:"test",
      postNo:"11111",
      addr: "부산",
      tel: "005-1232-3332",
      fax: "005-2222-2223",
      makeDate: getCurrentDate(),
      maker: "test",
      editDate: getCurrentDate(),
        editor: "test",
    },
    {
      comCode:"COM0002",
      facCode:"D2",
      facName:"스마트공장장",
      facNumber:"111",
      name:"test",
      postNo:"11111",
      addr: "창원",
      tel: "005-1232-3332",
      fax: "005-2222-2223",
      makeDate: getCurrentDate(),
      maker: "admin",
      editDate: getCurrentDate(),
        editor: "admin",
    },
  ],
}

export default bas0030Menu