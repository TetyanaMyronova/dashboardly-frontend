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

    getUser = () => (
        superagent
            .get(`${API_HOST}/auth/me`)
    )

    createBoard = (title, description) => (
        superagent
            .post(`${API_HOST}/boards`)
            .send({title, description})
    )

    createBookmark = (boardId, title, url, description) => (
        superagent
            .post(`${API_HOST}/boards/${boardId}/bookmarks`)
            .send({boardId, title, url, description})
    )

    updateBoard = (id, title, description) => (
        superagent
            .patch(`${API_HOST}/boards/${id}`)
            .send({id, title, description})
    )

    updateBookmark = (id, title, description, url) => (
        superagent
            .patch(`${API_HOST}/bookmarks/${id}`)
            .send({id, title, description, url})
    )

    validateBoardOwner = (boardId) => (
        superagent
            .post(`${API_HOST}/auth/boardowner`)
            .send({boardId})
    )


}

export default new Api();
