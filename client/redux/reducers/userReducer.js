import * as t from '../types';

const initialstate = {
    userData: null
};

const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case t.LOAD_USER_REQUEST:
            return { loading: true }
        case t.LOAD_USER_SUCCESS:
            return {
                loading: false,
                userData: action.payload
            }
        case t.LOAD_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;