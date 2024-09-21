import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function KakaoLogin() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;
  const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
  // const REDIRECT_URI = `http://${BACKEND_IP}:${BACKEND_PORT}/login/oauth/kakao`;
  const REDIRECT_URI = `http://172.30.1.54:8080/login/oauth/kakao`;
 
  
  // const handleKakaoLogin = async () => {
  //   // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
  //   // window.location.href = link;
  //   const response = await fetch('http://172.30.1.54:8080/login/oauth/kakao');
  //   const kakaoAuthUrl = await response.text(); // URL을 받아옴
  //   window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 리다이렉트
  // };

  // const handleKakaoLogin = async () => {
  //   try {
  //     // 백엔드의 카카오 로그인 엔드포인트로 요청
  //     const response = await fetch(`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`);
  //     const kakaoAuthUrl = await response.text(); // URL을 받아옴
      
  //     // 카카오 인증 페이지로 리다이렉트
  //     window.location.href = kakaoAuthUrl; 
  //   } catch (error) {
  //     console.error("Error during Kakao login:", error);
  //   }
  // };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 리다이렉트
  };


  // URL에서 인증 코드 가져오기
  useEffect(() => {
    const query = new URLSearchParams(window.location.search); // URL에서 쿼리 파라미터 가져오기
    const code = query.get("code"); // 쿼리에서 'code' 파라미터 추출

    if (code) {
      getKakaoToken(code); // 'code'가 있을 경우 토큰 요청 함수 호출
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  const getKakaoToken = async (code) => {
    try {
      const response = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: code,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json(); //응답 파싱 
      const accessToken = data.access_token; //액세스 토큰 추출 

      // 액세스 토큰으로 사용자 데이터 가져오기
      const userData = await fetchUserData(accessToken);
      console.log(userData); // 사용자 정보 출력

      // // 로그인 성공 후 /InGame으로 리다이렉트
      // navigate('/InGame');
    } catch (error) { //로그인 실패 시 콘솔 출력 
      console.error("Error:", error);
    }
  };

  const fetchUserData = async (accessToken) => {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 액세스 토큰 추가
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json(); // 사용자 데이터 파싱
    return userData; //사용자 데이터 반환 
  };

  return (
    <button id="kakao-login" className={styles.button} onClick={handleKakaoLogin}>
      카카오계정으로 로그인
    </button>
  );
}