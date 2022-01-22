import { FETCH_APP_FAILURE, FETCH_APP_REQUEST, FETCH_APP_SUCCESS, GET_USER_ERROR, GET_USER_SUCCESS } from "./appTypes"
import axios from 'axios';
import { TOKEN } from '../../config';

export function getUserdetails() {
    return function (dispatch) {
        axios.get(`https://api.github.com/user`, {
            headers: { Authorization: `Token ${TOKEN}` }
        })
            .then((res) => {
                dispatch(userDetailsSuccess(res.data))
            }).catch(err => {
                dispatch(userDetailsFailure(err))
            })
    }

}

export function getGistsdetails(userName) {
    return function (dispatch) {
        axios.get(`https://api.github.com/users/${userName}/gists`, {
            headers: { Authorization: `Token ${TOKEN}` }
        })
            .then((res) => {
                dispatch(fetchAppSuccess(res.data))
            }).catch(err => {
                dispatch(fetchAppFailure(err))
            })
    }


}



export const userDetailsSuccess = (data) => {
    return {
        type: GET_USER_SUCCESS,
        data,
    }
}


export const userDetailsFailure = (error) => {
    return {
        type: GET_USER_ERROR,
        error
    }
}


export const fetchAppRequest = () => {
    return {
        type: FETCH_APP_REQUEST
    }
}
export const fetchAppSuccess = (data) => {
    return {
        type: FETCH_APP_SUCCESS,
        payload: data
    }
}
export const fetchAppFailure = (error) => {
    return {
        type: FETCH_APP_FAILURE,
        payload: error
    }
}

