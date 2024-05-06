import * as THREE from 'https://threejs.org/build/three.module.js';

let camera, player;
let moveForward = false, moveLeft = false, moveRight = false, moveBackward = false;

function setupControls(cam, plyr) {
    camera = cam;
    player = plyr;

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyD': moveRight = true; break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyD': moveRight = false; break;
    }
}

function updateControls(delta) {
    const speed = 5.0;
    const velocity = new THREE.Vector3();

    if (moveForward) velocity.z -= speed * delta;
    if (moveBackward) velocity.z += speed * delta;
    if (moveLeft) velocity.x -= speed * delta;
    if (moveRight) velocity.x += speed * delta;

    player.position.add(velocity);
    camera.position.add(velocity);
}

export { setupControls, updateControls };
