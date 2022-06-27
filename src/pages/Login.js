import React,{useState,useContext,useEffect} from 'react'
import { Context } from '../context/context'
import { Link  , Navigate} from 'react-router-dom'
import { DASHBOARD, SIGN_UP } from '../utility/routes'

import {loginUser} from '../firebase/firebaseAUTH'

export default function Login() {

  const [newUser,setNewUser] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [err, setErr] = useState()
  const { loggedUser } = useContext(Context)
  const isInvalid = newUser === '' || newPassword === '';


  async  function  handleSubmit(e){
      e.preventDefault()
     const returendError = await loginUser(newUser , newPassword)
    setErr(returendError)
    setNewUser('')
    setNewPassword('')
     
  }


  useEffect(() => {
        document.title = 'Login - Instagram';
      }, [])


  return (

    
    
      <div style={loggedUser === false ? {display:'grid'} : {display:'none'}}  className=' login-page'>
        <div className='login-content'>

            <img alt='instagram-logo' className='text-logo' src='./page-img/insta-text-logo.png' />
            
            <form onSubmit={handleSubmit} className='login-form'>
              <input aria-label="user emial login field" onChange={e => setNewUser(e.target.value)} maxLength="30" value={newUser} className='text-input' autoComplete='current-email' type='text' placeholder='Email' />
              <input aria-label="user password login field" onChange={e => setNewPassword(e.target.value)} maxLength="20" value={newPassword} className='text-input' autoComplete='current-password' type='password' placeholder='Password' />
              <button aria-label="log in" disabled={isInvalid}   className='btn1'>Log In</button>
            </form>
            
            <p className='standard-text'> 
              Don't have an account? 
              <Link aria-label="sign up page" className='link1' to={SIGN_UP}> Sing up</Link> 
            </p>
            <p aria-label={`${err}`}  className='standard-text error1 '>{err}</p>

           { loggedUser ? <Navigate to={DASHBOARD}/> : null}
        </div>
      </div>
  )
}
