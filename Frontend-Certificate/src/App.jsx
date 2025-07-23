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
import DownloadReport from './components/Club/DownloadReport'
import CertificatePreview from './components/Certi_preview/Certi_preview'
import ClubEventForm from './components/Club/club'
import VerificationSuccess from './components/pages/VerificationSuccess.jsx'




function App() {
  //const [count, setCount] = useState(0)
  const token=localStorage.getItem('token');
  return (
    <>
    
      <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path="/DownloadReport" element={<DownloadReport/>}/>
        <Route path='Login' element={<Login/>}/>
        {/* {token && <Route path="/Login" element={<Login />}/>} */}
        {token && <Route path="/upload" element={<Upload />}/>}
        {/* <Route path="/upload" element={<Upload />}/>
        <Route path="/Login" element={<Login/>} /> */}
        <Route path="/editor" element={<Editor/>}/>
        <Route path="/CertificateSearch" element={<CertificateSearch />}/>
        <Route path="/club" element={<ClubEventForm/>} />


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

          {/*verification page*/}
           <Route path="/verify/:id" element={<VerificationSuccess />} /> 

      </Routes>
    </>
  )
}

export default App


// import { Routes, Route, Navigate } from 'react-router-dom'
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

// // Helper functions
// const isSuperAdmin = () => {
//   const email = localStorage.getItem('email');
//   // Change this to your actual superadmin email(s)
//   return email && email.toLowerCase() === "rudr@gmail.com";
// };
// const isLoggedIn = () => !!localStorage.getItem('token');

// function ProtectedRoute({ children, adminOnly }) {
//   if (!isLoggedIn()) return <Navigate to="/login" replace />;
//   if (adminOnly && !isSuperAdmin()) return <Navigate to="/upload" replace />;
//   return children;
// }

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* Everyone lands on header */}
//         <Route path="/" element={<Header />} />

//         {/* Login route */}
//         <Route path="/login" element={<Login />} />

//         {/* Upload: only for logged in users who are not superadmin */}
//         <Route
//           path="/login"
//           element={
//             isLoggedIn()
//               ? isSuperAdmin()
//                 ? <Navigate to="/admin" replace />
//                 : <Navigate to="/upload" replace />
//               : <Login />
//           }
//         />

//         {/* Editor: only for logged in users */}
//         <Route
//           path="/editor"
//           element={
//             <ProtectedRoute adminOnly={false}>
//               <Editor />
//             </ProtectedRoute>
//           }
//         />

//         {/* Loader: only for logged in users */}
//         <Route
//           path="/loader"
//           element={
//             <ProtectedRoute adminOnly={false}>
//               <Loader />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin routes: only for superadmin */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
//           <Route path="change-password" element={<ChangePassword />} />
//           <Route path="view-certificates" element={<ViewCertificates />} />
//           <Route path="crud-admins" element={<CrudAdmins />} />
//           <Route path="view-admins" element={<ViewAdmins />} />
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<ErrorPage message="Page not found" statusCode={404} />} />
//       </Routes>
//     </>
//   )
// }

// export default App