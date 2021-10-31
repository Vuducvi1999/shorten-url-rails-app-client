import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Paginate from '../components/paginate'
import ShortenUrlItem from '../components/shortenUrlItem'
import { fetchUrlLinks } from '../redux/actions/managementActions'

function Management() {
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const authentication = useSelector(state => state.authentication)
  const management = useSelector(state => state.management)

  useEffect(() => {
    dispatch(fetchUrlLinks(authentication.token, page))
    return () => {}
  }, [page])

  const spreadUrlItems = () => {
    if(management.data.length) {
      return management.data.map(i => {
        return <ShortenUrlItem key={i.shorten_url} urlObject={i} />
      })
    }
    return (
      <span>
        Nothing to show, compress some Url &nbsp;
        <Link to='/'>here</Link>
      </span>
    )
  }
  const changePage = value => setPage(value)

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 p-3">
          {spreadUrlItems()}
          <Paginate total_pages={management.total_pages} changePage={(changePage)} />
        </div>
      </div>
    </div>
  )
}

export default Management
