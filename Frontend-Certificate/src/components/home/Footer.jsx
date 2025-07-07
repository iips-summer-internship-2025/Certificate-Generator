import './Header.css';
import { motion } from 'framer-motion';

function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
        >
            <div className='footer bg-gray-100 py-10 mt-12'>
                <div className='container mx-auto px-4'>
                    <div className='footer_inner flex flex-col items-center text-center space-y-10'>

                        {/* About Section */}
                        <div className="footer-about px-3 max-w-2xl">
                            <h5 className="text-xl font-semibold mb-2">Sampoorn – Smart Certificate Generator</h5>
                            <p className='text-[0.95rem] text-gray-700'>
                                Sampoorn is developed by IIPS to streamline the creation, distribution, and validation of certificates for events conducted by its 22 student-driven clubs.
                            </p>
                        </div>

                        {/* Links Section */}
                        <div className='footer_inner_links'>
                            <h2 className="text-lg font-semibold mb-3">Quick Link</h2>
                            <ul className="space-y-2 text-[0.95rem] text-gray-700">
                                <li><a href="/">Home</a></li>
                                <li><a href="/CertificateSearch">Validation</a></li>
                                <li><a href="/Login">Login</a></li>
                                <li><a href="/Club">Club</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className='footer_inner_text_copyright text-center mt-10 text-sm text-gray-500'>
                        <p>
                            © 2025 All rights reserved by{" "}
                            <a href="https://www.technext.io/" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                                IIPS Education
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Footer;
