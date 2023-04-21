export default {
  headers: [
    //{ text: 'No', value: 'No', align: 'start', sortable: false },
    { text: '코드', value: 'code', align: 'center', class: 'card_bg' },
    { text: '코드명', value: 'codeName', align: 'center', class: 'card_bg' },
    { text: '내용', value: 'content', align: 'center', class: 'card_bg' },
    { text: '비고', value: 'remark', align: 'center', class: 'card_bg' }
  ],
  desserts: [
    {
      code: 'C0001-01',
      codeName: '최고관리자',
      content: '',
      remark: ''
    },
    {
      code: 'C0002-01',
      codeName: '일반',
      content: '',
      remark: ''
    }
  ]
}
