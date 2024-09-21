import React, { useRef } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'; // Import Canvas and useFrame
import { useNavigate } from 'react-router-dom';
import './Main.module.css';

export default function Main() {
  const { scene } = useGLTF('/planet.gltf'); // useGLTF 훅 사용
  const planetRef = useRef(); // useRef 훅으로 오브젝트 참조 생성
  const navigate = useNavigate();

  function clickLogin() {
    console.log("play now button clicked");
    navigate('/login');
  }

  function clickRanking() {
    navigate('/Ranking');
  }

  // GLTF 모델을 포함한 회전하는 컴포넌트
  function RotatingPlanet() {
    useFrame(() => {
      if (planetRef.current) {
        planetRef.current.rotation.y += 0.01; // Y축을 기준으로 회전 (공전 효과)
      }
    });

    return (
      <group ref={planetRef} position={[0, 0, 0]} scale={[0.55, 0.55, 0.55]}>
        <primitive object={scene} />
      </group>
    );
  }

  return (
    <Canvas>
      {/* 3D scene elements */}
      <ambientLight color={'#ffffff'} intensity={3} />
      <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
      <spotLight color={'#B778FF'} position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={1} />

      {/* 회전하는 행성 컴포넌트 */}
      <RotatingPlanet />

      {/* HTML elements */}
      <Html center>
        <div className="centered-container">
          <h1>CosmicMiner</h1>
          <button className="button" onClick={clickLogin}>Start</button>
          <button className="button" onClick={clickRanking}>Ranking</button>
        </div>
      </Html>
    </Canvas>
  );
}