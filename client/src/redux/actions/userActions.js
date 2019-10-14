import axios from 'axios';
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
} from '../types';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type : LOADING_UI });

    axios({
        method : 'post',
        url    : '/login',
        data   : userData
    })
    .then(res => {

        // extract token
        const token = `Bearer ${res.data.token}`;

        // probably a bad idea in terms of security:
        localStorage.setItem('TreasureIDToken', token);

        // set token in all request headers
        axios.defaults.headers.common['Authorization'] = token;

        dispatch({ type : SET_AUTHENTICATED });
        dispatch(getUserData());
        dispatch({ type : CLEAR_ERRORS });

        // stop loading and redirect to catalogue
        history.push('/items');
    })
    .catch(err => {
        dispatch({
            type    : SET_ERRORS,
            payload : err.response.data
        })
    })
}

export const getUserData = () => (dispatch) => {
    axios({
        method: 'get',
        url: '/user'
    })
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });

        // hacky code to manage private routes
        localStorage.setItem('TreasureUType', res.data.type);

        // data to store between navigating routes
        localStorage.setItem('TreasureUName', res.data.name);
        localStorage.setItem('TreasureUImg', res.data.imgSrc);

    })
    .catch(err => {
        console.log(err);
    });
}

export const logoutUser = () => (dispatch) => {

    // remove local storage data
    localStorage.removeItem('TreasureIDToken');
    localStorage.removeItem('TreasureUType');
    localStorage.removeItem('TreasureUName');
    localStorage.removeItem('TreasureUImg');

    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}