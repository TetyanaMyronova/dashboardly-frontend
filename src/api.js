import superagent from 'superagent'
import {API_HOST} from './config'

class Api {

    requestSignup = (email, password) => (
        superagent
            .post(`${API_HOST}/auth/users`)
            .send({email, password})
    )

    requestLogin = (email, password) => (
        superagent
            .post(`${API_HOST}/auth/sessions`)
            .send({email, password})
    )

    requestLogout = (token) => (
        superagent
            .delete(`${API_HOST}/auth/sessions`)
            .set('Authorization', `token ${token}`)
    )

    getBoardsList = (page, count) => (
        superagent
            .get(`${API_HOST}/boards`)
    )

    getBoard = (id) => (
        superagent
            .get(`${API_HOST}/boards/${id}`)
    )

    getBookmarks = (boardId) => (
        superagent
            .get(`${API_HOST}/boards/${boardId}/bookmarks`)
    )

    getUser = (token) => (
        superagent
            .get(`${API_HOST}/auth/me`)
            .set('Authorization', `token ${token}`)
    )

    createBoard = (token, title, description) => (
        superagent
            .post(`${API_HOST}/boards`)
            .set('Authorization', `token ${token}`)
            .send({title, description})
    )

    createBookmark = (token, boardId, title, url, description) => (
        superagent
            .post(`${API_HOST}/boards/${boardId}/bookmarks`)
            .set('Authorization', `token ${token}`)
            .send({boardId, title, url, description})
    )

    updateBoard = (token, id, title, description) => (
        superagent
            .patch(`${API_HOST}/boards/${id}`)
            .set('Authorization', `token ${token}`)
            .send({id, title, description})
    )

    updateBookmark = (token, id, title, description, url) => (
        superagent
            .patch(`${API_HOST}/bookmarks/${id}`)
            .send({id, title, description, url})
    )

    deleteBoard = (token, id) => (
        superagent
            .delete(`${API_HOST}/boards/${id}`)
            .set('Authorization', `token ${token}`)
            .send({id})
    )

    deleteBookmark = (token, id) => (
        superagent
            .delete(`${API_HOST}/bookmarks/${id}`)
            .set('Authorization', `token ${token}`)
            .send({id})
    )

    // validateBoardOwner = (boardId) => (
    //     superagent
    //         .post(`${API_HOST}/auth/boardowner`)
    //         .send({boardId})
    // )


}

export default new Api();
