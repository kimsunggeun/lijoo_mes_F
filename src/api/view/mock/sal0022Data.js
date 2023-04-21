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

const sal0022Menu = {
  sal0022Main: [
    {
      comCode:"COM0001", 
      facCode:"D1",
      ordNo:"test",
      ilNo:"test",
      no:"test",  
      lotNo:"test", 
      lotDetail:"test", 
      insCode:"1",  
      proCode:"10,000",  
      insType:"test", 
      insMeth:"test", 
      jugCodeh:"test", 
      sampleQty1:"test",
      sampleQty2:"test", 
      sampleQty3:"test", 
      sampleQty4:"test", 
      sampleQty5:"test", 
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
      insCode:"1",  
      proCode:"10,000",  
      insType:"test", 
      insMeth:"test", 
      jugCodeh:"test", 
      sampleQty1:"test",
      sampleQty2:"test", 
      sampleQty3:"test", 
      sampleQty4:"test", 
      sampleQty5:"test", 
      remark:"test", 
      makeDate:getCurrentDate(), 
      maker:"test", 
      editDate:getCurrentDate(), 
      editor:"test", 
    },
  ],
}

export default sal0022Menu