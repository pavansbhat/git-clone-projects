
const { FETCH_APP_REQUEST, FETCH_APP_SUCCESS, FETCH_APP_FAILURE, GET_USER_SUCCESS, GET_USER_ERROR } = require("./appTypes")

const initialState = {
    userData: {},
    userDataError: '',
    data: [],
    error: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {
                ...state,
                userData: action.data
            }

        case GET_USER_ERROR:
            return {
                ...state,
                userDataError: action.error
            }

        case FETCH_APP_REQUEST:
            return {
                ...state,
            }

        case FETCH_APP_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: ''
            }

        case FETCH_APP_FAILURE:
            return {
                ...state,
                data: [],
                error: action.payload
            }

        default: return state;
    }
}

export default appReducer;
