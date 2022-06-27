import {Link} from 'react-router-dom'
import React, { useContext } from 'react'
import { Context } from '../context/context'
import useSearchQuery from '../hooks/useSearchQuery'


export default function SearchModalDesktop({close , query}) {

    const {headerHeight} = useContext(Context)
  
    console.log(query)
    console.log(query.toLowerCase())
    const results = useSearchQuery(query.toLowerCase())
    


  return (

    results.length === 0 ? null :
    <div style={{top:`${headerHeight}px`}} className='search-modal-desktop'>

      {results.map(item => 

      <Link to={`/${item.userName.toLowerCase()}`} className='reasult-item' key={item.userID}>
          <img className='search-user-icon' src={ item.profilePicture === 'null' ? './page-img/user.png' : `${item.profilePicture.imgURL}`} />
          {item.userName}
      </Link>

      )}
            
    </div>


  )
}
