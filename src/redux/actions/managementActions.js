import axios from "axios"
import { 
  DELETE_URL_FAIL,
  DELETE_URL_SUCCESS,
  FETCHING_URL,
  FETCH_URL_LINKS_FAIL, 
  FETCH_URL_LINKS_SUCCESS,
} from "../constants/managementConstants"
import {root_server} from '../../constants'

export const fetchUrlLinks = (token, page) => async dispatch => {
  dispatch({type: FETCHING_URL})

  const data = await axios.get(`${root_server}/links`,{
    headers:{
      Authorization: `Bearer ${token}`
    }, 
    params: {
      page
    }
  })

  if(data.data.data){
    dispatch({
      type: FETCH_URL_LINKS_SUCCESS,
      payload: {
        links: data.data.data,
        total_pages: data.data.total_pages
      }
    })
  }
  if(data.data.errors){
    dispatch({
      type: FETCH_URL_LINKS_FAIL,
      payload: data.data.errors
    })
  }
}

export const deleteUrlLink = (token, alias) => async dispatch => {
  try {
    dispatch({type: FETCHING_URL})

  const data = await axios.delete(`${root_server}/destroy/${alias}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(data.data.data){
    dispatch({
      type: DELETE_URL_SUCCESS,
      payload: alias
    })
  }
  if(data.data.errors){
    dispatch({
      type: DELETE_URL_FAIL,
      payload: data.data.errors
    })
  }
  } catch (error) {
    console.log(error)
  }
}