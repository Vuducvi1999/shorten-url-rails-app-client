import {combineReducers} from 'redux'
import authenticationReducer from './authenticationReducer'
import managementReducer from './managementReducer'

const rootReducer = combineReducers({
  management: managementReducer,
  authentication: authenticationReducer
})

export default rootReducer