import React from 'react';
import Home from './components/Home.jsx';
import { BrowserRouter, Route, Router, Link } from 'react-router-dom'
import './App.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Router>
      <Route path='/' element={<Home />}/>
      <Route path='/totalSum' element={}/>
      </Router>
    </BrowserRouter>
    </>
  );
}

export default App;
