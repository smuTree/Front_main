import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Main from './Main';
import Particle from './Particle';
import Redirection from './Redirection';
import Login from './Login';
import Ranking from './Ranking';
import InGame from './InGame';
import NickName from './NickNmae';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Particle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path='/login/oauth/kakao' element={<Redirection />} />
          <Route path="/InGame" element={<InGame />} />
          <Route path="/NickName" element={<NickName />}/>
        </Routes>
        {/* If you have other UI components outside Canvas */}
      </div>
    </Router>
  );
}

export default App;
