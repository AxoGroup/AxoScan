import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import './App.css';
import Signup from './components/Signup.jsx';

const isAuthenticated = () => {
  return localStorage.getItem("userToken") ? true : false;
};

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
