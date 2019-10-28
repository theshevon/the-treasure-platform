import axios from 'axios';
import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER
} from '../types';

/**
 * Logs in a user to the platform.
 */
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

                // store auth token in browser
                localStorage.setItem('TreasureIDToken', token);

                // store utype in browser to manage private routes
                localStorage.setItem('TreasureUType', res.data.type);

                // data to store between navigating routes
                localStorage.setItem('TreasureUName', res.data.name);
                localStorage.setItem('TreasureUImg', res.data.imgSrc);

                // set auth token in all request headers
                axios.defaults.headers.common['Authorization'] = token;

                dispatch({ type : SET_AUTHENTICATED });
                dispatch({
                            type    : SET_USER,
                            payload : res.data
                        });
                dispatch({ type : CLEAR_ERRORS });

                // stop loading and redirect to catalogue
                history.push('/items');
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type    : SET_ERRORS,
                    payload : err.response.data
                });
            });
}

/**
 * Logs out a user from the platform.
 */
export const logoutUser = () => (dispatch) => {

    // remove all the data stored in the browser
    localStorage.removeItem('TreasureIDToken');
    localStorage.removeItem('TreasureUType');
    localStorage.removeItem('TreasureUName');
    localStorage.removeItem('TreasureUImg');

    // remove auth token from request headers
    delete axios.defaults.headers.common['Authorization'];

    dispatch({ type: SET_UNAUTHENTICATED });
}

/**
 * Retrieves necessary user data from the browser's local storage.
 */
export const setUserData = () => (dispatch) => {

    let data = {
        type   : localStorage.TreasureUType,
        name   : localStorage.TreasureUName,
        imgSrc : localStorage.TrasureUImg
    }

    dispatch({
        type   : SET_USER,
        payload: data
    });
}