import * as THREE from "./three.js-master/build/three.module.js.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js.js";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// Instantiate a loader
const loader = new GLTFLoader();
loader.load(
  "./three.js-master/examples/models/warehouse.blendwithbins.gltf",
  function (gltf) {
    console.log(gltf);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error");
  }
);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});

// Mesh
const boxMesh = new THREE.Mesh(geometry, material);
scene.add(boxMesh); // add box to scene

// Base Code
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Perspective Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.set(0, 1, 2);
scene.add(camera); // add camera to scene

// Lightiing

// Renderer
const Renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});

// Set size of renderer
Renderer.setSize(sizes.width, sizes.height);
Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
Renderer.shadowMap.enabled = true;
Renderer.gammaOutput = true;
Renderer.render(scene, camera);
