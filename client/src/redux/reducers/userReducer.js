import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER
} from '../types';

const initialState = {
                        authenticated : false,
                        name          : null,
                        imgSrc        : null,
                        type          : null
                    }

/**
 * Stores and updates global state information regarding a user.
 */
export default function(state = initialState, action){

    switch(action.type){

        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            }

        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated : true,
                ...action.payload
            }

        default:
            return state;
    }
}