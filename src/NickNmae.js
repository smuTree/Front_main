import React from 'react';
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'; // Import Canvas

export default function NickName() {
    function createNickname(){
        const nickname = document.getElementById("Nickname").value;
        console.log(nickname);
    }
    return (
        <Canvas>
            <Html center>
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'black' }}>
                    <h1>닉네임 입력</h1>
                    <input id='Nickname' type='text' placeholder='닉네임을 입력하세요' 
                    style={{ textAlign: 'center', padding: '20px', width:'500px', height:'50px', fontSize:'30px', fontWeight: 'bold'}}/><br></br><br></br>
                    <input 
                        type='submit' 
                        value='입력' 
                        style={{ 
                            padding: '15px 30px', 
                            width: '200px', 
                            height: '50px', 
                            fontSize: '20px', 
                            color: '#black', 
                            backgroundColor: '#ffffff', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer', 
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                            transition: 'background-color 0.3s' ,
                            fontSize:'23px'
                        }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3356b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onClick={createNickname}
                    />
                </div>
            </Html>
        </Canvas>
    );
}
