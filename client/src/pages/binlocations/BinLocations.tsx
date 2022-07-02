import React, { Suspense, useState, useRef } from 'react'
import Chart from '../../components/charts/Chart'
import Sidebar from '../../components/SideBar'
import  '../../styles/BinLocation.scss'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { softShadows, OrbitControls, Environment } from '@react-three/drei'
import BinsGrouped from "../../components/3Dmodels/Binsgrouped";


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
    <OrbitControls />
    <Suspense fallback={null}>
      <BinsGrouped />
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