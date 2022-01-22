import * as types from './allgistsTypes'
import axios from 'axios';
import { TOKEN } from '../../config';





export function getContents(url) {
    return function (dispatch) {
        const promisesArray = url.map(async (item) => {
            let res = await axios.get(item, {
                headers: { Authorization: `Token ${TOKEN}` }
            });
            return res;
        });
        Promise.all(promisesArray)
            .then((res) => {
                let contentsArray = res.map((item) => {
                    return Object.values(item.data.files)[0].content;
                })
                dispatch(gistContentSuccess(contentsArray));
            })
            .catch((err) => {
                dispatch(gistContentFailure(err));
            })
    }
}

export const gistContentSuccess = (data) => {
    return {
        type: types.GET_ALLGISTSCONTENT_SUCCESS,
        data,
    }
}

export const gistContentFailure = (error) => {
    return {
        type: types.GET_ALLGISTSCONTENT_ERROR,
        error,
    }
}

export const fetchGistRequest = () => {
    return {
        type: types.FETCH_ALLGISTS_REQUEST
    }
}
export const fetchGistSuccess = (data) => {
    return {
        type: types.FETCH_ALLGISTS_SUCCESS,
        payload: data
    }
}
export const fetchGistFailure = (error) => {
    return {
        type: types.FETCH_ALLGISTS_FAILURE,
        payload: error
    }
}