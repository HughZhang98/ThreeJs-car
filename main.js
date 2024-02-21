import * as THREE from 'three' //THREE JS
import * as CANNON from 'cannon-es' // CANNON
import Stat from 'three/examples/jsm/libs/stats.module' //帧率检测
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //鼠标控制相机
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//scene
const scene = new THREE.Scene()
const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

//import loader
const gltfLoader = new GLTFLoader()
gltfLoader.load('./ferrari.glb', (gltf) => {
  console.log('glft',glft);
  scene.add(gltf.scene)
})

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x95e4e8)

//dom
const stat = new Stat()
document.body.append(renderer.domElement)
document.body.append(stat.dom)

//light
scene.add(new THREE.AmbientLight(0xffffff, 0.5))

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,100)
const orbitControls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, 15, 15)

//Object
const tireTexture = new THREE.TextureLoader().load('./tire.png')
//ground
const groundG = new THREE.PlaneGeometry(30,30)
const groundM = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: tireTexture
})
const groundMesh = new THREE.Mesh(groundG, groundM)
scene.add(groundMesh)

const groundBody = new CANNON.Body({
  mass: 0,
  // shape: new CANNON.Box(30, 30, 0.1),
  shape: new CANNON.Box(new CANNON.Vec3(15,15,0.1)),
  type: CANNON.Body.STATIC
})
world.addBody(groundBody)
groundBody.quaternion.setFromEuler(Math.PI/2, 0, 0)

//ground2
const ground2G = new THREE.PlaneGeometry(30,30)
const ground2M = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: tireTexture
})
const ground2Mesh = new THREE.Mesh(ground2G, ground2M)
scene.add(ground2Mesh)

const ground2Body = new CANNON.Body({
  mass: 0,
  // shape: new CANNON.Box(30, 30, 0.1),
  shape: new CANNON.Box(new CANNON.Vec3(15,15,0.1)),
  type: CANNON.Body.STATIC
})
world.addBody(ground2Body)
ground2Body.quaternion.setFromEuler(-Math.PI/3, 0, 0)
ground2Body.position.z = -20
ground2Body.position.y = 5

//box
const boxG = new THREE.BoxGeometry(1, 1, 1)
const boxM = new THREE.MeshStandardMaterial({
  color: 0x00ff00
})
const boxMesh = new THREE.Mesh(boxG, boxM)
scene.add(boxMesh)

const boxBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(1,0.5,1)),
  mass: 1,
  position: new CANNON.Vec3(5, 5, 5)
})
world.addBody(boxBody)
//sphere
const sphereG = new THREE.SphereGeometry(1)
const sphereM = new THREE.MeshStandardMaterial({
  color: 0x00ff00
})
const sphereMesh = new THREE.Mesh(sphereG, sphereM)
scene.add(sphereMesh)

const sphereBody = new CANNON.Body({
  shape: new CANNON.Sphere(1),
  mass: 1,
  position: new CANNON.Vec3(-5, 5, -5)
})
world.addBody(sphereBody)

//car
const carG = new THREE.BoxGeometry(1, 0.5, 1.5)
const carM = new THREE.MeshStandardMaterial({
  color: 0xff0000
})
const carMesh = new THREE.Mesh(carG, carM)
scene.add(carMesh)

const carBody = new CANNON.Body({
  mass: 2,
  shape: new CANNON.Box(new CANNON.Vec3(1, 0.5, 1.5)),
  position: new CANNON.Vec3(0, 2, 0)
})
world.addBody(carBody)

//GUI
const gui = new dat.GUI()
const carColor = {
  color: 0xff0000
}
gui.addColor(carColor, "color").onChange((val) => {
  carMesh.material.color.set(val)
}).name("Car Color:")

