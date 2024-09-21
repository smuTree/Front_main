import React from "react";
import { Html } from '@react-three/drei';
import styles from "./Login.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Canvas } from "@react-three/fiber";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLoogin";

export default function Login() {
    

    return (
        <Canvas>
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
