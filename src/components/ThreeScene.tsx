import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function AnimatedSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
      <meshStandardMaterial color="#e67e22" transparent opacity={0.7} />
    </Sphere>
  )
}

function AnimatedBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
      <meshStandardMaterial color="#4c3a8a" transparent opacity={0.8} />
    </Box>
  )
}

function AnimatedTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <Torus ref={meshRef} position={position} args={[0.3, 0.1, 16, 100]}>
      <meshStandardMaterial color="#7264b7" transparent opacity={0.6} />
    </Torus>
  )
}

export function ThreeScene() {
  return (
    <motion.div 
      className="w-full h-64 relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#e67e22" intensity={0.3} />
        
        <AnimatedSphere position={[-1.5, 0, 0]} />
        <AnimatedBox position={[0, 0, 0]} />
        <AnimatedTorus position={[1.5, 0, 0]} />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1}
          enablePan={false}
        />
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </motion.div>
  )
}