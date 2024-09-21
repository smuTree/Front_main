import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useKeyboard } from "../hooks/useKeyboard";
import { Vector2, Vector3, Raycaster, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import { useStore } from "../hooks/useStore";
import { useGameContext } from "./GameContext";


const JUMP_FORCE = 5;
const SPEED = 7;

export const Player = () => {
    const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard();
    const { camera, scene } = useThree();

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 2, -3],
        rotation: [0, -Math.PI / 2, -Math.PI / 2],
    }));

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (vel.current = v));
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1] + 3, pos.current[2]));
        
        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);
        
        api.velocity.set(direction.x, vel.current[1], direction.z);
        
        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }

    });

    const mouse = useRef(new Vector2());
    const raycaster = useRef(new Raycaster());
    const lineRef = useRef();
    const edgeRef = useRef();
    const [addCube, meltCrystal, removeCube] = useStore((state) => [state.addCube, state.meltCrystal, state.removeCube]);

    const { cubesRemoved, setCubesRemoved, crystalMelted, setCrystalMelted, weaponMade, setWeaponMade } = useGameContext(); 
    const submitPost = (e) => {
        
        console.log("SCORE: " + weaponMade);
        const total = weaponMade + 1;
        let totalscore = {
            method: 'POST',
            body: JSON.stringify({total}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'    
            }
        };
        fetch(`http://172.30.1.62:3000/InGame/score`,totalscore)
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
    };
    useEffect(() => {
        const handleClick = (event) => {
            event.stopPropagation();
            
            // 마우스 좌표를 정규화
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Raycaster 설정
            raycaster.current.setFromCamera(mouse.current, camera);
            const intersects = raycaster.current.intersectObjects(scene.children, true);

            // 물체 강조
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;

                if (event.shiftKey && clickedObject.name === "crystalCube") {
                    //console.log("Attempting to remove");

                    const { x, y, z } = intersects[0].point;

                    removeCube(x, 0.3, z); // 반올림된 좌표로 삭제
                    setCubesRemoved(cubesRemoved + 1);
                }

                if (intersects.length > 0) {
                    const clickedObject = intersects[0].object;
                    //console.log('Clicked object:', clickedObject.name || clickedObject);
                }
                
                if (clickedObject.name === "furnace001" || clickedObject.name === "furnace" || clickedObject.name === "furnace1") {
                    if(cubesRemoved > 0){
                        //console.log("Clicked furnace");
                        meltCrystal();
                        setCubesRemoved(cubesRemoved - 1);
                        setCrystalMelted(crystalMelted + 1);
                    }
                } 
                    if (clickedObject.name === "anvil") {
                        if(crystalMelted > 0){
                                setCrystalMelted(crystalMelted - 1);
                                setWeaponMade(weaponMade + 1);

                                submitPost();
                        }

                } 
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [camera, scene, addCube, meltCrystal, removeCube, cubesRemoved, setCubesRemoved, crystalMelted, setCrystalMelted, weaponMade, setWeaponMade]);

};




