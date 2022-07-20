import * as t from '../types';
import axios from 'axios';

export const loadUser = (email, user) => async (dispatch) => {
    try {
         dispatch({ type: t.LOAD_USER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/user/userData`, { email }, config)
         dispatch({
            type: t.LOAD_USER_SUCCESS,
            payload: data || user
        })
    } catch (error) {
        dispatch({
            type: t.LOAD_USER_FAIL,
            payload: error.responce &&
                error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};