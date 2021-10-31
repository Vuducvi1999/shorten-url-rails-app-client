import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { signoutAction } from '../redux/actions/authenticationActions'
import { removeUserToManagement } from '../redux/actions/authenticationActions';

function Navbar() {
  const authentication = useSelector(state => state.authentication)
  const [signout, setSignout] = useState(false)
  const dispatch = useDispatch()

  const AuthenticateElements = () => {
    return (
      <>
        <li className="nav-item">
          <Link to='/sign-in' className="nav-link"> Sign in </Link>
        </li>
        <li className="nav-item">
          <Link to='/sign-up' className="nav-link"> Sign up </Link>
        </li>
      </>
    )
  }
  const ManagementAndUserElements = () => {
    return (
      <>
        <li className="nav-item">
          <Link to='/user' className="nav-link"> {authentication.user.name} </Link>
        </li>
        <li className="nav-item">
          <Link to='/management' className="nav-link"> Management </Link>
        </li>
        <li className="nav-item">
          <Link to='/' className="nav-link" onClick={signoutClick}>
             Sign out 
             { signout && <Redirect to='/' /> }
          </Link>
        </li>
      </>
    )
  }
  
  const signoutClick = () => {
    dispatch(signoutAction())
    dispatch(removeUserToManagement())
    setSignout(true)
  }

  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link to='/' className='navbar-brand' >
        Home 
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {/* {
            authentication.valid ? ManageElements() : AuthenticateElements()
          } */}
          {authentication.valid && ManagementAndUserElements()}
          {!authentication.valid && AuthenticateElements()}
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
