import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export function createSculpture(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
    if (!context) return undefined;
    const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(3.1, 2.5, 6.2);
    camera.lookAt(0, 0.1, 0);

    // A generated studio environment provides real metal reflections without
    // a remote HDR texture, model download, or an extra network dependency.
    const studio = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(studio, 0.04);
    scene.environment = environment.texture;
    studio.dispose();
    pmrem.dispose();

    const silver = new THREE.MeshPhysicalMaterial({ color: 0xc4cecb, metalness: 1, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.15 });
    const ivory = new THREE.MeshPhysicalMaterial({ color: 0xf3f2ea, metalness: 0.2, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12 });
    const ebony = new THREE.MeshPhysicalMaterial({ color: 0x111918, metalness: 0.55, roughness: 0.2, clearcoat: 1 });
    const signal = new THREE.MeshStandardMaterial({ color: 0x75cfa7, emissive: 0x287a5e, emissiveIntensity: 0.55, metalness: 0.5, roughness: 0.22 });
    const wire = new THREE.LineBasicMaterial({ color: 0x4b8876, transparent: true, opacity: 0.5 });
    const sculpture = new THREE.Group();
    sculpture.rotation.set(0.08, -0.2, -0.13);
    scene.add(sculpture);

    // A continuous metal knot forms the computational core. An octave of
    // floating keys bends around it like a sampled waveform.
    const core = new THREE.Mesh(new THREE.TorusKnotGeometry(0.78, 0.15, 160, 20, 2, 3), silver);
    core.scale.set(1.1, 1.1, 0.68);
    core.position.set(0, 0.38, -0.42);
    core.rotation.set(0.4, -0.25, 0.2);
    core.castShadow = true;
    core.receiveShadow = true;
    sculpture.add(core);

    const whiteShape = new RoundedBoxGeometry(0.31, 0.14, 1.02, 3, 0.025);
    const blackShape = new RoundedBoxGeometry(0.19, 0.19, 0.62, 3, 0.025);
    const baseShape = new RoundedBoxGeometry(0.315, 0.06, 1.025, 2, 0.02);
    const keys: { mesh: THREE.Group; rest: number; phase: number }[] = [];
    const placeKey = (index: number, black: boolean) => {
        const angle = (index - 3) * 0.19;
        const rest = -0.33 + Math.cos(angle * 3) * 0.12 + (black ? 0.17 : 0);
        const key = new THREE.Group();
        key.position.set(Math.sin(angle) * 2.0, rest, 0.58 + (1 - Math.cos(angle)) * 0.9 - (black ? 0.21 : 0));
        key.rotation.set(-0.12, -angle * 0.6, angle * 0.12);
        const top = new THREE.Mesh(black ? blackShape : whiteShape, black ? ebony : ivory);
        top.castShadow = true;
        top.receiveShadow = true;
        key.add(top);
        if (!black) {
            const base = new THREE.Mesh(baseShape, silver);
            base.position.y = -0.095;
            key.add(base);
        }
        sculpture.add(key);
        keys.push({ mesh: key, rest, phase: index * 0.62 });
    };
    for (let index = 0; index < 7; index++) placeKey(index, false);
    for (const index of [
0.5, 1.5, 3.5, 4.5, 5.5
]) placeKey(index, true);

    const particles: { mesh: THREE.Mesh; path: THREE.CatmullRomCurve3; phase: number }[] = [];
    const beadShape = new THREE.SphereGeometry(0.045, 16, 12);
    for (let ring = 0; ring < 2; ring++) {
        const points = Array.from({ length: 96 }, (_, index) => {
            const t = index / 96 * Math.PI * 2;
            return new THREE.Vector3(1.6 * Math.cos(t), 0.35 + 0.5 * Math.sin(t) + 0.12 * Math.sin(t * 3 + ring), 0.95 * Math.sin(t));
        });
        const path = new THREE.CatmullRomCurve3(points, true);
        const orbit = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(path.getPoints(128)), wire);
        const orbitGroup = new THREE.Group();
        orbitGroup.rotation.z = ring ? -0.6 : 0.35;
        orbitGroup.add(orbit);
        sculpture.add(orbitGroup);
        for (let index = 0; index < 3; index++) {
            const bead = new THREE.Mesh(beadShape, index === 0 ? signal : silver);
            orbitGroup.add(bead);
            particles.push({ mesh: bead, path, phase: index / 3 + ring * 0.12 });
        }
    }

    const keyLight = new THREE.DirectionalLight(0xfff8ed, 4);
    keyLight.position.set(-3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.normalBias = 0.03;
    scene.add(keyLight);
    const rim = new THREE.DirectionalLight(0xa6e7d1, 3);
    rim.position.set(3, 2, -3);
    scene.add(rim, new THREE.HemisphereLight(0xe5f2ed, 0x44514b, 1.4));

    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const brush = shadowCanvas.getContext("2d")!;
    const gradient = brush.createRadialGradient(64, 64, 8, 64, 64, 64);
    gradient.addColorStop(0, "rgba(13,25,20,0.3)");
    gradient.addColorStop(1, "rgba(13,25,20,0)");
    brush.fillStyle = gradient;
    brush.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 3.2), shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.05;
    scene.add(shadow);

    return {
        resize(width: number, height: number) {
            if (!width || !height) return;
            renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5, Math.sqrt(450000 / (width * height))));
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        },
        setTheme(dark: boolean) {
            renderer.toneMappingExposure = dark ? 1.45 : 1.15;
            silver.color.setHex(dark ? 0xcbd9d3 : 0xb9c5bf);
            wire.color.setHex(dark ? 0x8abda9 : 0x4b8876);
            shadowMaterial.opacity = dark ? 0.3 : 0.65;
        },
        render(time: number) {
            sculpture.rotation.y = -0.2 + Math.sin(time * 0.22) * 0.32;
            sculpture.rotation.z = -0.13 + Math.sin(time * 0.16) * 0.045;
            sculpture.position.y = Math.sin(time * 0.5) * 0.045;
            core.rotation.z = 0.2 + time * 0.075;
            for (const key of keys) key.mesh.position.y = key.rest + Math.sin(time * 0.85 + key.phase) * 0.045;
            for (const particle of particles) particle.mesh.position.copy(particle.path.getPointAt((time * 0.035 + particle.phase) % 1));
            renderer.render(scene, camera);
        },
        dispose() {
            const geometries = new Set<THREE.BufferGeometry>();
            const materials = new Set<THREE.Material>();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
                    geometries.add(object.geometry);
                    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
                }
            });
            geometries.forEach((geometry) => geometry.dispose());
            materials.forEach((material) => material.dispose());
            shadowTexture.dispose();
            environment.dispose();
            keyLight.shadow.map?.dispose();
            renderer.dispose();
        },
    };
}
