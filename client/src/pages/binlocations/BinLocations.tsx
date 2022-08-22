import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import TwoColRack from "../../components/3Dmodels/2ColRack";
import ThreeColRack from "../../components/3Dmodels/3ColRack";
import FourColRack from "../../components/3Dmodels/4ColRack";
import Office from "../../components/3Dmodels/Office";
import Pallets from "../../components/3Dmodels/Palletsandboxes";
import SearchBar from "../../components/search/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import "../../styles/BinLocation.scss";
import { useQuery } from "react-query";
import { GetBinsByBrand, GetBrandNames } from "../../api/BinLocationDB";
import { Box, Link, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { ChangeTab } from "../../app/reducers/SidebarSlice";

const Floor = () => {
  const colorMap = useLoader(THREE.TextureLoader, "/Concrete030_4K_Color.png");

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
      newPosition[2] + 15
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

        <Office position={[-30, -10, -80]} />

        <Pallets position={[-40, -12, -80]} />
        <Pallets position={[-80, -12, -80]} />
        <Pallets position={[-40, -12, -140]} />
        <Pallets position={[-80, -12, -140]} />


        {/* Section A01 */}
        <FourColRack
          position={[120, 0, -10]}
          areatag="A01"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[95, 0, -10]}
          areatag="A01"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <ThreeColRack
          position={[70, 0, -10]}
          areatag="A01"
          racktag="R03"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />

        {/* Section A02 */}
        <FourColRack
          position={[120, 0, 10]}
          areatag="A02"
          racktag="R01"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[95, 0, 10]}
          areatag="A02"
          racktag="R02"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <ThreeColRack
          position={[70, 0, 10]}
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
          position={[75, 0, 180]}
          areatag="A10"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 180]}
          areatag="A10"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 180]}
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
          position={[75, 0, 200]}
          areatag="A11"
          racktag="R04"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <FourColRack
          position={[100, 0, 200]}
          areatag="A11"
          racktag="R05"
          changeposition={changeCameraPosition}
          currentbintags={selectedbintags}
        />
        <TwoColRack
          position={[120, 0, 200]}
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

const BinLocations: React.FC = () => {
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>(null);
  const [searchName, setSearchName] = useState<string>(null);
  const [selectedBinTags, setSelectedBinTags] = useState<string[]>(null);
  const debouncedValue = useDebounce<string>(inputName, 500);
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  console.log("the bin tags are " + selectedBinTags)

  useEffect(() => {
    if (params.BinTag) {
      setSelectedBinTags([params.BinTag])
    }
    dispatch(ChangeTab({ currenttab: "Bin Locations" }));
  }, []);

  useQuery(
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

  useQuery([`binsbybrand`, searchName], () => GetBinsByBrand(searchName), {
    onSuccess: (data) => {
      const returnbins = data.data.map((bin) => {
        return bin.BinTag;
      });
      if (returnbins.length !== 0) {
        setSelectedBinTags(returnbins);
      }
    },
  });

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
    <Box sx={{ pl: 3, pr: 3, pt: 1 }}>
    <Box sx={{ display: "flex", height: "100%" }}>
    <Box sx={{ flexGrow: 1 }}>
      {/* <h1 className="binlocationTitle">Warehouse Visualisation</h1> */}
      <Box
            component="span"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
      <Typography
        sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
      >
        Warehouse Visualisation
      </Typography>
      </Box>
      <div className="flexcontainer" style={{ marginBottom: "5px"}}>
        <SearchBar
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          searchoptions={searchOptions}
        />
      </div>
      <Link
        onClick={() => navigate("/emptybins")}
        sx={{ fontSize: "12px", marginTop: "5px", marginLeft: "10px"}}
      >
        View Empty Bins
      </Link>

      <div className="flexcontainer">
        <Canvas
          camera={{ fov: 45, position: [0, 40, 150] }}
          style={{
            border: "solid 1px black",
            height: 1000,
            marginTop: 20
          }}
        >
          <Scene selectedbintags={selectedBinTags} />
        </Canvas>
      </div>
    </Box>
    </Box>
    </Box>
  );
};

export default BinLocations;
