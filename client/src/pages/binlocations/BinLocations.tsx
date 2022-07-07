import React, { Suspense, useState, useRef } from 'react'
import Chart from '../../components/charts/Chart'
import  '../../styles/BinLocation.scss'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { softShadows, OrbitControls, Environment } from '@react-three/drei'
import Rackrow from "../../components/3Dmodels/Rackrow";
import Bin from "../../components/3Dmodels/Bin";
import { DoubleSide } from "three";

function Floor() {
  return (
    // The mesh is at the origin
    // Since it is inside a group, it is at the origin
    // of that group
    // It's rotated by 90 degrees along the X-axis
    // This is because, by default, planes are rendered
    // in the X-Y plane, where Y is the up direction
    <mesh position={[0, -11.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[150, 150, 150]}>
      {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
      <planeBufferGeometry />
      {/*
        The material gives a mesh its texture or look.
        In this case, it is just a uniform green
      */}
      <meshBasicMaterial color="gray" side={DoubleSide} />
    </mesh>
  );
}

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function BinLocations() {
  // const gltf = useLoader(GLTFLoader, '/binsgrouped.glb')
  return (
    <>
    <div className='binlocation'> 
    <h1 className='binlocationTitle'>Warehouse Visualisation</h1>
    <div className="flexcontainer">
    <Canvas style={{border: "solid 1px black", height: 600, marginTop: 20, width: "80%"}}>
    <color attach="background" args={["#c4e5d0"]} />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls/>
    <Suspense fallback={null}>
      <Rackrow position={[0,0,0]} id="A01" />
      <Rackrow position={[20,0,0]} id="A02" />
      <Rackrow position={[40,0,0]} id="A03" />
      <Floor />
    </Suspense>

    {/* <Suspense fallback={<p>Hi</p>}>
      <primitive object={gltf.scene} />
    </Suspense> */}
    
    </Canvas>
    </div>
    </div>

    
    </>
   
  )
}

export default BinLocations