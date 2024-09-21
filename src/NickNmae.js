import React from 'react';
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'; // Import Canvas


const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

export default function NickName() {
    const navigate = useNavigate();

    function createNickname(){
        const nickname = document.getElementById("Nickname").value;
        console.log(nickname);

        let NickName = {
            method: 'POST',
            body: JSON.stringify({nickname}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'    
            }
        };
        fetch(`${BACKEND_IP}/Nickname`,NickName)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json(); 
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        navigate('/InGame');

    }
    return (
        <Canvas>
            <Html center>
                <div className="container">
                    <span style={{width: '500px'}}>닉네임을 입력하세요 </span>
                    <input 
                        id='Nickname' 
                        type='text' 
                        placeholder='name' 
                        className="input"
                    /><br />

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
