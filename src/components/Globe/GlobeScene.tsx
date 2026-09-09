"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import ThreeGlobe from "three-globe";

const points = [
  { lat: 28.6139, lng: 77.209, size: 0.35 },
  { lat: 25.2048, lng: 55.2708, size: 0.3 },
  { lat: 51.5072, lng: -0.1276, size: 0.3 },
  { lat: 40.7128, lng: -74.006, size: 0.3 },
];

const arcs = [
  {
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 51.5072,
    endLng: -0.1276,
  },
  {
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 40.7128,
    endLng: -74.006,
  },
  {
    startLat: 25.2048,
    startLng: 55.2708,
    endLat: 28.6139,
    endLng: 77.209,
  },
];

function RotatingGlobe() {
  const groupRef = useRef<Group>(null);
  const [globeObj, setGlobeObj] = useState<ThreeGlobe | null>(null);

  useEffect(() => {
    try {
      const globe = new ThreeGlobe()
        .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-day.jpg")
        .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
        .atmosphereColor("#3d8cff")
        .atmosphereAltitude(0.1)
        .showAtmosphere(true)
        .pointsData(points)
        .pointLat("lat")
        .pointLng("lng")
        .pointAltitude(0.01)
        .pointRadius("size")
        .pointColor(() => "#0b3b82")
        .pointsMerge(true)
        .arcsData(arcs)
        .arcStartLat("startLat")
        .arcStartLng("startLng")
        .arcEndLat("endLat")
        .arcEndLng("endLng")
        .arcColor(() => "#3d8cff")
        .arcAltitude(0.08)
        .arcStroke(0.6)
        .arcDashLength(0.4)
        .arcDashGap(1)
        .arcDashAnimateTime(2000);

      setGlobeObj(globe);
    } catch (e) {
      console.warn("Failed to instantiate ThreeGlobe:", e);
    }
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 1.8, 0]}>
      {globeObj && <primitive object={globeObj} />}
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 385],
        fov: 35,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={3.2} />

      <directionalLight
        position={[10, 10, 10]}
        intensity={2.8}
      />

      <directionalLight
        position={[-10, -5, -10]}
        intensity={1.0}
      />

      <RotatingGlobe />
    </Canvas>
  );
}
