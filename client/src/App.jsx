import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Feed from './pages/Feed';  
  import RentTool from './components/RentTool';
import Home from './pages/Home';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  
  return (
    <>
     

      
  
        

<Router>
  <Routes>
  < Route path="/" element={<MainLayout />}>
    <Route path="/" element={<Home/>} />
    <Route path="/rent/:id" element={<RentTool />} />

<Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    <Route path="/login" element={<Login />} />
    <Route path="/feed" element={<Feed/>} />
    <Route path="/register" element={<Register/>} />
    </Route>
  </Routes>
</Router>

 

    
    </>
  )
}

export default App
