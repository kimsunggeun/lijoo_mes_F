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

const bas0011Menu = {
  bas0011Detail: [
    {
      comCode: 'COM0001',
      codeGr: '일주지앤에스',
      code: '0000',
      sysCode:"test",
      sysName:"test",
      sortFlag:'test',
      userFlag:"test",
      makeDate: getCurrentDate(),
      maker: 'admin',
      editDate: getCurrentDate(),
      editor: 'admin',
    },
    {
      comCode: 'COM0001',
      codeGr: '일주지앤에스',
      code: '0000',
      sysCode:"test",
      sysName:"test",
      sortFlag:'test',
      userFlag:"test",
      makeDate: getCurrentDate(),
      maker: 'admin',
      editDate: getCurrentDate(),
      editor: 'admin',
    },
    {
      comCode: 'COM0002',
      codeGr: '현대모터스',
      code: '0001',
      sysCode:"test",
      sysName:"test",
      sortFlag:'test',
      userFlag:"test",
      makeDate: getCurrentDate(),
      maker: 'admin',
      editDate: getCurrentDate(),
      editor: 'admin',
    },
    {
      comCode: 'COM0002',
      codeGr: '현대모터스',
      code: '0001',
      sysCode:"test",
      sysName:"test",
      sortFlag:'test',
      userFlag:"test",
      makeDate: getCurrentDate(),
      maker: 'admin',
      editDate: getCurrentDate(),
      editor: 'admin',
    },
    {
      comCode: 'COM0002',
      codeGr: '현대모터스',
      code: '0001',
      sysCode:"test",
      sysName:"test",
      sortFlag:'test',
      userFlag:"test",
      makeDate: getCurrentDate(),
      maker: 'admin',
      editDate: getCurrentDate(),
      editor: 'admin',
    },
  ],
}

export default bas0011Menu