import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

renderer.render( scene, camera );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load('giggle.png');
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

const donut_geo = new THREE.TorusGeometry( 10, 3, 16, 100 );
const donut_texture = new THREE.TextureLoader().load('life-dexter-morgan-reaction-v0-20wetwv0nvpd1.png');
const donut_material = new THREE.MeshBasicMaterial( { map: donut_texture } );
const donut = new THREE.Mesh( donut_geo, donut_material );

scene.add( donut );

function add_star() {
  const star_geometry = new THREE.SphereGeometry(.25, 24, 24);
  const star_material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);

camera.position.setZ(45);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;

}

document.body.onscroll = moveCamera;
moveCamera();

camera.position.z = 5;
function animate() {
    cube.rotation.x += 0.001 * Math.random();
    cube.rotation.y += 0.001 * Math.random();
    donut.rotation.x += 0.001;
    donut.rotation.y += 0.001;

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

animate();