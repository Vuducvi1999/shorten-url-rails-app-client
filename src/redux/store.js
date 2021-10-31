import {applyMiddleware, createStore} from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'

const middleware = [reduxThunk]

if(process.env.NODE_ENV !== 'production'){
  middleware.push(createLogger())
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store