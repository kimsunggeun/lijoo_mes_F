import Cookies from 'js-cookie'

export default {
    namespaced: true,

    //data
    state : {
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
            withoutAnimation: false
        },
        device: 'desktop',
        size: Cookies.get('size') || 'medium',
        isScreenFull: window.innerHeight == screen.height
    },

    //데이터 변경시
    mutations : {

        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
        },
        OPEN_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = true
            state.sidebar.withoutAnimation = withoutAnimation
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 0)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },

        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },

        SET_SIZE: (state, size) => {
            state.size = size
            Cookies.set('size', size)
        },
        SET_IS_SCREEN_FULL: (state, value) => {
            state.isScreenFull = value
        }
    },

    //methods
    actions : {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        openSideBar({ commit }, { withoutAnimation }) {
            commit('OPEN_SIDEBAR', withoutAnimation)
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
        setSize({ commit }, size) {
            commit('SET_SIZE', size)
        },
        setIsScreenFull({ commit }, value) {
            value ? commit('CLOSE_SIDEBAR', value) : commit('TOGGLE_SIDEBAR', false)
            commit('SET_IS_SCREEN_FULL', value)
        },
    },

    //computed
    getters : {
        isScreenFull: (state) => {
            return state.isScreenFull;
        }
    }

}