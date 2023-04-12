import {createStore} from 'vuex'

export default createStore({
    state: {
        userInfo: JSON.parse(localStorage.getItem("userInfo")) === undefined || JSON.parse(localStorage.getItem("userInfo")) === null
            ? {} : JSON.parse(localStorage.getItem("userInfo"))
    },
    getters: {
        isLogin(state) {
            return state.userInfo.id !== undefined ? 'true' : 'false';
        },
        isAdmin(state) {
            return state.userInfo.isAdmin !== undefined ? state.userInfo.isAdmin === true : 'false';
        },
        userInfo(state) {
            return state.userInfo;
        },
    },
    mutations: {
        setUserInfo(state, newVal) {
            state.userInfo = newVal === null ? {} : newVal
            localStorage.setItem("userInfo", JSON.stringify(newVal === null ? {} : newVal))
        }
    },
    actions: {},
    modules: {}
})
