import './Header.css'
import sampoorn_logo from '../../../public/assets/sampoorn_logo.png'
import template_image from '../../../public/assets/template_image.png'
import { Link } from 'react-router-dom'
import React from 'react'
import CertificateSearch from '../Search/CertificateSearch'
function Header() {
    return (
        <>
            <div className="header_design">
                <div className="container">
                    <div className="Inner_header row justify-between flex items-center flex-wrap -mx-2">
                        <div class="col-lg-6">
                            <div className='left_svg'>
                                <img src={sampoorn_logo} alt="logo image" className="w-70 h-auto sm:w-40" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="Right_menu">
                                <ul className='flex justify-end'>
                                    <li><Link to="/">Home</Link></li>
                                    <li><a href="/CertificateSearch">Validation</a></li>
                                    <li><a href="/Login">Login</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </>
    )
}
export default Header

