import api from './api';

module.exports = {

    signup(email, pass) {

        if (localStorage.token) {
            throw new Error('Already logged in') //revise it later
        }
        else {
            return api.requestSignup(email, pass)
        }
    },

    login(email, pass) {
        if (localStorage.token) {
            throw new Error('Already logged in')
        }
        else {
            return api.requestLogin(email, pass)
                .then(res => localStorage.token = res.body.token)
        }
    },

    getToken() {
        return localStorage.token
    },

    logout() {
        return api.requestLogout(localStorage.token)
            .then(res => delete localStorage.token)
    },

    isLoggedIn() {
        return !!localStorage.token
    },

    getUser() {
        return api.getUser()
            .then(res => {
                localStorage.id = res.body.id;
                localStorage.email = res.body.email;
                localStorage.avatarurl = res.body.avatarUrl;
                //console.log(res.body);
                return localStorage;
            });
    },

    getUserId() {
        return localStorage.id;

    }
    // getAvatar() {
    //     return localStorage.avatarurl;
    // }
}
