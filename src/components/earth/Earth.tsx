import React from "react";

import * as THREE from "three";

import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

import EarthDayMap from "../../photo/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../photo/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../photo/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../photo/textures/8k_earth_clouds.jpg";
import { CountriesInfo } from "../../services";

type EarthProps = {
    allCountries: CountriesInfo[];
    country: string;
    onSelectCountry: (country: string, ) => void;
}

export const Earth: React.FC<EarthProps> = ({
    allCountries,
    country,
    onSelectCountry,
}) => {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );
        
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.offset.setX(1.5708 / (2 * Math.PI));

    const sceneRef = React.useRef();

    const calculatePosition = (latitude: number, long: number) => {
        const lng = long * Math.PI / 180;
        const lat = latitude * Math.PI / 180;

        const x = Math.cos(lat) * Math.sin(lng);
        const y = Math.sin(lat);
        const z = Math.cos(lat) * Math.cos(lng);

        return [x, y, z];
    }

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (!country) {
            return;
        }

        sceneRef.current.rotation.y = elapsedTime / 6;
    });

    const onSelect = (name: string) => {
        onSelectCountry(name);
    };

    return (
        <>
            <scene ref={sceneRef}>
                {allCountries.map(({ countryInfo, country }) => (
                    <mesh onClick={() => onSelect(country)} position={calculatePosition(countryInfo.lat, countryInfo.long)} args={[0, 1, 5, 5]}>
                        <sphereGeometry args={[0.006, 64, 64]} />
                        <meshBasicMaterial color={'red'} />
                    </mesh>
                ))}

                <ambientLight intensity={1} />

                <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />

                <Stars
                    radius={300}
                    depth={60}
                    count={15000}
                    factor={7}
                    saturation={0}
                    fade={true}
                />

                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[1.005, 64, 64]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        opacity={0.3}
                        depthWrite={true}
                        transparent={true}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhongMaterial specularMap={specularMap} />

                    <meshStandardMaterial
                        map={colorMap}
                        normalMap={normalMap}
                        metalness={0.4}
                        roughness={0.7}
                    />

                    <OrbitControls
                        enableZoom={true}
                        // enablePan={true}
                        enableRotate={true}
                        zoomSpeed={0.6}
                        panSpeed={0.5}
                        rotateSpeed={0.4}
                    />
                </mesh>
            </scene>
        </>
    );
};
