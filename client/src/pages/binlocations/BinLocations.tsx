import { Camera } from "@mui/icons-material";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useState } from "react";
import * as THREE from "three";
import Rack from "../../components/3Dmodels/Rack";
import "../../styles/BinLocation.scss";
// import { useAppSelector } from "../../app/hooks";
// import { selectCameraPosition } from "../../app/reducers/BinLocationSlice";
// import { useContextBridge } from "@react-three/drei"
// import { useStore } from "react-redux";
// import { store } from "../../app/store";

const Floor = () => {
  const colorMap = useLoader(THREE.TextureLoader, "Concrete030_4K_Color.png");

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
      scale={[300, 300, 300]}
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
      <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
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

const Scene = () => {
  // const [cameraPosition, setCameraPosition] = useState<[x: number, y: number, z: number]>([0, 40, 150])

  const {
    gl,
    camera,
    controls,
  } = useThree();

  const changeCameraPosition = (newPosition: [x: number, y: number, z: number]) => {
    /*
    camera.position.set(newPosition[0], newPosition[1], newPosition[2] + 10)
    camera.lookAt(new THREE.Vector3(0,0,0));
    */alert(newPosition)
    //camera.lookAt( new THREE.Vector3(newPosition[0], newPosition[1], newPosition[2]))
    //alert(newPosition);
  }

  return (
    <>
     <color attach="background" args={["#c4e5d0"]} />
     <ambientLight />
     <pointLight position={[40, 40, 40]} />
     <OrbitControls maxPolarAngle={Math.PI/2} maxDistance={150}/>
     {/* <OrbitControls maxPolarAngle={Math.PI/2} maxDistance={150}/> */}
     <Suspense fallback={null}>
     {/* <ContextBridge> */}
       <Rack position={[0, 0, 0]} areatag="A01" racktag="R01" changeposition={changeCameraPosition}/>
       <Rack position={[20, 0, 0]} areatag="A01" racktag="R02" changeposition={changeCameraPosition}/>
       <Rack position={[40, 0, 0]} areatag="A01" racktag="R03" changeposition={changeCameraPosition}/>
       {/* <Rack position={[60, 0, 0]} areatag="A01" racktag="R04" changeposition={changeCameraPosition}/>
       <Rack position={[60, 0, 18]} areatag="A01" racktag="R05" changeposition={changeCameraPosition}/>
       <Rack position={[40, 0, 18]} areatag="A01" racktag="R06" changeposition={changeCameraPosition}/>
       <Rack position={[20, 0, 18]} areatag="A01" racktag="R07" changeposition={changeCameraPosition}/>
       <Rack position={[0, 0, -18]} areatag="A01" racktag="R08" changeposition={changeCameraPosition}/>
       <Rack position={[20, 0, -18]} areatag="A01" racktag="R09" changeposition={changeCameraPosition}/>
       <Rack position={[40, 0, -18]} areatag="A01" racktag="R10" changeposition={changeCameraPosition}/>
       <Rack position={[60, 0, -18]} areatag="A01" racktag="R11" changeposition={changeCameraPosition}/>
       <Rack position={[-20, 0, -18]} areatag="A01" racktag="R12" changeposition={changeCameraPosition}/> */}
       <Floor />
       {/* </ContextBridge> */}
     </Suspense>

     {/* <Suspense fallback={<p>Hi</p>}>
 <primitive object={gltf.scene} />
</Suspense> */}
</>
  )


}

const BinLocations = () => {
  // const gltf = useLoader(GLTFLoader, '/binsgrouped.glb')

  // const ContextBridge = useContextBridge()

  // useFrame(({ controls, camera }) => {
  //   controls.target = cameraPosition;
  //   controls.update()
  // })

  return (
    <div className="binlocation">
      <h1 className="binlocationTitle">Warehouse Visualisation</h1>
      <div className="flexcontainer">
      <Canvas
    camera={{ fov: 45, position: [0, 40, 150]}}
     style={{
       border: "solid 1px black",
       height: 600,
       marginTop: 20,
       width: "80%",
     }}
   >
        <Scene />
        </Canvas>
      </div>
    </div>
  );
};

export default BinLocations;
