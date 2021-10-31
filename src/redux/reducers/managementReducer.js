import { 
  DELETE_URL_FAIL,
  DELETE_URL_SUCCESS,
  EDIT_URL_FAIL,
  EDIT_URL_SUCCESS,
  FETCHING_URL, 
  FETCH_URL_LINKS_FAIL, 
  FETCH_URL_LINKS_SUCCESS 
} from "../constants/managementConstants";
import {getAliasFromShortenURL} from '../../lib/managementLib'

const initialize = {
  requesting: false,
  data: [
    {
      origin_url: null,
      shorten_url: null,
      clicked: null,
      created_at: null,
      updated_at: null
    }
  ],
  total_pages: null,
  errors: {},
  fetchSuccess: false
}

const dataAfterEdit = (data, itemNeedChange) => {
  return data.map(i => {
    if(i.shorten_url === itemNeedChange.shorten_url) {
      return {...itemNeedChange}
    }
    return i
  })
}

const managementReducer = (state = initialize, action) => {
  switch(action.type) {
    case FETCHING_URL:
      return {
        ...state,
        requesting: true,
        fetchSuccess: false
      }
    case FETCH_URL_LINKS_SUCCESS:
      return {
        ...state,
        requesting: false,
        fetchSuccess: true,
        data: action.payload.links,
        total_pages: action.payload.total_pages,
        errors: {}
      }
    case FETCH_URL_LINKS_FAIL:
      return {
        ...state,
        requesting: false,
        fetchSuccess: false,
        errors: action.payload,
        data: []
      }
    case DELETE_URL_SUCCESS:
      return {
        ...state,
        requesting: false,
        fetchSuccess: true,
        data: state.data.filter(i => getAliasFromShortenURL(i.shorten_url) !== action.payload),
        errors: {}
      }
    case DELETE_URL_FAIL:
      return {
        ...state,
        requesting: false,
        fetchSuccess: false,
        errors: action.payload
      }
    case EDIT_URL_SUCCESS:
      return {
        ...state,
        requesting: false,
        fetchSuccess: true,
        data: dataAfterEdit(state.data, action.payload),
        errors: {}
      }
    case EDIT_URL_FAIL:
      return {
        ...state,
        requesting: false,
        fetchSuccess: false,
        errors: action.payload
      }
    default:
      return state;
  }
}

export default managementReducer