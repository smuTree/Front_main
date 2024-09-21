import React from 'react';
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import './NickName.css'; // CSS 파일 import

export default function NickName() {
    const navigate = useNavigate();
    function createNickname(){
        const nickname = document.getElementById("Nickname").value;
        console.log(nickname);
        navigate('/login');
    }

    return (
        <Canvas>
            <Html center>
                <div className="container">
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