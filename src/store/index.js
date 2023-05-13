import {createStore} from 'vuex'

export default createStore({
    state: {
        userInfo: JSON.parse(localStorage.getItem("userInfo")) === undefined || JSON.parse(localStorage.getItem("userInfo")) === null
            ? {} : JSON.parse(localStorage.getItem("userInfo")),
        token: localStorage.getItem("token") === undefined || localStorage.getItem("token") === null
            ? null : localStorage.getItem("token")
    },
    getters: {
        isLogin(state) {
            return state.userInfo.id !== undefined ? 'true' : 'false';
        },
        isAdmin(state) {
            return state.userInfo.isAdmin !== undefined ? state.userInfo.isAdmin === true : false;
        },
        userInfo(state) {
            return state.userInfo;
        },
        getToken(state) {
            return state.token;
        }
    },
    mutations: {
        setUserInfo(state, newVal) {
            console.log(newVal)
            state.userInfo = newVal === null ? {} : newVal
            localStorage.setItem("userInfo", JSON.stringify(newVal === null ? {} : newVal))
        },
        setToken(state, newVal) {
            state.token = newVal ? "" : newVal
            localStorage.setItem("token", newVal)
        }
    },
    actions: {},
    modules: {}
})
