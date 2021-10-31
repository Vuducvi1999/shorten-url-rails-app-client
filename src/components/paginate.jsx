import React from 'react'

function Paginate({total_pages, changePage}) {
  const arrayPages = [...Array(total_pages+1).keys()].slice(1)
  const goToPage = page => {
    changePage(page)
  }

  return (
    <nav className='d-flex justify-content-center pt-3 pb-5'>
      <ul className="pagination">
        {
          arrayPages.map(i => (
            <li key={i} className="page-item page-link cursor-pointer" onClick={()=>goToPage(i)}>
              {i}
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Paginate
