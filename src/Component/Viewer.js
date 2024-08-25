
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Viewer({ lasData }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (lasData && mountRef.current) {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      
      const scene = new THREE.Scene();

      
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

     
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);

      
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(lasData.points.length * 3);
      for (let i = 0; i < lasData.points.length; i++) {
        positions[i * 3] = lasData.points[i].x;
        positions[i * 3 + 1] = lasData.points[i].y;
        positions[i * 3 + 2] = lasData.points[i].z;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({ size: 0.05 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

     
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        mountRef.current.removeChild(renderer.domElement);
      };
    }
  }, [lasData]);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
}

export default Viewer;
