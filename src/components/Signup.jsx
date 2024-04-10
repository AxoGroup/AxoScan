import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Flex } from 'antd';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const signup = async (e) => {
    e.preventDefault()
    const {username, email, password, confirmPassword} = data;
    if (confirmPassword !== password) {
        toast.error('Password not match, try again')
      }
    // console.log('hello');
    try {
      const {data} = await axios.post('/signup', {
        username, email, password
      })

      // console.log(data);

      if (data.status === 400){
        toast.error('Username or email already exists');
      }

      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Signup Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      if (error.response && error.response.status === 400){
        toast.error('Email/Username already in use');
        console.error('Email/Username error', error.response.data.error)
      } else {
        console.log(error)
      }

    }
  };
  return (
    <Flex direction="column" justify='center' align="center" style={{ height: '100vh' }}>
    
    <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>AxoScan</h1>
      <div className='signup-text-background-box'>
        <form onSubmit={signup} className='signup'>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Username</label>
            <input type='text' placeholder='   Username' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
            <label>Email</label>
            <input type='email' placeholder='   Email Address' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            <label>Password</label>
            <input type='password' placeholder='   Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            <label>Confirm Password</label>
            <input type='password' placeholder='   Confirm Password' value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
            <button type='submit' className="submit-btn">Submit</button>
            <button type="button" className="account-exists-btn" onClick={() => navigate('/login')}>Already have an account?</button>
          </div>
        </form>
      </div>
      <footer className='footer-signup'>Copyright © [2024] CatSnake Inc. All rights reserved</footer>
    </div>
    </Flex>
  );

}

export default Signup