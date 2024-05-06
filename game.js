import * as THREE from 'https://threejs.org/build/three.module.js';
import { createLevel } from './level1.js';
import { setupControls, updateControls } from './controls.js';

let camera, scene, renderer, clock, currentLevel;
let player, startButton;

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    startButton = document.createElement('button');
    startButton.innerText = 'Click to Start Story';
    startButton.style.position = 'absolute';
    startButton.style.top = '50%';
    startButton.style.left = '50%';
    startButton.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(startButton);

    startButton.addEventListener('click', startGame);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function startGame() {
    document.body.removeChild(startButton);
    currentLevel = createLevel(scene);
    player = currentLevel.player;
    setupControls(camera, player);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    updateControls(delta);
    renderer.render(scene, camera);
}

init();
