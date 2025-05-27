import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Upload from './components/upload/upload'
import Editor from './components/Editor/Editor'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </>
  )
}

export default App
