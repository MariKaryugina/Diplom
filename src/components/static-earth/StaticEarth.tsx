import React, { useEffect } from "react";

import * as THREE from "three";

import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import EarthDayMap from "../../photo/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../photo/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../photo/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../photo/textures/8k_earth_clouds.jpg";

export const StaticEarth = () => {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );

    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.offset.setX(1.5708 / (2 * Math.PI));

    const sceneRef = React.useRef();
    const cameraRef = React.useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (!sceneRef.current) {
          return;
        }

        (sceneRef.current as any).rotation.y = elapsedTime / 6;
    });

    return (
        <scene ref={sceneRef}>
            <camera ref={cameraRef} />

            <ambientLight intensity={1} />

            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />

            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2.005, 64, 64]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.3}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshPhongMaterial specularMap={specularMap} />

                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                />
            </mesh>
        </scene>
    );
}
