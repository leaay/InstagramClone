import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/context'
import { LOGIN} from '../utility/routes'
import Header from '../components/Header'
import UserTimeline from '../components/UserTimeline'


export default function Home() {

  const {loggedUser } = useContext(Context)


  return (

   
    loggedUser === false ? <Navigate to={LOGIN} /> :
    
      <div  className='main-grid'>
        <Header />
        <UserTimeline />
      </div>

    
  )
}
