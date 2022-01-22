import * as types from './allgistsTypes'

const initialState = {
    contentData: {},
    contentDataError: '',
    gistsData: [],
    error: ''
}

const gistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALLGISTSCONTENT_SUCCESS:
            return {
                ...state,
                contentData: action.data
            }

        case types.GET_ALLGISTSCONTENT_ERROR:
            return {
                ...state,
                contentDataError: action.error
            }

        case types.FETCH_ALLGISTS_REQUEST:
            return {
                ...state,
            }

        case types.FETCH_ALLGISTS_SUCCESS:
            return {
                ...state,
                gistsData: action.payload,
                error: ''
            }

        case types.FETCH_ALLGISTS_FAILURE:
            return {
                ...state,
                gistsData: [],
                error: action.payload
            }

        default: return state;
    }
}

export default gistsReducer;