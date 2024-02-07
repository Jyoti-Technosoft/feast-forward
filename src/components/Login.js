import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeFill, LockFill, Eye, EyeSlash } from 'react-bootstrap-icons';

import '../assets/styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
    const validationErrors = {};
  
    if (!validateEmail(email)) {
      validationErrors.email = 'Please! Enter Email First';
      setErrors(validationErrors);
      return;
    }
  
    if (password.trim() === '') {
      validationErrors.password = 'Password is Required';
      setErrors(validationErrors);
      return;
    }
  
    const storedItems = JSON.parse(localStorage.getItem('users')) || [];
    const foundItem = storedItems.find((item) => item.email === email);

    if (foundItem) {
      const storedPassword = foundItem.password;
      if (password === storedPassword) {
        setIsValid(true);
      
      } else {
        setErrors({ ...errors, credentials: 'Invalid credentials. Login failed.' });
      }
    } else {
      setErrors({ ...errors, credentials: 'Email not found. Login failed.'});
    }
  };
  
  return (
    <div className="login-container">
      <div className="transparent-box-1">
        <h1 style={{ color: 'white', textAlign: 'center' }}>Login Account</h1>
        <div className="input-container">
          <div>
            <EnvelopeFill color="white" size={18} />
            <label>
              <h6 style={{ color: 'white', marginLeft: '3px' }}>Email*</h6>
            </label>
          </div>
          <input
            type="text"
            name="email"
            placeholder="yourname@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <LockFill color="white" size={18} />
          <label>
            <h6 style={{ color: 'white', marginLeft: '3px' }}>Password*</h6>
          </label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-visibility"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </button>
          </div>
            {errors.password && <p className="error">{errors.password}</p>}
            {errors.credentials && (
          <p className="error" style={{ color: 'red' }}>
            {errors.credentials}
        </p>
          )}
        </div>
        <p style={{color:"white", marginTop:"20px", marginLeft: '33px'}}>
          Don't have an account?{' '}
          <Link to="/register" className= "link" style={{ color: 'rgb(5 103 245)' }}>
              SignUp 
          </Link>
        </p>
        <button className="login-button" onClick={handleSubmit}>
          <Link
            to={isValid === true ? '/home' : ''}
            style={{ color: '#ffffff', fontFamily: 'serif', fontSize: 'initial' }}
          >
            LOGIN
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Login;