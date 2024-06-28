import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js'
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";
// Add Scene

const scene = new THREE.Scene()
// Add Camera
const camera = new THREE.PerspectiveCamera(70, iw / ih)
// Add Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Add Mesh
const material = new THREE.MeshPhongMaterial({ color:0xffffff })

 // Charger la texture
const loader = new THREE.TextureLoader();
loader.load('assets/star.jpg', function(texture) {
    scene.background = texture;
    scene.background.offset.x -= 0.001;
});


const mesh = new THREE.Mesh(geometry, material)
//Light for the Mesh
const light = new THREE.PointLight(0xeeeeee)

const ambientLight = new THREE.DirectionalLight(0x404040); // soft white light


scene.add(ambientLight);
scene.add(mesh)
scene.add(light)

// Particles

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 150000;
const positions = new Float64Array(particlesCount * 15);

for (let i = 0; i < particlesCount * 5; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0xFFFF00, 
    size: 0.020,
});


const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.set(0, 0, 2)
light.position.set(0,3, 3)

const renderer = new THREE.WebGLRenderer({ canvas })
// Add Controls for Moving the Camera
const controls = new OrbitControls(camera, renderer.domElement);

// Boucle animation
loop()
function loop(){
    requestAnimationFrame(loop)
    mesh.rotation.y += 0.01
    mesh.rotation.x += 0.005
    particles.rotation.x += 0.010
    particles.rotation.y += 0.010

renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


