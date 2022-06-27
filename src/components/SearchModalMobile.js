import React,{useState , useContext , useEffect} from 'react'
import { Context } from '../context/context'
import useSearchQuery from '../hooks/useSearchQuery'
import { Link } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'

export default function SearchModalMobile({close }) {


  const isDesktop = useMediaQuery('(min-width: 660px)');

 
  const [userQuery ,setUserQuery] = useState('')
  const {headerHeight} = useContext(Context)

  function closeModal(){
    setUserQuery('')
  }

  useEffect(()=>{
    console.log(isDesktop)
    if(isDesktop){
      console.log('jest')
      close(false)
    }

  },[isDesktop])

  const results = useSearchQuery(userQuery)
  


  return (
    <>
    <div onClick={()=>close(false)} style={{backgroundColor:'transparent'}}   className='new-post-close'>
    </div>
    
    <div style={{top:`${headerHeight}px`}} className='search-mobile'>    
                <div  className='search-desktop'>
                  <img src='./page-img/search.svg' />
                  <input value={userQuery} placeholder='Search...' onChange={({target}) => setUserQuery(target.value) } className='text-input search-bar-input' type='text' />
                   {userQuery.length > 0 ? <button onClick={closeModal} className='search-desktop-clear'><img   src='./page-img/x.svg' /></button>: null}   
                </div>

                {results.map(item => 

                    <Link to={`/${item.userName.toLowerCase()}`} className='reasult-item' key={item.userID}>
                        <img className='search-user-icon' src={ item.profilePicture === 'null' ? './page-img/user.png' : `${item.profilePicture.imgURL}`} />
                        {item.userName}
                    </Link>

                    )}
      
    </div>  
        
        
    </>
  )
}
