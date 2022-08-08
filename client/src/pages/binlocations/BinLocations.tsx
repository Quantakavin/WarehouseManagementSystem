import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import TwoColRack from "../../Components/3Dmodels/2ColRack";
import ThreeColRack from "../../Components/3Dmodels/3ColRack";
import FourColRack from "../../Components/3Dmodels/4ColRack";
import "../../Styles/BinLocation.scss";
import SearchBar from "../../Components/search/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "react-query";
import { GetBinsByBrand, GetBrandNames } from "../../api/BinLocationDB";

const Floor = () => {
  const colorMap = useLoader(THREE.TextureLoader, "Concrete030_4K_Color.png");

  return (
    <mesh
      position={[0, -11.5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[300, 300, 300]}
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
        maxDistance={150}
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

  const BrandNamesQuery = useQuery(
    [`brandnames`, debouncedValue],
    () => GetBrandNames(debouncedValue),
    {
      onSuccess: (data) => {
        const brandarray = data.data.map((record) => {
          return record.Brand;
        });
        setSearchOptions(brandarray);
      },
    }
  );

  const BinsByBrandQuery = useQuery(
    [`binsbybrand`, searchName],
    () => GetBinsByBrand(searchName),
    {
      onSuccess: (data) => {
        const returnbins = data.data.map((bin) => {
          return bin.BinTag;
        });
        setSelectedBinTags(returnbins);
      },
    }
  );

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
        {selectedBinTags != null ? selectedBinTags.join(", ") : null}
        <br></br>
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
