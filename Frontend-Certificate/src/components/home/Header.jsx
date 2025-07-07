import './Header.css';
import sampoorn_logo from '../../../public/assets/sampoorn_logo.png';
import template_image from '../../../public/assets/template_image.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'; // <-- ADD THIS
import CertificateSearch from '../Search/CertificateSearch';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // <-- ADD THIS

    return (
        <>
            <div className="header_design">
                <div className="container">
                    <div className="Inner_header row justify-between flex items-center flex-wrap -mx-2">

                        {/* Left Logo */}
                        <div className="col-lg-6">
                            <div className='left_svg'>
                                <img src={sampoorn_logo} alt="logo image" className="w-70 h-auto sm:w-40" />
                            </div>
                        </div>

                        {/* Hamburger Icon (Mobile Only) */}
                        <div className="block sm:hidden col-lg-6 text-right pr-4">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>

                        {/* Menu */}
                        <div className={`col-lg-6 ${menuOpen ? 'block' : 'hidden'} sm:block w-full sm:w-auto`}>
                            <div className="Right_menu">
                                <ul className='flex flex-col sm:flex-row justify-end sm:space-x-6 items-end sm:items-center'>
                                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                    <li><a href="/CertificateSearch" onClick={() => setMenuOpen(false)}>Validation</a></li>
                                    <li><a href="/Login" onClick={() => setMenuOpen(false)}>Login</a></li>
                                    <li><a href="/Club" onClick={() => setMenuOpen(false)}>Club</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;