//wheel
//left f
const wheelLFG = new THREE.CylinderGeometry(0.4, 0.4, 0.4)
wheelLFG.rotateZ(Math.PI / 2)
const wheelLFM = new THREE.MeshStandardMaterial({
  color: "blue"
})
const wheelLFMesh = new THREE.Mesh(wheelLFG, wheelLFM)
wheelLFMesh.position.set(-1, 1, -0.5)
scene.add(wheelLFMesh)

const wheelLFBody = new CANNON.Body({
  mass:1,
  material: new CANNON.Material(),
  shape: new CANNON.Sphere(0.3),
  position: new CANNON.Vec3(wheelLFMesh.position.x, wheelLFMesh.position.y, wheelLFMesh.position.z)
})
world.addBody(wheelLFBody)

//right f
const wheelRFG = new THREE.CylinderGeometry(0.4, 0.4, 0.4)
wheelRFG.rotateZ(Math.PI / 2)
const wheelRFM = new THREE.MeshStandardMaterial({
  color: "blue"
})
const wheelRFMesh = new THREE.Mesh(wheelRFG, wheelRFM)
wheelRFMesh.position.set(1, 1, -0.5)
scene.add(wheelRFMesh)

const wheelRFBody = new CANNON.Body({
  mass:1,
  material: new CANNON.Material(),
  shape: new CANNON.Sphere(0.3),
  position: new CANNON.Vec3(wheelRFMesh.position.x, wheelRFMesh.position.y, wheelRFMesh.position.z)
})
world.addBody(wheelRFBody)


//left b
const wheelLBG = new THREE.CylinderGeometry(0.4, 0.4, 0.4)
wheelLBG.rotateZ(Math.PI / 2)
const wheelLBM = new THREE.MeshStandardMaterial({
  color: "blue"
})
const wheelLBMesh = new THREE.Mesh(wheelLBG, wheelLBM)
wheelLBMesh.position.set(-1, 1, 0.5)
scene.add(wheelLBMesh)

const wheelLBBody = new CANNON.Body({
  mass:1,
  material: new CANNON.Material(),
  shape: new CANNON.Sphere(0.3),
  position: new CANNON.Vec3(wheelLBMesh.position.x, wheelLBMesh.position.y, wheelLBMesh.position.z)
})
world.addBody(wheelLBBody)

//right b
const wheelRBG = new THREE.CylinderGeometry(0.4, 0.4, 0.4)
wheelRBG.rotateZ(Math.PI / 2)
const wheelRBM = new THREE.MeshStandardMaterial({
  color: "blue"
})
const wheelRBMesh = new THREE.Mesh(wheelRBG, wheelRBM)
wheelRBMesh.position.set(1, 1, 0.5)
scene.add(wheelRBMesh)

const wheelRBBody = new CANNON.Body({
  mass:1,
  material: new CANNON.Material(),
  shape: new CANNON.Sphere(0.3),
  position: new CANNON.Vec3(wheelRBMesh.position.x, wheelRBMesh.position.y, wheelRBMesh.position.z)
})
world.addBody(wheelRBBody)

//constraint
const lFAxis = new CANNON.Vec3(1, 0, 0)
const rFrontAxis = new CANNON.Vec3(1, 0, 0)
const lBAxis = new CANNON.Vec3(1, 0, 0)
const rBAxis = new CANNON.Vec3(1, 0, 0)
const constraintLF = new CANNON.HingeConstraint(carBody, wheelLFBody, {
  pivotA: new CANNON.Vec3(-1, -0.5, -1),
  axisA: lFAxis,
  maxForce: 0.99,
})
world.addConstraint(constraintLF)
const constraintRF = new CANNON.HingeConstraint(carBody, wheelRFBody, {
  pivotA: new CANNON.Vec3(1, -0.5, -1),
  axisA: rFrontAxis,
  maxForce: 0.99,
})
world.addConstraint(constraintRF)
const constraintLB = new CANNON.HingeConstraint(carBody, wheelLBBody, {
  pivotA: new CANNON.Vec3(-1, -0.5, 1),
  axisA: lBAxis,
  maxForce: 0.99,
})
world.addConstraint(constraintLB)
const constraintRB = new CANNON.HingeConstraint(carBody, wheelRBBody, {
  pivotA: new CANNON.Vec3(1, -0.5, 1),
  axisA: rBAxis,
  maxForce: 0.99,
})
world.addConstraint(constraintRB)

