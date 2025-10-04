import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

function Earth({ currentYear }) {
    const earthRef = useRef();
    const cloudsRef = useRef(); 
    const earthGroupRef = useRef();
    
    const yearString = String(currentYear);
    
    const colorMapPath = `/LandCover_Output/land_cover_${yearString}.png`; 
    const bumpMapPath = `/SurfaceBumpData_HTML/globe_bump_${yearString}.png`; 
   // const cloudMapPath = `src/assets/clouds_texture.jpg`; 
    const atmosphereMapPath = `/NASA_Atmosphere_Output/year_average_${yearString}.png`; 

    const [colorMap, bumpMap, atmosphereMap] = useTexture([
        colorMapPath,
        bumpMapPath,
        atmosphereMapPath 
    ], (textures) => {
        if (textures[1]) {
            textures[1].colorSpace = THREE.NoColorSpace;
        }
    });

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002; 
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0025; 
        }
    });

    const getMaterialProps = (map, bump = false) => {
        if (!map) return {};
        
        return bump ? { bumpMap: map } : { map: map };
    };

    return (
        <group ref={earthGroupRef} rotation-z={23.4 * Math.PI / 180}>
            
            <mesh ref={earthRef} position={[0, 0, 0]}>
                <sphereGeometry args={[2, 64, 64]} /> 
                <meshStandardMaterial 
                    color={0xFFFFFF} 
                    {...getMaterialProps(colorMap)}
                    {...getMaterialProps(bumpMap, true)}
                    bumpScale={150} 
                />
            </mesh>
            
            
            {/* <mesh ref={cloudsRef} position={[0, 0, 0]} scale={2.003}> 
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial 
                    {...getMaterialProps(atmosphereMap)}
                    transparent={true} 
                    opacity={0.1}
                    depthWrite={true} 
                />
            </mesh> */}

            <mesh ref={cloudsRef} position={[0, 0, 0]} scale={2.05}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    {...getMaterialProps(atmosphereMap)}
                    transparent={true}
                    opacity={0.70}
                    side={THREE.BackSide} 
                />
            </mesh>
            
        </group>
    );
}

export default function EarthGlobe({ currentYear, startYear, endYear }) {
    const earthOrbitRef = useRef(); 
    
    return (
        <Canvas 
            camera={{ position: [5, 2, 8], fov: 50 }} 
            style={{ background: '#000000' }}
        >
            <Suspense fallback={<Html center className="text-white">Loading Terra Data...</Html>}>
                
                <directionalLight 
                    position={[-9, 0, 0]} 
                    intensity={5}        
                    color={0xffffee} 
                />
                <ambientLight intensity={0.45} /> 
                
                <group ref={earthOrbitRef} position={[4, 0, 0]}>
                    <Earth currentYear={currentYear} />
                    
                    {/*   MOON  */}
                    {/* SATELLITE  */}
                </group>
                
                <Stars radius={150} depth={80} count={10000} factor={6} saturation={0.5} fade speed={1.5} />
                
                <OrbitControls 
                    enableZoom={true} 
                    enablePan={false} 
                    maxDistance={20}
                    minDistance={3}
                    enableDamping={true} 
                    dampingFactor={0.05} 
                />
                
            </Suspense>
        </Canvas>
    );
}
