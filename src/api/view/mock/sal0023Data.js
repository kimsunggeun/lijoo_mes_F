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

const sal0023Menu = {
  sal0023Main: [
    {
      comCode:"COM0001", 
      facCode:"D1",
      ordNo:"test",
      ilNo:"test",
      no:"test",  
      lotNo:"test", 
      lotDetail:"test", 
      retLotNo:"1", 
      retLotDetail:"test", 
      retCode:"test",
      retType:"test", 
      whCode:"test", 
      partNo:"test", 
      retQty:"10,000", 
      remark:"test", 
      makeDate:getCurrentDate(), 
      maker:"test", 
      editDate:getCurrentDate(), 
      editor:"test", 
    },
    {
      comCode:"COM0002", 
      facCode:"D2",
      ordNo:"test",
      ilNo:"test",
      no:"test",  
      lotNo:"test", 
      lotDetail:"test", 
      retLotNo:"1", 
      retLotDetail:"test", 
      retCode:"test",
      retType:"test",
      whCode:"test", 
      partNo:"test", 
      retQty:"20,000", 
      remark:"test", 
      makeDate:getCurrentDate(), 
      maker:"test", 
      editDate:getCurrentDate(), 
      editor:"test", 
    },
  ],
}

export default sal0023Menu