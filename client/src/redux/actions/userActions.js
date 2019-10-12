import axios from 'axios';
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER
} from '../types';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type : LOADING_UI });

    axios({
        method: 'post',
        url: '/login',
        data: userData
    })
    .then(res => {

        // extract token
        const token = `Bearer ${res.data.token}`;

        // probably a bad idea in terms of security:
        localStorage.setItem('TreasureIDToken', token);

        // set token as in all request headers
        axios.defaults.headers.common['Authorization'] = token;

        dispatch(getUserData());
        dispatch({ type : CLEAR_ERRORS});

        // stop loading and redirect to catalogue
        history.push('/chest');
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getUserData = () => (dispatch) => {
    axios({
        method: 'get',
        url: 'user/id'
    })
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
    });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('TreasureIDToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}