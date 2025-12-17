import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Galaxy = (props) => {
  const ref = useRef();
  // Generate random points in a sphere
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000), { radius: 1.5 }),
    []
  );

  useFrame((state, delta) => {
    // Auto rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const GalaxyScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Galaxy />
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
