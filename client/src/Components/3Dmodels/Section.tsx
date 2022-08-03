import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import Rack from "../../components/3Dmodels/Rack";
import "../../styles/BinLocation.scss";

const Scene = () => {
  // const [cameraPosition, setCameraPosition] = useState<[x: number, y: number, z: number]>([0, 40, 150])

  const { gl, camera } = useThree();

  const controls = useRef<any>();
  useFrame(() => controls.current.update());

  const changeCameraPosition = (
    newPosition: [x: number, y: number, z: number]
  ) => {
    camera.position.set(
      newPosition[0],
      newPosition[1] + 20,
      newPosition[2] + 30
    );
    //camera.rotation.y = 180;
    //camera.lookAt(new THREE.Vector3(newPosition[0],newPosition[1],newPosition[2]));
    controls.current.target = new THREE.Vector3(
      newPosition[0],
      newPosition[1],
      newPosition[2]
    );
    controls.current.update();

  };

  return (
    <>
      <color attach="background" args={["#c4e5d0"]} />
      <ambientLight />
      <pointLight position={[40, 40, 40]} />
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        maxDistance={150}
        ref={controls}
      />
      <Suspense fallback={null}>
        <Rack
          position={[0, 0, 0]}
          areatag="A01"
          racktag="R01"
          changeposition={changeCameraPosition}
        />
        <Rack
          position={[20, 0, 0]}
          areatag="A01"
          racktag="R02"
          changeposition={changeCameraPosition}
        />
        <Rack
          position={[40, 0, 0]}
          areatag="A01"
          racktag="R03"
          changeposition={changeCameraPosition}
        />
      </Suspense>
    </>
  );
};

const BinLocations = () => {
  return (
    <div className="binlocation">
      <h1 className="binlocationTitle">Warehouse Visualisation</h1>
      <div className="flexcontainer">
        <Canvas
          camera={{ fov: 45, position: [0, 40, 150] }}
          style={{
            border: "solid 1px black",
            height: 1000,
            marginTop: 20,
            width: "95%",
          }}
        >
          <Scene />
        </Canvas>
      </div>
    </div>
  );
};

export default BinLocations;
