import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { root_server } from '../constants'

function CompressUrl() {
  const [data, setData] = useState({
    origin_url: ''
  })
  const [submitResult, setSubmitResult] = useState({
    submited: false,
    success: false,
    data: null,
    errors: null
  })

  const authentication = useSelector(state => state.authentication)

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = e => {
    e.preventDefault()

    axios.post(
      `${root_server}/compress`,{
        ...data
      },{
        headers: {Authorization: `Bearer ${authentication.token}`}
      }
    ).then(res=>{
      if(res.data.data){
        setSubmitResult({
          ...submitResult,
          submited: true,
          success: true,
          data: res.data.data.shorten_url
        })
      }
      
      if(res.data.errors){
        setSubmitResult({
          ...submitResult,
          submited: true,
          success: false,
          errors: res.data.errors
        })
      }
    }).catch(e=>console.log(e))
  }

  const shortenURL = () => {
    return (
      <>
      <label className="form-label">Shorten URL</label>
      <div className="input-group mb-3">
        <input className="form-control" value={submitResult.data} readOnly/>
        <span className="input-group-text cursor-pointer" onClick={copyURL}>copy</span>
      </div>
      </>
    )
  }

  const copyURL = e => {
    navigator.clipboard.writeText(submitResult.data)
    .then(()=>{
      e.target.innerText = 'copied'
      e.target.classList.add('bg-success', 'text-light')
    }).catch(e=>console.log(e))
  }

  const errorMessage = () => {
    return (
      <span className="text-danger pb-2">
        {Object.values(submitResult.errors)[0][0]}
      </span>
    )
  }

  const compressSuccess = () => (submitResult.submited && submitResult.success)
  const compressFail = () => (submitResult.submited && submitResult.success===false)

  return (
    <div className='container'>
      <div className="row">
        <div className="alert-primary mt-5 p-3 col-6 offset-3">
          <form onSubmit={submitLogin}>
              <div className="mb-3">
                <label htmlFor="origin_url" className="form-label">Your URL</label>
                <input type="url" className="form-control" id="origin_url" name='origin_url' onChange={onChange} />
              </div>
              {compressSuccess() && shortenURL()}
              <div className='d-flex flex-column flex-start align-items-start'>
                {compressFail() && errorMessage()}
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default CompressUrl
