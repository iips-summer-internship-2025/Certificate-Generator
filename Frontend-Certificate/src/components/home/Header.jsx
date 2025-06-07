import './Header.css'
import sampoorn_logo from '../../../public/assets/sampoorn_logo.png'
import template_image from '../../../public/assets/template_image.png'
function Header() {
    return (
        <>
            <div className="header_design">
                <div className="container">
                    <div className="Inner_header row justify-between flex items-center flex-wrap -mx-2">
                        <div class="col-lg-6">
                            <div className='left_svg'>
                                <img src={sampoorn_logo} alt="logo image" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="Right_menu">
                                <ul className='flex justify-end'>
                                    <li><a href="">Home</a></li>
                                    <li><a href="">Validation</a></li>
                                    <li><a href="/">Login-Admin</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='parent_div_type'>
                <div className='container'>
                    <div className='Inner_div_Animation'>
                        <div class="typing-container text-center ma">
                            <h1>Welcome to IIPS Sampoorn –</h1>
                            <h2>Empowering Every Achievement, Digitally</h2>
                        </div>
                        <div class="redirect_button">
                            <a href='#' className='Redirect_anchor with_span'><span className='Span_left'></span>Explore More!<span className='Span_Right'></span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='design_template'>
                <div className='heading'>
                    <div className='container'>
                        <div className='headig_inner_svg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 130 151" fill="none">
                                <g clip-path="url(#clip0_9_2)">
                                    <rect x="7" y="130" width="4" height="80" rx="2" transform="rotate(-90 7 130)" fill="#1C274C" />
                                    <rect x="14" y="36" width="33" height="2" rx="1" fill="#1C274C" />
                                    <rect x="14" y="44" width="33" height="2" rx="1" fill="#1C274C" />
                                    <rect x="14" y="51" width="33" height="2" rx="1" fill="#1C274C" />
                                    <g clip-path="url(#paint0_diamond_9_2_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.0195417 -0.0189583 0 32.5 102.125)"><rect x="0" y="0" width="2705.76" height="2758.24" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="2705.76" height="2758.24" transform="scale(1 -1)" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="2705.76" height="2758.24" transform="scale(-1 1)" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="2705.76" height="2758.24" transform="scale(-1)" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /></g></g><path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 121.667C42.9704 121.667 51.4583 112.918 51.4583 102.125C51.4583 91.3324 42.9704 82.5833 32.5 82.5833C22.0296 82.5833 13.5417 91.3324 13.5417 102.125C13.5417 112.918 22.0296 121.667 32.5 121.667ZM32.5 93.75C31.7306 93.75 31.216 94.7015 30.1868 96.6045L29.9206 97.0968C29.6284 97.6376 29.4821 97.908 29.2541 98.0864C29.026 98.2648 28.7422 98.331 28.1742 98.4635L27.6572 98.5841C25.6586 99.0502 24.6594 99.2832 24.4217 100.071C24.1839 100.859 24.8651 101.68 26.2276 103.323L26.5801 103.747C26.9672 104.214 27.1608 104.447 27.248 104.736C27.3349 105.025 27.3057 105.336 27.2472 105.959L27.1938 106.526C26.9879 108.717 26.8849 109.812 27.5072 110.299C28.1298 110.786 29.0653 110.342 30.9365 109.454L31.4205 109.224C31.9524 108.972 32.2181 108.846 32.5 108.846C32.7819 108.846 33.0476 108.972 33.5795 109.224L34.0635 109.454C35.9347 110.342 36.8702 110.786 37.4928 110.299C38.1152 109.812 38.012 108.717 37.8062 106.526L37.7528 105.959C37.6943 105.336 37.6651 105.025 37.752 104.736C37.8392 104.447 38.0329 104.214 38.4199 103.747L38.7725 103.323C40.1348 101.68 40.8162 100.859 40.5784 100.071C40.3406 99.2832 39.3412 99.0502 37.3428 98.5841L36.8258 98.4635C36.2578 98.331 35.974 98.2648 35.7459 98.0864C35.5179 97.908 35.3716 97.6376 35.0794 97.0968L34.8132 96.6045C33.784 94.7015 33.2694 93.75 32.5 93.75Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;transform&quot;:{&quot;m00&quot;:2.3217264140282202e-15,&quot;m01&quot;:-37.916667938232422,&quot;m02&quot;:51.458332061767578,&quot;m10&quot;:39.083332061767578,&quot;m11&quot;:2.3931639022502270e-15,&quot;m12&quot;:82.583335876464844},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                                    <g clip-path="url(#paint1_diamond_9_2_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.00845675 -0.01625 0 32.5 129.96)"><rect x="0" y="0" width="4941.62" height="3051.28" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="4941.62" height="3051.28" transform="scale(1 -1)" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="4941.62" height="3051.28" transform="scale(-1 1)" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="4941.62" height="3051.28" transform="scale(-1)" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /></g></g><path d="M19.2102 121.503L18.1844 125.36C16.4826 131.758 15.6318 134.957 16.7672 136.708C17.1651 137.322 17.699 137.815 18.3184 138.14C20.0859 139.067 22.815 137.602 28.2731 134.67C30.0893 133.695 30.9974 133.207 31.9621 133.101C32.3199 133.062 32.6801 133.062 33.0379 133.101C34.0026 133.207 34.9107 133.695 36.7269 134.67C42.185 137.602 44.9142 139.067 46.6816 138.14C47.301 137.815 47.8349 137.322 48.2327 136.708C49.3683 134.957 48.5174 131.758 46.8157 125.36L45.7898 121.503C42.0355 124.244 37.4503 125.854 32.5 125.854C27.5497 125.854 22.9644 124.244 19.2102 121.503Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;transform&quot;:{&quot;m00&quot;:1.9900518170477225e-15,&quot;m01&quot;:-32.500011444091797,&quot;m02&quot;:48.750011444091797,&quot;m10&quot;:16.913505554199219,&quot;m11&quot;:1.0356535262015585e-15,&quot;m12&quot;:121.50307464599609},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                                    <rect x="83" y="73" width="4" height="57" rx="2" fill="#1C274C" />
                                    <rect x="7" y="5" width="4" height="125" rx="2" fill="#1C274C" />
                                    <rect x="7" y="9" width="4" height="80" rx="2" transform="rotate(-90 7 9)" fill="#1C274C" />
                                    <g clip-path="url(#clip1_9_2)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M91 87L71.3817 72.9868C60.0815 64.9152 53.375 51.8834 53.375 37.9964V17.125L91 1L128.625 17.125V37.9964C128.625 51.8834 121.919 64.9152 110.618 72.9868L91 87ZM113.613 31.6757L106.012 24.0743L85.625 44.4611L75.9882 34.8243L68.3868 42.4257L85.625 59.6638L113.613 31.6757Z" fill="#1C274C" />
                                        <g clip-path="url(#clip2_9_2)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.9999 999.556L-370.606 688.152C-636.493 508.782 -794.294 219.186 -794.294 -89.4123V-553.222L90.9999 -911.556L976.294 -553.222V-89.4123C976.294 219.186 818.497 508.782 552.605 688.152L90.9999 999.556ZM623.074 -229.873L444.22 -398.794L-35.4707 54.2471L-262.219 -159.905L-441.076 9.01591L-35.4707 392.085L623.074 -229.873Z" fill="#1C274C" />
                                        </g>
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="paint0_diamond_9_2_clip_path"><path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 121.667C42.9704 121.667 51.4583 112.918 51.4583 102.125C51.4583 91.3324 42.9704 82.5833 32.5 82.5833C22.0296 82.5833 13.5417 91.3324 13.5417 102.125C13.5417 112.918 22.0296 121.667 32.5 121.667ZM32.5 93.75C31.7306 93.75 31.216 94.7015 30.1868 96.6045L29.9206 97.0968C29.6284 97.6376 29.4821 97.908 29.2541 98.0864C29.026 98.2648 28.7422 98.331 28.1742 98.4635L27.6572 98.5841C25.6586 99.0502 24.6594 99.2832 24.4217 100.071C24.1839 100.859 24.8651 101.68 26.2276 103.323L26.5801 103.747C26.9672 104.214 27.1608 104.447 27.248 104.736C27.3349 105.025 27.3057 105.336 27.2472 105.959L27.1938 106.526C26.9879 108.717 26.8849 109.812 27.5072 110.299C28.1298 110.786 29.0653 110.342 30.9365 109.454L31.4205 109.224C31.9524 108.972 32.2181 108.846 32.5 108.846C32.7819 108.846 33.0476 108.972 33.5795 109.224L34.0635 109.454C35.9347 110.342 36.8702 110.786 37.4928 110.299C38.1152 109.812 38.012 108.717 37.8062 106.526L37.7528 105.959C37.6943 105.336 37.6651 105.025 37.752 104.736C37.8392 104.447 38.0329 104.214 38.4199 103.747L38.7725 103.323C40.1348 101.68 40.8162 100.859 40.5784 100.071C40.3406 99.2832 39.3412 99.0502 37.3428 98.5841L36.8258 98.4635C36.2578 98.331 35.974 98.2648 35.7459 98.0864C35.5179 97.908 35.3716 97.6376 35.0794 97.0968L34.8132 96.6045C33.784 94.7015 33.2694 93.75 32.5 93.75Z" /></clipPath><clipPath id="paint1_diamond_9_2_clip_path"><path d="M19.2102 121.503L18.1844 125.36C16.4826 131.758 15.6318 134.957 16.7672 136.708C17.1651 137.322 17.699 137.815 18.3184 138.14C20.0859 139.067 22.815 137.602 28.2731 134.67C30.0893 133.695 30.9974 133.207 31.9621 133.101C32.3199 133.062 32.6801 133.062 33.0379 133.101C34.0026 133.207 34.9107 133.695 36.7269 134.67C42.185 137.602 44.9142 139.067 46.6816 138.14C47.301 137.815 47.8349 137.322 48.2327 136.708C49.3683 134.957 48.5174 131.758 46.8157 125.36L45.7898 121.503C42.0355 124.244 37.4503 125.854 32.5 125.854C27.5497 125.854 22.9644 124.244 19.2102 121.503Z" /></clipPath><linearGradient id="paint0_diamond_9_2" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.0576923" stop-color="#F7DB23" />
                                        <stop offset="0.461538" stop-color="#EEDA59" />
                                        <stop offset="0.783654" stop-color="#F4E163" />
                                    </linearGradient>
                                    <linearGradient id="paint1_diamond_9_2" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.0576923" stop-color="#F7DB23" />
                                        <stop offset="0.461538" stop-color="#EEDA59" />
                                        <stop offset="0.783654" stop-color="#F4E163" />
                                    </linearGradient>
                                    <clipPath id="clip0_9_2">
                                        <rect width="130" height="151" fill="white" />
                                    </clipPath>
                                    <clipPath id="clip1_9_2">
                                        <rect width="86" height="86" fill="white" transform="translate(48 1)" />
                                    </clipPath>
                                    <clipPath id="clip2_9_2">
                                        <rect width="2023.53" height="1911.11" fill="white" transform="translate(-920.765 -911.556)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className='heading_inner_text'>
                            <h2>Design</h2>
                            <p>Template</p>
                        </div>
                    </div>
                </div>
                <div className='design_template_inner'>
                    <div className='container'>
                        <div className='rows'>
                            <div className='col-lg-12'>
                                <img src={template_image} alt="Design Template" />
                            </div>
                            <div class="redirect_button">
                                <a href='/' className='Redirect_anchor '>Get Start</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Steps_guidence'>
                <div className='heading'>
                    <div className='container'>
                        <div className='headig_inner_svg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 130 151" fill="none">
                                <g clip-path="url(#clip0_9_2)">
                                    <rect x="7" y="130" width="4" height="80" rx="2" transform="rotate(-90 7 130)" fill="#1C274C" />
                                    <rect x="14" y="36" width="33" height="2" rx="1" fill="#1C274C" />
                                    <rect x="14" y="44" width="33" height="2" rx="1" fill="#1C274C" />
                                    <rect x="14" y="51" width="33" height="2" rx="1" fill="#1C274C" />
                                    <g clip-path="url(#paint0_diamond_9_2_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.0195417 -0.0189583 0 32.5 102.125)"><rect x="0" y="0" width="2705.76" height="2758.24" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="2705.76" height="2758.24" transform="scale(1 -1)" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="2705.76" height="2758.24" transform="scale(-1 1)" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="2705.76" height="2758.24" transform="scale(-1)" fill="url(#paint0_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /></g></g><path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 121.667C42.9704 121.667 51.4583 112.918 51.4583 102.125C51.4583 91.3324 42.9704 82.5833 32.5 82.5833C22.0296 82.5833 13.5417 91.3324 13.5417 102.125C13.5417 112.918 22.0296 121.667 32.5 121.667ZM32.5 93.75C31.7306 93.75 31.216 94.7015 30.1868 96.6045L29.9206 97.0968C29.6284 97.6376 29.4821 97.908 29.2541 98.0864C29.026 98.2648 28.7422 98.331 28.1742 98.4635L27.6572 98.5841C25.6586 99.0502 24.6594 99.2832 24.4217 100.071C24.1839 100.859 24.8651 101.68 26.2276 103.323L26.5801 103.747C26.9672 104.214 27.1608 104.447 27.248 104.736C27.3349 105.025 27.3057 105.336 27.2472 105.959L27.1938 106.526C26.9879 108.717 26.8849 109.812 27.5072 110.299C28.1298 110.786 29.0653 110.342 30.9365 109.454L31.4205 109.224C31.9524 108.972 32.2181 108.846 32.5 108.846C32.7819 108.846 33.0476 108.972 33.5795 109.224L34.0635 109.454C35.9347 110.342 36.8702 110.786 37.4928 110.299C38.1152 109.812 38.012 108.717 37.8062 106.526L37.7528 105.959C37.6943 105.336 37.6651 105.025 37.752 104.736C37.8392 104.447 38.0329 104.214 38.4199 103.747L38.7725 103.323C40.1348 101.68 40.8162 100.859 40.5784 100.071C40.3406 99.2832 39.3412 99.0502 37.3428 98.5841L36.8258 98.4635C36.2578 98.331 35.974 98.2648 35.7459 98.0864C35.5179 97.908 35.3716 97.6376 35.0794 97.0968L34.8132 96.6045C33.784 94.7015 33.2694 93.75 32.5 93.75Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;transform&quot;:{&quot;m00&quot;:2.3217264140282202e-15,&quot;m01&quot;:-37.916667938232422,&quot;m02&quot;:51.458332061767578,&quot;m10&quot;:39.083332061767578,&quot;m11&quot;:2.3931639022502270e-15,&quot;m12&quot;:82.583335876464844},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                                    <g clip-path="url(#paint1_diamond_9_2_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.00845675 -0.01625 0 32.5 129.96)"><rect x="0" y="0" width="4941.62" height="3051.28" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="4941.62" height="3051.28" transform="scale(1 -1)" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="4941.62" height="3051.28" transform="scale(-1 1)" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /><rect x="0" y="0" width="4941.62" height="3051.28" transform="scale(-1)" fill="url(#paint1_diamond_9_2)" opacity="1" shape-rendering="crispEdges" /></g></g><path d="M19.2102 121.503L18.1844 125.36C16.4826 131.758 15.6318 134.957 16.7672 136.708C17.1651 137.322 17.699 137.815 18.3184 138.14C20.0859 139.067 22.815 137.602 28.2731 134.67C30.0893 133.695 30.9974 133.207 31.9621 133.101C32.3199 133.062 32.6801 133.062 33.0379 133.101C34.0026 133.207 34.9107 133.695 36.7269 134.67C42.185 137.602 44.9142 139.067 46.6816 138.14C47.301 137.815 47.8349 137.322 48.2327 136.708C49.3683 134.957 48.5174 131.758 46.8157 125.36L45.7898 121.503C42.0355 124.244 37.4503 125.854 32.5 125.854C27.5497 125.854 22.9644 124.244 19.2102 121.503Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.96923077106475830,&quot;g&quot;:0.85839056968688965,&quot;b&quot;:0.13792888820171356,&quot;a&quot;:1.0},&quot;position&quot;:0.057692307978868484},{&quot;color&quot;:{&quot;r&quot;:0.93461537361145020,&quot;g&quot;:0.85649108886718750,&quot;b&quot;:0.34868329763412476,&quot;a&quot;:1.0},&quot;position&quot;:0.46153846383094788},{&quot;color&quot;:{&quot;r&quot;:0.95769220590591431,&quot;g&quot;:0.88156795501708984,&quot;b&quot;:0.38676032423973083,&quot;a&quot;:1.0},&quot;position&quot;:0.78365385532379150}],&quot;transform&quot;:{&quot;m00&quot;:1.9900518170477225e-15,&quot;m01&quot;:-32.500011444091797,&quot;m02&quot;:48.750011444091797,&quot;m10&quot;:16.913505554199219,&quot;m11&quot;:1.0356535262015585e-15,&quot;m12&quot;:121.50307464599609},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                                    <rect x="83" y="73" width="4" height="57" rx="2" fill="#1C274C" />
                                    <rect x="7" y="5" width="4" height="125" rx="2" fill="#1C274C" />
                                    <rect x="7" y="9" width="4" height="80" rx="2" transform="rotate(-90 7 9)" fill="#1C274C" />
                                    <g clip-path="url(#clip1_9_2)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M91 87L71.3817 72.9868C60.0815 64.9152 53.375 51.8834 53.375 37.9964V17.125L91 1L128.625 17.125V37.9964C128.625 51.8834 121.919 64.9152 110.618 72.9868L91 87ZM113.613 31.6757L106.012 24.0743L85.625 44.4611L75.9882 34.8243L68.3868 42.4257L85.625 59.6638L113.613 31.6757Z" fill="#1C274C" />
                                        <g clip-path="url(#clip2_9_2)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.9999 999.556L-370.606 688.152C-636.493 508.782 -794.294 219.186 -794.294 -89.4123V-553.222L90.9999 -911.556L976.294 -553.222V-89.4123C976.294 219.186 818.497 508.782 552.605 688.152L90.9999 999.556ZM623.074 -229.873L444.22 -398.794L-35.4707 54.2471L-262.219 -159.905L-441.076 9.01591L-35.4707 392.085L623.074 -229.873Z" fill="#1C274C" />
                                        </g>
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="paint0_diamond_9_2_clip_path"><path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 121.667C42.9704 121.667 51.4583 112.918 51.4583 102.125C51.4583 91.3324 42.9704 82.5833 32.5 82.5833C22.0296 82.5833 13.5417 91.3324 13.5417 102.125C13.5417 112.918 22.0296 121.667 32.5 121.667ZM32.5 93.75C31.7306 93.75 31.216 94.7015 30.1868 96.6045L29.9206 97.0968C29.6284 97.6376 29.4821 97.908 29.2541 98.0864C29.026 98.2648 28.7422 98.331 28.1742 98.4635L27.6572 98.5841C25.6586 99.0502 24.6594 99.2832 24.4217 100.071C24.1839 100.859 24.8651 101.68 26.2276 103.323L26.5801 103.747C26.9672 104.214 27.1608 104.447 27.248 104.736C27.3349 105.025 27.3057 105.336 27.2472 105.959L27.1938 106.526C26.9879 108.717 26.8849 109.812 27.5072 110.299C28.1298 110.786 29.0653 110.342 30.9365 109.454L31.4205 109.224C31.9524 108.972 32.2181 108.846 32.5 108.846C32.7819 108.846 33.0476 108.972 33.5795 109.224L34.0635 109.454C35.9347 110.342 36.8702 110.786 37.4928 110.299C38.1152 109.812 38.012 108.717 37.8062 106.526L37.7528 105.959C37.6943 105.336 37.6651 105.025 37.752 104.736C37.8392 104.447 38.0329 104.214 38.4199 103.747L38.7725 103.323C40.1348 101.68 40.8162 100.859 40.5784 100.071C40.3406 99.2832 39.3412 99.0502 37.3428 98.5841L36.8258 98.4635C36.2578 98.331 35.974 98.2648 35.7459 98.0864C35.5179 97.908 35.3716 97.6376 35.0794 97.0968L34.8132 96.6045C33.784 94.7015 33.2694 93.75 32.5 93.75Z" /></clipPath><clipPath id="paint1_diamond_9_2_clip_path"><path d="M19.2102 121.503L18.1844 125.36C16.4826 131.758 15.6318 134.957 16.7672 136.708C17.1651 137.322 17.699 137.815 18.3184 138.14C20.0859 139.067 22.815 137.602 28.2731 134.67C30.0893 133.695 30.9974 133.207 31.9621 133.101C32.3199 133.062 32.6801 133.062 33.0379 133.101C34.0026 133.207 34.9107 133.695 36.7269 134.67C42.185 137.602 44.9142 139.067 46.6816 138.14C47.301 137.815 47.8349 137.322 48.2327 136.708C49.3683 134.957 48.5174 131.758 46.8157 125.36L45.7898 121.503C42.0355 124.244 37.4503 125.854 32.5 125.854C27.5497 125.854 22.9644 124.244 19.2102 121.503Z" /></clipPath><linearGradient id="paint0_diamond_9_2" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.0576923" stop-color="#F7DB23" />
                                        <stop offset="0.461538" stop-color="#EEDA59" />
                                        <stop offset="0.783654" stop-color="#F4E163" />
                                    </linearGradient>
                                    <linearGradient id="paint1_diamond_9_2" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.0576923" stop-color="#F7DB23" />
                                        <stop offset="0.461538" stop-color="#EEDA59" />
                                        <stop offset="0.783654" stop-color="#F4E163" />
                                    </linearGradient>
                                    <clipPath id="clip0_9_2">
                                        <rect width="130" height="151" fill="white" />
                                    </clipPath>
                                    <clipPath id="clip1_9_2">
                                        <rect width="86" height="86" fill="white" transform="translate(48 1)" />
                                    </clipPath>
                                    <clipPath id="clip2_9_2">
                                        <rect width="2023.53" height="1911.11" fill="white" transform="translate(-920.765 -911.556)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className='heading_inner_text'>
                            <h2>How it Work</h2>
                        </div>
                    </div>
                </div>
                <div className='Steps_guidence_inner'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='Steps_guidence_inner_box'>
                                    <div className='Steps_guidence_inner_box_svg'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 1024 1024"><path d="M263.508 346.359c0-11.782 9.551-21.333 21.333-21.333h303.012c11.78 0 21.333 9.551 21.333 21.333s-9.553 21.333-21.333 21.333H284.841c-11.782 0-21.333-9.551-21.333-21.333zm21.333 92.937c-11.782 0-21.333 9.553-21.333 21.333 0 11.785 9.551 21.333 21.333 21.333h303.012c11.78 0 21.333-9.549 21.333-21.333 0-11.78-9.553-21.333-21.333-21.333H284.841zm-21.333 135.599c0-11.78 9.551-21.333 21.333-21.333h303.012c11.78 0 21.333 9.553 21.333 21.333 0 11.785-9.553 21.333-21.333 21.333H284.841c-11.782 0-21.333-9.549-21.333-21.333zm21.333 92.535c-11.782 0-21.333 9.553-21.333 21.333 0 11.785 9.551 21.333 21.333 21.333h303.012c11.78 0 21.333-9.549 21.333-21.333 0-11.78-9.553-21.333-21.333-21.333H284.841z" /><path d="M325.731 43.151h15.654c1.387-.283 2.823-.432 4.294-.432s2.907.149 4.294.432H654.22c37.875 0 68.74 30.919 68.74 68.78v649.225c0 37.858-30.865 68.779-68.74 68.779H218.073c-37.873 0-68.741-30.921-68.741-68.779V212.754c0-.922.058-1.831.172-2.722.466-11.074 4.843-22.22 13.986-31.371L285.747 56.306c11.501-11.236 26.231-15.109 39.984-13.155zM193.673 208.819L315.626 86.765c.943-.899 1.808-1.238 2.577-1.366.895-.149 1.968-.049 3.028.39 1.055.437 1.833 1.1 2.312 1.78.366.52.73 1.278.803 2.512v70.051c0 .256.004.511.013.765v38.38c0 9.981-8.243 18.205-18.173 18.205H197.149c-1.328 0-2.141-.36-2.728-.777-.686-.486-1.363-1.285-1.806-2.354s-.529-2.115-.384-2.956c.124-.722.455-1.588 1.441-2.575zm173.34-123.001v3.525c.009.399.013.8.013 1.202v108.731c0 33.512-27.312 60.872-60.839 60.872L192 260.151v501.005c0 14.327 11.799 26.112 26.074 26.112h436.147c14.276 0 26.074-11.785 26.074-26.112V111.931c0-14.33-11.797-26.113-26.074-26.113H367.013z" /><path d="M777.485 128.521c-11.785 0-21.333 9.551-21.333 21.333s9.549 21.333 21.333 21.333h28.442c14.276 0 26.074 11.783 26.074 26.113v715.254c0 14.332-11.797 26.112-26.074 26.112H369.78c-14.275 0-26.074-11.785-26.074-26.112v-28.075c0-11.78-9.551-21.333-21.333-21.333s-21.333 9.553-21.333 21.333v28.075c0 37.862 30.868 68.779 68.741 68.779h436.147c37.875 0 68.74-30.916 68.74-68.779V197.3c0-37.861-30.865-68.78-68.74-68.78h-28.442z" /></svg>
                                        </div>
                                    </div>
                                    <div className='Steps_guidence_inner_box_text'>
                                        <h3>Upload-Data</h3>
                                        <p>Upload you Excel spreadsheet containing recipiend information and certificate template.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='Steps_guidence_inner_box'>
                                    <div className='Steps_guidence_inner_box_svg'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="9" r="7" stroke="#1C274C" stroke-width="1.5" />
                                                <path d="M7.35111 15L6.71424 17.323C6.0859 19.6148 5.77173 20.7607 6.19097 21.3881C6.3379 21.6079 6.535 21.7844 6.76372 21.9008C7.41635 22.2331 8.42401 21.7081 10.4393 20.658C11.1099 20.3086 11.4452 20.1339 11.8014 20.0959C11.9335 20.0818 12.0665 20.0818 12.1986 20.0959C12.5548 20.1339 12.8901 20.3086 13.5607 20.658C15.576 21.7081 16.5837 22.2331 17.2363 21.9008C17.465 21.7844 17.6621 21.6079 17.809 21.3881C18.2283 20.7607 17.9141 19.6148 17.2858 17.323L16.6489 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='Steps_guidence_inner_box_text'>
                                        <h3>Customize-Templete</h3>
                                        <p>Customize your template and adjust text, Position, color to create the layout and submit. </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='Steps_guidence_inner_box'>
                                    <div className='Steps_guidence_inner_box_svg'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">

                                                <title />

                                                <g id="Complete">

                                                    <g id="mail">

                                                        <g>

                                                            <polyline fill="none" points="4 8.2 12 14.1 20 8.2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />

                                                            <rect fill="none" height="14" rx="2" ry="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="6.5" />

                                                        </g>

                                                    </g>

                                                </g>

                                            </svg>
                                        </div>
                                    </div>
                                    <div className='Steps_guidence_inner_box_text'>
                                        <h3>Send-Certificate</h3>
                                        <p>Review your certificates and send them to all recipients with a single click</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <div class="redirect_button">
                                <a href='/' className='Redirect_anchor'>Login to continue</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
export default Header