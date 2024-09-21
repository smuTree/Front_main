import React, { useRef } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

import './NickName.css'; // CSS 파일 import

export default function NickName() {
    const navigate = useNavigate();
    const { scene } = useGLTF('/planet.gltf'); // useGLTF 훅 사용
    const planetRef = useRef();
    const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

    function createNickname() {
        const nickname = document.getElementById("Nickname").value;
        console.log(nickname);
        navigate('/InGame');
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
            <ambientLight color={'#ffffff'} intensity={3} />
            <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
            <spotLight color={'#B778FF'} position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={1} />

            {/* 공전하는 오브젝트 */}
            <RotatingPlanet />

            <Html center>
                <div className="centered-container">
                    <span>닉네임을 입력하세요</span>
                    <input 
                        id='Nickname' 
                        type='text' 
                        placeholder='name' 
                        className="input"
                    /><br />
                    <input 
                        type='submit' 
                        value='입력' 
                        className="button" 
                        onClick={createNickname}
                    />
                </div>
            </Html>
        </Canvas>
    );
}