
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import type { Mesh } from 'three';

const CUBE_FACES = [
  'https://picsum.photos/seed/face1/200/200',
  'https://picsum.photos/seed/face2/200/200',
  'https://picsum.photos/seed/face3/200/200',
  'https://picsum.photos/seed/face4/200/200',
  'https://picsum.photos/seed/face5/200/200',
  'https://picsum.photos/seed/face6/200/200',
];

const SpinningCube: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const textures = useLoader(TextureLoader, CUBE_FACES);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  
  const materials = useMemo(() => textures.map(texture => <meshStandardMaterial map={texture} />), [textures]);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      {materials}
    </mesh>
  );
};

const CubeLoader: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onLoaded();
        }, 2500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <SpinningCube />
      </Canvas>
    </div>
  );
};

export default CubeLoader;
