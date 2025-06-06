import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Upload from './components/upload/upload'
import Editor from './components/Editor/Editor'
import Header from './components/home/header'

function App() {
  //const [count, setCount] = useState(0)
  const token=localStorage.getItem('token');
  return (
    <>
      <Header></Header>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        {/* {token && <Route path="/upload" element={<Upload />}/>} */}
        {/* <Route path="/editor" element={<Editor/>}/>
      </Routes> */}
    </>
  )
}

export default App
