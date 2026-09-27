import * as THREE from 'three';

export interface AincradScene {
  setMotion(enabled: boolean): void;
  setVisible(visible: boolean): void;
  setView(view: 'world' | 'settlement' | 'citadel'): void;
  setScrollProgress(progress: number): void;
  rotate(direction: -1 | 1): void;
  dispose(): void;
}

type View = 'world' | 'settlement' | 'citadel';
type Placement = {
  x: number; y: number; z: number; sx: number; sy: number; sz: number;
  yaw?: number; quaternion?: THREE.Quaternion; color?: THREE.ColorRepresentation;
};
type CameraPose = { position: THREE.Vector3; target: THREE.Vector3; span: number };

// The official exterior is a single enclosed fortress. These are local design
// proportions, not claims about canonical dimensions or the layout of its floors.
const FLOOR_COUNT = 100;
const FLOOR_BASE = -0.72;
const FLOOR_HEIGHT = 0.048;

function shellRadius(progress: number) {
  return 2.13 - 0.53 * progress - 0.72 * progress ** 2 - 0.66 * progress ** 3;
}

function floorSurfaceRadius(floor: number, fraction: number) {
  const t = floor / FLOOR_COUNT;
  const major = floor % 10 === 0;
  const lip = major ? 0.075 * (1 - t * 0.5) : 0.026;
  const lipHeight = major ? 0.019 : 0.011;
  const wallProgress = (fraction * FLOOR_HEIGHT - lipHeight) / (FLOOR_HEIGHT - lipHeight);
  return THREE.MathUtils.lerp(shellRadius(t) + lip, shellRadius((floor + 1) / FLOOR_COUNT), THREE.MathUtils.clamp(wallProgress, 0, 1));
}

function noise(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function smoothNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  return THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(noise(ix, iy), noise(ix + 1, iy), sx),
    THREE.MathUtils.lerp(noise(ix, iy + 1), noise(ix + 1, iy + 1), sx), sy,
  );
}

