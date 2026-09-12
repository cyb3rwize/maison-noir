'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { createDish } from './Dish'

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const dishRef = useRef<THREE.Group | null>(null)
  const rigRef = useRef<THREE.Group | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // --- Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // --- Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // --- Camera
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.6, 6)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // --- Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const keyLight = new THREE.SpotLight(0xf5e6c8, 2.2, 30, 0.5, 1)
    keyLight.position.set(4, 6, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    scene.add(keyLight)

    const fillLight = new THREE.SpotLight(0xc9a961, 1.2, 30, 0.6, 1)
    fillLight.position.set(-5, 3, -3)
    scene.add(fillLight)

    const accentLight = new THREE.PointLight(0xe85d2f, 0.6, 20)
    accentLight.position.set(0, 2, 4)
    scene.add(accentLight)

    // --- Dish + rig
    const rig = new THREE.Group()
    const dish = createDish()
    rig.add(dish)
    scene.add(rig)
    rigRef.current = rig
    dishRef.current = dish

    // --- Contact shadow disc (fake)
    const shadowGeo = new THREE.CircleGeometry(3, 64)
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    })
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat)
    shadowDisc.rotation.x = -Math.PI / 2
    shadowDisc.position.y = -1.4
    scene.add(shadowDisc)

    // --- Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // --- Resize
    const onResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return
      const w = container.clientWidth
      const h = container.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // --- Animation loop
    let raf = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()

      if (rigRef.current) {
        const { x, y } = mouseRef.current
        rigRef.current.rotation.x += (y * 0.2 - rigRef.current.rotation.x) * 0.05
        rigRef.current.rotation.z += (-x * 0.35 - rigRef.current.rotation.z) * 0.05
        // Gentle float
        rigRef.current.position.y = Math.sin(t * 0.8) * 0.08
      }

      if (dishRef.current) {
        dishRef.current.rotation.y = t * 0.15
        const food = dishRef.current.getObjectByName('food')
        if (food) {
          food.rotation.y = -t * 0.1
          food.position.y = 0.42 + Math.sin(t * 0.8) * 0.02
        }
      }

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    // --- Cleanup
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
