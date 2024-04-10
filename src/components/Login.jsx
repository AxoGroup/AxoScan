import React from 'react'; 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, ConfigProvider } from 'antd';



const Login = () => {
    const[userEmail, setUserEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate(); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/api/auth/login', { //adjust url as needed
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, password }),
          });
          
          if (response.ok) {
            const data = await response.json(); 
            localStorage.setItem('userToken', data.token); // Example action on success
            navigate('/'); // Navigate to home
          } else {
            // Handle non-200 responses
            const errorResponse = await response.json(); // Make sure server sends JSON on errors
            alert(errorResponse.error || 'An error occurred');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Invalid Credentials');
        }

      };
      return (
        <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Noto Sans", sans-serif, "Apple Color Emoji"',
          },
        }}
      >
        <Flex justify='center' align='center' style={{ height: '100vh' }}>
        <Flex vertical justify='center' align='center'>  
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User E-Mail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </Flex>
        </Flex>
        </ConfigProvider>
      );
}

export default Login; 