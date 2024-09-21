import React from 'react';
import { Text as DreiText } from '@react-three/drei';

export const TextComponent = () => {
  return (
    <>
    <DreiText
        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.75}
        position={[0, 7, -10]}
        color="#FFFFFF"
      >
        {'[ 게임 방법 ]'}
      </DreiText> 
      <DreiText
        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.35}
        position={[0, 6, -10]}
        color="#FFFFFF"
      >
        {'1. 광산에서 크리스탈 채굴 '}
      </DreiText> 
      <DreiText
        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.35}
        position={[0.14, 5.5, -10]}
        color="#FFFFFF"
      >
        {'2. 용광로에서 크리스탈 용해'}
      </DreiText> 
      <DreiText
        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.35}
        position={[0, 5, -10]}
        color="#FFFFFF"
      >
        {'3. 모루에서 크리스탈 제련'}
      </DreiText> 

      <DreiText
        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.3}
        position={[0, 2.8, -10]}
        color="#FFFFFF"
      >
        {'위 노란점을 클릭하고 WASD로 움직이세요!'}
      </DreiText>
      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.4}
        position={[0, 3.45, -10]}
        color="yellow"
      >
        {'●'}
      </DreiText>
      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.3}
        position={[4, 5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color="#FFFFFF"
      >
        {'{크리스탈 광산}'}
      </DreiText>
      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.25}
        position={[4, 4.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color="#FFFFFF"
      >
        {'큐브 Shift + 좌클릭 시 크리스탈 채굴'}
      </DreiText>

      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.3}
        position={[-6, 5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        color="#FFFFFF"
      >
        {'{용광로}'}
      </DreiText>
      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.25}
        position={[-6, 4.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        color="#FFFFFF"
      >
        {'용광로 좌클릭 시 크리스탈 용해'}
      </DreiText>

      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.2}
        position={[-1.5, 3.8, -1.8]}
        rotation={[0, Math.PI / 2, 0]}
        color="#FFFFFF"
      >
        {'{모루}'}
      </DreiText>
      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={0.15}
        position={[-1.5, 3.5, -1.8]}
        rotation={[0, Math.PI / 2, 0]}
        color="#FFFFFF"
      >
        {'모루 좌클릭 시 크리스탈 제련'}
      </DreiText>

      <DreiText

        font={'/fonts/jamsilFont.ttf'}
        fontSize={1}
        position={[0, 1, -10]}
        color="#781FA2"
      >
        {'Have Fun CosmicMiner!'}
      </DreiText>

    </>
  );
};
