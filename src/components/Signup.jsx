import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Flex } from 'antd';
import '../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const errorToastStyle = {
    border: '1px solid #e3342f',
    padding: '16px',
    color: 'black',
    backgroundColor: '#ffcbcb',
  };

  const signup = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = data;
    if (confirmPassword !== password) {
      toast.error('Passwords do not match, try again', {
        style: errorToastStyle,
      });
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/api/signup', {
        email,
        password,
      });

      if (data.status === 400) {
        toast.error('Email already exists');
      }

      if (data.error) {
        toast.error(data.error, {
          style: errorToastStyle,
        });

      } else {
        setData({});
        localStorage.setItem('token', data.token);
        toast.success('Signup Successful. Welcome!');
        navigate('/');
      }
  } catch (error) {

      toast.error('Email already taken', {
        style: errorToastStyle,
      });
      console.log(error);
    }
  };

  return (
    <Flex direction="column" justify='center' align="center" style={{ height: '100vh' }}>
    
    <div className='signup-container'>
      <h1 className='title'>CatSkan</h1>
      <div className='signup-text-background-box'>
        <form onSubmit={signup} className='signup'>
          <div className='signup-form-container'>
            {/* <label className='signup-form-element'>Username</label>
            <input className='signup-form-element' type='text' placeholder='Username' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} /> */}
            <label className='signup-form-element'>Email</label>
            <input className='signup-form-element' type='email' placeholder='Email Address' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            <label className='signup-form-element'>Password</label>
            <input className='signup-form-element' type='password' placeholder='Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            <label className='signup-form-element'>Confirm Password</label>
            <input className='signup-form-element' type='password' placeholder='Confirm Password' value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
            <button type='submit' className="submit-btn">Sign Up</button>
            <p className="signup-form-element">Already have an account?</p>
            <button type="button" className="alr-reg-btn" onClick={() => navigate('/login')}>Log In</button>
          </div>
        </form>
      </div>
      <footer className='footer-signup'>Copyright © [2024] CatSnake Inc. All rights reserved</footer>
    </div>
    </Flex>
  );
};

export default Signup;
