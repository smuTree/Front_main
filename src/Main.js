import React from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'; // Import Canvas
import { useNavigate } from 'react-router-dom';
import './Main.module.css';

export default function Main() {
  const { scene } = useGLTF('/planet.gltf'); // useGLTF 훅 사용
  const navigate = useNavigate();

  function clickLogin() {
    console.log("play now button clicked");
    navigate('/NickName');
  }

  function clickRanking() {
    navigate('/Ranking');
  }

  return (
    <Canvas>
      {/* 3D scene elements */}
      <ambientLight color={'#ffffff'} intensity={3} />
      <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
      <spotLight color={'#B778FF'} position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={1} />

      <group position={[0, 0, 0]} scale={[0.9, 0.9, 0.9]}>
        <primitive object={scene} />
      </group>

      {/* HTML elements */}
      <Html center>
        <div className="centered-container">
          <h1>CosmicMiner</h1>
          {/* <button className="button" onClick={clickGame}>Start</button> */}
          <button className="button" onClick={clickLogin}>Start</button>
          <button className="button" onClick={clickRanking}>Ranking</button>
        </div>
      </Html>
    </Canvas>
  );
}
