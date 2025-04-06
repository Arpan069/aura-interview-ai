
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

interface ThreeBackgroundProps {
  isDarkMode: boolean;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Set background color based on theme
    scene.background = new THREE.Color(isDarkMode ? "#0f0f0f" : "#f9f9ff");
    
    // Camera setup with better perspective for mercor-style
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    
    // Renderer setup with anti-aliasing for smoother edges
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear any existing canvases
    if (containerRef.current.querySelector("canvas")) {
      containerRef.current.querySelector("canvas")?.remove();
    }
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create more particles for a denser effect
    const particleCount = window.innerWidth < 768 ? 80 : 150;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    
    // Primary color based on theme
    const primaryColor = new THREE.Color(isDarkMode ? "#4f46e5" : "#4f46e5");
    const accentColor = new THREE.Color(isDarkMode ? "#ffffff" : "#000000");
    
    // Populate the particles with varied positions and colors
    for (let i = 0; i < particleCount; i++) {
      // Position with wider spread
      positions[i * 3] = (Math.random() - 0.5) * 40; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
      
      // Size variation for visual interest
      sizes[i] = Math.random() * 0.8 + 0.1;
      
      // Color gradient from primary to accent with more primary
      if (Math.random() > 0.7) {
        colors[i * 3] = accentColor.r;
        colors[i * 3 + 1] = accentColor.g;
        colors[i * 3 + 2] = accentColor.b;
      } else {
        colors[i * 3] = primaryColor.r;
        colors[i * 3 + 1] = primaryColor.g;
        colors[i * 3 + 2] = primaryColor.b;
      }
    }
    
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    
    // Using a custom vertex shader for more sophisticated particle effects
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: new THREE.TextureLoader().load(
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nO3bMQEAIAgEQUGtf2ZqAB8RduZuswQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC5ug7g6a5buOVPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHzY3ibHOsu5/vQAAAABJRU5ErkJggg=='
        )}
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Animate vertical movement
          float yOffset = sin(time * 0.5 + position.x) * 0.5;
          mvPosition.y += yOffset;
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Simple rotation animation
    const animate = (time: number) => {
      const t = time * 0.001; // Convert to seconds
      
      // Update shader time uniform
      particleMaterial.uniforms.time.value = t;
      
      // Complex rotation pattern
      particleSystem.rotation.x = Math.sin(t * 0.1) * 0.2;
      particleSystem.rotation.y = Math.sin(t * 0.2) * 0.1;
      
      // Gentle camera movement for parallax effect
      camera.position.x = Math.sin(t * 0.05) * 0.5;
      camera.position.y = Math.sin(t * 0.07) * 0.3;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode, theme]); // Re-create when theme changes

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-40" 
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ThreeBackground;
