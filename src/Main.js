import React from 'react';
import { Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {useNavigate} from 'react-router-dom';
import './Main.module.css';

export default function Main() {

    const gltf = useLoader(GLTFLoader, '/planet.gltf');
    const model = gltf.scene;
    const navigate = useNavigate();

    function clickLogin(){
        console.log("play now button clicked");
        navigate('/login');
    }

    function clickRanking(){
        navigate('/Ranking');
    }

    function clickGame(){
        navigate('/InGame');
    }

    return (
        <>       
            <ambientLight color={'#ffffff'} intensity={3} />
            <pointLight color ={'#B778FF'} position={[10, 10, 10]} intensity={3} />
            <spotLight color ={'#B778FF'} position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={1} />

            <group position={[0, 0, 0]} scale={[0.9, 0.9, 0.9]}>
                <primitive object={model} />
            </group>

            {/* HTML 요소 */}
            <Html center>
                <div className="centered-container">
                    <h1>CosmicMiner</h1>
                    <button className="button" onClick={clickGame}>Start</button> 
                    <button className="button" onClick={clickLogin}>Login</button> 
                    <button className="button" onClick={clickRanking} >Ranking</button>
                </div>
            </Html>
        </>
    );
}