/** Original procedural interpretation of the anime exterior, with no downloaded assets. */
export function createAincradScene(
  host: HTMLElement,
  options: { motion: boolean; onUnavailable: () => void },
): AincradScene | null {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', {
    alpha: true, antialias: true, powerPreference: 'low-power',
  });
  if (!context) return null;

  canvas.className = 'aincrad-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.pointerEvents = 'none';
  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const world = new THREE.Group();
  world.name = 'Aincrad exterior';
  scene.add(world);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const instances: THREE.InstancedMesh[] = [];
  const geometry = <T extends THREE.BufferGeometry>(value: T): T => { geometries.add(value); return value; };
  const material = <T extends THREE.Material>(value: T): T => { materials.add(value); return value; };
  const texture = <T extends THREE.Texture>(value: T): T => { textures.add(value); return value; };

  // Small, deterministic textures supply weathering and cloud opacity. They are
  // generated once, shared, and remain still when motion is paused.
  function dataTexture(width: number, height: number, pixel: (u: number, v: number) => number[]) {
    const data = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        data.set(pixel(x / (width - 1), y / (height - 1)), (y * width + x) * 4);
      }
    }
    const value = texture(new THREE.DataTexture(data, width, height));
    value.magFilter = THREE.LinearFilter;
    value.minFilter = THREE.LinearMipmapLinearFilter;
    value.generateMipmaps = true;
    value.needsUpdate = true;
    return value;
  }

  const weathering = dataTexture(128, 256, (u, v) => {
    const grain = smoothNoise(u * 54, v * 110);
    const streak = smoothNoise(u * 86, v * 4);
    const shade = Math.round(165 + grain * 47 + streak * 35);
    return [shade, shade, shade, 255];
  });
  weathering.wrapS = weathering.wrapT = THREE.RepeatWrapping;
  weathering.repeat.set(3, 1);

  const environment = dataTexture(128, 64, (u, v) => {
    const horizon = Math.exp(-Math.pow((v - 0.52) / 0.19, 2));
    const sun = Math.exp(-Math.pow((u - 0.24) / 0.085, 2) - Math.pow((v - 0.7) / 0.2, 2));
    const brightness = 61 + v * 62 + horizon * 47 + sun * 63;
    return [Math.min(255, brightness * 0.88), Math.min(255, brightness * 0.95), Math.min(255, brightness + 10), 255];
  });
  environment.colorSpace = THREE.SRGBColorSpace;
  environment.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environment;
  scene.environmentIntensity = 0.7;
  scene.fog = new THREE.FogExp2('#a6b3bf', 0.017);

  const steel = material(new THREE.MeshStandardMaterial({ color: '#83909b', roughness: 0.76, metalness: 0.38, vertexColors: true, bumpMap: weathering, bumpScale: 0.012, roughnessMap: weathering }));
  const armour = material(new THREE.MeshStandardMaterial({ color: '#7b8995', roughness: 0.71, metalness: 0.4, bumpMap: weathering, bumpScale: 0.01, flatShading: true }));
  const structure = material(new THREE.MeshStandardMaterial({ color: '#4b5c6c', roughness: 0.8, metalness: 0.34, flatShading: true }));
  const edge = material(new THREE.MeshStandardMaterial({ color: '#b0bbc3', roughness: 0.64, metalness: 0.42 }));
  const recess = material(new THREE.MeshStandardMaterial({ color: '#263340', roughness: 0.94, metalness: 0.1 }));
  const crown = material(new THREE.MeshStandardMaterial({ color: '#875a55', roughness: 0.76, metalness: 0.2 }));
  const windowLight = material(new THREE.MeshBasicMaterial({ color: '#c2c8c7', toneMapped: false, transparent: true, opacity: 0.62 }));
  const cube = geometry(new THREE.BoxGeometry(1, 1, 1));
  const cylinder = geometry(new THREE.CylinderGeometry(1, 1, 1, 12));
  const cone = geometry(new THREE.ConeGeometry(1, 1, 8));
  const plane = geometry(new THREE.PlaneGeometry(1, 1));

  function mesh(g: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) {
    const value = new THREE.Mesh(g, m);
    value.position.set(x, y, z);
    value.scale.set(sx, sy, sz);
    world.add(value);
    return value;
  }

  function batch(g: THREE.BufferGeometry, m: THREE.Material, placements: Placement[], name: string) {
    const value = new THREE.InstancedMesh(g, m, placements.length);
    value.name = name;
    const transform = new THREE.Object3D();
    placements.forEach((p, index) => {
      transform.position.set(p.x, p.y, p.z);
      transform.scale.set(p.sx, p.sy, p.sz);
      if (p.quaternion) transform.quaternion.copy(p.quaternion);
      else transform.rotation.set(0, p.yaw ?? 0, 0);
      transform.updateMatrix();
      value.setMatrixAt(index, transform.matrix);
      if (p.color !== undefined) value.setColorAt(index, new THREE.Color(p.color));
    });
    value.instanceMatrix.needsUpdate = true;
    if (value.instanceColor) value.instanceColor.needsUpdate = true;
    value.computeBoundingSphere();
    instances.push(value);
    world.add(value);
    return value;
  }

  function lathe(profile: [number, number][], segments: number, m: THREE.Material) {
    return mesh(geometry(new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), segments)), m);
  }

  function beam(a: THREE.Vector3, b: THREE.Vector3, width: number, depth = width): Placement {
    const delta = b.clone().sub(a);
    const midpoint = a.clone().add(b).multiplyScalar(0.5);
    return { x: midpoint.x, y: midpoint.y, z: midpoint.z, sx: width, sy: delta.length(), sz: depth,
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()) };
  }
  const radial = (angle: number, radius: number, y: number) => new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);

  // One watertight-looking outer shell, not separated islands. Three profile
  // points per floor produce a recessed wall and a narrow projecting floor lip.
  const profile: [number, number][] = [];
  const profileShades: number[] = [];
  for (let floor = 0; floor < FLOOR_COUNT; floor++) {
    const t = floor / FLOOR_COUNT;
    const y = FLOOR_BASE + floor * FLOOR_HEIGHT;
    const r = shellRadius(t);
    const next = shellRadius((floor + 1) / FLOOR_COUNT);
    const major = floor % 10 === 0;
    const lip = major ? 0.075 * (1 - t * 0.5) : 0.026;
    profile.push([r + lip, y], [r + lip, y + (major ? 0.019 : 0.011)], [next, y + FLOOR_HEIGHT]);
    const shade = 0.85 + noise(floor, 3) * 0.1;
    profileShades.push(major ? 0.84 : shade, major ? 1.0 : shade + 0.07, 0.66 + noise(floor, 8) * 0.14);
  }
  const shell = geometry(new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 96));
  const colors: number[] = [];
  for (let around = 0; around <= 96; around++) {
    for (let point = 0; point < profile.length; point++) {
      const shade = profileShades[point]! * (0.97 + 0.03 * Math.cos(around * 0.7));
      colors.push(shade, shade, shade);
    }
  }
  shell.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  mesh(shell, steel).name = '100 enclosed floor bands';

  // The broad skirt, angular inverted foundations and trailing structural ribs
  // are essential to the anime silhouette; their details stay subordinate to it.
  lathe([[1.96, -1.4], [2.3, -1.29], [2.67, -1.04], [2.6, -0.94], [2.18, -0.71]], 48, armour);
  lathe([[0.025, -3.4], [0.33, -3.27], [0.47, -2.96], [0.88, -2.75], [1.2, -2.41], [1.5, -1.92], [1.99, -1.41], [2.33, -1.24]], 24, structure);
  lathe([[1.83, -1.59], [2.02, -1.46], [2.5, -1.25], [2.7, -1.09], [2.69, -1.035]], 48, armour);
  lathe([[0.6, -2.95], [0.91, -2.8], [0.94, -2.68], [0.91, -2.64]], 24, armour);
  lathe([[0.195, 4.06], [0.2, 4.13], [0.12, 4.18], [0.005, 4.18]], 32, edge);

  const ringProfile = [[0.982, -0.5], [1, -0.26], [1, 0.28], [0.98, 0.5]] as [number, number][];
  const ringGeometry = geometry(new THREE.LatheGeometry(ringProfile.map(([r, y]) => new THREE.Vector2(r, y)), 96));
  const heavyRings: Placement[] = [
    { x: 0, y: -1.06, z: 0, sx: 2.706, sy: 0.032, sz: 2.706 },
    { x: 0, y: -0.72, z: 0, sx: 2.22, sy: 0.04, sz: 2.22 },
    { x: 0, y: -2.74, z: 0, sx: 0.96, sy: 0.026, sz: 0.96 },
  ];
  batch(ringGeometry, edge, heavyRings, 'Structural ring edges');

  const windows: Placement[] = [];
  const litWindows: Placement[] = [];
  const seams: Placement[] = [];
  for (let floor = 2; floor < 97; floor += 3) {
    const fraction = 0.69;
    const r = floorSurfaceRadius(floor, fraction);
    const t = floor / FLOOR_COUNT;
    const major = floor % 10 === 0;
    const lip = major ? 0.075 * (1 - t * 0.5) : 0.026;
    const slope = (shellRadius((floor + 1) / FLOOR_COUNT) - shellRadius(t) - lip) / (FLOOR_HEIGHT - (major ? 0.019 : 0.011));
    const count = Math.max(8, Math.floor(r * 31));
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2 + (floor % 2) * 0.026;
      // Align the entire opening with the sloped wall, above the thick major
      // floor lip. A radial offset alone leaves its lower corners buried.
      const normal = new THREE.Vector3(Math.cos(a), -slope, Math.sin(a)).normalize();
      const up = new THREE.Vector3(slope * Math.cos(a), 1, slope * Math.sin(a)).normalize();
      const right = new THREE.Vector3(Math.sin(a), 0, -Math.cos(a));
      const quaternion = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, normal));
      const p = { x: Math.cos(a) * r + normal.x * 0.0025,
        y: FLOOR_BASE + (floor + fraction) * FLOOR_HEIGHT + normal.y * 0.0025,
        z: Math.sin(a) * r + normal.z * 0.0025,
        sx: 0.016, sy: 0.021 * Math.sqrt(1 + slope * slope), sz: 1, quaternion };
      if (noise(i, floor) > 0.964) litWindows.push(p);
      else windows.push(p);
    }
  }
  for (let floor = 1; floor < 99; floor += 2) {
    const y = FLOOR_BASE + floor * FLOOR_HEIGHT + 0.029;
    const r = floorSurfaceRadius(floor, 0.6) + 0.006;
    for (let i = 0; i < 20; i++) {
      const a = i / 20 * Math.PI * 2 + (Math.floor(floor / 10) % 2) * 0.07;
      seams.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, sx: 0.009, sy: 0.028, sz: 0.008, yaw: Math.PI / 2 - a });
    }
  }
  batch(plane, recess, windows, 'Recessed openings');
  batch(plane, windowLight, litWindows, 'Sparse inhabited windows');
  batch(cube, structure, seams, 'Interrupted vertical seams');

  const bridgeDecks: Placement[] = [];
  const bridgeEdges: Placement[] = [];
  const braces: Placement[] = [];
  const masts: Placement[] = [];
  const mastCaps: Placement[] = [];
  const pendantSpires: Placement[] = [];
  const lowerRibs: Placement[] = [];
  const underbodyDetails: Placement[] = [];
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2 + 0.16;
    const middle = radial(a, 3.25, -0.93);
    const yaw = Math.PI / 2 - a;
    bridgeDecks.push({ x: middle.x, y: middle.y, z: middle.z, sx: 0.2, sy: 0.085, sz: 1.88, yaw });
    for (const side of [-1, 1]) {
      const shift = radial(a + Math.PI / 2, side * 0.097, 0);
      bridgeEdges.push({ x: middle.x + shift.x, y: -0.87, z: middle.z + shift.z, sx: 0.026, sy: 0.036, sz: 1.92, yaw });
    }
    braces.push(beam(radial(a, 1.83, -1.78), radial(a, 3.83, -0.99), 0.07, 0.08));
    braces.push(beam(radial(a, 2.57, -1.16), radial(a, 3.31, -0.97), 0.045));
    for (const [radius, height] of [[3.54, 0.91], [4.12, 1.07]] as const) {
      const p = radial(a, radius, -0.91 + height / 2);
      masts.push({ x: p.x, y: p.y, z: p.z, sx: 0.032, sy: height, sz: 0.032 });
      mastCaps.push({ x: p.x, y: -0.91 + height + 0.095, z: p.z, sx: 0.039, sy: 0.19, sz: 0.039 });
      pendantSpires.push({ x: p.x, y: -1.29, z: p.z, sx: 0.024, sy: 0.63, sz: 0.024 });
      underbodyDetails.push({ x: p.x, y: -1.02, z: p.z, sx: 0.12, sy: 0.11, sz: 0.12 });
    }
    const innerMast = radial(a, 2.51, -0.38);
    masts.push({ x: innerMast.x, y: innerMast.y, z: innerMast.z, sx: 0.024, sy: 1.14, sz: 0.024 });
    mastCaps.push({ x: innerMast.x, y: 0.28, z: innerMast.z, sx: 0.028, sy: 0.2, sz: 0.028 });
  }
  const finShape = new THREE.Shape();
  finShape.moveTo(0.26, 0);
  finShape.lineTo(0.14, -0.25);
  finShape.lineTo(-0.65, -1.05);
  finShape.lineTo(-0.88, -1.8);
  finShape.lineTo(-0.91, -0.91);
  finShape.lineTo(-0.22, -0.15);
  finShape.closePath();
  const fin = geometry(new THREE.ExtrudeGeometry(finShape, { depth: 0.065, bevelEnabled: false }).translate(0, 0, -0.0325));
  const fins: Placement[] = [];
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2;
    const p = radial(a, 2.24, -1.14);
    fins.push({ x: p.x, y: p.y, z: p.z, sx: 1, sy: 0.86 + noise(i, 12) * 0.25, sz: 1, yaw: -a });
    lowerRibs.push(beam(radial(a, 1.36, -2.17), radial(a, 0.87, -2.97 - noise(i, 17) * 0.22), 0.041, 0.055));
    const detail = radial(a, 1.32 + noise(i, 32) * 0.19, -2.05 - noise(i, 61) * 0.42);
    underbodyDetails.push({ x: detail.x, y: detail.y, z: detail.z, sx: 0.09, sy: 0.23 + noise(i, 50) * 0.36, sz: 0.09, yaw: -a });
    if (i % 3 === 0) {
      const keel = radial(a, 0.3, -3.29 - noise(i, 15) * 0.16);
      underbodyDetails.push({ x: keel.x, y: keel.y, z: keel.z, sx: 0.065, sy: 0.44, sz: 0.06, yaw: -a });
    }
  }
  batch(cube, structure, bridgeDecks, 'Six radial bridges');
  batch(cube, edge, bridgeEdges, 'Bridge parapets');
  batch(cube, structure, braces, 'Bridge trusses');
  batch(cylinder, edge, masts, 'Slender bridge masts');
  batch(cone, armour, mastCaps, 'Mast caps');
  batch(cylinder, structure, pendantSpires, 'Hanging bridge spires');
  batch(fin, armour, fins, 'Angular hanging buttresses');
  batch(cube, edge, lowerRibs, 'Foundation ribs');
  batch(cube, structure, underbodyDetails, 'Foundation details');

  // The red summit is intentionally very small compared with the hundred floors.
  mesh(cube, crown, 0, 4.235, 0, 0.2, 0.17, 0.18);
  mesh(cylinder, armour, -0.08, 4.34, -0.01, 0.045, 0.31, 0.045);
  mesh(cone, crown, -0.08, 4.56, -0.01, 0.059, 0.16, 0.059);
  mesh(cylinder, crown, 0.07, 4.31, 0.05, 0.033, 0.25, 0.033);
  mesh(cone, crown, 0.07, 4.49, 0.05, 0.046, 0.16, 0.046);
  mesh(cylinder, edge, -0.07, 4.73, -0.01, 0.009, 0.28, 0.009);

  const cloudMap = dataTexture(256, 128, (u, v) => {
    const puffs = [[0.16, 0.39, 0.15, 0.23], [0.32, 0.55, 0.18, 0.32], [0.52, 0.48, 0.22, 0.3], [0.7, 0.57, 0.16, 0.3], [0.86, 0.4, 0.14, 0.2]];
    let silhouette = 0;
    for (const [x, y, rx, ry] of puffs) {
      silhouette = Math.max(silhouette, Math.exp(-Math.pow((u - x!) / rx!, 2) - Math.pow((v - y!) / ry!, 2)));
    }
    const billows = smoothNoise(u * 15, v * 10) * 0.5 + smoothNoise(u * 35, v * 26) * 0.3 + smoothNoise(u * 76, v * 51) * 0.2;
    const density = THREE.MathUtils.clamp((silhouette - 0.23 + (billows - 0.5) * 0.45) * 1.9, 0, 1);
    const edgeFade = Math.sin(u * Math.PI) ** 0.7 * Math.sin(v * Math.PI) ** 0.5;
    const light = 180 + v * 46 + billows * 27;
    return [light * 0.93, light * 0.97, Math.min(light + 5, 255), Math.round(density * edgeFade * 255)];
  });
  cloudMap.colorSpace = THREE.SRGBColorSpace;
  const cloudBack = material(new THREE.MeshBasicMaterial({ map: cloudMap, transparent: true, opacity: 0.25, depthWrite: false, fog: false }));
  const cloudFront = material(new THREE.MeshBasicMaterial({ map: cloudMap, transparent: true, opacity: 0.17, depthWrite: false, fog: false }));
  const cloudLower = material(new THREE.MeshBasicMaterial({ map: cloudMap, transparent: true, opacity: 0.29, depthWrite: false, fog: false }));
  const cloudSpecs = [
    { x: -3.5, y: 1.95, z: -2.8, width: 7.7, height: 1.85, phase: 0, material: cloudBack },
    { x: 3.45, y: 0.75, z: -2.1, width: 8.2, height: 1.6, phase: 2.1, material: cloudBack },
    { x: -2.5, y: -1.75, z: 2.1, width: 7.2, height: 1.7, phase: 3.9, material: cloudFront },
    { x: 3.6, y: -0.05, z: 1.8, width: 6.7, height: 1.4, phase: 5.4, material: cloudFront },
    { x: 0.1, y: -3.16, z: 0.6, width: 10.2, height: 2.05, phase: 1.3, material: cloudLower },
  ];
  const clouds = cloudSpecs.map(spec => {
    const cloud = new THREE.Mesh(plane, spec.material);
    cloud.name = 'Atmospheric cloud layer';
    cloud.scale.set(spec.width, spec.height, 1);
    scene.add(cloud);
    return { mesh: cloud, ...spec };
  });

  scene.add(new THREE.HemisphereLight('#dce6ef', '#273445', 1.65));
  const keyLight = new THREE.DirectionalLight('#f1f3f2', 3.25);
  keyLight.position.set(-5, 8, 7);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight('#9ebad8', 2.05);
  rimLight.position.set(4, 3, -5);
  scene.add(rimLight);
  const fillLight = new THREE.DirectionalLight('#70849b', 0.65);
  fillLight.position.set(2, -3, 6);
  scene.add(fillLight);

  const views: Record<View, CameraPose> = {
    world: { position: new THREE.Vector3(8.4, 3, 13.4), target: new THREE.Vector3(0, 0.57, 0), span: 9.9 },
    settlement: { position: new THREE.Vector3(7.8, 1.4, 10.2), target: new THREE.Vector3(0, -1.15, 0), span: 6.5 },
    citadel: { position: new THREE.Vector3(5.5, 5.5, 8.4), target: new THREE.Vector3(0, 3.22, 0), span: 3.95 },
  };
  let view: View = 'world';
  const pose: CameraPose = { position: views.world.position.clone(), target: views.world.target.clone(), span: views.world.span };
  const lookTarget = new THREE.Vector3();
  const cameraRight = new THREE.Vector3();
  let viewTransition: { from: CameraPose; elapsed: number } | null = null;
  let rotationTransition: { from: number; elapsed: number } | null = null;
  let angle = -0.24;
  let requestedAngle = angle;
  let ambientTime = 0;
  let scrollProgress = 0;
  let scrollWeight = 1;
  let requestedScrollProgress = 0;
  let motion = options.motion;
  let visible = true;
  let disposed = false;
  let hasSize = false;
  let aspect = 1;
  let frame: number | null = null;
  let lastTime: number | null = null;
  let drawElapsed = 0;
  let frameInterval = 1 / 45;
  let resizePending = false;

  function canRender() { return !disposed && visible && !document.hidden && hasSize; }

  function render() {
    if (!canRender()) return;
    const scroll = scrollProgress * scrollWeight;
    camera.position.copy(pose.position);
    camera.position.x += scroll * 1.6;
    camera.position.y += scroll * 1.4;
    camera.position.z -= scroll * 1.15;
    lookTarget.copy(pose.target);
    lookTarget.y += scroll * 0.08;
    camera.lookAt(lookTarget);
    const height = pose.span * (1 - scroll * 0.1) / Math.min(aspect, 1);
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(height / (2 * camera.position.distanceTo(lookTarget))));
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    world.rotation.y = angle + Math.sin(ambientTime * 0.13) * 0.32;
    world.position.y = 0;
    cameraRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    clouds.forEach(cloud => {
      const drift = Math.sin(ambientTime * 0.095 + cloud.phase) * 2.8;
      cloud.mesh.position.set(cloud.x, cloud.y + Math.sin(ambientTime * 0.09 + cloud.phase) * 0.045, cloud.z);
      cloud.mesh.position.addScaledVector(cameraRight, drift);
      cloud.mesh.quaternion.copy(camera.quaternion);
    });
    renderer.render(scene, camera);
  }

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    drawElapsed = 0;
  }

  function tick(time: number) {
    frame = null;
    if (!canRender() || !motion) { lastTime = null; return; }
    const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    ambientTime += dt;
    drawElapsed += dt;
    scrollProgress = THREE.MathUtils.lerp(scrollProgress, requestedScrollProgress, 1 - Math.exp(-dt * 4.5));
    scrollWeight = THREE.MathUtils.lerp(scrollWeight, view === 'world' ? 1 : 0.35, 1 - Math.exp(-dt * 4.5));
    if (viewTransition) {
      viewTransition.elapsed += dt;
      const progress = Math.min(viewTransition.elapsed / 0.9, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const destination = views[view];
      pose.position.lerpVectors(viewTransition.from.position, destination.position, eased);
      pose.target.lerpVectors(viewTransition.from.target, destination.target, eased);
      pose.span = THREE.MathUtils.lerp(viewTransition.from.span, destination.span, eased);
      if (progress === 1) viewTransition = null;
    }
    if (rotationTransition) {
      rotationTransition.elapsed += dt;
      const progress = Math.min(rotationTransition.elapsed / 0.75, 1);
      angle = THREE.MathUtils.lerp(rotationTransition.from, requestedAngle, 1 - Math.pow(1 - progress, 3));
      if (progress === 1) rotationTransition = null;
    }
    if (drawElapsed >= frameInterval || dt === 0) {
      render();
      drawElapsed %= frameInterval;
    }
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (canRender() && motion && frame === null) frame = requestAnimationFrame(tick);
  }

  function snapView() {
    pose.position.copy(views[view].position);
    pose.target.copy(views[view].target);
    pose.span = views[view].span;
    scrollWeight = view === 'world' ? 1 : 0.35;
    viewTransition = null;
  }

  function resize() {
    if (disposed) return;
    if (!visible || document.hidden) { resizePending = true; return; }
    resizePending = false;
    const width = host.clientWidth;
    const height = host.clientHeight;
    hasSize = width > 0 && height > 0;
    if (!hasSize) { stop(); return; }
    aspect = width / height;
    frameInterval = width < 600 ? 1 / 30 : 1 / 45;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 600 ? 1.25 : 1.5));
    renderer.setSize(width, height, false);
    render();
    start();
  }

  function visibilityChanged() {
    if (disposed) return;
    if (!canRender()) stop();
    if (visible && !document.hidden) {
      if (resizePending || !hasSize) resize();
      else { render(); start(); }
    }
  }

  const observer = new ResizeObserver(resize);
  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    viewTransition = null;
    rotationTransition = null;
    observer.disconnect();
    document.removeEventListener('visibilitychange', visibilityChanged);
    canvas.removeEventListener('webglcontextlost', contextLost);
    instances.forEach(value => value.dispose());
    geometries.forEach(value => value.dispose());
    materials.forEach(value => value.dispose());
    textures.forEach(value => value.dispose());
    scene.environment = null;
    renderer.dispose();
    if (!context!.isContextLost()) renderer.forceContextLoss();
    scene.clear();
    canvas.remove();
  }

  function contextLost(event: Event) {
    event.preventDefault();
    if (disposed) return;
    dispose();
    options.onUnavailable();
  }

  canvas.addEventListener('webglcontextlost', contextLost);
  document.addEventListener('visibilitychange', visibilityChanged);
  host.append(canvas);
  observer.observe(host);
  resize();

  return {
    setMotion(enabled) {
      if (disposed || motion === enabled) return;
      motion = enabled;
      if (!motion) {
        stop();
        if (viewTransition) snapView();
        if (rotationTransition) { angle = requestedAngle; rotationTransition = null; }
        requestedScrollProgress = scrollProgress;
        render();
      } else start();
    },
    setVisible(value) {
      if (disposed || visible === value) return;
      visible = value;
      visibilityChanged();
    },
    setView(value) {
      if (disposed || view === value) return;
      view = value;
      if (motion) {
        viewTransition = { from: { position: pose.position.clone(), target: pose.target.clone(), span: pose.span }, elapsed: 0 };
        start();
      } else { snapView(); render(); }
    },
    setScrollProgress(progress) {
      if (disposed || !motion || !Number.isFinite(progress)) return;
      requestedScrollProgress = THREE.MathUtils.clamp(progress, 0, 1);
      start();
    },
    rotate(direction) {
      if (disposed) return;
      requestedAngle += direction * Math.PI / 6;
      if (motion) { rotationTransition = { from: angle, elapsed: 0 }; start(); }
      else { angle = requestedAngle; render(); }
    },
    dispose,
  };
}
