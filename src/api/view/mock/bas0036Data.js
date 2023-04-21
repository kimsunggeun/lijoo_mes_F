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

const bas0036Menu = {
  bas0036Detail: [
    {
    comCode:"COM0001",
    facCode:"D1",
    eqCode:"BHJ01",
    eqName:"BHJ조립설비",
    eqSpec:"1",
    eqGrade:"1",
    proCode:"조립",
    eqState:"가동",
    makeCom:"디엠테크",
    perCom:"디엠테크",
    proDate:"2021-09-26",
    insDate:"2021-09-28",
    desDate:"2022-10-10",
    eqpImage:"require(`@/assets/images/itemCount.png`)",
    sortFlag:"생산공정",
    remark:"",
    userFlag:"사용",
    makeDate:getCurrentDate(),
    maker:"테스터",
    editDate:getCurrentDate(),
    editor:"테스터"  
    },
    {
    comCode:"COM0002",
    facCode:"D2",
    eqCode:"BHJ01",
    eqName:"BHJ조립설비",
    eqSpec:"1",
    eqGrade:"1",
    proCode:"조립",
    eqState:"가동",
    makeCom:"디엠테크",
    perCom:"디엠테크",
    proDate:"2021-09-26",
    insDate:"2021-09-28",
    desDate:"2022-10-10",
    eqpImage:"require(`@/assets/images/itemCount.png`)",
    sortFlag:"생산공정",
    remark:"",
    userFlag:"사용",
    makeDate:getCurrentDate(),
    maker:"테스터",
    editDate:getCurrentDate(),
    editor:"테스터"    
    },
  ],
}

export default bas0036Menu