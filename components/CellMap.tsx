
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, Html, Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles, RoundedBox, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { Organelle } from '../types';
import { organelles } from '../data/organelles';

interface CellMapProps {
  onSelect: (organelle: Organelle) => void;
  selectedId: string | null;
}

interface OrganelleMeshProps {
  item: Organelle;
  onClick: (item: Organelle) => void;
  onHover: (id: string | null) => void;
  hoveredId: string | null;
  isSelected: boolean;
  positionOverride?: [number, number, number];
  rotationOverride?: [number, number, number];
  scaleOverride?: [number, number, number];
  isDecorative?: boolean;
}

// --- Specific Models ---

const NucleusModel = ({ color }: { color: string }) => {
  const porePositions = useMemo(() => {
    const positions = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
       const phi = Math.random() * Math.PI * 2;
       const theta = Math.random() * Math.PI;
       const r = 1.01;
       const x = r * Math.sin(theta) * Math.cos(phi);
       const y = r * Math.sin(theta) * Math.sin(phi);
       const z = r * Math.cos(theta);
       positions.push([x, y, z]);
    }
    return positions;
  }, []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial color={color} roughness={0.5} transmission={0.2} thickness={0.5} transparent opacity={0.9} />
      </mesh>
      <Instances range={porePositions.length}>
        <ringGeometry args={[0.04, 0.08, 8]} />
        <meshStandardMaterial color="#4c1d95" side={THREE.DoubleSide} />
        {porePositions.map((pos, i) => (
          <Instance key={i} position={pos as any} lookAt={new THREE.Vector3(0,0,0)} />
        ))}
      </Instances>
      <mesh position={[0.2, 0.2, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <MeshDistortMaterial color="#581c87" speed={2} distort={0.2} radius={1} />
      </mesh>
    </group>
  );
};

const MitochondriaModel = ({ color }: { color: string }) => {
  return (
    <group>
        <mesh>
            <capsuleGeometry args={[0.4, 1.2, 4, 16]} />
            <meshPhysicalMaterial color={color} transmission={0.5} roughness={0.2} transparent opacity={0.8} />
        </mesh>
        <mesh scale={[0.7, 0.8, 0.7]}>
            <capsuleGeometry args={[0.4, 1.2, 4, 16]} />
            <MeshWobbleMaterial color="#7f1d1d" factor={0.6} speed={0.5} roughness={0.8} />
        </mesh>
    </group>
  );
};

const ChloroplastModel = ({ color }: { color: string }) => {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color={color} transmission={0.4} roughness={0.3} transparent opacity={0.8} />
      </mesh>
      <group>
        {[-0.4, 0, 0.4].map((x, i) => (
           <mesh key={i} position={[x, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
              <meshStandardMaterial color="#14532d" />
           </mesh>
        ))}
      </group>
    </group>
  );
};

const GolgiModel = ({ color }: { color: string }) => {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, (i - 1.5) * 0.2, 0]}>
           <cylinderGeometry args={[1.2 - Math.abs(i-1.5)*0.2, 1.2 - Math.abs(i-1.5)*0.2, 0.1, 32]} />
           <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      ))}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
         <mesh position={[1.2, 0.5, 0]}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color="#fdba74" />
         </mesh>
      </Float>
    </group>
  );
};

const RoughERModel = ({ color }: { color: string }) => {
  return (
    <group>
      <mesh rotation={[0, 0, 0.5]}>
        <torusGeometry args={[1.4, 0.3, 16, 64, Math.PI]} />
        <MeshWobbleMaterial color={color} factor={0.3} speed={0.2} roughness={0.6} side={THREE.DoubleSide}/>
      </mesh>
      <Sparkles count={50} scale={3} size={2} opacity={0.8} color="#fce7f3" />
    </group>
  );
};

const SmoothERModel = ({ color }: { color: string }) => {
  return (
    <mesh>
      <torusKnotGeometry args={[0.6, 0.15, 64, 8, 2, 3]} />
      <meshStandardMaterial color={color} roughness={0.3} />
    </mesh>
  );
};

