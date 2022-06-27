import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader';

import { DASHBOARD, LOGIN, PROFILE, SIGN_UP, USERS } from './utility/routes'

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));





export default function App() {
  return (

    <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={DASHBOARD} element={<Home/>} />
          <Route path={LOGIN} element={<Login/>} />
          <Route path={SIGN_UP} element={<SignUp/>} />
          <Route path={PROFILE} element={<ProfilePage/>} />
        </Routes>
    </Suspense>
    


  )
}
