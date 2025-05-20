import React from 'react';
import ReactDOM from 'react-dom/client';
import './Login.css'
function Login() {
    return <>
        <div className="Login">
            <div className="container">
                <div className="Inner_Login">
                    <div>
                        <p>Welcome To IIPS</p>
                        <h1>Sampoorn</h1>
                    </div>
                    <div className="Login_form">
                        <form>
                            <h2>Log in</h2>
                            <div className="Google">
                                <p class="Google_p_design">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47" /><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4" /><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00" /><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374" /><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435" /><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626" /><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4" /></svg>
                                    </div>
                                    <div className="Text">
                                        <p>Log in With Goolge</p>
                                    </div>
                                </p>
                            </div>
                            <span className="or">or</span>
                            <div className="Continue_with_mail">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920">
                                        <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fill-rule="evenodd" />
                                    </svg>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 16 16" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z" fill="#000000" />
                                    </svg>
                                    <input type="passward" placeholder="Passward" />
                                </div>
                            </div>
                            <button type="submit">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Login;