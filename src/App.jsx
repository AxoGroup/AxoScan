import React from 'react';
import Home from './components/Home.jsx';
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom'
import './App.css';
//import login

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}/>
      {/* <Route path='/totalSum' element={}/> */}
      {/* <Route path='/login' element={<Login />}/> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
