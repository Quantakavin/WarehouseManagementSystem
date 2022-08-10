import React, { Suspense, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import TwoColRack from "../../components/3Dmodels/2ColRack";
import ThreeColRack from "../../components/3Dmodels/3ColRack";
import FourColRack from "../../components/3Dmodels/4ColRack";
import SearchBar from "../../components/search/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import "../../styles/BinLocation.scss";

const Floor = () => {
  const colorMap = useLoader(THREE.TextureLoader, "Concrete030_4K_Color.png");

  return (
    <mesh
      position={[-100, -11.5, 200]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[500, 600, 600]}
    >
      <planeBufferGeometry />
      <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

interface SceneProps {
  selectedbintags: string[];
}

const Scene = ({ selectedbintags }: SceneProps) => {
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
        maxDistance={500}
        ref={controls}
      />
      <Suspense fallback={null}>
        {/* Section A01 */}
        <FourColRack
          position={[0, 0, 0]}
          areatag="A01"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 0]}
          areatag="A01"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <ThreeColRack
          position={[45, 0, 0]}
          areatag="A01"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A02 */}
        <FourColRack
          position={[0, 0, 20]}
          areatag="A02"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 20]}
          areatag="A02"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <ThreeColRack
          position={[45, 0, 20]}
          areatag="A02"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A03 */}
        <FourColRack
          position={[0, 0, 40]}
          areatag="A03"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 40]}
          areatag="A03"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 40]}
          areatag="A03"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 40]}
          areatag="A03"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <ThreeColRack
          position={[95, 0, 40]}
          areatag="A03"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A04 */}
        <FourColRack
          position={[0, 0, 60]}
          areatag="A04"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 60]}
          areatag="A04"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[50, 0, 60]}
          areatag="A04"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 60]}
          areatag="A04"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <ThreeColRack
          position={[95, 0, 60]}
          areatag="A04"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A05 */}
        <FourColRack
          position={[0, 0, 80]}
          areatag="A05"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 80]}
          areatag="A05"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 80]}
          areatag="A05"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 80]}
          areatag="A05"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 80]}
          areatag="A05"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A06 */}
        <FourColRack
          position={[0, 0, 100]}
          areatag="A06"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 100]}
          areatag="A06"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 100]}
          areatag="A06"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 100]}
          areatag="A06"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 100]}
          areatag="A06"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 100]}
          areatag="A06"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A07 */}
        <FourColRack
          position={[0, 0, 120]}
          areatag="A07"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 120]}
          areatag="A07"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 120]}
          areatag="A07"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 120]}
          areatag="A07"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 120]}
          areatag="A07"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 120]}
          areatag="A07"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A08 */}
        <FourColRack
          position={[0, 0, 140]}
          areatag="A08"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 140]}
          areatag="A08"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 140]}
          areatag="A08"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 140]}
          areatag="A08"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 140]}
          areatag="A08"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 140]}
          areatag="A08"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A09 */}
        <FourColRack
          position={[0, 0, 160]}
          areatag="A09"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 160]}
          areatag="A09"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 160]}
          areatag="A09"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 160]}
          areatag="A09"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 160]}
          areatag="A09"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 160]}
          areatag="A09"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A10 */}
        <FourColRack
          position={[0, 0, 180]}
          areatag="A10"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 180]}
          areatag="A10"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[45, 0, 180]}
          areatag="A10"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        <FourColRack
          position={[70, 0, 180]}
          areatag="A10"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[95, 0, 180]}
          areatag="A10"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[115, 0, 180]}
          areatag="A10"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A11 */}
        <FourColRack
          position={[0, 0, 200]}
          areatag="A11"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 200]}
          areatag="A11"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[45, 0, 200]}
          areatag="A11"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        <FourColRack
          position={[70, 0, 200]}
          areatag="A11"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[95, 0, 200]}
          areatag="A11"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[115, 0, 200]}
          areatag="A11"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A12 */}
        <FourColRack
          position={[0, 0, 220]}
          areatag="A12"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 220]}
          areatag="A12"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 220]}
          areatag="A12"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 220]}
          areatag="A12"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 220]}
          areatag="A12"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 220]}
          areatag="A12"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A13 */}
        <FourColRack
          position={[0, 0, 240]}
          areatag="A13"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 240]}
          areatag="A13"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 240]}
          areatag="A13"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 240]}
          areatag="A13"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 240]}
          areatag="A13"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 240]}
          areatag="A13"
          racktag="R06"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A14 */}
        <FourColRack
          position={[0, 0, 260]}
          areatag="A14"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 260]}
          areatag="A14"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 260]}
          areatag="A14"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 260]}
          areatag="A14"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A15 */}
        <FourColRack
          position={[0, 0, 280]}
          areatag="A15"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 280]}
          areatag="A15"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 280]}
          areatag="A15"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 280]}
          areatag="A15"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A16 */}
        <FourColRack
          position={[0, 0, 300]}
          areatag="A16"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[25, 0, 300]}
          areatag="A16"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[50, 0, 300]}
          areatag="A16"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[75, 0, 300]}
          areatag="A16"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 300]}
          areatag="A16"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        <Floor />
      </Suspense>
    </>
  );
};

const BinLocations = () => {
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>(null);
  const [selectedBinTags, setSelectedBinTags] = useState<string[]>(null);
  const debouncedValue = useDebounce<string>(inputName, 500);

  // const BrandNamesQuery = useQuery(
  //   [`brandnames`, debouncedValue],
  //   () => GetBrandNames(debouncedValue),
  //   {
  //     onSuccess: (data) => {
  //       const brandarray = data.data.map((record) => {
  //         return record.Brand;
  //       });
  //       setSearchOptions(brandarray);
  //     },
  //   }
  // );

  // const BinsByBrandQuery = useQuery(
  //   [`binsbybrand`, searchName],
  //   () => GetBinsByBrand(searchName),
  //   {
  //     onSuccess: (data) => {
  //       const returnbins = data.data.map((bin) => {
  //         return bin.BinTag;
  //       });
  //       setSelectedBinTags(returnbins);
  //     },
  //   }
  // );

  const handleInputChange = (inputstring: string) => {
    setSelectedBinTags(null);
    setInputName(inputstring);
  };

  const handleSearch = (stringtosearch: string) => {
    if (inputName !== "") {
      setSearchName(stringtosearch);
    }
  };

  return (
    <div className="binlocation">
      <h1 className="binlocationTitle">Warehouse Visualisation</h1>
      <div className="flexcontainer">
        <SearchBar
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          searchoptions={searchOptions}
        />
        <br />
        <h4>Empty Bin List</h4>
      </div>

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
          <Scene selectedbintags={selectedBinTags} />
        </Canvas>
      </div>
    </div>
  );
};

export default BinLocations;
