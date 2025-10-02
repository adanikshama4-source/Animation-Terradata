// src/components/EarthGlobe.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getTextureUrl } from '../utils/textureUrls';

export default function EarthGlobe({ currentYear }) {
  const mountRef = useRef(null);
  const globeRef = useRef(null);

  // Update texture when year changes
  useEffect(() => {
    if (!globeRef.current) return;
    const url = getTextureUrl(currentYear);
    if (!url) return;

    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        globeRef.current.material.map = texture;
        globeRef.current.material.needsUpdate = true;
      },
      undefined,
      (err) => console.error("Texture load error:", err)
    );
  }, [currentYear]);

  // Initialize Three.js scene ONCE
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial();
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Optional: Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x3399ff,
      transparent: true,
      opacity: 0.15
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Controls
    let isDragging = false;
    let prevX = 0;
    let autoRotate = true;

    const onMouseDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      autoRotate = false;
    };
    const onMouseMove = (e) => {
      if (isDragging) {
        globe.rotation.y += (e.clientX - prevX) * 0.01;
        prevX = e.clientX;
      }
    };
    const onMouseUp = () => isDragging = false;
    const onWheel = (e) => {
      camera.position.z += e.deltaY * 0.002;
      camera.position.z = Math.max(1.5, Math.min(5, camera.position.z));
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isDragging && autoRotate) {
        globe.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('wheel', onWheel);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}