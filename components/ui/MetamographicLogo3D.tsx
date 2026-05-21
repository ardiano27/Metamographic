"use client";

/**
 * MetamographicLogo3D
 *
 * Interactive 3-D version of the Metamographic mark:
 * three rounded bars (left tall · middle tall · right short)
 * all sharing the same clockwise tilt — a glass/metallic
 * material with purple/cyan emissive glow.
 *
 * Interactions
 * ─────────────
 *   Idle        → gentle float + micro-rock
 *   Mouse-move  → parallax tilt (whole group)
 *   Hover bar   → bar lifts + glow switches to purple
 *   Click       → bars fan out, snap back
 *
 * Dependencies (install once):
 *   npm install three @react-three/fiber @react-three/drei \
 *               @react-spring/three @react-three/postprocessing
 *   npm install -D @types/three
 *
 * Usage in page.tsx
 * ─────────────────
 *   import dynamic from "next/dynamic";
 *   const MetamographicLogo3D = dynamic(
 *     () => import("@/components/MetamographicLogo3D"),
 *     { ssr: false }
 *   );
 */

import {
  useRef,
  useState,
  useCallback,
  Suspense,
  type PointerEvent,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

/* ── Bar geometry constants ─────────────────────────────────────── */

/** Clockwise lean (radians) — matches the ~13° tilt in the logo mark. */
const TILT_Z = -0.23;

/** Width, depth, and border radius shared by all bars. */
const W = 0.52;
const D = 0.30;
const R = 0.12;

type BarDef = {
  /** Base position [x, y, z] */
  pos: [number, number, number];
  /** Bar height */
  h: number;
  /** Direction & magnitude of the "click explode" offset */
  boom: [number, number, number];
};

/** Three bars mirroring the logo mark */
const BAR_DEFS: BarDef[] = [
  { pos: [-1.07,  0.18, 0], h: 1.88, boom: [-0.38,  0.18,  0.10] },
  { pos: [ 0.00,  0.00, 0], h: 1.88, boom: [ 0.00,  0.28,  0.18] },
  { pos: [ 1.00, -0.34, 0], h: 1.22, boom: [ 0.38,  0.18,  0.10] },
];

/* ── Bar component ───────────────────────────────────────────────── */

interface BarProps {
  def: BarDef;
  isExploded: boolean;
}

function Bar({ def, isExploded }: BarProps) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);

  /* Spring: position lerps to the exploded offset then snaps back. */
  const { animPos, scale } = useSpring({
    animPos: isExploded
      ? ([
          def.pos[0] + def.boom[0],
          def.pos[1] + def.boom[1],
          def.pos[2] + def.boom[2],
        ] as [number, number, number])
      : def.pos,
    scale: hovered ? 1.09 : 1.0,
    config: { tension: 210, friction: 22 },
  });

  /* Per-frame: lerp emissive intensity so glow transitions are fluid. */
  useFrame(() => {
    if (!matRef.current) return;
    const targetIntensity = hovered ? 1.2 : 0.18;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      targetIntensity,
      0.14,
    );
  });

  const onOver = useCallback((e: PointerEvent) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation?.();
    setHovered(true);
    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
  }, []);

  const onOut = useCallback(() => {
    setHovered(false);
    if (typeof document !== "undefined") document.body.style.cursor = "auto";
  }, []);

  return (
    <animated.mesh
      position={animPos}
      scale={scale}
      rotation={[0, 0, TILT_Z]}
      onPointerOver={onOver}
      onPointerOut={onOut}
    >
      <RoundedBox args={[W, def.h, D]} radius={R} smoothness={6}>
        <meshPhysicalMaterial
          ref={matRef}
          /* soft ice-blue, matching the brand mark */
          color="#C4E0FF"
          roughness={0.15}
          metalness={0.1}
          /* glass-like transmission */
          transmission={0.9}
          thickness={1.5}
          ior={1.2}
          envMapIntensity={1.5}
          /* emissive glow — purple on hover, cyan at rest */
          emissive={hovered ? "#8B5CF6" : "#22D3EE"}
          emissiveIntensity={0.18}
          /* subtle transparency to show depth */
          transparent
          opacity={1}
        />
      </RoundedBox>
    </animated.mesh>
  );
}

/* ── Scene component (floating + mouse tilt) ─────────────────────── */

interface SceneProps {
  mouseX: number;
  mouseY: number;
}

function Scene({ mouseX, mouseY }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [exploded, setExploded] = useState(false);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    /* Idle float: small sinusoidal y-drift + gentle rock on Z */
    const floatY   = Math.sin(elapsed.current * 0.72) * 0.09;
    const floatRz  = Math.sin(elapsed.current * 0.48) * 0.018;

    const targetRx = mouseY * 0.26 + floatRz;
    const targetRy = mouseX * 0.32;

    /* Smooth lerp toward targets */
    const g = groupRef.current;
    g.rotation.x += (targetRx - g.rotation.x) * 0.055;
    g.rotation.y += (targetRy - g.rotation.y) * 0.055;
    g.position.y  += (floatY  - g.position.y)  * 0.055;
  });

  const handleClick = useCallback(() => {
    setExploded(true);
    setTimeout(() => setExploded(false), 650);
  }, []);

  return (
    <group ref={groupRef} onClick={handleClick}>
      {BAR_DEFS.map((def, i) => (
        <Bar key={i} def={def} isExploded={exploded} />
      ))}
    </group>
  );
}

/* ── Main exported component ─────────────────────────────────────── */

export default function MetamographicLogo3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    });
  }, []);

  const onMouseLeave = useCallback(() => setMouse({ x: 0, y: 0 }), []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      /* Responsive: fills container, but never wider than 400 px.
         On mobile it shrinks gracefully via width: 100%. */
      style={{
        width: "min(400px, 100%)",
        height: "clamp(220px, 30vw, 340px)",
        flexShrink: 0,
        background: "transparent",
        WebkitMaskImage:
          "radial-gradient(ellipse 76% 70% at 50% 50%, #000 64%, rgba(0,0,0,0.72) 82%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 76% 70% at 50% 50%, #000 64%, rgba(0,0,0,0.72) 82%, transparent 100%)",
        /* Subtle glow halo that matches the orb aesthetic */
        filter: "drop-shadow(0 0 40px rgba(139,92,246,0.18))",
      }}
      aria-label="Metamographic 3D logo — click to animate"
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 37 }}
        gl={{ alpha: true, premultipliedAlpha: false, antialias: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
          scene.background = null;
        }}
        style={{ background: "transparent" }}
        /* Cap at 2× DPR to avoid over-rendering on Retina displays */
        dpr={[1, 2]}
      >
        {/* ── Lighting ── */}
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 7, 5]}
          intensity={1.1}
          color="#ffffff"
        />
        {/* Purple key from upper-left */}
        <pointLight position={[-2.5, 3.5, 3]} intensity={2.2} color="#8B5CF6" />
        {/* Cyan fill from lower-right */}
        <pointLight position={[2.5, -2, 3]}   intensity={1.6} color="#22D3EE" />
        {/* Warm rim */}
        <pointLight position={[0, -4, -2]}    intensity={0.6} color="#A78BFA" />

        <Suspense fallback={null}>
          {/* HDR env map for realistic reflections */}
          <Environment preset="city" />

          <Scene mouseX={mouse.x} mouseY={mouse.y} />

          {/* Bloom gives the glass bars their premium glow */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
              mipmapBlur={true}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
