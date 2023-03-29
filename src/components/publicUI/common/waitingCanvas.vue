<template>
  <div id="waitingCanvas" ref="waitingCanvas"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: 'WaitingCanvas',
  mounted() {
    this.init()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)

    //销毁控制器
    this.controls.dispose()
    // 销毁渲染器
    this.renderer.dispose()

    //销毁光源
    this.light.dispose()

    //销毁组以及内容
    this.group.children.forEach((child) => {
      this.group.remove(child)
    })

    for (const mesh of this.meshes) {
      mesh.geometry.dispose()
      mesh.material.dispose()
      this.scene.remove(mesh)
    }

    // 销毁相机和场景
    this.camera = null
    this.scene = null
  },
  data: function () {
    return {
      waitingCanvas: null,
      scene: null,
      camera: null,
      renderer: null,
      light: null,
      controls: null,
      group: null,
      textureLoader: null,
      meshes: [],
      particle: {
        count: 1000,
        geometry: null,
        positions: null,
        velocities: null,
        material: null,
        particles: null,
      },
    }
  },
  methods: {
    init() {
      this.waitingCanvas = document.querySelector('#waitingCanvas')
      // 创建场景
      this.scene = new THREE.Scene()

      // 创建相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.waitingCanvas.appendChild(this.renderer.domElement)

      // 创建光源
      this.light = new THREE.PointLight(0xffffff, 1, 100)
      this.light.position.set(0, 0, 10)
      this.scene.add(this.light)

      // 创建材质
      this.textureLoader = new THREE.TextureLoader()

      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        opacity: 0.7,
        transparent: true,
        side: THREE.DoubleSide, // 双面渲染
      })

      // 创建上四面体锥
      var geometry1 = new THREE.ConeGeometry(1, 2, 4)
      geometry1.translate(0, 1, 0)
      var mesh1 = new THREE.Mesh(geometry1, material)
      this.scene.add(mesh1)
      this.meshes.push(mesh1)

      // 创建下四面体锥
      var geometry2 = new THREE.ConeGeometry(1, 2, 4)
      geometry2.rotateX(Math.PI)
      geometry2.translate(0, -1, 0)
      var mesh2 = new THREE.Mesh(geometry2, material)
      this.scene.add(mesh2)
      this.meshes.push(mesh2)

      // 创建八面体锥
      this.group = new THREE.Group()
      this.group.add(mesh1)
      this.group.add(mesh2)
      this.scene.add(this.group)

      //创建粒子背景
      this.particle.count = 1000
      this.particle.geometry = new THREE.BufferGeometry()
      this.particle.positions = new Float32Array(this.particle.count * 3)
      this.particle.velocities = new Float32Array(this.particle.count * 3)

      for (let i = 0; i < this.particle.count; i++) {
        const x = Math.random() * 400 - 200
        const y = Math.random() * 400 - 200
        const z = Math.random() * 400 - 200

        this.particle.positions[i * 3] = x
        this.particle.positions[i * 3 + 1] = y
        this.particle.positions[i * 3 + 2] = z

        this.particle.velocities[i * 3] = (Math.random() - 0.5) * 0.1 // x轴方向的速度
        this.particle.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1 // y轴方向的速度
        this.particle.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1 // z轴方向的速度
      }

      this.particle.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(this.particle.positions, 3),
      )
      this.particle.material = new THREE.PointsMaterial({
        color: 0xffffff,
      })
      this.particles = new THREE.Points(
        this.particle.geometry,
        this.particle.material,
      )
      this.scene.add(this.particles)
      this.meshes.push(this.particles)

      // // 设置背景
      // scene.background = new THREE.Color('ffffff');

      // 相机位置和旋转角度
      this.camera.position.z = 5
      this.camera.position.y = 1
      this.camera.lookAt(this.scene.position)

      // 创建 OrbitControls 控件
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      // 开启自动旋转
      this.controls.autoRotate = true

      // 设置自动旋转的速度
      this.controls.autoRotateSpeed = 0.1

      // 禁止拖动时自动旋转停止
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.05

      // 禁止控制器缩放
      this.controls.enableZoom = false

      this.animate()
    },
    animate() {
      if (this.renderer && this.scene && this.camera) {
        requestAnimationFrame(this.animate)

        // 绕Y轴旋转
        this.group.rotation.y += 0.02

        // 更新粒子位置数据
        this.updateParticles()

        // 更新控件状态
        this.controls.update()

        this.renderer.render(this.scene, this.camera)
      }
    },
    updateParticles() {
      for (let i = 0; i < this.particle.count; i++) {
        this.particle.positions[i * 3] += this.particle.velocities[i * 3]
        this.particle.positions[i * 3 + 1] +=
          this.particle.velocities[i * 3 + 1]
        this.particle.positions[i * 3 + 2] +=
          this.particle.velocities[i * 3 + 2]

        // 粒子越过边界时，将其位置重置
        if (
          Math.abs(this.particle.positions[i * 3]) > 200 ||
          Math.abs(this.particle.positions[i * 3 + 1]) > 200 ||
          Math.abs(this.particle.positions[i * 3 + 2]) > 200
        ) {
          this.particle.positions[i * 3] = Math.random() * 400 - 200
          this.particle.positions[i * 3 + 1] = Math.random() * 400 - 200
          this.particle.positions[i * 3 + 2] = Math.random() * 400 - 200
        }
      }

      this.particle.geometry.attributes.position.needsUpdate = true
    },
    resize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
  },
}
</script>

<style lang="less" scoped>
#waitingCanvas {
  width: 100%;
  height: 100%;
}
</style>
