import React from 'react';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Crypto from './pages/Crypto';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/crypto/:cryptoId" element={<Crypto/>} />
      </Routes>
    </div>
  )
}

export default App
