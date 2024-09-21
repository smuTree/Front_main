import React, { useRef } from "react";
import { Html, useGLTF } from '@react-three/drei';
import styles from "./Login.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Canvas, useFrame } from "@react-three/fiber";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLoogin";

export default function Login() {
    
    const { scene } = useGLTF('/planet.gltf'); // useGLTF 훅 사용
    const planetRef = useRef();

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
                <div className={styles.container}>
                    <h1 className={styles.title}>Login</h1>
                    <KakaoLogin />
                    <GoogleOAuthProvider clientId ={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        {console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID)}  {/* 로그로 출력 */}
                        <GoogleLogin />
                    </GoogleOAuthProvider>
                </div>
            </Html>
        </Canvas>
    );
}
