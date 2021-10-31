import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { signupAction } from '../redux/actions/authenticationActions';

function SignUp() {
  const [data, setData] = useState({
    name:'',
    email: '',
    password:''
  });
  const [submited, setSubmited] = useState(false)

  const dispatch = useDispatch()
  const authentication = useSelector(state => state.authentication)

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = e => {
    e.preventDefault()
    dispatch(signupAction(data))
    setSubmited(true)
  }

  const respondSuccess = () => (submited && authentication.valid)
  const respondFail = () => (submited && authentication.valid===false)
  const errorMessage = () => {
    return Object.values(authentication.errors)[0];
  }

  return (
  <>
    <div className="container">
      <div className="row">
        <div className="alert-info mt-5 py-4 px-3 col-8 offset-2">
          <form onSubmit={submitLogin}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Username</label>
              <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name='email' onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
            </div>
            <div className='d-flex align-items-center'>
              <button type="submit" className="btn btn-primary">Submit</button>
              {
                respondSuccess() && <Redirect to="/" />
              }{
                respondFail() && <span className="ms-3 text-danger">{errorMessage()}</span>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default SignUp
