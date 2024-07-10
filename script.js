import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";

// Add Scene
export const scene = new THREE.Scene();

// Create the Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 400);

// Add Axes
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
camera.position.set(0, 2, 5);
camera.position.z = 5;
camera.position.y = 2;

// ----- The Cube -----//
const cube = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshNormalMaterial({ color: 0xffff });
const box = new THREE.Mesh(cube, boxMaterial);

scene.add(box);

// ---- The Sphere -----//
const geometry = new THREE.SphereGeometry(3, 50, 44);
// Add Mesh
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

//----- The Grid ------ //
const grid = new THREE.GridHelper(30, 10, 0xffffff, 0xffffff);
scene.add(grid);

// Appel de la fonction d'initialisation au chargement de la page

// Load the Texture
const loader = new THREE.TextureLoader();
loader.load("assets/star.jpg", function (texture) {
  scene.background = texture;
});

// Add the Sphere
scene.add(mesh);

// Light for the Mesh
const light = new THREE.PointLight(0xeeeeee);
const ambientLight = new THREE.DirectionalLight(0x404040); // soft white light
scene.add(ambientLight);
scene.add(light);

mesh.position.set(-10, 5, 0);
box.position.set(-10, 5, 0);

// ----- The Cylinder ----- //
const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 10, 50); // Radius top, radius bottom, height, radial segments
const cylinderMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(10, 5, 0); // Position the cylinder
scene.add(cylinder);

// --- The Star --- //

const starGeometry = new THREE.TorusGeometry(6, 1, 10, 50);
const material2 = new THREE.MeshNormalMaterial({
  color: 0xffff00,
});

const torus = new THREE.Mesh(starGeometry, material2);
scene.add(torus);
torus.position.set(2, 7, -10);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 150000;
const positions = new Float64Array(particlesCount * 15);

for (let i = 0; i < particlesCount * 5; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.02,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);

light.position.set(0, 3, 3);
camera.position.set(0, 30, -10 - 20);

const renderer = new THREE.WebGLRenderer({ canvas });
// Add Controls for Moving the Camera
const controls = new OrbitControls(camera, renderer.domElement);

let step = 0;
let speed = 0.01;

// Boucle animation
loop();
function loop() {
  requestAnimationFrame(loop);
  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.x += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  cylinder.rotation.y += 0.01; // Rotate the cylinder
  cylinder.rotation.x += 0.05; // Rotate the cylinder
  step += speed;

  // Mise à jour de la position y du cube pour créer une oscillation
  mesh.position.y = 10 * Math.abs(Math.sin(step));
  box.position.y = 10 * Math.abs(Math.sin(step));

  cylinder.position.y = 10 * Math.abs(Math.sin(step)); // Oscillate the cylinder
  particles.rotation.x += 0.01;
  particles.rotation.y += 0.01;

  const oscillationHeight = 5; // Height of the oscillation to ensure it stays above the grid
  mesh.position.y = oscillationHeight + 10 * Math.abs(Math.sin(step));
  box.position.y = oscillationHeight + 20 * Math.abs(Math.sin(step));
  cylinder.position.y = oscillationHeight + 20 * Math.abs(Math.sin(step));
  torus.position.y = oscillationHeight + 15 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
