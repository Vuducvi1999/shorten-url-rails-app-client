import { 
  ADD_USER,
  FETCHING_TOKEN, 
  FETCH_TOKEN_FAIL, 
  FETCH_TOKEN_SUCCESS, 
  REMOVE_TOKEN, 
  REMOVE_USER
} from "../constants/authenticationConstants";

const tokenFromStorage = localStorage.getItem('token')

const userFromStorage = localStorage.getItem('user')
const initUser = () => {
  if(userFromStorage){
    return JSON.parse(userFromStorage)
  }
  return {
    access_api: null, 
    name: null, 
    email: null
  }
}

const initialize = {
  requesting: false,
  token: tokenFromStorage,
  errors: {},
  valid: !!tokenFromStorage,
  user: initUser()
}

const authenticationReducer = (state = initialize, action) => {
  switch(action.type) {
    case FETCHING_TOKEN:
      return {
        ...initialize,
        requesting: true,
      }
    case FETCH_TOKEN_FAIL:
      return {
        ...state,
        requesting: false,
        valid: false,
        errors: action.payload,
        token: ''
      }
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        requesting: false,
        valid: true,
        token: action.payload,
        errors: {}
      }
    case REMOVE_TOKEN:
      localStorage.removeItem('token')
      return {
        ...initialize,
        token: null,
        valid: false
      }
    case ADD_USER:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }
    case REMOVE_USER:
      return {
        ...state,
        user: initialize.user
      }
    default:
      return state;
  }
}

export default authenticationReducer