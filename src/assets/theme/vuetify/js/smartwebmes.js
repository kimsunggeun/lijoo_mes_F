export default {
  icons: {
    iconfont: 'mdi',
    values: {
      copy: 'mdi-content-copy', //20220509 LYJ 추가
      mail: 'mdi-email',
      person: 'mdi-account',
      setting: 'mdi-cog',
      lock: 'mdi-lock',
      dashboard: 'mdi-view-dashboard',
      monitor: 'mdi-monitor',
      data_search: 'mdi-database-search',
      info: 'mdi-information',
      tool: 'mdi-tools',
      tag: 'mdi-tag-multiple',
      user: 'mdi-account-circle',
      alarm: 'mdi-alarm-light-outline',
      play: 'mdi-play',
      calendar: 'mdi-calendar-today',
      search: 'mdi-magnify',
      save: 'mdi-content-save',
      delete: 'mdi-delete',
      welding: 'mdi-mace',
      camera: 'mdi-camera',
      data: 'mdi-database',
      graph: 'mdi-chart-line',
      //excel: 'mdi-file-download-outline',
      change_pw: 'mdi-lock-reset', // 20230331 KWY 추가
      logout: 'mdi-logout-variant', // 20230331 KWY 추가
      file_document:'mdi-file-document-outline', // 20230403 KWY 추가
      calendar_clock: 'mdi-calendar-clock',  // 20230403 KWY 추가
      file_cog: 'mdi-file-cog-outline', // 20230403 KWY 추가 비가동이력
      excel: 'mdi-file-excel',
      arrow_r: 'mdi-chevron-right',
      arrow_d: 'mdi-chevron-down',
      close: 'mdi-close',
      electric_current: 'mdi-resistor',
      voltage: 'mdi-speedometer',
      gas: 'mdi-gas-cylinder',
      heart: 'mdi-heart',
      share: 'mdi-share-variant',
      on_eye: 'mdi-eye',
      off_eye: 'mdi-eye-off',
      list: 'mdi-view-list',
      reload: 'mdi-reload',
      pencil: 'mdi-pencil',
      upload: 'mdi-upload',
      print: 'mdi-printer',
      apply: 'mdi-check-underline',
      folder: 'mdi-folder-open-outline',
      business: 'mdi-domain',
      fullscreen: 'mdi-fullscreen',
      choice: 'mdi-check',
      confirm: 'mdi-check',
      confirmCancel: 'mdi-cancel',
      rChevron: 'mdi-chevron-double-right',
      refresh: 'mdi-refresh',
      move: 'mdi-arrow-right',
    },
  },
  theme: {
    themes: {
      light: {
        primary: '#003ac5', //'#E2EBE9',         // 메인 버튼, 액티브
        secondary: '#E2EBE9', // 서브 버튼
        third: '#90CAF9', //
        accent: '#0036DC', // 강조 
        info: '#4DB6AC', // 정보, 알림
        success: '#4caf50', // 성공
        error: '#F44336', // 실패, 오류
        warning: '#ff9800', // 주의

        RefreshBtn: '#01d8ff', // 자재관리 상단 새로고침 버튼 

        // text color
        app_bar_title: '#FFFFFF', // app bar, tool bar
        nav_title: '#000000', // navigation drawer title
        nav_blue_title: '#2c52eb', // navigation drawer title 좌측 메뉴 화살표 색상 추가
        menu_title: '#FFFFFF', // menu title
        login_pop_text: '#212121', // login_pop_text 상단메뉴 우측 로그인정보 팝업 텍스트 색상
        login_pop_text2: '#2c52eb', // login_pop_text 상단메뉴 우측 로그인정보 팝업 텍스트 색상
        list_title: '#2A2A2A', // list title
        // card_title: '#FFFFFF',      // card title
        card_title: '#222', // card title
        sub_title: '#757575', // sub title
        content: '#2f323a', // content, card text

        // background color
        app_bar_bg: '#2342bd', // app bar, tool bar
        // app_bar_bg: '#0036DC',      // app bar, tool bar        
        nav_bg: '#F8F8FB', // navigation drawer
        menu_bg: '#455B59', // menu
        login_pop_bg: '#e5ebf9', // 우측상단 로그인정보 팝업 배경색
        btn_bg: '#9E9E9E', // 버튼
        list_bg: '#F8F8F8', // list, list group
        container_bg: '#F8F8F8', // container
        card_bg: '#F5F5F5', // card
        card_title_bg: '#007CDC', // card title
        card_alarm_bg: '#e5f2fb', // card alarm_bg 용접 이상 정보 (알람당일)
        tabs_bg: '#D9D9D9', // tabs bg

        inner_active_menu: '#757575', //menu text
        tabview_bg: '#cccccc', //tabviewbg //2022-03-17 by lyj tabview테마적용22
        tabview_active_text: '#007CDC',
        tabview_text: '#007CDC',
        login_bg: '#6faf9f', // login main color
        login_container_bg: '#f7f7f7', // login container
        sub_card_bg: '#e5f2fb', // sub card

        devest_grid_reqheader: '#0000ff' // 그리드 헤더 필수 입력일 경우 색상 표시
      },
      dark: {
        primary: '#007CDC', // 메인 버튼, 액티브
        secondary: '#2196F3', // 서브 버튼
        third: '#2f323a', // 
        accent: '#0036DC', // 강조
        info: '#4DB6AC', // 정보, 알림
        success: '#4caf50', // 성공
        error: '#F44336', // 실패, 오류
        warning: '#ff9800', // 주의

        // text color
        app_bar_title: '#FFFFFF', // app bar, tool bar
        nav_title: '#FFFFFF', // navigation drawer title
        menu_title: '#FFFFFF', // menu title
        list_title: '#FFFFFF', // list title
        card_title: '#FFFFFF', // card title
        sub_title: '#FFFFFF', // sub title
        content: '#FFFFFF', // content, card text

        // background color
        app_bar_bg: '#39373A', // app bar, tool bar
        nav_bg: '#39373A', // navigation drawer
        menu_bg: '#39373A', // menu
        list_bg: '#39373A', // list, list group
        container_bg: '#111216', // container
        card_bg: '#2A2A2A', // card
        card_title_bg: '#007CDC', // card  title
        card_alarm_bg: '#2a2a2a',
        tabs_bg: '#39373A', // tabs bg 
      }
    }
  }
}