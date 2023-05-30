<script setup lang="ts">
  import * as THREE from 'three'
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
  import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
  import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
  import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js'
  import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'

  import Stats from 'three/examples/jsm/libs/stats.module.js'

  // defineProps<{
  //   propName: string
  // }>()

  const bgContainer = ref<HTMLDivElement | null>(null)

  // We cannot use Vue reactive objects for three.js data structures,
  // see https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3
  let scene = null as THREE.Scene | null
  let renderer = null as THREE.WebGLRenderer | null
  let camera = null as THREE.PerspectiveCamera | null
  let composer = null as EffectComposer | null

  const stats = ref<Stats>()
  const width = ref(0)
  const height = ref(0)

  onMounted(() => {
    width.value = window.innerWidth
    height.value = window.innerHeight

    setupScene()
    animate()

    window.addEventListener('resize', onWindowResize)
  })

  /* -------------------------------- Methods ------------------------------- */

  function setupScene() {
    if (!bgContainer.value) {
      return
    }

    camera = new THREE.PerspectiveCamera(
      75,
      width.value / height.value,
      0.1,
      1000
    )

    camera.position.z = 5

    //

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1f2020)

    //

    const ambientLight = new THREE.AmbientLight(0xffffff)
    ambientLight.position.set(0, -0.1, 1).normalize()
    ambientLight.intensity = 10
    scene.add(ambientLight)

    //

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x303030 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    //

    renderer = new THREE.WebGLRenderer({
      antialias: false,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width.value, height.value)

    // stats.value = new Stats()

    bgContainer.value.appendChild(renderer.domElement)
    // bgContainer.value.appendChild(stats.value.dom)

    //

    const shaderVignette = VignetteShader

    const effectVignette = new ShaderPass(shaderVignette)
    const gammaCorrection = new ShaderPass(GammaCorrectionShader)

    effectVignette.uniforms['offset'].value = 0.95
    effectVignette.uniforms['darkness'].value = 1.2

    const effectBloom = new BloomPass(1)
    const effectFilm = new FilmPass(0.7, 0, 0, 1)

    //

    const render = new RenderPass(scene, camera)

    composer = new EffectComposer(
      renderer,
      new THREE.WebGLRenderTarget(width.value, height.value, {
        format: THREE.RGBAFormat,
        stencilBuffer: false,
      })
    )

    //

    // Ideally the number of passes should be reduced to a minimum
    composer.addPass(render)
    composer.addPass(gammaCorrection)
    composer.addPass(effectBloom)
    composer.addPass(effectFilm)
    composer.addPass(effectVignette)
  }

  function animate() {
    requestAnimationFrame(animate)
    // stats.value.begin()
    render()
    // stats.value.end()
  }

  function render() {
    const delta = 0.001
    if (composer) {
      composer.render(delta)
    }
  }

  function onWindowResize() {
    width.value = window.innerWidth
    height.value = window.innerHeight

    if (camera && renderer && composer) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      composer.setSize(width.value, height.value)
      composer.setSize(width.value, height.value)
    }
  }
</script>

<template>
  <div ref="bgContainer"></div>
</template>

<style scoped></style>
