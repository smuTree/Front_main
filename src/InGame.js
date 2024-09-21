import './InGame.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { TextComponent } from './components/TextComponent';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { Building } from './components/Building';
import { Crystal } from './components/Crystal';
import { GameProvider, useGameContext } from './components/GameContext';
import { NightSky } from './components/NightSky';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function InGame() {
  return (
    <GameProvider>
      <Canvas shadows>
        <NightSky />
        <pointLight position={[5, 2, 0.2]} intensity={20} distance={10} />
        <FPV />
        <TextComponent />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
          <Crystal />
          <Building />
        </Physics>
      </Canvas>
      <FixedUI />
    </GameProvider>
  );
}

const FixedUI = () => {
  const { cubesRemoved, crystalMelted, weaponMade } = useGameContext();
  const [seconds, setSeconds] = useState(30); // 30초 타이머
  const navigate = useNavigate();

  useEffect(() => {
    // 초시계가 1초마다 업데이트되도록 설정
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // 30초 후에 다른 페이지로 이동
    const timeout = setTimeout(() => {
      navigate('/Ranking'); // 이동할 페이지 경로
    }, 30000); // 30초

    // 컴포넌트 언마운트 시 타이머와 인터벌을 클리어
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <>
      <div style={{ position: 'fixed', top: 10, left: 320, fontSize: '100px', color: 'white'}}>
      {seconds} 
      </div>
      <div className='centered cursor'>+</div>
      <div className='overlay-text'>
        {'💎 Crystal Cube ---- ' + cubesRemoved}<br />
        {'🫧 Melted Crystal -- ' + crystalMelted}<br />
        {'🗡️ Weapon -------- ' + weaponMade}
      </div>
    </>
  );
};

export default InGame;
