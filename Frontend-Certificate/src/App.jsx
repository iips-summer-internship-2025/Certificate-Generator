import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Upload from './components/upload/upload'
import Editor from './components/Editor/Editor'
import Header from './components/home/Header'
import { AdminLayout } from './components/Admin pages/Admin'
import Dashboard from './components/Admin pages/Dashboard/adminDashboard'
import ChangePassword from './components/Admin pages/Change Password/changePassword'
import ViewCertificates from './components/Admin pages/View Certificates/viewCertificates'
import CrudAdmins from './components/Admin pages/CRUD admins/CRUDAdmins'
import ViewAdmins from './components/Admin pages/View Admins/ViewAdmins'
import Loader from './components/Loader/Loader'
import ErrorPage from './components/Error page/ErrorPage'




function App() {
  //const [count, setCount] = useState(0)
  const token=localStorage.getItem('token');
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/header' element={<Header/>}/>
        {/* <Route path="/upload" element={<Upload />} /> */}
        <Route path="/loader" element={<Loader />} />
        {token && <Route path="/upload" element={<Upload />}/>}
        {token && <Route path="/editor" element={<Editor />}/>}
        {/* <Route path="/editor" element={<Editor/>}/> */}


         {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="view-certificates" element={<ViewCertificates />} />
            <Route path="crud-admins" element={<CrudAdmins />} />
            <Route path="view-admins" element={<ViewAdmins />} />
          </Route>

      </Routes>

      
    </>
  )
}

export default App
