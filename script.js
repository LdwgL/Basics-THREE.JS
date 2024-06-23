import * as THREE from 'three'
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
scene.add(mesh)
scene.add(light)

camera.position.set(0, 0, 2)
light.position.set(0,0, 2)

const renderer = new THREE.WebGLRenderer({ canvas })
// Boucle animation
loop()
function loop(){
    requestAnimationFrame(loop)
    mesh.rotation.y += 0.01
    mesh.rotation.x += 0.005

renderer.render(scene, camera)
}