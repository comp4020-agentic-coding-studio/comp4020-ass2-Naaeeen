import * as THREE from 'three';

export interface AincradScene {
  setMotion(enabled: boolean): void;
  setVisible(visible: boolean): void;
  setView(view: 'world' | 'settlement' | 'citadel'): void;
  rotate(direction: -1 | 1): void;
  dispose(): void;
}

type View = 'world' | 'settlement' | 'citadel';
type Placement = { x: number; y: number; z: number; sx: number; sy: number; sz: number; yaw?: number; color?: THREE.ColorRepresentation };
type CameraPose = { position: THREE.Vector3; target: THREE.Vector3; span: number };

const PALETTE = {
  gold: '#b97d1c', bronze: '#8a5c13', cream: '#ecdfc5', stone: '#9a8d78',
  rock: '#655a4b', charcoal: '#292622', path: '#c4b699', glow: '#efd3a0',
};

/** An original architectural illustration, deliberately not a canonical floor map. */
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const world = new THREE.Group();
  scene.add(world);
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 80);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const instances: THREE.InstancedMesh[] = [];
  const geometry = <T extends THREE.BufferGeometry>(value: T): T => { geometries.add(value); return value; };
  const material = <T extends THREE.Material>(value: T): T => { materials.add(value); return value; };
  const stone = material(new THREE.MeshStandardMaterial({ color: PALETTE.stone, roughness: 0.93, flatShading: true }));
  const rock = material(new THREE.MeshStandardMaterial({ color: PALETTE.rock, roughness: 1, vertexColors: true, flatShading: true }));
  const cream = material(new THREE.MeshStandardMaterial({ color: PALETTE.cream, roughness: 0.77 }));
  const gold = material(new THREE.MeshStandardMaterial({ color: PALETTE.gold, roughness: 0.58, metalness: 0.28, flatShading: true }));
  const bronze = material(new THREE.MeshStandardMaterial({ color: PALETTE.bronze, roughness: 0.85, metalness: 0.16, flatShading: true }));
  const foliage = material(new THREE.MeshStandardMaterial({ color: '#766448', roughness: 1, flatShading: true }));
  const pathMaterial = material(new THREE.MeshStandardMaterial({ color: PALETTE.path, roughness: 1, side: THREE.DoubleSide }));
  const dark = material(new THREE.MeshBasicMaterial({ color: PALETTE.charcoal, side: THREE.DoubleSide }));
  const glow = material(new THREE.MeshBasicMaterial({ color: PALETTE.glow, toneMapped: false, side: THREE.DoubleSide }));
  const guideMaterial = material(new THREE.LineBasicMaterial({ color: PALETTE.gold, transparent: true, opacity: 0.32, depthWrite: false }));
  const cube = geometry(new THREE.BoxGeometry(1, 1, 1));
  const cylinder = geometry(new THREE.CylinderGeometry(1, 1, 1, 12));
  const cone = geometry(new THREE.ConeGeometry(1, 1, 8));
  const roof = geometry(new THREE.ConeGeometry(Math.SQRT1_2, 1, 4).rotateY(Math.PI / 4));
  const cypress = geometry(new THREE.ConeGeometry(1, 1, 6));
  const arch = new THREE.Shape();
  arch.moveTo(-0.5, -0.5);
  arch.lineTo(0.5, -0.5);
  arch.lineTo(0.5, 0.15);
  arch.quadraticCurveTo(0.5, 0.5, 0, 0.5);
  arch.quadraticCurveTo(-0.5, 0.5, -0.5, 0.15);
  arch.closePath();
  const windowGeometry = geometry(new THREE.ShapeGeometry(arch, 5));

  function mesh(g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1) {
    const value = new THREE.Mesh(g, m);
    value.position.set(x, y, z);
    value.scale.set(sx, sy, sz);
    world.add(value);
    return value;
  }

  function batch(g: THREE.BufferGeometry, m: THREE.Material, placements: Placement[]) {
    const value = new THREE.InstancedMesh(g, m, placements.length);
    const transform = new THREE.Object3D();
    placements.forEach((p, index) => {
      transform.position.set(p.x, p.y, p.z);
      transform.scale.set(p.sx, p.sy, p.sz);
      transform.rotation.set(0, p.yaw ?? 0, 0);
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

  // Each shelf has a cut stone rim and a different, faceted geological profile.
  // Keeping the silhouettes irregular prevents the world reading as smooth bowls.
  function island(profile: [number, number][], phase: number) {
    const positions: number[] = [];
    const colors: number[] = [];
    const sides = 56;
    const point = (radius: number, height: number, index: number) => {
      const angle = index / sides * Math.PI * 2;
      const ripple = 1 + 0.024 * Math.sin(angle * 7 + phase) + 0.018 * Math.cos(angle * 11 - phase);
      return [Math.cos(angle) * radius * ripple, height, Math.sin(angle) * radius * ripple];
    };
    const triangle = (a: number[], b: number[], c: number[], shade: number) => {
      positions.push(...a, ...b, ...c);
      for (let i = 0; i < 3; i++) colors.push(shade, shade, shade);
    };
    for (let band = 0; band < profile.length - 1; band++) {
      const [r1, y1] = profile[band]!;
      const [r2, y2] = profile[band + 1]!;
      for (let i = 0; i < sides; i++) {
        const shade = 0.73 + 0.25 * (0.5 + 0.5 * Math.sin(i * 2.37 + band * 1.9 + phase));
        const a = point(r1, y1, i);
        const b = point(r1, y1, i + 1);
        const c = point(r2, y2, i + 1);
        const d = point(r2, y2, i);
        triangle(a, b, d, shade);
        triangle(b, c, d, shade);
      }
    }
    const [radius, height] = profile[0]!;
    for (let i = 0; i < sides; i++) triangle([0, height, 0], point(radius, height, i + 1), point(radius, height, i), 1.25);
    const value = geometry(new THREE.BufferGeometry());
    value.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    value.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    value.computeVertexNormals();
    mesh(value, rock, 0, 0, 0);
  }

  const levels = [
    { y: -1.15, radius: 2.62, houses: 35, phase: 0.3 },
    { y: 0.03, radius: 2.03, houses: 26, phase: 1.8 },
    { y: 1.12, radius: 1.44, houses: 15, phase: 3.1 },
  ];
  island([[2.62, -1.15], [2.7, -1.34], [2.42, -1.64], [1.62, -2.24], [0.55, -2.89], [0.1, -3.12]], 0.3);
  island([[2.03, 0.03], [2.09, -0.15], [1.77, -0.44], [1.32, -0.91]], 1.8);
  island([[1.44, 1.12], [1.48, 0.96], [1.16, 0.71], [0.83, 0.43]], 3.1);
  island([[0.86, 2.1], [0.9, 1.94], [0.7, 1.73], [0.49, 1.58]], 1.2);

  const homes: Placement[] = [];
  const roofs: Placement[] = [];
  const trees: Placement[] = [];
  const trunks: Placement[] = [];
  const rimStones: Placement[] = [];
  const roads: Placement[] = [];
  const windows: Placement[] = [];
  const lamps: Placement[] = [];
  const columns: Placement[] = [];
  const stairs: Placement[] = [];

  levels.forEach((level, levelIndex) => {
    const road = mesh(geometry(new THREE.RingGeometry(level.radius * 0.76, level.radius * 0.8, 80)), pathMaterial, 0, level.y + 0.012, 0);
    road.rotation.x = -Math.PI / 2;
    const trim = mesh(geometry(new THREE.TorusGeometry(level.radius * 0.985, 0.027, 4, 80)), bronze, 0, level.y - 0.015, 0);
    trim.rotation.x = Math.PI / 2;
    const stoneCount = 48 - levelIndex * 10;
    for (let i = 0; i < stoneCount; i++) {
      const a = i / stoneCount * Math.PI * 2;
      rimStones.push({ x: Math.cos(a) * level.radius * 0.955, y: level.y + 0.044, z: Math.sin(a) * level.radius * 0.955, sx: 0.12, sy: 0.085, sz: 0.085, yaw: -a });
    }
    for (let i = 0; i < level.houses; i++) {
      if (i % 9 === 0) continue;
      const a = i / level.houses * Math.PI * 2 + level.phase;
      const r = level.radius * (i % 3 === 0 ? 0.68 : 0.86);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const h = 0.13 + (i % 4) * 0.025;
      const size = levelIndex === 2 ? 0.12 : 0.16;
      const yaw = -a + Math.PI / 2;
      homes.push({ x, y: level.y + h / 2, z, sx: size, sy: h, sz: size * 1.3, yaw, color: i % 3 === 0 ? PALETTE.path : PALETTE.cream });
      roofs.push({ x, y: level.y + h + 0.063, z, sx: size * 1.2, sy: 0.126, sz: size * 1.55, yaw });
      lamps.push({ x: x + Math.cos(a) * size * 0.659, y: level.y + h * 0.56, z: z + Math.sin(a) * size * 0.659, sx: 0.035, sy: 0.052, sz: 1, yaw });
    }
    for (let i = 0; i < 25 - levelIndex * 6; i++) {
      const a = i * 2.39996 + level.phase;
      const r = level.radius * (0.84 + 0.055 * Math.sin(i * 4.3));
      const h = 0.17 + (i % 5) * 0.025;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      trees.push({ x, y: level.y + h * 0.64, z, sx: h * 0.21, sy: h, sz: h * 0.21, color: i % 3 === 0 ? PALETTE.bronze : '#786950' });
      trunks.push({ x, y: level.y + 0.036, z, sx: 0.012, sy: 0.075, sz: 0.012 });
    }
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2 + 0.28;
      const r = level.radius * 0.57;
      roads.push({ x: Math.cos(a) * r, y: level.y + 0.016, z: Math.sin(a) * r, sx: 0.052, sy: 0.01, sz: level.radius * 0.48, yaw: Math.PI / 2 - a });
    }
    // A colonnade can be glimpsed underneath the next rock shelf.
    const colonnadeRadius = [1.19, 0.81, 0.5][levelIndex]!;
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2;
      columns.push({ x: Math.cos(a) * colonnadeRadius, y: level.y + 0.205, z: Math.sin(a) * colonnadeRadius, sx: 0.033, sy: 0.41, sz: 0.033 });
    }
    const cornice = mesh(geometry(new THREE.TorusGeometry(colonnadeRadius, 0.046, 4, 48)), cream, 0, level.y + 0.415, 0);
    cornice.rotation.x = Math.PI / 2;
  });

  // The small rising stair makes the inhabited shelves feel connected.
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    const a = 0.25 + t * 0.53;
    const r = 2.42 - t * 0.52;
    stairs.push({ x: Math.cos(a) * r, y: -1.1 + t * 1.15, z: Math.sin(a) * r, sx: 0.2, sy: 0.042, sz: 0.11, yaw: -a });
  }

  batch(cube, cream, homes);
  batch(roof, bronze, roofs);
  batch(cypress, foliage, trees);
  batch(cylinder, bronze, trunks);
  batch(cube, stone, rimStones);
  batch(cube, pathMaterial, roads);
  batch(cylinder, cream, columns);
  batch(cube, cream, stairs);

  // Citadel: irregular heights, fine roofs, a central keep and a ring of curtain walls.
  const towerBodies: Placement[] = [];
  const towerRoofs: Placement[] = [];
  const finials: Placement[] = [];
  const walls: Placement[] = [];
  const collars: Placement[] = [];
  const tower = (x: number, z: number, base: number, radius: number, height: number) => {
    towerBodies.push({ x, y: base + height / 2, z, sx: radius, sy: height, sz: radius });
    towerRoofs.push({ x, y: base + height + radius * 1.7, z, sx: radius * 1.42, sy: radius * 3.4, sz: radius * 1.42 });
    collars.push({ x, y: base + height - 0.035, z, sx: radius * 1.16, sy: 0.075, sz: radius * 1.16 });
    finials.push({ x, y: base + height + radius * 3.4 + 0.055, z, sx: 0.012, sy: 0.13, sz: 0.012 });
    for (let side = 0; side < 4; side++) {
      const a = side * Math.PI / 2;
      windows.push({ x: x + Math.cos(a) * (radius + 0.001), y: base + height * 0.72, z: z + Math.sin(a) * (radius + 0.001), sx: radius * 0.5, sy: radius * 1.18, sz: 1, yaw: Math.PI / 2 - a });
    }
  };
  mesh(cylinder, cream, 0, 2.145, 0, 0.82, 0.09, 0.82);
  mesh(cube, cream, 0, 2.46, 0, 0.63, 0.59, 0.64);
  mesh(roof, gold, 0, 2.89, 0, 0.77, 0.36, 0.77);
  tower(-0.08, -0.1, 2.62, 0.16, 1.04);
  tower(0.32, -0.22, 2.53, 0.105, 0.71);
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2;
    const next = (i + 1) / 8 * Math.PI * 2;
    const radius = 0.625;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    const x2 = Math.cos(next) * radius;
    const z2 = Math.sin(next) * radius;
    tower(x, z, 2.19, i % 2 === 0 ? 0.1 : 0.085, 0.49 + (i % 3) * 0.17);
    walls.push({ x: (x + x2) / 2, y: 2.36, z: (z + z2) / 2, sx: 0.055, sy: 0.35, sz: Math.hypot(x2 - x, z2 - z), yaw: Math.atan2(x2 - x, z2 - z) });
  }
  batch(cylinder, cream, towerBodies);
  batch(cone, gold, towerRoofs);
  batch(cylinder, gold, collars);
  batch(cylinder, gold, finials);
  batch(cube, cream, walls);
  batch(windowGeometry, dark, windows);
  batch(windowGeometry, glow, lamps);

  // Thin survey-like guides frame the model without turning the scene into a particle field.
  for (const [radius, start, length, height, tilt] of [[3.28, 0.16, 5.65, -0.55, 0.12], [3.06, 0.7, 3.6, -0.82, -0.2]]) {
    const points = Array.from({ length: 129 }, (_, i) => {
      const a = start! + i / 128 * length!;
      return new THREE.Vector3(Math.cos(a) * radius!, 0, Math.sin(a) * radius!);
    });
    const guide = new THREE.Line(geometry(new THREE.BufferGeometry().setFromPoints(points)), guideMaterial);
    guide.position.y = height!;
    guide.rotation.z = tilt!;
    world.add(guide);
  }

  scene.add(new THREE.HemisphereLight(PALETTE.cream, '#332c25', 2));
  const keyLight = new THREE.DirectionalLight('#fff1d4', 4.1);
  keyLight.position.set(-3, 7, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(PALETTE.gold, 2.5);
  rimLight.position.set(4, 2, -4);
  scene.add(rimLight);

  const views: Record<View, CameraPose> = {
    world: { position: new THREE.Vector3(7.8, 5.1, 11), target: new THREE.Vector3(0, 0.35, 0), span: 8.05 },
    settlement: { position: new THREE.Vector3(7.7, 3.5, 8.6), target: new THREE.Vector3(0.45, -0.52, 0.4), span: 5.2 },
    citadel: { position: new THREE.Vector3(5.2, 4.7, 7.8), target: new THREE.Vector3(0, 2.75, 0), span: 3.65 },
  };
  let view: View = 'world';
  let span = views.world.span;
  const target = views.world.target.clone();
  camera.position.copy(views.world.position);
  let viewTransition: { from: CameraPose; elapsed: number } | null = null;
  let rotationTransition: { from: number; elapsed: number } | null = null;
  let angle = -0.24;
  let requestedAngle = angle;
  let ambientTime = 0;
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

  function updateProjection() {
    const height = span / Math.min(aspect, 1);
    camera.left = -height * aspect / 2;
    camera.right = height * aspect / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
  }

  function canRender() { return !disposed && visible && !document.hidden && hasSize; }

  function render() {
    if (!canRender()) return;
    world.rotation.y = angle + Math.sin(ambientTime * 0.19) * 0.095;
    world.position.y = Math.sin(ambientTime * 0.6) * 0.045;
    camera.lookAt(target);
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
    if (viewTransition) {
      viewTransition.elapsed += dt;
      const progress = Math.min(viewTransition.elapsed / 0.85, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const destination = views[view];
      camera.position.lerpVectors(viewTransition.from.position, destination.position, eased);
      target.lerpVectors(viewTransition.from.target, destination.target, eased);
      span = THREE.MathUtils.lerp(viewTransition.from.span, destination.span, eased);
      updateProjection();
      if (progress === 1) viewTransition = null;
    }
    if (rotationTransition) {
      rotationTransition.elapsed += dt;
      const progress = Math.min(rotationTransition.elapsed / 0.7, 1);
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
    const destination = views[view];
    camera.position.copy(destination.position);
    target.copy(destination.target);
    span = destination.span;
    viewTransition = null;
    updateProjection();
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    updateProjection();
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
        viewTransition = { from: { position: camera.position.clone(), target: target.clone(), span }, elapsed: 0 };
        start();
      } else { snapView(); render(); }
    },
    rotate(direction) {
      if (disposed) return;
      requestedAngle += direction * Math.PI / 7;
      if (motion) { rotationTransition = { from: angle, elapsed: 0 }; start(); }
      else { angle = requestedAngle; render(); }
    },
    dispose,
  };
}
