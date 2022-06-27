import React,{useState,useContext,useEffect} from 'react'
import { Context } from '../context/context'
import { DASHBOARD, LOGIN} from '../utility/routes'
import { Link  , Navigate} from 'react-router-dom'
import { createNewUser } from '../firebase/firebaseAUTH'
import {  ifUserExist } from '../firebase/firebaseCRUD'
import { getAuth,  updateProfile } from 'firebase/auth'
import { db } from '../firebase/firebase'
import { setDoc , doc } from 'firebase/firestore'





export default function SignUp() {


  const [newUserName,setNewUserName] = useState('')
  const [newFullName,setNewFullName] = useState('')
  const [newEmail,setNewEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [registrationComplete,setRegistrationComplete] = useState(false)

  const [err, setErr] = useState()
  const { loggedUser } = useContext(Context)
  const isInvalid = newUserName === '' || newFullName === '' || newEmail === '' || newPassword === '';

  async function handleSubmit(e){

    e.preventDefault()

    const isNameTaken =  await ifUserExist(newUserName)
    
    if(!isNameTaken){

      try{
      
      
        await createNewUser( newEmail , newPassword)
        const user = getAuth()
        await updateProfile(user.currentUser , {displayName:newUserName , photoURL: null})
  
          const docRef = doc(db , 'users' , user.currentUser.uid  )
          const payload = {
  
              userID: user.currentUser.uid,
              userName: user.currentUser.displayName.toLocaleLowerCase(),
              fullName: newFullName,
              email:user.currentUser.email.toLocaleLowerCase(),
              profilePicture:'null',
              following:[],
              posts:[],
              follwers:[],
              dateCreated: Date.now()
          
            }
  

  
        await setDoc(docRef , payload)
        setErr('')
        setRegistrationComplete(true)
  
  
      }catch(error){
       
        console.log(error)
        setErr(`Please type valid data (emial must include @ sign and password has to be at least 6 character long)`)
        resetFields()
      }

    }else{
      setErr('User name is already in use.')
    }

  


  }

  function resetFields(){
    setNewEmail('')
    setNewFullName('')
    setNewEmail('')
    setNewPassword('')
  }
  
  useEffect(() => {
    document.title = 'SignUp - Instagram';
  }, [])


  return (
    
    <div style={ loggedUser === false ? {display:'grid'} : null}  className='singup-page'>
    <div className='signup-content'>

        <img alt='instagram-logo' className='text-logo' src='./page-img/insta-text-logo.png' />

        <h4 className='heading4'>Sign up to see photos and videos from your friends.</h4>

        <form  onSubmit={handleSubmit} >

          <input aria-label="New User Name field" onChange={({target}) => setNewUserName(target.value)} maxLength="20" className='text-input' autoComplete='current-username' type='text' placeholder='Username' />
          <input aria-label="New User Full Name field" onChange={({target}) => setNewFullName(target.value)} maxLength="30" className='text-input' autoComplete='current-fullname' type='text' placeholder='Full name' />
          <input aria-label="New User Email field" onChange={({target}) => setNewEmail(target.value)}  maxLength="30" className='text-input' autoComplete='current-email' type='text' placeholder='Email' />
          <input aria-label="New User Password field" onChange={({target}) => setNewPassword(target.value)} maxLength="20" className='text-input' autoComplete='current-password' type='password' placeholder='Password' />
          
          <button aria-label="Sign up"  disabled={isInvalid}  className='btn1'>Sign up</button>

        </form>

        <p aria-label={`${err}`}  className='standard-text error1 '>{err}</p>

        <p className='standard-text'> 
          Have an account? 
          <Link aria-label="Login page" className='link1' to={LOGIN}> Log in</Link> 
        </p>
       { registrationComplete || loggedUser ? <Navigate to={DASHBOARD}/> : null}
    </div>
  </div>
  )
}
