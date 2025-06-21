import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Create from './components/Create'
import AllTask from './components/AllTask'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Register/>} ></Route>
      <Route path="/Login" element= {<Login/>} ></Route>
      <Route path="/create" element= {<Create/>} ></Route>
      <Route path="/mytask" element= {<AllTask/>} ></Route>
      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
