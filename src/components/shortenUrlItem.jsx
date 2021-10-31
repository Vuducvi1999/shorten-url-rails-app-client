import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUrlLink, editUrlLink } from '../redux/actions/managementActions'
import {getAliasFromShortenURL} from '../lib/managementLib'
import { useSelector } from 'react-redux'

function ShortenUrlItem({urlObject}) {
  const {origin_url, shorten_url, clicked, created_at, updated_at} = urlObject
  const textTranferOptions = {
    show: 'Show',
    hide: 'Hide'
  }
  const [textTransfer, setTextTransfer] = useState(textTranferOptions.show)
  const dispatch = useDispatch()
  const authentication = useSelector(state => state.authentication)
  const management = useSelector(state => state.management)

  const detailInfoRef = useRef(null)
  const [inputData, setInputData] = useState({
    origin_changed:''
  })
  const [editable, setEditable] = useState(false)

  const copyURL = data => e => {
    navigator.clipboard.writeText(data)
    .then(()=>{
      e.target.classList.remove('bg-info')
      e.target.classList.add('bg-success', 'text-light')
    }).catch(e=>console.log(e))
  }

  const toggleAction = () => {
    if(textTransfer === textTranferOptions.show){
      setTextTransfer(textTranferOptions.hide)
      detailInfoRef.current.classList.remove('d-none')
      detailInfoRef.current.classList.add('d-block')
      return;
    }
    if(textTransfer === textTranferOptions.hide){
      setTextTransfer(textTranferOptions.show)
      detailInfoRef.current.classList.remove('d-block')
      detailInfoRef.current.classList.add('d-none')
    }
  }
  const deteleURL = () => {
    toggleAction()
    const alias = getAliasFromShortenURL(shorten_url)
    dispatch(deleteUrlLink(authentication.token, alias))
  }
  const convertUrlReadable = value => {
    if(value?.length > 60)
      return value.slice(0, 60) + '...'
    return value
  }
  const editUrl = e => {
    e.preventDefault()
    
    const urlObjectNeedChange = {
      ...urlObject,
      origin_url: inputData.origin_changed,
      origin_changed: inputData.origin_changed
    }
    dispatch(editUrlLink(authentication.token, urlObjectNeedChange))
    setEditable(false)
  }
  const onChange = e => {
    setInputData({
      [e.target.name] : e.target.value
    })
  }
  const errorMessage = () => {
    return Object.values(management.errors)[0];
  }
  
  return (
    <div className="mb-2">
      <div className='p-3 alert-info text-black d-flex justify-content-between align-items-center'>
        <span className="overflow-hidden">{convertUrlReadable(origin_url)}</span>
        <span className="small">
          <span className="cursor-pointer small ps-3" onClick={toggleAction}>{textTransfer}</span>
        </span>
      </div>
      <div ref={detailInfoRef} className="px-3 py-1 mt-2 small bg-secondary bg-opacity-10  d-none">
        <table className="table table-borderless table-sm  m-0">
          <tbody>
            <tr>
              <th>Origin</th>
              {/* nếu editable bật form
                  nếu đang requesting vẫn bật form
                  nếu management đã requesting và fetch fail thì đóng form 
               */}
              { editable ?
                <td>
                  <form onSubmit={editUrl}>
                    <div className="input-group">
                      <input className="form-control form-control-sm" name="origin_changed" type="url" onChange={onChange}/>
                      <button className="btn btn-sm btn-outline-secondary" type="submit">edit</button>
                    </div>
                    <span className="text-danger m-0">{errorMessage()}</span>
                  </form>
                </td> :
                <>
                  <td className='overflow-hidden '>{convertUrlReadable(origin_url)}</td>
                  <td className='d-flex flex-row-reverse px-0' onClick={copyURL(origin_url)}>
                    <i className="cursor-pointer fa fa-clipboard p-1 bg-secondary bg-opacity-50"></i>
                  </td>
                </> 
              }
            </tr>
            <tr>
              <th>Shorten</th>
              <td>{shorten_url}</td>
              <td className='d-flex flex-row-reverse px-0' onClick={copyURL(shorten_url)}>
                <i className="cursor-pointer fa fa-clipboard p-1 bg-secondary bg-opacity-50"></i>
              </td>
            </tr>
            <tr>
              <th>Clicked</th>
              <td>{clicked}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{new Date(created_at).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Updated</th>
              <td>{new Date(updated_at).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex flex-row-reverse pb-1">
          <i className="fa fa-trash-o fs-6 p-1 bg-danger text-light cursor-pointer" onClick={deteleURL}></i>
          <i className="fa fa-pencil-square-o fs-6 p-1 bg-success text-light cursor-pointer mx-2" 
            onClick={()=>setEditable(!editable)}  
          ></i>
        </div>
      </div>
    </div>
  )
}

export default ShortenUrlItem
