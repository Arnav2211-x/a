import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/OrbitControls.js';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

let camera = new THREE.PerspectiveCamera(
  60, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 1, 3);

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
pointLight.position.set(0, 5, 10);
scene.add(pointLight);

// Load Lock GLB model
const loader = new GLTFLoader();
loader.load('lock.glb', function (gltf) {
  const model = gltf.scene;
  model.scale.set(1.5, 1.5, 1.5);
  scene.add(model);

  animate();
}, undefined, function (error) {
  console.error('GLB load error:', error);
});

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
