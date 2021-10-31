import axios from "axios"
import { root_server } from "../../constants"
import { 
  ADD_USER, 
  FETCHING_TOKEN, 
  FETCH_TOKEN_FAIL, 
  FETCH_TOKEN_SUCCESS, 
  REMOVE_TOKEN, 
  REMOVE_USER 
} from "../constants/authenticationConstants"


const dispatchWithData = (dispatch, data) => {
  if(data.data){
    localStorage.setItem('token', data.data.token)
    dispatch({
      type: FETCH_TOKEN_SUCCESS,
      payload: data.data.token
    })

    const {access_api, name, email} = data.data.user
    dispatch({
      type: ADD_USER,
      payload: {
        access_api, name, email
      }
    })
  }

  if(data.errors){
    dispatch({
      type: FETCH_TOKEN_FAIL,
      payload: data.errors
    })
  }
}

export const signinAction = ({email, password}) => async dispatch => {
  try {
    dispatch({type: FETCHING_TOKEN})

    const res = await axios.post(`${root_server}/sign-in`, { email, password })
    const data = res.data

    dispatchWithData(dispatch, data)
  } catch (e) {
    console.log(e)
    dispatch({
      type: FETCH_TOKEN_FAIL,
      payload: {
        messages: ['request fail']
      }
    })
  }
}

export const signupAction = ({name, email, password}) => async dispatch => {
  try {
    dispatch({type: FETCHING_TOKEN})

    const res = await axios.post(`${root_server}/sign-up`, { name, email, password })
    const data = res.data

    dispatchWithData(dispatch, data)      
  } catch (e) {
    console.log(e)
    dispatch({
      type: FETCH_TOKEN_FAIL,
      payload: {
        messages: ['request fail']
      }
    })
  }
}

export const signoutAction = () => async dispatch => {
  dispatch({type: REMOVE_TOKEN})
}

export const removeUserToManagement = () =>  dispatch => {
  dispatch({
    type: REMOVE_USER
  })
}