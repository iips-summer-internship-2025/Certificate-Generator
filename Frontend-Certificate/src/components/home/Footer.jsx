import './Header.css'
import sampoorn_logo from '../../../public/assets/sampoorn_logo.png'
import template_image from '../../../public/assets/template_image.png'
function Footer(){
    return(
        <>
            <div className='footer'>
                <div className='container'>
                    <div className='footer_inner'>
                        <div className="footer-about text-center px-3">
                            <h5>Sampoorn – Smart Certificate Generator</h5>
                            <p className='max-w-[600px] mx-auto text-[0.95rem]'>
                                Sampoorn is developed by IIPS to streamline the creation, distribution, and validation of certificates for events conducted by its 12 student-driven clubs.
                            </p>
                        </div>
                        <div className='footer_inner_links'>
                            <h2>Quick Link</h2>
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">Validation</a></li>
                                <li><a href="/">Login Admin</a></li>
                            </ul>

                        </div>
                        <div className='footer_inner_text_copyright'>
                            <p>© 2025 All rights reserved by <a href="https://www.technext.io/" target="_blank" rel="noopener noreferrer">IIPS Eductaion</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;