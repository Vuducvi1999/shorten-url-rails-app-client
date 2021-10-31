import React from 'react'
import { useSelector } from 'react-redux'

function User() {

  const authentication = useSelector(state => state.authentication)
  const {name, email, access_api} = authentication.user
  const copyURL = data => e => {
    navigator.clipboard.writeText(data)
    .then(()=>{
      e.target.classList.remove('bg-info')
      e.target.classList.add('bg-success', 'text-light')
    }).catch(e=>console.log(e))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5">
          <div className="alert-success text-dark py-2 px-3">
            {`${name}'s information`}
          </div>
          <div className="py-2 px-3 bg-light">
            <table className="table table-borderless table-sm m-0">
            <tbody className='w-100'>
              <tr className='w-100'>
                <th>Name</th>
                <td className='overflow-hidden'>{name}</td>
              </tr>
              <tr className='w-100'>
                <th>Email</th>
                <td className='overflow-hidden'>{email}</td>
              </tr>
              <tr className='w-100'>
                <th>Access Api key</th>
                <td className='overflow-hidden'>{access_api}
                  <span className='fa fa-clipboard cursor-pointer p-1 ms-2 bg-secondary bg-opacity-50' onClick={copyURL(access_api)}></span>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
