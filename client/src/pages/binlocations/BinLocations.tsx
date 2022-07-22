import React, { Suspense } from "react";
import "../../styles/BinLocation.scss";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide, TextureLoader } from "three";
import Rack from "../../components/3Dmodels/Rack";

const Floor = () => {
  const colorMap = useLoader(TextureLoader, "Concrete030_4K_Color.png");

  return (
    // The mesh is at the origin
    // Since it is inside a group, it is at the origin
    // of that group
    // It's rotated by 90 degrees along the X-axis
    // This is because, by default, planes are rendered
    // in the X-Y plane, where Y is the up direction
    <mesh
      position={[0, -11.5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[150, 150, 150]}
    >
      {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
      <planeBufferGeometry />
      {/*
        The material gives a mesh its texture or look.
        In this case, it is just a uniform green
      */}
      <meshBasicMaterial map={colorMap} side={DoubleSide} />
      {/*color="#7cb1d0*/}
    </mesh>
  );
};

// const Box = (props: JSX.IntrinsicElements["mesh"]) => {
//   const mesh = useRef<THREE.Mesh>(null!);
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);

//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// };

const BinLocations = () => {
  // const gltf = useLoader(GLTFLoader, '/binsgrouped.glb')
  return (
    <div className="binlocation">
      <h1 className="binlocationTitle">Warehouse Visualisation</h1>
      <div className="flexcontainer">
        <Canvas
          style={{
            border: "solid 1px black",
            height: 600,
            marginTop: 20,
            width: "80%",
          }}
        >
          <color attach="background" args={["#c4e5d0"]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Rack position={[0, 0, 0]} areatag="A01" racktag="R01" />
            <Rack position={[20, 0, 0]} areatag="A01" racktag="R02" />
            <Rack position={[40, 0, 0]} areatag="A01" racktag="R03" />
            <Rack position={[60, 0, 0]} areatag="A01" racktag="R04" />
            <Rack position={[60, 0, 18]} areatag="A01" racktag="R05" />
            <Rack position={[40, 0, 18]} areatag="A01" racktag="R06" />
            <Rack position={[20, 0, 18]} areatag="A01" racktag="R07" />
            <Rack position={[0, 0, -18]} areatag="A01" racktag="R08" />
            <Rack position={[20, 0, -18]} areatag="A01" racktag="R09" />
            <Rack position={[40, 0, -18]} areatag="A01" racktag="R10" />
            <Rack position={[60, 0, -18]} areatag="A01" racktag="R11" />
            <Rack position={[-20, 0, -18]} areatag="A01" racktag="R12" />
            <Floor />
          </Suspense>

          {/* <Suspense fallback={<p>Hi</p>}>
      <primitive object={gltf.scene} />
    </Suspense> */}
        </Canvas>
      </div>
    </div>
  );
};

export default BinLocations;
