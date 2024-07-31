import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (username === 'React' && password === 'password') {
        Swal.fire({
          title: 'Login Successful!',
          text: `Welcome, ${username}!`,
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          willClose: () => {
            setIsLoading(false);
            navigate('/home');
          }
        });
      } else {
        Swal.fire({
          title: 'Login Failed!',
          text: 'Username atau password salah.',
          icon: 'error',
          timer: 1000,
          timerProgressBar: true
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="container">
          <h1>Login</h1>
          <div className="login-content">
            <div className="login-image">
              <img className="login-images" src='/images/React.gif' alt="Login" />
            </div>
            <div className="login-form">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="checkbox-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  /> Show Password
                </label>
              </div>
              <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
          <div className="additional-container">
            <h2>Welcome to Reactjs!</h2>
            <p>Belajar User Interactive Interactive Dari Reactjs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
