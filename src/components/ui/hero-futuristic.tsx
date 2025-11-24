'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { ArrowDown } from 'lucide-react';
import { ShinyButton } from "@/components/ui/shiny-button";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
  max
} from 'three/tsl';

// Using the provided images as they form a specific texture+depth pair required for the effect.
// Replacing them with random Unsplash images would break the depth displacement effect.
const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const { viewport } = useThree();

  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show image after textures load
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));

    const strength = 0.01;

    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    // Use the original texture colors
    const finalColor = tMap;

    // Use depth map to remove background
    const depthValue = tDepthMap.r;
    const finalAlpha = smoothstep(0.08, 0.15, depthValue);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: finalColor,
      opacityNode: finalAlpha,
      transparent: true,
      opacity: 1, 
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    return {
      material,
      uniforms: {
        uPointer,
      },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  // Responsive scale factor logic
  // On mobile (small width), we scale down to fit. 
  // Base scale 0.8 is good for desktop.
  // viewport.width is in 3D units. On mobile, it might be small.
  // Let's adjust scale based on width.
  const isMobile = viewport.width < 5; // Approximate threshold
  const responsiveScale = isMobile ? 0.5 : 0.8;

  return (
    <mesh 
      ref={meshRef} 
      scale={[w * responsiveScale, h * responsiveScale, 1]} 
      material={material}
    >
      <planeGeometry />
    </mesh>
  );
};

// ChatGPT/OpenAI Logo SVG Component - Stylized knot/flower pattern
const AILogo = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mx-1.5 align-middle"
    style={{ verticalAlign: 'middle' }}
  >
    {/* OpenAI/ChatGPT logo - stylized multi-layered knot pattern */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M8 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-4 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
    />
  </svg>
);

// Rotating AI Name Carousel Component
const RotatingAIName = () => {
  const aiNames = [
    { display: 'ChatGPT', value: 'ChatGPT' },
    { display: 'Claude', value: 'Claude' },
    { display: 'Perplexity', value: 'Perplexity' },
    { display: 'Gemini', value: 'Gemini' }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % aiNames.length);
        setIsTransitioning(false);
      }, 300); // Transition duration
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const nextIndex = (currentIndex + 1) % aiNames.length;

  return (
    <span 
      className="block min-w-[140px] text-left overflow-hidden relative"
      style={{ 
        height: '1.2em', 
        lineHeight: '1.2em'
      }}
    >
      {/* Current item sliding up and out */}
      <span
        key={`current-${currentIndex}`}
        className="absolute top-0 left-0 right-0"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          transform: isTransitioning ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 300ms ease-in-out',
          willChange: 'transform',
        }}
      >
        {aiNames[currentIndex].display}
      </span>
      {/* Next item sliding up from below */}
      <span
        key={`next-${nextIndex}`}
        className="absolute top-0 left-0 right-0"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          transform: isTransitioning ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms ease-in-out',
          willChange: 'transform',
        }}
      >
        {aiNames[nextIndex].display}
      </span>
    </span>
  );
};

const HeroFuturistic = () => {
  const subtitle = 'Generative Engine Optimization to grow systems that scale with you.';
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    // Client-side only: generate random delay for subtitle
    setSubtitleDelay(Math.random() * 0.1);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (titleVisible) {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [titleVisible]);

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Text Column - Left (Top on Mobile) */}
      <div className="flex flex-col justify-center px-6 md:px-20 relative z-10 h-full">
        <div className="text-left max-w-2xl">
          <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-black tracking-tight leading-tight">
            <div
              className={`transition-opacity duration-700 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ fontFamily: 'sans-serif' }}
            >
              <div 
                className="text-xs md:text-sm xl:text-base 2xl:text-lg font-normal mb-4 md:mb-6 uppercase tracking-[0.2em]"
                style={{ 
                  color: '#1d40b0',
                  letterSpacing: '0.2em'
                }}
              >
                The Antifragile Way
              </div>
              <div className="font-normal">Get seen on</div>
              <div>
                <RotatingAIName />
              </div>
            </div>
          </div>
          <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-6 overflow-hidden text-black font-normal tracking-tight">
            <div
              className={`transition-opacity duration-700 ${subtitleVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                transitionDelay: `${0.2 + subtitleDelay}s` 
              }}
            >
              {subtitle}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-8 md:mt-10">
            <ShinyButton className="!px-5 !py-2.5 md:!px-6 md:!py-3 !text-sm md:!text-base">
              Start free trial
            </ShinyButton>
            <button className="text-black px-5 py-2.5 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base hover:bg-gray-100 transition-colors duration-200">
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Column - Right (Bottom on Mobile) */}
      <div className="relative h-[60vh] md:h-full w-full flex items-center justify-center">
        <Canvas
          flat
          className="w-full h-full"
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer({ ...props, alpha: true } as any);
            await renderer.init();
            renderer.setClearColor(0x000000, 0);
            return renderer;
          }}
        >
          <Scene />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroFuturistic;