const VacuoleModel = ({ color }: { color: string }) => {
  return (
    <RoundedBox args={[1, 1, 1]} radius={0.4} smoothness={8}>
      <MeshDistortMaterial 
        color={color} 
        speed={0.2} 
        distort={0.05} 
        radius={1} 
        transparent 
        opacity={0.6} 
        transmission={0.4}
        roughness={0.1}
        depthWrite={false}
      />
    </RoundedBox>
  );
};

const OrganelleMesh: React.FC<OrganelleMeshProps> = ({ 
  item, onClick, onHover, hoveredId, isSelected, positionOverride, rotationOverride, scaleOverride, isDecorative 
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const pos = positionOverride || item.position3d;
  const rot = rotationOverride || item.rotation3d || [0,0,0];
  const scale = scaleOverride || item.scale3d;

  const isCurrentHovered = hoveredId === item.id;
  const isEnclosing = item.id === 'cell_wall' || item.id === 'cell_membrane';

  useFrame((state) => {
    if (meshRef.current && !isSelected) {
       if (!isEnclosing) {
          const wobble = Math.sin(state.clock.elapsedTime * 0.5 + pos[0]) * 0.05;
          meshRef.current.position.y = pos[1] + (isCurrentHovered ? wobble * 2 : wobble);
          // Scale slightly on hover
          const targetScale = isCurrentHovered ? 1.1 : 1.0;
          meshRef.current.scale.lerp(new THREE.Vector3(...scale).multiplyScalar(targetScale), 0.1);
       }
    }
  });

  const renderModel = () => {
      switch(item.id) {
          case 'cell_wall':
              return <RoundedBox args={[1,1,1]} radius={0.1} smoothness={4}><meshPhysicalMaterial color={item.hexColor} transparent opacity={0.3} roughness={0.8} side={THREE.BackSide} depthWrite={false} /></RoundedBox>;
          case 'cell_membrane':
              return <RoundedBox args={[1,1,1]} radius={0.1} smoothness={4}><meshPhysicalMaterial color={item.hexColor} transparent opacity={0.1} roughness={0.3} side={THREE.BackSide} depthWrite={false}/></RoundedBox>;
          case 'nucleus': return <NucleusModel color={item.hexColor} />;
          case 'mitochondria': return <MitochondriaModel color={item.hexColor} />;
          case 'chloroplast': return <ChloroplastModel color={item.hexColor} />;
          case 'golgi': return <GolgiModel color={item.hexColor} />;
          case 'er_rough': return <RoughERModel color={item.hexColor} />;
          case 'er_smooth': return <SmoothERModel color={item.hexColor} />;
          case 'vacuole': return <VacuoleModel color={item.hexColor} />;
          default: return <mesh><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color={item.hexColor} /></mesh>;
      }
  }

  return (
    <group 
        ref={meshRef} 
        position={new THREE.Vector3(...pos)} 
        rotation={new THREE.Euler(...rot)} 
        scale={new THREE.Vector3(...scale)}
        onClick={(e) => { e.stopPropagation(); onClick(item); }}
        onPointerOver={(e) => { if(!isEnclosing) { e.stopPropagation(); onHover(item.id); } }}
        onPointerOut={() => onHover(null)}
    >
        {renderModel()}
        
        {/* Outline Highlight Effect */}
        {!isEnclosing && (isCurrentHovered || isSelected) && (
            <mesh scale={[1.05, 1.05, 1.05]}>
                 {item.shapeType === 'rounded_box' 
                    ? <boxGeometry args={[1.02, 1.02, 1.02]} />
                    : item.id === 'mitochondria' 
                        ? <capsuleGeometry args={[0.42, 1.22, 4, 16]} />
                        : <sphereGeometry args={[1.05, 32, 32]} />
                 }
                 <meshBasicMaterial 
                    color={isSelected ? "#6366f1" : "white"} 
                    wireframe 
                    transparent 
                    opacity={0.4} 
                 />
            </mesh>
        )}

        {/* Floating Label */}
        {!isDecorative && (!isEnclosing || isSelected) && (
            <Html position={[0, 1.2, 0]} center distanceFactor={15} style={{pointerEvents:'none'}}>
                 <div className={`px-2 py-1 rounded-md text-[10px] font-bold backdrop-blur-sm border transition-all duration-300 ${isCurrentHovered || isSelected ? 'bg-indigo-600 text-white border-indigo-400 scale-125 translate-y-[-10px] opacity-100' : 'bg-white/40 text-slate-800 border-white/20 opacity-0'}`}>
                    {item.name.split(' ')[0]}
                 </div>
            </Html>
        )}
    </group>
  );
};

const CellScene = ({ onSelect, selectedId }: CellMapProps) => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const extraChloroplasts = [
      { pos: [2.5, 2.0, 0.8], rot: [0, 0, 0.5] },
      { pos: [-2.0, 0, 0.8], rot: [0, 0, -0.2] },
      { pos: [1.5, -3.5, -0.5], rot: [0.5, 0.5, 0] }
  ];
  const extraMitochondria = [
      { pos: [-2.5, 1.5, 0.8], rot: [0, 0, 1] },
      { pos: [2.0, 3.5, 0.5], rot: [1, 1, 0] }
  ];

  useFrame((state) => {
    if (!selectedId && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  useEffect(() => {
    if (cameraControlsRef.current) {
      if (selectedId) {
        const item = organelles.find(o => o.id === selectedId);
        if (item) {
           if (item.id === 'cell_wall' || item.id === 'cell_membrane') {
              cameraControlsRef.current.setLookAt(0, 0, 18, 0, 0, 0, true);
           } else {
              const [x, y, z] = item.position3d;
              cameraControlsRef.current.setLookAt(x, y, z + 6, x, y, z, true);
           }
        }
      } else {
        cameraControlsRef.current.setLookAt(0, 0, 16, 0, 0, 0, true);
      }
    }
  }, [selectedId]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

      <group ref={groupRef}>
         {organelles.map((item) => (
             <OrganelleMesh 
                key={item.id} 
                item={item} 
                onClick={onSelect} 
                onHover={setHoveredId}
                hoveredId={hoveredId}
                isSelected={selectedId === item.id} 
             />
         ))}

         {extraChloroplasts.map((cfg, i) => {
             const base = organelles.find(o => o.id === 'chloroplast')!;
             return <OrganelleMesh key={`chloro-extra-${i}`} item={base} onClick={onSelect} onHover={setHoveredId} hoveredId={hoveredId} isSelected={selectedId === 'chloroplast'} positionOverride={cfg.pos as any} rotationOverride={cfg.rot as any} isDecorative />;
         })}
         {extraMitochondria.map((cfg, i) => {
             const base = organelles.find(o => o.id === 'mitochondria')!;
             return <OrganelleMesh key={`mito-extra-${i}`} item={base} onClick={onSelect} onHover={setHoveredId} hoveredId={hoveredId} isSelected={selectedId === 'mitochondria'} positionOverride={cfg.pos as any} rotationOverride={cfg.rot as any} isDecorative />;
         })}

         <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
            {[...Array(20)].map((_, i) => (
              <mesh key={i} position={[(Math.random()-0.5)*8, (Math.random()-0.5)*10, (Math.random()-0.5)*3]}>
                <sphereGeometry args={[0.04]} />
                <meshBasicMaterial color="#d9f99d" transparent opacity={0.3} />
              </mesh>
            ))}
         </Float>
      </group>
      <CameraControls ref={cameraControlsRef} minDistance={4} maxDistance={25} />
    </>
  );
};

const CellMap: React.FC<CellMapProps> = (props) => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-3xl overflow-hidden relative shadow-inner ring-1 ring-slate-200 group/map">
      <Canvas camera={{ position: [0, 0, 16], fov: 40 }} dpr={[1, 2]} alpha>
        <CellScene {...props} />
      </Canvas>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 px-6 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-3 transition-opacity duration-300">
           {props.selectedId 
             ? <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> 已聚焦到目标 • 点击背景返回</span> 
             : <span className="flex items-center gap-2">🖱️ 拖拽旋转 • 🖐️ 鼠标悬停查看 • 👆 点击探索</span>
           }
        </div>
      </div>

      {props.selectedId && (
        <div 
          className="absolute top-6 right-6 cursor-pointer pointer-events-auto bg-white hover:bg-slate-100 text-slate-600 p-3 rounded-full border border-slate-200 shadow-lg transition-all z-20"
          onClick={() => props.onSelect({} as any)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
      )}
    </div>
  );
};

export default CellMap;
