import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, // Adjusted FOV
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    '../img/stars.jpg',
    '../img/stars.jpg',
    '../img/stars.jpg',
    '../img/stars.jpg',
    '../img/stars.jpg',
    '../img/stars.jpg'
]);

// Debris
const geometry = new THREE.BoxGeometry(0.5, 0.25, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0x4c5f9e });
const debris = new THREE.Mesh(geometry, material);
scene.add(debris);
debris.position.set(5, 2, 4);

// Sun
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

const sunG = new THREE.SphereGeometry(2.5, 32, 32);
const sunM = new THREE.MeshBasicMaterial({
    map: textureLoader.load('../img/sun.jpg')
});
const sun = new THREE.Mesh(sunG, sunM);
scene.add(sun);

function createShape(size, texturePath, position) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texturePath)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj);
    mesh.position.x = position;
    return { mesh, obj };
}

const mercury = createShape(0.5, '../img/mercury.jpg', 3.5);
const venus = createShape(1, '../img/venus.jpg', 5);
const earth = createShape(1.4, '../img/earth.jpg', 9);
const mars = createShape(0.6, '../img/mars.jpg', 11.5);
const jupiter = createShape(1.6, '../img/jupiter.jpg', 15);
const saturn = createShape(1.6, '../img/saturn.jpg', 19.5);
const uranus = createShape(0.6, '../img/uranus.jpg', 23.5);
const neptune = createShape(1.5, '../img/neptune.jpg', 26.5);
const pluto = createShape(0.4, '../img/pluto.jpg', 30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.maxDistance = 40;
orbit.panSpeed = 0.5;
orbit.rotateSpeed = 0.5;
camera.position.set(32, 6, -21);
orbit.update();

const radius = 3;
let angle = 0;

function animate() {
    sun.rotateY(0.01);
    mercury.mesh.rotateY(0.02);
    venus.mesh.rotateY(0.02);
    debris.rotateZ(0.02);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.01);
    jupiter.mesh.rotateY(0.02);
    saturn.mesh.rotateY(0.02);
    uranus.mesh.rotateY(0.01);
    neptune.mesh.rotateY(0.02);
    pluto.mesh.rotateY(0.01);

    mercury.obj.rotateY(0.2);
    venus.obj.rotateY(0.1);
    earth.obj.rotateY(0.07);
    mars.obj.rotateY(0.06);
    jupiter.obj.rotateY(0.05);
    saturn.obj.rotateY(0.03);
    uranus.obj.rotateY(0.02);
    neptune.obj.rotateY(0.01);
    pluto.obj.rotateY(0.005);

    angle += 0.01;
    debris.position.x = radius * Math.cos(angle);
    debris.position.z = radius * Math.sin(angle);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
