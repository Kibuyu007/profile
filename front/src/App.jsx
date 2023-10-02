import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Profile from './Components/Profile'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'





const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
