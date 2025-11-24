'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { ArrowDown } from 'lucide-react';

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
    const uProgress = uniform(0);

    const strength = 0.01;

    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dots = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap;

    // Fix: Clamp uProgress or depth comparison to avoid negative artifacts or glitches
    // during the animation loop wrapping
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // Use the original texture colors
    const finalColor = tMap;

    // Force the dots to be 100% Blue
    // Using clamp to ensure no overflow
    // Fix: Mask dots by depth to prevent background flashing when uProgress is near 0
    const hasDepth = smoothstep(0.0, 0.01, tDepthMap.r);
    const dotIntensity = dots.mul(flow).mul(hasDepth).clamp(0.0, 1.0);
    const dotColor = vec3(0.0, 0.0, 10.0); // Pure Blue, High Intensity for Bloom
    
    // Create the final color using MIX
    // This guarantees we transition to pure blue where the dots are
    const colorWithDots = mix(finalColor, dotColor, dotIntensity);

    // Calculate Alpha
    // 1. Object Opacity: Based on Depth Map
    const objectAlpha = smoothstep(0.05, 0.1, tDepthMap.r);
    
    // 2. Dot Opacity: Where dots are, we want opacity too
    // Fix: Ensure dotIntensity is clamped and valid to prevent black flashes
    const dotAlpha = smoothstep(0.01, 0.1, dotIntensity);

    // 3. Final Alpha: Union of Object and Dots
    const finalAlpha = max(objectAlpha, dotAlpha);

    // If we are in a "Dot Only" area (Background), we need to ensure the color is Blue
    // The 'colorWithDots' might be Black + Blue = Blue, which is correct.
    // But 'finalColor' (tMap) is Black in the background.
    // So colorWithDots = Black + Blue = Blue. Correct.

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: colorWithDots,
      opacityNode: finalAlpha,
      transparent: true,
      opacity: 1, 
      depthWrite: false, // Prevent z-fighting or depth sorting issues during transparency
      blending: THREE.NormalBlending, // Enforce standard blending to prevent additive overflow
    });

    return {
      material,
      uniforms: {
        uPointer,
        uProgress,
      },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
  });

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

const HeroFuturistic = () => {
  const titleWords = 'The Antifragile Way'.split(' ');
  const subtitle = 'Generative Engine Optimization to grow systems that scale with you.';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    // Client-side only: generate random delays for glitch effect
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-svh grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden bg-white">
      {/* Text Column - Left (Top on Mobile) */}
      <div className="flex flex-col justify-center px-6 md:px-20 relative z-10 h-[40vh] md:h-full">
        <div className="uppercase">
          <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-left max-w-2xl tracking-tighter leading-tight">
            <div className="flex flex-wrap gap-x-3 lg:gap-x-4 text-black">
              {titleWords.map((word, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-700 ${index < visibleWords ? 'opacity-100' : 'opacity-0'} ${word.toUpperCase().includes('ANTIFRAGILE') ? 'text-[#1D40B0]' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 0.13 + (delays[index] || 0)}s` 
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-6 overflow-hidden text-black font-semibold tracking-tight">
            <div
              className={`transition-opacity duration-700 ${subtitleVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                transitionDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s` 
              }}
            >
              {subtitle}
            </div>
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
