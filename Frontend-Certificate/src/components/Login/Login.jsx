import React, { useState } from 'react';
import './Login.css';




function Login() {
  // 1. Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 2. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        // Optionally store the token: localStorage.setItem('token', data.token);
      } else {
        setMessage(data.detail || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error: ' + error.message);
    }
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="Inner_Login">
          <div>
            <p>Welcome To IIPS</p>
            <h1>Sampoorn</h1>
          </div>
          <div className="Login_form">
            <form onSubmit={handleSubmit}>
              <h2>Log in</h2>
              <div className="Google"></div>
              <span className="or">or</span>
              <div className="Continue_with_mail">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920">
                    <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z" fill="#000000" />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit">Log in</button>
              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
