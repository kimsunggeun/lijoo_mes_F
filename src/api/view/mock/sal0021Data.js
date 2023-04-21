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

const sal0021Menu = {
  sal0021Main: [
    {
      comCode:"COM0001", 
      facCode:"D1",
      ordNo:"test",
      ilNo:"test",
      no:"test",  
      outDate:"test", 
      custCode:"test",  
      partNo:"test", 
      lotNo:"test", 
      lotDetail:"test", 
      qty:"1",  
      price:"10,000",  
      amount:"test", 
      closeMonth:"test", 
      closeYn:"test", 
      confirmYn:"test", 
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
      outDate:"test", 
      custCode:"test",  
      partNo:"test", 
      lotNo:"test", 
      lotDetail:"test", 
      qty:"1",  
      price:"10,000",  
      amount:"test", 
      closeMonth:"test", 
      closeYn:"test", 
      confirmYn:"test", 
      remark:"test", 
      makeDate:getCurrentDate(), 
      maker:"test", 
      editDate:getCurrentDate(), 
      editor:"test", 
    },
  ],
}

export default sal0021Menu