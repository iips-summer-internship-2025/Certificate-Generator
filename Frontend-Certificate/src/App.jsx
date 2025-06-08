// import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import './App.css'
// import Login from './components/Login/Login'
// import Upload from './components/upload/upload'
// import Editor from './components/Editor/Editor'
// import Header from './components/home/header'
// import { AdminLayout } from './components/Admin pages/Admin'
// import Dashboard from './components/Admin pages/Dashboard/adminDashboard'
// import ChangePassword from './components/Admin pages/Change Password/changePassword'
// import ViewCertificates from './components/Admin pages/View Certificates/viewCertificates'
// import CrudAdmins from './components/Admin pages/CRUD admins/CRUDAdmins'
// import ViewAdmins from './components/Admin pages/View Admins/ViewAdmins'
// import Loader from './components/Loader/Loader'
// import ErrorPage from './components/Error page/ErrorPage'




// function App() {
//   //const [count, setCount] = useState(0)
//   const token=localStorage.getItem('token');
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path='/header' element={<Header/>}/>
//         <Route path="/upload" element={<Upload />} />
//         <Route path="/loader" element={<Loader />} />
//         {/* {token && <Route path="/upload" element={<Upload />}/>} */}
//         <Route path="/editor" element={<Editor/>}/>


//          {/* Admin Routes */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="change-password" element={<ChangePassword />} />
//             <Route path="view-certificates" element={<ViewCertificates />} />
//             <Route path="crud-admins" element={<CrudAdmins />} />
//             <Route path="view-admins" element={<ViewAdmins />} />
//           </Route>

//       </Routes>

      
//     </>
//   )
// }

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Upload from './components/upload/upload'
import Editor from './components/Editor/Editor'
import Header from './components/home/header'
import { AdminLayout } from './components/Admin pages/Admin'
import Dashboard from './components/Admin pages/Dashboard/adminDashboard'
import ChangePassword from './components/Admin pages/Change Password/changePassword'
import ViewCertificates from './components/Admin pages/View Certificates/viewCertificates'
import CrudAdmins from './components/Admin pages/CRUD admins/CRUDAdmins'
import ViewAdmins from './components/Admin pages/View Admins/ViewAdmins'
import Loader from './components/Loader/Loader'
import ErrorPage from './components/Error page/ErrorPage'

// Helper functions
const isSuperAdmin = () => {
  const email = localStorage.getItem('email');
  // Change this to your actual superadmin email(s)
  return email && email.toLowerCase() === "rudr@gmail.com";
};
const isLoggedIn = () => !!localStorage.getItem('token');

function ProtectedRoute({ children, adminOnly }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (adminOnly && !isSuperAdmin()) return <Navigate to="/upload" replace />;
  return children;
}

function App() {
  return (
    <>
      <Routes>
        {/* Everyone lands on header */}
        <Route path="/" element={<Header />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Upload: only for logged in users who are not superadmin */}
        <Route
          path="/login"
          element={
            isLoggedIn()
              ? isSuperAdmin()
                ? <Navigate to="/admin" replace />
                : <Navigate to="/upload" replace />
              : <Login />
          }
        />

        {/* Editor: only for logged in users */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute adminOnly={false}>
              <Editor />
            </ProtectedRoute>
          }
        />

        {/* Loader: only for logged in users */}
        <Route
          path="/loader"
          element={
            <ProtectedRoute adminOnly={false}>
              <Loader />
            </ProtectedRoute>
          }
        />

        {/* Admin routes: only for superadmin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="view-certificates" element={<ViewCertificates />} />
          <Route path="crud-admins" element={<CrudAdmins />} />
          <Route path="view-admins" element={<ViewAdmins />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<ErrorPage message="Page not found" statusCode={404} />} />
      </Routes>
    </>
  )
}

export default App