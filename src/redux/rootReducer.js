import { combineReducers } from 'redux';
import appReducer from './appjs/appReducer'
import allgistsReducer from './Allgists/allgistsReducer'

const rootReducer = combineReducers({
    app: appReducer,
    allgist: allgistsReducer,
})

export default rootReducer;