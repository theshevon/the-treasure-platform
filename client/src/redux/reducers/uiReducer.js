import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

const initialState = {
                        loading : false,
                        errors  : null
                    }

/**
 * Stores and updates global state information regarding the UI.
 */
export default function(state = initialState, action){

    switch(action.type){

        case SET_ERRORS:
            return {
                ...state,
                loading : false,
                errors  : action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading : false,
                errors  : null
            }

        case LOADING_UI:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}