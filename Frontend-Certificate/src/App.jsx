import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Upload from './components/upload/upload'
import Editor from './components/Editor/Editor'
import { AdminLayout } from './components/Admin pages/Admin'
import Dashboard from './components/Admin pages/Dashboard/adminDashboard'
import ChangePassword from './components/Admin pages/Change Password/changePassword'
import ViewCertificates from './components/Admin pages/View Certificates/viewCertificates'
import CrudAdmins from './components/Admin pages/CRUD admins/CRUDAdmins'
import ViewAdmins from './components/Admin pages/View Admins/ViewAdmins'
import Loader from './components/Loader/Loader'
import ErrorPage from './components/Error page/ErrorPage'
import CertificateSearch from './components/Search/CertificateSearch'
import Footer from './components/home/Footer'
import Home from './components/home/Home'
import Validation from './components/home/Validation/Validation'
import './App.css'




function App() {
  //const [count, setCount] = useState(0)
  const token=localStorage.getItem('token');
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        {token && <Route path="/Login" element={<Login />}/>}
        {token && <Route path="/upload" element={<Upload />}/>}
        {/* <Route path="/upload" element={<Upload />}/>
        <Route path="/Login" element={<Login/>} /> */}
        <Route path="/editor" element={<Editor/>}/>
        <Route path="/CertificateSearch" element={<CertificateSearch />}/>


         {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="view-certificates" element={<ViewCertificates />} />
            <Route path="crud-admins" element={<CrudAdmins />} />
            <Route path="view-admins" element={<ViewAdmins />} />
          </Route>

          {/* Search Page */}
          <Route path="/search" element={<CertificateSearch />} />

      </Routes>
    </>
  )
}

export default App
