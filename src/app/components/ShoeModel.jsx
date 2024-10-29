"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ShoppingCart, RotateCcw, Star } from "lucide-react";

const ShoeViewer3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const isMobile = window.innerWidth < 768;
    camera.position.set(0, 0, isMobile ? 3 : 2.2);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/nike_shoe.glb",
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.8 / maxDim;
        model.scale.multiplyScalar(scale);

        scene.add(model);
        modelRef.current = model;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error occurred loading the model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      const isMobile = window.innerWidth < 768;
      camera.position.z = isMobile ? 2.6 : 2.2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Top shadow overlay */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-stone-600/10 to-transparent"></div>

      <div className="w-full bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* 3D Viewer Side - 65% width */}
            <div className="w-full md:w-[65%] bg-white backdrop-blur-sm">
              <div className="h-full">
                <div
                  ref={containerRef}
                  className="w-full h-[400px] md:h-[80vh] relative"
                ></div>
              </div>
            </div>

            {/* Product Details Side - 35% width */}
            <div className="w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-stone-300 via-white to-stone-300">
              <div className="space-y-8 max-w-xl">
                {/* Product Title */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium tracking-wider text-gray-800">
                    NIKE AIR MAX
                  </h4>
                  <h1 className="text-5xl md:text-6xl font-bold text-black font-nike">
                    AIR MAX PLUS
                  </h1>
                  <p className="text-lg text-gray-800 font-medium">
                    Men's Shoes
                  </p>
                </div>

                {/* Product Description */}
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-900">
                    The Nike Air Max Plus brings back the classic design details
                    you love while adding revolutionary Nike Air technology.
                    Originally designed for high-mileage runs, the wavy plastic
                    fingers and gradient colors deliver late '90s vibes for
                    modern streetwear style.
                  </p>

                  {/* View Details Link - Nike style */}
                  <button className="text-base text-black font-medium underline hover:no-underline">
                    View Product Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom shadow overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-stone-600/10 to-transparent"></div>
    </div>
  );
};

export default ShoeViewer3D;
