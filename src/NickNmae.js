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
    console.log("Backend IP:", BACKEND_IP);

    // function createNickname() {
    //     const nickname = document.getElementById("Nickname").value;
    //     console.log(nickname);
        
    //     let NickName = {
    //         method: 'POST',
    //         body: JSON.stringify({username : nickname}),      
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'    
    //         }
    //     };
    //     console.log("Request Payload:", NickName.body); 
    //     fetch(`http://${BACKEND_IP}/Nickname`,NickName)
    //     .then((res) => {
    //         if (!res.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return res.json(); 
    //     })
    //     .then((data) => {
    //         console.log(data);
    //         navigate('/InGame');
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });
        

    // }

    async function createNickname() {
        const nickname = document.getElementById("Nickname").value;
        console.log(nickname);

        // 백엔드로 POST 요청 보내기
        try {
            const response = await fetch(`http://${BACKEND_IP}/Nickname`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: nickname }), // username으로 백엔드로 전송
            });

            if (!response.ok) {
                throw new Error('백엔드로 요청을 보내는 중 에러 발생');
            }

            // const result = await response.json();
            // console.log('백엔드 응답:', result);

            // 요청이 성공하면 게임 페이지로 이동
            navigate('/InGame');
        } catch (error) {
            console.error('에러 발생:', error);
        }
    }


    // GLTF 모델을 포함한 회전하는 컴포넌트
    function RotatingPlanet() {
        useFrame((state) => {
            if (planetRef.current) {
                //planetRef.current.rotation.y += 0.01; // Y축을 기준으로 회전 (공전 효과)
                const time = state.clock.getElapsedTime();
                const radius = 3; // 공전 반지름
                const speed = 0.3;
                planetRef.current.position.x = radius * Math.cos(time * speed); // X축 공전
                planetRef.current.position.z = radius * Math.sin(time * speed); // Z축 공전
                planetRef.current.rotation.y += 0.01; // 자전
            }
        });

        return (
            <group ref={planetRef} position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]}>
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
                    <h1>Nickname</h1>
                    <input 
                        id='Nickname' 
                        type='text' 
                        placeholder='이름을 입력하세요' 
                        className="input-name"
                    /><br />

                    <button
                        type='button' 
                        className='name-button'
                        onClick={createNickname}
                    >완료 </button>
                </div>
            </Html>
        </Canvas>
    );
}
