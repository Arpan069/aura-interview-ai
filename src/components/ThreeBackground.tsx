
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

type ThreeBackgroundProps = {
  isDarkMode?: boolean;
};

const ThreeBackground = ({ isDarkMode = false }: ThreeBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const particlesMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Particles
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const speeds = new Float32Array(particlesCount);
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometryRef.current = particlesGeometry;
    
    // Colors based on theme
    let baseColor1 = isDarkMode 
      ? new THREE.Color(0x2D3277) // Dark mode primary
      : new THREE.Color(0x2D3277); // Light mode primary
      
    let baseColor2 = isDarkMode 
      ? new THREE.Color(0xFFE600) // Dark mode accent
      : new THREE.Color(0xFFE600); // Light mode accent
      
    let baseColor3 = isDarkMode 
      ? new THREE.Color(0x1A1D3F) // Dark mode deeper shade
      : new THREE.Color(0x4D5299); // Light mode lighter shade
    
    // Create particles with varied sizes and speeds
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Position - create a sphere distribution
      const radius = Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Mix between three colors for more variety
      const colorChoice = Math.random();
      let mixedColor;
      
      if (colorChoice < 0.33) {
        mixedColor = new THREE.Color().lerpColors(
          baseColor1, baseColor2, Math.random()
        );
      } else if (colorChoice < 0.66) {
        mixedColor = new THREE.Color().lerpColors(
          baseColor2, baseColor3, Math.random()
        );
      } else {
        mixedColor = new THREE.Color().lerpColors(
          baseColor3, baseColor1, Math.random()
        );
      }
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      // Random sizes
      sizes[i] = Math.random() * 3;
      
      // Random movement speeds
      speeds[i] = (Math.random() - 0.5) * 0.2;
    }
    
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );
    particlesGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );
    particlesGeometry.setAttribute(
      'speed',
      new THREE.BufferAttribute(speeds, 1)
    );
    
    // Particle Material with custom shader
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.7,
      sizeAttenuation: true,
      transparent: true,
      alphaTest: 0.01,
      opacity: 0.8,
      vertexColors: true,
    });
    particlesMaterialRef.current = particlesMaterial;
    
    // Create the particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Add a few larger glowing orbs
    const createGlowingOrb = (position: [number, number, number], color: THREE.Color, size: number) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true,
        opacity: 0.4 
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...position);
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(size * 1.2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide 
      });
      
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glowMesh);
      
      return sphere;
    };
    
    // Add a few orbs
    const orb1 = createGlowingOrb([-30, 15, -20], baseColor1, 2);
    const orb2 = createGlowingOrb([25, -10, 10], baseColor2, 3);
    const orb3 = createGlowingOrb([0, 30, -15], baseColor3, 2.5);
    
    scene.add(orb1, orb2, orb3);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      timeRef.current += 0.001;
      
      // Gently rotate the entire particle system
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0003;
        particlesRef.current.rotation.x += 0.0001;
      }
      
      // Update each particle position based on its speed
      if (particlesGeometryRef.current) {
        const positions = particlesGeometryRef.current.attributes.position.array as Float32Array;
        const speeds = particlesGeometryRef.current.attributes.speed.array as Float32Array;
        
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          
          // Add some subtle wave motion
          const x = positions[i3];
          const y = positions[i3 + 1];
          const z = positions[i3 + 2];
          
          // Apply noise-based movement
          positions[i3] = x + Math.sin(timeRef.current + x * 0.05) * 0.05;
          positions[i3 + 1] = y + Math.cos(timeRef.current + y * 0.05) * 0.05;
          positions[i3 + 2] = z + Math.sin(timeRef.current + z * 0.05) * 0.05;
        }
        
        particlesGeometryRef.current.attributes.position.needsUpdate = true;
      }
      
      // Animate the orbs
      orb1.position.y = 15 + Math.sin(timeRef.current * 0.8) * 5;
      orb2.position.x = 25 + Math.cos(timeRef.current * 0.6) * 7;
      orb3.position.z = -15 + Math.sin(timeRef.current * 0.7) * 6;
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up resources
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      if (particlesGeometryRef.current) {
        particlesGeometryRef.current.dispose();
      }
      
      if (particlesMaterialRef.current) {
        particlesMaterialRef.current.dispose();
      }
    };
  }, [isDarkMode]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] opacity-70"
    />
  );
};

export default ThreeBackground;