//rear wheel drive
constraintLB.enableMotor()
constraintRB.enableMotor()

const carGroup = new THREE.Group()

 //添加页面监听按键
 // 按下
 document.addEventListener('keydown',  (event) => {
  console.log('KEY DOWN:',event.code);
})
// 松开
document.addEventListener('keyup', (event) => {
  console.log('KEY UP:',event.code);
})
const keyStates = {
  W: false,
  A: false,
  S: false,
  D: false,
};
// 当某个键盘按下设置对应属性设置为true
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW') keyStates.W = true;
  if (event.code === 'KeyA') keyStates.A = true;
  if (event.code === 'KeyS') keyStates.S = true;
  if (event.code === 'KeyD') keyStates.D = true;
});
// 当某个键盘抬起设置对应属性设置为false
document.addEventListener('keyup', (event) => {
  if (event.code === 'KeyW') keyStates.W = false;
  if (event.code === 'KeyA') keyStates.A = false;
  if (event.code === 'KeyS') keyStates.S = false;
  if (event.code === 'KeyD') keyStates.D = false;
});

let forwardVelocity = 0
let rightVelocity = 0
const v = new THREE.Vector3()
let thrusting = false
let delta

const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  const time = clock.getDelta()

  groundMesh.position.copy(groundBody.position)
  groundMesh.quaternion.copy(groundBody.quaternion)

  ground2Mesh.position.copy(ground2Body.position)
  ground2Mesh.quaternion.copy(ground2Body.quaternion)

  carMesh.position.copy(carBody.position)
  carMesh.quaternion.copy(carBody.quaternion)

  wheelLFMesh.position.copy(wheelLFBody.position)
  wheelLFMesh.quaternion.copy(wheelLFBody.quaternion)

  wheelRFMesh.position.copy(wheelRFBody.position)
  wheelRFMesh.quaternion.copy(wheelRFBody.quaternion)

  wheelLBMesh.position.copy(wheelLBBody.position)
  wheelLBMesh.quaternion.copy(wheelLBBody.quaternion)

  wheelRBMesh.position.copy(wheelRBBody.position)
  wheelRBMesh.quaternion.copy(wheelRBBody.quaternion)

  boxMesh.position.copy(boxBody.position)
  boxMesh.quaternion.copy(boxBody.quaternion)
   
  sphereMesh.position.copy(sphereBody.position)
  sphereMesh.quaternion.copy(sphereBody.quaternion)

  thrusting = false
    if (keyStates.W) {
        if (forwardVelocity < 15.0) forwardVelocity += 1
        thrusting = true
    }
    if (keyStates.S) {
        if (forwardVelocity > -15.0) forwardVelocity -= 1
        thrusting = true
    }
    if (keyStates.A) {
        if (rightVelocity > -1.0) rightVelocity -= 0.1
    }
    if (keyStates.D) {
        if (rightVelocity < 1.0) rightVelocity += 0.1
    }

    if (!thrusting) {
        //not going forward or backwards so gradually slow down
        if (forwardVelocity > 0) {
            forwardVelocity -= 0.2
        }
        if (forwardVelocity < 0) {
            forwardVelocity += 0.2
        }
    }

    constraintLB.setMotorSpeed(forwardVelocity)
    constraintRB.setMotorSpeed(forwardVelocity)
    constraintLF.axisA.z = rightVelocity
    constraintRF.axisA.z = rightVelocity

    camera.lookAt(carMesh.position)


  world.step(time)
  render()
  stat.update()
}

function render() {
  // orbitControls.update()
  renderer.render(scene, camera)
}
camera.lookAt(carBody)
animate()

