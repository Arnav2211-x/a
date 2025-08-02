
import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new GLTFLoader();
loader.load('assets/models/lock.glb', function(gltf) {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(0, 0, 0);
  model.scale.set(1.5, 1.5, 1.5);

  function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}, undefined, function(error) {
  console.error(error);
});

camera.position.z = 5;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
