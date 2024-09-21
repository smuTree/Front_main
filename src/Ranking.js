import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import styles from './Ranking.module.css'; // CSS 모듈 import
import { Canvas } from '@react-three/fiber';

export default function Ranking() {
    const [rankingData, setRankingData] = useState([]);
    const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

    useEffect(() => {
        // 백엔드 API에서 랭킹 데이터를 가져오는 함수
        const fetchRankingData = async () => {
            try {
                const response = await fetch(`http://${BACKEND_IP}/ranking`); // 실제 백엔드 URL로 변경
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRankingData(data);
            } catch (error) {
                console.error('Failed to fetch ranking data:', error);
            }
        };

        fetchRankingData();
    }, []);

    return (
        <Canvas>
            <Html center>
                <div className={styles['ranking-container']}>
                    <h1>Ranking</h1>
                    <ul className={styles['ranking-list']}>
                        {rankingData.map((entry, index) => (
                            <li key={index} className={styles['ranking-item']}>
                                <span className={styles['rank']}>{index + 1}</span>
                                <span className={styles['name']}>{entry.username}</span>
                                <span className={styles['score']}>{entry.highscore}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Html>
        </Canvas>
    );
}