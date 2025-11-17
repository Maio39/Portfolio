import { Float, useGLTF, Environment } from '@react-three/drei';

const Target = (props) => {
  const base = import.meta.env.BASE_URL;
  const { nodes } = useGLTF(`${base}models/windowsLogo.glb`);

  return (
    <>
      {/* Riflessi reali */}
      <Environment preset="city" />

      <Float floatIntensity={1}>
        <group
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          rotation={[3, 1.3, 1]}
          {...props}
          dispose={null}
        >
          <mesh geometry={nodes.Windows_8_0.geometry}>
            <meshPhysicalMaterial
              color="#00A4EF"
              roughness={0.1}        // superficie liscia
              metalness={0.2}        // leggero effetto metal
              clearcoat={1}          // effetto vetro
              clearcoatRoughness={0} // clearcoat lucido
              envMapIntensity={1.5}  // forza del riflesso
              transmission={0.05}    // leggero effetto "vetro"
              thickness={0.1}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}models/windowsLogo.glb`);

export default Target;
