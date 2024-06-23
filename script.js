import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Add Scene

const scene = new THREE.Scene()
// Add Camera
const camera = new THREE.PerspectiveCamera(70, iw / ih)
// Add Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
// Add Mesh
const material = new THREE.MeshPhongMaterial({ color:0xffffff })



const mesh = new THREE.Mesh(geometry, material)
//Light for the Mesh
const light = new THREE.PointLight(0xeeeeee)

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light

scene.add(ambientLight);
scene.add(mesh)
scene.add(light)

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

renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});