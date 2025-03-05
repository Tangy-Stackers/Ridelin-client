

import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import LoginPage from './pages/Loginpage'

function App() {
  

  return (
    <>
    <Routes>
      
      <Route path ="/"element ={<HomePage />} />
      <Route path = "/login" element = {<LoginPage/>} />
    </Routes>
  
    
    
    </>
     
      
  )
}

export default App
