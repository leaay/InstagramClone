import React, { useContext ,useEffect  , useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../context/context'
import { signUserOut } from '../firebase/firebaseAUTH'
import { DASHBOARD} from '../utility/routes'
import useMediaQuery from "../hooks/useMediaQuery";
import Loader from './Loader'
import SearchModalDesktop from './SearchModalDesktop'
import SearchModalMobile from './SearchModalMobile'

export default function Header() {

  const {loggedUserData , setHeaderHeight , setLoggedUserData} = useContext(Context)
  const [searchModalDesktop , setSearchModalDesktop] = useState(false)
  const [searchModalMobile , setSearchModalMobile] = useState(false)
  const [userQuery ,setUserQuery] = useState('')

  const isDesktop = useMediaQuery('(min-width: 660px)');

  // EXPERIMENTAL IMPLEMENTATION SEARCH 

  useEffect(() => {
    if(loggedUserData){
      const hh = document.querySelector('.nav-box').offsetHeight
      const root = document.querySelector('#root')
      root.style.paddingTop = `${hh}px`
      setHeaderHeight(hh)
    }
  }, [loggedUserData]);

  function closeModal(){
      setSearchModalDesktop(false)
      setUserQuery('')
  }

  function handleFocus(){
    if(userQuery.length >= 2){
      setSearchModalDesktop(true)
    }
  }

  function handleLeave(){
    setTimeout(closeModal,3000)
  }

  function logout(){

    signUserOut()
    

  }

  return (

    loggedUserData ? 
    
    <nav  className='nav-box'>
        <div className='nav-content'>
                <Link aria-label="home page" style={{transform:'scale(.8)'}} className='link2' to={DASHBOARD}><img  alt='instagram-logo' className='text-logo' src='./page-img/insta-text-logo.png'/></Link>
                

                {
                isDesktop ? 
                <div aria-label="search users field" onBlur={handleLeave} className='search-desktop'>
                  <img src='./page-img/search.svg' />
                  <input value={userQuery} placeholder='Search...' onChange={({target}) => {setUserQuery(target.value) ; handleFocus()}} className='text-input search-bar-input' type='text' />
                   {userQuery.length > 0 ? <button aria-label="clear search field" onClick={closeModal} className='search-desktop-clear'><img   src='./page-img/x.svg' /></button>: null}   
                </div>  :  null
                }
               
                <div className='iconWrapper'>

                {isDesktop ? null : <button aria-label="search users modal" style={searchModalMobile ? {display:'none'} : {display:'block'}} onClick={()=>setSearchModalMobile(true)} className='search-user-icon'><img src='./page-img/search.svg' /></button>}

                <div className='profileIcon' > 
                  
                 <img className='userProfileImg' aria-label="profile menu"  src={ loggedUserData[0].profilePicture === 'null' ? './page-img/user.png' : `${loggedUserData[0].profilePicture.imgURL}`} />  
                  <div  className='dropdown-wrapper'>
                  <div className='profil-dropdown'>
                        <Link aria-label="profile page"  to={`/${loggedUserData[0].userName}`} className='dropdown-link'>Profile</Link>
                        <button  aria-label="logout" onClick={logout} className='dropdown-link'>Log out</button>
                    </div>
                  </div>
                 
                 </div>

                </div>
        </div>

        {searchModalDesktop ? <SearchModalDesktop close={setSearchModalDesktop} query={userQuery} /> : null}
        {searchModalMobile ? <SearchModalMobile close={setSearchModalMobile} isDesktop={isDesktop} /> : null}
        
    </nav> : 
    <Loader />



  )
}
