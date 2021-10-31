import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUrlLink } from '../redux/actions/managementActions'
import {getAliasFromShortenURL} from '../lib/managementLib'
import { useSelector } from 'react-redux'

function ShortenUrlItem({origin_url, shorten_url, clicked, created_at, updated_at}) {
  const textTranferOptions = {
    show: 'Show',
    hide: 'Hide'
  }
  const [textTransfer, setTextTransfer] = useState(textTranferOptions.show)
  const dispatch = useDispatch()
  const authentication = useSelector(state => state.authentication)

  const detailInfoRef = useRef(null)

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
  
  return (
    <div className="mb-2">
      <div className='p-3 alert-info text-black d-flex justify-content-between align-items-center'>
        <span className="overflow-hidden">{origin_url}</span>
        <span className="small">
          <span className="cursor-pointer small ps-3" onClick={toggleAction}>{textTransfer}</span>
        </span>
      </div>
      <div ref={detailInfoRef} className="px-3 py-1 mt-2 small bg-secondary bg-opacity-10  d-none">
        <table className="table table-borderless table-sm  m-0">
          <tbody className=''>
            <tr className=''>
              <td>Origin</td>
              <td className='overflow-hidden '>{origin_url}</td>
              <td className='d-flex flex-row-reverse px-0' onClick={copyURL(origin_url)}>
                <i className="cursor-pointer fa fa-clipboard p-1 bg-secondary bg-opacity-50"></i>
              </td>
            </tr>
            <tr>
              <td>Shorten</td>
              <td>{shorten_url}</td>
              <td className='d-flex flex-row-reverse px-0' onClick={copyURL(shorten_url)}>
                <i className="cursor-pointer fa fa-clipboard p-1 bg-secondary bg-opacity-50"></i>
              </td>
            </tr>
            <tr>
              <td>Clicked</td>
              <td>{clicked}</td>
            </tr>
            <tr>
              <td>Created</td>
              <td>{created_at}</td>
            </tr>
            <tr>
              <td>Updated</td>
              <td>{updated_at}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex flex-row-reverse pb-1">
          <i class="fa fa-trash-o fs-6 p-1 bg-danger text-light cursor-pointer" onClick={deteleURL}></i>
          <i class="fa fa-pencil-square-o fs-6 p-1 bg-success text-light cursor-pointer mx-2"></i>
        </div>
      </div>
    </div>
  )
}

export default ShortenUrlItem
