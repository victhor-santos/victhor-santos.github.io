import * as THREE from './assets/vendor/three.module.js';

// Three.js r160, vendored locally under the MIT license. All character geometry
// is procedural, so the assistant has no model, texture or network dependency.
const stage = document.querySelector('#penguin-stage');
const canvas = document.querySelector('#penguin-canvas');

if (stage && canvas) {
  try {
    createAssistant(stage, canvas);
  } catch (error) {
    stage.classList.add('penguin-unavailable');
    stage.classList.remove('penguin-ready');
    canvas.hidden = true;
    console.warn('O assistente 3D está indisponível neste navegador.', error);
  }
}

function createAssistant(stage, canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0, 0.15, 5.9);
  camera.lookAt(0, 0.08, 0);
  scene.add(new THREE.HemisphereLight(0xf7f9ed, 0x444944, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 3.7);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xb0c0ce, 1.8);
  fill.position.set(4, 2, 1);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xc5f567, 2.5);
  rim.position.set(-2, 2, -3);
  scene.add(rim);

  const graphite = new THREE.MeshStandardMaterial({ color: 0x24292c, roughness: 0.33, metalness: 0.08 });
  const ivory = new THREE.MeshStandardMaterial({ color: 0xf0f0e6, roughness: 0.51 });
  const amber = new THREE.MeshStandardMaterial({ color: 0xe8a649, roughness: 0.4 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x080b0e, roughness: 0.2 });
  const lime = new THREE.MeshStandardMaterial({ color: 0xc5f567, roughness: 0.36 });
  const indicator = new THREE.MeshStandardMaterial({ color: 0xc5f567, emissive: 0xc5f567, emissiveIntensity: 0.65 });
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.SphereGeometry(1, 40, 28);

  function ellipsoid(parent, material, position, scale) {
    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    parent.add(mesh);
    return mesh;
  }

  const penguin = new THREE.Group();
  penguin.rotation.y = -0.12;
  scene.add(penguin);

  ellipsoid(penguin, graphite, [0, -0.18, 0], [0.73, 0.93, 0.58]);
  ellipsoid(penguin, ivory, [0, -0.23, 0.475], [0.55, 0.72, 0.17]);
  const feet = [-1, 1].map(side => {
    const foot = ellipsoid(penguin, amber, [side * 0.30, -1.035, 0.21], [0.27, 0.10, 0.40]);
    foot.rotation.y = side * -0.2;
    return foot;
  });

  const flippers = [-1, 1].map(side => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.65, 0.28, 0);
    pivot.rotation.z = side * 0.22;
    ellipsoid(pivot, graphite, [side * 0.06, -0.43, 0], [0.19, 0.57, 0.15]);
    penguin.add(pivot);
    return pivot;
  });

  const head = new THREE.Group();
  head.position.set(0, 0.78, 0.02);
  penguin.add(head);
  ellipsoid(head, graphite, [0, 0, 0], [0.61, 0.61, 0.55]);
  [-1, 1].forEach(side => {
    const patch = ellipsoid(head, ivory, [side * 0.235, -0.055, 0.447], [0.29, 0.39, 0.17]);
    patch.rotation.z = side * -0.15;
  });
  const eyes = [-1, 1].map(side => {
    const eye = new THREE.Group();
    eye.position.set(side * 0.235, 0.02, 0.612);
    ellipsoid(eye, dark, [0, 0, 0], [0.043, 0.069, 0.025]);
    ellipsoid(eye, white, [-0.011, 0.022, 0.022], [0.012, 0.016, 0.006]);
    head.add(eye);
    return eye;
  });
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.125, 0.31, 32), amber);
  beak.rotation.x = Math.PI / 2;
  beak.scale.x = 1.28;
  beak.scale.z = 0.62;
  beak.position.set(0, -0.18, 0.663);
  head.add(beak);
  ellipsoid(head, amber, [0, -0.221, 0.639], [0.132, 0.038, 0.105]);

  // A small headset makes the character read as a guide, without a robot look.
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.625, 0.034, 10, 48, Math.PI), graphite);
  band.position.set(0, 0.045, -0.03);
  head.add(band);
  [-1, 1].forEach(side => {
    ellipsoid(head, graphite, [side * 0.588, -0.045, 0.01], [0.105, 0.18, 0.16]);
    ellipsoid(head, lime, [side * 0.675, -0.045, 0.01], [0.025, 0.117, 0.103]);
  });
  const boomCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.60, -0.16, 0.05),
    new THREE.Vector3(0.62, -0.29, 0.28),
    new THREE.Vector3(0.42, -0.32, 0.57),
    new THREE.Vector3(0.24, -0.29, 0.65),
  ]);
  head.add(new THREE.Mesh(new THREE.TubeGeometry(boomCurve, 20, 0.019, 8, false), graphite));
  ellipsoid(head, dark, [0.23, -0.29, 0.65], [0.065, 0.036, 0.038]);
  ellipsoid(head, indicator, [0.225, -0.282, 0.685], [0.022, 0.015, 0.006]);

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  const pointer = new THREE.Vector2();
  let inView = true;
  let lostContext = false;
  let disposed = false;
  let frame = 0;
  let lastFrame = 0;
  let elapsed = 0;
  let gestureStart = -10;

  const motionAllowed = () => !reducedMotion.matches && !document.body.classList.contains('motion-paused');
  const canAnimate = () => !disposed && !lostContext && inView && !document.hidden && motionAllowed();

  function render() {
    if (!disposed && !lostContext) renderer.render(scene, camera);
  }

  function animate(timestamp) {
    frame = 0;
    if (!canAnimate()) return;
    const dt = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.06) : 0;
    lastFrame = timestamp;
    elapsed += dt;
    const waveTime = elapsed - gestureStart;
    const waveEnvelope = waveTime >= 0 && waveTime < 1.6 ? Math.sin(waveTime / 1.6 * Math.PI) : 0;
    penguin.position.y = Math.sin(elapsed * 1.4) * 0.025;
    penguin.rotation.z = Math.sin(elapsed * 0.72) * 0.014;
    head.rotation.y += (pointer.x * 0.20 - head.rotation.y) * Math.min(dt * 4, 1);
    head.rotation.x += (-pointer.y * 0.10 + Math.sin(elapsed * 0.85) * 0.015 - head.rotation.x) * Math.min(dt * 4, 1);
    flippers[0].rotation.z = -0.22 + Math.sin(elapsed * 1.5) * 0.035;
    flippers[1].rotation.z = 0.22 + Math.sin(elapsed * 1.5 + 1) * 0.035 + waveEnvelope * (0.85 + Math.sin(waveTime * 15) * 0.13);
    const blinkPhase = elapsed % 5.8;
    const blink = blinkPhase > 5.55 ? Math.max(0.12, Math.abs(blinkPhase - 5.675) / 0.125) : 1;
    eyes.forEach(eye => { eye.scale.y = blink; });
    render();
    frame = requestAnimationFrame(animate);
  }

  function updateActivity() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    if (canAnimate()) frame = requestAnimationFrame(animate);
    else {
      eyes.forEach(eye => { eye.scale.y = 1; });
      render();
    }
  }

  function resize() {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Frame the whole character even in the narrow mobile assistant panel.
    camera.position.z = Math.max(5.9, 4.0 / camera.aspect);
    camera.updateProjectionMatrix();
    render();
  }

  function movePointer(event) {
    if (!finePointer.matches || !motionAllowed() || !inView) return;
    const bounds = stage.getBoundingClientRect();
    pointer.set(
      THREE.MathUtils.clamp((event.clientX - bounds.left - bounds.width / 2) / bounds.width, -1, 1),
      THREE.MathUtils.clamp(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height, -1, 1),
    );
  }

  function gesture() {
    if (motionAllowed()) gestureStart = elapsed;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const intersectionObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    updateActivity();
  }, { threshold: 0.05 });
  intersectionObserver.observe(stage);
  const motionObserver = new MutationObserver(updateActivity);
  motionObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  reducedMotion.addEventListener('change', updateActivity);
  document.addEventListener('visibilitychange', updateActivity);
  window.addEventListener('pointermove', movePointer, { passive: true });
  window.addEventListener('portfolio:chapter', gesture);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    lostContext = true;
    stage.classList.remove('penguin-ready');
    stage.classList.add('penguin-unavailable');
    updateActivity();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    lostContext = false;
    stage.classList.add('penguin-ready');
    stage.classList.remove('penguin-unavailable');
    resize();
    updateActivity();
  });

  // Browser back/forward cache should keep a frozen scene that can resume.
  window.addEventListener('pagehide', event => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (event.persisted) return;
    disposed = true;
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    motionObserver.disconnect();
    reducedMotion.removeEventListener('change', updateActivity);
    document.removeEventListener('visibilitychange', updateActivity);
    window.removeEventListener('pointermove', movePointer);
    window.removeEventListener('portfolio:chapter', gesture);
    const geometries = new Set();
    scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); });
    geometries.forEach(geometry => geometry.dispose());
    [graphite, ivory, amber, dark, lime, indicator, white].forEach(material => material.dispose());
    renderer.dispose();
  });
  window.addEventListener('pageshow', updateActivity);

  resize();
  stage.classList.add('penguin-ready');
  updateActivity();
}
