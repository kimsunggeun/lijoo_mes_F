import { loadMessages } from 'devextreme/localization';
// 한글은 지원하지 않아 en을 수정
// 지원언어
// English (en) (default)
// German (de)
// Japanese (ja)
// Russian (ru)

// https://github.com/DevExpress/DevExtreme/blob/19_1/js/localization/messages/en.json#L114 참조
loadMessages({
    "en" : {
        "dxDataGrid-sortingAscendingText": "오름차순",
        "dxDataGrid-sortingDescendingText": "내림차순",        
        "dxDataGrid-sortingClearText": "정렬 취소",
        "Cancel": "취소",
    }
})