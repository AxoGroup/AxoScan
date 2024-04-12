import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    
    const handleClick = async () => {
        const body = {
            username: username,
            password: password
        }
        try{
        const response = await axios.post('/api/login', body)
        if(response){console.log(response), navigate('/')}
    } catch(err){
        throw new Error('Inputted username/password not found')
    }
}
    return (
        <div>
          <h1>LOGIN</h1>
          <p>username</p>
          <input type="text" placeholder='Username' value={username} onChange={handleChangeUsername}/>
          <p>password</p>
          <input type="text" placeholder='Password' value={password} onChange={handleChangePassword}/>
          <button onClick={handleClick}>login</button>
        </div>
      );
    };

export default Login;