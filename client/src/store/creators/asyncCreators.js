import axios from 'axios';
import store from '../config'
import { appendTemplate, removeTemplate, userTemplates, renameTemplate, setEditors } from './appStateCreatros';
import { SAVED, TIMEOUT, LOADING, LOADED } from '../types/guiTypes';

export const getUserTemplates = () => {
    return dispatch => {
        dispatch({
            type: LOADING
        })
        axios.get('app/templates')
            .then(res => {
                dispatch(userTemplates(res.data));
                dispatch({
                    type: LOADED
                })
            })
    }
}

export const createNewTemplate = () => {
    return dispatch => {
        dispatch({
            type: LOADING
        })
        axios.post('app/template')
            .then(res => {
                dispatch(appendTemplate(res.data))
                dispatch({
                    type: LOADED
                })
            })
    }
}

export const removeUserTemplate = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING
        })
        axios.delete(`app/template/${id}`)
            .then(res => {
                dispatch(removeTemplate(res.data._id))
                dispatch(setEditors(null, null))
                dispatch({
                    type: LOADED
                })
            })
    }
}

export const renameUserTemplate = (id, title) => {
    return dispatch => {
        dispatch({
            type: LOADING
        })
        axios.put(`app/rename`, {
            id, title
        }).then(res => {
            dispatch(renameTemplate(res.data._id, res.data.title))
            dispatch({
                type: LOADED
            })
        })
    }
}

export const getSingleTemplate = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING
        })
        axios.get(`app/template/${id}`)
            .then(res => {
                dispatch(setEditors(res.data.editors, id))
                dispatch({
                    type: LOADED
                })
            })
    }
}

export const saveChanges = (id, editors) => {
    store.dispatch({
        type: LOADING
    })
    axios.put(`app/template/${id}`, { editors })
        .then(res => {
            store.dispatch({
                type: SAVED
            })
            store.dispatch({
                type: LOADED
            })
            setTimeout(() => {
                store.dispatch({
                    type: TIMEOUT
                })
            }, 5000)
        })
}

export const createTermsOfService = (text, title) => {
    store.dispatch({
        type: LOADING
    })
    axios.post(`app/terms-of-service`, { text, title })
        .then(res => {
            store.dispatch({
                type: LOADED
            })
            close();
        })
}

export const getTermsOfService = () => {
    store.dispatch({
        type: LOADING
    })
    return axios.get('app/terms-of-service')
        .then(res => {
            store.dispatch({
                type: LOADED
            })
            return res.data
        })
}

export const deleteTermsOfService = (id) => {
    store.dispatch({
        type: LOADING
    })
    return axios.delete(`app/terms-of-service/${id}`)
        .then(res => {
            store.dispatch({
                type: LOADED
            })
            return res.data
        })
}

export const updateTermsOfService = (id, text, title) => {
    store.dispatch({
        type: LOADING
    })
    return axios.put(`app/terms-of-service/${id}`, { text, title })
        .then(res => {
            store.dispatch({
                type: LOADED
            })
            close();            
        })
}

export const getSingleTermsOfService = (id) => {
    store.dispatch({
        type: LOADING
    })
    return axios.get(`app/terms-of-service/${id}`)
        .then(res => {
            store.dispatch({
                type: LOADED
            })
            return res.data
        })
}

