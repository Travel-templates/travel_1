'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Globe() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} scale={1}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
                color="#0ea5e9"
                attach="material"
                distort={0.2}
                speed={1.5}
                roughness={0.3}
                metalness={0.5}
                opacity={0.7}
                transparent
                wireframe={false}
            />
        </mesh>
    );
}

function GlobeWireframe() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= 0.001;
        }
    });

    return (
        <mesh ref={meshRef} scale={1.02}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
                color="#38bdf8"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

// Glowing destination dots
function DestinationDot({ position, color = '#fbbf24' }: { position: [number, number, number]; color?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
}

const destinationPositions: [number, number, number][] = [
    [0.4, 0.6, 0.7],   // Bali
    [0.5, 0.2, 0.85],  // Maldives
    [0.7, 0.5, 0.52],  // Dubai
    [-0.2, 0.75, 0.63], // Switzerland
    [0.3, 0.7, 0.65],  // India
];

export default function GlobeScene() {
    return (
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#38bdf8" />
            <pointLight position={[-3, -3, -3]} intensity={0.4} color="#fbbf24" />

            <Stars radius={50} depth={30} count={500} factor={2} saturation={0.5} fade />

            <Globe />
            <GlobeWireframe />

            {destinationPositions.map((pos, i) => (
                <DestinationDot key={i} position={pos} color={i % 2 === 0 ? '#fbbf24' : '#38bdf8'} />
            ))}

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI}
                minPolarAngle={0}
            />
        </Canvas>
    );
}
