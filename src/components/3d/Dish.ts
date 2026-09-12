import * as THREE from 'three'

export function createDish(): THREE.Group {
  const group = new THREE.Group()

  // Plate base
  const plateGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.12, 96)
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0x0f0f0f,
    roughness: 0.35,
    metalness: 0.6,
  })
  const plate = new THREE.Mesh(plateGeo, plateMat)
  plate.castShadow = true
  plate.receiveShadow = true
  group.add(plate)

  // Gold rim
  const rimGeo = new THREE.TorusGeometry(2.2, 0.03, 16, 96)
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xc9a961,
    roughness: 0.15,
    metalness: 1,
    emissive: 0xc9a961,
    emissiveIntensity: 0.15,
  })
  const rim = new THREE.Mesh(rimGeo, rimMat)
  rim.rotation.x = Math.PI / 2
  rim.position.y = 0.07
  group.add(rim)

  // Inner well
  const wellGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.05, 96)
  const wellMat = new THREE.MeshStandardMaterial({
    color: 0x161616,
    roughness: 0.4,
    metalness: 0.4,
  })
  const well = new THREE.Mesh(wellGeo, wellMat)
  well.position.y = 0.09
  group.add(well)

  // Food group
  const food = new THREE.Group()
  food.position.y = 0.42
  food.name = 'food'

  // Main element
  const mainGeo = new THREE.SphereGeometry(0.55, 32, 32)
  const mainMat = new THREE.MeshStandardMaterial({
    color: 0xe85d2f,
    roughness: 0.55,
    metalness: 0.05,
    emissive: 0xe85d2f,
    emissiveIntensity: 0.08,
  })
  const main = new THREE.Mesh(mainGeo, mainMat)
  main.castShadow = true
  food.add(main)

  // Small elements around
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const r = 0.7
    const geo = new THREE.SphereGeometry(0.18, 24, 24)
    const mat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0xc9a961 : 0x8a6a3f,
      roughness: 0.4,
      metalness: 0.3,
    })
    const m = new THREE.Mesh(geo, mat)
    m.position.set(Math.cos(angle) * r, -0.1, Math.sin(angle) * r)
    m.castShadow = true
    food.add(m)
  }

  // Garnish
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2 + 0.5
    const geo = new THREE.SphereGeometry(0.08, 16, 16)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x7a9461,
      roughness: 0.5,
      metalness: 0.1,
    })
    const m = new THREE.Mesh(geo, mat)
    m.position.set(Math.cos(angle) * 0.4, 0.5, Math.sin(angle) * 0.4)
    m.castShadow = true
    food.add(m)
  }

  group.add(food)
  return group
}
