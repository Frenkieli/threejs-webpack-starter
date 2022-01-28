import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const loader = new THREE.TextureLoader();
const height = loader.load('height.jpg');
const texture = loader.load('texture.jpg');
const alpha = loader.load('alpha.jpg');
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const grometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 'gary',
    map: texture,
    displacementMap: height,
    displacementScale: 2,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
})

const plane = new THREE.Mesh(grometry, material);
scene.add(plane);

plane.rotation.x = 181;
gui.add(plane.rotation, 'x').min(0).max(10);

// Mesh


// Lights

const pointLight = new THREE.PointLight(0x00b3ff, 4)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 10
scene.add(pointLight)

gui.add(pointLight.position, 'x');
gui.add(pointLight.position, 'y');
gui.add(pointLight.position, 'z');

const col = { color: '#00ff00'};

gui.addColor(col, 'color').onChange(()=>{
    pointLight.color.set(col.color);
})


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.7
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', animateTerrain);


let mouseY = 0;

function animateTerrain(event) {
    mouseY = event.clientY;
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime
    plane.rotation.z = .5 * elapsedTime
    plane.material.displacementScale = mouseY * 0.004;


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()